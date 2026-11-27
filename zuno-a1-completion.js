/* Zuno A1 completion pack — verb bank, grammar drills, dialogues and final assessment.
   All learning content in this file is original and designed to complement the existing app. */
(function () {
  'use strict';
  if (window.__zunoA1CompletionLoaded) return;
  window.__zunoA1CompletionLoaded = true;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pronouns = ['ich','du','er / sie / es','wir','ihr','sie / Sie'];

  // Forms are listed in pronoun order. Irregular vowel changes are shown explicitly.
  const verbs = [
    ['sein','بودن','بی‌قاعده',['bin','bist','ist','sind','seid','sind'],'Ich bin müde.','من خسته‌ام.'],
    ['haben','داشتن','بی‌قاعده',['habe','hast','hat','haben','habt','haben'],'Wir haben Zeit.','ما وقت داریم.'],
    ['werden','شدن','بی‌قاعده',['werde','wirst','wird','werden','werdet','werden'],'Es wird kalt.','هوا سرد می‌شود.'],
    ['fahren','رفتن با وسیله / رانندگی کردن','تغییر مصوت',['fahre','fährst','fährt','fahren','fahrt','fahren'],'Du fährst mit dem Bus.','تو با اتوبوس می‌روی.'],
    ['lesen','خواندن','تغییر مصوت',['lese','liest','liest','lesen','lest','lesen'],'Sie liest ein Buch.','او یک کتاب می‌خواند.'],
    ['sehen','دیدن','تغییر مصوت',['sehe','siehst','sieht','sehen','seht','sehen'],'Ich sehe den Mann.','من آن مرد را می‌بینم.'],
    ['sprechen','صحبت کردن','تغییر مصوت',['spreche','sprichst','spricht','sprechen','sprecht','sprechen'],'Er spricht Deutsch.','او آلمانی صحبت می‌کند.'],
    ['essen','غذا خوردن','تغییر مصوت',['esse','isst','isst','essen','esst','essen'],'Du isst einen Apfel.','تو یک سیب می‌خوری.'],
    ['nehmen','گرفتن / برداشتن','تغییر مصوت',['nehme','nimmst','nimmt','nehmen','nehmt','nehmen'],'Er nimmt den Zug.','او قطار را می‌گیرد.'],
    ['geben','دادن','تغییر مصوت',['gebe','gibst','gibt','geben','gebt','geben'],'Sie gibt mir das Buch.','او کتاب را به من می‌دهد.'],
    ['schlafen','خوابیدن','تغییر مصوت',['schlafe','schläfst','schläft','schlafen','schlaft','schlafen'],'Das Kind schläft.','کودک خوابیده است.'],
    ['laufen','دویدن / راه رفتن','تغییر مصوت',['laufe','läufst','läuft','laufen','lauft','laufen'],'Er läuft schnell.','او سریع می‌دود.'],
    ['helfen','کمک کردن','تغییر مصوت',['helfe','hilfst','hilft','helfen','helft','helfen'],'Ich helfe meiner Mutter.','من به مادرم کمک می‌کنم.'],
    ['treffen','ملاقات کردن','تغییر مصوت',['treffe','triffst','trifft','treffen','trefft','treffen'],'Wir treffen Freunde.','ما دوستان را ملاقات می‌کنیم.'],
    ['wissen','دانستن','بی‌قاعده',['weiß','weißt','weiß','wissen','wisst','wissen'],'Ich weiß das nicht.','من این را نمی‌دانم.'],
    ['können','توانستن','مدال',['kann','kannst','kann','können','könnt','können'],'Ich kann schwimmen.','من می‌توانم شنا کنم.'],
    ['müssen','باید / مجبور بودن','مدال',['muss','musst','muss','müssen','müsst','müssen'],'Du musst lernen.','تو باید درس بخوانی.'],
    ['wollen','خواستن','مدال',['will','willst','will','wollen','wollt','wollen'],'Wir wollen nach Hause.','ما می‌خواهیم به خانه برویم.'],
    ['dürfen','اجازه داشتن','مدال',['darf','darfst','darf','dürfen','dürft','dürfen'],'Darf ich hereinkommen?','اجازه دارم وارد شوم؟'],
    ['mögen','دوست داشتن','مدال',['mag','magst','mag','mögen','mögt','mögen'],'Ich mag Kaffee.','من قهوه دوست دارم.'],
    ['machen','انجام دادن','باقاعده',['mache','machst','macht','machen','macht','machen'],'Was machst du heute?','امروز چه کار می‌کنی؟'],
    ['lernen','یاد گرفتن','باقاعده',['lerne','lernst','lernt','lernen','lernt','lernen'],'Wir lernen Deutsch.','ما آلمانی یاد می‌گیریم.'],
    ['wohnen','سکونت داشتن','باقاعده',['wohne','wohnst','wohnt','wohnen','wohnt','wohnen'],'Ich wohne in Berlin.','من در برلین زندگی می‌کنم.'],
    ['arbeiten','کار کردن','باقاعده -et',['arbeite','arbeitest','arbeitet','arbeiten','arbeitet','arbeiten'],'Sie arbeitet im Büro.','او در اداره کار می‌کند.'],
    ['spielen','بازی کردن','باقاعده',['spiele','spielst','spielt','spielen','spielt','spielen'],'Die Kinder spielen Fußball.','بچه‌ها فوتبال بازی می‌کنند.'],
    ['kaufen','خریدن','باقاعده',['kaufe','kaufst','kauft','kaufen','kauft','kaufen'],'Ich kaufe Brot.','من نان می‌خرم.'],
    ['brauchen','نیاز داشتن','باقاعده',['brauche','brauchst','braucht','brauchen','braucht','brauchen'],'Wir brauchen Wasser.','ما به آب نیاز داریم.'],
    ['fragen','پرسیدن','باقاعده',['frage','fragst','fragt','fragen','fragt','fragen'],'Er fragt den Lehrer.','او از معلم سؤال می‌کند.'],
    ['antworten','پاسخ دادن','باقاعده -et',['antworte','antwortest','antwortet','antworten','antwortet','antworten'],'Ich antworte auf die Frage.','من به سؤال پاسخ می‌دهم.'],
    ['hören','شنیدن','باقاعده',['höre','hörst','hört','hören','hört','hören'],'Hörst du Musik?','آیا موسیقی گوش می‌دهی؟'],
    ['sagen','گفتن','باقاعده',['sage','sagst','sagt','sagen','sagt','sagen'],'Was sagst du?','چه می‌گویی؟'],
    ['kochen','آشپزی کردن','باقاعده',['koche','kochst','kocht','kochen','kocht','kochen'],'Mein Vater kocht heute.','پدرم امروز آشپزی می‌کند.'],
    ['reisen','سفر کردن','باقاعده',['reise','reist','reist','reisen','reist','reisen'],'Wir reisen nach Wien.','ما به وین سفر می‌کنیم.'],
    ['leben','زندگی کردن','باقاعده',['lebe','lebst','lebt','leben','lebt','leben'],'Meine Familie lebt im Iran.','خانواده من در ایران زندگی می‌کند.'],
    ['öffnen','باز کردن','باقاعده',['öffne','öffnest','öffnet','öffnen','öffnet','öffnen'],'Bitte öffnen Sie das Fenster.','لطفاً پنجره را باز کنید.'],
    ['warten','منتظر ماندن','باقاعده -et',['warte','wartest','wartet','warten','wartet','warten'],'Ich warte auf den Bus.','من منتظر اتوبوس هستم.'],
    ['aufstehen','بلند شدن','جداشدنی',['stehe auf','stehst auf','steht auf','stehen auf','steht auf','stehen auf'],'Ich stehe um sieben Uhr auf.','من ساعت هفت بیدار می‌شوم.'],
    ['einkaufen','خرید کردن','جداشدنی',['kaufe ein','kaufst ein','kauft ein','kaufen ein','kauft ein','kaufen ein'],'Wir kaufen am Samstag ein.','ما شنبه خرید می‌کنیم.'],
    ['anrufen','تلفن زدن','جداشدنی + تغییر مصوت',['rufe an','rufst an','ruft an','rufen an','ruft an','rufen an'],'Ich rufe dich an.','من به تو تلفن می‌زنم.'],
    ['fernsehen','تلویزیون تماشا کردن','جداشدنی + تغییر مصوت',['sehe fern','siehst fern','sieht fern','sehen fern','seht fern','sehen fern'],'Sie sieht am Abend fern.','او عصر تلویزیون تماشا می‌کند.'],
    ['aufräumen','مرتب کردن','جداشدنی',['räume auf','räumst auf','räumt auf','räumen auf','räumt auf','räumen auf'],'Ich räume mein Zimmer auf.','من اتاقم را مرتب می‌کنم.'],
    ['mitkommen','همراه آمدن','جداشدنی + تغییر مصوت',['komme mit','kommst mit','kommt mit','kommen mit','kommt mit','kommen mit'],'Kommst du mit?','با ما می‌آیی؟'],
    ['aufmachen','باز کردن','جداشدنی',['mache auf','machst auf','macht auf','machen auf','macht auf','machen auf'],'Du machst die Tür auf.','تو در را باز می‌کنی.'],
    ['einschlafen','به خواب رفتن','جداشدنی + تغییر مصوت',['schlafe ein','schläfst ein','schläft ein','schlafen ein','schlaft ein','schlafen ein'],'Das Kind schläft schnell ein.','بچه سریع به خواب می‌رود.'],
    ['zumachen','بستن','جداشدنی',['mache zu','machst zu','macht zu','machen zu','macht zu','machen zu'],'Ich mache das Fenster zu.','من پنجره را می‌بندم.'],
    ['anfangen','شروع کردن','جداشدنی + تغییر مصوت',['fange an','fängst an','fängt an','fangen an','fangt an','fangen an'],'Der Film fängt um acht Uhr an.','فیلم ساعت هشت شروع می‌شود.'],
    ['ausmachen','خاموش کردن','جداشدنی',['mache aus','machst aus','macht aus','machen aus','macht aus','machen aus'],'Sie macht den Computer aus.','او کامپیوتر را خاموش می‌کند.'],
    ['abholen','دنبال کسی رفتن؛ تحویل گرفتن','جداشدنی',['hole ab','holst ab','holt ab','holen ab','holt ab','holen ab'],'Wir holen die Kinder ab.','ما دنبال بچه‌ها می‌رویم.']
  ];

  const grammar = [
    ['جایگاه فعل در جمله اصلی','فعل صرف‌شده معمولاً در جایگاه دوم می‌آید؛ حتی اگر جمله با زمان یا مکان شروع شود.','Ich lerne heute Deutsch. / Heute lerne ich Deutsch.','امروز آلمانی یاد می‌گیرم.'],
    ['سؤال بله/خیر','در سؤال بدون کلمه پرسشی، فعل صرف‌شده در جایگاه اول می‌آید.','Kommst du heute? – Ja, ich komme.','امروز می‌آیی؟ – بله، می‌آیم.'],
    ['مفعول Akkusativ','در مذکر، der به den و ein به einen تبدیل می‌شود؛ مؤنث و خنثی در آرتیکل نامعین تغییر نمی‌کنند.','Ich sehe den Mann. / Ich kaufe eine Tasche.','مرد را می‌بینم. / یک کیف می‌خرم.'],
    ['فعل‌های مُدال','فعل مُدال صرف می‌شود و مصدر فعل اصلی در پایان جمله می‌آید.','Ich kann gut schwimmen. / Wir müssen heute lernen.','من خوب شنا می‌کنم. / باید امروز درس بخوانیم.'],
    ['فعل‌های جداشدنی','پیشوند در جمله اصلی به انتهای جمله می‌رود؛ فعل در جایگاه دوم صرف می‌شود.','Ich stehe um sieben Uhr auf.','من ساعت هفت بیدار می‌شوم.'],
    ['نفی با nicht و kein','kein اسم دارای آرتیکل نامعین یا بدون آرتیکل را نفی می‌کند؛ nicht بخش‌های دیگر جمله را نفی می‌کند.','Ich habe kein Auto. / Ich komme heute nicht.','ماشین ندارم. / امروز نمی‌آیم.'],
    ['حروف اضافه مکان: in و aus','برای مبدأ از aus استفاده می‌کنیم؛ برای محل زندگی یا قرار داشتن معمولاً in می‌آید.','Ich komme aus dem Iran. / Ich wohne in Berlin.','من اهل ایران هستم. / در برلین زندگی می‌کنم.'],
    ['حروف اضافه زمان: um و am','um برای ساعت و am برای روزهای هفته و بخش‌هایی از روز به کار می‌رود.','Der Kurs beginnt um neun Uhr. / Am Montag lerne ich.','کلاس ساعت ۹ شروع می‌شود. / دوشنبه درس می‌خوانم.'],
    ['مالکیت: mein و dein','ضمیر ملکی با جنس و شمار اسم هماهنگ می‌شود؛ در حالت فاعلی: mein Bruder، meine Schwester، mein Kind.','Das ist meine Schwester.','این خواهر من است.'],
    ['جمع اسم‌ها','جمع اسم‌ها الگوی واحد ندارد؛ اسم را همراه شکل جمع یاد بگیر. آرتیکل جمع در حالت فاعلی die است.','der Tisch – die Tische; das Kind – die Kinder; die Frau – die Frauen','میزها، بچه‌ها، زن‌ها'],
    ['امر ساده','برای درخواست مستقیم از شکل امری du یا Sie استفاده می‌کنیم؛ لطفاً با bitte مؤدبانه‌تر می‌شود.','Komm bitte! / Kommen Sie bitte!','لطفاً بیا! / لطفاً تشریف بیاورید!'],
    ['پیوند جمله‌ها: und, aber, oder, denn','این پیوندها دو جمله اصلی را وصل می‌کنند و فعل هر بخش اصلی در جایگاه دوم باقی می‌ماند.','Ich lerne Deutsch, aber ich spreche langsam.','آلمانی یاد می‌گیرم، اما آهسته صحبت می‌کنم.']
  ];

  const dialogues = [
    ['آشنایی در کلاس','Hallo! Ich heiße Hamed. Wie heißt du?','Hallo Hamed! Ich heiße Anna. Woher kommst du?','Ich komme aus dem Iran. Und du?','Ich komme aus Deutschland. Freut mich!','خوشوقتم!','Hallo! Ich heiße Hamed. Wie heißt du? Hallo Hamed! Ich heiße Anna. Woher kommst du? Ich komme aus dem Iran. Und du? Ich komme aus Deutschland. Freut mich!'],
    ['در کافه','Guten Tag! Was möchten Sie?','Ich möchte einen Kaffee und ein Wasser, bitte.','Möchten Sie auch etwas essen?','Ja, ein Brötchen, bitte.','سفارش یک قهوه، آب و نان کوچک.','Guten Tag! Was möchten Sie? Ich möchte einen Kaffee und ein Wasser, bitte. Möchten Sie auch etwas essen? Ja, ein Brötchen, bitte.'],
    ['خرید در فروشگاه','Entschuldigung, was kostet der Apfel?','Ein Euro pro Stück.','Dann nehme ich drei Äpfel.','Gern. Sonst noch etwas?','پرسیدن قیمت و خرید سه سیب.','Entschuldigung, was kostet der Apfel? Ein Euro pro Stück. Dann nehme ich drei Äpfel. Gern. Sonst noch etwas?'],
    ['پرسیدن مسیر','Entschuldigung, wo ist der Bahnhof?','Gehen Sie geradeaus und dann links.','Ist es weit von hier?','Nein, nur fünf Minuten zu Fuß.','پرسیدن آدرس ایستگاه.','Entschuldigung, wo ist der Bahnhof? Gehen Sie geradeaus und dann links. Ist es weit von hier? Nein, nur fünf Minuten zu Fuß.'],
    ['قرار آخر هفته','Hast du am Samstag Zeit?','Ja, am Nachmittag. Was möchtest du machen?','Wir können ins Kino gehen.','Gute Idee! Um wie viel Uhr?','هماهنگی برای سینما.','Hast du am Samstag Zeit? Ja, am Nachmittag. Was möchtest du machen? Wir können ins Kino gehen. Gute Idee! Um wie viel Uhr?'],
    ['در ایستگاه','Wann fährt der Zug nach Berlin?','Um 14 Uhr 32.','Von welchem Gleis?','Von Gleis acht.','پرسیدن ساعت حرکت قطار.','Wann fährt der Zug nach Berlin? Um 14 Uhr 32. Von welchem Gleis? Von Gleis acht.'],
    ['تلفن و قرار','Hallo, hier ist Ali. Ist Sara da?','Ja, einen Moment bitte.','Kann sie mich zurückrufen?','Ja, natürlich.','درخواست تماس دوباره.','Hallo, hier ist Ali. Ist Sara da? Ja, einen Moment bitte. Kann sie mich zurückrufen? Ja, natürlich.'],
    ['در مطب','Guten Morgen. Was fehlt Ihnen?','Ich habe Kopfschmerzen und Fieber.','Seit wann?','Seit gestern.','شرح ساده حال بد و علائم.','Guten Morgen. Was fehlt Ihnen? Ich habe Kopfschmerzen und Fieber. Seit wann? Seit gestern.']
  ];

  const exam = [
    ['Ich ___ Hamed.',['bin','bist','ist'],0,'sein با ich می‌شود bin.'],
    ['Du ___ aus dem Iran.',['komme','kommst','kommt'],1,'برای du شناسه -st می‌آید.'],
    ['Das ist ___ Buch.',['ein','eine','einen'],0,'Buch خنثی است: ein Buch.'],
    ['Ich sehe ___ Mann.',['der','den','dem'],1,'مفعول مذکر در Akkusativ: den Mann.'],
    ['Wir ___ Deutsch.',['lernt','lernen','lerne'],1,'فاعل wir با lernen می‌آید.'],
    ['___ du Kaffee?',['Möchtest','Möchte','Möchten'],0,'برای du از möchtest استفاده می‌کنیم.'],
    ['Ich habe ___ Auto.',['nicht','kein','keine'],1,'Auto خنثی است: kein Auto.'],
    ['Heute ___ ich zu Hause.',['bleibe','bleibst','bleibt'],0,'فاعل ich با bleibe می‌آید.'],
    ['Der Zug fährt ___ acht Uhr.',['am','um','in'],1,'برای ساعت از um استفاده می‌شود.'],
    ['Ich komme ___ dem Iran.',['aus','bei','zu'],0,'برای مبدأ از aus استفاده می‌کنیم.'],
    ['Meine Schwester ___ in Berlin.',['wohne','wohnst','wohnt'],2,'فاعل مفرد سوم‌شخص: wohnt.'],
    ['Er ___ sehr gut Deutsch.',['spreche','sprichst','spricht'],2,'sprechen تغییر مصوت دارد: er spricht.'],
    ['Wir ___ heute lernen.',['müssen','muss','musst'],0,'برای wir شکل müssen است.'],
    ['Ich stehe um sechs Uhr ___.',['an','auf','ein'],1,'پیشوند فعل aufstehen در پایان می‌آید.'],
    ['Plural von das Kind:',['die Kinde','die Kinder','die Kindes'],1,'جمع درست Kinder است.'],
    ['___ kostet das Brot?',['Wer','Was','Wo'],1,'برای پرسیدن قیمت: Was kostet …?'],
    ['Ich fahre ___ Bus.',['mit dem','mit den','mit die'],0,'mit همیشه Dativ می‌گیرد: mit dem Bus.'],
    ['Am Montag ___ ich keine Zeit.',['habe','hat','hast'],0,'فاعل ich با habe می‌آید.'],
    ['Gestern ___ ich zu Hause.',['bin','war','ist'],1,'گذشته sein برای ich: war.'],
    ['Ich habe Deutsch ___.',['lernen','gelernt','gelernen'],1,'Partizip II فعل lernen: gelernt.'],
    ['Wir ___ nach Hause gegangen.',['haben','sind','seid'],1,'gehen در Perfekt با sein می‌آید.'],
    ['___ Sie bitte langsam!',['Sprechen','Sprichst','Spricht'],0,'امر رسمی: Sprechen Sie!'],
    ['Ich lerne Deutsch, ___ ich spreche langsam.',['aber','denn','oder'],0,'aber تضاد را نشان می‌دهد.'],
    ['Das ist ___ Mutter.',['mein','meine','meinen'],1,'Mutter مؤنث است: meine Mutter.'],
    ['Er ___ jeden Morgen Kaffee.',['trinke','trinkst','trinkt'],2,'فاعل er با trinkt می‌آید.'],
    ['Ich ___ dich morgen an.',['rufe','rufst','ruft'],0,'فاعل ich: rufe; پیشوند an در پایان.'],
    ['___ wohnst du? – In Karaj.',['Wo','Wohin','Woher'],0,'برای محل سکونت از Wo استفاده می‌کنیم.'],
    ['Ich möchte ___ Apfel.',['ein','einen','einem'],1,'Apfel مذکر و مفعول است: einen Apfel.'],
    ['Wir haben gestern Fußball ___.',['spielen','gespielt','gespielen'],1,'Partizip II فعل spielen: gespielt.'],
    ['Sie ___ sehr müde.',['seid','sind','ist'],1,'Sie رسمی با sind می‌آید.']
  ];

  function speak(text, rate) {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      const uiLang=document.documentElement.lang||'fa'; alert(uiLang==='de'?'Sprachausgabe ist in diesem Browser nicht verfügbar. Verwende eine aktuelle Safari-Version oder einen anderen Browser.':uiLang==='en'?'Speech playback is unavailable in this browser. Use an up-to-date Safari or another browser.':'پخش گفتار در این مرورگر در دسترس نیست. از Safari به‌روز یا مرورگر دیگری استفاده کن.');
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = rate || 0.82;
    const voices = window.speechSynthesis.getVoices();
    const german = voices.find(v => /^de(-|_)/i.test(v.lang));
    if (german) u.voice = german;
    window.speechSynthesis.speak(u);
  }

  function panel(title, subtitle, inner) {
    return '<div class="panel zuno-completion-panel"><div class="row between"><div><h3 class="section-title">'+esc(title)+'</h3><p class="muted tiny">'+esc(subtitle)+'</p><small class="muted tiny">مکمل تألیفی A1 · بدون تطبیق صفحه‌ای با کتاب</small></div></div>'+inner+'</div>';
  }

  function addVerbBank() {
    const page = $('page-verbs');
    if (!page || $('zunoA1VerbBank')) return;
    const html = '<section class="panel" id="zunoA1VerbBank"><div class="row between"><div><h3 class="section-title">بانک تکمیلی افعال A1</h3><p class="muted tiny">۴۲ فعل پرکاربرد با صرف شش ضمیر، معنی و مثال</p><small class="muted tiny">مکمل تألیفی A1 · بدون تطبیق صفحه‌ای با کتاب</small></div><span class="chip">'+verbs.length+' فعل</span></div><div class="grid2"><input id="zunoVerbSearch" type="search" placeholder="جست‌وجوی فعل یا معنی…" autocomplete="off"><select id="zunoVerbType"><option value="all">همه گروه‌ها</option><option>باقاعده</option><option>بی‌قاعده</option><option>تغییر مصوت</option><option>مدال</option><option>جداشدنی</option></select></div><div id="zunoVerbResults" class="grid2" style="margin-top:12px"></div><div id="zunoVerbDetail" class="result" style="margin-top:12px"></div></section>';
    page.insertAdjacentHTML('beforeend', html);
    const search = $('zunoVerbSearch'), type = $('zunoVerbType'), results = $('zunoVerbResults');
    function render() {
      const q = (search.value || '').toLocaleLowerCase();
      const group = type.value;
      const filtered = verbs.filter(v => (group === 'all' || v[2].indexOf(group) >= 0) && (v[0]+' '+v[1]).toLocaleLowerCase().includes(q));
      results.innerHTML = filtered.map(v => '<button type="button" class="result" data-zv="'+esc(v[0])+'" style="text-align:start"><b dir="ltr">'+esc(v[0])+'</b><small class="muted"><span>'+esc(v[1])+'</span> · <span>'+esc(v[2])+'</span></small></button>').join('') || '<div class="empty">فعلی پیدا نشد.</div>';
    }
    function detail(lemma) {
      const v = verbs.find(x => x[0] === lemma);
      if (!v) return;
      $('zunoVerbDetail').innerHTML = '<div class="row between"><b dir="ltr" style="font-size:19px">'+esc(v[0])+'</b><span class="chip">'+esc(v[2])+'</span></div><p>'+esc(v[1])+'</p><div style="overflow:auto"><table class="data-table"><thead><tr><th>ضمیر</th><th>صرف فعل</th></tr></thead><tbody>'+pronouns.map((p,i)=>'<tr><td dir="ltr">'+esc(p)+'</td><td dir="ltr"><b>'+esc(v[3][i])+'</b></td></tr>').join('')+'</tbody></table></div><p dir="ltr">'+esc(v[4])+'</p><p class="muted tiny">'+esc(v[5])+'</p><button type="button" class="btn small" id="zunoVerbSpeak">🔊 شنیدن مثال</button><button type="button" class="btn small" id="zunoVerbSearchDictionary">جست‌وجو در واژگان</button>';
      $('zunoVerbSpeak').onclick = () => speak(v[4],0.78);
      $('zunoVerbSearchDictionary').onclick = () => {
        const field = $('topicWordSearch');
        if (field) { field.value = v[0]; field.dispatchEvent(new Event('input',{bubbles:true})); }
        const nav = Array.from(document.querySelectorAll('.nav button')).find(b => /واژگان|Vocabulary/i.test(b.textContent));
        if (nav) nav.click();
      };
    }
    results.addEventListener('click', e => { const b=e.target.closest('[data-zv]'); if(b) detail(b.getAttribute('data-zv')); });
    search.addEventListener('input',render); type.addEventListener('change',render);
    render(); detail('sein');
  }

  function addGrammar() {
    const page = $('page-grammar');
    if (!page || $('zunoA1GrammarPlus')) return;
    const cards = grammar.map((g,i)=>'<details class="result" style="margin:8px 0"><summary><b>'+(i+1)+'. '+esc(g[0])+'</b></summary><p>'+esc(g[1])+'</p><p dir="ltr">'+esc(g[2])+'</p><p class="muted tiny">'+esc(g[3])+'</p><button type="button" class="btn small" data-grammar-say="'+i+'">🔊 شنیدن مثال</button></details>').join('');
    page.insertAdjacentHTML('beforeend',panel('تکمیل گرامر A1','۱۲ مبحث تکمیلی با مثال و تلفظ', '<div id="zunoA1GrammarPlus">'+cards+'</div>'));
    page.querySelectorAll('[data-grammar-say]').forEach(b=>b.addEventListener('click',()=>speak(grammar[Number(b.dataset.grammarSay)][2],0.78)));
  }

  function addDialogues() {
    const page = $('page-stories');
    if (!page || $('zunoA1Dialogues')) return;
    const html = '<div class="panel" id="zunoA1Dialogues"><div class="row between"><div><h3 class="section-title">مکالمه‌های کاربردی A1</h3><p class="muted tiny">۸ موقعیت واقعی؛ گوش کن، متن را بخوان و تکرار کن.</p><small class="muted tiny">مکمل تألیفی A1 · بدون تطبیق صفحه‌ای با کتاب</small></div><span class="chip">۸ مکالمه</span></div><select id="zunoDialogueSelect" style="width:100%">'+dialogues.map((d,i)=>'<option value="'+i+'">'+(i+1)+'. '+esc(d[0])+'</option>').join('')+'</select><div id="zunoDialogueText" class="result" style="margin-top:12px"></div><div class="row"><button class="btn primary" id="zunoDialoguePlay">🔊 پخش مکالمه</button><button class="btn" id="zunoDialogueSlow">🐢 آهسته</button></div></div>';
    page.insertAdjacentHTML('beforeend',html);
    const select=$('zunoDialogueSelect'), host=$('zunoDialogueText');
    function render(){const d=dialogues[Number(select.value)||0];host.innerHTML='<b>'+esc(d[0])+'</b><p dir="ltr">'+[d[1],d[2],d[3],d[4]].filter(Boolean).map(esc).join('<br>')+'</p><p class="muted tiny">'+esc(d[5])+'</p>';}
    select.addEventListener('change',render); $('zunoDialoguePlay').onclick=()=>speak(dialogues[Number(select.value)][6],0.88); $('zunoDialogueSlow').onclick=()=>speak(dialogues[Number(select.value)][6],0.65); render();
  }

  function addFinalExam() {
    const page = $('page-book-exercises');
    if (!page || $('zunoA1FinalExam')) return;
    const html = '<div class="panel" id="zunoA1FinalExam"><div class="row between"><div><h3 class="section-title">آزمون جامع پایان A1</h3><p class="muted tiny">۳۰ سؤال از گرامر، واژگان، فعل‌ها، جمله‌سازی و زمان گذشته</p><small class="muted tiny">مکمل تألیفی A1 · بدون تطبیق صفحه‌ای با کتاب</small></div><span class="chip">۳۰ امتیاز</span></div><div id="zunoExamQuestions"></div><div class="row" style="margin-top:12px"><button class="btn primary" id="zunoExamCheck">تصحیح آزمون</button><button class="btn" id="zunoExamReset">شروع دوباره</button></div><div id="zunoExamResult" class="exercise-feedback" aria-live="polite" style="margin-top:12px">پاسخ‌ها را انتخاب کن و آزمون را تصحیح کن.</div></div>';
    page.insertAdjacentHTML('beforeend',html);
    const host=$('zunoExamQuestions');
    host.innerHTML=exam.map((q,i)=>'<div class="result" style="margin:8px 0"><b>'+(i+1)+'. '+esc(q[0])+'</b><select data-exam="'+i+'" style="width:100%;margin-top:7px"><option value="">انتخاب پاسخ</option>'+q[1].map((o,j)=>'<option value="'+j+'">'+esc(o)+'</option>').join('')+'</select><small class="muted tiny" id="zunoExamExplain'+i+'"></small></div>').join('');
    $('zunoExamCheck').onclick=()=>{
      let score=0;
      exam.forEach((q,i)=>{const sel=host.querySelector('[data-exam="'+i+'"]');const ok=sel.value!==''&&Number(sel.value)===q[2];if(ok)score++;sel.style.borderColor=ok?'var(--accent)':'var(--danger)';$('zunoExamExplain'+i).innerHTML=ok?'<span>✓ درست · </span><span>'+esc(q[3])+'</span>':'<span>✗ پاسخ: </span><b dir="ltr">'+esc(q[1][q[2]])+'</b><span> · '+esc(q[3])+'</span>';});
      const pct=Math.round(score/exam.length*100);
      $('zunoExamResult').innerHTML='<b>نتیجه: '+score+' از '+exam.length+' ('+pct+'٪)</b><p>'+(pct>=90?'عالی! تسلط بسیار خوبی داری.':pct>=75?'خوب است؛ چند مبحث را دوباره مرور کن.':pct>=60?'در مسیر یادگیری هستی؛ اشتباه‌ها را بررسی کن.':'پیشنهاد می‌شود درس‌ها را مرور و دوباره امتحان کنی.')+'</p><p class="muted tiny">این آزمون تشخیصی تألیفی است و به‌تنهایی مدرک رسمی سطح A1 محسوب نمی‌شود.</p>';
      try{localStorage.setItem('zuno_a1_final_exam',JSON.stringify({score,total:exam.length,pct,date:new Date().toISOString()}));}catch(e){}
    };
    $('zunoExamReset').onclick=()=>{host.querySelectorAll('select').forEach(s=>{s.value='';s.style.borderColor='';});exam.forEach((_,i)=>$('zunoExamExplain'+i).textContent='');$('zunoExamResult').textContent='آزمون دوباره آماده است.';};
  }

  function init() {
    addVerbBank(); addGrammar(); addDialogues(); addFinalExam();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.addEventListener('load',init,{once:true});
})();