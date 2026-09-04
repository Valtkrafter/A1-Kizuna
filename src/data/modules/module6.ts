import type { TopicModule } from '../../types/curriculum';

export const module6: TopicModule = {
  id: 'mod-6',
  title: 'Modul 6: Existenzverben & Besitz (ある vs. いる)',
  category: 'Existenz',
  subRules: [
    {
      id: 'sub-6-1',
      title: '6.1 Belebt vs. Unbelebt',
      formula: 'Lebewesen + が + います vs. Gegenstände/Pflanzen + が + あります',
      explanation: 'Japanisch unterscheidet strikt zwischen belebten und unbelebten Subjekten: Für **Lebewesen** (Menschen, Tiere), die sich aus eigenem Willen bewegen, nutzt man **いる / います**. Für **Gegenstände, Pflanzen und Gebäude** nutzt man **ある / あります**.',
      realLifeContext: {
        badge: 'Bewegt es sich selbst?',
        why: 'Die kardinale Unterscheidung zwischen Mensch/Tier und Gegenstand im japanischen Sprachgefühl.',
        when: [
          'Haustiere und Personen nennen: "Da ist eine Katze", "Der Lehrer ist da."',
          'Gegenstände lokalisieren: "Das Buch liegt auf dem Tisch."',
          'Fehler wie "犬があります" vermeiden.'
        ],
        signalWords: ['います', 'あります', 'いません', 'ありません'],
        quickTip: 'Hat es einen Herzschlag? Dann います! Ist es ein Objekt? Dann あります!'
      },
      examples: [
        {
          japanese: '庭に猫がいます。',
          romaji: 'Niwa ni neko ga imasu.',
          german: 'Im Garten ist eine Katze.'
        },
        {
          japanese: '机の上に本があります。',
          romaji: 'Tsukue no ue ni hon ga arimasu.',
          german: 'Auf dem Schreibtisch liegt ein Buch.'
        }
      ],
      tasks: [
        {
          id: 'task-6-1-1',
          type: 'cloze',
          prompt: '公園に 犬が ___。',
          german: 'Im Park ist ein Hund.',
          options: ['います', 'あります', 'します', 'です'],
          correctAnswer: 'います',
          explanation: '犬 (Hund) ist ein Lebewesen und verlangt います.'
        },
        {
          id: 'task-6-1-2',
          type: 'cloze',
          prompt: '部屋に テレビが ___。',
          german: 'Im Zimmer steht ein Fernseher.',
          options: ['あります', 'います', 'します', 'なります'],
          correctAnswer: 'あります',
          explanation: 'テレビ ist ein unbelebtes Gerät und verlangt あります.'
        },
        {
          id: 'task-6-1-3',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Dort ist ein Schüler.',
          chips: ['学生が', 'います'],
          correctOrder: ['学生が', 'います'],
          correctAnswer: '学生が います',
          explanation: 'Person (学生) + Subjektpartikel が + います.'
        },
        {
          id: 'task-6-1-4',
          type: 'cloze',
          prompt: '台所に 水が ___。',
          german: 'In der Küche gibt es Wasser.',
          options: ['あります', 'います', 'でした', 'します'],
          correctAnswer: 'あります',
          explanation: 'Wasser ist unbelebt → あります.'
        },
        {
          id: 'task-6-1-5',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Es gibt kein Geld.',
          chips: ['お金が', 'ありません'],
          correctOrder: ['お金が', 'ありません'],
          correctAnswer: 'お金が ありません',
          explanation: 'Geld (unbelebt) verneint: ありません.'
        },
        {
          id: 'task-6-1-6',
          type: 'cloze',
          prompt: '教室に 先生が ___。',
          german: 'Im Klassenzimmer ist der Lehrer.',
          options: ['います', 'あります', 'します', '行きます'],
          correctAnswer: 'います',
          explanation: '先生 (Lehrer) als Person verlangt います.'
        },
        {
          id: 'task-6-1-7',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Hier ist eine Katze.',
          chips: ['ここに', '猫が', 'います'],
          correctOrder: ['ここに', '猫が', 'います'],
          correctAnswer: 'ここに 猫が います',
          explanation: 'Ort ここに + Subjekt 猫が + います.'
        },
        {
          id: 'task-6-1-8',
          type: 'cloze',
          prompt: '車が ___。 (Gegenstand)',
          german: 'Da ist ein Auto.',
          options: ['あります', 'います', 'します', 'です'],
          correctAnswer: 'あります',
          explanation: 'Autos sind Gegenstände und nutzen あります.'
        }
      ]
    },
    {
      id: 'sub-6-2',
      title: '6.2 Satzbau-Muster (Ort に Nomen が vs. Nomen は Ort に)',
      formula: '[Ort] に [Nomen] が あります/います vs. [Nomen] は [Ort] に あります/います',
      explanation: 'Der Unterschied liegt im Fokus: 1. **[Ort] に [Nomen] が あります/います**: Neue Information! Was befindet sich an diesem Ort? ("Im Garten ist eine Katze"). 2. **[Nomen] は [Ort] に あります/います**: Bekanntes Thema! Wo befindet sich die gesuchte Sache? ("Die Katze ist im Garten").',
      realLifeContext: {
        badge: 'Suchen vs. Beschreiben',
        why: 'Präzise danach fragen, wo sich ein Gegenstand befindet, oder einen Raum beschreiben.',
        when: [
          'Zimmer beschreiben: "In meinem Zimmer gibt es einen Schreibtisch."',
          'Etwas suchen: "Wo ist die Katze? — Die Katze ist im Garten."',
          'Weg zum Geschäft: "Der Supermarkt ist neben dem Bahnhof."'
        ],
        signalWords: ['〜に〜があります', '〜は〜にあります', 'どこに'],
        quickTip: 'Ort に Nomen が = Was gibt es dort? Nomen は Ort に = Wo ist es?'
      },
      examples: [
        {
          japanese: '庭に猫がいます。',
          romaji: 'Niwa ni neko ga imasu.',
          german: 'Im Garten ist eine Katze.'
        },
        {
          japanese: '猫は庭にいます。',
          romaji: 'Neko wa niwa ni imasu.',
          german: 'Die Katze ist im Garten.'
        }
      ],
      tasks: [
        {
          id: 'task-6-2-1',
          type: 'cloze',
          prompt: '本は 机の上に ___。',
          german: 'Das Buch liegt auf dem Schreibtisch.',
          options: ['あります', 'います', 'します', 'です'],
          correctAnswer: 'あります',
          explanation: 'Thema 本は sucht seinen Ort 机の上に + あります.'
        },
        {
          id: 'task-6-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Herr Tanaka ist im Zimmer.',
          chips: ['田中さんは', '部屋に', 'います'],
          correctOrder: ['田中さんは', '部屋に', 'います'],
          correctAnswer: '田中さんは 部屋に います',
          explanation: 'Thema 田中さんは + Ort 部屋に + います.'
        },
        {
          id: 'task-6-2-3',
          type: 'cloze',
          prompt: '公園 ___ 犬がいます。',
          german: 'Im Park ist ein Hund.',
          options: ['に', 'で', 'を', 'へ'],
          correctAnswer: 'に',
          explanation: 'Bei Existenzverben (います/あります) wird der Ort mit に markiert (niemals で!).'
        },
        {
          id: 'task-6-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Im Zimmer steht ein Fernseher.',
          chips: ['部屋に', 'テレビが', 'あります'],
          correctOrder: ['部屋に', 'テレビが', 'あります'],
          correctAnswer: '部屋に テレビが あります',
          explanation: 'Ort (部屋に) + neues Subjekt (テレビが) + あります.'
        },
        {
          id: 'task-6-2-5',
          type: 'cloze',
          prompt: '先生は どこ ___ いますか。',
          german: 'Wo ist der Lehrer?',
          options: ['に', 'で', 'を', 'へ'],
          correctAnswer: 'に',
          explanation: 'Frage nach dem Aufenthaltsort mit どこに.'
        },
        {
          id: 'task-6-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Der Hund ist im Garten.',
          chips: ['犬は', '庭に', 'います'],
          correctOrder: ['犬は', '庭に', 'います'],
          correctAnswer: '犬は 庭に います',
          explanation: 'Thema 犬は + Ort 庭に + います.'
        },
        {
          id: 'task-6-2-7',
          type: 'cloze',
          prompt: '台所に 母 ___ います。',
          german: 'In der Küche ist meine Mutter.',
          options: ['が', 'を', 'に', 'で'],
          correctAnswer: 'が',
          explanation: 'Das neu eingeführte Subjekt der Existenz wird mit が markiert.'
        },
        {
          id: 'task-6-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Auf dem Tisch liegt die Zeitung.',
          chips: ['新聞は', '机の上に', 'あります'],
          correctOrder: ['新聞は', '机の上に', 'あります'],
          correctAnswer: '新聞は 机の上に あります',
          explanation: 'Thema 新聞は + Ort 机の上に + あります.'
        }
      ]
    },
    {
      id: 'sub-6-3',
      title: '6.3 Fragewörter mit が & Besitz',
      formula: '何がありますか / だれがいますか & [Besitz] が あります',
      explanation: 'Fragewörter wie **何** (was) oder **だれ** (wer) können niemals mit は markiert werden – sie verlangen immer die Subjektpartikel **が** (z. B. `何がありますか`, `だれがいますか`). Außerdem drückt **あります** im Japanischen persönlichen Besitz aus ("Ich besitze / habe eine Uhr" = `時計があります`).',
      realLifeContext: {
        badge: 'Was gibt es? / Was besitze ich?',
        why: 'Nach unbekannten Personen/Dingen fragen und Besitzverhältnisse ausdrücken.',
        when: [
          'Fragen: "Wer ist im Zimmer?" oder "Was ist auf dem Tisch?"',
          'Besitz ausdrücken: "Ich habe ein Auto / Geld / eine Uhr."',
          'Kein Auto besitzen: "車がありません."'
        ],
        signalWords: ['何がありますか', 'だれがいますか', '車があります', '時間があります'],
        quickTip: 'Fragewörter hassen は und lieben が! "Haben" wird im Japanischen mit ある ausgedrückt.'
      },
      examples: [
        {
          japanese: '何がありますか。',
          romaji: 'Nani ga arimasu ka.',
          german: 'Was gibt es dort?'
        },
        {
          japanese: '車があります。',
          romaji: 'Kuruma ga arimasu.',
          german: 'Ich habe ein Auto.'
        }
      ],
      tasks: [
        {
          id: 'task-6-3-1',
          type: 'cloze',
          prompt: '教室に だれ ___ いますか。',
          german: 'Wer ist im Klassenzimmer?',
          options: ['が', 'は', 'を', 'に'],
          correctAnswer: 'が',
          explanation: 'Fragewörter wie だれ verlangen als Satzsubjekt immer が.'
        },
        {
          id: 'task-6-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe eine Uhr.',
          chips: ['時計が', 'あります'],
          correctOrder: ['時計が', 'あります'],
          correctAnswer: '時計が あります',
          explanation: 'Besitzanzeige: Gegenstand + が + あります.'
        },
        {
          id: 'task-6-3-3',
          type: 'cloze',
          prompt: '箱の中に 何 ___ ありますか。',
          german: 'Was ist in der Schachtel?',
          options: ['が', 'は', 'を', 'で'],
          correctAnswer: 'が',
          explanation: 'Das Fragewort 何 wird im Fragesubjekt mit が verbunden.'
        },
        {
          id: 'task-6-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe Zeit.',
          chips: ['時間が', 'あります'],
          correctOrder: ['時間が', 'あります'],
          correctAnswer: '時間が あります',
          explanation: 'Zeit haben = 時間が あります.'
        },
        {
          id: 'task-6-3-5',
          type: 'cloze',
          prompt: 'お金 ___ ありません。',
          german: 'Ich habe kein Geld.',
          options: ['が', 'を', 'に', 'で'],
          correctAnswer: 'が',
          explanation: 'Besitzverneinung mit Nomen + が + ありません.'
        },
        {
          id: 'task-6-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Wer ist im Garten?',
          chips: ['庭に', 'だれが', 'いますか'],
          correctOrder: ['庭に', 'だれが', 'いますか'],
          correctAnswer: '庭に だれが いますか',
          explanation: 'Ort 庭に + Fragewort だれが + いますか.'
        },
        {
          id: 'task-6-3-7',
          type: 'cloze',
          prompt: '車 ___ ありますか。',
          german: 'Haben Sie ein Auto?',
          options: ['が', 'を', 'に', 'で'],
          correctAnswer: 'が',
          explanation: 'Frage nach Besitz mit Nomen + が + ありますか.'
        },
        {
          id: 'task-6-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Was ist auf dem Schreibtisch?',
          chips: ['机の上に', '何が', 'ありますか'],
          correctOrder: ['机の上に', '何が', 'ありますか'],
          correctAnswer: '机の上に 何が ありますか',
          explanation: 'Ort 机の上に + Fragewort 何が + ありますか.'
        }
      ]
    }
  ]
};
