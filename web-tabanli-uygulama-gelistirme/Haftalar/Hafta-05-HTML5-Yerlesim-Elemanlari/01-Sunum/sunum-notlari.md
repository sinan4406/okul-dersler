# Sunum Notları — Hafta 5: Yerleşim (Layout) Elemanları

> Bu not, dersi anlatacak öğretmen içindir. Bu hafta, Hafta 4'te düz başlık/paragraf/liste ile yazılan
> içeriğin **anlamlı bölgelere** ayrılmasını öğretiyoruz — "div çorbası" kavramı bu haftanın kalbidir.

## 1. div ve span

Öğrencilere iki kelimeyi tahtaya yazın: "blok" ve "satır içi (inline)". `<div>` her zaman yeni satıra geçer
(bir kutu gibi davranır), `<span>` ise metnin akışını bozmadan sadece belirli bir kelimeyi/ifadeyi sarar.
Basit bir demo: Aynı metni önce `<div>` içine, sonra `<span>` içine alıp yan yana gösterin.

**Vurgu:** İkisi de "hiçbir anlam taşımaz" — sadece CSS ile stil vermek veya Javascript ile seçmek için
vardır. Bu, HTML5'in getirdiği semantik etiketlerle tam bir tezat oluşturur.

## 2. "Div Çorbası" Problemi

Bu, haftanın en önemli motivasyon noktasıdır. "Div çorbası" (div soup) terimini tahtaya yazın — 2000'lerin
web sitelerinde neredeyse her şeyin `<div class="...">` ile yazıldığını, kodun okunmasının çok zorlaştığını
anlatın. "Peki tarayıcıya/ekran okuyucuya 'bu menü', 'bu ana içerik' dememizin bir yolu yok muydu?" sorusunu
sorup HTML5'in cevabına (semantik etiketler) geçin.

## 3-4. Semantik Etiketler ve Sayfa Haritası

Slayttaki "sayfa haritası" görselini (header/main+aside/footer) tahtaya da çizin — bu basit kutu diyagramı,
öğrencilerin zihninde kalıcı bir model oluşturur. Her yeni web sitesine girdiklerinde bu diyagramı
hatırlamalarını isteyin: "Şimdi bu sitenin header'ı nerede, nav'ı nerede?" diye düşünmelerini teşvik edin.

## 5-6. header / nav / main

**Sık karışan nokta:** Öğrenciler `<header>`'ı sadece sayfanın en tepesi sanabilir — ama bir `<article>`
içinde de kendi `<header>`'ı olabileceğini (örn. bir blog yazısının başlık+tarih kısmı) vurgulayın.

`<main>`'in **sayfada sadece bir kez** kullanılması gerektiğini özellikle tekrar edin — bu, `<h1>` kuralına
benzer bir "tekillik" kuralıdır ve öğrenciler genelde bu ikisini karıştırabilir.

## 7. section vs article — En Çok Sorulan Soru

Bu ayrım, deneyimli geliştiricilerin bile bazen tartıştığı bir konudur — basitleştirilmiş "RSS testi"ni
kullanın: "Bu içeriği kopyalayıp başka bir siteye, bağlamından koparılmış olarak koysam hâlâ anlamlı olur
mu?" Evetse `article` (bir haber, bir ürün kartı, bir yorum), hayırsa `section` (bir sayfanın "Hakkımızda"
bölümü tek başına bir şey ifade etmez, sayfanın bağlamına ihtiyaç duyar).

**Pratik örnek:** Bir haber sitesi düşünün — tüm haberlerin bulunduğu ana alan `<section>`, her bir haberin
kendisi `<article>`'dır. Bir `<section>` içinde birden fazla `<article>` olması tamamen normaldir.

## 8-9. aside / footer

`<aside>` için "kaldırsam da asıl mesaj bozulmaz mı?" testini kullanın — bir blog yazısının yanındaki
"yazar hakkında" kutusu kaldırılsa, yazının kendisi hâlâ anlaşılır olur; bu yüzden `aside`'dır.

## 10. Tam İskelet

Bu slaytı yavaş geçin, öğrencilerin gözünün önünde her satırın nereye ait olduğunu (header içinde nav,
main içinde section içinde article gibi) parmakla göstererek anlatın — iç içe geçmiş yapı ilk defa
görüldüğünde kafa karıştırıcı olabilir.

## 11. div Hâlâ Kullanılır mı?

Öğrencilerin "o zaman hiç div kullanmayacak mıyız?" sorusunu mutlaka soracağını unutmayın. Cevap: Semantik
karşılığı olmayan, sadece görsel gruplama/CSS amaçlı durumlarda (örn. bir kart grid'i sarmak için) hâlâ
`<div>` kullanılır — bunu CSS ünitesinde (Hafta 9+) çok kullanacağız. Kural hep aynı: "önce anlamlı etiket
var mı diye düşün, yoksa div'e geç."

## 12. Erişilebilirlik — Landmark Gezinme

Mümkünse (bilgisayarınızda varsa) gerçek bir ekran okuyucu (Windows Anlatıcı / NVDA) ile bir siteyi kısaca
gösterin — "Landmark'lara git" kısayolunun semantik etiketler sayesinde çalıştığını canlı görmek çok etkili
bir andır. Yoksa en azından "her sayfayı baştan sona dinlemek zorunda kalmadan menüye/asıl içeriğe
atlayabiliyorlar" fikrini sözlü anlatın.

## 13. template / slot

Sadece farkındalık amaçlı, 2-3 dakikadan fazla durmayın. "İleride React/Vue gibi araçlarla (Hafta 18)
benzer bir 'bileşen' mantığı göreceğiz" bağlantısını kurup geçin.

## 14. Okulum Projesi

Bu hafta yapılan iş bir **refactor** (yeniden yapılandırma) egzersizidir — içerik değişmiyor, sadece
sarmalayan etiketler değişiyor. Öğrencilere "kodun çalışması için bunun şart olmadığını, ama daha doğru/
erişilebilir olduğunu" hatırlatın.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `<div>`/`<span>`: anlamsız, sadece stil/gruplama için
- `<header>`/`<nav>`/`<footer>`: üst kısım, gezinme, alt kısım
- `<main>`: sayfanın tekil, asıl içeriği
- `<section>`/`<article>`: tematik bölüm / bağımsız-paylaşılabilir içerik
- `<aside>`: dolaylı ilişkili yan içerik

## Öğretmen İçin Sık Sorulan Sorular

**"section yerine hep div kullansak sayfa bozulur mu?"**
Görsel olarak (CSS uygulanmadan) hayır — ikisi de varsayılan olarak blok elemandır. Ama semantik/
erişilebilirlik açısından fark büyüktür; bu dersin ilkesi hep "doğru anlam = doğru etiket".

**"Bir aside her zaman sayfanın kenarında mı görünür?"**
Hayır — `<aside>` sadece bir **anlam** belirtir, görünüm (nerede duracağı, kaç piksel genişlikte olacağı)
tamamen CSS'in işidir (Hafta 9+). HTML anlamı, CSS görünümü belirler; bu ayrım dersin temel felsefesidir.
