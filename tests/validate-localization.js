'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const questionSource = fs.readFileSync(path.join(root, 'zuno-question-practice.js'), 'utf8');

const dictionaryStart = html.indexOf('const uiText={');
const translatorStart = html.indexOf('function translateUiText(raw,ix){', dictionaryStart);
assert.ok(dictionaryStart >= 0 && translatorStart > dictionaryStart, 'UI translation dictionary must exist');
const context = {};
vm.runInNewContext(
  html.slice(dictionaryStart, translatorStart) + '\n globalThis.__zunoUiText = uiText;',
  context
);
const translatorEnd = html.indexOf('\nfunction applyInterfaceLanguage()', translatorStart);
assert.ok(translatorEnd > translatorStart, 'UI translation function must be bounded');
vm.runInNewContext(
  html.slice(translatorStart, translatorEnd) + '\n globalThis.__zunoTranslate = translateUiText;',
  context
);
const uiText = context.__zunoUiText;
const translate = context.__zunoTranslate;

const categories = [...questionSource.matchAll(/\bc:'([^']+)'/g)].map(match => match[1]);
for (const category of new Set(categories)) {
  assert.ok(uiText[category], 'Missing question-practice category translation: ' + category);
  assert.notEqual(translate(category, 0), category, 'German category remains untranslated: ' + category);
  assert.notEqual(translate(category, 1), category, 'English category remains untranslated: ' + category);
}
const labels = [
  'تمرین سؤال پرسیدن',
  'سؤال‌های پرکاربرد آلمانی را با جواب، تلفظ فارسی و ترجمه تمرین کن.',
  'باز کردن تمرین',
  'بستن تمرین',
  'موضوع سؤال',
  'جستجو در سؤال‌ها',
  'مثلاً ساعت کاری، رنگ مورد علاقه، سن…',
  'سؤالی پیدا نشد.',
  'موضوع یا عبارت دیگری را جستجو کن.',
  'سؤال به آلمانی',
  'پنهان کردن جواب',
  'نمایش جواب'
];
for (const label of labels) {
  assert.ok(uiText[label], 'Missing question-practice UI translation: ' + label);
  assert.notEqual(translate(label, 0), label);
  assert.notEqual(translate(label, 1), label);
}
assert.equal(translate('تلفظ فارسی: وی گِیت اِس دیر؟', 0), 'Persische Aussprache: وی گِیت اِس دیر؟');
assert.equal(translate('تلفظ فارسی: وی گِیت اِس دیر؟', 1), 'Persian pronunciation: وی گِیت اِس دیر؟');
assert.equal(translate('ترجمه: حالت چطور است؟', 0), 'Übersetzung: حالت چطور است؟');
assert.equal(translate('ترجمه: حالت چطور است؟', 1), 'Translation: حالت چطور است؟');
assert.equal(translate('سؤال ۱ از ۱', 0), 'Frage 1 von 1');
assert.equal(translate('سؤال 2 از 5', 1), 'Question 2 of 5');
assert.equal(translate('۰ سؤال', 0), '0 Fragen');
assert.equal(translate('۰ سؤال', 1), '0 questions');
assert.equal(translate('نتیجه: ۳ از ۷ پاسخ درست.', 0), 'Ergebnis: 3 von 7 richtige Antworten.');
assert.equal(translate('نتیجه: ۳ از ۷ پاسخ درست.', 1), 'Result: 3 of 7 correct answers.');
assert.equal(
  translate('نتیجه: ۳ از ۵. جمله‌سازی ۱: درست؛ جمله‌سازی ۲: نمونه: Ich habe einen Apfel gegessen. پاسخ‌های نادرست را مرور کن و دوباره تلاش کن.', 1),
  'Result: 3 of 5. Sentence building 1: correct; Sentence building 2: Example: Ich habe einen Apfel gegessen. Review incorrect answers and try again.'
);
assert.equal(
  translate('نتیجه آرتیکل: ۲ از ۵ (۴۰٪). پاسخ خالی: ۱. پاسخ صحیح موارد اشتباه: 1. der Apfel', 1),
  'Result – Articles: 2 of 5 (40%) · Blank answers: 1. Correct answers for incorrect items: 1. der Apfel'
);
assert.equal(
  translate('نتیجه وعده‌های غذایی: ۵ از ۵ (۱۰۰٪). آفرین! همه پاسخ‌ها درست است.', 0),
  'Ergebnis – Mahlzeiten: 5 von 5 (100%) · Sehr gut! Alle Antworten sind richtig.'
);
assert.equal(
  translate('حالت چطور است؟ · سلام و احوال‌پرسی', 1),
  'حالت چطور است؟ · Greetings and small talk'
);
const helperStart = html.indexOf('function applyUiTextNode(node,ix){');
const helperEnd = html.indexOf('\nfunction applyInterfaceLanguage()', helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, 'Live text-node localization helper must exist');
vm.runInNewContext(
  html.slice(helperStart, helperEnd) + '\n globalThis.__zunoApplyUiTextNode = applyUiTextNode;',
  context
);
const applyTextNode = context.__zunoApplyUiTextNode;
const dynamicNode = { nodeValue: 'فلش‌کارت‌ها' };
applyTextNode(dynamicNode, 0);
assert.equal(dynamicNode.nodeValue, 'Lernkarten');
applyTextNode(dynamicNode, 1);
assert.equal(dynamicNode.nodeValue, 'Flashcards');
applyTextNode(dynamicNode, -1);
assert.equal(dynamicNode.nodeValue, 'فلش‌کارت‌ها');
dynamicNode.nodeValue = 'دیکشنری و جستجو';
applyTextNode(dynamicNode, 1);
assert.equal(dynamicNode.nodeValue, 'Dictionary & Search', 'Direct dynamic text-node updates must be translated');
applyTextNode(dynamicNode, 1);
assert.equal(dynamicNode.nodeValue, 'Dictionary & Search', 'Observer re-runs must preserve the original source text');
assert.ok(html.includes('characterData:true'), 'Localization observer must watch direct text-node updates');
assert.equal(translate('درس ۳ · Essen und Trinken', 0), 'Lektion 3 · Essen und Trinken', 'Persian lesson digits must translate to German');
assert.equal(translate('درس ۱۲ · Starten wir! A1', 1), 'Lesson 12 · Starten wir! A1', 'Two-digit Persian lesson labels must translate to English');
assert.equal(translate('درس 3 · Starten wir! A1', 1), 'Lesson 3 · Starten wir! A1', 'Latin lesson digits must remain supported');
assert.ok(html.includes(`input:not([dir]):not([type]),input[type="text"]:not([dir]),input[type="search"]:not([dir]),textarea:not([dir])`), 'Unspecified text inputs must use automatic text direction');
const languageHandlerStart = html.indexOf("$('interfaceLanguage').onchange=e=>{");
const languageHandlerEnd = html.indexOf("};syncTopLanguageCode();", languageHandlerStart);
assert.ok(languageHandlerStart >= 0 && languageHandlerEnd > languageHandlerStart, 'Interface language change handler must exist');
const languageHandler = html.slice(languageHandlerStart, languageHandlerEnd);
assert.ok(languageHandler.includes("localStorage.setItem('md_ui_language_chosen','1')"), 'Changing interface language in settings must persist an explicit choice');
assert.ok(html.includes('var selected=prefs.uiLang||initial;'), 'Startup must prefer the saved interface language');
assert.ok(html.includes('if(chosen||hasSavedLanguage){finish();return;}'), 'Startup must not show the language picker again when a preference is already saved');
console.log('PASS: ' + new Set(categories).size + ' question categories, ' + labels.length + ' UI labels, pronunciation/translation prefixes, counters, dynamic category suffixes, and persistent interface-language selection.');
