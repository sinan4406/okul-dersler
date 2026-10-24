# Örnek Uygulama — Hafta 5: Yerleşim (Layout) Elemanları

## Uygulama 1 — "Div Çorbası"nı Semantik Hâle Getirme (25-30 dk)

**Amaç:** Öğrencilerin sadece `<div>` ile yazılmış anlamsız bir sayfayı, doğru semantik etiketlere
dönüştürebilmesi (refactor egzersizi).

1. [`div-corbasi.html`](./div-corbasi.html) dosyasını tarayıcıda açın — sayfa görsel olarak (stil
   verilmediği için) sade görünür, ama **hiçbir görsel sorun yoktur**. Vurgu: "Bu sayfanın sorunu gözle
   görünmüyor, kodun kendisinde."
2. Dosyayı VS Code'da açın. Öğrencilerden her `<div class="...">` için şunu sormalarını isteyin: "Bu
   hangi semantik etikete karşılık geliyor?" (`class` isimleri ipucu olarak bırakılmıştır: `ust-kisim`,
   `menu`, `icerik`, `haber`, `kenar`, `alt-kisim`)
3. Öğrenciler her div'i uygun semantik etikete dönüştürsün:
   - `ust-kisim` → `<header>`
   - `menu` → `<nav>`
   - `icerik` → `<main>` (içindeki tekrar eden `haber` grubu bir `<section>`, her haberin kendisi
     bir `<article>` olabilir — "her haberi tek başına başka bir siteye kopyalasak anlamlı olur mu?"
     sorusunu sordurun)
   - `kenar` → `<aside>`
   - `alt-kisim` → `<footer>`
4. Sonucu [`div-corbasi-cozum.html`](./div-corbasi-cozum.html) ile karşılaştırın.

> **Öğretmen notu:** Bazı öğrenciler `icerik` div'ini doğrudan `<main>` yapıp içindeki `haber` div'lerini
> `<section>` yapmayı unutabilir. Her iki yaklaşım da (article kullanılmış/kullanılmamış) tartışmaya
> açıktır — önemli olan öğrencinin seçimini gerekçelendirebilmesidir.

## Uygulama 2 — "Okulum" Projesini Semantik Hâle Getirme (25-30 dk)

**Amaç:** Hafta 4'te düz başlık/paragraf/liste/tablo ile yazılan içeriği, bu hafta öğrenilen semantik
etiketlerle yeniden yapılandırmak.

1. `okulum` klasöründeki `index.html` dosyasını (Hafta 4'ten kalan hâli) açın.
2. Sırasıyla birlikte dönüştürün:
   - Okul adı (`h1`) ve varsa gezinme bağlantılarını `<header>` içine alın, bağlantı listesini `<nav>`
     ile sarın.
   - "Hakkımızda", "Bölümlerimiz", "Haftalık Ders Programı" başlıklarının her birini birer `<section>`
     yapın, hepsini bir `<main>` içine alın.
   - Eğer bir "Duyurular" kısmı eklemek isterseniz (isteğe bağlı, önerilir) bunu `<aside>` içine koyun.
   - İletişim/telif hakkı bilgisini `<footer>` içine alın.
3. Sonucu [`okulum-iskelet.html`](./okulum-iskelet.html) dosyasıyla karşılaştırın.

> Bu proje bir sonraki hafta (Hafta 6) medya elemanlarıyla (logo görseli, tanıtım videosu) zenginleştirilecek.
