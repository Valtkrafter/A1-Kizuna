import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYLLABUS } from '../src/data/syllabus';
import { A1_DICTIONARY } from '../src/data/dictionary';
import { tokenizeJapanese } from '../src/utils/tokenizer';
import { getFallbackRomaji } from '../src/utils/kana';
import type { TaskItem, SubRule } from '../src/types/curriculum';

// Helper for ESM directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load environment variables if not already set in process.env
if (!process.env.DEEPSEEK_API_KEY) {
  for (const envFile of ['.env.local', '.env']) {
    const envPath = path.resolve(projectRoot, envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...vals] = trimmed.split('=');
          const val = vals.join('=').trim().replace(/^["']|["']$/g, '');
          if (key.trim() === 'DEEPSEEK_API_KEY' || key.trim() === 'VITE_DEEPSEEK_API_KEY') {
            process.env[key.trim()] = val;
            if (!process.env.DEEPSEEK_API_KEY && val) {
              process.env.DEEPSEEK_API_KEY = val;
            }
          }
        }
      }
    }
  }
}

export interface GeneratedTask {
  type: 'cloze' | 'order';
  prompt: string;
  german: string;
  options?: string[];
  correctAnswer: string;
  chips?: string[];
  correctOrder?: string[];
  explanation: string;
}

export interface AuditResult {
  task: GeneratedTask;
  isValid: boolean;
  unrecognizedTokens: string[];
  totalJapaneseTokens: number;
}

const JAPANESE_REGEX = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
const KANJI_REGEX = /[\u4E00-\u9FAF]/;

/**
 * Validates a generated task against the A1 Kizuna dictionary and phonetic Kana fallbacks.
 */
export function auditGeneratedTask(task: GeneratedTask): AuditResult {
  const stringsToCheck: string[] = [
    task.prompt,
    task.correctAnswer,
    ...(task.options || []),
    ...(task.chips || []),
    ...(task.correctOrder || []),
  ];

  const unrecognizedTokens: string[] = [];
  let totalJapaneseTokens = 0;

  for (const text of stringsToCheck) {
    if (!text || !JAPANESE_REGEX.test(text)) continue;

    const tokens = tokenizeJapanese(text);
    for (const token of tokens) {
      if (token.isBlank || token.isPunctuation) continue;
      if (!JAPANESE_REGEX.test(token.text)) continue;

      totalJapaneseTokens++;
      const clean = token.text.replace(/[〜~「」()（）*]/g, '').trim();
      if (!clean) continue;

      const inDict = Boolean(A1_DICTIONARY[token.text] || A1_DICTIONARY[clean]);
      if (!inDict) {
        if (KANJI_REGEX.test(clean)) {
          unrecognizedTokens.push(clean);
        } else {
          // Kana check
          const romaji = getFallbackRomaji(clean);
          if (!romaji) {
            unrecognizedTokens.push(clean);
          }
        }
      }
    }
  }

  return {
    task,
    isValid: unrecognizedTokens.length === 0,
    unrecognizedTokens: Array.from(new Set(unrecognizedTokens)),
    totalJapaneseTokens,
  };
}

/**
 * Calls DeepSeek API to generate A1 practice tasks for a target grammar rule.
 */
export async function generateTasksForSubRule(
  subRuleTitle: string,
  formula: string,
  existingExamples: string[],
  count: number = 10,
  apiKey?: string
): Promise<GeneratedTask[]> {
  const key = apiKey || process.env.DEEPSEEK_API_KEY;
  if (!key || key === 'your_deepseek_api_key_here') {
    throw new Error(
      'Missing or placeholder DEEPSEEK_API_KEY in environment or .env.local.\n' +
      'Please set your real DeepSeek API key in .env.local to run task generation.'
    );
  }

  const systemPrompt = `You are a strict Japanese language exam creator for JLPT N5 / Busuu A1 level.
Generate ${count} distinct, non-trivial practice sentences (mix of 'cloze' and 'order' types) testing the target grammar.
Rules:
1. STRICT A1 VOCABULARY ONLY: everyday food, family, routine verbs, basic places, simple time expressions.
2. For 'cloze': Provide prompt with '___', 4 multiple-choice options (1 correct, 3 plausible distractor forms), and explanation in German.
3. For 'order': Provide German meaning, scrambled chips array, correctOrder array, and explanation in German.
4. Output RAW JSON ONLY matching this schema:
{
  "tasks": [
    {
      "type": "cloze" | "order",
      "prompt": "sentence with ___ or prompt text",
      "german": "German translation",
      "options": ["opt1", "opt2", "opt3", "opt4"], // for cloze only
      "correctAnswer": "correct item or string",
      "chips": ["chip1", "chip2", "chip3"], // for order only
      "correctOrder": ["chip1", "chip2", "chip3"], // for order only
      "explanation": "German pedagogical explanation"
    }
  ]
}`;

  const userPrompt = `Target Grammar: "${subRuleTitle}"
Formula: "${formula}"
Forbidden Examples (do NOT repeat these scenarios):
${existingExamples.join('\n')}

Return a JSON array of ${count} tasks.`;

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek API error (${res.status} ${res.statusText}): ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Empty response from DeepSeek API');
  }

  // Strip possible markdown fences
  const cleaned = content.replace(/^```json\s*/, '').replace(/```$/, '').trim();
  const parsed = JSON.parse(cleaned);
  const tasks: GeneratedTask[] = Array.isArray(parsed) ? parsed : (parsed.tasks || []);

  return tasks;
}

/**
 * Appends audited tasks into the respective module TypeScript file.
 */
export function appendTasksToModuleFile(
  moduleId: string,
  subRuleId: string,
  newTasks: TaskItem[]
): boolean {
  // Convert moduleId like "mod-1" to "module1.ts"
  const modNumber = moduleId.replace('mod-', '');
  const moduleFilePath = path.resolve(projectRoot, 'src', 'data', 'modules', `module${modNumber}.ts`);

  if (!fs.existsSync(moduleFilePath)) {
    console.error(`Module file not found: ${moduleFilePath}`);
    return false;
  }

  const fileContent = fs.readFileSync(moduleFilePath, 'utf-8');

  // Find subRule in file
  const subRuleIdRegex = new RegExp(`id:\\s*['"]${subRuleId}['"]`);
  const match = fileContent.match(subRuleIdRegex);
  if (!match || match.index === undefined) {
    console.error(`Subrule ${subRuleId} not found in ${moduleFilePath}`);
    return false;
  }

  // Find the tasks array for this subRule
  const subRuleSlice = fileContent.slice(match.index);
  const tasksIndexInSlice = subRuleSlice.indexOf('tasks: [');
  if (tasksIndexInSlice === -1) {
    console.error(`tasks array not found for subrule ${subRuleId}`);
    return false;
  }

  // Find closing bracket of tasks array
  let bracketDepth = 0;
  let closingIndexInSlice = -1;
  const searchStart = tasksIndexInSlice + 'tasks: ['.length;

  for (let i = searchStart; i < subRuleSlice.length; i++) {
    const char = subRuleSlice[i];
    if (char === '[') bracketDepth++;
    else if (char === ']') {
      if (bracketDepth === 0) {
        closingIndexInSlice = i;
        break;
      }
      bracketDepth--;
    }
  }

  if (closingIndexInSlice === -1) {
    console.error(`Could not locate end of tasks array for ${subRuleId}`);
    return false;
  }

  const insertionPoint = match.index + closingIndexInSlice;

  // Format new task items
  const formattedTasks = newTasks.map((t) => {
    let code = `        {\n`;
    code += `          id: '${t.id}',\n`;
    code += `          type: '${t.type}',\n`;
    code += `          prompt: ${JSON.stringify(t.prompt)},\n`;
    code += `          german: ${JSON.stringify(t.german)},\n`;
    if (t.options) {
      code += `          options: ${JSON.stringify(t.options)},\n`;
    }
    code += `          correctAnswer: ${JSON.stringify(t.correctAnswer)},\n`;
    if (t.chips) {
      code += `          chips: ${JSON.stringify(t.chips)},\n`;
    }
    if (t.correctOrder) {
      code += `          correctOrder: ${JSON.stringify(t.correctOrder)},\n`;
    }
    code += `          explanation: ${JSON.stringify(t.explanation)}\n`;
    code += `        }`;
    return code;
  }).join(',\n');

  // Check if existing tasks array was non-empty
  const beforeClose = fileContent.slice(match.index + searchStart, insertionPoint).trim();
  const separator = beforeClose.length > 0 && !beforeClose.endsWith(',') ? ',\n' : '\n';

  const updatedFile =
    fileContent.slice(0, insertionPoint) +
    separator +
    formattedTasks +
    '\n      ' +
    fileContent.slice(insertionPoint);

  fs.writeFileSync(moduleFilePath, updatedFile, 'utf-8');
  return true;
}

// CLI Execution Handler
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
=== A1 Kizuna Task Pool Generator ===
Usage:
  npx tsx scripts/expand-tasks.ts [options]

Options:
  --module=<id>       Target module ID (e.g. mod-1 or 1). Defaults to mod-1.
  --subrule=<id>      Target sub-rule ID (e.g. sub-1-1). Defaults to first sub-rule.
  --count=<number>    Number of sentences to generate (e.g. 10 or 20). Default: 10.
  --dry-run           Perform generation & vocabulary audit without writing to files.
  --out=<path>        Save audited tasks to a JSON file.
  --write             Directly append validated tasks into the module dataset.
  --all               Process all sub-rules in the selected module.
  --help              Display this help menu.
`);
    process.exit(0);
  }

  console.log('=== A1 Kizuna Offline Task Pool Generator ===');

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
    console.warn('\n[!] DEEPSEEK_API_KEY is not configured or is still the placeholder.');
    console.warn('    Please add your actual DeepSeek API key in .env.local:');
    console.warn('    DEEPSEEK_API_KEY=sk-...\n');
    console.warn('Auditor and validation subsystems are operational.');
    process.exit(1);
  }

  // Parse CLI args
  let targetModuleId = 'mod-1';
  let targetSubRuleId: string | null = null;
  let count = 10;
  let isDryRun = args.includes('--dry-run');
  let isWrite = args.includes('--write');
  const isAll = args.includes('--all');
  let outFilePath: string | null = null;

  for (const arg of args) {
    if (arg.startsWith('--module=')) {
      const val = arg.split('=')[1];
      targetModuleId = val.startsWith('mod-') ? val : `mod-${val}`;
    } else if (arg.startsWith('--subrule=')) {
      const val = arg.split('=')[1];
      targetSubRuleId = val.startsWith('sub-') ? val : `sub-${val}`;
    } else if (arg.startsWith('--count=')) {
      count = parseInt(arg.split('=')[1], 10) || 10;
    } else if (arg.startsWith('--out=')) {
      outFilePath = path.resolve(process.cwd(), arg.split('=')[1]);
    }
  }

  const moduleObj = SYLLABUS.find((m) => m.id === targetModuleId);
  if (!moduleObj) {
    console.error(`Module not found: ${targetModuleId}`);
    process.exit(1);
  }

  const subRulesToProcess: SubRule[] = isAll
    ? moduleObj.subRules
    : targetSubRuleId
    ? moduleObj.subRules.filter((s) => s.id === targetSubRuleId)
    : [moduleObj.subRules[0]];

  if (subRulesToProcess.length === 0) {
    console.error(`Sub-rule not found in module ${targetModuleId}: ${targetSubRuleId}`);
    process.exit(1);
  }

  console.log(`Target: Module ${moduleObj.id} (${moduleObj.title})`);
  console.log(`Sub-rules to process: ${subRulesToProcess.map((s) => s.id).join(', ')}`);
  console.log(`Desired count per sub-rule: ${count}`);
  console.log(`Mode: ${isDryRun ? 'DRY RUN' : isWrite ? 'DIRECT WRITE' : 'AUDIT & PREVIEW'}\n`);

  const allAuditedTasks: Record<string, TaskItem[]> = {};

  for (const subRule of subRulesToProcess) {
    console.log(`\n--- Generating tasks for [${subRule.id}] ${subRule.title} ---`);
    const existingExamples = [
      ...subRule.examples.map((e) => e.japanese),
      ...subRule.tasks.map((t) => t.prompt),
    ];

    try {
      const rawTasks = await generateTasksForSubRule(
        subRule.title,
        subRule.formula,
        existingExamples,
        count,
        apiKey
      );

      console.log(`Received ${rawTasks.length} raw tasks from DeepSeek. Auditing vocabulary...`);

      const validTasks: TaskItem[] = [];
      let nextIdNumber = subRule.tasks.length + 1;

      for (const raw of rawTasks) {
        const audit = auditGeneratedTask(raw);
        if (audit.isValid) {
          const taskItem: TaskItem = {
            id: `task-${subRule.id.replace('sub-', '')}-${nextIdNumber++}`,
            type: raw.type,
            prompt: raw.prompt,
            german: raw.german,
            options: raw.options,
            correctAnswer: raw.correctAnswer,
            chips: raw.chips,
            correctOrder: raw.correctOrder,
            explanation: raw.explanation,
          };
          validTasks.push(taskItem);
        } else {
          console.warn(`  [REJECTED] Unrecognized vocabulary: [${audit.unrecognizedTokens.join(', ')}] in prompt: "${raw.prompt}"`);
        }
      }

      console.log(`Audited: ${validTasks.length}/${rawTasks.length} passed strict A1 dictionary compliance.`);
      allAuditedTasks[subRule.id] = validTasks;

      if (isWrite && validTasks.length > 0) {
        console.log(`Appending ${validTasks.length} tasks to ${moduleObj.id}...`);
        const ok = appendTasksToModuleFile(moduleObj.id, subRule.id, validTasks);
        if (ok) {
          console.log(`Successfully updated ${moduleObj.id} for sub-rule ${subRule.id}!`);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Generation error for ${subRule.id}:`, msg);
    }
  }

  if (outFilePath) {
    fs.writeFileSync(outFilePath, JSON.stringify(allAuditedTasks, null, 2), 'utf-8');
    console.log(`\nWrote audited tasks to: ${outFilePath}`);
  }

  console.log('\nTask generation session completed.');
}

if (process.argv[1] && process.argv[1].endsWith('expand-tasks.ts')) {
  main().catch((err) => {
    console.error('Fatal CLI error:', err);
    process.exit(1);
  });
}
