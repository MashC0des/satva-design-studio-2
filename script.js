const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollSpan=$('.scroll-line span');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight; if(scrollSpan) scrollSpan.style.height=`${m?scrollY/m*100:0}%`},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(e=>io.observe(e));
const fine=matchMedia('(pointer:fine)').matches;
if(fine){
 const dot=$('.cursor-dot'), ring=$('.cursor-ring'); let rx=0,ry=0,tx=0,ty=0;
 addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;dot.style.left=tx+'px';dot.style.top=ty+'px';});
 const loop=()=>{rx+=(tx-rx)*.16;ry+=(ty-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)};loop();
 $$('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1200px) rotateX(${y*-2.8}deg) rotateY(${x*3.5}deg) translateY(-3px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
 $$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.08}px,${(e.clientY-(r.top+r.height/2))*.08}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
}
const toggle=$('.nav-toggle'),nav=$('.main-nav');toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{$$('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('[data-category]').forEach(el=>el.classList.toggle('is-hidden',f!=='all'&&el.dataset.category!==f))}));
const serviceImg=$('#servicePreview'); $$('.service-row').forEach(row=>row.addEventListener('mouseenter',()=>{if(serviceImg)serviceImg.src=row.dataset.image}));
$('#year').textContent=new Date().getFullYear();
