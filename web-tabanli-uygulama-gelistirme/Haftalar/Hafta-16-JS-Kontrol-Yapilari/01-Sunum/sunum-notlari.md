# Sunum Notları — Hafta 16: Kontrol Yapıları

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu hafta öğrencilerin kodlarına ilk kez **gerçek karar
> verme yeteneği** kazandırdığı derstir. Kavramsal olarak matematikteki "eğer... ise..." mantığına çok
> yakındır, bu benzetmeyi kullanmak işe yarayabilir.

## Konsol Alışkanlığını Sürdürme

Hafta 14-15'te oturttuğumuz F12/konsol alışkanlığı bu hafta da devam ediyor — özellikle `==` / `===`
demosu tamamen konsol üzerinden yürüyecek.

## 1-2. Neden Kontrol Yapılarına İhtiyaç Var, `if/else`

Günlük hayattan örnekle başlayın: "Eğer hava yağmurluysa şemsiye al, değilse alma." Bu cümledeki "eğer...
ise... değilse..." yapısının birebir `if/else` karşılığı olduğunu gösterin. `{ }` parantezlerinin bloğun
sınırlarını belirlediğini vurgulayın — **sık hata:** öğrenciler `{ }` unutabilir, tek satırlık `if`'lerde
bu "çalışıyor gibi görünüp" aslında yanlış davranabilir; bu dersimizde her zaman `{ }` kullanmayı zorunlu
tutun.

## 3. Karşılaştırma Operatörleri

Bu bölüm nispeten kolay geçer, hızlı ilerleyebilirsiniz. `===`'nin "değer VE tip" kontrolü yaptığını
şimdiden vurgulayın — bir sonraki slaytın (04) zeminini hazırlar.

## 4. `==` vs `===` — Haftanın En Önemli Anı

Slaytta teoriyi kısaca gösterip hemen **02-Ornek-Uygulama**'daki `esittir-karsilastirma.html` ile canlı
gösterime geçin (bkz. `uygulama-adimlari.md` — Uygulama 1). Her satırdan önce öğrencilere **tahmin
ettirin** — bu, pasif dinlemek yerine aktif katılım sağlar ve yanlış tahmin edip sonra doğrusunu görmek
çok daha kalıcı bir öğrenmedir.

**Bağlantı kurun:** Bu hafta 14'teki "Neden 5+8=58 çıktı?" demosuyla aynı köktendir — Javascript'in
farklı veri tiplerini "esnek" bir şekilde birbirine çevirmeye çalışması (tip zorlama/type coercion), hem
`+` operatöründe hem `==` operatöründe benzer şaşırtıcı sonuçlara yol açar. Bu paralelliği kurabilirseniz
öğrencilerin kavramsal bütünlüğü güçlenir.

## 5-6. Mantıksal Operatörler ve Kısayollar

`&&` / `||` için basit gerçek hayat örnekleri kullanın: "Ehliyet almak için 18 yaşında OLMALI **VE**
sınavı geçmiş OLMALI" (`&&`), "İndirimden yararlanmak için öğrenci **VEYA** emekli olmak yeterli" (`||`).
`??` operatörünü fazla derinleştirmeyin, sadece "varsayılan değer atama" kısayolu olarak tanıtın.

## 7-8. `switch` ve if/else Karşılaştırması

`break` unutulduğunda "fall-through" davranışını (bir sonraki case'e düşme) kısaca gösterebilirseniz
iyi olur — küçük bir kod örneğiyle `break`'siz bir switch çalıştırıp beklenmedik çıktı gösterin. Switch'in
her koşulda if/else'in yerini tutmadığını (aralık kontrolü yapamadığını) mutlaka vurgulayın.

## 9. Ternary Operatör

"Kısa ve havalı görünüyor diye her yerde kullanmayalım" uyarısını yapın — iç içe ternary (`a ? b : c ? d
: e`) okunabilirliği ciddi şekilde bozar, bu derste sadece **tek katmanlı, basit** ternary kullanacağız.

## 10. "Okulum" Formuna Doğrulama Ekleme

Bu bölümde 02-Ornek-Uygulama'daki gerçek proje dosyalarına geçin — bkz. `uygulama-adimlari.md`
Uygulama 2. `return;`'ün fonksiyonu **orada durdurduğunu**, aşağıdaki kontrollere hiç gidilmediğini
tahtada adım adım (her `if` bloğunu ayrı ayrı test ederek) gösterin.

**Önemli sınırlama notu:** Öğrencilere bu doğrulamanın "gerçek/production kalitesinde" olmadığını,
sadece bu haftanın konusunu (kontrol yapıları) uygulamalı pekiştirmek için yazıldığını belirtin — sağlam
form doğrulama .NET Core ünitesinde (Hafta 28-29, Data Annotations ve sunucu taraflı doğrulama) tekrar
ele alınacak.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `if / else if / else` ile koşullu kod akışı
- `===` / `!==` her zaman tercih edilir, `==` / `!=` kullanılmaz (tip zorlama riski)
- `&&` (VE) / `||` (VEYA) / `!` (DEĞİL) ile koşul birleştirme
- `switch` — tek değişkenin çoklu eşitlik kontrolü için
- Ternary (`? :`) — sadece basit, tek satırlık kararlar için

## Öğretmen İçin Sık Sorulan Sorular

**"Hiç `==` kullanmayacaksak, neden hâlâ var, neden dilden kaldırılmadı?"**
Javascript'in ilk sürümlerinden beri var ve geriye dönük uyumluluk nedeniyle kaldırılamaz; internette
göreceğiniz eski kod örneklerinde sıkça karşınıza çıkacak. Yeni kod yazarken biz tercih etmiyoruz.

**"switch içinde break koymazsam ne olur, hep hata mı verir?"**
Hata vermez, ama "fall-through" denen bir davranışla bir sonraki `case`'in kodu da çalışır — bu, çoğu
zaman istenmeyen ve fark edilmesi zor bir hatadır. Bu yüzden her `case`'in sonuna `break` koymayı bir
alışkanlık hâline getirmelerini isteyin.
