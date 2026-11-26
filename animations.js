const reduce=window.__reduce===true,Q=s=>document.querySelector(s);
// ---- Cinematic intro: HTML is in the document, covered by inline CSS before first paint. The timeline starts only after
//      (a) fonts are ready or 1.4 s have passed, and (b) two animation frames, i.e. after the overlay has actually painted. ----
const docEl=document.documentElement,INTRO_HTML=Q('#intro')?Q('#intro').outerHTML:'';let introTimer=0;
function openCurtain(){const intro=Q('#intro');if(!intro||intro.classList.contains('open'))return;clearTimeout(introTimer);intro.classList.add('open');docEl.classList.add('hero-in');scrollTo({top:0,behavior:'instant'});
setTimeout(()=>{docEl.classList.remove('intro-on');scrollTo({top:0,behavior:'instant'});intro.remove()},1500)}
function fontsReady(){return new Promise(res=>{let d=0;const go=()=>{if(!d){d=1;res()}};setTimeout(go,1400);const gf=document.getElementById('gf');const after=()=>{(document.fonts&&document.fonts.load?document.fonts.load('700 1em "Space Grotesk"'):Promise.resolve()).then(go,go)};if(!gf||window.__gf)after();else{gf.addEventListener('load',after);gf.addEventListener('error',go)}})}
function runIntro(){const intro=Q('#intro');if(!intro)return;scrollTo({top:0,behavior:'instant'});Q('#skip').onclick=openCurtain;
fontsReady().then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!intro.isConnected)return;intro.classList.add('run');introTimer=setTimeout(openCurtain,7400)})))}
function replayIntro(){if(Q('#intro'))return;docEl.classList.remove('hero-in');docEl.classList.add('intro-on');document.body.insertAdjacentHTML('afterbegin',INTRO_HTML);scrollTo({top:0,behavior:'instant'});runIntro()}
if(Q('#intro'))runIntro();else{docEl.classList.remove('intro-on');docEl.classList.add('hero-in')}
// ---- Nav, progress, back-to-top ----
const secs=[...document.querySelectorAll('main .sec')],SPINE=[['home','Home'],['about','About'],['experience','Experience'],['expertise','Expertise'],['projects','Projects'],['achievements','Achievements'],['recognition','Awards'],['education','Education'],['contact','Contact']],nav=Q('#nav'),bar=Q('#bar'),btt=Q('#top'),tl=Q('#tl'),cue=Q('#cue'),hero=Q('#home');
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.classList.toggle('solid',y>40);cue.classList.toggle('gone',y>hero.offsetHeight*.3);btt.style.setProperty('--tp',(h>0?y/h:0).toFixed(4));if(!reduce&&y<hero.offsetHeight*1.2)docEl.style.setProperty('--sy',y);const rs=secs.map(s=>s.getBoundingClientRect());if(!reduce)secs.forEach((s,i)=>s.style.setProperty('--p',((rs[i].top+rs[i].height/2-innerHeight/2)/innerHeight).toFixed(3)));updateSpine(rs);scrub();const r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(1,(innerHeight*.6-r.top)/r.height))*100+'%')}
let tick=false;addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(()=>{onScroll();tick=false})}},{passive:true});btt.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});
Q('#burger').onclick=()=>Q('#menu').classList.toggle('open');Q('#menu').onclick=()=>Q('#menu').classList.remove('open');
// ---- Scroll text animation: split headings into words ----
document.querySelectorAll('.sp').forEach(h=>{h.innerHTML=h.innerHTML.trim().split(/\s+/).map((w,i)=>`<span class="w"><span style="transition-delay:${i*60}ms">${w}</span></span>`).join(' ')});
// ---- Reveals + count-up ----
function count(b){const n=+b.dataset.n,s=b.dataset.s;if(reduce){b.textContent=n.toLocaleString()+s;return}let t0;const f=t=>{t0=t0||t;const k=Math.min((t-t0)/1500,1),e=1-Math.pow(1-k,3);b.textContent=Math.round(n*e).toLocaleString()+s;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');const b=e.target.querySelector('[data-n]');if(b)count(b);io.unobserve(e.target)}),{threshold:.15});
document.querySelectorAll('.rv,.sp,.dl').forEach(el=>io.observe(el));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+({recognition:'achievements',numbers:'home'}[e.target.id]||e.target.id)))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section').forEach(s=>so.observe(s));

// Safety: never leave content hidden if the observer is unsupported or slow
if(!('IntersectionObserver' in window))document.querySelectorAll('.rv,.sp,.sq').forEach(e=>e.classList.add('in'));
setTimeout(()=>document.querySelectorAll('.rv:not(.in),.sp:not(.in),.dl:not(.in)').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')}),2500);

// Section hand-offs: blend from the previous section's end colour (re-run when the theme changes)
function setPrev(){const s=[...document.querySelectorAll('main section')];s.forEach((el,i)=>{if(i)el.style.setProperty('--prev',getComputedStyle(s[i-1]).getPropertyValue('--s1').trim())})}
setPrev();addEventListener('themechange',setPrev);
Q('#replay').onclick=replayIntro;

// Scroll cue: scrolls to the real next section, offset by the nav height
cue.addEventListener('click',e=>{e.preventDefault();const t=hero.nextElementSibling;scrollTo({top:t.getBoundingClientRect().top+scrollY-76,behavior:reduce?'auto':'smooth'})});

// ---- Portrait: layered depth. Pointer-follow only on fine pointers and when motion is allowed; touch/reduced-motion keep it static. ----
(function(){const pw=Q('#portrait'),fr=pw&&pw.querySelector('.frame');if(!fr||reduce||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;let raf=0,ev=null;
const set=(x,y)=>{pw.style.setProperty('--px',x);pw.style.setProperty('--py',y)};
pw.addEventListener('pointerenter',()=>pw.classList.add('is-hover'));
pw.addEventListener('pointermove',e=>{ev=e;if(!raf)raf=requestAnimationFrame(()=>{raf=0;if(!pw.classList.contains('is-hover'))return;const r=pw.getBoundingClientRect();set((((ev.clientX-r.left)/r.width)*2-1).toFixed(3),(((ev.clientY-r.top)/r.height)*2-1).toFixed(3))})});
pw.addEventListener('pointerleave',()=>{pw.classList.remove('is-hover');set(0,0)})})();


// Project navigation: numbered index that follows the case study in view (wide screens only)
(function(){const pr=[...document.querySelectorAll('.pr')],sec=Q('#projects');if(!pr.length||!sec)return;const nv=document.createElement('nav');nv.id='pnav';nv.setAttribute('aria-label','Projects index');
nv.innerHTML=pr.map((p,i)=>`<a href="#${p.id}" aria-label="Project ${i+1}"><b>${String(i+1).padStart(2,'0')}</b></a>`).join('');document.body.appendChild(nv);
nv.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();const t=Q(a.getAttribute('href'));scrollTo({top:t.getBoundingClientRect().top+scrollY-90,behavior:reduce?'auto':'smooth'})});
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){nv.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));pr.forEach(p=>p.classList.toggle('cur',p===e.target))}}),{rootMargin:'-40% 0px -50% 0px'});pr.forEach(p=>io2.observe(p));
new IntersectionObserver(es=>es.forEach(e=>nv.classList.toggle('show',e.isIntersecting)),{rootMargin:'-30% 0px -30% 0px'}).observe(sec)})();

// ---- Scroll progress spine: a vertical map of the whole experience (wide screens). Visitors keep full control of scrolling. ----
const spine=document.createElement('nav');spine.id='spine';spine.setAttribute('aria-label','Page sections');
spine.innerHTML='<i class="sp-fill"></i>'+SPINE.map(([id,l])=>{const k=secs.findIndex(s=>s.id===id)/(secs.length-1);return `<a href="#${id}" data-l="${l}" aria-label="${l}" style="--k:${k.toFixed(4)}"></a>`}).join('');document.body.appendChild(spine);
function updateSpine(rs){const c=innerHeight/2;let i=0;rs.forEach((r,k)=>{if(r.top<=c)i=k});const fr=Math.max(0,Math.min(1,(c-rs[i].top)/rs[i].height));spine.style.setProperty('--f',Math.min(1,(i+fr)/(secs.length-1)).toFixed(4));const cur=secs[i].id==='numbers'?'home':secs[i].id;spine.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur))}
spine.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();const t=Q(a.getAttribute('href'));scrollTo({top:a.getAttribute('href')==='#home'?0:t.getBoundingClientRect().top+scrollY-70,behavior:reduce?'auto':'smooth'})});
updateSpine(secs.map(s=>s.getBoundingClientRect()));
// ---- Sliding navigation marker ----
(function(){const m=Q('#menu'),mk=document.createElement('i');mk.className='mk';m.append(mk);function place(){const a=m.querySelector('a.on');if(!a||!m.offsetWidth){mk.style.opacity=0;return}mk.style.opacity=1;mk.style.width=a.offsetWidth+'px';mk.style.transform='translateX('+a.offsetLeft+'px)'}
new MutationObserver(place).observe(m,{subtree:true,attributes:true,attributeFilter:['class']});addEventListener('resize',place);addEventListener('load',place);place()})();
// ---- Scroll-scrubbed typography: the biography lights up word by word as it passes through the viewport ----
const dc=Q('.abt .dc'),sw=[];let lit=-1;
if(dc){dc.innerHTML=dc.textContent.trim().split(/\s+/).map(w=>`<span class="sw">${w}</span>`).join(' ');dc.querySelectorAll('.sw').forEach(x=>sw.push(x));if(reduce)dc.classList.add('all')}
function scrub(){if(!sw.length||reduce)return;const r=dc.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.82-r.top)/(r.height+innerHeight*.25))),n=Math.round(p*sw.length);if(n===lit)return;sw.forEach((x,i)=>x.classList.toggle('lit',i<n));lit=n}
scrub();

onScroll();

// ---- Section lighting only runs while its section is on screen (keeps continuous animation to a minimum) ----
const liveIO=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('live',e.isIntersecting)),{rootMargin:'0px'});document.querySelectorAll('#home,#contact').forEach(s=>liveIO.observe(s));
// ---- Project prev / next links glide to the neighbouring case study ----
document.addEventListener('click',e=>{const l=e.target.closest('.pnx a');if(!l)return;e.preventDefault();const t=Q(l.getAttribute('href'));if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-90,behavior:reduce?'auto':'smooth'})});
// ---- Animated section numbering: the eyebrow number counts up when its label arrives ----
const labIO=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;labIO.unobserve(e.target);const b=e.target.querySelector('b');if(!b||reduce)return;const n=parseInt(b.textContent,10);if(!(n>0))return;const t0=performance.now();b.textContent='00';(function f(t){const k=Math.min((t-t0)/800,1);b.textContent=String(Math.round(n*(1-Math.pow(1-k,3)))).padStart(2,'0');if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});document.querySelectorAll('.lab').forEach(l=>labIO.observe(l));
