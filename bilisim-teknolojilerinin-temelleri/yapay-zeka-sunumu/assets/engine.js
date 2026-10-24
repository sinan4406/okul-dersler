(function(){
var stage=document.getElementById('stage'),vp=document.getElementById('viewport');
var slides=[].slice.call(stage.children).filter(function(n){return n.tagName==='SECTION'});
var cur=0;window.steppers={};window.__slides=slides;
function fit(){var w=vp.clientWidth,h=vp.clientHeight,s=Math.min(w/1920,h/1080);
  stage.style.transform='translate('+((w-1920*s)/2)+'px,'+((h-1080*s)/2)+'px) scale('+s+')';}
function title(sec){var d=sec.getAttribute('data-title');if(d)return d;var h=sec.querySelector('h1,h2');if(!h)return '';var c=h.cloneNode(true);c.querySelectorAll('br').forEach(function(b){b.replaceWith(' ')});return c.textContent.replace(/\s+/g,' ').trim();}
function go(n){n=Math.max(0,Math.min(slides.length-1,n));slides[cur].classList.remove('active');cur=n;var s=slides[cur];s.classList.add('active');
  document.getElementById('count').textContent=(cur+1)+' / '+slides.length;
  document.getElementById('stitle').textContent=title(s);
  document.getElementById('prog').style.width=((cur+1)/slides.length*100)+'%';
  var a=s.querySelector('aside');document.getElementById('notestxt').textContent=a?a.textContent:'Bu slayt için not yok.';
  try{history.replaceState(null,'','#'+s.id)}catch(e){}}
window.__go=go;
function next(){var st=window.steppers[slides[cur].id];if(st&&st.next())return;go(cur+1);}
function prev(){var st=window.steppers[slides[cur].id];if(st&&st.prev())return;go(cur-1);}
document.getElementById('bnext').onclick=function(){go(cur+1)};
document.getElementById('bprev').onclick=function(){go(cur-1)};
function toggleNotes(){var n=document.getElementById('notes');n.hidden=!n.hidden;document.getElementById('bnotes').setAttribute('aria-pressed',String(!n.hidden));}
function full(){try{if(document.fullscreenElement)document.exitFullscreen();else{var p=document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();if(p&&p.catch)p.catch(function(){});}}catch(e){}}
document.getElementById('bnotes').onclick=toggleNotes;document.getElementById('bfull').onclick=full;
document.addEventListener('keydown',function(e){var t=e.target,tn=t&&t.tagName;if(tn==='INPUT'||tn==='TEXTAREA'||tn==='SELECT')return;
  if(tn==='BUTTON'&&(e.key===' '||e.key==='Enter'))return;
  if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();next();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prev();}
  else if(e.key==='Home'){go(0);}else if(e.key==='End'){go(slides.length-1);}
  else if(e.key==='n'||e.key==='N'){toggleNotes();}else if(e.key==='f'||e.key==='F'){full();}});

/* cevap düğmeleri */
document.querySelectorAll('.ans-btn:not([data-all])').forEach(function(b){if(!b.getAttribute('data-on'))b.setAttribute('data-on',b.textContent);});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.ans-btn');if(!b)return;
  var sec=b.closest('section');
  if(b.hasAttribute('data-all')){var list=sec.querySelectorAll('.ans');var open=b.getAttribute('aria-pressed')!=='true';
    list.forEach(function(x){x.hidden=!open});sec.querySelectorAll('.ans-btn:not([data-all])').forEach(function(x){x.textContent=open?(x.getAttribute('data-off')||'Gizle'):(x.getAttribute('data-on')||'Cevabı göster')});
    b.setAttribute('aria-pressed',String(open));b.textContent=open?'Tüm cevapları gizle':'Tüm cevapları göster';return;}
  var tg=b.getAttribute('data-for')?document.getElementById(b.getAttribute('data-for')):b.nextElementSibling;
  if(!tg)return;tg.hidden=!tg.hidden;
  if(!b.getAttribute('data-on'))b.setAttribute('data-on',b.textContent);
  b.textContent=tg.hidden?b.getAttribute('data-on'):(b.getAttribute('data-off')||'Gizle');});

/* sekmeler: [data-tabs] içinde .tb[data-tab] ve .tp[data-pane] */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.tb[data-tab]');if(!b)return;
  var g=b.closest('[data-tabs]');if(!g)return;var id=b.getAttribute('data-tab');
  g.querySelectorAll('.tb[data-tab]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
  g.querySelectorAll('.tp[data-pane]').forEach(function(p){p.hidden=p.getAttribute('data-pane')!==id});});
document.querySelectorAll('[data-tabs]').forEach(function(g){var f=g.querySelector('.tb[data-tab]');if(f)f.click();});

/* sınıflandırma etkinliği: .cls > .crow[data-right] > .opt[data-v]; .cls-check, .cls-reset */
document.addEventListener('click',function(e){
  var o=e.target.closest&&e.target.closest('.cls .opt');
  if(o){var row=o.closest('.crow');if(row.hasAttribute('data-done'))return;row.querySelectorAll('.opt').forEach(function(x){x.setAttribute('aria-pressed',String(x===o))});return;}
  var c=e.target.closest&&e.target.closest('.cls-check');
  if(c){var cls=c.closest('.cls'),ok=0,n=0;cls.querySelectorAll('.crow').forEach(function(r){n++;r.setAttribute('data-done','1');var rt=r.getAttribute('data-right');
    r.querySelectorAll('.opt').forEach(function(x){var sel=x.getAttribute('aria-pressed')==='true',isR=x.getAttribute('data-v')===rt;
      x.classList.remove('right','wrong');if(isR)x.classList.add('right');else if(sel)x.classList.add('wrong');if(sel&&isR)ok++;});
    var ex=r.querySelector('.why');if(ex)ex.hidden=false;});
    var sc=cls.querySelector('.cls-score');if(sc)sc.textContent=ok+' / '+n+' doğru';return;}
  var rs=e.target.closest&&e.target.closest('.cls-reset');
  if(rs){var cl=rs.closest('.cls');cl.querySelectorAll('.crow').forEach(function(r){r.removeAttribute('data-done');r.querySelectorAll('.opt').forEach(function(x){x.classList.remove('right','wrong');x.setAttribute('aria-pressed','false')});var ex=r.querySelector('.why');if(ex)ex.hidden=true;});
    var sc2=cl.querySelector('.cls-score');if(sc2)sc2.textContent='';}
});

/* kopyala */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-copy]');if(!b)return;
  var el=document.getElementById(b.getAttribute('data-copy'));if(!el)return;var txt=el.value!==undefined&&el.tagName==='TEXTAREA'?el.value:el.textContent;
  var old=b.textContent;function done(){b.textContent='Kopyalandı';setTimeout(function(){b.textContent=old},1500);}
  try{navigator.clipboard.writeText(txt).then(done,function(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Metin seçildi: Ctrl+C';});}catch(x){b.textContent='Metni seçip Ctrl+C';}});

/* geri sayım: .timer[data-sec] içinde .t-val ve .t-go */
document.querySelectorAll('.timer').forEach(function(t){var sec=+t.getAttribute('data-sec')||60,left=sec,iv=null,v=t.querySelector('.t-val'),g=t.querySelector('.t-go');
  function show(){var m=Math.floor(left/60),s=left%60;v.textContent=m+':'+(s<10?'0':'')+s;}
  show();g.addEventListener('click',function(){if(iv){clearInterval(iv);iv=null;left=sec;show();g.textContent='Başlat';return;}
    g.textContent='Sıfırla';iv=setInterval(function(){left--;show();if(left<=0){clearInterval(iv);iv=null;g.textContent='Süre doldu · Tekrar';left=sec;}},1000);});});

/* adım adım animasyon: id, steps[], render(step,index) */
window.makeStepper=function(id,steps,render){var sec=document.getElementById(id);if(!sec)return;var k=0,timer=null;
  var cnt=sec.querySelector('.stp .cnt'),auto=sec.querySelector('[data-act="auto"]');
  function draw(){render(steps[k],k);if(cnt)cnt.textContent='Adım '+(k+1)+' / '+steps.length;}
  function stop(){if(timer){clearInterval(timer);timer=null;if(auto){auto.setAttribute('aria-pressed','false');auto.textContent='Otomatik oynat';}}}
  var api={next:function(){if(k<steps.length-1){k++;draw();return true}return false},prev:function(){if(k>0){k--;draw();return true}return false}};
  sec.querySelectorAll('.stp [data-act]').forEach(function(btn){btn.addEventListener('click',function(){var a=btn.getAttribute('data-act');
    if(a==='next'){stop();api.next();}else if(a==='prev'){stop();api.prev();}else if(a==='first'){stop();k=0;draw();}
    else if(a==='auto'){if(timer){stop();}else{if(k>=steps.length-1){k=0;draw();}btn.setAttribute('aria-pressed','true');btn.textContent='Durdur';
      timer=setInterval(function(){if(!api.next())stop();},3000);}}});});
  window.steppers[id]=api;draw();};
window.addEventListener('resize',fit);
fit();
var h=(location.hash||'').slice(1),start=0;slides.forEach(function(s,i){if(s.id===h)start=i});
slides.forEach(function(s){s.classList.remove('active')});slides[0].classList.add('active');go(start);
window.__deckReady=true;document.dispatchEvent(new Event('deckready'));
})();
