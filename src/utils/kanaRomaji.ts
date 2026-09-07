// Universal Hepburn Kana-to-Romaji converter

export const KANA_TABLE: Record<string, string> = {
  // Hiragana
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'dzu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  // Small Hiragana
  ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o',
  ゃ: 'ya', ゅ: 'yu', ょ: 'yo',

  // Katakana
  ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
  カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
  サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
  タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
  ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
  ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
  マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
  ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
  ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
  ワ: 'wa', ヲ: 'o', ン: 'n',
  ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
  ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
  ダ: 'da', ヂ: 'ji', ヅ: 'dzu', デ: 'de', ド: 'do',
  バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
  パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',
  // Small Katakana
  ァ: 'a', ィ: 'i', ゥ: 'u', ェ: 'e', ォ: 'o',
  ャ: 'ya', ュ: 'yu', ョ: 'yo',
  ヴ: 'vu', 'ー': '-',
  // Fallback for typographical variants
  ZO: 'zo',
};

export const DIGRAPHS: Record<string, string> = {
  // Hiragana Digraphs (Youon)
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',

  // Katakana Digraphs (Youon)
  キャ: 'kya', キュ: 'kyu', キョ: 'kyo',
  シャ: 'sha', シュ: 'shu', ショ: 'sho',
  チャ: 'cha', チュ: 'chu', チョ: 'cho',
  ニャ: 'nya', ニュ: 'nyu', ニョ: 'nyo',
  ヒャ: 'hya', ヒュ: 'hyu', ヒョ: 'hyo',
  ミャ: 'mya', ミュ: 'myu', ミョ: 'myo',
  リャ: 'rya', リュ: 'ryu', リョ: 'ryo',
  ギャ: 'gya', ギュ: 'gyu', ギョ: 'gyo',
  ジャ: 'ja', ジュ: 'ju', ジョ: 'jo',
  ビャ: 'bya', ビュ: 'byu', ビョ: 'byo',
  ピャ: 'pya', ピュ: 'pyu', ピョ: 'pyo',
};

export function toRomaji(text: string): string {
  let result = '';
  let i = 0;

  while (i < text.length) {
    // Sokuon check (っ / ッ)
    if ((text[i] === 'っ' || text[i] === 'ッ') && i + 1 < text.length) {
      const nextKana = text.slice(i + 1, i + 3);
      const nextRomaji = DIGRAPHS[nextKana] || KANA_TABLE[text[i + 1]] || '';
      if (nextRomaji) {
        result += nextRomaji[0];
        i++;
        continue;
      }
    }

    // Digraph check (e.g. しゃ / キャ)
    if (i + 1 < text.length) {
      const pair = text.slice(i, i + 2);
      if (DIGRAPHS[pair]) {
        result += DIGRAPHS[pair];
        i += 2;
        continue;
      }
    }

    // Single character lookup
    const char = text[i];
    result += KANA_TABLE[char] || char;
    i++;
  }

  return result;
}

// Romaji to Hiragana conversion mapping for TTS fallbacks
const ROMAJI_TO_HIRAGANA_MAP: Record<string, string> = {
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  tsu: 'つ', shi: 'し', chi: 'ち',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'ko',
  sa: 'さ', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', te: 'て', to: 'to',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'no',
  ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'me', mo: 'mo',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 're', ro: 'ro',
  wa: 'わ', wo: 'を',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'ge', go: 'go',
  za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ze', zo: 'zo',
  da: 'だ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'be', bo: 'bo',
  pa: 'ぱ', pi: 'pi', pu: 'ぷ', pe: 'pe', po: 'po',
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  n: 'ん',
};

export function romajiToHiragana(text: string): string {
  let result = '';
  let i = 0;
  const lower = text.toLowerCase();

  while (i < lower.length) {
    // Check 3-character combos (e.g. kya, sho, tsu, chi, etc.)
    if (i + 2 < lower.length) {
      const three = lower.slice(i, i + 3);
      if (ROMAJI_TO_HIRAGANA_MAP[three]) {
        result += ROMAJI_TO_HIRAGANA_MAP[three];
        i += 3;
        continue;
      }
    }

    // Check sokuon (double consonants like kk, tt, ss, pp)
    if (i + 1 < lower.length && lower[i] === lower[i + 1] && /[b-df-hj-np-tv-z]/.test(lower[i])) {
      result += 'っ';
      i++;
      continue;
    }

    // Check 2-character combos (e.g. ka, sa, ji, etc.)
    if (i + 1 < lower.length) {
      const two = lower.slice(i, i + 2);
      if (ROMAJI_TO_HIRAGANA_MAP[two]) {
        result += ROMAJI_TO_HIRAGANA_MAP[two];
        i += 2;
        continue;
      }
    }

    // Check 1-character vowels or n
    const char = lower[i];
    if (ROMAJI_TO_HIRAGANA_MAP[char]) {
      result += ROMAJI_TO_HIRAGANA_MAP[char];
      i++;
      continue;
    }

    // Punctuation and spaces
    if (char === '.' || char === '。') {
      result += '。';
    } else if (char === ',' || char === '、') {
      result += '、';
    } else if (char === '?' || char === '？') {
      result += '？';
    } else if (char === '!' || char === '！') {
      result += '！';
    } else {
      result += lower[i];
    }
    i++;
  }

  return result;
}

