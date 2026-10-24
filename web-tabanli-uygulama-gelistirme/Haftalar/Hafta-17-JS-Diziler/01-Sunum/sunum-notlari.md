# Sunum Notları — Hafta 17: Diziler

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Slaytlardaki her başlığın altında, sınıfta sözlü olarak
> anlatılması önerilen açıklamalar, örnekler ve olası öğrenci soruları yer alır.

## 1. Neden Diziye İhtiyacımız Var?

Önce "kötü" yolu gösterin: 5-6 öğrenciyi ayrı ayrı değişkenlere atayın, sonra "peki 50 öğrenci olsaydı?"
diye sorun. Bu, dizinin **neden var olduğunu** hissettirir — sözdizimini ezberletmeden önce motivasyonu
oturtmak önemlidir.

## 2. Dizi Oluşturma

`[ ]` sözdizimini vurgulayın. Bir dizinin farklı tipte veriler tutabildiğini (metin + sayı + boolean bir
arada) göstermek şaşırtıcı gelebilir — "JavaScript esnek bir dildir" notunu buraya iliştirebilirsiniz.

## 3. Index, 0'dan Başlar — EN KRİTİK KURAL

Bu, tüm haftanın en çok hataya yol açan noktasıdır. Bolca zaman ayırın. Slayttaki kutu görselini kullanarak
"4 elemanlı bir dizide indexler 0, 1, 2, 3'tür — 4 değil!" cümlesini birkaç kez tekrarlayın. Öğrencilere
sorun: "5 elemanlı bir dizinin son index'i kaçtır?" (Cevap: 4, çünkü 5 − 1.)

**Sık karışan nokta:** Öğrenciler "length" ile "son index"i karıştırır — length = eleman SAYISI, son index
= length − 1. Bu ayrımı tahtaya büyük yazın.

## 4. Erişim ve `undefined` Tuzağı

Var olmayan bir index'e erişmenin **hata fırlatmadığını**, sessizce `undefined` döndürdüğünü mutlaka
vurgulayın — bu, JavaScript'in diğer bazı dillerden (örn. Java, C#) farklı davrandığı, öğrencilerin ileride
sürekli karşılaşacağı bir davranıştır. "Hata almamak, kodun doğru çalıştığı anlamına gelmez" mesajı önemli.

## 5. `length` Özelliği

`dizi[dizi.length - 1]` kalıbını ezberletin — bu, "son elemana güvenli erişim" için standart bir kalıptır.

## 6. "Kayıp Eleman" — Off-by-One Hatası

Bu haftanın **en önemli "aha" anı**dır. Slaytı geçtikten hemen sonra **02-Ornek-Uygulama/kayip-eleman.html**
dosyasını açıp gerçek konsol çıktısında `undefined` değerini birlikte görün (bkz. `uygulama-adimlari.md` —
Uygulama 1). Öğrencilere önce "bu kodda ne yanlış olabilir?" diye sorup kendi başlarına düşünme fırsatı
verin, sonra birlikte çözün.

**Öğretmen notu:** `<=` yerine `<` kullanmanın neden doğru olduğunu tahtada adım adım (i=0,1,2,3 döngüsü,
`<=` ile i=4'te de çalışır ama index 4 yoktur) gösterin.

## 7-8. Değiştirme, `push()` / `pop()`

Bu metotları canlı olarak konsolda deneyin — öğrenciler `console.log(dizi)` çıktısının her adımda nasıl
değiştiğini görsün. `unshift()`/`shift()`'i sadece isim olarak anın, detaya girmeyin (nadiren kullanılırlar).

## 9-10. `for` Döngüsü vs `forEach()`

Klasik `for` döngüsünün hâlâ **geçerli ve gerekli** olduğunu (özellikle index'e ihtiyaç duyulduğunda)
vurgulayın — `forEach`'in "daha modern" olması onu her zaman "daha doğru" yapmaz, sadece bazı durumlarda
daha okunaklı ve hataya daha az açıktır. İki yaklaşımı da bilmeleri gerektiğini belirtin.

## 11. `map()`

`map()` ile `forEach()` arasındaki farkı netleştirin: `forEach` bir şey **yapar** (örn. yazdırır), `map` ise
bir şey **döndürür** (yeni bir dizi üretir). Bu ayrımı karıştırmak çok yaygın bir hatadır.

## 12. Diğer Metotlar (Hızlı Tur)

`filter`, `find`, `includes`, `at()` metotlarını şimdilik sadece **tanıtım** düzeyinde bırakın — kullanım
örnekleri ödevde ve ileride pekiştirilecek. Bu slaytta amaç "bu isimler kulağa tanıdık gelsin" düzeyidir.

## 13. "Okulum" Projesi — Bölümler Listesi

Bu, projenin **veri ile görünümü ayırma** fikrine ilk somut adımıdır — ileride (Hafta 19+ .NET Core
ünitesinde) veritabanından gelen veriyi ekrana basma mantığının temelini burada atıyoruz. Uygulamada
(`uygulama-adimlari.md` — Uygulama 3) bu kodu birlikte `script.js` dosyasına ekleyeceksiniz.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Dizi = sıralı, tek değişkende tutulan veri listesi, `[ ]` ile oluşturulur
- Index HER ZAMAN 0'dan başlar — bu haftanın en kritik kuralı
- `dizi.length` = eleman sayısı, son index = `length - 1`
- `push()/pop()` ekler/çıkarır, `for/forEach/map` ile dizi gezilir
- Modern metotlar (forEach, map, filter, find) off-by-one hatası riskini azaltır

## Öğretmen İçin Sık Sorulan Sorular

**"Neden bazen `for`, bazen `forEach` kullanıyoruz — hangisi 'doğru'?"**
İkisi de doğru, duruma göre değişir. Index'e ihtiyacınız yoksa (sadece her elemanla bir şey yapacaksanız)
`forEach` daha temizdir. Döngüyü erken durdurmanız gerekiyorsa (`break`) klasik `for` (veya `for...of`)
gerekir çünkü `forEach` içinde `break` kullanılamaz — bu ileri düzey bir not, sorulursa cevaplayın.

**"Dizinin içine dizi konabilir mi?"**
Evet (iç içe diziler / "matris" mantığı), ama bu dersin kapsamı dışında — meraklı öğrencilere "araştırma
konusu" olarak önerebilirsiniz.
