# Örnek Uygulama — Hafta 15: Olaylar ve Fonksiyonlar

## Uygulama 1 — "Butonum Neden Çalışmıyor?" Bug Avı (25 dk)

**Amaç:** `<script>` etiketinin konumunun neden önemli olduğunu — sadece "kural" olarak değil, **gerçek bir
hatayı canlı yaşayarak** — göstermek.

1. [`buton-calismiyor.html`](./buton-calismiyor.html) dosyasını açın, konsolu (F12) açık tutun, sayfayı
   yenileyin (F5).
2. Konsolda kırmızı bir hata görünecek: `Cannot read properties of null (reading 'addEventListener')`.
   Öğrencilere sorun: "null ne demek? Bilgisayar burada neyi bulamadı?"
3. Kodu birlikte inceleyin: `<script>`, `<head>` içinde ve `document.querySelector("#tikla-btn")` çalıştığı
   an, `<body>` içindeki buton **henüz tarayıcı tarafından okunmamış**. Yani `btn` değişkeni `null` olur,
   `null.addEventListener(...)` da hata verir.
4. İki farklı çözümü birlikte inceleyin:
   - [`buton-calisiyor-cozum1.html`](./buton-calisiyor-cozum1.html) — script'i `</body>`'nin hemen öncesine
     taşımak (Hafta 14'ten beri kullandığımız alışkanlık).
   - [`buton-calisiyor-cozum2.html`](./buton-calisiyor-cozum2.html) — script `<head>`'te kalsa bile
     `DOMContentLoaded` olayını dinleyerek "sayfa hazır olana kadar bekle" demek.
5. **Tartışma:** "Hangi çözümü tercih ederiz, neden?" (Bu derste 1. yöntemi standart olarak kullanacağız
   çünkü daha basit; ama büyük projelerde script `<head>`'te kalmak zorunda olabilir, o zaman
   `DOMContentLoaded` gerekir.)

## Uygulama 2 — Olay Dinleme Yöntemleri: Eski / Yeni (10 dk)

Sunumdaki karşılaştırmayı (satır içi `onclick="..."` vs `addEventListener`) tahtada tekrar tartışın.
Öğrencilerden `buton-calismiyor.html` çözümündeki `addEventListener` satırını, hayali bir
`onclick="alert('Tıklandı!')"` ile karşılaştırmalarını isteyin: "İkisi de çalışır, ama hangisi HTML ile
JS'i daha az karıştırır?"

## Uygulama 3 — "Okulum" Projesine Fonksiyon ve Olay Ekleme (30 dk)

1. [`iletisim.html`](./iletisim.html), [`index.html`](./index.html), [`style.css`](./style.css) — Hafta
   14'ten devam eden proje dosyaları (bkz. Hafta 14 öğretmen notu — bunlar varsayımsal bir devamdır,
   sınıfınızın gerçek dosyalarıyla değiştirebilirsiniz).
2. [`script.js`](./script.js) dosyasını birlikte inceleyin:
   - `geriBildirimGoster()` adında **kendi yazdığımız ilk fonksiyon** — parametrelerini (`kutu`, `tur`,
     `metin`) tahtada tek tek açıklayın.
   - `iletisimFormu.addEventListener("submit", function (e) { ... })` — form gönderildiğinde çalışacak
     olay dinleyicisi.
   - `e.preventDefault()` satırını mutlaka vurgulayın: "Bu satır olmasaydı, tarayıcı formu gönderir göndermez
     sayfayı yeniden yükler ve yazdığımız her şey kaybolurdu."
3. `iletisim.html`'i tarayıcıda açın, formu doldurup "Gönder"e basın — yeşil "Mesajınız alındı" kutusunun
   göründüğünü ve sayfanın **yenilenmediğini** birlikte gözlemleyin.
4. **Neden `if (iletisimFormu) { ... }` var?** Aynı `script.js` dosyası hem `index.html`'e hem
   `iletisim.html`'e bağlı. `index.html`'de iletişim formu olmadığı için, bu kontrol olmasaydı
   `index.html` açıldığında yine "null" hatası alırdık. Bu, Uygulama 1'de öğrendiğimiz dersin doğrudan
   bir uygulamasıdır — aynı hatayı önceden görmüş olmak burada işe yaradı.

> Bir sonraki hafta (Hafta 16), bu form gönderilmeden önce **if/else ile alan kontrolü** (boş alan var mı,
> e-posta doğru formatta mı) ekleyeceğiz.
