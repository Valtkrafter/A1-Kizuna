import type { TopicModule } from '../../types/curriculum';

export const module7: TopicModule = {
  id: 'mod-7',
  title: 'Modul 7: Verben (Vergangenheit)',
  category: 'Verben',
  subRules: [
    {
      id: 'sub-7-1',
      title: '7.1 Höfliche Vergangenheit (〜ました)',
      formula: 'Verbstamm + ました',
      explanation: 'Für Handlungen in der Vergangenheit, die abgeschlossen sind, wird die Endung **〜ます** durch **〜ました** ersetzt. Dies gilt für alle drei Verbgruppen einheitlich nach Bildung des Verbstamms.',
      realLifeContext: {
        badge: 'Wochenend-Rückblick',
        why: 'Vom gestrigen Tag erzählen, Erlebnisse im Urlaub teilen oder Aufgaben als erledigt melden.',
        when: [
          'Über das Wochenende berichten: "Gestern bin ich nach Kyoto gefahren."',
          'Mahlzeiten bestätigen: "Ich habe schon gegessen."',
          'Arbeitsschritte bestätigen: "Ich habe den Brief geschrieben."'
        ],
        signalWords: ['昨日', '先週', '〜ました'],
        quickTip: 'Ersetze einfach ます durch ました – fertig ist die höfliche Vergangenheitsform!'
      },
      examples: [
        {
          japanese: '昨日京都へ行きました。',
          romaji: 'Kinou kyouto e ikimashita.',
          german: 'Gestern bin ich nach Kyoto gefahren.'
        },
        {
          japanese: 'パンを食べました。',
          romaji: 'Pan o tabemashita.',
          german: 'Ich habe Brot gegessen.'
        }
      ],
      tasks: [
        {
          id: 'task-7-1-1',
          type: 'cloze',
          prompt: '昨日、映画を ___。 (Vergangenheit: habe gesehen)',
          german: 'Gestern habe ich einen Film gesehen.',
          options: ['見ました', '見ます', '見ません', '見て'],
          correctAnswer: '見ました',
          explanation: 'Abgeschlossene Handlung in der Vergangenheit verlangt 〜ました: 見ました.'
        },
        {
          id: 'task-7-1-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern habe ich Tee getrunken.',
          chips: ['昨日', 'お茶を', '飲みました'],
          correctOrder: ['昨日', 'お茶を', '飲みました'],
          correctAnswer: '昨日 お茶を 飲みました',
          explanation: 'Gestern (昨日) + Objekt (お茶を) + Vergangenheit (飲みました).'
        },
        {
          id: 'task-7-1-3',
          type: 'cloze',
          prompt: '先週、本を ___。 (Vergangenheit: habe gekauft)',
          german: 'Letzte Woche habe ich ein Buch gekauft.',
          options: ['買いました', '買います', '買いませんでした', '買うました'],
          correctAnswer: '買いました',
          explanation: 'Kauf in der Vergangenheit: 買いました.'
        },
        {
          id: 'task-7-1-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern habe ich gearbeitet.',
          chips: ['昨日', '働きました'],
          correctOrder: ['昨日', '働きました'],
          correctAnswer: '昨日 働きました',
          explanation: 'Zeitangabe 昨日 + 働きました.'
        },
        {
          id: 'task-7-1-5',
          type: 'cloze',
          prompt: '手紙を ___。 (Vergangenheit: habe geschrieben)',
          german: 'Ich habe einen Brief geschrieben.',
          options: ['書きました', '書きます', '書くました', '書いたです'],
          correctAnswer: '書きました',
          explanation: '書く wechselt zu 書きました.'
        },
        {
          id: 'task-7-1-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Heute Morgen bin ich um 7 Uhr aufgestanden.',
          chips: ['今朝', '七時に', '起きました'],
          correctOrder: ['今朝', '七時に', '起きました'],
          correctAnswer: '今朝 七時に 起きました',
          explanation: 'Zeit今朝 + 七時に + 起きました.'
        },
        {
          id: 'task-7-1-7',
          type: 'cloze',
          prompt: '友達に ___。 (Vergangenheit: habe getroffen)',
          german: 'Ich habe einen Freund getroffen.',
          options: ['会いました', '会います', '会いでした', '会いません'],
          correctAnswer: '会いました',
          explanation: 'Treffen in der Vergangenheit: 会いました.'
        },
        {
          id: 'task-7-1-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe Deutsch gelernt.',
          chips: ['ドイツ語を', '勉強しました'],
          correctOrder: ['ドイツ語を', '勉強しました'],
          correctAnswer: 'ドイツ語を 勉強しました',
          explanation: 'Objekt ドイツ語を + 勉強しました.'
        }
      ]
    },
    {
      id: 'sub-7-2',
      title: '7.2 Verneinte Vergangenheit (〜ませんでした)',
      formula: 'Verbstamm + ませんでした',
      explanation: 'Um eine Handlung in der Vergangenheit zu verneinen ("habe nicht getan"), ersetzt du **〜ました** durch **〜ませんでした**.',
      realLifeContext: {
        badge: 'Was man nicht getan hat',
        why: 'Erklären, was gestern oder letzte Woche nicht stattgefunden hat.',
        when: [
          'Freier Tag: "Gestern habe ich nicht gearbeitet."',
          'Verpasste Aktionen: "Ich habe die Nachrichten nicht gesehen."',
          'Entschuldigen: "Ich habe meine Hausaufgaben nicht gemacht."'
        ],
        signalWords: ['昨日', '先週', '〜ませんでした'],
        quickTip: 'ません (nicht tun) + でした (war) = ませんでした (habe nicht getan)!'
      },
      examples: [
        {
          japanese: '昨日仕事をしませんでした。',
          romaji: 'Kinou shigoto o shimasendeshita.',
          german: 'Gestern habe ich nicht gearbeitet.'
        },
        {
          japanese: '朝ごはんを食べませんでした。',
          romaji: 'Asagohan o tabemasendeshita.',
          german: 'Ich habe nicht gefrühstückt.'
        }
      ],
      tasks: [
        {
          id: 'task-7-2-1',
          type: 'cloze',
          prompt: '昨日、テレビを ___。 (Vergangenheit: habe nicht gesehen)',
          german: 'Gestern habe ich nicht fernsehen geschaut.',
          options: ['見ませんでした', '見ません', '見ました', '見ないでした'],
          correctAnswer: '見ませんでした',
          explanation: 'Verneinte Vergangenheit von 見る lautet 見ませんでした.'
        },
        {
          id: 'task-7-2-2',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Gestern bin ich nirgendwohin gegangen.',
          chips: ['昨日', 'どこへも', '行きませんでした'],
          correctOrder: ['昨日', 'どこへも', '行きませんでした'],
          correctAnswer: '昨日 どこへも 行きませんでした',
          explanation: '昨日 + どこへも (nirgendwohin) + 行きませんでした.'
        },
        {
          id: 'task-7-2-3',
          type: 'cloze',
          prompt: '昨日、お酒を ___。 (habe nicht getrunken)',
          german: 'Gestern habe ich keinen Alkohol getrunken.',
          options: ['飲みませんでした', '飲みません', '飲みました', '飲まないでした'],
          correctAnswer: '飲みませんでした',
          explanation: 'Verneinte Vergangenheit von 飲む ist 飲みませんでした.'
        },
        {
          id: 'task-7-2-4',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe die Zeitung nicht gelesen.',
          chips: ['新聞を', '読みませんでした'],
          correctOrder: ['新聞を', '読みませんでした'],
          correctAnswer: '新聞を 読みませんでした',
          explanation: 'Objekt 新聞を + verneinte Vergangenheit 読みませんでした.'
        },
        {
          id: 'task-7-2-5',
          type: 'cloze',
          prompt: '昨夜は よく ___。 (habe nicht geschlafen)',
          german: 'Gestern Nacht habe ich nicht gut geschlafen.',
          options: ['寝ませんでした', '寝ません', '寝ました', '寝ないでした'],
          correctAnswer: '寝ませんでした',
          explanation: 'Verneinte Vergangenheitsform von 寝る ist 寝ませんでした.'
        },
        {
          id: 'task-7-2-6',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe gestern nichts gekauft.',
          chips: ['昨日', '何も', '買いませんでした'],
          correctOrder: ['昨日', '何も', '買いませんでした'],
          correctAnswer: '昨日 何も 買いませんでした',
          explanation: 'Zeitangabe 昨日 + 何も (nichts) + 買いませんでした.'
        },
        {
          id: 'task-7-2-7',
          type: 'cloze',
          prompt: '日曜日は 勉強 ___。 (habe nicht gelernt)',
          german: 'Am Sonntag habe ich nicht gelernt.',
          options: ['しませんでした', 'しません', 'しました', 'するませんでした'],
          correctAnswer: 'しませんでした',
          explanation: '勉強する verneint in der Vergangenheit: 勉強しませんでした.'
        },
        {
          id: 'task-7-2-8',
          type: 'order',
          prompt: 'Setze den Satz zusammen:',
          german: 'Ich habe heute Morgen keinen Kaffee getrunken.',
          chips: ['今朝', 'コーヒーを', '飲みませんでした'],
          correctOrder: ['今朝', 'コーヒーを', '飲みませんでした'],
          correctAnswer: '今朝 コーヒーを 飲みませんでした',
          explanation: 'Zeit 今朝 + コーヒーを + 飲みませんでした.'
        }
      ]
    }
  ]
};
