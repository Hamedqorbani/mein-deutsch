'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { PRONOUNS, AUXILIARIES, VERBS, QUESTIONS, SENTENCE_RULES, evaluateChoice, evaluateSentence, getQuestionMetadata } = require(path.join(root, 'zuno-past-tense.js'));
assert.equal(PRONOUNS.length, 6);
assert.equal(VERBS.length, 54);
assert.equal(QUESTIONS.length, 72);
assert.equal(SENTENCE_RULES.length, 20);
assert.equal(evaluateChoice('', 0), null);
assert.equal(evaluateChoice('0', 0), true);
assert.equal(evaluateChoice('1', 0), false);
for (const item of QUESTIONS) {
  const meta = getQuestionMetadata(item);
  assert.ok(meta.level && meta.lesson, 'Every question must display a level and lesson');
  if (item.q.startsWith('A1 ·')) assert.equal(meta.level, 'A1');
  if (item.q.startsWith('A2 ·')) assert.equal(meta.level, 'A2');
}
for (const rule of SENTENCE_RULES) {
  assert.ok(rule.id && rule.expected && rule.level && rule.lesson);
  assert.ok(rule.accepted.length > 0);
  for (const accepted of rule.accepted) assert.equal(evaluateSentence(accepted, rule.accepted), true);
  assert.equal(evaluateSentence('Das ist ein falscher Satz.', rule.accepted), false);
}
for (const auxiliary of ['haben', 'sein']) assert.equal(AUXILIARIES[auxiliary].length, 6);
const names = new Set();
for (const item of VERBS) {
  assert.ok(item.verb && item.meaning && item.level && item.lesson && item.part);
  assert.ok(['A1', 'A2'].includes(item.level));
  assert.equal(item.past.length, 6, item.verb + ' must have six Präteritum forms');
  assert.ok(AUXILIARIES[item.aux], item.verb + ' has invalid auxiliary');
  if (item.altAux) assert.ok(AUXILIARIES[item.altAux]);
  assert.ok(!names.has(item.verb), 'Duplicate verb: ' + item.verb);
  names.add(item.verb);
}
for (const item of QUESTIONS) {
  assert.ok(Array.isArray(item.options) && item.options.length >= 2);
  assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length);
  assert.ok(item.why);
}
const expected = {
  vergessen: { past: ['vergaß','vergaßest','vergaß','vergaßen','vergaßt','vergaßen'], part: 'vergessen', aux: 'haben' },
  einladen: { past: ['lud ein','ludest ein','lud ein','luden ein','ludet ein','luden ein'], part: 'eingeladen', aux: 'haben' },
  mitbringen: { past: ['brachte mit','brachtest mit','brachte mit','brachten mit','brachtet mit','brachten mit'], part: 'mitgebracht', aux: 'haben' },
  zurückkommen: { past: ['kam zurück','kamst zurück','kam zurück','kamen zurück','kamt zurück','kamen zurück'], part: 'zurückgekommen', aux: 'sein' },
  wohnen: { past: ['wohnte','wohntest','wohnte','wohnten','wohntet','wohnten'], part: 'gewohnt', aux: 'haben' },
  spielen: { past: ['spielte','spieltest','spielte','spielten','spieltet','spielten'], part: 'gespielt', aux: 'haben' },
  kaufen: { past: ['kaufte','kauftest','kaufte','kauften','kauftet','kauften'], part: 'gekauft', aux: 'haben' },
  fragen: { past: ['fragte','fragtest','fragte','fragten','fragtet','fragten'], part: 'gefragt', aux: 'haben' },
  sagen: { past: ['sagte','sagtest','sagte','sagten','sagtet','sagten'], part: 'gesagt', aux: 'haben' },
  hören: { past: ['hörte','hörtest','hörte','hörten','hörtet','hörten'], part: 'gehört', aux: 'haben' },
  kochen: { past: ['kochte','kochtest','kochte','kochten','kochtet','kochten'], part: 'gekocht', aux: 'haben' },
  suchen: { past: ['suchte','suchtest','suchte','suchten','suchtet','suchten'], part: 'gesucht', aux: 'haben' },
  öffnen: { past: ['öffnete','öffnetest','öffnete','öffneten','öffnetet','öffneten'], part: 'geöffnet', aux: 'haben' }
};
for (const [name, value] of Object.entries(expected)) {
  const actual = VERBS.find(item => item.verb === name);
  assert.ok(actual, 'Missing verb ' + name);
  assert.deepEqual(actual.past, value.past);
  assert.equal(actual.part, value.part);
  assert.equal(actual.aux, value.aux);
}
const auxExpected = {
  fahren: { aux: 'sein', past: ['fuhr','fuhrst','fuhr','fuhren','fuhrt','fuhren'], part: 'gefahren', alt: 'haben' },
  aufstehen: { aux: 'sein', past: ['stand auf','standest auf','stand auf','standen auf','standet auf','standen auf'], part: 'aufgestanden' },
  laufen: { aux: 'sein', past: ['lief','liefst','lief','liefen','lieft','liefen'], part: 'gelaufen', alt: 'haben' },
  treffen: { aux: 'haben', past: ['traf','trafst','traf','trafen','traft','trafen'], part: 'getroffen', alt: 'sein' },
  bekommen: { aux: 'haben', past: ['bekam','bekamst','bekam','bekamen','bekamt','bekamen'], part: 'bekommen', alt: 'sein' }
};
for (const [name, expected] of Object.entries(auxExpected)) {
  const actual = VERBS.find(item => item.verb === name);
  assert.ok(actual, 'Missing contextual auxiliary verb ' + name);
  assert.equal(actual.aux, expected.aux, name + ' primary auxiliary');
  assert.deepEqual(actual.past, expected.past, name + ' Präteritum');
  assert.equal(actual.part, expected.part, name + ' Partizip II');
  if (expected.alt) assert.ok(Array.isArray(actual.auxCases) && actual.auxCases.some(item => item.aux === expected.alt), name + ' must document its distinct auxiliary usage');
}
for (const item of VERBS) for (const usage of item.auxCases || []) {
  assert.ok(AUXILIARIES[usage.aux], item.verb + ' has invalid contextual auxiliary');
  assert.ok(usage.label && usage.lesson && usage.source, item.verb + ' contextual usage must include label, lesson and source');
}
const pastSourceForAux = fs.readFileSync(path.join(root, 'zuno-past-tense.js'), 'utf8');
assert.ok(pastSourceForAux.includes('data-zpt-tab="auxiliary"'));
assert.ok(!pastSourceForAux.includes("perfect += ' / '"), 'Primary Perfekt table must not show context-dependent auxiliaries as interchangeable');
for (const id of ['zptSentence6','zptSentence7','zptSentence8','zptSentence9','zptSentence10','zptSentence11','zptSentence12','zptSentence13','zptSentence14','zptSentence15','zptSentence16']) assert.ok(pastSourceForAux.includes(id));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let inlineCount = 0;
for (const match of html.matchAll(pattern)) {
  const attrs = match[1];
  const type = (attrs.match(/\btype\s*=\s*["']([^"']+)["']/i) || [])[1] || 'text/javascript';
  if (/\bsrc\s*=/i.test(attrs) || !/javascript|module/i.test(type) || !match[2].trim()) continue;
  new vm.Script(match[2], { filename: 'index-inline-' + (++inlineCount) + '.js' });
}
for (const file of ['zuno-past-tense.js','enhancements.js','zuno-a1-completion.js','zuno-question-practice.js','zuno-starten-wir-data.js']) {
  new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });
}
const pastSource = fs.readFileSync(path.join(root, 'zuno-past-tense.js'), 'utf8');
for (const id of ['zptSentence3','zptSentence4','zptSentence5','zptSentence6','zptSentence7','zptSentence8','zptSentence9','zptSentence10','zptSentence11','zptSentence12','zptSentence13','zptSentence14','zptSentence15','zptSentence16','zptSentence17','zptSentence18','zptSentence19','zptSentence20']) assert.ok(pastSource.includes(id));
assert.ok(pastSource.includes("addEventListener('input'"));
assert.ok(pastSource.includes("addEventListener('change'"));
assert.ok(pastSource.includes('aria-live'));
assert.ok(pastSource.includes('übergesetzt'));
assert.ok(pastSource.includes('übersetzt'));
assert.ok(pastSource.includes('grammis.ids-mannheim.de/kontrastive-grammatik/3769'));
assert.ok(QUESTIONS.some(item => item.q.includes('übersetzen') && item.options.includes('übersetzt')));
assert.ok(QUESTIONS.some(item => item.q.includes('über|setzen') && item.options.includes('übergesetzt')));
assert.ok(!pastSource.includes('هشت جمله را بساز'));
console.log('PASS: ' + VERBS.length + ' unique A1/A2 verbs, ' + QUESTIONS.length + ' validated questions, six pronoun forms, ' + SENTENCE_RULES.length + ' sentence builders, live feedback helpers, ' + inlineCount + ' inline script(s), and all external JavaScript files compile.');
