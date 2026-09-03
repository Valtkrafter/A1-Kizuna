# 絆 A1 Kizuna — Japanisch A1 Grammatik-Spickzettel

Ein ruhiger, ablenkungsfreier und interaktiver **Grammatik-Spickzettel** zur Vorbereitung auf den japanischen **A1 Einstufungstest** (Einstufungs- und Universitätsprüfungen). 

Inspiriert vom minimalistischen, aufgeräumten Design von **Busuu**: Keine bunten Arcade-Gimmicks, keine blinkenden Timer — sondern strukturierte Formelkarten, natürliche Beispielsätze mit nativer Sprachausgabe, interaktives Hover-Wörterbuch und 5-Satz-Übungsblöcke (Lückentext & Satzbau-Puzzle).

---

## 🚀 Schnellstart: So lädst du Kizuna herunter und startest es

### 1. Voraussetzungen
Du benötigst lediglich **Node.js** (Version 18 oder neuer) auf deinem Computer.
- Falls du Node.js noch nicht hast, kannst du es hier kostenlos herunterladen: [nodejs.org](https://nodejs.org/)

---

### 2. Projekt herunterladen

Wähle eine der beiden einfachen Methoden:

#### Option A: Mit Git (Empfohlen)
Öffne dein Terminal (oder PowerShell) und führe folgenden Befehl aus:
```bash
git clone https://github.com/Valtkrafter/A1-Kizuna.git
cd A1-Kizuna
```

#### Option B: Als ZIP-Datei herunterladen
1. Klicke oben rechts auf GitHub auf den grünen Button **`Code`** und wähle **`Download ZIP`**.
2. Entpacke die ZIP-Datei in einen beliebigen Ordner auf deinem Computer.
3. Öffne ein Terminal / die PowerShell in diesem entpackten Ordner.

---

### 3. Abhängigkeiten installieren
Führe im Projektordner folgenden Befehl aus:
```bash
npm install
```

---

### 4. Kizuna im Browser starten
Starte den lokalen Entwicklungsserver mit:
```bash
npm run dev
```

Nach wenigen Sekunden siehst du eine Adresse in deinem Terminal (in der Regel `http://localhost:5173`). Klicke auf den Link oder öffne ihn in deinem Browser. Viel Spaß beim Lernen!

---

## 🛠️ Build für die Produktion (Optional)
Möchtest du eine optimierte Produktionsversion erstellen:
```bash
npm run build
npm run preview
```

---

## ✨ Die wichtigsten Features im Überblick

### 1. Interaktive Spickzettel ("Grammatik-Spickzettel")
- **Formel-Kästen:** Jede Regel hat eine klare, einprägsame Formel (z.B. `Verbstamm + ました = Höfliche Vergangenheit`).
- **Beispielsätze mit Audio:** Höre dir jeden Beispielsatz mit einem Klick auf das Lautsprecher-Symbol in nativer japanischer Aussprache an (Web Speech API).
- **Meisterschafts-Tracking ("SO WEIT BIST DU SCHON"):** Visuelle Fortschrittsanzeige mit dynamischer Status-Pill (z.B. *75 % sicher • Stark*).

### 2. Keine störenden Romaji-Klammern (`<HoverKana />`)
- Der Text bleibt zu 100 % sauber in japanischen Schriftzeichen (Kana/Kanji).
- Beim Überfahren mit der Maus (oder Antippen auf dem Smartphone) öffnet sich eine schwebende Infokarte mit:
  - Exakter Romaji-Umschrift
  - Deutscher Übersetzung

### 3. Gezielte 5-Satz-Drills pro Teilregel
Jede grammatikalische Form besitzt ihren eigenen Übungsblock:
- **Lückentexte (Cloze):** Wähle die passende Konjugation oder Partikel aus.
- **Satzbau-Puzzles (Order):** Setze japanische Sätze durch Antippen von Wortchips zusammen.
- **Feedback:** Sofortige Rückmeldung mit genauer grammatikalischer Regelerklärung.
- **Freischaltung:** Bei 4 von 5 oder 5 von 5 richtigen Sätzen wird die Form als gemeistert markiert.

### 4. Tastatursteuerung (Keyboard-First)
- `[1]`, `[2]`, `[3]`, `[4]` : Antwortoption auswählen
- `[Enter]` : Eingabe überprüfen / Zur nächsten Frage wechseln
- `[Space]` : Nach Überprüfung zur nächsten Frage weitergehen

### 5. Heller & Dunkler Modus (Dark Mode)
- Umschalten per Klick auf das Sonnen-/Mond-Symbol oben rechts.
- Optimiert für hohe Kontraste und augenschonendes Lernen am Abend.
- Dein Design- und Lernfortschritt wird automatisch lokal in deinem Browser (`localStorage`) gespeichert.

---

## 📚 Enthaltene Grammatikthemen (A1 Einstufungstest)

1. **Verben: Die masu-Form**
   - Höfliche Gegenwart (`〜ます`)
   - Höfliche Verneinung (`〜ません`)
   - Höfliche Vergangenheit (`〜ました`)
   - Verneinte Vergangenheit (`〜ませんでした`)
2. **A1 Partikeln (助詞)**
   - Akkusativobjekt & Besitz (`を` & `の`)
   - Zeit & Zielort (`に`)
   - Handlungsort & Transportmittel (`で`)
   - Aufzählung & Alternativen (`と`, `か`, `や`, `も`)
3. **Die A1 て-Form**
   - Godan-Lautwandelregeln (`〜って`, `〜んで`, `〜いて`, `〜して`)
   - Sätze chronologisch verknüpfen (`Satz 1 て + Satz 2`)
   - Verlaufsform andauernder Handlungen (`〜ています`)
4. **Adjektive**
   - い- vs. な-Adjektive vor Nomen
   - Verneinungsformen (`〜くないです` vs. `〜じゃありません`)
   - Vergangenheitsformen (`〜かったです` vs. `〜でした`)
5. **Existenzverben**
   - `いる / います` für beseelte Lebewesen
   - `ある / あります` für leblose Gegenstände und Dinge

---

## 📄 Lizenz
MIT Lizenz — Freie Nutzung für Lernende und Lehrende.
