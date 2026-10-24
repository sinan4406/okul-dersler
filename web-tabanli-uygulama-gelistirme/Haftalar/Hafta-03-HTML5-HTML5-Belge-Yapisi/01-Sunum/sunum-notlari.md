# Sunum Notları — Hafta 3: HTML5'e Giriş ve Belge Yapısı

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Slaytlardaki her başlığın altında, sınıfta sözlü olarak
> anlatılması önerilen açıklamalar, örnekler ve olası öğrenci soruları yer alır. Bu, öğrencilerin **ilk kod
> yazacağı** derstir — tempo ağır tutulmalı, her satır projeksiyonda birlikte yazılmalıdır.

## 1. HTML Nedir?

HTML (HyperText Markup Language), bir **işaretleme dilidir**, programlama dili değildir. Öğrenciler sıkça
"HTML ile hesap makinesi yapabilir miyiz?" diye sorar — cevap hayır, çünkü HTML'de değişken, döngü, koşul yoktur.
Sadece içeriği etiketler. Hesaplama/mantık işini Javascript (Hafta 14) ve .NET Core (Hafta 19+) üstlenecek.

**Anlatım önerisi:** Bina planı benzetmesi — mimar planı "burası salon" der ama boyamaz. HTML de içeriği
tanımlar ama görünümünü (renk, boşluk) belirlemez; o CSS'in işi.

## 2. Kaynak Kod → Tarayıcı → Sayfa

Öğrencilere canlı olarak, projeksiyonda herhangi bir web sitesine gidip **sağ tık → "Kaynağı Görüntüle"**
(View Page Source, Ctrl+U) yapmayı gösterin. "İşte bu sayfanın perde arkası — bugünden itibaren siz de bunu
yazabileceksiniz" vurgusu motive edici olur.

## 3. Etiket (Tag) Nedir?

Etiketlerin `<` ile başlayıp `>` ile bittiğini, çoğunun açılış/kapanış çifti olduğunu vurgulayın. Kapanış
etiketindeki `/` işaretini tahtaya büyük yazıp gösterin — öğrenciler bu `/`'yi unutmak konusunda en sık hata
yapılan noktadır.

**Kendi kendini kapatan etiketler:** `<br>`, `<img>`, `<meta>` gibi etiketlerin neden kapanış etiketi
olmadığını sorun — çünkü içlerine yerleştirilecek bir "içerik" yoktur, sadece tek başına bir işlev görürler.

## 4. Etiket mi, Eleman mı?

Bu ayrım ileri düzey bir terminoloji notudur — çok uzun durmayın (2-3 dakika yeterli), ama doğru terimi
bilmelerinin işe alım mülakatlarında/sınavlarda fark yaratacağını belirtin.

## 5. Öznitelik (Attribute) Nedir?

`isim="değer"` formatını tahtaya yazıp altını çizin. **Sık hata:** öğrenciler tırnak işaretini unutur veya
tek tırnak/çift tırnak karıştırır. "Tırnak açtıysanız mutlaka kapatın" alışkanlığını şimdiden yerleştirin —
bu alışkanlık CSS ve Javascript'te de işlerine yarayacak.

## 6. DOCTYPE — Eski / Yeni Karşılaştırması

Slayttaki HTML4 DOCTYPE'ının ne kadar uzun ve ezberlenemez olduğunu gösterin, ardından HTML5'in tek satırlık
`<!DOCTYPE html>` sadeliğine geçin. **Vurgu:** "Bu satır her HTML dosyasının kesinlikle ilk satırıdır, üstünde
başka hiçbir şey (boşluk, yorum bile) olmamalıdır."

**Quirks mode nedir?** Kısaca değinin: DOCTYPE eksikse bazı eski tarayıcılar sayfayı "gevşek kurallarla"
yorumlar, bu da farklı tarayıcılarda farklı görünen tutarsız sayfalara yol açabilir. Detaya girmeyin, sadece
"DOCTYPE = tarayıcıya doğru moda geç talimatı" olarak bırakın.

## 7. `<html lang="tr">`

`lang` özniteliğinin sadece "süs" olmadığını, gerçek işlevsel etkisi olduğunu vurgulayın:
- Ekran okuyucu yazılımlar (görme engelli kullanıcılar için) kelimeleri doğru dilde telaffuz eder.
- Tarayıcı otomatik çeviri özelliği (örn. Chrome'un "Türkçe'ye çevir" önerisi) doğru kaynak dili tanır.

**Tartışma sorusu:** "Bir İngilizce sayfaya yanlışlıkla `lang="tr"` yazsaydık ne olurdu?" (Ekran okuyucu
İngilizce kelimeleri Türkçe telaffuz kurallarıyla okumaya çalışırdı — garip/anlaşılmaz seslenir.)

## 8. `<head>` ve `<body>`

Ev benzetmesini kullanın: `head` = evin tapusu/kimlik bilgisi (görünmez), `body` = evin içi (ziyaretçinin
gördüğü). Alternatif benzetme: bir mektubun **zarfı** (head — üzerinde adres/gönderen yazar, alıcı okumaz)
ile **içindeki mektup** (body — asıl okunan kısım).

## 9. Yorum Satırı

Yorumların tarayıcıda **hiç görünmediğini** canlı gösterin — projeksiyonda bir `<!-- ... -->` bloğu ekleyip
sayfayı yenileyin, hiçbir şeyin değişmediğini gösterin. İki kullanım alanını vurgulayın: (1) kodu bölümlere
ayırıp not bırakmak, (2) bir kod parçasını silmeden geçici olarak devre dışı bırakmak.

## 10-11. `meta charset` ve Canlı Bozuk Kod Kanıtı

Bu, haftanın **en önemli "aha" anı**dır — slaytı geçmeden önce şunu sorun: "Türkçe karakterli bir yazı
internette bazen 'Ã¼', 'Ã§' gibi tuhaf simgelerle karışık görünür, hiç gördünüz mü?" Çoğu öğrenci bunu bir
yerlerde (eski forumlar, kötü ayarlanmış e-postalar) görmüştür. Slayttaki yan yana karşılaştırmayı gösterip
"Aynı dosya, tek fark `meta charset` satırı" mesajını verin.

Bu kavramı hemen ardından **02-Ornek-Uygulama** klasöründeki `bozuk-sayfa.html` ile canlı ve gerçek olarak
tekrar yaşatacaksınız (bkz. `uygulama-adimlari.md` — Uygulama 1). Slaytta sadece "bunu birazdan kendi
gözlerinizle göreceğiz" beklentisini oluşturmak yeterli, uzun durmayın.

## 12. `meta viewport`

Kısaca değinin, detayını CSS ünitesine (Hafta 12 — Duyarlı Tasarım) bırakın. "Bu satırı şimdilik ezbere
kopyalıyoruz, neden gerekli olduğunu birkaç hafta sonra CSS'te tam olarak anlayacağız" demek yeterli.

## 13. `<title>`

Sekme başlığında görünen metnin arama motoru sonuçlarında da göründüğünü, bu yüzden anlamlı seçilmesi
gerektiğini belirtin. Kötü örnek: `<title>Untitled Document</title>` — bunu google'da arattığınızda ne kadar
"amatör" göründüğünü gösterin.

## 14. HTML4 → HTML5 Sadeleşme

Bu slayt bir "genel bakış" niteliğindedir — `<header>`, `<nav>`, `<section>`, `<article>` gibi semantik
etiketlerin **isimlerini** şimdi versin, detaylarına Hafta 5'te (Yerleşim Elemanları) gireceğiz. Şimdi sadece
"HTML5 daha kısa ve daha anlamlı hale geldi" mesajı yeterli.

## 15. Emmet

Bilgisayarı olan öğrencilerle birlikte VS Code'da boş bir `.html` dosyası açıp `!` yazıp Tab'a basmalarını
isteyin — anında iskeletin oluştuğunu görünce çoğu öğrenci şaşırır ve motive olur. **Uyarı:** Emmet'in
varsayılan olarak `lang="en"` ürettiğini, bunu elle `"tr"` yapmaları gerektiğini mutlaka vurgulayın —
aksi halde bu hatayı fark etmeden taşırlar.

## 16. "Okulum" Projesi İlk İskelet

Bu, dönem/ünite boyunca (Hafta 3'ten Hafta 8'e kadar HTML5 ünitesi süresince) üzerine inşa edilecek gerçek
projedir — "Anadolu Teknik Lisesi" adında hayali bir okul tanıtım sayfası. Bu iskeleti **birlikte, satır satır**
yazdırın (kopyala-yapıştır değil). Bir sonraki hafta buraya başlıklar/paragraflar/listeler eklenecek.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `<!DOCTYPE html>` → HTML5 standardı bildirimi
- `<html lang="tr">` → tüm içeriği kapsar, dili belirtir
- `<head>` (görünmez) / `<body>` (görünür)
- `<meta charset="UTF-8">` → Türkçe karakterlerin doğru görünmesi için **zorunlu**
- `<meta name="viewport">` / `<title>` → mobil ölçekleme / sekme başlığı
- `<!-- yorum -->` → tarayıcı tarafından görmezden gelinir

## Öğretmen İçin Sık Sorulan Sorular

**"Neden her zaman çift tırnak kullanıyoruz, tek tırnak olmaz mı?"**
Olur, HTML ikisini de kabul eder, ama tutarlılık için (ve ileride CSS/JS ile karışmaması için) bu derste
her zaman çift tırnak kullanacağız.

**"Boşluk bırakmazsam (girinti yapmazsam) kod çalışmaz mı?"**
Çalışır — HTML, girintiye (indentation) duyarlı değildir. Ama okunabilirlik için her zaman girintili
yazacağız; VS Code çoğu zaman bunu otomatik yapar.

**"UTF-8 dışında ne var, neden hep UTF-8 kullanıyoruz?"**
ISO-8859-9 (Türkçe Latin), Windows-1252 gibi eski kodlamalar da var, ama bunlar sadece belirli dilleri
destekler ve projeler arası taşınırken sorun çıkarır. UTF-8, dünyadaki neredeyse tüm dilleri (Türkçe dahil)
tek bir standartla kapsadığı için günümüzün evrensel tercihidir.
