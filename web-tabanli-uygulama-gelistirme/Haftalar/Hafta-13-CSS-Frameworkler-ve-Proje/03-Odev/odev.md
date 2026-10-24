# Ödev — Hafta 13: CSS Framework'leri ve Ünite Projesi (CSS Ünitesi Kapanış Projesi)

Bu ödev, CSS ünitesinin (Hafta 9-13) **kapanış projesidir** ve normal ödevlerden daha kapsamlıdır — birkaç
gün süre tanıyın. Hafta 3-8 arasında (HTML5 ünitesi) oluşturduğunuz çok sayfalı kendi siteniz üzerine
inşa edilecektir.

## Görev 1 — Kendi Sitenizi Uçtan Uca Stillendirin (Ana Görev)

HTML5 ünitesinde (Hafta 8 ödevinde) hazırladığınız çok sayfalı kendi sitenizi (en az 2 sayfa: örn. anasayfa +
iletişim/hakkımda) alın ve **harici bir `style.css` dosyası** ile baştan sona stillendirin. Aşağıdaki
kontrol listesini eksiksiz karşılamalısınız — bu liste [`css-unitesi-kontrol-listesi.md`](../02-Ornek-Uygulama/css-unitesi-kontrol-listesi.md)
dosyasının bire bir aynısıdır:

**Hafta 9 — Ekleme ve Seçiciler**
- [ ] CSS, harici bir `.css` dosyasında ve `<link>` ile bağlanmış.
- [ ] En az bir eleman seçici, bir sınıf (`.class`) seçici, bir id (`#id`) seçici kullanılmış.

**Hafta 10 — Kutu Modeli**
- [ ] `box-sizing: border-box` tanımlanmış.
- [ ] En az bir yerde `display: flex` ile yan yana/alt alta bir düzen kurulmuş.
- [ ] `padding`, `border`, `margin` bilinçli olarak (rastgele değil) kullanılmış.

**Hafta 11 — Renk ve Tipografi**
- [ ] En az 3 CSS özel değişkeni (`--renk-...` gibi) tanımlanıp `var()` ile kullanılmış.
- [ ] Başlıklar ve gövde metni için tutarlı bir tipografi hiyerarşisi (farklı `font-size` değerleri) var.

**Hafta 12 — Duyarlı Tasarım**
- [ ] `meta viewport` doğru tanımlanmış.
- [ ] En az bir `@media (max-width: ...)` kuralı var ve gerçekten işlevsel bir değişiklik yapıyor.
- [ ] En az bir yerde `clamp()` kullanılmış.
- [ ] Sayfa hem masaüstünde hem mobilde (`Ctrl+Shift+M` ile test edilmiş) düzgün görünüyor.

**Hafta 13 — Framework**
- [ ] Sitenin **en az bir bölümünde** (örn. sadece butonlar veya sadece kartlar) Bootstrap CDN ile hazır
      bir class denenmiş (tamamı Bootstrap olmak zorunda değil — amaç framework kullanımını deneyimlemek).

## Görev 2 — Kısa Yansıtma Yazısı

Yarım sayfalık kısa bir yazı ile şu soruları cevaplayın:
1. Sitenizi stillendirirken en çok zorlandığınız nokta neydi?
2. Sıfırdan yazdığınız CSS ile Bootstrap'ten aldığınız bölüm arasında ne fark hissettiniz?
3. Bir sonraki projenizde (CSS ünitesi bittiğine göre, Javascript ünitesinde) bu siteye hangi etkileşimi
   eklemek isterdiniz? (Cevap vermek için Javascript bilmenize gerek yok, sadece hayal edin.)

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Hafta 9-11 kontrol listesi maddeleri (seçiciler, kutu modeli, renk/tipografi) | 30 |
| Hafta 12 kontrol listesi maddeleri (duyarlı tasarım — mobilde gerçekten test edilmiş) | 30 |
| Hafta 13 kontrol listesi maddesi (framework denemesi) | 15 |
| Görsel bütünlük (site tutarlı bir renk paleti ve tipografi kullanıyor mu?) | 15 |
| Yansıtma yazısı (Görev 2) | 10 |

**Not:** Bu bir bireysel proje ödevi olduğu için tek bir "cevap anahtarı" yoktur — her öğrencinin sitesi
farklıdır. Değerlendirme, yukarıdaki kontrol listesinin karşılanıp karşılanmadığına göre yapılır. Örnek bir
referans çözüm için [`02-Ornek-Uygulama/`](../02-Ornek-Uygulama/) klasöründeki "Okulum" projesinin CSS
ünitesi sonu hâline (`okulum-style.css`) bakılabilir — öğrencinin dosyasının bu düzeyde (bölümlere ayrılmış,
değişken kullanan, duyarlı) olması beklenir.
