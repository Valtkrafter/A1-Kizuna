import type { GrammarTopicSheet } from '../types';

export const GRAMMAR_SHEETS: GrammarTopicSheet[] = [
  // ==========================================================================
  // SHEET 1: VERBEN: DIE MASU-FORM (VERGANGENHEIT & GEGENWART)
  // ==========================================================================
  {
    id: 'sheet-masu',
    title: 'Die masu-Form (Vergangenheit & Gegenwart)',
    description: 'Das höfliche Verbsystem: Gegenwart, Verneinung und Vergangenheit',
    category: 'Verben',
    subRules: [
      {
        id: 'sub-masu-pres',
        title: '1. Höfliche Gegenwart (~ます)',
        explanation: 'Die Endung **〜ます** drückt höfliche Handlungen in der **Gegenwart oder Zukunft** aus. Bei **Ichidan-Verben** entfällt das *る* (食べる → 食べます). Bei **Godan-Verben** wechselt der Endvokal zur *i-Reihe* (書く → 書きます, 話す → 話します).',
        formula: 'Verbstamm + ます = Höfliche Gegenwart / Zukunft',
        realLifeContext: {
                  badge: "Routinen & Pläne",
                  why: "Deine Standardform für höflichen Smalltalk über deinen Alltag und Zukunftspläne.",
                  when: [
                            "Tagesablauf erzählen: 'Ich trinke jeden Morgen Kaffee und lerne Japanisch.'",
                            "Zukunftspläne: 'Morgen gehe ich ins Kino.'",
                            "Zusagen machen: 'Ja, das mache ich gerne.'"
                  ],
                  signalWords: [
                            "毎日 (jeden Tag)",
                            "毎朝 (jeden Morgen)",
                            "明日 (morgen)"
                  ],
                  quickTip: "Kombiniert das englische 'Present Simple' (Routinen) UND 'Will-Future' (Pläne) in einem einzigen Verb!"
        },
        examples: [
          {
            japanese: '毎朝 パンを 食べます。',
            romaji: 'Maiasa pan o tabemasu.',
            german: 'Ich esse jeden Morgen Brot.',
          },
          {
            japanese: '日本語を 勉強します。',
            romaji: 'Nihongo o benkyou shimasu.',
            german: 'Ich lerne Japanisch.',
          },
          {
            japanese: '手紙を 書きます。',
            romaji: 'Tegami o kakimasu.',
            german: 'Ich schreibe einen Brief.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '夜、レストランで魚を ___。',
            translation: 'Abends esse ich im Restaurant Fisch.',
            options: ['食べます', '食べります', '食べす', '食べるます'],
            correctAnswer: '食べます',
            explanation: '食べる ist ein Ichidan-Verb: る entfällt vor ます → 食べます.',
          },
          {
            type: 'cloze',
            prompt: 'ノートに漢字を ___。',
            translation: 'Ich schreibe Kanji ins Notizheft.',
            options: ['書きます', '書くます', '書きります', '書けます'],
            correctAnswer: '書きます',
            explanation: 'Godan auf く wechselt zur i-Reihe (く → き) vor ます: 書きます.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich trinke jeden Tag Wasser.',
            orderChips: ['毎日', '水を', '飲みます'],
            correctAnswer: '毎日 水を 飲みます',
            explanation: '飲む wechselt zu 飲みます (Godan む → み).',
          },
          {
            type: 'cloze',
            prompt: '明日、京都へ ___。',
            translation: 'Morgen fahre ich nach Kyoto.',
            options: ['行きます', '行くます', '行きります', '行きまする'],
            correctAnswer: '行きます',
            explanation: '行く wechselt zu 行きます (く → き).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Herr Tanaka spricht Deutsch.',
            orderChips: ['田中さんは', 'ドイツ語を', '話します'],
            correctAnswer: '田中さんは ドイツ語を 話します',
            explanation: '話す wechselt zu 話します (す → し).',
          },
        ],
      },
      {
        id: 'sub-masu-neg',
        title: '2. Höfliche Verneinung (~ません)',
        explanation: 'Um ein Verb in der Gegenwart höflich zu verneinen, ersetzt man *〜ます* durch **〜ません**. Es bedeutet **"tut nicht"** oder **"wird nicht tun"**.',
        formula: 'Verbstamm + ません = Höfliche Verneinung (Präsens/Futur)',
        realLifeContext: {
                  badge: "Höflich Ablehnen & Diäten",
                  why: "Um höflich \"Nein danke\" zu sagen, Unverträglichkeiten zu erklären oder Pläne abzusagen.",
                  when: [
                            "Im Restaurant: 'Ich trinke keinen Alkohol / Ich esse kein Fleisch.'",
                            "Einladung ablehnen: 'Heute kann ich leider nicht kommen.'",
                            "Missverständnisse klären: 'Das weiß ich leider nicht.'"
                  ],
                  signalWords: [
                            "あまり (nicht oft / kaum)",
                            "全然 (gar nicht)",
                            "今日 (heute)"
                  ],
                  quickTip: "Wie englisch 'don't / won't': Zeigt höflich Grenzen oder Angewohnheiten."
        },
        examples: [
          {
            japanese: '肉を 食べません。',
            romaji: 'Niku o tabemasen.',
            german: 'Ich esse kein Fleisch.',
          },
          {
            japanese: 'お酒を 飲みません。',
            romaji: 'Osake o nomimasen.',
            german: 'Ich trinke keinen Alkohol.',
          },
          {
            japanese: '明日は 学校へ 行きません。',
            romaji: 'Ashita wa gakkou e ikimasen.',
            german: 'Morgen gehe ich nicht zur Schule.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '私はコーヒーを ___。お茶を飲みます。',
            translation: 'Ich trinke keinen Kaffee. Ich trinke Tee.',
            options: ['飲みません', '飲みます', '飲みました', '飲まないでした'],
            correctAnswer: '飲みません',
            explanation: 'Höfliche Verneinung im Präsens: Stamm 飲み + ません.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich esse heute kein Frühstück.',
            orderChips: ['今日、', '朝ご飯を', '食べません'],
            correctAnswer: '今日、 朝ご飯を 食べません',
            explanation: '食べる im Präsens verneint: 食べません.',
          },
          {
            type: 'cloze',
            prompt: '日曜日は会社へ ___。',
            translation: 'Am Sonntag gehe ich nicht zur Firma.',
            options: ['行きません', '行きます', '行きませんでした', '行くません'],
            correctAnswer: '行きません',
            explanation: 'Zukünftige Handlung verneint: 行きません.',
          },
          {
            type: 'cloze',
            prompt: '英語がまだよく ___。',
            translation: 'Ich verstehe Englisch noch nicht gut.',
            options: ['わかりません', 'わかります', 'わかりました', 'わかるません'],
            correctAnswer: 'わかりません',
            explanation: 'わかる (verstehen) höflich verneint lautet わかりません.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich schaue heute keinen Fernseher.',
            orderChips: ['今日は', 'テレビを', '見ません'],
            correctAnswer: '今日は テレビを 見ません',
            explanation: '見る (Ichidan) verneint: 見ません.',
          },
        ],
      },
      {
        id: 'sub-masu-past',
        title: '3. Höfliche Vergangenheit (~ました)',
        explanation: 'Für abgeschlossene Handlungen in der **Vergangenheit** wird an den Verbstamm **〜ました** gehängt. Das entspricht dem deutschen Perfekt oder Präteritum.',
        formula: 'Verbstamm + ました = Höfliche Vergangenheit (Positiv)',
        realLifeContext: {
                  badge: "Wochenend-Report",
                  why: "Die wichtigste Form, um Freunden zu erzählen, was du am Wochenende oder gestern gemacht hast.",
                  when: [
                            "Montag-Smalltalk: 'Ich habe gestern einen mega Film geschaut.'",
                            "Erledigungen bestätigen: 'Ja, ich habe die Hausaufgaben schon gemacht.'",
                            "Erlebnisse teilen: 'Das Essen war super lecker.'"
                  ],
                  signalWords: [
                            "昨日 (gestern)",
                            "先週 (letzte Woche)",
                            "さっき (vorhin)"
                  ],
                  quickTip: "Exakt wie das englische 'Past Simple' (played, watched, did)."
        },
        examples: [
          {
            japanese: '昨日、映画を 見ました。',
            romaji: 'Kinou, eiga o mimashita.',
            german: 'Gestern habe ich einen Film geschaut.',
          },
          {
            japanese: '図書館で 勉強しました。',
            romaji: 'Toshokan de benkyou shimashita.',
            german: 'Ich habe in der Bibliothek gelernt.',
          },
          {
            japanese: '11時に 寝ました。',
            romaji: 'Juuichiji ni nemashita.',
            german: 'Ich bin um 23 Uhr schlafen gegangen.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '先週、面白い本を ___。',
            translation: 'Letzte Woche habe ich ein interessantes Buch gelesen.',
            options: ['読みました', '読みます', '読みませんでした', '読んだでした'],
            correctAnswer: '読みました',
            explanation: 'Vergangenheit positiv: Verbstamm 読み + ました.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Im Kaufhaus habe ich neue Schuhe gekauft.',
            orderChips: ['デパートで', '新しい靴を', '買いました'],
            correctAnswer: 'デパートで 新しい靴を 買いました',
            explanation: 'Verbstamm 買い + ました = habe gekauft.',
          },
          {
            type: 'cloze',
            prompt: '昨日、喫茶店で紅茶を ___。',
            translation: 'Gestern habe ich im Café schwarzen Tee getrunken.',
            options: ['飲みました', '飲みます', '飲むました', '飲んだでした'],
            correctAnswer: '飲みました',
            explanation: 'Abgeschlossene Handlung in der Vergangenheit: 飲みました.',
          },
          {
            type: 'cloze',
            prompt: '今朝は7時に ___。',
            translation: 'Heute Morgen bin ich um 7 Uhr aufgestanden.',
            options: ['起きました', '起きます', '起きるました', '起きでした'],
            correctAnswer: '起きました',
            explanation: '起きる (aufstehen) in der Vergangenheit: 起きました.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Am Bahnhof habe ich einen Freund getroffen.',
            orderChips: ['駅で', '友達に', '会いました'],
            correctAnswer: '駅で 友達に 会いました',
            explanation: '会う wechselt zu 会いました.',
          },
        ],
      },
      {
        id: 'sub-masu-past-neg',
        title: '4. Verneinte Vergangenheit (~ませんでした)',
        explanation: 'Wenn eine Handlung in der Vergangenheit **nicht stattgefunden** hat, verwendet man **〜ませんでした** am Verbstamm (*"habe nicht getan"*).',
        formula: 'Verbstamm + ませんでした = Höfliche Vergangenheit (Verneint)',
        realLifeContext: {
                  badge: "Entschuldigen & Verpasstes",
                  why: "Um zu erklären, was du gestern oder im Urlaub NICHT tun konntest oder verpasst hast.",
                  when: [
                            "Rechtfertigung & Smalltalk: 'Gestern habe ich leider gar nicht geschlafen.'",
                            "Sparsamkeit beim Einkaufen: 'Im Supermarkt habe ich nichts gekauft.'",
                            "Fehlzeiten erklären: 'Letzte Woche war ich nicht in der Uni.'"
                  ],
                  signalWords: [
                            "昨夜 (gestern Nacht)",
                            "何も (nichts)",
                            "どこへも (nirgendwohin)"
                  ],
                  quickTip: "Wie englisch 'didn't do': Höfliche Berichterstattung über unterbliebene Handlungen."
        },
        examples: [
          {
            japanese: '昨日は 朝ご飯を 食べませんでした。',
            romaji: 'Kinou wa asagohan o tabemasendeshita.',
            german: 'Gestern habe ich nicht gefrühstückt.',
          },
          {
            japanese: '日曜日、どこへも 行きませんでした。',
            romaji: 'Nichiyoubi, doko e mo ikimasendeshita.',
            german: 'Am Sonntag bin ich nirgendwohin gegangen.',
          },
          {
            japanese: '何も 買いませんでした。',
            romaji: 'Nani mo kaimasendeshita.',
            german: 'Ich habe nichts gekauft.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '昨晩は晩ご飯を ___。',
            translation: 'Gestern Abend habe ich nicht zu Abend gegessen.',
            options: ['食べませんでした', '食べました', '食べません', '食べないでした'],
            correctAnswer: '食べませんでした',
            explanation: 'Höfliche Verneinung im Präteritum: 食べ + ませんでした.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Letztes Wochenende bin ich nirgendwohin gereist.',
            orderChips: ['先週末、', '旅行に', '行きませんでした'],
            correctAnswer: '先週末、 旅行に 行きませんでした',
            explanation: 'Reisen verneint in der Vergangenheit: 行きませんでした.',
          },
          {
            type: 'cloze',
            prompt: 'スーパーでお菓子を ___。',
            translation: 'Im Supermarkt habe ich keine Süßigkeiten gekauft.',
            options: ['買いませんでした', '買いました', '買いません', '買わないでした'],
            correctAnswer: '買いませんでした',
            explanation: 'Kaufen in verneinter Vergangenheit: 買いませんでした.',
          },
          {
            type: 'cloze',
            prompt: '昨夜はあまり ___。',
            translation: 'Letzte Nacht habe ich nicht viel geschlafen.',
            options: ['寝ませんでした', '寝ました', '寝ません', '寝るませんでした'],
            correctAnswer: '寝ませんでした',
            explanation: '寝る verneint in der Vergangenheit: 寝ませんでした.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Gestern habe ich nicht gelernt.',
            orderChips: ['昨日は', '日本語を', '勉強しませんでした'],
            correctAnswer: '昨日は 日本語を 勉強しませんでした',
            explanation: 'Verneintes Präteritum von 勉強する: 勉強しませんでした.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // SHEET 2: A1 PARTIKELN (助詞)
  // ==========================================================================
  {
    id: 'sheet-particles',
    title: 'A1 Partikeln (助詞: の, を, も, に, で, と, か, や)',
    description: 'Die wichtigsten Wegweiser im japanischen Satz verstehen und anwenden',
    category: 'Partikeln',
    subRules: [
      {
        id: 'sub-part-o-no',
        title: '1. Objekt & Besitz (を & の)',
        explanation: '**を** kennzeichnet das direkte **Akkusativobjekt** einer Handlung (Brot essen, Tee trinken). **の** verbindet zwei Substantive im Sinne von **Besitz, Herkunft oder Thema** (mein Schirm, deutsches Auto).',
        formula: 'Nomen + を + Verb  |  Nomen A + の + Nomen B',
        realLifeContext: {
                  badge: "Bestellen & Besitz",
                  why: "Um im Restaurant zu bestellen, Handlungen zu steuern und klarzustellen, wem etwas gehört.",
                  when: [
                            "Im Restaurant/Konbini: 'Einen Kaffee bitte' (Kaffee を trinken/kaufen).",
                            "Im Café nach dem Besitzer fragen: 'Wessen Jacke ist das?' (誰の...).",
                            "Dinge und Herkunft beschreiben: 'Das ist mein Buch' (私の本) oder 'japanisches Essen' (日本の料理)."
                  ],
                  signalWords: [
                            "パンを",
                            "水を",
                            "私の (mein)",
                            "日本の (japanisch)"
                  ],
                  quickTip: "Frage dich immer: 'WAS mache ich?' -> を! WEM gehört es? -> の (wie englisch 's / of)!"
        },
        examples: [
          {
            japanese: 'パンを 食べます。',
            romaji: 'Pan o tabemasu.',
            german: 'Ich esse Brot.',
          },
          {
            japanese: 'これは 私の 傘です。',
            romaji: 'Kore wa watashi no kasa desu.',
            german: 'Das ist mein Regenschirm.',
          },
          {
            japanese: '日本語の 本を 読みます。',
            romaji: 'Nihongo no hon o yomimasu.',
            german: 'Ich lese ein Buch über Japanisch.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '夜、リンゴ ___ 食べました。',
            translation: 'Abends habe ich einen Apfel gegessen.',
            options: ['を', 'に', 'で', 'の'],
            correctAnswer: 'を',
            explanation: 'を markiert das direkte Akkusativobjekt beim Essen.',
          },
          {
            type: 'cloze',
            prompt: 'あれは田中さん ___ 鞄です。',
            translation: 'Das dort drüben ist die Tasche von Herrn Tanaka.',
            options: ['の', 'に', 'を', 'は'],
            correctAnswer: 'の',
            explanation: 'の drückt Besitz aus (die Tasche von Herrn Tanaka).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich trinke jeden Morgen Wasser.',
            orderChips: ['毎朝、', '水を', '飲みます'],
            correctAnswer: '毎朝、 水を 飲みます',
            explanation: 'Objekt mit を vor das Prädikat stellen.',
          },
          {
            type: 'cloze',
            prompt: '日本 ___ カメラを買いました。',
            translation: 'Ich habe eine japanische Kamera gekauft.',
            options: ['の', 'に', 'で', 'を'],
            correctAnswer: 'の',
            explanation: 'Herkunftsländer werden mit の an das Folgewort gekoppelt.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Das ist das Wörterbuch des Lehrers.',
            orderChips: ['これは', '先生の', '辞書です'],
            correctAnswer: 'これは 先生の 辞書です',
            explanation: '先生の辞書 = Wörterbuch des Lehrers.',
          },
        ],
      },
      {
        id: 'sub-part-ni',
        title: '2. Zeit & Zielort (に)',
        explanation: '**に** markiert **exakte Zeitpunkte mit Ziffern** (um 7 Uhr, am Sonntag) sowie das **Ziel einer Fortbewegung** bei Verben wie *行く, 来る, 帰る* (nach Tokio, nach Hause). Auch die Zielperson bei *会う* steht mit に.',
        formula: 'Uhrzeit/Tag + に  |  Zielort + に + 行く/来る/帰る',
        realLifeContext: {
                  badge: "Treffen & Uhrzeiten",
                  why: "Für Verabredungen, Zeitpunkte und dein Navigationsziel.",
                  when: [
                            "Uhrzeit & Tag festlegen: 'Lass uns um 7 Uhr / am Sonntag treffen.'",
                            "Fahrtziel nennen: 'Ich fahre nach Tokio / zum Bahnhof.'",
                            "Personen treffen: 'Ich treffe mich mit meiner Freundin (友達に会います).'"
                  ],
                  signalWords: [
                            "7時に (um 7 Uhr)",
                            "日曜日 (Sonntag)",
                            "駅に (zum Bahnhof)"
                  ],
                  quickTip: "Wie 'at' und 'to' im Englischen: Ein fester Punkt in Zeit oder Raum."
        },
        examples: [
          {
            japanese: '7時に 起きます。',
            romaji: 'Shichiji ni okimasu.',
            german: 'Ich stehe um 7 Uhr auf.',
          },
          {
            japanese: '明日 東京に 行きます。',
            romaji: 'Ashita Toukyou ni ikimasu.',
            german: 'Morgen fahre ich nach Tokio.',
          },
          {
            japanese: '友達に 会います。',
            romaji: 'Tomodachi ni aimasu.',
            german: 'Ich treffe mich mit einem Freund.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '会議は9時半 ___ 始まります。',
            translation: 'Die Besprechung beginnt um 9:30 Uhr.',
            options: ['に', 'で', 'を', 'へ'],
            correctAnswer: 'に',
            explanation: 'Exakte Uhrzeiten mit Zahlen verlangen immer に.',
          },
          {
            type: 'cloze',
            prompt: '来週、京都 ___ 行きます。',
            translation: 'Nächste Woche fahre ich nach Kyoto.',
            options: ['に', 'で', 'を', 'の'],
            correctAnswer: 'に',
            explanation: 'に markiert das Ziel einer Fortbewegung mit 行く.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Am Bahnhof habe ich den Arzt getroffen.',
            orderChips: ['駅で', '医者に', '会いました'],
            correctAnswer: '駅で 医者に 会いました',
            explanation: 'Zielperson bei 会う steht mit に.',
          },
          {
            type: 'cloze',
            prompt: '午後6時にうち ___ 帰ります。',
            translation: 'Um 18 Uhr kehre ich nach Hause zurück.',
            options: ['に', 'で', 'を', 'から'],
            correctAnswer: 'に',
            explanation: 'Zielort der Heimkehr (うち) verlangt に.',
          },
          {
            type: 'cloze',
            prompt: '今晩 ___ テレビを見ます。',
            translation: 'Heute Abend schaue ich fern (relatives Zeitwort).',
            options: ['(keine Partikel)', 'に', 'で', 'を'],
            correctAnswer: '(keine Partikel)',
            explanation: 'Relative Zeitbegriffe wie 今日 oder 今晩 stehen ohne に.',
          },
        ],
      },
      {
        id: 'sub-part-de',
        title: '3. Handlungsort & Mittel/Werkzeug (で)',
        explanation: '**で** kennzeichnet den **Ort einer dynamischen Aktion** (in der Bibliothek lernen, im Restaurant essen) sowie das **Werkzeug, Transportmittel oder die Sprache** (mit Stäbchen essen, mit dem Bus fahren, auf Japanisch sprechen).',
        formula: 'Ort + で + Handlung  |  Mittel / Verkehr + で',
        realLifeContext: {
                  badge: "Action & Fortbewegung",
                  why: "Um zu erklären, WO die Action abgeht oder WOMIT du dorthin kommst.",
                  when: [
                            "Treffpunkt für Aktivitäten: 'Lass uns IM Restaurant essen' (nicht nur dort sein, sondern essen!).",
                            "Unterwegs sein: 'Ich fahre mit dem Bus / Zug (バスで).'",
                            "Tools benutzen: 'Ich esse mit Stäbchen / schreibe mit Kuli (ペンで).'"
                  ],
                  signalWords: [
                            "レストランで (im Restaurant)",
                            "バスで (mit dem Bus)",
                            "箸で (mit Stäbchen)"
                  ],
                  quickTip: "で = Werkzeug oder Bühne! Wenn etwas AKTIVES passiert (essen, lernen), nimm で."
        },
        examples: [
          {
            japanese: '図書館で 勉強します。',
            romaji: 'Toshokan de benkyou shimasu.',
            german: 'Ich lerne in der Bibliothek.',
          },
          {
            japanese: '箸で ご飯を 食べます。',
            romaji: 'Hashi de gohan o tabemasu.',
            german: 'Ich esse Reis mit Stäbchen.',
          },
          {
            japanese: '地下鉄で 大学へ 行きます。',
            romaji: 'Chikatetsu de daigaku e ikimasu.',
            german: 'Ich fahre mit der U-Bahn zur Universität.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: 'スプーン ___ スープを飲みます。',
            translation: 'Ich esse Suppe mit dem Löffel.',
            options: ['で', 'に', 'を', 'と'],
            correctAnswer: 'で',
            explanation: 'で kennzeichnet das Werkzeug/Hilfsmittel (mit dem Löffel).',
          },
          {
            type: 'cloze',
            prompt: '教室 ___ 試験を受けます。',
            translation: 'Im Klassenzimmer lege ich eine Prüfung ab.',
            options: ['で', 'に', 'へ', 'を'],
            correctAnswer: 'で',
            explanation: 'Handlungsort einer dynamischen Aktivität steht mit で.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich fahre mit dem Bus zur Firma.',
            orderChips: ['バスで', '会社へ', '行きます'],
            correctAnswer: 'バスで 会社へ 行きます',
            explanation: 'Transportmittel (Bus) steht mit で.',
          },
          {
            type: 'cloze',
            prompt: '英語 ___ メールを送りました。',
            translation: 'Ich habe eine E-Mail auf Englisch geschickt.',
            options: ['で', 'に', 'を', 'と'],
            correctAnswer: 'で',
            explanation: 'Sprachen als Kommunikationsmittel verlangen で.',
          },
          {
            type: 'cloze',
            prompt: 'スーパー ___ 野菜を買いました。',
            translation: 'Ich habe im Supermarkt Gemüse gekauft.',
            options: ['で', 'に', 'を', 'と'],
            correctAnswer: 'で',
            explanation: 'Einkaufen ist eine Handlung; der Ort wird mit で markiert.',
          },
        ],
      },
      {
        id: 'sub-part-listing',
        title: '4. Aufzählung & Alternative (と, か, や, も)',
        explanation: '**と** zählt vollständig auf ("A und B") oder bedeutet Begleitung ("zusammen mit"). **か** bedeutet "oder". **や** zählt unvollständig auf ("A und B unter anderem"). **も** bedeutet "auch" und ersetzt は/を.',
        formula: 'A と B (und) | A か B (oder) | A や B (u.a.) | Nomen + も (auch)',
        realLifeContext: {
                  badge: "Aufzählen & 'Ich auch'",
                  why: "Um Begleiter zu nennen, Menüs aufzuzählen oder \"Ich auch!\" zu sagen.",
                  when: [
                            "Mit Freunden unterwegs: 'Ich gehe mit Tanaka ins Kino (田中さんと).'",
                            "Im Restaurant bestellen: 'Ich nehme Brot UND Kaffee (パンとコーヒー) / Brot ODER Tee (か).'",
                            "Mit も ('auch'): Wenn dein Kumpel Ramen bestellt: 'Ich nehme AUCH Ramen (ラーメンも).'"
                  ],
                  signalWords: [
                            "私も (ich auch)",
                            "友達と (mit Freund)",
                            "コーヒーかお茶 (Kaffee oder Tee)"
                  ],
                  quickTip: "と = feste Partner/Kumpel ('und/mit'). も = Kumpel-Partikel ('auch'). か = Option ('oder')."
        },
        examples: [
          {
            japanese: 'ペンと ノートが あります。',
            romaji: 'Pen to nooto ga arimasu.',
            german: 'Es gibt einen Stift und ein Notizheft.',
          },
          {
            japanese: 'コーヒーか お茶は いかがですか。',
            romaji: 'Koohii ka ocha wa ikaga desu ka.',
            german: 'Möchten Sie Kaffee oder Tee?',
          },
          {
            japanese: '財布や 鍵などが あります。',
            romaji: 'Saifu ya kagi nado ga arimasu.',
            german: 'In der Tasche sind u.a. Geldbörse und Schlüssel.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '朝ご飯にパン ___ 卵を食べました。',
            translation: 'Zum Frühstück habe ich Brot und ein Ei gegessen.',
            options: ['と', 'か', 'で', 'に'],
            correctAnswer: 'と',
            explanation: 'と dient zur vollständigen Aufzählung ("A und B").',
          },
          {
            type: 'cloze',
            prompt: 'デザートはりんご ___ アイスクリームはいかがですか。',
            translation: 'Möchten Sie als Dessert einen Apfel oder Eiscreme?',
            options: ['か', 'と', 'や', 'も'],
            correctAnswer: 'か',
            explanation: 'か verbindet zwei Alternativen im Sinne von "oder".',
          },
          {
            type: 'cloze',
            prompt: '部屋の中に時計 ___ 本などがあります。',
            translation: 'Im Zimmer befinden sich unter anderem eine Uhr und Bücher.',
            options: ['や', 'と', 'で', 'も'],
            correctAnswer: 'や',
            explanation: 'や dient zur unvollständigen Aufzählung ("unter anderem", oft mit など).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Am Sonntag habe ich mit einem Kollegen Fußball gespielt.',
            orderChips: ['日曜日、', '同僚と', 'サッカーをしました'],
            correctAnswer: '日曜日、 同僚と サッカーをしました',
            explanation: 'Begleitperson mit と markieren (mit einem Kollegen).',
          },
          {
            type: 'cloze',
            prompt: '田中さんは会社員です。スミスさん ___ 会社員です。',
            translation: 'Herr Tanaka ist Angestellter. Herr Smith ist auch Angestellter.',
            options: ['も', 'は', 'が', 'と'],
            correctAnswer: 'も',
            explanation: 'も ersetzt は und bedeutet "auch / ebenfalls".',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // SHEET 3: DIE A1 TE-FORM (て形)
  // ==========================================================================
  {
    id: 'sheet-te-form',
    title: 'Die A1 て-Form (て形)',
    description: 'Lautwandel, Satzverknüpfung und die Verlaufsform (~ています)',
    category: 'Verben',
    subRules: [
      {
        id: 'sub-te-rules',
        title: '1. Godan-Lautwandel der て-Form',
        explanation: 'Die Bildung der て-Form bei Godan-Verben folgt festen Reimregeln: **う・つ・る → って**, **む・ぶ・ぬ → んで**, **く → いて (ぐ → いで)**, **す → して**. Achtung Ausnahme: **行く wird unregelmäßig zu 行って** (nicht 行いて!).',
        formula: 'う/つ/る → って | む/ぶ/ぬ → んで | く → いて | す → して | 行く → 行って',
        realLifeContext: {
                  badge: "Der Grammatik-Schlüssel",
                  why: "Das Schweizer Taschenmesser des Japanischen – ohne die て-Form kannst du weder bitten noch verbinden.",
                  when: [
                            "Höflich um etwas bitten: 'Bitte helfen Sie mir (手伝ってください).'",
                            "Erlaubnis einholen: 'Darf ich hier fotografieren? (〜てもいいですか).'",
                            "Zustände und Verläufe bilden: Die Basis für alle modernen A1-Konstruktionen."
                  ],
                  signalWords: [
                            "〜てください (bitte...)",
                            "〜てもいい (darf...)"
                  ],
                  quickTip: "Merk dir den Rhythmus: 'ichiritte, minbende, kishiite' – wie eine Melodie im Kopf!"
        },
        examples: [
          {
            japanese: '買って (kau -> katte)',
            romaji: 'katte',
            german: 'kaufen (kaufend / und kaufe)',
          },
          {
            japanese: '飲んで (nomu -> nonde)',
            romaji: 'nonde',
            german: 'trinken (trinkend / und trinke)',
          },
          {
            japanese: '行って (iku -> itte)',
            romaji: 'itte',
            german: 'gehen (gehend / und gehe)',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: 'Was ist die て-Form von 待つ (matsu / warten)?',
            translation: 'warten -> ?',
            options: ['待って', '待ちて', '待んで', '待して'],
            correctAnswer: '待って',
            explanation: 'Godan auf う/つ/る wechseln zu 〜って: 待つ → 待って.',
          },
          {
            type: 'cloze',
            prompt: 'Was ist die て-Form von 読む (yomu / lesen)?',
            translation: 'lesen -> ?',
            options: ['読んで', '読みて', '読って', '読いで'],
            correctAnswer: '読んで',
            explanation: 'Godan auf む/ぶ/ぬ wechseln zu 〜んで: 読む → 読んで.',
          },
          {
            type: 'cloze',
            prompt: 'Was ist die て-Form von 書く (kaku / schreiben)?',
            translation: 'schreiben -> ?',
            options: ['書いて', '書って', '書んで', '書して'],
            correctAnswer: '書いて',
            explanation: 'Godan auf く wechseln regelmäßig zu 〜いて: 書く → 書いて.',
          },
          {
            type: 'cloze',
            prompt: 'Was ist die て-Form von 急ぐ (isogu / sich beeilen)?',
            translation: 'sich beeilen -> ?',
            options: ['急いで', '急いて', '急って', '急んで'],
            correctAnswer: '急いで',
            explanation: 'Godan auf ぐ wechseln stimmhaft zu 〜いで: 急ぐ → 急いで.',
          },
          {
            type: 'cloze',
            prompt: 'Was ist die て-Form des Ichidan-Verbs 見る (miru / sehen)?',
            translation: 'sehen -> ?',
            options: ['見て', '見って', '見んで', '見して'],
            correctAnswer: '見て',
            explanation: 'Bei Ichidan-Verben entfällt das る + て: 見る → 見て.',
          },
        ],
      },
      {
        id: 'sub-te-connect',
        title: '2. Handlungen verknüpfen (Satz 1 て + Satz 2)',
        explanation: 'Die て-Form verbindet zwei oder mehr aufeinanderfolgende Aktionen in chronologischer Reihenfolge: **"Ich tat A und dann tat ich B"**.',
        formula: 'Aktion 1 (て-Form)、Aktion 2。',
        realLifeContext: {
                  badge: "Storytelling & Abläufe",
                  why: "Damit du nicht wie ein Kleinkind in Einzelsätzen redest, sondern Handlungen flüssig verbindest.",
                  when: [
                            "Abläufe schildern: 'Ich stehe morgens auf, putze Zähne UND frühstücke.'",
                            "Wegbeschreibungen: 'Biege links ab und gehe geradeaus.'",
                            "Tagesberichte flüssig machen: 'Ich habe Freunde getroffen und Ramen gegessen.'"
                  ],
                  signalWords: [
                            "それから (und danach)",
                            "そして (und)"
                  ],
                  quickTip: "て-Form am Satzende bedeutet 'und dann...' – der Satz geht flüssig weiter!"
        },
        examples: [
          {
            japanese: '朝7時に 起きて、朝ご飯を 食べます。',
            romaji: 'Asa shichiji ni okite, asagohan o tabemasu.',
            german: 'Morgens stehe ich um 7 Uhr auf und frühstücke.',
          },
          {
            japanese: 'シャワーを 浴びて、出かけました。',
            romaji: 'Shawaa o abite, dekakemashita.',
            german: 'Ich habe geduscht und bin dann losgegangen.',
          },
          {
            japanese: '手紙を 書いて、ポストに 入れました。',
            romaji: 'Tegami o kaite, posuto ni iremashita.',
            german: 'Ich habe den Brief geschrieben und eingeworfen.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '顔を ___、歯を磨きます。',
            translation: 'Ich wasche mein Gesicht und putze mir die Zähne.',
            options: ['洗って', '洗いって', '洗いて', '洗んで'],
            correctAnswer: '洗って',
            explanation: '洗う (waschen, Godan) wechselt zu 洗って: Aktionen nacheinander.',
          },
          {
            type: 'cloze',
            prompt: '音楽を ___、本を読みました。',
            translation: 'Ich habe Musik gehört und ein Buch gelesen.',
            options: ['聞いて', '聞きて', '聞いって', '聞いで'],
            correctAnswer: '聞いて',
            explanation: '聞く wechselt zu 聞いて (ku -> ite).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich bin zum Bahnhof gelaufen und in den Zug gestiegen.',
            orderChips: ['駅まで歩いて、', '電車に', '乗りました'],
            correctAnswer: '駅まで歩いて、 電車に 乗りました',
            explanation: '歩く wechselt zu 歩いて: sukzessive Handlungen.',
          },
          {
            type: 'cloze',
            prompt: 'スーパーへ ___、リンゴを買いました。',
            translation: 'Ich bin zum Supermarkt gegangen und habe Äpfel gekauft.',
            options: ['行って', '行いて', '行きまして', '行んで'],
            correctAnswer: '行って',
            explanation: 'Ausnahme 行く wechselt in der Verbindung zu 行って (itte).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Ich habe mich mit Herrn Sato getroffen und Tee getrunken.',
            orderChips: ['佐藤さんに会って、', 'お茶を', '飲みました'],
            correctAnswer: '佐藤さんに会って、 お茶を 飲みました',
            explanation: '会う (Godan) wechselt zu 会って.',
          },
        ],
      },
      {
        id: 'sub-te-prog',
        title: '3. Verlaufsform (~ています)',
        explanation: 'Die Konstruktion **〜ています** beschreibt eine Handlung, die **im aktuellen Moment andauert** (Progressiv, wie englisches *be -ing*) oder einen anhaltenden Zustand (z.B. Beruf oder Wohnort).',
        formula: 'Verb in て-Form + います = Verlaufsform ("tut gerade")',
        realLifeContext: {
                  badge: "Was machst du grad?",
                  why: "Für Live-Statusberichte im Messenger und deinen aktuellen Beruf oder Wohnort.",
                  when: [
                            "Im Chat: 'Was machst du gerade?' – 'Ich lerne gerade für den Test (勉強しています).'",
                            "Wetter draußen beschreiben: 'Schau mal, es regnet gerade (雨が降っています)!'",
                            "Feste Lebenszustände: 'Ich wohne in Tokio / Ich arbeite bei Sony.'"
                  ],
                  signalWords: [
                            "今 (jetzt)",
                            "現在 (zurzeit)"
                  ],
                  quickTip: "Exakt wie das englische Present Continuous: 'be + Verb-ing' (I am learning)!"
        },
        examples: [
          {
            japanese: '今、部屋で 勉強しています。',
            romaji: 'Ima, heya de benkyou shite imasu.',
            german: 'Gerade lerne ich im Zimmer.',
          },
          {
            japanese: 'テレビを 見ています。',
            romaji: 'Terebi o mite imasu.',
            german: 'Ich schaue gerade fern.',
          },
          {
            japanese: '雨が 降っています。',
            romaji: 'Ame ga futte imasu.',
            german: 'Es regnet gerade.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '母は台所で料理を ___。',
            translation: 'Mutter kocht gerade in der Küche.',
            options: ['作っています', '作ります', '作ったいます', '作ってあります'],
            correctAnswer: '作っています',
            explanation: '作る (Godan) → 作って + います = kocht gerade im Moment.',
          },
          {
            type: 'cloze',
            prompt: '子供たちは公園で元気に ___。',
            translation: 'Die Kinder spielen gerade munter im Park.',
            options: ['遊んでいます', '遊びます', '遊んであります', '遊んでいまする'],
            correctAnswer: '遊んでいます',
            explanation: '遊ぶ (Godan auf ぶ) → 遊んで + います = spielen gerade.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Vater liest gerade die Zeitung.',
            orderChips: ['父は', '新聞を', '読んでいます'],
            correctAnswer: '父は 新聞を 読んでいます',
            explanation: '読む wechselt zu 読んでいます = liest gerade.',
          },
          {
            type: 'cloze',
            prompt: '鈴木さんはどこで ___ か。',
            translation: 'Wo arbeitet Frau Suzuki zurzeit?',
            options: ['働いています', '働きます', '働きっています', '働いたいます'],
            correctAnswer: '働いています',
            explanation: 'Berufstätigkeit / Zustand wird mit 働いています ausgedrückt.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Jetzt fahre ich gerade Auto.',
            orderChips: ['今、', '車を', '運転しています'],
            correctAnswer: '今、 車を 運転しています',
            explanation: '運転する in der Verlaufsform: 運転しています.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // SHEET 4: ADJEKTIVE (形容詞)
  // ==========================================================================
  {
    id: 'sheet-adjectives',
    title: 'Adjektive: い- & な-Adjektive',
    description: 'Unterscheidung, Beugung, Verneinung und Vergangenheitsformen',
    category: 'Adjektive',
    subRules: [
      {
        id: 'sub-adj-types',
        title: '1. Adjektivtypen & Nomenbindung',
        explanation: 'Es gibt zwei Klassen: **い-Adjektive** (enden auf い, stehen direkt vor dem Nomen: 高い山) und **な-Adjektive** (brauchen **な** vor dem Nomen: 静かな町). Wichtigste Ausnahmen: **きれい** und **有名** enden auf [i], sind aber **な-Adjektive**!',
        formula: 'い-Adj + Nomen  |  な-Adj + な + Nomen',
        realLifeContext: {
                  badge: "Beschreiben & Schwärmen",
                  why: "Um deiner Umgebung Farbe zu geben: Essen loben, Städte beschreiben und Meinungen äußern.",
                  when: [
                            "Im Restaurant schwärmen: 'Das ist heißer Tee (熱いお茶) / leckeres Essen (おいしい料理)!'",
                            "Reiseziele empfehlen: 'Kyoto ist eine berühmte und lebhafte Stadt (有名な町).'",
                            "Menschen charakterisieren: 'Mein Lehrer ist eine sehr freundliche Person (親切な人).'"
                  ],
                  signalWords: [
                            "とても (sehr)",
                            "有名な (berühmt)",
                            "熱い (heiß)"
                  ],
                  quickTip: "い-Adjektive docken direkt ans Nomen an. な-Adjektive brauchen das Klebeband 'な'!"
        },
        examples: [
          {
            japanese: '富士山は 高い 山です。',
            romaji: 'Fujisan wa takai yama desu.',
            german: 'Der Fuji ist ein hoher Berg.',
          },
          {
            japanese: '京都は 静かな 町です。',
            romaji: 'Kyouto wa shizuka na machi desu.',
            german: 'Kyoto ist eine ruhige Stadt.',
          },
          {
            japanese: 'きれいな 部屋ですね。',
            romaji: 'Kirei na heya desu ne.',
            german: 'Das ist ein sauberes/schönes Zimmer, nicht wahr?',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: 'これはとても ___ お茶です。',
            translation: 'Das ist ein sehr heißer Tee.',
            options: ['熱い', '熱な', '熱く', '熱いの'],
            correctAnswer: '熱い',
            explanation: 'い-Adjektive stehen direkt in der Grundform vor dem Nomen (熱いお茶).',
          },
          {
            type: 'cloze',
            prompt: '東京はとても ___ 町です。',
            translation: 'Tokio ist eine sehr lebhafte Stadt.',
            options: ['にぎやかな', 'にぎやか', 'にぎやかに', 'にぎやかい'],
            correctAnswer: 'にぎやかな',
            explanation: 'な-Adjektive vor Nomen verlangen zwingend das Bindeglied な (にぎやかな町).',
          },
          {
            type: 'cloze',
            prompt: 'Zu welcher Adjektivgruppe gehört 有名 (yuumei / berühmt)?',
            translation: 'berühmt -> ?',
            options: ['な-Adjektiv (有名な)', 'い-Adjektiv', 'Verb', 'Zahlwort'],
            correctAnswer: 'な-Adjektiv (有名な)',
            explanation: 'Achtung Falle: 有名 (yuumei) endet auf [i], ist aber ein な-Adjektiv (有名な人).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Herr Tanaka ist eine freundliche Person.',
            orderChips: ['田中さんは', '親切な', '人です'],
            correctAnswer: '田中さんは 親切な 人です',
            explanation: '親切 ist ein な-Adjektiv und verlangt な vor 人.',
          },
          {
            type: 'cloze',
            prompt: 'このラーメンはとても ___ です。',
            translation: 'Diese Ramen-Nudeln sind sehr lecker (am Satzende).',
            options: ['おいしい', 'おいしく', 'おいしくて', 'おいしいな'],
            correctAnswer: 'おいしい',
            explanation: 'Am Satzende vor です steht das い-Adjektiv in der Grundform.',
          },
        ],
      },
      {
        id: 'sub-adj-neg',
        title: '2. Verneinung von Adjektiven',
        explanation: 'Bei **い-Adjektiven** entfällt das *い* und wird durch **〜くないです** ersetzt (高い → 高くないです). Bei **な-Adjektiven** hängt man **〜じゃありません** an (静か → 静かじゃありません). Ausnahme: **いい (gut) wird zu よくないです**!',
        formula: 'い weg + くないです  |  な-Stamm + じゃありません',
        realLifeContext: {
                  badge: "Kritik & 'Nicht so meins'",
                  why: "Um diplomatisches Feedback zu geben, Preise zu beurteilen oder Wetter zu kommentieren.",
                  when: [
                            "Beim Shoppen: 'Das ist mir nicht zu teuer, das nehme ich (高くないです).'",
                            "Höfliches Urteil: 'Es ist heute gar nicht kalt (寒くないです).'",
                            "Eindruck dämpfen: 'Das Hotel war nicht besonders ruhig (静かじゃありません).'"
                  ],
                  signalWords: [
                            "あまり (nicht sehr)",
                            "全然 (gar nicht)"
                  ],
                  quickTip: "い fliegt raus -> くないです (wie 'isn't hot'). な-Adjektive bekommen じゃありません (wie 'isn't quiet')."
        },
        examples: [
          {
            japanese: 'この靴は 高くないです。',
            romaji: 'Kono kutsu wa takakunai desu.',
            german: 'Diese Schuhe sind nicht teuer.',
          },
          {
            japanese: 'この部屋は きれいじゃありません。',
            romaji: 'Kono heya wa kirei ja arimasen.',
            german: 'Dieses Zimmer ist nicht sauber.',
          },
          {
            japanese: '天気が よくないです。',
            romaji: 'Tenki ga yokunai desu.',
            german: 'Das Wetter ist nicht gut (ii -> yokunai).',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: 'この鞄はあまり ___。',
            translation: 'Diese Tasche ist nicht sehr teuer.',
            options: ['高くないです', '高いじゃないです', '高くないでした', '高いくないです'],
            correctAnswer: '高くないです',
            explanation: 'い-Adjektiv verneinen: い entfällt, + くないです (高くないです).',
          },
          {
            type: 'cloze',
            prompt: 'この図書館は ___。',
            translation: 'Diese Bibliothek ist nicht ruhig.',
            options: ['静かじゃありません', '静かいくないです', '静かくありません', '静かじゃないでした'],
            correctAnswer: '静かじゃありません',
            explanation: '静か ist ein な-Adjektiv → Verneinung: 静かじゃありません.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Heute ist es überhaupt nicht kalt.',
            orderChips: ['今日は', '全然', '寒くないです'],
            correctAnswer: '今日は 全然 寒くないです',
            explanation: '寒い verneint lautet 寒くないです.',
          },
          {
            type: 'cloze',
            prompt: 'Was ist die verneinte Form von いい (gut)?',
            translation: 'gut -> nicht gut',
            options: ['よくないです', 'いいくないです', 'いくないです', 'いいじゃないです'],
            correctAnswer: 'よくないです',
            explanation: 'いい konjugiert unregelmäßig über よい: よい → よくないです.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Dieses Hotel ist überhaupt nicht berühmt.',
            orderChips: ['このホテルは', '有名じゃ', 'ありません'],
            correctAnswer: 'このホテルは 有名じゃ ありません',
            explanation: '有名 ist ein な-Adjektiv im negativen Präsens: 有名じゃありません.',
          },
        ],
      },
      {
        id: 'sub-adj-past',
        title: '3. Vergangenheitsformen von Adjektiven',
        explanation: 'Für die Vergangenheit wird bei **い-Adjektiven** das *い* durch **〜かったです** (positiv) bzw. **〜くなかったです** (negativ) ersetzt. Bei **な-Adjektiven** hängt man **〜でした** bzw. **〜じゃありませんでした** an.',
        formula: 'い-Adj: 〜かったです / 〜くなかったです  |  な-Adj: 〜でした / 〜じゃありませんでした',
        realLifeContext: {
                  badge: "Urlaubs- & Testfazit",
                  why: "Um nach Reisen, Feiern oder Klausuren zu erzählen, wie es WAR.",
                  when: [
                            "Nach der Reise: 'Die Reise nach Japan hat mega Spaß gemacht (楽しかったです)!'",
                            "Nach der Prüfung: 'Der Einstufungstest war überhaupt nicht schwer (難しくなかったです)!'",
                            "Party-Rückblick: 'Das Festival gestern war richtig lebhaft (にぎやかでした).'"
                  ],
                  signalWords: [
                            "昨日 (gestern)",
                            "先週 (letzte Woche)",
                            "旅行 (Reise)"
                  ],
                  quickTip: "い wird zu かったです (war gut/spaßig). な-Adjektiv bekommt einfach でした (wie 'was')."
        },
        examples: [
          {
            japanese: '昨日の映画は 面白かったです。',
            romaji: 'Kinou no eiga wa omoshirokatta desu.',
            german: 'Der gestrige Film war interessant.',
          },
          {
            japanese: 'テストは 難しくなかったです。',
            romaji: 'Tesuto wa muzukashikunakatta desu.',
            german: 'Der Test war nicht schwierig.',
          },
          {
            japanese: '昨日は 暇でした。',
            romaji: 'Kinou wa hima deshita.',
            german: 'Gestern hatte ich frei.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '先週の旅行はとても ___。',
            translation: 'Die Reise letzte Woche hat viel Spaß gemacht.',
            options: ['楽しかったです', '楽しいでした', '楽しかったでした', '楽しくでした'],
            correctAnswer: '楽しかったです',
            explanation: 'い-Adjektiv Präteritum: い weg, + かったです (楽しかったです).',
          },
          {
            type: 'cloze',
            prompt: '昨日の試験はあまり ___。',
            translation: 'Die gestrige Prüfung war nicht sehr schwierig.',
            options: ['難しくなかったです', '難しくないです', '難しかったでした', '難しいじゃありませんでした'],
            correctAnswer: '難しくなかったです',
            explanation: 'い-Adjektiv Präteritum verneint: い weg, + くなかったです.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Gestern war das Wetter gut.',
            orderChips: ['昨日は', '天気が', 'よかったです'],
            correctAnswer: '昨日は 天気が よかったです',
            explanation: 'いい im Präteritum lautet unregelmäßig よかったです.',
          },
          {
            type: 'cloze',
            prompt: '昨日の料理はとても ___。',
            translation: 'Das gestrige Gericht war sehr einfach zuzubereiten.',
            options: ['簡単でした', '簡単かったです', '簡単でしたかった', '簡単ないでした'],
            correctAnswer: '簡単でした',
            explanation: '簡単 (einfach) ist ein な-Adjektiv: Präteritum bejaht lautet 簡単でした.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Die Party gestern war lebhaft.',
            orderChips: ['昨日のパーティーは', 'とても', 'にぎやかでした'],
            correctAnswer: '昨日のパーティーは とても にぎやかでした',
            explanation: 'にぎやか ist ein な-Adjektiv → にぎやかでした.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // SHEET 5: EXISTENZVERBEN (いる & ある)
  // ==========================================================================
  {
    id: 'sheet-existence',
    title: 'Existenzverben: いる & ある',
    description: 'Sich befinden und existieren: Lebewesen vs. leblose Gegenstände',
    category: 'Verben',
    subRules: [
      {
        id: 'sub-exist-all',
        title: '1. いる (Lebewesen) vs. ある (Gegenstände)',
        explanation: 'Das Japanische unterscheidet strikt: **いる / います** für **beseelte Lebewesen** (Menschen, Kinder, Hunde, Katzen). **ある / あります** für **leblose Dinge, Pflanzen, Gebäude, Geld oder Termine**.',
        formula: 'Lebewesen + が + います  |  Gegenstand + が + あります',
        realLifeContext: {
                  badge: "Nachfragen & Suchen",
                  why: "Um im Laden nach Dingen zu fragen oder zu sagen, wo Freunde, Haustiere oder Toiletten sind.",
                  when: [
                            "Im Geschäft/Hotel: 'Gibt es hier WLAN? Wo ist die Toilette?' (Dinge -> あります)",
                            "Auf der Suche nach Leuten: 'Ist Herr Tanaka da? Da drüben ist eine Katze!' (Lebewesen -> います)",
                            "Familie beschreiben: 'Ich habe zwei Geschwister / eine Katze (猫がいます).'"
                  ],
                  signalWords: [
                            "猫が (Katze -> います)",
                            "Wi-Fiが (WLAN -> あります)",
                            "トイレが (Klo -> あります)"
                  ],
                  quickTip: "Bewegt es sich von alleine (Mensch, Tier)? -> いる. Steht es stumm rum (Handy, Tisch)? -> ある."
        },
        examples: [
          {
            japanese: '公園に 子供が います。',
            romaji: 'Kouen ni kodomo ga imasu.',
            german: 'Im Park sind Kinder.',
          },
          {
            japanese: '庭に 犬が います。',
            romaji: 'Niwa ni inu ga imasu.',
            german: 'Im Garten ist ein Hund.',
          },
          {
            japanese: '机の上に 本が あります。',
            romaji: 'Tsukue no ue ni hon ga arimasu.',
            german: 'Auf dem Schreibtisch liegt ein Buch.',
          },
        ],
        tasks: [
          {
            type: 'cloze',
            prompt: '教室に先生が ___。',
            translation: 'Im Klassenzimmer ist der Lehrer.',
            options: ['います', 'あります', 'いります', 'おります'],
            correctAnswer: 'います',
            explanation: 'Lehrer (先生) sind Menschen/Lebewesen, daher verwendet man います (いる).',
          },
          {
            type: 'cloze',
            prompt: 'あそこに銀行が ___。',
            translation: 'Dort drüben befindet sich eine Bank.',
            options: ['あります', 'います', 'ありでした', 'いらっしゃいます'],
            correctAnswer: 'あります',
            explanation: 'Eine Bank (Gebäude) ist unbelebt, daher verwendet man あります (ある).',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Im Zimmer ist eine Katze.',
            orderChips: ['部屋に', '猫が', 'います'],
            correctAnswer: '部屋に 猫が います',
            explanation: 'Katzen (Tiere) sind Lebewesen → います.',
          },
          {
            type: 'cloze',
            prompt: '財布の中にお金が ___。',
            translation: 'In der Geldbörse ist Geld.',
            options: ['あります', 'います', 'ありです', 'あるます'],
            correctAnswer: 'あります',
            explanation: 'Geld (お金) ist ein Gegenstand → あります.',
          },
          {
            type: 'order',
            prompt: 'Setze den Satz zusammen:',
            translation: 'Im Klassenzimmer ist niemand.',
            orderChips: ['教室に', '誰も', 'いません'],
            correctAnswer: '教室に 誰も いません',
            explanation: '誰も (niemand/Personen) verneint → いません.',
          },
        ],
      },
    ],
  },
];
