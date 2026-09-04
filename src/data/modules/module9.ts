import type { TopicModule } from '../../types/curriculum';

export const module9: TopicModule = {
  id: 'mod-9',
  title: 'Modul 9: Adjektive (Verneinung & Vergangenheit)',
  category: 'Adjektive',
  subRules: [
    {
      id: 'sub-9-1',
      title: '9.1 Verneinung (〜くないです vs. 〜じゃないです)',
      formula: 'い-Adjektiv: い weg + くないです vs. な-Adjektiv: じゃないです',
      explanation: 'Bei **い-Adjektiven** fällt das letzte **い** weg und wird durch **くないです** ersetzt (`高い` → `高くないです`). Bei **な-Adjektiven** wird wie bei Nomen einfach **じゃないです** (oder formeller: **じゃありません**) angehängt (`静か` → `静かじゃないです`).',
      realLifeContext: {
        badge: 'Nicht billig / Nicht ruhig',
        why: 'Eigenschaften verneinen, Preise relativieren und Gegenteile beschreiben.',
        when: [
          'Preise bewerten: "Das Buch ist nicht teuer (高くないです)."',
          'Wetter beurteilen: "Heute ist es nicht kalt (寒くないです)."',
          'Umgebung beschreiben: "Die Stadt ist nicht ruhig (静かじゃないです)."'
        ],
        signalWords: ['高くないです', 'おいしくないです', '静かじゃないです', 'きれいじゃないです'],
        quickTip: 'i-Adjektive tauschen das i gegen ku-nai; na-Adjektive nehmen janai!'
      },
      examples: [
        {
          japanese: 'この本は高くないです。',
          romaji: 'Kono hon wa takakunai desu.',
          german: 'Dieses Buch ist nicht teuer.'
        },
        {
          japanese: 'この部屋は静かじゃないです。',
          romaji: 'Kono heya wa shizuka janai desu.',
          german: 'Dieses Zimmer ist nicht ruhig.'
        }
      ],
      tasks: [
        {
          id: 'task-9-1-1',
          type: 'cloze',
          prompt: '今日は ___。 (Verneinung von 寒い: nicht kalt)',
          german: 'Heute ist es nicht kalt.',
          options: ['寒くないです', '寒いじゃないです', '寒いくないです', '寒くないでした'],
          correctAnswer: '寒くないです',
          explanation: 'い entfällt vor くないです: 寒い → 寒くないです.'
        },
        {
          id: 'task-9-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Dieser Fisch ist nicht lecker.',
          chips: ['この魚は', 'おいしくない', 'です'],
          correctOrder: ['この魚は', 'おいしくない', 'です'],
          correctAnswer: 'この魚は おいしくない です',
          explanation: 'おいしい verneint: おいしくない です.'
        },
        {
          id: 'task-9-1-3',
          type: 'cloze',
          prompt: 'この町は 有名 ___。 (Verneinung: nicht berühmt)',
          german: 'Diese Stadt ist nicht berühmt.',
          options: ['じゃないです', 'くないです', 'ないです', 'でした'],
          correctAnswer: 'じゃないです',
          explanation: '有名 ist ein な-Adjektiv und verlangt じゃないです.'
        },
        {
          id: 'task-9-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Mein Zimmer ist nicht sauber.',
          chips: ['私の部屋は', 'きれいじゃない', 'です'],
          correctOrder: ['私の部屋は', 'きれいじゃない', 'です'],
          correctAnswer: '私の部屋は きれいじゃない です',
          explanation: 'きれい als な-Adjektiv verneint: きれいじゃない です.'
        },
        {
          id: 'task-9-1-5',
          type: 'cloze',
          prompt: 'この映画は ___。 (Verneinung von おもしろい: nicht interessant)',
          german: 'Dieser Film ist nicht interessant.',
          options: ['おもしろくないです', 'おもしろいじゃないです', 'おもしろくないでした', 'おもしろくない'],
          correctAnswer: 'おもしろくないです',
          explanation: 'おもしろい wird zu おもしろくないです.'
        },
        {
          id: 'task-9-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Dieses Restaurant ist nicht ruhig.',
          chips: ['このレストランは', '静かじゃない', 'です'],
          correctOrder: ['このレストランは', '静かじゃない', 'です'],
          correctAnswer: 'このレストランは 静かじゃない です',
          explanation: '静か verneint: 静かじゃない です.'
        },
        {
          id: 'task-9-1-7',
          type: 'cloze',
          prompt: 'あの車は ___。 (Verneinung von 高い: nicht teuer)',
          german: 'Jenes Auto dort ist nicht teuer.',
          options: ['高くないです', '高いじゃないです', '高くありませんでした', '高くない'],
          correctAnswer: '高くないです',
          explanation: '高い wird zu 高くないです.'
        },
        {
          id: 'task-9-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Heute ist mir nicht wohl / bin nicht fit.',
          chips: ['今日は', '元気じゃない', 'です'],
          correctOrder: ['今日は', '元気じゃない', 'です'],
          correctAnswer: '今日は 元気じゃない です',
          explanation: '元気 (na-Adj.) verneint: 元気じゃない です.'
        }
      ]
    },
    {
      id: 'sub-9-2',
      title: '9.2 Vergangenheit (〜かったです vs. 〜でした)',
      formula: 'い-Adjektiv: い weg + かったです vs. な-Adjektiv: でした',
      explanation: 'In der Vergangenheit verhalten sich beide Typen grundverschieden: Bei **い-Adjektiven** entfällt das **い** und wird durch **かったです** ersetzt (`高い` → `高かったです`). Bei **な-Adjektiven** wird **です** einfach durch **でした** ersetzt (`静か` → `静かでした`).',
      realLifeContext: {
        badge: 'Wie war der Film?',
        why: 'Über vergangene Ereignisse, Wetter, Urlaubsreisen und Speisen berichten.',
        when: [
          'Essen bewerten: "Das Essen war sehr lecker (おいしかったです)."',
          'Wetter gestern: "Gestern war es kalt (寒かったです)."',
          'Erlebnisse schildern: "Die Party war lebhaft (にぎやかでした)."'
        ],
        signalWords: ['高かったです', 'おいしかったです', '静かでした', 'きれいでした'],
        quickTip: 'i-Adjektiv: katta desu! na-Adjektiv: einfach deshita!'
      },
      examples: [
        {
          japanese: '映画はおもしろかったです。',
          romaji: 'Eiga wa omoshirokatta desu.',
          german: 'Der Film war interessant.'
        },
        {
          japanese: 'ホテルは静かでした。',
          romaji: 'Hoteru wa shizuka deshita.',
          german: 'Das Hotel war ruhig.'
        }
      ],
      tasks: [
        {
          id: 'task-9-2-1',
          type: 'cloze',
          prompt: '昨日のラーメンは ___。 (Vergangenheit von おいしい: war lecker)',
          german: 'Die Ramen gestern waren lecker.',
          options: ['おいしかったです', 'おいしいでした', 'おいしいかった', 'おいしかったでする'],
          correctAnswer: 'おいしかったです',
          explanation: 'い entfällt vor かったです: おいしい → おいしかったです (niemals おいしいでした!).'
        },
        {
          id: 'task-9-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern war es kalt.',
          chips: ['昨日は', '寒かったです'],
          correctOrder: ['昨日は', '寒かったです'],
          correctAnswer: '昨日は 寒かったです',
          explanation: '寒い in der Vergangenheit: 寒かったです.'
        },
        {
          id: 'task-9-2-3',
          type: 'cloze',
          prompt: '図書館は とても ___。 (Vergangenheit von 静か: war ruhig)',
          german: 'Die Bibliothek war sehr ruhig.',
          options: ['静かでした', '静かかったです', '静かでしたです', '静かでしたかった'],
          correctAnswer: '静かでした',
          explanation: 'な-Adjektive bilden die Vergangenheit mit でした: 静かでした.'
        },
        {
          id: 'task-9-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Dieses Buch war teuer.',
          chips: ['この本は', '高かったです'],
          correctOrder: ['この本は', '高かったです'],
          correctAnswer: 'この本は 高かったです',
          explanation: '高い in der Vergangenheit: 高かったです.'
        },
        {
          id: 'task-9-2-5',
          type: 'cloze',
          prompt: '京都の庭は ___。 (Vergangenheit von きれい: war schön)',
          german: 'Der Garten in Kyoto war schön.',
          options: ['きれいでした', 'きれいかったです', 'きれいくありません', 'きれいでしたかった'],
          correctAnswer: 'きれいでした',
          explanation: 'きれい ist ein な-Adjektiv und bildet die Vergangenheit mit でした.'
        },
        {
          id: 'task-9-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Die Prüfung war einfach.',
          chips: ['試験は', '簡単でした'],
          correctOrder: ['試験は', '簡単でした'],
          correctAnswer: '試験は 簡単でした',
          explanation: '簡単 (kantan, einfach) ist ein な-Adjektiv: 簡単でした.'
        },
        {
          id: 'task-9-2-7',
          type: 'cloze',
          prompt: '昨日の映画は ___。 (Vergangenheit von おもしろい: war interessant)',
          german: 'Der Film gestern war interessant.',
          options: ['おもしろかったです', 'おもしろいでした', 'おもしろいかったです', 'おもしろかった'],
          correctAnswer: 'おもしろかったです',
          explanation: 'い-Adjektiv Vergangenheit: おもしろかったです.'
        },
        {
          id: 'task-9-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Die Reise hat Spaß gemacht.',
          chips: ['旅行は', '楽しかったです'],
          correctOrder: ['旅行は', '楽しかったです'],
          correctAnswer: '旅行は 楽しかったです',
          explanation: '楽しい (Spaß machend) in der Vergangenheit: 楽しかったです.'
        }
      ]
    },
    {
      id: 'sub-9-3',
      title: '9.3 Das Sonderadjektiv いい (gut)',
      formula: 'いい (Präsens) → よくないです (Verneinung) / よかったです (Vergangenheit)',
      explanation: 'Das Adjektiv **いい** (gut) geht historisch auf die Ursprungsform **よい** (yoi) zurück. Nur die bejahende Gegenwartsform lautet **いい**! Bei allen Konjugationen wird der Stamm **よ-** verwendet: Verneinung: **よくないです**, Vergangenheit: **よかったです**, verneinte Vergangenheit: **よくなかったです**.',
      realLifeContext: {
        badge: 'Sonderfall いい',
        why: 'Das wichtigste Wertungswort des Japanischen in allen Zeitformen fehlerfrei nutzen.',
        when: [
          'Erleichterung ausdrücken: "Ein Glück! / Das war gut (よかったです)!"',
          'Bedingungen bewerten: "Das Wetter ist nicht gut (天気がよくないです)."',
          'Niemals "いくない" oder "いかった" sagen!'
        ],
        signalWords: ['いい', 'よくないです', 'よかったです', 'よくなかったです'],
        quickTip: 'Sobald du いい beugen willst, wird es zu yo- (yokunai, yokatta)!'
      },
      examples: [
        {
          japanese: '今日は天気がいいです。',
          romaji: 'Kyou wa tenki ga ii desu.',
          german: 'Heute ist das Wetter gut.'
        },
        {
          japanese: '昨日の映画はよかったです。',
          romaji: 'Kinou no eiga wa yokatta desu.',
          german: 'Der Film gestern war gut.'
        }
      ],
      tasks: [
        {
          id: 'task-9-3-1',
          type: 'cloze',
          prompt: '昨日は 天気が ___。 (Vergangenheit: war gut)',
          german: 'Gestern war das Wetter gut.',
          options: ['よかったです', 'いかったです', 'いいでした', 'よいでした'],
          correctAnswer: 'よかったです',
          explanation: 'Vergangenheit von いい lautet unregelmäßig よかったです (aus よい).'
        },
        {
          id: 'task-9-3-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das Wetter heute ist nicht gut.',
          chips: ['今日の天気は', 'よくない', 'です'],
          correctOrder: ['今日の天気は', 'よくない', 'です'],
          correctAnswer: '今日の天気は よくない です',
          explanation: 'Verneinung von いい: よくない です.'
        },
        {
          id: 'task-9-3-3',
          type: 'cloze',
          prompt: '気分が ___。 (Verneinung: fühle mich nicht gut)',
          german: 'Ich fühle mich nicht gut.',
          options: ['よくないです', 'いくないです', 'いいじゃないです', 'よくないでした'],
          correctAnswer: 'よくないです',
          explanation: 'Verneinung von いい ist immer よくないです.'
        },
        {
          id: 'task-9-3-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das war gut! (Gott sei Dank!)',
          chips: ['それは', 'よかったです'],
          correctOrder: ['それは', 'よかったです'],
          correctAnswer: 'それは よかったです',
          explanation: 'Standardphrase: それは よかったです (Das war gut).'
        },
        {
          id: 'task-9-3-5',
          type: 'cloze',
          prompt: 'テストの結果は ___。 (Vergangenheit verneint: war nicht gut)',
          german: 'Das Testergebnis war nicht gut.',
          options: ['よくなかったです', 'いくなかったです', 'いいじゃなかったです', 'よかったです'],
          correctAnswer: 'よくなかったです',
          explanation: 'Verneinte Vergangenheit von いい ist よくなかったです.'
        },
        {
          id: 'task-9-3-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Dieses Buch ist gut.',
          chips: ['この本は', 'いい', 'です'],
          correctOrder: ['この本は', 'いい', 'です'],
          correctAnswer: 'この本は いい です',
          explanation: 'Bejahende Gegenwart: いい です.'
        },
        {
          id: 'task-9-3-7',
          type: 'cloze',
          prompt: '体調は ___。 (Gegenwart verneint: ist nicht gut)',
          german: 'Mein Befinden ist nicht gut.',
          options: ['よくないです', 'いくないです', 'いいじゃない', 'いくなかった'],
          correctAnswer: 'よくないです',
          explanation: 'いい verneint im Präsens: よくないです.'
        },
        {
          id: 'task-9-3-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das Konzert war gut.',
          chips: ['コンサートは', 'よかったです'],
          correctOrder: ['コンサートは', 'よかったです'],
          correctAnswer: 'コンサートは よかったです',
          explanation: 'Vergangene Bewertung mit よかったです.'
        }
      ]
    }
  ]
};
