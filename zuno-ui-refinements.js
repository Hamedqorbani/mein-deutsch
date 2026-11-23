/* Zuno UI refinements: live answer feedback and compact section navigation. */
(function(){
'use strict';
if(window.__zunoUiRefinementsLoaded)return;
window.__zunoUiRefinementsLoaded=true;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const addStyle=()=>{
 const css=`
 .zuno-category-nav{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 14px}
 .zuno-category-nav button{border:1px solid var(--line);background:var(--bg);color:var(--muted);border-radius:10px;padding:7px 11px;font-size:12px;line-height:1.45;min-height:36px}
 .zuno-category-nav button[aria-pressed="true"]{background:var(--accent2);border-color:var(--accent);color:var(--text);font-weight:800}
 .zuno-category-panel[hidden]{display:none!important}
 .zuno-live-correct{border-color:#45ad7b!important;box-shadow:0 0 0 1px #45ad7b inset!important}
 .zuno-live-wrong{border-color:var(--danger)!important;box-shadow:0 0 0 1px var(--danger) inset!important}
 .zuno-live-correct:focus,.zuno-live-wrong:focus{outline-offset:2px}
 @media(max-width:600px){.zuno-category-nav{gap:6px}.zuno-category-nav button{flex:1 1 auto;padding:7px 9px}}
 `;
 const style=document.createElement('style');style.id='zuno-ui-refinements-style';style.textContent=css;document.head.appendChild(style);
};
function makeTabs(host,items,initial){
 const nav=document.createElement('div');nav.className='zuno-category-nav';nav.setAttribute('role','group');
 nav.setAttribute('aria-label','دسته‌بندی محتوا');
 const buttons=[];
 items.forEach((item,i)=>{
  const b=document.createElement('button');b.type='button';b.textContent=item.label;b.setAttribute('aria-pressed',String(item.key===initial));b.addEventListener('click',()=>activate(item.key));nav.appendChild(b);buttons.push(b);
 });
 function activate(key){
  items.forEach((item,i)=>{const visible=item.key===key;item.nodes.forEach(node=>{node.hidden=!visible;node.classList.add('zuno-category-panel');});buttons[i].setAttribute('aria-pressed',String(visible));});
  try{host.dataset.activeCategory=key;}catch(_){}
 }
 host.insertBefore(nav,host.firstChild);activate(initial);return activate;
}
function setupExercises(){
 const page=$('#page-book-exercises');if(!page||page.dataset.zunoCategorized)return;
 const panels=$$('.panel',page).filter(p=>!p.closest('#zunoCorePractice'));
 const groups=[
  {key:'articles',label:'آرتیکل و واژگان',test:/آرتیکل|artikel|واژگان|مفرد|جمع|fruit|obst/i},
  {key:'numbers',label:'اعداد و شنیداری',test:/عدد|zahlen|شنیداری|hören|listening/i},
  {key:'food',label:'خوراک و وعده‌ها',test:/خوراک|غذا|صبحانه|ناهار|شام|essen|trinken|meal/i},
  {key:'sentences',label:'جمله و گرامر',test:/جمله|فعل|گرامر|سؤال|akkusativ|uhr|ساعت|wort/i},
  {key:'more',label:'سایر تمرین‌ها',test:/.*/i}
 ];
 const buckets=groups.map(g=>({...g,nodes:[]}));
 panels.forEach(p=>{
  const heading=$('h2,h3,b',p);const title=(heading?heading.textContent:p.textContent).trim().slice(0,160);
  let group=groups.findIndex(g=>g.key!=='more'&&g.test.test(title));
  if(group<0)group=groups.length-1;
  buckets[group].nodes.push(p);
 });
 const active=buckets.filter(g=>g.nodes.length);
 const core=$('#zunoCorePractice',page);
 if(core)active.unshift({key:'core',label:'تمرین‌های تکمیلی',nodes:[core]});
 if(active.length>1){makeTabs(page,active,active[0].key);page.dataset.zunoCategorized='1';}
}
function setupGrammar(){
 const page=$('#page-grammar');if(!page||page.dataset.zunoCategorized)return;
 const panels=$$('.panel',page);
 if(panels.length<2)return;
 const items=[
  {key:'lesson',label:'آموزش گرامر',nodes:panels.slice(0,1)},
  {key:'practice',label:'تمرین درس',nodes:panels.slice(1,2)},
  {key:'past',label:'زمان گذشته',nodes:panels.slice(2)}
 ].filter(x=>x.nodes.length);
 if(items.length>1){makeTabs(page,items,'lesson');page.dataset.zunoCategorized='1';}
}
function liveCheck(target){
 const panel=target.closest('.panel');if(!panel)return;
 let checker=null;
 if(target.closest('#zunoCorePractice'))checker=$('[data-zcp-check]',panel);
 else checker=$('button[id^="check"]',panel);
 if(!checker)return;
 checker.click();
}
function setupLiveFeedback(){
 const page=$('#page-book-exercises');if(!page)return;
 page.addEventListener('input',e=>{
  const el=e.target;if(!el.matches('input,textarea'))return;
  el.classList.remove('zuno-live-correct','zuno-live-wrong');
  liveCheck(el);
 });
 page.addEventListener('change',e=>{
  const el=e.target;if(!el.matches('select,input[type="radio"],input[type="checkbox"]'))return;
  el.classList.remove('zuno-live-correct','zuno-live-wrong');
  liveCheck(el);
 });
 // After each existing checker runs, mirror its green/red result onto each answer control.
 page.addEventListener('click',e=>{
  const button=e.target.closest('button[id^="check"],button[data-zcp-check]');if(!button)return;
  const panel=button.closest('.panel');if(!panel)return;
  window.setTimeout(()=>{
   $$('select,input,textarea',panel).forEach(el=>{
    const color=(el.style.borderColor||'').toLowerCase();
    el.classList.remove('zuno-live-correct','zuno-live-wrong');
    if(color.includes('85b')||color.includes('55b')||color.includes('45a')||color.includes('rgb(69, 173, 123)')||color.includes('var(--accent)'))el.classList.add('zuno-live-correct');
    else if(color.includes('danger')||color.includes('rgb(229, 143, 145)'))el.classList.add('zuno-live-wrong');
    else {
     const feedback=$('[aria-live="polite"]',panel);
     const message=feedback?feedback.textContent.trim():'';
     if(message.startsWith('✓'))el.classList.add('zuno-live-correct');
     else if(message.startsWith('✗'))el.classList.add('zuno-live-wrong');
    }
   });
  },0);
 });
}
function init(){addStyle();setupExercises();setupGrammar();setupLiveFeedback();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();