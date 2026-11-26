/* Zuno dictionary relations: compact synonym/antonym information shown inside each searched entry. */
(function(){
'use strict';
if(window.__zunoDictionaryRelationsLoaded)return;
window.__zunoDictionaryRelationsLoaded=true;
const relations=Object.create(null);
const add=(kind,a,fa,b,fb)=>[[a,fa,b,fb],[b,fb,a,fa]].forEach(([word,meaning,related,relatedMeaning])=>{
 const key=word.toLocaleLowerCase('de-DE');
 if(!relations[key])relations[key]={synonyms:[],antonyms:[]};
 relations[key][kind].push({word:related,fa:relatedMeaning});
});
const syn=(a,fa,b,fb)=>add('synonyms',a,fa,b,fb),ant=(a,fa,b,fb)=>add('antonyms',a,fa,b,fb);
[
['beginnen','شروع کردن','anfangen','آغاز کردن'],['sprechen','صحبت کردن','reden','حرف زدن'],
['schauen','نگاه کردن','sehen','دیدن'],['schön','زیبا','hübsch','قشنگ'],
['schnell','سریع','rasch','تند'],['gut','خوب','prima','عالی'],
['froh','خوشحال','glücklich','شاد'],['fragen','پرسیدن','sich erkundigen','پرس‌وجو کردن'],
['helfen','کمک کردن','unterstützen','پشتیبانی کردن'],['wohnen','ساکن بودن','leben','زندگی کردن'],
['bekommen','دریافت کردن','erhalten','گرفتن'],['Freund','دوست (مرد)','Kumpel','رفیق'],
['Freundin','دوست (زن)','Bekannte','آشنای زن'],['Ende','پایان','Schluss','تمامی'],
['Arbeit','کار','Tätigkeit','فعالیت شغلی'],['Essen','غذا','Mahlzeit','وعدهٔ غذایی'],
['Auto','ماشین','Pkw','خودروی سواری'],['Wohnung','آپارتمان','Apartment','واحد مسکونی'],
['Zimmer','اتاق','Raum','فضا / اتاق'],['Lehrer','معلم مرد','Dozent','مدرس'],
['Lehrerin','معلم زن','Dozentin','مدرس زن']
].forEach(x=>syn(...x));
[
['gut','خوب','schlecht','بد'],['groß','بزرگ','klein','کوچک'],['alt','پیر؛ قدیمی','jung','جوان'],
['neu','نو؛ جدید','alt','قدیمی'],['schnell','سریع','langsam','آهسته'],['teuer','گران','billig','ارزان'],
['warm','گرم','kalt','سرد'],['heiß','داغ','kühl','خنک'],['hell','روشن','dunkel','تاریک'],
['laut','بلند؛ پرسروصدا','leise','آرام؛ کم‌صدا'],['lang','بلند؛ طولانی','kurz','کوتاه'],
['hoch','بلند؛ مرتفع','niedrig','پایین'],['leicht','آسان؛ سبک','schwer','سخت؛ سنگین'],
['einfach','ساده','kompliziert','پیچیده'],['richtig','درست','falsch','غلط'],
['sauber','تمیز','schmutzig','کثیف'],['voll','پر','leer','خالی'],['offen','باز','geschlossen','بسته'],
['früh','زود','spät','دیر'],['gesund','سالم','krank','بیمار'],['stark','قوی','schwach','ضعیف'],
['freundlich','مهربان','unfreundlich','نامهربان'],['glücklich','خوشحال','traurig','غمگین'],
['interessant','جالب','langweilig','خسته‌کننده'],['fleißig','کوشا','faul','تنبل'],
['trocken','خشک','nass','خیس'],['hart','سفت؛ سخت','weich','نرم'],['breit','پهن','schmal','باریک'],
['dick','چاق؛ ضخیم','dünn','لاغر؛ نازک'],['viel','زیاد','wenig','کم'],['nah','نزدیک','fern','دور'],
['reich','ثروتمند','arm','فقیر'],['öffnen','باز کردن','schließen','بستن'],
['kaufen','خریدن','verkaufen','فروختن'],['geben','دادن','nehmen','گرفتن'],
['kommen','آمدن','gehen','رفتن'],['anfangen','شروع کردن','aufhören','متوقف کردن'],
['einsteigen','سوار شدن','aussteigen','پیاده شدن'],['gewinnen','برنده شدن','verlieren','باختن'],
['lachen','خندیدن','weinen','گریه کردن'],['lieben','دوست داشتن','hassen','متنفر بودن'],
['einschalten','روشن کردن','ausschalten','خاموش کردن']
].forEach(x=>ant(...x));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').toLocaleLowerCase('de-DE').replace(/^(der|die|das)\s+/,'').trim();
function render(node){
 const index=Number(node.dataset.dictRelations),entry=window.__zunoWordsForRelations&&window.__zunoWordsForRelations[index],word=entry?entry[0]:'';
 const data=relations[norm(word)]||{synonyms:[],antonyms:[]};
 const list=items=>items.length?'<div class="zuno-relation-items">'+items.map(x=>'<span class="zuno-relation-chip"><b dir="ltr">'+esc(x.word)+'</b><small>'+esc(x.fa)+'</small></span>').join('')+'</div>':'<div class="zuno-relation-empty">مورد رایج و دقیقی برای این واژه ثبت نشده است.</div>';
 node.innerHTML='<div class="zuno-rel-block"><b>مترادف‌ها · Synonyme</b>'+list(data.synonyms)+'</div><div class="zuno-rel-block"><b>متضادها · Antonyme</b>'+list(data.antonyms)+'</div>';
}
function init(){
 const root=document.getElementById('dictResults');if(!root)return;
 try{window.__zunoWordsForRelations=words;}catch(_){}
 const refresh=()=>root.querySelectorAll('[data-dict-relations]').forEach(node=>{if(node.dataset.relationsRendered==='1')return;render(node);node.dataset.relationsRendered='1';});
 refresh();new MutationObserver(refresh).observe(root,{childList:true,subtree:true});
}
const style=document.createElement('style');
style.textContent='.dict-relations{margin:10px 0 8px;padding:10px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.zuno-rel-block+.zuno-rel-block{margin-top:10px}.zuno-rel-block>b{display:block;font-size:13px;margin-bottom:6px}.zuno-relation-items{display:flex;flex-wrap:wrap;gap:6px}.zuno-relation-chip{display:inline-flex;flex-direction:column;gap:1px;padding:5px 9px;border:1px solid var(--line);border-radius:9px;background:var(--panel2);max-width:100%}.zuno-relation-chip b{font-size:13px}.zuno-relation-chip small{font-size:11px;color:var(--muted)}.zuno-relation-empty{font-size:12px;color:var(--muted);padding:4px 0}';
document.head.appendChild(style);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();