# Sunum Notları — Hafta 1: Web ve Yazılımcılık Temel Kavramları

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Slaytlardaki her başlığın altında, sınıfta sözlü olarak
> anlatılması önerilen açıklamalar, örnekler ve olası öğrenci soruları yer alır.

## 1. Web Sayfası ve Web Sitesi Nedir?

**Web sayfası (web page):** Tarayıcıda görüntülenen, tek bir HTML dosyasına karşılık gelen belgedir.
**Web sitesi (website):** Birbirine bağlantılarla (link) bağlı, aynı alan adı altında yayınlanan web sayfaları
topluluğudur.

Anlatım önerisi: "Bir kitabı düşünün. Kitabın her sayfası bir web sayfasıdır, kitabın tamamı ise web sitesidir."
Tahtaya `anasayfa.html`, `hakkimizda.html`, `iletisim.html` gibi örnek dosya adları yazıp bunların bir web sitesini
nasıl oluşturduğunu gösterin.

**Sık karışan nokta:** Öğrenciler genelde "web sitesi" ile "tarayıcı" (Chrome, Edge) kavramını karıştırır.
Tarayıcının web sayfalarını *görüntülemeye yarayan bir program* olduğunu, web sitesinin ise *içerik* olduğunu
vurgulayın.

## 2. Alan Adı (Domain) Kavramı

Bir web sitesinin internet üzerindeki adresidir (örnek: `meb.gov.tr`, `google.com`). Aslında her sunucunun bir
**IP adresi** (örnek: 142.250.185.78) vardır; alan adı sistemi (DNS), bu sayısal adresleri insanların
hatırlayabileceği isimlere çevirir.

### Alan Adı Uzantıları
- `.com` — ticari (commercial)
- `.org` — kâr amacı gütmeyen kuruluşlar
- `.net` — ağ/network hizmetleri
- `.edu` — eğitim kurumları
- `.gov` / `.gov.tr` — devlet kurumları
- `.com.tr`, `.org.tr` — Türkiye'ye özel uzantılar (bazıları için TC kimlik/vergi no gerekir)

### Alan Adı Alma İşlemi
Bir "alan adı tescil firması" (domain registrar) üzerinden, yıllık ücret karşılığında satın alınır/kiralanır.
Türkiye'de `.tr` uzantıları [nic.tr](https://nic.tr) üzerinden, uluslararası uzantılar ise GoDaddy, Namecheap gibi
firmalardan alınabilir.

**Güncel not:** Öğrencilere alan adı fiyatlarının uzantıya göre değiştiğini (`.com` ucuz, `.ai` gibi trend
uzantılar pahalı) ve bazı büyük teknoloji şirketlerinin marka koruması için düzinelerce uzantıyı aynı anda
satın aldığını (örnek olarak google.com, google.net, google.org) anlatmak ilgi çekici olabilir.

## 3. Hosting (Barındırma) Kavramı

Bir web sitesinin dosyalarının (HTML, CSS, JS, resimler, veritabanı) 7/24 çalışan bir sunucuda depolanması ve
internete açık tutulmasıdır. Alan adı "adres", hosting ise "evin kendisi" gibi düşünülebilir — adresiniz olsa da
bir eviniz (sunucunuz) yoksa kimse sizi ziyaret edemez.

**Güncel hosting türleri (2026):**
- **Paylaşımlı hosting (shared hosting):** Küçük siteler için ucuz, birçok site aynı sunucuyu paylaşır.
- **Statik site barındırma:** GitHub Pages, Netlify, Vercel — sadece HTML/CSS/JS içeren siteler için ücretsiz/kolay.
- **Bulut sunucular (cloud):** Azure App Service, AWS, Google Cloud — büyüyebilen, esnek sistemler. Bu dersin
  sonunda öğrenciler ASP.NET Core projelerini Azure App Service üzerinde yayınlamayı öğrenecek (bkz. Hafta 36).
- **Konteynerleştirme (Docker):** Uygulamayı "paketleyip" her ortamda aynı şekilde çalıştırma yöntemi — ileri
  seviye bir farkındalık notu olarak değinilebilir.

## 4. Web Yazılımcısı Rolleri

| Rol | Ne yapar? | Örnek teknolojiler (bu derste görülecek) |
|---|---|---|
| **Front-end** | Kullanıcının tarayıcıda gördüğü ve etkileşime girdiği kısmı geliştirir | HTML, CSS, Javascript |
| **Back-end** | Sunucu tarafında çalışan, veri işleyen, veritabanına bağlanan kısmı geliştirir | ASP.NET Core, Entity Framework Core |
| **Full-stack** | Hem front-end hem back-end geliştirebilen kişidir | Hepsi bir arada |

Anlatım önerisi: Bir restoran benzetmesi kullanılabilir — **front-end** garson/menü/salon düzeni (müşterinin
gördüğü kısım), **back-end** ise mutfaktır (müşterinin görmediği ama işin gerçekleştiği yer). **Full-stack**
yazılımcı, hem salonu hem mutfağı yönetebilen kişidir.

**Güncel not:** Yapay zekâ destekli kodlama araçları (GitHub Copilot, Cursor, Claude Code vb.) artık geliştiricilerin
günlük iş akışının bir parçası. Bu araçlar kod yazmayı hızlandırır ama temel kavramları (HTML'in ne olduğunu, bir
formun nasıl çalıştığını) bilmeyen birinin bu araçları etkili/güvenli kullanamayacağını vurgulamak önemli — bu
ders o temeli kazandırıyor.

## 5. HTML Editörleri

HTML kodu, aslında düz metin dosyasıdır ve herhangi bir metin düzenleyici (Not Defteri) ile bile yazılabilir.
Ancak profesyonel geliştirme için **kod editörleri** kullanılır çünkü bunlar sözdizimi renklendirme (syntax
highlighting), otomatik tamamlama ve hata bulma gibi kolaylıklar sağlar.

**Bu derste kullanacağımız editör: Visual Studio Code (VS Code)** — ücretsiz, hafif, Türkçe dil desteği olan,
Microsoft'un geliştirdiği ve günümüzde en yaygın kullanılan kod editörüdür. HTML/CSS/JS dersleri boyunca VS Code,
.NET Core (Arka Uç) ünitesinde ise Visual Studio (Community Edition) kullanılacak.

## 6. CSS Kavramına Giriş

CSS (Cascading Style Sheets / Basamaklı Stil Şablonları), HTML ile oluşturulan sayfanın **görünümünü**
(renkler, yazı tipleri, boşluklar, yerleşim) belirlemek için kullanılan bir dildir. Bu hafta sadece kavram olarak
tanıtılacak; detaylı işleniş Hafta 9-13'te.

Basit benzetme: **HTML iskelet/yapı, CSS ise kıyafet/dış görünümdür.**

## 7. WYSIWYG Editör Kavramı

WYSIWYG = "What You See Is What You Get" (Ne görürseniz onu alırsınız). Kod yazmadan, sürükle-bırak ile web sayfası
tasarlamaya imkân veren araçlardır (örnek: eski Dreamweaver, günümüzde Wix, Webflow, WordPress sayfa oluşturucular).

Öğrencilere şunu vurgulayın: *WYSIWYG araçları hızlıdır ama perde arkasında ne olduğunu anlamayan biri, bir sorun
çıktığında düzeltemez. Bu derste amacımız, o perde arkasını (HTML/CSS/JS/.NET Core) gerçekten anlamak.*

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Web sitesi = birden çok web sayfasının toplamı
- Alan adı = adres, Hosting = evin kendisi
- Front-end = görünen kısım, Back-end = sunucu tarafı, Full-stack = ikisi birden
- Bu derste HTML/CSS/JS ile front-end, .NET Core ile back-end öğreneceğiz — yani **full-stack** bir yazılımcı
  olma yolunda ilerleyeceğiz.
