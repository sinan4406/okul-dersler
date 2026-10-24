# Örnek Uygulama — Hafta 8: Form Elemanları ve HTML5 Ünite Değerlendirmesi

## Uygulama 1 — Erişilemeyen Form (20 dk)

**Amaç:** `<label for>` ile `<input id>` eşleşmesinin sadece bir "iyi alışkanlık" değil, gerçek bir
kullanılabilirlik/erişilebilirlik konusu olduğunu göstermek.

1. [`erisilemeyen-form.html`](./erisilemeyen-form.html) dosyasını tarayıcıda açın.
2. Öğrencilerden her **etikete** (metin kısmına, kutunun kendisine değil) tıklamalarını isteyin. Normalde
   bir etikete tıklamak, ilgili kutuya odaklanmayı sağlar (fare/dokunma alanını genişletir) — ama bu
   sayfada bazılarında bu çalışmıyor.
3. VS Code'da `label`'ların `for` değerleri ile `input`/`select`'lerin `id` değerlerini karşılaştırın,
   uyuşmayanları (veya hiç eşleşmesi olmayanları) bulup düzeltin.
4. [`erisilemeyen-form-cozum.html`](./erisilemeyen-form-cozum.html) ile karşılaştırın.

> **Neden önemli?** Görme engelli kullanıcılar ekran okuyucu ile bir forma girdiğinde, `label`/`id`
> eşleşmesi olmayan kutuların ne işe yaradığını **anlayamaz**. Ayrıca mobilde küçük bir kutuya tam
> isabet ettirmek zordur — doğru eşleşen bir etiket, tıklama alanını büyütüp deneyimi kolaylaştırır.

## Uygulama 2 — Doğrulamasız / Doğrulamalı Form Karşılaştırması (15 dk)

1. [`dogrulama-karsilastirma.html`](./dogrulama-karsilastirma.html) dosyasını açın.
2. Her iki formu da **boş** göndermeyi deneyin — üstteki (doğrulamasız) hiçbir uyarı vermez, alttaki
   (doğrulamalı) tarayıcının kendi uyarısını gösterir.
3. E-posta kutusuna geçersiz bir değer (örn. `merhaba`) yazıp göndermeyi deneyin — aradaki farkı tartışın.
4. Vurgu: bu doğrulama **tek satırlık öznitelikler** (`type="email"`, `required`, `pattern`) ile, hiç
   Javascript yazmadan elde ediliyor. İleri seviye doğrulama (sunucu tarafı) Hafta 28-29'da (.NET Core
   ünitesi) işlenecek.

## Uygulama 3 — "Okulum" Projesine Gerçek Bir İletişim Formu (25 dk)

1. [`iletisim.html`](./iletisim.html) dosyasını açın — Hafta 7'de sadece adres/telefon bilgisi vardı,
   şimdi gerçek bir form ekliyoruz.
2. Formdaki her alanı birlikte inceleyin: `type="email"` + `required`, `type="tel"` + `pattern`,
   `<select>` ile konu seçimi, `<textarea>` ile çok satırlı mesaj kutusu.
3. Her `<label>`'ın ilgili kutuya doğru `for`/`id` ile bağlı olduğunu vurgulayın (Uygulama 1'in burada
   doğru uygulanmış hâli).
4. Formu doldurup göndermeyi deneyin (gerçek bir sunucu olmadığı için gönderim çalışmayacaktır, `action="#"`
   sadece gösterim amaçlıdır — bu konuya Hafta 25-26'da .NET Core ile geri döneceğiz).

## Uygulama 4 — HTML5 Ünitesi Özet Turu (15 dk)

[`unite-ozet-kontrol-listesi.md`](./unite-ozet-kontrol-listesi.md) dosyasındaki tabloyu projeksiyonda
gösterip Hafta 3'ten bugüne öğrenilen tüm etiketleri hızlıca gözden geçirin. Listenin altındaki hızlı
kontrol sorularını sınıfa sözlü olarak sorup HTML5 ünitesini kapatın. Bu hafta aynı zamanda ödevde
(bkz. `03-Odev/odev.md`) bir **mini proje** ile öğrencilerin tüm üniteyi tek bir sitede birleştirmesi
istenecek — bu turu o ödevin bir hazırlığı olarak sunun.
