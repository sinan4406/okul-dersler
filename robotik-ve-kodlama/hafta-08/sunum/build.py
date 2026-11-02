#!/usr/bin/env python3
"""8. hafta sunumunu birleştirir: head + slaytlar (elle yazılanlar + .ino'dan üretilen örnekler) + foot + scriptler -> sunum.html"""
import json, re, os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
INO = os.path.join(HERE, '..', 'Hafta08_Arduino')

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
 dict(n=1, id='ex1', folder='Ornek1_TrafikLambasi', level='Temel · 3 LED', title='Trafik Lambası', sub='4 aşamalı döngü', step=True,
  scn='Kitap s.71–72: araç lambası kırmızı, kırmızı+sarı, yeşil, sarı sırasıyla döner. Pinlere isim veriyoruz.',
  leds=[dict(pin=2, color='red', tag='D2 kırmızı'), dict(pin=3, color='yellow', tag='D3 sarı'), dict(pin=4, color='green', tag='D4 yeşil')], scene='traffic', map=dict(k=2, s=3, y=4), win=11000,
  names=[('kirmizi', 2, 'Kırmızı LED'), ('sari', 3, 'Sarı LED'), ('yesil', 4, 'Yeşil LED')],
  malz='Arduino Uno · Breadboard · 1 kırmızı, 1 sarı, 1 yeşil LED · 3 direnç (220 Ω) · 4 jumper kablo',
  dene='Hızı 5× yap. Zaman çizelgesinde hangi iki LED aynı anda yanıyor? Araçlar hangi aşamada hareket ediyor?',
  tink='Tinkercad: Arduino Uno + Breadboard Small + 3 LED + 3 Resistor (220 Ω). GND → mavi hat, LED katotları → mavi hat. D2 → direnç → kırmızı, D3 → direnç → sarı, D4 → direnç → yeşil. Code → Text → kodu yapıştır → Start Simulation.',
  note_a='Önce şema slaytındaki devrenin breadboard’a nasıl geçtiğini gösterin: soldan sağa D4 yeşil, D3 sarı, D2 kırmızı (Arduino’daki pin sırası). Kitap s.71’deki Görsel 2.24 aynı devredir. Aşamalar: kırmızı 4 sn, kırmızı+sarı 1 sn, yeşil 4 sn, sarı 1,5 sn; tur 10,5 sn. Sahnede araç, yeşil ve (yalnız sarı) iken hareket eder, kırmızıda durur. Ders süresi için süreleri kısalttık; gerçek sinyalde sarı 3–6 sn’dir.',
  notes=[
   ('int kirmizi', 'int kirmizi = 2;', 'Yeni yapı: “kirmizi” adında bir tam sayı oluşturur ve içine 2 yazar. Artık kirmizi demek D2 pini demektir.', 'kirmizi = 2'),
   ('int sari', 'int sari = 3;', 'Aynı kalıp: sarı LED D3’e bağlı. İsmi sen seçersin; anlamlı olsun.', 'sari = 3'),
   ('int yesil', 'int yesil = 4;', 'Yeşil LED D4’te. Pin numaraları artık yalnız bu üç satırda yazılı.', 'yesil = 4'),
   ('void setup', 'setup(): hazırlık', 'Kart açılınca bir kez çalışır. Pinlerin yönü burada ayarlanır.', 'Program başladı.'),
   ('pinMode(kirmizi', 'pinMode(kirmizi, OUTPUT)', 'kirmizi = 2 olduğu için D2 çıkış olur. Numara yerine isim yazdık.', 'D2: OUTPUT'),
   ('pinMode(sari', 'pinMode(sari, OUTPUT)', 'sari = 3: D3 çıkış.', 'D3: OUTPUT'),
   ('pinMode(yesil', 'pinMode(yesil, OUTPUT)', 'yesil = 4: D4 çıkış. Üç LED de çıkış oldu.', 'D2–D4: OUTPUT'),
   ('}', 'setup biter', 'Hazırlık bitti. Sıra loop()’ta.', 'Sıra loop()’ta.'),
   ('void loop', 'loop(): trafik döngüsü', 'Dört aşama sırayla çalışır. Bitince program başa döner.', 'loop 1. tur'),
   ('1. DUR', 'Aşama 1: DUR', 'Kırmızı HIGH: kırmızı yanar. Önce diğer ikisini söndürmek için sonraki iki satır yazıldı.', 'D2: HIGH · kırmızı yanıyor'),
   ('digitalWrite(sari, LOW)', 'Sarı sönük', 'Sarı LOW: önceki turdan sarı yanık kalmasın.', 'D3: LOW'),
   ('digitalWrite(yesil, LOW)', 'Yeşil sönük', 'Yeşil LOW. Şimdi yalnız kırmızı yanık.', 'D4: LOW'),
   ('delay(4000)', 'delay(4000): 4 saniye bekle', 'Araçlar 4 saniye bekler. Bekleme boyunca pinler değişmez.', '4000 ms'),
   ('2. HAZIR', 'Aşama 2: HAZIR OL', 'Sarıyı da yakıyoruz. Kırmızıya dokunmadık, ikisi birlikte yanar.', 'D2, D3: HIGH'),
   ('delay(1000)', 'delay(1000)', '1 saniye “hazır ol”.', '1000 ms'),
   ('3. GEÇ', 'Aşama 3: GEÇ', 'Kırmızıyı söndür.', 'D2: LOW'),
   ('digitalWrite(sari, LOW)', 'Sarıyı söndür', 'Sarı da söner.', 'D3: LOW'),
   ('digitalWrite(yesil, HIGH)', 'Yeşili yak', 'Yeşil HIGH: yeşil yanar. Aynı anda kırmızı ve yeşil asla yanmaz.', 'D4: HIGH · yeşil yanıyor'),
   ('delay(4000)', 'delay(4000)', 'Araçlar 4 saniye geçer.', '4000 ms'),
   ('4. YAVAŞLA', 'Aşama 4: YAVAŞLA', 'Yeşil söner.', 'D4: LOW'),
   ('digitalWrite(sari, HIGH)', 'Sarıyı yak', 'Sarı yanar: araçlar durmaya hazırlanır.', 'D3: HIGH'),
   ('delay(1500)', 'delay(1500)', '1,5 saniye sarı.', '1500 ms'),
   ('}', 'loop sonu: başa dön', 'Başa dönünce kırmızı yanar. Tur 4000 + 1000 + 4000 + 1500 = 10 500 ms.', 'Tur: 10,5 sn')],
  tasks=[('İlk delay(4000) değerini 8000 yap, derle. Kırmızı ne kadar yanık kalır, tur kaç sn olur?', 'Kırmızı 8 sn yanar; tur 8000 + 1000 + 4000 + 1500 = 14 500 ms (14,5 sn).'),
         ('int kirmizi = 2; satırını int kirmizi = 7; yap, derle. Ne olur?', 'Kod D7’yi sürer, ama devrede D7’ye LED bağlı değil: kırmızı LED hiç yanmaz (konsol uyarı verir). Sonuç: yalnız tek satırı değiştirmek yeter; kabloyu da D7’ye taşırsan çalışır.')]),
 dict(n=2, id='ex2', folder='Ornek2_DemiryoluGecidi', level='Uygulama · 3 LED · for', title='Demiryolu Geçidi', sub='dönüşümlü uyarı',
  scn='Yol açıkken yeşil yanar. Tren gelince iki kırmızı lamba dönüşümlü yanıp söner. 7. haftadaki for burada.',
  leds=[dict(pin=4, color='red', tag='D4 sol'), dict(pin=3, color='red', tag='D3 sağ'), dict(pin=2, color='green', tag='D2 yol')], scene='rail', map=dict(L=4, R=3, G=2), win=9500,
  names=[('solKirmizi', 4, 'Sol kırmızı lamba'), ('sagKirmizi', 3, 'Sağ kırmızı lamba'), ('yesil', 2, 'Yol açık ışığı'), ('i', None, 'for sayacı')],
  malz='Arduino Uno · breadboard · 3 LED · 3 direnç (220 Ω) · kablo',
  dene='Hızı 2× yap. İki kırmızının aynı anda yanmadığını zaman çizelgesinde göster. Bariyer ne zaman iniyor?',
  tink='Tinkercad: 2 kırmızı + 1 yeşil LED, her birinin kendi 220 Ω direnci, katotlar ortak GND hattında. D4 sol, D3 sağ, D2 yeşil.',
  note_a='Gerçek karşılığı: hemzemin geçit (yol-demiryolu kesişimi). Kırmızı lambalar dönüşümlü yanıp söner. Bu örnekte bariyer kod tarafından sürülmüyor; yalnız animasyonda kırmızı lambalara bağlı olarak iner. Kodda tek yeni durum: iki pini dönüşümlü sürmek için for içinde HIGH/LOW değişimi. i < 6 yazımı i = 0, 1, 2, 3, 4, 5 yani 6 tur demektir.',
  notes=[], tasks=[('for içindeki 6 değerini 3 yap, derle. Kırmızılar kaç kez yanıp söner, tur süresi nedir?', 'Üç kez yanıp söner; tur 3000 + 3 × 1000 = 6000 ms (6 sn).'),
                   ('Son digitalWrite(sagKirmizi, LOW); satırını sil, derle. Yeşil yanınca ne olur?', 'Son turda sağ kırmızı yanık kalır: yeşil yanarken sağ kırmızı da yanar. Gerçekte bu tehlikeli bir çelişkidir; her aşamanın sonunda eski lambayı söndürmek gerekir.')]),
 dict(n=3, id='ex3', folder='Ornek3_YayaGecidi', level='Uygulama · 5 LED · for', title='Yaya Geçidi', sub='araç ve yaya lambası',
  scn='Kitap s.73–74: araç lambası + yaya lambası. Aynı anda ikisinde yeşil yanmaz; yaya yeşili uyarı için yanıp söner.',
  leds=[dict(pin=2, color='red', tag='D2 araç K'), dict(pin=3, color='yellow', tag='D3 araç S'), dict(pin=4, color='green', tag='D4 araç Y'), dict(pin=5, color='red', tag='D5 yaya K'), dict(pin=6, color='green', tag='D6 yaya Y')], scene='traffic', map=dict(k=2, s=3, y=4, yk=5, yy=6), win=14000,
  names=[('ak', 2, 'Araç kırmızı'), ('as', 3, 'Araç sarı'), ('ay', 4, 'Araç yeşil'), ('yk', 5, 'Yaya kırmızı'), ('yy', 6, 'Yaya yeşil'), ('i', None, 'for sayacı')],
  malz='Arduino Uno · Breadboard (30 sütun) · 2 kırmızı, 1 sarı, 2 yeşil LED · 5 direnç (220 Ω) · 6 jumper kablo',
  dene='Hızı 5× yap. Araç yeşili yanarken yaya hangi renk? Yaya yeşili yanarken araç hangi renk? Yaya ne zaman yürüyor?',
  tink='Tinkercad: Breadboard Small’a 5 LED + 5 direnç. LED’ler soldan sağa D6 yaya yeşil, D5 yaya kırmızı, D4 araç yeşil, D3 araç sarı, D2 araç kırmızı. Katotlar mavi GND hattında.',
  note_a='Kitap s.73–74’teki yaya-araç sinyalizasyonunu aldık; kitaptaki isimler (ak, as, ay, yk, yy) aynen kullanıldı. Bu örnekte iki yeni fikir var: (1) her aşamada yalnızca değişen pinleri yazarak kodu kısalttık; (2) yaya yeşili bitmeden for ile yanıp sönerek uyarı verir (birçok ülkede yaygın uygulama). Araç yeşilinde yaya kırmızıdır; yaya yeşilinde araç kırmızıdır. Tur 13,5 sn.',
  notes=[], tasks=[('Yaya yeşil süresini (delay(4000)) 8000 yap, derle. Tur kaç sn olur?', '13 500 + 4000 = 17 500 ms (17,5 sn).'),
                   ('for içindeki 4 değerini 8 yap, derle. Uyarı ne kadar uzar?', 'Uyarı 8 × 500 = 4000 ms (4 sn) sürer; tur 15 500 ms olur.')]),
 dict(n=4, id='ex4', folder='Ornek4_Kavsak', level='Sektör · 6 LED', title='İki Yollu Kavşak', sub='çakışmayan fazlar',
  scn='Kuzey-güney (KG) ve doğu-batı (DB) yolları kesişir. İki yolda aynı anda yeşil yanmaz; geçişlerde “hepsi kırmızı” süre bırakılır.',
  leds=[dict(pin=2, color='red', tag='KG K'), dict(pin=3, color='yellow', tag='KG S'), dict(pin=4, color='green', tag='KG Y'), dict(pin=5, color='red', tag='DB K'), dict(pin=6, color='yellow', tag='DB S'), dict(pin=7, color='green', tag='DB Y')], scene='junction', map=dict(kk=2, ks=3, ky=4, dk=5, ds=6, dy=7), win=13500,
  names=[('kgKirmizi', 2, 'KG kırmızı'), ('kgSari', 3, 'KG sarı'), ('kgYesil', 4, 'KG yeşil'), ('dbKirmizi', 5, 'DB kırmızı'), ('dbSari', 6, 'DB sarı'), ('dbYesil', 7, 'DB yeşil')],
  malz='Arduino Uno · Uzun breadboard (42 sütun) · 2 kırmızı, 2 sarı, 2 yeşil LED · 6 direnç (220 Ω) · 7 jumper kablo',
  dene='Hızı 5× yap. Hiçbir anda iki yeşil yanıyor mu? “Hepsi kırmızı” anını zaman çizelgesinde bul. Araçlar nerede duruyor?',
  tink='Tinkercad: 6 LED + 6 direnç; iki Breadboard Small birleştir veya LED’leri iki sıraya dağıt. Soldan sağa D7 DB yeşil, D6 DB sarı, D5 DB kırmızı, D4 KG yeşil, D3 KG sarı, D2 KG kırmızı.',
  note_a='Sektörel örnek: iki yönlü sinyalli kavşak. Tasarım kuralı: (1) bir yolun yeşili sönmeden diğerinin yeşili yanmaz; (2) sarı sonrası “hepsi kırmızı” aşaması (clearance) kavşağı boşaltır; (3) kodda yalnız değişen pinler yazılır: her aşama iki digitalWrite ve bir delay. 6 LED’de PT=20 olduğundan breadboard 42 sütunludur. Tur 13 sn.',
  notes=[], tasks=[('KG yeşil süresini (ilk delay(4000)) 8000 yap, derle. Tur kaç sn olur?', '13 000 + 4000 = 17 000 ms (17 sn). Ana cadde daha uzun yeşil alır.'),
                   ('İlk “hepsi kırmızı” bekleyişini (delay(1000)) sil, derle. KG sarısı biter bitmez DB yeşili yanar. Neden güvenli değil?', 'KG’nin son araçları hâlâ kavşaktadır; DB yeşili hemen yanarsa çarpışma riski doğar. Gerçek sistemlerde “hepsi kırmızı” süresi bu yüzden vardır.')]),
]

def split_idx(lines):
    for i, l in enumerate(lines):
        if l.startswith('void loop'):
            return i
    raise SystemExit('void loop yok')

def a_slide(ex):
    ids = ex['id']
    big = len(ex['leds']) >= 4
    sw = 580
    cw = 880 if big else 910
    scene = '<div style="max-width:%dpx"><div id="%s-sen-scene" style="border-radius:18px;overflow:hidden"></div></div>' % (sw, ids)
    return f"""<section id="{ids}-sen" class="sl light tight tight2">
<div class="hd" style="gap:6px"><p class="eb">Örnek {ex['n']} · {ex['level']} · Canlı devre ve simülasyon</p><h2 class="ttl">{ex['title']}: {ex['sub']}</h2>
<p style="font-size:29px;line-height:1.3;color:#3D4A5C">{ex['scn']}</p></div>
<div class="row" style="gap:28px;align-items:flex-start">
<div class="col" style="width:{cw}px;gap:12px">
<div class="ckt" id="{ids}-sen-ckt"></div>
<div class="card warn" style="padding:12px 26px;gap:2px"><h3 style="font-size:30px">Dene</h3><p style="font-size:27px;line-height:1.3">{ex['dene']}</p></div>
</div>
<div class="col f1" style="gap:10px">
{scene}
<div id="{ids}-sen-ctl"></div>
<div id="{ids}-sen-tl" style="max-width:{sw}px"></div>
<div class="codebox" style="padding:12px 20px"><div id="{ids}-sen-pins"></div></div>
</div>
</div>
<p class="foot" style="font-size:24px;bottom:16px">Malzeme: {ex['malz']}</p>
<aside>{ex['note_a']} Tinkercad’de kurma adımları: {ex['tink']}</aside>
</section>
"""

def pin_table(ex):
    rows = ''
    for name, pin, role in ex['names']:
        if pin is None:
            rows += f'<tr><td class="mono v">{name}</td><td colspan="2">{role}</td></tr>'
        else:
            rows += f'<tr><td class="mono v">{name}</td><td class="mono">D{pin}</td><td>{role}</td></tr>'
    return f'<table class="tbl2" style="font-size:31px"><tr><th>İsim</th><th>Pin</th><th>Görevi</th></tr>{rows}</table>'

def kod_step_slide(ex, part, title):
    sid = f"{ex['id']}{part}-kod"
    return f"""<section id="{sid}" class="sl dark tight tight2" style="--cf:29px;--cl:41px;--cc:22px">
<div class="hd" style="gap:6px"><p class="eb">Örnek {ex['n']} · {title} · Satıra tıkla ya da İleri’ye bas</p><h2 class="ttl">{ex['title']}: kodun açıklaması</h2></div>
<div class="row f1" style="gap:28px;align-items:stretch;min-height:0">
<div class="col" style="width:1210px;gap:16px">
<div class="codebox" style="padding:16px 24px"><div class="cgrid" id="{sid}-grid"></div></div>
<div class="stp"><button type="button" data-act="first">⏮</button><button type="button" data-act="prev">◀ Geri</button><button type="button" class="go" data-act="next">İleri ▶</button><button type="button" data-act="auto" aria-pressed="false">Otomatik oynat</button><span class="cnt">Adım 1</span></div>
</div>
<div class="col f1" style="gap:12px">
<div class="card dk f1" style="gap:14px;padding:26px 30px"><p style="font-size:24px;letter-spacing:2px;text-transform:uppercase;color:#93A3B8">Bu satır ne yapar?</p>
<p id="{sid}-c" class="mono" style="font-size:28px;color:#F2CC60;white-space:pre-wrap;word-break:break-all"></p>
<h3 id="{sid}-t" style="font-size:40px;line-height:1.15"></h3><p id="{sid}-x" style="font-size:32px;line-height:1.4"></p>
<div style="margin-top:auto;background:#0B121B;border-radius:12px;padding:14px 20px"><p id="{sid}-s" class="mono" style="font-size:28px;color:#9BE38B"></p></div></div>
</div>
</div>
<aside>Kodu satır satır okuyun. İleri düğmesi sıradaki açıklamalı satıra geçer; satıra tıklayarak da atlayabilirsiniz. Sağdaki kutu satırın ne yaptığını ve pinin durumunu özetler. Öğrencilerden sıradaki satırı tahmin etmelerini isteyin. Balonlu (altı çizgili) kelimelerin üzerine gelince kısa tanım görünür; bu balonlar yalnız bu haftanın yeni yapısı için açıktır. Hazır dosya: Hafta08_Arduino/{ex['folder']}/{ex['folder']}.ino</aside>
</section>
"""

def kod_static_a(ex):
    sid = f"{ex['id']}a-kod"
    return f"""<section id="{sid}" class="sl dark tight tight2">
<div class="hd" style="gap:6px"><p class="eb">Örnek {ex['n']} · Kod 1/2 · Pin isimleri ve hazırlık</p><h2 class="ttl">{ex['title']}: önce isimler ve setup</h2></div>
<div class="row f1" style="gap:28px;align-items:stretch;min-height:0">
<div class="codebox" style="width:1130px;padding:22px 28px"><pre class="code" id="{sid}-pre" style="font-size:28px;line-height:1.42"></pre></div>
<div class="col f1" style="gap:14px"><div class="card info" style="padding:18px 24px"><h3 style="font-size:36px">Pin tablosu</h3>{pin_table(ex)}</div>
<div class="card warn" style="padding:16px 24px"><p style="font-size:30px;line-height:1.35">{ex.get('a_note','Her isim bir pine bağlı. Devreyi kurarken bu tabloya bak.')}</p></div></div>
</div>
<aside>Önce isimlerin tanımlandığı ve pinlerin çıkış yapıldığı bölüm. Sağdaki tablo isim, pin ve LED eşleşmesini verir; devreyi kurarken bu tabloya bakılır. Hazır dosya: Hafta08_Arduino/{ex['folder']}/{ex['folder']}.ino</aside>
</section>
"""

def kod_static_b(ex):
    sid = f"{ex['id']}b-kod"
    return f"""<section id="{sid}" class="sl dark tight tight2">
<div class="hd" style="gap:6px"><p class="eb">Örnek {ex['n']} · Kod 2/2 · loop ve canlı sonuç</p><h2 class="ttl">{ex['title']}: loop ve sonuç</h2></div>
<div class="row f1" style="gap:26px;align-items:stretch;min-height:0">
<div class="codebox" style="width:1130px;padding:18px 26px"><pre class="code" id="{sid}-pre" style="font-size:27px;line-height:1.34"></pre></div>
<div class="col f1" style="gap:10px"><div id="{sid}-scene" style="border-radius:16px;overflow:hidden"></div><div id="{sid}-ctl"></div><div id="{sid}-tl"></div><div class="codebox" style="padding:10px 16px"><div id="{sid}-pins"></div></div></div>
</div>
<aside>{ex.get('b_note','')} Sağdaki sahne bu kodu canlı çalıştırır; zaman çizelgesinde hangi pinin ne zaman HIGH olduğu görünür. Hazır dosya: Hafta08_Arduino/{ex['folder']}/{ex['folder']}.ino</aside>
</section>
"""

def dene_slide(ex):
    ids = ex['id']
    big = len(ex['leds']) >= 4
    cw = 520
    nl = len(ino_code(ex['folder']))
    th = 'height:%dpx' % min(430, int(nl * 35 + 44))
    t1, a1 = ex['tasks'][0]
    t2, a2 = ex['tasks'][1]
    return f"""<section id="{ids}-dene" class="sl dark tight tight2">
<div class="hd" style="gap:6px"><p class="eb">Örnek {ex['n']} · Değiştir ve gözle</p><h2 class="ttl">{ex['title']}: kodu değiştir, sonucu izle</h2></div>
<div class="row" style="gap:26px;align-items:flex-start">
<div class="col" style="width:1040px;gap:10px">
<textarea class="ed" id="{ids}-dene-ed" spellcheck="false" aria-label="Arduino kodu" style="{th};font-size:24px"></textarea>
<div class="stp"><button type="button" class="go" id="{ids}-dene-btn">Derle ve yükle</button><button type="button" id="{ids}-dene-orig">Başlangıç kodu</button></div>
<div class="conso" id="{ids}-dene-con" style="min-height:70px;max-height:84px;font-size:22px"></div>
<div class="row" style="gap:14px;align-items:flex-start"><div class="card dk f1" style="padding:10px 18px;gap:6px;position:relative"><p style="font-size:26px;line-height:1.3"><b style="color:#FF9F5A">1)</b> {t1}</p><button class="ans-btn sm" type="button">Cevabı göster</button><div class="ans pa" hidden>{a1}</div></div>
<div class="card dk f1" style="padding:10px 18px;gap:6px;position:relative"><p style="font-size:26px;line-height:1.3"><b style="color:#FF9F5A">2)</b> {t2}</p><button class="ans-btn sm" type="button">Cevabı göster</button><div class="ans pa" hidden>{a2}</div></div></div>
</div>
<div class="col f1" style="gap:10px">
<div class="ckt" id="{ids}-dene-ckt" style="max-width:{cw}px"></div>
<div id="{ids}-dene-ctl"></div>
<div id="{ids}-dene-tl" style="max-width:{cw}px"></div>
</div>
</div>
<aside>Eşli çalışma, 8–10 dakika. Soldaki kutuda kodu değiştirin, “Derle ve yükle” (veya Ctrl+Enter) ile karta yükleyin. Derleme hatası olursa konsol satır numarasıyla gösterir; eski program çalışmaya devam eder. “Başlangıç kodu” her şeyi geri alır. İki görevi öğrenciler tahmin edip denesin, sonra cevabı açın. Hızlı bitirenler için geliştirme: aşama sürelerini kendi kavşaklarına göre değiştirsin; Tinkercad’de aynı değişikliği denesin.</aside>
</section>
"""

EXTRA = {
 2: dict(a_note='<b>i &lt; 6</b>: i, 6’dan küçük olduğu sürece döner. i = 0, 1, 2, 3, 4, 5 → 6 tur. (7. hafta: i &lt;= 8 gibi.)', b_note='Yeni işaret: i &lt; 6 “i, 6’dan küçük” demektir; i = 0’dan başlayıp 6 tur döner.'),
 3: dict(a_note='Beş çıkış, beş isim. <b>ak, as, ay</b> araç; <b>yk, yy</b> yaya. Kitap s.74’teki adlar.', b_note='Her aşamada yalnız değişen pinler yazıldı. Yaya yeşili bitmeden for ile uyarı yanıp sönmesi var.'),
 4: dict(a_note='Altı çıkış. Başlangıçta ikisi de kırmızı: kavşak güvenli durumda açılır.', b_note='Kural: bir yolun yeşili sönmeden diğerinin yeşili yanmaz; her sarıdan sonra 1 sn hepsi kırmızı.'),
}

def make_examples():
    parts, cfg = {}, []
    for ex in EX:
        ex.update(EXTRA.get(ex['n'], {}))
        lines = ino_code(ex['folder'])
        si = split_idx(lines)
        la, lb = lines[:si], lines[si:]
        ex['step'] = ex.get('step', False); ex['tips'] = ex['step']
        pcfg = []
        if ex['step']:
            notes, pos = [], 0
            for key, t, x, s in ex['notes']:
                idx = None
                for j in range(pos, len(lines)):
                    if key in lines[j]:
                        idx = j; break
                if idx is None:
                    raise SystemExit('Not bulunamadı: %s / %r' % (ex['id'], key))
                notes.append(dict(l=idx, t=t, x=x, s=s)); pos = idx + 1
            na = [n for n in notes if n['l'] < si]
            nb = [dict(n, l=n['l'] - si) for n in notes if n['l'] >= si]
            pcfg.append(dict(sid=ex['id'] + 'a-kod', kind='step', lines=la, notes=na))
            pcfg.append(dict(sid=ex['id'] + 'b-kod', kind='step', lines=lb, notes=nb))
            parts['EX%d' % ex['n']] = a_slide(ex) + kod_step_slide(ex, 'a', 'Kod 1/2 · isimler ve setup') + kod_step_slide(ex, 'b', 'Kod 2/2 · loop') + dene_slide(ex)
        else:
            pcfg.append(dict(sid=ex['id'] + 'a-kod', kind='static', lines=la))
            pcfg.append(dict(sid=ex['id'] + 'b-kod', kind='static', lines=lb, live=True))
            parts['EX%d' % ex['n']] = a_slide(ex) + kod_static_a(ex) + kod_static_b(ex) + dene_slide(ex)
        cfg.append(dict(id=ex['id'], tips=ex['tips'], leds=ex['leds'], scene=ex['scene'], map=ex['map'], win=ex['win'],
                        code='\n'.join(lines) + '\n', parts=pcfg))
    return parts, cfg


QUIZ = [
 ('<span class="mono">digitalWrite(2, HIGH);</span> pine kaç volt verir?', ['0 V', '3,3 V', '5 V', '12 V'], 2, 'HIGH, Uno’da 5 V demektir. LOW ise 0 V’tur.'),
 ('Bir dijital pin kaç farklı durumda olabilir?', ['Yalnız 2: HIGH ve LOW', '4', '10', 'Sonsuz'], 0, 'Dijital pin iki durumludur: HIGH ve LOW. Aradaki değerler analog konusudur.'),
 ('Pin OUTPUT yapılırsa ne olur?', ['Pindeki gerilimi okur', 'Pinden akım verip LED yakabilir', 'Pin kapanır', 'Pin GND olur'], 1, 'OUTPUT: kart verir. Okumak için INPUT kullanılır (gelecek hafta).'),
 ('<span class="mono">int sari = 3;</span> satırındaki 3 neyi gösterir?', ['Bekleme süresini', 'Pin numarasını', 'LED sayısını', 'Direnç değerini'], 1, 'sari adı D3 pinine bağlanır. Sonra sari yazınca 3 okunur.'),
 ('Kırmızı LED’i D2’den D7’ye taşıyorsun. İsimli kodda kaç satır değişir?', ['1', '3', '6', 'Hepsi'], 0, 'Yalnız <span class="mono">int kirmizi = 7;</span> satırı değişir.'),
 ('Elektriksel çizim (şema) neden sembolle yapılır?', ['Parça renkleri görünsün diye', 'Bağlantı sade ve herkesçe okunabilir olsun diye', 'Kod yazmak için', 'Breadboard’a benzesin diye'], 1, 'Semboller evrenseldir; mühendisler şemayı her yerde aynı okur.'),
 ('Normalde açık (NO) bir basmalı buton nasıl çalışır?', ['Hep iletir', 'Basılıyken iletir, bırakınca açılır', 'Bir kez basınca sürekli kapalı kalır', 'Hiç iletmez'], 1, 'NO: dinlenme hâli açık; basılı tutulunca kapanır, bırakınca eski hâline döner.'),
 ('Kavşakta iki yeşilin çakışmasını gerçek sistemde ne engeller?', ['Çakışma denetleyicisi (donanım)', 'Direnç', 'Pil', 'Breadboard'], 0, 'Bağımsız bir donanım, çelişen yeşilleri algılayıp lambaları güvenli moda (yanıp sönen kırmızı) alır.'),
 ('<span class="mono">for (i = 0; i &lt; 6; i++)</span> kaç tur döner?', ['5', '6', '7', '0'], 1, 'i = 0, 1, 2, 3, 4, 5: altı tur. i = 6’da koşul yanlış olur.'),
 ('Yaya geçidi programında bir tur 5000 + 1500 + 4000 + 4 × 500 + 1000 ms sürer. Toplam?', ['10 sn', '12 sn', '13,5 sn', '15 sn'], 2, '5000 + 1500 + 4000 + 2000 + 1000 = 13 500 ms = 13,5 sn.'),
]
QUIZ_ASIDE = [
 'İlk iki soru dijital pin. Doğru cevaplar: 1-C, 2-A. Öğrenci şık seçince doğru ya da yanlış hemen renkle ve işaretle görünür.',
 'Soru 3-4: pin yönü ve int ile isim. Doğru cevaplar: 3-B, 4-B.',
 'Soru 5-6: isimlerin faydası ve şema. Doğru cevaplar: 5-A, 6-B.',
 'Soru 7-8: anahtar ve gerçek dünya. Doğru cevaplar: 7-B, 8-A.',
 'Soru 9-10: for turu ve süre hesabı. Doğru cevaplar: 9-B, 10-C. 10. soruda toplamı tahtada yaptırın. Ödev ayrıca hazırlanır.',
]

def quiz_slides():
    out = ''
    for k in range(5):
        qs = ''
        for n in (2 * k, 2 * k + 1):
            q, opts, ok, why = QUIZ[n]
            ob = ''.join(f'<button type="button" class="qb" data-i="{i}"><span class="lt">{"ABCD"[i]}</span><span class="qx">{o}</span><span class="ic"></span></button>' for i, o in enumerate(opts))
            qs += f'<div class="q" data-ok="{ok}"><p class="qt"><span class="no">{n+1})</span>{q}</p><div class="qo">{ob}</div><div class="qrow"><button class="ans-btn sm qshow" type="button">Cevabı göster</button><span class="hint">Bir şık seç</span></div><div class="qf" hidden><b>{"ABCD"[ok]}.</b> {why}</div></div>'
        out += f"""<section id="test{k+1}" class="sl light tight tight2">
<div class="hd" style="gap:4px"><p class="eb">Test · Soru {2*k+1}–{2*k+2} · {k+1} / 5</p><h2 class="ttl">Bildiklerini yokla</h2></div>
<div class="qz">{qs}</div>
<aside>{QUIZ_ASIDE[k]}</aside>
</section>
"""
    return out

ORDER = ['02_cover', '03_hedefler', '04_dijital', '05_sema', 'EX1', 'EX2', '06_anahtar', 'EX3', 'EX4',
         '07_son', 'QUIZ']

def main():
    head = read(os.path.join(SRC, 'head.html'))
    foot = read(os.path.join(SRC, 'foot.html'))
    ex_parts, cfg = make_examples()
    body = read(os.path.join(SRC, 'slides', '00_style.html')) + read(os.path.join(SRC, 'slides', '01_style2.html'))
    # son dosyada hata avı, özet ve kapanış var; test slaytları özetten sonra, kapanıştan önce gelmeli
    son = read(os.path.join(SRC, 'slides', '07_son.html'))
    k = son.index('<section id="kapanis"')
    son_a, son_b = son[:k], son[k:]
    for key in ORDER:
        if key.startswith('EX'):
            body += ex_parts[key]
        elif key == '07_son':
            body += son_a
        elif key == 'QUIZ':
            body += quiz_slides() + son_b
        else:
            body += read(os.path.join(SRC, 'slides', key + '.html'))
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
    print('yazildi | slayt:', n, '| boyut:', len(out) // 1024, 'KB')

if __name__ == '__main__':
    main()
