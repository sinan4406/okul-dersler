# Ödev — Hafta 16: Kontrol Yapıları

## Görev 1 — Bilet Fiyatı Hesaplayıcısını Onarın (Kod Tamamlama)

[`yas-kontrol.html`](./yas-kontrol.html) dosyasını açın, konsolu (F12) açık tutun. Bağlı olan
[`bozuk-yas-kontrol.js`](./bozuk-yas-kontrol.js) dosyasında **4 hata** var. Doğru fiyatlandırma şöyle
olmalı:

| Yaş Aralığı | Fiyat |
|---|---|
| 0-6 | Ücretsiz (0 TL) |
| 7-17 | 50 TL |
| 18-64 | 100 TL |
| 65 ve üzeri | 40 TL |

**Yapmanız gerekenler:**
1. Sayfayı açıp farklı yaşlar deneyin (örn. 5, 10, 30, 65, 70) — hangi yaşlarda yanlış fiyat çıktığını
   not edin.
2. `bozuk-yas-kontrol.js` dosyasını satır satır inceleyin — bu hafta işlediğimiz konuları (karşılaştırma
   operatörleri, `if/else if`, doğru koşul yazımı) tek tek kontrol edin.
3. Bulduğunuz her hatayı bir liste hâlinde yazın.
4. Hataları düzeltip **tüm yaş aralıklarını** (özellikle sınır değerleri 6, 7, 17, 18, 64, 65'i) tekrar
   test edip doğru fiyat çıktığını doğrulayın.

> **İpucu:** Hatalardan biri, bir `if` koşulunun içinde karşılaştırma yerine yanlışlıkla **atama**
> (`=`) kullanılmasından kaynaklanıyor — bu, gerçek hayatta yazılımcıların en sık yaptığı hatalardan
> biridir ve fark edilmesi zordur, dikkatlice bakın.

## Görev 2 — Not Harfe Çevirici

`not-hesapla.html` ve `not-hesapla.js` adında yeni dosyalar oluşturun. Kullanıcının bir not (0-100 arası
sayı) girmesini sağlayan bir input ve bir buton olsun. Aşağıdaki kurallara göre notu harfe çeviren bir
fonksiyon yazın:

- [ ] 85-100 → "AA", 70-84 → "BA", 55-69 → "CB", 40-54 → "DC", 0-39 → "FF"
- [ ] `if / else if / else` kullanın (bu görevde `switch` **uygun değildir**, çünkü aralık kontrolü
      gerekiyor — sunumdaki "if/else yığını mı, switch mi?" bölümünü hatırlayın).
- [ ] Kullanıcı 100'den büyük veya 0'dan küçük bir değer girerse "Geçersiz not!" uyarısı gösterin.
- [ ] Sonucu hem `console.log` ile hem de sayfada bir elemanın içine yazdırın.

## Görev 3 — Kısa Cevaplı Sorular

1. `==` ile `===` arasındaki fark nedir? Bir örnek vererek `==`'nin neden bazen yanıltıcı olabileceğini açıklayın.
2. `if` koşulunun içine yanlışlıkla `=` (tek eşittir) yazarsak ne olur? Neden bu hata fark edilmesi zor bir hatadır?
3. Ard arda yazılan bağımsız `if` blokları ile `if / else if` zinciri arasındaki fark nedir? Bir örnekle açıklayın.
4. `switch` ifadesi ne zaman `if/else`'e göre daha uygun bir tercihtir?
5. Ternary (üçlü) operatörü ne zaman kullanmalıyız, ne zaman kullanmamalıyız?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — 4 hata da doğru tespit edilmiş ve düzeltilmiş, tüm sınır değerler doğru çalışıyor | 35 |
| Görev 2 — if/else if doğru kurulmuş, tüm not aralıkları ve geçersiz durum doğru çalışıyor | 40 |
| Görev 3 — 5 soru da kendi cümleleriyle, doğru anlaşılmış şekilde cevaplanmış | 20 |
| Zamanında teslim | 5 |

