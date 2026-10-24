# CSS Ünitesi Özet Kontrol Listesi (Hafta 9-13)

Bu liste, CSS ünitesi boyunca öğrenilen tüm konuları tek bir yerde toplar. Hafta 13'te, öğrenciler kendi
"Okulum" stilini (veya ödevdeki kendi sitelerini) gözden geçirirken bu listeyi bir **kendi kendini
değerlendirme aracı** olarak kullanabilir.

## Hafta 9 — CSS'e Giriş, Ekleme Yöntemleri ve Seçiciler
- [ ] CSS'in ne işe yaradığını (görünüm/stil) açıklayabiliyorum.
- [ ] Satır içi (inline), dahili (internal, `<style>`) ve harici (external, `.css` dosyası) ekleme
      yöntemlerinin farkını biliyorum ve **harici** yöntemi tercih ediyorum.
- [ ] Eleman seçici (`p`), sınıf seçici (`.kart`) ve id seçici (`#logo`) arasındaki farkı biliyorum.

## Hafta 10 — Kutu Modeli (Box Model) ve Pozisyonlama
- [ ] `content`, `padding`, `border`, `margin` sıralamasını (içten dışa) açıklayabiliyorum.
- [ ] `box-sizing: border-box` kullanmanın neden önerildiğini biliyorum.
- [ ] `display: flex` ile temel bir yan yana/alt alta düzen kurabiliyorum.

## Hafta 11 — Renk Kullanımı ve Tipografi
- [ ] Renkleri en az 2 farklı yöntemle (isim, hex, `rgb()`/`hsl()`) tanımlayabiliyorum.
- [ ] CSS özel değişkenlerini (`--renk-birincil` gibi) tanımlayıp `var()` ile kullanabiliyorum.
- [ ] `font-family`, `font-size`, `line-height` ile temel bir tipografi hiyerarşisi kurabiliyorum.

## Hafta 12 — Duyarlı (Responsive) Tasarım ve Media Query
- [ ] `<meta name="viewport">` satırının neden zorunlu olduğunu açıklayabiliyorum.
- [ ] Sabit `px` genişlik yerine `max-width` + `%`/`vw` kullanabiliyorum.
- [ ] `@media (max-width: ...)` ile en az bir duyarlı kural yazabiliyorum; `max-width`/`min-width` yönünü
      karıştırmıyorum.
- [ ] `clamp()` ile akıcı bir boyutlandırma örneği yazabiliyorum.

## Hafta 13 — CSS Framework'leri
- [ ] Bir CSS framework'ünün ne işe yaradığını ve ne zaman tercih edileceğini açıklayabiliyorum.
- [ ] Bootstrap'i CDN ile bir sayfaya ekleyip en az bir hazır bileşen (kart, buton, grid) kullanabiliyorum.

## Genel Kalite Kontrolü (Herhangi Bir Proje İçin)
- [ ] CSS dosyası, HTML içine gömülü değil, **ayrı bir `.css` dosyasında**.
- [ ] Renk/boşluk değerleri tekrar tekrar yazılmak yerine CSS değişkenleriyle yönetiliyor.
- [ ] Sayfa, hem masaüstü hem mobil genişlikte (`Ctrl+Shift+M`) test edildi.
- [ ] Görsellerde `max-width: 100%; height: auto;` kuralı var.
