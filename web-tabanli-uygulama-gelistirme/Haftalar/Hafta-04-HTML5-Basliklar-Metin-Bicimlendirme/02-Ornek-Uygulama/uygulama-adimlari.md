# Örnek Uygulama — Hafta 4: Başlıklar, Metin Biçimlendirme, Listeler ve Tablolar

## Uygulama 1 — Başlık Hiyerarşisi Dedektifi (20 dk)

**Amaç:** Öğrencilerin başlık seviyelerinin "görsel boyut" değil, "yapısal önem sırası" olduğunu fark etmesi.

1. [`baslik-hiyerarsisi-bozuk.html`](./baslik-hiyerarsisi-bozuk.html) dosyasını tarayıcıda açın. Ekranda
   farklı büyüklükte başlıklar görünür ama görsel olarak "bir sorun yokmuş" gibi durur — asıl sorun kodda.
2. Dosyayı VS Code'da açın, öğrencilerden şu soruları cevaplamalarını isteyin:
   - Sayfada kaç tane `<h1>` var? (Cevap: 2 — olması gereken: 1)
   - Hangi başlıklar bir seviye atlıyor? (`h1`'den `h4`'e, `h2`'den `h6`'ya, `h3`'ten `h5`'e)
3. Öğrenciler kodu, seviye atlamadan mantıklı bir hiyerarşiye (h1 → h2 → h3...) düzeltsin. İkinci `<h1>`
   ("İletişim") de `<h2>`'ye çevrilmeli — bir sayfada tek `h1` olması kuralını hatırlatın.
4. Kendi çözümlerini [`baslik-hiyerarsisi-cozum.html`](./baslik-hiyerarsisi-cozum.html) ile karşılaştırsınlar.

> **Öğretmen notu:** Bu alıştırmada "doğru tek bir cevap" yoktur — önemli olan seviyelerin **atlanmamış**
> ve **mantıklı** olmasıdır. Öğrenci farklı bir sıralama önerse bile mantığını savunabiliyorsa kabul edilebilir.

## Uygulama 2 — "Okulum" Projesini Büyütme (30-40 dk)

**Amaç:** Hafta 3'te kurulan boş iskelete gerçek içerik eklemek.

1. Hafta 3'ten kalan `okulum` klasöründeki `index.html` dosyasını açın (veya bu klasördeki
   [`okulum-iskelet.html`](./okulum-iskelet.html) dosyasını temel alın).
2. Sırasıyla, satır satır birlikte ekleyin:
   - `<h1>` ile okul adı
   - `<h2>Hakkımızda</h2>` başlığı ve altına en az 2 paragraf (paragraflardan birinde `<strong>` veya
     `<em>` ile bir vurgu, birinde `<mark>` ile önemli bir tarih/duyuru vurgusu)
   - `<h2>Bölümlerimiz</h2>` başlığı ve altına bir `<ul>` listesi (en az 4 bölüm)
   - `<h2>Haftalık Ders Programı</h2>` başlığı ve altına `thead`/`tbody` ile yapılandırılmış bir `<table>`
3. Tamamlanan hâli [`okulum-iskelet.html`](./okulum-iskelet.html) dosyasıyla karşılaştırın.

> Bu proje bir sonraki hafta (Hafta 5) semantik yerleşim etiketleriyle yeniden yapılandırılacak — bu yüzden
> içeriğin bu hafta doğru ve eksiksiz girilmiş olması önemlidir.
