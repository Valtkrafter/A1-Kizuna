import type { TopicModule } from '../../types/curriculum';

export const module4: TopicModule = {
  id: 'mod-4',
  title: 'Modul 4: Partikeln (Aufzählungen)',
  category: 'Partikeln',
  subRules: [
    {
      id: 'sub-4-1',
      title: '4.1 Partikel と (Vollständige Aufzählung & "mit")',
      formula: '[Nomen A] + と + [Nomen B] / [Begleitperson] + と + [Verb]',
      explanation: 'Die Partikel **と** erfüllt zwei fundamentale Aufgaben: Sie verbindet Nomen in einer **vollständigen, erschöpfenden Aufzählung** ("und") oder markiert die **Begleitperson**, mit der man gemeinsam etwas tut ("zusammen mit"). Frage nach der Begleitperson: **だれと**.',
      realLifeContext: {
        badge: 'Partner & geschlossene Listen',
        why: 'Gemeinsame Aktivitäten mit Freunden planen oder vollständige Bestellungen aufgeben.',
        when: [
          'Essen mit Begleitung: "Ich esse mit einem Freund."',
          'Geschlossene Aufzählung: "Ich kaufe Sushi und Tempura (nur diese beiden Dinge)."',
          'Fragen nach Begleitern: "Mit wem fährst du?"'
        ],
        signalWords: ['友達と', '家族と', 'だれと', '寿司と天ぷら'],
        quickTip: 'と schließt die Liste komplett ab oder nimmt jemanden an die Hand ("mit").'
      },
      examples: [
        {
          japanese: '寿司と天ぷらを食べます。',
          romaji: 'Sushi to tenpura o tabemasu.',
          german: 'Ich esse Sushi und Tempura.'
        },
        {
          japanese: '友達と食べます。',
          romaji: 'Tomodachi to tabemasu.',
          german: 'Ich esse mit einem Freund.'
        }
      ],
      tasks: [
        {
          id: 'task-4-1-1',
          type: 'cloze',
          prompt: 'だれ ___ 日本へ行きますか。',
          german: 'Mit wem fährst du nach Japan?',
          options: ['と', 'に', 'で', 'を'],
          correctAnswer: 'と',
          explanation: 'Frage nach der Begleitperson erfordert die Partikel と (だれと = mit wem).'
        },
        {
          id: 'task-4-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse mit meiner Familie.',
          chips: ['家族と', '食べます'],
          correctOrder: ['家族と', '食べます'],
          correctAnswer: '家族と 食べます',
          explanation: 'Begleitperson 家族と + Verb 食べます.'
        },
        {
          id: 'task-4-1-3',
          type: 'cloze',
          prompt: 'パン ___ 肉を買います。',
          german: 'Ich kaufe Brot und Fleisch.',
          options: ['と', 'を', 'に', 'で'],
          correctAnswer: 'と',
          explanation: 'と verbindet die beiden Nomen パン und 肉 vollständig.'
        },
        {
          id: 'task-4-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich lerne mit Herrn Tanaka.',
          chips: ['田中さんと', '勉強します'],
          correctOrder: ['田中さんと', '勉強します'],
          correctAnswer: '田中さんと 勉強します',
          explanation: 'Partner 田中さんと + 勉強します.'
        },
        {
          id: 'task-4-1-5',
          type: 'cloze',
          prompt: '母 ___ 買い物します。',
          german: 'Ich gehe mit meiner Mutter einkaufen.',
          options: ['と', 'に', 'を', 'へ'],
          correctAnswer: 'と',
          explanation: 'Begleitpartikel と ("mit meiner Mutter").'
        },
        {
          id: 'task-4-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich trinke Bier und Wein.',
          chips: ['ビールと', 'ワインを', '飲みます'],
          correctOrder: ['ビールと', 'ワインを', '飲みます'],
          correctAnswer: 'ビールと ワインを 飲みます',
          explanation: 'Aufzählung Nomen + と + Nomen + を + 飲みます.'
        },
        {
          id: 'task-4-1-7',
          type: 'cloze',
          prompt: '先生 ___ 話します。',
          german: 'Ich spreche mit dem Lehrer.',
          options: ['と', 'を', 'で', 'へ'],
          correctAnswer: 'と',
          explanation: 'Gesprächspartner bei gegenseitiger Konversation wird mit と markiert.'
        },
        {
          id: 'task-4-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich gehe mit einem Freund ins Kino.',
          chips: ['友達と', '映画に', '行きます'],
          correctOrder: ['友達と', '映画に', '行きます'],
          correctAnswer: '友達と 映画に 行きます',
          explanation: 'Begleiter 友達と + Ziel/Aktivität 映画に + 行きます.'
        }
      ]
    },
    {
      id: 'sub-4-2',
      title: '4.2 Partikel や (Beispielhafte Aufzählung)',
      formula: '[Nomen A] + や + [Nomen B] (など)',
      explanation: 'Während と eine vollständige Aufzählung darstellt, nutzt man **や** für eine **beispielhafte, unvollständige Liste** ("wie zum Beispiel / unter anderem"). Oft wird am Ende der Liste **など** ("und so weiter") ergänzt.',
      realLifeContext: {
        badge: 'Auszug aus einer Liste',
        why: 'Dinge aufzählen, ohne jedes einzelne Detail erschöpfend nennen zu müssen.',
        when: [
          'Im Café / Supermarkt: "Ich habe Bier, Wein (und anderes) gekauft."',
          'Hobbys beschreiben: "Ich mag Ramen, Udon usw."',
          'Einen Eindruck vermitteln, ohne pingelig alles aufzuzählen.'
        ],
        signalWords: ['〜や〜', 'など'],
        quickTip: 'と = alles auf dem Tisch; や = zwei Beispiele von vielen Möglichkeiten!'
      },
      examples: [
        {
          japanese: '本や新聞を読みます。',
          romaji: 'Hon ya shinbun o yomimasu.',
          german: 'Ich lese unter anderem Bücher und Zeitungen.'
        },
        {
          japanese: 'ラーメンやうどんを食べます。',
          romaji: 'Raamen ya udon o tabemasu.',
          german: 'Ich esse zum Beispiel Ramen und Udon.'
        }
      ],
      tasks: [
        {
          id: 'task-4-2-1',
          type: 'cloze',
          prompt: '店でパン ___ 魚を買いました。',
          german: 'Im Laden kaufte ich unter anderem Brot und Fisch.',
          options: ['や', 'に', 'で', 'へ'],
          correctAnswer: 'や',
          explanation: 'や zeigt an, dass die Liste beispielhaft ist und noch weitere Dinge gekauft wurden.'
        },
        {
          id: 'task-4-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich trinke zum Beispiel Wasser und Tee.',
          chips: ['水や', 'お茶を', '飲みます'],
          correctOrder: ['水や', 'お茶を', '飲みます'],
          correctAnswer: '水や お茶を 飲みます',
          explanation: 'Beispielhafte Aufzählung mit や vor dem nächsten Nomen.'
        },
        {
          id: 'task-4-2-3',
          type: 'cloze',
          prompt: '部屋に机 ___ 椅子があります。',
          german: 'Im Zimmer gibt es unter anderem einen Tisch und Stühle.',
          options: ['や', 'を', 'へ', 'で'],
          correctAnswer: 'や',
          explanation: 'Aufzählung von Einrichtungsgegenständen als Auszug mit や.'
        },
        {
          id: 'task-4-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse unter anderem Fleisch und Fisch.',
          chips: ['肉や', '魚を', '食べます'],
          correctOrder: ['肉や', '魚を', '食べます'],
          correctAnswer: '肉や 魚を 食べます',
          explanation: 'Nomen + や + Nomen + を + 食べます.'
        },
        {
          id: 'task-4-2-5',
          type: 'cloze',
          prompt: '犬 ___ 猫が好きです。',
          german: 'Ich mag zum Beispiel Hunde und Katzen.',
          options: ['や', 'に', 'で', 'へ'],
          correctAnswer: 'や',
          explanation: 'や dient zur beispielhaften Nennung von Beispielen.'
        },
        {
          id: 'task-4-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe Stifte und Papier gekauft.',
          chips: ['ペンや', '紙を', '買いました'],
          correctOrder: ['ペンや', '紙を', '買いました'],
          correctAnswer: 'ペンや 紙を 買いました',
          explanation: 'Unvollständige Aufzählung gekaufter Utensilien mit や.'
        },
        {
          id: 'task-4-2-7',
          type: 'cloze',
          prompt: '東京 ___ 京都へ行きます。',
          german: 'Ich fahre unter anderem nach Tokio und Kyoto.',
          options: ['や', 'を', 'で', 'へ'],
          correctAnswer: 'や',
          explanation: 'や verbindet Stationen einer Reise beispielhaft.'
        },
        {
          id: 'task-4-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse Sushi, Udon und anderes.',
          chips: ['寿司や', 'うどんを', '食べます'],
          correctOrder: ['寿司や', 'うどんを', '食べます'],
          correctAnswer: '寿司や うどんを 食べます',
          explanation: 'Beispielaufzählung von Gerichten mit や.'
        }
      ]
    },
    {
      id: 'sub-4-3',
      title: '4.3 Partikel か (Alternative: "oder")',
      formula: '[Option A] + か + [Option B]',
      explanation: 'Mitten im Satz zwischen zwei Nomen bedeutet die Partikel **か** "oder". Sie bietet eine Auswahl zwischen Alternativen an ("A oder B").',
      realLifeContext: {
        badge: 'Entscheidungen anbieten',
        why: 'Auswahlmöglichkeiten beim Bestellen, Verabreden oder Nachfragen anbieten.',
        when: [
          'Getränkewunsch erfragen: "Möchtest du Wasser oder Tee?"',
          'Termin abstimmen: "Kommst du am Samstag oder am Sonntag?"',
          'Optionen abwägen.'
        ],
        signalWords: ['〜か〜', '水かお茶'],
        quickTip: 'Am Satzende ist か ein Fragezeichen; zwischen Wörtern bedeutet es "oder"!'
      },
      examples: [
        {
          japanese: '水かお茶を飲みます。',
          romaji: 'Mizu ka ocha o nomimasu.',
          german: 'Ich trinke Wasser oder Tee.'
        },
        {
          japanese: '今日か明日行きます。',
          romaji: 'Kyou ka ashita ikimasu.',
          german: 'Ich gehe heute oder morgen.'
        }
      ],
      tasks: [
        {
          id: 'task-4-3-1',
          type: 'cloze',
          prompt: 'ビール ___ ワインを飲みますか。',
          german: 'Trinken Sie Bier oder Wein?',
          options: ['か', 'と', 'や', 'で'],
          correctAnswer: 'か',
          explanation: 'Alternative zwischen zwei Getränken wird mit dem Wort か (oder) gebildet.'
        },
        {
          id: 'task-4-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich fahre mit dem Bus oder der Bahn.',
          chips: ['バスか', '電車で', '行きます'],
          correctOrder: ['バスか', '電車で', '行きます'],
          correctAnswer: 'バスか 電車で 行きます',
          explanation: 'Alternative Optionen バスか + 電車で + 行きます.'
        },
        {
          id: 'task-4-3-3',
          type: 'cloze',
          prompt: 'パン ___ ご飯を食べます。',
          german: 'Ich esse Brot oder Reis.',
          options: ['か', 'と', 'に', 'へ'],
          correctAnswer: 'か',
          explanation: 'か verbindet die Essensoptionen alternativ.'
        },
        {
          id: 'task-4-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse Fisch oder Fleisch.',
          chips: ['魚か', '肉を', '食べます'],
          correctOrder: ['魚か', '肉を', '食べます'],
          correctAnswer: '魚か 肉を 食べます',
          explanation: 'Alternative Nomen 魚か + 肉を + Verb 食べます.'
        },
        {
          id: 'task-4-3-5',
          type: 'cloze',
          prompt: '土曜日 ___ 日曜日に行きます。',
          german: 'Ich gehe am Samstag oder Sonntag.',
          options: ['か', 'と', 'を', 'で'],
          correctAnswer: 'か',
          explanation: 'Terminalternative: 土曜日か日曜日.'
        },
        {
          id: 'task-4-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich trinke Kaffee oder Tee.',
          chips: ['コーヒーか', 'お茶を', '飲みます'],
          correctOrder: ['コーヒーか', 'お茶を', '飲みます'],
          correctAnswer: 'コーヒーか お茶を 飲みます',
          explanation: 'Getränkeauswahl mit か.'
        },
        {
          id: 'task-4-3-7',
          type: 'cloze',
          prompt: 'ペン ___ 鉛筆がありますか。',
          german: 'Haben Sie einen Stift oder einen Bleistift?',
          options: ['か', 'に', 'を', 'で'],
          correctAnswer: 'か',
          explanation: 'か bietet die Auswahl zwischen den Gegenständen.'
        },
        {
          id: 'task-4-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse Ramen oder Udon.',
          chips: ['ラーメンか', 'うどんを', '食べます'],
          correctOrder: ['ラーメンか', 'うどんを', '食べます'],
          correctAnswer: 'ラーメンか うどんを 食べます',
          explanation: 'Auswahl mit か vor dem Prädikat.'
        }
      ]
    }
  ]
};
