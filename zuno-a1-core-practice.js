/* Zuno A1 focused practice: clock times, accusative objects and separable verbs.
   Original examples; inspired by common A1 workbook task formats, not copied textbook text. */
(function(){
'use strict';
if(window.__zunoA1CorePracticeLoaded)return;
window.__zunoA1CorePracticeLoaded=true;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const section=document.getElementById('page-book-exercises');
if(!section)return;
const words=[
['der Apfel','die Äpfel','سیب'],['der Mann','die Männer','مرد'],['der Hund','die Hunde','سگ'],['der Tisch','die Tische','میز'],['der Stuhl','die Stühle','صندلی'],['der Kaffee','—','قهوه'],['der Tee','—','چای'],['der Schlüssel','die Schlüssel','کلید'],
['die Tasche','die Taschen','کیف'],['die Lampe','die Lampen','چراغ'],['die Zeitung','die Zeitungen','روزنامه'],['die Banane','die Bananen','موز'],['die Frau','die Frauen','زن'],['die Milch','—','شیر'],['die Jacke','die Jacken','ژاکت'],['die Flasche','die Flaschen','بطری'],
['das Buch','die Bücher','کتاب'],['das Kind','die Kinder','کودک'],['das Brot','die Brote','نان'],['das Wasser','—','آب'],['das Handy','die Handys','تلفن همراه'],['das Auto','die Autos','ماشین'],['das Fenster','die Fenster','پنجره'],['das Ei','die Eier','تخم‌مرغ']
];
const styles=`
<style>
.zuno-core-practice{margin:16px 0}.zcp-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.zcp-tab{border:1px solid var(--line);background:var(--panel2);color:var(--text);border-radius:12px;padding:9px 13px}.zcp-tab[aria-pressed=true]{background:var(--accent2);border-color:var(--accent);font-weight:700}.zcp-card{border:1px solid var(--line);background:var(--panel);border-radius:16px;padding:16px;margin:12px 0}.zcp-card h3{margin:0 0 8px}.zcp-muted{color:var(--muted);font-size:.9em}.zcp-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:10px 0}.zcp-row label{flex:1 1 190px}.zcp-row select,.zcp-row input{min-width:130px;max-width:100%;flex:1;padding:9px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--text)}.zcp-btn{border:0;border-radius:10px;background:var(--accent2);color:var(--text);padding:9px 14px}.zcp-feedback{min-height:1.7em;margin-top:8px;font-weight:600}.zcp-vocab{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px}.zcp-word{border:1px solid var(--line);border-radius:10px;padding:9px;background:var(--panel2)}.zcp-word b{direction:ltr;display:inline-block}.zcp-word small{display:block;color:var(--muted)}.zcp-correct{color:#55b98a}.zcp-wrong{color:var(--danger)}.zcp-ltr{direction:ltr;text-align:left;font-weight:700}
</style>`;
const html=`
<div class="panel zuno-core-practice" id="zunoCorePractice">
 <div class="row between"><h2 class="section-title">تمرین‌های دسته‌بندی‌شده A1</h2><span class="chip">A1 · تمرین تکمیلی زونو</span></div>
 <p class="zcp-muted">تمرین‌های مستقل و تألیفی بر پایه مهارت‌های رایج سطح A1؛ منبع دقیق صفحه‌ای ادعا نمی‌شود.</p>
 <div class="zcp-tabs" role="group" aria-label="دسته‌بندی تمرین‌ها">
  <button class="zcp-tab" type="button" data-zcp-tab="clock" aria-pressed="true">ساعت · رسمی و محاوره‌ای</button>
  <button class="zcp-tab" type="button" data-zcp-tab="akk" aria-pressed="false">Nominativ و Akkusativ</button>
  <button class="zcp-tab" type="button" data-zcp-tab="sep" aria-pressed="false">فعل‌های جداشدنی</button>
  <button class="zcp-tab" type="button" data-zcp-tab="vocab" aria-pressed="false">واژگان و جمع اسم‌ها</button>
 </div>
 <div data-zcp-panel="clock">
  <div class="zcp-card"><h3>۱. ساعت رسمی (formell)</h3><p class="zcp-muted">در بیان رسمی، ساعت و دقیقه را مستقیم می‌خوانیم: 07:15 = sieben Uhr fünfzehn.</p>
   <div class="zcp-row"><label for="zcpClock1">07:15 Uhr</label><select id="zcpClock1"><option value="">پاسخ را انتخاب کن</option><option value="Viertel nach sieben">Viertel nach sieben</option><option value="sieben Uhr fünfzehn">sieben Uhr fünfzehn</option><option value="sieben Uhr fünfzig">sieben Uhr fünfzig</option></select></div>
   <div class="zcp-row"><label for="zcpClock2">14:30 Uhr</label><select id="zcpClock2"><option value="">پاسخ را انتخاب کن</option><option value="vierzehn Uhr dreißig">vierzehn Uhr dreißig</option><option value="halb drei">halb drei</option><option value="drei Uhr vierzehn">drei Uhr vierzehn</option></select></div>
   <div class="zcp-row"><label for="zcpClock3">18:45 Uhr</label><select id="zcpClock3"><option value="">پاسخ را انتخاب کن</option><option value="achtzehn Uhr fünfundvierzig">achtzehn Uhr fünfundvierzig</option><option value="Viertel nach sechs">Viertel nach sechs</option><option value="acht Uhr fünfundvierzig">acht Uhr fünfundvierzig</option></select></div>
  </div>
  <div class="zcp-card"><h3>۲. ساعت محاوره‌ای (informell)</h3><p class="zcp-muted">در گفتار روزمره از nach، vor و halb استفاده می‌کنیم. halb acht یعنی ۷:۳۰، نه ۸:۳۰.</p>
   <div class="zcp-row"><label for="zcpClock4">07:15</label><select id="zcpClock4"><option value="">پاسخ را انتخاب کن</option><option value="Viertel nach sieben">Viertel nach sieben</option><option value="Viertel vor sieben">Viertel vor sieben</option></select></div>
   <div class="zcp-row"><label for="zcpClock5">07:30</label><select id="zcpClock5"><option value="">پاسخ را انتخاب کن</option><option value="halb sieben">halb sieben</option><option value="halb acht">halb acht</option><option value="halb neun">halb neun</option></select></div>
   <div class="zcp-row"><label for="zcpClock6">07:45</label><select id="zcpClock6"><option value="">پاسخ را انتخاب کن</option><option value="Viertel nach sieben">Viertel nach sieben</option><option value="Viertel vor acht">Viertel vor acht</option></select></div>
   <div class="zcp-row"><label for="zcpClock7">08:10</label><select id="zcpClock7"><option value="">پاسخ را انتخاب کن</option><option value="zehn nach acht">zehn nach acht</option><option value="zehn vor acht">zehn vor acht</option></select></div>
  </div>
  <button class="zcp-btn" type="button" data-zcp-check="clock">بررسی تمرین ساعت</button><div class="zcp-feedback" id="zcpClockFeedback" aria-live="polite"></div>
 </div>
 <div data-zcp-panel="akk" hidden>
  <div class="zcp-card"><h3>نکته گرامری: مفعول مستقیم</h3><p>فاعل در Nominativ است؛ مفعول مستقیمِ فعل در Akkusativ می‌آید.</p>
   <p class="zcp-ltr">Der Apfel ist rot. → Ich kaufe <b>den Apfel</b>.</p><p class="zcp-ltr">Das ist <b>ein</b> Buch. → Ich kaufe <b>ein</b> Buch.</p><p class="zcp-ltr">Das ist <b>eine</b> Tasche. → Ich kaufe <b>eine</b> Tasche.</p>
   <p class="zcp-muted">در مذکر: der → den و ein → einen. در مؤنث و خنثی، شکل آرتیکل در این الگو تغییر نمی‌کند.</p>
  </div>
  <div class="zcp-card"><h3>۱. آرتیکل مفعول را کامل کن</h3>
   <div class="zcp-row"><label class="zcp-ltr">Ich kaufe ___ Apfel.</label><select id="zcpAkk1"><option value="">انتخاب</option><option>der</option><option>den</option><option>dem</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Ich sehe ___ Mann.</label><select id="zcpAkk2"><option value="">انتخاب</option><option>ein</option><option>einen</option><option>einem</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Ich habe ___ Tasche.</label><select id="zcpAkk3"><option value="">انتخاب</option><option>eine</option><option>einen</option><option>einer</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Er liest ___ Buch.</label><select id="zcpAkk4"><option value="">انتخاب</option><option>einen</option><option>ein</option><option>eine</option></select></div>
  </div>
  <div class="zcp-card"><h3>۲. سؤال مناسب را انتخاب کن</h3>
   <div class="zcp-row"><label class="zcp-ltr">Ich sehe einen Mann. → ___ sehe ich?</label><select id="zcpAkk5"><option value="">انتخاب</option><option>Wer</option><option>Wen</option><option>Was</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Ich kaufe einen Apfel. → ___ kaufst du?</label><select id="zcpAkk6"><option value="">انتخاب</option><option>Wen</option><option>Was</option><option>Wo</option></select></div>
   <p class="zcp-muted">Wer برای پرسیدن فاعل (چه کسی؟) و Wen برای مفعولِ شخص (چه کسی را؟) است؛ Was برای چیزهاست.</p>
  </div>
  <button class="zcp-btn" type="button" data-zcp-check="akk">بررسی Akkusativ</button><div class="zcp-feedback" id="zcpAkkFeedback" aria-live="polite"></div>
 </div>
 <div data-zcp-panel="sep" hidden>
  <div class="zcp-card"><h3>فعل جداشدنی چگونه کار می‌کند؟</h3><p>در جمله خبری ساده، بخش صرف‌شده در جایگاه دوم و پیشوند جداشدنی معمولاً در پایان جمله می‌آید.</p>
   <p class="zcp-ltr">aufstehen → Ich stehe um sieben Uhr <b>auf</b>.</p><p class="zcp-ltr">einkaufen → Wir kaufen heute <b>ein</b>.</p><p class="zcp-ltr">anrufen → Er ruft seine Mutter <b>an</b>.</p>
  </div>
  <div class="zcp-card"><h3>۱. جای خالی را کامل کن</h3>
   <div class="zcp-row"><label class="zcp-ltr">Ich ___ um 6 Uhr auf. (aufstehen)</label><select id="zcpSep1"><option value="">انتخاب</option><option>stehe</option><option>aufstehe</option><option>steht</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Sie ___ am Samstag ein. (einkaufen)</label><select id="zcpSep2"><option value="">انتخاب</option><option>kauft</option><option>einkauft</option><option>kaufen</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Er ___ seinen Freund an. (anrufen)</label><select id="zcpSep3"><option value="">انتخاب</option><option>anruft</option><option>ruft</option><option>rufst</option></select></div>
   <div class="zcp-row"><label class="zcp-ltr">Wir ___ am Abend fern. (fernsehen)</label><select id="zcpSep4"><option value="">انتخاب</option><option>sehen</option><option>fernsehen</option><option>sieht</option></select></div>
  </div>
  <div class="zcp-card"><h3>۲. پیشوند را پیدا کن</h3><p class="zcp-ltr">mitkommen · aufräumen · anfangen · zuhören</p><p>پیشوندهای جداشدنی: mit-، auf-، an- و zu-.</p><p class="zcp-muted">مثال: Ich räume mein Zimmer auf. · Ich höre dem Lehrer zu.</p></div>
  <button class="zcp-btn" type="button" data-zcp-check="sep">بررسی فعل‌های جداشدنی</button><div class="zcp-feedback" id="zcpSepFeedback" aria-live="polite"></div>
 </div>
 <div data-zcp-panel="vocab" hidden>
  <div class="zcp-card"><h3>واژگان کاربردی: اسم، جمع و معنی</h3><p class="zcp-muted">مرور ۲۴ اسم رایج با آرتیکل و شکل جمع. خط تیره یعنی شکل جمع معمولاً به کار نمی‌رود یا اسم غیرقابل‌شمارش است.</p><div class="zcp-vocab" id="zcpVocabList"></div></div>
 </div>
</div>`;
section.insertAdjacentHTML('afterbegin',styles+html);
const root=document.getElementById('zunoCorePractice');
root.querySelectorAll('[data-zcp-tab]').forEach(btn=>btn.addEventListener('click',()=>{
 const key=btn.dataset.zcpTab;
 root.querySelectorAll('[data-zcp-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
 root.querySelectorAll('[data-zcp-panel]').forEach(p=>p.hidden=p.dataset.zcpPanel!==key);
}));
document.getElementById('zcpVocabList').innerHTML=words.map(w=>'<div class="zcp-word"><b>'+esc(w[0])+'</b><small>'+esc(w[1])+' · '+esc(w[2])+'</small></div>').join('');
const answers={
 clock:{ids:['zcpClock1','zcpClock2','zcpClock3','zcpClock4','zcpClock5','zcpClock6','zcpClock7'],values:['sieben Uhr fünfzehn','vierzehn Uhr dreißig','achtzehn Uhr fünfundvierzig','Viertel nach sieben','halb acht','Viertel vor acht','zehn nach acht'],out:'zcpClockFeedback'},
 akk:{ids:['zcpAkk1','zcpAkk2','zcpAkk3','zcpAkk4','zcpAkk5','zcpAkk6'],values:['den','einen','eine','ein','Wen','Was'],out:'zcpAkkFeedback'},
 sep:{ids:['zcpSep1','zcpSep2','zcpSep3','zcpSep4'],values:['stehe','kauft','ruft','sehen'],out:'zcpSepFeedback'}
};
root.querySelectorAll('[data-zcp-check]').forEach(btn=>btn.addEventListener('click',()=>{
 const data=answers[btn.dataset.zcpCheck];let score=0;
 data.ids.forEach((id,i)=>{const el=document.getElementById(id);const ok=el&&el.value===data.values[i];if(ok)score++;if(el)el.style.borderColor=ok?'#55b98a':'var(--danger)';});
 const out=document.getElementById(data.out);out.textContent='نتیجه: '+score+' از '+data.ids.length+' پاسخ درست.';out.className='zcp-feedback '+(score===data.ids.length?'zcp-correct':'zcp-wrong');
}));
})();