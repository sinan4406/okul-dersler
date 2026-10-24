# Örnek Uygulama — Hafta 16: Kontrol Yapıları

## Uygulama 1 — `==` mi, `===` mi? Şaşırtıcı Karşılaştırmalar (20 dk)

**Amaç:** `==`'nin "tip zorlama" (type coercion) yaptığını, bunun bazen beklenmedik/yanıltıcı sonuçlar
verebileceğini canlı olarak göstermek ve "neden hep `===` kullanıyoruz" kuralını somutlaştırmak.

1. [`esittir-karsilastirma.html`](./esittir-karsilastirma.html) dosyasını açın, konsolu (F12) açın.
2. Sayfayı yenileyin, konsoldaki sonuçları birlikte okuyun. Her satırdan önce öğrencilere tahmin ettirin:
   "`5 == "5"` sizce true mu, false mu?" — çoğu öğrenci ilk başta yanlış tahmin eder, bu normaldir ve
   öğretici bir andır.
3. En çarpıcı üç sonucu birlikte tartışın: `0 == false`, `"" == false`, `null == undefined` — hepsi
   `true` döner! "Bilgisayar bu ikisini 'aynı' sayıyor ama biz aslında farklı şeyler kastediyoruz, bu
   tehlikeli."
4. **Kural, tahtaya yazın:** "Bu dersten itibaren `==` ve `!=` yerine her zaman `===` ve `!==` kullanacağız."

## Uygulama 2 — "Okulum" Formuna if/else ile Doğrulama Ekleme (30 dk)

1. [`script.js`](./script.js) dosyasını açın — Hafta 15'teki form gönderme kodunun üzerine 3 yeni kontrol
   eklendiğini gösterin: ad boş mu, e-posta "@" içeriyor mu, mesaj boş mu.
2. Her `if` bloğunun sonunda neden `return;` olduğunu açıklayın: "Eğer ad boşsa, hatayı gösterip
   fonksiyonu **hemen durduruyoruz** — aşağıdaki kontrollere ve 'başarılı' mesajına hiç gitmiyoruz."
3. [`iletisim.html`](./iletisim.html) dosyasını tarayıcıda açın, sırasıyla test edin:
   - Formu tamamen boş gönderin → "Lütfen adınızı yazın." hatası.
   - Sadece ad girip gönderin → "Lütfen geçerli bir e-posta adresi girin." hatası.
   - Ad + geçersiz e-posta (örn. `ahmetgmail.com`, "@" yok) girip gönderin → yine e-posta hatası.
   - Tüm alanları doğru doldurup gönderin → yeşil "Mesajınız alındı!" mesajı.
4. **Tartışma:** "Neden `eposta.includes('@')` yeterli, gerçek bir e-posta doğrulaması mı bu?" (Hayır,
   gerçek doğrulama çok daha karmaşıktır — burada amacımız kontrol yapılarını **uygulamalı** öğrenmek,
   production kalitesinde bir doğrulama yazmak değil. Gerçek/sağlam doğrulama .NET Core ünitesinde
   Hafta 28-29'da işlenecek.)

## Uygulama 3 — if/else Yığını mı, switch mi? (15 dk)

Tahtada örnek bir senaryo üzerinden (örn. "not harfe çevirme": 90+ → AA, 80-89 → BA, ...) önce uzun bir
`if/else if` zinciri, sonra aynı mantığı `switch` ile (aralık kontrolü switch'e pek uygun olmadığı için
bu örnekte `if/else` daha doğal kalır — bunun yerine "gün ismi" gibi **eşitlik tabanlı** bir örnek
kullanın: `switch (gunNumarasi) { case 1: ... }`) yazıp karşılaştırın. Sunumdaki kod karşılaştırma
slaytını burada tekrar açıp tartışabilirsiniz.

> Bir sonraki hafta (Hafta 17), formdan gelen verileri artık tek tek değişkenlerde değil, **dizilerde**
> tutmayı öğreneceğiz.
