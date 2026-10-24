# Örnek Uygulama — Hafta 18: Döngüler, Zamanlayıcılar ve Kütüphaneler

## Uygulama 1 — "Sonsuz Döngü Tuzağı": Kodu Çalıştırmadan Hata Bulma (20 dk)

**Amaç:** Bir sonsuz döngünün NEDEN oluştuğunu, riskli kodu gerçekten çalıştırmadan, sadece okuyarak analiz
ederek anlamak.

1. [`sonsuz-donguyu-bul.html`](./sonsuz-donguyu-bul.html) dosyasını tarayıcıda açın. Sayfadaki kodun **canlı
   bir script olmadığını, sadece metin olarak gösterildiğini** vurgulayın — bu dosyanın kendisi güvenlidir.
2. Öğrencilere kodu tek başlarına (veya ikili) inceletin, "hangi satır sorunlu, neden?" sorusuna yazılı
   cevap vermelerini isteyin.
3. Sınıfça tartışın: `sayi = 1` satırının döngünün her turunda `sayi` değişkenini SIFIRLADIĞINI, bu yüzden
   `sayi <= 5` koşulunun asla `false` olamayacağını birlikte çıkarın.
4. Düzeltilmiş ve **güvenle çalıştırılabilir** hâlini [`sonsuz-donguyu-cozum.html`](./sonsuz-donguyu-cozum.html)
   ile açıp gösterin — `sayi = 1` yerine `sayi = sayi + 1` kullanıldığını vurgulayın.

> **Güvenlik notu:** Öğrencilerin bu tür bir hatayı kendi kodlarında YANLIŞLIKLA yazıp çalıştırma ihtimaline
> karşı, "sekme kilitlenirse ne yapılır" konusuna kısaca değinin (sekmeyi kapatmak / tarayıcı görev
> yöneticisinden sonlandırmak).

## Uygulama 2 — Zamanlayıcı Demosu: setTimeout ve setInterval (20 dk)

1. [`zamanlayici-demo.html`](./zamanlayici-demo.html) dosyasını açın.
2. "Bildirim Gönder" düğmesine basıp 3 saniye sonra mesajın kendiliğinden kaybolduğunu birlikte gözlemleyin
   — bu `setTimeout` kullanımıdır.
3. "Sayacı Başlat" düğmesine basıp sayının her saniye arttığını gösterin — bu `setInterval`'dir.
4. "Sayacı Durdur" düğmesine basıp sayının artık artmadığını gösterin — bu `clearInterval`'dir. Durdurmadan
   sayfadan ayrılırsanız zamanlayıcının arka planda çalışmaya devam edeceğini (kaynak israfı) vurgulayın.

## Uygulama 3 — "Okulum" Projesi: Canlı Saat ve Otomatik Kaybolan Bildirim (25 dk)

**Amaç:** Bu dönem boyunca (Hafta 3'ten beri) büyütülen projeyi, zamanlayıcılarla son kez geliştirip
kapanışını yapmak.

1. [`okulum-projesi/`](./okulum-projesi/) klasöründeki dosyaları açın (Hafta 17'deki projenin devamıdır —
   kendi sınıfınızın gerçek projesi farklıysa onun üzerinde ilerleyin).
2. `index.html`'deki `<div id="canli-saat">` elemanını, `script.js`'deki `setInterval(saatiGuncelle, 1000)`
   satırıyla birlikte inceleyin; sayfayı açıp saatin gerçekten her saniye güncellendiğini gösterin.
3. `iletisim.html`'i açıp formu doldurup gönderin; "Mesajınız alındı" bildiriminin birkaç saniye sonra
   kendiliğinden kaybolduğunu (`script.js`'teki `setTimeout` bloğu) birlikte gözlemleyin.
4. Kapanış tartışması: "Hafta 3'te bu proje sadece boş bir iskeletti (`<body></body>`) — şimdi elinizde
   gezinme menüsü, dinamik liste, doğrulanan bir form ve canlı bir saat olan gerçek bir web sitesi var.
   Bunların hepsini siz, adım adım, hafta hafta inşa ettiniz."

> Bu üç uygulama, ünitenin kapanışını temsil eder: **riskli bir hatayı güvenle analiz et (Uygulama 1) →
> zamanlayıcı araçlarını dene (Uygulama 2) → gerçek projede birleştir (Uygulama 3).** Ödevde (bkz.
> `03-Odev/odev.md`) öğrenciler kendi projelerini benzer şekilde tamamlayacaklar.
