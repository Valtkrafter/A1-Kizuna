# AGENT.md - System Rules & Architecture Guide for A1 Kizuna

This document defines the strict engineering standards, design system rules, and curriculum specifications for the **A1 Kizuna** Japanese learning platform. All AI agents, contributors, and maintainers must strictly enforce these guidelines.

---

## 1. Design System: Anti-AI Vibecoding Standards

To ensure a focused, professional, and accessible learning environment, the user interface adheres to strict neutral styling without decorative AI-generated clichés.

- **Color Palette (Slate Theme):**
  - Dark Mode Background / Deep Neutral: Slate 950 (`#020617`), Slate 900 (`#0F172A`)
  - Light Mode Background / Clean Neutral: Slate 50 (`#F8FAFC`), Slate 100 (`#F1F5F9`)
  - Borders & Dividers: Slate 200 (`#E2E8F0`) / Slate 800 (`#1E293B`)
  - Interactive Accent: Blue 600 (`#2563EB`) / Sky 400 (`#38BDF8`) for focus rings and selection
  - Feedback States: Emerald 600 (`#16A34A`) for success, Rose 600 (`#E11D48`) for errors
- **Prohibited Patterns:**
  - **No Gradients:** Never use decorative color gradients (`bg-gradient-to-*`). All backgrounds must be solid, crisp neutral fills.
  - **No Backdrop Blur:** Do not use `backdrop-blur-*` or frosted glass effects.
  - **No Emojis in Headers:** Headers (`<h1>`–`<h6>`), section badges, and metric titles must never contain decorative emojis. Emojis distract from Japanese orthography.
  - **8-Point Spacing Grid:** Margins, paddings, and component dimensions adhere to multiples of 4px / 8px (`p-2`, `p-4`, `p-6`, `gap-2`, `gap-4`).

---

## 2. Tokenization & Dictionary Architecture

Accurate Japanese segmentation and non-spoiling hover tooltips are foundational to the learning experience.

- **Particle Boundary Isolation:**
  - Particles (`を`, `に`, `で`, `は`, `が`, `の`, `と`, `も`, `か`, `や`, `へ`) must never fuse with preceding nouns (e.g. `顔` + `を`, `本` + `を`, `公園` + `で`).
  - The tokenizer (`src/utils/tokenizer.ts`) uses longest-match-first lookup followed by explicit particle boundary checks.
- **Root Kanji Fallbacks & Spoiler Prevention:**
  - Individual Kanji entries (e.g., `顔`, `食`, `飲`, `見`, `行`, `話`, `読`) must exist in `src/data/dictionary.ts`.
  - Distractor options in multiple-choice quizzes must receive the exact same dotted underline (`underline decoration-dotted decoration-slate-400`) as correct options. Quiz answer indicators must never be revealed through differential styling.
- **Tooltip Rendering:**
  - Tooltips (`HoverWord`, `HoverKana`) must render with `z-[9999]`, `pointer-events-none`, and `whitespace-nowrap`.
  - Parent containers must feature `overflow-visible` so tooltips never clip behind card or dialog boundaries.
  - Viewport boundary awareness: Tooltips calculate bounding rectangles and shift alignment (`left`, `center`, `right`) to avoid clipping at screen edges.

---

## 3. Audio Engine (`ja-JP` Web Speech API)

Auditory feedback is integrated throughout vocabulary cards, example sentences, and quiz prompts.

- **Native Voice Selection:**
  - Voice queries prioritize natural and neural Japanese voices (`ja-JP`, `ja`, `Google 日本語`, `Microsoft Nanami/Keita Online`).
  - Playback cadence is set to `rate = 0.88` to provide clear, comprehensible pronunciation for beginners.
- **Text Sanitization:**
  - Synthesis text is stripped of cloze placeholders (`_____`), bracketed hints (`[Ort]`, `[Ziel]`), and markdown formatting before passing to `SpeechSynthesisUtterance`.
- **Visual Feedback:**
  - The `<AudioButton />` component triggers an active pulsing state (`animate-pulse`) while audio is playing to visually reassure users.

---

## 4. Randomization & Task Dynamics

To prevent rote memorization and encourage grammatical mastery:

- **Fisher-Yates Shuffling:**
  - Multiple-choice options are shuffled using an unbiased Knuth/Fisher-Yates shuffle algorithm (`src/utils/shuffle.ts`) whenever a task is initialized or re-run.
  - Keyboard shortcuts `[1]`–`[4]` dynamically map to the shuffled option positions.
- **Scrambled Word-Order Chips (`getScrambledChips`):**
  - Sentence-building puzzle chips are scrambled with a guarantee that they never initialize in the solved order.
- **Dynamic Task Slice:**
  - Each sub-rule contains an expanded pool of 8–10 distinct tasks.
  - A drill session selects 5 randomized tasks from this pool per session (`startSubRuleSession`), ensuring variety on repeated runs.
- **Separation of Concerns:**
  - Sentences used as examples on the Spickzettel cheat-sheet must never be duplicated in the active quiz/drill question pool.

---

## 5. Alltags-Box ("Wofür & Wann?" - `RealLifeCard`)

Every sub-rule includes a real-life contextual card (`RealLifeCard.tsx`) explaining:
- `badge`: Cultural or conversational context tag (e.g. `HOEFLICHKEIT`, `RESTAURANT`, `ALLTAG`).
- `why`: Concise situational reason for learning this specific grammar point.
- `when`: Concrete bullet points of real-world use cases.
- `signalWords`: Associated triggers or companion phrases.
- `quickTip`: Memorable heuristic, bridge, or rule-of-thumb.
- **Universal Tooltips:** All text properties in `RealLifeCard` (`why`, `when`, `signalWords`, `quickTip`) are wrapped in `<AutoJapanese />` to allow seamless hover lookup for any embedded Japanese terms.

---

## 6. Linear Progression & State Management

- **Linear Unlocking:**
  - Module 1 (`mod-1`) is unlocked by default.
  - Module $N$ unlocks if and only if Module $N-1$ is 100% completed (all sub-rules passed with $\ge 80\%$ score).
- **Persistent Storage:**
  - Progress (`passedSubRuleIds`, theme mode, sound preference) is persisted in `localStorage` under `kizuna_progress_v2` and `kizuna_theme`.
  - A dedicated reset button in the navigation bar allows clearing progress with user confirmation.

---

## 7. Git Version Control & Deployment Policy: Mandatory Commit & Push

- **Continuous Commit & Push:**
  - Every time work, bug fixes, or features are implemented or adjusted, all changes must be committed and pushed immediately to remote (`origin/main`).
  - Never leave uncommitted or unpushed changes at the end of a session or task completion.
- **Pre-Commit Verification:**
  - Run `npm run lint` (`oxlint`) and `npm run build` (`tsc -b && vite build`) to ensure 0 errors and 0 warnings before committing.
  - Write clear, descriptive commit messages describing the changes made.
- **Immediate Remote Push:**
  - Always run `git push` right after committing to ensure the remote repository is always up to date.

---

## Implementation Status & Audit Log

- **Last Audit Date:** 2026-09-05
- **Current Curriculum Version:** 1.0 (Modules 1–13 / Lessons 1–23)
- **Verified Subsystems:**
  - [x] Neutral Slate UI tokens enforced (Gradients & blur removed)
  - [x] Particle boundary isolation & single-Kanji dictionary fallbacks active
  - [x] Quiz option spoiler bug resolved (uniform dotted underlines)
  - [x] Fisher-Yates shuffling on multiple-choice options & scrambled puzzle chips
  - [x] Separation between Spickzettel examples and task pools (8–10 items per sub-rule)
  - [x] Native Web Speech API (`ja-JP`) with active pulse indicator
  - [x] Universal `<AutoJapanese/>` wrapping across all explanation cards & Alltags-Boxes
  - [x] Linear progression tracking stored in `localStorage`
