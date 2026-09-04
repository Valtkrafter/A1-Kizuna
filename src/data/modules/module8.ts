import type { TopicModule } from '../../types/curriculum';

export const module8: TopicModule = {
  id: 'mod-8',
  title: 'Modul 8: Adjektivtypen & Satzstellung',
  category: 'Adjektive',
  subRules: [
    {
      id: 'sub-8-1',
      title: '8.1 い-Adjektive vs. な-Adjektive',
      formula: 'い-Adjektiv + Nomen vs. な-Adjektiv + な + Nomen',
      explanation: 'Japanische Adjektive zerfallen in zwei Gruppen: 1. **い-Adjektive** (echte Adjektive): enden auf die Silbe い (z. B. 高い, おいしい, 寒い) und stehen direkt vor dem Nomen (`高い本`). 2. **な-Adjektive** (Adjektivnomen): benötigen vor einem Nomen zwingend die Verbindungspartikel **な** (`静かな部屋`). Am Satzende steht bei beiden das höfliche です (`この部屋は静かです`, `この本は高いです`).',
      realLifeContext: {
        badge: 'Eigenschaften beschreiben',
        why: 'Wohnungen, Essen, Preise und das Wetter treffend charakterisieren.',
        when: [
          'Beim Einkaufen: "Das ist ein teures Buch."',
          'Wohnungssuche: "Ich suche ein ruhiges Zimmer."',
          'Restaurant: "Das ist leckeres Essen."'
        ],
        signalWords: ['高い', 'おいしい', '静かな', '元気な'],
        quickTip: 'Braucht es ein な vor dem Nomen? Dann ist es ein な-Adjektiv!'
      },
      examples: [
        {
          japanese: '高い本を買いました。',
          romaji: 'Takai hon o kaimashita.',
          german: 'Ich habe ein teures Buch gekauft.'
        },
        {
          japanese: '静かな部屋に住んでいます。',
          romaji: 'Shizuka na heya ni sunde imasu.',
          german: 'Ich wohne in einem ruhigen Zimmer.'
        }
      ],
      tasks: [
        {
          id: 'task-8-1-1',
          type: 'cloze',
          prompt: 'これは ___ 時計です。 (teure Uhr)',
          german: 'Das ist eine teure Uhr.',
          options: ['高い', '高な', '高く', '高'],
          correctAnswer: '高い',
          explanation: 'い-Adjektive wie 高い stehen direkt unverändert vor dem Nomen.'
        },
        {
          id: 'task-8-1-2',
          type: 'cloze',
          prompt: '公園は 静か ___。 (Satzende: ist ruhig)',
          german: 'Der Park ist ruhig.',
          options: ['です', 'な', 'い', 'ます'],
          correctAnswer: 'です',
          explanation: 'Am Satzende entfällt das な und es folgt das höfliche です: 静かです.'
        },
        {
          id: 'task-8-1-3',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das ist ein ruhiges Zimmer.',
          chips: ['静かな', '部屋', 'です'],
          correctOrder: ['静かな', '部屋', 'です'],
          correctAnswer: '静かな 部屋 です',
          explanation: 'な-Adjektiv vor Nomen verlangt な: 静かな + 部屋 + です.'
        },
        {
          id: 'task-8-1-4',
          type: 'cloze',
          prompt: 'おいしい ___ を食べます。 (leckeres Brot)',
          german: 'Ich esse leckeres Brot.',
          options: ['パン', 'パンな', 'パンに', 'パンで'],
          correctAnswer: 'パン',
          explanation: 'い-Adjektiv おいしい modifiziert das Nomen パン direkt.'
        },
        {
          id: 'task-8-1-5',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Dieser Film ist interessant.',
          chips: ['この映画は', 'おもしろい', 'です'],
          correctOrder: ['この映画は', 'おもしろい', 'です'],
          correctAnswer: 'この映画は おもしろい です',
          explanation: 'Thema この映画は + Prädikat おもしろい です.'
        },
        {
          id: 'task-8-1-6',
          type: 'cloze',
          prompt: '田中さんは 元気 ___ 人です。',
          german: 'Herr Tanaka ist ein munterer Mensch.',
          options: ['な', 'い', 'の', 'で'],
          correctAnswer: 'な',
          explanation: '元気 ist ein な-Adjektiv: vor dem Nomen 人 steht 元気な.'
        },
        {
          id: 'task-8-1-7',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Heute ist es kalt.',
          chips: ['今日は', '寒い', 'です'],
          correctOrder: ['今日は', '寒い', 'です'],
          correctAnswer: '今日は 寒い です',
          explanation: 'Thema 今日は + Adjektiv 寒い + です.'
        },
        {
          id: 'task-8-1-8',
          type: 'cloze',
          prompt: '静か ___ 町に行きます。 (ruhige Stadt)',
          german: 'Ich fahre in eine ruhige Stadt.',
          options: ['な', 'い', 'に', 'で'],
          correctAnswer: 'な',
          explanation: 'な-Adjektiv vor dem Nomen 町 verlangt die Verbindung な.'
        }
      ]
    },
    {
      id: 'sub-8-2',
      title: '8.2 Die Ausnahmen きれい und 有名',
      formula: 'きれいな + Nomen / 有名な + Nomen (trotz "i"-Auslaut な-Adjektive!)',
      explanation: 'Die zwei häufigsten Fallen der A1-Stufe: **きれい** (hübsch / sauber) und **有名** (yuumei, berühmt) enden zwar auf die Silbe "i", sind historisch und grammatisch aber **reine な-Adjektive**! Vor Nomen heißen sie zwingend **きれいな** und **有名な**.',
      realLifeContext: {
        badge: 'Die A1-Falle',
        why: 'Häufigste Fehlerquelle bei Prüfungen und im Gespräch souverän umschiffen.',
        when: [
          'Komplimente machen: "Sie ist eine hübsche Person (きれいな人)."',
          'Sehenswürdigkeiten erwähnen: "Das ist ein berühmter Park (有名な公園)."',
          'Niemals "きれいくない" sagen – es heißt きれいじゃない!'
        ],
        signalWords: ['きれいな', '有名な', 'きれいじゃないです', '有名じゃないです'],
        quickTip: 'Kirei & Yuumei sehen aus wie i-Adjektive, verhalten sich aber wie na-Adjektive!'
      },
      examples: [
        {
          japanese: 'きれいな庭ですね。',
          romaji: 'Kirei na niwa desu ne.',
          german: 'Das ist ein schöner Garten, nicht wahr?'
        },
        {
          japanese: '京都は有名な町です。',
          romaji: 'Kyouto wa yuumei na machi desu.',
          german: 'Kyoto ist eine berühmte Stadt.'
        }
      ],
      tasks: [
        {
          id: 'task-8-2-1',
          type: 'cloze',
          prompt: 'マリアさんは きれい ___ 人です。',
          german: 'Maria ist eine hübsche Person.',
          options: ['な', 'い', 'の', 'で'],
          correctAnswer: 'な',
          explanation: 'きれい ist trotz des i-Lauts ein な-Adjektiv: きれいな人.'
        },
        {
          id: 'task-8-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Das ist ein berühmtes Museum.',
          chips: ['有名な', '博物館', 'です'],
          correctOrder: ['有名な', '博物館', 'です'],
          correctAnswer: '有名な 博物館 です',
          explanation: '有名 verlangt als な-Adjektiv vor 博物館 das Verbindungswort な.'
        },
        {
          id: 'task-8-2-3',
          type: 'cloze',
          prompt: 'この部屋は きれい ___。 (Satzende: ist sauber)',
          german: 'Dieses Zimmer ist sauber.',
          options: ['です', 'な', 'いです', 'ます'],
          correctAnswer: 'です',
          explanation: 'Am Satzende steht きれい です (ohne な!).'
        },
        {
          id: 'task-8-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Kyoto ist berühmt.',
          chips: ['京都は', '有名', 'です'],
          correctOrder: ['京都は', '有名', 'です'],
          correctAnswer: '京都は 有名 です',
          explanation: 'Thema 京都は + Prädikat 有名 です.'
        },
        {
          id: 'task-8-2-5',
          type: 'cloze',
          prompt: '有名 ___ 大学に行きます。',
          german: 'Ich gehe an eine berühmte Universität.',
          options: ['な', 'い', 'の', 'に'],
          correctAnswer: 'な',
          explanation: 'Vor Nomen verlangt 有名 das Attribut な.'
        },
        {
          id: 'task-8-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Der Garten ist hübsch.',
          chips: ['庭は', 'きれい', 'です'],
          correctOrder: ['庭は', 'きれい', 'です'],
          correctAnswer: '庭は きれい です',
          explanation: 'Subjekt 庭は + きれい です.'
        },
        {
          id: 'task-8-2-7',
          type: 'cloze',
          prompt: 'きれい ___ 花を買いました。 (schöne Blumen)',
          german: 'Ich habe schöne Blumen gekauft.',
          options: ['な', 'い', 'で', 'に'],
          correctAnswer: 'な',
          explanation: 'Vor dem Nomen 花 steht きれいな.'
        },
        {
          id: 'task-8-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Herr Tanaka ist berühmt.',
          chips: ['田中さんは', '有名', 'です'],
          correctOrder: ['田中さんは', '有名', 'です'],
          correctAnswer: '田中さんは 有名 です',
          explanation: 'Thema 田中さんは + 有名 です.'
        }
      ]
    }
  ]
};
