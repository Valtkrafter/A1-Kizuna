import type { VocabDrillPrompt, VocabDrillType, VocabCategory } from '../data/masterVocab';
import { CURATED_VOCAB_DRILLS, MASTER_VOCABULARY } from '../data/masterVocab';

const API_URL = 'https://api.deepseek.com/chat/completions';

export function sanitizeJapaneseAudio(text?: string): string {
  if (!text) return '';
  const jaMatch = text.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s、。！？]+)[）)]/);
  if (jaMatch) {
    return jaMatch[1].trim();
  }
  const jaOnly = text.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF、。！？\s]/g, '').trim();
  return jaOnly || text.trim();
}

export interface SandboxEvaluation {
  status: 'correct' | 'minor_mistake' | 'incorrect';
  score: number; // 0 to 100
  correctedSentence: string;
  correction_display?: string;
  audio_text: string;
  naturalAlternativeAudio?: string;
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

  const containsJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(userJapanese);
  const inputScriptType = containsJapanese ? 'Japanese script (Hiragana/Katakana/Kanji)' : 'Romaji (Latin alphabet)';

  const systemPrompt = `You are a strict native Japanese tutor evaluating an A1 learner's written sentence.
Evaluate their input based on:
1. Particle accuracy (は, が, を, に, で, etc.)
2. Correct verb/adjective conjugation
3. Appropriate politeness level (Desu/Masu vs Te-form requests)

Input Script Detection & Response Formatting Rule:
- Always analyze the script used in the learner's input before generating corrections.
- Romaji Rule: If the user writes their answer in Romaji (Latin alphabet), you MUST provide "correction_display" (and "correctedSentence") primarily in Romaji, followed optionally by Japanese script in parentheses.
  - Example output format for Romaji input:
    "Shuumatsu ni issho ni eiga o mimasen ka. (週末に一緒に映画を見ませんか。)"
- Kana/Kanji Rule: If the user writes using Japanese characters (Hiragana, Katakana, Kanji), output "correction_display" and "correctedSentence" in standard Japanese script with normal kanji/kana.
- Maintain the user's chosen writing system across all exercise feedback so beginners are not forced to read Kanji when practicing phonetically.

### Audio / TTS Generation & Output Requirements:
- Ensure every generated correction or natural variant field includes a clean, TTS-ready Japanese string:
  - Provide a dedicated, pure Japanese script field (Hiragana/Kanji without romaji, slashes, or English translations) specifically for the voice synthesizer.
  - Avoid mixing alphabets inside the audio source text (e.g., send \`しゅうまつにいっしょにえいがをみませんか。\` or \`週末に一緒に映画を見ませんか。\` directly to the TTS engine).
- If your UI reads directly from the displayed field:
  - Keep the visible Japanese sentence strictly separate from meta-notes or translations so the TTS trigger does not attempt to read romaji or German words with a Japanese voice profile.
- Format all audio payload outputs as standard UTF-8 text with appropriate punctuation (\`。\`, \`、\`, \`？\`) to enforce natural pauses and pitch intonation in the speech synthesizer.

Respond strictly with valid JSON with this exact schema:
{
  "status": "correct" | "minor_mistake" | "incorrect",
  "score": number, // 0-100
  "correction_display": "Shuumatsu ni issho ni eiga o mimasen ka. (週末に一緒に映画を見ませんか。)",
  "correctedSentence": "visual display sentence matching user's input script",
  "audio_text": "週末に一緒に映画を見ませんか。",
  "naturalAlternative": "A natural everyday native phrasing matching user's script format (optional)",
  "naturalAlternativeAudio": "Clean, pure Japanese script with punctuation for voice synthesis (optional)",
  "particleFeedback": "German commentary on particle usage",
  "politenessFeedback": "German commentary on politeness level",
  "explanationDe": "Clear, concise 2-sentence explanation of the error or validation"
}`;

  const userContent = `Scenario/Instruction: "${promptContext}"
Learner's Input: "${userJapanese}"
Learner's Input Script: ${inputScriptType}
Formatting Requirement: ${
    containsJapanese
      ? 'The learner wrote in Japanese script. Output "correction_display" / "correctedSentence" in standard Japanese script, and "audio_text" in clean Japanese script with appropriate punctuation.'
      : 'The learner wrote in Romaji. You MUST output "correction_display" / "correctedSentence" primarily in Romaji, optionally followed by Japanese script in parentheses e.g. "Shuumatsu ni issho ni eiga o mimasen ka. (週末に一緒に映画を見ませんか。)". Crucially, provide pure Japanese script in "audio_text" (e.g. "週末に一緒に映画を見ませんか。") without any Romaji or translations so the TTS voice engine speaks pure Japanese.'
  }`;

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

  const parsed = JSON.parse(cleanedJson) as SandboxEvaluation & {
    correction_display?: string;
    natural_alternative_audio?: string;
  };

  const display = parsed.correction_display || parsed.correctedSentence || '';
  parsed.correctedSentence = display;
  parsed.correction_display = display;

  // Ensure audio_text is always populated and pure Japanese
  if (!parsed.audio_text || !parsed.audio_text.trim()) {
    const jaMatch = display.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s、。！？]+)[）)]/);
    if (jaMatch) {
      parsed.audio_text = jaMatch[1].trim();
    } else {
      const jaOnly = display.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF、。！？\s]/g, '').trim();
      parsed.audio_text = jaOnly || display;
    }
  }

  const natAudio = parsed.naturalAlternativeAudio || parsed.natural_alternative_audio;
  if (natAudio && natAudio.trim()) {
    parsed.naturalAlternativeAudio = natAudio.trim();
  } else if (parsed.naturalAlternative) {
    const jaMatch = parsed.naturalAlternative.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s、。！？]+)[）)]/);
    if (jaMatch) {
      parsed.naturalAlternativeAudio = jaMatch[1].trim();
    } else {
      const jaOnly = parsed.naturalAlternative.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF、。！？\s]/g, '').trim();
      if (jaOnly) {
        parsed.naturalAlternativeAudio = jaOnly;
      }
    }
  }

  // Normalize status if unexpected
  if (!['correct', 'minor_mistake', 'incorrect'].includes(parsed.status)) {
    parsed.status = parsed.score >= 90 ? 'correct' : parsed.score >= 60 ? 'minor_mistake' : 'incorrect';
  }

  return parsed;
}

export interface FreeSpeechEvaluation {
  mode: 'free_speech';
  score: number;
  correction_display: string;
  audio_text: string;
  casual_display: string;
  casual_audio_text: string;
  teacher_notes: {
    correction_reason: string;
    tip: string;
  };
}

export async function evaluateFreeSpeech(userJapanese: string): Promise<FreeSpeechEvaluation> {
  const apiKey = getActiveApiKey();

  if (!apiKey) {
    throw new Error(
      'DeepSeek API Key nicht konfiguriert. Bitte hinterlege VITE_DEEPSEEK_API_KEY in deiner .env.local oder gib den API-Key direkt im Sandbox-Eingabefeld ein.'
    );
  }

  const containsJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(userJapanese);
  const inputScriptType = containsJapanese ? 'Japanese script (Hiragana/Katakana/Kanji)' : 'Romaji (Latin alphabet)';

  const systemPrompt = `### Mode: Freies Schreiben (Free Writing & Sensei Correction)

**Role & Persona:**
Act as an encouraging, supportive, yet precise Japanese teacher (Sensei). The user can submit any sentence freely without a specific exercise prompt.

**Input Handling:**
- Detect the user's input script (Romaji, Hiragana, or Kanji).
- Always mirror the user's chosen script in the correction:
  - If Romaji: Provide the primary correction in Romaji, with Japanese script in parentheses.
  - If Japanese script: Provide standard Japanese with Furigana/readings.

**Correction & Feedback Structure:**
Respond directly using the following clean layout:

1. **Korrektur / Ideale Fassung (Corrected Sentence):**
   - The grammatically sound, natural version of what the user meant to say.
   - Separate TTS text field: Provide a clean, pure Japanese string (\`audio_text\`) exclusively for the voice synthesizer.

2. **Natürliche Alltagsvariante (Natural Casual / Native Alternative):**
   - How a native speaker would typically say this in everyday conversation.

3. **Sensei Feedback (Kurze Erklärung):**
   - **Fehleranalyse:** Highlight exactly what was corrected (particles like に vs を, typos, word order, or politeness level).
   - **Tipp:** 1–2 short, encouraging sentences explaining the underlying rule in German (or the app's base language) without overwhelming grammar jargon.
   - **Score (0-100):** A fair rating based on communicative clarity and grammar.

### Language Constraint (Strict German Output):
- The entire feedback section (including "Fehleranalyse" and "Tipp") MUST be written 100% in natural German.
- Never explain grammar points, corrections, or rules in English.
- Use German terms for grammar explanations (e.g., "Partikel", "Relativer Zeitbegriff", "Höflichkeitsform").

**German reference examples for your prompt:**
* **Fehleranalyse:** "Entferne die Partikel 'ni' nach 'ashita', da relative Zeitangaben (wie 'morgen') im Japanischen ohne 'ni' stehen. Korrigiere außerdem 'ishouni' zu 'issho ni' und streiche das 'de' danach, weil 'issho ni' als Adverb keine zusätzliche Partikel benötigt."
* **Tipp:** "Merkregel: Wörter wie 'ashita' (morgen), 'kyou' (heute) oder 'kinou' (gestern) stehen immer allein ohne Partikel 'ni'. 'Issho ni' bedeutet 'zusammen' und steht direkt vor dem Verb oder der Person, mit der du etwas unternimmst."

Respond strictly with valid JSON with this exact schema:
{
  "mode": "free_speech",
  "score": 85,
  "correction_display": "Shuumatsu ni issho ni eiga o mimasen ka. (週末に一緒に映画を見ませんか。)",
  "audio_text": "週末に一緒に映画を見ませんか。",
  "casual_display": "Shuumatsu, issho ni eiga minai? (週末、一緒に映画見ない？)",
  "casual_audio_text": "週末、一緒に映画見ない？",
  "teacher_notes": {
    "correction_reason": "Verwende 'issho ni' statt 'ishioni' und den Akkusativ-Partikel 'o' vor dem Verb 'mimasen ka'.",
    "tip": "Bei Einladungen nutzt man die verneinte Höflichkeitsform (-masen ka), um besonders höflich zu fragen."
  }
}`;

  const userContent = `Learner's Input Sentence: "${userJapanese}"
Learner's Input Script: ${inputScriptType}
Formatting Requirement: ${
    containsJapanese
      ? 'The learner wrote in Japanese script. Output "correction_display" and "casual_display" in standard Japanese script with normal kanji/kana, and "audio_text" / "casual_audio_text" in clean pure Japanese script with appropriate punctuation.'
      : 'The learner wrote in Romaji. You MUST output "correction_display" and "casual_display" primarily in Romaji, followed by Japanese script in parentheses e.g. "Shuumatsu ni issho ni eiga o mimasen ka. (週末に一緒に映画を見ませんか。)". Crucially, provide pure Japanese script in "audio_text" and "casual_audio_text" (e.g. "週末に一緒に映画を見ませんか。") without any Romaji or translations so the TTS voice engine speaks pure Japanese.'
  }`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
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

  const cleanedJson = rawContent
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleanedJson) as FreeSpeechEvaluation;

  if (!parsed.audio_text || !parsed.audio_text.trim()) {
    const jaMatch = parsed.correction_display?.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s、。！？]+)[）)]/);
    if (jaMatch) {
      parsed.audio_text = jaMatch[1].trim();
    } else {
      const jaOnly = parsed.correction_display?.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF、。！？\s]/g, '').trim();
      parsed.audio_text = jaOnly || parsed.correction_display || '';
    }
  }

  if (!parsed.casual_audio_text || !parsed.casual_audio_text.trim()) {
    const jaMatch = parsed.casual_display?.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s、。！？]+)[）)]/);
    if (jaMatch) {
      parsed.casual_audio_text = jaMatch[1].trim();
    } else {
      const jaOnly = parsed.casual_display?.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF、。！？\s]/g, '').trim();
      parsed.casual_audio_text = jaOnly || parsed.casual_display || '';
    }
  }

  if (typeof parsed.score !== 'number' || Number.isNaN(parsed.score)) {
    parsed.score = 80;
  }

  parsed.mode = 'free_speech';
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

export interface UniversalEngineResponse {
  mode: 'exercise' | 'free_speech' | 'vocab_trainer';
  drill_type?: 'cloze' | 'translate_phrase' | 'calendar_exception';
  score: number;
  user_input: string;
  target_word?: {
    romaji: string;
    kanji: string;
    german: string;
  };
  correction_display: string;
  audio_text: string;
  casual_display: string;
  casual_audio_text: string;
  teacher_feedback: {
    fehleranalyse: string;
    tipp: string;
  };
  next_prompt?: {
    task_german: string;
    hint: string;
  };
}

export async function evaluateVocabTrainer(
  drill: VocabDrillPrompt,
  userInput: string
): Promise<UniversalEngineResponse> {
  const apiKey = getActiveApiKey();

  if (!apiKey) {
    throw new Error(
      'DeepSeek API Key nicht konfiguriert. Bitte hinterlege VITE_DEEPSEEK_API_KEY in deiner .env.local oder gib den API-Key direkt im Sandbox-Eingabefeld ein.'
    );
  }

  const containsJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(userInput);
  const inputScriptType = containsJapanese ? 'Japanese script (Hiragana/Katakana/Kanji)' : 'Romaji (Latin alphabet)';

  const systemPrompt = `### Kizuna A1 Unified AI Master Engine (Sensei, Free Speech & Vocab Trainer)

You are the intelligent Japanese tutor and drill engine for the "Kizuna A1" learning application. You are evaluating Mode 3: vocab_trainer (Interaktiver Vokabeltrainer).

---

### Core System Rules

1. **Strict Language Rule for Explanations:**
   - ALL explanations, instructions, error breakdowns ("fehleranalyse"), and grammar tips ("tipp") MUST be written 100% in natural German. Never write feedback in English.
   - Use standard German terminology for grammar concepts (e.g., "Partikel", "Höflichkeitsform", "Relativer Zeitbegriff", "Substantiv", "Adverb").

2. **Input Script Matching Rule:**
   - Detect whether the user answers in Romaji or Japanese script (Hiragana/Katakana/Kanji).
   - **User writes in Romaji:** Output corrections, drill targets, and vocabulary primarily in Romaji, followed by Japanese script in parentheses.
     - Example: Kippu o kudasai. (切符をください。)
   - **User writes in Kana/Kanji:** Output corrections and model sentences in standard Japanese script with furigana/normal kanji.
   - Never penalize a student merely for typing in Romaji.

3. **Audio / TTS Stability Rule:**
   - Every single generated exercise, correction, or vocabulary card must include clean, dedicated Japanese audio fields ("audio_text", "casual_audio_text") containing ONLY pure Japanese characters (Kanji/Kana) and standard Japanese punctuation (。, 、, ？).
   - NEVER mix Romaji, German words, slashes, or brackets into the audio_text fields, so that the Text-to-Speech synthesizer plays cleanly without crashing or skipping.

---

### Master Vocabulary & Phrase Database (Kizuna A1)
Use ONLY the official categorized vocabulary and phrases from Kizuna A1:
- 1. Verkehr, Wegbeschreibung & Reisen (eki, kuukou, chikatetsu, basu, takushii, hikouki, jidousha, kenbaiki, kippu, katamichi, oufuku, jiyuuseki, shiteiseki, doko, migi, hidari, mae, ushiro, ue, shita, massugu, kita, minami, higashi, nishi, chikai, tooi, asoko, chizu, kankou suru, ryokou)
- 2. Essen, Trinken & Restaurant (omizu, biiru, osake, maccha, osushi, sakana, niku, tamago, yasai, tenpura, hirugohan, taberu, nomu, resutoran, teeburu, kaikei, arerugii, osusume, gochisousama)
- 3. Orte, Einkaufen & Einrichtungen (mise, konbini, nikuya, bunbouguya, youfukuya, yakkyoku, ginkou, byouin, biyouin, gakkou, eigakan, hakubutsukan, otera, jinja, jimu, toire, ie, ike, kawa, umi, niwa, kaimono suru, kau, chekkuin, yoyaku, shichaku)
- 4. Zeit, Datum & Zahlen (kyou, ashita, asatte, kinou, ototoi, shuumatsu, senshuu, raishuu, maishuu, sengetsu, kongetsu, raigetsu, maitsuki, getsumatsu, kyonen, kotoshi, maitoshi, nenmatsu, mainichi, atode, mazu, taitei, tokidoki, madeni, itsu, jikan; Kalender-Ausnahmen: tsuitachi, futsuka, mikka, yokka, itsuka, nanoka, youka, kokonoka, tooka, juuyokka, hatsuka, nijuuyokka, nannichi)
- 5. Personen, Familie & Länder (watashi no, tomodachi, kare, otoko no ko, haha, otto, tsuma, otouto, sobo, sofubo, kazoku, otousan, ojiisan, goshujin, gakusei, koukousei, daigakusei, kaishain, Chuugoku, chuugokujin, Nihongo, eigo, Igirisu, Ajia, Aruzenchin, Indoneshia, Porutogaru, kurasu)
- 6. Verben & Handlungen (aru, iru, okiru, dekakeru, kayou, sumu, asobu, oyogu, arau, ha o migaku, kaku, hiku, matsu, owaru, shinu, shiraberu, tabako o suu, undou suru, oshaberi suru, issho ni)
- 7. Adjektive, Farben & Objekte (ao, aka, kiiro, kuro, shiro, chairo, midori, murasaki, pinku, naniiro, ookii, semai, hiroi, nagai, mijikai, atsui, samui, takai, yasui, furui, kitanai, kirei, sugoi, subarashii, tsumaranai, warui, shinsetsu, yuumei, ureshii, kanashii, isogashii, hima, suki janai, takusan, chotto, motto, isu, tsukue, tana, mado, te, megane, kusuri, inu, neko, tori, sakura, beddo, kagi, saifu, chiketto, supootsu)
- 8. Grüße & Standardphrasen (hai, douzo, onegai shimasu, arigatou gozaimasu, irimasen, sou desu, sou desu ne, wakarimasen, mou ichido onegai shimasu, sumimasen, sumimasen, chotto, ohayou, ohayou gozaimasu, konnichiwa, konbanwa, oyasumi, jaa mata, ittekimasu, itterasshai, irasshaimase, otsukaresama, onamae wa?, kore wa nan desu ka, akemashite omedetou, otanjoubi omedetou)

Respond strictly with valid JSON with this exact schema:
{
  "mode": "vocab_trainer",
  "drill_type": "${drill.drillType}",
  "score": 85,
  "user_input": "${userInput}",
  "target_word": {
    "romaji": "${drill.targetWord.romaji}",
    "kanji": "${drill.targetWord.kanji}",
    "german": "${drill.targetWord.german}"
  },
  "correction_display": "Kippu o kudasai. (切符をください。)",
  "audio_text": "きっぷをください。",
  "casual_display": "Kippu choudai. (切符ちょうだい。)",
  "casual_audio_text": "きっぷちょうだい。",
  "teacher_feedback": {
    "fehleranalyse": "Hervorragend gebildet! Die Partikel 'o' verbindet das Objekt 'kippu' korrekt mit der Höflichkeitsbitte 'kudasai'.",
    "tipp": "Merkregel: Wenn du an Schaltern oder in Geschäften etwas bestellen möchtest, nutzt du die Formel '[Objekt] o kudasai'."
  },
  "next_prompt": {
    "task_german": "Wie fragst du am Bahnhof nach dem Fahrkartenautomaten?",
    "hint": "Nutze 'kenbaiki' und 'doko desu ka'."
  }
}`;

  const userContent = `Drill Type: ${drill.drillType}
Task (German): "${drill.taskGerman}"
${drill.clozeSentence ? `Cloze Sentence Context: "${drill.clozeSentence}"` : ''}
Hint: "${drill.hint}"
Target Word: ${drill.targetWord.romaji} / ${drill.targetWord.kanji} (${drill.targetWord.german})
Learner's Input: "${userInput}"
Learner's Input Script: ${inputScriptType}
Formatting Requirement: ${
    containsJapanese
      ? 'The learner wrote in Japanese script. Output "correction_display" and "casual_display" in standard Japanese script, and "audio_text" / "casual_audio_text" in clean pure Japanese script with appropriate punctuation.'
      : 'The learner wrote in Romaji. You MUST output "correction_display" and "casual_display" primarily in Romaji, followed by Japanese script in parentheses e.g. "Kippu o kudasai. (切符をください。)". Crucially, provide pure Japanese script in "audio_text" and "casual_audio_text" without any Romaji or translations so the TTS voice engine speaks pure Japanese.'
  }`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
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

  const cleanedJson = rawContent
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleanedJson) as UniversalEngineResponse;

  parsed.mode = 'vocab_trainer';
  parsed.drill_type = drill.drillType;
  parsed.user_input = userInput;
  parsed.target_word = parsed.target_word || drill.targetWord;

  // Sanitize audio fields for pure Japanese speech API
  parsed.audio_text = sanitizeJapaneseAudio(parsed.audio_text || parsed.correction_display);
  parsed.casual_audio_text = sanitizeJapaneseAudio(parsed.casual_audio_text || parsed.casual_display);

  if (typeof parsed.score !== 'number' || Number.isNaN(parsed.score)) {
    parsed.score = 80;
  }

  // Fallback for teacher feedback
  if (!parsed.teacher_feedback) {
    parsed.teacher_feedback = {
      fehleranalyse: 'Antwort wurde ausgewertet.',
      tipp: 'Achte auf die genaue Aussprache und den Kontext der Vokabel.',
    };
  }

  return parsed;
}

export async function generateVocabDrill(
  preferredType?: VocabDrillType | 'all'
): Promise<VocabDrillPrompt> {
  const apiKey = getActiveApiKey();
  const drillType: VocabDrillType =
    !preferredType || preferredType === 'all'
      ? (['cloze', 'translate_phrase', 'calendar_exception'][Math.floor(Math.random() * 3)] as VocabDrillType)
      : preferredType;

  if (!apiKey) {
    const matchingStatic = CURATED_VOCAB_DRILLS.filter((d) => d.drillType === drillType);
    const pool = matchingStatic.length > 0 ? matchingStatic : CURATED_VOCAB_DRILLS;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const categories: VocabCategory[] = drillType === 'calendar_exception' ? ['TIME'] : (Object.keys(MASTER_VOCABULARY) as VocabCategory[]);
  const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryData = MASTER_VOCABULARY[selectedCategory];
  const sampleWords = categoryData.words.slice(0, 8).map((w) => `${w.romaji} (${w.kanji} - ${w.german})`).join(', ');

  const systemPrompt = `You are a Japanese curriculum specialist for Kizuna A1.
Create a SINGLE interactive A1 vocabulary drill of type "${drillType}".
Category: ${categoryData.labelDe}.
Sample authorized vocabulary from this category: ${sampleWords}.
${drillType === 'calendar_exception' ? 'Focus strictly on special calendar day exceptions like tsuitachi (1.), futsuka (2.), mikka (3.), yokka (4.), itsuka (5.), nanoka (7.), youka (8.), kokonoka (9.), tooka (10.), juuyokka (14.), hatsuka (20.), nijuuyokka (24.), nannichi.' : ''}

Respond strictly with valid JSON with this exact schema:
{
  "taskGerman": "German drill instruction (e.g. Fülle die Lücke: ... or Wie sagst du ...)",
  "hint": "Helpful German hint mentioning keywords or particles",
  ${drillType === 'cloze' ? '"clozeSentence": "Sentence with _____ blank",' : ''}
  "targetWord": {
    "romaji": "romaji",
    "kanji": "Kanji / Kana",
    "german": "German meaning"
  }
}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate one fresh ${drillType} drill for category ${selectedCategory}.` },
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) throw new Error('No content returned');

    const cleanedJson = rawContent
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    return {
      id: `drill-ai-${Date.now()}`,
      category: selectedCategory,
      categoryLabel: categoryData.labelDe,
      drillType,
      taskGerman: parsed.taskGerman,
      hint: parsed.hint,
      clozeSentence: parsed.clozeSentence,
      targetWord: {
        romaji: parsed.targetWord?.romaji || 'vokabel',
        kanji: parsed.targetWord?.kanji || '単語',
        german: parsed.targetWord?.german || 'Vokabel',
      },
      isAiGenerated: true,
    };
  } catch {
    // Graceful fallback to curated pool
    const matchingStatic = CURATED_VOCAB_DRILLS.filter((d) => d.drillType === drillType);
    const pool = matchingStatic.length > 0 ? matchingStatic : CURATED_VOCAB_DRILLS;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

