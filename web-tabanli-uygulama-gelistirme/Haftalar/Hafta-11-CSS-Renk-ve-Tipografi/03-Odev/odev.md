# Ödev — Hafta 11: Renk Kullanımı ve Tipografi

## Görev 1 — Renk Tekrarını Değişkene Dönüştürün

[`tema-donusumu.html`](./tema-donusumu.html) dosyasını açın. İçindeki `<style>` bloğunda `#7b2cbf` renk
değeri **5 farklı yerde** elle tekrar tekrar yazılmış.

1. `:root { --marka-rengi: #7b2cbf; }` şeklinde bir CSS özel değişkeni tanımlayın.
2. `#7b2cbf` geçen **5 satırın tamamını** `var(--marka-rengi)` kullanacak şekilde güncelleyin.
3. Sayfayı tarayıcıda açıp görünümün **hiç değişmediğini** doğrulayın (bu normaldir — henüz sadece
   kodun yapısını iyileştirdiniz).
4. Şimdi sadece `--marka-rengi` değerini `#0d7a5f` (yeşil) olarak değiştirin ve kaydedin. Sayfadaki
   **5 elemanın da** aynı anda yeşile döndüğünü ekran görüntüsüyle kanıtlayın.

## Görev 2 — Kendi Renk Paletiniz ve Yazı Tipiniz

Hafta 9-10'da oluşturduğunuz `hakkimda.html` (veya `favori-oyunlar.html`) dosyanızı alıp aşağıdaki
gereksinimleri sağlayacak şekilde güncelleyin:

- [ ] `:root` içinde en az **3 renk değişkeni** tanımlanmış (örn. `--ana-renk`, `--ikincil-renk`,
      `--arkaplan`) ve sayfanın tamamı bu değişkenleri kullanıyor (hiçbir yerde HEX kodu doğrudan
      tekrar yazılmamış).
- [ ] [fonts.google.com](https://fonts.google.com) üzerinden seçtiğiniz bir font, `<link>` ile eklenmiş
      ve `font-family` ile kullanılmış.
- [ ] Metin ve zemin renkleri arasında **yeterli kontrast** var — açık renk üzerine açık renk yazı
      kullanılmamış (dersteki kontrast demosunu hatırlayın).
- [ ] `body` için `line-height` en az `1.5` olarak ayarlanmış.

## Görev 3 — Kısa Cevaplı Sorular

1. CSS özel değişkeni (custom property) nedir, `:root` içinde tanımlamanın avantajı nedir?
2. Neden düşük kontrastlı renk kombinasyonları (örn. açık gri yazı, beyaz zemin) bir erişilebilirlik
   sorunudur?
3. Google Fonts kullanmanın, sadece sistem fontlarını (Arial, Verdana) kullanmaya göre avantajı nedir?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — değişken doğru tanımlanmış, 5 kullanım da güncellenmiş, tema değişimi kanıtlanmış | 35 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış | 40 |
| Görev 3 — 3 soru da doğru ve kendi cümleleriyle cevaplanmış | 20 |
| Zamanında teslim | 5 |

