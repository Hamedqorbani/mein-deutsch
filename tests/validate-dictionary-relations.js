'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'zuno-dictionary-relations.js'), 'utf8');
const observers = [];
const node = {
  dataset: { dictRelations: '0' },
  _html: '',
  set innerHTML(value) { this._html = value; },
  get innerHTML() { return this._html; }
};
const root = {
  querySelectorAll(selector) {
    return selector === '[data-dict-relations]' ? [node] : [];
  }
};
const body = { dataset: { uiLanguage: 'en' } };
const document = {
  body,
  readyState: 'complete',
  head: { appendChild() {} },
  createElement() { return {}; },
  getElementById(id) { return id === 'dictResults' ? root : null; }
};
class MockMutationObserver {
  constructor(callback) { this.callback = callback; observers.push(this); }
  observe(target, options) { this.target = target; this.options = options; }
}
const window = {
  __zunoWordsForRelations: [
    ['beginnen', 'شروع کردن', 'begin'],
    ['anfangen', 'آغاز کردن', 'start'],
    ['aufhören', 'متوقف کردن', 'stop']
  ]
};
vm.runInNewContext(source, { window, document, MutationObserver: MockMutationObserver });

assert.match(node.innerHTML, /Synonyms/, 'English UI must show an English synonyms label');
assert.match(node.innerHTML, /Antonyms/, 'English UI must show an English antonyms label');
assert.match(node.innerHTML, /<small dir="ltr">start<\/small>/, 'English UI should use an available English vocabulary gloss');
assert.doesNotMatch(node.innerHTML, /آغاز کردن|مترادف‌ها|متضادها/, 'English UI must not leak Persian relation labels or glosses');
const duplicateSynonymCount = (node.innerHTML.match(/<b dir="ltr">anfangen<\/b>/g) || []).length;
assert.equal(duplicateSynonymCount, 1, 'Repeated synonym pairs must render only once');

const languageObserver = observers.find(observer => observer.target === body);
assert.ok(languageObserver, 'A body language observer must be installed');
body.dataset.uiLanguage = 'fa';
languageObserver.callback([{ attributeName: 'data-ui-language' }]);
assert.match(node.innerHTML, /مترادف‌ها/, 'Changing to Persian must re-render relation headings');
assert.match(node.innerHTML, /آغاز کردن/, 'Persian UI must show Persian relation glosses');

body.dataset.uiLanguage = 'de';
languageObserver.callback([{ attributeName: 'data-ui-language' }]);
assert.match(node.innerHTML, /Synonyme/, 'Changing to German must re-render relation headings');
assert.match(node.innerHTML, /Antonyme/, 'German UI must show German antonym label');
assert.doesNotMatch(node.innerHTML, /آغاز کردن|مترادف‌ها|متضادها/, 'German UI must not leak Persian relation labels or glosses');

console.log('PASS: dictionary relation localization (fa/de/en), language switching, available English glosses, and duplicate suppression.');
