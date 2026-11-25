/* Zuno past-tense learning module
 * Checked: 2026-11-21. The displayed forms are a deliberately selected A1/A2 starter set.
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
    { verb: 'fahren', meaning: 'رفتن با وسیله / رانندگی کردن', level: 'A1', past: ['fuhr', 'fuhrst', 'fuhr', 'fuhren', 'fuhrt', 'fuhren'], part: 'gefahren', aux: 'sein', auxCases: [{ aux: 'haben', label: 'هدایت کردن خودرو یا وسیله', example: 'Wer von euch hat das Auto gefahren?', translation: 'کدام‌یک از شما ماشین را رانده است؟', lesson: 'A2 · درس تکمیلی ۶', source: 'https://www.duden.de/rechtschreibung/fahren' }], note: 'برای رفتن به مقصد: sein. اگر fahren به معنی هدایت کردن یک وسیله و مفعول مستقیم داشته باشد، haben می‌آید.' },
    { verb: 'bleiben', meaning: 'ماندن', level: 'A1', past: ['blieb', 'bliebst', 'blieb', 'blieben', 'bliebt', 'blieben'], part: 'geblieben', aux: 'sein' },
    { verb: 'aufstehen', meaning: 'از خواب یا جا بلند شدن', level: 'A2', past: ['stand auf', 'standest auf', 'stand auf', 'standen auf', 'standet auf', 'standen auf'], part: 'aufgestanden', aux: 'sein', note: 'برای برخاستن از تخت یا صندلی، sein می‌آید: Ich bin früh aufgestanden. Duden برای معنی‌های جداگانه‌ای مانند روی چیزی قرار داشتن یا باز بودن، haben را هم ثبت می‌کند؛ این دو کاربرد را با هم جابه‌جا نکن.' },
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
{"verb":"treffen","meaning":"ملاقات کردن / برخورد کردن","level":"A1","past":["traf","trafst","traf","trafen","traft","trafen"],"part":"getroffen","aux":"haben","auxCases":[{"aux":"sein","label":"برخوردن اتفاقی به کسی یا چیزی با auf + Akkusativ","example":"Am Bahnhof ist sie auf einen alten Bekannten getroffen.","translation":"او در ایستگاه به‌طور اتفاقی با یک آشنای قدیمی روبه‌رو شد.","lesson":"A2 · درس تکمیلی ۶","source":"https://www.duden.de/rechtschreibung/treffen"}],"note":"برای ملاقات کردن یک شخص، haben را به‌کار ببر؛ ساخت auf jemanden/etwas treffen به معنی روبه‌رو شدن، کاربرد جداگانه‌ای است و با sein می‌آید."},
{"verb":"schlafen","meaning":"خوابیدن","level":"A1","past":["schlief","schliefst","schlief","schliefen","schlieft","schliefen"],"part":"geschlafen","aux":"haben"},
{"verb":"denken","meaning":"فکر کردن","level":"A1","past":["dachte","dachtest","dachte","dachten","dachtet","dachten"],"part":"gedacht","aux":"haben","note":"فعل مختلط است: ریشه تغییر می‌کند، اما در Präteritum شناسه‌های -te می‌آیند."},
{"verb":"wissen","meaning":"دانستن","level":"A1","past":["wusste","wusstest","wusste","wussten","wusstet","wussten"],"part":"gewusst","aux":"haben"},
{"verb":"laufen","meaning":"دویدن / راه رفتن","level":"A1","past":["lief","liefst","lief","liefen","lieft","liefen"],"part":"gelaufen","aux":"sein","auxCases":[{"aux":"haben","label":"پیمودن یک مسافت مشخص در کاربرد ورزشی","example":"Die Läuferin hat 800 Meter gelaufen.","translation":"دونده ۸۰۰ متر دوید.","lesson":"A2 · درس تکمیلی ۶","source":"https://www.duden.de/rechtschreibung/laufen"}],"note":"برای حرکت به مقصد، sein می‌آید؛ Duden در برخی کاربردهای ورزشیِ مسافت‌محور، مانند ۸۰۰ متر دویدن، haben را ثبت می‌کند."},
{"verb":"bringen","meaning":"آوردن","level":"A1","past":["brachte","brachtest","brachte","brachten","brachtet","brachten"],"part":"gebracht","aux":"haben","note":"فعل مختلط است: brachte و gebracht را باید همراه فعل حفظ کرد."},
{"verb":"verstehen","meaning":"فهمیدن","level":"A1","past":["verstand","verstandest","verstand","verstanden","verstandet","verstanden"],"part":"verstanden","aux":"haben","note":"پیشوند ver- جدانشدنی است؛ Partizip II بدون ge ساخته می‌شود."},
{"verb":"fernsehen","meaning":"تلویزیون تماشا کردن","level":"A1","past":["sah fern","sahst fern","sah fern","sahen fern","saht fern","sahen fern"],"part":"ferngesehen","aux":"haben","note":"فعل جداشدنی است: در Präteritum پیشوند به پایان می‌رود و در Partizip II شکل ferngesehen می‌آید."},
{"verb":"aufräumen","meaning":"مرتب کردن","level":"A2","past":["räumte auf","räumtest auf","räumte auf","räumten auf","räumtet auf","räumten auf"],"part":"aufgeräumt","aux":"haben","note":"فعل جداشدنی و باقاعده است: auf + ge + räumt."},
{"verb":"bekommen","meaning":"دریافت کردن / گرفتن","level":"A2","past":["bekam","bekamst","bekam","bekamen","bekamt","bekamen"],"part":"bekommen","aux":"haben","auxCases":[{"aux":"sein","label":"برای کسی مفید یا نامفید بودن","example":"Die Kur ist ihm gut bekommen.","translation":"آن دورهٔ درمان برای او مفید بود.","lesson":"A2 · درس تکمیلی ۶","source":"https://www.duden.de/rechtschreibung/bekommen"}],"note":"پیشوند be- جدانشدنی است؛ بنابراین Partizip II بدون ge ساخته می‌شود. در معنی رایجِ دریافت کردن، haben می‌آید؛ معنی «برای کسی مفید/نامفید بودن» با sein ساخته می‌شود."},
{"verb":"anfangen","meaning":"شروع کردن","level":"A1","past":["fing an","fingst an","fing an","fingen an","fingt an","fingen an"],"part":"angefangen","aux":"haben","note":"فعل جداشدنی و قوی است: anfangen → fing an → angefangen."},
{"verb":"anrufen","meaning":"تلفن زدن","level":"A1","past":["rief an","riefst an","rief an","riefen an","rieft an","riefen an"],"part":"angerufen","aux":"haben","note":"فعل جداشدنی و قوی است: an + ge + rufen → angerufen."},
{"verb":"dürfen","meaning":"اجازه داشتن","level":"A1","past":["durfte","durftest","durfte","durften","durftet","durften"],"part":"gedurft","aux":"haben","note":"فعل مُدال؛ اگر با مصدر دیگری بیاید، در Perfekt معمولاً مصدر dürfen در پایان می‌آید."},
{"verb":"wollen","meaning":"خواستن","level":"A1","past":["wollte","wolltest","wollte","wollten","wolltet","wollten"],"part":"gewollt","aux":"haben","note":"فعل مُدال؛ با مصدر دیگر: Ich habe gehen wollen. به‌تنهایی: Ich habe das nicht gewollt."},
{"verb":"sollen","meaning":"باید / قرار بودن","level":"A1","past":["sollte","solltest","sollte","sollten","solltet","sollten"],"part":"gesollt","aux":"haben","note":"فعل مُدال؛ با مصدر دیگر در Perfekt معمولاً خود مصدر sollen در پایان می‌آید."},
{"verb":"mögen","meaning":"دوست داشتن","level":"A1","past":["mochte","mochtest","mochte","mochten","mochtet","mochten"],"part":"gemocht","aux":"haben","note":"در Präteritum، mögen به mochte تبدیل می‌شود؛ möchte شکل Konjunktiv II برای بیان خواستهٔ مؤدبانه است."},
    { verb: 'vergessen', meaning: 'فراموش کردن', level: 'A2', past: ['vergaß', 'vergaßest', 'vergaß', 'vergaßen', 'vergaßt', 'vergaßen'], part: 'vergessen', aux: 'haben', note: 'پیشوند ver- جدانشدنی است؛ ge نمی‌آید. Duden دو صورت vergaßest و vergaßt را برای du ثبت می‌کند.' },
    { verb: 'einladen', meaning: 'دعوت کردن', level: 'A2', past: ['lud ein', 'ludest ein', 'lud ein', 'luden ein', 'ludet ein', 'luden ein'], part: 'eingeladen', aux: 'haben', note: 'فعل جداشدنی و قوی است: lud ... ein؛ در Partizip II، ge میان ein و laden می‌آید.' },
    { verb: 'mitbringen', meaning: 'همراه آوردن', level: 'A2', past: ['brachte mit', 'brachtest mit', 'brachte mit', 'brachten mit', 'brachtet mit', 'brachten mit'], part: 'mitgebracht', aux: 'haben', note: 'فعل جداشدنی و مختلط است: brachte ... mit → mitgebracht.' },
    { verb: 'zurückkommen', meaning: 'برگشتن', level: 'A2', past: ['kam zurück', 'kamst zurück', 'kam zurück', 'kamen zurück', 'kamt zurück', 'kamen zurück'], part: 'zurückgekommen', aux: 'sein', note: 'فعل جداشدنی و قوی؛ برای برگشتن، Perfekt با sein ساخته می‌شود.' }
  ];


  VERBS.push(
    { verb: 'wohnen', meaning: 'زندگی کردن / ساکن بودن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['wohnte', 'wohntest', 'wohnte', 'wohnten', 'wohntet', 'wohnten'], part: 'gewohnt', aux: 'haben' },
    { verb: 'spielen', meaning: 'بازی کردن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['spielte', 'spieltest', 'spielte', 'spielten', 'spieltet', 'spielten'], part: 'gespielt', aux: 'haben' },
    { verb: 'kaufen', meaning: 'خریدن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['kaufte', 'kauftest', 'kaufte', 'kauften', 'kauftet', 'kauften'], part: 'gekauft', aux: 'haben' },
    { verb: 'fragen', meaning: 'پرسیدن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['fragte', 'fragtest', 'fragte', 'fragten', 'fragtet', 'fragten'], part: 'gefragt', aux: 'haben' },
    { verb: 'sagen', meaning: 'گفتن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['sagte', 'sagtest', 'sagte', 'sagten', 'sagtet', 'sagten'], part: 'gesagt', aux: 'haben' },
    { verb: 'hören', meaning: 'شنیدن / گوش دادن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['hörte', 'hörtest', 'hörte', 'hörten', 'hörtet', 'hörten'], part: 'gehört', aux: 'haben' },
    { verb: 'kochen', meaning: 'آشپزی کردن / پختن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['kochte', 'kochtest', 'kochte', 'kochten', 'kochtet', 'kochten'], part: 'gekocht', aux: 'haben' },
    { verb: 'suchen', meaning: 'جست‌وجو کردن / دنبال چیزی گشتن', level: 'A1', lesson: 'A1 · درس تکمیلی ۴ · فعل‌های روزمره', past: ['suchte', 'suchtest', 'suchte', 'suchten', 'suchtet', 'suchten'], part: 'gesucht', aux: 'haben' }
  );

  VERBS.push({ verb: 'öffnen', meaning: 'باز کردن', level: 'A2', lesson: 'A2 · درس تکمیلی ۴ · پسوند -et', past: ['öffnete', 'öffnetest', 'öffnete', 'öffneten', 'öffnetet', 'öffneten'], part: 'geöffnet', aux: 'haben', note: 'فعل ضعیف است؛ شکل Partizip II آن geöffnet است.' });

  VERBS.forEach(function (item) {
    if (!item.lesson) {
      item.lesson = item.level + (item.level === 'A1'
        ? ' · درس تکمیلی ۳ · فعل‌های پایه'
        : ' · درس تکمیلی ۳ · فعل‌های تکمیلی');
    }
  });

  var VERB_META = {"sehen":{"type":"قوی","source":"https://www.duden.de/konjugation/sehen","sourceName":"Duden"},"lesen":{"type":"قوی","source":"https://www.duden.de/konjugation/lesen_aufsammeln","sourceName":"Duden"},"schreiben":{"type":"قوی","source":"https://www.duden.de/konjugation/schreiben","sourceName":"Duden"},"finden":{"type":"قوی","source":"https://www.duden.de/konjugation/finden","sourceName":"Duden"},"nehmen":{"type":"قوی","source":"https://www.duden.de/konjugation/nehmen","sourceName":"Duden"},"geben":{"type":"قوی","source":"https://www.duden.de/konjugation/geben","sourceName":"Duden"},"helfen":{"type":"قوی","source":"https://www.duden.de/konjugation/helfen","sourceName":"Duden"},"treffen":{"type":"قوی","source":"https://www.duden.de/konjugation/treffen","sourceName":"Duden"},"schlafen":{"type":"قوی","source":"https://www.duden.de/konjugation/schlafen","sourceName":"Duden"},"denken":{"type":"مختلط","source":"https://www.duden.de/konjugation/denken","sourceName":"Duden"},"wissen":{"type":"بی‌قاعده","source":"https://www.duden.de/konjugation/wissen","sourceName":"Duden"},"laufen":{"type":"قوی · حرکت با sein","source":"https://www.duden.de/konjugation/laufen","sourceName":"Duden"},"bringen":{"type":"مختلط","source":"https://www.duden.de/konjugation/bringen","sourceName":"Duden"},"verstehen":{"type":"قوی · پیشوند جدانشدنی ver-","source":"https://www.duden.de/konjugation/verstehen","sourceName":"Duden"},"fernsehen":{"type":"قوی · جداشدنی","source":"https://www.duden.de/konjugation/fernsehen","sourceName":"Duden"},"aufräumen":{"type":"ضعیف · جداشدنی","source":"https://www.duden.de/konjugation/aufraeumen","sourceName":"Duden"},"öffnen":{"type":"ضعیف","source":"https://www.duden.de/konjugation/oeffnen","sourceName":"Duden"},"bekommen":{"type":"قوی · پیشوند جدانشدنی be-","source":"https://www.duden.de/konjugation/bekommen","sourceName":"Duden"},"anfangen":{"type":"قوی · جداشدنی","source":"https://www.larousse.com/de/konjugation/deutsch/anfangen/487","sourceName":"Larousse"},"anrufen":{"type":"قوی · جداشدنی","source":"https://www.die-konjugation.de/verb/anrufen.php","sourceName":"Die Konjugation"},"dürfen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/duerfen","sourceName":"Duden"},"wollen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/wollen_moechten_wuenschen","sourceName":"Duden"},"sollen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/sollen","sourceName":"Duden"},"mögen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/moegen","sourceName":"Duden"},"sein":{"type":"بی‌قاعده · فعل کمکی","source":"https://www.duden.de/konjugation/sein_Hilfsverb","sourceName":"Duden"},"haben":{"type":"بی‌قاعده · فعل کمکی","source":"https://www.duden.de/konjugation/haben_Hilfsverb","sourceName":"Duden"},"gehen":{"type":"قوی","source":"https://www.duden.de/konjugation/gehen","sourceName":"Duden"},"kommen":{"type":"قوی","source":"https://www.duden.de/konjugation/kommen","sourceName":"Duden"},"machen":{"type":"ضعیف","source":"https://www.duden.de/konjugation/machen","sourceName":"Duden"},"lernen":{"type":"ضعیف","source":"https://www.duden.de/konjugation/lernen","sourceName":"Duden"},"arbeiten":{"type":"ضعیف · ریشه پایان‌یافته به t","source":"https://www.duden.de/konjugation/arbeiten","sourceName":"Duden"},"essen":{"type":"قوی","source":"https://www.duden.de/konjugation/essen","sourceName":"Duden"},"trinken":{"type":"قوی","source":"https://www.duden.de/konjugation/trinken","sourceName":"Duden"},"sprechen":{"type":"قوی","source":"https://www.duden.de/konjugation/sprechen","sourceName":"Duden"},"fahren":{"type":"قوی · فعل حرکتی","source":"https://www.duden.de/konjugation/fahren","sourceName":"Duden"},"bleiben":{"type":"قوی · فعل ماندن","source":"https://www.duden.de/konjugation/bleiben","sourceName":"Duden"},"aufstehen":{"type":"قوی · جداشدنی","source":"https://www.duden.de/konjugation/aufstehen","sourceName":"Duden"},"einkaufen":{"type":"ضعیف · جداشدنی","source":"https://www.duden.de/konjugation/einkaufen","sourceName":"Duden"},"besuchen":{"type":"ضعیف · جدانشدنی","source":"https://www.duden.de/konjugation/besuchen","sourceName":"Duden"},"studieren":{"type":"ضعیف · پایان -ieren","source":"https://www.duden.de/konjugation/studieren","sourceName":"Duden"},"können":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/koennen","sourceName":"Duden"},"müssen":{"type":"مدال · بی‌قاعده","source":"https://www.duden.de/konjugation/muessen","sourceName":"Duden"},
    "vergessen":{"type":"قوی · پیشوند جدانشدنی ver-","source":"https://www.duden.de/konjugation/vergessen_Verb_nicht_erinnern","sourceName":"Duden"},
    "einladen":{"type":"قوی · جداشدنی","source":"https://www.duden.de/konjugation/einladen_verladen","sourceName":"Duden"},
    "mitbringen":{"type":"مختلط · جداشدنی","source":"https://www.duden.de/konjugation/mitbringen","sourceName":"Duden"},
    "zurückkommen":{"type":"قوی · جداشدنی و حرکتی","source":"https://www.duden.de/konjugation/zurueckkommen","sourceName":"Duden"}};


  Object.assign(VERB_META, {
    'wohnen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/wohnen', sourceName: 'Duden' },
    'spielen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/spielen', sourceName: 'Duden' },
    'kaufen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/kaufen', sourceName: 'Duden' },
    'fragen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/fragen', sourceName: 'Duden' },
    'sagen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/sagen', sourceName: 'Duden' },
    'hören': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/hoeren', sourceName: 'Duden' },
    'kochen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/kochen', sourceName: 'Duden' },
    'suchen': { type: 'ضعیف', source: 'https://www.duden.de/konjugation/suchen', sourceName: 'Duden' }
  });

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
{"q":"وقتی wollen با مصدر دیگری در Perfekt بیاید، کدام جمله درست است؟","options":["Ich habe gehen gewollt.","Ich habe gehen wollen.","Ich bin gehen wollen."],"answer":1,"why":"با مصدر دیگر، فعل مُدال معمولاً به شکل Ersatzinfinitiv می‌آید: gehen wollen."},
{"q":"A2 · در معنی ملاقات کردن یک شخص، جای خالی را کامل کن: Ich ___ meinen Freund getroffen.","options":["habe","bin","hat"],"answer":0,"why":"برای jemanden treffen به معنی ملاقات کردن یک شخص، Duden فعل کمکی haben را ثبت می‌کند."},
{"q":"A2 · جمله را کامل کن: Die Kur ___ ihm gut bekommen.","options":["hat","ist","haben"],"answer":1,"why":"در این معنیِ bekommen یعنی برای کسی خوب/بد بودن، Duden فعل کمکی sein را ثبت می‌کند: Die Kur ist ihm gut bekommen."},
    { q: 'کدام پرسش بله/خیر در Perfekt درست است؟', options: ['Hast du gestern gelernt?', 'Du hast gestern gelernt.', 'Hast du gestern lernen?'], answer: 0, why: 'در پرسش بله/خیر، فعل کمکی صرف‌شده در جایگاه اول می‌آید.' },
    { q: 'کدام پرسش با واژهٔ پرسشی درست است؟', options: ['Wann du hast gelernt?', 'Wann hast du gelernt?', 'Wann gelernt hast du?'], answer: 1, why: 'الگو: واژهٔ پرسشی + فعل کمکی + فاعل + ادامه جمله + Partizip II.' },
    { q: 'کدام جمله منفی‌سازی درست دارد؟', options: ['Ich habe den Film nicht gesehen.', 'Ich nicht habe den Film gesehen.', 'Ich habe den Film nicht sehen.'], answer: 0, why: 'در این جمله ساده، nicht پیش از Partizip II آمده است؛ جای آن به بخش مورد نفی هم بستگی دارد.' },
    { q: 'Partizip II فعل vergessen کدام است؟', options: ['gevergessen', 'vergessen', 'vergesst'], answer: 1, why: 'پیشوند جدانشدنی ver- باعث می‌شود ge اضافه نشود.' },
    { q: 'Präteritum فعل vergessen برای du کدام است؟', options: ['vergaßst', 'vergaßest', 'vergessest'], answer: 1, why: 'Duden صورت‌های vergaßest و vergaßt را ثبت می‌کند؛ اینجا صورت vergaßest انتخاب شده است.' },
    { q: 'Partizip II فعل einladen کدام است؟', options: ['geeinladen', 'eingeladen', 'einladet'], answer: 1, why: 'در فعل جداشدنی، ge میان پیشوند ein و بخش laden قرار می‌گیرد.' },
    { q: 'Präteritum فعل einladen برای du کدام است؟', options: ['ludest ein', 'einladest', 'geludt'], answer: 0, why: 'Duden صورت ludest ein و صورت کوتاه ludst ein را ثبت می‌کند.' },
    { q: 'Partizip II فعل mitbringen کدام است؟', options: ['mitgebracht', 'gemitbracht', 'mitgebringen'], answer: 0, why: 'فعل مختلط و جداشدنی است: brachte mit → mitgebracht.' },
    { q: 'Perfekt فعل zurückkommen در معنی برگشتن با کدام فعل کمکی ساخته می‌شود؟', options: ['haben', 'sein', 'werden'], answer: 1, why: 'Duden برای zurückkommen در معنی برگشتن، bin zurückgekommen را ثبت می‌کند.' },
    { q: 'کدام جمله با zurückkommen درست است؟', options: ['Ich habe zurückgekommen.', 'Ich bin zurückgekommen.', 'Ich werde zurückgekommen.'], answer: 1, why: 'در این معنیِ حرکت/بازگشت، فعل کمکی sein می‌آید.' },
    { q: 'کدام جمله پرسشِ «چه زمانی برگشتی؟» است؟', options: ['Wann bist du zurückgekommen?', 'Wann du bist zurückgekommen?', 'Bist wann du zurückgekommen?'], answer: 0, why: 'در پرسش W، واژهٔ پرسشی اول و فعل کمکی صرف‌شده دوم می‌آید.' },
    { q: 'جملهٔ «من دیروز دوستم را دعوت کردم» کدام است؟', options: ['Ich habe gestern meinen Freund eingeladen.', 'Ich bin gestern meinen Freund eingeladen.', 'Ich habe gestern meinen Freund geeinladet.'], answer: 0, why: 'einladen در این کاربرد با haben می‌آید و Partizip II آن eingeladen است.' },
    { q: 'A2 · برای رفتن به مقصد با fahren کدام درست است؟ Ich ___ nach Berlin gefahren.', options: ['bin', 'habe', 'hat'], answer: 0, why: 'برای سفر/حرکت به مقصد، Duden Perfekt را با sein ثبت می‌کند.' },
    { q: 'A2 · برای هدایت خودرو کدام درست است؟ Ich ___ das Auto selbst gefahren.', options: ['bin', 'habe', 'ist'], answer: 1, why: 'وقتی fahren به معنی هدایت کردن خودرو و با مفعول مستقیم است، Duden haben را ثبت می‌کند.' },
    { q: 'A2 · برای حرکت پیاده به خانه کدام درست است؟ Wir ___ nach Hause gelaufen.', options: ['haben', 'sind', 'seid'], answer: 1, why: 'در معنی حرکت به مقصد، laufen با sein می‌آید.' },
    { q: 'A2 · در مسابقه و با مسافت مشخص کدام درست است؟ Die Läuferin ___ 800 Meter gelaufen.', options: ['ist', 'hat', 'sind'], answer: 1, why: 'Duden برای پیمودن مسافت مشخص در کاربرد ورزشی، haben را ثبت می‌کند.' },
    { q: 'A2 · برای «از خواب بلند شدن» کدام جمله درست است؟', options: ['Ich habe früh aufgestanden.', 'Ich bin früh aufgestanden.', 'Ich werde früh aufgestanden.'], answer: 1, why: 'در معنی برخاستن از تخت یا صندلی، aufstehen با sein ساخته می‌شود.' },
    { q: 'A2 · bekommen به معنی «دریافت کردن» با کدام فعل کمکی می‌آید؟', options: ['sein', 'haben', 'werden'], answer: 1, why: 'برای معنی دریافت کردن، Duden haben را ثبت می‌کند؛ کاربرد جداگانهٔ «برای کسی مفید بودن» با sein می‌آید.' },
    { q: 'A1 · درس تکمیلی ۴ · Präteritum فعل wohnen برای du کدام است؟', options: ['wohnte', 'wohntest', 'wohnten'], answer: 1, why: 'Duden صرف ضعیف wohnen را برای du به شکل wohntest ثبت می‌کند.' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل spielen کدام است؟', options: ['gespielt', 'gespielen', 'gespieltet'], answer: 0, why: 'Partizip II فعل ضعیف spielen برابر gespielt است.' },
    { q: 'A1 · درس تکمیلی ۴ · جمله را کامل کن: Er ___ gestern ein Buch gekauft.', options: ['hat', 'ist', 'haben'], answer: 0, why: 'kaufen در این کاربرد با haben می‌آید: Er hat ein Buch gekauft.' },
    { q: 'A1 · درس تکمیلی ۴ · Präteritum فعل fragen برای wir کدام است؟', options: ['fragt', 'fragten', 'fragte'], answer: 1, why: 'صرف wir در Präteritum برابر fragten است.' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل sagen کدام است؟', options: ['gesagt', 'gesagen', 'gesagte'], answer: 0, why: 'Partizip II فعل sagen برابر gesagt است.' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل hören کدام است؟', options: ['gehört', 'gehören', 'gehoren'], answer: 0, why: 'شکل درست Partizip II برابر gehört است؛ ö را فراموش نکن.' },
    { q: 'A1 · درس تکمیلی ۴ · جمله را کامل کن: Wir ___ zusammen gekocht.', options: ['haben', 'sind', 'hat'], answer: 0, why: 'kochen در این کاربرد با haben ساخته می‌شود: Wir haben gekocht.' },
    { q: 'A1 · درس تکمیلی ۴ · Präteritum فعل suchen برای ihr کدام است؟', options: ['suchtet', 'suchten', 'sucht'], answer: 0, why: 'پایان فعل ضعیف برای ihr برابر -tet است: ihr suchtet.' },

    { q: 'A1 · Präteritum فعل sehen برای wir کدام است؟', options: ['sahen', 'sahst', 'gesehen'], answer: 0, why: 'صرف Duden: ich sah، du sahst، wir sahen.', level: 'A1', lesson: 'درس تکمیلی ۳ · Präteritum' },
    { q: 'A1 · Präteritum فعل schreiben برای du کدام است؟', options: ['schrieb', 'schriebst', 'geschrieben'], answer: 1, why: 'صرف Duden برای du برابر schriebst است.', level: 'A1', lesson: 'درس تکمیلی ۳ · Präteritum' },
    { q: 'A1 · Präteritum فعل sprechen برای ihr کدام است؟', options: ['spracht', 'sprachst', 'gesprochen'], answer: 0, why: 'صرف Duden: ihr spracht؛ Partizip II برابر gesprochen است.', level: 'A1', lesson: 'درس تکمیلی ۳ · Präteritum' },
    { q: 'A1 · Präteritum فعل sein برای wir کدام است؟', options: ['waren', 'warst', 'gewesen'], answer: 0, why: 'شکل wir در Präteritum برابر waren است.', level: 'A1', lesson: 'درس تکمیلی ۳ · فعل کمکی sein' },
    { q: 'A1 · Präteritum فعل haben برای ihr کدام است؟', options: ['hattet', 'hatten', 'gehabt'], answer: 0, why: 'شکل ihr در Präteritum برابر hattet است.', level: 'A1', lesson: 'درس تکمیلی ۳ · فعل کمکی haben' },
    { q: 'A2 · Partizip II فعل aufstehen کدام است؟', options: ['geaufstanden', 'aufgestanden', 'aufgestanden sein'], answer: 1, why: 'در فعل جداشدنی، ge میان پیشوند auf و ریشه آمده است: aufgestanden.', level: 'A2', lesson: 'درس تکمیلی ۴ · فعل جداشدنی' },
    { q: 'A2 · Partizip II فعل besuchen کدام است؟', options: ['gebesucht', 'besucht', 'besuchen'], answer: 1, why: 'پیشوند be- جدانشدنی است؛ بنابراین ge اضافه نمی‌شود.', level: 'A2', lesson: 'درس تکمیلی ۴ · پیشوند جدانشدنی' },
    { q: 'A2 · Partizip II فعل zurückkommen کدام است؟', options: ['zurückgekommen', 'zurückgekommenen', 'ge zurückkommen'], answer: 0, why: 'فعل جداشدنی است: zurück + ge + kommen → zurückgekommen.', level: 'A2', lesson: 'درس تکمیلی ۴ · فعل جداشدنی' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل lernen کدام است؟', options: ['gelernt', 'gelernen', 'gelerntet'], answer: 0, why: 'فعل ضعیف: ge- + lern + -t → gelernt.', level: 'A1', lesson: 'درس تکمیلی ۴ · فعل ضعیف' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل arbeiten کدام است؟', options: ['gearbeitet', 'gear beitet', 'gearbeiten'], answer: 0, why: 'برای تلفظ روان، در این فعل پایان -et می‌آید: gearbeitet.', level: 'A1', lesson: 'درس تکمیلی ۴ · پایان -et' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل öffnen کدام است؟', options: ['geöffnet', 'geöffnen', 'geöffent'], answer: 0, why: 'Duden شکل Partizip II را geöffnet ثبت می‌کند.', level: 'A2', lesson: 'درس تکمیلی ۴ · پایان -et' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل trinken کدام است؟', options: ['getrunken', 'getrinkt', 'getrinken'], answer: 0, why: 'فعل قوی است؛ واکهٔ ریشه تغییر می‌کند و پایان -en می‌گیرد.', level: 'A1', lesson: 'درس تکمیلی ۴ · فعل قوی' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل einkaufen کدام است؟', options: ['eingekauft', 'geinkauft', 'einkaufen'], answer: 0, why: 'در فعل جداشدنی، ge میان پیشوند ein و ریشه kauf می‌آید.', level: 'A2', lesson: 'درس تکمیلی ۴ · فعل جداشدنی' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل aufstehen کدام است؟', options: ['aufgestanden', 'geaufstanden', 'aufgestanden sein'], answer: 0, why: 'auf جداشدنی است؛ ge میان auf و ریشه stand قرار می‌گیرد.', level: 'A2', lesson: 'درس تکمیلی ۴ · فعل جداشدنی و قوی' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل besuchen کدام است؟', options: ['besucht', 'gebesucht', 'besuchen'], answer: 0, why: 'پیشوند be- جدانشدنی است؛ بنابراین ge اضافه نمی‌شود.', level: 'A2', lesson: 'درس تکمیلی ۴ · پیشوند جدانشدنی' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل verstehen کدام است؟', options: ['verstanden', 'geverstanden', 'vergestanden'], answer: 0, why: 'پیشوند ver- جدانشدنی است؛ شکل درست verstanden است.', level: 'A2', lesson: 'درس تکمیلی ۴ · پیشوند جدانشدنی' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل studieren کدام است؟', options: ['studiert', 'gestudiert', 'studieren'], answer: 0, why: 'فعل‌های پایان‌یافته به -ieren، ge- نمی‌گیرند: studiert.', level: 'A2', lesson: 'درس تکمیلی ۴ · فعل‌های -ieren' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل bringen کدام است؟', options: ['gebracht', 'gebringt', 'gebringen'], answer: 0, why: 'bringen فعل مختلط است: brachte – gebracht.', level: 'A2', lesson: 'درس تکمیلی ۴ · فعل مختلط' },
    { q: 'A2 · درس تکمیلی ۴ · Partizip II فعل mitbringen کدام است؟', options: ['mitgebracht', 'gemitbracht', 'mitgebringen'], answer: 0, why: 'mit جداشدنی است، اما ریشهٔ مختلط bringen شکل gebracht دارد؛ نتیجه mitgebracht است.', level: 'A2', lesson: 'درس تکمیلی ۴ · جداشدنی و مختلط' },
    { q: 'A1 · درس تکمیلی ۴ · Partizip II فعل sehen کدام است؟', options: ['gesehen', 'gesieht', 'geseht'], answer: 0, why: 'شکل ثبت‌شده در Duden برابر gesehen است.', level: 'A1', lesson: 'درس تکمیلی ۴ · فعل قوی' },
    { q: 'A2 · درس تکمیلی ۵ · برای «ترجمه کردن»، Partizip II فعل جدانشدنی übersetzen کدام است؟', options: ['übersetzt', 'übergesetzt', 'geübersetzt'], answer: 0, why: 'در معنی ترجمه کردن، پیشوند بی‌تکیه و جدانشدنی است؛ Partizip II برابر übersetzt است.', level: 'A2', lesson: 'درس تکمیلی ۵ · پیشوند وابسته به معنی' },
    { q: 'A2 · درس تکمیلی ۵ · برای «از یک ساحل به ساحل دیگر بردن»، Partizip II فعل جداشدنی über|setzen کدام است؟', options: ['übergesetzt', 'übersetzt', 'geübergesetzt'], answer: 0, why: 'در این معنی، über جداشدنی است و ge میان پیشوند و ریشه می‌آید: übergesetzt.', level: 'A2', lesson: 'درس تکمیلی ۵ · پیشوند وابسته به معنی' }
  ];

  var SENTENCE_RULES = [
    { id: 'zptSentence', accepted: ['Ich habe gestern einen Film gesehen.', 'Gestern habe ich einen Film gesehen.'], expected: 'Ich habe gestern einen Film gesehen.', level: 'A1–A2', lesson: 'درس تکمیلی ۵ · جمله‌سازی ترکیبی' },
    { id: 'zptSentence2', accepted: ['Wir haben am Abend ferngesehen.', 'Am Abend haben wir ferngesehen.'], expected: 'Wir haben am Abend ferngesehen.', level: 'A1–A2', lesson: 'درس تکمیلی ۵ · جمله‌سازی ترکیبی' },
    { id: 'zptSentence3', accepted: ['Hast du gestern gearbeitet?'], expected: 'Hast du gestern gearbeitet?', level: 'A1', lesson: 'درس تکمیلی ۲ · پرسش در Perfekt' },
    { id: 'zptSentence4', accepted: ['Wann bist du zurückgekommen?'], expected: 'Wann bist du zurückgekommen?', level: 'A2', lesson: 'درس تکمیلی ۵ · پرسش و فعل جداشدنی' },
    { id: 'zptSentence5', accepted: ['Ich habe den Film nicht gesehen.'], expected: 'Ich habe den Film nicht gesehen.', level: 'A1–A2', lesson: 'درس تکمیلی ۵ · منفی‌سازی' },
    { id: 'zptSentence6', accepted: ['Ich bin gestern nach Berlin gefahren.', 'Gestern bin ich nach Berlin gefahren.'], expected: 'Ich bin gestern nach Berlin gefahren.', level: 'A1–A2', lesson: 'درس تکمیلی ۵ · انتخاب فعل کمکی' },
    { id: 'zptSentence7', accepted: ['Ich habe das Auto selbst gefahren.', 'Das Auto habe ich selbst gefahren.'], expected: 'Ich habe das Auto selbst gefahren.', level: 'A2', lesson: 'درس تکمیلی ۶ · کاربرد وابسته به معنی' },
    { id: 'zptSentence8', accepted: ['Wir sind nach Hause gelaufen.', 'Nach Hause sind wir gelaufen.'], expected: 'Wir sind nach Hause gelaufen.', level: 'A1–A2', lesson: 'درس تکمیلی ۵ · انتخاب فعل کمکی' },
    { id: 'zptSentence9', accepted: ['Ich habe gestern Brot gekauft.', 'Gestern habe ich Brot gekauft.'], expected: 'Ich habe gestern Brot gekauft.', level: 'A1', lesson: 'درس تکمیلی ۴ · فعل باقاعده' },
    { id: 'zptSentence10', accepted: ['Wir haben Fußball gespielt.'], expected: 'Wir haben Fußball gespielt.', level: 'A1', lesson: 'درس تکمیلی ۴ · فعل باقاعده' },
    { id: 'zptSentence11', accepted: ['Wo hast du gewohnt?'], expected: 'Wo hast du gewohnt?', level: 'A1', lesson: 'درس تکمیلی ۴ · پرسش در Perfekt' },
    { id: 'zptSentence12', accepted: ['Wir haben zusammen gekocht.'], expected: 'Wir haben zusammen gekocht.', level: 'A1', lesson: 'درس تکمیلی ۴ · فعل باقاعده' },
    { id: 'zptSentence13', accepted: ['Ich habe gestern meine Mutter besucht.', 'Gestern habe ich meine Mutter besucht.'], expected: 'Ich habe gestern meine Mutter besucht.', level: 'A2', lesson: 'درس تکمیلی ۵ · پیشوند جدانشدنی' },
    { id: 'zptSentence14', accepted: ['Wir haben das Zimmer aufgeräumt.'], expected: 'Wir haben das Zimmer aufgeräumt.', level: 'A2', lesson: 'درس تکمیلی ۵ · فعل جداشدنی' },
    { id: 'zptSentence15', accepted: ['Ich habe an dich gedacht.'], expected: 'Ich habe an dich gedacht.', level: 'A1–A2', lesson: 'درس تکمیلی ۵ · فعل مختلط' },
    { id: 'zptSentence16', accepted: ['Ihr seid spät zurückgekommen.'], expected: 'Ihr seid spät zurückgekommen.', level: 'A2', lesson: 'درس تکمیلی ۵ · فعل جداشدنی و sein' },
    { id: 'zptSentence17', accepted: ['Ich habe das Fenster geöffnet.'], expected: 'Ich habe das Fenster geöffnet.', level: 'A2', lesson: 'درس تکمیلی ۴ · پایان -et' },
    { id: 'zptSentence18', accepted: ['Wir haben heute gearbeitet.'], expected: 'Wir haben heute gearbeitet.', level: 'A1', lesson: 'درس تکمیلی ۴ · پایان -et' },
    { id: 'zptSentence19', accepted: ['Ich habe den Text übersetzt.'], expected: 'Ich habe den Text übersetzt.', level: 'A2', lesson: 'درس تکمیلی ۵ · پیشوند جدانشدنی' },
    { id: 'zptSentence20', accepted: ['Der Fährmann hat uns ans andere Ufer übergesetzt.'], expected: 'Der Fährmann hat uns ans andere Ufer übergesetzt.', level: 'A2', lesson: 'درس تکمیلی ۵ · پیشوند جداشدنی' }
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
      '.zpt-live-feedback{display:block;min-height:1.4em;margin-top:5px;font-size:12px;color:var(--muted)}' +
      '@media(max-width:420px){.zpt-tab{flex:1 1 42%;padding:8px 6px;font-size:12px}.zpt-panel .past-table{min-width:300px}}';
    document.head.appendChild(style);
  }

  function renderVerb(verbName) {
    var verb = VERBS.filter(function (item) { return item.verb === verbName; })[0] || VERBS[2];
    var meta = VERB_META[verb.verb] || { type: 'پرکاربرد · بررسی‌شده در مرحله قبل', source: 'https://www.duden.de/konjugation', sourceName: 'Duden' };
    var lesson = verb.lesson || (verb.level + ' · درس تکمیلی ۳');
    var rows = PRONOUNS.map(function (pronoun, index) {
      var perfect = AUXILIARIES[verb.aux][index] + ' ' + verb.part;
      return [pronoun, verb.past[index], verb.part, perfect];
    });
    var note = verb.note ? '<p class="muted tiny"><span class="lesson-tag">' + escapeHtml(lesson) + '</span> ' + escapeHtml(verb.note) + '</p>' : '';
    var auxCaseHtml = (verb.auxCases || []).map(function (item) {
      return '<div class="zpt-callout zpt-aux-case"><b>کاربرد دیگر · فعل کمکی ' + escapeHtml(item.aux) + '</b><p>' + escapeHtml(item.label) + '</p>' +
        (item.example ? '<p dir="ltr">' + escapeHtml(item.example) + '</p>' : '') +
        (item.translation ? '<small>' + escapeHtml(item.translation) + '</small>' : '') +
        '<p><span class="lesson-tag">' + escapeHtml(item.lesson || 'A2 · درس تکمیلی ۶') + '</span></p>' +
        (item.source ? '<p class="muted tiny"><a href="' + escapeHtml(item.source) + '" target="_blank" rel="noopener noreferrer">منبع Duden برای این کاربرد</a></p>' : '') +
      '</div>';
    }).join('');
    var sourceLink = '<p class="muted tiny"><a href="' + escapeHtml(meta.source) + '" target="_blank" rel="noopener noreferrer">بررسی جدول صرف در ' + escapeHtml(meta.sourceName) + '</a></p>';
    var host = document.getElementById('zptVerbDetail');
    if (!host) return;
    host.innerHTML =
      '<div class="row between"><b dir="ltr" style="font-size:19px">' + escapeHtml(verb.verb) + '</b><span class="chip">واژه ' + escapeHtml(verb.level) + ' · ' + escapeHtml(lesson) + ' · ' + escapeHtml(verb.meaning) + '</span></div>' +
      '<p class="muted tiny">نوع فعل: <b>' + escapeHtml(meta.type) + '</b> · سطح و درس صرف گذشته: <b>' + escapeHtml(verb.level) + ' · ' + escapeHtml(lesson) + '</b></p>' +
      '<p class="muted tiny">Partizip II: <b dir="ltr">' + escapeHtml(verb.part) + '</b> · فعل کمکی در کاربرد اصلی: <b dir="ltr">' + escapeHtml(verb.aux) + '</b></p>' +
      makeTable(['ضمیر فاعلی', 'Präteritum', 'Partizip II', 'Perfekt'], rows) + note + auxCaseHtml + sourceLink;
  }

  function getQuestionMetadata(item) {
    var text = String(item.q || '');
    var parts = text.split(' · ');
    var levelPrefix = parts[0] === 'A1' || parts[0] === 'A2' ? parts[0] : null;
    var lessonPrefix = parts[1] && parts[1].indexOf('درس تکمیلی ') === 0 ? parts[1] : null;
    var level = item.level || levelPrefix || 'A1–A2';
    var lesson = item.lesson || (lessonPrefix ? lessonPrefix + ' · تمرین تشخیص' : 'درس تکمیلی ۵ · مرور ترکیبی');
    return { level: level, lesson: lesson };
  }

  function renderQuestions() {
    var host = document.getElementById('zptQuestions');
    if (!host) return;
    host.innerHTML = QUESTIONS.map(function (item, index) {
      var meta = getQuestionMetadata(item);
      return '<div class="zpt-question"><label for="zptAnswer' + index + '">' + (index + 1) + '. ' + escapeHtml(item.q) + '</label>' +
        '<small class="lesson-tag">' + escapeHtml(meta.level + ' · ' + meta.lesson) + '</small>' +
        '<select id="zptAnswer' + index + '"><option value="">انتخاب پاسخ…</option>' +
        item.options.map(function (option, optionIndex) {
          return '<option value="' + optionIndex + '">' + escapeHtml(option) + '</option>';
        }).join('') + '</select><small id="zptExplain' + index + '" class="zpt-live-feedback" aria-live="polite"></small></div>';
    }).join('');
  }

  function normalizeSentence(value) {
    return String(value || '').toLocaleLowerCase('de-DE').normalize('NFC')
      .replace(/[.!?،,]/g, '').replace(/\s+/g, ' ').trim();
  }

  function evaluateChoice(value, answer) {
    if (value === '' || value === null || typeof value === 'undefined') return null;
    return Number(value) === answer;
  }

  function evaluateSentence(value, accepted) {
    var normalized = normalizeSentence(value);
    return !!normalized && accepted.some(function (item) {
      return normalizeSentence(item) === normalized;
    });
  }

  function updateQuestionFeedback(index, finalCheck) {
    var item = QUESTIONS[index];
    var select = document.getElementById('zptAnswer' + index);
    var explain = document.getElementById('zptExplain' + index);
    if (!item || !select) return null;
    var correct = evaluateChoice(select.value, item.answer);
    if (correct === null) {
      select.style.borderColor = finalCheck ? 'var(--danger)' : '';
      if (explain) explain.textContent = finalCheck ? 'پاسخی انتخاب نشده است.' : '';
      return false;
    }
    select.style.borderColor = correct ? 'var(--accent)' : 'var(--danger)';
    if (explain) explain.textContent = (correct ? '✓ درست · ' : '✗ پاسخ درست: ' + item.options[item.answer] + ' · ') + item.why;
    return correct;
  }

  function updateSentenceFeedback(rule, finalCheck) {
    var field = document.getElementById(rule.id);
    var feedback = document.getElementById(rule.id + 'Feedback');
    if (!field) return null;
    var value = normalizeSentence(field.value);
    if (!value) {
      field.style.borderColor = finalCheck ? 'var(--danger)' : '';
      if (feedback) feedback.textContent = finalCheck ? 'جمله را بنویس.' : '';
      return false;
    }
    var correct = evaluateSentence(field.value, rule.accepted);
    if (correct) {
      field.style.borderColor = 'var(--accent)';
      if (feedback) feedback.textContent = '✓ درست است.';
      return true;
    }
    var currentWords = value.split(' ').length;
    var expectedWords = normalizeSentence(rule.expected).split(' ').length;
    if (!finalCheck && currentWords < expectedWords) {
      field.style.borderColor = '';
      if (feedback) feedback.textContent = 'ادامه بده؛ جمله هنوز کامل نیست.';
      return null;
    }
    field.style.borderColor = 'var(--danger)';
    if (feedback) feedback.textContent = finalCheck
      ? '✗ نمونه درست: ' + rule.expected
      : '✗ هنوز درست نیست؛ ترتیب واژه‌ها و فعل کمکی را بررسی کن.';
    return false;
  }

  function checkPractice() {
    var score = 0;
    QUESTIONS.forEach(function (_, index) {
      if (updateQuestionFeedback(index, true) === true) score += 1;
    });
    var sentenceResults = [];
    SENTENCE_RULES.forEach(function (rule) {
      var correct = updateSentenceFeedback(rule, true) === true;
      if (correct) score += 1;
      sentenceResults.push(correct);
    });
    var total = QUESTIONS.length + SENTENCE_RULES.length;
    var feedback = document.getElementById('zptPracticeFeedback');
    if (feedback) feedback.textContent = 'نتیجه: ' + score + ' از ' + total + '. ' +
      sentenceResults.map(function (correct, index) {
        return 'جمله‌سازی ' + (index + 1) + ': ' + (correct ? 'درست' : 'نمونه: ' + SENTENCE_RULES[index].expected);
      }).join('؛ ') + '. ' +
      (score === total ? 'عالی! همه پاسخ‌ها درست است.' : 'پاسخ‌های نادرست را مرور کن و دوباره تلاش کن.');
  }

  function resetPractice() {
    QUESTIONS.forEach(function (_, index) {
      var select = document.getElementById('zptAnswer' + index);
      var explain = document.getElementById('zptExplain' + index);
      if (select) { select.value = ''; select.style.borderColor = ''; }
      if (explain) explain.textContent = '';
    });
    SENTENCE_RULES.forEach(function (rule) {
      var sentence = document.getElementById(rule.id);
      var feedback = document.getElementById(rule.id + 'Feedback');
      if (sentence) { sentence.value = ''; sentence.style.borderColor = ''; }
      if (feedback) feedback.textContent = '';
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
      '<button type="button" class="zpt-tab" data-zpt-tab="auxiliary" aria-selected="false">انتخاب haben / sein</button>',
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
      '<div class="zpt-callout"><b>سؤال پرسیدن و منفی کردن Perfekt</b> <span class="lesson-tag">A1 · درس تکمیلی ۲</span><p><b>پرسش بله/خیر:</b> فعل کمکی به جایگاه اول می‌رود.</p><p dir="ltr">Hast du gestern gelernt? = آیا دیروز درس خواندی؟</p><p><b>پرسش با کلمهٔ پرسشی:</b> کلمهٔ پرسشی اول و فعل کمکی دوم می‌آید.</p><p dir="ltr">Wann hast du gelernt? = چه زمانی درس خواندی؟</p><p><b>منفی:</b> در این نمونهٔ ساده، nicht پیش از Partizip II آمده است.</p><p dir="ltr">Ich habe den Film nicht gesehen. = من فیلم را ندیدم.</p><small>جای nicht با توجه به چیزی که نفی می‌شود می‌تواند تغییر کند.</small></div>',
      '<p class="muted tiny">در Perfekt، با عوض شدن ضمیر، فعل کمکی صرف می‌شود؛ Partizip II همان شکل می‌ماند.</p>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="auxiliary" hidden>',
      '<span class="lesson-tag">A1 · درس تکمیلی ۲ · قاعدهٔ پایه | A2 · درس تکمیلی ۶ · کاربردهای وابسته به معنی</span>',
      '<p>برای شروع، بیشتر فعل‌ها در Perfekt با <b dir="ltr">haben</b> می‌آیند. <b dir="ltr">sein</b> معمولاً با بعضی فعل‌های بی‌مفعولِ حرکت به مقصد یا تغییر حالت می‌آید. اما فقط از روی «حرکت» تصمیم نگیر؛ معنی و ساخت جمله مهم است.</p>',
      makeTable(['فعل و کاربرد', 'کمکی', 'نمونه آلمانی', 'معنی فارسی', 'سطح / درس'], [
        ['fahren · حرکت به مقصد', 'sein', 'Ich bin nach Berlin gefahren.', 'من به برلین رفتم.', 'A1 · تکمیلی ۲'],
        ['fahren · هدایت خودرو', 'haben', 'Wer von euch hat das Auto gefahren?', 'کدام‌یک از شما ماشین را رانده است؟', 'A2 · تکمیلی ۶'],
        ['treffen · ملاقات کردن', 'haben', 'Ich habe meinen Freund getroffen.', 'من دوستم را ملاقات کردم.', 'A1 · تکمیلی ۲'],
        ['auf jemanden treffen · روبه‌رو شدن اتفاقی', 'sein', 'Am Bahnhof ist sie auf einen alten Bekannten getroffen.', 'او در ایستگاه به‌طور اتفاقی با یک آشنای قدیمی روبه‌رو شد.', 'A2 · تکمیلی ۶'],
        ['bekommen · دریافت کردن', 'haben', 'Ich habe ein Geschenk bekommen.', 'من هدیه‌ای دریافت کردم.', 'A2 · تکمیلی ۶'],
        ['bekommen · برای کسی مفید بودن', 'sein', 'Die Kur ist ihm gut bekommen.', 'آن دورهٔ درمان برای او مفید بود.', 'A2 · تکمیلی ۶'],
        ['laufen · حرکت به مقصد', 'sein', 'Wir sind nach Hause gelaufen.', 'ما پیاده به خانه رفتیم.', 'A1 · تکمیلی ۲'],
        ['laufen · پیمودن مسافت ورزشی', 'haben', 'Die Läuferin hat 800 Meter gelaufen.', 'دونده ۸۰۰ متر دوید.', 'A2 · تکمیلی ۶'],
        ['aufstehen · از خواب یا صندلی برخاستن', 'sein', 'Ich bin früh aufgestanden.', 'من زود از خواب بلند شدم.', 'A2 · تکمیلی ۲']
      ]),
      '<div class="zpt-callout"><b>یادت بماند</b><p>این دو فعل کمکی را آزادانه جای هم نگذار. یک فعل ممکن است در دو معنی یا ساخت متفاوت، دو فعل کمکی داشته باشد.</p><p>برای معنی روزمرهٔ «از خواب بلند شدن»، <b dir="ltr">aufstehen</b> با <b dir="ltr">sein</b> می‌آید. Duden برای معنی‌های جداگانه‌ای مثل «روی چیزی قرار داشتن/باز بودن» کاربرد <b dir="ltr">haben</b> را هم ثبت می‌کند؛ این نکته برای سطح پایه لازم نیست حفظ شود.</p></div>',
      '<div class="zpt-sources"><a href="https://www.duden.de/sprachwissen/sprachratgeber/Perfektbildung-mit-haben-oder-sein" target="_blank" rel="noopener noreferrer">Duden · قاعدهٔ انتخاب haben یا sein</a><a href="https://www.goethe.de/ins/de/de/prf/grm.html" target="_blank" rel="noopener noreferrer">Goethe-Institut · دستور زبان</a></div>',
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
        ['پایان -d/-t یا خوشهٔ همخوانی دشوار', 'اغلب ge- + ریشه + -et', 'arbeiten → gearbeitet · öffnen → geöffnet · atmen → geatmet', 'A1–A2 · درس ۴'],
        ['قوی', 'اغلب ge- + ریشه + -en', 'gehen → gegangen · trinken → getrunken', 'A1–A2 · درس ۴'],
        ['مختلط', 'تغییر ریشه + -t', 'bringen → gebracht · denken → gedacht', 'A2 · درس ۴'],
        ['جداشدنی', 'پیشوند + ge + ریشه', 'einkaufen → eingekauft · aufstehen → aufgestanden', 'A2 · درس ۴'],
        ['جدانشدنی', 'بدون ge-', 'besuchen → besucht · verstehen → verstanden', 'A2 · درس ۴'],
        ['پایان -ieren', 'بدون ge- و با -t', 'studieren → studiert', 'A1–A2 · درس ۴']
      ]),
      makeTable(['فعل', 'Präteritum · ich', 'Partizip II', 'فعل کمکی', 'سطح / درس'], [
        ['wohnen · زندگی کردن', 'wohnte', 'gewohnt', 'haben', 'A1 · درس تکمیلی ۴'],
        ['spielen · بازی کردن', 'spielte', 'gespielt', 'haben', 'A1 · درس تکمیلی ۴'],
        ['kaufen · خریدن', 'kaufte', 'gekauft', 'haben', 'A1 · درس تکمیلی ۴'],
        ['fragen · پرسیدن', 'fragte', 'gefragt', 'haben', 'A1 · درس تکمیلی ۴'],
        ['sagen · گفتن', 'sagte', 'gesagt', 'haben', 'A1 · درس تکمیلی ۴'],
        ['hören · گوش دادن', 'hörte', 'gehört', 'haben', 'A1 · درس تکمیلی ۴'],
        ['kochen · آشپزی کردن', 'kochte', 'gekocht', 'haben', 'A1 · درس تکمیلی ۴'],
        ['suchen · جست‌وجو کردن', 'suchte', 'gesucht', 'haben', 'A1 · درس تکمیلی ۴']
      ]),
      '<div class="zpt-callout"><b>تمرین الگوی فعل‌های ضعیف</b> <span class="lesson-tag">A1 · درس تکمیلی ۴</span><p>در این هشت فعل، Präteritum با -te و Partizip II با ge- ... -t ساخته شده است. شکل‌های شش ضمیر را در فهرست فعل‌ها جداگانه ببین.</p><p dir="ltr">ich wohnte · du wohntest · wir wohnten</p><p dir="ltr">ich habe gewohnt · du hast gewohnt · wir haben gewohnt</p></div>',
      '<div class="zpt-callout"><b>سه نکته مهم</b><p>۱) فعل‌های جداشدنی: ge میان پیشوند و ریشه می‌آید؛ مانند einkaufen → eingekauft.</p><p>۲) پیشوندهای رایجِ جدانشدنی مانند be-, emp-, ent-, er-, ge-, miss-, ver- و zer- معمولاً ge نمی‌گیرند؛ مانند besuchen → besucht.</p><p>۳) فعل‌های پایان‌یافته به -ieren نیز ge نمی‌گیرند؛ مانند studieren → studiert.</p><p>۴) بعضی پیشوندها مثل über-, um-, unter- و durch- بسته به تکیه و معنی می‌توانند جداشدنی یا جدانشدنی باشند؛ فقط از روی نوشتار تصمیم نگیر.</p></div>',
      '<div class="zpt-callout"><b>یک نوشتار، دو ساخت و دو معنی</b> <span class="lesson-tag">A2 · درس تکمیلی ۵ · نکتهٔ تکمیلی</span><p><b dir="ltr">übersetzen</b> به معنی ترجمه کردن: پیشوند جدانشدنی است و Partizip II می‌شود <b dir="ltr">übersetzt</b>.</p><p><b dir="ltr">über|setzen</b> به معنی عبور دادن از یک ساحل به ساحل دیگر: پیشوند جداشدنی است و Partizip II می‌شود <b dir="ltr">übergesetzt</b>.</p><small>تکیه و معنی، جداشدنی بودن را مشخص می‌کند؛ این دو را با هم اشتباه نکن.</small></div>',
      '<div class="zpt-callout"><b>جداشدنی و جدانشدنی را مقایسه کن</b> <span class="lesson-tag">A2 · درس تکمیلی ۴</span><p>در فعل جداشدنی، ge میان پیشوند و ریشه می‌آید:</p><p dir="ltr">anrufen → angerufen · fernsehen → ferngesehen · aufräumen → aufgeräumt</p><p>پیشوندهای جدانشدنی مانند be- و ver-، ge نمی‌گیرند:</p><p dir="ltr">bekommen → bekommen · verstehen → verstanden · besuchen → besucht</p><small>در فعل‌های پایان‌یافته به -ieren نیز ge نمی‌آید: studieren → studiert.</small></div>',
      '<p dir="ltr">Ich habe gestern eingekauft. = من دیروز خرید کردم.</p>',
      '<p dir="ltr">Ich habe meine Mutter besucht. = من به دیدن مادرم رفتم.</p>',
      '<p dir="ltr">Ich habe Softwaretechnik studiert. = من مهندسی نرم‌افزار خوانده‌ام.</p>',
      '<div class="zpt-sources"><a href="https://grammis.ids-mannheim.de/kontrastive-grammatik/3769" target="_blank" rel="noopener noreferrer">IDS grammis · ساخت Partizip II</a><a href="https://www.duden.de/konjugation/oeffnen" target="_blank" rel="noopener noreferrer">Duden · öffnen</a><a href="https://www.duden.de/konjugation/uebersetzen_uebersetzt" target="_blank" rel="noopener noreferrer">Duden · übersetzen (ترجمه کردن)</a><a href="https://www.duden.de/konjugation/uebersetzen_uebergesetzt" target="_blank" rel="noopener noreferrer">Duden · über|setzen (عبور دادن)</a></div>',
      '</div>',
      '<div class="zpt-pane" data-zpt-pane="practice" hidden>',
      '<span class="lesson-tag">A1–A2 · درس تکمیلی ۵ · تشخیص و جمله‌سازی</span>',
      '<p class="muted tiny">' + QUESTIONS.length + ' سؤال و ' + SENTENCE_RULES.length + ' تمرین جمله‌سازی را پاسخ بده.</p>',
      '<div id="zptQuestions"></div>',
      '<div class="zpt-question"><label for="zptSentence">جمله‌سازی ۱: کلمه‌ها را به جمله درست تبدیل کن.</label><p dir="ltr">Ich / gestern / einen Film / gesehen / habe</p><input id="zptSentence" dir="ltr" autocomplete="off" placeholder="Ich habe gestern ..."></div>',
      '<div class="zpt-question"><label for="zptSentence2">جمله‌سازی ۲: فعل جداشدنی را در Perfekt به‌کار ببر.</label><p dir="ltr">Wir / am Abend / ferngesehen / haben</p><input id="zptSentence2" dir="ltr" autocomplete="off" placeholder="Wir haben am Abend ..."></div>',
      '<div class="zpt-question"><label for="zptSentence3">جمله‌سازی ۳: یک پرسش بله/خیر بساز.</label><p dir="ltr">Hast / du / gestern / gearbeitet ?</p><input id="zptSentence3" dir="ltr" autocomplete="off" placeholder="Hast du ...?"></div>',
      '<div class="zpt-question"><label for="zptSentence4">جمله‌سازی ۴: یک پرسش با کلمهٔ پرسشی بساز.</label><p dir="ltr">Wann / bist / du / zurückgekommen ?</p><input id="zptSentence4" dir="ltr" autocomplete="off" placeholder="Wann bist du ...?"></div>',
      '<div class="zpt-question"><label for="zptSentence5">جمله‌سازی ۵: جمله را منفی کن.</label><p dir="ltr">Ich / habe / den Film / nicht / gesehen</p><input id="zptSentence5" dir="ltr" autocomplete="off" placeholder="Ich habe ... nicht ..."></div>',
      '<div class="zpt-question"><label for="zptSentence6">جمله‌سازی ۶: فعل کمکی درست برای حرکت به مقصد را انتخاب و جمله بساز.</label><p dir="ltr">Ich / gestern / nach Berlin / gefahren / bin</p><input id="zptSentence6" dir="ltr" autocomplete="off" placeholder="Ich bin gestern ..."></div>',
      '<div class="zpt-question"><label for="zptSentence7">جمله‌سازی ۷: معنی «خودم ماشین را راندم» را بساز.</label><p dir="ltr">Ich / das Auto / selbst / gefahren / habe</p><input id="zptSentence7" dir="ltr" autocomplete="off" placeholder="Ich habe das Auto ..."></div>',
      '<div class="zpt-question"><label for="zptSentence8">جمله‌سازی ۸: حرکت پیاده به مقصد را در Perfekt بنویس.</label><p dir="ltr">Wir / nach Hause / gelaufen / sind</p><input id="zptSentence8" dir="ltr" autocomplete="off" placeholder="Wir sind nach Hause ..."></div>',
      '<div class="zpt-question"><label for="zptSentence9">جمله‌سازی ۹ · A1: خرید کردن را در Perfekt بنویس.</label><p dir="ltr">Ich / gestern / Brot / gekauft / habe</p><small>معنی: من دیروز نان خریدم.</small><input id="zptSentence9" dir="ltr" autocomplete="off" placeholder="Ich habe gestern ..."></div>',
      '<div class="zpt-question"><label for="zptSentence10">جمله‌سازی ۱۰ · A1: بازی کردن را در Perfekt بنویس.</label><p dir="ltr">Wir / Fußball / gespielt / haben</p><small>معنی: ما فوتبال بازی کردیم.</small><input id="zptSentence10" dir="ltr" autocomplete="off" placeholder="Wir haben ..."></div>',
      '<div class="zpt-question"><label for="zptSentence11">جمله‌سازی ۱۱ · A1: با wohnen یک پرسش بساز.</label><p dir="ltr">Wo / hast / du / gewohnt ?</p><small>معنی: کجا زندگی کردی؟</small><input id="zptSentence11" dir="ltr" autocomplete="off" placeholder="Wo hast du ...?"></div>',
      '<div class="zpt-question"><label for="zptSentence12">جمله‌سازی ۱۲ · A1: آشپزی کردن را در Perfekt بنویس.</label><p dir="ltr">Wir / zusammen / gekocht / haben</p><small>معنی: ما با هم آشپزی کردیم.</small><input id="zptSentence12" dir="ltr" autocomplete="off" placeholder="Wir haben ..."></div>',

      '<div class="zpt-question"><label for="zptSentence13">جمله‌سازی ۱۳ · A2: با فعل جدانشدنی besuchen جمله بساز.</label><p dir="ltr">Ich / habe / gestern / meine Mutter / besucht</p><small>معنی: دیروز به دیدن مادرم رفتم.</small><input id="zptSentence13" dir="ltr" autocomplete="off" placeholder="Ich habe gestern ..."></div>',
      '<div class="zpt-question"><label for="zptSentence14">جمله‌سازی ۱۴ · A2: فعل جداشدنی aufräumen را در Perfekt بنویس.</label><p dir="ltr">Wir / haben / das Zimmer / aufgeräumt</p><small>معنی: ما اتاق را مرتب کردیم.</small><input id="zptSentence14" dir="ltr" autocomplete="off" placeholder="Wir haben ..."></div>',
      '<div class="zpt-question"><label for="zptSentence15">جمله‌سازی ۱۵ · A1–A2: فعل مختلط denken را در Perfekt به‌کار ببر.</label><p dir="ltr">Ich / habe / an dich / gedacht</p><small>معنی: من به تو فکر کردم.</small><input id="zptSentence15" dir="ltr" autocomplete="off" placeholder="Ich habe ..."></div>',
      '<div class="zpt-question"><label for="zptSentence16">جمله‌سازی ۱۶ · A2: فعل جداشدنی zurückkommen را در Perfekt بنویس.</label><p dir="ltr">Ihr / seid / spät / zurückgekommen</p><small>معنی: شما دیر برگشتید.</small><input id="zptSentence16" dir="ltr" autocomplete="off" placeholder="Ihr seid ..."></div>',
      '<div class="zpt-question"><label for="zptSentence17">جمله‌سازی ۱۷ · A2: پنجره را باز کردم.</label><p dir="ltr">Ich / habe / das Fenster / geöffnet</p><small>معنی: من پنجره را باز کردم.</small><input id="zptSentence17" dir="ltr" autocomplete="off" placeholder="Ich habe ... geöffnet."></div>',
      '<div class="zpt-question"><label for="zptSentence18">جمله‌سازی ۱۸ · A1: بگو امروز کار کردیم.</label><p dir="ltr">Wir / haben / heute / gearbeitet</p><small>معنی: ما امروز کار کردیم.</small><input id="zptSentence18" dir="ltr" autocomplete="off" placeholder="Wir haben ... gearbeitet."></div>',
      '<div class="zpt-question"><label for="zptSentence19">جمله‌سازی ۱۹ · A2: بگو متن را ترجمه کردم.</label><p dir="ltr">Ich / habe / den Text / übersetzt</p><small>معنی: من متن را ترجمه کردم.</small><input id="zptSentence19" dir="ltr" autocomplete="off" placeholder="Ich habe ... übersetzt."></div>',
      '<div class="zpt-question"><label for="zptSentence20">جمله‌سازی ۲۰ · A2: با معنی عبور دادن از رودخانه جمله بساز.</label><p dir="ltr">Der Fährmann / hat / uns / ans andere Ufer / übergesetzt</p><small>معنی: قایقران ما را به ساحل دیگر رساند.</small><input id="zptSentence20" dir="ltr" autocomplete="off" placeholder="Der Fährmann hat ... übergesetzt."></div>',
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

    QUESTIONS.forEach(function (_, index) {
      var select = document.getElementById('zptAnswer' + index);
      if (select) select.addEventListener('change', function () { updateQuestionFeedback(index, false); });
    });
    SENTENCE_RULES.forEach(function (rule) {
      var field = document.getElementById(rule.id);
      if (!field || !field.parentNode) return;
      var meta = document.createElement('small');
      meta.className = 'lesson-tag';
      meta.textContent = rule.level + ' · ' + rule.lesson;
      field.parentNode.insertBefore(meta, field);
      var live = document.createElement('small');
      live.id = rule.id + 'Feedback';
      live.className = 'zpt-live-feedback';
      live.setAttribute('aria-live', 'polite');
      field.parentNode.insertBefore(live, field.nextSibling);
      field.setAttribute('aria-describedby', live.id);
      field.addEventListener('input', function () { updateSentenceFeedback(rule, false); });
      field.addEventListener('change', function () { updateSentenceFeedback(rule, false); });
      field.addEventListener('blur', function () { updateSentenceFeedback(rule, true); });
    });

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

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRONOUNS: PRONOUNS, AUXILIARIES: AUXILIARIES, VERBS: VERBS, QUESTIONS: QUESTIONS, SENTENCE_RULES: SENTENCE_RULES, evaluateChoice: evaluateChoice, evaluateSentence: evaluateSentence, getQuestionMetadata: getQuestionMetadata };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }
})();