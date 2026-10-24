# Ödev — Hafta 18: Dönem Projesi Kapanışı

> Bu hafta, HTML5 ünitesinde (Hafta 8) başlattığınız ve CSS ünitesinde (Hafta 13) stillendirdiğiniz kendi
> web sitenize artık Javascript ile **etkileşim ve canlılık** kazandırıyoruz. Bu ödev, Hafta 3'ten beri
> yürüttüğünüz projenin bu dönem için **son teslimidir**.

## Görev 1 — Projenize Javascript Ekleyin

Kendi projenize (`script.js` adında yeni bir dosya oluşturup HTML sayfalarınıza bağlayarak) aşağıdaki
**üç özelliği** ekleyin. Örnek/ilham için derste birlikte geliştirdiğimiz
[`okulum-projesi/`](../02-Ornek-Uygulama/okulum-projesi/) klasörüne bakabilirsiniz — ama doğrudan
kopyalamak yerine **kendi projenizin içeriğine** uyarlayın.

- [ ] **Dizi tabanlı dinamik liste:** Sitenizde HTML'e elle yazılmış bir liste (menü, bölümler, ürünler,
      hobiler — projenize göre uygun neyse) bulun ve bunu bir JS dizisinden `forEach` (veya `for`) ile
      dinamik olarak ürettirin (bkz. Hafta 17).
- [ ] **Form doğrulama:** Sitenizde bir form varsa (yoksa basit bir iletişim formu ekleyin), gönderilmeden
      önce alanların boş olup olmadığını `if/else` ile kontrol edin ve kullanıcıya bir bildirim mesajı
      gösterin (bkz. Hafta 15-16).
- [ ] **Zamanlayıcı kullanımı:** `setTimeout` veya `setInterval` kullanan **en az bir** özellik ekleyin
      (örnekler: bildirimin birkaç saniye sonra kaybolması, canlı saat, kayan duyuru metni, otomatik
      slayt geçişi).

## Görev 2 — Kısa Bir "Proje Günlüğü" Yazın

Bir metin belgesinde şu soruları cevaplayın:
1. Projenize hangi 3 özelliği eklediniz, kısaca anlatın.
2. Geliştirirken karşılaştığınız EN ZOR nokta neydi, nasıl çözdünüz?
3. Hafta 3'te projeniz sadece boş bir HTML iskeletiydi. Şimdi geriye dönüp baktığınızda, projenizde en
   çok hangi özelliğiyle gurur duyuyorsunuz? Neden?

## Görev 3 — Kısa Cevaplı Sorular

1. `for` ile `while` döngüsü arasındaki fark nedir? Birer örnek durumla açıklayın.
2. Bir döngüde artırım (`i++` gibi) satırını unutursak ne olur?
3. `setTimeout` ile `setInterval` arasındaki fark nedir?
4. `setInterval`'i neden bazen `clearInterval` ile durdurmamız gerekir?
5. React, Vue, Angular gibi araçları bu derste neden kullanmadık, ne işe yararlar?

---

## Öğretmen İçin Değerlendirme Ölçütleri (Rubrik)

| Ölçüt | Puan |
|---|---|
| Görev 1 — dizi tabanlı dinamik liste doğru çalışıyor | 25 |
| Görev 1 — form doğrulama doğru çalışıyor (boş alan kontrolü + bildirim) | 25 |
| Görev 1 — en az bir zamanlayıcı (setTimeout/setInterval) doğru kullanılmış | 20 |
| Görev 2 — proje günlüğü 3 soru da düşünülerek, samimi şekilde cevaplanmış | 15 |
| Görev 3 — 5 soru da doğru ve kendi cümleleriyle cevaplanmış | 10 |
| Zamanında teslim | 5 |

**Not:** Bu ödev, tek doğru cevabı olan bir alıştırma değil, öğrencinin **kendi** projesi üzerinde
ilerlediği bir değerlendirmedir — bu yüzden ayrı bir "cevap anahtarı dosyası" yerine derste birlikte
geliştirilen [`okulum-projesi/`](../02-Ornek-Uygulama/okulum-projesi/) örnek referans olarak kullanılır.
Değerlendirme rehberi için bkz. [`cevap-anahtari/degerlendirme-notlari.md`](./cevap-anahtari/degerlendirme-notlari.md).
