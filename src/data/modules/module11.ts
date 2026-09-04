import type { TopicModule } from '../../types/curriculum';

export const module11: TopicModule = {
  id: 'mod-11',
  title: 'Modul 11: Sätze verknüpfen mit der て-Form',
  category: 'Te-Form',
  subRules: [
    {
      id: 'sub-11-1',
      title: '11.1 Chronologische Handlungsabläufe (Aて、B)',
      formula: '[Verb 1: て-Form]、[Verb 2: て-Form]、[Verb 3: Konjugiert]',
      explanation: 'Mit der **て-Form** verbindest du mehrere Handlungen chronologisch in einem einzigen flüssigen Satz ("Ich tat A, dann B, und schließlich C"). **Wichtig:** Alle vorangehenden Verben stehen neutral in der て-Form – erst das **letzte Verb** am Satzende entscheidet über Gegenwart, Zukunft oder Vergangenheit!',
      realLifeContext: {
        badge: 'Abläufe verbinden',
        why: 'Seinen Tagesablauf, Rezepte oder Reiserouten wie ein Muttersprachler schildern.',
        when: [
          'Morgenroutine: "Ich stehe um 7 Uhr auf, frühstücke und gehe zur Schule."',
          'Abendablauf: "Ich habe geduscht, gelesen und geschlafen."',
          'Vermeidet abgehackte Einzelsätze mit vielen Punkten.'
        ],
        signalWords: ['起きて', '食べて', '行って', 'それから'],
        quickTip: 'Das letzte Verb bestimmt die Zeitform des gesamten Satzes!'
      },
      examples: [
        {
          japanese: '七時に起きて、朝ごはんを食べて、学校に行きます。',
          romaji: 'Shichiji ni okite, asagohan o tabete, gakkou ni ikimasu.',
          german: 'Ich stehe um 7 Uhr auf, esse Frühstück und gehe zur Schule.'
        },
        {
          japanese: '映画を見て、お茶を飲みました。',
          romaji: 'Eiga o mite, ocha o nomimashita.',
          german: 'Ich habe einen Film geschaut und Tee getrunken.'
        }
      ],
      tasks: [
        {
          id: 'task-11-1-1',
          type: 'cloze',
          prompt: '本を ___、寝ました。 (Verknüpfung: lesen)',
          german: 'Ich habe ein Buch gelesen und geschlafen.',
          options: ['読んで', '読みまして', '読んでから', '読みて'],
          correctAnswer: '読んで',
          explanation: 'Chronologische Verknüpfung von 読む verlangt die て-Form: 読んで.'
        },
        {
          id: 'task-11-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich stehe um 7 Uhr auf und wasche mein Gesicht.',
          chips: ['七時に', '起きて、', '顔を', '洗います'],
          correctOrder: ['七時に', '起きて、', '顔を', '洗います'],
          correctAnswer: '七時に 起きて、 顔を 洗います',
          explanation: 'Reihenfolge: 起きて (aufstehen) + 顔を 洗います (Gesicht waschen).'
        },
        {
          id: 'task-11-1-3',
          type: 'cloze',
          prompt: 'パンを ___、コーヒーを飲みました。 (essen)',
          german: 'Ich habe Brot gegessen und Kaffee getrunken.',
          options: ['食べて', '食べまして', '食べって', '食べで'],
          correctAnswer: '食べて',
          explanation: '食べる wird zu 食べて.'
        },
        {
          id: 'task-11-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich gehe zum Laden und kaufe Wasser.',
          chips: ['店に', '行って、', '水を', '買います'],
          correctOrder: ['店に', '行って、', '水を', '買います'],
          correctAnswer: '店に 行って、 水を 買います',
          explanation: 'Reihenfolge: 行って (gehen) + 水を 買います (Wasser kaufen).'
        },
        {
          id: 'task-11-1-5',
          type: 'cloze',
          prompt: '手紙を ___、ポストに入れました。 (schreiben)',
          german: 'Ich habe einen Brief geschrieben und eingeworfen.',
          options: ['書いて', '書くで', '書きて', '書いてから'],
          correctAnswer: '書いて',
          explanation: '書く wechselt in der Verknüpfung zu 書いて.'
        },
        {
          id: 'task-11-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich putze meine Zähne und gehe schlafen.',
          chips: ['歯を', '磨いて、', '寝ます'],
          correctOrder: ['歯を', '磨いて、', '寝ます'],
          correctAnswer: '歯を 磨いて、 寝ます',
          explanation: 'Reihenfolge: 歯を 磨いて + 寝ます.'
        },
        {
          id: 'task-11-1-7',
          type: 'cloze',
          prompt: '音楽を ___、本を読みました。 (hören)',
          german: 'Ich habe Musik gehört und ein Buch gelesen.',
          options: ['聞いて', '聞くで', '聞きまして', '聞いてから'],
          correctAnswer: '聞いて',
          explanation: '聞く wird zu 聞いて.'
        },
        {
          id: 'task-11-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich treffe meinen Freund und trinke Tee.',
          chips: ['友達に', '会って、', 'お茶を', '飲みます'],
          correctOrder: ['友達に', '会って、', 'お茶を', '飲みます'],
          correctAnswer: '友達に 会って、 お茶を 飲みます',
          explanation: '会う (treffen) wird zu 会って.'
        }
      ]
    },
    {
      id: 'sub-11-2',
      title: '11.2 〜てから (Nachdem...)',
      formula: '[Verb in て-Form] + から、[Hauptsatz]',
      explanation: 'Die Konstruktion **〜てから** betont ausdrücklich die **feste zeitliche Reihenfolge** zweier Handlungen ("nachdem ich A getan habe, tue ich B"). Handlung B kann erst beginnen, wenn Handlung A vollständig beendet ist.',
      realLifeContext: {
        badge: 'Feste Reihenfolge betonen',
        why: 'Klare zeitliche Vorbedingungen und Regeln im Alltag ausdrücken.',
        when: [
          'Hygieneregeln: "Nachdem ich die Hände gewaschen habe, esse ich."',
          'Tagesablauf: "Erst nachdem ich gefrühstückt habe, gehe ich zur Schule."',
          'Sicherheit: "Nachdem der Zug hält, steige ich aus."'
        ],
        signalWords: ['〜てから', '食べてから', '起きてから'],
        quickTip: 'てから = "erst nachdem" – setzt den Startschuss für die nächste Aktion!'
      },
      examples: [
        {
          japanese: '朝ごはんを食べてから、学校に行きます。',
          romaji: 'Asagohan o tabete kara, gakkou ni ikimasu.',
          german: 'Nachdem ich gefrühstückt habe, gehe ich zur Schule.'
        },
        {
          japanese: '手を洗ってから、食べます。',
          romaji: 'Te o aratte kara, tabemasu.',
          german: 'Nachdem ich mir die Hände gewaschen habe, esse ich.'
        }
      ],
      tasks: [
        {
          id: 'task-11-2-1',
          type: 'cloze',
          prompt: '手を ___、ご飯を食べます。 (nachdem gewaschen: 洗う)',
          german: 'Nachdem ich mir die Hände gewaschen habe, esse ich.',
          options: ['洗ってから', '洗うから', '洗いてから', '洗いましてから'],
          correctAnswer: '洗ってから',
          explanation: '洗う (U-Verb auf う) bildet 洗って + から → 洗ってから.'
        },
        {
          id: 'task-11-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem ich aufgestanden bin, trinke ich Wasser.',
          chips: ['起きてから、', '水を', '飲みます'],
          correctOrder: ['起きてから、', '水を', '飲みます'],
          correctAnswer: '起きてから、 水を 飲みます',
          explanation: 'Bedingung 起きてから + Hauptsatz 水を 飲みます.'
        },
        {
          id: 'task-11-2-3',
          type: 'cloze',
          prompt: '本を ___、寝ました。 (nachdem gelesen: 読む)',
          german: 'Nachdem ich das Buch gelesen hatte, ging ich schlafen.',
          options: ['読んでから', '読むから', '読みてから', '読みまして'],
          correctAnswer: '読んでから',
          explanation: '読む → 読んで + から → 読んでから.'
        },
        {
          id: 'task-11-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Erst nachdem ich gearbeitet habe, schaue ich fern.',
          chips: ['働いてから、', 'テレビを', '見ます'],
          correctOrder: ['働いてから、', 'テレビを', '見ます'],
          correctAnswer: '働いてから、 テレビを 見ます',
          explanation: '働く → 働いてから + テレビを 見ます.'
        },
        {
          id: 'task-11-2-5',
          type: 'cloze',
          prompt: '日本に ___、日本語を勉強します。 (nachdem hingefahren: 行く)',
          german: 'Nachdem ich nach Japan gefahren bin, lerne ich Japanisch.',
          options: ['行ってから', '行くから', '行きてから', '行いでから'],
          correctAnswer: '行ってから',
          explanation: '行く bildet die te-Form 行って + から.'
        },
        {
          id: 'task-11-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem ich gegessen habe, gehe ich los.',
          chips: ['食べてから、', '出かけます'],
          correctOrder: ['食べてから、', '出かけます'],
          correctAnswer: '食べてから、 出かけます',
          explanation: '食べてから + 出かけます.'
        },
        {
          id: 'task-11-2-7',
          type: 'cloze',
          prompt: '手紙を ___、出かけました。 (nachdem geschrieben: 書く)',
          german: 'Nachdem ich den Brief geschrieben hatte, ging ich los.',
          options: ['書いてから', '書くから', '書いでから', '書きてから'],
          correctAnswer: '書いてから',
          explanation: '書く → 書いてから.'
        },
        {
          id: 'task-11-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem ich geduscht habe, schlafe ich.',
          chips: ['シャワーを', '浴びてから、', '寝ます'],
          correctOrder: ['シャワーを', '浴びてから、', '寝ます'],
          correctAnswer: 'シャワーを 浴びてから、 寝ます',
          explanation: '浴びる → 浴びてから + 寝ます.'
        }
      ]
    },
    {
      id: 'sub-11-3',
      title: '11.3 Subjektwechsel mit が',
      formula: '[Nebensatz-Subjekt] が [Verb 1 て-Form]、[Hauptsatz-Thema] は [Verb 2]',
      explanation: 'Wenn in einem komplexen Satz der Nebensatz ein **anderes Subjekt** hat als der Hauptsatz, wird das Subjekt des Nebensatzes zwingend mit der Partikel **が** markiert. Das Hauptthema des Satzes behält **は**.',
      realLifeContext: {
        badge: 'Zwei Subjekte in einem Satz',
        why: 'Ereignisse beschreiben, bei denen sich das handelnde Subjekt im Satzverlauf ändert.',
        when: [
          'Kinobesuch: "Nachdem der Film zu Ende war (映画が終わってから), trank ich Kaffee (私はコーヒーを飲みます)."',
          'Wetterwechsel: "Nachdem der Regen aufhörte (雨が止んでから), ging ich spazieren."',
          'Vermeidung von Doppel-は Verwirrung.'
        ],
        signalWords: ['映画が終わってから', '雨が降って', '〜が〜て、〜は〜'],
        quickTip: 'Im Nebensatz hat は Hausverbot – dort regiert immer が!'
      },
      examples: [
        {
          japanese: '映画が終わってから、私はコーヒーを飲みます。',
          romaji: 'Eiga ga owatte kara, watashi wa koohii o nomimasu.',
          german: 'Nachdem der Film zu Ende ist, trinke ich Kaffee.'
        },
        {
          japanese: '雨が降って、出かけませんでした。',
          romaji: 'Ame ga futte, dekakemasendeshita.',
          german: 'Weil es regnete, bin ich nicht ausgegangen.'
        }
      ],
      tasks: [
        {
          id: 'task-11-3-1',
          type: 'cloze',
          prompt: '映画 ___ 終わってから、帰ります。',
          german: 'Nachdem der Film zu Ende ist, kehre ich nach Hause zurück.',
          options: ['が', 'は', 'を', 'に'],
          correctAnswer: 'が',
          explanation: 'Das Subjekt im Nebensatz (映画) wird zwingend mit が markiert.'
        },
        {
          id: 'task-11-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem der Unterricht beendet war, ging ich nach Hause.',
          chips: ['授業が', '終わってから、', 'うちに', '帰りました'],
          correctOrder: ['授業が', '終わってから、', 'うちに', '帰りました'],
          correctAnswer: '授業が 終わってから、 うちに 帰りました',
          explanation: 'Nebensatz-Subjekt 授業が + 終わってから + うちに 帰りました.'
        },
        {
          id: 'task-11-3-3',
          type: 'cloze',
          prompt: '友達 ___ 来てから、映画を見ました。',
          german: 'Nachdem mein Freund gekommen war, schauten wir einen Film.',
          options: ['が', 'は', 'を', 'で'],
          correctAnswer: 'が',
          explanation: 'Subjektwechsel im Nebensatz: 友達が 来てから.'
        },
        {
          id: 'task-11-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem der Film vorbei war, trank ich Kaffee.',
          chips: ['映画が', '終わってから、', 'コーヒーを', '飲みました'],
          correctOrder: ['映画が', '終わってから、', 'コーヒーを', '飲みました'],
          correctAnswer: '映画が 終わってから、 コーヒーを 飲みました',
          explanation: '映画が 終わってから + コーヒーを 飲みました.'
        },
        {
          id: 'task-11-3-5',
          type: 'cloze',
          prompt: '雨 ___ 降ってから、寒くなりました。',
          german: 'Nachdem es geregnet hatte, wurde es kalt.',
          options: ['が', 'は', 'を', 'に'],
          correctAnswer: 'が',
          explanation: '雨 (Regen) ist das Subjekt des Naturphänomens und verlangt が.'
        },
        {
          id: 'task-11-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem der Lehrer gekommen war, begann der Unterricht.',
          chips: ['先生が', '来てから、', '授業が', '始まりました'],
          correctOrder: ['先生が', '来てから、', '授業が', '始まりました'],
          correctAnswer: '先生が 来てから、 授業が 始まりました',
          explanation: '先生が 来てから + 授業が 始まりました.'
        },
        {
          id: 'task-11-3-7',
          type: 'cloze',
          prompt: '子供 ___ 寝てから、本を読みます。',
          german: 'Nachdem die Kinder schlafen, lese ich ein Buch.',
          options: ['が', 'は', 'を', 'に'],
          correctAnswer: 'が',
          explanation: 'Im Nebensatz vor てから steht das Subjekt mit が.'
        },
        {
          id: 'task-11-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Nachdem Herr Tanaka ankam, begannen wir das Essen.',
          chips: ['田中さんが', '来てから、', 'ご飯を', '食べました'],
          correctOrder: ['田中さんが', '来てから、', 'ご飯を', '食べました'],
          correctAnswer: '田中さんが 来てから、 ご飯を 食べました',
          explanation: '田中さんが 来てから + ご飯を 食べました.'
        }
      ]
    }
  ]
};
