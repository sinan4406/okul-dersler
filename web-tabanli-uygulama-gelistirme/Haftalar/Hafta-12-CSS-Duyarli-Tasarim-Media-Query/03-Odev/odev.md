# Ödev — Hafta 12: Duyarlı Tasarım ve Media Query

## Görev 1 — Hata Avcısı: Kütüphane Duyuru Sayfası

Ekteki [`kutuphane-bozuk.html`](./kutuphane-bozuk.html) dosyasını tarayıcıda açın, `Ctrl+Shift+M` ile mobil
görünüme geçin ve **3 hatayı** bulup düzeltin:

1. Sayfanın mobilde neden bu kadar küçük/uzak göründüğünü araştırın — head bölümünü kontrol edin.
2. Dar ekranda yatay kaydırma çubuğu neden çıkıyor? İçerik kutusunun genişlik ayarına bakın.
3. Yazı boyutunu mobilde küçültmesi beklenen media query çalışmıyor gibi görünüyor — Chrome DevTools'ta
   sağ paneldeki **Styles** sekmesini açıp o kuralın üzerinin çizili (geçersiz) olup olmadığını kontrol edin.
   **İpucu:** CSS'te söz dizimi (syntax) hataları, kuralın sessizce yok sayılmasına yol açar — hata mesajı
   çıkmaz, sadece "çalışmaz".

Bulduğunuz her hata için bir cümlelik açıklama yazın (ne yanlıştı, nasıl düzelttiniz) ve düzeltilmiş dosyayı
teslim edin.

## Görev 2 — Kendi Sayfanızı Duyarlı Hale Getirin

Daha önceki bir haftada (Hafta 3 ödevinde) hazırladığınız `hakkimda.html` sayfasını (veya elinizdeki başka
bir HTML sayfasını) alıp aşağıdakileri ekleyin:

- [ ] `<head>` içinde `meta viewport` satırının doğru olduğundan emin olun.
- [ ] Sayfadaki en az bir başlığa (`<h1>` veya `<h2>`) `clamp()` ile akıcı yazı boyutu verin.
- [ ] En az bir `@media (max-width: ...)` kuralı ekleyin (örn. dar ekranda arka plan rengini veya
      boşlukları değiştiren basit bir kural olabilir).
- [ ] DevTools ile mobil ve masaüstü görünümlerinin ekran görüntülerini alıp ikisini de teslimatınıza ekleyin.

## Görev 3 — Kısa Cevaplı Sorular

1. `max-width: 768px` ile `min-width: 768px` arasındaki fark nedir? Birer örnek senaryo yazın.
2. `meta viewport` etiketi olmasaydı mobilde ne görürdük? Neden?
3. `clamp()` fonksiyonunun 3 parametresi nedir, her biri ne işe yarar?
4. Sabit `px` genişlik yerine neden `max-width` + `%` tercih edilir?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — 3 hata da doğru tespit edilmiş ve düzeltilmiş | 35 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış, ekran görüntüleri eklenmiş | 40 |
| Görev 3 — 4 soru da doğru ve kendi cümleleriyle cevaplanmış | 20 |
| Zamanında teslim | 5 |

