import { getActiveApiKey } from './deepseek';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export interface AiKanjiAnalysis {
  word: string;
  romaji: string;
  literalMeaning: string;
  breakdown: { character: string; meaning: string }[];
  nuanceDe: string;
  jlptLevel: 'N5' | 'N4' | 'A1 Basic';
}

const CACHE_KEY = 'kizuna_ai_dict_cache';

export function getCachedAnalysis(word: string): AiKanjiAnalysis | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    return cache[word] || null;
  } catch {
    return null;
  }
}

export function setCachedAnalysis(word: string, data: AiKanjiAnalysis): void {
  try {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(CACHE_KEY) || '{}';
    const cache = JSON.parse(raw);
    cache[word] = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('LocalStorage Cache failed', e);
  }
}

export async function fetchAiWordDetails(
  word: string,
  contextSentence?: string
): Promise<AiKanjiAnalysis> {
  const cleanWord = word.replace(/[〜~「」()（）*]/g, '').trim();
  const lookupWord = cleanWord || word;

  const cached = getCachedAnalysis(lookupWord);
  if (cached) return cached;

  const apiKey = getActiveApiKey();
  if (!apiKey) {
    throw new Error(
      'DeepSeek API-Key fehlt. Bitte hinterlege VITE_DEEPSEEK_API_KEY in .env.local oder trage den Key im KI-Sandbox-Dialog ein.'
    );
  }

  const systemPrompt = `You are an expert Japanese linguist for German learners of JLPT N5/A1 level.
Provide an in-depth breakdown of the requested Japanese word/compound.
Always respond in RAW JSON using this exact schema:
{
  "word": "${lookupWord}",
  "romaji": "romaji reading",
  "literalMeaning": "deutsche Hauptbedeutung",
  "breakdown": [
    {"character": "Einzel-Kanji", "meaning": "Deutsche Bedeutung der Wurzel"}
  ],
  "nuanceDe": "1-2 präzise Sätze zur sprachlichen Nuance, Höflichkeit oder Verwendung",
  "jlptLevel": "N5"
}`;

  const userPrompt = `Wort: "${lookupWord}"${
    contextSentence ? `\nIm Satzkontext: "${contextSentence}"` : ''
  }`;

  const res = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.1,
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

  const parsed = JSON.parse(cleanedJson) as AiKanjiAnalysis;
  setCachedAnalysis(lookupWord, parsed);
  return parsed;
}
