# Örnek Uygulama — Hafta 10: Kutu Modeli (Box Model) ve Pozisyonlama

## Uygulama 1 — "Neden Kutularım Taşıyor?" (20 dk)

**Amaç:** `box-sizing: border-box`'ın soyut bir kural değil, gerçek bir hizalama sorununu çözdüğünü canlı
göstermek.

1. [`kutu-tasmasi-demo.html`](./kutu-tasmasi-demo.html) dosyasını tarayıcıda açın — üstteki kırmızı kutunun
   kesikli çerçeveyi taştığını, alttaki yeşil kutunun tam sığdığını gösterin.
2. Kodu inceleyin: iki kutuya da **birebir aynı** `width: 280px` verilmiş. Tek fark `.kutu-yeni`'de
   `box-sizing: border-box` olması.
3. Tahtaya matematiği yazın: `280px (içerik) + 20px×2 (padding) + 4px×2 (border) = 328px` → 300px'lik
   çerçeveyi taşar. `border-box` ile `width` artık padding+border'ı da içine alır, toplam tam 280px kalır.
4. **Deney:** `.kutu-eski` kuralına da `box-sizing: border-box;` ekleyip kaydedin, kutunun artık taşmadığını
   gösterin.

## Uygulama 2 — display: flex Öncesi / Sonrası (15 dk)

1. [`flex-oncesi-sonrasi.html`](./flex-oncesi-sonrasi.html) dosyasını açın — aynı 4 bağlantının önce alt
   alta, sonra yan yana dizildiğini gösterin.
2. Kodu inceleyip **tek satırlık fark**ı (`display: flex;`) bulmalarını isteyin.
3. `gap` özelliğinin ne işe yaradığını (elemanlar arası boşluk, `margin` ayarlamaya gerek kalmadan) vurgulayın.

## Uygulama 3 — "Okulum" Projesine Kutu Modeli ve Yerleşim (30-35 dk)

**Amaç:** Bu haftaki kavramları gerçek projeye uygulamak.

1. [`okulum/`](./okulum/) klasöründeki güncellenmiş [`style.css`](./okulum/style.css) dosyasını açın —
   Hafta 9'daki hâlinden farkını birlikte inceleyin:
   - `header`'a `padding`, `border-bottom`, `position: sticky; top: 0;` eklendi — sayfa kaydırılsa bile
     başlık üstte sabit kalıyor.
   - `nav`'a `display: flex; gap: 18px;` eklendi — menü artık yatay diziliyor.
   - `section`'lara `border` ve `border-radius` eklendi — kutu modelinin gerçek projede nasıl göründüğünü
     gösteriyor.
2. `index.html` ve `iletisim.html`'i tarayıcıda açıp sayfayı kaydırarak header'ın sabit kaldığını gösterin.
3. Öğrencilerden kendi `okulum` projelerine aynı değişiklikleri (box-sizing her yerde, nav flex, header
   sticky) uygulamalarını isteyin.

> **Öğretmen notu:** `position: sticky` derste sadece "header'ı üstte sabit tutmak" bağlamında kısaca
> gösterilir; `position: absolute`/`relative`/`fixed` arasındaki tüm farkları bu hafta derinlemesine
> işlemeyin — amaç, öğrencinin "böyle bir şey var, işe yarıyor" farkındalığını kazanmasıdır.
