# Sunum Notları — Hafta 8: Form Elemanları ve HTML5 Ünite Değerlendirmesi

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu hafta aynı zamanda HTML5 ünitesinin **kapanışıdır** —
> son 15 dakikayı mutlaka Hafta 3-8 özetine ve mini proje ödevinin tanıtımına ayırın.

## 1-2. Form Nedir, `<form>` Etiketi

Bugüne kadarki tüm sayfaların "tek yönlü" (biz yazdık, öğrenci okudu) olduğunu vurgulayarak başlayın —
form, bu ilişkiyi ilk kez tersine çeviren yapıdır. `action="#"` kullanmamızın nedeninin, henüz gerçek bir
sunucumuz olmaması olduğunu, bu konuya Hafta 25-26'da (.NET Core Form İşlemleri) geri döneceğimizi belirtin
— öğrenciler "formu doldurup gönderince neden bir şey olmuyor?" diye sorabilir, bu soruyu bekleyin.

## 3-4. `<input>` ve Klasik Tipler

`type` özniteliğinin aynı etiketi tamamen farklı davranışlara dönüştürdüğünü vurgulayın. `radio` ile
`checkbox` arasındaki farkı somut örnekle anlatın: "Cinsiyetinizi seçin" (radio — tek seçim) vs
"İlgi alanlarınızı işaretleyin" (checkbox — çoklu seçim).

## 5-6. HTML5 Yeni Tipler ve Doğrulama Karşılaştırması

Bu, haftanın merkezi mesajıdır: **"Doğru `type` seçmek, hiç kod yazmadan bedava doğrulama kazandırır."**
Örnek uygulamadaki `dogrulama-karsilastirma.html` dosyasını projeksiyonda canlı test edin — özellikle
mobil cihazı olan bir öğrenciye `type="email"` kutusuna dokunduğunda **klavyenin değiştiğini**
(@ tuşu belirginleşir) gösterin, bu görsel fark her zaman etkili olur.

## 7. Doğrulama Öznitelikleri

`pattern` özniteliğinin regex (düzenli ifade) kullandığını kısaca belirtin ama regex sözdizimine
girmeyin — bu ders kapsamında değil, sadece "belirli bir kalıba zorlar" fikri yeterli.

## 8-9. `<label for>` ve Erişilebilirlik

Bu, haftanın **ikinci "aha" anıdır**. Öğrencilere şunu sorun: "Bir formda etikete tıklamak neden işe
yarasın ki, direkt kutuya tıklasak olmaz mı?" Cevap: mobilde küçük bir radio/checkbox kutusuna tam isabet
ettirmek zordur; etiketin de tıklanabilir olması kullanım kolaylığı sağlar. Ayrıca ekran okuyucu kullanan
görme engelli bir kullanıcı için, doğru eşleşmemiş bir `label`, kutunun ne istediğini **hiç anlaşılmaz**
hâle getirir. Örnek uygulamadaki `erisilemeyen-form.html` ile bunu canlı gösterin.

## 10-12. `<select>`, `<textarea>`, `<button>`

Hızlı geçilebilir, teknik detaylar sınırlı. `<select>`'te `value` ile görünen metnin farklı olabileceğini
("Kayıt Bilgisi" görünür ama sunucuya `kayit` gönderilir) bir örnekle gösterin — bu, ileride (.NET Core
form işlemleri, Hafta 25) neden önemli olacağının bir ön izlemesidir.

## 13. Okulum Projesine Form Ekleme

`iletisim.html`'e eklenen formun her satırını birlikte yazdırın — özellikle her `label`/`input` çiftinin
`for`/`id` eşleşmesini yüksek sesle kontrol ederek ilerleyin, bu alışkanlığı pekiştirir.

## 14. HTML5 Ünitesi Kapanışı

`unite-ozet-kontrol-listesi.md` dosyasındaki tabloyu projeksiyonda açıp Hafta 3'ten bugüne kadarki yolculuğu
hızlıca özetleyin. Öğrencilere "bugüne kadar öğrendiğiniz her şeyi kullanarak" bir mini proje
yapacaklarını (bkz. `03-Odev/odev.md`) söyleyin — bu, hem bir motivasyon hem de bir "artık gerçekten bir
web sitesi kurabiliyorsunuz" mesajı vermelidir.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `<form action method>` → veri toplama kapsayıcısı
- `<input type="...">` → text, email, tel, date, number, range, color
- `required / pattern / min / max` → tarayıcının kendi doğrulaması
- `<label for>` → id ile birebir eşleşmeli, erişilebilirlik için zorunlu
- `<select> / <textarea>` → seçim listesi / çok satırlı metin
- **HTML5 ünitesi tamamlandı** — sırada CSS var (Hafta 9)

## Öğretmen İçin Sık Sorulan Sorular

**"Formu gönderince neden sayfa yenileniyor ama bir şey olmuyor?"**
`action="#"` kullandığımız için tarayıcı formu "kendi kendine" göndermeye çalışıyor ama gerçek bir sunucu
olmadığından hiçbir veri işlenmiyor. Gerçek gönderim, .NET Core ünitesinde (Hafta 25-26) öğrenilecek.

**"required yerine Javascript ile de kontrol edilebilir mi?"**
Evet, ileride (Hafta 15+) Javascript ile daha esnek/özel doğrulamalar da yapılabilecek — ama basit
durumlarda HTML5 öznitelikleri hem daha az kod hem de daha hızlıdır (tarayıcı tarafından optimize edilmiştir).
