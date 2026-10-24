# -*- coding: utf-8 -*-
from lib import *


def slides():
    o = []
    o.append(divider('b3', 'Bölüm 3 · Kitap 2.2.1 · s. 83–91', 'Etkili Prompt<br>Yazımı',
                     'Yapay zekâyla konuşmanın dili: ne istediğini nasıl söylersen o kadar iyi cevap alırsın.',
                     'Üçüncü bölüm kitabın 2.2.1 konusunu işler: amaç, rol, görev, bağlam, kısıt ve örnek verme. Her unsur için önce kötü örnek, sonra iyi örnek, sonra kitabın Sıra sizde etkinliği var. Kitaba ek olarak çıktı biçimi, adım adım düşündürme ve yinelemeli geliştirme gibi güncel teknikleri de ekledik. Önerilen süre: 4 ders saati (yıllık plan 6. hafta).',
                     '<div style="display:flex;gap:24px;flex-wrap:wrap"><span class="pill" style="font-size:26px">amaç</span><span class="pill" style="font-size:26px">rol</span><span class="pill" style="font-size:26px">görev</span><span class="pill" style="font-size:26px">bağlam</span><span class="pill" style="font-size:26px">kısıt</span><span class="pill" style="font-size:26px">örnek</span></div>'))

    # --- prompt nedir
    def un(n, t, d, c='#C2410C'):
        return card('', row('<span class="num" style="background:%s">%s</span>' % (c, n), col('<h3>%s</h3>' % t, p(d, 'sm'), style='gap:4px'), gap=18), '', 'justify-content:center')
    o.append(sec('prompt-nedir', '2.2.1 · Kitap s. 83', 'Prompt: yapay zekâya söylediğin her şey',
        card('', p('Prompt; bir yapay zekâ modeline ne yapması gerektiğini söyleyen her türlü talimat, soru veya metin parçasıdır. Ne kadar <b>spesifik, net ve bağlam odaklı</b> olursa cevap o kadar isabetli olur.', 'big'), 'info') +
        grid(3, un(1, 'Amaç', 'Ne sonuç istiyorum?'), un(2, 'Rol', 'Hangi bakış açısıyla cevap versin?'), un(3, 'Görev', 'Tam olarak ne yapsın?'),
             un(4, 'Bağlam', 'Kim için, nerede, neden?'), un(5, 'Kısıt', 'Hangi sınırlar içinde?'), un(6, 'Örnek', 'Nasıl bir çıktı istiyorum?')) +
        card('Kitaba ek (7. unsur)', p('<b>Çıktı biçimi:</b> liste, tablo, e-posta, madde sayısı, başlıklı metin… Biçimi söylemezsen model kendi seçer.', 'sm'), 'warn'),
        'Kitap s. 83: prompt tanımı ve altı unsur (amaç, rol, görev, bağlam, kısıt, örnek verme). Altıncı satırdaki "çıktı biçimi" kitaba ek bir unsurdur. Uyarı: kitaptaki unsurlar bir kalıp değildir; her prompt için hepsi gerekmez. Basit işte kısa prompt yeterlidir. Önemli olan, modelin tahmin etmek zorunda kaldığı yerleri azaltmaktır.',
        foot='Her prompt’ta altısı birden gerekmez; eksik bilgiyi modelin tahmin etmesine bırakma.'))

    # --- atölye
    parts = [('rol', 'Rol', 'Sen deneyimli bir sosyal medya uzmanısın.'),
             ('baglam', 'Bağlam', 'Hedef kitap üniversite öğrencileri. Kafe kampüsün yanında ve sabahları ucuz kahve kampanyası var.'),
             ('gorev', 'Görev', 'Yeni açılan bir kafe için Instagram paylaşım metni yaz.'),
             ('kisit', 'Kısıt', 'En fazla 2 cümle, samimi bir dil, emoji kullanma.'),
             ('ornek', 'Örnek', 'Örnek ton: “Sabah kahveni kaçırma, sınav haftası enerjisi burada!”'),
             ('cikti', 'Çıktı biçimi', 'Çıktıyı 3 farklı seçenek olarak numaralandır.')]
    fields = ''
    for k, l, v in parts:
        fields += ('<div style="display:flex;align-items:center;gap:12px"><input type="checkbox" id="pa-c-%s" checked style="width:30px;height:30px;accent-color:#C2410C;flex:none">'
                   '<label for="pa-c-%s" style="width:170px;font-size:25px;font-weight:600;flex:none">%s</label>'
                   '<input type="text" id="pa-i-%s" class="inp" value="%s" style="flex:1;font-size:22px"></div>') % (k, k, l, k, v)
    o.append(sec('atolye', 'Canlı uygulama · Prompt atölyesi', 'Parçaları aç-kapat: prompt ve cevap nasıl değişiyor?',
        row(col(card('Prompt parçaları', '<div class="col" style="gap:10px">%s</div>' % fields), row('<button class="ans-btn alt sm" type="button" id="pa-weak">Zayıf prompt’a dön</button>', '<button class="ans-btn sm" type="button" id="pa-full">Tüm parçaları aç</button>', gap=12), cls='f1', gap=14),
            col(card('Birleşen prompt', '<textarea id="pa-out" class="ta" rows="9" readonly style="font-size:22px"></textarea>' + '<div class="row" style="gap:14px;align-items:center"><button class="ans-btn sm" type="button" data-copy="pa-out">Kopyala</button><span class="sm mute">Gerçek bir araca yapıştırıp dene</span></div>'),
                card('Netlik: <b id="pa-sc">…</b>', '<div class="bar"><i id="pa-bar" style="width:0"></i></div>', 'info'),
                card('Beklenen cevap türü (simülasyon)', '<p id="pa-res" class="sm" style="min-height:4.2em"></p>', 'ok'), style='width:820px;gap:14px'), gap=28),
        'Her satırdaki kutuyu işaretleyerek veya kaldırarak prompt’un nasıl değiştiğini gösterin. "Zayıf prompt’a dön" yalnızca görevi bırakır. Sağdaki cevap kutusu bir simülasyondur: gerçek bir yapay zekâ cevabı değildir, farkı göstermek için örnek metindir. Öğrencilere promptu kopyalayıp gerçek bir araçta denemelerini ve sonucu karşılaştırmalarını isteyin. Önemli: unsur sayısı kalite garantisi değildir; çelişen veya gereksiz unsurlar da kaliteyi bozar.',
        foot='Dene: Önce yalnızca “Görev” açık olsun, sonra rol ve bağlamı ekle, farkı gözle.'))

    # --- amaç
    o.append(sec('amac', 'A · Amaç · Kitap s. 83–84', 'Amaç: “Bu yapay zekâdan hangi sonucu istiyorum?”',
        row(card('Belirsiz', p('“Teknoloji hakkında yaz.”', 'big', 'font-weight:600'), 'warn'), card('Amacı belli', p('“Akıllı ev sistemlerinin günlük yaşamı nasıl kolaylaştırdığını açıklayan kısa bir bilgilendirme metni yaz.”', 'big', 'font-weight:600'), 'ok'), gap=24) +
        grid(3, qa(p('<b>Sıra sizde 1</b><br>“Enerji hakkında yaz.”', 'mid'), 'Örnek: “Evde elektrik tasarrufu için 5 pratik öneriyi madde madde yaz.”'),
             qa(p('<b>Sıra sizde 2</b><br>“Sağlık hakkında yaz.”', 'mid'), 'Örnek: “Ders çalışırken göz sağlığını korumanın 4 yolunu kısa cümlelerle anlat.”'),
             qa(p('<b>Sıra sizde 3</b><br>“Sanat hakkında yaz.”', 'mid'), 'Örnek: “Lise öğrencileri için Ebru sanatını tanıtan 80 kelimelik bir yazı hazırla.”')) ,
        'Kitap s. 83-84. Önce öğrenciler kendi cümlelerini yazar, sonra örnek cevap açılır. Değerlendirme: yeni promptta konu, hedef ve yapılacak işlem açık mı? Kitaptaki üç değerlendirme sorusu (konuya uygun mu, açık ve anlaşılır mı, geliştirmek gerekir mi?) için cevabı bir yapay zekâ aracında deneyin.',
        foot='Kitap s. 84 · Amaç = konu + hedef + yapılacak işlem'))

    # --- rol
    rol = tabs([
        ('yok', 'Rol yok', col(card('Prompt', p('“Elektrikli araçların avantajlarını anlatan bir metin yaz.”', 'mid')), card('Tipik cevap', p('Elektrikli araçlar çevre dostudur, düşük işletme maliyeti vardır, sessiz çalışır…', 'mid'), 'info'))),
        ('plan', 'Şehir plancısı', col(card('Prompt', p('“Sen bir şehir plancısısın. Elektrikli araçların avantajlarını anlatan bir metin yaz.”', 'mid')), card('Tipik cevap', p('Şarj altyapısı, trafik yoğunluğu, şehir içi hava kalitesi ve park alanı planlaması üzerinden anlatır.', 'mid'), 'ok'))),
        ('pazar', 'Pazarlamacı', col(card('Prompt', p('“Sen deneyimli bir pazarlama uzmanısın. Elektrikli araçların avantajlarını anlatan bir metin yaz.”', 'mid')), card('Tipik cevap', p('Müşteriye dönük, kısa ve etkileyici başlıklar; tasarruf ve prestij vurgusu.', 'mid'), 'ok'))),
        ('muh', 'Mühendis', col(card('Prompt', p('“Sen bir otomotiv mühendisisin. Elektrikli araçların avantajlarını anlatan bir metin yaz.”', 'mid')), card('Tipik cevap', p('Verim, batarya teknolojisi, tork ve enerji dönüşümü gibi teknik ayrıntılara girer.', 'mid'), 'ok'))),
    ])
    o.append(sec('rol', 'B · Rol · Kitap s. 85', 'Rol: aynı konu, farklı bakış açısı', rol +
        card('Kitaba ek', p('Rol, modelin <b>üslubunu ve vurgusunu</b> değiştirir; ona gerçek uzmanlık kazandırmaz. Rol verdin diye cevabın doğruluğuna güvenme, yine doğrula. Rol “Sen bir ...sın” demek zorunda değildir: “... gözüyle anlat” da olur.', 'sm'), 'warn'),
        'Kitap s. 85. Kitaptaki üç örneği (şehir plancısı, pazarlama uzmanı, teknoloji danışmanı) kullandık. Cevap kutuları tipik farkı özetler; gerçek cevaplar araçtan araca değişir. Kitap düzeltmesi: "Rol, yapay zekâya hangi uzman gibi düşünmesi gerektiğini söyler" cümlesi abartılıdır; rol bakış açısını ve tonu yönlendirir ama bilgiyi garanti etmez. Modern modellerde rol yazmak çoğu zaman şart değildir; amaç ve bağlam daha belirleyicidir.',
        foot='Rol tonu değiştirir, bilgiyi garanti etmez.'))

    # --- görev
    o.append(sec('gorev', 'C · Görev · Kitap s. 85–86', 'Görev: tam olarak ne yapsın?',
        row(card('Rol ≠ görev', p('<b>Rol:</b> “Sen bir pazarlama uzmanısın.”<br><b>Görev:</b> “Bir ürün için reklam metni oluştur.”', 'big'), 'info'),
            card('Belirsiz → net', p('“Yapay zekâ hakkında bilgi ver.” → “Yapay zekânın günlük hayatta kullanılan üç örneğini açıklayan kısa bir liste hazırla.”', 'big'), 'ok'), gap=24) +
        grid(2, qa(p('<b>Sıra sizde</b> · “Robotlar hakkında bilgi ver.”', 'mid'), 'Örnek: “Fabrikalarda kullanılan üç robot türünü ve ne iş yaptıklarını tablo olarak yaz.”'),
             qa(p('<b>Sıra sizde</b> · “Teknoloji hakkında bir şeyler yaz.”', 'mid'), 'Örnek: “Okul bilişim kulübü için yapay zekâ konulu 3 cümlelik bir duyuru yaz.”')),
        'Kitap s. 85-86. Görev fiilidir: yaz, listele, karşılaştır, özetle, çevir, düzelt, sınıflandır. Öğrencilere iyi bir görevin fiille başladığını fark ettirin. Sınıf etkinliği: bir cümleyi "bilgi ver" ile başlatıp sonra fiili değiştirerek (listele, karşılaştır, tabloya dök) cevabın nasıl değiştiğini deneyin.',
        foot='Görev = fiil: yaz, listele, karşılaştır, özetle, düzelt, sınıflandır'))

    # --- bağlam
    bg = table(['Bağlam öğesi', 'Sorusu', 'Örnek'], [
        ['Hedef kitap', 'Kimler için?', '7 yaşında bir çocuk · lise öğrencileri · girişimciler'],
        ['Kullanım alanı', 'Nerede kullanılacak?', 'Sosyal medya · ders sunumu · reklam'],
        ['Sektör / konu', 'Hangi alanda?', 'Eğitim · turizm · sanayi'],
        ['Amaç', 'Neden?', 'Bilgilendirme · tanıtım · satış'],
        ['Seviye', 'Hangi düzeyde?', 'Başlangıç · orta · ileri'],
    ], widths=['24%', '26%', '50%'], size=24)
    o.append(sec('baglam', 'Ç · Bağlam · Kitap s. 87–88', 'Bağlam: kim için, nerede, neden?',
        row(col(row(card('Bağlamsız', p('“Kuantum fiziğini anlat.”', 'mid', 'font-weight:600'), 'warn'), card('Bağlamlı', p('“Kuantum fiziğini 7 yaşındaki bir çocuğun anlayabileceği şekilde günlük hayattan örneklerle anlat.”', 'mid', 'font-weight:600'), 'ok'), gap=18), bg, cls='f1', gap=16),
            col(qa(p('<b>Sıra sizde:</b> “Bulut bilişimi anlat.” promptuna bağlam ekle.', 'sm'), 'Örnek: “Bulut bilişimi, okul bilgisayar laboratuvarında çalışan 9. sınıf öğrencileri için 5 cümleyle, günlük hayattan bir örnekle anlat.” Neden etkili: hedef kitap, yer, uzunluk belli.'),
                qa(p('<b>Sıra sizde:</b> “Karbon ayak izi hakkında yaz.”', 'sm'), 'Örnek: “Karbon ayak izini, ulaşımını bisiklete çevirmeyi düşünen bir öğrenciye 80 kelimeyle ve bir örnekle açıkla.”'),
                qa(p('<b>Sıra sizde:</b> “3D yazıcıları anlat.”', 'sm'), 'Örnek: “3D yazıcıları, protez üretiminde kullanımı üzerinden, tıp fakültesi öğrencileri için teknik bir dille özetle.”'), style='width:760px;gap:14px'), gap=28),
        'Kitap s. 87-88. Kitap düzeltmesi: s. 87\'deki "Bağlam bir yapay zekâ modeline neden, kim için, hangi koşulda sorularını yanıtlayan kısımdır" cümlesinin anlatımı bozuktur. Doğrusu: "Bağlam; işin neden, kim için ve hangi koşullarda yapıldığını belirten kısımdır." Öğrenciler sağdaki üç görevi kendi bağlamlarıyla yeniden yazar, örnek cevaplar sonra açılır.',
        foot='Kitap s. 87: bağlam = neden, kim için, hangi koşulda'))

    # --- kısıt
    ks = table(['Kısıt türü', 'Örnek ifade'], [
        ['Uzunluk', '“Metin en fazla 80 kelime olsun.”'],
        ['Üslup ve ton', '“Samimi ve anlaşılır bir dil kullan.”'],
        ['İçerik', '“Yalnızca avantajlardan bahset.”'],
        ['Yasaklama', '“Teknik terim kullanma.”'],
        ['Kapsam', '“Sadece verilen bilgilere dayanarak yaz.”'],
    ], widths=['28%', '72%'], size=25)
    o.append(sec('kisit', 'D · Kısıtlar · Kitap s. 88–89', 'Kısıt: sınırı sen çiz',
        row(col(ks, card('Kısıtlı örnek', p('“Güneş enerjisinin avantajlarını açıklayan, en fazla 100 kelimelik, sade bir metin yaz. Teknik terimlerden kaçın.”', 'sm'), 'ok'), cls='f1', gap=16),
            col(qa(p('<b>Sıra sizde:</b> “Dijital güvenlik hakkında yaz.”', 'sm'), 'Örnek: “Yeni başlayanlar için dijital güvenlikte 3 temel kuralı, her biri en fazla 10 kelime olacak şekilde yaz; teknik terim kullanma.” Kısıtlar: uzunluk, kapsam, yasaklama.'),
                qa(p('<b>Sıra sizde:</b> “Uzay araştırmalarını anlat.”', 'sm'), 'Örnek: “Uzay araştırmalarının günlük hayata katkısını 4 maddeyle, samimi bir dille anlat.”'),
                qa(p('<b>Sıra sizde:</b> “Arabalar hakkında bilgi ver.”', 'sm'), 'Örnek: “Elektrikli ve benzinli arabaları 3 ölçüte göre tablo yap; her hücre en fazla 6 kelime olsun.”'), style='width:800px;gap:14px'), gap=28),
        'Kitap s. 88-89. Kısıtın bir de "ne olmasın" yönü vardır: yasaklama kısıtı ("teknik terim kullanma"). Ek ipucu: kısıt sayısını aşırı artırmayın; çok fazla ve birbiriyle çelişen kısıt modelin işini zorlaştırır. Etkinlik: sınıfı üçe bölün, her grup aynı konuya farklı kısıt türü ekleyip sonucu karşılaştırsın.',
        foot='Kitap s. 89 · Kısıt türleri: uzunluk, ton, içerik, yasaklama, kapsam'))

    # --- örnek verme stepper
    o.append(sec('ornek-verme', 'E · Örnek verme · Kitap s. 90–91 · Adım adım animasyon', 'Örnek göster, modele kalıbı kendisi çıkarttır',
        row(card('Prompt (kitap s. 90, 1. örnek)', '<div id="ov-p" class="mono" style="font-size:23px;line-height:1.6;color:#14202E;min-height:12.5em"></div>', 'info'),
            col(card('Modelin çıktısı', '<p id="ov-r" class="big" style="min-height:2.6em;font-weight:600"></p>', 'ok'), card('Kural', p('Nasıl bir çıktı istiyorsan <b>ona benzer bir çıktı göster</b>. Sıfır örnek (zero-shot), bir örnek (one-shot), birkaç örnek (few-shot).', 'mid'), 'warn'), style='width:700px;gap:16px'), gap=28) +
        '<div id="ov-msg" class="stmsg"></div>' + stepper_ctl(),
        'Kitap s. 90 "Bir müşteri mesajından şehir ve şikâyet konusunu ayıklama" örneği. Adım adım: önce görev (örnek yok), sonra bir örnek, sonra ikinci örnek, sonra yeni mesaj, sonra model çıktısı. Not: kitap s. 91 2. örnekte "Kategori: Teknik Sorun" hatalı biçimde ayrı satıra düşmüş; baskı hatasıdır. Soru: "Sıfır örnekle model biçimi neden tutturamayabilir?" (Çünkü "Şehir | Şikâyet" biçimini tahmin etmek zorunda kalır.)',
        foot='Kitap s. 90–91 · Örnek, biçimi ve tonu tek seferde öğretir.'))

    # --- few-shot demo
    o.append(sec('fewshot', 'Canlı uygulama · Örnekten öğrenen çıkarım (simülasyon)', 'Yeni bir müşteri mesajı yaz: kalıp devam eder mi?',
        row(col(card('Verilen iki örnek', col(p('Mesaj: “Bursa’daki mağazanızdan aldığım ürünün rengi soldu.”<br><b>→ Bursa | Renk Solması</b>', 'sm'), p('Mesaj: “İstanbul içi kargom 5 gündür gelmedi.”<br><b>→ İstanbul | Geciken Kargo</b>', 'sm'), style='gap:14px'), 'info'),
                card('Yeni mesaj', '<textarea id="fs-t" class="ta" rows="3" style="font-size:28px">Ankara şubenizdeki personelin ilgisizliği nedeniyle alışveriş yapmadan çıktım.</textarea>' +
                     '<div class="row" style="gap:10px;flex-wrap:wrap"><button class="opt fs-ex" type="button" data-s="Samsun’da aldığım telefon açılmıyor, garanti istiyorum.">Örnek A</button><button class="opt fs-ex" type="button" data-s="İzmir’deki mağazanızdan sipariş verdim, ürün hasarlı geldi.">Örnek B</button></div>'), cls='f1', gap=16),
            col(card('Modelin yazacağı satır (simülasyon)', '<p id="fs-o" class="big" style="font-weight:700;min-height:2.6em"></p>', 'ok'),
                card('Dikkat', p('Bu demo basit bir kuralla taklit eder; gerçek model örneklerden kalıbı çıkarır. Şehir ve konu bulamazsa “?” yazar: gerçek modeller ise bazen uydurur. Bunu görmek için bilinmeyen bir şehir yaz.', 'sm'), 'warn'), style='width:780px;gap:16px'), gap=28),
        'Basit bir kural tabanlı taklit: şehir listesinden ve anahtar kelimelerden çıkarım yapar. Amacı few-shot mantığını göstermektir: örnekler format ve görevi öğretir. Gerçek dil modelinde kalıp çıkarma ağırlıkları örnekten öğrenilmez (çıkarımda ağırlık değişmez); ama bağlamdaki örneklere bakarak aynı kalıbı sürdürür. Deney: bilinmeyen bir şehir yazdırın ve gerçek bir modelin ne yapabileceğini (uydurma riski) konuşun.',
        foot='Örnek sayısı arttıkça biçim daha kararlı olur; yine de çıktıyı kontrol et.'))

    # --- gelişmiş teknikler
    gt = grid(3,
        card('Adım adım düşündür', p('“Önce sorunu parçalara ayır, sonra çöz.” Matematik ve mantıkta hatayı azaltır.', 'sm')),
        card('Çıktı biçimini söyle', p('“Tablo yap”, “madde madde yaz”, “3 başlık altında topla”.', 'sm')),
        card('Ayraç kullan', p('Metni üçlü tırnak veya başlıkla ayır: “Özetlenecek metin: ”””…”””.” Talimat ile veriyi karıştırmaz.', 'sm')),
        card('Kaynak iste, emin olmazsa söylet', p('“Emin değilsen bilmiyorum de, kaynağı belirt.” Halüsinasyonu azaltmaya yardım eder.', 'sm'), 'ok'),
        card('Modele soru sordur', p('“Daha iyi sonuç için bana önce 3 soru sor.” Eksik bağlamı model tamamlatır.', 'sm')),
        card('Yinele ve geliştir', p('İlk cevap taslaktır: “Daha kısa yap”, “Daha resmî yap”, “Örnek ekle”.', 'sm')))
    o.append(sec('gelismis', 'Kitaba ek · Güncel teknikler', 'Altı pratik teknik: ilk cevabı taslak say', gt +
        card('Bağlam mühendisliği', p('Bugünün ürünlerinde asıl iş sadece “iyi cümle” yazmak değil; modele doğru <b>belgeyi, örneği ve araçları</b> vermektir (bkz. RAG). Prompt, bu büyük resmin bir parçasıdır.', 'sm'), 'info'),
        'Bu teknikler kitapta yoktur ama her gün işe yarar. Her tekniği öğrencilere gerçek bir araçla denetin. "Adım adım düşündür" tekniği, akıl yürüten modellerde zaten kendiliğinden yapılabilir. Uyarı: modelden gizli bilgi veya başkasının verisini istemeyin. Bağlam mühendisliği, günümüzde ürün geliştiricilerin kullandığı geniş bir kavramdır.',
        foot='İlk cevap bir taslaktır; ikinci ve üçüncü denemede kalite artar.'))

    # --- hata avı
    ha = cls_activity([
        ('“Teknoloji hakkında yaz.”', 1, 'Amaç yok: ne için, hangi yön?'),
        ('“Yapay zekâ hakkında bilgi ver.”', 2, 'Görev belirsiz: liste mi, özet mi, karşılaştırma mı?'),
        ('“Yeni açılan kafe için duyuru yaz.” (ton ve bakış belli değil)', 3, 'Rol eksik: pazarlamacı gibi mi, mahalleli gibi mi?'),
        ('“Bulut bilişimi anlat.”', 4, 'Bağlam yok: kim için, hangi seviyede?'),
        ('“Güneş enerjisi hakkında bir metin yaz.”', 5, 'Kısıt yok: uzunluk, dil, kapsam belirsiz.'),
        ('“Şu yorumları sınıflandır.” (kategori biçimi belli değil)', 6, 'Örnek yok: çıktı biçimini bir örnekle göstermek gerekir.'),
    ], ['Amaç', 'Görev', 'Rol', 'Bağlam', 'Kısıt', 'Örnek'], compact=True)
    o.append(sec('prompt-hata', 'Etkinlik · Prompt hata avı', 'Her prompt’ta en çok hangi unsur eksik?', ha,
        'Altı zayıf promptun her birinde en baskın eksiği işaretletin. Birden fazla eksik olabilir; tartışmaya açın. Sonra öğrenciler bu promptları kendi cümleleriyle düzeltir ve bir araçta dener.',
        foot='Birden fazla cevap mümkün olabilir; gerekçeni söyle.'))

    # --- yarışma
    rb = table(['Ölçüt', '0 puan', '1 puan', '2 puan'], [
        ['Amaç', 'Yok', 'Kısmen', 'Net'], ['Bağlam', 'Yok', 'Kısmen', 'Hedef kitap ve alan belli'], ['Kısıt', 'Yok', '1 kısıt', '2+ uygun kısıt'], ['Biçim / örnek', 'Yok', 'Biçim var', 'Biçim ve örnek var'], ['Sonuç kontrolü', 'Yapılmadı', 'Kısmen', 'Doğrulandı ve geliştirildi']], widths=['26%', '18%', '22%', '34%'], size=24)
    o.append(sec('yarisma', 'Etkinlik · 15 dakika · Takım yarışı', 'Prompt yarışması: en iyi promptu kim yazar?',
        row(col(card('Görevler (takım seçer)', ul('Okul kütüphanesi için ödünç kuralları afişi metni', 'Bilişim kulübü etkinliği için 3 sosyal medya paylaşımı', 'Yaşlı bir akrabaya telefonda güvenli şifre nasıl oluşturulur anlatan kısa rehber'), 'info'),
                timer(480, 'Takım başına 8 dakika'),
                card('Yöntem', ul('Takım promptu yazar ve bir araçta dener.', 'Sonucu doğrular, promptu bir kez geliştirir.', 'Sınıfa önce promptu, sonra sonucu gösterir.'), 'ok'), cls='f1', gap=14),
            col(rb, p('Toplam: 10 puan. Rakip takım puanlar; öğretmen karar verir.', 'sm mute'), style='width:860px;gap:14px'), gap=28),
        'Takımları 3-4 kişilik kurun. Süre sayacı sağ tarafta. Puanlama tablosu rakip takım tarafından doldurulur; sonuçlar tahtaya yazılır. Etkinliğin amacı, iyi prompt yazmayı ölçülebilir bir beceri olarak göstermektir. Hesap ve yaş sınırı konusuna dikkat edin: okulun izin verdiği, yaş uygunluğu kontrol edilmiş bir araç kullanılmalı.',
        foot='Önce doğrula, sonra puanla. Kişisel bilgi girme.'))

    # --- test
    tq = grid(2,
        qa(p('<b>1.</b> Etkili prompt yazımında en önemli unsur nedir? <span class="mute">A) Açıklık ve netlik · B) Belirsizlik · C) Renk</span>', 'sm'), '<b>A.</b> Açıklık ve netlik.'),
        qa(p('<b>2.</b> “Teknoloji hakkında yaz.” çok genel ve dağınık bir metin üretti. Eksik olan hangisidir? <span class="mute">A) Donanım · B) Bağlam ve amaç · C) Veri</span>', 'sm'), '<b>B.</b> Bağlam ve amaç.'),
        qa(p('<b>3.</b> “Sen bir pazarlama uzmanısın. Yeni açılan bir kafe için reklam metni oluştur.” İçinde olmayan unsur? <span class="mute">A) Rol · B) Görev · C) Kısıt</span>', 'sm'), '<b>C.</b> Kısıt yok (uzunluk, ton, yasak belirtilmemiş).'),
        qa(p('<b>4.</b> “100 kelimeyi geçmesin.” hangi unsurdur? <span class="mute">A) Rol · B) Kısıt · C) Veri</span>', 'sm'), '<b>B.</b> Kısıt (uzunluk kısıtı).'),
        qa(p('<b>5.</b> Biçimi örnekle göstermeye ne denir? <span class="mute">A) Örnek verme (few-shot) · B) Halüsinasyon · C) Entegrasyon</span>', 'sm'), '<b>A.</b> Örnek verme (few-shot).'),
        qa(p('<b>6.</b> Rol vermek neyi değiştirir? <span class="mute">A) Bilgiyi garanti eder · B) Üslubu ve vurguyu yönlendirir</span>', 'sm'), '<b>B.</b> Üslubu ve vurguyu yönlendirir; doğruluğu garanti etmez.'),
        style='gap:16px')
    o.append(sec('b3-test', 'Bölüm 3 · Mini test · Kitap s. 119–120 uyarlaması', 'Altı soruda bölümü değerlendir', ansall() + tq,
        'Kitap s. 119-120 sorularından (11, 12, 13, 14) ve ek iki sorudan oluşan mini test. Cevapları sınıfla birlikte açın. Düşük başarı varsa prompt atölyesine (slayt: atolye) dönüp parçaları tek tek açıp kapatın.',
        foot=None))
    return ''.join(o)
