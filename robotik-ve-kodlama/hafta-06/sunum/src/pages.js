/* SLAYTA ÖZEL ETKİLEŞİMLER */
(function(){
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var NS='http://www.w3.org/2000/svg';

/* ---------- kod renklendirme + balonlar ---------- */
var TIPS={
 'void':'void: “değer döndürmez” demektir. setup ve loop birer görev (fonksiyon) gibidir, sonuç vermezler. Örnek: void setup() { ... }',
 'int':'int: tam sayı türü.',
 'setup':'setup(): kart açılınca veya reset’e basılınca yalnızca bir kez çalışır. Hazırlık işleri buraya yazılır. Örnek: pinMode ayarları.',
 'loop':'loop(): setup bitince başlar, kart açık kaldıkça sürekli baştan tekrarlanır. Örnek: LED’i yakıp söndüren komutlar.',
 'pinMode':'pinMode(pin, mod): pinin giriş mi çıkış mı olacağını söyler. Örnek: pinMode(8, OUTPUT); → D8 çıkış olur.',
 'digitalWrite':'digitalWrite(pin, değer): pini 5 V (HIGH) veya 0 V (LOW) yapar. Örnek: digitalWrite(8, HIGH); LED yanar.',
 'delay':'delay(ms): programı o kadar milisaniye bekletir. 1000 ms = 1 saniye. Örnek: delay(250); çeyrek saniye bekler.',
 'OUTPUT':'OUTPUT: çıkış modu. Kart pinden akım verir (LED yakmak gibi).',
 'INPUT':'INPUT: giriş modu. Kart pindeki gerilimi okur (buton gibi).',
 'HIGH':'HIGH: 5 V, yani “açık”. 1 yazılabilir ama HIGH daha okunaklıdır.',
 'LOW':'LOW: 0 V, yani “kapalı”. 0 yerine LOW yaz.'};
function colorCode(s){
  return esc(s).replace(/\b(void|int|setup|loop|pinMode|digitalWrite|delay|OUTPUT|INPUT|HIGH|LOW)\b|\b(\d+)\b/g,function(m,w,n){
    if(n)return '<span class="n">'+n+'</span>';
    var cls=(w==='void'||w==='int'||w==='OUTPUT'||w==='INPUT'||w==='HIGH'||w==='LOW')?'k':'t';
    return '<span class="'+cls+' tip" tabindex="0" data-tip="'+esc(TIPS[w])+'">'+w+'</span>';});}
function splitLine(l){var i=l.indexOf('//');if(i<0)return{code:l,cm:''};return{code:l.slice(0,i).replace(/\s+$/,''),cm:l.slice(i)};}
function colorLine(l){var p=splitLine(l);return colorCode(p.code)+(p.cm?(p.code?'  ':'')+'<span class="c">'+esc(p.cm)+'</span>':'');}

/* ---------- ızgara delikleri (süs) ---------- */
function holes(id,cols,x0,dx,rows){var g=$(id);if(!g)return;var s='';for(var i=0;i<cols;i++)rows.forEach(function(y){s+='<rect x="'+(x0+dx*i-5)+'" y="'+(y-5)+'" width="10" height="10" rx="2"/>';});g.innerHTML=s;}
holes('cv-holes',24,64,24,[196,220,244,330,356,382,408,434]);
holes('b1-holes',64,50,21,[32,86]);
holes('oz-h',17,22,16,[14,26,64,76]);

/* ---------- oylama ---------- */
(function(){var sec=$('dikkat');if(!sec)return;var btns=sec.querySelectorAll('[data-vote]'),cnt=[0,0,0];
 function draw(){var tot=cnt[0]+cnt[1]+cnt[2];btns.forEach(function(b,i){b.querySelector('.cn').textContent=cnt[i];b.querySelector('.bar').style.width=(tot?cnt[i]/tot*240:0)+'px';});}
 btns.forEach(function(b){b.addEventListener('click',function(){cnt[+b.getAttribute('data-vote')]++;draw();});});})();

/* ---------- breadboard anatomisi ---------- */
(function(){
 var el=$('bba-ckt');if(!el)return;
 el.innerHTML='<svg id="bba-svg" viewBox="40 8 910 396" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Breadboard">'+Ckt.board('bba')+'<g id="bba-ov"></g></svg>';
 var P=[
  {n:'Güç hattı (+)',c:'#D32F2F',r:[[70,26,848,28],[70,355,848,29]],x:'Kırmızı çizgili hat, artı gerilimi (örneğin Arduino’nun 5 V’u) baştan sona dağıtır. Bir kez bağla, hat boyunca her deliği kullan.'},
  {n:'Toprak hattı (−)',c:'#1E6BD6',r:[[70,55,848,26],[70,330,848,24]],x:'Mavi çizgili hat GND (toprak) içindir. Devredeki tüm parçaların dönüş yolu burada birleşir.'},
  {n:'a–e deliği grubu',c:'#FF9F5A',r:[[76,220,840,108]],x:'Aynı numaralı 5 delik (a, b, c, d, e) içeriden tek metal şeritle bağlıdır. 15. sütunda bir parçanın ucunu e deliğine takarsan, o sütunun diğer deliklerine takılan her şey ona bağlanır.'},
  {n:'f–j deliği grubu',c:'#FF9F5A',r:[[76,91,840,107]],x:'f, g, h, i, j delikleri de aynı mantıkla bir şerittir. Ama bu şerit a–e grubundan ayrıdır.'},
  {n:'Çukur (orta oluk)',c:'#2F6FDE',r:[[72,199,844,20]],x:'Üst ve alt yarıyı birbirinden ayırır. 12. sütunun e deliği ile f deliği bağlı DEĞİLDİR. Entegre (çip) bacakları çukurun iki yanına takılır.'},
  {n:'Sütun ve satır etiketleri',c:'#8D8670',r:[[72,83,844,14],[72,324,844,14]],x:'Delik tarif etmek içindir: “15. sütun, e deliği”. Devre çizimlerindeki bağlantılar bu şekilde anlatılır.'}];
 var bt=$('bba-btns');
 P.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.className='cbtn';b.textContent=p.n;b.onclick=function(){sel(i);};bt.appendChild(b);});
 function sel(i){var p=P[i],ov=$('bba-ov'),h='';
  p.r.forEach(function(r){h+='<rect x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" rx="6" fill="'+p.c+'" fill-opacity=".28" stroke="'+p.c+'" stroke-width="3" stroke-dasharray="8 5" class="pulse"/>';});
  ov.innerHTML=h;$('bba-t').textContent=p.n;$('bba-x').textContent=p.x;
  [].forEach.call(bt.children,function(b,k){b.classList.toggle('sel',k===i);});}
 var svg=$('bba-svg');
 svg.addEventListener('click',function(e){var pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;var q=pt.matrixTransform(svg.getScreenCTM().inverse());
  var order=[4,0,1,2,3,5];for(var k=0;k<order.length;k++){var p=P[order[k]];for(var j=0;j<p.r.length;j++){var r=p.r[j];if(q.x>=r[0]&&q.x<=r[0]+r[2]&&q.y>=r[1]&&q.y<=r[1]+r[3]){sel(order[k]);return;}}}});
 var bi=$('bba-in');bi.onclick=function(){var on=bi.getAttribute('aria-pressed')!=='true';bi.setAttribute('aria-pressed',String(on));bi.textContent=on?'İçini gizle':'İçini göster (metal şeritler)';
  var s=$('bba-strips');s.style.display=on?'block':'none';s.setAttribute('class',on?'pulse':'');};
 sel(2);
})();

/* ---------- breadboard laboratuvarı ---------- */
(function(){
 var el=$('bbl-ckt');if(!el)return;
 el.innerHTML='<svg id="bbl-svg" viewBox="40 8 910 396" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Breadboard laboratuvarı">'+Ckt.board('bbl')+'</svg>';
 var holes=[].slice.call(el.querySelectorAll('.hole')),a=null,b=null;
 var RN={tp:'üst kırmızı (+) hat',tm:'üst mavi (−) hat',bm:'alt mavi (−) hat',bp:'alt kırmızı (+) hat'};
 function name(h){var k=h.getAttribute('data-k').split(':');return k[0]==='m'?(k[1]+'. sütun, '+k[2]+' deliği'):(RN[k[1]]+', '+k[2]+'. delik');}
 function clear(){holes.forEach(function(h){h.setAttribute('class','hole');});}
 function mark(h,cls){holes.forEach(function(x){if(x.getAttribute('data-g')===h.getAttribute('data-g'))x.setAttribute('class','hole '+cls);});}
 function update(){clear();
  var s=$('bbl-s'),r=$('bbl-res');
  if(!a){s.innerHTML='<b style="color:#C2410C">1. delik:</b> henüz seçilmedi';r.innerHTML='<h3>Sonuç</h3><p style="font-size:26px">İki delik seç; aynı metal şeritteyse BAĞLI, değilse BAĞLI DEĞİL yazar.</p>';return;}
  var same=b&&a.getAttribute('data-g')===b.getAttribute('data-g');
  mark(a,same?'ok':'on');if(b)mark(b,same?'ok':'on2');
  a.setAttribute('class','hole pick');if(b)b.setAttribute('class','hole pick');
  s.innerHTML='<b style="color:#C2410C">1. delik:</b> '+name(a)+(b?' &nbsp; <b style="color:#2F6FDE">2. delik:</b> '+name(b):' &nbsp; (şimdi 2. deliği seç)');
  if(!b){r.innerHTML='<h3>Turuncu delikler</h3><p style="font-size:26px">İlk deliğe bağlı olan tüm delikler turuncu. İkinci deliği seç.</p>';return;}
  var ka=a.getAttribute('data-k').split(':'),kb=b.getAttribute('data-k').split(':'),why;
  if(same)why=ka[0]==='m'?'Aynı sütunun aynı yarısı: içeride tek bir metal şerit var.':'Aynı güç hattı: baştan sona tek parça.';
  else if(ka[0]==='m'&&kb[0]==='m')why=ka[1]===kb[1]?'Aynı numara ama çukurun iki ayrı yanı: çukur şeritleri ayırır.':'Farklı sütunlar ayrı şeritlerdir. Bağlamak için kablo veya parça gerekir.';
  else if(ka[0]==='r'&&kb[0]==='r')why=(ka[1]==='tp'||ka[1]==='bp')===(kb[1]==='tp'||kb[1]==='bp')?'Üst ve alt güç hatları birbirinden ayrıdır; istersen kabloyla bağlarsın.':'Artı (+) ve eksi (−) hatları ayrıdır. Aralarına kablo koyarsan KISA DEVRE olur!';
  else why='Güç hattı ile sütunlar ayrıdır; kablo veya parça gerekir.';
  r.innerHTML='<h3 style="color:'+(same?'#9BE38B':'#FF8A80')+'">'+(same?'BAĞLI ✔':'BAĞLI DEĞİL ✘')+'</h3><p style="font-size:26px">'+why+'</p>';
 }
 el.addEventListener('click',function(e){var h=e.target.closest&&e.target.closest('.hole');if(!h)return;
  if(b){a=h;b=null;}else if(!a)a=h;else b=h;update();});
 $('bbl-r').onclick=function(){a=b=null;update();};
 update();
})();

/* ---------- breadboard sınav ---------- */
(function(){
 var el=$('bbq-ckt');if(!el)return;
 el.innerHTML='<svg id="bbq-svg" viewBox="40 8 910 396" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Breadboard sınavı">'+Ckt.board('bbq')+'<g id="bbq-ov"></g></svg>';
 var pairs=[['m:7:a','m:7:e'],['m:12:c','m:12:g'],['r:tp:5','r:tp:25'],['m:5:b','m:6:b'],['r:tp:10','r:tm:10']];
 var sec=$('bb-quiz'),cards=[].slice.call(sec.querySelectorAll('.col.f1 > .card'));
 function show(i){var h='';pairs[i].forEach(function(k){var r=el.querySelector('[data-k="'+k+'"]');
   h+='<circle cx="'+(+r.getAttribute('x')+4.5)+'" cy="'+(+r.getAttribute('y')+4.5)+'" r="13" fill="none" stroke="#E53935" stroke-width="4" class="pulse"/>';});
  $('bbq-ov').innerHTML=h;cards.forEach(function(c,j){c.style.outline=j===i?'3px solid #E53935':'none';});}
 cards.forEach(function(c,i){c.style.cursor='pointer';c.addEventListener('click',function(e){if(e.target.closest('.ans-btn'))return;show(i);});
  var b=c.querySelector('.ans-btn');if(b)b.addEventListener('click',function(){show(i);});});
 show(0);
})();

/* ---------- LED yönü ---------- */
(function(){
 var ok=$('ly-ok');if(!ok)return;var ters=$('ly-ters');
 function set(rev){
  ok.setAttribute('aria-pressed',String(!rev));ters.setAttribute('aria-pressed',String(rev));
  $('ly-tri').setAttribute('points',rev?'670,30 670,110 600,70':'600,30 600,110 670,70');
  $('ly-bar').setAttribute('x1',rev?600:670);$('ly-bar').setAttribute('x2',rev?600:670);
  $('ly-tri').setAttribute('fill',rev?'#5B1B1B':'#E53935');
  $('ly-glow').setAttribute('opacity',rev?0:.9);$('ly-flow').setAttribute('opacity',rev?0:1);
  var m=$('ly-msg');m.textContent=rev?'Akım geçmez, LED yanmaz':'Akım akar, LED yanar';m.setAttribute('fill',rev?'#FF8A80':'#9BE38B');
  $('ly-x').textContent=rev?'LED ters bağlandı: üçgenin ucu 5 V’a bakıyor. Akım geçmez. Yüksek ters gerilimde LED zarar görebilir, bu yüzden hep doğru yöne bağla.':'Üçgenin ucu akımın gideceği yönü gösterir: anottan katota. Ters bağlanırsa akım geçmez.';}
 ok.onclick=function(){set(false);};ters.onclick=function(){set(true);};set(false);
})();

/* ---------- direnç renk kodu ---------- */
(function(){
 var r1=$('dk-r1');if(!r1)return;
 var DG=[['siyah','#212121',0],['kahverengi','#6D4C41',1],['kırmızı','#C62828',2],['turuncu','#EF6C00',3],['sarı','#F9D71C',4],['yeşil','#2E7D32',5],['mavi','#1565C0',6],['mor','#7B1FA2',7],['gri','#757575',8],['beyaz','#F5F5F5',9]];
 var MU=[['siyah','#212121',1],['kahverengi','#6D4C41',10],['kırmızı','#C62828',100],['turuncu','#EF6C00',1000],['sarı','#F9D71C',10000],['yeşil','#2E7D32',100000]];
 var st=[2,2,1];
 function build(box,arr,row){arr.forEach(function(c,i){var b=document.createElement('button');b.type='button';b.className='swatch';b.style.background=c[1];b.title=c[0]+' ('+(row===2?'×'+c[2]:c[2])+')';b.setAttribute('aria-label',c[0]);
   b.onclick=function(){st[row]=i;draw();};box.appendChild(b);});}
 build(r1,DG,0);build($('dk-r2'),DG,1);build($('dk-r3'),MU,2);
 function fmt(v){return v>=1e6?(v/1e6).toString().replace('.',',')+' MΩ':v>=1000?(v/1000).toString().replace('.',',')+' kΩ':v+' Ω';}
 function draw(){
  $('dk-b1').setAttribute('fill',DG[st[0]][1]);$('dk-b2').setAttribute('fill',DG[st[1]][1]);$('dk-b3').setAttribute('fill',MU[st[2]][1]);
  [r1,$('dk-r2'),$('dk-r3')].forEach(function(box,row){[].forEach.call(box.children,function(b,i){b.classList.toggle('sel',i===st[row]);});});
  var v=(DG[st[0]][2]*10+DG[st[1]][2])*MU[st[2]][2];$('dk-val').textContent=fmt(v);}
 $('dk-220').onclick=function(){st=[2,2,1];draw();};$('dk-1k').onclick=function(){st=[1,0,2];draw();};
 draw();
})();

/* ---------- direnç laboratuvarı ---------- */
(function(){
 var sl=$('rl-sl');if(!sl)return;
 var V=[0,100,150,220,470,1000,10000];
 function tr(n){return n.toFixed(1).replace('.',',');}
 function upd(){
  var R=V[+sl.value],I=R?3/R*1000:Infinity,card=$('rl-st'),h,m,bg;
  $('rl-ohm').textContent=R?(R>=1000?(R/1000)+' kΩ':R+' Ω'):'direnç yok (0 Ω)';
  $('rl-f').textContent=R?'I = (5 − 2) / '+R+' = '+tr(I)+' mA':'I = (5 − 2) / 0 → sınırsız!';
  var pos=Math.min(I,40)/40*800;$('rl-needle').setAttribute('x',Math.max(0,Math.min(794,pos-3)));
  var lit=R?Math.min(1,I/15):1;$('rl-glow').setAttribute('opacity',(0.08+0.9*lit).toFixed(2));$('rl-lit').setAttribute('opacity',(0.05+0.8*lit).toFixed(2));
  if(!R){h='TEHLİKE · kısa devre';m='Direnç yok: akımı sınırlayan bir şey kalmaz. LED ve kartın pini zarar görür. (Oylamanın cevabı: C)';bg='#FDE0DC';}
  else if(R<150){h='Riskli';m='LED çok parlak ama 20 mA güvenli sınırını aşıyor. LED’in ömrü kısalır.';bg='#FFF3D6';}
  else if(R===150){h='Sınırda';m='Tam 20 mA: LED’in sınırı. Daha küçük direnç kullanma.';bg='#FFF3D6';}
  else if(R===220){h='İdeal';m='LED parlak ve güvenli. Bu hafta hep bu değeri kullanıyoruz.';bg='#E3F4E8';}
  else if(R===470){h='Güvenli, biraz soluk';m='Güvenli ama LED daha az parlak.';bg='#E3F4E8';}
  else if(R===1000){h='Soluk';m='Yalnızca 3 mA: LED soluk yanar.';bg='#E8EEF4';}
  else{h='Neredeyse yanmaz';m='0,3 mA çok az: LED zor görünür.';bg='#E8EEF4';}
  card.style.background=bg;$('rl-h').textContent=h;$('rl-m').textContent=m;}
 sl.addEventListener('input',upd);upd();
})();

/* ---------- güvenlik ---------- */
(function(){
 var sec=$('guvenlik');if(!sec)return;var items=sec.querySelectorAll('.chk');
 function upd(){var n=sec.querySelectorAll('.chk.on').length;$('gv-n').textContent=n+'/6';$('gv-ring').setAttribute('stroke-dashoffset',String(817*(1-n/6)));$('gv-ok').style.visibility=n===6?'visible':'hidden';}
 items.forEach(function(c){c.addEventListener('click',function(){c.classList.toggle('on');c.querySelector('.bx').textContent=c.classList.contains('on')?'✓':'';upd();});});
})();

/* ---------- kurulum adımları ---------- */
(function(){
 var el=$('kur-ckt');if(!el)return;
 el.innerHTML=Ckt.circuit('kur',{leds:[{pin:8,color:'red'}],labels:true}).svg;
 var S=[
  {t:'Hazırlık',x:'Boş breadboard ve Arduino. USB kablosu takılı değil: devreyi kapalı güçte kuruyoruz.'},
  {t:'1. Adım · GND kablosu',x:'Arduino’nun GND pininden breadboard’un alttaki mavi (−) hattına siyah bir kablo bağla.'},
  {t:'2. Adım · LED',x:'LED’i yerleştir: uzun bacak (anot +) 15. sütunun e deliğine, kısa bacak (katot −) 16. sütunun e deliğine.'},
  {t:'3. Adım · Katot bağlantısı',x:'LED’in kısa bacağının sütunundan (16) mavi hatta kısa bir siyah kablo çek. Böylece katot GND’ye ulaşır.'},
  {t:'4. Adım · 220 Ω direnç',x:'Direncin bir ucunu 11. sütuna, diğer ucunu 15. sütuna tak. 15. sütun LED’in anot sütunu: direnç LED’e seri bağlanır. Direncin yönü önemli değildir.'},
  {t:'5. Adım · Sinyal kablosu',x:'Arduino D8 pininden direncin boşta kalan ucunun sütununa (11. sütun) kablo bağla. Artık D8 → direnç → LED → GND yolu tamam.'},
  {t:'6. Adım · Kontrol ve çalıştırma',x:'Gözle kontrol et: dirençsiz LED yok, kısa devre yok. USB’yi tak ve kodu yükle: LED yanıp sönmeli.'}];
 var G=['kur-gnd','kur-l0','kur-k0','kur-r0','kur-w0'],timer=null;
 function stopT(){if(timer){clearInterval(timer);timer=null;}}
 function render(s,k){
  G.forEach(function(g,i){var e=$(g);if(!e)return;e.style.display=(k>=i+1)?'':'none';e.setAttribute('class',(k===i+1)?'pulse':'');});
  $('kur-t').textContent=s.t;$('kur-x').textContent=s.x;
  stopT();Ckt.setLevel('kur',0,0,8);
  if(k===6){var on=false;Ckt.setLevel('kur',0,1,8);timer=setInterval(function(){on=!on;Ckt.setLevel('kur',0,on?0:1,8);},1000);}}
 window.makeStepper('kurulum',S,render);
 var hk=window.hooks.kurulum,old=hk.leave;hk.leave=function(){stopT();if(old)old();};
})();

/* ---------- Tinkercad taklidi ---------- */
(function(){
 var el=$('tkc-ckt');if(!el)return;
 el.innerHTML=Ckt.circuit('tkc',{leds:[{pin:8,color:'red'}]}).svg;
 var t=null,on=false;
 window.hooks.tinkercad={enter:function(){if(t)return;t=setInterval(function(){on=!on;Ckt.setLevel('tkc',0,on?1:0,8);},1000);Ckt.setLevel('tkc',0,0,8);},leave:function(){clearInterval(t);t=null;}};
})();

/* ---------- kod iskeleti ---------- */
(function(){
 var pre=$('ki-code');if(!pre)return;
 var L=[['void setup() {','1'],['  pinMode(8, OUTPUT);   // 8. pin çıkış','1 3 4'],['}','1'],['',''],['void loop() {','2'],['  digitalWrite(8, HIGH);','2 3'],['  delay(1000);','2 3'],['  digitalWrite(8, LOW);','2 3'],['  delay(3000);','2 3'],['}','2']];
 pre.innerHTML=L.map(function(l){var p=splitLine(l[0]);return '<div class="kl" data-b="'+l[1]+'">'+(l[0]===''?' ':colorCode(p.code)+(p.cm?'<span class="c" data-c="4">'+esc(p.cm)+'</span>':''))+'</div>';}).join('');
 var btns=document.querySelectorAll('#kod-iskelet [data-b]');
 [].forEach.call(btns,function(b){if(b.classList.contains('kl'))return;b.addEventListener('click',function(){
  var k=b.getAttribute('data-b');
  [].forEach.call(pre.children,function(d){var has=(' '+d.getAttribute('data-b')+' ').indexOf(' '+k+' ')>=0;
    if(k==='4')has=!!d.querySelector('.c');
    d.classList.toggle('hi',has);d.classList.toggle('dimmed',!has);});});});
})();

/* ---------- setup / loop animasyonu ---------- */
(function(){
 var pre=$('sl-code');if(!pre)return;
 var L=['void setup() {','  pinMode(8, OUTPUT);','}','void loop() {','  digitalWrite(8, HIGH);','  delay(1000);','  digitalWrite(8, LOW);','  delay(3000);','}'];
 pre.innerHTML=L.map(function(l,i){return '<div class="kl" data-i="'+i+'">'+colorCode(l)+'</div>';}).join('');
 var S=[
  {l:-1,b:0,mo:0,lv:0,su:0,tur:0,w:0,m:'Kart enerji aldı. Henüz hiçbir komut çalışmadı; pin D8 de ayarlanmadı.'},
  {l:0,b:1,mo:0,lv:0,su:1,tur:0,w:0,m:'setup() çalışmaya başladı. Bu bölüm yalnızca bir kez çalışır.'},
  {l:1,b:1,mo:1,lv:0,su:1,tur:0,w:0,m:'pinMode(8, OUTPUT): D8 çıkış oldu. Kart artık bu pinden LED’e akım verebilir.'},
  {l:2,b:1,mo:1,lv:0,su:1,tur:0,w:0,m:'setup bitti. setup() bir daha ÇALIŞMAYACAK. Sıra loop()’ta.'},
  {l:4,b:2,mo:1,lv:1,su:1,tur:1,w:0,m:'loop() 1. tur: digitalWrite(8, HIGH). D8 = 5 V, LED yanar.'},
  {l:5,b:2,mo:1,lv:1,su:1,tur:1,w:1000,m:'delay(1000): 1 saniye bekle. Bekleme sırasında pin durumu aynı kalır, LED yanık.'},
  {l:6,b:2,mo:1,lv:0,su:1,tur:1,w:0,m:'digitalWrite(8, LOW): D8 = 0 V, LED söner.'},
  {l:7,b:2,mo:1,lv:0,su:1,tur:1,w:3000,m:'delay(3000): 3 saniye sönük bekle.'},
  {l:8,b:2,mo:1,lv:0,su:1,tur:1,w:0,m:'loop sonuna gelindi. Kart loop’un başına döner, setup’a DEĞİL.'},
  {l:4,b:2,mo:1,lv:1,su:1,tur:2,w:0,m:'loop() 2. tur: LED yeniden yanar. setup çalışma sayısı hâlâ 1.'},
  {l:5,b:2,mo:1,lv:1,su:1,tur:2,w:1000,m:'Aynı döngü kart kapanana kadar sürer.'}];
 function render(s){
  [].forEach.call(pre.children,function(d,i){d.classList.toggle('hi',i===s.l);});
  ['sl-b0','sl-b1','sl-b2'].forEach(function(id,i){$(id).setAttribute('fill',i===s.b?'#C2410C':'#2A3B50');});
  $('sl-tur').textContent='tur: '+s.tur;$('sl-sc').textContent='setup çalışma sayısı: '+s.su;
  var m=$('sl-m');m.textContent=s.mo?'OUTPUT':'—';m.style.color=s.mo?'#9BE38B':'#FF8A80';
  $('sl-v').textContent=s.lv?'5 V':'0 V';
  $('sl-l').innerHTML=s.lv?'<span class="chip hi">yanıyor</span>':'<span class="chip lo">söndü</span>';
  $('sl-gl').setAttribute('opacity',s.lv?1:0);$('sl-lit').setAttribute('opacity',s.lv?.85:0);
  $('sl-msg').textContent=s.m;
  var w=$('sl-wait');w.style.transition='none';w.style.width='0';
  if(s.w){void w.offsetWidth;w.style.transition='width '+(s.w/1000)+'s linear';w.style.width='100%';}}
 window.makeStepper('setup-loop',S,render);
})();

/* ---------- hata avı ---------- */
var BUGGY='void setup() {\n  pinMode(8, OUTPUT)\n}\n\nvoid loop() {\n  digitalwrite(8, HIGH);\n  delay(1000);\n  digitalWrite(8, LOW);\n  delay(1000)\n}\n';
var FIXED='void setup() {\n  pinMode(8, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(8, HIGH);\n  delay(1000);\n  digitalWrite(8, LOW);\n  delay(1000);\n}\n';
if($('hata-avi'))Sim.mount('hata-avi',{leds:[{pin:8,color:'red'}],code:BUGGY,solution:FIXED});

/* ---------- örnek slaytları (üretilen veriden) ---------- */
(function(){
 if(!window.EXCFG)return;
 window.EXCFG.forEach(function(ex){
  var base=ex.id;
  Sim.mount(base+'-sen',{leds:ex.leds,scene:ex.scene,map:ex.map,code:ex.code,win:ex.win||10000});
  Sim.mount(base+'-dene',{leds:ex.leds,code:ex.code,win:ex.win||10000,tlW:640});
  /* kod açıklama */
  var sec=$(base+'-kod'),grid=$(base+'-grid');if(!grid)return;
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
