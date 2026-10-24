# WEB Tabanlı Uygulama Geliştirme — Ders Akış Projesi

Bu depo, MEB "**WEB TABANLI UYGULAMA GELİŞTİRME**" dersinin (11. sınıf, haftalık 8 ders saati, toplam 288 saat)
haftalık ders akışını planlamak için hazırlanmıştır. Amaç; dersi ilk kez anlatacak bir öğretmen için hem
**anlatım planı** hem de **öğrenciye verilecek hazır materyal** (sunum, örnek uygulama, ödev) üretmektir.

Resmi ders kitabı ([BT2025WTUG1105.pdf](https://meslek.meb.gov.tr/upload/dersmateryali/pdf/BT2025WTUG1105.pdf)) 2020
yılında hazırlandığı için içerik sırası ve kazanımlar bu kitaptan/müfredattan alınmış, ancak teknoloji bilgileri
2026 itibarıyla güncellenmiştir (bkz. [Güncel Konular ve Kaynaklar](./00-Program-ve-Kaynaklar/Guncel-Konular-ve-Kaynaklar.md)).

## Klasör Yapısı

```
00-Program-ve-Kaynaklar/
  Haftalik-Program-Tablosu.md      → 36 haftanın tamamının tablo halinde özeti
  Guncel-Konular-ve-Kaynaklar.md   → Her ünite için güncel teknoloji notları ve kaynak linkleri
Haftalar/
  Hafta-01-Temel-Kavramlar/
    README.md                      → Haftanın konusu, kazanımları, güncel notu
    01-Sunum/                      → Ders anlatım notu (Markdown) + sınıfta gösterilecek HTML slayt
    02-Ornek-Uygulama/             → Derste birlikte yapılacak örnek kod
    03-Odev/                       → Öğrenciye verilecek ödev
  Hafta-02-Web-Tasarim-Ilkeleri/
    ...
  Hafta-03 ... Hafta-18/           → Tam içerik hazır (HTML5 + CSS + Javascript üniteleri)
  Hafta-19 ... Hafta-36/           → İskelet hazır (konu/kazanım/güncel not); Arka Uç (.NET Core) ünitesi içeriği sırayla eklenecek
WEB Tabanlı Uygulama Geliştirme.docx  → Orijinal MEB ders bilgi formu (kaynak müfredat)
```

## Program Mantığı

Ders 6 öğrenme biriminden oluşur ve haftalara şöyle dağıtılmıştır:

| Öğrenme Birimi | Hafta | Ders Saati |
|---|---|---|
| Temel Kavramlar | 1 | 8 |
| Web Tasarım İlkeleri | 1 | 8 |
| HTML5 | 6 | 48 |
| CSS | 5 | 40 |
| Javascript | 5 | 40 |
| Arka Uç (.NET Core) | 18 | 144 |

Detaylı hafta hafta dağılım için [Haftalık Program Tablosu](./00-Program-ve-Kaynaklar/Haftalik-Program-Tablosu.md) dosyasına bakınız.

**Arka Uç ünitesi (Hafta 19-36)** boyunca, MEB müfredatının önerdiği gibi tek bir dönem projesi
(**Kütüphane Takip Sistemi**) uçtan uca geliştirilir: MVC yapısı → formlar → doğrulama → Entity Framework Core ile
veritabanı → web servisi → yayınlama. Böylece öğrenciler her hafta aynı projeye yeni bir parça ekleyerek ilerler.

## Şu Anki Durum

- ✅ **Hafta 1-18** (Temel Kavramlar, Web Tasarım İlkeleri, HTML5, CSS, Javascript — bu dönem hedeflenen tüm kapsam):
  Sunum + örnek uygulama + ödev tam olarak hazır.
- 🔲 **Hafta 19-36** (Arka Uç — .NET Core): Klasör yapısı, konu başlıkları, kazanımlar ve güncel notlar hazır;
  sunum/uygulama/ödev içerikleri sonraki dönem ünite sırasıyla eklenecek.

**"Okulum" (Anadolu Teknik Lisesi) proje sürekliliği hakkında not:** Hafta 3'te başlayan ve HTML5 → CSS → Javascript
ünitelerinde aynı örnek site (`index.html` / `iletisim.html` / `style.css` / `script.js`) üzerine inşa edilen bir
örnek proje akışı vardır. Hafta 4-18 içerikleri hız kazanmak için **paralel** hazırlandığından, birkaç ünite geçişinde
(Hafta 6→7, Hafta 8→9, Hafta 11→12, Hafta 13→14, Hafta 16→17) bir sonraki haftanın örnek dosyası, bir önceki haftanın
**gerçek** çıktısı yerine **makul bir varsayım** üzerine kurulmuş olabilir (bu dosyaların en üstünde bunu belirten bir
yorum satırı vardır). Her haftanın sunumu/ödevi kendi başına eksiksiz ve doğrudur; sadece örnek projedeki görsel
sürekliliği sınıfta kullanmadan önce hızlıca gözden geçirmeniz — veya bir sonraki bakımda tam bir uyumlaştırma
geçişi yaptırmanız — önerilir.

## Sunum Dosyalarını Kullanma

Her hafta klasöründeki `01-Sunum/slayt.html` dosyası, tarayıcıda açılıp doğrudan projeksiyon/akıllı tahtada
gösterilebilecek şekilde hazırlanmıştır (ok tuşlarıyla slayt geçişi yapılır). `sunum-notlari.md` ise aynı içeriğin
öğretmene yönelik, daha ayrıntılı anlatım notlarını içerir — ilk kez anlatacağınız için sınıfa girmeden önce bu
notu okumanız önerilir.
