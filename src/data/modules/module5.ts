import type { TopicModule } from '../../types/curriculum';

export const module5: TopicModule = {
  id: 'mod-5',
  title: 'Modul 5: Verben (Klassen & Höfliche Gegenwart)',
  category: 'Verben',
  subRules: [
    {
      id: 'sub-5-1',
      title: '5.1 Verbgruppen (RU-Verben vs. U-Verben vs. Unregelmäßig)',
      formula: 'RU-Verben (-iru/-eru) vs. U-Verben (Godan) vs. Unregelmäßig (する / くる)',
      explanation: 'Japanische Verben teilen sich in drei Gruppen: 1. **RU-Verben (Ichidan)**: enden auf -iru oder -eru (z. B. 食べる, 見る). Bei ihnen fällt das る einfach weg. 2. **U-Verben (Godan)**: alle anderen Verben (z. B. 飲む, 行く, 話す). 3. **Unregelmäßig**: nur zwei Verben: する (tun) und くる (kommen).',
      realLifeContext: {
        badge: 'Das Konjugationsfundament',
        why: 'Die richtige Verbgruppe bestimmt jede Konjugation (masu-, te-, nai-Form) fehlerfrei.',
        when: [
          'Ein neues Verb im Wörterbuch nachschlagen und sofort beugen können.',
          'Erkennen, ob る wegfällt oder ein Lautwechsel nötig ist.',
          'Ausnahmen wie 帰る (U-Verb!) beherrschen.'
        ],
        signalWords: ['食べる', '見る', '飲む', 'する', 'くる'],
        quickTip: 'Endet auf -iru/-eru? Meistens RU-Verb! Macht es ein U? U-Verb! する & くる sind solo.'
      },
      examples: [
        {
          japanese: 'パンを食べます。（食べる：RU-Verb）',
          romaji: 'Pan o tabemasu. (taberu: ru-verb)',
          german: 'Ich esse Brot. (taberu: RU-Verb)'
        },
        {
          japanese: 'お茶を飲みます。（飲む：U-Verb）',
          romaji: 'Ocha o nomimasu. (nomu: u-verb)',
          german: 'Ich trinke Tee. (nomu: U-Verb)'
        }
      ],
      tasks: [
        {
          id: 'task-5-1-1',
          type: 'cloze',
          prompt: '「見る」のグループはどれですか。— ___。',
          german: 'Zu welcher Verbgruppe gehört "miru" (sehen)? — RU-Verb.',
          options: ['RU-Verb (Ichidan)', 'U-Verb (Godan)', 'Unregelmäßig', 'Nomen'],
          correctAnswer: 'RU-Verb (Ichidan)',
          explanation: '見る endet auf -iru und ist ein klassisches RU-Verb (る entfällt vor ます → 見ます).'
        },
        {
          id: 'task-5-1-2',
          type: 'cloze',
          prompt: '「する」と「くる」は ___ Verbenです。',
          german: '"suru" und "kuru" sind unregelmäßige Verben.',
          options: ['unregelmäßige', 'RU-', 'U-', 'adjektivische'],
          correctAnswer: 'unregelmäßige',
          explanation: 'Im Japanischen gibt es nur zwei unregelmäßige Verben: する und くる.'
        },
        {
          id: 'task-5-1-3',
          type: 'cloze',
          prompt: '「飲む」は ___ です。',
          german: '"nomu" ist ein U-Verb.',
          options: ['U-Verb (Godan)', 'RU-Verb (Ichidan)', 'Unregelmäßig', 'Hilfsverb'],
          correctAnswer: 'U-Verb (Godan)',
          explanation: '飲む endet auf -mu und gehört zu den U-Verben (Godan).'
        },
        {
          id: 'task-5-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich schaue jeden Tag fern.',
          chips: ['毎日', 'テレビを', '見ます'],
          correctOrder: ['毎日', 'テレビを', '見ます'],
          correctAnswer: '毎日 テレビを 見ます',
          explanation: 'RU-Verb 見る verliert das る und wird zu 見ます.'
        },
        {
          id: 'task-5-1-5',
          type: 'cloze',
          prompt: '「話す」のます形は ___ です。',
          german: 'Die masu-Form von "hanasu" ist hanashimasu.',
          options: ['話します', '話すます', '話しまする', '話しります'],
          correctAnswer: '話します',
          explanation: 'U-Verb auf す wechselt zu し vor ます (話す → 話します).'
        },
        {
          id: 'task-5-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich lerne Japanisch.',
          chips: ['日本語を', '勉強します'],
          correctOrder: ['日本語を', '勉強します'],
          correctAnswer: '日本語を 勉強します',
          explanation: '勉強する konjugiert unregelmäßig zu 勉強します.'
        },
        {
          id: 'task-5-1-7',
          type: 'cloze',
          prompt: '「起きる」のグループはどれですか。— ___。',
          german: 'Zu welcher Gruppe gehört "okiru" (aufstehen)? — RU-Verb.',
          options: ['RU-Verb (Ichidan)', 'U-Verb (Godan)', 'Unregelmäßig', 'Adjektiv'],
          correctAnswer: 'RU-Verb (Ichidan)',
          explanation: '起きる endet auf -iru und ist ein RU-Verb (起き + ます).'
        },
        {
          id: 'task-5-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Morgen komme ich zur Schule.',
          chips: ['明日', '学校に', '来ます'],
          correctOrder: ['明日', '学校に', '来ます'],
          correctAnswer: '明日 学校に 来ます',
          explanation: 'Unregelmäßiges Verb くる wird zu 来ます (kimasu).'
        }
      ]
    },
    {
      id: 'sub-5-2',
      title: '5.2 U-Verben Stammbildung (u -> i)',
      formula: 'Godan-Endung u-Reihe → i-Reihe vor ます',
      explanation: 'Bei U-Verben (Godan) wechselt der Auslaut vor **ます** systematisch in die entsprechende **i-Reihe**: く→き, ぐ→ぎ, す→し, つ→ち, ぬ→に, む→み, る→り, う→い.',
      realLifeContext: {
        badge: 'Die 9 Endungen der Godan-Verben',
        why: 'Die mathematische Logik der japanischen Silbentabelle für perfekte Beugung nutzen.',
        when: [
          'Aus 書く (kaku) wird 書きます (kakimasu).',
          'Aus 待つ (matsu) wird 待ちます (machimasu).',
          'Aus 買う (kau) wird 買います (kaimasu).'
        ],
        signalWords: ['書く→書き', '飲む→飲み', '待つ→待ち', '買う→買い'],
        quickTip: 'Drehe die Kana-Tabelle ein Stockwerk höher: von U nach I!'
      },
      examples: [
        {
          japanese: '手紙を書きます。（書く → 書きます）',
          romaji: 'Tegami o kakimasu. (kaku -> kakimasu)',
          german: 'Ich schreibe einen Brief. (kaku -> kakimasu)'
        },
        {
          japanese: '駅で待ちます。（待つ → 待ちます）',
          romaji: 'Eki de machimasu. (matsu -> machimasu)',
          german: 'Ich warte am Bahnhof. (matsu -> machimasu)'
        }
      ],
      tasks: [
        {
          id: 'task-5-2-1',
          type: 'cloze',
          prompt: '「買う」のます形：店で本を ___。',
          german: 'Masu-Form von "kau": Im Laden kaufe ich ein Buch.',
          options: ['買います', '買うます', '買いります', '買す'],
          correctAnswer: '買います',
          explanation: 'う wechselt zu い vor ます: 買う → 買います.'
        },
        {
          id: 'task-5-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich warte am Bahnhof.',
          chips: ['駅で', '待ちます'],
          correctOrder: ['駅で', '待ちます'],
          correctAnswer: '駅で 待ちます',
          explanation: '待つ wechselt von つ zu ち: 待ちます.'
        },
        {
          id: 'task-5-2-3',
          type: 'cloze',
          prompt: '「話す」のます形：先生と ___。',
          german: 'Masu-Form von "hanasu": Ich spreche mit dem Lehrer.',
          options: ['話します', '話すます', '話しります', '話す'],
          correctAnswer: '話します',
          explanation: 'す wechselt zu し vor ます: 話す → 話します.'
        },
        {
          id: 'task-5-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich gehe nach Hause.',
          chips: ['うちに', '帰ります'],
          correctOrder: ['うちに', '帰ります'],
          correctAnswer: 'うちに 帰ります',
          explanation: '帰る ist ein U-Verb: る wechselt zu り → 帰ります.'
        },
        {
          id: 'task-5-2-5',
          type: 'cloze',
          prompt: '「泳ぐ」のます形：海で ___。',
          german: 'Masu-Form von "oyogu": Ich schwimme im Meer.',
          options: ['泳ぎます', '泳ぐます', '泳ぎります', '泳げます'],
          correctAnswer: '泳ぎます',
          explanation: 'ぐ wechselt zu ぎ: 泳ぐ → 泳ぎます.'
        },
        {
          id: 'task-5-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich treffe meinen Freund.',
          chips: ['友達に', '会います'],
          correctOrder: ['友達に', '会います'],
          correctAnswer: '友達に 会います',
          explanation: '会う (u -> i) wird zu 会います.'
        },
        {
          id: 'task-5-2-7',
          type: 'cloze',
          prompt: '「聞く」のます形：音楽を ___。',
          german: 'Masu-Form von "kiku": Ich höre Musik.',
          options: ['聞きます', '聞くます', '聞きります', '聞す'],
          correctAnswer: '聞きます',
          explanation: 'く wechselt zu き vor ます: 聞く → 聞きます.'
        },
        {
          id: 'task-5-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich schreibe mit dem Stift.',
          chips: ['ペンで', '書きます'],
          correctOrder: ['ペンで', '書きます'],
          correctAnswer: 'ペンで 書きます',
          explanation: '書く wechselt zu 書きます.'
        }
      ]
    },
    {
      id: 'sub-5-3',
      title: '5.3 Höfliche Gegenwart (〜ます) & Verneinung (〜ません)',
      formula: 'Verbstamm + ます (Gegenwart/Zukunft) / ません (Verneinung)',
      explanation: 'Die Endung **〜ます** drückt höfliche Handlungen in der **Gegenwart oder Zukunft** aus (japanische Verben haben kein eigenes Zukunfts-Tempus!). Die höfliche Verneinung lautet **〜ません**.',
      realLifeContext: {
        badge: 'Alltagsroutinen & Pläne',
        why: 'Tagesabläufe, Gewohnheiten, Angebote und Zukunftspläne höflich formulieren.',
        when: [
          'Gewohnheiten schildern: "Jeden Tag trinke ich Kaffee."',
          'Pläne für morgen: "Morgen arbeite ich nicht."',
          'Höflich ablehnen: "Danke, ich esse kein Fleisch."'
        ],
        signalWords: ['毎日', '明日', '〜ます', '〜ません'],
        quickTip: '〜ます = Gegenwart UND Zukunft! 〜ません = verneinte Routine oder Zukunft.'
      },
      examples: [
        {
          japanese: '毎日日本語を勉強します。',
          romaji: 'Mainichi nihongo o benkyou shimasu.',
          german: 'Ich lerne jeden Tag Japanisch.'
        },
        {
          japanese: '明日肉を食べません。',
          romaji: 'Ashita niku o tabemasen.',
          german: 'Morgen esse ich kein Fleisch.'
        }
      ],
      tasks: [
        {
          id: 'task-5-3-1',
          type: 'cloze',
          prompt: 'お酒を ___。 (Verneinung: trinke nicht)',
          german: 'Ich trinke keinen Alkohol.',
          options: ['飲みません', '飲みます', '飲むない', '飲みませんでした'],
          correctAnswer: '飲みません',
          explanation: 'Höfliche Verneinung im Präsens lautet 〜ません: 飲みません.'
        },
        {
          id: 'task-5-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse jeden Morgen Brot.',
          chips: ['毎朝', 'パンを', '食べます'],
          correctOrder: ['毎朝', 'パンを', '食べます'],
          correctAnswer: '毎朝 パンを 食べます',
          explanation: 'Gewohnheit mit 毎朝 + パンを + 食べます.'
        },
        {
          id: 'task-5-3-3',
          type: 'cloze',
          prompt: '明日、学校へ ___。 (Zukunft: gehe)',
          german: 'Morgen gehe ich zur Schule.',
          options: ['行きます', '行きません', '行きました', '行くます'],
          correctAnswer: '行きます',
          explanation: 'Die masu-Form deckt auch die Zukunft ab: 明日行きます.'
        },
        {
          id: 'task-5-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich lese keine Zeitung.',
          chips: ['新聞を', '読みません'],
          correctOrder: ['新聞を', '読みません'],
          correctAnswer: '新聞を 読みません',
          explanation: 'Objekt 新聞を + verneintes Verb 読みません.'
        },
        {
          id: 'task-5-3-5',
          type: 'cloze',
          prompt: '日曜日は 働き ___。 (Verneinung: arbeite nicht)',
          german: 'Am Sonntag arbeite ich nicht.',
          options: ['ません', 'ます', 'でした', 'ました'],
          correctAnswer: 'ません',
          explanation: 'Verneinung mit ません: 働きません.'
        },
        {
          id: 'task-5-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Morgen schreibe ich einen Brief.',
          chips: ['明日', '手紙を', '書きます'],
          correctOrder: ['明日', '手紙を', '書きます'],
          correctAnswer: '明日 手紙を 書きます',
          explanation: 'Zeitangabe 明日 + Objekt 手紙を + 書きます.'
        },
        {
          id: 'task-5-3-7',
          type: 'cloze',
          prompt: 'テレビを ___。 (Verneinung: schaue nicht)',
          german: 'Ich schaue nicht fern.',
          options: ['見ません', '見ます', '見ないです', '見ませんでした'],
          correctAnswer: '見ません',
          explanation: 'RU-Verb 見る verneint: 見ません.'
        },
        {
          id: 'task-5-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich esse heute keinen Fisch.',
          chips: ['今日', '魚を', '食べません'],
          correctOrder: ['今日', '魚を', '食べません'],
          correctAnswer: '今日 魚を 食べません',
          explanation: 'Heute (今日) + 魚を + 食べません.'
        }
      ]
    }
  ]
};
