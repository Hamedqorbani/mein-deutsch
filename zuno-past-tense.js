/* Zuno past-tense learning module
 * Verb forms checked against Duden conjugation tables; usage notes against IDS grammis and Goethe-Institut.
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
    { verb: 'essen', meaning: 'غذا خوردن', level: 'A1', past: ['aß', 'aßest', 'aß', 'aßen', 'aßt', 'aßen'], part: 'gegessen', aux: 'haben', note: 'برای du، شکل aßt نیز در Duden ثبت شده است؛ این جدول aßest را نشان می‌دهد.' },
    { verb: 'trinken', meaning: 'نوشیدن', level: 'A1', past: ['trank', 'trankst', 'trank', 'tranken', 'trankt', 'tranken'], part: 'getrunken', aux: 'haben' },
    { verb: 'sprechen', meaning: 'صحبت کردن', level: 'A1', past: ['sprach', 'sprachst', 'sprach', 'sprachen', 'spracht', 'sprachen'], part: 'gesprochen', aux: 'haben' },
    { verb: 'fahren', meaning: 'رفتن با وسیله / رانندگی کردن', level: 'A1', past: ['fuhr', 'fuhrst', 'fuhr', 'fuhren', 'fuhrt', 'fuhren'], part: 'gefahren', aux: 'sein', note: 'در حرکت به مقصد: sein، مانند Ich bin nach Berlin gefahren. برای معنی رانندگی/هدایت وسیله، Duden صورت haben را نیز ثبت می‌کند.' },
    { verb: 'bleiben', meaning: 'ماندن', level: 'A1', past: ['blieb', 'bliebst', 'blieb', 'blieben', 'bliebt', 'blieben'], part: 'geblieben', aux: 'sein' },
    { verb: 'aufstehen', meaning: 'از خواب یا جا بلند شدن', level: 'A2', past: ['stand auf', 'standest auf', 'stand auf', 'standen auf', 'standet auf', 'standen auf'], part: 'aufgestanden', aux: 'sein', note: 'در معنی معمولِ برخاستن از خواب، شکل رایج bin aufgestanden است؛ Duden با توجه به کاربرد، haben را هم ثبت می‌کند.' },
    { verb: 'einkaufen', meaning: 'خرید کردن', level: 'A2', past: ['kaufte ein', 'kauftest ein', 'kaufte ein', 'kauften ein', 'kauftet ein', 'kauften ein'], part: 'eingekauft', aux: 'haben', note: 'فعل جداشدنی: ein + ge + kauft → eingekauft.' },
    { verb: 'besuchen', meaning: 'دیدار کردن', level: 'A2', past: ['besuchte', 'besuchtest', 'besuchte', 'besuchten', 'besuchtet', 'besuchten'], part: 'besucht', aux: 'haben', note: 'پیشوند be- جدانشدنی است؛ بنابراین ge نمی‌آید.' },
    { verb: 'studieren', meaning: 'تحصیل کردن', level: 'A2', past: ['studierte', 'studiertest', 'studierte', 'studierten', 'studiertet', 'studierten'], part: 'studiert', aux: 'haben', note: 'فعل پایان‌یافته به -ieren، Partizip II را بدون ge می‌سازد.' }
  ];

  var QUESTIONS = [
    { q: 'Gestern habe ich Deutsch gelernt. این جمله در کدام زمان است؟', options: ['Präteritum', 'Perfekt', 'Präsens'], answer: 1, why: 'haben + gelernt ساخت Perfekt است.' },
    { q: 'Ich ging nach Hause. این جمله در کدام زمان است؟', options: ['Präteritum', 'Perfekt', 'Präsens'], answer: 0, why: 'ging شکل Präteritum فعل gehen است.' },
    { q: 'جای خالی: Ich ___ Deutsch gelernt.', options: ['habe', 'bin', 'hat'], answer: 0, why: 'lernen در این مثال با haben می‌آید: Ich habe gelernt.' },
    { q: 'جای خالی: Wir ___ nach Hause gegangen.', options: ['haben', 'sind', 'seid'], answer: 1, why: 'فاعل wir با sein به شکل sind می‌آید.' },
    { q: 'Partizip II فعل essen کدام است؟', options: ['geesst', 'gegessen', 'geessen'], answer: 1, why: 'شکل ثبت‌شده در Duden: gegessen.' },
    { q: 'Partizip II فعل einkaufen کدام است؟', options: ['geeingekauft', 'eingekauft', 'einkauft'], answer: 1, why: 'در فعل جداشدنی، ge بین پیشوند و ریشه می‌آید: eingekauft.' },
    { q: 'Präteritum فعل sein برای du کدام است؟', options: ['war', 'warst', 'waren'], answer: 1, why: 'صرف درست: ich war، du warst، er war.' },
    { q: 'Partizip II فعل studieren کدام است؟', options: ['gestudiert', 'studiert', 'studieren'], answer: 1, why: 'فعل‌های پایان‌یافته به -ieren معمولاً ge نمی‌گیرند.' }
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
        return '<td' + (index === 0 ? ' dir="auto"' : ' dir="ltr"') + '>' + escapeHtml(item) + '</td>';
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
    var rows = PRONOUNS.map(function (pronoun, index) {
      return [pronoun, verb.past[index], verb.part, AUXILIARIES[verb.aux][index] + ' ' + verb.part];
    });
    var note = verb.note ? '<p class="muted tiny">' + escapeHtml(verb.note) + '</p>' : '';
    var host = document.getElementById('zptVerbDetail');
    if (!host) return;
    host.innerHTML =
      '<div class="row between"><b dir="ltr" style="font-size:19px">' + escapeHtml(verb.verb) + '</b><span class="chip">' + escapeHtml(verb.level) + ' · ' + escapeHtml(verb.meaning) + '</span></div>' +
      '<p class="muted tiny">Partizip II: <b dir="ltr">' + escapeHtml(verb.part) + '</b> · فعل کمکی در این کاربرد: <b dir="ltr">' + escapeHtml(verb.aux) + '</b></p>' +
      makeTable(['ضمیر فاعلی', 'Präteritum', 'Partizip II', 'Perfekt'], rows) + note;
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
    var sentence = document.getElementById('zptSentence');
    var expected = ['Ich habe gestern einen Film gesehen.', 'Gestern habe ich einen Film gesehen.'];
    var sentenceOk = expected.some(function (item) {
      return normalizeSentence(sentence ? sentence.value : '') === normalizeSentence(item);
    });
    if (sentenceOk) score += 1;
    if (sentence) sentence.style.borderColor = sentenceOk ? 'var(--accent)' : 'var(--danger)';
    var feedback = document.getElementById('zptPracticeFeedback');
    if (feedback) feedback.textContent = 'نتیجه: ' + score + ' از ۹. ' +
      (sentenceOk ? 'جمله‌سازی درست است. ' : 'نمونه درست: ' + expected[0] + ' ') +
      (score === 9 ? 'عالی! همه پاسخ‌ها درست است.' : 'پاسخ‌های نادرست را مرور کن و دوباره تلاش کن.');
  }

  function resetPractice() {
    QUESTIONS.forEach(function (_, index) {
      var select = document.getElementById('zptAnswer' + index);
      var explain = document.getElementById('zptExplain' + index);
      if (select) { select.value = ''; select.style.borderColor = ''; }
      if (explain) explain.textContent = '';
    });
    var sentence = document.getElementById('zptSentence');
    if (sentence) { sentence.value = ''; sentence.style.borderColor = ''; }
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
      '<p class="muted tiny">در Perfekt، با عوض شدن ضمیر، فعل کمکی صرف می‌شود؛ Partizip II همان شکل می‌ماند.</p>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="praeteritum" hidden>',
      '<span class="lesson-tag">A1 · درس تکمیلی ۳ · sein و haben | A2 · صرف فعل‌های دیگر</span>',
      '<p>برای شروع، شکل‌های Präteritum فعل‌های sein و haben را حفظ کن. بعد می‌توانی شکل گذشته فعل‌های باقاعده و قوی را در جدول ببینی.</p>',
      '<div class="grid2"><div><b>sein · بودن</b>' + makeTable(['ضمیر', 'Präteritum'], PRONOUNS.map(function (p, i) { return [p, VERBS[0].past[i]]; })) + '</div><div><b>haben · داشتن</b>' + makeTable(['ضمیر', 'Präteritum'], PRONOUNS.map(function (p, i) { return [p, VERBS[1].past[i]]; })) + '</div></div>',
      '<div class="zpt-callout"><b>نمونه جمله</b><p dir="ltr">Ich war gestern zu Hause.</p><small>من دیروز خانه بودم.</small><p dir="ltr">Wir hatten keine Zeit.</p><small>ما وقت نداشتیم.</small></div>',
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
      makeTable(['نوع فعل', 'الگو', 'نمونه'], [
        ['باقاعده', 'ge- + ریشه + -t', 'lernen → gelernt'],
        ['ریشه پایان‌یافته به -t / -d', 'اغلب ge- + ریشه + -et', 'arbeiten → gearbeitet'],
        ['قوی', 'اغلب ge- + ریشه + -en', 'gehen → gegangen · trinken → getrunken'],
        ['مختلط', 'تغییر ریشه + -t', 'bringen → gebracht · denken → gedacht'],
        ['جداشدنی', 'پیشوند + ge + ریشه', 'einkaufen → eingekauft · aufstehen → aufgestanden'],
        ['جدانشدنی', 'بدون ge-', 'besuchen → besucht · verstehen → verstanden'],
        ['پایان -ieren', 'بدون ge- و با -t', 'studieren → studiert']
      ]),
      '<div class="zpt-callout"><b>سه نکته مهم</b><p>۱) فعل‌های جداشدنی: ge میان پیشوند و ریشه می‌آید.</p><p>۲) پیشوندهای رایجِ جدانشدنی مانند be-, emp-, ent-, er-, ge-, miss-, ver- و zer- معمولاً ge نمی‌گیرند.</p><p>۳) فعل‌های پایان‌یافته به -ieren نیز ge نمی‌گیرند.</p></div>',
      '<p dir="ltr">Ich habe gestern eingekauft. = من دیروز خرید کردم.</p>',
      '<p dir="ltr">Ich habe meine Mutter besucht. = من به دیدن مادرم رفتم.</p>',
      '<p dir="ltr">Ich habe Softwaretechnik studiert. = من مهندسی نرم‌افزار خوانده‌ام.</p>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="practice" hidden>',
      '<span class="lesson-tag">A1–A2 · درس تکمیلی ۵ · تشخیص و جمله‌سازی</span>',
      '<p class="muted tiny">هشت سؤال را پاسخ بده و جمله آخر را با ترتیب درست بنویس.</p>',
      '<div id="zptQuestions"></div>',
      '<div class="zpt-question"><label for="zptSentence">جمله‌سازی: کلمه‌ها را به جمله درست تبدیل کن.</label><p dir="ltr">Ich / gestern / einen Film / gesehen / habe</p><input id="zptSentence" dir="ltr" autocomplete="off" placeholder="Ich habe gestern ..."></div>',
      '<div class="row" style="margin-top:10px"><button type="button" class="btn primary" id="zptCheck">بررسی پاسخ‌ها</button><button type="button" class="btn" id="zptReset">شروع دوباره</button></div>',
      '<div id="zptPracticeFeedback" class="zpt-feedback" aria-live="polite">پاسخ‌ها را انتخاب کن و بررسی را بزن.</div>',
      '</div>',
      '<div class="zpt-callout" style="margin-top:14px"><b>سطح‌بندی این بخش</b><p><span class="lesson-tag">A1</span> Perfekt ساده با haben/sein و Partizip II پرکاربرد؛ Präteritum فعل‌های sein و haben.</p><p><span class="lesson-tag">A2</span> گسترش صرف Präteritum، فعل‌های جداشدنی/جدانشدنی و الگوهای بیشتر Partizip II.</p></div>',
      '<details class="podcast-text"><summary>منابع بررسی‌شده برای شکل‌ها و قواعد</summary>',
      '<p class="muted tiny">صرف‌های جدول فعل‌ها با مدخل‌های صرف Duden تطبیق داده شده‌اند؛ تفاوت کاربرد دو زمان با IDS grammis و ساخت Perfekt با Goethe-Institut بررسی شده است.</p>',
      '<div class="zpt-sources">',
      '<a href="https://www.duden.de/konjugation/sein_Hilfsverb" target="_blank" rel="noopener noreferrer">Duden · sein</a>',
      '<a href="https://www.duden.de/konjugation/haben_Hilfsverb" target="_blank" rel="noopener noreferrer">Duden · haben</a>',
      '<a href="https://www.duden.de/konjugation/gehen" target="_blank" rel="noopener noreferrer">Duden · gehen</a>',
      '<a href="https://www.duden.de/konjugation/kommen" target="_blank" rel="noopener noreferrer">Duden · kommen</a>',
      '<a href="https://www.duden.de/konjugation/machen" target="_blank" rel="noopener noreferrer">Duden · machen</a>',
      '<a href="https://www.duden.de/konjugation/lernen" target="_blank" rel="noopener noreferrer">Duden · lernen</a>',
      '<a href="https://www.duden.de/konjugation/arbeiten" target="_blank" rel="noopener noreferrer">Duden · arbeiten</a>',
      '<a href="https://www.duden.de/konjugation/essen" target="_blank" rel="noopener noreferrer">Duden · essen</a>',
      '<a href="https://www.duden.de/konjugation/trinken" target="_blank" rel="noopener noreferrer">Duden · trinken</a>',
      '<a href="https://www.duden.de/konjugation/sprechen" target="_blank" rel="noopener noreferrer">Duden · sprechen</a>',
      '<a href="https://www.duden.de/konjugation/fahren" target="_blank" rel="noopener noreferrer">Duden · fahren</a>',
      '<a href="https://www.duden.de/konjugation/bleiben" target="_blank" rel="noopener noreferrer">Duden · bleiben</a>',
      '<a href="https://www.duden.de/konjugation/aufstehen" target="_blank" rel="noopener noreferrer">Duden · aufstehen</a>',
      '<a href="https://www.duden.de/konjugation/einkaufen" target="_blank" rel="noopener noreferrer">Duden · einkaufen</a>',
      '<a href="https://www.duden.de/konjugation/besuchen" target="_blank" rel="noopener noreferrer">Duden · besuchen</a>',
      '<a href="https://www.duden.de/konjugation/studieren" target="_blank" rel="noopener noreferrer">Duden · studieren</a>',
      '<a href="https://grammis.ids-mannheim.de/fragen/3287" target="_blank" rel="noopener noreferrer">IDS grammis · Präteritum و Perfekt</a>',
      '<a href="https://lernen.goethe.de/deutschonline/A1/PDF/DE/deutschonline_Redemittel_und_Grammatik_1-18.pdf" target="_blank" rel="noopener noreferrer">Goethe-Institut · Perfekt A1</a>',
      '<a href="https://deutschegrammatik20.de/verbformen/das-partizip-ii/partizip-ii/" target="_blank" rel="noopener noreferrer">Deutsche Grammatik 2.0 · Partizip II</a>',
      '</div></details>'
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