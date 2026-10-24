# Sunum Notları — Hafta 11: Renk Kullanımı ve Tipografi

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu hafta, CSS ünitesinin son "görsel biçimlendirme"
> haftasıdır ve "Okulum" projesinin HTML5+CSS kapsamındaki son büyük eklemesini içerir (Hafta 12-13'te
> sadece duyarlı tasarım ve framework tanıtımı eklenecek).

## 1. Renk Neden Önemli?

Kısa bir ısınma sorusu sorun: "Hangi markaları sadece renginden tanırsınız?" (Coca-Cola kırmızısı, WhatsApp
yeşili, Facebook mavisi gibi örnekler gelecektir). Bu, rengin salt estetik değil, **kimlik** meselesi
olduğunu somutlaştırır.

## 2-3. HEX / RGB / İsimli Renkler

RGB'yi anlatırken "ekran, karanlık bir odada 3 renkli el fenerini (kırmızı, yeşil, mavi) aynı noktaya
tutmak gibidir; ışıkları ne kadar açarsanız o kadar parlak renk elde edersiniz" benzetmesi işe yarar.
HEX kodunun aslında RGB'nin farklı bir yazım şekli (16'lık sayı sistemi) olduğunu, ayrıntısına girmeden
kısaca belirtin — "tasarım araçlarından direkt kopyalarsınız, elle hesaplamanıza gerek yok" demek yeterli.

## 4. Modern Renk Fonksiyonları

Sadece 2-3 dakikalık bir farkındalık notudur, sınavda sorulmaz. Amaç "gerçek projelerde bunları görürseniz
şaşırmayın" mesajıdır.

## 5-6. CSS Özel Değişkenleri (Custom Properties)

Bu, haftanın **en önemli teknik kazanımı**dır. [`renk-degiskeni-demo.html`](../02-Ornek-Uygulama/renk-degiskeni-demo.html)
ile mutlaka canlı gösterin (bkz. Uygulama 1) — bir değişkeni değiştirip 5 elemanın birden değiştiğini
görmek, tanımdan çok daha etkili bir öğretim anıdır.

**Sık hata:** Öğrenciler `--degisken` tanımlarken başındaki iki tireyi unutur, veya kullanırken
`var()` sarmalamayı unutup direkt `color: --ana-renk;` yazar — ikisi de sessizce çalışmaz. Bunu önceden
uyarın.

## 7. Kontrast ve Erişilebilirlik

[`kontrast-demo.html`](../02-Ornek-Uygulama/kontrast-demo.html) ile canlı gösterin. Bu konuyu ciddiye
almalarını sağlamak için gerçek bir senaryo verin: "Büyükanneniz/büyükbabanız sizin yaptığınız siteyi
ziyaret etse, bu açık gri yazıyı okuyabilir miydi?"

## 8-11. Tipografi

`font-family`, `font-size`, `font-weight` kavramlarını hızlıca geçin — bunlar sezgiseldir. Asıl zaman
ayırmanız gereken kısım Google Fonts entegrasyonudur (bkz. Uygulama 3) çünkü bu, öğrencilerin "Okulum"
projesine hemen uygulayabileceği somut bir adımdır.

**Canlı demo önerisi:** Projeksiyonda fonts.google.com'a gidip bir font arayın, "Get font" → embed kodunu
kopyalayıp birlikte `<head>`'e yapıştırın — bu adımı bizzat görmek, öğrencilerin kendi projelerinde
yapmalarını çok kolaylaştırır.

## 12. Karanlık Mod (prefers-color-scheme)

Sadece bir farkındalık notu — uygulama yaptırmayın, ama "CSS değişkenleri kullandığınızda böyle bir özelliği
eklemenin ne kadar kolay olduğunu" vurgulayın; bu, değişken kullanmanın bir başka somut faydasıdır.

## 13. "Okulum" Projesinin Son Hâli

Bu, HTML5 (Hafta 3-8) ve CSS (Hafta 9-11) ünitelerinin ortak ürünüdür. Projeyi baştan sona (index.html →
duyarlı olmayan hâliyle bile) gösterip "3 haftada, sıfırdan, gerçek bir okul tanıtım sitesi kurduk" mesajını
vurgulayarak dersi bitirmek motive edicidir.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Renk: HEX / RGB / isimli renkler; erişilebilirlik için yeterli kontrast şart
- CSS özel değişkenleri (`:root { --degisken }`) → tek noktadan renk/tema yönetimi
- Tipografi: `font-family`, `line-height`, Google Fonts ile özgün fontlar
- "Okulum" projesi artık kendi renk paletine ve fontlarına sahip

## Öğretmen İçin Sık Sorulan Sorular

**"CSS değişkeni ile Javascript değişkeni aynı şey mi?"**
Hayır — CSS değişkenleri sadece stil değerlerini (renk, boyut vb.) saklar, hesaplama yapmaz. Javascript
değişkenleri (Hafta 14'te göreceğiz) çok daha güçlüdür ama CSS değişkenleriyle karıştırılmamalıdır.

**"Google Fonts ücretsiz mi, her zaman kullanabilir miyim?"**
Evet, fonts.google.com'daki tüm fontlar ücretsiz ve ticari projelerde de kullanılabilir durumda lisanslıdır.

**"Neden bazı sitelerde yazı tipi bazen değişiyor, bazen hep aynı kalıyor (yüklenirken)?"**
Google Fonts internetten yüklendiği için, yavaş internet bağlantısında font gelene kadar tarayıcı geçici
bir sistem fontu gösterebilir — buna "flash of unstyled text" denir, ileri düzey bir performans konusudur.
