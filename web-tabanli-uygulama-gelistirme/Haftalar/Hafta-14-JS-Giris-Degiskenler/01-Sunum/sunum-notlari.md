# Sunum Notları — Hafta 14: Javascript'e Giriş, Değişkenler ve Veri Tipleri

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu, öğrencilerin **ilk Javascript kodunu** yazacağı
> derstir — HTML/CSS'e göre çok daha soyut bir konudur (artık ekranda direkt görünmeyen "mantık" var),
> bu yüzden tempo yavaş tutulmalı ve her adım konsolda **canlı** doğrulanmalıdır.

## Konsol Alışkanlığını Kazandırma (En Önemli Ön Hazırlık)

Derse başlamadan önce **tüm öğrencilerin** F12 (veya sağ tık → İncele) ile geliştirici araçlarını açıp
Console sekmesini bulduğundan emin olun — bazı okul bilgisayarlarında F12 klavye kısayolu kilitli
olabilir, bu durumda sağ tık menüsünü kullandırın. Bu ders boyunca (Hafta 14-18) öğrenciler konsolu
**her uygulamada** açık tutacak; bu alışkanlığı ilk günden oturtmak sonraki haftaları çok kolaylaştırır.

## 1. Javascript Nedir?

"HTML/CSS ile yapamadığımız ne var?" sorusuyla başlayın: Bir butona basınca bir şeyin değişmesi, kullanıcı
girdisine göre karar verme, bir formu göndermeden önce kontrol etme — bunların hiçbiri HTML/CSS ile
mümkün değil, çünkü onlar "statik" dillerdir (karar alamazlar). Javascript, sayfaya **mantık ve tepki**
kazandırır.

**Sık karışan nokta:** "Javascript, Java'nın küçüğü mü?" — Hayır, tamamen farklı iki dildir. 1995'te
pazarlama amacıyla (o dönem Java çok popülerdi) benzer isim verilmiştir, teknik bir bağları yoktur. Bu
karışıklık gerçekten çok yaygındır, mutlaka açıklığa kavuşturun.

## 2. Kod Nereye Yazılır?

Üç yöntemi (satır içi `onclick`, `<script>` içi, harici `.js` dosyası) gösterin ama **harici dosyayı**
vurgulayın — bu ders boyunca sadece bu yöntemi kullanacağız. Satır içi yöntemi sadece "bunu görebilirsiniz
ama biz kullanmayacağız çünkü HTML ve JS'i karıştırıyor" notuyla geçin.

## 3. `<script>` Nereye Konur?

Bu, ileri seviye bir detay gibi görünse de Hafta 15'teki "Butonum Neden Çalışmıyor?" bug avının temelini
oluşturur — bu yüzden şimdiden tohumunu atın: "Script'i body'nin sonuna koyuyoruz çünkü tarayıcı sayfayı
yukarıdan aşağı okur, henüz var olmayan bir HTML elemanını JS ile seçmeye çalışırsak hata alırız."

## 4. Tarayıcı Konsolu

`console.log()` ile basit bir "Merhaba" yazdırmayı **her öğrenciye kendi bilgisayarında** yaptırın —
sadece izletmek yeterli değil, mutlaka elleriyle yazdırsınlar. Bu, bütün dersin "yaparak öğrenme"
felsefesinin başlangıcıdır.

## 5-6. Değişken Kavramı ve `var` / `let` / `const`

Kutu benzetmesini kullanın: değişken, üzerinde isim yazan bir kutudur, içine değer koyulur.
`var`'ın neden artık tercih edilmediğini **mutlaka canlı demoyla** gösterin (bkz. 02-Ornek-Uygulama
`var-sizinti.html`) — sadece "kullanmayın" demek yerine "işte bakın, `var` ile döngü dışından bile
erişilebiliyor, bu tehlikeli, `let` ile böyle bir hata anında ortaya çıkıyor" göstermek çok daha kalıcıdır.

**Basit kural, tahtaya yazın:** "Değişmeyecekse `const`, değişecekse `let`. `var` yok."

## 7-8. Veri Tipleri ve `typeof`

Her tipi somut bir örnekle (öğrencinin kendi adı, yaşı, okula kayıtlı olup olmadığı) verin. `typeof`'u
"bir değişkenin ne olduğunu bilmiyorsanız, bilgisayara sorun" mantığıyla tanıtın.

## 9. Şablon Dizgeleri

Eski `+` ile birleştirme yönteminin ne kadar karışık göründüğünü, şablon dizgesinin (backtick + `${}`)
ne kadar okunaklı olduğunu yan yana gösterin. **Sık hata:** öğrenciler backtick (`` ` ``) tuşunu
klavyede bulmakta zorlanabilir — Türkçe Q klavyede genelde sol üstte, Esc'in altındadır, gösterin.

## 10-11. Operatörler ve "Neden 5 + 8 = 58 Çıktı?"

Bu, haftanın **en önemli "aha" anıdır**. Slaytta önce teoriyi (sayı+sayı vs string+string) kısaca
gösterin, ardından hemen **02-Ornek-Uygulama** klasöründeki `hata-nan.html` ile canlı ve gerçek olarak
yaşatın (bkz. `uygulama-adimlari.md` — Uygulama 1). Slaytta uzun durmayın, asıl öğrenme uygulamada olacak.

**Ekstra vurgu:** Türk öğrenciler ondalık sayıları virgülle yazmaya alışkındır (`7,5`), ama Javascript
nokta bekler. Bu gerçek ve çok sık karşılaşılan bir hatadır — mutlaka bahsedin, öğrencilerin ileride
kendi projelerinde saatlerce debug etmelerini önler.

## 12. DOM Seçici

"DOM" terimini fazla derinleştirmeyin — sadece "tarayıcının HTML'i hafızada tuttuğu hâli" olarak
tanımlayın. `document.querySelector()`'ın CSS seçicileriyle (Hafta 9) aynı sözdizimini kullandığını
vurgulayın — "CSS'te öğrendiğiniz `#id`, `.class` bilgisi burada da işinize yarayacak."

## 13. "Okulum" Projesine İlk JS Bağlantısı

Bu bölümde 02-Ornek-Uygulama'daki gerçek proje dosyalarına geçin — bkz. `uygulama-adimlari.md`
Uygulama 3. Öğrencilerin kendi HTML5/CSS haftalarında ürettiği projeye script.js'i bağlamaları en
motive edici andır: "Kendi yaptığınız sayfa artık JS ile konuşuyor."

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `let` / `const` ile değişken tanımlama, `var` kullanmıyoruz
- string / number / boolean temel veri tipleri, `typeof` ile sorgulama
- Şablon dizgeleri (`` ` ``, `${}`) ile okunaklı metin oluşturma
- `input.value` her zaman string'dir — `Number()` ile çevirmeden aritmetik yapmayın
- `document.querySelector()` ile HTML elemanı seçme

## Öğretmen İçin Sık Sorulan Sorular

**"Neden bazen `let`, bazen `const` kullanıyoruz, ikisi de olmaz mı?"**
İkisi de teknik olarak "çalışır" ama `const` kullanmak, "bu değer bir daha değişmeyecek" sözü verir —
bu hem kodu okuyan başkası için hem de hata önleme için değerlidir. Bir sayaç gibi değişecek bir
değer varsa `let` kullanırız.

**"Neden `var` hâlâ internette çok kod örneğinde görünüyor?"**
`let`/`const` 2015'te (ES6) geldi, ondan önceki (ve hâlâ internette bolca bulunan) eski kod örnekleri
`var` kullanıyor. Yeni kod yazarken `var`'ı tercih etmiyoruz, ama eski kodu okurken karşınıza çıkabilir.
