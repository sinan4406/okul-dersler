#!/usr/bin/env python3
"""7. hafta sunumunu birleştirir: head + slaytlar (elle yazılanlar + .ino'dan üretilen örnekler) + foot + scriptler -> sunum.html"""
import json, re, os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
INO = os.path.join(HERE, '..', 'Hafta07_Arduino')

def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

def ino_code(folder):
    name = os.path.basename(folder)
    s = read(os.path.join(INO, folder, name + '.ino'))
    s = s[s.index('*/') + 2:]
    s = s[:s.rindex('/*')]
    return [l.rstrip() for l in s.strip('\n').split('\n')]

EX = [
 dict(n=1, id='ex1', folder='Ornek1_KalpMonitoru', level='Temel · 1 LED', title='Kalp Monitörü', sub='lub-dub ritmi',
  scn='Kızılay Haftası: ilk yardım eğitimindeki monitör kalbin iki vuruşunu bir LED ile gösterir. Dakikada 72 atım, yani her atım 833 ms. EKG çizgisinde her LED yanışı bir tepe oluşturur.',
  leds=[dict(pin=8, color='red', tag='D8 kalp')], scene='ecg', map=dict(heart=8), win=4000,
  malz='Arduino Uno · Breadboard · 1 kırmızı LED · 1 direnç (220 Ω) · 2 jumper kablo',
  dene='Hızı 2× yap. EKG çizgisinde iki tepe, sonra uzun düz bölüm görüyor musun? Zaman çizelgesinde bir turun 833 ms olduğunu say.',
  tink='Tinkercad: Arduino Uno + Breadboard Small + LED + Resistor (220 Ω) sürükle. GND → mavi hat, LED katot → mavi hat, D8 → direnç, direnç → LED anot. Code → Text → kodu yapıştır → Start Simulation.',
  note_a='Önce 5. adımda öğrendiğiniz akım halkasını hatırlatın: bu devre tek LED’li devredir. Kalbin “lub-dub” sesini el çırparak taklit edin, sonra devreyi çalıştırın. Zaman çizelgesinde iki kısa yüksek bölüm ve uzun alçak bölüm görünür. Hesap: bir tur 120 + 130 + 120 + 463 = 833 ms; 60000 / 833 ≈ 72 atım/dk (dinlenme halindeki sağlıklı yetişkin kalbi). Kızılay Haftası ile bağlayın: ilk yardımda nabız ve kalp ritmi önemlidir.',
  notes=[
   ('void setup','setup(): hazırlık','Kart açılınca bir kez çalışır. Hazırlık komutları buraya yazılır.','Program başladı.'),
   ('pinMode(8','D8 çıkış','LED D8’e bağlı. Pini çıkış yapmazsak kart LED’e akım veremez.','D8: OUTPUT · 0 V'),
   ('}','setup biter','Hazırlık bitti. setup bir daha çalışmaz; sıra loop()’ta.','Sıra loop()’ta.'),
   ('void loop','loop(): kalp atışı tekrar tekrar','Aşağıdaki 8 komut bir atımdır (iki vuruş + dinlenme). Bitince program başa döner; kalp durmadan atar.','loop 1. tur'),
   ('1. vuruş','1. vuruş: LED yan','D8 HIGH → 5 V: akım dirençten ve LED’den geçer, LED yanar. Bu kalbin kasılması, yani “lub”.','D8: HIGH (5 V) · LED yanıyor'),
   ('120 ms yanık kal','delay(120): yanık kal','LED 120 ms yanık kalır. Bekleme boyunca pin durumu değişmez.','D8: HIGH · 120 ms'),
   ('gevşeme','Gevşeme: LED sön','D8 LOW → 0 V: akım durur, LED söner. Kalp gevşer.','D8: LOW (0 V) · LED söndü'),
   ('130 ms kısa ara','delay(130): kısa ara','İki vuruş arasındaki kısa boşluk: 130 ms.','D8: LOW · 130 ms'),
   ('2. vuruş','2. vuruş: LED tekrar yan','İkinci vuruş, “dub”. İki vuruş arka arkaya kalbin ritmini verir.','D8: HIGH · LED yanıyor'),
   ('yine 120','delay(120): yine yanık kal','Aynı süre: 120 ms.','D8: HIGH · 120 ms'),
   ('gevşeme','Gevşeme','İkinci vuruş bitti, LED söndü.','D8: LOW · LED söndü'),
   ('dinlenme','delay(463): dinlenme','İki atım arasındaki uzun boşluk. Tur toplamı 120 + 130 + 120 + 463 = 833 ms, yani 60000 / 833 ≈ 72 atım/dk.','D8: LOW · 463 ms'),
   ('}','loop sonu: başa dön','Kart loop’un başına döner (setup’a değil). Kalp sürekli atar.','Tur süresi: 833 ms')],
  tasks=[('Son delay(463) değerini 263 yap, derle. Kalp kaç atım/dk olur?','Tur 120 + 130 + 120 + 263 = 633 ms; 60000 / 633 ≈ 95 atım/dk. Kalp hızlanır (koşudan sonra gibi).'),
         ('İkinci vuruşun 3 satırını sil (HIGH, delay(120), LOW). Monitöre ne olur?','Tek vuruş kalır: LED 120 ms yanar, 130 + 463 = 593 ms söner. Tur 713 ms, yaklaşık 84 atım/dk.')]),
 dict(n=2, id='ex2', folder='Ornek2_AmbulansCakar', level='Uygulama · 2 LED', title='Ambulans Çakarı', sub='kırmızı ve mavi',
  scn='Ambulansın çakar lambası önce kırmızıyı iki kez, sonra maviyi iki kez çaktırır. İki LED, iki ayrı pin, iki ayrı direnç: kod her pini ayrı sürer.',
  leds=[dict(pin=4, color='red', tag='D4 kırmızı'), dict(pin=5, color='blue', tag='D5 mavi')], scene='ambulance', map=dict(R=4, B=5), win=3200,
  malz='Arduino Uno · Breadboard · 1 kırmızı + 1 mavi LED · 2 direnç (220 Ω) · 3 jumper kablo (her LED’in kendi direnci)',
  dene='Hızı 1× bırak. Zaman çizelgesinde D4 ve D5 aynı anda yüksek oluyor mu? Kırmızı ve mavi çakmaları sayın: her renk kaç kez çakıyor?',
  tink='Tinkercad: Her LED için ayrı direnç kullan. D4 → direnç → kırmızı LED, D5 → direnç → mavi LED, iki katot mavi GND hattında. Tek dirençle iki LED bağlama.',
  note_a='Bu, kitap s.64–65’teki 2 LED’li uygulamanın daha yaratıcı hâli: iki LED dönüşümlü yanar. Ambulans, itfaiye ve polis araçları çakar ışıklarını bu tür kalıplarla yapar. Devre: her LED’in kendi 220 Ω direnci, iki katot ortak mavi hatta. Mavi LED’in gerilim düşümü kırmızıdan yüksektir (yaklaşık 3 V), bu yüzden 220 Ω ile akımı biraz daha azdır (9,1 mA); canlı uygulamada pin tablosundan karşılaştırın. Soldaki LED mavi (D5), sağdaki kırmızı (D4): Arduino’da pin sırası soldan sağa D5, D4 olduğu için.',
  notes=[
   ('void setup','setup(): iki çakar hazırlığı','Kart açılınca bir kez çalışır.','Program başladı.'),
   ('pinMode(4','D4: kırmızı çakar çıkış','Kırmızı LED D4’e bağlı. Her pinin kendi pinMode satırı olur.','D4: OUTPUT'),
   ('pinMode(5','D5: mavi çakar çıkış','İkinci LED için ayrı pinMode gerekir.','D5: OUTPUT'),
   ('}','setup biter','Hazırlık tamam.','Sıra loop()’ta.'),
   ('void loop','loop(): çakar kalıbı','Sekiz satırlık kalıp: kırmızı iki çakma, mavi iki çakma. Toplam 800 ms; sonra baştan.','loop 1. tur'),
   ('kırmızı 1.','Kırmızı 1. çakma','Bir satırda iki komut var: önce D4 HIGH, ardından delay(100). Her komut ; ile biter. Kırmızı LED 100 ms yanık.','D4: HIGH · 100 ms'),
   ('kırmızı kısa ara','Kırmızı kısa ara','D4 LOW: LED söner, 60 ms bekle. İki çakmayı ayırır.','D4: LOW · 60 ms'),
   ('kırmızı 2.','Kırmızı 2. çakma','Kırmızı bir kez daha yanar: çift çakma.','D4: HIGH · 100 ms'),
   ('kırmızı bitti','Kırmızı bitti','D4 LOW, 140 ms bekle. Kırmızı kısım toplam 100 + 60 + 100 + 140 = 400 ms.','D4: LOW · 140 ms'),
   ('mavi 1.','Mavi 1. çakma','Şimdi D5: mavi LED 100 ms yanar. Kırmızı sönük, yani iki LED aynı anda yanmaz.','D5: HIGH · 100 ms'),
   ('mavi kısa ara','Mavi kısa ara','D5 LOW, 60 ms.','D5: LOW · 60 ms'),
   ('mavi 2.','Mavi 2. çakma','Mavi ikinci kez çakar.','D5: HIGH · 100 ms'),
   ('mavi bitti','Mavi bitti','D5 LOW, 140 ms. Mavi kısım da 400 ms.','D5: LOW · 140 ms'),
   ('}','loop sonu','Başa dön: kırmızı-mavi çakar sürekli döner. Tur 400 + 400 = 800 ms.','Tur süresi: 800 ms')],
  tasks=[('Bütün delay(100) değerlerini 50 yap, derle. Çakar nasıl değişir?','Yanma süreleri yarıya iner; tur 800 − 4 × 50 = 600 ms olur. Çakar daha hızlı ve daha acil görünür.'),
         ('Mavi çakmanın son 4 satırını sil, derle. D5’teki LED ne yapar?','D5 çıkış yapılmış ama hiç HIGH yazılmaz: mavi LED hep sönük kalır; yalnız kırmızı çakar (tur 400 ms). Konsolda da uyarı çıkar.')]),
 dict(n=3, id='ex3', folder='Ornek3_SarjGostergesi', level='Önceki haftalarla birleştirme · 5 LED', title='Pil Şarj Göstergesi', sub='5 seviyeli gösterge',
  scn='3. haftadaki LiPo pil konusu ile 6. haftadaki LED ve delay bilgisi birleşiyor: robotun pili şarj olurken 5 seviye sırayla dolar, dolu kalır, sonra boşalır. Kitap s.67’deki yöntemle, her LED için ayrı komut yazıyoruz.',
  leds=[dict(pin=2, color='green', tag='D2'), dict(pin=3, color='green', tag='D3'), dict(pin=4, color='yellow', tag='D4'), dict(pin=5, color='yellow', tag='D5'), dict(pin=6, color='red', tag='D6')], scene='battery', map=dict(pins=[6, 5, 4, 3, 2]), win=10500,
  malz='Arduino Uno · Breadboard (30 sütun) · 1 kırmızı, 2 sarı, 2 yeşil LED · 5 direnç (220 Ω) · 6 jumper kablo',
  dene='Hızı 5× yap. Zaman çizelgesinde yanma sırasını izle: D6 ilk, D2 son mu? Boşalmada sıra tersine mi dönüyor? Pil yüzdesini (sağ üst) takip et.',
  tink='Tinkercad: Breadboard Small’a 5 LED + 5 direnç yerleştir. LED’ler soldan sağa D6, D5, D4, D3, D2. Her LED’in kendi direnci, tüm katotlar mavi GND hattında.',
  note_a='Geçen haftaki LED + direnç devresini 5 kez tekrarlıyoruz: kurma sırasını önceki slayttaki animasyondan izleyin. Kod tarafında dikkat çekin: her LED için ayrı pinMode ve ayrı digitalWrite var; 5 LED’de 15 komut yazdık. Bu yaklaşım kitap s.67’deki 5 LED örneğiyle aynı. Pil göstergesinde renkler: kırmızı = düşük, sarı = orta, yeşil = iyi. Süreler: dolum 4 × 500 ms + dolu bekleme 1500 ms = 3500 ms, boşalma 4 × 250 + 750 = 1750 ms; toplam 5250 ms. Sonra “Kod uzuyor” slaytıyla for döngüsüne köprü kuracağız.',
  notes=[
   ('void setup','setup(): 5 LED hazırlığı','Kart açılınca bir kez çalışır. Beş pin için beş ayrı pinMode yazacağız.','Program başladı.'),
   ('pinMode(2','D2 çıkış (en sağ LED)','Her LED’in pini ayrı ayarlanır. D2 yeşil, 5. seviyedir.','D2: OUTPUT'),
   ('pinMode(6','D6 çıkış (en sol LED)','Aynı kalıp D3, D4, D5, D6 için de tekrarlanır. D6 kırmızı, 1. seviyedir.','D2–D6: OUTPUT'),
   ('}','setup biter','Beş satırlık hazırlık bitti.','Sıra loop()’ta.'),
   ('void loop','loop(): şarj ve boşalma','10 satır: önce dolum (5 satır), sonra boşalma (5 satır). Bitince başa döner.','loop 1. tur'),
   ('%20','Şarj %20','D6 kırmızı LED yanar. Aynı satırda iki komut: digitalWrite ve delay(500).','D6: HIGH · %20'),
   ('%40','Şarj %40','D5 sarı LED de yanar. D6 hâlâ yanık: LED’ler sönmediği için birikir.','D5, D6: HIGH · %40'),
   ('%60','Şarj %60','D4 ikinci sarı yanar.','D4–D6: HIGH · %60'),
   ('%80','Şarj %80','D3 ilk yeşil yanar.','D3–D6: HIGH · %80'),
   ('%100','Şarj %100: dolu','D2 son yeşil yanar; 5 LED yanık. delay(1500): dolu hâli 1,5 sn gösterilir.','D2–D6: HIGH · %100'),
   ('boşalma: son yeşil','Boşalma başlıyor','D2 LOW: son seviye söner. Sıra tersine döner.','D2: LOW · %80'),
   ('boşalma: ilk yeşil','Boşalma','D3 LOW.','D3: LOW · %60'),
   ('boşalma: ikinci sarı','Boşalma','D4 LOW.','D4: LOW · %40'),
   ('boşalma: ilk sarı','Boşalma','D5 LOW.','D5: LOW · %20'),
   ('boş: kırmızı','Boş: %0','D6 LOW: tüm LED’ler sönük. delay(750) ile 0,75 sn beklenir ve tur biter.','D2–D6: LOW · %0'),
   ('}','loop sonu','Başa dön: şarj tekrar başlar. Tur 5250 ms. Dikkat: 10 satır yazdık; 12 LED olsaydı 36 satır gerekirdi.','Tur süresi: 5,25 sn')],
  tasks=[('delay(1500) değerini 3000 yap, derle. Gösterge dolu halde ne kadar kalır?','Dolu hâl 3 saniye görünür; tur 5250 + 1500 = 6750 ms olur.'),
         ('loop içindeki digitalWrite(6, HIGH); komutunu sil (delay(500) kalsın). Kırmızı seviye ne yapar?','D6 hiç HIGH olmaz: kırmızı LED sönük kalır. Tur süresi değişmez (5250 ms); gösterge %20 adımını atlar gibi görünür.')]),
 dict(n=4, id='ex4', folder='Ornek4_RobotTarayici', level='Sektör · 7 LED · for döngüsü', title='Güvenlik Robotu Tarayıcısı', sub='for ile 7 LED',
  scn='Gece devriyesindeki güvenlik robotunun yüzünde 7 LED’lik tarayıcı çubuğu: tek bir ışık noktası gidip gelir. 7 LED’i for döngüsü ve int i sayacı ile yönetiyoruz; kod 11 satır.',
  leds=[dict(pin=p, color='red', tag='D%d' % p) for p in range(2, 9)], scene='visor', map=dict(pins=[8, 7, 6, 5, 4, 3, 2]), win=3000,
  malz='Arduino Uno · Uzun breadboard (42 sütun) veya 2 küçük breadboard · 7 kırmızı LED · 7 direnç (220 Ω) · 8 jumper kablo',
  dene='Hızı 1× bırak. Sağdaki “Şu an” kutusunda i değerini izle: i = 2’den 8’e, sonra 7’den 3’e gidiyor mu? Zaman çizelgesinde tek bir LED aynı anda yanıyor mu?',
  tink='Tinkercad: 7 LED + 7 direnç. LED’ler soldan sağa D8 … D2 (Arduino pin sırası). Her LED’in kendi direnci, katotlar ortak mavi GND hattında. Breadboard Small 30 sütun olduğundan iki tane birleştir veya LED’leri iki sıraya dağıt.',
  note_a='Kitap s.69–70’teki 7 LED için yazılan for kodunu, gerçek bir ürüne (güvenlik robotunun tarayıcı ışığı) dönüştürdük. Önce 7 LED bağlantı planı slaytındaki tabloyu canlı devreyle karşılaştırın. Canlı uygulamada “Şu an” kutusunda hangi komutun çalıştığı ve i değişkeninin değeri görünür. Sıra: 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3 sonra yine 2: iki for döngüsü, biri artan biri azalan. Ağırlık: i-- ve koşul i >= 3. Tur 12 × 100 = 1200 ms. Sahnedeki LED’ler fiziksel pin sırasıyla soldan sağa D8 … D2 dizilidir, bu yüzden tarama sağdan başlar.',
  notes=[
   ('int i','int i: sayaç değişkeni','int tam sayı saklayan değişkendir. Programın en üstünde bir kez tanımlanır; hem setup hem loop içinde kullanılır.','i = 0'),
   ('void setup','setup(): hazırlık','Kart açılınca bir kez çalışır. 7 pinMode yerine tek bir for yazacağız.','Program başladı.'),
   ('i sırayla','for: i = 2, 3, ... 8','Başlangıç i = 2, koşul i <= 8, artış i++. Süslü parantezler içindeki komut 7 kez çalışır.','i = 2 … 8'),
   ('tek satır','pinMode(i, OUTPUT)','i hangi sayıdaysa o pin çıkış olur. i = 2 iken D2, i = 3 iken D3, ... D8. Böylece 7 satırlık iş 1 satıra indi.','D2–D8: OUTPUT'),
   ('}','for biter','Kapanan parantez for’un gövdesinin sonudur; döngü koşul yanlış olana kadar başa döner.','i = 9 → döngü bitti'),
   ('}','setup biter','Hazırlık bitti. Sıra loop()’ta.','Sıra loop()’ta.'),
   ('void loop','loop(): tarama','İki for: ileri tarama ve geri tarama. Bitince başa döner.','loop 1. tur'),
   ('2. pinden','İleri: i = 2, 3, ... 8','for yine i’yi 2’den 8’e götürür. Her turda aşağıdaki üç komut çalışır.','i = 2 … 8'),
   ('yansın','digitalWrite(i, HIGH)','i hangi sayıdaysa o LED yanar: i = 2 iken D2, i = 3 iken D3.','LED i yanıyor'),
   ('100 ms parlasın','delay(100)','LED 100 ms parlak kalır. Tek ışık noktası böyle “yürür”.','100 ms'),
   ('sönsün','digitalWrite(i, LOW)','Aynı LED hemen söner; sonra i++ ile bir sonraki LED’e geçilir. Bu yüzden aynı anda tek LED yanık.','LED i söndü'),
   ('}','ilk for biter','i = 9 olunca koşul yanlış olur; program ikinci for’a geçer.','i = 9'),
   ('geri dön','Geri: i = 7, 6, ... 3','Başlangıç i = 7, koşul i >= 3, artış i-- (i’yi azaltır). Böylece 7, 6, 5, 4, 3 sırasıyla geri dönülür; 8 ve 2 tekrar yanmaz.','i = 7 … 3'),
   ('}','ikinci for biter','i = 2 olunca koşul yanlış olur; döngü biter.','i = 2'),
   ('}','loop sonu','Başa dön: tarama sürekli gidip gelir. Tur: 7 × 100 + 5 × 100 = 1200 ms.','Tur süresi: 1,2 sn')],
  tasks=[('Bütün delay(100) değerlerini 50 yap, derle. Tarama nasıl değişir?','Her LED 50 ms yanar; tur 12 × 50 = 600 ms olur. Tarama iki kat hızlanır.'),
         ('İlk for’daki koşulu i <= 5 yap (setup’takine dokunma), derle. Hangi LED hiç yanmaz?','İleri turda yalnız D2–D5 yanar; geri turda i = 7 ve 6 de yanar. D8 hiç yanmaz; D6 ve D7 yalnız geri dönüşte yanar.')]),
]

def a_slide(ex):
    ids = ex['id']
    big = len(ex['leds']) >= 4
    sw = 480 if big else 560
    scene = '<div style="max-width:%dpx"><div id="%s-sen-scene" style="border-radius:16px;overflow:hidden"></div></div>' % (sw, ids)
    return f'''<section id="{ids}-sen" class="sl light tight tight2">
<div class="hd"><p class="eb">Örnek {ex['n']} · {ex['level']} · Canlı devre ve simülasyon</p><h2 class="ttl">{ex['title']}: {ex['sub']}</h2>
<p style="font-size:24px;line-height:1.35;color:#3D4A5C;max-width:1740px">{ex['scn']}</p></div>
<div class="row" style="gap:28px;align-items:flex-start">
<div class="col" style="width:920px;gap:12px">
<div class="ckt" id="{ids}-sen-ckt"></div>
<div class="card warn" style="padding:12px 22px;gap:4px"><h3 style="font-size:23px">Dene</h3><p style="font-size:21px;line-height:1.35">{ex['dene']}</p></div>
</div>
<div class="col f1" style="gap:10px">
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
<aside>Kodu satır satır okuyun. İleri düğmesi sıradaki açıklamalı satıra geçer; satıra tıklayarak da atlayabilirsiniz. Her satırdaki komut sade Türkçe yorumla yazılmıştır; sağdaki kutu bu satırdan sonra pinin ve LED’in durumunu özetler. Öğrencilerden bir sonraki satırın ne yapacağını tahmin etmelerini isteyin. Hazır dosya: Hafta07_Arduino/{ex['folder']}/{ex['folder']}.ino</aside>
</section>
'''

def dene_slide(ex):
    ids = ex['id']
    big = len(ex['leds']) >= 4
    cw = 520 if big else 620
    nl = len(ino_code(ex['folder']))
    th = 'height:%dpx' % min(470, int(nl * 27.5 + 40))
    t1, a1 = ex['tasks'][0]
    t2, a2 = ex['tasks'][1]
    return f'''<section id="{ids}-dene" class="sl dark tight tight2">
<div class="hd"><p class="eb">Örnek {ex['n']} · Değiştir ve gözle</p><h2 class="ttl">{ex['title']}: kodu değiştir, sonucu izle</h2></div>
<div class="row" style="gap:26px;align-items:flex-start">
<div class="col" style="width:880px;gap:10px">
<textarea class="ed" id="{ids}-dene-ed" spellcheck="false" aria-label="Arduino kodu" style="{th};font-size:19px"></textarea>
<div class="stp"><button type="button" class="go" id="{ids}-dene-btn">Derle ve yükle</button><button type="button" id="{ids}-dene-orig">Başlangıç kodu</button></div>
<div class="conso" id="{ids}-dene-con" style="min-height:70px;max-height:90px;font-size:17px"></div>
<div class="row" style="gap:14px;align-items:flex-start"><div class="card dk f1" style="padding:10px 16px;gap:6px"><p style="font-size:20px"><b style="color:#FF9F5A">1)</b> {t1}</p><button class="ans-btn sm" type="button">Cevabı göster</button><div class="ans" hidden style="font-size:19px">{a1}</div></div>
<div class="card dk f1" style="padding:10px 16px;gap:6px"><p style="font-size:20px"><b style="color:#FF9F5A">2)</b> {t2}</p><button class="ans-btn sm" type="button">Cevabı göster</button><div class="ans" hidden style="font-size:19px">{a2}</div></div></div>
</div>
<div class="col f1" style="gap:10px">
<div class="ckt" id="{ids}-dene-ckt" style="max-width:{cw}px"></div>
<div id="{ids}-dene-ctl"></div>
<div id="{ids}-dene-tl" style="max-width:{cw}px"></div>
<div class="codebox" style="padding:10px 16px;max-width:{cw}px"><div id="{ids}-dene-pins"></div></div>
</div>
</div>
<aside>Eşli çalışma, 8–10 dakika. Soldaki kutuda kodu değiştirin, “Derle ve yükle” (veya Ctrl+Enter) ile karta yükleyin. Derleme hatası olursa konsol satır numarasıyla gösterir; eski program çalışmaya devam eder. “Başlangıç kodu” düğmesi her şeyi geri alır. İki görevi öğrenciler tahmin edip denesin, sonra cevabı açın. Tinkercad’de aynı değişikliği de denetin.</aside>
</section>
'''

def make_examples():
    parts, cfg = {}, []
    for ex in EX:
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
        parts['EX%d' % ex['n']] = a_slide(ex) + kod_slide(ex) + dene_slide(ex)
    return parts, cfg

ORDER = ['01_cover', '02_hedefler', '03_dikkat', '04_tekrar', '05_tek_led', '06_kur_coklu',
         'EX1', 'EX2', 'EX3', '10_satir', '11_for_kalip', '12_for_anim', '13_for_tahmin', '14_baglanti7', 'EX4',
         '31_hata_avi', '32_kitap', '33_ozet', '34_test1', '35_test2', '36_kapanis']

def main():
    head = read(os.path.join(SRC, 'head.html'))
    foot = read(os.path.join(SRC, 'foot.html'))
    ex_parts, cfg = make_examples()
    body = read(os.path.join(SRC, 'slides', '00_style.html'))
    for k in ORDER:
        body += ex_parts[k] if k.startswith('EX') else read(os.path.join(SRC, 'slides', k + '.html'))
    js = ''
    for n in ('core.js', 'circuit.js', 'engine.js', 'ui.js'):
        js += read(os.path.join(SRC, n)) + '\n'
    js += 'window.EXCFG=' + json.dumps(cfg, ensure_ascii=False) + ';\n'
    js += read(os.path.join(SRC, 'pages.js'))
    out = head + body + foot + '<script>\n' + js + '\n</script>\n'
    out = out.replace('<title>ROB 6. Hafta Sunumu</title>', '<title>ROB 7. Hafta Sunumu</title>')
    path = os.path.join(HERE, 'sunum.html')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(out)
    n = len(re.findall(r'<section\b', body))
    print('yazildi | slayt:', n, '| boyut:', len(out) // 1024, 'KB')

if __name__ == '__main__':
    main()
