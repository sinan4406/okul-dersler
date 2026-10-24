# Güncel Konular ve Kaynaklar (Öğretmen İçin)

Bu not, resmi ders kitabının (2020 basımı) üzerinden geçen süre içinde web teknolojilerinde yaşanan güncel gelişmeleri özetler. Her haftanın kendi README dosyasında da o haftaya özel kısa bir güncel not bulunur; burada konular ünite bazında toplu olarak listelenmiştir.

## 1 - Temel Kavramlar

**Hafta 1 — Web ve Yazılımcılık Temel Kavramları:** Güncel hosting seçenekleri (Vercel, Netlify, GitHub Pages, bulut sağlayıcılar - Azure/AWS), Jamstack yaklaşımı, no-code/low-code araçların yükselişi ve AI destekli kod editörlerinin (GitHub Copilot, Cursor vb.) front-end/back-end/full-stack rollerini nasıl dönüştürdüğü.

## 1 - Web Tasarım İlkeleri

**Hafta 2 — Web Tasarım İlkeleri:** Erişilebilirlik standartları (WCAG 2.2), mobile-first tasarım yaklaşımı, Core Web Vitals ve sayfa performansının SEO'ya etkisi, karanlık mod (dark mode) desteği, tasarım sistemleri (design system) ve Figma gibi işbirlikçi tasarım araçları.

## HTML5

**Hafta 3 — HTML5'e Giriş ve Belge Yapısı:** Modern meta etiketleri (viewport, charset=utf-8, Open Graph/SEO meta etiketleri), VS Code + Emmet ile hızlı HTML yazımı, erişilebilirlik için lang ve alt gibi temel özniteliklerin önemi.

**Hafta 4 — Başlıklar, Metin Biçimlendirme, Listeler ve Tablolar:** Semantik başlık hiyerarşisinin SEO ve erişilebilirlik (screen reader) açısından önemi; <mark>, <time>, <abbr> gibi az bilinen semantik metin etiketleri.

**Hafta 5 — Yerleşim (Layout) Elemanları:** Semantik HTML5 etiketlerinin (header/nav/main/section/article/aside/footer) div çorbası yerine tercih edilmesi; <template> ve <slot> ile yeniden kullanılabilir bileşen mantığına giriş (Web Components'e ön hazırlık).

**Hafta 6 — Medya Elemanları: Resim, Ses ve Video:** loading="lazy" ile tembel yükleme, <picture> ve srcset ile duyarlı (responsive) görseller, modern görsel formatları (WebP/AVIF), video/ses etiketlerinde erişilebilirlik (altyazı/track etiketi).

**Hafta 7 — Bağlantı (Köprü) Elemanları:** target="_blank" ile rel="noopener noreferrer" güvenlik gerekliliği, çapa (anchor) bağlantılarla sayfa içi gezinme, site haritası (sitemap.xml) ve SEO ilişkisi.

**Hafta 8 — Form Elemanları ve HTML5 Ünite Değerlendirmesi:** HTML5'in yeni input tipleri (email, tel, date, number, range, color), yerleşik istemci taraflı doğrulama öznitelikleri (required, pattern, min/max), erişilebilir form etiketleme (<label for>).

## CSS (Basamaklı Stil Şablonu)

**Hafta 9 — CSS'e Giriş, Ekleme Yöntemleri ve Seçiciler:** CSS ekleme yöntemlerinde harici (external) dosya kullanımının bakım/performans avantajı; modern seçiciler (:is(), :where(), :has()) ile daha az kod tekrarı.

**Hafta 10 — Kutu Modeli (Box Model) ve Pozisyonlama:** box-sizing: border-box modern standart yaklaşımı, Flexbox ve CSS Grid ile klasık float tabanlı yerleşimin yerini alması, gap özelliğinin kullanımı.

**Hafta 11 — Renk Kullanımı ve Tipografi:** Modern CSS renk fonksiyonları (hsl(), oklch()), CSS özel değişkenleri (custom properties / --degisken) ile tema yönetimi, Google Fonts ve değişken (variable) fontlar, prefers-color-scheme ile karanlık mod.

**Hafta 12 — Duyarlı (Responsive) Tasarım ve Media Query:** Container Query'ler (@container) ile bileşen tabanlı duyarlı tasarım, mobile-first medya sorgusu yazım stratejisi, clamp() ile akıcı (fluid) tipografi ve boşluklandırma.

**Hafta 13 — CSS Framework'leri ve Ünite Projesi:** Bootstrap 5 grid sistemi ve utility class yaklaşımı, Tailwind CSS gibi utility-first framework'lerin yaygınlaşması, framework seçiminde proje ölçeğinin göz önünde bulundurulması.

## Etkileşim (Javascript)

**Hafta 14 — Javascript'e Giriş, Değişkenler ve Veri Tipleri:** let/const'un var yerine tercih edilmesi, şablon dizgeleri (template literals), tarayıcı geliştirici konsolu (DevTools) ile kod test etme alışkanlığı.

**Hafta 15 — Olaylar ve Fonksiyonlar:** Ok (arrow) fonksiyonlar, addEventListener ile modern olay yönetimi, event.target ve olay kabarması (event bubbling) kavramı.

**Hafta 16 — Kontrol Yapıları:** Üçlü (ternary) operatör ve mantıksal kısayol (?? , &&) kullanımıyla daha okunabilir koşullu kod yazımı.

**Hafta 17 — Diziler:** Modern dizi metotları (map, filter, reduce, find, includes, at()) ile klasik for döngüsüne alternatif fonksiyonel yaklaşımlar.

**Hafta 18 — Döngüler, Zamanlayıcılar ve Popüler Javascript Kütüphaneleri:** jQuery'nin günümüzde büyük ölçüde yerini modern (vanilla) JS'in ve fetch API'nin alması; React/Vue gibi bileşen tabanlı kütüphanelerin/framework'lerin günümüz front-end ekosistemindeki yaygın rolü (tanıtım amaçlı farkındalık).

## Arka Uç Yazılım Geliştirme (.NET Core)

**Hafta 19 — .NET Core'a Giriş ve Geliştirme Ortamının Kurulumu:** .NET 10, Kasım 2025'te yayınlanan güncel LTS (uzun süreli destek) sürümüdür ve Kasım 2028'e kadar destekleniyor (.NET 8'in desteği Kasım 2026'da bitiyor) — kurulumlarda .NET 10 SDK ve Visual Studio 2026 tercih edilmelidir.

**Hafta 20 — MVC Tasarım Deseni (1): Model - View - Controller:** Minimal API yaklaşımının küçük servisler için MVC'ye alternatif olarak yükselişi (farkındalık amaçlı); bu derste öğretim MVC deseni üzerinden yürütülmeye devam eder.

**Hafta 21 — MVC Tasarım Deseni (2): Razor Sayfaları ve Dönem Projesine Başlangıç:** Razor sözdiziminde @ ifadeleri, Razor Pages ile MVC Controller yaklaşımının küçük sayfalar için karşılaştırılması.

**Hafta 22 — Standart Klasör Yapısı ve Konfigürasyon:** .NET 6 ve sonrasında gelen sadeleştirilmiş 'minimal hosting model' (tek dosyada Program.cs) yapısının eski Startup.cs + Program.cs ikili yapısından farkı.

**Hafta 23 — Ara Katman (Middleware):** Yerleşik middleware'ler (routing, static files, authentication, exception handling) ve app.Use... sıralamasının önemi; kendi özel middleware'ini yazma örneği.

**Hafta 24 — Yönlendirme (Routing):** Attribute routing ([Route], [HttpGet], [HttpPost]) günümüzde MVC projelerinde varsayılan tercih; route parametreleri ve kısıtlamalar (route constraints).

**Hafta 25 — Form İşlemleri (1): Form Oluşturma ve Model Binding:** Strongly-typed (güçlü tipli) view'lar ve model binding ile form-model eşleşmesinin güvenli hale getirilmesi.

**Hafta 26 — Form İşlemleri (2): GET/POST ve Uygulama:** Anti-forgery token (@Html.AntiForgeryToken / [ValidateAntiForgeryToken]) ile CSRF saldırılarına karşı temel koruma - güvenlik farkındalığı.

**Hafta 27 — Etiket Yardımcıları (Tag Helpers):** Tag Helper'ların HTML Helper (@Html.TextBoxFor vb.) yöntemine göre daha okunabilir/HTML'e yakın olması nedeniyle güncel projelerde tercih edilme sebebi.

**Hafta 28 — Doğrulama İşlemleri (1): Data Annotations ve İstemci Taraflı Doğrulama:** jQuery Validation yerine günümüzde tarayıcıların yerleşik HTML5 doğrulaması ile birlikte çalışan unobtrusive validation yaklaşımı.

**Hafta 29 — Doğrulama İşlemleri (2): Sunucu Taraflı Doğrulama:** İstemci taraflı doğrulama devre dışı bırakılsa (veya atlatılsa) bile sunucu tarafında doğrulamanın neden zorunlu bir güvenlik katmanı olduğu.

**Hafta 30 — Paket Yöneticisi (NuGet):** NuGet.org üzerinden güncel paket sürümlerinin kontrolü, Central Package Management (merkezi paket sürüm yönetimi) yaklaşımına kısa değinme.

**Hafta 31 — Entity Framework Core: Giriş ve Veritabanı Bağlantısı:** EF Core'da Code First yaklaşımı ve Migrations ile veritabanı şemasının kod üzerinden yönetilmesi; SQL Server yerine geliştirme ortamında SQLite ile hafif kurulum seçeneği.

**Hafta 32 — EF Core ile CRUD İşlemleri (1): Listeleme ve Ekleme:** LINQ sorgularıyla okunabilir veri erişimi, büyük listelerde sayfalama (paging) ile performans/kullanılabilirlik ilişkisi.

**Hafta 33 — EF Core ile CRUD İşlemleri (2): Güncelleme, Silme ve Arama:** Soft delete (kaydı gerçekten silmek yerine pasif işaretlemek) yaklaşımının gerçek projelerde neden tercih edilebileceği - farkındalık amaçlı.

**Hafta 34 — Web Servisleri (1): REST API Kavramı:** REST API'lerin günümüz web/mobil uygulamalarında ortak veri paylaşım standardı olması; Swagger/OpenAPI ile API dokümantasyonu ve test etme.

**Hafta 35 — Web Servisleri (2): API'yi İstemciden Çağırma:** Modern fetch() API ve async/await ile jQuery.ajax() yerine vanilla JS üzerinden servis tüketimi.

**Hafta 36 — Yayınlama (Publish), SEO ve Dönem Projesi Sunumu:** Bulut üzerinde yayınlama seçenekleri (Azure App Service, Docker konteynerleştirme), Google Lighthouse/PageSpeed Insights ile performans ve SEO skorunun ölçülmesi, Core Web Vitals.

## Genel Kaynaklar
- [MDN Web Docs](https://developer.mozilla.org/tr/) — HTML, CSS, Javascript referans kaynağı
- [web.dev](https://web.dev/) — Google'ın güncel web standartları ve performans kaynağı
- [Microsoft Learn — ASP.NET Core](https://learn.microsoft.com/tr-tr/aspnet/core/) — .NET Core resmi dokümantasyonu
- [Can I Use](https://caniuse.com/) — Tarayıcı desteği kontrolü
- [Google Lighthouse / PageSpeed Insights](https://pagespeed.web.dev/) — Performans ve SEO ölçümü