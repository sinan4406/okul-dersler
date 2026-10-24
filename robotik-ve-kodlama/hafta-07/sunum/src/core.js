/* ÇEKİRDEK: gezinme, notlar, cevap düğmeleri, adım kumandası, slayt giriş/çıkış kancaları */
(function(){
var stage=document.getElementById('stage'),vp=document.getElementById('viewport');
var slides=[].slice.call(stage.children).filter(function(n){return n.tagName==='SECTION'});
var cur=0,scale=1;
window.steppers={};window.hooks={};
function fit(){var w=vp.clientWidth,h=vp.clientHeight,s=Math.min(w/1920,h/1080);scale=s;
  stage.style.transform='translate('+((w-1920*s)/2)+'px,'+((h-1080*s)/2)+'px) scale('+s+')';}
function title(sec){var h=sec.querySelector('h1,h2');if(!h)return '';var c=h.cloneNode(true);c.querySelectorAll('br').forEach(function(b){b.replaceWith(' ')});return c.textContent.replace(/\s+/g,' ').trim();}
/* balonlar sahne kenarına taşmasın: konuma göre yukarı/aşağı, sola/sağa çevir */
window.placeTips=function(root){
  var sr=stage.getBoundingClientRect(),sc=scale||1;
  [].forEach.call((root||stage).querySelectorAll('.tip'),function(t){
    var r=t.getBoundingClientRect();if(!r.width&&!r.height)return;
    var x=(r.left-sr.left)/sc,y=(r.top-sr.top)/sc;
    t.classList.toggle('dn',y<330);
    t.classList.toggle('lf',x+540>1860);
  });
};
function go(n){n=Math.max(0,Math.min(slides.length-1,n));
  var prev=slides[cur];prev.classList.remove('active');
  var ph=window.hooks[prev.id];if(ph&&ph.leave&&prev!==slides[n]){try{ph.leave()}catch(e){console.error(e)}}
  cur=n;var s=slides[cur];s.classList.add('active');
  document.getElementById('count').textContent=(cur+1)+' / '+slides.length;
  document.getElementById('stitle').textContent=title(s);
  document.getElementById('prog').style.width=((cur+1)/slides.length*100)+'%';
  var a=s.querySelector('aside');document.getElementById('notestxt').textContent=a?a.textContent:'Bu slayt için not yok.';
  try{history.replaceState(null,'','#'+s.id)}catch(e){}
  var h=window.hooks[s.id];if(h&&h.enter){try{h.enter()}catch(e){console.error(e)}}
  window.placeTips(s);}
window.goTo=function(id){slides.forEach(function(s,i){if(s.id===id)go(i)})};
function next(){var st=window.steppers[slides[cur].id];if(st&&st.next())return;go(cur+1);}
function prevS(){var st=window.steppers[slides[cur].id];if(st&&st.prev())return;go(cur-1);}
document.getElementById('bnext').onclick=function(){go(cur+1)};
document.getElementById('bprev').onclick=function(){go(cur-1)};
function toggleNotes(){var n=document.getElementById('notes');n.hidden=!n.hidden;document.getElementById('bnotes').setAttribute('aria-pressed',String(!n.hidden));}
function full(){try{if(document.fullscreenElement)document.exitFullscreen();else{var p=document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();if(p&&p.catch)p.catch(function(){});}}catch(e){}}
document.getElementById('bnotes').onclick=toggleNotes;document.getElementById('bfull').onclick=full;
document.addEventListener('keydown',function(e){var t=e.target;
  if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable))return;
  if(t&&t.tagName==='BUTTON'&&(e.key===' '||e.key==='Enter'))return;
  if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();next();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prevS();}
  else if(e.key==='Home'){go(0);}else if(e.key==='End'){go(slides.length-1);}
  else if(e.key==='n'||e.key==='N'){toggleNotes();}else if(e.key==='f'||e.key==='F'){full();}});
/* cevap düğmeleri */
document.querySelectorAll('.ans-btn:not([data-all])').forEach(function(b){if(!b.getAttribute('data-on'))b.setAttribute('data-on',b.textContent);});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.ans-btn');if(!b)return;
  var sec=b.closest('section');
  if(b.hasAttribute('data-all')){var list=sec.querySelectorAll('.ans');var open=b.getAttribute('aria-pressed')!=='true';
    list.forEach(function(x){x.hidden=!open});
    sec.querySelectorAll('.ans-btn:not([data-all])').forEach(function(x){x.textContent=open?(x.getAttribute('data-off')||'Gizle'):(x.getAttribute('data-on')||'Cevabı göster')});
    b.setAttribute('aria-pressed',String(open));b.textContent=open?'Tüm cevapları gizle':'Tüm cevapları göster';return;}
  var tg=b.getAttribute('data-for')?document.getElementById(b.getAttribute('data-for')):b.nextElementSibling;
  if(!tg)return;tg.hidden=!tg.hidden;
  if(!b.getAttribute('data-on'))b.setAttribute('data-on',b.textContent);
  b.textContent=tg.hidden?b.getAttribute('data-on'):(b.getAttribute('data-off')||'Gizle');});
/* genel adım kumandası: id, adımlar[], çiz(adım, indeks) */
window.makeStepper=function(id,steps,render){var sec=document.getElementById(id);if(!sec)return;var k=0,timer=null;
  var cnt=sec.querySelector('.stp .cnt'),auto=sec.querySelector('[data-act="auto"]');
  function draw(){render(steps[k],k);if(cnt)cnt.textContent='Adım '+(k+1)+' / '+steps.length;}
  function stop(){if(timer){clearInterval(timer);timer=null;if(auto){auto.setAttribute('aria-pressed','false');auto.textContent='Otomatik oynat';}}}
  var api={next:function(){if(k<steps.length-1){k++;draw();return true}return false},prev:function(){if(k>0){k--;draw();return true}return false},
    goto:function(i){k=Math.max(0,Math.min(steps.length-1,i));draw();},stop:stop,index:function(){return k}};
  sec.querySelectorAll('.stp [data-act]').forEach(function(btn){btn.addEventListener('click',function(){var a=btn.getAttribute('data-act');
    if(a==='next'){stop();api.next();}else if(a==='prev'){stop();api.prev();}else if(a==='first'){stop();k=0;draw();}
    else if(a==='auto'){if(timer){stop();}else{if(k>=steps.length-1){k=0;draw();}btn.setAttribute('aria-pressed','true');btn.textContent='Durdur';
      timer=setInterval(function(){if(!api.next())stop();},3000);}}});});
  window.steppers[id]=api;draw();
  var hk=window.hooks[id]||(window.hooks[id]={});var old=hk.leave;hk.leave=function(){stop();if(old)old();};
  return api;};
window.addEventListener('resize',function(){fit();window.placeTips();});
fit();
var h=(location.hash||'').slice(1),start=0;slides.forEach(function(s,i){if(s.id===h)start=i});
window.__boot=function(){slides.forEach(function(s){s.classList.remove('active')});slides[0].classList.add('active');go(start);window.__deckReady=true;};
})();
