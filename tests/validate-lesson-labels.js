'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataSource = fs.readFileSync(path.join(root, 'zuno-starten-wir-data.js'), 'utf8');
const dataStart = dataSource.indexOf('const zunoTriLexData=') + 'const zunoTriLexData='.length;
const dataEnd = dataSource.lastIndexOf(';');
assert.ok(dataStart >= 'const zunoTriLexData='.length && dataEnd > dataStart, 'Vocabulary data array must exist');
const words = JSON.parse(dataSource.slice(dataStart, dataEnd));

const functionStart = html.indexOf('function lessonForWord(w){');
const functionEnd = html.indexOf('\nlet currentPage', functionStart);
assert.ok(functionStart >= 0 && functionEnd > functionStart, 'Lesson label helper must exist');
const context = {};
vm.runInNewContext(
  html.slice(functionStart, functionEnd) + '\n globalThis.__lessonForWord = lessonForWord;',
  context
);
const lessonForWord = context.__lessonForWord;
const titles = {1:'Super!',2:'Menschen',3:'Essen und Trinken',4:'Mein Leben'};
const toPersianDigits = value => String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
const lessonCounts = {};
let sourceTaggedRows = 0;

for (const word of words) {
  const match = String(word[10] || '').trim().match(/^Lektion\s+(\d+)$/i);
  if (!match) continue;
  const number = Number(match[1]);
  lessonCounts[number] = (lessonCounts[number] || 0) + 1;
  sourceTaggedRows += 1;
  const expected = 'درس ' + toPersianDigits(number) + (titles[number] ? ' · ' + titles[number] : '');
  assert.equal(
    lessonForWord(word),
    expected,
    'Wrong lesson label for ' + word[0] + ' (source: ' + word[10] + ')'
  );
}

for (let number = 1; number <= 12; number += 1) {
  assert.ok(lessonCounts[number] > 0, 'Missing source-tagged vocabulary for Lektion ' + number);
}
assert.ok(sourceTaggedRows > 1500, 'The lesson-label check should cover the coursebook-tagged vocabulary set');

assert.equal(lessonForWord(['der Papa','','','','','', '', '', '', '', 'Lektion 2']), 'درس ۲ · Menschen');
assert.equal(lessonForWord(['der Arzt','','','','','', '', '', '', '', 'Lektion 5']), 'درس ۵');
assert.equal(lessonForWord(['die Mutter']), 'درس ۲ · Menschen', 'Legacy fallback should remain for untagged words');
assert.equal(lessonForWord(['Apfel']), 'درس ۳ · Essen und Trinken', 'Food vocabulary fallback should remain available');
assert.equal(
  lessonForWord(['die Formel']),
  'واژگان تکمیلی A1 · بدون تطبیق قطعی با درس',
  'Unmatched vocabulary must not receive an invented lesson number'
);

console.log(
  'PASS: ' + sourceTaggedRows + ' source-tagged words across all 12 Starten wir! A1 lessons; fallback labels preserved.'
);
