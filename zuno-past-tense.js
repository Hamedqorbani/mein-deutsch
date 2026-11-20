/* Zuno past-tense learning module
 * Checked: 2026-11-19. The displayed forms are a deliberately selected A1/A2 starter set.
 */
(function () {
  'use strict';

  var PRONOUNS = ['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'];
  var AUXILIARIES = {
    haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
    sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind']
  };

  var VERBS = [
    { verb: 'sein', meaning: 'بودن', level: 'A1', past: ['war', 'warst', 'war', 'waren', 'wart', 'waren'], part: 'gewesen', aux: 'sein', note: 'sein در مکالمه هم اغلب با Präteritum می‌آید: Ich war müde.' },
    { verb: 'haben', meaning: 'داشتن', level: 'A1', past: ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'], part: 'gehabt', aux: 'haben', note: 'haben نیز در گفتار روزمره معمولاً به شکل hatte می‌آید.' },
    { verb: 'gehen', meaning: 'رفتن', level: 'A1', past: ['ging', 'gingst', 'ging', 'gingen', 'gingt', 'gingen'], part: 'gegangen', aux: 'sein' },
    { verb: 'kommen', meaning: 'آمدن', level: 'A1', past: ['kam', 'kamst', 'kam', 'kamen', 'kamt', 'kamen'], part: 'gekommen', aux: 'sein' },
    { verb: 'machen', meaning: 'انجام دادن', level: 'A1', past: ['machte', 'machtest', 'machte', 'machten', 'machtet', 'machten'], part: 'gemacht', aux: 'haben' },
    { verb: 'lernen', meaning: 'یاد گرفتن', level: 'A1', past: ['lernte', 'lerntest', 'lernte', 'lernten', 'lerntet', 'lernten'], part: 'gelernt', aux: 'haben' },
    { verb: 'arbeiten', meaning: 'کار کردن', level: 'A1', past: ['arbeitete', 'arbeitetest', 'arbeitete', 'arbeiteten', 'arbeitetet', 'arbeiteten'], part: 'gearbeitet', aux: 'haben', note: 'چون ریشه به t ختم می‌شود، Partizip II با -et ساخته شده است.' },
    { verb: 'essen', meaning: 'غذا خوردن', level: 'A1', past: ['aß', 'aßest', 'aß', 'aßen', 'aßt', 'aßen'], part: 'gegessen', aux: 'haben', note: 'برای du، شکل aßt نیز به‌کار می‌رود؛ این جدول aßest را نشان می‌دهد.' },
    { verb: 'trinken', meaning: 'نوشیدن', level: 'A1', past: ['trank', 'trankst', 'trank', 'tranken', 'trankt', 'tranken'], part: 'getrunken', aux: 'haben' },
    { verb: 'sprechen', meaning: 'صحبت کردن', level: 'A1', past: ['sprach', 'sprachst', 'sprach', 'sprachen', 'spracht', 'sprachen'], part: 'gesprochen', aux: 'haben' },
    { verb: 'fahren', meaning: 'رفتن با وسیله / رانندگی کردن', level: 'A1', past: ['fuhr', 'fuhrst', 'fuhr', 'fuhren', 'fuhrt', 'fuhren'], part: 'gefahren', aux: 'sein', altAux: 'haben', note: 'در حرکت به مقصد: sein، مانند Ich bin nach Berlin gefahren. برای معنی رانندگی/هدایت وسیله، در این کاربرد صورت haben نیز به‌کار می‌رود.' },
    { verb: 'bleiben', meaning: 'ماندن', level: 'A1', past: ['blieb', 'bliebst', 'blieb', 'blieben', 'bliebt', 'blieben'], part: 'geblieben', aux: 'sein' },
    { verb: 'aufstehen', meaning: 'از خواب یا جا بلند شدن', level: 'A2', past: ['stand auf', 'standest auf', 'stand auf', 'standen auf', 'standet auf', 'standen auf'], part: 'aufgestanden', aux: 'sein', altAux: 'haben', note: 'در معنی معمولِ برخاستن از خواب، شکل رایج bin aufgestanden است؛ بسته به کاربرد، haben نیز ممکن است.' },
    { verb: 'einkaufen', meaning: 'خرید کردن', level: 'A2', past: ['kaufte ein', 'kauftest ein', 'kaufte ein', 'kauften ein', 'kauftet ein', 'kauften ein'], part: 'eingekauft', aux: 'haben', note: 'فعل جداشدنی: ein + ge + kauft → eingekauft.' },
    { verb: 'besuchen', meaning: 'دیدار کردن', level: 'A2', past: ['besuchte', 'besuchtest', 'besuchte', 'besuchten', 'besuchtet', 'besuchten'], part: 'besucht', aux: 'haben', note: 'پیشوند be- جدانشدنی است؛ بنابراین ge نمی‌آید.' },
    { verb: 'studieren', meaning: 'تحصیل کردن', level: 'A2', past: ['studierte', 'studiertest', 'studierte', 'studierten', 'studiertet', 'studierten'], part: 'studiert', aux: 'haben', note: 'فعل پایان‌یافته به -ieren، Partizip II را بدون ge می‌سازد.' },
    { verb: 'können', meaning: 'توانستن', level: 'A1', past: ['konnte', 'konntest', 'konnte', 'konnten', 'konntet', 'konnten'], part: 'gekonnt', aux: 'haben', note: 'اگر با مصدر فعل دیگری بیاید، در Perfekt معمولاً مصدر können در پایان می‌آید: Ich habe kommen können. هر دو صورت gekonnt و können به‌کار می‌روند.' },
    { verb: 'müssen', meaning: 'مجبور بودن / باید', level: 'A1', past: ['musste', 'musstest', 'musste', 'mussten', 'musstet', 'mussten'], part: 'gemusst', aux: 'haben', note: 'اگر با مصدر فعل دیگری بیاید، در Perfekt معمولاً مصدر müssen در پایان می‌آید: Wir haben früh aufstehen müssen.' },
{"verb":"sehen","meaning":"دیدن","level":"A1","past":["sah","sahst","sah","sahen","saht","sahen"],"part":"gesehen","aux":"haben"},
{"verb":"lesen","meaning":"خواندن","level":"A1","past":["las","last","las","lasen","last","lasen"],"part":"gelesen","aux":"haben","note":"Duden برای du دو صورت lasest و last را ثبت می‌کند؛ این جدول صورت کوتاه last را نشان می‌دهد."},
{"verb":"schreiben","meaning":"نوشتن","level":"A1","past":["schrieb","schriebst","schrieb","schrieben","schriebt","schrieben"],"part":"geschrieben","aux":"haben"},
{"verb":"finden","meaning":"پیدا کردن","level":"A1","past":["fand","fandest","fand","fanden","fandet","fanden"],"part":"gefunden","aux":"haben","note":"برای du، Duden صورت‌های fandest و fandst را ثبت می‌کند؛ اینجا fandest آمده است."},
{"verb":"nehmen","meaning":"گرفتن / برداشتن","level":"A1","past":["nahm","nahmst","nahm","nahmen","nahmt","nahmen"],"part":"genommen","aux":"haben"},
{"verb":"geben","meaning":"دادن","level":"A1","past":["gab","gabst","gab","gaben","gabt","gaben"],"part":"gegeben","aux":"haben"},
{"verb":"helfen","meaning":"کمک کردن","level":"A1","past":["half","halfst","half","halfen","halft","halfen"],"part":"geholfen","aux":"haben"},
{"verb":"treffen","meaning":"ملاقات کردن","level":"A1","past":["traf","trafst","traf","trafen","traft","trafen"],"part":"getroffen","aux":"haben","note":"برای معنی رایجِ ملاقات کردنِ یک شخص، haben به‌کار می‌رود؛ Duden کاربردهای دیگری با sein را نیز ثبت می‌کند."},
{"verb":"schlafen","meaning":"خوابیدن","level":"A1","past":["schlief","schliefst","schlief","schliefen","schlieft","schliefen"],"part":"geschlafen","aux":"haben"},
{"verb":"denken","meaning":"فکر کردن","level":"A1","past":["dachte","dachtest","dachte","dachten","dachtet","dachten"],"part":"gedacht","aux":"haben","note":"فعل مختلط است: ریشه تغییر می‌کند، اما در Präteritum شناسه‌های -te می‌آیند."},
{"verb":"wissen","meaning":"دانستن","level":"A1","past":["wusste","wusstest","wusste","wussten","wusstet","wussten"],"part":"gewusst","aux":"haben"},
{"verb":"laufen","meaning":"دویدن / راه رفتن","level":"A1","past":["lief","liefst","lief","liefen","lieft","liefen"],"part":"gelaufen","aux":"sein","note":"برای حرکت و جابه‌جایی معمولاً sein می‌آید: Ich bin nach Hause gelaufen. Duden برای برخی کاربردهای دیگر haben را نیز ثبت می‌کند."},
{"verb":"bringen","meaning":"آوردن","level":"A1","past":["brachte","brachtest","brachte","brachten","brachtet","brachten"],"part":"gebracht","aux":"haben","note":"فعل مختلط است: brachte و gebracht را باید همراه فعل حفظ کرد."},
{"verb":"verstehen","meaning":"فهمیدن","level":"A1","past":["verstand","verstandest","verstand","verstanden","verstandet","verstanden"],"part":"verstanden","aux":"haben","note":"پیشوند ver- جدانشدنی است؛ Partizip II بدون ge ساخته می‌شود."},
{"verb":"fernsehen","meaning":"تلویزیون تماشا کردن","level":"A1","past":["sah fern","sahst fern","sah fern","sahen fern","saht fern","sahen fern"],"part":"ferngesehen","aux":"haben","note":"فعل جداشدنی است: در Präteritum پیشوند به پایان می‌رود و در Partizip II شکل ferngesehen می‌آید."},
{"verb":"aufräumen","meaning":"مرتب کردن","level":"A2","past":["räumte auf","räumtest auf","räumte auf","räumten auf","räumtet auf","räumten auf"],"part":"aufgeräumt","aux":"haben","note":"فعل جداشدنی و باقاعده است: auf + ge + räumt."},
{"verb":"bekommen","meaning":"دریافت کردن / گرفتن","level":"A2","past":["bekam","bekamst","bekam","bekamen","bekamt","bekamen"],"part":"bekommen","aux":"haben","altAux":"sein","note":"پیشوند be- جدانشدنی است؛ بنابراین Partizip II بدون ge است. برای معنی رایجِ دریافت کردن، haben را به‌کار ببر."},
{"verb":"anfangen","meaning":"شروع کردن","level":"A1","past":["fing an","fingst an","fing an","fingen an","fingt an","fingen an"],"part":"angefangen","aux":"haben","note":"فعل جداشدنی و قوی است: anfangen → fing an → angefangen."},
{"verb":"anrufen","meaning":"تلفن زدن","level":"A1","past":["rief an","riefst an","rief an","riefen an","rieft an","riefen an"],"part":"angerufen","aux":"haben","note":"فعل جداشدنی و قوی است: an + ge + rufen → angerufen."},
{"verb":"dürfen","meaning":"اجازه داشتن","level":"A1","past":["durfte","durftest","durfte","durften","durftet","durften"],"part":"gedurft","aux":"haben","note":"فعل مُدال؛ اگر با مصدر دیگری بیاید، در Perfekt معمولاً مصدر dürfen در پایان می‌آید."},
{"verb":"wollen","meaning":"خواستن","level":"A1","past":["wollte","wolltest","wollte","wollten","wolltet","wollten"],"part":"gewollt","aux":"haben","note":"فعل مُدال؛ با مصدر دیگر: Ich habe gehen wollen. به‌تنهایی: Ich habe das nicht gewollt."},
{"verb":"sollen","meaning":"باید / قرار بودن","level":"A1","past":["sollte","solltest","sollte","sollten","solltet","sollten"],"part":"gesollt","aux":"haben","note":"فعل مُدال؛ با مصدر دیگر در Perfekt معمولاً خود مصدر sollen در پایان می‌آید."},
{"verb":"mögen","meaning":"دوست داشتن","level":"A1","past":["mochte","mochtest","mochte","mochten","mochtet","mochten"],"part":"gemocht","aux":"haben","note":"در Präteritum، mögen به mochte تبدیل می‌شود؛ möchte شکل Konjunktiv II برای بیان خواستهٔ مؤدبانه است."}
  ];

  var VERB_META = {"sehen":{"type":"قوی","source":"https://www.duden.de/konjugation/sehen","sourceName":"Duden"},"lesen":{"type":"قوی","source":"https://www.duden.de/konjugation/lesen_aufsammeln","sourceName":"Duden"},"schreiben":{"type":"قوی","source":"https://www.duden.de/konjugation/schreiben","sourceName":"Duden"},"finden":{"type":"قوی","source":"https://www.duden.de/konjugation/finden","sourceName":"Duden"},"nehmen":{"type":"قوی","source":"https://www.duden.de/konjugation/nehmen","sourceName":"Duden"},"geben":{"type":"قوی","source":"https://www.duden.de/konjugation/geben","sourceName":"Duden"},"helfen":{"type":"قوی","source":"https://www.duden.de/konjugation/helfen","sourceName":"Duden"},"treffen":{"type":"قوی","source":"https://www.duden.de/konjugation/treffen","sourceName":"Duden"},"schlafen":{"type":"قوی","source":"https://www.duden.de/konjugation/schlafen","sourceName":"Duden"},"denken":{"type":"مختلط","source":"https://www.duden.de/konjugation/denken","sourceName":"Duden"},"wissen":{"type":"بی‌قاعده","source":"https://www.duden.de/konjugation/wissen","sourceName":"Duden"},"laufen":{"type":"قوی · حرکت با sein","source":"https://www.duden.de/konjugation/laufen","sourceName":"Duden"},"bringen":{"type":"مختلط","source":"https://www.duden.de/konjugation/bringen","sourceName":"Duden"},"verstehen":{"type":"قوی · پیشوند جدانشدنی ver-","source":"https://www.duden.de/konjugation/verstehen","sourceName":"Duden"},"fernsehen":{"type":"قوی · جداشدنی","source":"https://www.duden.de/konjugation/fernsehen","sourceName":"Duden"},"aufräumen":{"type":"ضعیف · جداشدنی","source":"https://www.duden.de/konjugation/aufraeumen","sourceName":"Duden"},"bekommen":{"type":"قوی · پیشوند جدانشدنی be-","source":"https://www.duden.de/konjugation/bekommen","sourceName":"Duden"},"anfangen":{"type":"قوی · جداشدنی","source":"https://www.larousse.com/de/konjugation/deutsch/anfangen/487","sourceName":"Larousse"},"anrufen":{"type":"قوی · جداشدنی","source":"https://www.die-konjugation.de/verb/anrufen.php","sourceName":"Die Konjugation"},"dürfen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/duerfen","sourceName":"Duden"},"wollen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/wollen_moechten_wuenschen","sourceName":"Duden"},"sollen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/sollen","sourceName":"Duden"},"mögen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/moegen","sourceName":"Duden"}};

  var QUESTIONS = [
    { q: 'Gestern habe ich Deutsch gelernt. این جمله در کدام زمان است؟', options: ['Präteritum', 'Perfekt', 'Präsens'], answer: 1, why: 'haben + gelernt ساخت Perfekt است.' },
    { q: 'Ich ging nach Hause. این جمله در کدام زمان است؟', options: ['Präteritum', 'Perfekt', 'Präsens'], answer: 0, why: 'ging شکل Präteritum فعل gehen است.' },
    { q: 'جای خالی: Ich ___ Deutsch gelernt.', options: ['habe', 'bin', 'hat'], answer: 0, why: 'lernen در این مثال با haben می‌آید: Ich habe gelernt.' },
    { q: 'جای خالی: Wir ___ nach Hause gegangen.', options: ['haben', 'sind', 'seid'], answer: 1, why: 'فاعل wir با sein به شکل sind می‌آید.' },
    { q: 'Partizip II فعل essen کدام است؟', options: ['geesst', 'gegessen', 'geessen'], answer: 1, why: 'شکل درست: gegessen.' },
    { q: 'Partizip II فعل einkaufen کدام است؟', options: ['geeingekauft', 'eingekauft', 'einkauft'], answer: 1, why: 'در فعل جداشدنی، ge بین پیشوند و ریشه می‌آید: eingekauft.' },
    { q: 'Präteritum فعل sein برای du کدام است؟', options: ['war', 'warst', 'waren'], answer: 1, why: 'صرف درست: ich war، du warst، er war.' },
    { q: 'Partizip II فعل studieren کدام است؟', options: ['gestudiert', 'studiert', 'studieren'], answer: 1, why: 'فعل‌های پایان‌یافته به -ieren معمولاً ge نمی‌گیرند.' },
    { q: 'جای خالی: Ich habe gestern nicht kommen ___.', options: ['gekonnt', 'können', 'kann'], answer: 1, why: 'وقتی فعل مُدال با یک مصدر دیگر می‌آید، معمولاً مصدر آن را نگه می‌داریم: kommen können.' },
    { q: 'Präteritum فعل müssen برای wir کدام است؟', options: ['musst', 'mussten', 'müssten'], answer: 1, why: 'شکل گذشتهٔ خبری برای wir برابر mussten است؛ müssten شکل Konjunktiv II است.' },
{"q":"Partizip II فعل lesen کدام است؟","options":["gelesen","gelesst","ge lesen"],"answer":0,"why":"شکل درست gelesen است: Ich habe das Buch gelesen."},
{"q":"Präteritum فعل nehmen برای du کدام است؟","options":["nahmst","nehmtest","nahmte"],"answer":0,"why":"Duden صورت nahmst را ثبت می‌کند."},
{"q":"Präteritum فعل denken برای wir کدام است؟","options":["denken","dachten","gedacht"],"answer":1,"why":"denken فعل مختلط است: wir dachten."},
{"q":"Partizip II فعل fernsehen کدام است؟","options":["gefernsehen","ferngesehen","fernsehen"],"answer":1,"why":"فعل جداشدنی است و شکل Partizip II آن ferngesehen است."},
{"q":"Präteritum فعل anfangen برای ich کدام است؟","options":["anfangte","fing an","angefangen"],"answer":1,"why":"anfangen فعل قوی و جداشدنی است: ich fing an."},
{"q":"Partizip II فعل verstehen کدام است؟","options":["geverstanden","verstanden","vergestanden"],"answer":1,"why":"پیشوند ver- جدانشدنی است؛ ge اضافه نمی‌شود."},
{"q":"جای خالی: Ich ___ dich gestern angerufen.","options":["bin","habe","hat"],"answer":1,"why":"anrufen در این کاربرد با haben می‌آید: Ich habe angerufen."},
{"q":"Partizip II فعل bringen کدام است؟","options":["gebringt","gebracht","gebringen"],"answer":1,"why":"bringen فعل مختلط است: brachte – gebracht."},
{"q":"Präteritum فعل wissen برای du کدام است؟","options":["wusstest","wusste","gewusst"],"answer":0,"why":"شکل درست برای du برابر wusstest است."},
{"q":"برای حرکت با laufen در Perfekt معمولاً کدام فعل کمکی می‌آید؟","options":["haben","sein","werden"],"answer":1,"why":"برای جابه‌جایی و حرکت: Ich bin gelaufen."},
{"q":"Präteritum فعل dürfen برای ihr کدام است؟","options":["durftet","dürftet","gedurft"],"answer":0,"why":"صورت خبری گذشته durftet است؛ dürftet شکل Konjunktiv II است."},
{"q":"وقتی wollen با مصدر دیگری در Perfekt بیاید، کدام جمله درست است؟","options":["Ich habe gehen gewollt.","Ich habe gehen wollen.","Ich bin gehen wollen."],"answer":1,"why":"با مصدر دیگر، فعل مُدال معمولاً به شکل Ersatzinfinitiv می‌آید: gehen wollen."}
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function makeTable(headers, rows) {
    var head = '<thead><tr>' + headers.map(function (item) {
      return '<th dir="auto">' + escapeHtml(item) + '</th>';
    }).join('') + '</tr></thead>';
    var body = '<tbody>' + rows.map(function (row) {
      return '<tr>' + row.map(function (item, index) {
        return '<td dir="auto">' + escapeHtml(item) + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody>';
    return '<div class="past-table-wrap"><table class="past-table">' + head + body + '</table></div>';
  }

  function addStyles() {
    if (document.getElementById('zunoPastTenseStyles')) return;
    var style = document.createElement('style');
    style.id = 'zunoPastTenseStyles';
    style.textContent =
      '.zpt-tabs{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}' +
      '.zpt-tab{border:1px solid var(--line);background:var(--bg);color:var(--muted);border-radius:10px;padding:8px 11px;min-height:40px}' +
      '.zpt-tab[aria-selected="true"]{background:var(--accent2);border-color:var(--accent);color:var(--text);font-weight:800}' +
      '.zpt-pane[hidden]{display:none!important}' +
      '.zpt-callout{padding:11px;border:1px solid var(--line);border-radius:12px;background:var(--bg);margin:9px 0}' +
      '.zpt-callout p{margin:5px 0}' +
      '.zpt-formula{direction:ltr;text-align:center;font-weight:800;padding:12px;border:1px dashed var(--accent);border-radius:12px;background:var(--panel2);margin:10px 0;overflow-wrap:anywhere}' +
      '.zpt-verb-select{max-width:100%;margin:8px 0}' +
      '.zpt-feedback{padding:10px;border-radius:10px;background:var(--panel2);margin-top:10px;min-height:38px}' +
      '.zpt-sources{display:flex;gap:7px 14px;flex-wrap:wrap;margin:8px 0}' +
      '.zpt-sources a{color:var(--accent);text-decoration:underline;text-underline-offset:3px;font-size:12px}' +
      '.zpt-question{padding:10px;border:1px solid var(--line);border-radius:11px;background:var(--bg);margin:8px 0}' +
      '.zpt-question label{display:block;font-weight:700;font-size:13px}' +
      '.zpt-question select{margin-top:7px}' +
      '@media(max-width:420px){.zpt-tab{flex:1 1 42%;padding:8px 6px;font-size:12px}.zpt-panel .past-table{min-width:300px}}';
    document.head.appendChild(style);
  }

  function renderVerb(verbName) {
    var verb = VERBS.filter(function (item) { return item.verb === verbName; })[0] || VERBS[2];
    var meta = VERB_META[verb.verb] || { type: 'پرکاربرد · بررسی‌شده در مرحله قبل', source: 'https://www.duden.de/konjugation', sourceName: 'Duden' };
    var rows = PRONOUNS.map(function (pronoun, index) {
      var perfect = AUXILIARIES[verb.aux][index] + ' ' + verb.part;
      if (verb.altAux) perfect += ' / ' + AUXILIARIES[verb.altAux][index] + ' ' + verb.part;
      return [pronoun, verb.past[index], verb.part, perfect];
    });
    var note = verb.note ? '<p class="muted tiny"><span class="lesson-tag">' + escapeHtml(verb.level) + ' · درس تکمیلی ۳</span> ' + escapeHtml(verb.note) + '</p>' : '';
    var sourceLink = '<p class="muted tiny"><a href="' + escapeHtml(meta.source) + '" target="_blank" rel="noopener noreferrer">بررسی جدول صرف در ' + escapeHtml(meta.sourceName) + '</a></p>';
    var host = document.getElementById('zptVerbDetail');
    if (!host) return;
    host.innerHTML =
      '<div class="row between"><b dir="ltr" style="font-size:19px">' + escapeHtml(verb.verb) + '</b><span class="chip">واژه ' + escapeHtml(verb.level) + ' · درس تکمیلی ۳ · ' + escapeHtml(verb.meaning) + '</span></div>' +
      '<p class="muted tiny">نوع فعل: <b>' + escapeHtml(meta.type) + '</b> · مبحث صرف گذشته: <b>' + (verb.verb === 'sein' || verb.verb === 'haben' ? 'A1' : 'A2') + '</b></p>' +
      '<p class="muted tiny">Partizip II: <b dir="ltr">' + escapeHtml(verb.part) + '</b> · فعل کمکی در این کاربرد: <b dir="ltr">' + escapeHtml(verb.aux) + (verb.altAux ? ' / ' + escapeHtml(verb.altAux) : '') + '</b></p>' +
      makeTable(['ضمیر فاعلی', 'Präteritum', 'Partizip II', 'Perfekt'], rows) + note + sourceLink;
  }

  function renderQuestions() {
    var host = document.getElementById('zptQuestions');
    if (!host) return;
    host.innerHTML = QUESTIONS.map(function (item, index) {
      return '<div class="zpt-question"><label for="zptAnswer' + index + '">' + (index + 1) + '. ' + escapeHtml(item.q) + '</label>' +
        '<select id="zptAnswer' + index + '"><option value="">انتخاب پاسخ…</option>' +
        item.options.map(function (option, optionIndex) {
          return '<option value="' + optionIndex + '">' + escapeHtml(option) + '</option>';
        }).join('') + '</select><small id="zptExplain' + index + '" class="muted tiny"></small></div>';
    }).join('');
  }

  function normalizeSentence(value) {
    return String(value || '').toLocaleLowerCase('de-DE').normalize('NFC')
      .replace(/[.!?،,]/g, '').replace(/\s+/g, ' ').trim();
  }

  function checkPractice() {
    var score = 0;
    QUESTIONS.forEach(function (item, index) {
      var select = document.getElementById('zptAnswer' + index);
      var explain = document.getElementById('zptExplain' + index);
      var correct = select && select.value !== '' && Number(select.value) === item.answer;
      if (correct) score += 1;
      if (select) select.style.borderColor = correct ? 'var(--accent)' : 'var(--danger)';
      if (explain) explain.textContent = (correct ? '✓ درست · ' : '✗ پاسخ درست: ' + item.options[item.answer] + ' · ') + item.why;
    });
    var sentenceRules = [
      { id: 'zptSentence', accepted: ['Ich habe gestern einen Film gesehen.', 'Gestern habe ich einen Film gesehen.'], expected: 'Ich habe gestern einen Film gesehen.' },
      { id: 'zptSentence2', accepted: ['Wir haben am Abend ferngesehen.', 'Am Abend haben wir ferngesehen.'], expected: 'Wir haben am Abend ferngesehen.' }
    ];
    var sentenceResults = [];
    sentenceRules.forEach(function (rule) {
      var field = document.getElementById(rule.id);
      var correct = rule.accepted.some(function (item) {
        return normalizeSentence(field ? field.value : '') === normalizeSentence(item);
      });
      if (correct) score += 1;
      if (field) field.style.borderColor = correct ? 'var(--accent)' : 'var(--danger)';
      sentenceResults.push(correct);
    });
    var total = QUESTIONS.length + sentenceRules.length;
    var feedback = document.getElementById('zptPracticeFeedback');
    if (feedback) feedback.textContent = 'نتیجه: ' + score + ' از ' + total + '. ' +
      'جمله‌سازی ۱: ' + (sentenceResults[0] ? 'درست' : 'نمونه: ' + sentenceRules[0].expected) + '؛ ' +
      'جمله‌سازی ۲: ' + (sentenceResults[1] ? 'درست' : 'نمونه: ' + sentenceRules[1].expected) + '. ' +
      (score === total ? 'عالی! همه پاسخ‌ها درست است.' : 'پاسخ‌های نادرست را مرور کن و دوباره تلاش کن.');
  }

  function resetPractice() {
    QUESTIONS.forEach(function (_, index) {
      var select = document.getElementById('zptAnswer' + index);
      var explain = document.getElementById('zptExplain' + index);
      if (select) { select.value = ''; select.style.borderColor = ''; }
      if (explain) explain.textContent = '';
    });
    ['zptSentence', 'zptSentence2'].forEach(function (id) {
      var sentence = document.getElementById(id);
      if (sentence) { sentence.value = ''; sentence.style.borderColor = ''; }
    });
    var feedback = document.getElementById('zptPracticeFeedback');
    if (feedback) feedback.textContent = 'تمرین دوباره آماده است.';
  }

  function init() {
    var page = document.getElementById('page-verbs');
    if (!page || document.getElementById('zunoPastLesson')) return;
    addStyles();

    var section = document.createElement('section');
    section.id = 'zunoPastLesson';
    section.className = 'panel zpt-panel';
    section.innerHTML = [
      '<div class="row between"><div><h3 class="section-title">آموزش مرحله‌ای زمان گذشته فعل‌ها</h3><p class="muted tiny">از Perfekt شروع کن؛ سپس Präteritum، Partizip II و جمله‌سازی را تمرین کن.</p></div><span class="chip">A1 → A2</span></div>',
      '<div class="zpt-tabs" role="tablist" aria-label="مراحل آموزش زمان گذشته">',
      '<button type="button" class="zpt-tab" data-zpt-tab="overview" aria-selected="true">تفاوت کاربرد</button>',
      '<button type="button" class="zpt-tab" data-zpt-tab="perfekt" aria-selected="false">Perfekt</button>',
      '<button type="button" class="zpt-tab" data-zpt-tab="praeteritum" aria-selected="false">Präteritum</button>',
      '<button type="button" class="zpt-tab" data-zpt-tab="partizip" aria-selected="false">Partizip II</button>',
      '<button type="button" class="zpt-tab" data-zpt-tab="practice" aria-selected="false">تمرین</button>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="overview">',
      '<span class="lesson-tag">A1 · درس تکمیلی ۱ · کاربرد زمان گذشته</span>',
      '<div class="grid2">',
      '<div class="zpt-callout"><b dir="ltr">Perfekt</b><p>در گفت‌وگوی روزمره برای بیشتر فعل‌ها بسیار رایج است.</p><p dir="ltr">Gestern habe ich Deutsch gelernt.</p><small>دیروز آلمانی یاد گرفتم.</small></div>',
      '<div class="zpt-callout"><b dir="ltr">Präteritum</b><p>در روایت و نوشتار زیاد دیده می‌شود؛ فعل‌های sein و haben و مُدال‌ها در گفتار هم اغلب با آن می‌آیند.</p><p dir="ltr">Ich war müde.</p><small>من خسته بودم.</small></div>',
      '</div>',
      '<p class="muted tiny">این تفاوت یک گرایش کاربردی است، نه قانون قطعی. انتخاب زمان به بافت، نوع متن و گاهی منطقه زبانی بستگی دارد.</p>',
      '<div class="zpt-callout"><b>نمونه با یک معنی:</b><p dir="ltr">Gestern lernte ich Deutsch. <span class="muted">· Präteritum</span></p><p dir="ltr">Gestern habe ich Deutsch gelernt. <span class="muted">· Perfekt</span></p><small>هر دو درباره گذشته‌اند؛ جمله دوم برای گفت‌وگوی روزمره معمول‌تر است.</small></div>',
      '<p class="lesson-tag">A1 · واژه‌های زمان</p><p dir="ltr">gestern = دیروز · vorgestern = پریروز · letzte Woche = هفته گذشته · früher = قبلاً</p>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="perfekt" hidden>',
      '<span class="lesson-tag">A1 · درس تکمیلی ۲ · ساخت Perfekt</span>',
      '<p>Perfekt از فعل کمکیِ صرف‌شده در زمان حال و Partizip II ساخته می‌شود. فعل کمکی معمولاً جایگاه دوم است و Partizip II در پایان جمله می‌آید.</p>',
      '<div class="zpt-formula">فاعل + haben / sein + ادامه جمله + Partizip II</div>',
      '<p><b>صرف فعل کمکی haben</b></p>',
      makeTable(['ضمیر', 'صرف haben'], PRONOUNS.map(function (p, i) { return [p, AUXILIARIES.haben[i]]; })),
      '<p><b>صرف فعل کمکی sein</b></p>',
      makeTable(['ضمیر', 'صرف sein'], PRONOUNS.map(function (p, i) { return [p, AUXILIARIES.sein[i]]; })),
      '<div class="zpt-callout"><b>دو مثال ساده</b><p dir="ltr">Ich habe einen Film gesehen.</p><small>من یک فیلم دیدم.</small><p dir="ltr">Wir sind nach Hause gegangen.</p><small>ما به خانه رفتیم.</small></div>',
      '<div class="zpt-callout"><b>استثنای فعل‌های مُدال</b> <span class="lesson-tag">A2 · درس تکمیلی ۲</span><p>اگر فعل مُدال همراه یک مصدر دیگر بیاید، در Perfekt معمولاً مصدر خود فعل مُدال در پایان می‌آید؛ به این ساختار Ersatzinfinitiv می‌گویند.</p><p dir="ltr">Ich habe gestern nicht kommen können. · Wir haben früh aufstehen müssen.</p><small>دیروز نتوانستم بیایم. · مجبور شدیم زود بیدار شویم.</small><p dir="ltr">Sie hat nach Hause gehen wollen. · Du hast hier nicht parken dürfen.</p><small>او خواسته به خانه برود. · تو اجازه نداشتی اینجا پارک کنی.</small><p>اگر فعل مُدال بدون مصدر دیگری به‌کار رود، Partizip II معمولی می‌آید: <b dir="ltr">Ich habe das nicht gewollt.</b></p></div>',
      '<p class="muted tiny">در Perfekt، با عوض شدن ضمیر، فعل کمکی صرف می‌شود؛ Partizip II همان شکل می‌ماند.</p>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="praeteritum" hidden>',
      '<span class="lesson-tag">A1 · درس تکمیلی ۳ · sein و haben | A2 · صرف فعل‌های دیگر</span>',
      '<p>برای شروع، شکل‌های Präteritum فعل‌های sein و haben را حفظ کن. بعد می‌توانی شکل گذشته فعل‌های باقاعده و قوی را در جدول ببینی.</p>',
      '<div class="grid2"><div><b>sein · بودن</b>' + makeTable(['ضمیر', 'Präteritum'], PRONOUNS.map(function (p, i) { return [p, VERBS[0].past[i]]; })) + '</div><div><b>haben · داشتن</b>' + makeTable(['ضمیر', 'Präteritum'], PRONOUNS.map(function (p, i) { return [p, VERBS[1].past[i]]; })) + '</div></div>',
      '<div class="zpt-callout"><b>نمونه جمله</b><p dir="ltr">Ich war gestern zu Hause.</p><small>من دیروز خانه بودم.</small><p dir="ltr">Wir hatten keine Zeit.</p><small>ما وقت نداشتیم.</small></div>',
      '<div class="zpt-callout"><b>الگوی سادهٔ ساخت Präteritum</b> <span class="lesson-tag">A2 · درس تکمیلی ۳</span><p><b>فعل ضعیف:</b> ریشه + -te؛ سپس شناسه‌های شخصی می‌آیند.</p><p dir="ltr">machen → ich machte · du machtest · er machte · wir machten · ihr machtet · sie machten</p><p><b>فعل قوی:</b> معمولاً واکهٔ ریشه تغییر می‌کند و -te نمی‌گیرد.</p><p dir="ltr">gehen → ich ging · du gingst · er ging · wir gingen · ihr gingt · sie gingen</p><p><b>فعل مختلط:</b> ریشه تغییر می‌کند، اما پایان‌های -te را می‌گیرد.</p><p dir="ltr">bringen → ich brachte · du brachtest · wir brachten</p><small>این الگوها راهنما هستند؛ شکل فعل‌های قوی و مختلط را از جدول معتبر یاد بگیر، نه با حدس.</small></div>',
      '<h4>صرف فعل‌های پرکاربرد با شش ضمیر</h4>',
      '<p class="muted tiny">فعل را انتخاب کن تا Präteritum، Partizip II و Perfekt را کنار هم ببینی. برچسب A1/A2 سطح آموزشی فعل در این مجموعه است.</p>',
      '<label for="zptVerbSelect" class="muted tiny">انتخاب فعل</label>',
      '<select id="zptVerbSelect" class="zpt-verb-select">' + VERBS.map(function (verb) {
        return '<option value="' + escapeHtml(verb.verb) + '">' + escapeHtml(verb.verb + ' · ' + verb.meaning + ' · ' + verb.level) + '</option>';
      }).join('') + '</select>',
      '<div id="zptVerbDetail" class="result"></div>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="partizip" hidden>',
      '<span class="lesson-tag">A1–A2 · درس تکمیلی ۴ · ساخت Partizip II</span>',
      '<p>Partizip II شکل سوم فعل است. الگوها کمک می‌کنند، اما فعل‌های قوی و مختلط را باید همراه خود فعل یاد گرفت.</p>',
      makeTable(['نوع فعل', 'الگو', 'نمونه', 'سطح / درس'], [
        ['باقاعده', 'ge- + ریشه + -t', 'lernen → gelernt', 'A1 · درس ۴'],
        ['پایان -d / -t / -m / -n', 'اغلب ge- + ریشه + -et', 'arbeiten → gearbeitet · atmen → geatmet', 'A1–A2 · درس ۴'],
        ['قوی', 'اغلب ge- + ریشه + -en', 'gehen → gegangen · trinken → getrunken', 'A1–A2 · درس ۴'],
        ['مختلط', 'تغییر ریشه + -t', 'bringen → gebracht · denken → gedacht', 'A2 · درس ۴'],
        ['جداشدنی', 'پیشوند + ge + ریشه', 'einkaufen → eingekauft · aufstehen → aufgestanden', 'A2 · درس ۴'],
        ['جدانشدنی', 'بدون ge-', 'besuchen → besucht · verstehen → verstanden', 'A2 · درس ۴'],
        ['پایان -ieren', 'بدون ge- و با -t', 'studieren → studiert', 'A1–A2 · درس ۴']
      ]),
      '<div class="zpt-callout"><b>سه نکته مهم</b><p>۱) فعل‌های جداشدنی: ge میان پیشوند و ریشه می‌آید.</p><p>۲) پیشوندهای رایجِ جدانشدنی مانند be-, emp-, ent-, er-, ge-, miss-, ver- و zer- معمولاً ge نمی‌گیرند.</p><p>۳) فعل‌های پایان‌یافته به -ieren نیز ge نمی‌گیرند.</p></div>',
      '<div class="zpt-callout"><b>جداشدنی و جدانشدنی را مقایسه کن</b> <span class="lesson-tag">A2 · درس تکمیلی ۴</span><p>در فعل جداشدنی، ge میان پیشوند و ریشه می‌آید:</p><p dir="ltr">anrufen → angerufen · fernsehen → ferngesehen · aufräumen → aufgeräumt</p><p>پیشوندهای جدانشدنی مانند be- و ver-، ge نمی‌گیرند:</p><p dir="ltr">bekommen → bekommen · verstehen → verstanden · besuchen → besucht</p><small>در فعل‌های پایان‌یافته به -ieren نیز ge نمی‌آید: studieren → studiert.</small></div>',
      '<p dir="ltr">Ich habe gestern eingekauft. = من دیروز خرید کردم.</p>',
      '<p dir="ltr">Ich habe meine Mutter besucht. = من به دیدن مادرم رفتم.</p>',
      '<p dir="ltr">Ich habe Softwaretechnik studiert. = من مهندسی نرم‌افزار خوانده‌ام.</p>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="practice" hidden>',
      '<span class="lesson-tag">A1–A2 · درس تکمیلی ۵ · تشخیص و جمله‌سازی</span>',
      '<p class="muted tiny">ده سؤال را پاسخ بده و جمله آخر را با ترتیب درست بنویس.</p>',
      '<div id="zptQuestions"></div>',
      '<div class="zpt-question"><label for="zptSentence">جمله‌سازی ۱: کلمه‌ها را به جمله درست تبدیل کن.</label><p dir="ltr">Ich / gestern / einen Film / gesehen / habe</p><input id="zptSentence" dir="ltr" autocomplete="off" placeholder="Ich habe gestern ..."></div>',
      '<div class="zpt-question"><label for="zptSentence2">جمله‌سازی ۲: فعل جداشدنی را در Perfekt به‌کار ببر.</label><p dir="ltr">Wir / am Abend / ferngesehen / haben</p><input id="zptSentence2" dir="ltr" autocomplete="off" placeholder="Wir haben am Abend ..."></div>',
      '<div class="row" style="margin-top:10px"><button type="button" class="btn primary" id="zptCheck">بررسی پاسخ‌ها</button><button type="button" class="btn" id="zptReset">شروع دوباره</button></div>',
      '<div id="zptPracticeFeedback" class="zpt-feedback" aria-live="polite">پاسخ‌ها را انتخاب کن و بررسی را بزن.</div>',
      '</div>',
      '<div class="zpt-callout" style="margin-top:14px"><b>سطح‌بندی این بخش</b><p><span class="lesson-tag">A1 · درس تکمیلی ۱–۲</span> کاربرد گذشته، Perfekt ساده و فعل‌های کمکی haben/sein.</p><p><span class="lesson-tag">A1 · درس تکمیلی ۳</span> Präteritum فعل‌های sein و haben.</p><p><span class="lesson-tag">A2 · درس تکمیلی ۳–۵</span> Präteritum سایر فعل‌ها، الگوهای Partizip II و تمرین ترکیبی.</p></div>',
      '<div class="zpt-callout"><b>منابع بررسی صرف و قواعد</b><div class="zpt-sources"><a href="https://www.duden.de/konjugation" target="_blank" rel="noopener noreferrer">Duden · جدول‌های صرف</a><a href="https://www.duden.de/sprachwissen/sprachratgeber/Perfektbildung-mit-haben-oder-sein" target="_blank" rel="noopener noreferrer">Duden · haben یا sein</a><a href="https://www.goethe.de/ins/de/de/prf/grm.html" target="_blank" rel="noopener noreferrer">Goethe-Institut · دستور زبان</a><a href="https://grammis.ids-mannheim.de/kontrastive-grammatik/3933" target="_blank" rel="noopener noreferrer">IDS grammis · Partizip II</a></div><small>برای هر فعل، پیوند جدول صرف همان فعل نیز کنار جدول آن نمایش داده می‌شود.</small></div>',

    ].join('');

    var notes = page.querySelector('.zuno-notes');
    if (notes) page.insertBefore(section, notes);
    else page.appendChild(section);

    renderVerb('gehen');
    renderQuestions();

    section.querySelectorAll('[data-zpt-tab]').forEach(function (button) {
      button.addEventListener('click', function () {
        var selected = button.getAttribute('data-zpt-tab');
        section.querySelectorAll('[data-zpt-tab]').forEach(function (tab) {
          tab.setAttribute('aria-selected', String(tab === button));
        });
        section.querySelectorAll('[data-zpt-pane]').forEach(function (pane) {
          pane.hidden = pane.getAttribute('data-zpt-pane') !== selected;
        });
      });
    });

    var verbSelect = document.getElementById('zptVerbSelect');
    if (verbSelect) verbSelect.addEventListener('change', function () { renderVerb(verbSelect.value); });
    var check = document.getElementById('zptCheck');
    var reset = document.getElementById('zptReset');
    if (check) check.addEventListener('click', checkPractice);
    if (reset) reset.addEventListener('click', resetPractice);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();