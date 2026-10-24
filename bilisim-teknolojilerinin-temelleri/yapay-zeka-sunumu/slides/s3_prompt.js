function $(id){return document.getElementById(id);}

/* ---------- prompt atölyesi ---------- */
(function(){
  if(!$('pa-out'))return;
  var K=['rol','baglam','gorev','kisit','ornek','cikti'];
  var DEF={};K.forEach(function(k){DEF[k]=$('pa-i-'+k).value;});
  function build(){var parts=[],n=0;
    K.forEach(function(k){if($('pa-c-'+k).checked&&$('pa-i-'+k).value.trim()){parts.push($('pa-i-'+k).value.trim());n++;}});
    $('pa-out').value=parts.join('\n');
    var lbl=n<=1?'Belirsiz':(n<=3?'Orta':(n<=5?'İyi':'Çok iyi'));
    $('pa-sc').textContent=lbl+' ('+n+'/6 parça)';$('pa-bar').style.width=Math.round(n/6*100)+'%';
    $('pa-bar').style.background=n<=1?'#B42318':(n<=3?'#D9A400':'#2E8540');
    var r;
    if(!$('pa-c-gorev').checked||n<=1)r='“Kafeler insanları bir araya getirir. Bu kafede güzel kahveler, rahat bir ortam ve güler yüzlü çalışanlar var. Herkesi bekleriz.” Genel, herkese uyabilecek bir metin.';
    else if(n<=3)r='“Yeni kafemiz açıldı! Kahvelerimizi denemeye gelin.” Kısa ama kime ve nasıl hitap ettiği belirsiz.';
    else r='1. “Sabah dersi öncesi ilk kahven bizden: kampüs yanında, uygun fiyatlı, enerjin hazır!”  2. “Sınav haftasında uykuya karşı en iyi arkadaşın: sabah kahvesi kampanyası başladı.”  3. “Kitaplar yanında, kahve elinde: yeni kafede buluşalım.”';
    $('pa-res').textContent=r;}
  K.forEach(function(k){$('pa-c-'+k).addEventListener('change',build);$('pa-i-'+k).addEventListener('input',build);});
  $('pa-weak').addEventListener('click',function(){K.forEach(function(k){$('pa-c-'+k).checked=(k==='gorev');});$('pa-i-gorev').value='Kafe için yaz.';build();});
  $('pa-full').addEventListener('click',function(){K.forEach(function(k){$('pa-c-'+k).checked=true;$('pa-i-'+k).value=DEF[k];});build();});
  build();
})();

/* ---------- örnek verme animasyonu ---------- */
(function(){
  var L=['Müşteri mesajlarından sadece Şehir ve Şikâyet Konusu bilgilerini ayıkla.','1. Örnek','Mesaj: “Bursa’daki mağazanızdan aldığım ürünün rengi soldu, çok üzgünüm.”','Sonuç: Bursa | Renk Solması','2. Örnek','Mesaj: “İstanbul içi kargom 5 gündür gelmedi, acil destek!”','Sonuç: İstanbul | Geciken Kargo','Yeni Mesaj: “Ankara şubenizdeki personelin ilgisizliği nedeniyle alışveriş yapmadan çıktım.”','Sonuç:'];
  var S=[{c:0,r:'…',m:'İleri’ye bas: prompt’a örnekleri tek tek ekleyelim ve modelin çıktısının nasıl değiştiğine bakalım.'},
   {c:1,r:'Şehir: Ankara, Şikâyet: personelin ilgisizliği (biçimi tahmin etti)',m:'1 · Yalnızca görev (sıfır örnek): model ne istediğini anlar ama biçimi kendisi seçer.'},
   {c:4,r:'Ankara | Personel ilgisizliği',m:'2 · Bir örnek eklendi: “Şehir | Konu” biçimi görünür.'},
   {c:7,r:'Ankara | Personel ilgisizliği',m:'3 · İkinci örnek: kalıp pekişir (şehir, dikey çizgi, kısa ve büyük harfli konu).'},
   {c:8,r:'…',m:'4 · Yeni mesaj eklenir. Model henüz cevap yazmadı.'},
   {c:9,r:'Ankara | Personel İlgisizliği',m:'5 · “Sonuç:” satırından model kalıbı sürdürür. Aynı biçimde, aynı kısalıkta yazar.'}];
  function render(s){var h='';for(var i=0;i<s.c;i++){var bg='';if(i===1||i===2||i===3||i===4||i===5||i===6)bg='background:#FFE2CC;';if(i===7||i===8)bg='background:#DCE8FB;';
      h+='<div style="'+bg+'padding:2px 8px;border-radius:6px">'+L[i]+'</div>';}
    $('ov-p').innerHTML=h;$('ov-r').textContent=s.r;$('ov-msg').textContent=s.m;}
  makeStepper('ornek-verme',S,render);
})();

/* ---------- few-shot simülasyonu ---------- */
(function(){
  if(!$('fs-t'))return;
  var CT=['istanbul','ankara','izmir','bursa','samsun','antalya','adana','konya','trabzon','eskişehir'],
      CN={istanbul:'İstanbul',ankara:'Ankara',izmir:'İzmir',bursa:'Bursa',samsun:'Samsun',antalya:'Antalya',adana:'Adana',konya:'Konya',trabzon:'Trabzon','eskişehir':'Eskişehir'};
  var TP=[['renk','Renk Solması'],['kargo','Geciken Kargo'],['personel','Personel İlgisizliği'],['ilgisiz','Personel İlgisizliği'],['açılm','Teknik Sorun'],['arıza','Teknik Sorun'],['bozuk','Teknik Sorun'],['hasar','Hasarlı Ürün'],['iade','İade'],['fiyat','Fiyat Şikâyeti']];
  function run(){var w=$('fs-t').value.toLocaleLowerCase('tr-TR').split(/[^a-zçğıöşü0-9]+/).filter(Boolean),c='?',t='?';
    w.forEach(function(x){if(c==='?'&&CT.indexOf(x)>=0)c=CN[x];});
    outer:for(var i=0;i<w.length;i++){for(var j=0;j<TP.length;j++){if(w[i].indexOf(TP[j][0])===0){t=TP[j][1];break outer;}}}
    $('fs-o').textContent=c+' | '+t;}
  $('fs-t').addEventListener('input',run);
  document.querySelectorAll('.fs-ex').forEach(function(b){b.addEventListener('click',function(){$('fs-t').value=b.getAttribute('data-s');run();});});
  run();
})();
