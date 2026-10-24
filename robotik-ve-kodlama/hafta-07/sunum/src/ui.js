/* SİMÜLASYON ARAYÜZÜ: devre + sahne + zaman çizelgesi + pin tablosu + (isteğe bağlı) kod editörü ve derleyici konsolu */
(function(root){
var Sim={};
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
var COLS={red:'#FF6B6B',green:'#4CE07A',white:'#EAF6FF',yellow:'#FFD54F',blue:'#6CB6FF'};
var CHIPS={red:'#C62828',green:'#2E8540',white:'#7A8A99',yellow:'#9A7B00',blue:'#1A56B8'};

Sim.mount=function(id,cfg){
  var sec=$(id);if(!sec)return;
  var built=Ckt.circuit(id,{leds:cfg.leds,labels:cfg.labels});
  $(id+'-ckt').innerHTML=built.svg;
  var leds=built.leds;                                     /* pin sırasına göre */
  var pins=leds.map(function(l){return l.pin;});
  var scene=null;
  if(cfg.scene&&$(id+'-scene')){scene=Ckt.scenes[cfg.scene](id,cfg.map);$(id+'-scene').innerHTML=scene.svg;}
  var rows=leds.map(function(l){return{pin:l.pin,col:COLS[l.color]||'#fff'};});
  var tlW=cfg.tlW||640,win=cfg.win||10000,compact=leds.length>=4,rh=compact?34:52;
  if($(id+'-tl'))$(id+'-tl').innerHTML=Ckt.timelineSvg(id,rows,tlW,rh);
  var rt=null,running=false,speed=cfg.speed||1,raf=0,last=0,prog=null;

  function pinTable(){
    var el=$(id+'-pins');if(!el)return;
    if(compact){
      var hc='<div style="display:flex;flex-wrap:wrap;gap:8px">';
      leds.forEach(function(l,i){hc+='<span id="'+id+'-pb'+i+'" class="chip lo" style="font-family:var(--mono);font-size:18px">D'+l.pin+' · 0 V</span>';});
      el.innerHTML=hc+'</div><p id="'+id+'-now" class="mono" style="font-size:17px;color:#93A3B8;margin-top:8px;white-space:pre-wrap;line-height:1.35">Şu an: —</p>';return;}
    var h='<table class="pt"><tr><th>Pin</th><th>Mod</th><th>Gerilim</th><th>Akım</th><th>LED</th></tr>';
    leds.forEach(function(l,i){h+='<tr><td>D'+l.pin+'</td><td id="'+id+'-pm'+i+'">—</td><td id="'+id+'-pg'+i+'">0 V</td><td id="'+id+'-pa'+i+'">0,0 mA</td><td id="'+id+'-pl'+i+'"><span class="chip lo">söndü</span></td></tr>';});
    h+='</table><p id="'+id+'-now" class="mono" style="font-size:19px;color:#93A3B8;margin-top:8px;white-space:pre-wrap">Şu an: —</p>';
    el.innerHTML=h;}
  function render(levels){
    leds.forEach(function(l,i){
      var lv=levels[l.pin]||0;
      Ckt.setLevel(id,i,lv,l.pin);
      var c=Ckt.LEDC[l.color]||Ckt.LEDC.red,ma=lv*(5-c.vf)/220*1000;
      var pm=$(id+'-pm'+i);if(pm){var mode=rt.mode[l.pin];pm.textContent=mode==='OUTPUT'?'OUTPUT':(mode?'INPUT':'—');pm.style.color=mode==='OUTPUT'?'#9BE38B':'#FF8A80';}
      var pg=$(id+'-pg'+i);if(pg)pg.textContent=(lv>0.5?'5':'0')+' V';
      var pa=$(id+'-pa'+i);if(pa)pa.textContent=ma.toFixed(1).replace('.',',')+' mA';
      var pb=$(id+'-pb'+i);if(pb){var onb=lv>0.5;pb.textContent='D'+l.pin+' · '+(onb?'5':'0')+' V';pb.className='chip '+(onb?'hi':'lo');pb.style.background=onb?(CHIPS[l.color]||'#2E8540'):'';}
      var pl=$(id+'-pl'+i);if(pl){var on=lv>0.5;pl.innerHTML=on?'<span class="chip hi">yanıyor</span>':(lv>0.03?'<span class="chip lo">çok soluk</span>':'<span class="chip lo">söndü</span>');}});
    if(scene&&scene.update)scene.update(levels);
    if($(id+'-tl'))Ckt.timelineDraw(id,rows,rt,tlW,win,rh);
    var now=$(id+'-now');
    if(now){var c=rt.cur,tx='Şu an: '+(c?c.txt+'  (satır '+c.line+')':'—');
      if(c&&c.res&&c.res!==c.txt)tx+='\n→ '+c.res;
      if(c&&c.vars)tx+='   ['+c.vars+']';
      tx+='\nSanal süre: '+(rt.t/1000).toFixed(1).replace('.',',')+' sn · loop turu: '+rt.loopRuns;
      if(rt.stuck)tx+='\nDURDU: '+rt.stuck;
      now.textContent=tx;}
  }
  function load(p){
    prog=p;rt=new Engine.Runtime(p);
    if(scene&&scene.edge)rt.onEdge(scene.edge);
    if(scene&&scene.reset)scene.reset();}
  function frame(now){
    if(!running)return;
    var dt=Math.min(100,now-last)*speed;last=now;
    var lv=rt.advance(dt);render(lv);
    raf=requestAnimationFrame(frame);}
  function start(){if(running)return;running=true;last=performance.now();raf=requestAnimationFrame(frame);setBtn();}
  function pause(){running=false;cancelAnimationFrame(raf);setBtn();}
  function restart(){load(prog);var lv=rt.advance(0);render(lv);if(!running)start();}
  function setBtn(){var b=$(id+'-play');if(b){b.textContent=running?'⏸ Duraklat':'▶ Başlat';b.setAttribute('aria-pressed',running?'false':'false');}}

  var ctl=$(id+'-ctl');
  if(ctl){ctl.innerHTML='<div class="stp"><button type="button" class="go" id="'+id+'-play">⏸ Duraklat</button><button type="button" id="'+id+'-rst">↺ Başa döndür</button>'
    +'<span class="cnt" style="margin-left:8px">Hız:</span><button type="button" data-sp="1" class="sel">1×</button><button type="button" data-sp="2">2×</button><button type="button" data-sp="5">5×</button></div>';
    $(id+'-play').onclick=function(){running?pause():start();};
    $(id+'-rst').onclick=restart;
    [].forEach.call(ctl.querySelectorAll('[data-sp]'),function(b){b.onclick=function(){speed=+b.getAttribute('data-sp');
      [].forEach.call(ctl.querySelectorAll('[data-sp]'),function(x){x.classList.toggle('sel',x===b);});};});}
  pinTable();

  /* editör ve derleyici */
  var ed=$(id+'-ed'),con=$(id+'-con');
  function log(h){if(con)con.innerHTML=h;}
  function compileAndLoad(){
    var src=ed?ed.value:cfg.code,p=Engine.compile(src),h='<span class="dm">Derleniyor…</span>\n';
    if(p.errors.length){
      p.errors.forEach(function(e){h+='<span class="er">'+(e.line?'satır '+e.line+': ':'')+'error: '+esc(e.msg)+'</span>\n';});
      h+='<span class="er">Derleme hatası. Karttaki eski program çalışmaya devam eder.</span>';
      log(h);return false;}
    var w=[],an=Engine.analyze(p);
    an.warns.forEach(function(x){w.push(x);});
    if(an.stuck)w.push(an.stuck);
    Object.keys(an.written).forEach(function(pn){pn=+pn;
      if(pn<0||pn>13)return;
      if(pins.indexOf(pn)<0)w.push('D'+pn+' pinine devrede LED bağlı değil: bu pindeki değişim görünmez.');
      else if(!an.modes[pn])w.push('D'+pn+' için pinMode('+pn+', OUTPUT) yok: pin giriş modunda kalır, LED çok soluk yanar.');});
    pins.forEach(function(pn){if(!an.written[pn])w.push('D'+pn+' pinine hiç digitalWrite yazılmadı: LED hep sönük kalır.');});
    if(an.loopWrite&&!an.loopDelay)w.push('loop() içinde delay yok: pin saniyede binlerce kez değişir, LED yarı parlak görünür.');
    h+='<span>Derleme tamam. Karta yüklendi (simülasyon).</span>\n';
    w.forEach(function(x){h+='<span class="wr">uyarı: '+esc(x)+'</span>\n';});
    log(h);load(p);var lv=rt.advance(0);render(lv);start();return true;}
  if(ed){
    ed.value=cfg.code;
    ed.addEventListener('keydown',function(e){if(e.key==='Tab'){e.preventDefault();var s=ed.selectionStart,t=ed.selectionEnd;ed.value=ed.value.slice(0,s)+'  '+ed.value.slice(t);ed.selectionStart=ed.selectionEnd=s+2;}
      if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();compileAndLoad();}});
    var bt=$(id+'-btn');if(bt)bt.onclick=compileAndLoad;
    var rs=$(id+'-orig');if(rs)rs.onclick=function(){ed.value=cfg.code;compileAndLoad();};
    var sb=$(id+'-sol');if(sb&&cfg.solution)sb.onclick=function(){ed.value=cfg.solution;compileAndLoad();};}
  /* ilk yükleme: derleme hatası olsa bile (hata avı) eski çalışan program yerine boş program */
  var first=Engine.compile(cfg.code);
  if(first.errors.length){
    load(Engine.EMPTY);
    if(con){var h='<span class="dm">Derleniyor…</span>\n';first.errors.forEach(function(e){h+='<span class="er">'+(e.line?'satır '+e.line+': ':'')+'error: '+esc(e.msg)+'</span>\n';});log(h+'<span class="er">Derleme hatası: önce hataları düzelt.</span>');}}
  else{load(first);if(con&&ed)log('<span class="dm">Kod hazır. “Derle ve yükle” ile (veya Ctrl+Enter) karta yükle.</span>');}
  render(rt.advance(0));
  window.hooks[id]={enter:function(){setBtn();start();},leave:pause};
  Sim.list[id]={start:start,pause:pause,restart:restart};
};
Sim.list={};
root.Sim=Sim;
})(window);
