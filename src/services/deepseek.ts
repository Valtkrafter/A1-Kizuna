const API_URL = 'https://api.deepseek.com/chat/completions';

export interface SandboxEvaluation {
  status: 'correct' | 'minor_mistake' | 'incorrect';
  score: number; // 0 to 100
  correctedSentence: string;
  particleFeedback: string;
  politenessFeedback: string;
  explanationDe: string;
  naturalAlternative?: string;
}

export function getActiveApiKey(): string {
  let envKey = '';
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      envKey = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
    }
  } catch {
    // ignore
  }

  if (!envKey) {
    const globalProcess = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
    if (globalProcess?.env) {
      envKey = globalProcess.env.VITE_DEEPSEEK_API_KEY || globalProcess.env.DEEPSEEK_API_KEY || '';
    }
  }

  if (envKey && envKey !== 'your_deepseek_api_key_here') {
    return envKey;
  }
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('kizuna_deepseek_key');
    if (localKey && localKey.trim()) {
      return localKey.trim();
    }
  }
  return '';
}

export function saveLocalApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('kizuna_deepseek_key', key.trim());
    } else {
      localStorage.removeItem('kizuna_deepseek_key');
    }
  }
}

export async function evaluateSandboxSentence(
  promptContext: string,
  userJapanese: string
): Promise<SandboxEvaluation> {
  const apiKey = getActiveApiKey();

  if (!apiKey) {
    throw new Error(
      'DeepSeek API Key nicht konfiguriert. Bitte hinterlege VITE_DEEPSEEK_API_KEY in deiner .env.local oder gib den API-Key direkt im Sandbox-Eingabefeld ein.'
    );
  }

  const systemPrompt = `You are a strict native Japanese tutor evaluating an A1 learner's written sentence.
Evaluate their input based on:
1. Particle accuracy (は, が, を, に, で, etc.)
2. Correct verb/adjective conjugation
3. Appropriate politeness level (Desu/Masu vs Te-form requests)

Respond strictly with valid JSON with this exact schema:
{
  "status": "correct" | "minor_mistake" | "incorrect",
  "score": number, // 0-100
  "correctedSentence": "clean Japanese sentence",
  "particleFeedback": "German commentary on particle usage",
  "politenessFeedback": "German commentary on politeness level",
  "explanationDe": "Clear, concise 2-sentence explanation of the error or validation",
  "naturalAlternative": "A natural everyday native phrasing (optional)"
}`;

  const userContent = `Scenario/Instruction: "${promptContext}"
Learner's Input: "${userJapanese}"`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API Fehler (${response.status}): ${errorText || response.statusText}`);
  }

  const result = await response.json();
  const rawContent = result.choices?.[0]?.message?.content;
  if (!rawContent) {
    throw new Error('Keine Antwort von der DeepSeek API erhalten.');
  }

  // Remove potential markdown fences
  const cleanedJson = rawContent
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleanedJson) as SandboxEvaluation;

  // Normalize status if unexpected
  if (!['correct', 'minor_mistake', 'incorrect'].includes(parsed.status)) {
    parsed.status = parsed.score >= 90 ? 'correct' : parsed.score >= 60 ? 'minor_mistake' : 'incorrect';
  }

  return parsed;
}
