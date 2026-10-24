# Sunum Notları — Hafta 18: Döngüler, Zamanlayıcılar ve Popüler Javascript Kütüphaneleri

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu hafta, bu dönem için hedeflenen içeriğin
> (Hafta 3-18: HTML5 + CSS + Javascript) **son haftasıdır** — hem yeni konuları işleyin hem de dönem
> boyunca öğrenilenleri toparlayan bir kapanış havası oluşturun.

## 1-2. Döngü Nedir? / `for` Anatomisi

Öğrenciler Hafta 17'de zaten `for` döngüsünü dizi gezerken kullanmıştı — bu haftanın amacı döngünün
**kendisine** (3 parçasına: başlangıç, koşul, artırım) daha yakından bakmaktır. Slayttaki renkli anatomiyi
tahtaya da çizip her parçayı ayrı ayrı işaret ederek anlatın.

## 3-4. `while` Döngüsü, `for` vs `while`

`while`'ın "koşula bağlı, sayısı belirsiz" durumlar için uygun olduğunu örneklerle pekiştirin: "Kullanıcı
doğru şifreyi girene kadar sormaya devam et" — kaç deneme yapacağı önceden bilinmez, bu yüzden `while`
daha doğal bir seçimdir.

## 5. Sonsuz Döngü Tuzağı — GÜVENLİK UYARISI

**Bu slaytı ÇOK net biçimde anlatın:** Slayttaki "hatalı" kod ASLA gerçekten çalıştırılmamalıdır — hem
projeksiyon bilgisayarında hem öğrenci bilgisayarlarında sekme kilitlenebilir/donabilir. Örnek uygulamada
(bkz. `uygulama-adimlari.md` — Uygulama 1) bu kodu bilinçli olarak **sadece okuyarak** inceleyeceğiz,
çalıştırmayacağız — bunu öğrencilere baştan söyleyin ki merak edip kendi başlarına denemesinler.

**Anlatım önerisi:** "Bir yolda hiç durmadan ileri giden bir arabayı düşünün — fren (artırım/koşul
güncellemesi) yoksa araba asla durmaz. Döngüde de durma koşulunun gerçekten değişip değişmediğini her
zaman kontrol etmelisiniz."

## 6. `for...of`

Kısa geçin — Hafta 17'deki `forEach()` ile kavramsal olarak çok benzer olduğunu, sadece söz diziminin
farklı olduğunu belirtin.

## 7-11. Zamanlayıcılar (`setTimeout`, `setInterval`, `clearInterval`)

Bu bölümü canlı kod ile gösterin — projeksiyonda konsola `setTimeout(() => console.log("merhaba"), 3000)`
yazıp 3 saniye beklemenin gerçekten "hissedilmesini" sağlayın; ardından `setInterval` ile aynısını yapıp
konsolun tekrar tekrar dolduğunu gösterin. `clearInterval` ile durdurmayı da mutlaka canlı gösterin —
öğrenciler "durdurmazsam ne olur?" sorusunu böyle daha iyi anlar (konsolun durmaksızın dolmaya devam
ettiğini görürler).

## 12-14. Kütüphaneler (jQuery, React, Vue, Angular)

Bu bölüm **kod yazdırma** değil, **farkındalık kazandırma** amaçlıdır — kazanım da zaten "listeler" fiiliyle
sınırlıdır. jQuery karşılaştırmasında "eskiden zorunluymuş gibi görünen bir aracın, tarayıcılar
standartlaştıkça neden daha az gerekli hâle geldiğini" vurgulayın — bu, teknolojinin zamanla nasıl
evrildiğine dair güzel bir örnektir.

React/Vue/Angular kartlarında öğrencilere "bunları şimdi öğrenmiyoruz çünkü ikisi de JavaScript'in üzerine
kuruludur — önce temeli (bugüne kadar öğrendiklerimizi) sağlam öğrenmemiz gerekiyor" mesajını verin. Merak
eden öğrencilere, bu derste öğrendikleri "sade JS"in bu framework'leri öğrenirken doğrudan işlerine
yarayacağını söyleyin.

## 15. "Okulum" Projesi Kapanışı

Bu, Hafta 3'ten beri süregelen projenin bu dönem için **son eklentisidir**. Uygulamada (Uygulama 3) canlı
saat ve otomatik kaybolan form bildirimini birlikte ekleyeceksiniz. Bunu bir "kapanış anı" olarak
çerçeveleyin: "Hafta 3'te sadece boş bir iskeletti, şimdi kendi başlığı, listesi, formu ve canlı davranışı
olan gerçek bir web sitesi oldu."

## 16. Genel Bakış — Bu Döneme Kadar Öğrendiklerimiz

Bu slaytta, öğrencilerin HTML5/CSS/JS'in birbiriyle nasıl bir bütün oluşturduğunu görmesini sağlayın.
Önerilen benzetme: **HTML = iskelet/yapı, CSS = dış görünüm/kıyafet, Javascript = hareket/davranış/beyin.**
Üçü olmadan modern bir web sitesi eksik kalır.

**Öğretmene not:** Ders programının devamı (Hafta 19'dan itibaren, bu dönem kapsamı dışında kalabilir)
.NET Core ile back-end (sunucu tarafı) geliştirmeye geçiyor — bu haftayı, front-end'i tamamlayan bir
"eşik" olarak sunmak, öğrencilerin büyük resmi görmesine yardımcı olur.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `for` = bilinen sayıda tekrar, `while` = koşula bağlı belirsiz sayıda tekrar
- Sonsuz döngü tuzağı: artırım/koşul güncellemesi unutulursa döngü asla durmaz
- `setTimeout()` = bir kez, gecikmeli; `setInterval()` = sürekli tekrarlı; `clearInterval()` = durdurma
- jQuery/React/Vue/Angular: farkındalık düzeyinde tanınan popüler JS kütüphaneleri/framework'leri
- HTML5 (yapı) + CSS (görünüm) + Javascript (davranış) = front-end'in üç temel taşı

## Öğretmen İçin Sık Sorulan Sorular

**"setTimeout içindeki süre kesin midir, tam o anda mı çalışır?"**
Yaklaşık olarak — JavaScript tek iş parçacıklıdır (single-threaded), eğer o anda başka bir kod çalışıyorsa
zamanlayıcı biraz gecikebilir. Bu ayrıntı, meraklı öğrenciler sorarsa kısaca değinilebilir, ders kapsamı
dışıdır.

**"React/Vue öğrenmek için önce ne bilmemiz lazım?"**
Bu derste öğrendiğimiz her şey: değişkenler, fonksiyonlar, olaylar, diziler, DOM ile çalışma. Bu
framework'ler, bunların üzerine inşa edilmiş araçlardır.
