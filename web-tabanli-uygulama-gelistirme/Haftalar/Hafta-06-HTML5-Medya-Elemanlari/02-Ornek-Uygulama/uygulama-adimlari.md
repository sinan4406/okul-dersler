# Örnek Uygulama — Hafta 6: Medya Elemanları

## Uygulama 1 — Kırık Görsel Avı (20 dk)

**Amaç:** `alt` özniteliğinin sadece "iyi bir alışkanlık" değil, gerçek bir hata durumunda işe yarayan bir
güvenlik ağı olduğunu canlı olarak göstermek.

1. [`kirik-gorsel-avi.html`](./kirik-gorsel-avi.html) dosyasını tarayıcıda açın. Görsel yüklenmez, yerine
   kırık görsel simgesi ve `alt` metni görünür.
2. Öğrencilerden VS Code'da dosyayı ve `gorseller/` klasörünü incelemelerini isteyin — klasörde
   `okul-logo.svg` dosyası olduğunu ama kodun `okul-logo.jpg` aradığını fark etmeliler.
3. Hatayı (yanlış dosya uzantısı) düzeltip `.svg` yapmalarını isteyin, tarayıcıyı yenileyip görselin
   çıktığını görün.
4. Çözüm dosyasıyla karşılaştırın: [`kirik-gorsel-avi-cozum.html`](./kirik-gorsel-avi-cozum.html).

> **Öğretmen notu:** Bu, gerçek geliştiricilerin en sık yaptığı hatalardan biridir (yanlış dosya adı/yolu/
> uzantı). `alt` metninin, kullanıcının "ne kaybettiğini" anlamasını sağladığını vurgulayın — kırık görsel
> tek başına hiçbir bilgi vermez.

## Uygulama 2 — "Okulum" Projesine Medya Ekleme (30-35 dk)

**Amaç:** Metin ağırlıklı sayfaya görsel/video içerik eklemek, her adımda erişilebilirlik kurallarına
(alt, loading, track) uymak.

1. `okulum` klasörünüze bir `gorseller/` alt klasörü oluşturun (bu klasördeki SVG dosyalarını örnek
   olarak kopyalayabilirsiniz: `okul-logo.svg`, `sinif.svg`, `kutuphane.svg`, `video-kapak.svg`).
2. `<header>` içine, okul adının yanına logo ekleyin: `<img src="gorseller/okul-logo.svg" alt="..." width="60" height="60" loading="lazy">`.
3. "Tanıtım Videomuz" başlıklı yeni bir `<section>` ekleyin; gerçek bir video dosyanız olmadığı için
   `<video controls poster="gorseller/video-kapak.svg">` kullanıp içine bir yorum satırıyla "gerçek video
   eklenecek" notu bırakın.
4. "Okulumuzdan Kareler" başlıklı bir `<section>` ile en az 2 görselden oluşan küçük bir galeri ekleyin —
   her görselde `alt`, `width`/`height` ve `loading="lazy"` olmalı.
5. Sonucu [`okulum-iskelet.html`](./okulum-iskelet.html) dosyasıyla karşılaştırın.

> **Not:** Bu derste kullandığımız görseller basit SVG dosyalarıdır (gerçek fotoğraf yerine) — amaç,
> `<img>`/`<video>` etiketlerinin doğru kullanımını öğrenmektir, görsellerin kaynağı önemli değildir.
