function $(id){return document.getElementById(id);}
function lower(s){return s.toLocaleLowerCase('tr-TR');}

function hlFlow(prefix,n,s,col){for(var i=1;i<=n;i++){var e=$(prefix+'-'+i);if(!e)return;var on=s===i;e.style.outline=on?'6px solid '+col:'none';e.style.transform=on?'translateY(-8px)':'none';e.style.opacity=(s===0||on)?'1':'.55';e.style.transition='all .2s';}}

/* ---------- iş akışı ---------- */
(function(){
  var S=[{n:0,m:'İleri’ye bas: bir müşteri mesajının sistemde izlediği yolu adım adım görelim.'},
   {n:1,m:'1 · Tetikleyici: Müşteri bir mesaj gönderir. Süreci başlatan olay budur.'},
   {n:2,m:'2 · Veri toplama: Sistem mesaj metnini, göndereni ve zamanı alır.'},
   {n:3,m:'3 · Yapay zekâ analizi: Model mesajı anlamlandırır: şikâyet mi, bilgi talebi mi, satın alma isteği mi?'},
   {n:4,m:'4 · Karar: Şikâyet → destek ekibi (öncelikli). Bilgi talebi → otomatik cevap. Satın alma → satış ekibi.'},
   {n:5,m:'5 · İşlem: Seçilen işlemler çalışır: kayıt açılır, e-posta gönderilir, ekip bilgilendirilir.'},
   {n:6,m:'6 · Çıktı: Müşteri doğru ve hızlı geri dönüş alır; sonuç kayıt altına alınır.'}];
  makeStepper('is-akisi',S,function(s){hlFlow('wf',6,s.n,'#FF9F5A');$('wf-msg').textContent=s.m;});
})();

/* ---------- mesaj yönlendirme ---------- */
(function(){
  if(!$('md-t'))return;
  var K={'Şikâyet':['şikayet','şikâyet','bozuk','gelmedi','mağdur','iade','sorun','berbat','rezalet','hasar','kötü','acil','memnun değil'],
         'Bilgi talebi':['saat','nerede','ne zaman','nasıl','kaç','açık','adres','bilgi','kaça kadar'],
         'Satın alma isteği':['satın al','almak istiyorum','sipariş ver','sepet','toplu','kampanya','fiyat teklifi','indirim']};
  var A={'Şikâyet':['Destek ekibine yönlendirildi · öncelikli işaretlendi','Üzgünüz, durumunuzu önceliğe aldık; destek ekibimiz en geç 2 saat içinde dönüş yapacak.'],
         'Bilgi talebi':['Otomatik cevap hazırlandı ve gönderildi','Mağazamız hafta içi 09.00–19.00, hafta sonu 10.00–18.00 arası açıktır. Başka sorunuz olursa yazın.'],
         'Satın alma isteği':['Satış ekibine yönlendirildi','Teşekkürler! Satış temsilcimiz toplu alım teklifi için sizi arayacak.']};
  function run(){var t=lower($('md-t').value),sc={},hits=[],best='Bilgi talebi',bs=-1;
    Object.keys(K).forEach(function(c){sc[c]=0;K[c].forEach(function(w){if(t.indexOf(w)>=0){sc[c]++;hits.push(w+' → '+c);}});if(sc[c]>bs){bs=sc[c];best=c;}});
    if(bs===0){best='Bilgi talebi';}
    $('md-w').textContent=hits.length?hits.join('   '):'Eşleşen ipucu yok (varsayılan: bilgi talebi)';
    $('md-c').textContent=best;$('md-c').style.color=best==='Şikâyet'?'#B42318':(best==='Satın alma isteği'?'#2E8540':'#2F6FDE');
    $('md-a').textContent=A[best][0];$('md-r').textContent=A[best][1];}
  $('md-t').addEventListener('input',run);
  document.querySelectorAll('.md-ex').forEach(function(b){b.addEventListener('click',function(){$('md-t').value=b.getAttribute('data-s');run();});});
  run();
})();

/* ---------- chatbot karşılaştırma ---------- */
(function(){
  if(!$('cb-t'))return;
  function add(box,cls,txt){var d=document.createElement('div');d.className='msg '+cls;d.textContent=txt;box.appendChild(d);box.scrollTop=box.scrollHeight;}
  function rule(t){t=lower(t);if(t.indexOf('kargom nerede')>=0)return 'Kargonuzu takip etmek için sipariş numaranızı girin.';if(t.indexOf('çalışma saatleri')>=0)return 'Çalışma saatlerimiz 09.00–18.00 arasındadır.';return 'Üzgünüm, anlayamadım. Lütfen “kargom nerede” veya “çalışma saatleri” yazın.';}
  var IN=[[['kargo','sipariş','gelmedi','ulaşmadı','teslim','paket'],'Kargonuzu sipariş numaranızla takip edebilirim. Numaranızı yazar mısınız?'],[['saat','açık','kaçta','çalışma','açılıyor'],'Çalışma saatlerimiz 09.00–18.00 arasındadır.'],[['iade','geri','değişim'],'İade için ürünü 14 gün içinde başvuru formuyla gönderebilirsiniz.']];
  function ai(t){t=lower(t);for(var i=0;i<IN.length;i++){for(var j=0;j<IN[i][0].length;j++){if(t.indexOf(IN[i][0][j])>=0)return IN[i][1];}}return 'Bunu tam anlayamadım; biraz daha açıklar mısınız ya da bir yetkiliye bağlanmak ister misiniz?';}
  function send(t){if(!t.trim())return;add($('cb-a'),'u',t);add($('cb-a'),'b',rule(t));add($('cb-b'),'u',t);add($('cb-b'),'b',ai(t));}
  $('cb-go').addEventListener('click',function(){send($('cb-t').value);});
  $('cb-t').addEventListener('keydown',function(e){if(e.key==='Enter')send($('cb-t').value);});
  $('cb-rs').addEventListener('click',function(){$('cb-a').innerHTML='';$('cb-b').innerHTML='';});
  document.querySelectorAll('.cb-ex').forEach(function(b){b.addEventListener('click',function(){$('cb-t').value=b.textContent;send(b.textContent);});});
})();

/* ---------- kütüphane botu ---------- */
(function(){
  if(!$('ka-chat'))return;
  var chat=$('ka-chat'),btns=$('ka-btns');
  function add(cls,txt){var d=document.createElement('div');d.className='msg '+cls;d.textContent=txt;chat.appendChild(d);}
  function setB(list){btns.innerHTML='';list.forEach(function(x){var b=document.createElement('button');b.type='button';b.className='ans-btn sm';b.textContent=x[0];b.addEventListener('click',function(){add('u',x[0]);x[1]();});btns.appendChild(b);});}
  function root(){chat.innerHTML='';add('b','Merhaba! Okul kütüphanesi asistanıyım. Ne öğrenmek istersin?');
    setB([['Kitap ödünç alabilir miyim?',function(){add('b','Öğrenci misiniz, öğretmen misiniz?');setB([['Öğrenciyim',function(){add('b','Evet, öğrenci kartınızla ödünç alabilirsiniz.');again();}],['Öğretmenim',function(){add('b','Öğretmenler için süre daha uzundur.');again();}]]);}],
          ['Kütüphane saatleri nedir?',function(){add('b','Hafta içi 08.30–17.00 arası açıktır.');again();}]]);}
  function again(){setB([['Baştan başla',root]]);}
  root();
})();

/* ---------- entegrasyon animasyonu ---------- */
(function(){
  var S=[{n:0,m:'İleri’ye bas: bir duyurunun birden çok sisteme nasıl ulaştığını izleyelim.'},
   {n:1,a:['ve-t'],m:'1 · Öğretmen duyuruyu ekler (veri girişi): “Yarın 3. ders yoklama yapılacak.”'},
   {n:2,a:['ve-s'],m:'2 · Duyuru sistemi veriyi alır ve kaydeder.'},
   {n:3,a:['ve-a'],m:'3 · API devreye girer: duyuru sistemi diğer sistemlere istek gönderir (entegrasyon).'},
   {n:4,a:['ve-1'],m:'4 · Öğrencilere mesaj olarak gönderilir.'},
   {n:5,a:['ve-1','ve-2'],m:'5 · Aynı duyuru e-posta sistemine aktarılır.'},
   {n:6,a:['ve-1','ve-2','ve-3'],m:'6 · Mobil uygulamada da gösterilir.'},
   {n:7,a:['ve-t','ve-s','ve-a','ve-1','ve-2','ve-3'],m:'Sonuç: Tek bir işlemle birçok sistem güncellendi. Aynı veri tekrar girilmedi, hata azaldı, süreç hızlandı.'}];
  var ALL=['ve-t','ve-s','ve-a','ve-1','ve-2','ve-3'];
  function render(s){ALL.forEach(function(id){var e=$(id);if(!e)return;var on=s.a&&s.a.indexOf(id)>=0;e.style.opacity=(s.n===0||on)?'1':'.35';e.style.outline=(on&&s.a[s.a.length-1]===id&&s.n<7)?'6px solid #FF9F5A':'none';e.style.transition='all .2s';});$('ve-msg').textContent=s.m;}
  makeStepper('entegrasyon',S,render);
})();

/* ---------- API demo ---------- */
(function(){
  if(!$('ap-go'))return;
  function req(){var e=$('ap-e').value,k=$('ap-k').value;
    $('ap-rq').textContent='GET https://api.ornek-okul.test/v1/'+e+'?sinif=9A\nAuthorization: Bearer '+(k==='ok'?'••••••••':'yanlis-anahtar');}
  function go(){var e=$('ap-e').value,k=$('ap-k').value,out;
    if(e!=='duyurular')out='HTTP 404 Not Found\n{ "hata": "Adres bulunamadı" }';
    else if(k!=='ok')out='HTTP 401 Unauthorized\n{ "hata": "Geçersiz API anahtarı" }';
    else out='HTTP 200 OK\n{\n  "sinif": "9A",\n  "duyurular": [\n    { "id": 17, "baslik": "Yarın 3. ders yoklama", "tarih": "2026-10-21" },\n    { "id": 18, "baslik": "Kulüp toplantısı 15.30", "tarih": "2026-10-22" }\n  ]\n}';
    $('ap-rs').textContent=out;$('ap-rs').style.color=out.indexOf('200')>=0?'#14301F':'#B42318';}
  $('ap-e').addEventListener('change',req);$('ap-k').addEventListener('change',req);$('ap-go').addEventListener('click',go);req();
})();
