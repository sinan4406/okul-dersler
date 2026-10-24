# Ödev — Hafta 10: Kutu Modeli (Box Model) ve Pozisyonlama

## Görev 1 — Neden Kartlarım Taşıyor?

[`kart-listesi.html`](./kart-listesi.html) dosyasını tarayıcıda açın. Kapsayıcı `display: flex` olduğu
hâlde 3 kart yan yana **sığmıyor**, alt satıra kayıyor ve kesikli çerçeveyi taşıyor.

1. Dosyayı VS Code'da açıp `.kart` kuralını inceleyin: `width: 33%` verilmiş, ayrıca `padding: 16px` ve
   `border: 3px` de var.
2. Bu hafta öğrendiğiniz kavramı kullanarak (ipucu: derste yaptığımız "Neden Kutularım Taşıyor?" demosunu
   hatırlayın) **tek bir satır CSS ekleyerek** sorunu çözün.
3. Çözümden sonra üç kartın da kesikli çerçevenin içinde, yan yana durduğunu doğrulayın.
4. Neden bu tek satırın sorunu çözdüğünü, 2-3 cümleyle kendi kelimelerinizle açıklayın (rakamlarla
   hesaplama yaparak açıklarsanız daha iyi olur).

## Görev 2 — Kendi Kart Düzeninizi Kurun

Sıfırdan yeni bir `favori-oyunlar.html` dosyası oluşturun. İçinde en sevdiğiniz 3-4 oyun/hobi/dizi/kitabı
tanıtan kartlar bulunsun. Gereksinimler:

- [ ] Kartları saran bir kapsayıcı `display: flex` ve `gap` kullanıyor.
- [ ] Her kartta `padding` ve `border` var, ve **tüm sayfada** `box-sizing: border-box` uygulanmış
      (örn. `* { box-sizing: border-box; }` ile).
- [ ] Her kartın bir başlığı (`<h3>` gibi) ve en az bir paragrafı var.
- [ ] Sayfanın en üstünde, `position: sticky` ile kaydırınca sabit kalan bir başlık (`<header>`) var.

## Görev 3 — Kısa Cevaplı Sorular

1. `box-sizing: border-box` ne işe yarar? Bu olmadan neden kutular beklenmedik şekilde taşabilir?
2. `display: flex` verilen bir kapsayıcının içindeki elemanlara ne olur?
3. `position: sticky` ile `position: fixed` arasındaki fark nedir?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — sorun doğru tespit edilmiş, tek satırla çözülmüş, açıklama doğru | 30 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış, sayfa düzgün görünüyor | 45 |
| Görev 3 — 3 soru da doğru ve kendi cümleleriyle cevaplanmış | 20 |
| Zamanında teslim | 5 |

