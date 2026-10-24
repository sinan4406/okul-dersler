function $(id){return document.getElementById(id);}
function pct(x){return Math.round(x*100)+'%';}

/* ---------- elma / armut sınıflandırıcı ---------- */
(function(){
  if(!$('sf-svg'))return;
  var A0=[[.80,.85],[.72,.70],[.88,.75],[.78,.95],[.68,.80],[.85,.65]];
  var P0=[[.30,.25],[.25,.40],[.38,.20],[.20,.30],[.35,.45],[.28,.15]];
  var BAD=[[.82,.84],[.76,.74],[.90,.80],[.74,.86],[.80,.70],[.86,.90],[.70,.78],[.84,.76]];
  var A=A0.slice(),P=P0.slice(),poisoned=false;
  function cen(a){var x=0,y=0;a.forEach(function(p){x+=p[0];y+=p[1]});return [x/a.length,y/a.length];}
  function X(v){return 60+v*660;}function Y(v){return 500-v*470;}
  function draw(){
    var ca=cen(A),cp=cen(P),ux=$('sf-x').value/100,uy=$('sf-y').value/100;
    var s='<line x1="60" y1="500" x2="730" y2="500" stroke="#6B7685" stroke-width="2"/><line x1="60" y1="500" x2="60" y2="20" stroke="#6B7685" stroke-width="2"/>';
    s+='<text x="395" y="540" text-anchor="middle" font-size="22" fill="#3D4A5C">Yuvarlaklık →</text>';
    s+='<text x="20" y="260" text-anchor="middle" font-size="22" fill="#3D4A5C" transform="rotate(-90 20 260)">Kırmızılık →</text>';
    P.forEach(function(p,i){s+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="13" fill="#2E8540" stroke="#14301F" stroke-width="2"/>';});
    A.forEach(function(p,i){var bad=poisoned&&i>=A0.length;s+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="13" fill="#C2410C" stroke="#7A2E0B" stroke-width="2"/>';});
    if(poisoned){BAD.forEach(function(p){});}
    s+='<circle cx="'+X(ca[0])+'" cy="'+Y(ca[1])+'" r="26" fill="none" stroke="#7A2E0B" stroke-width="4" stroke-dasharray="6 5"/>';
    s+='<circle cx="'+X(cp[0])+'" cy="'+Y(cp[1])+'" r="26" fill="none" stroke="#14301F" stroke-width="4" stroke-dasharray="6 5"/>';
    s+='<circle cx="'+X(ux)+'" cy="'+Y(uy)+'" r="17" fill="#FFFFFF" stroke="#14202E" stroke-width="5"/><text x="'+X(ux)+'" y="'+(Y(uy)+8)+'" text-anchor="middle" font-size="24" font-weight="700" fill="#14202E">?</text>';
    $('sf-svg').innerHTML=s;
    var dA=Math.hypot(ux-ca[0],uy-ca[1]),dP=Math.hypot(ux-cp[0],uy-cp[1]);
    var pa=1/(1+Math.exp(-9*(dP-dA)));
    $('sf-xv').textContent=ux.toFixed(2);$('sf-yv').textContent=uy.toFixed(2);
    $('sf-pa').textContent=pct(pa);$('sf-pp').textContent=pct(1-pa);
    $('sf-ba').style.width=pct(pa);$('sf-bp').style.width=pct(1-pa);
    $('sf-msg').textContent=poisoned?'Hatalı veri modeli bozdu: elma görünümlü fotoğraflar “armut” diye etiketlendi, armut grubunun merkezi elma bölgesine kaydı.':'Kaydırıcıları oynat: yeni meyve bir grubun merkezine yaklaştıkça o grubun olasılığı artar.';
  }
  $('sf-x').addEventListener('input',draw);$('sf-y').addEventListener('input',draw);
  $('sf-poison').addEventListener('click',function(){if(poisoned)return;poisoned=true;BAD.forEach(function(p){P.push(p)});draw();});
  $('sf-reset').addEventListener('click',function(){poisoned=false;A=A0.slice();P=P0.slice();draw();});
  draw();
})();

/* ---------- çalışma mantığı ---------- */
(function(){
  var S=[
    {n:0,m:'İleri düğmesine bas: elma ve armutu ayırt etmeyi öğrenen bir yapay zekâyı adım adım izleyelim.'},
    {n:1,m:'1 · Veri toplama: İnsanlar görerek öğrenir, yapay zekâ veriyle. Binlerce elma ve armut fotoğrafı toplanır.'},
    {n:2,m:'2 · Model eğitimi: Fotoğraflardaki kalıplar aranır: şekil, renk, sap. Bu özellikler sayılara dönüştürülür.'},
    {n:3,m:'3 · Öğrenme: Algoritma, tahmin hatasını azaltacak şekilde kendini ayarlar. Denetimli öğrenmede “bu elma, bu armut” etiketleri verilir.'},
    {n:4,m:'4 · Karar / tahmin: Hiç görülmemiş yeni bir fotoğraf gelir. Model olasılık hesaplar: elma %91, armut %9 → “elma”.'},
    {n:5,m:'5 · Geri bildirim: Sonuç yanlışsa düzeltme verisi eklenir. Model, sonraki eğitimde güncellenir (konuşma sırasında anında değil).'}];
  function render(s){for(var i=1;i<=5;i++){var e=$('cm-'+i);if(!e)return;var on=s.n===i;e.style.outline=on?'6px solid #FF9F5A':'none';e.style.transform=on?'translateY(-8px)':'none';e.style.opacity=(s.n===0||on)?'1':'.55';e.style.transition='all .2s';}
    $('cm-msg').textContent=s.m;}
  makeStepper('calisma',S,render);
})();

/* ---------- spam filtresi ---------- */
(function(){
  if(!$('sp-t'))return;
  var W={'ücretsiz':2.0,'kazandın':2.5,'tıkla':1.5,'hemen':1.0,'bedava':2.0,'çekiliş':1.5,'bonus':1.5,'kredi':1.0,'fırsat':1.2,'link':1.0,'ödül':1.5,
         'ödev':-1.5,'toplantı':-2.0,'merhaba':-0.8,'yarın':-1.0,'okul':-1.2,'kod':-1.0,'ders':-1.2};
  function tok(t){return t.toLocaleLowerCase('tr-TR').split(/[^a-zçğıöşü0-9]+/).filter(Boolean);}
  function run(){
    var t=$('sp-t').value,ws=tok(t);
    var rule=ws.some(function(w){return w.indexOf('ücretsiz')===0||w.indexOf('kazandınız')===0;});
    $('sp-r').textContent=rule?'SPAM':'Temiz';$('sp-r').style.color=rule?'#B42318':'#2E8540';
    var sum=-0.5,hits=[];
    ws.forEach(function(w){Object.keys(W).forEach(function(k){if(w.indexOf(k)===0){sum+=W[k];hits.push(k+(W[k]>0?' +':' ')+W[k]);}});});
    var p=1/(1+Math.exp(-sum));
    $('sp-l').textContent=(p>=0.5?'SPAM ':'Temiz ')+pct(p>=0.5?p:1-p);$('sp-l').style.color=p>=0.5?'#B42318':'#2E8540';
    $('sp-b').style.width=pct(p);$('sp-b').style.background=p>=0.5?'#B42318':'#2E8540';
    $('sp-w').textContent=hits.length?hits.join('  '):'Bilinen kelime yok';
  }
  $('sp-t').addEventListener('input',run);
  document.querySelectorAll('.sp-ex .opt').forEach(function(b){b.addEventListener('click',function(){$('sp-t').value=b.getAttribute('data-s');run();});});
  run();
})();

/* ---------- sinir ağı ---------- */
(function(){
  if(!$('nn-svg'))return;
  var IN=[[120,130],[120,260],[120,390]],HI=[[460,80],[460,200],[460,320],[460,440]],OUT=[[800,190],[800,330]];
  var W1=[[.8,.2,.6,-.3],[.7,-.4,.5,.1],[-.5,.6,.3,-.8]],W2=[[.9,-.7],[-.4,.5],[.8,-.6],[-.5,.4]];
  var IV=['0.9','0.8','0.2'],HV=['0.76','0.35','0.74','0.10'],OV=['0.91','0.09'];
  var names=['yuvarlak','kırmızı','uzun'];
  var S=[{t:0,m:'Küçük bir sinir ağı: giriş, gizli katman, çıkış. Çizgi kalınlığı, bağlantının ağırlığını (önemini) gösterir. Mavi: pozitif, kırmızı: negatif.'},
    {t:1,m:'1 · Giriş katmanı: yeni meyvenin özellikleri sayıya çevrilir. Yuvarlaklık 0,9 · kırmızılık 0,8 · uzunluk 0,2.'},
    {t:2,m:'2 · Gizli katman: her nöron girişleri ağırlıklarla çarpıp toplar. h1 = 0,9×0,8 + 0,8×0,7 + 0,2×(−0,5) = 1,18'},
    {t:3,m:'3 · Aktivasyon: toplam 0–1 aralığına sıkıştırılır (sigmoid). 1,18 → 0,76. Nöron ne kadar “yanıyor” bilgisi budur.'},
    {t:4,m:'4 · Çıkış katmanı: elma 0,91 · armut 0,09. En yüksek olasılık seçilir: elma.'},
    {t:5,m:'5 · Öğrenme: cevap armut olsaydı hata hesaplanır ve ağırlıklar biraz değiştirilir. Bu işlem milyonlarca örnekte tekrar eder.'}];
  function edge(a,b,w,on){var c=w>=0?'#2F6FDE':'#C2410C';return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+c+'" stroke-width="'+(1+Math.abs(w)*7)+'" opacity="'+(on?.9:.28)+'"/>';}
  function node(p,fill,label,val,on,stroke){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="36" fill="'+(on?fill:'#FFFFFF')+'" stroke="'+stroke+'" stroke-width="'+(on?6:3)+'"/><text x="'+p[0]+'" y="'+(p[1]+8)+'" text-anchor="middle" font-size="24" font-weight="700" fill="'+(on?'#FFFFFF':'#14202E')+'">'+val+'</text>'+(label?'<text x="'+p[0]+'" y="'+(p[1]-52)+'" text-anchor="middle" font-size="22" fill="#3D4A5C">'+label+'</text>':'');}
  function render(s){var t=s.t,g='';
    var e1=t>=2,e2=t>=4;
    IN.forEach(function(a,i){HI.forEach(function(b,j){g+=edge(a,b,W1[i][j],e1&&(t!==2||j===0));});});
    HI.forEach(function(a,i){OUT.forEach(function(b,j){g+=edge(a,b,W2[i][j],e2);});});
    IN.forEach(function(p,i){g+=node(p,'#2F6FDE',names[i],t>=1?IV[i]:'',t>=1&&t<=2||t===1,'#2F6FDE');});
    HI.forEach(function(p,i){var show=t>=3||(t===2&&i===0);g+=node(p,'#C2410C',i===0?'h1':'',t>=3?HV[i]:(t===2&&i===0?'1.18':''),t>=2&&t<=3,'#C2410C');});
    OUT.forEach(function(p,i){g+=node(p,'#2E8540',i===0?'elma':'armut',t>=4?OV[i]:'',t>=4,'#2E8540');});
    $('nn-svg').innerHTML=g;$('nn-msg').textContent=s.m;}
  makeStepper('sinir-agi',S,render);
})();

/* ---------- 1. uygulama ---------- */
(function(){
  var L=['Yapay zekâ aracına soruyu yöneltip cevabı dikkatlice oku.','Cevapta doğrulanacak ifadeleri belirle (tarih, kurum adı, model, yer).','Bu bilgileri en az iki güvenilir kaynakla karşılaştır.','Cevabın doğru, eksik veya hatalı olduğuna karar ver.','Kullandığın kaynakları listele; neden güvendiğini yaz.'];
  var M=['Okurken kendine sor: Bu cevap çok kesin konuşuyor mu? Kaynak veriyor mu?','Altını çizilecek tipik ifadeler: “1960”, “IBM”, “Ankara”, “ilk”. Her biri ayrı doğrulanır.','İyi bir çift: bir resmî kurum veya üniversite sayfası + bir ansiklopedi ya da akademik kaynak.','Üç sonuçtan biri çıkar: doğru, eksik (bir kısmı doğru), hatalı. Eksik de değerli bir bulgudur.','Kaynak listesi: adres, yayın tarihi, neden güvenilir: “Resmî kurum”, “Hakemli dergi”.'];
  function render(s,k){var h='';L.forEach(function(t,i){var on=i===k-1;h+='<div class="card" style="flex-direction:row;align-items:center;gap:18px;padding:12px 22px;'+(on?'outline:5px solid #FF9F5A;background:#FFF3E8':'')+'"><span class="num" style="width:40px;height:40px;font-size:22px">'+(i+1)+'</span><span style="font-size:25px;line-height:1.3;color:#1B2533">'+t+'</span></div>';});
    $('u1-list').innerHTML=h;$('u1-msg').textContent=k===0?'İleri düğmesine bas: beş adımı tek tek göreceksin.':M[k-1];}
  makeStepper('uygulama1',[0,1,2,3,4,5],render);
})();

/* ---------- filtre balonu ---------- */
(function(){
  if(!$('fb-feed'))return;
  var T=[['Futbol','#2E8540'],['Oyun','#2F6FDE'],['Müzik','#9333EA'],['Bilim','#0E7490'],['Tarih','#92400E'],['Sanat','#BE185D'],['Yemek','#C2410C'],['Doğa','#3F6212'],['Teknoloji','#1E3A8A']];
  var w=T.map(function(){return 1;});
  function slots(){var sq=w.map(function(x){return x*x;}),sum=sq.reduce(function(a,b){return a+b;},0);
    var raw=sq.map(function(x){return x/sum*10;}),fl=raw.map(Math.floor),left=10-fl.reduce(function(a,b){return a+b;},0);
    var ord=raw.map(function(r,i){return [r-Math.floor(r),i];}).sort(function(a,b){return b[0]-a[0];});
    for(var i=0;i<left;i++)fl[ord[i][1]]++;return fl;}
  function render(){var sl=slots(),cells=[];
    sl.forEach(function(c,i){for(var j=0;j<c;j++)cells.push(i);});
    $('fb-feed').innerHTML=cells.map(function(i){return '<div style="background:'+T[i][1]+';color:#FFF;border-radius:12px;height:230px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:600;text-align:center;padding:6px">'+T[i][0]+'</div>';}).join('');
    var d=sl.filter(function(c){return c>0;}).length;
    $('fb-d').style.width=Math.round(d/9*100)+'%';
    $('fb-d').style.background=d>=7?'#2E8540':(d>=4?'#D9A400':'#B42318');
    $('fb-dt').textContent=d>=7?'Çeşitli akış ('+d+'/9 konu)':(d>=4?'Daralıyor ('+d+'/9 konu)':'Filtre balonu: dar akış ('+d+'/9 konu)');}
  var bt='';T.forEach(function(t,i){bt+='<button type="button" class="opt" data-i="'+i+'">♥ '+t[0]+'</button>';});
  $('fb-btns').innerHTML=bt;
  $('fb-btns').addEventListener('click',function(e){var b=e.target.closest('.opt');if(!b)return;w[+b.getAttribute('data-i')]+=1;render();});
  $('fb-reset').addEventListener('click',function(){w=T.map(function(){return 1;});render();});
  render();
})();

/* ---------- tarihçe ---------- */
(function(){
  var E=[
    ['1943','İlk yapay nöron','McCulloch ve Pitts, insan beynindeki sinir hücresinin çalışmasını modelleyen ilk matematiksel yapıyı geliştirdi. Bugünkü yapay sinir ağlarının temeli.',0],
    ['1950','Turing Testi','Alan Turing, makinenin düşünüp düşünemediğini ölçmek için bir test önerdi: karşıdaki insan mı makine mi, ayırt edilebiliyor mu?',0],
    ['1956','“Yapay zekâ” adı doğdu','Dartmouth Konferansı’nda “Artificial Intelligence” terimi ilk kez kullanıldı. Alan resmen başladı.',0],
    ['1959','Cahit Arf, Erzurum','Türkiye’de konu ilk kez Cahit Arf tarafından “Makine düşünebilir mi ve nasıl düşünebilir?” konuşmasıyla dile getirildi.',0],
    ['1966','ELIZA','İnsanlarla sohbet edebilen ilk bilgisayar programlarından biri. Kural ve anahtar kelimelerle çalışırdı, öğrenmezdi.',0],
    ['1997','Deep Blue','IBM’in Deep Blue bilgisayarı dünya satranç şampiyonu Kasparov’u yendi. Karmaşık strateji problemlerinde dönüm noktası.',0],
    ['2012','AlexNet','Derin öğrenme, ImageNet görüntü tanıma yarışmasında rakiplerini büyük farkla geçti. Eğitim GPU’larla yapıldı.',1],
    ['2016','AlphaGo','Google DeepMind’ın AlphaGo programı, Go oyununda dünya şampiyonu Lee Sedol’u 4-1 yendi. Pekiştirmeli öğrenmenin sembolü.',1],
    ['2017','Transformer','“Attention Is All You Need” makalesi yeni bir mimari tanıttı. Bugünkü büyük dil modellerinin temeli bu mimaridir.',1],
    ['2022','ChatGPT ve görsel üreticiler','Sohbet arayüzü yapay zekâyı milyonlarca insana ulaştırdı. Aynı yıl görsel üretim araçları da yaygınlaştı.',1],
    ['2024','Nobel ve AB Yasası','Fizik Nobel’i Hopfield ve Hinton’a, Kimya Nobel’i protein yapay zekâsı AlphaFold ile Hassabis, Jumper ve Baker’a verildi. AB Yapay Zekâ Yasası yürürlüğe girdi.',1],
    ['2026','Türkiye Eylem Planı','Türkiye Yapay Zekâ Eylem Planı (2026-2030), 18 Ağustos 2026 tarihli Resmî Gazete’de (sayı 33344) Cumhurbaşkanlığı Genelgesi ile yayımlandı.',1]];
  function render(s,k){var h='';E.forEach(function(e,i){var on=i===k,done=i<=k,c=e[3]?'#C2410C':'#2F6FDE';
    h+='<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:'+(on?44:30)+'px;height:'+(on?44:30)+'px;border-radius:50%;background:'+(done?c:'#E2DED3')+';border:'+(on?'6px solid #14202E':'0')+'"></div><span style="font-size:22px;font-weight:'+(on?700:500)+';color:'+(done?'#14202E':'#8A97A8')+'">'+e[0]+'</span></div>';});
    $('tr-line').innerHTML=h;var e=E[k];
    $('tr-card').innerHTML='<div style="display:flex;align-items:baseline;gap:24px"><span style="font-size:80px;font-weight:700;color:'+(e[3]?'#C2410C':'#2F6FDE')+'">'+e[0]+'</span><h3 style="font-size:52px;font-weight:600;color:#14202E">'+e[1]+'</h3><span class="pill '+(e[3]?'o':'b')+'" style="margin-left:auto">'+(e[3]?'Kitaba ek':'Kitapta var')+'</span></div><p style="font-size:30px;line-height:1.45;color:#3D4A5C">'+e[2]+'</p>';}
  makeStepper('tarih',E,render);
})();
