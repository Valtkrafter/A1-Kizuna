import type { TopicModule } from '../../types/curriculum';

export const module2: TopicModule = {
  id: 'mod-2',
  title: 'Modul 2: Partikeln (Verbindung & Objekte)',
  category: 'Partikeln',
  subRules: [
    {
      id: 'sub-2-1',
      title: '2.1 Partikel の (Besitz & Herkunft)',
      formula: '[Nomen 1] + の + [Nomen 2]',
      explanation: 'Die Partikel **の** verbindet zwei Nomen. Sie kennzeichnet Besitz ("von / Apostroph-S"), Herkunft ("japanischer Tee") oder nähere Spezifizierung. Sie kann auch das bezogene Nomen ersetzen ("中国のです" = "der aus China").',
      realLifeContext: {
        badge: 'Wem gehört was?',
        why: 'Besitzverhältnisse, Herkunft von Produkten und Zuordnungen präzise beschreiben.',
        when: [
          'Besitzer klären: "Das ist das Buch meines Freundes."',
          'Produktherkunft prüfen: "Das ist eine japanische Kamera."',
          'Kompakte Antwort geben: "Nein, das ist meins."'
        ],
        signalWords: ['私の', '友達の', '日本の', 'だれの'],
        quickTip: 'Funktioniert wie das englische Apostroph-S: watashi no = my.'
      },
      examples: [
        {
          japanese: 'これは日本のカメラです。',
          romaji: 'Kore wa nihon no kamera desu.',
          german: 'Das ist eine japanische Kamera.'
        },
        {
          japanese: '日本のお茶ですか。いいえ、中国のです。',
          romaji: 'Nihon no ocha desu ka. Iie, chuugoku no desu.',
          german: 'Ist das japanischer Tee? Nein, der aus China.'
        }
      ],
      tasks: [
        {
          id: 'task-2-1-1',
          type: 'cloze',
          prompt: 'これは 私 ___ 鍵です。',
          german: 'Das ist mein Schlüssel.',
          options: ['の', 'は', 'を', 'に'],
          correctAnswer: 'の',
          explanation: '私の drückt den Besitz aus ("mein Schlüssel").'
        },
        {
          id: 'task-2-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das ist das Auto meines Freundes.',
          chips: ['友達の', '車', 'です'],
          correctOrder: ['友達の', '車', 'です'],
          correctAnswer: '友達の 車 です',
          explanation: '友達の bestimmt das nachfolgende Nomen 車 näher.'
        },
        {
          id: 'task-2-1-3',
          type: 'cloze',
          prompt: 'あれは ドイツ ___ 車です。',
          german: 'Das dort ist ein deutsches Auto.',
          options: ['の', 'に', 'で', 'は'],
          correctAnswer: 'の',
          explanation: 'Herkunft von Gegenständen wird mit [Land] + の + [Gegenstand] ausgedrückt.'
        },
        {
          id: 'task-2-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das ist das Buch des Lehrers.',
          chips: ['先生の', '本', 'です'],
          correctOrder: ['先生の', '本', 'です'],
          correctAnswer: '先生の 本 です',
          explanation: '先生の (des Lehrers) + 本 + です.'
        },
        {
          id: 'task-2-1-5',
          type: 'cloze',
          prompt: '誰 ___ 時計ですか。',
          german: 'Wessen Uhr ist das?',
          options: ['の', 'は', 'を', 'が'],
          correctAnswer: 'の',
          explanation: '誰の bedeutet "wessen".'
        },
        {
          id: 'task-2-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das ist japanischer Tee.',
          chips: ['これは', '日本の', 'お茶', 'です'],
          correctOrder: ['これは', '日本の', 'お茶', 'です'],
          correctAnswer: 'これは 日本の お茶 です',
          explanation: 'Subjekt これ + は + Attribut 日本の + Nomen お茶 + です.'
        },
        {
          id: 'task-2-1-7',
          type: 'cloze',
          prompt: 'アメリカのワインですか。— いいえ、フランス ___ です。',
          german: 'Ist das US-Wein? — Nein, der aus Frankreich.',
          options: ['の', 'は', 'を', 'で'],
          correctAnswer: 'の',
          explanation: 'フランスの ersetzt hier "Wein aus Frankreich".'
        },
        {
          id: 'task-2-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das ist die Geldbörse meines Vaters.',
          chips: ['父の', '財布', 'です'],
          correctOrder: ['父の', '財布', 'です'],
          correctAnswer: '父の 財布 です',
          explanation: 'Besitzangabe: 父の (meines Vaters) + 財布 (Geldbörse) + です.'
        }
      ]
    },
    {
      id: 'sub-2-2',
      title: '2.2 Partikel を (Direktes Objekt)',
      formula: '[Akkusativobjekt] + を + [Aktionsverb]',
      explanation: 'Die Partikel **を** (ausgesprochen "o") markiert das direkte Objekt der Handlung. Sie verbindet die Sache, mit der etwas geschieht, mit dem ausführenden Verb.',
      realLifeContext: {
        badge: 'Bestellen & Handeln',
        why: 'Wichtigstes Werkzeug beim Bestellen von Mahlzeiten, Einkaufen und Beschreiben von Alltagsaktivitäten.',
        when: [
          'Speisen & Getränke bestellen: "Ich esse Brot", "Ich trinke Tee."',
          'Medien konsumieren: "Ich lese die Zeitung."',
          'Aktionen im Alltag präzise formulieren.'
        ],
        signalWords: ['食べます', '飲みます', '読みます', '何を'],
        quickTip: 'Was wird konsumiert oder getan? Genau davor steht を!'
      },
      examples: [
        {
          japanese: 'パンを食べます。',
          romaji: 'Pan o tabemasu.',
          german: 'Ich esse Brot.'
        },
        {
          japanese: '新聞を読みます。',
          romaji: 'Shinbun o yomimasu.',
          german: 'Ich lese die Zeitung.'
        }
      ],
      tasks: [
        {
          id: 'task-2-2-1',
          type: 'cloze',
          prompt: '朝、お茶 ___ 飲みます。',
          german: 'Morgens trinke ich Tee.',
          options: ['を', 'は', 'に', 'で'],
          correctAnswer: 'を',
          explanation: 'お茶 ist das direkte Objekt des Trinkens und wird durch を markiert.'
        },
        {
          id: 'task-2-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich lese ein Buch.',
          chips: ['本を', '読みます'],
          correctOrder: ['本を', '読みます'],
          correctAnswer: '本を 読みます',
          explanation: 'Objekt (本を) steht immer vor dem Verb (読みます).'
        },
        {
          id: 'task-2-2-3',
          type: 'cloze',
          prompt: '毎朝、魚 ___ 食べます。',
          german: 'Jeden Morgen esse ich Fisch.',
          options: ['を', 'で', 'に', 'と'],
          correctAnswer: 'を',
          explanation: 'Objektpartikel を markiert die Nahrung 魚 (Fisch).'
        },
        {
          id: 'task-2-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich schaue einen Film.',
          chips: ['映画を', '見ます'],
          correctOrder: ['映画を', '見ます'],
          correctAnswer: '映画を 見ます',
          explanation: 'Direktes Objekt mit を vor dem Prädikat 見ます.'
        },
        {
          id: 'task-2-2-5',
          type: 'cloze',
          prompt: '何 ___ 買いますか。',
          german: 'Was kaufen Sie?',
          options: ['を', 'は', 'に', 'で'],
          correctAnswer: 'を',
          explanation: 'Fragewort 何 verlangt als Akkusativobjekt die Partikel を.'
        },
        {
          id: 'task-2-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich höre Musik.',
          chips: ['音楽を', '聞きます'],
          correctOrder: ['音楽を', '聞きます'],
          correctAnswer: '音楽を 聞きます',
          explanation: '音楽を + 聞きます.'
        },
        {
          id: 'task-2-2-7',
          type: 'cloze',
          prompt: '手紙 ___ 書きます。',
          german: 'Ich schreibe einen Brief.',
          options: ['を', 'に', 'で', 'は'],
          correctAnswer: 'を',
          explanation: 'Objekt von 書きます (schreiben) wird mit を gebunden.'
        },
        {
          id: 'task-2-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich schaue fern.',
          chips: ['テレビを', '見ます'],
          correctOrder: ['テレビを', '見ます'],
          correctAnswer: 'テレビを 見ます',
          explanation: 'Fernseher (テレビ) als Objekt + を + 見ます.'
        }
      ]
    },
    {
      id: 'sub-2-3',
      title: '2.3 Partikel も (Inklusion: "auch / weder noch")',
      formula: '[Nomen] + も + [Prädikat] (ersetzt は und を)',
      explanation: 'Die Partikel **も** drückt "auch" aus. Sie ersetzt sowohl die Themenpartikel **は** als auch die Objektpartikel **を**. Bei doppelter Verneinung drückt sie "weder ... noch" aus.',
      realLifeContext: {
        badge: 'Anschließen & Zustimmen',
        why: 'Gemeinsamkeiten hervorheben ("ich auch") oder vollständige Verneinung ausdrücken.',
        when: [
          'Zustimmen: "Ich trinke auch Kaffee."',
          'Gemeinsame Identität: "Herr Smith ist auch Amerikaner."',
          'Ausschluss: "Ich trinke weder Bier noch Wein."'
        ],
        signalWords: ['私も', '〜も〜も', '飲みません', '食べません'],
        quickTip: 'も verdrängt は und を – kombiniere niemals はも oder をも!'
      },
      examples: [
        {
          japanese: '私も学生です。',
          romaji: 'Watashi mo gakusei desu.',
          german: 'Ich bin auch Student.'
        },
        {
          japanese: 'ビールもワインも飲みません。',
          romaji: 'Biiru mo wain mo nomimasen.',
          german: 'Ich trinke weder Bier noch Wein.'
        }
      ],
      tasks: [
        {
          id: 'task-2-3-1',
          type: 'cloze',
          prompt: 'マイクさんはアメリカ人です。私 ___ アメリカ人です。',
          german: 'Mike ist Amerikaner. Ich bin auch Amerikaner.',
          options: ['も', 'は', 'を', 'に'],
          correctAnswer: 'も',
          explanation: 'も bedeutet "auch" und ersetzt das は nach 私.'
        },
        {
          id: 'task-2-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse weder Fleisch noch Fisch.',
          chips: ['肉も', '魚も', '食べません'],
          correctOrder: ['肉も', '魚も', '食べません'],
          correctAnswer: '肉も 魚も 食べません',
          explanation: '[A]も [B]も + verneintes Verb drückt "weder A noch B" aus.'
        },
        {
          id: 'task-2-3-3',
          type: 'cloze',
          prompt: 'お茶 ___ 水も 飲みません。',
          german: 'Ich trinke weder Tee noch Wasser.',
          options: ['も', 'を', 'は', 'で'],
          correctAnswer: 'も',
          explanation: 'Zur doppelten Verneinung wird an beide Nomen も angehängt.'
        },
        {
          id: 'task-2-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich fahre auch nach Japan.',
          chips: ['私も', '日本へ', '行きます'],
          correctOrder: ['私も', '日本へ', '行きます'],
          correctAnswer: '私も 日本へ 行きます',
          explanation: 'Subjekt 私 + も drückt "ich auch" aus.'
        },
        {
          id: 'task-2-3-5',
          type: 'cloze',
          prompt: 'ケンさんは先生です。マリアさん ___ 先生です。',
          german: 'Ken ist Lehrer. Maria ist auch Lehrerin.',
          options: ['も', 'を', 'に', 'で'],
          correctAnswer: 'も',
          explanation: 'も schließt Maria in die Aussage mit ein.'
        },
        {
          id: 'task-2-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse weder Brot noch Reis.',
          chips: ['パンも', 'ご飯も', '食べません'],
          correctOrder: ['パンも', 'ご飯も', '食べません'],
          correctAnswer: 'パンも ご飯も 食べません',
          explanation: 'Doppeltes も mit negativem Prädikat 食べません.'
        },
        {
          id: 'task-2-3-7',
          type: 'cloze',
          prompt: '本も 新聞 ___ 読みません。',
          german: 'Ich lese weder Bücher noch Zeitungen.',
          options: ['も', 'を', 'は', 'に'],
          correctAnswer: 'も',
          explanation: 'Zweites Glied der Verneinung mit も.'
        },
        {
          id: 'task-2-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Mein Freund ist auch Student.',
          chips: ['友達も', '学生', 'です'],
          correctOrder: ['友達も', '学生', 'です'],
          correctAnswer: '友達も 学生 です',
          explanation: '友達も + Prädikat 学生 です.'
        }
      ]
    }
  ]
};
