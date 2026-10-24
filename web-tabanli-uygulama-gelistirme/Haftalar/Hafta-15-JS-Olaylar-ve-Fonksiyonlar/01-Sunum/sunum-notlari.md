# Sunum Notları — Hafta 15: Olaylar ve Fonksiyonlar

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu hafta, öğrencilerin sayfalarının **ilk kez gerçekten
> etkileşimli** hâle geldiği derstir — bir butona basınca bir şey oluyor. Motivasyonu yüksek tutmak için
> "Butonum Neden Çalışmıyor?" demosuna yeterli zaman ayırın, bu haftanın can alıcı noktasıdır.

## Konsol Alışkanlığını Sürdürme

Hafta 14'te oturttuğumuz "F12 ile konsolu açık tutma" alışkanlığını bu hafta da sürdürün — bu hafta
hem hata mesajları (bug avı) hem de `console.log` ile form verisini görüntüleme için konsol kritik önemde.

## 1-4. Fonksiyon Kavramı, Tanımlama, Parametre/Argüman, `return`

Tarif (reçete) benzetmesini kullanın: "Kek tarifi bir fonksiyondur — malzemeler (parametreler) verirsiniz,
tarif işlemi yapar (fonksiyon gövdesi), size bir kek verir (return)." Parametre/argüman ayrımını fazla
uzun tutmayın (kavramsal bir incelik), ama doğru terimleri kullanmalarını teşvik edin.

**Sık hata:** Öğrenciler fonksiyonu tanımlayıp **çağırmayı unutur**, "neden bir şey olmuyor?" diye sorar.
Bu noktada "tarif yazmak yemek pişirmek değildir, tarifi uygulamanız (çağırmanız) gerekir" benzetmesini
tekrarlayın.

## 5. Ok (Arrow) Fonksiyonlar

Bu, sadece "daha kısa yazım" değil — bu hafta boyunca (ve Hafta 16-18'de) sürekli `addEventListener(...,
() => {...})` şeklinde kullanacağımız için önceden tanıtmak önemli. Klasik `function` ile ok fonksiyonun
aynı işi yaptığını, sadece söz diziminin farklı olduğunu vurgulayın.

## 6-7. Olay Kavramı ve Olay Dinleme Yöntemleri

`onclick="..."` (satır içi) yönteminin HTML ve JS'i karıştırdığını, `addEventListener`'ın ise ayrı
tuttuğunu vurgulayın — bu, Hafta 14'te öğrendiğimiz "HTML=yapı, JS=davranış, ayrı tutulmalı" ilkesinin
doğal devamıdır.

## 8. "Butonum Neden Çalışmıyor?" — Haftanın En Önemli Anı

Slaytta teoriyi kısaca gösterip hemen **02-Ornek-Uygulama**'daki `buton-calismiyor.html` ile canlı
gösterime geçin (bkz. `uygulama-adimlari.md` — Uygulama 1). Öğrencilerin konsoldaki
`Cannot read properties of null` hatasını **kendi gözleriyle** görmesi, "script'i neden body sonuna
koyuyoruz" kuralını ezbere değil, anlayarak öğrenmelerini sağlar.

**Önemli:** Bu hatayı önceden bir kez daha görmüşlerdi aslında — Hafta 3'te "bozuk kod avı" ile charset
hatasını görmüşlerdi. Bu paralelliği kurabilirseniz ("yine bir 'yanlış talimat verdik, tarayıcı da bizim
dediğimizi yaptı' durumu") kavramsal bütünlük güçlenir.

## 9. Olay Nesnesi — `e.preventDefault()`

Bu satırın neden gerekli olduğunu **canlı olarak, önce OLMADAN, sonra OLARAK** gösterin: script.js'teki
`e.preventDefault()` satırını geçici olarak yorum satırına alıp formu gönderin — sayfanın yenilendiğini
ve yazılanların kaybolduğunu gösterin. Sonra satırı geri açıp farkı gösterin. Bu küçük "önce/sonra" demosu
çok etkilidir.

## 10. Olay Kabarması

Sadece farkındalık düzeyinde geçin, örnek/uygulama gerektirmez. "İleride, özellikle çok sayıda benzer
buton olduğunda (örneğin bir listedeki her öğeye ayrı dinleyici eklemek yerine, listenin kendisine tek
bir dinleyici eklemek) bu kavram işinize yarayacak" notuyla merak uyandırabilirsiniz.

## 11. "Okulum" Projesine Olay Ekleme

Bu bölümde 02-Ornek-Uygulama'daki gerçek proje dosyalarına geçin — bkz. `uygulama-adimlari.md`
Uygulama 3. `if (iletisimFormu) {...}` kontrolünün neden gerekli olduğunu mutlaka açıklayın — bu, aynı
`script.js` dosyasının hem `index.html` hem `iletisim.html`'e bağlı olmasından kaynaklanan pratik bir
zorunluluktur ve Uygulama 1'de öğrenilen dersin doğrudan bir uygulamasıdır.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Fonksiyon = tekrar kullanılabilir kod bloğu; `function` veya ok (`=>`) ile tanımlanır
- Parametre (tanımda) / argüman (çağrıda) / `return` (sonucu geri verir)
- `addEventListener()` ile olay dinleme — `onclick`'ten daha temiz
- `e.preventDefault()` — formun sayfayı yenilemesini engeller
- Script konumu: body sonunda olmalı, aksi hâlde `null` hatası

## Öğretmen İçin Sık Sorulan Sorular

**"Neden bazen `function selamVer() {}`, bazen `const selamVer = () => {}` görüyoruz, ikisi aynı mı?"**
İşlevsel olarak çoğu durumda aynı sonucu verirler; bu ders kapsamında ikisini de "doğru" kabul ediyoruz,
ama olay dinleyicilerinde kısalığı nedeniyle ok fonksiyonları tercih edeceğiz.

**"addEventListener'a neden fonksiyonu parantezsiz veriyoruz, çağırmıyoruz mu?"**
Çok iyi bir soru — `addEventListener("click", calisacakFonksiyon)` derken fonksiyonu **hemen çağırmıyoruz**,
sadece "olay gerçekleştiğinde bunu çağır" diye tarayıcıya bir talimat/referans veriyoruz. Eğer yanlışlıkla
`calisacakFonksiyon()` (parantezli) yazarsak, fonksiyon sayfa yüklenir yüklenmez hemen çalışır — bu da
sık yapılan bir hatadır, fırsat bulursanız gösterebilirsiniz.
