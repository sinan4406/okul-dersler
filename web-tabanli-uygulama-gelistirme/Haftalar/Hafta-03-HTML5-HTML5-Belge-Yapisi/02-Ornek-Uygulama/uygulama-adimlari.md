# Örnek Uygulama — Hafta 3: HTML5'e Giriş ve Belge Yapısı

Bu hafta öğrencilerin **ilk kez** kod yazacağı derstir. Üç uygulama sırasıyla yapılır: önce bir "bozuk kod"
gösterilip merak uyandırılır, sonra doğru iskelet birlikte kurulur, son olarak öğrenciler eksik bir iskeleti
kendi başlarına tamamlayarak öğrendiklerini pekiştirir.

## Uygulama 1 — Bozuk Kod Avı: "Neden Yazılarım Bozuk Görünüyor?" (20 dk)

**Amaç:** `meta charset` etiketinin soyut bir kural değil, **gerçek ve sık karşılaşılan bir hata** olduğunu
canlı olarak gösterip `<meta charset="UTF-8">`'in neden zorunlu olduğunu somutlaştırmak.

**Adımlar:**

1. [`bozuk-sayfa.html`](./bozuk-sayfa.html) dosyasını tarayıcıda açın (çift tıklayarak veya VS Code Live
   Server ile). Öğrenciler ekranda şunu görecek:

   > **TÃ¼rkÃ§e karakterler bozuk gÃ¶rÃ¼nÃ¼yor, Ã¶ÄŸrenciler ÅŸaÅŸÄ±racak...**

2. Sorun: "Kimse bu metni yazarken hata yapmadı — peki neden böyle görünüyor?" Öğrencilerden tahmin isteyin.
3. Dosyayı VS Code'da açın, `<head>` içindeki şu satırı birlikte bulun:
   ```html
   <meta charset="windows-1252">
   ```
   Açıklayın: Dosyanın kendisi UTF-8 ile kaydedilmiş (Türkçe karakterler doğru yazılmış), ama tarayıcıya
   "bunu windows-1252 kodlamasıyla oku" dedik — tarayıcı da bizim dediğimizi yaptı ve yanlış çözdü. **Bu,
   bilgisayarın hatası değil, bizim yanlış talimat vermemizin sonucu.**
4. Öğrencilerden `windows-1252` değerini `UTF-8` ile değiştirmelerini isteyin, dosyayı kaydedip tarayıcıyı
   yenileyin (F5). Metnin anında düzeldiğini birlikte görün.
5. Kendi çözümlerini [`bozuk-sayfa-cozum.html`](./bozuk-sayfa-cozum.html) ile karşılaştırabilirler.

> **Öğretmen notu:** Bu demo gerçek bir tarayıcı davranışıdır, "sahte" bir görsel değildir — dosya gerçekten
> UTF-8 baytlarıyla kaydedilmiştir, sadece `charset` beyanı yanlıştır. Bu yüzden öğrenciler kendi
> bilgisayarlarında da birebir aynı bozukluğu görecektir; bu, olayın gerçekliğine olan güveni artırır.

## Uygulama 2 — "Okulum" Projesinin İlk İskeleti (20 dk)

**Amaç:** Doğru bir HTML5 belgesini sıfırdan, satır satır, hatasız kurmak. Bu proje bundan sonraki her
HTML5 haftasında (Hafta 4-8) büyütülecek.

1. VS Code'da `okulum` adında bir klasör, içine `index.html` dosyası oluşturun.
2. Emmet kısayolunu gösterin: boş dosyada `!` yazıp Tab'a basın — iskelet otomatik oluşur.
3. Otomatik gelen `lang="en"` değerini `lang="tr"` olarak düzeltin — **bu adımı atlamayın, sık unutulur.**
4. `<title>` içeriğini `Anadolu Teknik Lisesi` yapın.
5. Sonucu [`okulum-iskelet.html`](./okulum-iskelet.html) ile karşılaştırın — birebir aynı olmalı.

## Uygulama 3 — Eksik İskeleti Tamamla (20-25 dk, bireysel/eşli çalışma)

**Amaç:** Öğrencilerin öğrendiklerini **kendi başlarına, öğretmen olmadan** uygulayabildiğini görmek —
bu hafta biten ama bir sonraki haftaya da köprü kuran bir alıştırma.

1. [`iskelet-eksik.html`](./iskelet-eksik.html) dosyasını her öğrenciye (veya ikili gruplara) verin/açtırın.
2. Dosyanın en üstündeki göreve göre **5 eksik/hatalı noktayı** bulup düzeltmelerini isteyin. Kontrol
   listesi (öğrencilere sözlü olarak da hatırlatılabilir):
   - [ ] Dosyanın en başında `<!DOCTYPE html>` var mı?
   - [ ] `<html>` etiketinin `lang="tr"` özniteliği var mı?
   - [ ] `<head>` içinde `<meta charset="UTF-8">` var mı?
   - [ ] `<title>` boş bırakılmamış, anlamlı bir başlık girilmiş mi?
   - [ ] Belgenin en sonunda `</html>` kapanış etiketi var mı?
3. Düzelttikten sonra dosyayı tarayıcıda açıp "Hoş geldiniz" başlığının ve Türkçe karakterlerin (ş, ç)
   doğru göründüğünü kontrol etsinler — eğer `meta charset` eklemeyi unuttularsa burada da bir önceki
   uygulamadaki gibi bozukluk görebilirler, bu istenen bir pekiştirmedir.
4. Öğretmen cevap anahtarı: [`iskelet-tamamlanmis.html`](./iskelet-tamamlanmis.html).

> Bu üç uygulama birlikte şu döngüyü tamamlar: **önce hatayı gör (Uygulama 1) → doğrusunu birlikte öğren
> (Uygulama 2) → kendi başına uygula (Uygulama 3).** Ödevde (bkz. `03-Odev/odev.md`) bu döngü bağımsız
> olarak tekrar edilecek.
