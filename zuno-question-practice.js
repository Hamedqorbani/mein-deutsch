/* Zuno question practice: searchable A1 question-and-answer bank.
   Persian learner cues and translations are authored for this app. */
(function () {
  'use strict';
  if (window.__zunoQuestionPracticeV1) return;
  window.__zunoQuestionPracticeV1 = true;

  const $ = id => document.getElementById(id);
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bank = [
    {id:'greet-01',c:'سلام و احوال‌پرسی',q:'Wie geht es dir?',qp:'وی گِیت اِس دیر؟',qt:'حالت چطور است؟',a:'Danke, mir geht es gut.',ap:'دانکِه، میر گِیت اِس گوت.',at:'ممنون، حالم خوب است.',k:'احوالپرسی حال چطوری حالت خوبه خوبی سلام حال شما چطور است'},
    {id:'greet-02',c:'سلام و احوال‌پرسی',q:'Wie heißen Sie?',qp:'وی هایسِن زی؟',qt:'اسم شما چیست؟ (رسمی)',a:'Ich heiße Hamed.',ap:'ایش هایسِه حامِد.',at:'اسم من حامد است.',k:'اسم نام معرفی رسمی شما'},
    {id:'greet-03',c:'سلام و احوال‌پرسی',q:'Wie heißt du?',qp:'وی هایست دو؟',qt:'اسمت چیست؟ (خودمانی)',a:'Ich heiße Ali.',ap:'ایش هایسِه علی.',at:'اسم من علی است.',k:'اسم نام معرفی خودمانی'},
    {id:'greet-04',c:'سلام و احوال‌پرسی',q:'Was machst du heute?',qp:'واس ماخست دو هویته؟',qt:'امروز چه کار می‌کنی؟',a:'Ich lerne heute Deutsch.',ap:'ایش لِرنِه هویته دویچ.',at:'امروز آلمانی یاد می‌گیرم.',k:'امروز چکار میکنی برنامه روزانه'},
    {id:'greet-05',c:'سلام و احوال‌پرسی',q:'Wie war dein Tag?',qp:'وی وار داین تاگ؟',qt:'روزت چطور بود؟',a:'Mein Tag war gut, danke.',ap:'ماین تاگ وار گوت، دانکِه.',at:'روزم خوب بود، ممنون.',k:'روزت چطور بود روز چگونه گذشت احوالپرسی'},
    {id:'intro-01',c:'معرفی و اطلاعات شخصی',q:'Wie schreibt man deinen Namen?',qp:'وی شرایپت مان داینِن نامِن؟',qt:'اسمت را چگونه می‌نویسند؟',a:'H-A-M-E-D.',ap:'ها – آ – اِم – اِ – دِ.',at:'حروف اسم من H-A-M-E-D است.',k:'املای اسم نوشتن نام چگونه مینویسی اسم'},
    {id:'intro-02',c:'معرفی و اطلاعات شخصی',q:'Woher kommst du?',qp:'ووهِر کومست دو؟',qt:'اهل کجا هستی؟',a:'Ich komme aus dem Iran.',ap:'ایش کومِه آوس دِم ایران.',at:'من اهل ایران هستم.',k:'اهل کجایی از کجا کشور ملیت ایران'},
    {id:'intro-03',c:'معرفی و اطلاعات شخصی',q:'Wo wohnst du?',qp:'وو وونست دو؟',qt:'کجا زندگی می‌کنی؟',a:'Ich wohne in Karaj.',ap:'ایش وونِه این کَرَج.',at:'من در کرج زندگی می‌کنم.',k:'کجا زندگی میکنی محل سکونت شهر آدرس'},
    {id:'intro-04',c:'معرفی و اطلاعات شخصی',q:'Wie alt bist du?',qp:'وی آلت بیست دو؟',qt:'چند سال داری؟',a:'Ich bin dreißig Jahre alt.',ap:'ایش بین درای‌سیش یارِه آلت.',at:'من سی سال دارم.',k:'چند سالته سن عمر چند سال'},
    {id:'intro-05',c:'معرفی و اطلاعات شخصی',q:'Welche Sprachen sprichst du?',qp:'وِلشِه شپراخِن شپریخست دو؟',qt:'به چه زبان‌هایی صحبت می‌کنی؟',a:'Ich spreche Persisch und ein bisschen Deutsch.',ap:'ایش شپغِخِه پِغزیش اوند آین بیسخِن دویچ.',at:'من فارسی و کمی آلمانی صحبت می‌کنم.',k:'چه زبان هایی بلدی صحبت میکنی زبان فارسی انگلیسی'},
    {id:'intro-06',c:'معرفی و اطلاعات شخصی',q:'Hast du Geschwister?',qp:'هاست دو گِشوِستِر؟',qt:'خواهر یا برادر داری؟',a:'Ja, ich habe einen Bruder und zwei Schwestern.',ap:'یا، ایش هابِه آینِن بروودِر اوند تسوای شوِستِرن.',at:'بله، یک برادر و دو خواهر دارم.',k:'خواهر برادر خانواده چند تا خواهر چند تا برادر'},
    {id:'intro-07',c:'معرفی و اطلاعات شخصی',q:'Bist du verheiratet?',qp:'بیست دو فِرهایراتِت؟',qt:'متأهل هستی؟',a:'Nein, ich bin ledig.',ap:'ناین، ایش بین لِدیش.',at:'نه، مجرد هستم.',k:'ازدواج متاهل مجرد وضعیت تاهل'},
    {id:'intro-08',c:'معرفی و اطلاعات شخصی',q:'Wo arbeitest du?',qp:'وو آربایتِست دو؟',qt:'کجا کار می‌کنی؟',a:'Ich arbeite in einer Firma.',ap:'ایش آربایتِه این آینِر فیغما.',at:'من در یک شرکت کار می‌کنم.',k:'کجا کار میکنی محل کار شرکت اداره'},
    {id:'intro-09',c:'معرفی و اطلاعات شخصی',q:'Was ist dein Beruf?',qp:'واس ایست داین بِروف؟',qt:'شغلت چیست؟',a:'Ich bin Techniker.',ap:'ایش بین تِخنیکِر.',at:'من تکنسین هستم.',k:'شغل کارت چیه حرفه پیشه تکنسین مهندس'},
    {id:'intro-10',c:'معرفی و اطلاعات شخصی',q:'Was studierst du?',qp:'واس اشتودیغست دو؟',qt:'چه رشته‌ای می‌خوانی؟',a:'Ich studiere Informatik.',ap:'ایش اشتودیغِه اینفورماتیک.',at:'من علوم کامپیوتر می‌خوانم.',k:'رشته تحصیلی دانشگاه چی میخونی تحصیلات'},
    {id:'intro-11',c:'معرفی و اطلاعات شخصی',q:'Woher kommst du ursprünglich?',qp:'ووهِر کومست دو اورشپغونگلیش؟',qt:'اصالتاً اهل کجا هستی؟',a:'Ich komme ursprünglich aus dem Iran.',ap:'ایش کومِه اورشپغونگلیش آوس دِم ایران.',at:'من اصالتاً اهل ایران هستم.',k:'اصالتا اهل کجا ریشه کشور زادگاه'},
    {id:'family-01',c:'خانواده',q:'Wie heißt deine Mutter?',qp:'وی هایست داینِه موتِر؟',qt:'اسم مادرت چیست؟',a:'Meine Mutter heißt Maryam.',ap:'ماینِه موتِر هایست مَریَم.',at:'اسم مادرم مریم است.',k:'اسم مادر مامان خانواده'},
    {id:'family-02',c:'خانواده',q:'Wie alt ist dein Vater?',qp:'وی آلت ایست داین فاتر؟',qt:'پدرت چند سال دارد؟',a:'Mein Vater ist fünfundsiebzig Jahre alt.',ap:'ماین فاتِر ایست فونف اوند زیپتسیش یارِه آلت.',at:'پدرم هفتاد و پنج سال دارد.',k:'سن پدر بابا چند سال خانواده'},
    {id:'color-01',c:'رنگ‌ها و سلیقه',q:'Was ist deine Lieblingsfarbe?',qp:'واس ایست داینِه لیپلینگس‌فاربه؟',qt:'رنگ مورد علاقه‌ات چیست؟',a:'Meine Lieblingsfarbe ist Blau.',ap:'ماینِه لیپلینگس‌فاربه ایست بلاو.',at:'رنگ مورد علاقه من آبی است.',k:'رنگ مورد علاقه رنگ محبوب آبی قرمز سبز زرد'},
    {id:'color-02',c:'رنگ‌ها و سلیقه',q:'Welche Farbe hat dein Auto?',qp:'وِلشِه فاربِه هات داین آوتو؟',qt:'ماشینت چه رنگی است؟',a:'Mein Auto ist weiß.',ap:'ماین آوتو ایست وایس.',at:'ماشین من سفید است.',k:'رنگ ماشین چه رنگی رنگ وسیله'},
    {id:'hobby-01',c:'علاقه و اوقات فراغت',q:'Was machst du gern in deiner Freizeit?',qp:'واس ماخست دو گِرن این داینِر فرایت‌تسایت؟',qt:'در اوقات فراغت دوست داری چه کار کنی؟',a:'Ich gehe gern spazieren.',ap:'ایش گِه‌اِه گِرن شپاتسیغِن.',at:'من دوست دارم پیاده‌روی کنم.',k:'اوقات فراغت سرگرمی تفریح چه کاری دوست داری علاقه'},
    {id:'hobby-02',c:'علاقه و اوقات فراغت',q:'Was ist dein Hobby?',qp:'واس ایست داین هوبی؟',qt:'سرگرمی‌ات چیست؟',a:'Computer sind mein Hobby.',ap:'کامپیوتِر زیند ماین هوبی.',at:'کامپیوترها سرگرمی من هستند.',k:'سرگرمی علاقه هابی تفریح'},
    {id:'hobby-03',c:'علاقه و اوقات فراغت',q:'Welche Musik hörst du gern?',qp:'وِلشِه موزیک هوغست دو گِرن؟',qt:'چه نوع موسیقی را دوست داری گوش کنی؟',a:'Ich höre gern Popmusik.',ap:'ایش هوغِه گِرن پاپ‌موزیک.',at:'من دوست دارم موسیقی پاپ گوش کنم.',k:'موسیقی آهنگ چه آهنگی گوش میدی'},
    {id:'hobby-04',c:'علاقه و اوقات فراغت',q:'Spielst du gern Fußball?',qp:'اشپیلست دو گِرن فوسبال؟',qt:'فوتبال بازی کردن را دوست داری؟',a:'Nein, ich spiele lieber Tennis.',ap:'ناین، ایش شپیلِه لیبِر تِنِس.',at:'نه، ترجیح می‌دهم تنیس بازی کنم.',k:'ورزش فوتبال بازی میکنی علاقه ورزش'},
    {id:'time-01',c:'ساعت و زمان',q:'Wie spät ist es?',qp:'وی شپِیت ایست اِس؟',qt:'ساعت چند است؟',a:'Es ist zehn Uhr.',ap:'اِس ایست تسین اوغ.',at:'ساعت ده است.',k:'ساعت چنده ساعت چند است زمان الان ساعت'},
    {id:'time-02',c:'ساعت و زمان',q:'Wie viel Uhr ist es jetzt?',qp:'وی فیل اوغ ایست اِس یِتست؟',qt:'الان ساعت چند است؟',a:'Es ist halb neun.',ap:'اِس ایست هالب نوین.',at:'ساعت هشت و نیم است.',k:'الان ساعت چنده ساعت الان زمان ساعت'},
    {id:'time-03',c:'ساعت و زمان',q:'Um wie viel Uhr stehst du auf?',qp:'اوم وی فیل اوغ شتِیست دو آوف؟',qt:'ساعت چند بیدار می‌شوی؟',a:'Ich stehe um sieben Uhr auf.',ap:'ایش شتِه‌اِه اوم زیبِن اوغ آوف.',at:'ساعت هفت بیدار می‌شوم.',k:'چه ساعتی بیدار میشی خواب صبح ساعت شروع روز'},
    {id:'time-04',c:'ساعت و زمان',q:'Wann beginnt deine Arbeit?',qp:'وان بِگینت داینِه آربایت؟',qt:'کارت چه ساعتی شروع می‌شود؟',a:'Meine Arbeit beginnt um acht Uhr.',ap:'ماینِه آربایت بِگینت اوم آخت اوغ.',at:'کار من ساعت هشت شروع می‌شود.',k:'ساعت کاری شروع کار چه ساعتی کار را شروع میکنی'},
    {id:'time-05',c:'ساعت و زمان',q:'Wann hast du Feierabend?',qp:'وان هاست دو فایِرآبِنت؟',qt:'چه ساعتی کارت تمام می‌شود؟',a:'Ich habe um siebzehn Uhr Feierabend.',ap:'ایش هابِه اوم زیپتسین اوغ فایِرآبِنت.',at:'ساعت هفده کارم تمام می‌شود.',k:'پایان کار ساعت تعطیلی چه ساعتی کار تمام میشه'},
    {id:'time-06',c:'ساعت و زمان',q:'Wie lange arbeitest du pro Tag?',qp:'وی لانگِه آربایتِست دو پرو تاگ؟',qt:'روزانه چند ساعت کار می‌کنی؟',a:'Ich arbeite acht Stunden pro Tag.',ap:'ایش آربایتِه آخت اشتوندِن پرو تاگ.',at:'من روزانه هشت ساعت کار می‌کنم.',k:'چند ساعت کار میکنی ساعات کاری روزانه مدت کار'},
    {id:'time-07',c:'ساعت و زمان',q:'Wann hast du Pause?',qp:'وان هاست دو پاوزِه؟',qt:'چه زمانی استراحت داری؟',a:'Ich habe um dreizehn Uhr Pause.',ap:'ایش هابِه اوم درای‌تسین اوغ پاوزِه.',at:'ساعت سیزده استراحت دارم.',k:'استراحت تایم ناهار زمان استراحت ساعت کاری'},
    {id:'time-08',c:'ساعت و زمان',q:'Wie lange dauert die Pause?',qp:'وی لانگِه داوِرت دی پاوزِه؟',qt:'استراحت چقدر طول می‌کشد؟',a:'Die Pause dauert eine Stunde.',ap:'دی پاوزِه داوِرت آینِه اشتوندِه.',at:'استراحت یک ساعت طول می‌کشد.',k:'مدت استراحت ناهار یک ساعت چقدر طول میکشه'},
    {id:'time-09',c:'ساعت و زمان',q:'Wann treffen wir uns?',qp:'وان تِرِفِن ویر اونس؟',qt:'چه زمانی همدیگر را ببینیم؟',a:'Wir treffen uns um achtzehn Uhr.',ap:'ویر تِرِفِن اونس اوم آخت‌تسین اوغ.',at:'ساعت هجده همدیگر را می‌بینیم.',k:'قرار ملاقات چه ساعتی همدیگر را ببینیم'},
    {id:'time-10',c:'ساعت و زمان',q:'Welcher Tag ist heute?',qp:'وِلخِر تاگ ایست هویته؟',qt:'امروز چه روزی است؟',a:'Heute ist Freitag.',ap:'هویته ایست فرایتاک.',at:'امروز جمعه است.',k:'امروز چه روزی روز هفته تاریخ'},
    {id:'time-11',c:'ساعت و زمان',q:'Wann hast du Geburtstag?',qp:'وان هاست دو گِبوغتس‌تاگ؟',qt:'تولدت چه زمانی است؟',a:'Ich habe am fünften Mai Geburtstag.',ap:'ایش هابِه اَم فونفتِن مای گِبوغتس‌تاگ.',at:'تولد من پنجم ماه مه است.',k:'تولد تاریخ تولد چه روزی ماه سال'},
    {id:'work-01',c:'شغل و ساعت کاری',q:'Was machst du beruflich?',qp:'واس ماخست دو بِروفلیش؟',qt:'از نظر شغلی چه‌کاره‌ای؟',a:'Ich bin Softwareentwickler.',ap:'ایش بین زافت‌وِر اِنت‌ویکلِر.',at:'من توسعه‌دهنده نرم‌افزار هستم.',k:'شغلت چیست چه کاره هستی حرفه کار'},
    {id:'work-02',c:'شغل و ساعت کاری',q:'Wo arbeitest du?',qp:'وو آربایتِست دو؟',qt:'کجا کار می‌کنی؟',a:'Ich arbeite in einem Büro.',ap:'ایش آربایتِه این آینِم بورو.',at:'من در یک دفتر کار می‌کنم.',k:'محل کار اداره شرکت دفتر'},
    {id:'work-03',c:'شغل و ساعت کاری',q:'Wie sind deine Arbeitszeiten?',qp:'وی زیند داینِه آربایتس‌تسایتِن؟',qt:'ساعت‌های کاری‌ات چگونه است؟',a:'Ich arbeite von acht bis siebzehn Uhr.',ap:'ایش آربایتِه فون آخت بیس زیب‌تسین اوغ.',at:'من از ساعت هشت تا هفده کار می‌کنم.',k:'ساعت کاری شیفت کاری تایم کار از چند تا چند'},
    {id:'work-04',c:'شغل و ساعت کاری',q:'Arbeitest du Vollzeit oder Teilzeit?',qp:'آربایتِست دو فول‌تسایت اودِر تایل‌تسایت؟',qt:'تمام‌وقت کار می‌کنی یا پاره‌وقت؟',a:'Ich arbeite Vollzeit.',ap:'ایش آربایتِه فول‌تسایت.',at:'من تمام‌وقت کار می‌کنم.',k:'تمام وقت پاره وقت شغل ساعت کار'},
    {id:'work-05',c:'شغل و ساعت کاری',q:'Arbeitest du auch am Wochenende?',qp:'آربایتِست دو آوخ اَم ووخِن‌اِندِه؟',qt:'آخر هفته هم کار می‌کنی؟',a:'Nein, am Wochenende habe ich frei.',ap:'ناین، اَم ووخِن‌اِندِه هابِه ایش فرای.',at:'نه، آخر هفته تعطیل هستم.',k:'آخر هفته جمعه شنبه تعطیل کار'},
    {id:'work-06',c:'شغل و ساعت کاری',q:'Was verdienst du?',qp:'واس فِردینست دو؟',qt:'چقدر درآمد داری؟',a:'Darüber möchte ich nicht sprechen.',ap:'داروبِر موشتِه ایش نیشت شپغِخِن.',at:'ترجیح می‌دهم درباره آن صحبت نکنم.',k:'حقوق درآمد دستمزد چقدر پول'},
    {id:'food-01',c:'غذا و نوشیدنی',q:'Was isst du gern?',qp:'واس ایست دو گِرن؟',qt:'چه غذایی دوست داری؟',a:'Ich esse gern Reis und Salat.',ap:'ایش اِسِه گِرن رایس اوند زالات.',at:'من برنج و سالاد دوست دارم.',k:'غذا چی دوست داری بخوری غذای مورد علاقه'},
    {id:'food-02',c:'غذا و نوشیدنی',q:'Was möchtest du trinken?',qp:'واس موشتِست دو ترینکِن؟',qt:'چه چیزی می‌خواهی بنوشی؟',a:'Ich möchte bitte Wasser.',ap:'ایش موشتِه بیته واسِر.',at:'لطفاً آب می‌خواهم.',k:'نوشیدنی چی بخورم آب چای قهوه'},
    {id:'food-03',c:'غذا و نوشیدنی',q:'Möchtest du einen Kaffee?',qp:'موشتِست دو آینِن کافه؟',qt:'یک قهوه می‌خواهی؟',a:'Ja, gern. Danke!',ap:'یا، گِرن. دانکِه!',at:'بله، با کمال میل. ممنون!',k:'قهوه میل داری نوشیدن پیشنهاد'},
    {id:'shop-01',c:'خرید و قیمت',q:'Was kostet das?',qp:'واس کوستِت داس؟',qt:'این چقدر قیمت دارد؟',a:'Das kostet zehn Euro.',ap:'داس کوستِت تسین اویغو.',at:'این ده یورو قیمت دارد.',k:'قیمت چند است چنده هزینه پول خرید'},
    {id:'shop-02',c:'خرید و قیمت',q:'Wie viel kostet ein Kilo Äpfel?',qp:'وی فیل کوستِت آین کیلو اِپفِل؟',qt:'یک کیلو سیب چقدر است؟',a:'Ein Kilo kostet zwei Euro.',ap:'آین کیلو کوستِت تسوای اویغو.',at:'یک کیلو دو یورو است.',k:'قیمت میوه کیلو سیب چنده'},
    {id:'shop-03',c:'خرید و قیمت',q:'Kann ich mit Karte bezahlen?',qp:'کان ایش میت کارتِه بِتسالِن؟',qt:'می‌توانم با کارت پرداخت کنم؟',a:'Ja, natürlich.',ap:'یا، ناتورلیش.',at:'بله، البته.',k:'پرداخت کارت بانکی پول نقد کارت'},
    {id:'shop-04',c:'خرید و قیمت',q:'Haben Sie eine andere Größe?',qp:'هابِن زی آینِه آندِرِه گروسه؟',qt:'سایز دیگری دارید؟',a:'Ja, welche Größe brauchen Sie?',ap:'یا، وِلشِه گروسه براوخِن زی؟',at:'بله، چه سایزی نیاز دارید؟',k:'سایز لباس اندازه بزرگ کوچک'},
    {id:'place-01',c:'مکان و مسیر',q:'Wo ist der Bahnhof?',qp:'وو ایست دِر بانهوف؟',qt:'ایستگاه قطار کجاست؟',a:'Der Bahnhof ist neben dem Hotel.',ap:'دِر بانهوف ایست نِیبِن دِم هوتِل.',at:'ایستگاه قطار کنار هتل است.',k:'ایستگاه قطار کجاست آدرس مکان'},
    {id:'place-02',c:'مکان و مسیر',q:'Wie komme ich zum Bahnhof?',qp:'وی کومِه ایش تسوم بانهوف؟',qt:'چطور به ایستگاه قطار بروم؟',a:'Gehen Sie geradeaus und dann links.',ap:'گِهِن زی گِغادِآوس اوند دان لینکْس.',at:'مستقیم بروید و سپس به چپ بپیچید.',k:'چطور بروم مسیر آدرس راه'},
    {id:'place-03',c:'مکان و مسیر',q:'Ist es weit von hier?',qp:'ایست اِس وایْت فون هیر؟',qt:'از اینجا دور است؟',a:'Nein, es ist nur fünf Minuten zu Fuß.',ap:'ناین، اِس ایست نور فونف می‌نوتِن تسو فوس.',at:'نه، فقط پنج دقیقه پیاده است.',k:'دور نزدیک چند دقیقه پیاده'},
    {id:'travel-01',c:'سفر و حمل‌ونقل',q:'Wann fährt der Zug ab?',qp:'وان فِرت دِر تسوگ اَپ؟',qt:'قطار چه زمانی حرکت می‌کند؟',a:'Der Zug fährt um neun Uhr ab.',ap:'دِر تسوگ فِرت اوم نوین اوغ اَپ.',at:'قطار ساعت نه حرکت می‌کند.',k:'قطار ساعت حرکت زمان حرکت اتوبوس'},
    {id:'travel-02',c:'سفر و حمل‌ونقل',q:'Wohin möchtest du reisen?',qp:'ووهین موشتِست دو رایزِن؟',qt:'دوست داری به کجا سفر کنی؟',a:'Ich möchte nach Berlin reisen.',ap:'ایش موشتِه ناخ بِرلین رایزِن.',at:'دوست دارم به برلین سفر کنم.',k:'سفر کجا میخوای بری مقصد مسافرت'},
    {id:'home-01',c:'خانه و زندگی',q:'Wie ist deine Wohnung?',qp:'وی ایست داینِه وونونگ؟',qt:'آپارتمانت چطور است؟',a:'Meine Wohnung ist klein, aber schön.',ap:'ماینِه وونونگ ایست کلاین، آبِر شون.',at:'آپارتمان من کوچک اما زیباست.',k:'خانه آپارتمان محل زندگی چطوره'},
    {id:'weather-01',c:'آب‌وهوا',q:'Wie ist das Wetter heute?',qp:'وی ایست داس وِتِر هویته؟',qt:'امروز هوا چطور است؟',a:'Heute ist es sonnig und warm.',ap:'هویته ایست اِس زونیگ اوند وارم.',at:'امروز هوا آفتابی و گرم است.',k:'هوا آب و هوا امروز باران سرد گرم'},
    {id:'health-01',c:'سلامت و نیازها',q:'Was fehlt Ihnen?',qp:'واس فِیلت اینِن؟',qt:'چه مشکلی دارید؟ (در مطب)',a:'Ich habe Kopfschmerzen.',ap:'ایش هابِه کوپف‌شمِرتسِن.',at:'سردرد دارم.',k:'بیماری دکتر درد مریض سردرد حال جسمی'},
    {id:'class-01',c:'کلاس و یادگیری',q:'Wie sagt man das auf Deutsch?',qp:'وی زاگت مان داس آوف دویچ؟',qt:'این را به آلمانی چگونه می‌گویند؟',a:'Das heißt „Buch“.',ap:'داس هایست بوخ.',at:'به آن «کتاب» می‌گویند.',k:'ترجمه چطور میگن آلمانی معنی واژه'},
    {id:'class-02',c:'کلاس و یادگیری',q:'Können Sie das bitte wiederholen?',qp:'کونِن زی داس بیته ویدِرهولِن؟',qt:'ممکن است لطفاً آن را تکرار کنید؟',a:'Ja, natürlich. Ich wiederhole es.',ap:'یا، ناتورلیش. ایش ویدِرهولِه اِس.',at:'بله، البته. آن را تکرار می‌کنم.',k:'تکرار کنید دوباره بگو نفهمیدم کلاس'},
    {id:'class-03',c:'کلاس و یادگیری',q:'Wie schreibt man das?',qp:'وی شرایپت مان داس؟',qt:'این را چگونه می‌نویسند؟',a:'Man schreibt es mit „ie“.',ap:'مان شرایپت اِس میت ای‌اِه.',at:'آن را با «ie» می‌نویسند.',k:'املای کلمه نوشتن چگونه نوشته میشود'},
    {id:'request-01',c:'درخواست و مکالمه',q:'Können Sie mir bitte helfen?',qp:'کونِن زی میر بیته هِلفِن؟',qt:'ممکن است لطفاً به من کمک کنید؟',a:'Ja, gern. Was brauchen Sie?',ap:'یا، گِرن. واس براوخِن زی؟',at:'بله، با کمال میل. چه کمکی نیاز دارید؟',k:'کمک لطفا درخواست مودبانه'},
    {id:'request-02',c:'درخواست و مکالمه',q:'Darf ich hereinkommen?',qp:'دارف ایش هِرآین‌کومِن؟',qt:'اجازه دارم وارد شوم؟',a:'Ja, bitte kommen Sie herein.',ap:'یا، بیته کومِن زی هِرآین.',at:'بله، بفرمایید داخل.',k:'اجازه ورود میتوانم وارد شوم'},
    {id:'yesno-01',c:'سؤال‌های بله و خیر',q:'Sprichst du Deutsch?',qp:'شپریخست دو دویچ؟',qt:'آلمانی صحبت می‌کنی؟',a:'Ja, ich lerne Deutsch.',ap:'یا، ایش لِرنِه دویچ.',at:'بله، آلمانی یاد می‌گیرم.',k:'بله خیر سوال جواب آلمانی صحبت'},
    {id:'yesno-02',c:'سؤال‌های بله و خیر',q:'Hast du heute Zeit?',qp:'هاست دو هویته تسایت؟',qt:'امروز وقت داری؟',a:'Ja, ich habe am Abend Zeit.',ap:'یا، ایش هابِه اَم آبِنت تسایت.',at:'بله، عصر وقت دارم.',k:'وقت داری زمان آزاد امروز'},
    {id:'yesno-03',c:'سؤال‌های بله و خیر',q:'Kannst du mir helfen?',qp:'کانست دو میر هِلفِن؟',qt:'می‌توانی به من کمک کنی؟',a:'Ja, natürlich.',ap:'یا، ناتورلیش.',at:'بله، حتماً.',k:'میتونی کمک کنی سوال بله خیر'}
  ];

  const norm = s => String(s || '').toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[\u200c\u200f\u202a-\u202e]/g,'').replace(/[؟?!.,؛:()[\]{}"“”]/g,' ').replace(/\s+/g,' ').trim();
  function score(item, query) {
    const q = norm(query);
    if (!q) return 0;
    const fields = [item.q,item.qt,item.a,item.at,item.c,item.k].map(norm);
    if (fields.some(v => v === q)) return 100;
    if (fields.some(v => v.includes(q))) return 80;
    const tokens = q.split(' ').filter(t => t.length > 1);
    if (!tokens.length) return 0;
    const hay = fields.join(' ');
    const hits = tokens.filter(t => hay.includes(t)).length;
    return hits === tokens.length ? 60 + hits : hits >= Math.ceil(tokens.length * .65) ? 30 + hits : 0;
  }
  let current = 0, answerVisible = false, filtered = bank.slice();
  const grammarPage = $('page-grammar');
  if (!grammarPage || $('zunoQuestionPractice')) return;

  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.id = 'zunoQuestionPractice';
  panel.innerHTML = '<div class="row between"><div><h3 class="section-title">تمرین سؤال پرسیدن</h3><p class="muted tiny">سؤال‌های پرکاربرد آلمانی را با جواب، تلفظ فارسی و ترجمه تمرین کن.</p></div><button type="button" class="btn primary" id="zqpToggle" aria-expanded="false">باز کردن تمرین</button></div><div id="zqpBody" class="hidden"><div class="grid2" style="margin-top:12px"><div class="field"><label for="zqpCategory">موضوع سؤال</label><select id="zqpCategory"></select></div><div class="field"><label for="zqpSearch">جستجو در سؤال‌ها</label><input id="zqpSearch" type="search" placeholder="مثلاً ساعت کاری، رنگ مورد علاقه، سن…"></div></div><div class="row between" style="margin:10px 0"><span class="chip" id="zqpCounter">سؤال ۱ از ۱</span><span class="muted tiny" id="zqpTopic"></span></div><div class="result" id="zqpQuestionCard"><div class="muted tiny">سؤال به آلمانی</div><div dir="ltr" style="font-size:22px;font-weight:800;margin:5px 0" id="zqpQuestion"></div><div class="muted tiny" id="zqpQuestionPron"></div><p id="zqpQuestionMeaning"></p><div id="zqpAnswerBlock" class="hidden" style="border-top:1px solid var(--line);margin-top:12px;padding-top:10px"><div class="muted tiny">پاسخ نمونه به آلمانی</div><div dir="ltr" style="font-size:19px;font-weight:750;margin:5px 0" id="zqpAnswer"></div><div class="muted tiny" id="zqpAnswerPron"></div><p id="zqpAnswerMeaning"></p></div></div><div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap"><button type="button" class="btn" id="zqpShowAnswer">نمایش جواب</button><button type="button" class="btn" id="zqpSpeakQuestion">🔊 شنیدن سؤال</button><button type="button" class="btn" id="zqpSpeakAnswer">🔊 شنیدن جواب</button><button type="button" class="btn primary" id="zqpNext">سؤال بعدی</button></div></div>';
  grammarPage.insertBefore(panel, grammarPage.firstChild);

  const category = $('zqpCategory');
  category.innerHTML = '<option value="all">همه موضوع‌ها</option>' + [...new Set(bank.map(x => x.c))].map(x => '<option value="' + esc(x) + '">' + esc(x) + '</option>').join('');
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE'; u.rate = .78;
    window.speechSynthesis.speak(u);
  }
  function render() {
    const item = filtered[current];
    if (!item) {
      $('zqpQuestion').textContent = 'سؤالی پیدا نشد.';
      $('zqpQuestionPron').textContent = '';
      $('zqpQuestionMeaning').textContent = 'موضوع یا عبارت دیگری را جستجو کن.';
      $('zqpAnswerBlock').classList.add('hidden');
      $('zqpCounter').textContent = '۰ سؤال';
      return;
    }
    $('zqpTopic').textContent = item.c;
    $('zqpCounter').textContent = 'سؤال ' + (current + 1) + ' از ' + filtered.length;
    $('zqpQuestion').textContent = item.q;
    $('zqpQuestionPron').textContent = 'تلفظ فارسی: ' + item.qp;
    $('zqpQuestionMeaning').textContent = 'ترجمه: ' + item.qt;
    $('zqpAnswer').textContent = item.a;
    $('zqpAnswerPron').textContent = 'تلفظ فارسی: ' + item.ap;
    $('zqpAnswerMeaning').textContent = 'ترجمه: ' + item.at;
    $('zqpAnswerBlock').classList.toggle('hidden', !answerVisible);
    $('zqpShowAnswer').textContent = answerVisible ? 'پنهان کردن جواب' : 'نمایش جواب';
  }
  function applyFilter(query) {
    const cat = category.value;
    filtered = bank.filter(item => (cat === 'all' || item.c === cat) && (!query || score(item, query) > 0));
    current = 0; answerVisible = false; render();
  }
  function selectItem(id) {
    const at = bank.findIndex(x => x.id === id);
    if (at < 0) return;
    category.value = 'all';
    $('zqpSearch').value = '';
    filtered = bank.slice();
    current = filtered.findIndex(x => x.id === id);
    answerVisible = true;
    $('zqpBody').classList.remove('hidden');
    $('zqpToggle').setAttribute('aria-expanded','true');
    $('zqpToggle').textContent = 'بستن تمرین';
    render();
    const nav = document.querySelector('.nav button[data-page="grammar"]');
    if (nav) nav.click();
    setTimeout(() => panel.scrollIntoView({behavior:'smooth',block:'start'}), 80);
  }
  $('zqpToggle').addEventListener('click', () => {
    const opening = $('zqpBody').classList.contains('hidden');
    $('zqpBody').classList.toggle('hidden', !opening);
    $('zqpToggle').setAttribute('aria-expanded', String(opening));
    $('zqpToggle').textContent = opening ? 'بستن تمرین' : 'باز کردن تمرین';
  });
  $('zqpSearch').addEventListener('input', () => applyFilter($('zqpSearch').value));
  category.addEventListener('change', () => applyFilter($('zqpSearch').value));
  $('zqpShowAnswer').addEventListener('click', () => { answerVisible = !answerVisible; render(); });
  $('zqpNext').addEventListener('click', () => { if (filtered.length) { current = (current + 1) % filtered.length; answerVisible = false; render(); } });
  $('zqpSpeakQuestion').addEventListener('click', () => { if (filtered[current]) speak(filtered[current].q); });
  $('zqpSpeakAnswer').addEventListener('click', () => { if (filtered[current]) speak(filtered[current].a); });

})();
