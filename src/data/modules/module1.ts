import type { TopicModule } from '../../types/curriculum';

export const module1: TopicModule = {
  id: 'mod-1',
  title: 'Modul 1: Aussagen, Fragen & Verneinung',
  category: 'Grundlagen',
  subRules: [
    {
      id: 'sub-1-1',
      title: '1.1 A は B です (Bejahende Feststellung)',
      formula: '[Thema] + は + [Nomen] + です',
      explanation: 'Die Partikel **は** (ausgesprochen als "wa") legt das Thema des Satzes fest ("Was A betrifft..."). Das Wort **です** ist das höfliche Äquivalent zu "sein" und schließt die bejahende Aussage höflich ab.',
      realLifeContext: {
        badge: 'Identität & Beruf',
        why: 'Vorstellung der eigenen Person, Nationalität und deines Berufs im ersten Gespräch.',
        when: [
          'Sich neuen Bekannten vorstellen: "Ich bin Student."',
          'Herkunft angeben: "Herr Tanaka ist Japaner."',
          'Gegenstände benennen: "Das ist ein Buch."'
        ],
        signalWords: ['私', '学生', '会社員', '日本人'],
        quickTip: 'は legt das Thema fest, です ist das höfliche "sein" am Satzende.'
      },
      examples: [
        {
          japanese: '私は学生です。',
          romaji: 'Watashi wa gakusei desu.',
          german: 'Ich bin Student.'
        },
        {
          japanese: '田中さんは会社員です。',
          romaji: 'Tanaka-san wa kaishain desu.',
          german: 'Herr Tanaka ist Angestellter.'
        }
      ],
      tasks: [
        {
          id: 'task-1-1-1',
          type: 'cloze',
          prompt: 'マイクさんは先生 ___。',
          german: 'Mike ist Lehrer.',
          options: ['です', 'でした', 'ます', 'じゃない'],
          correctAnswer: 'です',
          explanation: 'Für eine bejahende Feststellung bei Nomen im Präsens steht am Ende です.'
        },
        {
          id: 'task-1-1-2',
          type: 'cloze',
          prompt: '母 ___ 日本人です。',
          german: 'Meine Mutter ist Japanerin.',
          options: ['は', 'を', 'に', 'で'],
          correctAnswer: 'は',
          explanation: 'Die Partikel は kennzeichnet das Thema ("Meine Mutter").'
        },
        {
          id: 'task-1-1-3',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Mein Freund ist Angestellter.',
          chips: ['友達は', '会社員', 'です'],
          correctOrder: ['友達は', '会社員', 'です'],
          correctAnswer: '友達は 会社員 です',
          explanation: 'Thema (友達は) + Prädikatsnomen (会社員) + です.'
        },
        {
          id: 'task-1-1-4',
          type: 'cloze',
          prompt: '私 ___ ドイツ人です。',
          german: 'Ich bin Deutsche(r).',
          options: ['は', 'が', 'を', 'に'],
          correctAnswer: 'は',
          explanation: 'Themenpartikel は markiert "Ich" als Gesprächsgegenstand.'
        },
        {
          id: 'task-1-1-5',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Mike ist Amerikaner.',
          chips: ['マイクさんは', 'アメリカ人', 'です'],
          correctOrder: ['マイクさんは', 'アメリカ人', 'です'],
          correctAnswer: 'マイクさんは アメリカ人 です',
          explanation: 'Subjekt/Thema mit は vorangestellt, gefolgt von der Nationalität und です.'
        },
        {
          id: 'task-1-1-6',
          type: 'cloze',
          prompt: '父は 会社員 ___。',
          german: 'Mein Vater ist Angestellter.',
          options: ['です', 'ます', 'で', 'でした'],
          correctAnswer: 'です',
          explanation: 'Kopula です schließt die Aussage über den Beruf höflich ab.'
        },
        {
          id: 'task-1-1-7',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ken ist Student.',
          chips: ['ケンさんは', '学生', 'です'],
          correctOrder: ['ケンさんは', '学生', 'です'],
          correctAnswer: 'ケンさんは 学生 です',
          explanation: 'Thema ケンさんは + Nomen 学生 + です.'
        },
        {
          id: 'task-1-1-8',
          type: 'cloze',
          prompt: '田中さんは 先生 ___。',
          german: 'Herr Tanaka ist Lehrer.',
          options: ['です', 'ます', 'でした', 'に'],
          correctAnswer: 'です',
          explanation: 'Berufsbezeichnungen werden mit です bejaht.'
        }
      ]
    },
    {
      id: 'sub-1-2',
      title: '1.2 A は B じゃないです (Verneinte Feststellung)',
      formula: '[Thema] + は + [Nomen] + じゃないです / じゃありません',
      explanation: 'Um eine Aussage mit **です** zu verneinen, wird **です** durch **じゃないです** (umgangssprachlicher/moderner) oder **じゃありません** (formeller) ersetzt.',
      realLifeContext: {
        badge: 'Missverständnisse korrigieren',
        why: 'Verneinen von Nationalität, Beruf oder Fehlannahmen im Alltag.',
        when: [
          'Beruf korrigieren: "Ich bin kein Student, sondern Angestellter."',
          'Geografie klarstellen: "Kyoto ist kein Land, sondern eine Stadt."',
          'Höflich abgrenzen.'
        ],
        signalWords: ['いいえ', 'じゃないです', 'じゃありません'],
        quickTip: 'です wird zu じゃないです (Alltag) oder formeller じゃありません.'
      },
      examples: [
        {
          japanese: '私は学生じゃないです。',
          romaji: 'Watashi wa gakusei janai desu.',
          german: 'Ich bin kein Student.'
        },
        {
          japanese: '京都は国じゃないです。',
          romaji: 'Kyouto wa kuni janai desu.',
          german: 'Kyoto ist kein Land.'
        }
      ],
      tasks: [
        {
          id: 'task-1-2-1',
          type: 'cloze',
          prompt: 'ケンさんは 先生 ___。',
          german: 'Ken ist kein Lehrer.',
          options: ['じゃないです', 'くないです', 'ません', 'でした'],
          correctAnswer: 'じゃないです',
          explanation: 'Bei Nomen lautet die höfliche Verneinung im Präsens じゃないです oder じゃありません.'
        },
        {
          id: 'task-1-2-2',
          type: 'cloze',
          prompt: '私 ___ 会社員じゃありません。',
          german: 'Ich bin kein Angestellter.',
          options: ['は', 'を', 'で', 'に'],
          correctAnswer: 'は',
          explanation: 'Auch in verneinten Sätzen markiert は das Thema des Satzes.'
        },
        {
          id: 'task-1-2-3',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Meine Mutter ist keine Ärztin.',
          chips: ['母は', '医者', 'じゃないです'],
          correctOrder: ['母は', '医者', 'じゃないです'],
          correctAnswer: '母は 医者 じゃないです',
          explanation: 'Nomen + じゃないです verneint das Prädikat.'
        },
        {
          id: 'task-1-2-4',
          type: 'cloze',
          prompt: '東京は 国 ___。',
          german: 'Tokio ist kein Land.',
          options: ['じゃないです', 'くないです', 'しません', 'でした'],
          correctAnswer: 'じゃないです',
          explanation: '国 (Land) ist ein Nomen und wird mit じゃないです verneint.'
        },
        {
          id: 'task-1-2-5',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Herr Tanaka ist kein Deutscher.',
          chips: ['田中さんは', 'ドイツ人', 'じゃありません'],
          correctOrder: ['田中さんは', 'ドイツ人', 'じゃありません'],
          correctAnswer: '田中さんは ドイツ人 じゃありません',
          explanation: 'Höfliche Verneinung mit じゃありません.'
        },
        {
          id: 'task-1-2-6',
          type: 'cloze',
          prompt: 'マリアさんは 学生 ___。',
          german: 'Maria ist keine Studentin.',
          options: ['じゃありません', 'くないです', 'ません', 'です'],
          correctAnswer: 'じゃありません',
          explanation: 'Formelle Verneinung von 学生 です ist 学生 じゃありません.'
        },
        {
          id: 'task-1-2-7',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Mein Vater ist kein Lehrer.',
          chips: ['父は', '先生', 'じゃないです'],
          correctOrder: ['父は', '先生', 'じゃないです'],
          correctAnswer: '父は 先生 じゃないです',
          explanation: 'Subjekt 父は + 先生 じゃないです.'
        },
        {
          id: 'task-1-2-8',
          type: 'cloze',
          prompt: 'あれは 犬 ___。',
          german: 'Das dort ist kein Hund.',
          options: ['じゃないです', 'くないです', 'いません', 'ません'],
          correctAnswer: 'じゃないです',
          explanation: '犬 (Hund) als Prädikatsnomen wird mit じゃないです verneint.'
        }
      ]
    },
    {
      id: 'sub-1-3',
      title: '1.3 Satzende-Partikel か (Fragesätze)',
      formula: '[Aussage] + ですか。 → はい、そうです。 / いいえ、違います。',
      explanation: 'Um eine Frage zu bilden, bleibt die normale Satzstellung unverändert – du hängst lediglich die Partikel **か** an das Satzende. Auf Entscheidungsfragen antwortet man mit **はい、そうです** (Ja, stimmt) oder **いいえ、違います** (Nein, stimmt nicht).',
      realLifeContext: {
        badge: 'Fragen stellen ohne Wortumstellung',
        why: 'Einfaches Fragenstellen ohne Hilfsverben oder Umstellen von Wörtern.',
        when: [
          'Beim Kennenlernen nachhaken: "Sind Sie Herr Tanaka?"',
          'Tatsachen erfragen: "Liegt Kyoto in Japan?"',
          'Entscheidungsfragen beantworten.'
        ],
        signalWords: ['か', 'はい、そうです', 'いいえ、違います'],
        quickTip: 'か fungiert als gesprochenes Fragezeichen am Satzende.'
      },
      examples: [
        {
          japanese: 'ケンさんは会社員ですか。',
          romaji: 'Ken-san wa kaishain desu ka.',
          german: 'Ist Ken Angestellter?'
        },
        {
          japanese: '京都は日本ですか。',
          romaji: 'Kyouto wa nihon desu ka.',
          german: 'Liegt Kyoto in Japan?'
        }
      ],
      tasks: [
        {
          id: 'task-1-3-1',
          type: 'cloze',
          prompt: 'マイクさんは 学生です ___。',
          german: 'Ist Mike Student?',
          options: ['か', 'は', 'ね', 'よ'],
          correctAnswer: 'か',
          explanation: 'Die Partikel か am Satzende macht die Aussage zur Frage.'
        },
        {
          id: 'task-1-3-2',
          type: 'cloze',
          prompt: '学生ですか。— はい、___ です。',
          german: 'Sind Sie Student? — Ja, das bin ich.',
          options: ['そう', 'いいえ', '違う', 'どれ'],
          correctAnswer: 'そう',
          explanation: 'はい、そうです ist die Standardantwort für "Ja, so ist es".'
        },
        {
          id: 'task-1-3-3',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ist Maria Lehrerin?',
          chips: ['マリアさんは', '先生', 'ですか'],
          correctOrder: ['マリアさんは', '先生', 'ですか'],
          correctAnswer: 'マリアさんは 先生 ですか',
          explanation: 'Thema + Nomen + ですか bildet die vollständige Frage.'
        },
        {
          id: 'task-1-3-4',
          type: 'cloze',
          prompt: '会社員ですか。— いいえ、___。',
          german: 'Sind Sie Angestellter? — Nein, stimmt nicht.',
          options: ['違います', 'そうです', 'ありません', 'いません'],
          correctAnswer: '違います',
          explanation: 'いいえ、違います verneint die Frage höflich ("Nein, das trifft nicht zu").'
        },
        {
          id: 'task-1-3-5',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Liegt Tokio in Japan?',
          chips: ['東京は', '日本', 'ですか'],
          correctOrder: ['東京は', '日本', 'ですか'],
          correctAnswer: '東京は 日本 ですか',
          explanation: 'Satzbau: Ort + は + Land + ですか.'
        },
        {
          id: 'task-1-3-6',
          type: 'cloze',
          prompt: 'お父さんは 医者です ___。',
          german: 'Ist Ihr Vater Arzt?',
          options: ['か', 'の', 'を', 'に'],
          correctAnswer: 'か',
          explanation: 'Fragesätze enden mit der Fragepartikel か.'
        },
        {
          id: 'task-1-3-7',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ist Herr Tanaka Japaner?',
          chips: ['田中さんは', '日本人', 'ですか'],
          correctOrder: ['田中さんは', '日本人', 'ですか'],
          correctAnswer: '田中さんは 日本人 ですか',
          explanation: 'Thema + Nationalität + ですか.'
        },
        {
          id: 'task-1-3-8',
          type: 'cloze',
          prompt: 'これは 辞書ですか。— はい、___。',
          german: 'Ist das ein Wörterbuch? — Ja, genau.',
          options: ['そうです', '違います', 'ありません', 'います'],
          correctAnswer: 'そうです',
          explanation: 'Zustimmende Antwort: はい、そうです.'
        }
      ]
    }
  ]
};
