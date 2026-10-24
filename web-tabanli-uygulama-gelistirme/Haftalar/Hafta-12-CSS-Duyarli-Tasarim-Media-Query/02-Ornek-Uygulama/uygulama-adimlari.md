# Örnek Uygulama — Hafta 12: Duyarlı Tasarım ve Media Query

## Uygulama 1 — "Mobilde Neden Bozuk Görünüyor?" (30 dk)

**Amaç:** Duyarlı tasarımın 3 en yaygın hatasını canlı olarak bulup düzeltmek: eksik `viewport`, sabit `px`
genişlik, ve `max-width`/`min-width` yön karışıklığı.

1. [`mobil-bozuk.html`](./mobil-bozuk.html) dosyasını tarayıcıda açın. Önce **masaüstü genişliğinde**
   inceleyin — menü dikey duruyor, bu normal görünmeyebilir ama ilerleyin.
2. `F12` ile geliştirici araçlarını açın, `Ctrl+Shift+M` ile mobil cihaz görünümüne geçin (örn. "iPhone SE"
   veya 375px genişlik seçin). Şimdi öğrenciler şunu görecek:
   - Sayfa çok küçük render olmuş, yazılar okunmuyor, yakınlaştırmak gerekiyor.
   - Yatay kaydırma çubuğu var — içerik sağa taşıyor.
   - Menü, mobilde olması gerekenin **tam tersi** davranıyor (masaüstünde dikey, mobilde yan yana).
3. Öğrencilerle birlikte VS Code'da dosyayı açıp 3 hatayı sırayla bulun ve düzeltin:
   - [ ] `<head>` içinde `<meta name="viewport" ...>` eksik → ekleyin.
   - [ ] `.sayfa { width: 960px; }` → `max-width: 960px; width: 100%;` yapın.
   - [ ] `@media (min-width: 700px)` → `@media (max-width: 700px)` yapın (yön ters yazılmıştı).
4. Her düzeltmeden sonra tarayıcıyı yenileyip DevTools'ta mobil görünümü tekrar kontrol edin — sorunların
   tek tek çözüldüğünü gözlemleyin.
5. Kendi çözümünüzü [`mobil-cozum.html`](./mobil-cozum.html) ile karşılaştırın.

> **Öğretmen notu:** 3. maddedeki her hatayı ayrı ayrı düzeltip aradaki farkı göstermek (hepsini birden
> düzeltmek yerine), hangi hatanın hangi belirtiye yol açtığını netleştirir.

## Uygulama 2 — "Okulum" Sitesine Duyarlılık Ekleme (25-30 dk)

**Amaç:** Gerçek proje üzerinde `clamp()` ve mobil menü düzenini uygulamak.

1. [`okulum-index.html`](./okulum-index.html), [`okulum-iletisim.html`](./okulum-iletisim.html) ve
   [`okulum-style.css`](./okulum-style.css) dosyalarını inceleyin — bunlar önceki haftalarda (Hafta 9-11)
   oluşturulan "Okulum" sitesinin bu haftaya kadarki hâlidir.

   > Eğer sınıfınızda Hafta 9-11 içerikleri bu dosyalardan farklı ilerlediyse, öğretmen bu dosyaları
   > sınıfın gerçek çıktısıyla uyumlu hale getirmelidir — önemli olan buradaki **Hafta 12 eklentisi**
   > mantığının (media query + clamp) aktarılmasıdır.

2. `okulum-style.css` dosyasının en altındaki **"HAFTA 12 EKLENTİSİ"** bölümünü birlikte satır satır
   yazdırın: `clamp()` ile başlık boyutu, `img { max-width: 100%; }` kuralı, ve `@media (max-width: 700px)`
   bloğu (menü, kart grid, galeri grid tek sütuna geçiyor).
3. `okulum-index.html`'i tarayıcıda açıp `Ctrl+Shift+M` ile mobil genişliğe geçin — menünün alt alta
   dizildiğini, kartların ve galeri görsellerinin tek sütuna indiğini, başlığın küçüldüğünü birlikte gözlemleyin.
4. Pencereyi yavaşça masaüstü genişliğine geri getirip `clamp()` sayesinde başlığın **sıçramadan, akıcı**
   şekilde büyüdüğünü gösterin (media query ile yazılmış sabit adımlarla karşılaştırın — slayt 8'e geri dönün).

## Uygulama 3 — Kendi Ölçünüzü Bulun (15 dk, bireysel/eşli)

**Amaç:** Breakpoint kavramını pasif izlemek yerine aktif olarak deneyimlemek.

1. Öğrenciler `okulum-index.html`'i DevTools'ta genişliği elle sürükleyerek (cihaz seçmeden, "Responsive"
   modunda) yavaşça daraltsın.
2. Menünün/kartların "bozulmaya başladığı" (örn. metinlerin sıkışmaya başladığı) tam genişliği not etsinler.
3. Bu genişliği mevcut `700px` breakpoint'i ile karşılaştırıp "sizce bu değer doğru mu, değiştirilmeli mi?"
   tartışmasını açın — amaç, breakpoint seçiminin ezberden değil gözlemden geldiğini içselleştirmek.
