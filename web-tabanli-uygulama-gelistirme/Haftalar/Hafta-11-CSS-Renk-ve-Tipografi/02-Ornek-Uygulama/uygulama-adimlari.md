# Örnek Uygulama — Hafta 11: Renk Kullanımı ve Tipografi

## Uygulama 1 — Bir Rengi Kaç Yerde Değiştirmeniz Gerekir? (20 dk)

**Amaç:** CSS özel değişkenlerinin (custom properties) "havalı bir özellik" değil, gerçek bir bakım kolaylığı
aracı olduğunu göstermek.

1. [`renk-degiskeni-demo.html`](./renk-degiskeni-demo.html) dosyasını tarayıcıda açın — iki panelde de
   5'er turuncu kutu göreceksiniz, görsel olarak aynı.
2. Kodu inceleyin: üstteki panel aynı `#ff6600` değerini **5 kere elle** tekrarlıyor, alttaki panel ise
   tek bir `:root { --marka-rengi: #ff6600; }` tanımlayıp her yerde `var(--marka-rengi)` okuyor.
3. **Canlı deney:** `--marka-rengi` değerini `#2e7d32` (yeşil) yapıp kaydedin — sadece alt panelin
   değiştiğini, üst panelin turuncu kaldığını gösterin.
4. Tartışma: "50 sayfalık bir sitede marka renginizi değiştirmeniz istense, hangi yöntemi tercih ederdiniz?"

## Uygulama 2 — Düşük Kontrast Sorunu (15 dk)

1. [`kontrast-demo.html`](./kontrast-demo.html) dosyasını açın — üstteki kutudaki yazının okunmasının ne
   kadar zor olduğunu gösterin.
2. Erişilebilirlik kavramını tanıtın: renk seçimi sadece estetik değil, **herkesin** içeriği okuyabilmesiyle
   ilgilidir (görme zorluğu olan kullanıcılar, parlak ışıkta telefon kullananlar, vb.).
3. WCAG'in önerdiği minimum 4.5:1 kontrast oranından kısaca bahsedin — ayrıntıya girmeyin, farkındalık
   yeterli.

## Uygulama 3 — "Okulum" Projesine Renk Paleti ve Tipografi (30-35 dk)

**Amaç:** Bu haftaki kavramları gerçek projeye, kalıcı olarak uygulamak — bu, HTML5+CSS ünitesinin
**son** eklemesi olacak.

1. [`okulum/`](./okulum/) klasöründeki güncellenmiş [`style.css`](./okulum/style.css) dosyasını açın —
   en üstte eklenen `:root` bloğunu inceleyin:
   ```css
   :root {
     --ana-renk: #1a5fb4;
     --ikincil-renk: #f2a154;
     --arkaplan: #ffffff;
     --yazi-rengi: #222222;
     --acik-gri: #f2f2f2;
   }
   ```
2. Bu değişkenlerin `header`, `nav a:hover`, `th`, `footer a` gibi birçok yerde nasıl kullanıldığını
   gösterin. `--ana-renk` değerini değiştirip tüm sitenin marka renginin nasıl anında değiştiğini canlı
   gösterin.
3. `index.html` / `iletisim.html`'in `<head>` kısmına eklenen Google Fonts bağlantısını inceleyin
   (`Poppins` başlıklar için, `Inter` gövde metni için) — `style.css`'teki `font-family` satırlarıyla
   eşleştirin.
4. Öğrencilerden kendi `okulum` projelerine benzer bir renk paleti ve font seçimi uygulamalarını isteyin —
   kendi okul renklerini (varsa) veya kendi seçtikleri bir marka rengini kullanabilirler.

> **Öğretmen notu:** Bu, HTML5 ve CSS ünitelerinin ortak "Okulum" projesinin son durağıdır. Bir sonraki
> hafta (Hafta 12 — Duyarlı Tasarım) media query eklenerek proje mobil uyumlu hâle getirilecek, Hafta 13'te
> ise CSS framework'leri tanıtılacaktır.
