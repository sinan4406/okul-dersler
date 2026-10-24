# -*- coding: utf-8 -*-
from lib import *


def slides():
    o = []
    o.append('''<section id="kapak" data-title="Yapay Zekâ Teknolojileri" style="background:#14202E;color:#F6F4EE;font-family:Rubik,Arial,sans-serif;padding:112px;display:flex;flex-direction:column;justify-content:space-between">
<p style="font-size:28px;letter-spacing:4px;text-transform:uppercase;color:#FF9F5A">Bilişim Teknolojilerinin Temelleri · 9. Sınıf</p>
<div style="display:flex;flex-direction:column;gap:30px">
<h1 style="font-size:120px;font-weight:700;line-height:1.05">Yapay Zekâ<br>Teknolojileri</h1>
<p style="font-size:40px;line-height:1.35;color:#BFCAD6;max-width:1400px">Çeşitleri, modelleri ve gerçek örnekleriyle: soru sor, dene, tartış, üret.</p>
</div>
<div style="display:flex;justify-content:space-between;align-items:end">
<p style="font-size:28px;color:#BFCAD6">2. Öğrenme Birimi · Kitap s. 66–123 · Ekim–Kasım 2026</p>
<p style="font-size:28px;color:#BFCAD6">OMÜ MTAL · Bilişim Teknolojileri Alanı</p>
</div>
<p style="position:absolute;right:112px;top:112px;width:620px;text-align:right;font-family:'JetBrains Mono',monospace;font-size:28px;color:#6CB6FF">P(sonraki kelime | önceki kelimeler)</p>
<aside>Bu sunum 2. Öğrenme Birimi'nin tamamını kapsar: yapay zekâ temelleri (2.1), üretken yapay zekâ ve prompt (2.2), yapay zekâ destekli otomasyon (2.3). Kitabın üstüne yapay zekâ çeşitleri, modeller ve güncel gelişmeler eklendi. Sağ üstteki formülü sorun: "Bu ifade ne anlama geliyor olabilir?" Ünite sonunda öğrenciler cevabı verebilecek: yapay zekâ, önceki kelimelere bakıp sonraki kelimenin olasılığını hesaplar. Önerilen dağılım: 5. hafta bölüm 1 ve 2, 6. hafta bölüm 3, 7. hafta bölüm 4, 8. hafta bölüm 5 ve 6. Kitaptaki sayfa numaraları kitabın kendi numarasıdır.</aside>
</section>
''')

    def hcard(n, text, dark=False):
        st = 'background:#FF9F5A;color:#14202E' if dark else ''
        return card('', row('<span class="num" style="%s">%s</span>' % (st, n), p(text, 'mid'), gap=20, cls=''), '', 'justify-content:center')

    hedef = grid(2,
        hcard(1, 'Yapay zekânın çalışma mantığını 5 adımda anlatmak'),
        hcard(2, 'Klasik programlama ile yapay zekâyı örnekle ayırt etmek'),
        hcard(3, 'Yapay zekâ çeşitlerini ve model ailelerini örnekle sınıflandırmak'),
        hcard(4, 'Halüsinasyonu, gizliliği ve önyargıyı tanıyıp önlem almak'),
        hcard(5, 'Amaç, rol, görev, bağlam, kısıt ve örnekle etkili prompt yazmak'),
        hcard(6, 'Metin, görsel, ses ve video üretip etik açıdan kontrol etmek'),
        style='')
    son = card('', row('<span class="num" style="background:#FF9F5A;color:#14202E">7</span>', p('Yapay zekâ destekli bir otomasyon ve chatbot akışı tasarlamak, kullanırken sorumlu davranmak', 'mid', 'color:#F6F4EE'), gap=20), 'dk', 'background:#14202E;justify-content:center')
    o.append(sec('hedefler', 'Bu ünitenin hedefleri', 'Ünite sonunda şunları yapabileceksin',
                 hedef + son,
                 'Hedefleri yüksek sesle okutun. Her hedef ölçülebilir bir eylem içerir: anlatmak, ayırt etmek, sınıflandırmak, yazmak. Kitaptaki üç kazanım (çalışma mantığı, içerik üretimi, otomasyon) burada yedi ölçülebilir hedefe açıldı. Ünite sonunda bu slayta dönüp öğrencilere kendilerini 1-5 arası puanlatın (öz değerlendirme).',
                 foot='Yıllık plan: BTT.1 ve BTT.2 · Dijital dönüşüm ve yapay zekâ teknolojileri · Kitap s. 66–123'))

    yol = table(['Bölüm', 'Konu', 'Kitap', 'Önerilen hafta'], [
        ['1', 'Yapay zekâ temelleri: çalışma mantığı, türleri, günlük hayat, halüsinasyon, gizlilik, tarihçe', '2.1 · s. 68–82', '5. hafta'],
        ['2', 'Modeller ve çeşitleri: dil, görsel, ses, video, kod; açık ve kapalı modeller', 'Kitap dışı (güncel)', '5. hafta'],
        ['3', 'Etkili prompt yazımı: amaç, rol, görev, bağlam, kısıt, örnek', '2.2.1 · s. 83–91', '6. hafta'],
        ['4', 'Üretken yapay zekâyla içerik: görsel, ses, video, doğrulama', '2.2.2 · s. 92–108', '7. hafta'],
        ['5', 'Yapay zekâ destekli otomasyon, chatbot, API ve entegrasyon', '2.3 · s. 108–115', '8. hafta'],
        ['6', 'Hukuk, etik, sorumlu kullanım ve ünite değerlendirmesi', 's. 116–123 + güncel', '8. hafta'],
    ], widths=['10%', '54%', '20%', '16%'], size=26)
    o.append(sec('yol', 'Ders akışı', 'Altı bölümde bir yolculuk', yol,
                 'Önerilen hafta dağılımı yıllık plana göredir: 5. hafta yapay zekâ temelleri, 6. hafta üretken yapay zekâ ve prompt, 7. hafta içerik üretimi, 8. hafta otomasyon. Plan, öğretmenin takvimine göre kaydırılabilir. Her bölümün sonunda cevaplı bir mini test vardır. Bölüm 2 kitapta yoktur; yapay zekâ çeşitlerini ve modellerini örneklerle öğretmek için eklendi.',
                 foot='Her bölümde: anlatım → canlı deneme → soru → etkinlik → mini test'))

    sorular = [
        ('Hesap makinesi (12 × 12 = 144 hesaplar)', 2, 'Sabit kurallarla çalışır. Her seferinde aynı işlemi uygular, veriden öğrenmez.'),
        ('Video uygulamasının sana önerdiği "Sıradaki" videolar', 1, 'Öneri sistemi: izleme geçmişinden ilgi alanını öğrenir.'),
        ('Telefonu yüzünle açan yüz tanıma sistemi', 1, 'Yüz görüntülerinden öğrenilmiş bir model kullanır (bilgisayarlı görü).'),
        ('Asansörde 3. kat düğmesine basınca 3. kata gitmesi', 2, 'Kural tabanlı otomasyon: düğme → kat. Öğrenme yok.'),
        ('Klavyede bir sonraki kelimeyi tahmin eden öneri çubuğu', 1, 'Dil modeli: yazdıklarına bakıp sonraki kelimenin olasılığını hesaplar.'),
        ('Sıcaklık 20 derecenin altına düşünce çalışan klasik kombi', 2, 'Sabit eşik kuralı. Alışkanlıkları öğrenen "akıllı termostat" ise yapay zekâ kullanır.'),
    ]
    o.append(sec('oylama', 'Dikkat çekme · Oylama', 'Hangisi gerçekten yapay zekâ kullanıyor?',
                 cls_activity(sorular, ['Evet', 'Hayır']),
                 'Önce sınıfa elle oylatın (Evet/Hayır). Sonra "Cevapları kontrol et" düğmesine basın. Öğrencilerin çoğu hesap makinesi ve asansörde "evet" demeye eğilimlidir, çünkü "akıllı görünür". Ayırt edici soru: "Bu sistem örneklerden mi öğrendi, yoksa birisi kuralı yazdı mı?" Oylamanın cevabını ünite sonunda tekrar sorun: kapanış slaytında aynı soru yeniden gelir.',
                 foot='Ölçüt: Sistem örneklerden öğreniyorsa yapay zekâdır. Kural birisi tarafından yazılmışsa klasik programdır.'))

    ba = grid(3,
             card('Yapay Zekâ', p('1 dakikada aklına gelen 3 kelimeyi yaz.', 'mid')),
             card('Veri', p('1 dakikada aklına gelen 3 kelimeyi yaz.', 'mid')),
             card('Prompt (Komut)', p('1 dakikada aklına gelen 3 kelimeyi yaz.', 'mid')))
    kav = ' '.join('<span class="pill">%s</span>' % k for k in ['algoritma', 'API', 'chatbot', 'derin öğrenme', 'entegrasyon', 'etik', 'gizlilik', 'halüsinasyon', 'iş akışı', 'makine öğrenmesi', 'model', 'otomasyon', 'prompt', 'veri'])
    o.append(sec('baslarken', 'Başlarken · Kitap s. 68', 'Anahtar kavramlar: 1 dakikada kaç kelime yazarsın?',
                 row(col(ba, p('Sonra her kelime için kavramla bağlantısını gösteren birer cümle kur.', 'big'), cls='f1'),
                     col(timer(60, 'Her kavram için 1 dakika'),
                         card('Bu birimde göreceğimiz kavramlar', p(kav, 'sm', 'line-height:2.3'), 'info'),
                         style='width:680px'), gap=36),
                 'Kitap s. 68 Başlarken etkinliği. Her kavram için 1 dakika verin. Süreyi sağdaki sayaçla tutun. Öğrenciler kelimeleri defterlerine yazar, sonra her kelimeden bir cümle kurar. Bu cevaplar ünite sonunda tekrar değerlendirilir: "Başlangıçta ne yazmıştın, şimdi ne yazardın?" Kitaptaki bebek benzetmesi: bebek gördükçe öğrenir, yapay zekâ da çok veri gördükçe örüntü çıkarır.',
                 foot='Kitap s. 68 · Kendi kelimelerini ünite sonunda tekrar kontrol edeceğiz.'))
    return ''.join(o)
