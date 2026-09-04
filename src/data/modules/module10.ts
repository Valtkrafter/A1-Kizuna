import type { TopicModule } from '../../types/curriculum';

export const module10: TopicModule = {
  id: 'mod-10',
  title: 'Modul 10: Die て-Form (Bildungsregeln & Bitten)',
  category: 'Te-Form',
  subRules: [
    {
      id: 'sub-10-1',
      title: '10.1 Bildungsregeln nach Verbgruppen',
      formula: 'る→て | う/つ/る→って | む/ぶ/ぬ→んで | く→いて (行く→行って!) | ぐ→いで | す→して | する→して | くる→きて',
      explanation: 'Die **て-Form** ist der Schlüssel zu fast allen fortgeschrittenen Grammatikmustern des Japanischen. Ihre Bildung folgt klaren Regeln nach der letzten Silbe der Wörterbuchform: 1. RU-Verben: る fällt weg → て (食べて, 見て). 2. U-Verben: う/つ/る → って (買って, 待って, 帰って); む/ぶ/ぬ → んで (読んで, 遊んで, 死んで); く → いて (書いて – Ausnahme: 行く → 行って!); ぐ → いで (泳いで); す → して (話して). 3. Unregelmäßig: する → して, くる → きて.',
      realLifeContext: {
        badge: 'Der Schlüssel zu allen Verknüpfungen',
        why: 'Die wichtigste Konjugationsform für Bitten, Satzverknüpfungen und Verlaufsformen.',
        when: [
          'Sätze hintereinander schalten: "Ich stehe auf und esse Frühstück."',
          'Bitten formulieren: "Bitte lesen Sie das."',
          'Laufende Aktionen beschreiben: "Ich lerne gerade."'
        ],
        signalWords: ['食べて', '飲んで', '書いて', '行って', 'して'],
        quickTip: 'Erinnere dich an den て-Song: "u, tsu, ru -> tte; mu, bu, nu -> nde; ku -> ite; gu -> ide; su -> shite"!'
      },
      examples: [
        {
          japanese: '本を読んで、寝ます。',
          romaji: 'Hon o yonde, nemasu.',
          german: 'Ich lese ein Buch und gehe schlafen.'
        },
        {
          japanese: '手紙を書いて、出かけます。',
          romaji: 'Tegami o kaite, dekakemasu.',
          german: 'Ich schreibe einen Brief und gehe los.'
        }
      ],
      tasks: [
        {
          id: 'task-10-1-1',
          type: 'cloze',
          prompt: '「飲む」のて形は ___ です。',
          german: 'Die te-Form von "nomu" ist nonde.',
          options: ['飲んで', '飲みて', '飲って', '飲いで'],
          correctAnswer: '飲んで',
          explanation: 'Endung む wechselt in der て-Form zu んで: 飲む → 飲んで.'
        },
        {
          id: 'task-10-1-2',
          type: 'cloze',
          prompt: '「行く」のて形は ___ です。 (Wichtige Ausnahme!)',
          german: 'Die te-Form von "iku" ist itte (Ausnahme!).',
          options: ['行って', '行いて', '行いで', '行きて'],
          correctAnswer: '行って',
          explanation: 'Große Ausnahme: 行く wird nicht zu 行いて, sondern zu 行って!'
        },
        {
          id: 'task-10-1-3',
          type: 'order',
          prompt: 'Setze die te-Form zusammen:',
          german: 'kaufen -> te-Form (katte)',
          chips: ['買って'],
          correctOrder: ['買って'],
          correctAnswer: '買って',
          explanation: '買う (u) wird zu 買って (tte).'
        },
        {
          id: 'task-10-1-4',
          type: 'cloze',
          prompt: '「待つ」のて形は ___ です。',
          german: 'Die te-Form von "matsu" ist matte.',
          options: ['待って', '待いて', '待ちて', '待んで'],
          correctAnswer: '待って',
          explanation: 'つ wird zu って: 待つ → 待って.'
        },
        {
          id: 'task-10-1-5',
          type: 'cloze',
          prompt: '「話す」のて形は ___ です。',
          german: 'Die te-Form von "hanasu" ist hanashite.',
          options: ['話して', '話いて', '話って', '話しで'],
          correctAnswer: '話して',
          explanation: 'す wird zu して: 話す → 話して.'
        },
        {
          id: 'task-10-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse und trinke.',
          chips: ['食べて、', '飲みます'],
          correctOrder: ['食べて、', '飲みます'],
          correctAnswer: '食べて、 飲みます',
          explanation: 'RU-Verb 食べる wird zu 食べて.'
        },
        {
          id: 'task-10-1-7',
          type: 'cloze',
          prompt: '「泳ぐ」のて形は ___ です。',
          german: 'Die te-Form von "oyogu" ist oyoide.',
          options: ['泳いで', '泳いて', '泳いで', '泳いで'],
          correctAnswer: '泳いで',
          explanation: 'ぐ wird mit Stimmhaftigkeit zu いで: 泳ぐ → 泳いで.'
        },
        {
          id: 'task-10-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich schwimme und spiele.',
          chips: ['泳いで、', '遊びます'],
          correctOrder: ['泳いで、', '遊びます'],
          correctAnswer: '泳いで、 遊びます',
          explanation: '泳いで + 遊びます.'
        }
      ]
    },
    {
      id: 'sub-10-2',
      title: '10.2 Höfliche Bitten (〜てください)',
      formula: 'Verb in て-Form + ください',
      explanation: 'Die Kombination aus der **て-Form** und **ください** (kudasai) ist die japanische Standardformel für höfliche Bitten und Anweisungen ("Bitte tun Sie...").',
      realLifeContext: {
        badge: 'Höflich bitten im Alltag',
        why: 'Im Restaurant bestellen, nach dem Weg fragen oder im Unterricht Anweisungen verstehen.',
        when: [
          'Zuhören: "Bitte hören Sie gut zu (聞いてください)."',
          'Lesen: "Bitte lesen Sie diesen Text (読んでください)."',
          'Ermutigung: "Geben Sie Ihr Bestes (がんばってください)!"'
        ],
        signalWords: ['聞いてください', '読んでください', '書いてください', '待ってください'],
        quickTip: 'Nimm die te-Form und hänge ください an – so bittet man höflich!'
      },
      examples: [
        {
          japanese: '日本語を聞いてください。',
          romaji: 'Nihongo o kiite kudasai.',
          german: 'Bitte hören Sie Japanisch an.'
        },
        {
          japanese: 'この本を読んでください。',
          romaji: 'Kono hon o yonde kudasai.',
          german: 'Bitte lesen Sie dieses Buch.'
        }
      ],
      tasks: [
        {
          id: 'task-10-2-1',
          type: 'cloze',
          prompt: '名前を ___。 (Bitte schreiben Sie: 書く)',
          german: 'Bitte schreiben Sie Ihren Namen.',
          options: ['書いてください', '書くください', '書きてください', '書いて'],
          correctAnswer: '書いてください',
          explanation: '書く wird zu 書いて + ください → 書いてください.'
        },
        {
          id: 'task-10-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Bitte warten Sie einen Moment.',
          chips: ['ちょっと', '待って', 'ください'],
          correctOrder: ['ちょっと', '待って', 'ください'],
          correctAnswer: 'ちょっと 待って ください',
          explanation: 'ちょっと (ein wenig) + 待って + ください.'
        },
        {
          id: 'task-10-2-3',
          type: 'cloze',
          prompt: '日本語で ___。 (Bitte sprechen Sie: 話す)',
          german: 'Bitte sprechen Sie auf Japanisch.',
          options: ['話してください', '話すください', '話しください', '話いてください'],
          correctAnswer: '話してください',
          explanation: '話す → 話して + ください.'
        },
        {
          id: 'task-10-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Bitte hören Sie die Musik an.',
          chips: ['音楽を', '聞いて', 'ください'],
          correctOrder: ['音楽を', '聞いて', 'ください'],
          correctAnswer: '音楽を 聞いて ください',
          explanation: 'Objekt 音楽を + 聞いて + ください.'
        },
        {
          id: 'task-10-2-5',
          type: 'cloze',
          prompt: 'ここに ___。 (Bitte kommen Sie: くる)',
          german: 'Bitte kommen Sie hierher.',
          options: ['来てください', 'くってください', 'くるください', 'きってください'],
          correctAnswer: '来てください',
          explanation: 'くる hat die te-Form きて: 来てください.'
        },
        {
          id: 'task-10-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Geben Sie bitte Ihr Bestes!',
          chips: ['がんばって', 'ください'],
          correctOrder: ['がんばって', 'ください'],
          correctAnswer: 'がんばって ください',
          explanation: 'Feststehende Ermutigung: がんばってください.'
        },
        {
          id: 'task-10-2-7',
          type: 'cloze',
          prompt: 'お茶を ___。 (Bitte trinken Sie: 飲む)',
          german: 'Bitte trinken Sie Tee.',
          options: ['飲んでください', '飲みてください', '飲むください', '飲って'],
          correctAnswer: '飲んでください',
          explanation: '飲む → 飲んで + ください.'
        },
        {
          id: 'task-10-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Bitte schauen Sie den Film an.',
          chips: ['映画を', '見て', 'ください'],
          correctOrder: ['映画を', '見て', 'ください'],
          correctAnswer: '映画を 見て ください',
          explanation: '見る (RU-Verb) → 見て + ください.'
        }
      ]
    }
  ]
};
