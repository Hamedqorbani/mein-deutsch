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
console.log('PASS: ' + new Set(categories).size + ' question categories, ' + labels.length + ' UI labels, pronunciation/translation prefixes, counters, and dynamic category suffixes.');
