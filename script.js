const $=(s,r=document)=>r.querySelector(s),C=CONFIG,esc=t=>t;
let lbItems=[],lbI=0;
function lbShow(i,d){const it=lbItems[i],im=$('#lb img');lbI=i;im.style.setProperty('--d',d||0);im.src=it.src;im.alt=it.label;im.classList.remove('sw');void im.offsetWidth;im.classList.add('sw');$('#lbcap').textContent=it.label;$('#lbn').textContent=lbItems.length>1?String(i+1).padStart(2,'0')+' / '+String(lbItems.length).padStart(2,'0'):'';$('#lb').classList.toggle('single',lbItems.length<2)}
function openLB(el){const g=el.closest('.gal,.cg,.ag');lbItems=[...(g?g.querySelectorAll('.slot'):[el])].filter(x=>x.dataset.src).map(x=>({src:x.dataset.src,label:x.dataset.label}));lbShow(Math.max(0,lbItems.findIndex(x=>x.src===el.dataset.src)));$('#lb').hidden=false;$('#lb .lb-x').focus()}
const ph=(src,label)=>`<span>📷 ${label}<small>${src}</small></span>`;
function slot(el,src,label,zoom,hi){el.innerHTML=ph(src,label);const i=new Image();i.alt=label;i.decoding='async';if(hi)i.fetchPriority='high';i.onload=()=>{el.textContent='';el.append(i);if(zoom){el.dataset.src=src;el.dataset.label=label;el.tabIndex=0;el.setAttribute('role','button');el.onclick=()=>openLB(el);el.onkeydown=e=>{if(e.key==='Enter')openLB(el)}}};i.src=src}
// Below-the-fold slots only request their photograph when they are within ~1 screen of the viewport (lazy loading)
const lio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lio.unobserve(e.target);slot(e.target,...e.target._a)}}),{rootMargin:'900px 0px'});
function lazy(el,src,label,zoom){el._a=[src,label,zoom];el.innerHTML=ph(src,label);lio.observe(el)}
// Theme: one central controller (root[data-theme]); initial value is set in <head> before first paint
const root=document.documentElement,themeBtn=$('#theme'),reduceT=window.__reduce===true;
function applyTheme(t,save){root.dataset.theme=t;if(save){try{localStorage.setItem('theme',t)}catch(e){}}const a=t==='dark'?'Switch to light mode':'Switch to dark mode';themeBtn.setAttribute('aria-label',a);themeBtn.title=a;themeBtn.setAttribute('aria-pressed',String(t==='light'));window.dispatchEvent(new Event('themechange'))}
themeBtn.onclick=()=>{const n=root.dataset.theme==='dark'?'light':'dark';if(document.startViewTransition&&!reduceT)document.startViewTransition(()=>applyTheme(n,true));else applyTheme(n,true)};
applyTheme(root.dataset.theme==='light'?'light':'dark',false);
// Hero
slot($('#profile'),C.profileImage,'Profile photo',false,true);
$('#stats').innerHTML=C.stats.map(s=>`<div class="rv"><b data-n="${s[0]}" data-s="${s[1]}">0${s[1]}</b><span>${s[2]}</span></div>`).join('');
// About highlights (all facts from the resume)
$('#hl').innerHTML=[["10+","Years in IT infrastructure and networking"],["200–4,500","Team members led during election operations"],["3","Bihar, Maharashtra, Jammu & Kashmir"],["PMP","IIM Ranchi, February 2026"]].map(h=>`<div class="hc rv rv-s"><b>${h[0]}</b><span>${h[1]}</span></div>`).join('');
// Experience
$('#tl').innerHTML=C.experience.map(e=>`<article class="job rv rv-l"><span class="dot"></span><div class="jc"><span class="pill">${e[2]}</span><h3>${e[1]}</h3><p>${e[0]}</p><button aria-expanded="false">Show responsibilities</button><div class="jb"><ul>${e[3].map(x=>`<li>${x}</li>`).join('')}</ul></div></div></article>`).join('');
document.querySelectorAll('.job button').forEach(b=>b.onclick=()=>{const j=b.closest('.job'),o=j.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Hide responsibilities':'Show responsibilities'});
// Skills
const IC=['<path d="M4 20V8m8 12V4m8 16v-9"/>','<circle cx="12" cy="12" r="3"/><path d="M12 3v4m0 10v4M3 12h4m10 0h4"/>','<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/>','<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.500-1-8-4-8-9V7z"/>'];
const cats=Object.keys(C.skills),tabs=$('#tabs');
function showCat(i){tabs.querySelectorAll('button').forEach((b,k)=>{b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});const s=$('#skills');s.classList.remove('sw');void s.offsetWidth;s.classList.add('sw');s.innerHTML=C.skills[cats[i]].map((x,k)=>`<div class="skc" style="--i:${k}"><svg viewBox="0 0 24 24">${IC[i]}</svg><span>${x}</span></div>`).join('')}
cats.forEach((c,i)=>{const b=document.createElement('button');b.setAttribute('role','tab');b.innerHTML=`<svg viewBox="0 0 24 24">${IC[i]}</svg>${c}`;b.onclick=()=>showCat(i);tabs.append(b)});showCat(0);
// Projects: 4 layout variants, each project separate, 4 image slots each
$('#proj').innerHTML=C.projects.map((p,i)=>`<article class="pr v${i%5}" id="proj-${i+1}"><span class="pn" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div class="info rv"><p class="lab">Case study ${String(i+1).padStart(2,"0")} / 10</p><h3>${p[0]}</h3><p class="org">${p[1]}</p><ul>${p[2].map(x=>`<li>${x}</li>`).join('')}</ul><p class="pnx">${i>0?`<a href="#proj-${i}" data-d="-1">← ${String(i).padStart(2,'0')}</a>`:'<span></span>'}${i<C.projects.length-1?`<a href="#proj-${i+2}" data-d="1">${String(i+2).padStart(2,'0')} →</a>`:'<span></span>'}</p></div><div class="gal">${[1,2,3,4].map(n=>`<div class="slot sq rv" data-p="${i+1}" data-n="${n}" data-cap="${String(n).padStart(2,"0")} / 04"></div>`).join('')}</div></article>`).join('');
document.querySelectorAll('.slot.sq').forEach(s=>{const p=+s.dataset.p,n=+s.dataset.n;lazy(s,C.projectImage(p,n),`${C.projects[p-1][0]} — photo ${n}`,true)});
// Certificates & awards
const cl=(id,arr,cls)=>{const el=$(id);el.innerHTML=arr.map(()=>`<div class="${cls} rv"><div class="slot doc"></div><div class="ci"><h3></h3><p></p></div></div>`).join('');[...el.children].forEach((c,i)=>{c.querySelector('h3').textContent=arr[i][0];c.querySelector('p').textContent=arr[i][1];lazy(c.querySelector('.slot'),arr[i][2],arr[i][0],true)})};
cl('#certs',C.certs,'cert rv-s');cl('#awards',C.awards,'award rv-r');
$('#edu').innerHTML=C.education.map(e=>`<div class="ed rv rv-l"><span class="yr">${e[1].split('·')[1].trim()}</span><i class="dot"></i><h3>${e[0]}</h3><p>${e[1].split('·')[0].trim()}</p><b>${e[2]}</b></div>`).join('');
$('#lb').onclick=e=>{if(e.target.closest('.lb-x')||!e.target.closest('img,button'))$('#lb').hidden=true;else if(e.target.closest('.lb-n'))lbShow((lbI+1)%lbItems.length,1);else if(e.target.closest('.lb-p'))lbShow((lbI-1+lbItems.length)%lbItems.length,-1)};
addEventListener('keydown',e=>{if($('#lb').hidden)return;if(e.key==='Escape')$('#lb').hidden=true;if(lbItems.length>1&&e.key==='ArrowRight')lbShow((lbI+1)%lbItems.length,1);if(lbItems.length>1&&e.key==='ArrowLeft')lbShow((lbI-1+lbItems.length)%lbItems.length,-1)});
// Resume
$('#resume').onclick=async e=>{if(location.protocol==='file:')return;try{const r=await fetch(C.resume,{method:'HEAD'});if(!r.ok)throw 0}catch(_){e.preventDefault();alert('Resume PDF not found. See README: assets/resume/')}};
document.querySelectorAll('.sec[data-n]').forEach(s=>{const w=s.querySelector('.wrap');if(w)w.dataset.n=s.dataset.n});
