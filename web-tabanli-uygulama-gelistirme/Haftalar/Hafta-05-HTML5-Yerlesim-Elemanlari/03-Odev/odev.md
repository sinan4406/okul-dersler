# Ödev — Hafta 5: Yerleşim (Layout) Elemanları

## Görev 1 — Kafe Sitesini Semantik Hâle Getirin (Kod Tamamlama)

Ekteki [`kafe-sitesi-corba.html`](./kafe-sitesi-corba.html) dosyası, derste incelediğimiz "div çorbası"
sorununu taşıyan bir kafe web sitesidir. Dosyayı düzenleyip her `<div class="...">` etiketini, class ismine
ve içeriğine bakarak uygun semantik etikete dönüştürün:

- [ ] `baslik-alani` → uygun semantik etiket
- [ ] `baglantilar` (menü bağlantıları) → uygun semantik etiket
- [ ] `ana-alan` içindeki tekrar eden `yazi` blokları → uygun semantik etiket(ler) — her yazının tek
      başına anlamlı, paylaşılabilir bir içerik olduğunu düşünüp karar verin
- [ ] `yan-alan` (çalışma saatleri, asıl konuyla dolaylı ilişkili) → uygun semantik etiket
- [ ] `bilgi-alani` → uygun semantik etiket

Değişiklikten sonra sayfayı tarayıcıda açıp hiçbir görünür hatanın olmadığını (semantik etiketler görsel
olarak sayfayı bozmaz) doğrulayın.

## Görev 2 — "Okulum" Projesine Devam

Semantik hâle getirdiğiniz `okulum/index.html` dosyanıza aşağıdakileri ekleyin:

- [ ] `<main>` içine, "Sıkça Sorulan Sorular" başlıklı yeni bir `<section>` ekleyin; içine en az 2 soru-cevap
      çifti (her biri kendi `<h3>` ve `<p>`'si ile) yerleştirin.
- [ ] `<aside>` içindeki (veya yeni oluşturacağınız) duyuru listesine en az 1 madde daha ekleyin.
- [ ] `<footer>` içine, okulun bir sosyal medya hesabını (örn. "Instagram: @anadoluteknik") `<p>` olarak
      ekleyin.

## Görev 3 — Kısa Cevaplı Sorular

1. `<div>` ile `<section>` arasındaki fark nedir? Bir örnek verin.
2. `<section>` ile `<article>` arasındaki farkı, kendi cümlelerinizle ve bir örnekle açıklayın.
3. Bir sayfada `<main>` etiketinin sadece bir kez kullanılması neden önemlidir?
4. `<aside>` içeriği kaldırılsa sayfanın asıl anlamı neden bozulmaz? Bir örnek verin.
5. "Div çorbası" ifadesi ne anlama gelir, neden kaçınılması gereken bir durumdur?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — tüm div'ler doğru/mantıklı semantik etiketlere dönüştürülmüş | 35 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış, doğru etiketler kullanılmış | 40 |
| Görev 3 — 5 soru da kendi cümleleriyle doğru cevaplanmış | 20 |
| Zamanında teslim | 5 |

