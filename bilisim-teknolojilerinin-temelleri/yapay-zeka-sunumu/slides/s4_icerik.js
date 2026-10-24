function $(id){return document.getElementById(id);}

/* ---------- onay kutusu listeleri ---------- */
document.querySelectorAll('.chk').forEach(function(box){
  var items=box.querySelectorAll('.chk-i'),s=box.querySelector('.chk-s');
  function upd(){var n=0;items.forEach(function(i){if(i.checked)n++;});s.textContent=n+' / '+items.length+' tamam'+(n===items.length?' ✓':'');s.style.color=n===items.length?'#2E8540':'#C2410C';}
  items.forEach(function(i){i.addEventListener('change',upd);});upd();
});

/* ---------- görsel prompt atölyesi + önizleme ---------- */
(function(){
  if(!$('gb-svg'))return;
  var ids=['gb-k','gb-s','gb-z','gb-d','gb-c','gb-n'];
  function subj(k,night){
    var lit=night?'#FFE9A8':'#BFE3FF';
    if(k==='ağaç ev')return '<rect x="440" y="205" width="26" height="110" fill="#6B3A1E"/><circle cx="453" cy="180" r="68" fill="#2E8540"/><rect x="190" y="235" width="150" height="88" fill="#E8C79A"/><polygon points="178,236 265,170 352,236" fill="#B03A1A"/><rect x="250" y="272" width="34" height="51" fill="#6B3A1E"/><rect x="205" y="258" width="30" height="30" fill="'+lit+'"/><rect x="298" y="258" width="30" height="30" fill="'+lit+'"/>';
    if(k==='robot')return '<line x1="320" y1="118" x2="320" y2="150" stroke="#5B6878" stroke-width="6"/><circle cx="320" cy="114" r="10" fill="#C2410C"/><rect x="272" y="150" width="96" height="72" rx="12" fill="#B7C3D1"/><circle cx="298" cy="184" r="13" fill="#14202E"/><circle cx="342" cy="184" r="13" fill="#14202E"/><circle cx="298" cy="184" r="5" fill="'+(night?'#FFE27A':'#6CB6FF')+'"/><circle cx="342" cy="184" r="5" fill="'+(night?'#FFE27A':'#6CB6FF')+'"/><rect x="258" y="226" width="124" height="100" rx="12" fill="#9AA8B8"/><rect x="226" y="236" width="26" height="80" rx="10" fill="#9AA8B8"/><rect x="388" y="236" width="26" height="80" rx="10" fill="#9AA8B8"/><rect x="296" y="258" width="48" height="26" rx="6" fill="#C2410C"/>';
    return '<ellipse cx="320" cy="296" rx="84" ry="46" fill="#E0A55A"/><circle cx="320" cy="226" r="50" fill="#E0A55A"/><polygon points="276,200 282,150 316,184" fill="#E0A55A"/><polygon points="364,200 358,150 324,184" fill="#E0A55A"/><circle cx="302" cy="224" r="7" fill="#14202E"/><circle cx="338" cy="224" r="7" fill="#14202E"/><polygon points="314,238 326,238 320,247" fill="#B03A1A"/><line x1="268" y1="238" x2="298" y2="242" stroke="#14202E" stroke-width="2"/><line x1="372" y1="238" x2="342" y2="242" stroke="#14202E" stroke-width="2"/>';
  }
  function draw(){
    var k=$('gb-k').value,s=$('gb-s').value,z=$('gb-z').value,d=$('gb-d').value,c=$('gb-c').value,n=$('gb-n').value,night=z==='gece';
    var sky,sun='',ground='#2F7A3E';
    if(z==='gündüz'){sky='<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FB8FF"/><stop offset="1" stop-color="#D5EEFF"/></linearGradient>';sun='<circle cx="540" cy="76" r="44" fill="#FFE27A"/>';}
    else if(z==='gün batımı'){sky='<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B3E8F"/><stop offset=".6" stop-color="#FF8A4C"/><stop offset="1" stop-color="#FFD59A"/></linearGradient>';sun='<circle cx="320" cy="272" r="70" fill="#FFB347" opacity=".95"/>';ground='#2C5A34';}
    else{sky='<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1430"/><stop offset="1" stop-color="#27407A"/></linearGradient>';sun='<circle cx="540" cy="76" r="36" fill="#F6F1C8"/><circle cx="90" cy="60" r="3" fill="#FFF"/><circle cx="170" cy="110" r="2" fill="#FFF"/><circle cx="260" cy="48" r="3" fill="#FFF"/><circle cx="380" cy="90" r="2" fill="#FFF"/><circle cx="470" cy="150" r="2" fill="#FFF"/>';ground='#16301E';}
    var sc=c==='yakın çekim'?1.45:.88;
    var mood='';
    if(d==='dramatik')mood='<defs><radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></radialGradient></defs><rect width="640" height="400" fill="url(#vg)"/>';
    else if(d==='neşeli')mood='<rect width="640" height="400" fill="#FFE27A" opacity=".13"/><circle cx="70" cy="330" r="9" fill="#FF5E8A"/><circle cx="580" cy="320" r="9" fill="#6CB6FF"/><circle cx="120" cy="360" r="7" fill="#9BE38B"/><circle cx="540" cy="360" r="7" fill="#FF9F5A"/>';
    $('gb-svg').innerHTML='<defs>'+sky+'</defs><rect width="640" height="400" fill="url(#sk)"/>'+sun+'<ellipse cx="320" cy="410" rx="420" ry="110" fill="'+ground+'"/><g transform="translate(320 320) scale('+sc+') translate(-320 -320)">'+subj(k,night)+'</g>'+mood;
    var f={'gerçekçi fotoğraf':'none','çizgi film':'saturate(1.7) contrast(1.12)','karakalem':'grayscale(1) contrast(1.25)','yağlı boya':'blur(1.6px) saturate(1.35)'}[s];
    $('gb-svg').style.filter=f;
    $('gb-p').textContent=s.charAt(0).toUpperCase()+s.slice(1)+' tarzında, '+z+' bir '+k+' sahnesi; '+d+' bir atmosfer, '+c+' çekim; '+n+'.';
  }
  ids.forEach(function(i){$(i).addEventListener('change',draw);});draw();
})();

/* ---------- stil yolculuğu ---------- */
(function(){
  var L=['Fotoğraf seçimi','Düşük değişim','Yüksek değişim (yeniden yorumlama)','Kültürel dokunuş'];
  var P=['(Henüz komut yok) Telif ve kişisel veri açısından uygun, net bir manzara veya bina fotoğrafı seç ve aracına yükle.',
    '“Aynı fotoğrafı bozmadan sadece renklerini Van Gogh’un Yıldızlı Gece tablosundaki gibi fırça darbelerine dönüştür.”',
    '“Bu fotoğrafın genel yerleşimini kullanarak, her şeyi gelecekte geçen bir bilim kurgu filmindeki Cyberpunk şehri gibi yeniden tasarla.”',
    '“Fotoğrafı geleneksel Türk Ebru sanatı tarzında, su üzerindeki renklerin dalgalanması gibi yeniden oluştur.”'];
  var G=['Fotoğrafta tanınabilir bir kişi var mı? Kullanma izni var mı?','“Bozmadan” ifadesi neyi korudu? Yerleşim aynı kaldı mı, yalnız renkler mi değişti?','Neler değişti, neler korundu? Özgürlük arttıkça sonuç ne kadar uzaklaştı?','Ebru’nun özgün estetiği doğru temsil edildi mi? Yüzeysel veya hatalı kalan yer var mı?'];
  function render(s,k){var h='';L.forEach(function(t,i){var on=i===k-1;h+='<div class="card" style="flex-direction:row;align-items:center;gap:18px;padding:14px 24px;'+(on?'outline:5px solid #FF9F5A;background:#FFF3E8':'')+'"><span class="num" style="width:42px;height:42px;font-size:24px">'+(i+1)+'</span><span style="font-size:28px;font-weight:600;color:#1B2533">'+t+'</span></div>';});
    $('st-list').innerHTML=h;$('st-p').textContent=k===0?'İleri düğmesine bas: aynı fotoğrafa dört farklı komut vereceğiz.':P[k-1];$('st-g').textContent=k===0?'…':G[k-1];}
  makeStepper('stil',[0,1,2,3,4],render);
})();

/* ---------- ses animasyonu ---------- */
(function(){
  var S=[{n:0,t:'Bugün hava çok güzel!',b:0,m:'İleri’ye bas: bir cümlenin sese dönüşme yolculuğunu izleyelim.'},
   {n:1,t:'Bugün hava çok güzel!',b:20,m:'1 · Metin: Cümle sisteme girilir.'},
   {n:2,t:'Bugün hava ÇOK güzel!   (vurgu: çok · duygu: neşeli · duraklama: yok)',b:45,m:'2 · Analiz: Cümlenin yapısı incelenir. Nerede duraklanır, hangi kelime vurgulanır, duygu tonu nedir?'},
   {n:3,t:'bu-GÜN · ha-va · ÇOK · gü-zel',b:75,m:'3 · Ses birimleri: Metin küçük ses birimlerine ayrılır ve öğrenilmiş insan konuşması kalıplarıyla eşleştirilir.'},
   {n:4,t:'▁▂▃▅▇▅▃▂▁▂▄▆▇▆▄▂▁   (ses dalgası)',b:100,m:'4 · Ses dalgası: Ses üretilir ve çalınır. Derin öğrenme modelleri konuşma ritmini doğal yapar.'}];
  function render(s){for(var i=1;i<=4;i++){var e=$('sn-'+i);if(!e)return;var on=s.n===i;e.style.outline=on?'6px solid #FF9F5A':'none';e.style.transform=on?'translateY(-8px)':'none';e.style.opacity=(s.n===0||on)?'1':'.55';e.style.transition='all .2s';}
    $('sn-msg').textContent=s.m;$('sn-s').textContent=s.t;$('sn-b').style.width=s.b+'%';}
  makeStepper('ses-nasil',S,render);
})();

/* ---------- tarayıcı sesli okuma ---------- */
(function(){
  if(!$('sd-go'))return;
  var syn=window.speechSynthesis;
  if(!syn||typeof SpeechSynthesisUtterance==='undefined'){$('sd-msg').textContent='Bu tarayıcı sesli okumayı desteklemiyor. Farklı bir tarayıcı dene.';$('sd-go').disabled=true;return;}
  function load(){var vs=syn.getVoices(),tr=vs.filter(function(v){return /^tr/i.test(v.lang);}),list=tr.length?tr:vs;
    $('sd-v').innerHTML=list.map(function(v,i){return '<option value="'+vs.indexOf(v)+'">'+v.name+' ('+v.lang+')</option>';}).join('');
    $('sd-msg').textContent=!vs.length?'Ses listesi yükleniyor… Biraz bekleyip tekrar dene.':(tr.length?'':'Türkçe ses bulunamadı; listedeki diğer seslerle deneyebilirsin.');}
  load();if(syn.onvoiceschanged!==undefined)syn.onvoiceschanged=load;
  $('sd-r').addEventListener('input',function(){$('sd-rv').textContent=($('sd-r').value/10).toFixed(1);});
  $('sd-p').addEventListener('input',function(){$('sd-pv').textContent=($('sd-p').value/10).toFixed(1);});
  $('sd-go').addEventListener('click',function(){try{syn.cancel();var u=new SpeechSynthesisUtterance($('sd-t').value),vs=syn.getVoices(),v=vs[+$('sd-v').value];
    if(v){u.voice=v;u.lang=v.lang;}else u.lang='tr-TR';u.rate=$('sd-r').value/10;u.pitch=$('sd-p').value/10;syn.speak(u);}catch(e){$('sd-msg').textContent='Seslendirme başlatılamadı.';}});
  $('sd-st').addEventListener('click',function(){try{syn.cancel();}catch(e){}});
})();

/* ---------- video animasyonu ---------- */
(function(){
  var S=[{n:0,m:'İleri’ye bas: bir komutun videoya dönüşme yolunu dört aşamada izleyelim.'},
   {n:1,m:'1 · Komut analizi: ortam (şehir sokağı), zaman (gece), karakter (bir kişi), hareket (yürümek), hava (yağmur), stil (sinematik) çözülür.'},
   {n:2,m:'2 · Sahne planı: ışık, yansımalar, kamera hareketi ve geçişler planlanır. Model, öğrendiği örneklerden yararlanır.'},
   {n:3,m:'3 · Video üretimi: görüntüler hareketlendirilir ve birleştirilir: ıslak zemin yansımaları, sokak lambaları, yağmur damlaları.'},
   {n:4,m:'4 · Kontrol: gerçek dışı detay var mı? Gerekirse komutu geliştir (kamera, süre, stil ekle). Etik soruları sor.'}];
  function render(s){for(var i=1;i<=4;i++){var e=$('vn-'+i);if(!e)return;var on=s.n===i;e.style.outline=on?'6px solid #14202E':'none';e.style.transform=on?'translateY(-8px)':'none';e.style.opacity=(s.n===0||on)?'1':'.55';e.style.transition='all .2s';}
    $('vn-msg').textContent=s.m;}
  makeStepper('video-nasil',S,render);
})();

/* ---------- dijital hikâye ---------- */
(function(){
  var L=['Hikâye fikrini belirle','Kısa hikâye metnini yaz','Sahnelere böl','Görsel komutlarını hazırla','Seslendirme metnini hazırla','Ses oluşturma denemesi yap','Video akışını oluştur','Etik kontrol yap'];
  var D=['Örnek (kitap): okulun enerji tüketiminin yüksek olduğunu fark eden öğrenci, yapay zekâ destekli bir sistemle ışık, ısıtma ve cihaz kullanımını analiz eder; tasarruf bilinci gelişir.',
   'En çok 6-8 cümle. Giriş, gelişme ve sonuç bölümleri olsun. Bir karakter, bir problem, bir çözüm.',
   '3 veya 4 sahneye böl. Her sahne için bir cümlelik açıklama yaz.',
   'Her sahne için bir komut: karakter, ortam, ışık, renk, bakış açısı, görsel tarz. Ne istemediğini de yaz.',
   'Anlatım metnini seslendirmeye uygun hâle getir: kısa cümleler, doğal akış, zor kelimeleri sadeleştir.',
   'En az iki deneme: ses tonu, hız, vurgu veya anlatıcı türünü değiştir; en iyisini seç.',
   'Görselleri ve seslendirmeyi bir video düzenleme aracında birleştir. Sahne geçişlerini ve süreyi ayarla.',
   'Dört madde: gerçek kişi görüntüsü yok, ses taklidi yok, yanıltıcı bilgi yok, telif uygun. Yapay zekâ ürünü olduğunu belirt.'];
  function render(s,k){var h='';L.forEach(function(t,i){var on=i===k-1;h+='<div class="card" style="flex-direction:row;align-items:center;gap:16px;padding:9px 22px;'+(on?'outline:5px solid #FF9F5A;background:#FFF3E8':'')+'"><span class="num" style="width:38px;height:38px;font-size:22px">'+(i+1)+'</span><span style="font-size:26px;font-weight:600;color:#1B2533">'+t+'</span></div>';});
    $('hk-list').innerHTML=h;$('hk-d').textContent=k===0?'İleri düğmesine bas: sekiz adımı tek tek göreceksin.':D[k-1];}
  makeStepper('hikaye',[0,1,2,3,4,5,6,7,8],render);
})();
