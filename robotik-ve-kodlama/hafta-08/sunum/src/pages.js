/* SLAYTA ÖZEL ETKİLEŞİMLER (8. hafta) */
(function(){
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function setOp(id,v){var e=$(id);if(e)e.setAttribute('opacity',v);}

/* ---------- kod renklendirme + balonlar ---------- */
var VARS=['solKirmizi','sagKirmizi','kgKirmizi','kgSari','kgYesil','dbKirmizi','dbSari','dbYesil','kirmizi','sari','yesil','ak','as','ay','yk','yy'];
var TIPS={
 'void':'void: “değer döndürmez” demektir. setup ve loop birer görev gibidir.',
 'int':'int: tam sayı saklayan değişken türü. Bu hafta pin numarasını saklar. Örnek: int kirmizi = 2; → kirmizi, 2 demektir.',
 'var':'Değişken adı: pin numarasının yerine geçen isim. Örnek: kirmizi yazınca 2 okunur, yani D2 pini.',
 'setup':'setup(): kart açılınca yalnızca bir kez çalışır. Hazırlık işleri buraya yazılır.',
 'loop':'loop(): setup bitince başlar, sürekli baştan tekrarlanır.',
 'pinMode':'pinMode(pin, mod): pinin giriş mi çıkış mı olacağını söyler. Örnek: pinMode(kirmizi, OUTPUT);',
 'digitalWrite':'digitalWrite(pin, değer): pini 5 V (HIGH) veya 0 V (LOW) yapar.',
 'delay':'delay(ms): programı o kadar milisaniye bekletir. 4000 ms = 4 saniye.',
 'OUTPUT':'OUTPUT: çıkış modu. Kart pinden akım verir.',
 'INPUT':'INPUT: giriş modu. Kart pindeki gerilimi okur.',
 'HIGH':'HIGH: 5 V, yani “açık”.',
 'LOW':'LOW: 0 V, yani “kapalı”.'};
var KW={void:1,int:1,OUTPUT:1,INPUT:1,HIGH:1,LOW:1,for:1};
var RE=new RegExp('\\b(void|int|for|setup|loop|pinMode|digitalWrite|delay|OUTPUT|INPUT|HIGH|LOW|'+VARS.join('|')+'|i)\\b(\\+\\+|--)?|(&lt;=|&gt;=|&lt;|&gt;)|\\b(\\d+)\\b','g');
function colorCode(s,notip){
  return esc(s).replace(RE,function(m,w,inc,cmp,n){
    if(n)return '<span class="n">'+n+'</span>';
    if(cmp)return '<span class="k">'+cmp+'</span>';
    var key=w+(inc||''),isVar=VARS.indexOf(w)>=0,cls=isVar?'v':(w==='i'?'n':(KW[w]?'k':'t'));
    if(notip||(w==='i')||(!TIPS[w]&&!isVar))return '<span class="'+cls+'">'+key+'</span>';
    return '<span class="'+cls+' tip" tabindex="0" data-tip="'+esc(isVar?TIPS.var:TIPS[w])+'">'+key+'</span>';});}
function splitLine(l){var i=l.indexOf('//');if(i<0)return{code:l,cm:''};return{code:l.slice(0,i).replace(/\s+$/,''),cm:l.slice(i)};}

/* ---------- oylama ---------- */
(function(){var sec=$('dikkat');if(!sec)return;var btns=sec.querySelectorAll('[data-vote]'),cnt=[0,0,0];
 function draw(){var tot=cnt[0]+cnt[1]+cnt[2];btns.forEach(function(b,i){b.querySelector('.cn').textContent=cnt[i];b.querySelector('.bar').style.width=(tot?cnt[i]/tot*260:0)+'px';});}
 btns.forEach(function(b){b.addEventListener('click',function(){cnt[+b.getAttribute('data-vote')]++;draw();});});})();

/* ---------- dijital: HIGH / LOW ---------- */
(function(){
 if(!$('dj-svg'))return;
 var hist=[],N=100,st=0,timer=null;
 function wave(){var d='';hist.forEach(function(v,i){var x=(90+i*900/N).toFixed(1),y=v?50:190;if(!i)d='M'+x+' '+y;else{var py=hist[i-1]?50:190;if(py!==y)d+=' L'+x+' '+py;d+=' L'+x+' '+y;}});
  $('dj-wave').setAttribute('d',d||'M90 190 L990 190');}
 function paint(){
  setOp('dj-glow',st?0.95:0);setOp('dj-led',st?0.85:0);
  $('dj-flow').style.display=st?'':'none';
  var v=$('dj-volt');v.textContent=st?'5 V':'0 V';v.setAttribute('fill',st?'#9BE38B':'#93A3B8');
  $('dj-t').textContent=st?'HIGH: 5 V':'LOW: 0 V';
  $('dj-x').textContent=st?'Pin 5 V verir. Akım D2 → direnç → LED → GND yolunu izler, LED yanar.':'Pin 0 V verir. İki uç arasında gerilim farkı yok: akım akmaz, LED söner.';
  $('dj-hi').classList.toggle('sel',!!st);$('dj-lo').classList.toggle('sel',!st);$('dj-lo').classList.toggle('lo',!st);$('dj-hi').classList.remove('lo');}
 function tick(){hist.push(st);if(hist.length>N)hist.shift();wave();}
 function set(v){st=v;paint();}
 $('dj-hi').onclick=function(){set(1);};$('dj-lo').onclick=function(){set(0);};
 for(var i=0;i<N;i++)hist.push(0);paint();wave();
 window.hooks['dijital']={enter:function(){if(!timer)timer=setInterval(tick,120);},leave:function(){if(timer){clearInterval(timer);timer=null;}}};
})();

/* ---------- pin haritası ---------- */
(function(){
 var g=$('pm-grid');if(!g)return;
 var PW={3:1,5:1,6:1,9:1,10:1,11:1};
 var INFO=[
  ['D0 · RX','Bilgisayardan veri alır (seri haberleşme, USB). LED bağlama: program yüklemede sorun çıkabilir.'],
  ['D1 · TX','Bilgisayara veri gönderir (seri haberleşme). LED bağlama.'],
  ['D2','Genel amaçlı pin. Bu hafta: trafik lambası kırmızı, demiryolu yeşil, kavşak KG kırmızı.'],
  ['D3 ~','Genel amaçlı pin (~ analog benzeri çıkış da verebilir, ileride). Bu hafta: sarı LED.'],
  ['D4','Genel amaçlı pin. Bu hafta: yeşil LED (trafik lambası, kavşak KG).'],
  ['D5 ~','Genel amaçlı pin. Bu hafta: yaya kırmızı ya da kavşak DB kırmızı.'],
  ['D6 ~','Genel amaçlı pin. Bu hafta: yaya yeşil ya da kavşak DB sarı.'],
  ['D7','Genel amaçlı pin. Bu hafta: kavşak DB yeşil. Giriş (INPUT) örneğinde de kullanılacak.'],
  ['D8','Genel amaçlı pin. Önceki hafta D8 kullandık.'],
  ['D9 ~','Genel amaçlı pin, analog benzeri çıkış destekler (ileride).'],
  ['D10 ~','Genel amaçlı pin, analog benzeri çıkış destekler (ileride).'],
  ['D11 ~','Genel amaçlı pin, analog benzeri çıkış destekler (ileride).'],
  ['D12','Genel amaçlı pin.'],
  ['D13','Genel amaçlı pin. Kart üzerindeki “L” yazan yerleşik LED bu pine bağlıdır (Blink uygulaması).']];
 var h='';
 for(var p=0;p<14;p++){var cls='pbtn'+(p<2?' rx':'')+(p>=2&&p<=7?' use':'');
  h+='<button type="button" class="'+cls+'" data-p="'+p+'">D'+p+'<small>'+(p===0?'RX':p===1?'TX':PW[p]?'~':p===13?'L':'')+'</small></button>';}
 g.innerHTML=h;
 var bs=[].slice.call(g.querySelectorAll('.pbtn'));
 function sel(p){bs.forEach(function(b){b.classList.toggle('sel',+b.getAttribute('data-p')===p);});$('pm-t').textContent=INFO[p][0];$('pm-x').textContent=INFO[p][1];}
 bs.forEach(function(b){b.addEventListener('click',function(){sel(+b.getAttribute('data-p'));});});
})();

/* ---------- giriş / çıkış animasyonu ---------- */
(function(){var b=$('gc-play'),sec=$('giris-cikis');if(!b)return;var on=true;
 b.onclick=function(){on=!on;sec.classList.toggle('paused',!on);b.textContent=on?'Animasyonu durdur':'Animasyonu başlat';};})();

/* ---------- şema çizimi ---------- */
(function(){
 if(!$('sch-g0'))return;
 var S=[
  {t:'Arduino kutusu',x:'Arduino bir kutu olarak çizilir. Kullanacağımız pinler etiketli: D2, D3, D4 ve GND.',on:[]},
  {t:'1 · D2 → direnç',x:'D2 pininden bir hat çıkar ve 220 Ω direnç sembolüne (zikzak) girer. Direnç akımı sınırlar.',on:['sch-g0']},
  {t:'2 · LED sembolü',x:'Direncin ucu LED’in anoduna (üçgenin taban tarafı) bağlanır. Akım üçgenin gösterdiği yöne akar.',on:['sch-g0','sch-l0']},
  {t:'3 · GND hattı',x:'LED’in katodundan çıkan hat aşağı iner ve Arduino GND’sine döner. Akım halkası kapandı. Topraklama sembolü GND’yi gösterir.',on:['sch-g0','sch-l0','sch-gnd']},
  {t:'4 · D3 kolu (sarı)',x:'Aynı kalıp: D3 → direnç → sarı LED → ortak GND hattı. Nokta, hattın birleştiği yeri gösterir.',on:['sch-g0','sch-l0','sch-gnd','sch-g1']},
  {t:'5 · D4 kolu (yeşil)',x:'Üçüncü kol: D4 → direnç → yeşil LED. Üç LED de aynı GND hattını paylaşır.',on:['sch-g0','sch-l0','sch-gnd','sch-g1','sch-g2']},
  {t:'6 · Akım yönü',x:'D2 HIGH olunca akım sarı akıştaki yolu izler: D2 → direnç → LED → GND. Şema hem kablolamayı hem de akımın yolunu gösterir.',on:['sch-g0','sch-l0','sch-gnd','sch-g1','sch-g2','sch-flow']}];
 var all=['sch-g0','sch-l0','sch-gnd','sch-g1','sch-g2','sch-flow'];
 /* sch-g1 ve sch-g2 içinde LED de var */
 function render(s){all.forEach(function(id){var e=$(id);if(e)e.style.display=s.on.indexOf(id)>=0?'':'none';});
  $('sch-t').textContent=s.t;$('sch-x').textContent=s.x;}
 window.makeStepper('sema',S,render);
})();

/* ---------- trafik aşamaları ---------- */
(function(){
 if(!$('fz-k'))return;
 var S=[
  {t:'Aşama 1 · DUR',x:'Yalnız kırmızı yanar. Araçlar bekler. 4 saniye.',l:[1,0,0]},
  {t:'Aşama 2 · HAZIR OL',x:'Kırmızı yanık kalır, sarı da yanar. Araçlar hareket etmeye hazırlanır. 1 saniye.',l:[1,1,0]},
  {t:'Aşama 3 · GEÇ',x:'Kırmızı ve sarı söner, yeşil yanar. Araçlar geçer. 4 saniye.',l:[0,0,1]},
  {t:'Aşama 4 · YAVAŞLA',x:'Yeşil söner, yalnız sarı yanar. Araçlar durmaya hazırlanır. 1,5 saniye. Sonra başa dönülür.',l:[0,1,0]}];
 var rows=[].slice.call($('fz-tab').querySelectorAll('tr[data-r]'));
 function render(s,k){setOp('fz-k',s.l[0]?1:0.12);setOp('fz-s',s.l[1]?1:0.12);setOp('fz-y',s.l[2]?1:0.12);
  rows.forEach(function(r){r.classList.toggle('hl2',+r.getAttribute('data-r')===k);});
  for(var i=0;i<4;i++){$('fz-b'+i).style.opacity=i===k?1:0.35;}
  $('fz-t').textContent=s.t;$('fz-x').textContent=s.x;}
 window.makeStepper('faz',S,render);
})();

/* ---------- pin isimleri ---------- */
(function(){
 var big=$('pi-big');if(!big)return;
 big.innerHTML=colorCode('int kirmizi = 2;');
 var moved=false;
 function lines(arr,hl,cls){return arr.map(function(l,i){var h=hl.indexOf(i)>=0;return h?'<span class="ch '+cls+'">'+esc(l)+'</span>':esc(l);}).join('\n');}
 function draw(){
  var n=moved?7:2;
  var a=['pinMode('+n+', OUTPUT);','digitalWrite('+n+', HIGH);','delay(4000);','digitalWrite('+n+', LOW);'];
  var b=['int kirmizi = '+n+';','pinMode(kirmizi, OUTPUT);','digitalWrite(kirmizi, HIGH);','delay(4000);','digitalWrite(kirmizi, LOW);'];
  $('pi-num').innerHTML=lines(a,moved?[0,1,3]:[],'');
  $('pi-isim').innerHTML=lines(b,moved?[0]:[],'g');
  $('pi-c1').textContent='Değişen satır: '+(moved?3:0);
  $('pi-c2').textContent='Değişen satır: '+(moved?1:0);
  $('pi-btn').textContent=moved?'Geri al: D2’ye döndür':'Kırmızı LED’i D2’den D7’ye taşı';}
 $('pi-btn').onclick=function(){moved=!moved;draw();};draw();
})();

/* ---------- anahtar ---------- */
(function(){
 if(!$('an-btn'))return;
 var on=false;
 function paint(){
  $('an-lever').setAttribute('transform',on?'':'rotate(-26 240 100)');
  setOp('an-glow',on?0.95:0);setOp('an-led',on?0.85:0);$('an-flow').style.display=on?'':'none';
  $('an-btn').textContent=on?'Anahtarı aç':'Anahtarı kapat';
  var s=$('an-st');s.textContent=on?'KAPALI: halka tamam, akım var, LED yanar':'AÇIK: halka kopuk, akım yok';s.style.color=on?'#9BE38B':'#FF8A80';}
 $('an-btn').onclick=function(){on=!on;paint();};paint();
})();

/* ---------- anahtar çizimleri (gerçek + sembol) ---------- */
var SWREAL={
 toggle:'<rect x="105" y="125" width="90" height="50" rx="6" fill="#9AA5B1"/><rect x="122" y="100" width="56" height="30" rx="4" fill="#C9D1D9"/><line x1="150" y1="104" x2="190" y2="28" stroke="#E5E7EB" stroke-width="16" stroke-linecap="round"/><circle cx="192" cy="26" r="15" fill="#F3F4F6"/><rect x="118" y="175" width="10" height="36" fill="#D9B34A"/><rect x="145" y="175" width="10" height="36" fill="#D9B34A"/><rect x="172" y="175" width="10" height="36" fill="#D9B34A"/>',
 push:'<rect x="85" y="95" width="130" height="95" rx="10" fill="#263238"/><circle cx="150" cy="98" r="44" fill="#37474F"/><circle cx="150" cy="92" r="30" fill="#546E7A"/><rect x="92" y="188" width="10" height="26" fill="#D9B34A"/><rect x="198" y="188" width="10" height="26" fill="#D9B34A"/><rect x="62" y="108" width="26" height="8" fill="#D9B34A"/><rect x="212" y="108" width="26" height="8" fill="#D9B34A"/>',
 slide:'<rect x="55" y="105" width="190" height="70" rx="8" fill="#37474F"/><rect x="80" y="127" width="140" height="26" rx="6" fill="#0B121B"/><rect x="92" y="108" width="42" height="64" rx="5" fill="#E5E7EB"/><rect x="92" y="175" width="10" height="34" fill="#D9B34A"/><rect x="145" y="175" width="10" height="34" fill="#D9B34A"/><rect x="198" y="175" width="10" height="34" fill="#D9B34A"/>',
 dip:'<rect x="40" y="80" width="220" height="110" rx="8" fill="#C62828"/><text x="150" y="102" text-anchor="middle" font-family="Rubik,Arial" font-size="18" font-weight="700" fill="#fff">ON</text><g fill="#F3F4F6"><rect x="60" y="112" width="34" height="62" rx="4"/><rect x="104" y="112" width="34" height="62" rx="4"/><rect x="148" y="112" width="34" height="62" rx="4"/><rect x="192" y="112" width="34" height="62" rx="4"/></g><g fill="#263238"><rect x="64" y="116" width="26" height="26" rx="3"/><rect x="108" y="146" width="26" height="26" rx="3"/><rect x="152" y="116" width="26" height="26" rx="3"/><rect x="196" y="146" width="26" height="26" rx="3"/></g><g fill="#D9B34A"><rect x="68" y="190" width="8" height="22"/><rect x="112" y="190" width="8" height="22"/><rect x="156" y="190" width="8" height="22"/><rect x="200" y="190" width="8" height="22"/></g>',
 rocker:'<rect x="70" y="70" width="160" height="116" rx="14" fill="#1B2530"/><path d="M86 96 L214 84 L214 150 L86 164 Z" fill="#2E8540" stroke="#9BE38B" stroke-width="3"/><circle cx="196" cy="116" r="8" fill="#F3F4F6"/><rect x="110" y="186" width="10" height="26" fill="#D9B34A"/><rect x="180" y="186" width="10" height="26" fill="#D9B34A"/>',
 reed:'<rect x="30" y="95" width="240" height="44" rx="22" fill="rgba(180,220,255,.35)" stroke="#9CCBFF" stroke-width="4"/><line x1="10" y1="117" x2="150" y2="117" stroke="#C9D1D9" stroke-width="7"/><line x1="170" y1="117" x2="290" y2="117" stroke="#C9D1D9" stroke-width="7"/><rect x="120" y="165" width="60" height="40" fill="#C62828"/><rect x="180" y="165" width="60" height="40" fill="#1E4FA3"/><text x="150" y="193" text-anchor="middle" font-family="Rubik,Arial" font-size="24" font-weight="700" fill="#fff">N</text><text x="210" y="193" text-anchor="middle" font-family="Rubik,Arial" font-size="24" font-weight="700" fill="#fff">S</text>'};
function swReal(t){return '<svg viewBox="0 0 300 220" width="100%" role="img" aria-label="Anahtar çizimi">'+SWREAL[t]+'</svg>';}
function swSym(t,on){
 var w='stroke="#E6EDF3" stroke-width="7" fill="none" stroke-linecap="round"';
 var s='<svg viewBox="0 0 300 170" width="100%" style="max-height:230px" role="img" aria-label="Anahtar sembolü">';
 s+='<path d="M10 120 H90 M210 120 H290" '+w+'/><circle cx="90" cy="120" r="8" fill="#E6EDF3"/><circle cx="210" cy="120" r="8" fill="#E6EDF3"/>';
 if(t==='push'){
  s+='<path d="M90 120 H110 M190 120 H210" '+w+'/>';
  s+='<path d="M95 '+(on?118:84)+' H205" '+w+'/>';
  s+='<path d="M150 '+(on?118:84)+' V '+(on?58:30)+' M120 '+(on?58:30)+' H180" '+w+'/>';
 }else if(t==='reed'){
  s+='<circle cx="150" cy="115" r="82" '+w+' stroke-dasharray="1 0"/><path d="M90 120 L'+(on?'210 120':'200 86')+'" '+w+'/>';
  s+='<rect x="100" y="148" width="100" height="16" fill="#E53935"/>';
 }else if(t==='dip'){
  s+='<path d="M90 120 L'+(on?'210 120':'200 86')+'" '+w+'/><path d="M60 50 H240 V150 H60 Z" stroke="#93A3B8" stroke-width="3" fill="none" stroke-dasharray="8 6"/>';
 }else if(t==='rocker'){
  s+='<path d="M90 120 L'+(on?'210 120':'200 86')+'" '+w+'/><path d="M148 '+(on?112:100)+' L148 40 L168 40" stroke="#93A3B8" stroke-width="3" fill="none" stroke-dasharray="6 5"/>';
 }else{
  s+='<path d="M90 120 L'+(on?'210 120':'200 86')+'" '+w+'/>';
 }
 return s+'</svg>';}
(function(){
 var D={
  toggle:{t:'Kaldıraç anahtar',en:'Toggle switch (“tıgıl svic”)',ty:'Kalıcı: kol hangi konumdaysa orada kalır',us:'Cihazların aç-kapa düğmesi, ses ve elektronik kutular.',btn:'Çevir'},
  push:{t:'Basmalı düğme (buton)',en:'Push button (“puş batın”)',ty:'Geçici: basılıyken iletir, bırakınca açılır',us:'Zil, asansör düğmesi, yaya butonu, klavye tuşları. Kitap s.80.',btn:'Bas'},
  slide:{t:'Sürgülü anahtar',en:'Slide switch (“slayt svic”)',ty:'Kalıcı: sürgü bırakıldığı konumda kalır',us:'Küçük elektronik oyuncaklar, taşınabilir cihazlarda mod seçimi.',btn:'Kaydır'},
  dip:{t:'DIP anahtar',en:'DIP switch (“dip svic”)',ty:'Kalıcı: yan yana birçok küçük anahtar',us:'Cihaz adresi ve ayarı seçmek: endüstriyel modüller, eski cihazlar.',btn:'Çevir'},
  rocker:{t:'Şalter',en:'Rocker switch (“rakır svic”)',ty:'Kalıcı: iki konumlu yatay basma',us:'Priz grupları, ev aletleri ve cihazların güç düğmesi. Kitap s.75.',btn:'Bas'},
  reed:{t:'Reed (mıknatıslı) anahtar',en:'Reed switch (“rid svic”)',ty:'Mıknatıs yaklaşınca kapanır, uzaklaşınca açılır',us:'Kapı ve pencere alarmı, bisiklet hız sensörü.',btn:'Mıknatısı yaklaştır'}};
 var KEYS=['toggle','push','slide','dip','rocker','reed'];
 var cards=$('cs-cards');
 if(cards){
  var h='';KEYS.forEach(function(k){h+='<button type="button" class="sw-card" data-k="'+k+'"><div style="width:100%">'+swReal(k)+'</div><span>'+D[k].t.split(' (')[0]+'</span></button>';});
  cards.innerHTML=h;
  var cur='toggle',on=false;
  function draw(){
   [].forEach.call(cards.children,function(c){c.classList.toggle('sel',c.getAttribute('data-k')===cur);});
   $('cs-real').innerHTML=swReal(cur);$('cs-sym').innerHTML=swSym(cur,on);
   var d=D[cur];$('cs-t').textContent=d.t;$('cs-en').textContent=d.en;$('cs-ty').textContent=d.ty;$('cs-us').textContent=d.us;
   $('cs-act').textContent=d.btn;$('cs-stt').textContent='Durum: '+(on?'kapalı (iletir)':'açık (iletmez)');}
  [].forEach.call(cards.children,function(c){c.addEventListener('click',function(){cur=c.getAttribute('data-k');on=false;draw();});});
  $('cs-act').onclick=function(){on=!on;draw();};
  draw();}
 [].forEach.call(document.querySelectorAll('[data-swicon]'),function(e){e.innerHTML=swReal(e.getAttribute('data-swicon'));});
})();

/* ---------- kontak düzenleri (NO, NC, SPDT) ---------- */
(function(){
 if(!$('kt-no'))return;
 var W='stroke="#E6EDF3" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"';
 function lampSvg(id,x,y){return '<circle id="'+id+'g" cx="'+x+'" cy="'+y+'" r="40" fill="#FFD54F" opacity="0"/><circle cx="'+x+'" cy="'+y+'" r="26" fill="#4A4320" stroke="#E6EDF3" stroke-width="5"/><circle id="'+id+'" cx="'+x+'" cy="'+y+'" r="26" fill="#FFE066" opacity="0"/><path d="M'+(x-16)+' '+(y-16)+' L'+(x+16)+' '+(y+16)+' M'+(x+16)+' '+(y-16)+' L'+(x-16)+' '+(y+16)+'" stroke="#E6EDF3" stroke-width="4"/>';}
 var BAT='<path d="M40 60 V120 M24 120 H56 M32 136 H48 M40 136 V250" '+W+'/>';
 function build(kind){
  if(kind==='sp'){
   return '<svg viewBox="0 0 560 290" width="100%" role="img" aria-label="İki yollu anahtar"><rect width="560" height="290" rx="12" fill="#16253A"/>'+BAT
   +'<path d="M40 60 H140 M300 40 H400 M300 130 H400 M496 40 H530 V250 H40 M496 130 H530" '+W+'/>'
   +'<circle cx="140" cy="60" r="8" fill="#E6EDF3"/><circle cx="300" cy="40" r="8" fill="#E6EDF3"/><circle cx="300" cy="130" r="8" fill="#E6EDF3"/>'
   +'<line id="kt-sp-l" x1="140" y1="60" x2="300" y2="40" stroke="#FFD54F" stroke-width="9" stroke-linecap="round"/>'
   +'<text x="312" y="86" font-family="Rubik,Arial" font-size="28" font-weight="700" fill="#9BE38B">A</text><text x="312" y="176" font-family="Rubik,Arial" font-size="28" font-weight="700" fill="#FF9F5A">B</text>'
   +lampSvg('kt-sp-a',448,40)+lampSvg('kt-sp-b',448,130)+'</svg>';}
  return '<svg viewBox="0 0 560 290" width="100%" role="img" aria-label="Basmalı düğme devresi"><rect width="560" height="290" rx="12" fill="#16253A"/>'+BAT
   +'<path d="M40 60 H150 M330 60 H500 V129 M500 181 V250 H40" '+W+'/>'
   +'<circle cx="150" cy="60" r="8" fill="#E6EDF3"/><circle cx="330" cy="60" r="8" fill="#E6EDF3"/>'
   +'<line id="kt-'+kind+'-l" x1="150" y1="60" x2="330" y2="60" stroke="#FFD54F" stroke-width="9" stroke-linecap="round"/>'
   +lampSvg('kt-'+kind+'-lamp',500,155)+'<text x="240" y="132" text-anchor="middle" font-family="Rubik,Arial" font-size="34" font-weight="700" fill="#C9D1D9">'+(kind==='no'?'NO':'NC')+'</text></svg>';}
 ['no','nc','sp'].forEach(function(k){$('kt-'+k).innerHTML=build(k);});
 var P={no:false,nc:false,sp:false};
 function lamp(id,v){setOp(id,v?0.95:0);setOp(id+'g',v?0.4:0);}
 function paint(){
  ['no','nc'].forEach(function(k){
   var closed=k==='no'?P[k]:!P[k];
   $('kt-'+k+'-l').setAttribute('transform',closed?'':'rotate(-28 150 60)');
   lamp('kt-'+k+'-lamp',closed);
   $('kt-'+k+'-x').textContent=(P[k]?'Basılı: ':'Basılmadı: ')+(closed?'akım var, lamba yanık.':'akım yok, lamba sönük.');});
  var up=!P.sp;
  $('kt-sp-l').setAttribute('y2',up?40:130);
  lamp('kt-sp-a',up);lamp('kt-sp-b',!up);
  $('kt-sp-x').textContent=up?'Kol yukarıda: yalnız A lambası yanar.':'Kol aşağıda: yalnız B lambası yanar.';}
 [].forEach.call(document.querySelectorAll('[data-kt]'),function(b){b.addEventListener('click',function(){var k=b.getAttribute('data-kt');P[k]=!P[k];
  if(k!=='sp')b.textContent=P[k]?'Bırak':'Bas';else b.textContent='Çevir';paint();});});
 paint();
})();

/* ---------- gerçek dünya: sabit ve uyarlanabilir süre ---------- */
(function(){
 var sl=$('gw-sl');if(!sl)return;
 function upd(){var n=+sl.value,a=Math.max(8,Math.min(40,8+2.5*n)),f=30,d=f-a;
  $('gw-n').textContent=n;$('gw-b2').style.width=(a/40*100)+'%';$('gw-l2').textContent=Math.round(a)+' sn';
  var x;if(d>0.5)x='Az araç var: yeşil kısa tutulur, diğer yola '+Math.round(d)+' sn kazanç.';
  else if(d<-0.5)x='Çok araç var: yeşil '+Math.round(-d)+' sn uzatılır, kuyruk erir.';
  else x='Bu yoğunlukta ikisi aynı.';
  $('gw-x').textContent=x;}
 sl.addEventListener('input',upd);upd();
})();

/* ---------- hata avı ---------- */
var BUGGY='int kirmizi = 2;\nint sari = 3\nint yesil = 4;\n\nvoid setup() {\n  pinMode(kirmizi, OUTPUT);\n  pinMode(sari, OUTPUT);\n  pinMode(yesil, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(kirmizi, HIGH);\n  delay(3000);\n  digitalWrite(Sari, HIGH);\n  delay(1000);\n  digitalWrite(yesil, HIGH);\n  delay(3000);\n}\n';
var FIXED='int kirmizi = 2;\nint sari = 3;\nint yesil = 4;\n\nvoid setup() {\n  pinMode(kirmizi, OUTPUT);\n  pinMode(sari, OUTPUT);\n  pinMode(yesil, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(kirmizi, HIGH);\n  delay(3000);\n  digitalWrite(kirmizi, LOW);\n  digitalWrite(sari, HIGH);\n  delay(1000);\n  digitalWrite(sari, LOW);\n  digitalWrite(yesil, HIGH);\n  delay(3000);\n  digitalWrite(yesil, LOW);\n}\n';
if($('hata-avi'))Sim.mount('hata-avi',{leds:[{pin:2,color:'red'},{pin:3,color:'yellow'},{pin:4,color:'green'}],scene:'traffic',map:{k:2,s:3,y:4},code:BUGGY,solution:FIXED,win:8000,tlW:640});

/* ---------- örnek slaytları (üretilen veriden) ---------- */
function buildStep(sid,lines,notes,tips){
 var grid=$(sid+'-grid');if(!grid)return;
 var h='';
 lines.forEach(function(l,i){var p=splitLine(l),only=!p.code.trim()&&p.cm;
  h+='<div class="ln" data-l="'+i+'">'+(l===''?'':(i+1))+'</div>';
  if(only)h+='<div class="cm" data-l="'+i+'" style="grid-column:span 2">'+esc(l.trim())+'</div>';
  else h+='<div data-l="'+i+'">'+(l===''?' ':colorCode(p.code,!tips))+'</div><div class="cm" data-l="'+i+'">'+esc(p.cm)+'</div>';});
 grid.innerHTML=h;
 var byLine={};notes.forEach(function(n,i){byLine[n.l]=i;});
 function render(n){
  [].forEach.call(grid.children,function(c){c.classList.toggle('hi',+c.getAttribute('data-l')===n.l&&!c.classList.contains('ln'));});
  $(sid+'-c').textContent=lines[n.l].trim();$(sid+'-t').textContent=n.t;$(sid+'-x').textContent=n.x;$(sid+'-s').textContent=n.s;}
 var api=window.makeStepper(sid,notes,render);
 grid.addEventListener('click',function(e){var c=e.target.closest('[data-l]');if(!c)return;var l=+c.getAttribute('data-l');if(byLine[l]!==undefined)api.goto(byLine[l]);});
}
function buildStatic(sid,lines){
 var pre=$(sid+'-pre');if(!pre)return;
 pre.innerHTML=lines.map(function(l){var p=splitLine(l);
  if(!p.cm)return colorCode(p.code,true);
  var pad=Math.max(2,34-p.code.length),sp='';for(var k=0;k<pad;k++)sp+=' ';
  if(!p.code.trim())return '<span class="c">'+esc(p.cm)+'</span>';
  return colorCode(p.code,true)+sp+'<span class="c">'+esc(p.cm)+'</span>';}).join('\n');
}
(function(){
 if(!window.EXCFG)return;
 window.EXCFG.forEach(function(ex){
  var base=ex.id,big=ex.leds.length>=4;
  Sim.mount(base+'-sen',{leds:ex.leds,scene:ex.scene,map:ex.map,code:ex.code,win:ex.win||10000,tlW:big?640:560});
  Sim.mount(base+'-dene',{leds:ex.leds,code:ex.code,win:ex.win||10000,tlW:560});
  ex.parts.forEach(function(p){
   if(p.kind==='step')buildStep(p.sid,p.lines,p.notes,ex.tips);
   else{buildStatic(p.sid,p.lines);
    if(p.live)Sim.mount(p.sid,{leds:ex.leds,scene:ex.scene,map:ex.map,code:ex.code,win:ex.win||10000,tlW:620});}
  });
 });
})();

/* ---------- test: şık seçince anında geri bildirim ---------- */
[].forEach.call(document.querySelectorAll('.q'),function(q){
 var ok=+q.getAttribute('data-ok'),bs=[].slice.call(q.querySelectorAll('.qb')),f=q.querySelector('.qf'),hint=q.querySelector('.hint'),show=q.querySelector('.qshow');
 function mark(b,good){b.classList.add(good?'right':'wrong');b.querySelector('.ic').textContent=good?'✓':'✗';}
 function done(){bs.forEach(function(x){x.disabled=true;});f.hidden=false;q.classList.add('done');}
 bs.forEach(function(b,i){b.addEventListener('click',function(){
  if(b.disabled)return;
  if(i===ok){mark(b,true);done();hint.textContent='Doğru!';hint.style.color='#1F6B30';}
  else{mark(b,false);b.disabled=true;hint.textContent='Yanlış, tekrar dene.';hint.style.color='#B71C1C';}});});
 show.addEventListener('click',function(){mark(bs[ok],true);done();hint.textContent='Doğru cevap işaretlendi.';hint.style.color='#1F6B30';show.disabled=true;});
});
window.__boot();
})();
