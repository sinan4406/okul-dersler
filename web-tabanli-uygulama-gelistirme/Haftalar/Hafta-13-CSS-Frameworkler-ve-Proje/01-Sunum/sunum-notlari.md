# Sunum Notları — Hafta 13: CSS Framework'leri ve Ünite Projesi

> Bu hafta, CSS ünitesinin (Hafta 9-13) kapanış haftasıdır. Hem yeni bir kavram (framework) öğretilir hem de
> önceki 4 haftada öğrenilenler "Okulum" projesi üzerinden toparlanır. İnternet bağlantısı gereklidir
> (Bootstrap CDN kullanılacak) — dersten önce sınıf bilgisayarlarında bağlantıyı test edin.

## 1-2. Framework Nedir, Neden Kullanılır?

Prefabrik ev benzetmesini kullanın: Her tuğlayı kendiniz döküp duvar örmek (sıfırdan CSS) mümkündür ve tam
kontrol sağlar, ama zaman alır. Hazır prefabrik parçalar (framework) ile çok daha hızlı inşa edersiniz, ama
her parça zaten belirli bir şekilde tasarlanmıştır. Öğrencilere sorun: "Bir e-ticaret sitesini 2 günde
teslim etmeniz gerekse, her butonu sıfırdan mı tasarlardınız?"

## 3. Popüler Framework'ler

Kısaca her birini tanıtın, derinlemesine girmeyin — bu bir "farkındalık" slaydıdır. Bootstrap'in en yaygın
olduğunu, bu yüzden bu derste onu kullanacağımızı vurgulayın.

**Güncel not:** Tailwind CSS, özellikle 2020 sonrası React/Vue gibi modern bileşen tabanlı geliştirmede
Bootstrap'in önüne geçmeye başladı — ama öğrenme eğrisi (class isimlerini ezberlemek) Bootstrap'e göre daha
diktir. Bu yüzden lise seviyesinde Bootstrap ile başlamak daha uygundur.

## 4. Bootstrap'i CDN ile Ekleme

CDN kavramını basitçe açıklayın: "Dosyayı indirmeden, internetteki hazır bir adresten doğrudan kullanmak."
Tahtaya `<link>` satırını yazdırıp `<head>` içine eklemelerini isteyin. **Sınıf testi:** Bu satırı ekleyip
sayfayı yenilediklerinde hiçbir görsel değişiklik olmayacağını söyleyin — çünkü Bootstrap sadece class
isimleriyle çalışır, class eklenmeden hiçbir şey görünmez. Bu, bir sonraki slaytın (grid) motivasyonunu
oluşturur.

## 5. Grid Sistemi

Bootstrap'in `row`/`col-md-4` sisteminin arkasında aslında Flexbox'ın çalıştığını (Hafta 10-11'de
görmediyseniz kısaca bahsedin) belirtin — yani framework, sizin zaten öğrendiğiniz CSS özelliklerini
kullanıyor, sihir değil. `col-md-4` içindeki "12'lik ızgara" mantığını tahtaya çizerek gösterin: 3 tane
`col-md-4` = 4+4+4 = 12, tam bir satırı doldurur.

## 6. Kod Karşılaştırma — Kart Bileşeni

Bu slaytı, birazdan yapılacak örnek uygulamanın (Uygulama 1) önizlemesi olarak sunun — "birazdan bunu siz
de deneyeceksiniz" diyerek merak uyandırın.

## 7. Tailwind (Utility-First)

Kısa geçin, sadece "class isimlerinin küçük ve tek işlevli olduğu" farkı vurgulayın. Bootstrap'teki
`class="card p-3"` ile Tailwind'deki `class="p-4 rounded-lg shadow bg-white"` arasındaki felsefe farkını
("hazır bileşen" vs "kendi bileşenini küçük parçalardan kurma") bir cümleyle özetleyin.

## 8. Framework'ün Bedelleri

Bu, öğrencilerin genelde atladığı ama önemli bir dengeleme noktasıdır. Vurgulayın: **Framework, temel CSS
bilgisinin yerine geçmez** — framework'ün ürettiği kodu okuyup anlayamayan biri, bir sorun çıktığında
düzeltemez. Bu ders HTML5/CSS'i sıfırdan öğrettiği için, öğrenciler framework'ü "kısayol" değil "araç" olarak
görmelidir.

## 9. Karar Verme

Öğrencilere gerçekçi senaryolar sorup hangi yaklaşımı seçeceklerini tartıştırın: "Okulunuz için bir kulüp
tanıtım sitesi yapacaksınız, framework kullanır mısınız?" gibi.

## 10. Ünite Projesi Tanıtımı

Bu haftanın örnek uygulamasında "Okulum" projesinin CSS ünitesi boyunca (Hafta 9-12) eklenen tüm
özelliklerinin nasıl tek, düzenli bir dosyada toplandığını gösterin — gerçek yazılım geliştirmede buna
**refactoring** (kodu bozmadan düzenleme/temizleme) denir, bu terimi tanıtın.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Framework = hazır, test edilmiş CSS bileşen/utility kütüphanesi
- Bootstrap = bileşen tabanlı (kart, grid, buton hazır) — bu derste kullandığımız framework
- Tailwind = utility-first — küçük class'ları birleştirerek tasarım kurma
- CDN ile framework kurulum gerektirmeden `<link>` ile eklenir
- Framework hız kazandırır ama temel CSS bilgisinin yerini tutmaz

## Öğretmen İçin Sık Sorulan Sorular

**"Framework öğrenirsek CSS öğrenmemize gerek kalmaz mı?"**
Tam tersi — framework'ün ürettiği kodu anlamak, özelleştirmek ve hata ayıklamak için CSS'i iyi bilmeniz
gerekir. Framework, CSS'in yerine geçmez, onu hızlandırır.

**"Hangi framework'ü öğrenmeliyiz, gelecekte iş bulmak için?"**
Bootstrap hâlâ çok yaygın (özellikle kurumsal/klasik projelerde), ama güncel ilanlarda Tailwind CSS talebi
hızla artıyor. İkisinin de mantığını (bileşen tabanlı vs utility-first) anlamak, birinden diğerine geçişi
kolaylaştırır.
