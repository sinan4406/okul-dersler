# Ödev — Hafta 9: CSS'e Giriş, Ekleme Yöntemleri ve Seçiciler

## Görev 1 — CSS Hata Avcısı

Ekteki [`bozuk-stil.html`](./bozuk-stil.html) ve [`bozuk-stil.css`](./bozuk-stil.css) dosyalarını aynı klasöre
kaydedip tarayıcıda açın. Sayfada **hiçbir stil uygulanmadığını** göreceksiniz. Toplamda **4 hata** var —
bulup düzeltin:

1. Dosyayı tarayıcıda açın — hiçbir renk/hizalama yok. Önce `<link>` etiketinin doğru dosyayı çağırıp
   çağırmadığını kontrol edin.
2. Bağlantıyı düzelttikten sonra tekrar açın — bu sefer bazı stillerin uygulandığını, bazılarının hâlâ
   çalışmadığını göreceksiniz. `bozuk-stil.css` dosyasını satır satır inceleyip kalan 3 hatayı bulun
   (ipucu: bir seçici tipinde eksik bir işaret var, bir özellik adı yanlış yazılmış, bir kuralın sonunda
   eksik bir noktalı virgül var).
3. Tüm hataları düzelttikten sonra: başlık yeşil ve ortalanmış, "Son kayıt tarihi" yazısı kırmızı, tüm
   paragraflar 18px boyutunda ve açık gri arka planlı görünmelidir.
4. Bulduğunuz her hatayı ("X satırında Y hatası vardı, Z olarak düzelttim" formatında) kısa bir liste
   hâlinde yazıp düzeltilmiş dosyalarla birlikte teslim edin.

## Görev 2 — "Hakkımda" Sayfamı CSS ile Giydiriyorum

Hafta 3'te oluşturduğunuz `hakkimda.html` dosyasını (yoksa şimdi en az 3 paragraflık basit bir tane
oluşturun) alıp, **harici bir CSS dosyası** (`hakkimda.css`) ile stillendirin. Aşağıdaki gereksinimleri
sağlayın:

- [ ] CSS dosyası `<link rel="stylesheet">` ile bağlanmış (dahili veya satır içi **değil**).
- [ ] En az **1 etiket seçicisi** kullanılmış (örn. tüm `p`'lere ortak bir stil).
- [ ] En az **1 class seçicisi** kullanılmış (örn. önemli bir paragrafı `class="vurgu"` ile işaretleyip
      farklı bir arka plan rengi vermek).
- [ ] En az **1 id seçicisi** kullanılmış (örn. ana başlığa `id="ana-baslik"` verip özel bir stil vermek).
- [ ] CSS dosyasının en üstüne, her seçiciyi neden o şekilde seçtiğinizi açıklayan **bir yorum satırı**
      ekleyin (örn. `/* .vurgu class'ı, tekrar kullanılabilir olduğu için tercih edildi */`).

## Görev 3 — Kısa Cevaplı Sorular

1. Satır içi, dahili ve harici CSS arasındaki fark nedir? Gerçek bir projede hangisini tercih edersiniz, neden?
2. Bir elemana hem `class` hem `id` ile stil verilmiş ve ikisi çakışıyorsa hangisi kazanır? Neden?
3. `.baslik` ile `baslik` (noktasız) seçicileri arasındaki fark nedir?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — 4 hata da doğru tespit edilmiş ve düzeltilmiş, sayfa beklenen gibi görünüyor | 35 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış | 40 |
| Görev 3 — 3 soru da doğru ve kendi cümleleriyle cevaplanmış | 20 |
| Zamanında teslim | 5 |

