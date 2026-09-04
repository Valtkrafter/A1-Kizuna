import type { TopicModule } from '../../types/curriculum';

export const module12: TopicModule = {
  id: 'mod-12',
  title: 'Modul 12: Laufende Handlungen & Gewohnheiten (〜ています)',
  category: 'Te-Form',
  subRules: [
    {
      id: 'sub-12-1',
      title: '12.1 Verlaufsform Gegenwart (〜ています)',
      formula: 'Verb in て-Form + います',
      explanation: 'Die Konstruktion **〜ています** drückt eine Handlung aus, die **in diesem Moment gerade im Ablauf** ist (entspricht dem englischen *Present Continuous* "-ing"). Signalwort Nummer 1 ist **今** (jetzt).',
      realLifeContext: {
        badge: 'Was machst du GERADE?',
        why: 'Am Telefon, im Chat oder beim Betreten eines Raums mitteilen, womit man genau jetzt beschäftigt ist.',
        when: [
          'Auf die Frage "Was machst du gerade?": "Ich esse gerade zu Mittag."',
          'Beim Kochen: "Ich koche gerade Ramen."',
          'Im Moment: "Ich höre gerade Musik."'
        ],
        signalWords: ['今', '〜ています', '今何をしていますか'],
        quickTip: 'て-Form + います = das englische "-ing" am Verb!'
      },
      examples: [
        {
          japanese: '今音楽を聞いています。',
          romaji: 'Ima ongaku o kiite imasu.',
          german: 'Ich höre gerade Musik.'
        },
        {
          japanese: '今何をしていますか。— 本を読んでいます。',
          romaji: 'Ima nani o shite imasu ka. — Hon o yonde imasu.',
          german: 'Was machst du gerade? — Ich lese ein Buch.'
        }
      ],
      tasks: [
        {
          id: 'task-12-1-1',
          type: 'cloze',
          prompt: '今、テレビを ___。 (schaue gerade)',
          german: 'Ich schaue gerade fern.',
          options: ['見ています', '見ます', '見ました', '見て'],
          correctAnswer: '見ています',
          explanation: 'Handlung im aktuellen Moment erfordert ています: 見て + います.'
        },
        {
          id: 'task-12-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Was machst du gerade?',
          chips: ['今', '何を', 'していますか'],
          correctOrder: ['今', '何を', 'していますか'],
          correctAnswer: '今 何を していますか',
          explanation: 'Frage nach laufender Aktion: 今 + 何を + していますか.'
        },
        {
          id: 'task-12-1-3',
          type: 'cloze',
          prompt: '今、ご飯を ___。 (koche gerade: 作る)',
          german: 'Ich koche gerade Essen.',
          options: ['作っています', '作ります', '作りています', '作って'],
          correctAnswer: '作っています',
          explanation: '作る → 作って + います → 作っています.'
        },
        {
          id: 'task-12-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich trinke gerade Kaffee.',
          chips: ['今', 'コーヒーを', '飲んでいます'],
          correctOrder: ['今', 'コーヒーを', '飲んでいます'],
          correctAnswer: '今 コーヒーを 飲んでいます',
          explanation: '今 + コーヒーを + 飲んでいます.'
        },
        {
          id: 'task-12-1-5',
          type: 'cloze',
          prompt: '手紙を ___。 (schreibe gerade: 書く)',
          german: 'Ich schreibe gerade einen Brief.',
          options: ['書いています', '書きます', '書いて', '書きています'],
          correctAnswer: '書いています',
          explanation: '書く in der Verlaufsform: 書いています.'
        },
        {
          id: 'task-12-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Die Kinder spielen im Park.',
          chips: ['子供たちは', '公園で', '遊んでいます'],
          correctOrder: ['子供たちは', '公園で', '遊んでいます'],
          correctAnswer: '子供たちは 公園で 遊んでいます',
          explanation: 'Thema + Ort で + 遊んでいます.'
        },
        {
          id: 'task-12-1-7',
          type: 'cloze',
          prompt: '今、日本語を ___。 (lerne gerade: 勉強する)',
          german: 'Ich lerne gerade Japanisch.',
          options: ['勉強しています', '勉強します', '勉強して', '勉強しました'],
          correctAnswer: '勉強しています',
          explanation: '勉強する → 勉強して + います.'
        },
        {
          id: 'task-12-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Es regnet gerade.',
          chips: ['雨が', '降っています'],
          correctOrder: ['雨が', '降っています'],
          correctAnswer: '雨が 降っています',
          explanation: 'Laufendes Wettergeschehen: 雨が 降っています.'
        }
      ]
    },
    {
      id: 'sub-12-2',
      title: '12.2 Verlaufsform Vergangenheit (〜ていました)',
      formula: 'Verb in て-Form + いました',
      explanation: 'Die Form **〜ていました** beschreibt eine Handlung, die zu einem **bestimmten Zeitpunkt in der Vergangenheit im Gange war** (Past Continuous / Vergangenheitsverlauf: "war gerade dabei zu tun").',
      realLifeContext: {
        badge: 'Was lief zu einem bestimmten Zeitpunkt?',
        why: 'Erklären, was man gestern um eine bestimmte Uhrzeit getan hat (z. B. als das Telefon klingelte).',
        when: [
          'Alibi / Tagesablauf: "Gestern um 8 Uhr habe ich ferngesehen (見ていました)."',
          'Rückblick: "Gestern Nacht habe ich gelernt."',
          'Unterbrechung schildern.'
        ],
        signalWords: ['昨日', 'その時', '〜ていました'],
        quickTip: 'ていました = "war gerade am Machen" in der Vergangenheit!'
      },
      examples: [
        {
          japanese: 'きのうテレビを見ていました。',
          romaji: 'Kinou terebi o mite imashita.',
          german: 'Gestern habe ich (zu dem Zeitpunkt) ferngesehen.'
        },
        {
          japanese: '昨夜音楽を聞いていました。',
          romaji: 'Sakuya ongaku o kiite imashita.',
          german: 'Gestern Nacht habe ich Musik gehört.'
        }
      ],
      tasks: [
        {
          id: 'task-12-2-1',
          type: 'cloze',
          prompt: '昨日の八時、本を ___。 (war am Lesen)',
          german: 'Gestern um 8 Uhr habe ich ein Buch gelesen.',
          options: ['読んでいました', '読みました', '読んでいます', '読見ました'],
          correctAnswer: '読んでいました',
          explanation: 'Verlaufsform in der Vergangenheit erfordert 〜ていました: 読んでいました.'
        },
        {
          id: 'task-12-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern Abend habe ich gearbeitet.',
          chips: ['昨日の夜、', '働いていました'],
          correctOrder: ['昨日の夜、', '働いていました'],
          correctAnswer: '昨日の夜、 働いていました',
          explanation: 'Zeitpunkt 昨日の夜 + 働いていました.'
        },
        {
          id: 'task-12-2-3',
          type: 'cloze',
          prompt: '昨日、何を ___。 (hast du gerade gemacht?)',
          german: 'Was hast du gestern (zu der Zeit) gemacht?',
          options: ['していましたか', 'しましたか', 'していますか', 'して'],
          correctAnswer: 'していましたか',
          explanation: 'Frage nach vergangener laufender Handlung: していましたか.'
        },
        {
          id: 'task-12-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern habe ich Ramen gekocht.',
          chips: ['昨日', 'ラーメンを', '作っていました'],
          correctOrder: ['昨日', 'ラーメンを', '作っていました'],
          correctAnswer: '昨日 ラーメンを 作っていました',
          explanation: '昨日 + ラーメンを + 作っていました.'
        },
        {
          id: 'task-12-2-5',
          type: 'cloze',
          prompt: 'その時、電話で ___。 (habe gesprochen: 話す)',
          german: 'Zu jener Zeit habe ich am Telefon gesprochen.',
          options: ['話していました', '話しました', '話しています', '話していでした'],
          correctAnswer: '話していました',
          explanation: '話す → 話して + いました.'
        },
        {
          id: 'task-12-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern Nacht habe ich Japanisch gelernt.',
          chips: ['昨夜', '日本語を', '勉強していました'],
          correctOrder: ['昨夜', '日本語を', '勉強していました'],
          correctAnswer: '昨夜 日本語を 勉強していました',
          explanation: 'Zeit 昨夜 + Objekt + 勉強していました.'
        },
        {
          id: 'task-12-2-7',
          type: 'cloze',
          prompt: '雨が ___。 (hatte gerade geregnet)',
          german: 'Es hatte geregnet.',
          options: ['降っていました', '降りました', '降っています', '降ってでした'],
          correctAnswer: '降っていました',
          explanation: 'Regnen im Vergangenheitsverlauf: 降っていました.'
        },
        {
          id: 'task-12-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe im Park spazieren gemacht.',
          chips: ['公園で', '歩いていました'],
          correctOrder: ['公園で', '歩いていました'],
          correctAnswer: '公園で 歩いていました',
          explanation: 'Ort 公園で + 歩いていました.'
        }
      ]
    },
    {
      id: 'sub-12-3',
      title: '12.3 Regelmäßige Gewohnheiten (毎日 / よく)',
      formula: '[Signalwort: 毎日 / よく] + [Verb in て-Form] + います',
      explanation: 'Neben einmaligen Momentaufnahmen drückt **〜ています** auch **dauerhafte Gewohnheiten, Berufe und regelmäßige Lebensweisen** aus, die sich über einen längeren Zeitraum wiederholen. Typische Signalwörter sind **毎日** (jeden Tag) und **よく** (oft).',
      realLifeContext: {
        badge: 'Dauerzustände & Gewohnheiten',
        why: 'Über den Beruf, das Studium, regelmäßige Hobbys und Routinen sprechen.',
        when: [
          'Studium: "Ich lerne zurzeit an der Universität Japanisch (勉強しています)."',
          'Arbeitsplatz: "Ich arbeite oft zuhause (仕事をしています)."',
          'Fitness: "Ich gehe jeden Tag laufen."'
        ],
        signalWords: ['毎日', 'よく', 'いつも', '〜ています'],
        quickTip: 'Wiederholt sich eine Handlung im Alltag? Drücke sie mit 〜ています aus!'
      },
      examples: [
        {
          japanese: '毎日日本語を勉強しています。',
          romaji: 'Mainichi nihongo o benkyou shite imasu.',
          german: 'Ich lerne jeden Tag Japanisch (als feste Routine).'
        },
        {
          japanese: 'よくうちで仕事をしています。',
          romaji: 'Yoku uchi de shigoto o shite imasu.',
          german: 'Ich arbeite oft von zu Hause aus.'
        }
      ],
      tasks: [
        {
          id: 'task-12-3-1',
          type: 'cloze',
          prompt: '大学で ドイツ語を ___。 (lerne zurzeit: 勉強する)',
          german: 'Ich lerne an der Universität Deutsch.',
          options: ['勉強しています', '勉強します', '勉強しました', '勉強して'],
          correctAnswer: '勉強しています',
          explanation: 'Laufendes Studium / Gewohnheit wird mit 勉強しています ausgedrückt.'
        },
        {
          id: 'task-12-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich arbeite bei einer Firma.',
          chips: ['会社で', '働いています'],
          correctOrder: ['会社で', '働いています'],
          correctAnswer: '会社で 働いています',
          explanation: 'Berufstätigkeit als andauernde Gewohnheit: 会社で 働いています.'
        },
        {
          id: 'task-12-3-3',
          type: 'cloze',
          prompt: '毎日、公園を ___。 (Gewohnheit: gehe spazieren: 歩く)',
          german: 'Jeden Tag gehe ich im Park spazieren.',
          options: ['歩いています', '歩きます', '歩きました', '歩きて'],
          correctAnswer: '歩いています',
          explanation: 'Tägliche Gewohnheit mit 毎日 drückt man mit 歩いています aus.'
        },
        {
          id: 'task-12-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich trinke oft Tee.',
          chips: ['よく', 'お茶を', '飲んでいます'],
          correctOrder: ['よく', 'お茶を', '飲んでいます'],
          correctAnswer: 'よく お茶を 飲んでいます',
          explanation: 'Gewohnheit mit よく: よく お茶を 飲んでいます.'
        },
        {
          id: 'task-12-3-5',
          type: 'cloze',
          prompt: '毎朝、新聞を ___。 (Gewohnheit: lese: 読む)',
          german: 'Jeden Morgen lese ich die Zeitung.',
          options: ['読んでいます', '読みます', '読みました', '読みて'],
          correctAnswer: '読んでいます',
          explanation: 'Dauerhafte morgendliche Routine: 読んでいます.'
        },
        {
          id: 'task-12-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Herr Tanaka unterrichtet an der Schule.',
          chips: ['田中さんは', '学校で', '教えています'],
          correctOrder: ['田中さんは', '学校で', '教えています'],
          correctAnswer: '田中さんは 学校で 教えています',
          explanation: 'Thema + Ort + 教えています (unterrichtet).'
        },
        {
          id: 'task-12-3-7',
          type: 'cloze',
          prompt: 'よく音楽を ___。 (Gewohnheit: höre: 聞く)',
          german: 'Ich höre oft Musik.',
          options: ['聞いています', '聞きます', '聞きました', '聞きて'],
          correctAnswer: '聞いています',
          explanation: 'Häufige Aktivität: 聞いています.'
        },
        {
          id: 'task-12-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich fahre jeden Tag mit dem Auto.',
          chips: ['毎日', '車を', '運転しています'],
          correctOrder: ['毎日', '車を', '運転しています'],
          correctAnswer: '毎日 車を 運転しています',
          explanation: '毎日 + 車を 運転しています (fahre Auto).'
        }
      ]
    }
  ]
};
