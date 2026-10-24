# Örnek Uygulama — Hafta 17: Diziler

## Uygulama 1 — "Kayıp Eleman": Off-by-One Hatası Avı (20 dk)

**Amaç:** Dizi sınırlarını aşmanın neden sessiz bir hataya (`undefined`) yol açtığını, sadece anlatarak
değil, **gerçek konsol çıktısında görerek** öğretmek.

1. [`kayip-eleman.html`](./kayip-eleman.html) dosyasını tarayıcıda açın, F12 ile geliştirici konsolunu
   gösterin.
2. Sayfadaki listenin ve konsol çıktısının **son satırının** `undefined` olduğunu birlikte fark edin.
3. Kodu VS Code'da açıp döngü koşulunu (`i <= ogrenciler.length`) inceleyin — "5 elemanlı bir dizide en
   büyük geçerli index kaçtır?" diye sorup öğrencilerin cevaplamasını bekleyin (cevap: 4).
4. `<=` işaretini `<` ile değiştirip kaydedin, tarayıcıyı yenileyin — `undefined` satırının kaybolduğunu
   gösterin.
5. Kendi çözümlerini [`kayip-eleman-cozum.html`](./kayip-eleman-cozum.html) ile karşılaştırabilirler.

## Uygulama 2 — Aynı İş, Üç Yöntem (15 dk)

[`donguler-karsilastirma.html`](./donguler-karsilastirma.html) dosyasını açın. Aynı `notlar` dizisinin
klasik `for`, `forEach()` ve `map()` ile nasıl üç farklı şekilde listeye dönüştürüldüğünü kod üzerinde
birlikte okuyun. Tartışma sorusu: "Bu üçünün sonucu aynı görünüyor, peki neden hepsini öğreniyoruz?"
(Cevap yönü: farklı projelerde/ekiplerde hepsiyle karşılaşacaksınız; `map` ayrıca yeni bir dizi de üretir.)

## Uygulama 3 — "Okulum" Projesi: Bölümler Listesini Diziye Taşıma (25 dk)

**Amaç:** Dizi kullanmanın gerçek bir projede ne işe yaradığını göstermek.

1. [`okulum-projesi/`](./okulum-projesi/) klasöründeki `index.html`, `style.css` ve `script.js`
   dosyalarını açın (bu klasör, önceki haftalarda büyütülen projenin bir örneğidir — kendi sınıfınızın
   gerçek projesi farklıysa onun üzerinde ilerleyin).
2. `index.html` içinde `<ul id="bolum-listesi"></ul>` etiketinin **boş** olduğuna, içeriğin HTML'de
   yazılmadığına dikkat çekin.
3. `script.js` dosyasındaki `bolumler` dizisini ve altındaki `forEach` bloğunu birlikte satır satır okuyun.
4. `index.html` dosyasını tarayıcıda açıp listenin **JavaScript tarafından üretildiğini** gösterin.
5. Öğrencilerden `bolumler` dizisine kendi hayali bir bölüm ismi eklemelerini (`push()` ile veya diziye
   elle yeni bir eleman yazarak) ve sayfayı yenileyip listenin otomatik güncellendiğini görmelerini isteyin.

> Bu üç uygulama, "index'i doğru kullan (Uygulama 1) → farklı gezinme yöntemlerini tanı (Uygulama 2) →
> gerçek bir projede diziyle veri üret (Uygulama 3)" ilerleyişini tamamlar.
