#!/usr/bin/env python3
"""6. hafta sunumunu birleştirir: head + slaytlar (elle yazılanlar + .ino'dan üretilen örnekler) + foot + scriptler -> sunum.html"""
import json, re, glob, os, html

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
INO = os.path.join(HERE, '..', 'Hafta06_Arduino')

def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

def ino_code(folder):
    name = os.path.basename(folder)
    s = read(os.path.join(INO, folder, name + '.ino'))
    s = s[s.index('*/') + 2:]
    s = s[:s.rindex('/*')]
    lines = [l.rstrip() for l in s.strip('\n').split('\n')]
    return lines

EX = [
 dict(n=1, id='ex1', folder='Ornek1_DenizFeneri', level='Temel', title='Deniz Feneri', sub='bir LED, bir ritim',
  scn='Liman girişindeki fener 1 saniye yanar, 3 saniye söner. Kodun her satırını devrede izle.',
  leds=[dict(pin=8, color='red', tag='fener')], scene='lighthouse', map=dict(lamp=8), win=10000,
  malz='Arduino Uno · Breadboard · 1 kırmızı LED · 1 direnç (220 Ω) · 2 jumper kablo',
  dene='Hızı 5× yap ve zaman çizelgesini izle: D8 1 sn yüksek, 3 sn alçak mı? Pin tablosunda 5 V ve 13,6 mA değerlerini bul.',
  tink='Tinkercad: Arduino Uno + Breadboard Small + LED + Resistor (220 Ω) sürükle. GND → mavi hat, LED katot → mavi hat, D8 → direnç, direnç → LED anot. Code → Text → kodu yapıştır → Start Simulation.',
  note_a='Önce devreyi canlı çalıştırın ve zaman çizelgesindeki kare dalgayı gösterin: yüksek kısım 1 saniye, alçak kısım 3 saniye. Soru: “Deniz fenerleri neden uzun süre sönük kalır?” (Gemiler ışığı uzaktan görsün diye ritim önemli.) Her öğrenci Tinkercad’de aynı devreyi kurup çalıştırsın.',
  notes=[
   ('void setup','setup(): hazırlık bölümü','Kart açılınca bir kez çalışan fonksiyondur. void “değer döndürmez” demektir; { } içindeki komutlar bu bölüme aittir.','Program başladı, setup çalışıyor.'),
   ('pinMode(8','pinMode: 8. pini çıkış yap','pinMode(pin, mod) pinin görevini belirler. OUTPUT = çıkış: kart bu pinden LED’e akım verecek. Bu satırı silersen LED çok soluk yanar.','D8: OUTPUT · 0 V'),
   ('}','setup biter','Kapanan süslü parantez bölümün sonunu gösterir. setup bir daha çalışmaz.','Sıra loop()’ta.'),
   ('void loop','loop(): sürekli tekrar','Kart açık kaldıkça bu bölüm baştan sona çalışır, sonra başa döner.','loop 1. tur başlıyor.'),
   ('HIGH','digitalWrite(8, HIGH): LED yan','D8’e 5 V verir. Akım 5 V → direnç → LED anot → katot → GND yolunu izler (yaklaşık 13,6 mA). LED yanar. Komut ; ile biter.','D8: HIGH (5 V) · LED yanıyor'),
   ('delay(1000','delay(1000): 1 saniye bekle','delay milisaniye ister: 1000 ms = 1 s. Bekleme boyunca pin durumu değişmez, LED yanık kalır.','D8: HIGH · 1 sn bekleniyor'),
   ('LOW','digitalWrite(8, LOW): LED sön','D8’i 0 V yapar. İki uç arasında gerilim farkı kalmaz, akım durur, LED söner.','D8: LOW (0 V) · LED söndü'),
   ('delay(3000','delay(3000): 3 saniye bekle','LED 3 saniye sönük kalır. Yanık 1 sn + sönük 3 sn = 4 sn’lik döngü.','D8: LOW · 3 sn bekleniyor'),
   ('}','loop sonu: başa dön','Kapanan parantez loop’un sonudur. Kart otomatik olarak loop’un başına döner, setup’a değil.','Döngü süresi: 4 sn')],
  tasks=[('delay(3000) değerini 500 yap, derle. Fener nasıl görünür?','Döngü 1,5 sn’ye düşer; sönük süre 0,5 sn olur. Fener sık yanıp söner.'),
         ('pinMode(8, OUTPUT); satırını sil, derle. LED’e ne olur?','Derleme hatası yok ama pin giriş modunda kalır; LED çok soluk yanar (konsoldaki uyarıyı oku). Hazırlığı (setup) unutma.')]),
 dict(n=2, id='ex2', folder='Ornek2_SOS_Mors', level='Uygulama', title='SOS Mors Işığı', sub='imdat sinyali',
  scn='Denizde kaybolan bir tekne imdat sinyali verir: S (3 kısa), O (3 uzun), S (3 kısa). Mors bandında yanmaların kısa mı uzun mu olduğunu izle.',
  leds=[dict(pin=8, color='red', tag='imdat lambası')], scene='boat', map=dict(lamp=8), win=12000,
  malz='Arduino Uno · Breadboard · 1 kırmızı LED · 1 direnç (220 Ω) · 2 jumper kablo (Örnek 1 devresiyle aynı)',
  dene='Hızı 5× yap. Mors bandında 9 sembolün ardından “SOS” yazısı çıkıyor mu? Zaman çizelgesinde kısa ve uzun yanmaları say.',
  tink='Tinkercad: Örnek 1 devresini kopyala (Duplicate), kodu bu örnekle değiştir. Süreleri değiştirerek mors hızını ayarla.',
  note_a='Mors alfabesini kısaca tanıtın: nokta = kısa, çizgi = uzun (3 katı). SOS evrensel imdat işaretidir. Sahnedeki bandı öğrenciler okusun. Süreler: kısa 200 ms, uzun 600 ms, işaretler arası 200 ms, harfler arası 600 ms, tekrar arası 2 sn.',
  notes=[
   ('void setup','setup(): hazırlık','Kart açılınca bir kez çalışır.','Program başladı.'),
   ('pinMode(8','D8 çıkış','Tek LED’i D8’e bağladık. Çıkış yapmazsak komutlar LED’i düzgün yakmaz.','D8: OUTPUT'),
   ('}','setup biter','Hazırlık tamam. Bundan sonra loop çalışır.','Sıra loop()’ta.'),
   ('void loop','loop(): SOS tekrar tekrar','Aşağıdaki 9 yanıp sönme bitince program başa döner ve SOS yeniden gönderilir. Toplam 7,4 saniye.','loop 1. tur'),
   ('S harfi','S harfi: ··· (3 kısa)','Mors’ta S üç kısa ışıktır. Her kısa ışık: HIGH, 200 ms bekle, LOW, 200 ms ara. Her satırda iki komut var; ; her komutu ayırır.','Kısa = 200 ms yanık'),
   ('harf arası uzun ara','Harf sonu: uzun ara','Üçüncü kısa ışıktan sonra LOW’da 600 ms beklenir. Harfler arası boşluk, ışıklar arası boşluğun 3 katıdır.','LOW 600 ms (harf arası)'),
   ('O harfi','O harfi: −−− (3 uzun)','Mors’ta O üç uzun ışıktır. Uzun ışık, kısa ışığın 3 katıdır: 600 ms yanar.','Uzun = 600 ms yanık'),
   ('harf arası uzun ara','İkinci harf sonu','Yine 600 ms harf arası bekleme.','LOW 600 ms'),
   ('S harfi','Son S harfi','İlk S ile aynıdır. Yalnız son satırda LOW süresi 2000 ms: mesaj bitti, tekrar başlamadan önce 2 saniye bekle.','Son LOW 2000 ms'),
   ('sinyal bitti','Tekrar öncesi bekleme','delay(2000): iki SOS mesajı arasındaki boşluk. Karşı taraf yeni mesajı ayırt edebilsin diye.','LOW 2000 ms'),
   ('}','loop sonu','loop biter, kart başa döner: SOS sürekli tekrarlanır. Döngü 1600 + 2800 + 3000 = 7400 ms.','Döngü süresi: 7,4 sn')],
  tasks=[('Tüm kısa süreleri 100, uzun süreleri 300 ms yap (200→100, 600→300). Sinyal hâlâ okunabilir mi?','Oranlar aynı kaldığı için okunabilir ama iki kat hızlıdır. Mors’ta uzun = 3 kısa oranı önemlidir.'),
         ('Bir komutu digitalwrite (küçük w) yaz, derle.','Derleme hatası: ’digitalwrite’ was not declared in this scope; did you mean ’digitalWrite’? Büyük/küçük harf önemlidir.')]),
 dict(n=3, id='ex3', folder='Ornek3_RobotGozleri', level='Önceki haftalarla birleştirme', title='Robotun Gözleri', sub='iki LED, bir yüz',
  scn='5. haftadaki robot elektronik bileşenleri ile LED bilgini birleştir: eğitsel robotun gözleri sola ve sağa bakar, karşıya bakar, göz kırpar.',
  leds=[dict(pin=2, color='red', tag='D2 sol göz'), dict(pin=3, color='red', tag='D3 sağ göz')], scene='robot', map=dict(L=2, R=3), win=8000,
  malz='Arduino Uno · Breadboard · 2 kırmızı LED · 2 direnç (220 Ω) · 3 jumper kablo (her LED’in kendi direnci)',
  dene='Hızı 2× yap. Göz kırpma anında zaman çizelgesinde iki hat aynı anda düşüyor mu? Sol göz hangi pinde, sağ göz hangisinde?',
  tink='Tinkercad: Her LED için ayrı direnç kullan. D2 → direnç → LED1, D3 → direnç → LED2, iki LED’in katodu mavi GND hattına. Tek dirençle iki LED bağlama.',
  note_a='İki LED, iki ayrı pin, iki ayrı direnç. Önceki haftadaki “Robot elektronik bileşenleri” konusuna bağlayın: robotların gözleri ve gösterge ışıkları LED ile yapılır. Devredeki LED sırası Arduino pinlerinin fiziksel dizilimine göre yerleşti; etiketlerden sol/sağ gözü takip edin.',
  notes=[
   ('void setup','setup(): iki göz hazırlığı','Kart açılınca bir kez çalışır.','Program başladı.'),
   ('pinMode(2','D2: sol göz çıkış','Sol göz LED’i D2’ye bağlı. Çıkış yaparak LED’e akım verebiliriz.','D2: OUTPUT'),
   ('pinMode(3','D3: sağ göz çıkış','İkinci LED için ayrı bir pinMode gerekir; her pin kendi ayarını ister.','D3: OUTPUT'),
   ('}','setup biter','Hazırlık bitti.','Sıra loop()’ta.'),
   ('void loop','loop(): bakış döngüsü','Beş durum sırayla tekrarlanır. Toplam 3,85 saniye.','loop 1. tur'),
   ('sola bak','Sola bak','D2 HIGH (sol göz yanık), D3 LOW (sağ göz sönük). Bir satırda üç komut var, sırayla çalışırlar; her komut ; ile biter. 600 ms beklenir.','D2: HIGH · D3: LOW · 600 ms'),
   ('sağa bak','Sağa bak','Durumlar tersine döner: D2 LOW, D3 HIGH.','D2: LOW · D3: HIGH · 600 ms'),
   ('karşıya bak','Karşıya bak','İki göz birlikte yanar. Karşıya bakma süresi daha uzun: 1500 ms.','D2: HIGH · D3: HIGH · 1500 ms'),
   ('göz kırp','Göz kırp','İki göz çok kısa (150 ms) söner. Kısa süre göz kırpma hissi verir.','D2: LOW · D3: LOW · 150 ms'),
   ('tekrar açık','Gözler tekrar açık','Gözler 1 saniye açık kalır, sonra loop başa döner.','D2: HIGH · D3: HIGH · 1000 ms'),
   ('}','loop sonu','Döngü süresi: 600 + 600 + 1500 + 150 + 1000 = 3850 ms.','Döngü süresi: 3,85 sn')],
  tasks=[('Göz kırpma süresini 150’den 600’e çıkar. Robot yorgun mu görünür?','Gözler 0,6 sn kapalı kalır, robot uykulu görünür. delay süresi davranışın karakterini belirler.'),
         ('Kodda D3 yerine 9 yaz (üç yerde). Sağ göz ne olur?','D9’a bağlı LED yok: sağ göz hiç yanmaz ve konsolda uyarı çıkar. Devre ile kod aynı pini kullanmalı.')]),
 dict(n=4, id='ex4', folder='Ornek4_UcakIsiklari', level='Sektör', title='Uçak Navigasyon Işıkları', sub='havacılıktan bir uygulama',
  scn='Uçağın sol kanadında kırmızı, sağ kanadında yeşil ışık sürekli yanar; beyaz çakar ışık çift flaş yapar. Sürekli yanan lambalar setup’ta bir kez açılır.',
  leds=[dict(pin=2, color='red', tag='D2 sol kanat'), dict(pin=3, color='green', tag='D3 sağ kanat'), dict(pin=4, color='white', tag='D4 çakar')], scene='plane', map=dict(L=2, R=3, S=4), win=6000,
  malz='Arduino Uno · Breadboard · 1 kırmızı, 1 yeşil, 1 beyaz LED · 3 direnç (220 Ω) · 4 jumper kablo',
  dene='Hızı 1× bırak. Zaman çizelgesinde D2 ve D3 hep yüksek, D4 çift flaş mı? Pin tablosunda her LED’in akımını karşılaştır (renge göre değişir).',
  tink='Tinkercad: 3 LED, 3 direnç. D2 kırmızı, D3 yeşil, D4 beyaz. Üç katot da mavi GND hattında. Her LED kendi direnciyle bağlı.',
  note_a='Gerçek uçaklarda sol kanat ucu kırmızı, sağ kanat ucu yeşil, kuyrukta beyaz ışık bulunur; geceleri uçağın yönünü anlamayı sağlar. Kod tarafı: sürekli yanan lambalar setup’ta bir kez açılır, çünkü pin sonradan değişmedikçe durumunu korur. Çakar ise loop’ta sürekli değişir. Akım hesapları: kırmızı 13,6 mA, yeşil 12,7 mA, beyaz 9,1 mA (toplam 35,4 mA).',
  notes=[
   ('void setup','setup(): hazırlık ve sabit ışıklar','Kart açılınca bir kez çalışır. Sürekli yanacak lambalar da burada açılır.','Program başladı.'),
   ('pinMode(2','D2: kırmızı (sol kanat)','D2’yi çıkış yap. Kırmızı LED sol kanat ucunu temsil eder.','D2: OUTPUT'),
   ('pinMode(3','D3: yeşil (sağ kanat)','D3’ü çıkış yap. Yeşil LED sağ kanat ucunu temsil eder.','D3: OUTPUT'),
   ('pinMode(4','D4: beyaz çakar','D4’ü çıkış yap. Beyaz LED çakar ışığıdır.','D4: OUTPUT'),
   ('digitalWrite(2, HIGH)','Kırmızı lamba bir kez açılır','Komut setup içinde olduğu için yalnızca bir kez çalışır. Pin sonradan değiştirilmediği için LED hep yanık kalır.','D2: HIGH (sürekli)'),
   ('digitalWrite(3, HIGH)','Yeşil lamba bir kez açılır','Aynı mantık: bir kez HIGH, sonra hep yanık.','D3: HIGH (sürekli)'),
   ('}','setup biter','Sabit ışıklar yandı. Bundan sonra yalnız loop çalışır.','Sıra loop()’ta.'),
   ('void loop','loop(): beyaz çakar','Yalnızca beyaz LED (D4) sürekli yanıp söner; kırmızı ve yeşile dokunulmaz.','loop 1. tur'),
   ('1. flaş','1. flaş','D4 HIGH, 70 ms bekle: çok kısa parlama.','D4: HIGH · 70 ms'),
   ('kısa ara','Flaşlar arası kısa ara','D4 LOW, 100 ms bekle. İki flaşı birbirinden ayırır.','D4: LOW · 100 ms'),
   ('2. flaş','2. flaş','Aynı kısa parlama bir daha: çift flaş oluşur.','D4: HIGH · 70 ms'),
   ('uzun ara','Uzun ara','D4 LOW, 1500 ms: çift flaştan sonraki bekleme. Bir çift flaş + ara = 70 + 100 + 70 + 1500 = 1740 ms.','D4: LOW · 1500 ms'),
   ('}','loop sonu','Başa dön: çakar her 1,74 saniyede çift flaş yapar.','Döngü süresi: 1,74 sn')],
  tasks=[('İkinci flaşın 2 satırını sil. Çakar nasıl değişir?','Çakar tek flaşa döner. Çift flaş için iki ayrı yanma gerekir.'),
         ('delay(1500) değerini 300 yap. Bu cihaz hangi araca benzer?','Daha hızlı çakar: polis veya ambulans ışığı gibi. Süreler aracın karakterini belirler.')]),
]

def a_slide(ex, nxt):
    ids = ex['id']
    scene = ('<div style="max-width:560px"><div id="%s-sen-scene" style="border-radius:16px;overflow:hidden"></div></div>' % ids)
    return f'''<section id="{ids}-sen" class="sl light tight">
<div class="hd"><p class="eb">Örnek {ex['n']} · {ex['level']} · Canlı devre ve simülasyon</p><h2 class="ttl">{ex['title']}: {ex['sub']}</h2>
<p style="font-size:25px;line-height:1.35;color:#3D4A5C;max-width:1700px">{ex['scn']}</p></div>
<div class="row" style="gap:28px;align-items:flex-start">
<div class="col" style="width:920px;gap:12px">
<div class="ckt" id="{ids}-sen-ckt"></div>
<div class="card warn" style="padding:12px 22px;gap:4px"><h3 style="font-size:23px">Dene</h3><p style="font-size:21px;line-height:1.35">{ex['dene']}</p></div>
</div>
<div class="col f1" style="gap:12px">
{scene}
<div id="{ids}-sen-ctl"></div>
<div id="{ids}-sen-tl" style="max-width:640px"></div>
<div class="codebox" style="padding:12px 18px"><div id="{ids}-sen-pins"></div></div>
</div>
</div>
<p class="foot">Malzeme: {ex['malz']}</p>
<aside>{ex['note_a']} Tinkercad’de kurma adımları: {ex['tink']}</aside>
</section>
'''

def kod_slide(ex):
    ids = ex['id']
    return f'''<section id="{ids}-kod" class="sl dark tight">
<div class="hd"><p class="eb">Örnek {ex['n']} · Kodu satır satır oku · İmleci altı çizgili kelimelerin üzerine getir, satıra tıkla</p><h2 class="ttl">{ex['title']}: kodun açıklaması</h2></div>
<div class="row" style="gap:28px;align-items:flex-start">
<div class="codebox" style="width:1160px;padding:18px 24px"><div class="cgrid" id="{ids}-grid"></div></div>
<div class="col f1" style="gap:12px">
<div class="card dk" style="gap:10px;min-height:400px"><p style="font-size:20px;letter-spacing:2px;text-transform:uppercase;color:#93A3B8">Bu satır ne yapar?</p>
<p id="{ids}-kod-c" class="mono" style="font-size:22px;color:#F2CC60;white-space:pre-wrap;word-break:break-all"></p>
<h3 id="{ids}-kod-t" style="font-size:30px"></h3><p id="{ids}-kod-x" style="font-size:25px;line-height:1.4"></p>
<div style="margin-top:auto;background:#0B121B;border-radius:10px;padding:10px 16px"><p id="{ids}-kod-s" class="mono" style="font-size:22px;color:#9BE38B"></p></div></div>
<div class="stp"><button type="button" data-act="first">⏮</button><button type="button" data-act="prev">◀ Geri</button><button type="button" class="go" data-act="next">İleri ▶</button><button type="button" data-act="auto" aria-pressed="false">Otomatik oynat</button><span class="cnt">Adım 1</span></div>
</div>
</div>
<aside>Kodu satır satır okuyun. İleri düğmesi sıradaki açıklamalı satıra geçer; satıra tıklayarak da atlayabilirsiniz. Her satırdaki komut sade Türkçe yorumla yazılmıştır; sağdaki kutu bu satırdan sonra pinin ve LED’in durumunu özetler. Öğrencilerden bir sonraki satırın ne yapacağını tahmin etmelerini isteyin. Hazır dosya: Hafta06_Arduino/{ex['folder']}/{ex['folder']}.ino</aside>
</section>
'''

def dene_slide(ex):
    ids = ex['id']
    t1, a1 = ex['tasks'][0]
    t2, a2 = ex['tasks'][1]
    return f'''<section id="{ids}-dene" class="sl dark tight">
<div class="hd"><p class="eb">Örnek {ex['n']} · Değiştir ve gözle</p><h2 class="ttl">{ex['title']}: kodu değiştir, sonucu izle</h2></div>
<div class="row" style="gap:26px;align-items:flex-start">
<div class="col" style="width:880px;gap:10px">
<textarea class="ed" id="{ids}-dene-ed" spellcheck="false" aria-label="Arduino kodu" style="height:430px;font-size:20px"></textarea>
<div class="stp"><button type="button" class="go" id="{ids}-dene-btn">Derle ve yükle</button><button type="button" id="{ids}-dene-orig">Başlangıç kodu</button></div>
<div class="conso" id="{ids}-dene-con" style="min-height:96px;max-height:120px;font-size:18px"></div>
<div class="row" style="gap:14px;align-items:flex-start"><div class="card dk f1" style="padding:10px 16px;gap:6px"><p style="font-size:21px"><b style="color:#FF9F5A">1)</b> {t1}</p><button class="ans-btn sm" type="button">Cevabı göster</button><div class="ans" hidden style="font-size:20px">{a1}</div></div>
<div class="card dk f1" style="padding:10px 16px;gap:6px"><p style="font-size:21px"><b style="color:#FF9F5A">2)</b> {t2}</p><button class="ans-btn sm" type="button">Cevabı göster</button><div class="ans" hidden style="font-size:20px">{a2}</div></div></div>
</div>
<div class="col f1" style="gap:10px">
<div class="ckt" id="{ids}-dene-ckt" style="max-width:700px"></div>
<div id="{ids}-dene-ctl"></div>
<div id="{ids}-dene-tl" style="max-width:640px"></div>
<div class="codebox" style="padding:10px 16px"><div id="{ids}-dene-pins"></div></div>
</div>
</div>
<aside>Eşli çalışma, 8–10 dakika. Soldaki kutuda kodu değiştirin, “Derle ve yükle” (veya Ctrl+Enter) ile karta yükleyin. Derleme hatası olursa konsol satır numarasıyla gösterir; eski program çalışmaya devam eder. “Başlangıç kodu” düğmesi her şeyi geri alır. İki görevi öğrenciler tahmin edip denesin, sonra cevabı açın. Tinkercad’de aynı değişikliği de denetin.</aside>
</section>
'''

def make_examples():
    parts, cfg = [], []
    for i, ex in enumerate(EX):
        lines = ino_code(ex['folder'])
        notes, pos = [], 0
        for key, t, x, s in ex['notes']:
            idx = None
            for j in range(pos, len(lines)):
                if key in lines[j]:
                    idx = j; break
            if idx is None:
                raise SystemExit('Not bulunamadı: %s / %r' % (ex['id'], key))
            notes.append(dict(l=idx, t=t, x=x, s=s)); pos = idx + 1
        cfg.append(dict(id=ex['id'], leds=ex['leds'], scene=ex['scene'], map=ex['map'], win=ex['win'],
                        code='\n'.join(lines) + '\n', lines=lines, notes=notes))
        parts += [a_slide(ex, None), kod_slide(ex), dene_slide(ex)]
    return parts, cfg

def main():
    head = read(os.path.join(SRC, 'head.html'))
    foot = read(os.path.join(SRC, 'foot.html'))
    files = sorted(glob.glob(os.path.join(SRC, 'slides', '*.html')))
    pre = [f for f in files if int(os.path.basename(f)[:2]) <= 18]
    post = [f for f in files if int(os.path.basename(f)[:2]) >= 31]
    ex_parts, cfg = make_examples()
    body = ''.join(read(f) for f in pre) + ''.join(ex_parts) + ''.join(read(f) for f in post)
    js = ''
    for n in ('core.js', 'circuit.js', 'engine.js', 'ui.js'):
        js += read(os.path.join(SRC, n)) + '\n'
    js += 'window.EXCFG=' + json.dumps(cfg, ensure_ascii=False) + ';\n'
    js += read(os.path.join(SRC, 'pages.js'))
    out = head + body + foot + '<script>\n' + js + '\n</script>\n'
    path = os.path.join(HERE, 'sunum.html')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(out)
    n = len(re.findall(r'<section\b', body))
    print('yazıldı:', path, '| slayt:', n, '| boyut:', len(out) // 1024, 'KB')

if __name__ == '__main__':
    main()
