export interface SandboxPrompt {
  id: string;
  category: string;
  situation: string;
  hint: string;
}

export const SANDBOX_PROMPTS: SandboxPrompt[] = [
  {
    id: 'sb-1',
    category: 'Höfliche Bitte',
    situation: 'Bitte jemanden höflich, ein Foto von dir zu machen.',
    hint: 'Verwende 写真 (shashin), を und die て-Form + ください.'
  },
  {
    id: 'sb-2',
    category: 'Restaurant & Bestellen',
    situation: 'Sage dem Kellner, dass du Wasser und Ramen bestellen möchtest.',
    hint: 'Verwende と für die Aufzählung und をお願いします oder を食べます.'
  },
  {
    id: 'sb-3',
    category: 'Zukunft & Ort',
    situation: 'Sage, dass du morgen um 8 Uhr mit dem Zug zum Bahnhof fährst.',
    hint: 'Achte auf die richtige Wahl zwischen に, で und へ.'
  },
  {
    id: 'sb-4',
    category: 'Laufende Handlung',
    situation: 'Sage einem Freund am Telefon, dass du gerade in der Bibliothek Japanisch lernst.',
    hint: 'Nutze 図書館で, 日本語を und 勉強しています.'
  },
  {
    id: 'sb-5',
    category: 'Vorlieben & Hobbys',
    situation: 'Erzähle jemandem, dass du japanisches Essen und Anime sehr magst.',
    hint: 'Verwende 日本の食べ物, アニメ und die Konstruktion が大好きです.'
  },
  {
    id: 'sb-6',
    category: 'Orientierung & Orte',
    situation: 'Frage einen Passanten höflich, wo sich der Supermarkt oder eine Toilette befindet.',
    hint: 'Verwende すみません, はどこですか oder はどこにありますか.'
  },
  {
    id: 'sb-7',
    category: 'Erlaubnis einholen',
    situation: 'Frage im Zug höflich, ob du dich hier hinsetzen darfst.',
    hint: 'Verwende ここに, 座ってもいいですか (suwattemo ii desu ka).'
  },
  {
    id: 'sb-8',
    category: 'Vergangene Ereignisse',
    situation: 'Berichte, dass du gestern mit einem Freund Kaffee im Café getrunken hast.',
    hint: 'Verwende 昨日 (kinou), 友達と, カフェで und 飲みました.'
  }
];
