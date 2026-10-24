/* SLAYTA ÖZEL ETKİLEŞİMLER */
(function(){
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

/* ---------- kod renklendirme + balonlar ---------- */
var TIPS={
 'void':'void: “değer döndürmez” demektir. setup ve loop birer görev (fonksiyon) gibidir, sonuç vermezler. Örnek: void setup() { ... }',
 'int':'int: tam sayı saklayan değişken türü. Örnek: int i; yazınca i adlı bir sayaç oluşur.',
 'for':'for: bir bölümü belli sayıda tekrar eder. Üç kuralı var: başlangıç; koşul; artış. Örnek: for (i = 2; i <= 8; i++) gövdeyi 7 kez çalıştırır.',
 'i':'i: sayaç değişkeni. Her turda değeri değişir. Örnek: i = 4 iken digitalWrite(i, HIGH); D4’teki LED’i yakar.',
 'i++':'i++: i’yi 1 artırır (i = i + 1). Örnek: i 2 ise 3 olur.',
 'i--':'i--: i’yi 1 azaltır (i = i - 1). Örnek: i 7 ise 6 olur.',
 'cmp':'<= küçük veya eşit demektir; >= büyük veya eşit. Örnek: i <= 8 → i, 8 olana kadar doğrudur (8 dahil).',
 'setup':'setup(): kart açılınca veya reset’e basılınca yalnızca bir kez çalışır. Hazırlık işleri buraya yazılır. Örnek: pinMode ayarları.',
 'loop':'loop(): setup bitince başlar, kart açık kaldıkça sürekli baştan tekrarlanır. Örnek: LED’i yakıp söndüren komutlar.',
 'pinMode':'pinMode(pin, mod): pinin giriş mi çıkış mı olacağını söyler. Örnek: pinMode(8, OUTPUT); → D8 çıkış olur.',
 'digitalWrite':'digitalWrite(pin, değer): pini 5 V (HIGH) veya 0 V (LOW) yapar. Örnek: digitalWrite(8, HIGH); LED yanar.',
 'delay':'delay(ms): programı o kadar milisaniye bekletir. 1000 ms = 1 saniye. Örnek: delay(250); çeyrek saniye bekler.',
 'OUTPUT':'OUTPUT: çıkış modu. Kart pinden akım verir (LED yakmak gibi).',
 'INPUT':'INPUT: giriş modu. Kart pindeki gerilimi okur (buton gibi).',
 'HIGH':'HIGH: 5 V, yani “açık”. 1 yazılabilir ama HIGH daha okunaklıdır.',
 'LOW':'LOW: 0 V, yani “kapalı”. 0 yerine LOW yaz.'};
var KW={void:1,int:1,OUTPUT:1,INPUT:1,HIGH:1,LOW:1,for:1};
function colorCode(s){
  return esc(s).replace(/\b(void|int|for|setup|loop|pinMode|digitalWrite|delay|OUTPUT|INPUT|HIGH|LOW|i)\b(\+\+|--)?|(&lt;=|&gt;=)|\b(\d+)\b/g,function(m,w,inc,cmp,n){
    if(n)return '<span class="n">'+n+'</span>';
    if(cmp)return '<span class="k tip" tabindex="0" data-tip="'+esc(TIPS.cmp)+'">'+cmp+'</span>';
    var key=w+(inc||''),cls=w==='i'?'e':(KW[w]?'k':'t');
    if(w==='i')cls='n';
    return '<span class="'+cls+' tip" tabindex="0" data-tip="'+esc(TIPS[key]||TIPS[w])+'">'+key+'</span>';});}
function splitLine(l){var i=l.indexOf('//');if(i<0)return{code:l,cm:''};return{code:l.slice(0,i).replace(/\s+$/,''),cm:l.slice(i)};}

/* ---------- oylama ---------- */
(function(){var sec=$('dikkat');if(!sec)return;var btns=sec.querySelectorAll('[data-vote]'),cnt=[0,0,0];
 function draw(){var tot=cnt[0]+cnt[1]+cnt[2];btns.forEach(function(b,i){b.querySelector('.cn').textContent=cnt[i];b.querySelector('.bar').style.width=(tot?cnt[i]/tot*240:0)+'px';});}
 btns.forEach(function(b){b.addEventListener('click',function(){cnt[+b.getAttribute('data-vote')]++;draw();});});})();

/* ---------- 1 LED'in çalışma mantığı ---------- */
(function(){
 var el=$('tl-ckt');if(!el)return;
 el.innerHTML=Ckt.circuit('tl',{leds:[{pin:8,color:'red'}],labels:true}).svg;
 var S=[
  {t:'Hazır devre',x:'D8 → direnç → LED → GND yolu kapalı bir halkadır. Akım yalnız kapalı halkada akar.',on:[],lv:0,row:-1},
  {t:'1 · D8 HIGH oldu',x:'digitalWrite(8, HIGH): D8 pini 5 V verir. Akımın kaynağı burası; kablo akımı dirence taşır.',on:['tl-w0'],lv:0,row:0},
  {t:'2 · Direnç',x:'Akım dirençten geçer. Direnç akımı sınırlar: (5 − 2) / 220 ≈ 13,6 mA. LED’in güvenli sınırı 20 mA’dir.',on:['tl-r0'],lv:0,row:1},
  {t:'3 · LED yandı',x:'Akım uzun bacaktan (anot) kısa bacağa (katot) geçerken LED ışık verir.',on:['tl-l0'],lv:1,row:2},
  {t:'4 · GND’ye dönüş',x:'Katottan kablo ile mavi (−) hatta, oradan Arduino GND’sine ulaşır. Halka kapandı; akım sürekli akıyor.',on:['tl-k0','tl-gnd'],lv:1,row:3},
  {t:'5 · D8 LOW oldu',x:'digitalWrite(8, LOW): D8 = 0 V. İki uç arasında gerilim farkı kalmaz, akım durur ve LED söner.',on:['tl-w0'],lv:0,row:0}];
 var ids=['tl-w0','tl-r0','tl-l0','tl-k0','tl-gnd'],rows=[].slice.call($('tl-tab').querySelectorAll('tr[data-r]'));
 function render(s){
  ids.forEach(function(id){var e=$(id);if(e)e.setAttribute('class',s.on.indexOf(id)>=0?'pulse':'');});
  Ckt.setLevel('tl',0,s.lv,8);
  rows.forEach(function(r){r.classList.toggle('hl',+r.getAttribute('data-r')===s.row);});
  $('tl-t').textContent=s.t;$('tl-x').textContent=s.x;}
 window.makeStepper('tek-led',S,render);
})();

/* ---------- 5 LED'li devre kurulumu ---------- */
(function(){
 var el=$('kc-ckt');if(!el)return;
 var leds=[{pin:2,color:'green'},{pin:3,color:'green'},{pin:4,color:'yellow'},{pin:5,color:'yellow'},{pin:6,color:'red'}];
 el.innerHTML=Ckt.circuit('kc',{leds:leds,labels:true}).svg;
 var PINS=[6,5,4,3,2],NAME=['kırmızı','sarı','sarı','yeşil','yeşil'];
 var S=[{t:'Hazırlık',x:'Boş breadboard ve Arduino. USB takılı değil. 5 LED için 30 sütunun tamamı kullanılacak.'},
  {t:'1. Adım · GND kablosu',x:'Arduino GND pininden alttaki mavi (−) hatta kablo bağla. Tüm LED’lerin katotları bu hatta birleşecek.'}];
 for(var i=0;i<5;i++){var cb=1+6*i;
  S.push({t:(i+2)+'. Adım · '+(i+1)+'. LED grubu',x:'Direnç '+cb+'. ve '+(cb+4)+'. sütun arası. LED anot '+(cb+4)+', katot '+(cb+5)+'. sütun ('+NAME[i]+'). Katot sütunundan mavi hatta kablo. D'+PINS[i]+' pininden direncin ilk sütununa ('+cb+') kablo.'});}
 S.push({t:'7. Adım · Kontrol',x:'Gözle kontrol et: her LED’in kendi direnci var, katotlar mavi hatta, D0 ve D1 boş. Sonra USB’yi tak ve kodu yükle.'});
 var tab=[].slice.call($('kc-tab').querySelectorAll('tr[data-r]'));
 function show(id,on,pulse){var e=$(id);if(!e)return;e.style.display=on?'':'none';e.setAttribute('class',on&&pulse?'pulse':'');}
 function render(s,k){
  show('kc-gnd',k>=1,k===1);
  for(var j=0;j<5;j++){var on=k>=2+j,pu=k===2+j;
   ['r','l','k','w'].forEach(function(p){show('kc-'+p+j,on,pu);});
   Ckt.setLevel('kc',j,(k===7)?1:0,PINS[j]);}
  tab.forEach(function(r){var n=+r.getAttribute('data-r');r.classList.toggle('off',!(n===0?k>=1:k>=n+1));r.classList.toggle('hl',(n===0&&k===1)||(n>0&&k===n+1));});
  $('kc-t').textContent=s.t;$('kc-x').textContent=s.x;}
 window.makeStepper('kur-coklu',S,render);
})();

/* ---------- kod uzuyor ---------- */
(function(){
 var sl=$('st-sl');if(!sl)return;
 function upd(){var n=+sl.value,lg=3*n,fr=11;
  $('st-n').textContent=n;$('st-b1').style.width=(lg/36*100)+'%';$('st-b2').style.width=(fr/36*100)+'%';
  $('st-l1').textContent=lg+' satır';$('st-l2').textContent=fr+' satır';
  var L=['void setup() {'],k;
  for(k=0;k<n;k++)L.push('  pinMode('+(k+2)+', OUTPUT);');
  L.push('}','void loop() {');
  for(k=0;k<n;k++)L.push('  digitalWrite('+(k+2)+', HIGH); delay(500);');
  for(k=0;k<n;k++)L.push('  digitalWrite('+(k+2)+', LOW);  delay(500);');
  L.push('}');
  var max=22,shown=L.slice(0,max),rest=L.length-max;
  $('st-code').innerHTML=shown.map(function(l){var p=splitLine(l);return colorCode(p.code);}).join('\n')+(rest>0?'\n<span class="c">… '+rest+' satır daha</span>':'');}
 sl.addEventListener('input',upd);upd();
})();

/* ---------- for kalıbı ---------- */
(function(){
 var code=$('fk-code');if(!code)return;
 var D=[
  {t:'for',x:'“şunun için” demektir. Parantez içindeki üç kurala göre süslü parantezlerin içini tekrar eder. Üç kural noktalı virgülle ayrılır.'},
  {t:'1 · Başlangıç: i = 2',x:'Döngü başlarken YALNIZ BİR KEZ çalışır. Sayaç i, 2 ile başlar. (Sayaç int i; ile programın en üstünde tanımlanır.)'},
  {t:'2 · Koşul: i <= 8',x:'HER TURUN BAŞINDA kontrol edilir. Doğruysa gövde çalışır, yanlışsa döngü biter. <= “küçük veya eşit” demektir: 8 dahil.'},
  {t:'3 · Artış: i++',x:'HER TURUN SONUNDA çalışır: i bir artar (i = i + 1). Sonra yine koşul kontrol edilir. i-- olsaydı i bir azalırdı.'},
  {t:'Gövde: { ... }',x:'Her turda çalışan komutlar. Burada i hangi sayıdaysa o pindeki LED yanar: i = 2 iken D2, i = 3 iken D3, ...'}];
 var segs=[].slice.call(code.querySelectorAll('.seg')),btns=[].slice.call($('fk-btns').querySelectorAll('button'));
 function sel(i){segs.forEach(function(s){s.classList.toggle('on',+s.getAttribute('data-s')===i);});
  btns.forEach(function(b){b.classList.toggle('sel',+b.getAttribute('data-s')===i);});
  $('fk-t').textContent=D[i].t;$('fk-x').textContent=D[i].x;}
 segs.forEach(function(s){s.addEventListener('click',function(){sel(+s.getAttribute('data-s'));});});
 btns.forEach(function(b){b.addEventListener('click',function(){sel(+b.getAttribute('data-s'));});});
 sel(1);
})();

/* ---------- for animasyonu ---------- */
(function(){
 var pre=$('fa-code');if(!pre)return;
 var L=['for (i = 2; i <= 8; i++) {','  digitalWrite(i, HIGH);','  delay(500);','}'];
 pre.innerHTML=L.map(function(l,i){return '<div class="kl" data-i="'+i+'">'+colorCode(l)+'</div>';}).join('');
 var leds=$('fa-leds');leds.innerHTML=[2,3,4,5,6,7,8].map(function(p){return '<div class="lb" data-p="'+p+'">D'+p+'</div>';}).join('');
 var S=[{l:[],i:null,c:null,on:0,t:'Hazır',x:'Döngü başlamadı. Değişken i henüz yok.'},
  {l:[0],i:2,c:null,on:0,t:'Başlangıç',x:'for başladı: birinci kural i = 2 yalnız bir kez çalışır. Artık i = 2.'}];
 for(var v=2;v<=8;v++){
  S.push({l:[0,1,2],i:v,c:true,on:v-1,t:v+'. tur · gövde çalışır',x:'Koşul: '+v+' <= 8 doğru. Gövde: digitalWrite('+v+', HIGH) → D'+v+' yandı, delay(500) ile yarım saniye beklendi.'});
  S.push({l:[0],i:v+1,c:null,on:v-1,t:v+'. tur biter · i++',x:'Artış kuralı çalışır: i++ → i = '+(v+1)+'. Sıra koşulda.'});}
 S.push({l:[0],i:9,c:false,on:7,t:'Koşul yanlış',x:'Koşul: 9 <= 8 yanlış. Döngü biter; program for’un altındaki satıra geçer. Yedi LED de yanık kaldı.'});
 function render(s){
  [].forEach.call(pre.children,function(d,k){d.classList.toggle('hi',s.l.indexOf(k)>=0);});
  $('fa-i').textContent=s.i===null?'—':s.i;
  var c=$('fa-c');c.textContent=s.c===true?'doğru ✓':s.c===false?'yanlış ✗':'—';c.style.color=s.c===true?'#9BE38B':s.c===false?'#FF8A80':'#93A3B8';
  [].forEach.call(leds.children,function(d){var p=+d.getAttribute('data-p');d.classList.toggle('on',p-2<s.on);});
  $('fa-t').textContent=s.t;$('fa-x').textContent=s.x;}
 window.makeStepper('for-anim',S,render);
})();

/* ---------- hata avı ---------- */
var BUGGY='int i;\n\nvoid setup() {\n  for (i = 2; i <= 6; i++) {\n    pinMode(i, OUTPUT)\n  }\n}\n\nvoid loop() {\n  for (i = 2; i <= 6; i++) {\n    digitalwrite(i, HIGH);\n    delay(300);\n    digitalWrite(i, LOW);\n  }\n  for (i = 6; i >= 2; j--) {\n    digitalWrite(i, HIGH);\n    delay(300);\n    digitalWrite(i, LOW);\n  }\n}\n';
var FIXED=BUGGY.replace('OUTPUT)\n','OUTPUT);\n').replace('digitalwrite','digitalWrite').replace('j--','i--');
if($('hata-avi'))Sim.mount('hata-avi',{leds:[{pin:2,color:'red'},{pin:3,color:'red'},{pin:4,color:'red'},{pin:5,color:'red'},{pin:6,color:'red'}],code:BUGGY,solution:FIXED,win:6000});

/* ---------- örnek slaytları (üretilen veriden) ---------- */
(function(){
 if(!window.EXCFG)return;
 window.EXCFG.forEach(function(ex){
  var base=ex.id;
  Sim.mount(base+'-sen',{leds:ex.leds,scene:ex.scene,map:ex.map,code:ex.code,win:ex.win||10000});
  Sim.mount(base+'-dene',{leds:ex.leds,code:ex.code,win:ex.win||10000,tlW:640});
  /* kod açıklama */
  var grid=$(base+'-grid');if(!grid)return;
  var h='';
  ex.lines.forEach(function(l,i){var p=splitLine(l),only=!p.code.trim()&&p.cm;
    h+='<div class="ln" data-l="'+i+'">'+(l===''?'':(i+1))+'</div>';
    if(only)h+='<div class="cm" data-l="'+i+'" style="grid-column:span 2">'+esc(l.trim())+'</div>';
    else h+='<div data-l="'+i+'">'+(l===''?' ':colorCode(p.code))+'</div><div class="cm" data-l="'+i+'">'+esc(p.cm)+'</div>';});
  grid.innerHTML=h;
  var byLine={};ex.notes.forEach(function(n,i){byLine[n.l]=i;});
  function render(n){
   [].forEach.call(grid.children,function(c){c.classList.toggle('hi',+c.getAttribute('data-l')===n.l&&!c.classList.contains('ln'));});
   $(base+'-kod-c').textContent=ex.lines[n.l].trim();$(base+'-kod-t').textContent=n.t;$(base+'-kod-x').textContent=n.x;$(base+'-kod-s').textContent=n.s;}
  var api=window.makeStepper(base+'-kod',ex.notes,render);
  grid.addEventListener('click',function(e){var c=e.target.closest('[data-l]');if(!c)return;var l=+c.getAttribute('data-l');if(byLine[l]!==undefined)api.goto(byLine[l]);});
 });
})();

window.__boot();
})();
