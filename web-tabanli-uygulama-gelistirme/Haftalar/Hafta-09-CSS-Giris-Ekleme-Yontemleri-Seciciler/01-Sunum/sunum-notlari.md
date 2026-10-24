# Sunum Notları — Hafta 9: CSS'e Giriş, Ekleme Yöntemleri ve Seçiciler

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Bu, CSS ünitesinin **ilk haftasıdır** — öğrenciler
> HTML5 ünitesini (Hafta 3-8) tamamlamış olarak gelir, dolayısıyla HTML etiketlerini bildikleri varsayılır.

## 1. CSS Nedir?

CSS'i tanıtırken HTML ile karşılaştırmayı asla atlamayın — öğrencilerin en çok karıştırdığı nokta budur.
"HTML yapıyı, CSS görünümü belirler" cümlesini birkaç kez farklı örneklerle tekrarlayın (bir masa: HTML masanın
kaç ayağı olduğunu, CSS masanın rengini/kumaşını belirler gibi).

## 2. HTML mi, CSS mi?

Kısa bir canlı demo önerilir: Projeksiyonda stil verilmemiş çıplak bir HTML sayfası (sadece siyah yazı, hiç
renk/boşluk yok) ile aynı sayfanın CSS uygulanmış hâlini yan yana gösterin (herhangi bir gerçek web sitesinin
CSS'ini tarayıcı DevTools'tan geçici olarak kapatıp açarak da gösterilebilir — Chrome DevTools → Elements →
üstteki `<style>` etiketini devre dışı bırakma).

## 3. Temel Söz Dizimi

Seçici/özellik/değer üçlüsünü tahtaya büyük puntoyla yazıp renklerle kodlayın (örn. seçiciyi turuncu, özelliği
mavi, değeri yeşil ile). Noktalı virgülü unutmanın (özellikle son kuralda) sık yapılan bir hata olduğunu,
alışkanlık hâline getirmelerini söyleyin.

## 4-6. Satır İçi / Dahili / Harici

Bu üç slaytı ardışık anlatmak yerine, doğrudan [`3-ekleme-yontemi.html`](../02-Ornek-Uygulama/3-ekleme-yontemi.html)
dosyasını açıp **canlı olarak** üçünü aynı anda gösterebilirsiniz — slaytlar bu canlı gösterimin "özeti" gibi
işlev görsün. Sırasıyla her yöntemin kodunu işaret edip "işte bu satır inline, işte bu blok dahili, işte bu
dosya harici" diyerek bağlantı kurun.

## 7. 3 Yöntem Karşılaştırması

**Tartışma sorusu:** "Bir haber sitesinde 200 sayfa var, hepsinde başlık rengini turuncudan maviye
değiştirmemiz gerekiyor. Satır içi yöntemle kaç dosyayı değiştirmemiz gerekir? Harici yöntemle kaç dosyayı?"
(Cevap: satır içi = 200 dosya potansiyel olarak, harici = 1 dosya.) Bu, harici CSS'in neden endüstri standardı
olduğunu somutlaştırır.

## 8-10. Etiket / Class / ID Seçicileri

Bu üç seçici türünü tahtaya birlikte örnekleyin — aynı HTML parçası üzerinde üç farklı seçme şeklini
gösterin. **Sık hata:** öğrenciler `.` ve `#` işaretlerini unutur veya karıştırır — CSS tarafında class'a
nokta, id'ye diyez koymayı unuttuklarında stilin hiç uygulanmadığını (sessiz başarısızlık — hata mesajı
vermez) mutlaka gösterin, bu CSS'te en sık karşılaşılan "neden çalışmıyor" sorunudur.

## 11. Class mı, ID mi?

Pratik kural olarak "class'ı varsayılan tercih yapın, ID'yi nadiren ve sadece gerçekten benzersiz bir
eleman için kullanın" mesajını verin. ID'nin bir sayfada yalnızca bir kez kullanılabileceği kuralını
vurgulayın — bu kural ihlal edilse bile tarayıcı hata vermez ama geçersiz/öngörülemez davranışa yol açar.

## 12. Seçici Önceliği

Bu konuyu [`secici-oncelik-demo.html`](../02-Ornek-Uygulama/secici-oncelik-demo.html) ile **mutlaka canlı**
gösterin — soyut anlatılırsa akılda kalıcılığı düşüktür, ama "tahmin et, sonra doğrula" formatında çok
etkilidir. Basitleştirilmiş kural yeterlidir: "ID > Class > Etiket". `!important` gibi ileri düzey
istisnalara bu aşamada girmeyin, kafa karıştırır.

## 13. Modern Seçiciler

Bu sadece bir farkındalık notudur, sınavda sorulmayacak kadar ileri düzeydir — 2-3 dakikadan fazla
durmayın. Amaç, öğrencilerin gerçek projelerde bu seçicilerle karşılaştıklarında "bunu daha önce görmüştüm"
diyebilmesidir.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- CSS = HTML'in görünümünü belirleyen dil
- 3 ekleme yöntemi: satır içi (tek eleman), dahili (tek sayfa), harici (tüm site — standart yöntem)
- 3 temel seçici: etiket, `.class`, `#id`
- Çakışmada kazanan: ID > Class > Etiket

## Öğretmen İçin Sık Sorulan Sorular

**"Aynı elemana birden fazla class verebilir miyim?"**
Evet — `class="kart buyuk vurgulu"` gibi boşlukla ayırarak birden fazla class aynı elemana verilebilir,
her class'ın stili birleşerek uygulanır.

**"CSS dosyasını kaydettim ama hiçbir şey değişmedi, neden?"**
En sık nedenler: (1) `<link>` etiketindeki dosya adı/yolu yanlış yazılmış, (2) seçicideki `.` veya `#`
unutulmuş, (3) tarayıcı önbelleği eski dosyayı gösteriyor — sert yenileme (Ctrl+Shift+R) önerin.

**"Neden bazı siteler hâlâ satır içi CSS kullanıyor?"**
Bazı e-posta şablonlarında (e-posta istemcileri harici CSS'i desteklemez) veya çok hızlı tek seferlik
testlerde hâlâ kullanılır, ama gerçek web sitesi geliştirmede tercih edilmez.
