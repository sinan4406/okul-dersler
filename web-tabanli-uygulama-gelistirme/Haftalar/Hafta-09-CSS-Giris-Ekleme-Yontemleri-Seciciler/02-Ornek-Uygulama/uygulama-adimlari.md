# Örnek Uygulama — Hafta 9: CSS'e Giriş, Ekleme Yöntemleri ve Seçiciler

## Uygulama 1 — 3 Ekleme Yöntemi, Aynı Sonuç (20 dk)

**Amaç:** Satır içi, dahili ve harici CSS'in "aynı görsel sonucu" farklı yollardan ürettiğini, ama bakım
kolaylığı açısından aralarında büyük fark olduğunu göstermek.

1. [`3-ekleme-yontemi.html`](./3-ekleme-yontemi.html) dosyasını tarayıcıda açın — üç renkli kutu (kırmızı,
   yeşil, mavi) görünecek.
2. Kodu VS Code'da açıp üç yöntemi birlikte inceleyin: `style=""` (satır içi), `<style>` bloğu (dahili),
   [`harici.css`](./harici.css) (harici, `<link>` ile bağlı).
3. Sınıfa sorun: "50 sayfalık bir sitede tüm paragrafların rengini tek seferde değiştirmek isteseydik hangi
   yöntemi seçerdik?" Harici CSS'in tek dosyadan yönetim avantajını vurgulayın.
4. Küçük deney: `harici.css` içindeki `.harici` renk değerini değiştirip kaydedin, tarayıcıyı yenileyin —
   sadece o kutunun değil, aynı class'ı kullanan **her yerin** aynı anda değişeceğini gösterin (henüz tek
   yerde olsa da, prensip önemli).

## Uygulama 2 — Seçici Önceliği Çakışması (15 dk)

1. [`secici-oncelik-demo.html`](./secici-oncelik-demo.html) dosyasını açmadan önce, sadece kodu (üstteki
   `<style>` bloğunu) projeksiyonda gösterip öğrencilerden **tahmin** isteyin: paragraf hangi renkte
   görünecek?
2. Dosyayı tarayıcıda açıp cevabı (kırmızı) gösterin.
3. "Neden mavi ya da siyah değil de kırmızı?" sorusunu tartışın → ID seçicisi, class ve etiket seçicisinden
   daha yüksek önceliğe sahiptir.
4. **Ek deney:** `id="onemli-mesaj"` satırını kod içinden geçici olarak silin (veya yorum satırına alın),
   sayfayı yenileyin — bu sefer rengin maviye (class) döndüğünü gösterin.

## Uygulama 3 — "Okulum" Projesine İlk Harici CSS (30-35 dk)

**Amaç:** Gerçek projeye ilk kez harici bir `.css` dosyası bağlamak.

1. [`okulum/`](./okulum/) klasöründeki `index.html` ve `iletisim.html` dosyalarını açın — henüz stilsiz,
   düz metin hâlinde görünüyorlar.
2. `<head>` içine `<link rel="stylesheet" href="style.css">` satırının zaten eklendiğini gösterin, ama
   `style.css` dosyasının içeriğinin nasıl kurulduğunu birlikte inceleyin:
   - `*` evrensel seçicisiyle temel reset (`box-sizing`, `margin`, `padding` sıfırlama)
   - `body`, `h1`/`h2`/`h3`, `p`, `a`, `nav a`, `table`/`th`/`td`, `footer` seçicileriyle temel görünüm
3. Öğrencilerden kendi `okulum` klasörlerindeki (HTML5 ünitesinden kalan) sayfalarına aynı mantıkla bir
   `style.css` oluşturup bağlamalarını isteyin — [`okulum/style.css`](./okulum/style.css) referans alınabilir.
4. **Vurgulanacak nokta:** Bu hafta sadece "temel seçiciler + harici bağlama" öğretiyoruz. Kutu modeli
   (padding/border inceliği, flex ile yatay menü) Hafta 10'da, renk paleti ve tipografi Hafta 11'de
   eklenecek — projeye her hafta bir kat daha ekleyeceğiz.
