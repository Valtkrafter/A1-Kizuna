import type { TopicModule } from '../../types/curriculum';

export const module13: TopicModule = {
  id: 'mod-13',
  title: 'Modul 13: Das Ergebnis einer Handlung (Zustandsverben mit 〜ている)',
  category: 'Te-Form',
  subRules: [
    {
      id: 'sub-13-1',
      title: '13.1 Übergang in einen neuen Zustand',
      formula: 'Punktuelles Zustandsverb in て-Form + います = Fortdauernder Zustand',
      explanation: 'Bei Verben, die einen **augenblicklichen Wechsel des Zustands** beschreiben (wie heiraten, aufwachen, sterben, einsteigen, ankommen), bedeutet **〜ている** NICHT, dass die Handlung gerade andauert, sondern dass **das Ergebnis der abgeschlossenen Handlung fortdauert**! Beispiele: 結婚する (heiraten) → **結婚している** (verheiratet sein); 起きる (aufstehen) → **起きている** (wach sein); 乗る (einsteigen) → **乗っている** (im Zug/Bus sitzen); 死ぬ (sterben) → **死んでいる** (tot sein); 行く (hingehen) → **行っている** (dort sein).',
      realLifeContext: {
        badge: 'Handlung abgeschlossen, Zustand hält an',
        why: 'Familienstand, Wachheitsgrad und Anwesenheit grammatisch korrekt ausdrücken.',
        when: [
          'Familienstand: "Ich bin verheiratet (結婚しています)." (Niemals "結婚します" für den Zustand!)',
          'Wachzustand: "Bist du wach? — Ja, ich bin wach (起きています)."',
          'Im Zug sitzen: "Ich sitze gerade im Zug (電車に乗っています)."'
        ],
        signalWords: ['結婚している', '起きている', '乗っている', '死んでいる', '知っている'],
        quickTip: 'Aktion klickte in der Sekunde um – und das Ergebnis hält an: Zustands-ている!'
      },
      examples: [
        {
          japanese: '田中さんは結婚しています。',
          romaji: 'Tanaka-san wa kekkon shite imasu.',
          german: 'Herr Tanaka ist verheiratet (Zustand).'
        },
        {
          japanese: '電車に乗っています。',
          romaji: 'Densha ni notte imasu.',
          german: 'Ich sitze im Zug (bin eingestiegen und fahre mit).'
        }
      ],
      tasks: [
        {
          id: 'task-13-1-1',
          type: 'cloze',
          prompt: 'マリアさんは ___。 (Zustand: ist verheiratet)',
          german: 'Maria ist verheiratet.',
          options: ['結婚しています', '結婚します', '結婚しました', '結婚して'],
          correctAnswer: '結婚しています',
          explanation: 'Verheiratet sein ist ein anhaltender Zustand: 結婚しています.'
        },
        {
          id: 'task-13-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Bist du wach? (Zustand)',
          chips: ['起きて', 'いますか'],
          correctOrder: ['起きて', 'いますか'],
          correctAnswer: '起きて いますか',
          explanation: 'Wach sein drückt man mit 起きて いますか aus.'
        },
        {
          id: 'task-13-1-3',
          type: 'cloze',
          prompt: 'バスに ___。 (sitze im Bus: 乗る)',
          german: 'Ich sitze im Bus (bin eingestiegen).',
          options: ['乗っています', '乗ります', '乗りました', '乗て'],
          correctAnswer: '乗っています',
          explanation: '乗る → 乗って + います drückt aus, dass man im Fahrzeug sitzt.'
        },
        {
          id: 'task-13-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Herr Tanaka ist nach Amerika gegangen (ist dort).',
          chips: ['田中さんは', 'アメリカに', '行っています'],
          correctOrder: ['田中さんは', 'アメリカに', '行っています'],
          correctAnswer: '田中さんは アメリカに 行っています',
          explanation: '行っています bedeutet, dass er hingegangen und jetzt dort ist.'
        },
        {
          id: 'task-13-1-5',
          type: 'cloze',
          prompt: '魚は ___。 (Zustand: ist tot: 死ぬ)',
          german: 'Der Fisch ist tot.',
          options: ['死んでいます', '死にます', '死にました', '死んで'],
          correctAnswer: '死んでいます',
          explanation: 'Tot sein ist der Zustand nach dem Sterben: 死んでいます.'
        },
        {
          id: 'task-13-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ken ist nach Japan gekommen (ist da).',
          chips: ['ケンさんは', '日本に', '来ています'],
          correctOrder: ['ケンさんは', '日本に', '来ています'],
          correctAnswer: 'ケンさんは 日本に 来ています',
          explanation: '来ています bedeutet: er ist angekommen und anwesend.'
        },
        {
          id: 'task-13-1-7',
          type: 'cloze',
          prompt: '母は もう ___。 (Zustand: ist wach: 起きる)',
          german: 'Meine Mutter ist schon wach.',
          options: ['起きています', '起きます', '起きました', '起きて'],
          correctAnswer: '起きています',
          explanation: 'Wach sein: 起きています.'
        },
        {
          id: 'task-13-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich sitze im Taxi.',
          chips: ['タクシーに', '乗っています'],
          correctOrder: ['タクシーに', '乗っています'],
          correctAnswer: 'タクシーに 乗っています',
          explanation: 'Ziel/Fahrzeug タクシーに + 乗っています.'
        }
      ]
    },
    {
      id: 'sub-13-2',
      title: '13.2 Wohnort (住んでいる vs. 住みます)',
      formula: 'Ort + に + 住んでいます (Gegenwart) vs. Ort + に + 住みます (Zukunft)',
      explanation: 'Der gegenwärtige Wohnort ist ein andauernder Zustand und erfordert zwingend **住んでいます** (mit Ortspartikel **に**). Die einfache Gegenwartsform **住みます** bedeutet dagegen "werde dort hinziehen / werde dort wohnen" (Zukunft!).',
      realLifeContext: {
        badge: 'Wo wohnst du?',
        why: 'Die klassische Kennenlern-Frage auf Japanisch fehlerfrei beantworten.',
        when: [
          'Aktueller Wohnort: "Ich wohne zurzeit in Amerika (今アメリカに住んでいます)."',
          'Umzugspläne: "Nächstes Jahr werde ich in Japan wohnen (来年日本に住みます)."',
          'Wohnort erfragen: "どこに住んでいますか."'
        ],
        signalWords: ['今〜に住んでいます', '来年〜に住みます', 'どこに住んでいますか'],
        quickTip: 'Wohnst du da JETZT? Dann 住んでいます! Ziehst du erst hin? Dann 住みます!'
      },
      examples: [
        {
          japanese: '今アメリカに住んでいます。',
          romaji: 'Ima amerika ni sunde imasu.',
          german: 'Ich wohne zurzeit in Amerika.'
        },
        {
          japanese: '来年日本に住みます。',
          romaji: 'Rainen nihon ni sumimasu.',
          german: 'Nächstes Jahr werde ich in Japan wohnen.'
        }
      ],
      tasks: [
        {
          id: 'task-13-2-1',
          type: 'cloze',
          prompt: 'どこ ___ 住んでいますか。',
          german: 'Wo wohnen Sie?',
          options: ['に', 'で', 'を', 'へ'],
          correctAnswer: 'に',
          explanation: 'Der Wohnort bei 住んでいます wird stets mit に markiert.'
        },
        {
          id: 'task-13-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich wohne in Tokio.',
          chips: ['東京に', '住んでいます'],
          correctOrder: ['東京に', '住んでいます'],
          correctAnswer: '東京に 住んでいます',
          explanation: 'Ort 東京に + 住んでいます.'
        },
        {
          id: 'task-13-2-3',
          type: 'cloze',
          prompt: '今、ドイツに ___。 (wohne zurzeit)',
          german: 'Ich wohne zurzeit in Deutschland.',
          options: ['住んでいます', '住みます', '住んでいました', '住み'],
          correctAnswer: '住んでいます',
          explanation: 'Gegenwärtiger Wohnsitz: 住んでいます.'
        },
        {
          id: 'task-13-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nächstes Jahr werde ich in Deutschland wohnen.',
          chips: ['来年', 'ドイツに', '住みます'],
          correctOrder: ['来年', 'ドイツに', '住みます'],
          correctAnswer: '来年 ドイツに 住みます',
          explanation: 'Zukunft mit 来年 + ドイツに 住みます.'
        },
        {
          id: 'task-13-2-5',
          type: 'cloze',
          prompt: '来年、京都に ___。 (werde wohnen: Zukunft)',
          german: 'Nächstes Jahr werde ich in Kyoto wohnen.',
          options: ['住みます', '住んでいます', '住みました', '住んで'],
          correctAnswer: '住みます',
          explanation: 'Zukünftiger Wohnortwechsel erfordert 住みます.'
        },
        {
          id: 'task-13-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Herr Tanaka wohnt in Osaka.',
          chips: ['田中さんは', '大阪に', '住んでいます'],
          correctOrder: ['田中さんは', '大阪に', '住んでいます'],
          correctAnswer: '田中さんは 大阪に 住んでいます',
          explanation: 'Thema 田中さんは + Ort 大阪に + 住んでいます.'
        },
        {
          id: 'task-13-2-7',
          type: 'cloze',
          prompt: '京都 ___ 住んでいます。',
          german: 'Ich wohne in Kyoto.',
          options: ['に', 'で', 'を', 'へ'],
          correctAnswer: 'に',
          explanation: 'Wohnortpartikel ist immer に.'
        },
        {
          id: 'task-13-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Meine Familie wohnt in Amerika.',
          chips: ['家族は', 'アメリカに', '住んでいます'],
          correctOrder: ['家族は', 'アメリカに', '住んでいます'],
          correctAnswer: '家族は アメリカに 住んでいます',
          explanation: 'Subjekt 家族は + アメリカに 住んでいます.'
        }
      ]
    }
  ]
};
