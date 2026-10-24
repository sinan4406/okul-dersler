# Ödev — Hafta 4: Başlıklar, Metin Biçimlendirme, Listeler ve Tablolar

## Görev 1 — Kantin Menüsü Dedektifi (Hata Bulma)

Ekteki [`menu-hatali.html`](./menu-hatali.html) dosyasını tarayıcıda açıp inceleyin, ardından VS Code'da kodu
satır satır okuyun. Dosyada **en az 5 hata** bulunmaktadır — bunlardan bazıları görsel olarak fark edilir
(tablo bozuk görünebilir), bazıları ise sadece kodu okuyunca anlaşılır (yapısal/anlamsal hatalar).

**Yapmanız gerekenler:**
1. Bulduğunuz her hatayı bir liste hâlinde yazın: "... satırında ... hatası var çünkü ...".
2. En az bir hatanın **başlık hiyerarşisiyle**, en az bir hatanın **liste türü seçimiyle** (neden `<ol>`
   yerine `<ul>` olmalıydı?), en az bir hatanın **kapanmamış bir etiketle** ilgili olduğunu unutmayın.
3. Tüm hataları düzeltip dosyayı kaydedin, tarayıcıda test edin.

## Görev 2 — "Okulum" Projesine Devam

Derste birlikte oluşturduğunuz `okulum` projesindeki `index.html` dosyasını açın ve aşağıdakileri ekleyin:

- [ ] "Öğretmenlerimiz" başlıklı yeni bir `<h2>` bölümü, altında en az 3 öğretmen adının yer aldığı bir
      `<ul>` listesi (her öğretmenin yanına branşını `<em>` ile belirtin, örn. *Matematik*).
- [ ] "Başarılarımız" başlıklı bir `<h2>` bölümü, altında en az 3 maddelik bir `<ol>` listesi (madde
      sırasının anlamlı olduğu bir durum düşünün — örn. yıllara göre sıralı başarılar).
- [ ] "İletişim Bilgileri" başlıklı bir `<h2>` bölümü, altında telefon/adres/e-posta bilgilerini içeren
      bir `<table>` (en az 3 satır, `thead`/`tbody` kullanılmış).
- [ ] Sayfanın herhangi bir yerinde `<abbr>` etiketiyle bir kısaltma (örn. MEB) kullanın.

## Görev 3 — Kısa Cevaplı Sorular

1. `<strong>` ile `<b>` arasındaki fark nedir? Hangisini ne zaman tercih etmeliyiz?
2. Bir sayfada birden fazla `<h1>` kullanmak neden önerilmez?
3. `<ul>` yerine her zaman `<ol>` kullansaydık ne tür bir sorun oluşurdu? Bir örnek verin.
4. `colspan` ve `rowspan` ne işe yarar? Gerçek hayattan bir kullanım örneği verin.
5. Tabloları sayfa yerleşimi (menü, kenar çubuğu vb.) için kullanmak neden önerilmez?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — en az 5 hata doğru tespit edilmiş ve düzeltilmiş | 35 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış, hiyerarşi ve liste türleri doğru seçilmiş | 40 |
| Görev 3 — 5 soru da kendi cümleleriyle doğru cevaplanmış | 20 |
| Zamanında teslim | 5 |

