# -*- coding: utf-8 -*-
from lib import *


def slides():
    o = []
    o.append(divider('b1', 'Bölüm 1 · Kitap 2.1 · s. 68–82', 'Yapay Zekâ<br>Temelleri',
                     'Veriden öğrenen sistemler nasıl çalışır, nerelerde karşımıza çıkar, nerede yanılır?',
                     'Birinci bölümde yapay zekânın ne olduğunu, çalışma mantığını, türlerini, günlük hayattaki yerini, hatalarını (halüsinasyon), gizlilik ve önyargı risklerini ve kısa tarihçesini göreceğiz. Her konuda önce bir soru, sonra canlı bir deneme, sonra etkinlik var. Önerilen süre: 4 ders saati.',
                     '<div style="display:flex;gap:24px;flex-wrap:wrap"><span class="pill" style="font-size:26px">çalışma mantığı</span><span class="pill" style="font-size:26px">makine öğrenmesi</span><span class="pill" style="font-size:26px">sinir ağı</span><span class="pill" style="font-size:26px">halüsinasyon</span><span class="pill" style="font-size:26px">gizlilik ve önyargı</span><span class="pill" style="font-size:26px">tarihçe</span></div>'))

    # --- tanım
    o.append(sec('tanim', '2.1.1 · Kitap s. 69', 'Yapay zekâ: verilerden öğrenen sistemler',
        col(
            card('', p('Yapay zekâ, bilgisayar sistemlerinin ' + tip('verilerden', 'Metin, görsel, ses, sayı: bilgisayarın işleyebildiği her türlü kayıt. Örnek: 10.000 elma fotoğrafı.', dn=True) + ' öğrenerek problem çözmesini, karar vermesini ve yeni durumlara uygun sonuçlar üretmesini sağlayan teknolojinin genel adıdır.', 'big'), 'info'),
            row(card('1 · Veri', p('Sistemin öğreneceği örnekler. Ne kadar çok ve ne kadar kaliteli olursa o kadar iyi.'), '', ''),
                card('2 · ' + tip('Model', 'Veriden çıkarılan kalıpların saklandığı matematiksel yapı. Eğitilmiş yapay zekânın “beyni” gibi düşünebilirsin.', dn=True), p('Eğitimle oluşan kalıplar bütünü. Kural yazmak yerine örneklerle model eğitilir.'), '', ''),
                card('3 · Tahmin', p('Model, hiç görmediği yeni veriye bakıp en olası sonucu söyler.'), '', ''), gap=22),
            row(card('Yapay zekâ insan gibi anlamaz', p('Örüntü bulur, olasılık hesaplar ve en olası cevabı üretir. Bu yüzden bazen çok emin ama yanlış konuşabilir.'), 'warn'),
                card('Bir cümleyle', p('<b>Veri + ' + tip('algoritma', 'Veriyi işleyip kalıp çıkaran yol haritası: adım adım hesaplama kuralları. Örnek: makine öğrenmesi algoritmaları.', dn=True) + ' → model → tahmin</b>', 'big'), 'ok'), gap=22)
        ),
        'Kitap s. 69 tanımı. Altı noktalı kelimelerin üzerine gelince açıklama balonu çıkar. Ana mesaj: yapay zekâ bir "düşünen varlık" değil, veriden çıkarılmış kalıplarla tahmin yapan bir sistemdir. Bu ifade bütün ünitenin omurgasıdır: sonradan halüsinasyon, prompt ve otomasyon konularında hep geri döneceğiz. Soru: "Bir bebek elmayı nasıl öğrenir? Yapay zekâ ne farklı yapar?"',
        foot='Kitap s. 69 · Kavramlar: veri, model, algoritma, tahmin'))

    # --- elma/armut demo
    demo = row(
        col('<svg id="sf-svg" viewBox="0 0 760 560" style="width:100%;background:#FFFFFF;border:1px solid #E2DED3;border-radius:14px"></svg>',
            p('<span class="grn">●</span> eğitimde “armut” etiketli &nbsp; <span class="red">●</span> eğitimde “elma” etiketli &nbsp; <b>?</b> yeni meyve &nbsp; ◎ grubun merkezi', 'sm mute'), style='width:800px'),
        col(
            card('Yeni meyveyi sen belirle', col(
                p('Yuvarlaklık: <b id="sf-xv">0.60</b>', 'lbl') + '<input id="sf-x" type="range" min="0" max="100" value="60">',
                p('Kırmızılık: <b id="sf-yv">0.55</b>', 'lbl') + '<input id="sf-y" type="range" min="0" max="100" value="55">', style='gap:6px')),
            card('Modelin tahmini', col(
                p('Elma <b id="sf-pa">50%</b>', 'mid') + '<div class="bar"><i id="sf-ba" style="width:50%"></i></div>',
                p('Armut <b id="sf-pp">50%</b>', 'mid') + '<div class="bar"><i id="sf-bp" style="width:50%;background:#2E8540"></i></div>', style='gap:6px'), 'ok'),
            row('<button class="ans-btn alt" type="button" id="sf-poison">Hatalı etiketli veri ekle</button>', '<button class="ans-btn sm" type="button" id="sf-reset">Sıfırla</button>', gap=14),
            p('<span id="sf-msg">Kaydırıcıları oynat: yeni meyve elma grubuna yaklaştıkça elma olasılığı artar.</span>', 'sm mute'),
            gap=16, cls='f1'), gap=32)
    o.append(sec('siniflandirici', 'Canlı uygulama · Kitaptaki elma ve armut örneği', 'Elma mı, armut mu? Modeli kendin eğit', demo,
        'Kitap s. 69 elma ve armut örneğinin canlı hâli. Her nokta eğitimdeki bir fotoğrafı temsil eder (iki özellik: yuvarlaklık ve kırmızılık). Model, iki grubun merkezine olan uzaklığa bakıp olasılık hesaplar. Dene yönergesi: (1) yeni meyveyi (0,60 yuvarlaklık, 0,55 kırmızılık) noktasında bırakın: model yaklaşık %73 elma der. (2) "Hatalı etiketli veri ekle" düğmesine basın: elma görünümlü 8 fotoğraf yanlışlıkla "armut" diye etiketlenir. Armut grubunun merkezi elma bölgesine kayar ve model aynı meyveye artık armut der (yaklaşık %91). Ders: model, eğitim verisi kadar iyidir (veri kalitesi). Bu, halüsinasyon konusuna da köprüdür.',
        foot='Dene: Yeni meyveyi (0.60, 0.55) noktasında bırak, tahmine bak. Sonra “Hatalı etiketli veri ekle”ye bas. Tahmin neden değişti?'))

    # --- çalışma mantığı stepper
    nodes = ''
    labels = [('1', 'Veri toplama', '#2F6FDE'), ('2', 'Model eğitimi', '#2F6FDE'), ('3', 'Öğrenme', '#2F6FDE'), ('4', 'Karar / tahmin', '#C2410C'), ('5', 'Geri bildirim', '#2E8540')]
    for i, (n, t, c) in enumerate(labels):
        nodes += '<div class="node" id="cm-%s" style="flex:1;background:%s;color:#FFF;flex-direction:column;gap:4px;height:120px"><span style="font-size:34px">%s</span><span>%s</span></div>' % (n, c, n, t)
        if i < 4:
            nodes += '<span class="arrow">▶</span>'
    tb = table(['Aşama', 'Ne yapılır?'], [['Giriş', 'Ham veri (metin, görsel, ses) sisteme verilir.'], ['İşleme', 'Algoritmalar veriyi parçalara ayırır, kalıpları bulur.'], ['Olasılık hesabı', 'Her olasılık için bir skor hesaplanır.'], ['Çıktı', 'En yüksek olasılıklı sonuç kullanıcıya sunulur.']], widths=['24%', '76%'], size=23)
    o.append(sec('calisma', '2.1.1 · Kitap s. 69–70 · Adım adım animasyon', 'Yapay zekâ çalışma mantığı: 5 adım',
        row(*[nodes], gap=8) + '<div id="cm-msg" class="stmsg"></div>' + stepper_ctl() + tb,
        'Kitap Görsel 2.1 ve Tablo 2.1. İleri düğmesiyle her adımı tek tek ilerletin. Her adımda elma ve armut örneğine dönün. Kitap düzeltmesi: 5. adımda "kullanıcı Hayır dedi, yapay zekâ bilgilerini yeniden düzenler" yazıyor. Sohbet botları konuşma sırasında kalıcı olarak öğrenmez: konuşmanın içinde düzeltmeyi hesaba katar ama modelin kendisi ancak yeni bir eğitim/ince ayar sürecinde güncellenir. Tablo 2.1’deki "ağırlık" ifadesi de modelin iç parametreleri için kullanılan ayrı bir terimdir (sonraki bölümde).',
        foot='Kitap s. 70 · Tablo 2.1: Giriş → İşleme → Olasılık hesabı → Çıktı'))

    # --- klasik vs yz
    kt = table(['Ölçüt', 'Klasik program', 'Yapay zekâ modeli'], [
        ['Çalışma mantığı', 'Programcının yazdığı kurallara göre karar verir', 'Çok sayıda örnekten öğrenerek tahmin yapar'],
        ['Kuralları kim belirler?', 'Programcı', 'Model, eğitim verisinden benzerlik ve farklılıkları öğrenir'],
        ['Örnek karar mantığı', '“Bıyık varsa, kulaklar sivriyse, yüz yuvarlaksa kedi olabilir”', 'Binlerce kedi ve köpek fotoğrafındaki kalıpları bulur'],
        ['Yeni durum (farklı açı, az ışık)', 'Zorlanır, kural dışı kalır', 'Daha esnek; ama eğitimde görmediği durumda yanılabilir'],
        ['Hata bulunca', 'Kural düzeltilir', 'Veri eklenir veya model yeniden eğitilir'],
    ], widths=['24%', '36%', '40%'], size=25)
    o.append(sec('klasik-yz', '2.1.2 · Kitap s. 70–72', 'Klasik programlama ile yapay zekâ farkı',
        kt + row(card('Klasik: if / else', p('Şifre doğruysa giriş yap, değilse uyarı ver. Her durum önceden yazılmıştır.'), 'info'), card('Yapay zekâ: örnekten öğrenir', p('Binlerce giriş kaydından şüpheli girişi tanımayı öğrenir; kuralı kimse tek tek yazmadı.'), 'ok'), gap=24),
        'Kitap s. 72 tablosu genişletildi. Şifre kontrolü klasik programdır, şüpheli girişi tespit eden sistem yapay zekâdır (kitaptaki 5. test sorusu). Pekiştirme: "Hangi durumda klasik program daha iyidir?" Cevap: kuralın kesin ve basit olduğu durumlarda (vergi hesabı, şifre kontrolü, hesap makinesi). Yapay zekâ her yerde daha iyi değildir; kural belliyse klasik program daha ucuz, hızlı ve açıklanabilirdir.',
        foot='Kural net ise klasik program, kural yazılamayacak kadar karmaşık ise yapay zekâ.'))

    # --- spam demo
    spam = row(
        col(card('Bir mesaj yaz ya da örnek seç', col(
            '<textarea id="sp-t" class="ta" rows="5" style="font-size:30px">Tebrikler, çekilişi kazandın! Ödülünü almak için hemen tıkla</textarea>',
            row('<button class="opt" type="button" data-s="Tebrikler, çekilişi kazandın! Ödülünü almak için hemen tıkla">Örnek 1</button>', '<button class="opt" type="button" data-s="Yarın okulda kod ödevi toplantısı var, merhaba">Örnek 2</button>', '<button class="opt" type="button" data-s="ÜCRETSİZ bilet kodu: yarınki toplantıdan önce dene">Örnek 3</button>', gap=10, cls='sp-ex'), style='gap:10px')), style=''),
        col(card('Klasik filtre (kural)', col(p('Kural: mesajda “ücretsiz” veya “kazandınız” geçiyorsa spam.', 'sm mute'), p('<b id="sp-r" style="font-size:60px">–</b>', ''))),
            card('Öğrenen filtre (kelime puanları)', col(p('Binlerce mesajdan öğrenilmiş kelime ağırlıkları toplanır.', 'sm mute'), p('<b id="sp-l" style="font-size:60px">–</b>', ''), '<div class="bar"><i id="sp-b" style="width:0"></i></div>', p('<span id="sp-w" class="sm mono"></span>', '')), 'ok'), cls='f1'), gap=28)
    o.append(sec('spam', 'Canlı uygulama · Kural mı, öğrenme mi?', 'İki spam filtresi: biri kural yazdı, biri örnekten öğrendi', spam,
        'Üç örneği sırayla deneyin. Örnek 1: kural tabanlı filtre kaçırır ("kazandın" ile "kazandınız" farklı kelime), öğrenen filtre yakalar. Örnek 3: kural tabanlı filtre yanlış alarm verir ("ÜCRETSİZ" geçiyor), öğrenen filtre ise "yarın" ve "toplantı" kelimelerinin olumlu işaretlerini toplar ve temiz der. Öğrencilere kendi mesajlarını yazdırın: sistemi nasıl kandırabilirler? (Not: bu demo gerçek bir modelin çok basit bir taklididir; kelime ağırlıkları elle verilmiştir.) Pekiştirme: öğrenen filtre de hata yapar; hata yaptığında yeni örnek eklenip yeniden eğitilir.',
        foot='Demo basitleştirilmiş bir taklittir: kelime ağırlıkları elle verildi. Gerçek filtreler binlerce örnekten ağırlıkları kendisi bulur.'))

    # --- D/Y
    dy = cls_activity([
        ('Klasik programlamada kurallar önceden programcı tarafından yazılır.', 1, 'Doğru: if/else yapıları programcıdan gelir.'),
        ('Yapay zekâ sistemleri örneklerden öğrenerek karar verebilir.', 1, 'Doğru: kural yazmak yerine model örneklerle eğitilir.'),
        ('Klasik programlar kuralların dışındaki durumlarda her zaman doğru sonuç verir.', 2, 'Yanlış: kural dışı durumda zorlanır veya yanlış sonuç verir.'),
        ('Giriş şifresini kontrol eden basit sistem yapay zekâya örnektir.', 2, 'Yanlış: sabit kurallı klasik programdır.'),
        ('Bir modele ne kadar çok kaliteli veri verilirse o kadar iyi sonuç verir.', 1, 'Doğru: ama “kaliteli” kelimesi önemli. Hatalı veri modeli bozar.'),
        ('Yapay zekâ doğru bilgi ile yanlış bilgiyi bilinçli olarak ayırt eder.', 2, 'Yanlış: en olası görünen cevabı üretir, doğruluğu bilmez.'),
    ], ['Doğru', 'Yanlış'])
    o.append(sec('dy', 'Sıra sizde · Kitap s. 71', 'Doğru mu, yanlış mı?', dy,
        'Kitap s. 71 Sıra sizde etkinliğinin (çıkış kodu etkinliği) sınıf içi sürümü. Öğrenciler önce işaretler, sonra "Cevapları kontrol et" düğmesine basılır. Her yanlışın yanında kısa açıklama görünür. Yanlış cevap veren öğrencilere "Hangi kelime seni yanılttı?" diye sorun.',
        foot='Önce işaretle, sonra “Cevapları kontrol et” düğmesine bas.'))

    # --- ML türleri
    def pane(a, b, c, k=''):
        return grid(3, card('Ne öğretilir?', p(a)), card('Örnekler', p(b)), card('Çıktı', p(c)), style='')
    mlt = tabs([
        ('den', 'Denetimli', pane('Etiketli örnekler: “Bu bir elma, bu bir armut.”', 'Spam filtresi, hastalık teşhisi, plaka okuma, ev fiyatı tahmini', 'Sınıf (elma/armut) veya sayı (fiyat)')),
        ('dens', 'Denetimsiz', pane('Etiketsiz veri: sistem benzerlikleri kendisi bulur.', 'Müşteri gruplama, benzer haberleri kümeleme, anormal işlem yakalama', 'Gruplar (kümeler) ve sıra dışı kayıtlar')),
        ('pek', 'Pekiştirmeli', pane('Deneme-yanılma: doğru hamleye ödül, yanlışa ceza.', 'Oyun oynayan programlar, robotun yürümeyi öğrenmesi, trafik ışığı optimizasyonu', 'En çok ödül getiren davranış (strateji)')),
        ('kk', 'Kendi kendine denetimli', pane('Metnin kendisinden: “sonraki kelimeyi tahmin et.” Etiketi insan yazmaz.', 'Büyük dil modellerinin ön eğitimi (ChatGPT, Gemini, Claude benzeri sistemler)', 'Dil, görsel ve ses için genel bilgi taşıyan model')),
    ])
    o.append(sec('ml-turleri', 'Kitap dışı · Güncel · Makine öğrenmesi türleri', 'Makine öğrenmesi nasıl öğrenir? Dört yol',
        mlt + card('Kitaba ek', p('Kitap s. 69 “Denetimli öğrenme” ve “Derin öğrenme”yi yan yana yazar. Doğrusu: denetimli/denetimsiz/pekiştirmeli öğrenme <b>öğrenme biçimleridir</b>; derin öğrenme ise çok katmanlı sinir ağı kullanan bir <b>yöntem ailesidir</b>. Derin öğrenme de denetimli veya denetimsiz yapılabilir.', 'sm'), 'warn'),
        'Sekmelere tıklayarak dört öğrenme biçimini gezdirin. Kitaptaki kısa listeyi tamamlıyoruz. Ayrıca kitaptaki "derin öğrenme insan müdahalesi olmadan çok katmanlı sinir ağlarıyla öğrenir" cümlesine dikkat: derin öğrenmede de veri toplama, model tasarımı ve değerlendirme için insan emeği gerekir. Köprü: sohbet modelleri (ChatGPT, Gemini, Claude gibi) önce kendi kendine denetimli biçimde dev metinlerle ön eğitilir; sonra insan geri bildirimiyle (denetimli ve pekiştirmeli yöntemlerle) inceltilir.',
        foot='Etiket = örneğin doğru cevabı. Denetimli: etiket var · Denetimsiz: yok · Pekiştirmeli: ödül var.'))

    # --- eşleştirme ML
    me = cls_activity([
        ('Binlerce etiketli röntgenden hastalık tanımayı öğrenen model', 1, 'Etiketli örnek var → denetimli.'),
        ('Alışveriş geçmişine bakıp müşterileri benzer gruplara ayıran sistem (grup adı verilmemiş)', 2, 'Etiket yok, benzerlik bulur → denetimsiz.'),
        ('Satranç oynayıp kazandıkça ödül puanı alan program', 3, 'Ödül-ceza ile strateji → pekiştirmeli.'),
        ('Etiketli e-postalardan spamı tanımayı öğrenen filtre', 1, 'Spam/temiz etiketi var → denetimli.'),
        ('Robot kolun bir bardağı düşürmeden tutmayı denemelerle öğrenmesi', 3, 'Deneme-yanılma ve ödül → pekiştirmeli.'),
        ('Haber arşivini önceden konu etiketi olmadan konulara ayıran sistem', 2, 'Etiket yok → denetimsiz (kümeleme).'),
    ], ['Denetimli', 'Denetimsiz', 'Pekiştirmeli'])
    o.append(sec('ml-esles', 'Etkinlik · Hangi öğrenme biçimi?', 'Senaryoyu doğru öğrenme biçimiyle eşleştir', me,
        'Önce eşli çalışma: iki dakika. Sonra kontrol edin. Ayırt edici soru her seferinde aynıdır: "Etiket var mı? Ödül var mı?"',
        foot='Etiket var → denetimli · Etiket yok → denetimsiz · Ödül ve ceza → pekiştirmeli'))

    # --- iç içe
    nest = ('<div style="position:relative;width:700px;height:660px;flex:none">'
            '<div style="position:absolute;left:0;top:0;width:700px;height:660px;border-radius:50%;background:#DCE8FB;border:3px solid #2F6FDE"><b style="position:absolute;top:26px;left:0;right:0;text-align:center;font-size:30px;color:#1B3F86">Yapay zekâ (YZ)</b></div>'
            '<div style="position:absolute;left:90px;top:130px;width:520px;height:510px;border-radius:50%;background:#C6D9F8;border:3px solid #2F6FDE"><b style="position:absolute;top:26px;left:0;right:0;text-align:center;font-size:30px;color:#1B3F86">Makine öğrenmesi</b></div>'
            '<div style="position:absolute;left:170px;top:240px;width:360px;height:380px;border-radius:50%;background:#FFE2CC;border:3px solid #C2410C"><b style="position:absolute;top:26px;left:0;right:0;text-align:center;font-size:30px;color:#7A2E0B">Derin öğrenme</b></div>'
            '<div style="position:absolute;left:225px;top:370px;width:250px;height:230px;border-radius:50%;background:#C2410C;border:3px solid #7A2E0B;display:flex;align-items:center;justify-content:center;text-align:center"><b style="font-size:28px;color:#FFF;line-height:1.2">Üretken<br>YZ</b></div></div>')
    ic = tabs([
        ('yz', 'Yapay zekâ', col(p('<b>En geniş küme.</b> Makineyi akıllı davrandıran her yöntem: kural tabanlı uzman sistemler, arama algoritmaları, makine öğrenmesi.', 'mid'), p('Örnek: 1980’lerin tıp uzman sistemi. Öğrenmez ama YZ sayılır.', 'sm mute'))),
        ('ml', 'Makine öğrenmesi', col(p('<b>Veriden öğrenen YZ.</b> Kuralları programcı yazmaz, model örneklerden çıkarır.', 'mid'), p('Örnek: spam filtresi, ev fiyatı tahmini.', 'sm mute'))),
        ('dl', 'Derin öğrenme', col(p('<b>Çok katmanlı yapay sinir ağları</b> kullanan makine öğrenmesi. Görüntü, ses ve metinde çok başarılı.', 'mid'), p('Örnek: yüz tanıma, konuşma tanıma, çeviri.', 'sm mute'))),
        ('gen', 'Üretken YZ', col(p('<b>Yeni içerik üreten</b> derin öğrenme modelleri: metin, görsel, ses, video, kod.', 'mid'), p('Örnek: sohbet asistanları, görsel üreticiler.', 'sm mute'))),
    ])
    o.append(sec('ic-ice', 'Kitap dışı · Kavram haritası', 'Aynı şey değiller: iç içe dört kavram',
        row(nest, col(ic, card('Kısa kural', p('Her derin öğrenme bir makine öğrenmesidir; her makine öğrenmesi bir yapay zekâdır. Tersi doğru değildir.', 'mid'), 'ok'), cls='f1', style='gap:22px'), gap=40),
        'Kitaptaki "yapay zekâ", "makine öğrenmesi", "derin öğrenme" ve "üretken yapay zekâ" terimleri sıkça birbirine karıştırılır. Soldaki iç içe daireler hiyerarşiyi gösterir. Sağdaki sekmelerde her kavramın tanımı ve örneği var. Soru: "Kural tabanlı bir uzman sistem yapay zekâ mıdır?" Cevap: Evet, ama makine öğrenmesi değil: bu yüzden büyük daire küçük dairelerden fazlasını içerir.',
        foot='Yapay zekâ ⊃ makine öğrenmesi ⊃ derin öğrenme ⊃ üretken yapay zekâ (günümüzdeki tipik hâli)'))

    # --- sinir ağı
    svg = '<svg id="nn-svg" viewBox="0 0 920 520" style="width:100%;background:#FFFFFF;border:1px solid #E2DED3;border-radius:14px"></svg>'
    o.append(sec('sinir-agi', 'Kitap dışı · Derin öğrenmenin temeli · Adım adım animasyon', 'Yapay sinir ağı: katman katman karar',
        row(col(svg, cls='f1'), col('<div id="nn-msg" class="stmsg" style="font-size:25px"></div>', stepper_ctl(), card('Neden “derin”?', p('Gizli katman sayısı arttıkça ağ daha karmaşık kalıplar öğrenir. Derin ağlarda onlarca, hatta yüzlerce katman olabilir.', 'sm'), 'info'), style='width:640px;gap:18px'), gap=28),
        'Basitleştirilmiş küçük bir ağ: 3 giriş (yuvarlaklık, kırmızılık, uzunluk), 4 gizli nöron, 2 çıkış (elma, armut). Çizgilerin kalınlığı ağırlıkları temsil eder. Her nöron girişleri ağırlıklarla çarpıp toplar, sonra bir aktivasyon fonksiyonundan geçirir. Eğitimde bu ağırlıklar tahmin hatasını azaltacak şekilde binlerce kez ayarlanır. Büyük dil modellerinde milyarlarca ağırlık (parametre) vardır. Sayılar örnektir.',
        foot='Ağırlık = bir bağlantının önemini gösteren sayı · Eğitim = ağırlıkları hataya göre ayarlamak'))

    # --- YZ türleri (güç)
    gt = tabs([
        ('dar', 'Dar yapay zekâ (ANI)', grid(2, card('Tanım', p('Tek bir iş veya sınırlı bir alan için eğitilmiş sistem.', 'mid')), card('Bugün', p('Bugün kullandığımız <b>bütün</b> yapay zekâ sistemleri bu sınıftadır: yüz tanıma, çeviri, öneri, satranç, sohbet modelleri.', 'mid'), 'ok'))),
        ('gen', 'Genel yapay zekâ (AGI)', grid(2, card('Tanım', p('İnsan gibi her alanda öğrenip yeni işleri kendi başına yapabilen sistem.', 'mid')), card('Bugün', p('Henüz yok. Ne zaman ve nasıl olacağı konusunda uzmanlar hemfikir değil; bu bir araştırma ve tartışma konusu.', 'mid'), 'warn'))),
        ('sup', 'Süper yapay zekâ (ASI)', grid(2, card('Tanım', p('İnsan zekâsını her alanda aşan, varsayımsal sistem.', 'mid')), card('Bugün', p('Teorik. Bilim kurgu ve etik tartışmalarının konusu.', 'mid'), 'warn'))),
    ])
    o.append(sec('turler-guc', 'Kitap dışı · Yapay zekâ çeşitleri (1) · Yeteneğe göre', 'Ne kadar yetenekli? Dar, genel, süper', gt + card('Dikkat', p('Sohbet asistanları çok farklı konuda cevap verebildiği için “her şeyi biliyor” gibi görünür. Ama onlar da eğitim verisinden örüntü çıkaran dar sistemlerdir ve yanılırlar.', 'mid'), 'info'),
        'Yeteneğe göre sınıflandırma. Öğrencilerin en çok sorduğu soru: "ChatGPT genel yapay zekâ mı?" Cevap: Genel kabul görmüş tanıma göre hayır; geniş görevlerde şaşırtıcı olabilir ama bazı basit işlerde tuhaf hatalar yapar ve kendi başına hedef belirleyip öğrenmez. Konu bilim insanları arasında tartışmalıdır; bu yüzden kesin tarih vermeyin.',
        foot='Bugünün tüm sistemleri: dar yapay zekâ (ANI)'))

    # --- işleyişe göre
    it = tabs([
        ('rea', 'Reaktif makineler', grid(2, card('Nasıl çalışır?', p('Bellek yok. Sadece o anki girdiye tepki verir.', 'mid')), card('Örnek', p('Deep Blue (1997): satranç tahtasındaki konumu analiz eder, geçmişi hatırlamaz.', 'mid')))),
        ('sin', 'Sınırlı bellek', grid(2, card('Nasıl çalışır?', p('Yakın geçmişi kısa süre hatırlar ve karar için kullanır.', 'mid')), card('Örnek', p('Otonom araç (son birkaç saniyedeki yayalar, araçlar), sohbet modeli (konuşmanın önceki mesajları).', 'mid')))),
        ('zih', 'Zihin kuramı', grid(2, card('Nasıl çalışır?', p('İnsanların niyet ve duygularını anlayıp ona göre davranmayı hedefler.', 'mid')), card('Durum', p('Araştırma aşamasında. Duygu tanıyan sistemler var ama insan gibi “anlama” yok.', 'mid'), 'warn'))),
        ('oz', 'Öz farkındalık', grid(2, card('Nasıl çalışır?', p('Kendi varlığının bilincinde bir sistem.', 'mid')), card('Durum', p('Bugün bilim kurgu. Hiçbir sistem bilinçli değildir.', 'mid'), 'warn'))),
    ])
    o.append(sec('turler-islev', 'Kitap dışı · Yapay zekâ çeşitleri (2) · İşleyişe göre', 'Nasıl çalışıyor? Dört tür', it,
        'Arend Hintze’nin sınıflandırması sık kullanılır. Bugün gerçekte kullandığımız iki tür vardır: reaktif makineler ve sınırlı bellekli sistemler. Zihin kuramı ve öz farkındalık henüz gerçek ürünlerde yok. Öğrencilere sorun: "Telefonunuzdaki sesli asistan hangi türe girer?" (Sınırlı bellek: konuşmayı kısa süre hatırlar.)',
        foot='Gerçek ürünlerde yalnızca ilk iki tür var.'))

    hk = cls_activity([
        ('Satranç oynayan, başka hiçbir işi yapamayan program', 1, 'Tek iş için eğitildi → dar yapay zekâ.'),
        ('Metin çeviren uygulama', 1, 'Tek alan (çeviri) → dar yapay zekâ.'),
        ('Her konuyu insan gibi öğrenebilen, kendi hedeflerini koyan sistem', 2, 'Henüz yok, hedeflenen: genel yapay zekâ.'),
        ('İnsan zekâsını her alanda geçen varsayımsal sistem', 3, 'Teorik: süper yapay zekâ.'),
        ('Yüz tanıma ile telefon kilidini açan sistem', 1, 'Tek iş → dar yapay zekâ.'),
    ], ['Dar (ANI)', 'Genel (AGI)', 'Süper (ASI)'])
    o.append(sec('turler-etk', 'Etkinlik · Hangi tür?', 'Örneği doğru türle eşleştir', hk,
        'Bu etkinlik iki dakikalıktır. Öğrenciler bire bir işaretler. Her yanlışta nedenini kendileri açıklasın.', foot='Bugün hepsi dar yapay zekâ; genel ve süper yapay zekâ henüz yok.'))

    # --- alanlar
    def alan(ne, ornek, veri):
        return grid(3, card('Ne yapar?', p(ne)), card('Örnekler', p(ornek)), card('Hangi veriyle?', p(veri)))
    al = tabs([
        ('gor', 'Bilgisayarlı görü', alan('Görüntüde nesne, yüz, yazı tanır.', 'Telefonda yüz tanıma, plaka okuma, röntgen analizi, tarım dronları', 'Etiketli fotoğraf ve video')),
        ('dil', 'Doğal dil işleme', alan('İnsan dilini anlar, çevirir, özetler, yazar.', 'Çeviri uygulamaları, sohbet asistanları, spam filtresi', 'Dev metin arşivleri')),
        ('ses', 'Konuşma ve ses', alan('Sesi yazıya, yazıyı sese çevirir.', 'Sesli asistanlar, altyazı üretimi, çağrı merkezi botları', 'Ses kayıtları ve metinleri')),
        ('oneri', 'Öneri sistemleri', alan('Kullanıcının neyi seveceğini tahmin eder.', 'Video, müzik, film ve alışveriş önerileri', 'İzleme, tıklama, satın alma geçmişi')),
        ('rob', 'Robotik ve otonom araçlar', alan('Çevreyi algılar, karar verir, hareket eder.', 'Depo robotları, sürücüsüz araç denemeleri, akıllı süpürge', 'Kamera, radar, sensör verisi')),
        ('tah', 'Tahminleme', alan('Geçmişten geleceği tahmin eder.', 'Hava tahmini, talep tahmini, kredi riski, enerji tüketimi', 'Zaman serisi ve geçmiş kayıtlar')),
    ])
    o.append(sec('alanlar', 'Kitap dışı · Yapay zekâ çeşitleri (3) · Uygulama alanlarına göre', 'Yapay zekâ nerelerde çalışıyor? Altı alan', al,
        'Alanlara göre sınıflandırma. Sekmelere tıklayın ve her alandan öğrencilerin kendi telefonlarında kullandıkları bir örneği söylemelerini isteyin. Kitap s. 76-77 günlük hayat örnekleri bu alanların ürünleridir: navigasyon (tahminleme + öneri), alışveriş (öneri), akıllı ev (sensör + tahmin), sağlık (görü), otonom araç (görü + robotik).',
        foot='Bir ürün birden fazla alanı birlikte kullanabilir (örn. otonom araç: görü + robotik + tahminleme).'))

    # --- günlük hayat
    def gh(kit, veri, risk):
        return grid(3, card('Kitaptaki senaryo', p(kit, 'sm')), card('Hangi veriyi kullanır?', p(veri, 'sm'), 'info'), card('Dikkat edilecek risk', p(risk, 'sm'), 'warn'))
    gu = tabs([
        ('nav', 'Navigasyon', gh('Trafik yoğunluğunu ve yol durumunu analiz eder, en hızlı rotayı önerir.', 'Konum, hız, trafik verisi', 'Konum geçmişi kişisel veridir; izinleri kontrol et.')),
        ('alis', 'Alışveriş', gh('Geçmiş arama ve satın almalara göre ürün önerir.', 'Arama, tıklama, sepet geçmişi', 'Seni belirli ürünlere yönlendirebilir; her öneri ihtiyaç değildir.')),
        ('ev', 'Akıllı ev', gh('Akıllı termostat, evde ne zaman kimse olmadığını öğrenip ısıtmayı ayarlar.', 'Sıcaklık, hareket, kullanım saatleri', 'Evde olup olmadığın bilgisi hassastır; cihaz güvenliği önemli.')),
        ('saglik', 'Sağlık', gh('Röntgen ve MR görüntülerinde olası belirtileri bulup doktora uyarı verir.', 'Tıbbi görüntüler', 'Doktorun yerini almaz, yardımcıdır; yanlış alarm olabilir.')),
        ('oto', 'Otonom araç', gh('Kamera ve sensörlerle yayaları, araçları, tabelaları algılar; hız ve yönü ayarlar.', 'Kamera, radar, haritalar', 'Sorumluluk kimde? Beklenmedik durumlarda karar zordur.')),
        ('film', 'Film ve müzik', gh('İzlenen türleri öğrenir; benzer film ve şarkıları önerir.', 'İzleme ve dinleme geçmişi', 'Aynı türde kalıp yeni şeyleri keşfetmeni azaltabilir.')),
    ])
    o.append(sec('gunluk', '2.1.3 · Kitap s. 76–78', 'Günlük hayatta yapay zekâ: altı senaryo', gu,
        'Kitap s. 76-78 senaryoları tek slaytta toplandı. Her sekmede kitaptaki örnek, kullandığı veri ve dikkat edilecek risk var (risk sütunu kitap dışı eklemedir). Sorun: "Bu sistem hakkında hangi verilerini veriyorsun, bunun karşılığında ne kazanıyorsun?" Bu soru gizlilik konusuna köprüdür.',
        foot='Kitap s. 76–78 · Risk sütunu kitaba eklenen güncel yorumdur.'))

    gt2 = col(
        qa(p('<b>1.</b> Günlük hayatta yapay zekâ kullanan hangi uygulamaları biliyorsun?', 'mid'), 'Örnek cevap: harita uygulaması (trafik tahmini), video platformu (öneri), telefon kamerası (yüz algılama, gece modu), klavye (sonraki kelime), çeviri uygulaması, sesli asistan.'),
        qa(p('<b>2.</b> Sağlık alanında yapay zekânın avantajı ve dezavantajı nedir? Örnekle açıkla.', 'mid'), 'Avantaj: röntgen/MR’da hızlı, tutarlı ön tarama, erken teşhise yardım. Dezavantaj: yanlış alarm veya kaçırma, verinin gizliliği, sorumluluğun belirsizliği. Yapay zekâ doktoru desteklemeli, yerine geçmemeli.'),
        qa(p('<b>3.</b> Otonom araçlar yaygınlaşırsa ulaşım nasıl değişir?', 'mid'), 'Olası: kaza sayısında azalma, trafik akışında düzen, engelli ve yaşlıların hareket özgürlüğü. Riskler: sürücülük mesleklerinin değişmesi, siber saldırı, kaza sorumluluğu, veri toplama.'),
        gap=20)
    o.append(sec('gunluk-tartis', 'Düşün · Tartış · Paylaş · Kitap s. 78', 'Üç soru, üç dakika', gt2,
        'Kitap s. 78 düşün-tartış-paylaş soruları. Önce bireysel cevap, sonra eşli, sonra sınıf. Cevap düğmeleri örnek cevaplar içerir; öğrencilerin kendi cevaplarını önce söylemelerini bekleyin.',
        foot='Önce kendi cevabını yaz, sonra örnek cevaba bak.'))

    # --- halüsinasyon
    ha = row(
        col(card('Yapay zekâ yanıtı (örnek)', col(p('<b>Soru:</b> Cahit Arf “Makine düşünebilir mi?” konuşmasını nerede, ne zaman yaptı?', 'mid'), p('<b>Cevap:</b> Cahit Arf bu konuşmayı 1962 yılında Ankara’daki ODTÜ’de yapmıştır; konuşma, Türkiye’deki ilk yapay zekâ semineri kabul edilir.', 'mid', 'background:#EAF1FD;padding:14px 18px;border-radius:10px')), 'info'),
            qa(p('Bu cevap kendinden emin ve akıcı. Doğru mu?', 'mid'), 'Hayır. Kitap s. 79: konuşma <b>1959’da Erzurum’da</b> yapıldı. Cevap akıcı ve emin ama uydurma. İşte halüsinasyon.', btn='Doğrula'), cls='f1'),
        col(card('Halüsinasyon neden olur?', ul('Eğitim verisi eksik, hatalı veya eski', 'Model “doğruyu” değil “en olası görünen” cümleyi üretir', '“Bilmiyorum” demek yerine cevap üretmeye meyillidir', 'Belirsiz veya eksik prompt'), 'sm'),
            card('Üç tür', ul('Var olmayan kitap, makale veya yazar uydurmak', 'Tarih, sayı veya kavramı küçük ama kritik biçimde yanlış vermek', 'Tamamen yanlış bilgiyi çok emin anlatmak'), 'warn'), style='width:760px;gap:20px'), gap=32)
    o.append(sec('halu', '2.1.2 · Kitap s. 72–73', 'Yapay zekâ halüsinasyonu: emin ama yanlış', ha,
        'Kitap s. 72-73. Önce öğrencilere cevabı okutun ve doğru olup olmadığını sorun; çoğu "doğru" der, çünkü akıcı ve emin yazılmıştır. Sonra "Doğrula" düğmesine basın. Bu cevap bu amaçla yazılmış örnek bir yapay zekâ cevabıdır (gerçek bir araçtan alınmadı). Önemli ders: güven veren ifade biçimi doğruluk kanıtı değildir. Görsel modellerde de halüsinasyon vardır (fazladan parmak, bozuk yazı).',
        foot='Kitap s. 79: Cahit Arf, 1959, Erzurum · Kural: Önemli bilgiyi en az iki güvenilir kaynakla doğrula.'))

    av = cls_activity([
        ('“Deniz seviyesinde su 100 °C’de kaynar.”', 1, 'Doğru. Basınç düşünce kaynama noktası düşer, ama deniz seviyesinde doğrudur.'),
        ('“Eiffel Kulesi Londra’dadır.”', 2, 'Yanlış. Eiffel Kulesi Paris’tedir.'),
        ('“Python 1991’de Guido van Rossum tarafından yayımlandı.”', 1, 'Doğru. İlk sürüm 1991’de yayımlandı.'),
        ('“Yılmaz ve Kaya (2019) ‘Kuantum Çay Demleme Algoritmaları’ makalesinde bunu kanıtlamıştır.”', 3, 'Var olmayan kaynak. Yapay zekâ makale ve yazar uydurabilir; DOI, dergi ve yazar adını arayarak doğrula.'),
        ('“Türkiye Cumhuriyeti’nin ilk Cumhurbaşkanı İsmet İnönü’dür.”', 2, 'Yanlış. İlk Cumhurbaşkanı Mustafa Kemal Atatürk’tür.'),
    ], ['Doğru', 'Yanlış', 'Uydurma kaynak'])
    o.append(sec('halu-av', 'Etkinlik · Halüsinasyon avı', 'Yapay zekânın beş iddiası: hangisine güvenirsin?', av,
        'Beş iddiadan ikisi doğru, ikisi yanlış, biri uydurma kaynaktır. Öğrenciler işaretlesin, sonra kontrol edilsin. Üçüncü iddiada Python tarihi yaygın bilgidir; öğrencilerden kendi telefonlarıyla doğrulamalarını isteyebilirsiniz. Dördüncü iddia (kuantum çay) gülünç gelir ama gerçek halüsinasyonlarda sahte kaynak çok inandırıcı yazılır.',
        foot='Doğrulama araçları: ansiklopedi, resmî kurum sitesi, Google Scholar, DOI araması.'))

    # --- uygulama 1 stepper
    o.append(sec('uygulama1', '1. Uygulama · Kitap s. 73–74 · 20 dakika', 'Yapay zekâ yanıtını doğrula',
        row(col('<div id="u1-list" class="col" style="gap:12px"></div>', '<div id="u1-msg" class="stmsg" style="font-size:25px"></div>', stepper_ctl(), cls='f1'),
            col(card('Soru', p('“Türkiye’de ilk bilgisayar ne zaman kullanılmıştır?” Soruyu bir yapay zekâ aracına sor.', 'mid'), 'info'),
                table(['İfade', 'Kaynak 1', 'Kaynak 2', 'Sonuç'], [['…', '…', '…', 'D / E / H'], ['…', '…', '…', 'D / E / H']], widths=['34%', '22%', '22%', '22%'], size=22),
                card('Güvenilir kaynak ipucu', p('Resmî kurum (.gov.tr), üniversite (.edu.tr), ansiklopedi, hakemli dergi. Kullanma: adı belirsiz blog, sosyal medya paylaşımı.', 'sm'), 'ok'), style='width:760px;gap:18px'), gap=28),
        'Kitap s. 73-74 Uygulama 1. Öğrenciler soruyu bir yapay zekâ aracına sorar, cevaptaki doğrulanacak ifadeleri (tarih, kurum, yer, model) belirler, en az iki güvenilir kaynakla karşılaştırır ve tablo doldurur. Sağdaki tablo çalışma kâğıdı yerine kullanılabilir. Öğretmen notu: bu konuda kaynaklarda 1960 yılında Karayolları Genel Müdürlüğü’ne kurulan IBM 650 sık anılır, ancak farklı kurum ve tarihler de anlatılır; bu yüzden en az iki kaynak şarttır ve öğrencilerin kendi bulgularını getirmesini bekleyin. Bu soru bilinçli olarak seçildi: kaynaklar arasında farklılık çıkabilir ve bu tartışma değerlidir.',
        foot='Kontrol listesi: ifadeleri belirledim · en az 2 kaynak buldum · kaynak adlarını yazdım · neden güvendiğimi açıkladım'))

    # --- gizlilik
    o.append(sec('gizlilik', '2.1.2 · Kitap s. 74–75', 'Öneri sistemi seni nasıl tanıyor?',
        row(card('Arda’nın akşamı', ul('Sabah arkadaşlarıyla futbol konuşmuştu; akşam akışı futbol videolarıyla doldu.', 'Bilgisayar oyunu içerikleri belirdi.', 'E-ticaret sitesi, geçen hafta baktığı ayakkabıya benzer ürünleri bütçesine uygun fiyatla önerdi.'), 'info', ''),
            card('Perde arkası', ul('Tıkladığın, izlediğin, beklediğin süre: hepsi <b>davranış verisidir</b>.', 'Model bu veriden “sana benzer insanlar” gibi kalıplar çıkarır.', 'Sonuç: kolaylık ve kişiselleştirme, karşılığında <b>kişisel veri</b>.'), 'warn', ''), gap=28) +
        grid(2, card('Hangi veriler toplanabilir?', p('Konum, alışkanlıklar, tercihler, bazen sağlık gibi hassas bilgiler.', 'mid')), card('Hakkın var', p('Hangi verinin alındığını bilmek, onay vermek ve gerektiğinde kontrol etmek. Türkiye’de bu hakların adı: KVKK (6698 sayılı kanun).', 'mid'), 'ok')),
        'Kitap s. 74-75 Oku-yorum metni (Arda). Öğrencilerden kendi telefonlarında bir uygulamanın gizlilik ayarlarına bakmalarını isteyebilirsiniz. KVKK, 2016’da yürürlüğe giren 6698 sayılı Kişisel Verilerin Korunması Kanunu’dur. Bir sonraki slaytta bir öneri akışını kendiniz yönlendireceksiniz.',
        foot='Kitap s. 74–75 · Düşün-Tartış-Paylaş soruları bir sonraki slaytta'))

    o.append(sec('filtre', 'Canlı uygulama · Filtre balonu', 'Beğendikçe dünyan daralır mı? Akışını yönlendir',
        row(col('<div id="fb-feed" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px"></div>', p('Bir konuyu “Beğen” ile çok seçersen akış nasıl değişiyor? Akıştaki 10 kutuya bak.', 'sm mute'), cls='f1'),
            col(card('Konu seç ve beğen', '<div id="fb-btns" style="display:flex;flex-wrap:wrap;gap:10px"></div>'),
                card('Çeşitlilik', col('<div class="bar"><i id="fb-d" style="width:100%"></i></div>', p('<b id="fb-dt">Çeşitli akış</b>', 'mid'))),
                '<button class="ans-btn alt sm" type="button" id="fb-reset">Sıfırla</button>', style='width:760px;gap:18px'), gap=30),
        'Dokuz konu ve onar kutuluk bir akış. Her "Beğen" bir konunun ağırlığını artırır; akışta o konunun payı büyür, diğerleri küçülür. Çeşitlilik çubuğu, akıştaki farklı konu sayısıyla düşer. Kitap s. 75 sorularına köprü: "Sürekli benzer içeriğin gösterilmesi yeni şeyler keşfetmeni nasıl etkiler?" Öğrenci önerileri: farklı konulara bilerek tıklamak, arama yapmak, farklı kaynaklara bakmak. Not: bu basit bir modeldir; gerçek sistemler çok daha karmaşıktır ama temel mantık aynıdır.',
        foot='Filtre balonu: algoritma seni sürekli sevdiğin içeriğe yönlendirir; farklı bakış açılarını görme şansın azalır.'))

    dt = qa(p('<b>1.</b> Arda’ya içeriklerin ilgi alanına göre seçilmesi avantaj mı, dezavantaj mı?', 'mid'), 'İkisi de: zaman kazandırır ve ilgini çeken şeyi bulur (avantaj); ama seni aynı konuya kapatır ve ne kadar vakit geçirdiğini fark ettirmez (dezavantaj).')
    o.append(sec('gizlilik-tartis', 'Düşün · Tartış · Paylaş · Kitap s. 75', 'Dört soru: seni algoritma mı tanıyor, sen mi?',
        grid(2,
             qa(p('<b>1.</b> İçeriklerin ilgi alanına göre seçilmesi avantaj mı, dezavantaj mı?', 'mid'), 'İkisi de: zaman kazandırır (avantaj); ama seni aynı konuya kapatır ve ne kadar vakit geçirdiğini fark ettirmez (dezavantaj).'),
             qa(p('<b>2.</b> Hep benzer içerik görmek keşfetmeyi nasıl etkiler? Neler yapardın?', 'mid'), 'Yeni şeyleri görme şansı azalır. Bilerek farklı konulara bakmak, arama yapmak, farklı kaynak izlemek, öneri geçmişini temizlemek.'),
             qa(p('<b>3.</b> Uygulamaların seninle ilgili bilgi toplaması ne kadar doğru? Fayda ve risk?', 'mid'), 'Fayda: kişisel öneri, kolaylık. Risk: mahremiyet ihlali, veri sızıntısı, reklam hedeflemesi, manipülasyon. Şeffaflık ve onay şart.'),
             qa(p('<b>4.</b> Algoritmanın seni tanıması ile kendini tanıman arasındaki fark?', 'mid'), 'Algoritma davranışına bakar (ne tıkladın); sen niyetini, değerlerini ve ihtiyacını bilirsin. Algoritma geçmişi yansıtır, kendini tanıma ise değişime açıktır.'), style='gap:22px'),
        'Kitap s. 75 dört soru. İki kişilik gruplarla 3 dakika, sonra paylaşım. Cevap düğmeleri örnek cevaplardır. Araştırma ödevi (kitap s. 75): günlük hayatta kullanılan bir yapay zekâ uygulamasını araştırıp amacını, kolaylığını ve dikkat edilecekleri not etmek.',
        foot='Kitap s. 75 · Araştırma: Günlük hayatta kullandığın bir yapay zekâ uygulamasını seç, sınıfta paylaş.'))

    vp = cls_activity([
        ('Herkese açık bir ansiklopedi paragrafını özetlemesini istemek', 1, 'Kişisel veri yok, herkese açık içerik.'),
        ('TC kimlik numaranı ve ev adresini yazmak', 3, 'Kimlik ve adres bilgisi asla paylaşılmaz.'),
        ('Kendi yazdığın kısa bir hikâyeyi düzeltmesini istemek (kişisel bilgi yok)', 1, 'Kendi içeriğin, kişisel veri içermiyor.'),
        ('Sağlık raporunun fotoğrafını yüklemek', 3, 'Sağlık verisi hassas veridir.'),
        ('Sınıf arkadaşının fotoğrafını izinsiz yükleyip çizgi filme çevirtmek', 3, 'Başkasının görüntüsünü izinsiz kullanmak kişilik hakkını ihlal eder.'),
        ('Okulun iç yazışmasından bir paragrafı yapıştırmak', 2, 'Gizli olabilir; önce öğretmene veya yönetime sor.'),
        ('Hesap şifreni veya bir API anahtarını yapıştırmak', 3, 'Şifre ve anahtar asla paylaşılmaz.'),
    ], ['Paylaşırım', 'Önce sorarım', 'Asla'], compact=True)
    o.append(sec('veri-paylas', 'Etkinlik · Yapay zekâ aracına ne yazarım?', 'Paylaşırım mı, önce mi sorarım, asla mı?', vp,
        'Birçok yapay zekâ servisi yazdıklarınızı kaydedebilir ve ayarlara göre model geliştirmede kullanabilir. Bu yüzden hassas bilgi girilmez. Her satırı sınıfla tartışın. Ek ipucu: hesap ayarlarında "sohbetlerimi model eğitiminde kullanma" benzeri seçenekler olabilir; ayar adı servise göre değişir.',
        foot='Altın kural: Kamuya açık değilse ve başkasına aitse yazma.'))

    # --- önyargı
    o.append(sec('onyargi', 'Kitap dışı · Güncel · Etik', 'Önyargı: model, veriden yalnızca iyiyi öğrenmez',
        grid(3,
             card('Neden olur?', p('Model, geçmiş verideki kalıpları kopyalar. Geçmişte haksızlık varsa, veri onu da taşır.', 'mid')),
             card('Gerçek vakalar', ul('Bir e-ticaret şirketi, geçmiş başvurulara göre eğitilen işe alım aracını 2018’de kaldırdı: kadın adayları geride bırakıyordu.', 'Gender Shades araştırması (2018): bazı yüz tanıma sistemleri koyu tenli kadınlarda belirgin biçimde daha çok hata yaptı.'), 'warn'),
             card('Nasıl azaltılır?', ul('Çeşitli ve dengeli veri', 'Farklı gruplarda ayrı test', 'İnsan denetimi', 'Şeffaflık: nasıl karar verdiğini açıklama'), 'ok'), style='') +
        qa(p('<b>Soru:</b> Bir işe alım modelinin eğitim verisinin %90’ı geçmişte işe alınmış erkek adaylardan oluşuyor. Model nasıl davranır?', 'mid'), 'Erkek adayları “başarılı kalıp” sayıp kadın adayları geride bırakabilir. Hata modelde değil, veride başlar. Çözüm: dengeli veri, farklı gruplarda test ve insan denetimi.'),
        'İki bilinen örnek: bir teknoloji şirketinin 2018’de kullanmaktan vazgeçtiği işe alım aracı (Reuters haberi) ve Buolamwini ile Gebru’nun 2018 tarihli Gender Shades çalışması. İkisini de öğrencilerin kendi aramalarıyla doğrulamasını isteyebilirsiniz. Ana ders: yapay zekâ nesnel değildir, verinin aynasıdır. Kitap s. 74 gizlilik ve etik konusunu ele alır; önyargı kitapta ayrıca yer almıyor.',
        foot='Yapay zekâ nesnel değil, verinin aynasıdır.'))

    # --- tarihçe stepper
    o.append(sec('tarih', '2.1.4 · Kitap s. 78–80 + güncel · Adım adım animasyon', 'Yapay zekânın yolculuğu: 1943’ten bugüne',
        '<div id="tr-line" style="display:flex;align-items:center;gap:0;height:150px"></div><div id="tr-card" class="card" style="min-height:380px;gap:20px;justify-content:center"></div>' + stepper_ctl(),
        'Kitap s. 78-80 tarihçesi güncel gelişmelerle genişletildi. Kitaptaki "1970-1990 yapay zekâ kışı" aslında iki ayrı kıştır (yaklaşık 1974-80 ve 1987-93). Kitap 2010-2020 ve 2020 sonrası arasında dönüm noktalarını vermiyor: 2012 AlexNet, 2016 AlphaGo, 2017 Transformer mimarisi, 2022 ChatGPT. 2024 Nobel Fizik (Hopfield ve Hinton) ve Kimya (Hassabis, Jumper ve Baker) ödülleri yapay zekânın bilimdeki yerini gösterir. Türkiye Yapay Zekâ Eylem Planı 2026-2030, 18 Ağustos 2026 tarihli Resmî Gazete’de (sayı 33344) yayımlanan Cumhurbaşkanlığı Genelgesi ile yürürlüğe girdi. Otomatik oynat 3 saniyede bir ilerler.',
        foot='Kitaba ek olan dönüm noktaları turuncu ile işaretlidir.'))

    es = cls_activity([
        ('1940–1950', 1, 'İlk fikirler: McCulloch-Pitts yapay nöron modeli (1943), Turing Testi (1950).'),
        ('1956', 2, 'Dartmouth Konferansı: “Artificial Intelligence” terimi ilk kez kullanıldı.'),
        ('1960–1970', 3, 'ELIZA, ilk satranç ve problem çözme programları.'),
        ('1970–1990', 4, 'Yapay zekâ kışı: yetersiz işlem gücü, veri yokluğu, karşılanmayan beklentiler.'),
        ('1990–2010', 5, 'İnternet, güçlü bilgisayarlar, Deep Blue (1997), makine öğrenmesi.'),
        ('2010–2020', 6, 'Büyük veri, GPU’lar, derin öğrenme.'),
        ('2020 ve sonrası', 7, 'Üretken yapay zekâ ile metin, görsel, kod, müzik ve video üretimi.'),
    ], ['İlk fikirler', 'Kavramın doğuşu', 'İlk programlar', 'YZ kışı', 'Yeniden yükseliş', 'Derin öğrenme', 'Üretken YZ'], compact=True)
    es = es.replace('min-width:420px', 'min-width:300px')
    o.append(sec('tarih-esles', 'Sıra sizde · Kitap s. 81–82', 'Dönemi özelliğiyle eşleştir', es,
        'Kitap s. 81-82 eşleştirme etkinliği. Kitaptaki A-F harf eşleşmesi yerine dönemi doğrudan adıyla eşleştirme yaptırıyoruz. Önce bireysel, sonra kontrol. Yanlış işaretleyenlerden nedenini yazılı açıklamasını isteyin.',
        foot='Kitap s. 81–82 · Dönem adı → özellik'))

    ta = qa(p('<b>Kitaptaki soru (s. 81):</b> Bugünkü üretken yapay zekâ araçlarının ortaya çıkmasında en kritik kırılma noktası hangi dönemdir?', 'mid'), 'Tek doğru yoktur, gerekçe önemlidir. Güçlü bir cevap: 2010’lar. Büyük veri + GPU + derin öğrenme birleşti; 2017’de Transformer mimarisi dili ölçeklenebilir hâle getirdi; 2022’de sohbet arayüzü herkese ulaştı.')
    o.append(sec('tarih-tartis', 'Düşün · Tartış · Paylaş · Kitap s. 81', 'Kış nedir? Dönüm noktası hangisi?',
        grid(2,
             qa(p('<b>1.</b> 1970–1990 dönemine neden “yapay zekâ kışı” denir?', 'mid'), 'Bilgisayarların işlem gücü yetersizdi, büyük veri kaynakları yoktu ve beklenen sonuçlar alınamadı; bu yüzden ilgi ve yatırım azaldı. Araştırma tamamen durmadı: uzman sistemler gelişti.'),
             qa(p('<b>2.</b> 1990 sonrasında hız kazanmanın en az iki nedeni?', 'mid'), 'Bilgisayar teknolojisinin gelişmesi, internetin yaygınlaşması, veri miktarının artması, makine öğrenmesi yöntemleri.'),
             qa(p('<b>3.</b> 2010–2020 ile 2020 sonrasını karşılaştır.', 'mid'), 'Ortak: derin öğrenme ve büyük veri. Fark: 2010–2020 tanıma ve sınıflandırma ağırlıklıydı; 2020 sonrası üretim (metin, görsel, video, kod) ve geniş kullanıcı kitlesi.'),
             ta, style='gap:22px'),
        'Kitap s. 81 soruları. Sorulara örnek cevap düğmelerle açılır. 5. soru (fırsat ve riskler) için bir sonraki bölümün etik slaytlarına dönülebilir. Öğrencilerin gerekçeli savunmasını önemseyin: bu soruda tek doğru cevap yoktur.',
        foot='Gerekçe yaz: “Bence … çünkü …”'))

    # --- bölüm 1 test
    tq = grid(2,
        qa(p('<b>1.</b> “Yapay zekâ, verilerden öğrendiği kalıplara göre en olası cevabı üretir.” Bu cümle hangisini açıklar? <span class="mute">A) Her zaman doğru sonuç · B) Bilinçli karar · C) Kurallarla çalışma · D) Anlamdan çok olasılığa göre çalışma</span>', 'sm'), '<b>D.</b> Yapay zekâ anlamak yerine olasılık hesaplar.'),
        qa(p('<b>2.</b> Yapay zekâ modeline çok sayıda elma ve armut fotoğrafı göstermek hangi aşamadır? <span class="mute">A) Veri toplama · B) Tahmin · C) Geri bildirim</span>', 'sm'), '<b>A.</b> Veri toplama (ve ardından model eğitimi).'),
        qa(p('<b>3.</b> Etiketli verilerle öğrenen, etiket bekleyen yönteme ne denir? <span class="mute">A) Denetimli · B) Denetimsiz · C) Pekiştirmeli</span>', 'sm'), '<b>A.</b> Denetimli öğrenme.'),
        qa(p('<b>4.</b> Bugünkü bütün yapay zekâ sistemleri hangi sınıftadır? <span class="mute">A) Dar · B) Genel · C) Süper</span>', 'sm'), '<b>A.</b> Dar yapay zekâ.'),
        qa(p('<b>5.</b> Yapay zekâ halüsinasyonu nedir? <span class="mute">A) Sistem çökmesi · B) Gerçek dışı bilgiyi doğruymuş gibi sunmak · C) Veri silinmesi</span>', 'sm'), '<b>B.</b> Gerçek dışı bilgiyi emin bir dille sunmak.'),
        qa(p('<b>6.</b> Bir işe alım modeli kadın adayları geride bırakıyor. En olası neden? <span class="mute">A) Ekran yavaş · B) Eğitim verisindeki önyargı · C) İnternet hızı</span>', 'sm'), '<b>B.</b> Eğitim verisindeki önyargı.'),
        style='gap:14px')
    o.append(sec('b1-test', 'Bölüm 1 · Mini test', 'Altı soruda bölümü değerlendir', ansall() + tq,
        'Bölüm 1 sonunda altı soruluk mini test. Bütün cevapları açmak için "Tüm cevapları göster" düğmesini kullanabilirsiniz. Öğrenciler önce kağıda yazsın. Ortalama başarı düşükse tahmin ve olasılık, denetimli öğrenme ve halüsinasyon konularını tekrar edin.',
        foot='Sonraki bölüm: yapay zekâ modelleri ve çeşitleri'))
    return ''.join(o)
