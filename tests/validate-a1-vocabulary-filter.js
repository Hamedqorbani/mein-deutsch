'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataSource = fs.readFileSync(path.join(root, 'zuno-starten-wir-data.js'), 'utf8');

const helperStart = html.indexOf('function isA1Word(w){');
const helperEnd = html.indexOf('\nfunction counts', helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, 'A1 vocabulary filter helper must exist');

const context = {};
vm.runInNewContext(
  html.slice(helperStart, helperEnd) + '\n globalThis.__isA1Word = isA1Word;',
  context
);
const isA1Word = context.__isA1Word;

const dataStartMarker = 'const zunoTriLexData=';
const dataStart = dataSource.indexOf(dataStartMarker);
const arrayStart = dataStart + dataStartMarker.length;
const arrayEnd = dataSource.lastIndexOf(';');
assert.ok(dataStart >= 0 && arrayEnd > arrayStart, 'Starten wir! vocabulary data array must exist');
const words = JSON.parse(dataSource.slice(arrayStart, arrayEnd));

const sample = (level, lesson) => {
  const word = [];
  word[6] = level;
  word[10] = lesson;
  return word;
};

assert.equal(isA1Word(sample('A1', '')), true, 'Explicit A1 level must be included');
assert.equal(isA1Word(sample(' a1 ', '')), true, 'A1 level matching must ignore case and surrounding whitespace');
assert.equal(isA1Word(sample('A2', 'Lektion 3')), true, 'A1 lesson tag must take precedence over a misclassified level field');
assert.equal(isA1Word(sample('', ' Lektion   2 ')), true, 'Lesson tags must tolerate surrounding and repeated whitespace');
assert.equal(isA1Word(sample('', 'lektion 12')), true, 'Lesson tags must be case-insensitive');
assert.equal(isA1Word(sample('', 'Lektion 13')), false, 'Lessons beyond the A1 course must not be included');
assert.equal(isA1Word(sample('', 'Lektion 0')), false, 'Invalid lesson numbers must not be included');
assert.equal(isA1Word(sample('', 'Kapitel 2')), false, 'Unrelated source labels must not be included');
assert.equal(isA1Word(null), false, 'Invalid word values must be rejected');
assert.equal(isA1Word('not-a-word-array'), false, 'Non-array word values must be rejected');

const lessonCounts = {};
let taggedCount = 0;
for (const word of words) {
  const source = String(word[10] || '').trim();
  const match = source.match(/^Lektion\s+(1[0-2]|[1-9])$/i);
  if (!match) continue;
  taggedCount += 1;
  lessonCounts[Number(match[1])] = (lessonCounts[Number(match[1])] || 0) + 1;
  assert.equal(isA1Word(word), true, 'A lesson-tagged coursebook word was filtered out: ' + word[0]);
}
for (let lesson = 1; lesson <= 12; lesson += 1) {
  assert.ok(lessonCounts[lesson] > 0, 'Missing A1 vocabulary for Lektion ' + lesson);
}
assert.ok(taggedCount > 1500, 'Regression test must cover the full lesson-tagged vocabulary set');

console.log('PASS: A1 filter normalization, invalid labels, and ' + taggedCount + ' Starten wir! lesson-tagged records across all 12 lessons.');
