# -*- coding: utf-8 -*-
from lib import *


def slides():
    o = []
    o.append(divider('b6', 'Bölüm 6 · Kitap s. 116–123 + güncel', 'Hukuk, Etik ve<br>Sorumlu Kullanım',
                     'Yapay zekâyı kullanmak yetmez: kuralları, hakları ve sorumluluğu da bilmek gerekir.',
                     'Son bölüm hukuk ve düzenlemeyi (KVKK, AB Yapay Zekâ Yasası, Türkiye Eylem Planı, telif), okulda sorumlu kullanımı, meslekleri, sözlüğü, ünite özetini ve ünite sonu değerlendirmeyi kapsar. Önerilen süre: 2 ders saati.',
                     ''))

    hk = tabs([
        ('kvkk', 'KVKK (Türkiye)', grid(3, card('Nedir?', p('6698 sayılı Kişisel Verilerin Korunması Kanunu (2016). Kişisel verinin nasıl toplanıp kullanılacağını belirler.')), card('Sana tanıdığı haklar', p('Verinin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltme ve silme talep etme.'), 'info'), card('Yapay zekâ ile ilişkisi', p('Yapay zekâya kişisel veri girmek de “veri işleme” olabilir. Kanun, yapay zekâ için de geçerlidir.'), 'warn'))),
        ('ab', 'AB Yapay Zekâ Yasası', grid(3, card('Nedir?', p('Avrupa Birliği’nin riske göre düzenleme yapan yasası. Ağustos 2024’te yürürlüğe girdi, kademeli uygulanıyor.')), card('Mantığı', p('Risk arttıkça kural artar: bazı uygulamalar yasak, bazıları sıkı denetime tabi.'), 'info'), card('Dikkat', p('Bazı yükümlülük tarihleri ertelendi veya erteleme sürecinde; güncel takvimi resmî kaynaktan kontrol et.'), 'warn'))),
        ('tr', 'Türkiye Eylem Planı', grid(3, card('Nedir?', p('Türkiye Yapay Zekâ Eylem Planı (2026-2030): 18 Ağustos 2026 tarihli Resmî Gazete’de (sayı 33344) yayımlanan Cumhurbaşkanlığı Genelgesi (2026/9).')), card('Hedefleri', p('Farkındalık, nitelikli insan kaynağı ve müfredat, veri ve hesaplama altyapısı, kamu ve özel sektörde kullanım, güvenilir ekosistem.'), 'info'), card('Not', p('Bu bir genelgedir, kanun değildir. Yapay zekâya özel müstakil bir kanun için teklifler gündemdedir; güncel durumu TBMM sitesinden kontrol et.'), 'warn'))),
        ('telif', 'Telif', grid(3, card('Üretilen içerik', p('Yapay zekâ çıktısında kimin hakkı olduğu ülkeye göre değişir ve tartışmalıdır. Yeterli insan katkısı çoğu zaman önemlidir.')), card('Eğitim verisi', p('Modellerin hangi eserlerle eğitildiği ve izin gerekip gerekmediği konusunda davalar sürüyor.'), 'info'), card('Senin için kural', p('Başkasının eserini, logosunu, sesini veya yüzünü izinsiz kullanma; kaynak göster; yapay zekâ kullandığını belirt.'), 'ok'))),
    ])
    o.append(sec('hukuk', 'Güncel · Hukuk ve düzenleme', 'Kurallar: hangi yasa ne diyor?', hk,
        'Kitap s. 74 ve 100 gizlilik ve etik uyarılarını verir; yasal çerçeve kitapta yoktur. Bilgiler web taraması ve resmî özetlere dayanır (20 Ekim 2026). Türkiye Yapay Zekâ Eylem Planı bilgisi bir hukuk bürosu özetine göredir; resmî metin Sanayi ve Teknoloji Bakanlığı sayfasındadır. AB Yapay Zekâ Yasası’nda bazı yükümlülükler için erteleme anlaşması vardı; Mayıs 2026 siyasi anlaşmasına göre yüksek riskli bazı sistemler için 2027-2028 tarihleri anılıyor ancak resmî onay süreci ve ayrıntılar için kaynağı kontrol edin. Hukuki tavsiye değildir; eğitim amaçlıdır.',
        foot='Bilgiler eğitim amaçlıdır, hukuki tavsiye değildir. Güncel durum için resmî kaynağa bak.'))

    rp = tabs([
        ('y', 'Kabul edilemez risk', grid(2, card('Anlamı', p('Yasaklanan uygulamalar.', 'mid'), 'warn'), card('Örnekler', p('İnsanları davranışlarına göre puanlayan toplumsal puanlama, insanları kandırıp zarar verecek manipülasyon.', 'mid')))),
        ('yu', 'Yüksek risk', grid(2, card('Anlamı', p('Sıkı kurallar ve denetim gerekir.', 'mid'), 'warn'), card('Örnekler', p('İşe alım, kredi değerlendirme, eğitimde sınav ve değerlendirme, kritik altyapı, bazı biyometri uygulamaları.', 'mid')))),
        ('s', 'Sınırlı risk', grid(2, card('Anlamı', p('Şeffaflık yükümlülüğü: kullanıcı bilmeli.', 'mid'), 'info'), card('Örnekler', p('Sohbet botları (bot olduğunu söylemeli), yapay zekâ üretimi görsel, ses ve video (işaretlenmeli).', 'mid')))),
        ('m', 'Minimal risk', grid(2, card('Anlamı', p('Özel bir yükümlülük yok.', 'mid'), 'ok'), card('Örnekler', p('Spam filtresi, oyunlardaki yapay zekâ, basit öneri sistemleri.', 'mid')))),
    ])
    o.append(sec('risk', 'Güncel · Riske göre düzenleme', 'Risk piramidi: ne kadar tehlikeli, o kadar sıkı kural', rp +
        card('Bağlantı', p('Bu ünitedeki “yapay zekâ üretimi olduğunu belirt” kuralının arkasında bu şeffaflık fikri var.', 'mid'), 'info'),
        'AB Yapay Zekâ Yasası yapay zekâ sistemlerini dört risk düzeyinde ele alır. Öğrencilerle bir örneği sınıflandırın: "Sınavda öğrenci notlarını belirleyen yapay zekâ hangi düzeydedir?" (Yüksek risk.) Uygulama takvimi kademelidir; bazı tarihler ertelenebilmektedir. Bu slayt mantığı öğretir, tarih öğretmez.',
        foot='Düzeyler: kabul edilemez · yüksek · sınırlı · minimal'))

    ok = cls_activity([
        ('Ödev için konu fikri bulmak üzere yapay zekâdan öneri istemek', 1, 'Fikir desteğidir; kendi çalışmanı sen yaparsın.'),
        ('Yapay zekâya ödevi yaptırıp kendi adınla teslim etmek', 3, 'Başkasının işini kendi işin gibi sunmaktır: akademik dürüstlüğe aykırı.'),
        ('Yazdığın paragrafın yazım hatalarını düzelttirmek', 2, 'Öğretmenin kuralına bağlıdır; önce sor.'),
        ('Yapay zekâdan aldığın bilgiyi doğrulamadan ödeve koymak', 3, 'Halüsinasyon riski: doğrulama şart.'),
        ('Ödevde hangi aracı nasıl kullandığını belirtmek', 1, 'Şeffaflık ve dürüstlük: iyi uygulama.'),
        ('Sınavda telefondan yapay zekâya soru sormak', 3, 'Sınav kuralına aykırıdır.'),
    ], ['Kabul edilir', 'Öğretmene danış', 'Kabul edilemez'], compact=True)
    o.append(sec('okul', 'Etkinlik · Okulda sorumlu kullanım', 'Hangi kullanım doğru?', ok +
        card('Atıf şablonu', p('“Bu çalışmada fikir listesi için [araç adı] kullanıldı ([tarih]). Çıktılar tarafımdan doğrulanıp düzenlendi.”', 'sm'), 'info'),
        'Öğretmenin kendi sınıf kuralıyla uyumlu hâle getirin; okul yönetimi ve sınıf sözleşmesi belirleyicidir. Atıf şablonu öğrencilere yapay zekâ kullanımını belirtmeyi alışkanlık hâline getirir. Tartışma: aynı kullanım neden bir derste serbest, başka derste yasak olabilir?',
        foot='Kural: yapay zekâ yardımcıdır, sorumlu sensin.'))

    o.append(sec('gelecek', 'Kitap s. 81 · Fırsat ve risk + güncel', 'Gelecek: fırsatlar, riskler ve meslekler',
        row(col(card('Fırsatlar', ul('Hızlı ve kişiselleştirilmiş öğrenme', 'Tıpta erken teşhis, bilimde hızlanma', 'Erişilebilirlik: sesli okuma, altyazı, çeviri', 'Tekrar eden işlerin devri'), 'ok'), card('Riskler', ul('Yanlış bilgi ve deepfake', 'Gizlilik ve önyargı', 'İşlerin dönüşmesi', 'Aşırı güven ve bağımlılık'), 'warn'), cls='f1', gap=16),
            col(card('Yeni ve dönüşen meslekler', ul('Veri bilimci, makine öğrenmesi mühendisi', 'Yapay zekâ destekli yazılım geliştirici', 'Otomasyon ve iş akışı uzmanı', 'Veri kalitesi ve etiketleme uzmanı', 'Yapay zekâ etiği ve uyum uzmanı'), 'info'),
                card('İnsanda kalan beceriler', p('Eleştirel düşünme · doğrulama · yaratıcılık · iletişim · etik karar', 'mid'), 'dk'), cls='f1', gap=16), gap=28),
        'Kitap s. 81 5. soru: fırsat ve riskler. Meslek listesi örnektir, eksiksiz değildir; öğrencilerden Bilişim Teknolojileri alanı için bir meslek eklemelerini isteyin. Türkiye Yapay Zekâ Eylem Planı da nitelikli insan kaynağı ve müfredat güncellemesini hedefler. Ünitenin ana mesajı: yapay zekâyı kullanırken doğrula, koru, belirt.',
        foot='Doğrula · Koru · Belirt'))

    sz = [('Yapay zekâ', 'Veriden öğrenerek karar veren, tahmin yapan sistemler'), ('Veri', 'Sistemin işleyebildiği her türlü bilgi'), ('Model', 'Eğitimle oluşan kalıplar bütünü'), ('Algoritma', 'Veriyi işleyen adım adım yol'),
          ('Makine öğrenmesi', 'Kuralı yazmadan, örneklerden öğrenme'), ('Derin öğrenme', 'Çok katmanlı sinir ağlarıyla öğrenme'), ('Üretken yapay zekâ', 'Yeni metin, görsel, ses, video üreten sistemler'), ('Prompt', 'Modele verilen talimat veya soru'),
          ('Halüsinasyon', 'Gerçek dışı bilgiyi emin biçimde sunma'), ('Token', 'Dil modelinin okuduğu metin parçası'), ('Chatbot', 'Yazılı veya sesli sohbet eden yazılım'), ('Otomasyon', 'İşin insan yerine sistem tarafından yürütülmesi'),
          ('İş akışı', 'Tetikleyiciden çıktıya adım adım süreç'), ('API', 'İki sistemin konuşmasını sağlayan arayüz'), ('Entegrasyon', 'Sistemlerin veri alışverişiyle bağlanması'), ('Etik', 'Doğru ve sorumlu davranma ilkeleri'),
          ('Gizlilik', 'Kişisel verinin korunması'), ('Önyargı', 'Modelin veriden aldığı haksız eğilim'), ('RAG', 'Belgede arayıp cevap yazan yöntem'), ('Ajan', 'Araç kullanarak çok adımlı iş yapan sistem')]
    rows = ''.join('<tr class="sz-r"><td style="font-weight:600;width:30%%">%s</td><td>%s</td></tr>' % t for t in sz)
    o.append(sec('sozluk', 'Sözlük · Kitap s. 67 + eklenenler', 'Ünitenin 20 kavramı: ara ve gözden geçir',
        '<input id="sz-q" class="inp" type="text" placeholder="Kavram ara…" style="width:100%;font-size:28px"><div style="column-count:2;column-gap:36px;font-size:24px"><table style="font-size:24px;background:#FFFFFF" id="sz-t">' + rows + '</table></div>' +
        p('Başlangıçta yazdığın kelimelere dön: şimdi hangi kavramı daha iyi anlattığını düşün.', 'sm mute'),
        'Kitap s. 67 anahtar kavramlarına (14 terim) token, RAG, ajan, önyargı ve model gibi eklemeler yapıldı. Arama kutusu, kavramı hızlıca bulmak içindir. Etkinlik: öğrenciler her kavramı kendi cümleleriyle yeniden tanımlayıp başlangıç cevaplarıyla karşılaştırır.',
        foot='Kitap s. 67 anahtar kavramları + eklemeler'))

    ozet = grid(3,
        card('1 · Temeller', p('Veri + algoritma → model → tahmin. Yapay zekâ olasılık hesaplar; halüsinasyon, gizlilik ve önyargı risklerini taşır.', 'sm')),
        card('2 · Modeller', p('Dar yapay zekâ bugünün gerçeği. Dil, görsel, ses, video, kod modelleri; açık ve kapalı modeller; RAG ve ajanlar.', 'sm'), 'info'),
        card('3 · Prompt', p('Amaç, rol, görev, bağlam, kısıt, örnek (+ çıktı biçimi). İlk cevap taslaktır.', 'sm'), 'ok'),
        card('4 · İçerik', p('Görsel, ses, video üret; telif ve izne dikkat et; yapay zekâ üretimi olduğunu belirt; SIFT ile doğrula.', 'sm'), 'warn'),
        card('5 · Otomasyon', p('Tetikleyici → veri → analiz → karar → işlem → çıktı. Chatbot, API, entegrasyon; ajanda insan onayı.', 'sm'), 'dk'),
        card('6 · Sorumluluk', p('KVKK, AB Yapay Zekâ Yasası, Türkiye Eylem Planı. Doğrula · Koru · Belirt.', 'sm')))
    o.append(sec('ozet', 'Özet', 'Ünite haritası: altı bölüm, tek fikir', ozet +
        card('Tek cümle', p('Yapay zekâ güçlü bir yardımcıdır; ne yaptığını anlayan, doğrulayan ve sorumluluk alan insanla birlikte değerlidir.', 'big'), 'info'),
        'Her kartı bir öğrencinin kendi cümleleriyle anlatmasını isteyin. Özet slaytı sınav öncesi tekrar için de kullanılabilir.', foot=None))

    def T(items, style='gap:14px'):
        return grid(2, *items, style=style)
    q1 = T([
        qa(p('<b>1.</b> “Yapay zekâ, verilerden öğrendiği kalıplara göre en olası cevabı üretir.” Bu çıkarım hangisini en iyi açıklar? <span class="mute">A) Her zaman doğru sonuç · B) Bilinçli karar · C) Kurallarla çalışma · D) Anlamdan çok olasılıklara göre çalışma · E) Yalnızca görsellerle çalışma</span>', 'sm'), '<b>D</b>'),
        qa(p('<b>2.</b> Yapay zekânın öğrenebilmesi için en önemli unsur? <span class="mute">A) Veri · B) Donanım gücü · C) Programlama dili · D) İnternet hızı · E) Ekran çözünürlüğü</span>', 'sm'), '<b>A</b> · Veri'),
        qa(p('<b>3.</b> Hangisi yapay zekânın çalışma sürecinde yer almaz? <span class="mute">A) Veri toplama · B) Model eğitimi · C) Öğrenme · D) Kod derleme · E) Tahmin</span>', 'sm'), '<b>D</b> · Kod derleme'),
        qa(p('<b>4.</b> Modele çok sayıda elma ve armut fotoğrafı göstermek hangi süreç? <span class="mute">A) Çıktı üretme · B) Veri toplama · C) Karar verme · D) Tahmin · E) Geri bildirim</span>', 'sm'), '<b>B</b> · Veri toplama'),
        qa(p('<b>5.</b> “Şifre doğruysa giriş yap” klasik programlamadır; kullanıcı davranışına göre şüpheli girişi bulan sistem yapay zekâdır. Bu hangi farkı açıklar? <span class="mute">A) Yapay zekâ daha hızlı · B) Klasik sistemler veri kullanmaz · C) Yapay zekâ sadece internetle çalışır · D) Klasik sistemler hatalı · E) Yapay zekâ öğrenebilir ve yorum yapabilir</span>', 'sm'), '<b>E</b>'),
        qa(p('<b>6.</b> Yapay zekânın yeni durumlara uyum sağlaması neyle açıklanır? <span class="mute">A) Öğrenme yeteneği · B) Donanım gücü · C) Sabit kurallar · D) İnternet · E) Kod miktarı</span>', 'sm'), '<b>A</b>')])
    o.append(sec('final1', 'Ünite sonu testi 1/3 · Kitap s. 117–119', 'Kitaptaki sorular: temeller', ansall() + q1,
        'Kitap s. 117-118 sorularının bir kısmı (1-6). Cevaplar: 1 D, 2 A, 3 D, 4 B, 5 E, 6 A.', foot=None))

    q2 = T([
        qa(p('<b>7.</b> Hangisi yapay zekâ sistemlerinin özelliğidir? <span class="mute">A) Sabit kalır · B) Kuralların dışına çıkamaz · C) Verilerden öğrenir · D) Sadece manuel çalışır · E) Kod olmadan çalışamaz</span>', 'sm'), '<b>C</b>'),
        qa(p('<b>8.</b> Müzik uygulamasının dinleme alışkanlığına göre şarkı önermesi hangi özelliktir? <span class="mute">A) Rastgele seçim · B) Donanım yönetimi · C) Manuel kontrol · D) Sabit kurallar · E) Veri analizi ve tahmin</span>', 'sm'), '<b>E</b>'),
        qa(p('<b>9.</b> Halüsinasyon neyi ifade eder? <span class="mute">A) Sistem hatası · B) Veri silinmesi · C) Gerçek dışı bilgiyi doğruymuş gibi sunması · D) Bağlantı kopması · E) Yavaş çalışma</span>', 'sm'), '<b>C</b>'),
        qa(p('<b>10.</b> Yapay zekâdan alınan bilginin doğruluğu nasıl kontrol edilir? <span class="mute">A) Doğrudan kullanılır · B) Kaydedilir · C) Tekrar yazılır · D) Silinir · E) Farklı kaynaklarla karşılaştırılır</span>', 'sm'), '<b>E</b>'),
        qa(p('<b>15.</b> Farklı yazılım sistemlerinin veri paylaşarak birlikte çalışması? <span class="mute">A) Depolama · B) Entegrasyon · C) Kodlama · D) Otomasyon · E) Veri analizi</span>', 'sm'), '<b>B</b>'),
        qa(p('<b>17.</b> Kullanıcı mesaj gönderir, sistem analiz eder, türe göre yönlendirir, cevap gönderir. Bu hangisine örnek? <span class="mute">A) Grafik tasarım · B) İş akışı · C) Donanım yönetimi · D) Veri silme · E) Kodlama dili</span>', 'sm'), '<b>B</b>')])
    o.append(sec('final2', 'Ünite sonu testi 2/3 · Kitap s. 119–121', 'Kitaptaki sorular: bilgi, entegrasyon, iş akışı', ansall() + q2,
        'Kitap soruları 7, 8, 9, 10, 15, 17. Cevaplar: 7 C, 8 E, 9 C, 10 E, 15 B, 17 B.', foot=None))

    q3 = T([
        qa(p('<b>18.</b> “Okul kaçta açılıyor?” ve “Okulun giriş saati nedir?” sorularına doğru cevap verilmesi neyi gösterir? <span class="mute">A) Kural tabanlıdır · B) Veri depolar · C) Doğal dil işleme kullanır · D) Sadece anahtar kelime arar · E) Çevrimdışı çalışır</span>', 'sm'), '<b>C</b>'),
        qa(p('<b>19.</b> Bir sistemin zamanla daha doğru sonuç vermesinin açıklaması? <span class="mute">A) Sabit kurallar · B) Kapanma · C) Donanım değişimi · D) Kod silinmesi · E) Veri öğrenme süreci</span>', 'sm'), '<b>E</b>'),
        qa(p('<b>20.</b> Mesajları şikâyet, bilgi talebi, satın alma isteği diye sınıflayan sistemin en önemli katkısı? <span class="mute">A) Mesajları daha hızlı ve doğru yönlendirmek · B) Web tasarımı · C) Ürün sayısı · D) Reklam maliyeti · E) Sunucu kapasitesi</span>', 'sm'), '<b>A</b>'),
        qa(p('<b>21.</b> API kullanarak uygulamalar arası veri paylaşımının en önemli avantajı? <span class="mute">A) Daha yavaş · B) Daha fazla hata · C) Donanım ihtiyacı artar · D) Sistemlerin birlikte çalışabilmesi · E) Veri kaybı</span>', 'sm'), '<b>D</b>'),
        qa(p('<b>D/Y 1.</b> Yapay zekâ sistemleri her zaman doğru ve güvenilir sonuç üretir.', 'sm'), '<b>Yanlış.</b> Hata ve halüsinasyon yapabilir; doğrulama gerekir.'),
        qa(p('<b>D/Y 2.</b> Üretken yapay zekâ araçları yalnızca metin oluşturur.', 'sm'), '<b>Yanlış.</b> Metin, görsel, ses, video, kod üretebilir.')])
    o.append(sec('final3', 'Ünite sonu testi 3/3 · Kitap s. 121–123', 'Kitaptaki sorular: otomasyon ve doğru-yanlış', ansall() + q3,
        'Kitap soruları 18, 19, 20, 21 ve Bölüm C doğru-yanlış (1, 2). Kalan iki doğru-yanlış (3: halüsinasyon tanımı doğru, 4: entegrasyon tanımı doğru) sınıfça sözlü sorulabilir. Cevaplar: 18 C, 19 E, 20 A, 21 D.', foot=None))

    kp = cls_activity([
        ('Hesap makinesi', 2, 'Sabit kurallı: yapay zekâ değil.'),
        ('Video önerileri', 1, 'Öğrenen öneri sistemi: yapay zekâ.'),
        ('Yüz tanıma ile kilit açma', 1, 'Öğrenilmiş model: yapay zekâ.'),
        ('Asansör düğmesi', 2, 'Kural tabanlı: yapay zekâ değil.'),
        ('Klavye kelime tahmini', 1, 'Dil modeli: yapay zekâ.'),
        ('Klasik kombi', 2, 'Sabit eşik kuralı: yapay zekâ değil.'),
    ], ['Evet', 'Hayır'], compact=True)
    o.append(sec('kapanis', 'Kapanış · Oylamanın cevabı', 'Başlangıçtaki soruya şimdi tekrar cevap ver', kp +
        row(card('Köprü: 3. Öğrenme Birimi', p('Yapay zekâ hesabı <b>donanımda</b> yapılır: işlemci, ekran kartı (GPU), bellek. Sonraki ünite donanım birimlerini işliyor; bu ünitedeki model eğitimi neden güçlü donanım ister, orada anlayacaksın.', 'sm'), 'info'),
            card('Kendimi değerlendiriyorum', p('1-5 arası puan ver: çalışma mantığı · prompt yazma · içerik üretme · otomasyon · sorumlu kullanım.', 'sm'), 'ok'), gap=24),
        'Oylama etkinliğinin cevabını açın; öğrenciler başlangıçta ne düşündüklerini hatırlayıp karşılaştırsın. Kitap s. 76 kendini değerlendirme tablosu ve s. 68 başlangıç kelimeleriyle birlikte kullanın. Sonraki ünite (Donanım Birimleri) için köprü: yapay zekâ hesabı GPU gibi özel donanımlarda yapılır.',
        foot=None))

    dz = table(['Kitapta', 'Sorun', 'Doğrusu'], [
        ['s. 69: Derin öğrenme “insan müdahalesi olmadan” keşfeder; denetimli öğrenme ile yan yana', 'Derin öğrenme bir yöntem ailesidir; denetimli/denetimsiz/pekiştirmeli ise öğrenme biçimidir. İnsan emeği yine gerekir.', 'Makine öğrenmesi türleri ayrı; derin öğrenme çok katmanlı sinir ağıdır, her türle yapılabilir.'],
        ['s. 69: “Kullanıcı ‘Hayır’ derse yapay zekâ bilgilerini yeniden düzenler”', 'Sohbet botları konuşma sırasında kalıcı öğrenmez.', 'Konuşma içinde düzeltmeyi hesaba katar; kalıcı güncelleme yeni eğitimle olur.'],
        ['s. 70: Tablo 2.1 “puan (ağırlık)”', '“Ağırlık” modelin iç parametresidir; çıktı puanı değildir.', 'Olasılık/skor hesaplanır; ağırlıklar modelin içindedir.'],
        ['s. 79–80: 1970–1990 tek “yapay zekâ kışı”', 'İki ayrı kış yaşandı.', 'Yaklaşık 1974–80 ve 1987–93; arada uzman sistemler.'],
        ['s. 80–82: 2010–2020 ve 2020 sonrası dönüm noktaları yok', 'Transformer (2017) ve ChatGPT (2022) eksik.', 'Bu tarihler tarihçeye eklenmeli.'],
        ['s. 85: Rol, yapay zekâya “hangi uzman gibi düşüneceğini” söyler', 'Rol üslubu yönlendirir, uzmanlık kazandırmaz.', 'Rol ton ve vurguyu etkiler; doğruluk için doğrulama gerekir.'],
        ['s. 87: “Bağlam ... neden, kim için, hangi koşulda sorularını yanıtlayan kısımdır”', 'Cümle anlatım bakımından bozuk.', 'Bağlam; işin neden, kim için ve hangi koşullarda yapıldığını belirtir.'],
        ['s. 101: Öğrenciden ses platformunda hesap açması isteniyor', 'Birçok araçta yaş sınırı ve veli izni var; KVKK konusu.', 'Okul onaylı araç, öğretmen hesabı veya demo kullan.'],
        ['s. 107: 8 adımlı 4. Uygulama “20 dakika”', 'Sekiz adım 20 dakikada yapılamaz.', 'Gerçekçi süre 80 dakika (2 ders saati).'],
        ['s. 67 kapak: “Y APAY ZEKA”', 'Yazım hatası.', '“Yapay Zekâ”'],
    ], widths=['34%', '33%', '33%'], size=24)
    o.append(sec('duzeltme', 'Kalite kontrol · Kitaptaki hatalar ve eskimiş noktalar', 'Kitapta X → Doğrusu Y', dz,
        'Bu tablo öğretmen içindir; isterseniz öğrencilerle "hata avı" etkinliği olarak da kullanabilirsiniz. Her satırın sayfa numarası kitabın kendi numarasıdır. İlk iki satır en önemlisidir (kavramsal). Dördüncü ve beşinci satır tarihçe bilgisidir. Sekizinci satır güvenlik ve veri gizliliği açısından önemlidir.',
        foot='Sayfa numaraları kitabın kendi numaralarıdır (PDF sayfası = kitap sayfası).'))

    ks = ul('Kitap: BİLİŞİM TEKNOLOJİLERİNİN TEMELLERİ 9, 2. Öğrenme Birimi (s. 66–123)', 'Yıllık plan: 2026-2027 OMÜ MTAL Bilişim Teknolojileri Alanı, 9. sınıf', 'Türkiye Yapay Zekâ Eylem Planı (2026-2030): 18 Ağustos 2026 tarihli, 33344 sayılı Resmî Gazete, Cumhurbaşkanlığı Genelgesi 2026/9 (özet: Erdem &amp; Erdem Hukuk Bürosu bilgi bankası)', 'AB Yapay Zekâ Yasası takvim değişiklikleri (Mayıs 2026 geçici siyasi anlaşma): Travers Smith hukuk bürosu özeti', 'Model sürümleri ve karşılaştırmalar: üçüncü taraf bloglar ve LMArena; kesin bilgi için şirketlerin resmî sayfaları', 'Yöntemler: SIFT (Mike Caulfield); Transformer (Vaswani ve diğ., 2017); RAG (Lewis ve diğ., 2020)')
    o.append(sec('kaynaklar', 'Kaynaklar ve notlar', 'Neye dayanıldı?', card('', ks, 'info') +
        card('Not', p('Sürüm, fiyat ve hukuki takvim bilgileri hızla değişir. Bu sunumdaki güncel bilgiler 20 Ekim 2026 tarihli web taramasına dayanır ve derste resmî kaynaklardan yeniden doğrulanmalıdır.', 'sm'), 'warn'),
        'Kaynak listesi, öğrencilere kaynak göstermeyi öğretmek için de kullanılabilir. Güncellik uyarısı önemlidir: sunumu derste kullanmadan önce model ve düzenleme bilgilerini kontrol edin.', foot=None))
    return ''.join(o)
