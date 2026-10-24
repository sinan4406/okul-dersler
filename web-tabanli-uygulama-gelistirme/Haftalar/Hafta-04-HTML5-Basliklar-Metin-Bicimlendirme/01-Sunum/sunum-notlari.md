# Sunum Notları — Hafta 4: Başlıklar, Metin Biçimlendirme, Listeler ve Tablolar

> Bu not, dersi anlatacak öğretmen içindir. Öğrenciler artık Hafta 3'te öğrendikleri temel iskeleti kurabiliyor
> — bu hafta o iskeletin `<body>` içini gerçek, anlamlı içerikle doldurmayı öğreniyorlar.

## 1. Başlık Etiketleri (h1-h6)

Öğrencilere şunu sorun: "Bir kitapta neden bazı başlıklar büyük (bölüm adı), bazıları küçük (alt başlık)
yazılır?" HTML'deki h1-h6 mantığı tam olarak budur — büyüklük görsel bir sonuçtur, asıl amaç **önem sırasını**
belirtmektir.

**Vurgu:** Bir sayfada genelde tek bir `h1` olur (sayfanın ana konusu/başlığı). Bunu bir kitabın kapak
başlığına benzetin — bir kitabın birden fazla kapağı olmaz.

## 2. Başlık Hiyerarşisi — Doğru mu, Rastgele mi?

Bu haftanın en önemli kavramsal noktası budur. Öğrenciler genelde "bu daha küçük görünsün" diye h4 seçip
sonra "bu daha büyük olsun" diye h2'ye dönebilir — seviye atlamalarının **görsel değil, yapısal** bir hata
olduğunu vurgulayın.

**Canlı gösterim önerisi:** Bir ekran okuyucu simülasyonu (veya sadece sözlü anlatım) ile "kullanıcı h2'den
h3'e geçtiğini duyar, birden h5 duyarsa şaşırır" örneğini canlandırın.

## 3. Paragraf

Kısa geçilebilir — önemli olan tek nokta: boşluk bırakmak için boş paragraflar zincirlememek, bu işi
ileride CSS'in (`margin`) yapacağını hatırlatmak.

## 4. `<strong>`/`<em>` vs `<b>`/`<i>`

Bu ayrım öğrenciler için genelde şaşırtıcıdır çünkü **görsel olarak birebir aynı görünürler** (ikisi de
kalın/italik gösterir). Farkın sadece "anlamda" olduğunu vurgulamak için ekran okuyucu örneğini kullanın:
`<strong>` kelimesini ekran okuyucu vurgulu okur, `<b>` ise düz okur — görsel fark yoktur ama işitsel fark
vardır.

**Sık soru:** "O zaman hiç `<b>`/`<i>` kullanmayalım mı?" Cevap: Nadiren, gerçekten "anlam taşımayan, sadece
stil amaçlı" durumlarda (örn. bir ürün adının her zaman italik yazılması bir marka kuralıysa) kullanılabilir,
ama bu dersin projelerinde varsayılan olarak `<strong>`/`<em>` tercih edeceğiz.

## 5. Az Bilinen Semantik Etiketler

`<mark>`, `<time>`, `<abbr>` çoğu öğretmenin bile atladığı ama gerçek projelerde sık karşılaşılan
etiketlerdir. `<time datetime="...">` özniteliğinin **insan tarafından okunan metinle** (ör. "15 Ekim 2026")
**makine tarafından okunan formatın** (ör. "2026-10-15") farklı olabileceğini gösterin — bu, takvim
uygulamalarının/arama motorlarının bu tarihi otomatik tanımasını sağlar.

## 6. `<br>` ve `<hr>`

Kısa geçin. Tek vurgu: `<br>` zincirleme boşluk yapmak için kötü bir alışkanlıktır.

## 7-9. Listeler

`<ul>` ve `<ol>` arasındaki farkı "sıralamanın anlamlı olup olmadığı" sorusuyla test ettirin: "Market
listesi mi (sırasız), yoksa tarif adımları mı (sıralı)?" İç içe listeleri gösterirken **girintinin** (VS
Code otomatik yapar) okunabilirlik için ne kadar önemli olduğunu vurgulayın — girintisiz iç içe liste kodu
neredeyse okunamaz hâle gelir.

## 10-12. Tablolar

`<table>`/`<tr>`/`<th>`/`<td>` dörtlüsünü tahtaya çizip HTML koduyla eşleştirin — satır (`tr`) içinde
hücreler (`td`/`th`) olduğunu görsel bir tablo çizerek gösterin. `colspan`/`rowspan`'i sadece "gerçekten
gerekli olduğunda" (örn. öğle arası satırı) kullanmalarını, gereksiz yere karmaşıklaştırmamalarını söyleyin.

## 13. Tabloyu Yerleşim İçin Kullanma Hatası

Bu, tarihsel bir bağlam notu niteliğindedir — 2000'lerin web sitelerinde sayfa yerleşiminin (header/menü/
içerik/footer) koca bir tablo içine sıkıştırıldığını, bunun hem bakımı zor hem erişilebilirlik açısından
kötü bir yaklaşım olduğunu anlatın. "Bu dersin ilerleyen haftalarında (Hafta 5 - semantik etiketler, Hafta 9+
CSS) yerleşimi doğru şekilde nasıl yapacağımızı göreceğiz" diyerek merak uyandırın.

## 14. Okulum Projesi

Bu hafta öğrenciler Hafta 3'te kurdukları boş iskeletin `<body>` kısmını dolduracak. `02-Ornek-Uygulama/`
klasöründeki `okulum-iskelet.html` dosyasını birlikte, satır satır büyütün — kopyala-yapıştır yerine
öğrencilerin kendi klavyeleriyle yazmasını sağlayın.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- Başlıklar (h1-h6): atlanmadan, anlamlı bir sırayla kullanılır
- `<strong>`/`<em>`: görsel değil, anlamsal vurgu
- `<mark>`/`<time>`/`<abbr>`: az bilinen ama kullanışlı semantik etiketler
- `<ul>`/`<ol>`: sırasız/sıralı listeler, iç içe kullanılabilir
- `<table>`: sadece gerçek tablo verisi için, sayfa yerleşimi için değil

## Öğretmen İçin Sık Sorulan Sorular

**"h1'i birden fazla kullanırsak sayfa çalışmaz mı?"**
Çalışır, HTML bunu engellemez — ama SEO ve erişilebilirlik açısından önerilmez, "yanlış" olarak kabul edilir.

**"`<ul>` yerine hep `<div>` kullansak ne olur?"**
Sayfa görsel olarak (CSS ile) aynı görünebilir ama ekran okuyucu "bu bir liste, 5 öğesi var" bilgisini
veremez, arama motoru da içeriğin bir liste olduğunu anlayamaz. Doğru etiketi seçmek "semantik HTML"in
temelidir — bu dersin en sık tekrar edeceğimiz ilkesidir.
