# Sunum Notları — Hafta 12: Duyarlı (Responsive) Tasarım ve Media Query

> Bu not, dersi anlatacak öğretmen içindir. Bu hafta CSS ünitesinin en "somut/görsel" konularından biridir —
> öğrenciler değişikliği kendi gözleriyle, pencereyi daraltarak anında görebilir. Mümkünse dersin tamamını
> projeksiyonda canlı kod yazarak, tarayıcı penceresini sürekli daraltıp genişleterek işleyin.

## 1. Sorunun Kaynağı

Öğrencilere sorun: "Aynı Instagram sayfasını hem telefonunuzdan hem bilgisayarınızdan açtınız mı? İkisi de
aynı mı görünüyor?" Cevap hayır — ama site aslında **tek bir kod tabanı**. Duyarlı tasarım, bu tek kodun
farklı ekranlara uyum sağlamasını anlatır.

**Güncel not:** 2026 itibarıyla dünya genelinde web trafiğinin %55-60'ı mobil cihazlardan geliyor — yani
bir siteyi sadece masaüstü için tasarlamak, kullanıcıların yarısından fazlasını göz ardı etmek demektir.

## 2. Canlı Kanıt — Sabit Genişlik Sorunu

Slayttaki karşılaştırmayı gösterdikten sonra, gerçek bir örneği projeksiyonda canlı yapın: VS Code'da basit
bir `<div>` oluşturup `width: 900px` verin, tarayıcı penceresini daraltın — yatay kaydırma çubuğunun
çıktığını gösterin. Sonra `width: 900px`'i `max-width: 900px; width: 100%` ile değiştirip aynı pencereyi
daraltın — artık taşmadığını gösterin. Bu 5 dakikalık canlı demo, slayttan çok daha etkilidir.

## 3. `meta viewport` Hatırlatma

Bu satırın Hafta 3'te görüldüğünü hatırlatın ama şimdi **neden** gerekli olduğunu tam olarak açıklayın:
mobil tarayıcılar varsayılan olarak sayfayı ~980px genişliğindeymiş gibi render edip küçültür (bu, eski
masaüstü-only sitelerin mobilde "okunabilir" görünmesi için tasarlanmış bir uyumluluk mekanizmasıydı).
`viewport` meta etiketi bu davranışı kapatıp gerçek ekran genişliğini kullanmasını sağlar.

## 4-5. Media Query ve `max-width`/`min-width` Karışıklığı

Bu, haftanın **en kritik kavram yanılgısı** noktasıdır. Tahtaya büyük harflerle yazın:
- `max-width: 768px` → ekran **768px'den DAR** olduğunda çalışır (mobil kuralları için kullanılır)
- `min-width: 768px` → ekran **768px'den GENİŞ** olduğunda çalışır (masaüstü kuralları için kullanılır)

Öğrencilere küçük bir tuzak soru sorun: "Menüyü mobilde dikey yapmak istiyorum, `min-width: 700px` mi
`max-width: 700px` mi kullanmalıyım?" (Cevap: `max-width`, çünkü "ekran 700px'den darsa dikey yap" demek
istiyoruz.) Bu kavram karışıklığını örnek uygulamada canlı olarak avlayacağız.

## 6. Mobile-First / Desktop-First

Kısa geçin — sadece iki yaklaşımın var olduğunu, bu derste basitlik için desktop-first (yani önce normal
stiller, sonra `max-width` ile mobile özel değişiklikler) kullanacağımızı belirtin. İleri seviye/güncel
sektör pratiğinin mobile-first olduğunu bir farkındalık notu olarak ekleyin.

## 7. Breakpoint

"Sihirli sayı yoktur" mesajını verin — 768px, 1024px gibi değerler yaygın referans noktalarıdır ama asıl
doğru yöntem kendi tasarımınızı test edip nerede bozulduğunu gözlemlemektir. Projeksiyonda pencereyi
yavaşça daraltıp "işte burada bozulmaya başladı, breakpoint'i buraya koyacağız" diye canlı gösterin.

## 8. `clamp()`

Bu, öğrencilerin en çok "vay be" dediği kısımdır — üç ayrı media query yazmak yerine tek satırla akıcı
boyutlandırma. Söz dizimini parça parça açıklayın: `clamp(minimum, tercih_edilen, maksimum)`. `tercih_edilen`
değerin genelde `vw` (viewport width — ekran genişliğinin yüzdesi) birimiyle yazıldığını, böylece ekran
büyüdükçe/küçüldükçe otomatik ölçeklendiğini vurgulayın.

## 9. Görsellerde Duyarlılık

`max-width: 100%; height: auto` ikilisinin **neredeyse her projede kullanılan standart bir kural** olduğunu,
ezbere bilinmesi gerektiğini belirtin.

## 10. Container Query (Güncel Not)

Sadece farkındalık için — "ekranın değil, bileşenin kendi kutusunun genişliğine göre stil" fikrinin var
olduğunu söyleyip geçin, örnek koda girmeyin. Meraklı öğrenciler için kaynak önerebilirsiniz.

## 11. DevTools Cihaz Araç Çubuğu

Bu aracı **mutlaka canlı gösterin** — `F12` → cihaz simgesi (`Ctrl+Shift+M`). Farklı cihaz modelleri arasında
geçiş yapıp öğrencilere "işte gerçek bir telefon almadan test edebiliyoruz" deneyimini yaşatın. Örnek
uygulamanın tamamı bu araçla yapılacak.

## 12. Okulum Projesi — Mobilde Dikey Menü

`flex-direction: column` değişikliğinin ne kadar az kodla büyük bir fark yarattığını vurgulayın. `clamp()`
ile başlık boyutunu da güncelleyin — böylece hem menü hem tipografi aynı derste duyarlı hale gelmiş olur.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `meta viewport` olmadan duyarlı tasarımın hiçbir kuralı çalışmaz
- Sabit `px` genişlik yerine `max-width` + `%`/`vw` gibi esnek birimler kullanın
- `@media (max-width: ...)` ile ekran darken farklı kurallar uygulanır — `max-width`/`min-width` yönünü
  karıştırmamaya dikkat edin
- `clamp()` ile tek satırda akıcı boyutlandırma yapılır
- Chrome DevTools (`Ctrl+Shift+M`) ile gerçek cihaz olmadan test edilir

## Öğretmen İçin Sık Sorulan Sorular

**"Neden her zaman `max-width` kullanmıyoruz, `min-width` ne zaman işe yarar?"**
Mobile-first yaklaşımda (bu ders desktop-first işlese de sektörde yaygındır) temel stiller mobil için
yazılır, `min-width` ile büyüdükçe eklemeler yapılır. İkisi de doğrudur, önemli olan hangisini seçtiğinizi
bilerek ve tutarlı kullanmaktır.

**"Kaç tane breakpoint kullanmalıyım?"**
Sabit bir kural yok — çoğu proje için 2-3 breakpoint (mobil/tablet/masaüstü) yeterlidir. Gereksiz yere çok
breakpoint eklemek kodu karmaşıklaştırır.
