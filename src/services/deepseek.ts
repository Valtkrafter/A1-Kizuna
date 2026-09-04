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

export interface DynamicScenario {
  id: string;
  category: string;
  situation: string;
  hint: string;
  isAiGenerated: boolean;
}

export async function generateNewScenario(existingSituations: string[]): Promise<DynamicScenario> {
  const apiKey = getActiveApiKey();
  if (!apiKey) {
    throw new Error(
      'DeepSeek API Key nicht konfiguriert. Bitte hinterlege VITE_DEEPSEEK_API_KEY in .env.local oder trage ihn im Sandbox-Dialog ein.'
    );
  }

  const systemPrompt = `You are a Japanese language curriculum specialist creating real-life A1 communication drill prompts.
Generate a SINGLE practical scenario for an A1 student to translate or answer in polite Japanese.
Rules:
1. Realistic situations: Restaurant orders, asking directions, making appointments, daily routines, weekend reports, invitations.
2. Grammar focus must alternate among:
   - Particles: に, で, を, へ, と, も, から, まで
   - Verb forms: 〜ます, 〜ません, 〜ました, 〜ています, 〜てください
   - Adjectives & Existence: いる vs ある, 〜かったです, 〜じゃないです
3. Return STRICT RAW JSON matching this schema:
{
  "category": "e.g. RESTAURANT & BESTELLEN",
  "situation": "German instruction (e.g. Sage der Bedienung, dass du zwei Bier und eine Schüssel Ramen möchtest.)",
  "hint": "German hint mentioning specific particles and keywords (e.g. Nutze ラーメン, ビール, を und お願いします / ください.)"
}`;

  const userPrompt = `Generate a fresh, unique A1 scenario that has NOT been used yet.
Do not duplicate any of these:
${existingSituations.slice(-10).join('\n')}`;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`DeepSeek API Fehler (${res.status}): ${errorText || res.statusText}`);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) {
    throw new Error('Keine Antwort von der DeepSeek API erhalten.');
  }

  const cleanedJson = rawContent
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleanedJson);

  return {
    id: `sb-ai-${Date.now()}`,
    category: (parsed.category || 'ALLTAG & KOMMUNIKATION').toUpperCase(),
    situation: parsed.situation,
    hint: parsed.hint,
    isAiGenerated: true,
  };
}
