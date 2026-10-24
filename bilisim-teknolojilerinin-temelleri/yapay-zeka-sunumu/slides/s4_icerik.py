# -*- coding: utf-8 -*-
from lib import *


def chk(id, items):
    li = ''.join('<label style="display:flex;align-items:center;gap:14px;font-size:27px;line-height:1.3"><input type="checkbox" class="chk-i" style="width:30px;height:30px;accent-color:#2E8540;flex:none"><span>%s</span></label>' % t for t in items)
    return '<div id="%s" class="chk col" style="gap:12px">%s<p class="chk-s" style="font-size:26px;font-weight:700;color:#C2410C">0 / %d tamam</p></div>' % (id, li, len(items))


def slides():
    o = []
    o.append(divider('b4', 'Bölüm 4 · Kitap 2.2.2 · s. 92–108', 'Üretken Yapay Zekâyla<br>İçerik Oluşturma',
                     'Görsel, ses ve video üret; sonra doğrula, kaynak göster, etik kontrol yap.',
                     'Dördüncü bölüm kitabın 2.2.2 konusudur: görsel, ses ve video oluşturma ile dört uygulama (stil yolculuğu, seslendirme, dijital hikâye atölyesi). Her ortamda üretim mantığı, prompt ipuçları, etik riskler ve doğrulama yöntemi var. Güncel ek: içerik kimlik bilgileri ve filigran, deepfake ayırt etme. Önerilen süre: 4 ders saati (yıllık plan 7. hafta). Hesap açma ve yaş sınırı için okul kurallarına uyun.',
                     '<div style="display:flex;gap:24px;flex-wrap:wrap"><span class="pill" style="font-size:26px">görsel</span><span class="pill" style="font-size:26px">ses</span><span class="pill" style="font-size:26px">video</span><span class="pill" style="font-size:26px">telif ve etik</span><span class="pill" style="font-size:26px">doğrulama</span></div>'))

    # --- harita
    def tp(a, b, c):
        return grid(3, card('Ne üretir?', p(a)), card('Nerede kullanılır?', p(b), 'info'), card('Nasıl kontrol edersin?', p(c), 'warn'))
    hm = tabs([
        ('met', 'Metin', tp('Yazı, özet, çeviri, e-posta, hikâye', 'Ödev taslağı, duyuru, müşteri yanıtı', 'Bilgileri kaynakla doğrula; kendi sözlerinle düzenle')),
        ('gor', 'Görsel', tp('Resim, afiş, illüstrasyon, ürün görseli', 'Sunum, sosyal medya, oyun tasarımı', 'Bozuk detay, telif, kişi hakları')),
        ('ses', 'Ses ve müzik', tp('Seslendirme, podcast, müzik', 'Eğitim videosu, reklam, erişilebilirlik', 'İzin, ses sahibi, lisans')),
        ('vid', 'Video', tp('Kısa sahne, animasyon, tanıtım', 'Reklam, eğitim içeriği, hikâye', 'Gerçek sanılma riski; “yapay zekâ üretimi” de belirt')),
        ('kod', 'Kod', tp('Fonksiyon, web sayfası, test kodu', 'Yazılım geliştirme, otomasyon', 'Çalıştır, test et, güvenlik açığına bak')),
        ('sun', 'Sunum', tp('Slayt taslağı, konuşma notu', 'Ders ve proje sunumları', 'Gerçek veri ve kaynak ekle, görselleri kontrol et')),
    ])
    o.append(sec('harita', '2.2 · Kitap s. 82–83', 'Üretken yapay zekâ ile neler üretilir?', hm,
        'Kitap s. 82: üretken yapay zekâ metin, görsel, ses ve video üretebilir. Biz kod ve sunumu da ekledik. Sekmeleri tek tek açın ve her sekmede öğrencilerin bir örnek söylemesini isteyin. Ortak mesaj her sekmede aynı: üret, sonra kontrol et.',
        foot='Her üretimin sonunda aynı iki soru: Doğru mu? Kullanma hakkım var mı?'))

    # --- görsel nasıl
    o.append(sec('gorsel-nasil', 'A · Görsel oluşturma · Kitap s. 92–93', 'Sistem hazır fotoğraf bulmaz, yeni görsel üretir',
        row(col(card('Öğrenme', ul('Görsellerdeki nesneleri (insan, ağaç, araba) tanır.', 'Nesnelerin nasıl göründüğünü öğrenir.', 'Metin ile görüntü arasında bağlantı kurar.'), 'info'),
                card('Üretim', ul('Yazdığın metni analiz eder.', 'Anahtar kavramları bulur.', 'Bu kavramlara uygun yeni bir görüntü üretir.'), 'ok'), cls='f1', gap=18),
            col(card('Ressam benzetmesi', p('Bir ressama “Uzayda uçan bir balina çiz.” dersen, daha önce görmemiş olsa bile öğrendiklerini birleştirip çizer. Yapay zekâ da öğrendiklerini birleştirerek yeni görüntü üretir.', 'mid')),
                card('Kullanım alanları', ul('Sosyal medya görselleri', 'Oyun ve animasyon tasarımı', 'E-ticaret ürün görselleri', 'Sunum ve afiş', 'Reklam içerikleri'), 'sm'), cls='f1', gap=18), gap=28) +
        card('UYARI (kitap s. 92)', p('Başkasına ait görsel, marka, logo, kişi fotoğrafı veya özel bilgileri izinsiz kullanma. Ürettiğin görseli gerçek fotoğraf ya da belge gibi yanıltıcı biçimde paylaşma.', 'sm'), 'warn'),
        'Kitap s. 92-93. Kitaptaki "internetten öğrenilmiş milyonlarca görsel" ifadesi telif tartışmasına açıktır: modellerin hangi verilerle eğitildiği ve bunun hukuki durumu bugün dava ve düzenleme konusudur. Bunu öğrencilerle kısaca paylaşın: bir model sizin çizdiğiniz resimlerle izinsiz eğitilse nasıl hissederdiniz? Difüzyon animasyonunu hatırlatın (bölüm 2).',
        foot='Kitap s. 92–93 · Telif ve etik uyarısı her görsel çalışmada geçerlidir.'))

    # --- görsel builder
    sel = lambda id, opts: '<select id="%s" class="sel" style="width:100%%;font-size:25px">%s</select>' % (id, ''.join('<option>%s</option>' % x for x in opts))
    fl = lambda lab, ctrl: '<div class="col" style="gap:4px"><span class="lbl" style="font-size:22px">%s</span>%s</div>' % (lab, ctrl)
    gb = row(
        col(grid(2, fl('Konu', sel('gb-k', ['ağaç ev', 'robot', 'kedi'])), fl('Stil', sel('gb-s', ['gerçekçi fotoğraf', 'çizgi film', 'karakalem', 'yağlı boya'])),
                    fl('Zaman', sel('gb-z', ['gündüz', 'gün batımı', 'gece'])), fl('Duygu', sel('gb-d', ['huzurlu', 'dramatik', 'neşeli'])),
                    fl('Kamera', sel('gb-c', ['geniş açı', 'yakın çekim'])), fl('Ne olmasın?', sel('gb-n', ['yazı olmasın', 'bulanıklık olmasın', 'kalabalık olmasın']))),
            card('Birleşen prompt', '<p id="gb-p" class="mid" style="line-height:1.4;min-height:3.5em;font-weight:600"></p><button class="ans-btn sm" type="button" data-copy="gb-p">Kopyala</button>', 'ok'),
            p('Kitap s. 94 püf noktaları: açık ve detaylı yaz, stil, ortam, duygu, kamera açısı ekle. Kitap s. 96: kısıt olarak ne istemediğini de söyle.', 'sm mute'), cls='f1', gap=14),
        col('<div style="border-radius:14px;overflow:hidden;border:1px solid #E2DED3;background:#FFF"><svg id="gb-svg" viewBox="0 0 640 400" style="width:100%;display:block"></svg></div>',
            p('Önizleme bir simülasyondur: seçimlerin görseli nasıl yönlendirdiğini gösterir, gerçek yapay zekâ çıktısı değildir.', 'sm mute'), style='width:760px;gap:10px'), gap=28)
    o.append(sec('gorsel-builder', 'Canlı uygulama · Görsel prompt atölyesi', 'Seçimleri değiştir: görsel prompt ve önizleme birlikte değişir', gb,
        'Konu, stil, zaman, duygu, kamera ve negatif kısıt seçimleriyle bir prompt oluşur. Soldaki prompt kopyalanıp gerçek bir görsel üretim aracında denenebilir. Önizleme basit çizimdir; stil seçimi filtre olarak yansıtılır. Öğrenciler her seferinde tek bir seçimi değiştirip sonucu gözlesin (bilimsel yöntem: bir kerede bir değişken). Kitap s. 94-96 (püf noktaları ve etkinlik) ile birlikte kullanın.',
        foot='Dene: Aynı konuda yalnızca zamanı değiştir. Sonra yalnızca stili değiştir. Hangisi görüntüyü daha çok etkiledi?'))

    # --- görsel etkinlik
    o.append(sec('gorsel-etk', 'Etkinlik · Kitap s. 96–97 · 20 dakika', 'Bir görsel prompt’u yaz, sonra geliştir',
        row(col(card('Görev (birini seç)', ul('Bir konser afişi', 'Bir oyun kapak görseli', 'Bir okul etkinliği görseli', 'Bir bilim kurgu sahnesi'), 'info'),
                timer(1200, '20 dakika'),
                qa(p('Örnek: “Yağmurlu bir günde, şemsiyesiyle yürüyen bir öğrenci, sinematik ışık, gerçekçi fotoğraf” promptunu nasıl geliştirirsin?', 'sm'), 'Örnek geliştirme: “…yan ışık, ıslak kaldırım yansımaları, akşam saati, huzurlu bir atmosfer, geniş açı; yazı ve logo olmasın.”'), cls='f1', gap=14),
            col(card('Yazmadan önce kontrol et', chk('ge-chk', ['Ortam (nerede?) var', 'Zaman (gece, gündüz) var', 'Stil (gerçekçi, çizgi film) var', 'Duygu (huzurlu, heyecanlı) var', 'Işık, renk veya kamera açısı var', 'Ne istemediğimi (kısıt) yazdım', 'Fikir özgün ve açık']), 'ok'), style='width:820px'), gap=28),
        'Kitap s. 96 etkinliği: öğrenciler dört görevden birini seçip ortam, zaman, stil, duygu ve kısıt içeren bir prompt yazar. Öz değerlendirme formu ve dereceli puanlama anahtarı kitaptaki karekodlarda. Sağdaki kontrol listesi öğrencinin kendi promptunu denetlemesi içindir. Yaş sınırı ve okul kuralı nedeniyle bir araç kullanılamıyorsa, öğretmenin hesabında sınıfça üretim yapılabilir.',
        foot='Kitap s. 96 · Çalışman dereceli puanlama anahtarına göre değerlendirilir.'))

    # --- referanslı üretim + uygulama 2
    o.append(sec('stil', '2. Uygulama · Kitap s. 97–99 · Adım adım animasyon', 'Görselin stil yolculuğu: aynı fotoğraf, dört yorum',
        row(col('<div id="st-list" class="col" style="gap:12px"></div>', stepper_ctl(), cls='f1', gap=16),
            col(card('Komut', '<p id="st-p" class="mid" style="min-height:4.2em;font-weight:600"></p>', 'info'), card('Gözlemlenecek', '<p id="st-g" class="mid" style="min-height:3em"></p>', 'ok'),
                card('Uyarı (kitap s. 99)', p('Ebru gibi kültürel öğeleri kullanırken sanatın özgün yapısına ve değerine saygı göster; yüzeysel veya hatalı temsil etme.', 'sm'), 'warn'), style='width:900px;gap:14px'), gap=28),
        'Kitap s. 97-99. Süre: kitapta 30 dakika. Her adımda aynı fotoğrafın farklı komutla nasıl değiştiğini gözlemleyin. Güvenlik: yalnızca telif ve kişisel veri açısından uygun bir manzara veya bina fotoğrafı yükleyin; insan yüzü içeren fotoğraflardan kaçının. Kitap, hesap açılmasını ve görsel yüklenmesini varsayıyor; yaş sınırı ve okul kuralını kontrol edin.',
        foot='Kitap s. 98–99 · Yalnızca kullanım izni olan, kişi içermeyen fotoğrafları yükle.'))

    # --- deepfake
    dp = cls_activity([
        ('Elde altı parmak var, kolye zinciri bir anda kayboluyor', 1, 'Bozuk anatomi ve süreksizlik: yapay üretimde sık görülür.'),
        ('Tabeladaki yazı anlamsız harflerden oluşuyor', 1, 'Yazı hataları görsel modellerde yaygındır (iyileşiyor ama sürüyor).'),
        ('Görsel çok net ve çok güzel', 2, 'Kalite tek başına kanıt değildir; gerçek fotoğraflar da net olabilir.'),
        ('Işık sağdan geliyor ama gölgeler farklı yönlere düşüyor', 1, 'Işık ve gölge tutarsızlığı bir şüphe işaretidir.'),
        ('Görsel sosyal medyada çok paylaşıldı', 2, 'Çok paylaşılmak doğruluk kanıtı değildir.'),
    ], ['Şüphe işareti', 'Tek başına kanıt değil'], compact=True)
    o.append(sec('deepfake', 'Kitap s. 96–97 + güncel · Deepfake ve içerik doğrulama', 'Bu görsel yapay mı? Dört işaret, bir kural', dp +
        row(card('Teknik destek', p('<b>İçerik kimlik bilgisi (C2PA)</b> ve <b>filigran</b> (ör. SynthID) yapay zekâ üretimini işaretlemeye çalışır. Her içerikte bulunmaz; yokluğu “gerçek” demek değildir.', 'sm'), 'info'),
            card('Kural', p('Tek işarete güvenme: <b>kaynağı ara, başka güvenilir yayında var mı bak</b>.', 'sm'), 'ok'), gap=24),
        'Kitap s. 96 düşün-tartış-paylaş: "Bir görselin yapay zekâ tarafından üretildiğini nasıl anlarsınız?" İşaretler zamanla değişir: modeller geliştikçe parmak ve yazı hataları azalır, bu yüzden işaret aramak tek başına yetmez. C2PA (içerik kimlik bilgileri) ve SynthID gibi filigran teknikleri yardımcıdır ama her içerikte yoktur. Asıl yöntem kaynak doğrulamadır.',
        foot='İşaret listesi zamanla eskir; kaynak doğrulama kalıcıdır.'))

    # --- ses nasıl çalışır
    sn = ''
    for i, (n, t) in enumerate([('1', 'Metin'), ('2', 'Analiz'), ('3', 'Ses birimleri'), ('4', 'Ses dalgası')]):
        sn += '<div class="node" id="sn-%s" style="flex:1;background:#2F6FDE;color:#FFF;flex-direction:column;gap:2px;height:120px"><span style="font-size:32px">%s</span><span>%s</span></div>' % (n, n, t)
        if i < 3:
            sn += '<span class="arrow">▶</span>'
    o.append(sec('ses-nasil', 'B · Ses oluşturma · Kitap s. 99–100 · Adım adım animasyon', 'Metin nasıl sese dönüşür?',
        row(sn, gap=8) + '<div class="row" style="gap:28px"><div class="col f1" style="gap:14px"><div id="sn-msg" class="stmsg" style="min-height:4.2em"></div>' + stepper_ctl() + '</div>' +
        card('Örnek cümle', '<p id="sn-s" class="big" style="font-weight:600;min-height:2.6em"></p><div class="bar" style="height:24px"><i id="sn-b" style="width:0"></i></div>', 'info').replace('class="card info"', 'class="card info" style="width:760px"') + '</div>',
        'Kitap s. 99-100: sistem metni analiz eder, duraklama ve vurguyu belirler, küçük ses birimlerine ayırır ve doğal bir ses çıktısına dönüştürür. Derin öğrenme tabanlı modeller, binlerce saatlik insan konuşmasından doğal ritmi öğrenir. Bir sonraki slaytta tarayıcının kendi sesli okuma özelliğini deneyeceğiz.',
        foot='Kitap s. 100 · Derin öğrenme tabanlı ses modelleri akıcı ve duygusal ses üretebilir.'))

    # --- ses demo
    o.append(sec('ses-demo', 'Canlı uygulama · Metinden sese (tarayıcı sesi)', 'Hız ve perde ayarıyla seslendir',
        row(col(card('Seslendirilecek metin', '<textarea id="sd-t" class="ta" rows="4" style="font-size:30px">Merhaba! Ben yapay zekâ ile oluşturulmuş bir sesim. Bu sesin bir insana ait olmadığını belirtmek önemlidir.</textarea>'),
                row('<button class="ans-btn" type="button" id="sd-go">Seslendir</button>', '<button class="ans-btn alt sm" type="button" id="sd-st">Durdur</button>', gap=12), p('<span id="sd-msg" class="sm mute"></span>', ''), cls='f1', gap=14),
            col(card('Ses seç', '<select id="sd-v" class="sel" style="width:100%;font-size:25px"></select>'),
                card('Hız: <b id="sd-rv">1.0</b>', '<input id="sd-r" type="range" min="5" max="20" value="10">', 'info'),
                card('Perde: <b id="sd-pv">1.0</b>', '<input id="sd-p" type="range" min="5" max="20" value="10">', 'info'),
                card('Etik', p('Bu ses bilgisayarın hazır sesidir. Gerçek bir kişinin sesini izinsiz taklit etme.', 'sm'), 'warn'), style='width:720px;gap:14px'), gap=28),
        'Bu demo tarayıcının kendi sesli okuma özelliğini kullanır (çevrim dışı da çalışabilir). Tarayıcı ve işletim sistemine göre sesler farklıdır; Türkçe ses yoksa mesaj görünür. Kitap s. 100-102 ses ayarları (hız, ton, vurgu) ile örtüşür. Etkinlik: aynı cümleyi hız ve perde ayarıyla iki kez okutup hangisinin reklam, hangisinin masal anlatımına uygun olduğunu tartışın. Daha gelişmiş sesler için kitaptaki çevrim içi servisler kullanılır; hesap ve yaş sınırı konusuna dikkat edin.',
        foot='Dene: Aynı cümleyi hızı 0,7 ve 1,5 yaparak oku. Hangisi hangi içerik türüne uygun?'))

    # --- ses etik + uygulama 3
    o.append(sec('ses-etik', 'B · Ses etiği · Kitap s. 100–103', 'Ses klonlama: kolaylık mı, tehlike mi?',
        row(col(card('Kitaptaki riskler', ul('Sesin izinsiz taklidi: kimlik ihlali', 'Tanınmış kişilerin sesiyle sahte içerik: dezenformasyon', 'Dolandırıcılık ve güven kaybı'), 'warn'),
                card('Sorumlu kullanım', ul('Açık rıza al.', 'Yapay zekâ üretimi olduğunu belirt.', 'Başkalarının haklarına saygı göster.'), 'ok'), cls='f1', gap=16),
            col(card('3. Uygulama · Seslendirme çalışması · 30 dk', chk('se-chk', ['4-5 cümlelik bir metin yazdım', 'Metnin türünü belirledim (hikâye, reklam, bilgi)', 'Türüne uygun sesi seçtim', 'En az 2 deneme yaptım', 'Sınıfla paylaştım ve yapay zekâ ürünü olduğunu belirttim']), 'info'),
                qa(p('Telefonda annenin sesine benzeyen biri para istiyor. Ne yaparsın?', 'sm'), 'Kapatıp annenizi bilinen numaradan ararsınız. Aile içinde önceden belirlenmiş bir “gizli kelime” bu tür sahte aramalara karşı işe yarar.'), style='width:880px;gap:14px'), gap=28),
        'Kitap s. 100-103: ses klonlama riskleri ve 3. Uygulama (Seslendirme çalışması hazırlama). Gerçek bir olay tipi: sesi taklit edilerek akrabalardan para isteyen dolandırıcılık denemeleri bildirilmektedir. Pratik önlem: arayanı bilinen numaradan geri arayın ve önceden belirlenmiş bir gizli kelime kullanın. Etik uyarı kitapta kutu içinde verilmiştir; başkasının sesi taklit edilmez.',
        foot='Kitap s. 102–103 · Başkasının sesini izinsiz taklit etme.'))

    # --- video nasıl
    vn = ''
    for i, (n, t) in enumerate([('1', 'Komut'), ('2', 'Sahne planı'), ('3', 'Video üretimi'), ('4', 'Kontrol ve düzeltme')]):
        vn += '<div class="node" id="vn-%s" style="flex:1;background:#C2410C;color:#FFF;flex-direction:column;gap:2px;height:120px"><span style="font-size:32px">%s</span><span>%s</span></div>' % (n, n, t)
        if i < 3:
            vn += '<span class="arrow">▶</span>'
    o.append(sec('video-nasil', 'C · Video oluşturma · Kitap s. 103–106 · Adım adım animasyon', 'Komuttan videoya: dört aşama',
        row(vn, gap=8) + row(col('<div id="vn-msg" class="stmsg" style="min-height:4.4em"></div>', stepper_ctl(), cls='f1', gap=14),
                              card('Örnek komut', p('“Gece vakti, yağmur altında yürüyen bir kişinin şehir sokaklarında ilerlediği sinematik bir video oluştur.”', 'mid'), 'info'), gap=28).replace('class="card info"', 'class="card info" style="width:760px"'),
        'Kitap s. 103-106. Aşamalar: komut analizi (ortam, karakter, hareket, zaman), sahne planlama (görüntüler ve geçişler), üretim (hareketlendirme, birleştirme) ve sonucu değerlendirme (kontrol ve komutu düzeltme). Video modellerinin ardında görsel modellerdeki difüzyon fikrinin zaman boyutuna taşınmış hâli vardır. Üretilen videonun her zaman kusursuz olmadığını vurgulayın (gerçek dışı detaylar).',
        foot='Kitap s. 104 · Üretilen videolar kusursuz olmayabilir: mutlaka kontrol et.'))

    # --- video prompt
    o.append(sec('video-prompt', 'C · Video komutu · Kitap s. 104–106', 'İyi video komutu: ortam, zaman, nesne, hareket, kamera, stil',
        row(card('Zayıf', p('“Bir köpek videosu oluştur.”', 'big', 'font-weight:600'), 'warn'), card('Güçlü (kitap s. 104)', p('“Gün batımında sahilde koşan, golden retriever cinsi bir köpeğin yavaş çekim videosunu oluştur.”', 'big', 'font-weight:600'), 'ok'), gap=24) +
        row(qa(p('<b>Sıra sizde (kitap s. 106):</b> “Bir şehir videosu oluştur.” komutunu geliştir.', 'sm'), 'Örnek: “Gündüz vakti, kalabalık bir şehirde insanların yürüdüğü, hareketli ve gerçekçi bir video oluştur. Kamera hafif yukarıdan çekim yapsın; yazı ve logo olmasın.”'),
            card('Yayınlamadan önce 4 soru (kitap s. 104)', ul('Video gerçek bir olay gibi sunuluyor mu?', 'Kişi veya kurum izni gerekiyor mu?', 'Yanıltıcı bilgi içeriyor mu?', 'Yapay zekâ üretimi olduğu belirtilmeli mi?'), 'warn'), gap=24),
        'Kitap s. 104-106. Video komut formülü: ortam + zaman + nesne/karakter + hareket + kamera + stil. Kitapta "Bir şehir videosu oluştur" geliştirme etkinliği ve dört etik soru var. Etik sorulara hep "evet" cevabı verilebiliyorsa içerik yapay zekâ üretimi olarak etiketlenmelidir.',
        foot='Kitap s. 104–106 · Kısıt ekle: yazı veya logo olmasın.'))

    # --- uygulama 4
    o.append(sec('hikaye', '4. Uygulama · Kitap s. 107–108 · Adım adım animasyon', 'Dijital hikâye atölyesi: sekiz adım',
        row(col('<div id="hk-list" class="col" style="gap:8px"></div>', stepper_ctl(), cls='f1', gap=12),
            col(card('Bu adımda', '<p id="hk-d" class="mid" style="min-height:4em"></p>', 'info'), card('Senaryo', p('Teknoloji kulübü “Geleceğin Dünyası” konulu kısa dijital hikâyeler gösterimi hazırlıyor. 1-2 dakikalık, karakter + problem + çözüm içeren bir video hazırla.', 'sm'), 'ok'),
                card('Önerilen süre', p('Kitapta 20 dakika yazıyor; sekiz adım için gerçekçi süre <b>80 dakika (2 ders saati)</b>.', 'sm'), 'warn'), style='width:760px;gap:14px'), gap=28),
        'Kitap s. 107-108. Kitap düzeltmesi: sekiz adımlı bir üretim (metin, sahne, görsel, ses, birleştirme, etik kontrol) 20 dakikada bitmez; 2 ders saati önerilir. Takım çalışması önerilir: yazar, görsel yönetmen, seslendirme, kurgu. Teslim: video + prompt listesi + etik kontrol formu.',
        foot='Kitap s. 107 · Hikâye en çok 6–8 cümle, 3–4 sahne.'))

    # --- etik kontrol + rubrik
    o.append(sec('hikaye-etik', '4. Uygulama · Adım 8 · Kitap s. 108', 'Yayınlamadan önce etik kontrol',
        row(card('Kontrol listesi (kitap s. 108)', chk('he-chk', ['Görsellerde gerçek kişilerin izinsiz görüntüsü yok', 'Seslendirmede gerçek bir kişinin sesi izinsiz taklit edilmedi', 'Hikâyede yanlış, yanıltıcı veya zararlı bilgi yok', 'Müzik, görsel ve diğer içerikler telif açısından uygun', 'Yapay zekâ ile üretildiğini videoda belirttim']), 'ok'),
            card('Teslim paketi', ul('Videonun kendisi', 'Her sahne için kullandığın promptlar', 'Hangi araçları kullandığın', 'Doğrulama notları ve etik kontrol formu'), 'info'), gap=28),
        'Kitap s. 108 dört maddelik etik kontrol listesini verir; beşinci madde (yapay zekâ ile üretildiğinin belirtilmesi) kitaba eklidir. Bu liste aynı zamanda değerlendirme ölçütüdür. Öğrenciler her maddeyi işaretlemeden teslim etmemelidir.',
        foot='Kitap s. 108 · Beşinci madde kitaba eklenmiştir.'))

    # --- doğrulama SIFT
    o.append(sec('dogrulama', 'Kitap s. 73–74, 104 + güncel · Doğrulama', 'SIFT: dört hamlede içeriği doğrula',
        grid(4, card('S · Dur', p('Paylaşmadan önce dur. Duygusal tepki yaratan içerik en çok dikkat ister.', 'sm')), card('I · Kaynağı araştır', p('Bunu kim yayımlamış? Güvenilir mi, bilinen biri mi?', 'sm')),
             card('F · Daha iyi kaynak bul', p('Aynı iddiayı güvenilir başka kaynaklar da yazıyor mu?', 'sm')), card('T · İddiayı kökene izle', p('İlk nerede yayımlandı? Bağlamından koparılmış mı?', 'sm'))) +
        grid(2, qa(p('<b>Durum 1:</b> Ünlü bir sanatçının sesiyle “bu hesaba bağış yapın” diyen bir ses kaydı yayılıyor.', 'sm'), 'Dur, sanatçının resmî hesabına ve haber sitelerine bak; yoksa muhtemelen ses klonlama. Paylaşma, bildir.'),
             qa(p('<b>Durum 2:</b> Yapay zekâ cevabında bir bilimsel makale kaynak gösterilmiş.', 'sm'), 'Makale adını, yazarı, dergiyi ve DOI’yi ara. Bulunamazsa uydurma kaynaktır (halüsinasyon).')),
        'SIFT yöntemi, dijital okuryazarlık alanında Mike Caulfield tarafından geliştirilen dört hamlelik bir doğrulama yöntemidir. Kitap s. 73-74 doğrulama uygulamasıyla, s. 104 video etik sorularıyla birleşir. İki durumu sınıfla tartışın.',
        foot='Önce dur, sonra ara: duygusal içerikte doğrulama daha da önemli.'))

    # --- test
    tq = grid(2,
        qa(p('<b>1.</b> Yapay zekâyla görsel üretimi nasıl gerçekleşir? <span class="mute">A) Hazır görseller birleştirilir · B) Metin komutu, öğrenilmiş örüntülere göre görsele dönüştürülür</span>', 'sm'), '<b>B.</b> Metin komutu, öğrenilmiş veri örüntülerine göre görsele çevrilir.'),
        qa(p('<b>2.</b> Ses klonlamanın en büyük riski? <span class="mute">A) Yavaş çalışma · B) İzinsiz taklit ve dolandırıcılık</span>', 'sm'), '<b>B.</b> İzinsiz taklit, kimlik ihlali, dolandırıcılık.'),
        qa(p('<b>3.</b> Video komutunda hangisi eksik olmamalı? <span class="mute">A) Ortam, zaman, hareket · B) Şifre</span>', 'sm'), '<b>A.</b> Ortam, zaman, nesne, hareket (ve kamera, stil).'),
        qa(p('<b>4.</b> Yayınlamadan önce hangisi sorulmaz? <span class="mute">A) İzin gerekiyor mu? · B) En pahalı araç hangisi?</span>', 'sm'), '<b>B.</b> Fiyat, etik kontrolün parçası değildir.'),
        qa(p('<b>5.</b> “Çok net görsel” için ne söylenir? <span class="mute">A) Kesin gerçektir · B) Tek başına kanıt değildir</span>', 'sm'), '<b>B.</b> Kalite doğruluk kanıtı değildir.'),
        qa(p('<b>6.</b> SIFT’in ilk hamlesi nedir? <span class="mute">A) Dur · B) Paylaş</span>', 'sm'), '<b>A.</b> Dur: paylaşmadan önce düşün.'), style='gap:16px')
    o.append(sec('b4-test', 'Bölüm 4 · Mini test', 'Altı soruda bölümü değerlendir', ansall() + tq,
        'Bölüm 4 mini testi. Tüm cevapları tek düğmeyle açabilirsiniz. Düşük başarı durumunda deepfake etkinliği ve SIFT slaytlarına dönün.', foot=None))
    return ''.join(o)
