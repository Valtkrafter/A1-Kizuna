# 絆 A1 Kizuna (A1 Einstufungstest Trainer)

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)](https://www.typescriptlang.org/)

A modern, distraction-free Japanese A1 drill trainer modeled after **Busuu** and built specifically for the **Japanese A1 Einstufungstest** syllabus. It combines structured grammar cheat sheets (*Grammatik-Spickzettel*) with bite-sized, 5-sentence active-recall drills (cloze tests and sentence-building puzzles).

Features universal **Romaji & German hover tooltips** (`AutoJapanese`), **neural Japanese text-to-speech audio synthesis**, **dark mode**, and **full mobile support**.

---

## 📱 Features

- **Busuu-Inspired Learning Path:** Structured into 5 core A1 grammar sheets:
  1. **Polite Verb Conjugation (`〜ます`)** — Positive, negative, past, and past-negative forms.
  2. **Core A1 Particles (助詞)** — `を`, `に`, `で`, `と`, `か`, `や`, `も`, `の`.
  3. **The Te-Form (て形)** — Verb groupings (Ichidan, Godan, Irregular) and `〜ています` / sequential actions.
  4. **Adjectives (形容詞)** — い- and な-adjectives, negation, and past tense.
  5. **Existence Verbs** — `ある` (inanimate) vs. `いる` (animate) and location markers.
- **Universal Interactive Tooltips (`AutoJapanese`):** Hover (desktop) or tap (mobile) over *any* Japanese word in prompts, options, or German grammar explanations to instantly see its Romaji reading and German definition without screen clutter.
- **Natural Japanese Audio:** Integrated neural speech engine with working speaker buttons (`0.88x` beginner cadence).
- **Dual Exercise Modes:**
  - **Lückentext (Cloze):** Fill the blank with the grammatically correct particle or verb inflection.
  - **Satzbau-Puzzle (Sentence Builder):** Reorder scrambled word chips to form natural Japanese sentences.
- **Keyboard & Touch First:** Full keyboard control (`[1-4]`, `[Enter]`, `[Space]`, `[R]`) on desktop, seamless touch tap-to-select and tap-to-place on mobile.
- **Light & Dark Theme:** System-aware with manual toggle and instant persistence.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 + Lucide React icons
- **Motion:** Framer Motion
- **State & Persistence:** React State + `localStorage` (Theme, progress, sound settings)
- **Audio:** Web Speech API (`SpeechSynthesis`) with natural Japanese voice detection

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your computer:

- **[Node.js](https://nodejs.org/)** (v18.0.0 or higher, v20+ recommended)
- **npm** (comes bundled with Node.js) or **pnpm** / **yarn**
- **[Git](https://git-scm.com/)**

Verify installations by opening a terminal:
```bash
node -v
npm -v
git --version
```

---

## 🚀 Desktop Setup & Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Valtkrafter/A1-Kizuna.git
cd A1-Kizuna
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
To preview the built production bundle locally:
```bash
npm run preview
```

---

## 📲 Mobile Setup Guide (Run & Test on Smartphone / Tablet)

You can run A1 Kizuna on your phone in two ways: **over your local Wi-Fi network** (for development/instant testing) or via a **free cloud deployment** (for permanent access anywhere).

### Method 1: Local Wi-Fi Network Access (Fastest)

Both your computer and mobile device must be connected to the **same Wi-Fi network**.

#### Step 1: Start Vite with Host Exposing
Run the dedicated host command:
```bash
npm run dev:host
```
*(Alternatively: `npm run dev -- --host`)*

Vite will display two URLs in the terminal:
```text
  VITE v6.x.x  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.125:5173/
```

#### Step 2: Open the URL on Your Mobile Browser
1. Grab the **Network** IP address shown in your terminal (e.g., `http://192.168.1.125:5173`).
2. Open **Safari** (iOS) or **Chrome** (Android) on your mobile device.
3. Type the address into the search bar and press enter.

> **Troubleshooting Firewall (Windows):**
> If your mobile phone cannot load the page, Windows Defender Firewall may be blocking incoming connections to port 5173.
> - Run PowerShell as Administrator and allow port 5173:
>   ```powershell
>   New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
>   ```
> - Ensure your Wi-Fi network connection type is set to **Private Network** in Windows Settings.

---

### Method 2: Add to Home Screen (Standalone App / PWA Feel)

Once opened in your mobile browser, you can install A1 Kizuna directly to your home screen so it opens like a native app without browser navigation bars.

#### On iPhone / iPad (iOS Safari):
1. In Safari, tap the **Share** button (the square icon with an upward arrow at the bottom).
2. Scroll down and tap **"Add to Home Screen"** (*Zum Home-Bildschirm*).
3. Confirm the name **A1 Kizuna** and tap **Add**.
4. The **絆** icon will now appear on your home screen and open in full-screen standalone mode.

#### On Android (Google Chrome):
1. In Chrome, tap the **three vertical dots (⋮)** in the top-right corner.
2. Tap **"Install app"** or **"Add to Home screen"** (*Zum Startbildschirm hinzufügen*).
3. Tap **Install** to confirm.
4. Launch the app directly from your home screen or app drawer.

---

### Method 3: 1-Click Free Cloud Deployment (Access from Anywhere)

To access A1 Kizuna from anywhere without needing your PC running:

#### Deploy with Vercel (Recommended):
1. Push your code to your GitHub account: `https://github.com/Valtkrafter/A1-Kizuna`.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New..."** > **"Project"**.
4. Import `A1-Kizuna`.
5. Keep default settings (Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`).
6. Click **Deploy**. In under a minute, you get a live `https://a1-kizuna.vercel.app` URL for your mobile device!

---

## 👆 Mobile Touch Controls & UX

- **Interactive Tooltip Tap:** On mobile, tap any Japanese word (underlined with a subtle dotted line) to reveal its Romaji reading and German translation. Tap anywhere outside or tap the word again to dismiss.
- **Boundary-Aware Tooltips:** Tooltips automatically reposition themselves near the left or right screen edges so they never overflow off your smartphone display.
- **Satzbau-Puzzle:** Tap words in the selection pool to move them into the sentence line. Tap placed chips in the sentence line to return them to the pool.
- **Speaker Audio:** Tap the speaker icon next to any Japanese sentence to hear native-cadence pronunciation via your smartphone's built-in Japanese speech synthesizer.

---

## ⌨️ Desktop Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `[1]`, `[2]`, `[3]`, `[4]` | Select Multiple-Choice Option / Focus Chip |
| `[Enter]` or `[Space]` | Check Answer / Advance to Next Question |
| `[R]` | Restart Active Drill / Retry |
| `[Esc]` | Exit Active Drill back to Grammar Sheet |

---

## 📂 Project Structure

```text
A1-Kizuna/
├── index.html                     # HTML entry point with mobile web app meta tags
├── package.json                   # Dependencies, scripts (dev, dev:host, build)
├── vite.config.ts                 # Vite bundler configuration
├── src/
│   ├── main.tsx                   # React root mount
│   ├── App.tsx                    # Root layout, theme sync, active sheet routing
│   ├── types.ts                   # TypeScript interfaces (GrammarSheet, Task, etc.)
│   ├── components/
│   │   ├── Navbar.tsx             # Sheet selector, progress bar, dark mode, audio toggle
│   │   ├── TopicSheetView.tsx     # Busuu-style grammar cheat sheet & accordion rules
│   │   ├── SubRuleDrillRunner.tsx # 5-sentence Cloze & Satzbau-Puzzle runner
│   │   ├── AutoJapanese.tsx       # Universal text parser, boundary tooltips & kana fallback
│   │   └── AudioButton.tsx        # Tactile speech synthesis trigger button
│   ├── data/
│   │   ├── grammarSheets.ts       # 5 core A1 grammar sheets & distinct drill questions
│   │   └── dictionary.ts          # Comprehensive A1 vocabulary & inflection dictionary
│   └── utils/
│       ├── speech.ts              # Japanese Web Speech API engine
│       ├── sound.ts               # Synthesized Web Audio UI sound effects
│       └── storage.ts             # LocalStorage state management
```

---

## 📄 License

MIT License. Free to use, adapt, and study for your Japanese learning journey! 🌸

