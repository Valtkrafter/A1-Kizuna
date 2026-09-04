import type { TopicModule } from '../../types/curriculum';

export const module3: TopicModule = {
  id: 'mod-3',
  title: 'Modul 3: Partikeln (Zeit, Ort & Hilfsmittel)',
  category: 'Partikeln',
  subRules: [
    {
      id: 'sub-3-1',
      title: '3.1 Partikel に (Zeitpunkt)',
      formula: '[Fester Zeitpunkt] + に + [Verb]',
      explanation: 'Die Partikel **に** markiert einen exakten Zeitpunkt, an dem eine Handlung stattfindet. Sie steht ausschließlich bei Begriffen mit konkreten Zahlen oder festen Kalendertagen (z. B. `7時に`, `日曜日に`). Bei relativen Zeitangaben wie `今日`, `明日`, `毎日` oder dem Fragewort `いつ` darf **niemals に** verwendet werden.',
      realLifeContext: {
        badge: 'Termine & Uhrzeiten',
        why: 'Präzise Verabredungen treffen und den eigenen Tagesablauf zeitlich strukturieren.',
        when: [
          'Aufstehen und Schlafen: "Ich stehe um 7 Uhr auf."',
          'Verabredung am Wochentag: "Am Sonntag treffe ich Freunde."',
          'Achtung bei: "Heute", "Morgen", "Jeden Tag" – immer OHNE に!'
        ],
        signalWords: ['七時に', '八時に', '十一時に', '日曜日に', '何時に'],
        quickTip: 'Enthält die Zeitangabe eine Zahl oder einen Wochentag? Dann kommt に!'
      },
      examples: [
        {
          japanese: '七時に起きます。',
          romaji: 'Shichiji ni okimasu.',
          german: 'Ich stehe um 7 Uhr auf.'
        },
        {
          japanese: '日曜日に京都へ行きます。',
          romaji: 'Nichiyoubi ni kyouto e ikimasu.',
          german: 'Am Sonntag fahre ich nach Kyoto.'
        }
      ],
      tasks: [
        {
          id: 'task-3-1-1',
          type: 'cloze',
          prompt: '毎朝、八時 ___ 起きます。',
          german: 'Jeden Morgen stehe ich um 8 Uhr auf.',
          options: ['に', 'で', 'を', 'は'],
          correctAnswer: 'に',
          explanation: 'Konkrete Uhrzeiten verlangen die Partikel に.'
        },
        {
          id: 'task-3-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Um wie viel Uhr gehst du schlafen?',
          chips: ['何時に', '寝ますか'],
          correctOrder: ['何時に', '寝ますか'],
          correctAnswer: '何時に 寝ますか',
          explanation: 'Frage nach der Uhrzeit: 何時に + Verb.'
        },
        {
          id: 'task-3-1-3',
          type: 'cloze',
          prompt: '今日 ___ 日本へ行きます。',
          german: 'Heute fahre ich nach Japan.',
          options: ['は', 'に', 'で', 'を'],
          correctAnswer: 'は',
          explanation: '今日 ist eine relative Zeitangabe und darf NIEMALS mit に kombiniert werden.'
        },
        {
          id: 'task-3-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Um 11 Uhr gehe ich ins Bett.',
          chips: ['十一時に', '寝ます'],
          correctOrder: ['十一時に', '寝ます'],
          correctAnswer: '十一時に 寝ます',
          explanation: 'Zeitpunkt 十一時に vor dem Verb 寝ます.'
        },
        {
          id: 'task-3-1-5',
          type: 'cloze',
          prompt: 'いつ ___ 日本へ行きますか。',
          german: 'Wann fahren Sie nach Japan?',
          options: ['Ø (ohne)', 'に', 'で', 'を'],
          correctAnswer: 'Ø (ohne)',
          explanation: 'Das Fragewort いつ (wann) steht stets ohne に.'
        },
        {
          id: 'task-3-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Am Sonntag lerne ich Japanisch.',
          chips: ['日曜日に', '日本語を', '勉強します'],
          correctOrder: ['日曜日に', '日本語を', '勉強します'],
          correctAnswer: '日曜日に 日本語を 勉強します',
          explanation: 'Wochentag + に + Objekt + Verb.'
        },
        {
          id: 'task-3-1-7',
          type: 'cloze',
          prompt: '明日 ___ 友達に会います。',
          german: 'Morgen treffe ich einen Freund.',
          options: ['は', 'に', 'で', 'を'],
          correctAnswer: 'は',
          explanation: '明日 (morgen) ist relativ und wird nicht mit に markiert (maximal mit は als Thema).'
        },
        {
          id: 'task-3-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Jeden Morgen stehe ich um 7 Uhr auf.',
          chips: ['毎朝', '七時に', '起きます'],
          correctOrder: ['毎朝', '七時に', '起きます'],
          correctAnswer: '毎朝 七時に 起きます',
          explanation: '毎朝 (ohne に) + 七時に (mit に) + 起きます.'
        }
      ]
    },
    {
      id: 'sub-3-2',
      title: '3.2 Partikel に vs. へ (Bestimmungsort / Ziel)',
      formula: '[Zielort] + に / へ + [Fortbewegungsverb]',
      explanation: 'Bei Bewegungsverben wie **行きます** (gehen), **来ます** (kommen) und **帰ります** (nach Hause zurückkehren) markiert **に** den konkreten Zielpunkt ("nach...") und **へ** (ausgesprochen "e") die Bewegungsrichtung ("in Richtung..."). Im A1-Alltag sind beide meist austauschbar.',
      realLifeContext: {
        badge: 'Navigationsziel',
        why: 'Wegbeschreibungen geben, Reiseziele nennen und Verabredungsorte festlegen.',
        when: [
          'Pendeln: "Ich fahre zum Bahnhof."',
          'Reisepläne: "Morgen fliege ich nach Japan."',
          'Heimweg: "Ich gehe nach Hause."'
        ],
        signalWords: ['行きます', '来ます', '帰ります', 'どこに', 'どこへ'],
        quickTip: 'に fokussiert die Landung am Ziel, へ den Flugkorridor dorthin.'
      },
      examples: [
        {
          japanese: '東京に行きます。',
          romaji: 'Toukyou ni ikimasu.',
          german: 'Ich fahre nach Tokio.'
        },
        {
          japanese: 'どこへ行きますか。',
          romaji: 'Doko e ikimasu ka.',
          german: 'Wohin fährst du?'
        }
      ],
      tasks: [
        {
          id: 'task-3-2-1',
          type: 'cloze',
          prompt: '駅 ___ 行きます。',
          german: 'Ich gehe zum Bahnhof.',
          options: ['に', 'で', 'を', 'から'],
          correctAnswer: 'に',
          explanation: 'Zielort einer Fortbewegung wird mit に oder へ markiert.'
        },
        {
          id: 'task-3-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich kehre nach Hause zurück.',
          chips: ['うちに', '帰ります'],
          correctOrder: ['うちに', '帰ります'],
          correctAnswer: 'うちに 帰ります',
          explanation: 'Ziel うちに + 帰ります.'
        },
        {
          id: 'task-3-2-3',
          type: 'cloze',
          prompt: '明日、日本 ___ 来ます。',
          german: 'Morgen kommt er/sie nach Japan.',
          options: ['へ', 'で', 'を', 'の'],
          correctAnswer: 'へ',
          explanation: 'Richtungspartikel へ markiert das Ziel bei 来ます.'
        },
        {
          id: 'task-3-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Wohin gehst du?',
          chips: ['どこに', '行きますか'],
          correctOrder: ['どこに', '行きますか'],
          correctAnswer: 'どこに 行きますか',
          explanation: 'Fragewort どこに + 行きますか.'
        },
        {
          id: 'task-3-2-5',
          type: 'cloze',
          prompt: '学校 ___ 行きません。',
          german: 'Ich gehe nicht zur Schule.',
          options: ['に', 'で', 'を', 'と'],
          correctAnswer: 'に',
          explanation: 'Zielpunkt einer verneinten Fortbewegung bleibt に.'
        },
        {
          id: 'task-3-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Maria fährt nach Amerika.',
          chips: ['マリアさんは', 'アメリカへ', '行きます'],
          correctOrder: ['マリアさんは', 'アメリカへ', '行きます'],
          correctAnswer: 'マリアさんは アメリカへ 行きます',
          explanation: 'Thema + Zielort mit へ + Fortbewegungsverb.'
        },
        {
          id: 'task-3-2-7',
          type: 'cloze',
          prompt: '大学 ___ 来ました。',
          german: 'Ich bin zur Universität gekommen.',
          options: ['に', 'で', 'を', 'は'],
          correctAnswer: 'に',
          explanation: 'Bestimmungsort der Ankunft wird mit に angegeben.'
        },
        {
          id: 'task-3-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich fahre nach Kyoto.',
          chips: ['京都に', '行きます'],
          correctOrder: ['京都に', '行きます'],
          correctAnswer: '京都に 行きます',
          explanation: 'Zielort 京都に + Verb 行きます.'
        }
      ]
    },
    {
      id: 'sub-3-3',
      title: '3.3 Partikel で (Ort der Handlung)',
      formula: '[Handlungsort] + で + [Aktionsverb]',
      explanation: 'Die Partikel **で** markiert die Bühne, an der eine aktive Handlung ausgeführt wird ("in / an / auf"). Frage nach dem Handlungsort immer mit **どこで**.',
      realLifeContext: {
        badge: 'Bühne der Action',
        why: 'Orte angeben, an denen Aktivitäten stattfinden (Sport, Essen, Einkaufen, Lesen).',
        when: [
          'Sport im Park: "Ich bewege mich im Park."',
          'Einkaufsbummel: "Ich kaufe im Kaufhaus ein."',
          'Lernen: "Ich lerne in der Bibliothek."'
        ],
        signalWords: ['公園で', 'デパートで', '図書館で', 'どこで'],
        quickTip: 'Passiert dort Action? Dann Nomen + で! Steht dort nur etwas herum? Dann に.'
      },
      examples: [
        {
          japanese: '公園で運動します。',
          romaji: 'Kouen de undou shimasu.',
          german: 'Ich mache im Park Sport.'
        },
        {
          japanese: 'デパートで買い物します。',
          romaji: 'Depaato de kaimono shimasu.',
          german: 'Ich kaufe im Kaufhaus ein.'
        }
      ],
      tasks: [
        {
          id: 'task-3-3-1',
          type: 'cloze',
          prompt: '図書館 ___ 本を読みます。',
          german: 'In der Bibliothek lese ich ein Buch.',
          options: ['で', 'に', 'を', 'へ'],
          correctAnswer: 'で',
          explanation: 'Am Handlungsort 図書館 findet die Aktion 本を読みます statt → で.'
        },
        {
          id: 'task-3-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Wo kaufst du ein?',
          chips: ['どこで', '買い物しますか'],
          correctOrder: ['どこで', '買い物しますか'],
          correctAnswer: 'どこで 買い物しますか',
          explanation: 'Frage nach dem Handlungsort: どこで + Verb.'
        },
        {
          id: 'task-3-3-3',
          type: 'cloze',
          prompt: '店 ___ パンを買います。',
          german: 'Im Laden kaufe ich Brot.',
          options: ['で', 'に', 'へ', 'を'],
          correctAnswer: 'で',
          explanation: 'Kaufhandlung am Ort 店 verlangt die Partikel で.'
        },
        {
          id: 'task-3-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse im Zimmer.',
          chips: ['部屋で', '食べます'],
          correctOrder: ['部屋で', '食べます'],
          correctAnswer: '部屋で 食べます',
          explanation: 'Ort der Handlung 部屋で + 食べます.'
        },
        {
          id: 'task-3-3-5',
          type: 'cloze',
          prompt: '台所 ___ 魚を料理します。',
          german: 'In der Küche bereite ich Fisch zu.',
          options: ['で', 'に', 'へ', 'と'],
          correctAnswer: 'で',
          explanation: 'Die Zubereitung findet in der Küche statt → 台所で.'
        },
        {
          id: 'task-3-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich lerne in der Schule.',
          chips: ['学校で', '勉強します'],
          correctOrder: ['学校で', '勉強します'],
          correctAnswer: '学校で 勉強します',
          explanation: 'Handlungsort 学校で + 勉強します.'
        },
        {
          id: 'task-3-3-7',
          type: 'cloze',
          prompt: '庭 ___ 犬と遊びます。',
          german: 'Im Garten spiele ich mit dem Hund.',
          options: ['で', 'に', 'へ', 'を'],
          correctAnswer: 'で',
          explanation: 'Spielen ist eine aktive Handlung im Garten → 庭で.'
        },
        {
          id: 'task-3-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich treffe meinen Freund am Bahnhof.',
          chips: ['駅で', '友達に', '会います'],
          correctOrder: ['駅で', '友達に', '会います'],
          correctAnswer: '駅で 友達に 会います',
          explanation: 'Treffpunkt als Handlungsort: 駅で + 友達に 会います.'
        }
      ]
    },
    {
      id: 'sub-3-4',
      title: '3.4 Partikel で (Transport & Werkzeuge)',
      formula: '[Mittel / Werkzeug / Transportmittel] + で + [Verb]',
      explanation: 'Die Partikel **で** kennzeichnet außerdem das benutzte Werkzeug, Hilfsmittel, die verwendete Sprache oder das Verkehrsmittel ("mittels / per / mit / auf"). Frage: **何で行きますか** (Womit fahren Sie?).',
      realLifeContext: {
        badge: 'Tools & Verkehr',
        why: 'Fortbewegungsmittel, Essbesteck, Kommunikationsmittel und Sprachen benennen.',
        when: [
          'Verkehrsmittel wählen: "Ich fahre mit dem Bus / Zug."',
          'Beim Essen: "Ich esse mit Stäbchen."',
          'Sprache festlegen: "Ich spreche auf Japanisch."'
        ],
        signalWords: ['バスで', '電車で', '箸で', '日本語で', '何で'],
        quickTip: 'Womit führst du die Aktion aus? Mit dem Werkzeug/Transportmittel + で!'
      },
      examples: [
        {
          japanese: 'バスで行きます。',
          romaji: 'Basu de ikimasu.',
          german: 'Ich fahre mit dem Bus.'
        },
        {
          japanese: '箸で食べます。',
          romaji: 'Hashi de tabemasu.',
          german: 'Ich esse mit Stäbchen.'
        }
      ],
      tasks: [
        {
          id: 'task-3-4-1',
          type: 'cloze',
          prompt: '電車 ___ 行きます。',
          german: 'Ich fahre mit dem Zug.',
          options: ['で', 'に', 'を', 'へ'],
          correctAnswer: 'で',
          explanation: 'Transportmittel 電車 (Zug) wird mit で markiert.'
        },
        {
          id: 'task-3-4-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich spreche auf Japanisch.',
          chips: ['日本語で', '話します'],
          correctOrder: ['日本語で', '話します'],
          correctAnswer: '日本語で 話します',
          explanation: 'Die verwendete Sprache wird mit で angeschlossen.'
        },
        {
          id: 'task-3-4-3',
          type: 'cloze',
          prompt: 'タクシー ___ 帰ります。',
          german: 'Ich fahre mit dem Taxi nach Hause.',
          options: ['で', 'に', 'を', 'へ'],
          correctAnswer: 'で',
          explanation: 'Verkehrsmittel タクシー verlangt die Partikel で.'
        },
        {
          id: 'task-3-4-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Womit fährst du?',
          chips: ['何で', '行きますか'],
          correctOrder: ['何で', '行きますか'],
          correctAnswer: '何で 行きますか',
          explanation: 'Frage nach dem Mittel: 何で + 行きますか.'
        },
        {
          id: 'task-3-4-5',
          type: 'cloze',
          prompt: 'ペン ___ 手紙を書きます。',
          german: 'Ich schreibe mit dem Stift einen Brief.',
          options: ['で', 'に', 'を', 'は'],
          correctAnswer: 'で',
          explanation: 'Schreibwerkzeug ペン wird mit で markiert.'
        },
        {
          id: 'task-3-4-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich fahre mit dem Auto.',
          chips: ['車で', '行きます'],
          correctOrder: ['車で', '行きます'],
          correctAnswer: '車で 行きます',
          explanation: 'Transportmittel 車で + 行きます.'
        },
        {
          id: 'task-3-4-7',
          type: 'cloze',
          prompt: 'ドイツ語 ___ 話します。',
          german: 'Ich spreche auf Deutsch.',
          options: ['で', 'を', 'に', 'は'],
          correctAnswer: 'で',
          explanation: 'Sprache als Kommunikationsmittel verlangt で.'
        },
        {
          id: 'task-3-4-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse Ramen mit Stäbchen.',
          chips: ['箸で', 'ラーメンを', '食べます'],
          correctOrder: ['箸で', 'ラーメンを', '食べます'],
          correctAnswer: '箸で ラーメンを 食べます',
          explanation: 'Werkzeug (箸で) + Objekt (ラーメンを) + Verb (食べます).'
        }
      ]
    }
  ]
};
