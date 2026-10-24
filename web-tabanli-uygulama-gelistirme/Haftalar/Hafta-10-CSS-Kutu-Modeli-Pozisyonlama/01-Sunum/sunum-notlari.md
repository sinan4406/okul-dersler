# Sunum Notları — Hafta 10: Kutu Modeli (Box Model) ve Pozisyonlama

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu hafta, CSS ünitesinin en "görsel" ve pratik
> konularından biridir — bol canlı örnek ve öğrencilerin kendi gözleriyle "önce/sonra" görmesi önemlidir.

## 1-2. Kutu Modeli ve 4 Katman

Slayttaki iç içe geçmiş diyagramı (margin → border → padding → content) birebir tahtaya da çizin. Gerçek
tarayıcı DevTools'unda (F12 → Elements → herhangi bir elemana tıklayıp sağdaki "Computed" sekmesi) bu 4
katmanın renkli kutular olarak göründüğünü canlı gösterebilirseniz çok daha akılda kalıcı olur.

## 3. margin / padding

Çerçeveli tablo benzetmesini kullanın. **Sık hata:** öğrenciler ikisini karıştırır, "arka plan rengi
padding'i kaplar ama margin'i kaplamaz" farkını mutlaka bir örnek üzerinde (renkli arka planlı bir kutu)
gösterin — bu, iki kavramı ayırt etmenin en hızlı yoludur.

## 4. box-sizing — Bu Haftanın En Önemli Konusu

Bu kavramı [`kutu-tasmasi-demo.html`](../02-Ornek-Uygulama/kutu-tasmasi-demo.html) ile **mutlaka canlı**
gösterin (bkz. Uygulama 1). Matematiği tahtada adım adım yapın: `280 + 20+20 + 4+4 = 328px`. Öğrencilerin
çoğu "width dediysem width odur" diye düşünür — bu yanılgıyı kırmak, bu haftanın en kritik kazanımıdır.

**Vurgu:** Modern CSS'te neredeyse her projede en başta şu satır yazılır:
```css
* { box-sizing: border-box; }
```
Bu, "Okulum" projemizin `style.css` dosyasında Hafta 9'dan beri zaten var — şimdi *neden* orada olduğunu
tam olarak anlıyoruz.

## 5. display: block / inline / inline-block

Tahtaya üç örnek yan yana yazıp hangi etiketlerin varsayılan olarak hangi display türünde olduğunu sorun:
`<div>`, `<p>`, `<h1>` → block; `<a>`, `<span>`, `<strong>` → inline. "Neden bir `<a>` etiketine width
verdiğimde çalışmıyor?" sorusunun cevabının burada olduğunu (inline elemanlarda width/height etkisizdir)
vurgulayın.

## 6-9. Flexbox

Flexbox'ı **çok kısa ve pratik** tutun — bu ders "Flexbox uzmanı" yetiştirmiyor, "temel bir yatay menü
kurabilecek" seviyeyi hedefliyor. [`flex-oncesi-sonrasi.html`](../02-Ornek-Uygulama/flex-oncesi-sonrasi.html)
ile tek satırlık `display: flex` farkını gösterin — bu, öğrencilerin "vay be, bu kadar mı kolay" dediği bir
andır.

`justify-content`/`align-items` için "yatay = justify, dikey = align" kısayolunu tahtaya yazın; ezberlemekte
zorlanan öğrenciler için işe yarar.

## 10-12. Position

Beş `position` değerini tek tek uzun uzun işlemek yerine, slaytta olduğu gibi hızlıca tanıtıp **asıl odağı
`sticky`ye** verin çünkü bu, "Okulum" projesinde gerçekten kullanılan ve öğrencinin görsel olarak
doğrulayabileceği tek değerdir. `relative`+`absolute` ikilisini "rozet" örneğiyle (bir kartın köşesine
"Yeni!" etiketi eklemek gibi) somutlaştırın ama derinlemesine alıştırma yaptırmayın — bu konu ileri CSS
projelerinde daha çok karşılarına çıkacak.

**`sticky` demosu:** "Okulum" projesinin `index.html`'ini açıp sayfayı kaydırın — header'ın üstte
"yapıştığını" canlı gösterin. Bunu görmek, tanımdan çok daha etkilidir.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Kutu modeli: content → padding → border → margin
- `box-sizing: border-box` → width'in padding+border'ı da içermesini sağlar
- `display: flex` + `gap` → modern, kolay yatay/dikey dizilim
- `position: sticky` → kaydırınca "yapışan" elemanlar için (örn. header)

## Öğretmen İçin Sık Sorulan Sorular

**"Neden her projede `box-sizing: border-box` yazmıyoruz, tarayıcı varsayılanı neden bu değil?"**
Tarihsel bir neden — CSS'in ilk yıllarında `content-box` standart olarak belirlendi ve geriye dönük
uyumluluk (eski siteleri bozmamak) için hiç değiştirilmedi. Bu yüzden geliştiriciler her projenin başında
elle `border-box`'a geçer.

**"Flexbox ile Grid arasındaki fark nedir?"**
Flexbox tek eksende (satır ya da sütun) dizilim için, Grid ise hem satır hem sütunu aynı anda kontrol eden
2 boyutlu yerleşimler için idealdir. Bu derste sadece Flexbox işlenir; Grid'e meraklı öğrencilere ekstra
kaynak önerilebilir (bkz. Güncel Konular ve Kaynaklar dosyası).

**"position: fixed ile sticky farkı nedir?"**
`fixed` her zaman ekrana göre sabittir (sayfanın en başından itibaren orada durur), `sticky` ise önce normal
akışta yer alır, belirli bir noktaya gelince "yapışır" — `sticky` daha doğal bir kullanıcı deneyimi sağlar.
