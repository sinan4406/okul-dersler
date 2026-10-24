# Sunum Notları — Hafta 6: Medya Elemanları: Resim, Ses ve Video

> Bu not, dersi anlatacak öğretmen içindir. Bu hafta, önceki haftalarda kurduğumuz metin ağırlıklı sayfaların
> görsel/işitsel içerikle zenginleştirilmesini öğretiyoruz. Erişilebilirlik (alt, track) bu haftanın da ana
> teması olmaya devam ediyor.

## 1-2. `<img>` ve `alt`

`src` ve `alt`'i "adres" ve "açıklama" olarak basitleştirin. `alt`'in önemini somutlaştırmak için şunu
sorun: "Görme engelli bir kullanıcı bu sayfaya girse, resim yerine ne 'duyar'?" `alt` olmadan cevap "hiçbir
şey", `alt` ile cevap "yazdığınız açıklama".

**Sık hata:** Öğrenciler `alt`'e dosya adını yazabilir (`alt="resim1.jpg"`) — bu yanlıştır, `alt` görselin
**içeriğini** anlatan bir cümle olmalıdır ("Okulun ana bina girişi" gibi).

## 3. Kırık Görsel — Bağlantı

Bu slayt, birazdan **02-Ornek-Uygulama**'da canlı yapılacak "Kırık Görsel Avı" uygulamasına bir köprüdür.
Uzun durmayın, sadece "birazdan bunu kendi gözlerinizle, gerçek bir dosyayla göreceğiz" beklentisini kurup
geçin.

## 4-5. width/height ve loading="lazy"

"Layout shift" (ani kayma) kavramını somut bir örnekle anlatın: "Bir haber sitesinde okurken, aniden üstteki
bir görsel yüklenir ve tüm sayfa aşağı kayar, tam tıklayacağınız linkin üstüne başka bir şeye tıklarsınız
— bu can sıkıcı deneyimin adı layout shift'tir." `width`/`height` önceden belirtmenin bunu önlediğini
vurgulayın.

`loading="lazy"` için basit bir benzetme: "Bir markette raftaki her ürünü aynı anda eve taşımak yerine,
sadece o an ihtiyacınız olanı almak gibi düşünün."

## 6-7. picture/srcset ve WebP/AVIF

Bu iki slaytı kısa tutun (toplam 5-6 dakika) — amaç derinlemesine öğretmek değil, "bu konular var, ileride
(Hafta 12, duyarlı tasarım) daha çok göreceğiz" farkındalığı oluşturmak. Mümkünse bir görsel dönüştürme
aracında (online) aynı görselin JPG ve WebP boyutlarını karşılaştırıp gösterin — genelde %30-50 fark
öğrencilerin dikkatini çeker.

## 8-9. `<audio>` ve `<video>`

İkisinin yapısının neredeyse aynı olduğunu vurgulayın — `controls`, `<source>` mantığı ortak. `poster`
özniteliğinin videoya özel olduğunu, sesin görsel bir "kapağı" olmadığı için audio'da bulunmadığını belirtin.

## 10. autoplay Tuzağı

Bu slaytta öğrencilere gerçek bir deneyim hatırlatın: "Bir siteye girdiğinizde aniden sesli bir video/müzik
başladığında ne hissediyorsunuz?" Çoğu öğrenci "rahatsız oluyorum, hemen kapatıyorum" diyecektir — bunu
`autoplay`'in neden dikkatli kullanılması gerektiğine bağlayın. `muted` ile `autoplay`'in birlikte
kullanılmasının modern tarayıcılarda "kabul edilebilir" olduğunu, sessiz `autoplay`'in çoğu tarayıcı
tarafından izin verildiğini, sesli `autoplay`'in ise genelde tamamen engellendiğini belirtin.

## 11. `<track>` ile Altyazı

Sadece işitme engelliler için değil, sessiz ortamda (toplu taşıma, kütüphane) video izleyen herkes için
faydalı olduğunu vurgulayın — "erişilebilirlik özellikleri genelde herkese fayda sağlar" mesajı bu derste
sık tekrarlanan bir ilkedir.

## 12. Slider Farkındalığı

Çok kısa geçin (2 dakika) — sadece terimi tanıtın, "bunu Javascript öğrendiğimizde (Hafta 14-18) kendimiz
kodlayacağız" diyerek merak uyandırın ve devam edin.

## 13. Okulum Projesi

Bu hafta gerçek bir video/ses dosyası olmadığı için, `<video>` etiketinin `poster` özniteliğiyle ve bir
yorum satırıyla ("buraya gerçek tanıtım videosu eklenecek") nasıl "yer tutucu" olarak kullanılabileceğini
gösterin — gerçek projelerde bu çok sık karşılaşılan bir durumdur (içerik henüz hazır değilken iskeleti
kurmak).

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `<img src alt>`: `alt` her zaman dolu olmalı
- `loading="lazy"`: görünmeyen görsellerin yüklenmesini erteler
- `<picture>` / WebP: duyarlı ve küçük boyutlu görseller (güncel yaklaşım)
- `<audio>` / `<video>`: `controls` ile kullanıcı kontrolü, `autoplay` dikkatli kullanılmalı
- `<track>`: altyazı ile erişilebilirlik

## Öğretmen İçin Sık Sorulan Sorular

**"Görseli doğrudan büyük boyutta koyup CSS ile küçültsek olmaz mı?"**
Olur ama önerilmez — tarayıcı yine de büyük dosyayı indirir, sadece görsel olarak küçük gösterir. Bu,
gereksiz veri kullanımına ve yavaş yüklenmeye yol açar. Doğrusu, görseli gerçekten kullanılacağı boyutta
hazırlamaktır.

**"controls olmadan video/ses oynatılabilir mi?"**
Evet ama kullanıcı oynatıp durduramaz — bu, kullanıcı deneyimi açısından kötü bir pratiktir. `controls`
neredeyse her zaman eklenmelidir.
