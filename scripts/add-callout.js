#!/usr/bin/env node
/**
 * Adds hero.callout translation to all 103 locale JSON files.
 * Uses specific translations for major languages, English fallback for others.
 */
const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'src', 'i18n', 'translations');

const ENGLISH = '↑ This page is built with polyglot-kit — try the language switcher above ↑';

const LANG_MAP = {
  fr: '↑ Cette page est créée avec polyglot-kit — essayez le sélecteur de langue ci-dessus ↑',
  de: '↑ Diese Seite wurde mit polyglot-kit erstellt — probieren Sie die Sprachauswahl oben ↑',
  es: '↑ Esta página está creada con polyglot-kit — prueba el selector de idioma de arriba ↑',
  ja: '↑ このページはpolyglot-kitで構築されています — 上の言語セレクターを試してみてください ↑',
  ar: '↑ هذه الصفحة مبنية باستخدام polyglot-kit — جرّب محوّل اللغة أعلاه ↑',
  pt: '↑ Esta página é construída com polyglot-kit — experimente o seletor de idioma acima ↑',
  zh: '↑ 此页面由polyglot-kit构建 — 试试上方的语言切换器 ↑',
  ko: '↑ 이 페이지는 polyglot-kit으로 제작되었습니다 — 위의 언어 선택기를 사용해 보세요 ↑',
  hi: '↑ यह पेज polyglot-kit से बना है — ऊपर भाषा चयनकर्ता आज़माएं ↑',
  ru: '↑ Эта страница создана с polyglot-kit — попробуйте переключатель языка выше ↑',
  it: '↑ Questa pagina è costruita con polyglot-kit — prova il selettore di lingua sopra ↑',
  nl: '↑ Deze pagina is gebouwd met polyglot-kit — probeer de taalkiezer hierboven ↑',
  pl: '↑ Ta strona jest zbudowana z polyglot-kit — wypróbuj selektor języka powyżej ↑',
  tr: '↑ Bu sayfa polyglot-kit ile oluşturulmuştur — yukarıdaki dil seçiciyi deneyin ↑',
  sv: '↑ Denna sida är byggd med polyglot-kit — prova språkväljaren ovan ↑',
  da: '↑ Denne side er bygget med polyglot-kit — prøv sprogvælgeren ovenfor ↑',
  fi: '↑ Tämä sivu on rakennettu polyglot-kitillä — kokeile kielivalitsinta yllä ↑',
  el: '↑ Αυτή η σελίδα είναι χτισμένη με polyglot-kit — δοκιμάστε τον επιλογέα γλώσσας πάνω ↑',
  cs: '↑ Tato stránka je vytvořena pomocí polyglot-kit — vyzkoušejte přepínač jazyků nahoře ↑',
  ro: '↑ Această pagină este construită cu polyglot-kit — încercați selectorul de limbă de mai sus ↑',
  hu: '↑ Ez az oldal a polyglot-kit segítségével készült — próbálja ki a nyelvválasztót fent ↑',
  uk: '↑ Ця сторінка створена за допомогою polyglot-kit — спробуйте перемикач мов вище ↑',
  th: '↑ หน้านี้สร้างด้วย polyglot-kit — ลองใช้ตัวเลือกภาษาด้านบน ↑',
  vi: '↑ Trang này được xây dựng bằng polyglot-kit — hãy thử bộ chọn ngôn ngữ ở trên ↑',
  id: '↑ Halaman ini dibuat dengan polyglot-kit — coba pemilih bahasa di atas ↑',
  ms: '↑ Halaman ini dibina dengan polyglot-kit — cuba pemilih bahasa di atas ↑',
  he: '↑ עמוד זה נבנה עם polyglot-kit — נסו את בורר השפות למעלה ↑',
  fa: '↑ این صفحه با polyglot-kit ساخته شده — انتخابگر زبان بالا را امتحان کنید ↑',
  ur: '↑ یہ صفحہ polyglot-kit سے بنایا گیا ہے — اوپر زبان کا سلیکٹر آزمائیں ↑',
  bn: '↑ এই পেজটি polyglot-kit দিয়ে তৈরি — উপরের ভাষা নির্বাচক ব্যবহার করে দেখুন ↑',
  ta: '↑ இந்தப் பக்கம் polyglot-kit மூலம் உருவாக்கப்பட்டது — மேலே மொழி தேர்வியை முயற்சிக்கவும் ↑',
  af: '↑ Hierdie bladsy is gebou met polyglot-kit — probeer die taalkeuse hierbo ↑',
  sw: '↑ Ukurasa huu umejengwa na polyglot-kit — jaribu kichaguzi cha lugha hapo juu ↑',
  zu: '↑ Leli khasi lakhelwe nge-polyglot-kit — zama isikhethi solimi ngenhla ↑',
};

function getBaseLanguage(locale) {
  // e.g. "fr-FR" → "fr", "zh-CN" → "zh", "fil-PH" → "fil"
  return locale.split('-')[0];
}

function getCallout(locale) {
  const base = getBaseLanguage(locale);
  return LANG_MAP[base] || ENGLISH;
}

const files = fs.readdirSync(TRANSLATIONS_DIR).filter(f => f.endsWith('.json'));
let updated = 0;

for (const file of files) {
  const filePath = path.join(TRANSLATIONS_DIR, file);
  const locale = file.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.hero) {
    console.warn(`SKIP ${file}: no hero object`);
    continue;
  }

  if (data.hero.callout) {
    console.log(`SKIP ${file}: callout already exists`);
    continue;
  }

  // Insert callout after useComment by rebuilding the hero object
  const newHero = {};
  for (const [key, value] of Object.entries(data.hero)) {
    newHero[key] = value;
    if (key === 'useComment') {
      newHero.callout = getCallout(locale);
    }
  }
  // If useComment wasn't found, just append
  if (!newHero.callout) {
    newHero.callout = getCallout(locale);
  }

  data.hero = newHero;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  updated++;
  console.log(`OK ${file} (${getBaseLanguage(locale)})`);
}

console.log(`\nDone: ${updated} files updated, ${files.length - updated} skipped.`);
