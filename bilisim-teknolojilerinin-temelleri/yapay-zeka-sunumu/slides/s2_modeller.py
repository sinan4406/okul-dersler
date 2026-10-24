# -*- coding: utf-8 -*-
from lib import *


def slides():
    o = []
    o.append(divider('b2', 'Bölüm 2 · Kitap dışı · Güncel', 'Modeller ve<br>Çeşitleri',
                     'Sohbet asistanının, görsel üreticinin ve çeviri uygulamasının içinde ne var? Hangi modeli ne için kullanırız?',
                     'İkinci bölüm kitapta yoktur. Yapay zekâ çeşitlerini ve modelleri örneklerle öğretmek için eklendi. Önce model nedir, token nedir, dil modeli nasıl bir sonraki kelimeyi tahmin eder görürüz. Sonra model ailelerini (kapalı ve açık), çok kipli ve akıl yürüten modelleri, ajanları ve RAG yöntemini, görsel, ses, video ve kod modellerini tanırız. Model seçme sihirbazı ve karşılaştırma etkinliği bölümü kapatır. Önerilen süre: 3-4 ders saati.',
                     '<div style="display:flex;gap:24px;flex-wrap:wrap"><span class="pill" style="font-size:26px">token</span><span class="pill" style="font-size:26px">dil modeli</span><span class="pill" style="font-size:26px">dikkat (attention)</span><span class="pill" style="font-size:26px">açık / kapalı model</span><span class="pill" style="font-size:26px">çok kipli</span><span class="pill" style="font-size:26px">RAG</span><span class="pill" style="font-size:26px">difüzyon</span></div>'))

    # --- model nedir
    o.append(sec('model-nedir', 'Model nedir?', 'Model: eğitimle ayarlanmış büyük bir sayı tablosu',
        grid(3,
             card('Parametre (ağırlık)', p('Modelin içindeki ayar sayıları. Eğitimde milyarlarca kez ince ayarlanır. Kütüphane değil, öğrenilmiş alışkanlıklar bütünüdür.', 'mid')),
             card('Eğitim', p('Dev veriyle yapılan, hatayı azaltan uzun ve pahalı süreç. Saatler değil haftalar, binlerce özel işlemci (GPU).', 'mid'), 'warn'),
             card('Çıkarım (inference)', p('Eğitilmiş modeli kullanmak: sen yazarsın, model hızlıca cevap hesaplar. Kullanırken model <b>öğrenmez</b>.', 'mid'), 'ok')) +
        row(card('Benzetme', p('Bir müzisyen yıllarca çalışarak (eğitim) parmaklarında ve kulağında alışkanlık biriktirir (parametreler). Konserde (çıkarım) yeni şarkıyı o alışkanlıkla çalar; sahnede yeniden öğrenmez.', 'mid'), 'info'),
            card('Ölçek hakkında', p('Küçük modeller telefonda çalışabilir (milyonlar–birkaç milyar parametre). En büyük dil modelleri yüzlerce milyar parametre veya daha fazlasıdır; şirketler çoğunlukla sayıyı açıklamaz.', 'mid')), gap=24),
        'Model kavramını netleştirin: model, eğitimden çıkan dosyadır; yapay zekâ ürünü (uygulama) bu dosyayı kullanan yazılımdır. Çıkarım sırasında model ağırlıkları değişmez: bu yüzden sohbette "Hayır bu şeftaliydi" demek modeli kalıcı değiştirmez. Kitap s. 69 5. adımda bu nokta kısaltılmıştır. Soru: "Aynı soruyu iki kez sorsan neden bazen farklı cevap alırsın?" (temperature; birazdan göreceğiz).',
        foot='Eğitim bir kez (veya periyodik) yapılır; çıkarım her soruda yapılır.'))

    # --- token
    o.append(sec('token', 'Canlı uygulama · Dil modelleri metni nasıl görür?', 'Token: modelin okuduğu parçalar',
        row(col(card('Bir cümle yaz', '<textarea id="tk-t" class="ta" rows="3" style="font-size:30px">Yapay zekâ ders çalışmama yardım ediyor</textarea>'),
                card('Modelin gördüğü parçalar (yaklaşık)', '<div id="tk-out" style="display:flex;flex-wrap:wrap;gap:8px;font-family:var(--mono);font-size:28px"></div>'),
                cls='f1'),
            col(card('Sayılar', col(p('Kelime: <b id="tk-w" style="font-size:44px">0</b>', 'mid'), p('Token (tahmini): <b id="tk-n" style="font-size:44px">0</b>', 'mid'), style='gap:6px'), 'info'),
                card('Neden önemli?', ul('Fiyat ve sınır token sayısıyla ölçülür.', 'Türkçe gibi ekli dillerde kelime çok parçaya bölünebilir.', 'Model harfleri değil token’ları görür: bu yüzden bazen harf saymada yanılır.'), 'warn'), style='width:700px;gap:18px'), gap=28),
        'Gerçek tokenizer algoritmaları (BPE gibi) bu basit bölmeden farklıdır; bu demo yaklaşık bir gösterimdir. Önemli fikir: dil modelleri kelimeleri değil, sık görülen harf parçalarını (token) işler. Türkçe gibi eklemeli dillerde bir kelime birkaç token olabilir; bu yüzden aynı anlam için Türkçe metin İngilizceye göre çoğu zaman daha fazla token tüketir. Deneyin: "Çekoslovakyalılaştıramadıklarımızdanmışsınız" yazın. Soru: "Bir yapay zekâ neden bazen kelimedeki harfleri yanlış sayar?" (Harfleri değil token’ları görür.)',
        foot='Gösterim yaklaşıktır: gerçek tokenizer algoritmaları farklı bölebilir.'))

    # --- sıcaklık
    o.append(sec('sicaklik', 'Canlı uygulama · Dil modeli nasıl yazar?', 'Sonraki kelime: olasılık ve “sıcaklık” (temperature)',
        row(col(card('Cümle', '<p id="tm-s" style="font-size:40px;font-weight:600;color:#14202E;min-height:2.6em">…</p>'),
                '<div id="tm-bars" class="col" style="gap:10px"></div>', cls='f1'),
            col(card('Bağlam seç', '<div class="tabs" id="tm-ctx"></div>'),
                card('Sıcaklık: <b id="tm-tv">1.0</b>', '<input id="tm-t" type="range" min="1" max="30" value="10"><p class="sm mute">Düşük: hep en olası kelime (tutarlı) · Yüksek: sürpriz kelimeler (yaratıcı ama riskli)</p>', 'info'),
                row('<button class="ans-btn" type="button" id="tm-go">Bir kelime seç (örnekle)</button>', '<button class="ans-btn alt sm" type="button" id="tm-rs">Yeniden</button>', gap=12),
                style='width:720px;gap:18px'), gap=28),
        'Dil modeli, bir cümlenin devamı için her olası kelimeye olasılık verir; kullanıcıya gösterilen cevap, bu dağılımdan seçilen kelimelerle adım adım yazılır. Sıcaklık düşükken model neredeyse hep en olası kelimeyi seçer; yüksekken düşük olasılıklı kelimeler de seçilebilir. Deney: sıcaklığı 0,1 yapıp 5 kez "Bir kelime seç"e basın (hep aynı), sonra 2,0 yapıp tekrarlayın (farklı kelimeler). Aynı soruya her seferinde farklı cevap alınmasının nedeni budur. Bu, halüsinasyonun da bir nedenidir: model "bilmiyorum" demek yerine olası görünen bir kelime seçer.',
        foot='Olasılıklar bu demoda örnek amaçlıdır; gerçek modeller on binlerce kelime üzerinde hesap yapar.'))

    # --- attention
    o.append(sec('dikkat', 'Canlı uygulama · Transformer’ın temel fikri', 'Dikkat (attention): kelimeler birbirine bakar',
        col('<div id="at-words" style="display:flex;flex-wrap:wrap;gap:12px"></div>',
            p('Bir kelimeye tıkla: model o kelimeyi anlarken hangi kelimelere ne kadar “dikkat” ediyor?', 'big'),
            row(card('Neden önemli?', p('“O” kelimesinin kimden bahsettiğini anlamak için cümledeki diğer kelimelere bakmak gerekir. Transformer mimarisi (2017) bunu çok iyi yapar.', 'mid'), 'info'),
                card('Not', p('Gösterilen ağırlıklar öğretim amaçlı örnektir; gerçek modelde yüzlerce “dikkat başlığı” katman katman çalışır.', 'mid'), 'warn'), gap=24)),
        'Cümle: "Ali, kitabı Ayşe’ye verdi çünkü o istedi." "o" kelimesine tıklayınca dikkat çoğunlukla "Ayşe’ye" kelimesine gider. "kitabı" kelimesine tıklayınca "verdi" ve "istedi" öne çıkar. Bu, modelin sadece yan yana kelimelere değil, uzaktaki ilişkilere de bakabildiğini gösterir. Transformer mimarisi 2017 tarihli "Attention Is All You Need" makalesinde tanıtıldı ve bugünkü büyük dil modellerinin temelidir. Sayılar öğretici örnektir.',
        foot='Transformer (2017): modern dil, görsel ve ses modellerinin ortak temeli.'))

    # --- yaşam döngüsü
    nodes = ''
    dl = [('1', 'Veri'), ('2', 'Ön eğitim'), ('3', 'İnce ayar'), ('4', 'İnsan geri bildirimi'), ('5', 'Kullanım')]
    for i, (n, t) in enumerate(dl):
        nodes += '<div class="node" id="lc-%s" style="flex:1;background:#2F6FDE;color:#FFF;flex-direction:column;gap:4px;height:120px"><span style="font-size:32px">%s</span><span style="font-size:22px">%s</span></div>' % (n, n, t)
        if i < 4:
            nodes += '<span class="arrow">▶</span>'
    o.append(sec('yasam', 'Adım adım animasyon · Bir sohbet modeli nasıl yapılır?', 'Büyük dil modelinin hayat döngüsü',
        row(nodes, gap=8) + '<div id="lc-msg" class="stmsg" style="min-height:3.6em"></div>' + stepper_ctl() +
        card('Kitaba ek', p('Kitap s. 69: “Kullanıcı ‘Hayır’ derse yapay zekâ bilgilerini yeniden düzenler.” Doğrusu: kullanım sırasında model değişmez. Konuşma içinde düzeltmeyi hesaba katar, kalıcı güncelleme ancak yeni eğitim veya ince ayar sürecinde olur.', 'sm'), 'warn'),
        'Beş aşamayı İleri düğmesiyle gösterin. Basit özet: (1) veri toplanır ve temizlenir, (2) ön eğitimde model sonraki kelimeyi tahmin etmeyi öğrenir (kendi kendine denetimli), (3) ince ayarda model talimat izlemeyi öğrenir, (4) insan geri bildirimi ve güvenlik eğitimiyle daha yardımcı ve zararsız hâle getirilir, (5) kullanıcıya sunulur; çoğu zaman arama ve araç bağlantılarıyla. Şirketlerin tam yöntemleri farklıdır; bu genel resimdir.',
        foot='Ön eğitim pahalı ve nadir, kullanım ucuz ve sürekli.'))

    # --- model aileleri
    ma = table(['Model ailesi', 'Geliştirici', 'Erişim biçimi', 'Dikkat çeken'], [
        ['Claude', 'Anthropic', 'Kapalı: uygulama ve API', 'Uzun belge ve kod çalışması, güvenlik odağı'],
        ['GPT (ChatGPT uygulaması)', 'OpenAI', 'Kapalı: uygulama ve API', 'Geniş kullanıcı kitlesi, çok kipli özellikler'],
        ['Gemini', 'Google', 'Kapalı: uygulama ve API', 'Google ürünleri ve arama ile entegrasyon, çok kipli'],
        ['Llama', 'Meta', 'Açık ağırlıklı', 'Kendi sunucunda çalıştırılabilir, özelleştirilebilir'],
        ['Mistral', 'Mistral AI (Fransa)', 'Açık ağırlıklı ve ticari modeller', 'Avrupa kökenli, verimli modeller'],
        ['Qwen', 'Alibaba', 'Büyük kısmı açık ağırlıklı', 'Çok dilli, farklı boyutlarda seçenekler'],
        ['DeepSeek', 'DeepSeek (Çin)', 'Açık ağırlıklı modeller', 'Düşük maliyetli çalışma ile dikkat çekti'],
        ['Gemma', 'Google', 'Açık ağırlıklı, küçük modeller', 'Dizüstünde ve cihazda çalışabilir boyutlar'],
    ], widths=['22%', '20%', '26%', '32%'], size=25)
    o.append(sec('aileler', 'Model ailesi tablosu · Ekim 2026', 'Başlıca dil modeli aileleri', ma +
        p('Ürün adı ile model adı aynı değildir: <b>ChatGPT</b> bir uygulamadır, arkasındaki modeller <b>GPT</b> ailesidir. Sürüm numaraları aylar içinde değişir; ailenin türünü bilmek, numarayı ezberlemekten önemlidir.', 'mid'),
        'Bu tablo bir sıralama değildir ve eksiksiz değildir; bir fikir vermek için başlıca aileleri gösterir. Sürüm numaralarını bilerek yazmadık: yeni sürümler çok sık çıkar. Güncel durum için her şirketin kendi duyuru sayfasına bakılmalıdır. "Açık ağırlıklı" ifadesi, model dosyalarının (ağırlıkların) indirilebildiği anlamına gelir; lisans koşulları aileye göre farklıdır. Eksik olan başka aileler de vardır; öğrenciler araştırıp ekleyebilir (ödev önerisi).',
        foot='Bilgiler Ekim 2026 itibarıyladır. Güncel sürüm ve lisans için şirketlerin resmî sayfalarına bak.'))

    ue = cls_activity([
        ('ChatGPT', 1, 'Uygulama (ürün). Arkasındaki modeller GPT ailesidir.'),
        ('GPT', 2, 'Model ailesi. Uygulamalarda ve API’de kullanılır.'),
        ('OpenAI', 3, 'Şirket.'),
        ('Llama', 2, 'Model ailesi (Meta’nın açık ağırlıklı modelleri).'),
        ('Meta', 3, 'Şirket.'),
        ('Microsoft Copilot', 1, 'Uygulama (ürün). Arkasında farklı modeller kullanılabilir.'),
    ], ['Uygulama (ürün)', 'Model ailesi', 'Şirket'])
    o.append(sec('urun-model', 'Etkinlik · Ürün mü, model mi, şirket mi?', 'Adı doğru kutuya yerleştir', ue,
        'Üç kavramı ayırmak için kısa etkinlik. Öğrencilere sorun: "Gemini ve Claude hem uygulama hem model ailesi adıdır; bu durumda ne yapabiliriz?" (Bağlamdan anlarız: "Gemini uygulamasında" ya da "Gemini modeli".)',
        foot='Şirket → model ailesi → uygulama (ürün)'))

    # --- açık/kapalı
    ak = table(['Ölçüt', 'Kapalı model (uygulama / API)', 'Açık ağırlıklı model'], [
        ['Erişim', 'Şirketin sunucusunda; internet gerekir', 'Dosya indirilebilir; kendi bilgisayarında veya sunucunda çalıştırılabilir'],
        ['Gizlilik', 'Veri şirkete gider (ayar ve sözleşmeye bağlı)', 'Veri kendi ortamında kalabilir'],
        ['Maliyet', 'Kullanıma göre ücret veya abonelik', 'Donanım ve işletme maliyeti sende'],
        ['Güç / kalite', 'Genellikle en gelişmiş modeller burada', 'Hızla yetişiyor; küçük boyutta çok verimli seçenekler var'],
        ['Özelleştirme', 'Sınırlı (ince ayar seçenekleri değişir)', 'Geniş: ince ayar, kendi veriyle uyarlama'],
        ['Güncelleme', 'Şirket yönetir', 'Sen yönetirsin'],
    ], widths=['16%', '40%', '44%'], size=25)
    o.append(sec('acik-kapali', 'Karşılaştırma · Kitap dışı', 'Kapalı model mi, açık ağırlıklı model mi?', ak +
        row(card('Dikkat: “açık kaynak” ile “açık ağırlıklı” aynı şey değildir', p('Açık ağırlıklı modelde dosyalar indirilebilir; ama eğitim verisi ve kodun tamamı paylaşılmayabilir, lisans kullanımı sınırlayabilir.', 'sm'), 'warn'),
            card('Bulut mu, cihaz mı?', p('Bazı küçük modeller doğrudan telefonda veya bilgisayarda çalışır; veri cihazdan çıkmaz, internet gerekmez, ama güç sınırlıdır.', 'sm'), 'info'), gap=24),
        'Okullar ve şirketler için gizlilik kritik bir ölçüttür: hassas veri kapalı bir servise gönderilmeden önce kurum kuralları kontrol edilmelidir. Cihazda çalışan modeller (telefonlardaki yerel asistanlar gibi) bu konuda avantaj sağlar. "Açık kaynak" ifadesi bağımsız bir tanıma bağlıdır (kaynak kodu, veri ve lisans koşulları); birçok "açık" model yalnızca ağırlıklarını paylaşır.',
        foot='Doğru seçim, iş ve gizlilik ihtiyacına bağlıdır. “En iyi model” diye tek cevap yoktur.'))

    # --- yetenekler
    yt = tabs([
        ('ck', 'Çok kipli', grid(3, card('Ne demek?', p('Aynı model metin, görsel, ses (bazen video) alıp üretebilir.')), card('Örnek', p('Fotoğraf yükleyip “bu bitkinin sorunu ne?” demek; grafiği okutup özetlettirmek.')), card('Dikkat', p('Görseldeki yazıyı veya detayı yanlış okuyabilir; önemli kararda doğrula.'), 'warn'))),
        ('ar', 'Akıl yürüten', grid(3, card('Ne demek?', p('Cevap vermeden önce uzun bir ara düşünme (adım adım çözüm) üretir.')), card('Örnek', p('Zor matematik, kodlama ve mantık sorularında ek “düşünme süresi” kullanan modeller.')), card('Dikkat', p('Daha yavaş ve pahalı olabilir; yine de yanlış çıkabilir.'), 'warn'))),
        ('aj', 'Ajan', grid(3, card('Ne demek?', p('Hedefi verilir; arama yapar, dosya açar, program çalıştırır, adım adım ilerler.')), card('Örnek', p('“Bu haftanın toplantı notlarını özetle, e-postayla gönder, takvime ekle.”')), card('Dikkat', p('İzinsiz eylem riski: önemli adımda insan onayı gerekir.'), 'warn'))),
        ('rag', 'RAG (arama destekli)', grid(3, card('Ne demek?', p('Model önce belge veya veri tabanında arar, bulduğu parçalara dayanarak cevap yazar.')), card('Örnek', p('Okulun yönetmeliklerini okuyup öğrencinin sorusunu kaynakla cevaplayan bot.')), card('Dikkat', p('Aranan belge kötü veya eskiyse cevap da kötü olur.'), 'warn'))),
    ])
    o.append(sec('yetenekler', 'Güncel · Dil modellerinin yeni yetenekleri', 'Sadece sohbet değil: dört yeni yetenek', yt,
        'Son yıllarda dil modelleri dört yönde gelişti. Çok kipli: tek modelin birden çok veri türünü işlemesi. Akıl yürüten modeller: yanıttan önce uzun ara düşünme. Ajanlar: araç kullanarak çok adımlı iş yapar (e-posta, takvim, dosya, arama). RAG: modelin kendi belleği yerine belgeleri arayıp cevap vermesi. Bunlar 2.3 bölümündeki otomasyon konusunun da temelidir. Bir sonraki slayttaki RAG animasyonu halüsinasyon azaltma yöntemini gösterir.',
        foot='Bu yetenekler bölüm 5’te (otomasyon) yeniden karşımıza çıkacak.'))

    # --- RAG
    rn = ''
    for i, (n, t) in enumerate([('1', 'Soru'), ('2', 'Belgelerde ara'), ('3', 'Parçaları ekle'), ('4', 'Cevabı yaz'), ('5', 'Kaynağı göster')]):
        rn += '<div class="node" id="rg-%s" style="flex:1;background:#C2410C;color:#FFF;flex-direction:column;gap:2px;height:110px"><span style="font-size:30px">%s</span><span style="font-size:21px">%s</span></div>' % (n, n, t)
        if i < 4:
            rn += '<span class="arrow">▶</span>'
    o.append(sec('rag', 'Adım adım animasyon · RAG', 'Cevabı uydurmak yerine önce belgede ara',
        row(rn, gap=8) + row(card('Örnek belge (uydurma okul kuralı)', '<p id="rg-doc" class="sm mono" style="line-height:1.5">…</p>', 'info'), card('Modelin cevabı', '<p id="rg-ans" class="mid" style="min-height:4em">…</p>', 'ok'), gap=24) +
        '<div id="rg-msg" class="stmsg"></div>' + stepper_ctl(),
        'Örnek belge uydurmadır; amaç mantığı göstermektir. 1) Öğrenci soru sorar. 2) Sistem, kuralların tutulduğu belgelerde en ilgili parçayı bulur (arama). 3) Bulunan parça soruyla birlikte modele verilir. 4) Model cevabı bu parçaya dayanarak yazar. 5) Cevap kaynak belgeyi gösterir; kullanıcı doğrulayabilir. Böylece model "ezberinden" uydurmaz. Ama arama yanlış parçayı bulursa cevap yine yanlış olabilir: bu yüzden kaynak göstermek önemlidir.',
        foot='RAG = arama + üretim. Halüsinasyonu azaltır, tamamen ortadan kaldırmaz.'))

    # --- görsel modeller + difüzyon
    o.append(sec('difuzyon', 'Canlı uygulama · Görsel modelleri nasıl çalışır?', 'Difüzyon: gürültüden görüntüye',
        row(col('<canvas id="df-c" width="640" height="400" style="width:100%;border-radius:14px;background:#0E1621"></canvas>',
                row(p('Gürültü: <b id="df-v">100%</b>', 'lbl'), '<input id="df-s" type="range" min="0" max="100" value="100" style="flex:1">', gap=16, cls=''),
                row('<button class="ans-btn" type="button" id="df-go">Görsel üret (animasyon)</button>', '<button class="ans-btn alt sm" type="button" id="df-rs">Sıfırla</button>', gap=12), cls='f1', gap=14),
            col(card('Fikir', p('Model, görüntüye adım adım gürültü eklenmesini tersine çevirmeyi öğrenir. Metin açıklaması (prompt) bu temizlemeyi yönlendirir.', 'mid'), 'info'),
                card('Üç aile', ul('<b>GAN</b>: iki ağ yarışır: biri üretir, biri gerçek mi sahte mi diye kontrol eder (eski, hızlı).', '<b>VAE</b>: görüntüyü sıkıştırıp yeniden açar.', '<b>Difüzyon</b>: gürültüyü adım adım temizler (bugünün baskın yöntemi).'), 'sm'),
                style='width:760px;gap:18px'), gap=28),
        'Kaydırıcıyı sola çekerek gürültüyü azaltın; "Görsel üret" düğmesi bunu animasyonla yapar. Bu demo yalnızca fikri gösterir: gerçek difüzyon modelleri her adımda bir sinir ağıyla "gürültüyü tahmin edip çıkarır" ve prompt bu süreci yönlendirir. Kitap s. 92-93: "sistem hazır bir fotoğrafı bulmaz, yeni bir görsel oluşturur" cümlesi bu yüzden doğrudur. Görsel modellerde de halüsinasyon vardır (fazladan parmak, bozuk yazı). Ürün örnekleri: Midjourney, DALL·E ailesi, Stable Diffusion ailesi, Adobe Firefly, Imagen (Google).',
        foot='Kitap s. 92–93: Sistem hazır fotoğraf bulmaz, yeni görsel oluşturur.'))

    # --- ses, müzik, video
    sm = tabs([
        ('tts', 'Metinden sese', grid(3, card('Nasıl?', p('Metin → okunuş ve vurgu analizi → ses birimleri → ses dalgası.')), card('Örnek ürünler', p('Telefondaki sesli okuma, ElevenLabs gibi ses servisleri, okul duyuru okuyucuları.')), card('Dikkat', p('Ses klonlama izinsiz kullanılırsa dolandırıcılık ve kişilik hakkı ihlali olur.'), 'warn'))),
        ('stt', 'Sesten yazıya', grid(3, card('Nasıl?', p('Ses → küçük parçalar → olası harf ve kelime dizisi → metin.')), card('Örnek ürünler', p('Whisper tipi modeller, otomatik altyazı, toplantı notu uygulamaları.')), card('Dikkat', p('Aksan, gürültü ve özel isimlerde hata yapar; kayıt izni gerekir.'), 'warn'))),
        ('mus', 'Müzik', grid(3, card('Nasıl?', p('Metin açıklamasından ritim, ezgi ve ses üretir.')), card('Örnek ürünler', p('Suno, ElevenLabs müzik, Udio benzeri servisler.')), card('Dikkat', p('Telif ve lisans: müziğin kullanım hakkı serviste hangi planla alınır?'), 'warn'))),
        ('vid', 'Video', grid(3, card('Nasıl?', p('Metin veya görselden kareler üretir; hareket ve ışık tutarlılığı için zaman boyutunu da modeller.')), card('Örnek ürünler', p('Veo, Runway, Kling, Sora benzeri araçlar (hizmet ve koşulları sık değişir).')), card('Dikkat', p('Gerçek sanılan sahte video (deepfake) riski; “yapay zekâ üretimi” diye belirt.'), 'warn'))),
        ('kod', 'Kod', grid(3, card('Nasıl?', p('Kod, dil gibi öğrenilir; model sonraki kod parçasını tahmin eder.')), card('Örnek ürünler', p('GitHub Copilot, Claude Code, Cursor gibi geliştirme asistanları.')), card('Dikkat', p('Çalışan kod güvenli kod demek değildir; kodu anlamadan kullanma, test et.'), 'warn'))),
    ])
    o.append(sec('ses-video', 'Kitap 2.2.2 ile bağlantılı · Modeller', 'Ses, müzik, video ve kod modelleri', sm,
        'Kitap s. 99-108 ses ve video üretimini anlatır; burada arkadaki model türlerini görüyoruz. Ürün isimleri örnektir; hizmetler ve sürümler hızla değişir, bu yüzden yalnızca ailelerini tanıtın. Kod modelleri kitapta yoktur ama bilişim alanı öğrencileri için çok önemlidir: yapay zekâ kod yazar ama hata ve güvenlik açığı da üretebilir. Etik mesajı her sekmede tekrar edin.',
        foot='Her sekmenin son kutusu: dikkat edilecek risk.'))

    # --- uzman YZ
    uz = cls_activity([
        ('Go oyununda dünya şampiyonunu 4-1 yendi (2016)', 1, 'AlphaGo (Google DeepMind): pekiştirmeli öğrenme ve derin ağlar.'),
        ('Proteinlerin üç boyutlu şeklini tahmin etti; 2024 Kimya Nobel’inde anıldı', 2, 'AlphaFold: biyolojide çığır açan yapay zekâ.'),
        ('Satranç şampiyonu Kasparov’u yendi (1997)', 3, 'Deep Blue (IBM): kural ve arama ağırlıklı; öğrenme değil, hız.'),
        ('2012’de görüntü tanıma yarışmasında derin öğrenmenin gücünü gösterdi', 4, 'AlexNet: ImageNet yarışması, GPU ile eğitim.'),
    ], ['AlphaGo', 'AlphaFold', 'Deep Blue', 'AlexNet'], compact=True)
    o.append(sec('uzman', 'Dar yapay zekâ başarıları', 'Tek işi çok iyi yapan modeller', uz +
        card('Ortak ders', p('Bu sistemlerin hiçbiri sohbet edemez veya başka bir işi yapamaz. Her biri tek alanda olağanüstüdür: dar yapay zekâ.', 'mid'), 'info'),
        'Tarihçedeki dönüm noktalarını model adlarıyla eşleştiriyoruz. AlphaFold (Google DeepMind), 2024 Kimya Nobel Ödülü’nü Demis Hassabis ve John Jumper ile paylaşan çalışmanın parçasıdır (üçüncü ödül sahibi David Baker). Deep Blue 1997’de Kasparov’u yendi; kitap s. 79’daki cümleyi güçlendirir.',
        foot='Tek alanda üstün = dar yapay zekâ (ANI).'))

    # --- model seçme sihirbazı
    o.append(sec('sihirbaz', 'Canlı uygulama · Model seçme sihirbazı', 'Hangi iş için hangi tür model?',
        row(col(card('Yapmak istediğim iş', '<select id="wz-s" class="sel" style="width:100%;font-size:30px"></select>'),
                p('Bir iş seç, öneriyi ve dikkat edilecek noktayı gör. Sonra sınıfta tartış: sen başka ne seçerdin?', 'mid mute'), cls='f1'),
            col(card('Önerilen model türü', '<p id="wz-t" class="big" style="font-weight:600"></p>', 'ok'),
                card('Örnek ürün veya aileler', '<p id="wz-e" class="mid"></p>', 'info'),
                card('Dikkat', '<p id="wz-d" class="mid"></p>', 'warn'), style='width:960px;gap:16px'), gap=28),
        'Sihirbaz basit bir eşleştirmedir; gerçek hayatta çoğu işte birden fazla seçenek vardır. Öğrencilere her iş için "Hangi gizlilik riski var?" ve "Hangi çıktı kontrol edilmeli?" diye sorun. Ürün adları örnektir.',
        foot='Ürün adları örnektir ve değişebilir; model türünü anlamak asıl hedeftir.'))

    # --- karşılaştırma etkinliği
    kt = table(['Ölçüt (1-5 puan)', 'Araç A', 'Araç B', 'Araç C'], [
        ['Doğruluk (kaynakla kontrol et)', '', '', ''], ['Açıklık ve düzen', '', '', ''], ['Türkçe doğallığı', '', '', ''], ['Hız', '', '', ''], ['Kaynak göstermesi', '', '', ''], ['Toplam', '', '', '']],
        widths=['40%', '20%', '20%', '20%'], size=26)
    o.append(sec('karsilastir', 'Etkinlik · 25 dakika', 'Kendi testimizi yapalım: aynı prompt, farklı araçlar',
        row(col(card('3 test promptu', ul('“Fotosentezi 9. sınıf öğrencisine 5 cümlede anlat.”', '“Okulumuzdaki bilişim kulübü için kısa bir duyuru yaz.”', '“1920’de Ankara’da ne oldu?” (yanıtı kaynakla doğrula)'), 'info'),
                card('Kurallar', ul('Kişisel bilgi yazma.', 'Hesap açarken yaş sınırına ve okul kurallarına uy.', 'Cevapları puanlamadan önce doğrula.'), 'warn'), cls='f1', gap=18),
            col(kt, style='width:820px'), gap=28),
        'Sınıfta erişilebilen en az iki araç kullanılır (okulun izin verdiği, yaş sınırına uygun olanlar). Kitap s. 101 öğrencilerden hesap oluşturmalarını istiyor; birçok araç kullanım koşullarında yaş sınırı ve veli izni ister. Güvenli yöntem: öğretmen hesabı veya okulun onayladığı araçla gösterim yapmak. Puanlama tablosu çalışma kâğıdına çıkartılabilir. Tartışma: Hangi araç hangi iş için daha iyiydi? Puanlar neden farklı?',
        foot='Önce doğrula, sonra puanla.'))

    # --- güncel pano
    gp = table(['Konu', 'Bugünkü durum (Ekim 2026)', 'Ne yapmalı?'], [
        ['Model adları ve sürümleri', 'Aylar içinde yenilenir; blog yazıları birbiriyle çelişebilir', 'Aileyi ve ne işe yaradığını öğren; sürümü resmî sayfadan kontrol et'],
        ['Claude ailesi (örnek)', 'Haiku (hızlı ve küçük), Sonnet (dengeli), Opus (en güçlü); 5. nesil: Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5', 'İsimlendirmeden boyut ve görev ilişkisini oku'],
        ['Karşılaştırma kaynakları', 'LMArena gibi insan oylamasına dayanan sıralamalar ve bağımsız kıyaslamalar var', 'Tek sıralamaya güvenme; kendi işinde dene'],
        ['Genel eğilimler', 'Ajanlar, çok kipli modeller, akıl yürüten modeller, cihazda çalışan küçük modeller', 'Bölüm 5’te ajan ve otomasyonu göreceğiz'],
        ['Düzenleme', 'AB Yapay Zekâ Yasası kademeli uygulanıyor; Türkiye’de 2026-2030 Eylem Planı yayımlandı', 'Bölüm 6’da ayrıntı'],
    ], widths=['22%', '48%', '30%'], size=24)
    o.append(sec('pano', 'Güncel durum panosu · Kaynak: web taraması, 20 Ekim 2026', 'Hızlı değişen bir alan: neye güvenmeli?', gp +
        card('Kaynak notu', p('Sürüm ve sıralama bilgileri çoğunlukla blog ve karşılaştırma sitelerinden gelir; bu kaynaklar birbirini tutmayabilir. Kesin bilgi için şirketlerin resmî duyurularına bak.', 'sm'), 'warn'),
        'Bu slayt, güncelliğin kendisi bir ders olsun diye eklendi: öğrencilerle birlikte iki farklı kaynakta aynı modelin adını arayıp çelişkileri bulun. Claude ailesi bilgisi sistem tarafından doğrulanmış güncel model adlarıdır; diğer şirketler için bilerek sürüm numarası yazılmadı çünkü web taraması kaynaklar arasında tutarsız sonuçlar verdi. Öğretmenin derste kendi tarayıcısında resmî sayfalara bakıp bilgiyi güncellemesi önerilir.',
        foot='Güncel kalma kuralı: iki bağımsız ve güvenilir kaynak.'))

    # --- test
    tq = grid(2,
        qa(p('<b>1.</b> Eğitilmiş bir model sohbet sırasında hangisini yapmaz? <span class="mute">A) Cevap hesaplar · B) Ağırlıklarını kalıcı değiştirir</span>', 'sm'), '<b>B.</b> Kullanım (çıkarım) sırasında ağırlıklar değişmez.'),
        qa(p('<b>2.</b> Dil modelinin temel işi nedir? <span class="mute">A) Sonraki token’ı tahmin etmek · B) İnternetten kopyala-yapıştır</span>', 'sm'), '<b>A.</b> Sonraki token’ın olasılığını hesaplar.'),
        qa(p('<b>3.</b> Sıcaklık (temperature) yükselirse ne olur? <span class="mute">A) Daha tutarlı · B) Daha çeşitli ve riskli</span>', 'sm'), '<b>B.</b> Düşük olasılıklı seçenekler de seçilir.'),
        qa(p('<b>4.</b> “ChatGPT” hangisidir? <span class="mute">A) Şirket · B) Uygulama</span>', 'sm'), '<b>B.</b> Uygulama (ürün); modeller GPT ailesidir.'),
        qa(p('<b>5.</b> Gizli veriyi dışarı göndermek istemeyen kurum hangisini düşünebilir? <span class="mute">A) Açık ağırlıklı model · B) Her veriyi kapalı servise yüklemek</span>', 'sm'), '<b>A.</b> Kendi ortamında çalıştırma, gizliliği artırabilir.'),
        qa(p('<b>6.</b> RAG neyi azaltmaya yardım eder? <span class="mute">A) Halüsinasyonu · B) İnterneti</span>', 'sm'), '<b>A.</b> Belgeyi arayıp kaynağa dayanarak cevap yazar.'),
        qa(p('<b>7.</b> Difüzyon modeli görüntüyü nasıl üretir? <span class="mute">A) Hazır fotoğraf arar · B) Gürültüyü adım adım temizler</span>', 'sm'), '<b>B.</b> Gürültüden başlayıp prompt’a göre temizler.'),
        qa(p('<b>8.</b> Aşağıdakilerden hangisi “dar” yapay zekâdır? <span class="mute">A) AlphaFold · B) Her işi yapan bilinçli robot</span>', 'sm'), '<b>A.</b> Tek alanda uzman sistemdir.'), style='gap:16px')
    o.append(sec('b2-test', 'Bölüm 2 · Mini test', 'Sekiz soruda bölümü değerlendir', ansall() + tq,
        'Sekiz soruluk mini test. "Tüm cevapları göster" düğmesiyle sınıfça kontrol edin. Başarısız sorular için ilgili demo slaytına dönün: 1 → model-nedir, 3 → sicaklik, 6 → rag, 7 → difuzyon.',
        foot=None))
    return ''.join(o)
