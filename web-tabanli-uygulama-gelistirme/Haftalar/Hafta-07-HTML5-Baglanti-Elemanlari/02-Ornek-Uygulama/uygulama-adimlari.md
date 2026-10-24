# Örnek Uygulama — Hafta 7: Bağlantı (Köprü) Elemanları

## Uygulama 1 — Bozuk Bağlantı Avı (20 dk)

**Amaç:** Bağlantıların "yazınca çalışıyormuş gibi görünüp" aslında çalışmayabileceğini canlı olarak
göstermek; dosya adı hataları, anchor (çapa) büyük/küçük harf duyarlılığı ve `target="_blank"` güvenlik
eksikliğini tanıtmak.

1. [`bozuk-baglantilar.html`](./bozuk-baglantilar.html) dosyasını tarayıcıda açın. Öğrencilerden sırayla
   her bağlantıya tıklamalarını isteyin, ne olduğunu not etsinler.
2. Sınıfla birlikte her linki tartışın:
   - **"Anasayfa'ya git"** → `anasayfa.html` diye bir dosya yok, `index.html` olmalı. Tarayıcı "sayfa
     bulunamadı" hatası verir.
   - **"Bölümlerimiz'e git"** → `#Bolumlerimiz` yazılmış ama `index.html`'deki gerçek id'si
     `id="bolumlerimiz"` (küçük harfle). **Anchor'lar büyük/küçük harfe duyarlıdır**, bu yüzden hiçbir
     yere gitmez.
   - **"İletişim sayfasına git"** → `iletsim.html` yazılmış, doğrusu `iletisim.html` (harf eksik/karışık
     yazım hatası).
   - **"Sayfa başına dön"** → `href="#"` boş bir çapa; hiçbir işlev görmez (bazı tarayıcılarda sayfanın
     en üstüne kayar, bazılarında hiçbir şey yapmaz) — kötü bir alışkanlıktır, gerçek bir hedef verilmelidir.
   - **"MEB sitesini ziyaret et"** → `target="_blank"` var ama `rel="noopener noreferrer"` **eksik**. Bu
     görsel olarak bozuk değildir, sayfa açılır — ama bir **güvenlik eksikliğidir**: yeni açılan sekme,
     `window.opener` üzerinden bizim sayfamıza (sınırlı da olsa) erişebilir; kötü niyetli bir hedef site
     bunu kötüye kullanabilir ("tabnabbing" olarak bilinir). Bu yüzden dış bağlantılarda her zaman
     `rel="noopener noreferrer"` eklemeyi alışkanlık hâline getirin.
3. Öğrenciler dosyayı düzeltsin, [`bozuk-baglantilar-cozum.html`](./bozuk-baglantilar-cozum.html) ile
   karşılaştırsın.

## Uygulama 2 — "Okulum" Projesine Bağlantı Ekleme (25 dk)

1. [`index.html`](./index.html) dosyasını açın (bir önceki haftaların devamı — henüz Hafta 6 tamamlanmadıysa
   dosyanın en üstündeki not, bu dosyanın varsayımsal bir devam noktası olduğunu açıklar; kendi Hafta 6
   çıktınızla uyumlu hâle getirebilirsiniz).
2. `nav` içindeki bağlantıların bir kısmının **sayfa içi çapa** (`#hakkimizda`, `#bolumlerimiz`, `#galeri`)
   olduğunu, tıklanınca sayfanın ilgili bölümüne kaydığını gösterin.
3. Yeni bir `iletisim.html` sayfası oluşturun (veya ekteki [`iletisim.html`](./iletisim.html) dosyasını
   inceleyin) — bu, öğrencilerin **ilk defa iki ayrı HTML dosyasını birbirine bağladığı** andır.
4. `index.html`'deki `nav` ve `footer`'a `iletisim.html`'e giden bir bağlantı ekleyin; `iletisim.html`'e de
   geri dönüş bağlantıları ekleyin. İki dosya arasında ileri-geri gezinerek test edin.
5. `index.html`'e MEB sitesine giden, `target="_blank" rel="noopener noreferrer"` içeren bir dış bağlantı
   ekleyin (bkz. dosyadaki "Kaynaklar" bölümü).

> **Not:** `iletisim.html`'de şimdilik sadece adres/telefon/e-posta bilgisi var — gerçek bir iletişim
> **formu** Hafta 8'de (Form Elemanları) eklenecek.

## Ders Akışı Önerisi
- İlk 20 dk: Uygulama 1 (bozuk bağlantı avı) — yüksek katılımlı, tartışmalı bir açılış olsun.
- Kalan süre: Uygulama 2 — Okulum projesine gerçek bağlantılar eklensin.
