# Örnek Uygulama — Hafta 13: CSS Framework'leri ve Ünite Projesi

## Uygulama 1 — Sıfırdan mı, Bootstrap ile mi? (30-35 dk)

**Amaç:** Aynı bileşeni iki farklı yöntemle üretip süre/satır farkını somut olarak görmek.

1. Sınıfı ikiye ayırın (veya herkes iki dosyayı da sırayla yapsın). Önce [`kart-sifirdan.html`](./kart-sifirdan.html)
   dosyasını birlikte inceleyin — `<style>` içindeki CSS kodunun ne kadar yer kapladığına dikkat çekin.
2. Sonra [`kart-bootstrap.html`](./kart-bootstrap.html) dosyasını açın. `<head>`'deki Bootstrap CDN
   satırını ve `<body>` içindeki `class="card"`, `class="row"`, `class="col-md-4"`, `class="btn btn-dark"`
   gibi hazır class isimlerini birlikte inceleyin — **hiç `<style>` bloğu yazılmadığını** vurgulayın.
3. Her iki dosyayı da tarayıcıda yan yana açıp görsel olarak ne kadar benzer olduklarını gösterin.
4. Tahtaya küçük bir tablo çizip sınıfla birlikte doldurun:

   | | Sıfırdan CSS | Bootstrap |
   |---|---|---|
   | Yazılan CSS satır sayısı | ~20 | 0 |
   | Yazma süresi (tahmini) | ... dk | ... dk |
   | Mobilde otomatik alt alta dizilir mi? | Hayır (media query eklemek gerekir) | Evet (grid sistemi hazır) |

5. **Tartışma sorusu:** "Bootstrap'in `col-md-4` class'ı, aslında hangi CSS özelliğini kullanıyor olabilir?"
   (Cevap: Flexbox/Grid — Hafta 10-11'de gördüğümüz kavramlar; framework sihir yapmıyor, bizim bildiğimiz
   CSS'i kullanıyor.)

## Uygulama 2 — "Okulum" Projesinin CSS Ünitesi Sonu Hâli (20 dk)

**Amaç:** Önceki 4 haftada parça parça eklenen stillerin nasıl tek, düzenli bir dosyada toplandığını görmek.

1. [`okulum-style.css`](./okulum-style.css) dosyasını açın — dosyanın **bölümlere ayrılmış** olduğuna
   dikkat çekin (1-SIFIRLAMA, 2-ÜST MENÜ, 3-ANA İÇERİK, ... 9-DUYARLI TASARIM).
2. Her bölüm başlığının yanındaki yorumda hangi haftaya ait olduğunu (Hafta 9/10/11/12) birlikte okuyun —
   böylece öğrenciler "bugüne kadar öğrendiğimiz her şey burada" bağlantısını kurar.
3. [`okulum-index.html`](./okulum-index.html) dosyasını tarayıcıda açıp hem masaüstü hem mobil (`Ctrl+Shift+M`)
   görünümde son hâlini gösterin.

   > Eğer sınıfın gerçek "Okulum" çıktısı bu dosyalardan farklıysa, öğretmen kendi sınıfının CSS dosyasını
   > benzer şekilde (yorumlarla bölümlere ayırarak) düzenlemesini örnek olarak gösterebilir.

## Uygulama 3 — CSS Ünitesi Özet Kontrol Listesi (15 dk, bireysel)

1. [`css-unitesi-kontrol-listesi.md`](./css-unitesi-kontrol-listesi.md) dosyasını her öğrenciye dağıtın
   (yazdırılabilir veya ekrana yansıtılabilir).
2. Öğrenciler kendi "Okulum" kopyalarını (veya ödevde yapacakları kendi sitelerini) bu listeye göre kendi
   kendine değerlendirsin — hangi maddede eksik olduklarını fark etsinler.
3. Bu liste, [Görev 2 (Ödev — Ünite Kapanış Projesi)](../03-Odev/odev.md)'de rubrik olarak da kullanılacaktır.
