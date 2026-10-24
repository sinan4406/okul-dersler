function $(id){return document.getElementById(id);}
function pct(x){return Math.round(x*100)+'%';}

/* ---------- token ---------- */
(function(){
  if(!$('tk-t'))return;
  var COL=['#DCE8FB','#FFE2CC','#DDF1E3','#EADCF8'];
  function split(w){var out=[];while(w.length>6){out.push(w.slice(0,4));w=w.slice(4);}out.push(w);return out;}
  function run(){
    var t=$('tk-t').value,m=t.match(/[\p{L}\p{N}]+|[^\s\p{L}\p{N}]/gu)||[],toks=[],words=(t.match(/[\p{L}\p{N}]+/gu)||[]).length;
    m.forEach(function(x){if(/^[\p{L}\p{N}]+$/u.test(x))split(x).forEach(function(y){toks.push(y)});else toks.push(x);});
    var h='';toks.forEach(function(x,i){h+='<span style="background:'+COL[i%4]+';color:#14202E;border-radius:6px;padding:2px 8px">'+x.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</span>';});
    $('tk-out').innerHTML=h;$('tk-w').textContent=words;$('tk-n').textContent=toks.length;
  }
  $('tk-t').addEventListener('input',run);run();
})();

/* ---------- sıcaklık ---------- */
(function(){
  if(!$('tm-bars'))return;
  var C=[['Türkiye’nin başkenti',[['Ankara',5.0],['İstanbul',3.0],['İzmir',1.0],['Bursa',.5],['Roma',-1.0]]],
         ['Bugün hava çok',[['güzel',3.0],['sıcak',2.8],['soğuk',2.5],['yağmurlu',1.8],['matematik',-2.0]]],
         ['Python bir programlama',[['dilidir',4.5],['dili',3.0],['aracıdır',1.0],['yılanıdır',-.5],['şehridir',-2.0]]]];
  var ci=0,tally={};
  function dist(){var T=$('tm-t').value/10,L=C[ci][1].map(function(x){return x[1]/T;}),mx=Math.max.apply(null,L),ex=L.map(function(l){return Math.exp(l-mx);}),sm=ex.reduce(function(a,b){return a+b;},0);return ex.map(function(e){return e/sm;});}
  function render(){var d=dist();$('tm-tv').textContent=($('tm-t').value/10).toFixed(1);
    var h='';C[ci][1].forEach(function(x,i){h+='<div style="display:flex;align-items:center;gap:16px"><span style="width:200px;font-size:28px;font-weight:600;color:#14202E">'+x[0]+'</span><div class="bar" style="flex:1;height:34px"><i style="width:'+(d[i]*100).toFixed(1)+'%"></i></div><span class="mono" style="width:90px;font-size:26px;text-align:right">'+(d[i]*100).toFixed(1)+'%</span></div>';});
    var tl=Object.keys(tally).map(function(k){return k+' ×'+tally[k];}).join(' · ');
    h+='<p class="sm mute" style="margin-top:6px">Seçim sayıları: '+(tl||'henüz yok')+'</p>';
    $('tm-bars').innerHTML=h;}
  function ctxs(){var h='';C.forEach(function(c,i){h+='<button type="button" class="tb" data-i="'+i+'" aria-pressed="'+(i===ci)+'">'+c[0]+'</button>';});$('tm-ctx').innerHTML=h;$('tm-s').textContent=C[ci][0]+' …';}
  $('tm-ctx').addEventListener('click',function(e){var b=e.target.closest('.tb');if(!b)return;ci=+b.getAttribute('data-i');tally={};ctxs();render();e.stopPropagation();});
  $('tm-t').addEventListener('input',render);
  $('tm-go').addEventListener('click',function(){var d=dist(),r=Math.random(),a=0,k=d.length-1;for(var i=0;i<d.length;i++){a+=d[i];if(r<a){k=i;break;}}
    var w=C[ci][1][k][0];tally[w]=(tally[w]||0)+1;$('tm-s').textContent=C[ci][0]+' '+w;render();});
  $('tm-rs').addEventListener('click',function(){tally={};$('tm-s').textContent=C[ci][0]+' …';render();});
  ctxs();render();
})();

/* ---------- dikkat ---------- */
(function(){
  if(!$('at-words'))return;
  var W=['Ali,','kitabı','Ayşe’ye','verdi','çünkü','o','istedi.'];
  var M=[[.40,.10,.15,.20,.05,.05,.05],[.05,.30,.10,.30,.05,.05,.15],[.10,.10,.35,.25,.05,.05,.10],[.20,.20,.25,.20,.05,.02,.08],[.05,.05,.15,.25,.25,.10,.15],[.15,.03,.55,.05,.07,.10,.05],[.05,.25,.10,.10,.05,.35,.10]];
  var sel=5;
  function render(){var h='';W.forEach(function(w,i){var a=M[sel][i];
    h+='<button type="button" class="at-w" data-i="'+i+'" style="font:600 52px Rubik,Arial,sans-serif;border:'+(i===sel?'5px solid #14202E':'2px solid #C9C4B8')+';border-radius:14px;padding:14px 22px;background:rgba(194,65,12,'+(0.08+a*1.5).toFixed(2)+');color:#14202E;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px">'+w+'<span style="font:500 26px var(--mono)">'+a.toFixed(2)+'</span></button>';});
    $('at-words').innerHTML=h;}
  $('at-words').addEventListener('click',function(e){var b=e.target.closest('.at-w');if(!b)return;sel=+b.getAttribute('data-i');render();});
  render();
})();

/* ---------- yaşam döngüsü ---------- */
(function(){
  var S=[{n:0,m:'İleri’ye bas: bir sohbet modelinin hazırlanış sürecini beş adımda izleyelim.'},
    {n:1,m:'1 · Veri: Kitaplar, haberler, ansiklopediler, kod depoları gibi dev metin yığınları toplanır ve temizlenir. Kişisel veri ve zararlı içerik ayıklanmaya çalışılır.'},
    {n:2,m:'2 · Ön eğitim: Model, trilyonlarca token’a kadar metinde “sonraki parçayı tahmin et” görevini çözer. Haftalarca, binlerce GPU ile. Sonuç: dili iyi bilen ham model.'},
    {n:3,m:'3 · İnce ayar: Örnek soru-cevap çiftleriyle talimat izlemeyi öğrenir: “özetle”, “çevir”, “kodu düzelt” isteklerine uygun cevap verir.'},
    {n:4,m:'4 · İnsan geri bildirimi: İnsanlar iki cevaptan hangisinin daha iyi ve güvenli olduğunu işaretler; model bu tercihlere göre ayarlanır.'},
    {n:5,m:'5 · Kullanım (çıkarım): Sen yazarsın, model cevabı üretir. Konuşma sırasında model değişmez. Bazı ürünler arama ve araç bağlantısı da ekler.'}];
  function render(s){for(var i=1;i<=5;i++){var e=$('lc-'+i);if(!e)return;var on=s.n===i;e.style.outline=on?'6px solid #FF9F5A':'none';e.style.transform=on?'translateY(-8px)':'none';e.style.opacity=(s.n===0||on)?'1':'.55';e.style.transition='all .2s';}
    $('lc-msg').textContent=s.m;}
  makeStepper('yasam',S,render);
})();

/* ---------- RAG ---------- */
(function(){
  var DOC=['Madde 1: Öğrenciler en fazla 3 kitabı 15 gün süreyle ödünç alabilir.','Madde 2: Ödünç süresi bir kez 7 gün uzatılabilir.','Madde 3: Kütüphane hafta içi 08.30-17.00 arası açıktır.'];
  var S=[{n:0,hl:[],a:'…',m:'İleri’ye bas: bir okul botunun soruya nasıl cevap verdiğini izleyelim. Soldaki belge uydurma bir örnektir.'},
    {n:1,hl:[],a:'Soru: “Bir kitabı kaç gün tutabilirim?”',m:'1 · Öğrenci soruyu yazar.'},
    {n:2,hl:[0,1],a:'Soru: “Bir kitabı kaç gün tutabilirim?”',m:'2 · Sistem, kural belgesinde soruyla en çok ilgili parçaları arar: Madde 1 ve Madde 2 bulunur.'},
    {n:3,hl:[0,1],a:'Modele verilen: soru + Madde 1 + Madde 2',m:'3 · Bulunan parçalar, soruyla birlikte modele verilir. Model artık ezberinden değil, bu metinden cevap yazar.'},
    {n:4,hl:[0,1],a:'Bir kitabı 15 gün tutabilirsin; süre bir kez 7 gün uzatılabilir.',m:'4 · Model cevabı bulunan metne dayanarak yazar.'},
    {n:5,hl:[0,1],a:'Bir kitabı 15 gün tutabilirsin; süre bir kez 7 gün uzatılabilir. (Kaynak: Kütüphane Kuralları, Madde 1-2)',m:'5 · Cevap kaynağı gösterir. Öğrenci belgeye bakıp doğrulayabilir.'}];
  function render(s){for(var i=1;i<=5;i++){var e=$('rg-'+i);if(!e)return;var on=s.n===i;e.style.outline=on?'6px solid #14202E':'none';e.style.transform=on?'translateY(-8px)':'none';e.style.opacity=(s.n===0||on)?'1':'.55';e.style.transition='all .2s';}
    $('rg-doc').innerHTML=DOC.map(function(d,i){return '<span style="display:block;padding:4px 8px;border-radius:6px;'+(s.hl.indexOf(i)>=0?'background:#FFE2CC;outline:3px solid #C2410C':'')+'">'+d+'</span>';}).join('');
    $('rg-ans').textContent=s.a;$('rg-msg').textContent=s.m;}
  makeStepper('rag',S,render);
})();

/* ---------- difüzyon ---------- */
(function(){
  var cv=$('df-c');if(!cv)return;var W=640,H=400,ctx=cv.getContext('2d');
  var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2F6FDE');g.addColorStop(.62,'#FFD59A');g.addColorStop(1,'#FFD59A');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#FFE27A';ctx.beginPath();ctx.arc(470,150,62,0,7);ctx.fill();
  ctx.fillStyle='#2E8540';ctx.beginPath();ctx.moveTo(0,400);ctx.lineTo(0,270);ctx.quadraticCurveTo(160,190,330,290);ctx.quadraticCurveTo(480,360,640,260);ctx.lineTo(640,400);ctx.fill();
  ctx.fillStyle='#14301F';ctx.beginPath();ctx.moveTo(0,400);ctx.lineTo(0,340);ctx.quadraticCurveTo(220,290,420,350);ctx.quadraticCurveTo(540,380,640,330);ctx.lineTo(640,400);ctx.fill();
  ctx.fillStyle='#7A2E0B';ctx.fillRect(130,250,16,60);ctx.fillStyle='#C2410C';ctx.beginPath();ctx.arc(138,236,36,0,7);ctx.fill();
  var clean=ctx.getImageData(0,0,W,H),cd=clean.data,CW=160,CH=100,N=new Uint8Array(CW*CH*3),seed=12345;
  for(var i=0;i<N.length;i++){seed=(seed*1664525+1013904223)>>>0;N[i]=seed>>>24;}
  var out=ctx.createImageData(W,H),od=out.data;
  function draw(a){for(var y=0;y<H;y++){for(var x=0;x<W;x++){var k=(y*W+x)*4,n=((y>>2)*CW+(x>>2))*3;
      od[k]=cd[k]*(1-a)+N[n]*a;od[k+1]=cd[k+1]*(1-a)+N[n+1]*a;od[k+2]=cd[k+2]*(1-a)+N[n+2]*a;od[k+3]=255;}}
    ctx.putImageData(out,0,0);$('df-v').textContent=Math.round(a*100)+'%';$('df-s').value=Math.round(a*100);}
  var iv=null;
  $('df-s').addEventListener('input',function(){if(iv){clearInterval(iv);iv=null;}draw($('df-s').value/100);});
  $('df-go').addEventListener('click',function(){if(iv)clearInterval(iv);var a=1;draw(a);iv=setInterval(function(){a-=0.05;if(a<=0){a=0;clearInterval(iv);iv=null;}draw(a);},150);});
  $('df-rs').addEventListener('click',function(){if(iv){clearInterval(iv);iv=null;}draw(1);});
  draw(1);
})();

/* ---------- sihirbaz ---------- */
(function(){
  if(!$('wz-s'))return;
  var T=[
   ['Uzun bir makaleyi özetlemek','Dil modeli (LLM)','Claude, ChatGPT, Gemini gibi sohbet asistanları','Önemli ayrıntıyı atlayabilir; özeti kaynak metinle karşılaştır. Telifli veya gizli metni yüklemeden önce kuralları kontrol et.'],
   ['Fotoğraftaki bitkinin hastalığını anlamak','Çok kipli model (görsel + metin)','Görsel yüklemeyi destekleyen sohbet modelleri, bitki tanıma uygulamaları','Kesin teşhis değildir; ziraat uzmanına danış.'],
   ['Toplantı kaydını yazıya dökmek','Konuşma tanıma (sesten yazıya)','Whisper tipi modeller, otomatik altyazı araçları','Kayıt için izin al; özel isim ve aksanlarda hata olabilir.'],
   ['Okul afişi için görsel üretmek','Görsel üretim modeli (difüzyon)','Midjourney, DALL·E ailesi, Stable Diffusion ailesi, Adobe Firefly','Logo ve kişi fotoğrafı izinsiz kullanılmaz; görseldeki yazılar sık yanlış çıkar.'],
   ['Videoya Türkçe seslendirme eklemek','Metinden sese + istenirse video modeli','ElevenLabs tipi ses servisleri, telefonların okuma özelliği','Gerçek bir kişinin sesini izinsiz taklit etme; yapay zekâ ürünü olduğunu belirt.'],
   ['Web sitesi için kod yazdırmak','Kod modeli / geliştirme asistanı','GitHub Copilot, Claude Code, Cursor gibi araçlar','Kodu anlamadan kullanma; güvenlik ve lisans açısından test et.'],
   ['Okul yönetmeliğine göre cevap veren bot','RAG tabanlı sohbet botu','Belge arayan ve kaynak gösteren sohbet botu çözümleri','Belge güncel olmalı; cevapta kaynak göstermeli.'],
   ['Her hafta e-postaları sınıflandırıp özet göndermek','Otomasyon + dil modeli (iş akışı / ajan)','Zapier, Make, n8n, Power Automate gibi platformlar','Yetki sınırı koy; önemli işlemde insan onayı ekle.'],
   ['Müşteri yorumlarını olumlu / olumsuz ayırmak','Metin sınıflandırma (denetimli model veya dil modeli)','Duygu analizi servisleri, dil modelleri','İroniyi yanlış anlayabilir; önce örneklerle test et.'],
   ['Zor bir mantık problemini adım adım çözmek','Akıl yürüten model','Düşünme süresi ekleyen modeller','Çözüm adımlarını kontrol et; yine de yanlış olabilir.']];
  var h='';T.forEach(function(t,i){h+='<option value="'+i+'">'+t[0]+'</option>';});$('wz-s').innerHTML=h;
  function r(){var t=T[$('wz-s').value];$('wz-t').textContent=t[1];$('wz-e').textContent=t[2];$('wz-d').textContent=t[3];}
  $('wz-s').addEventListener('change',r);r();
})();
