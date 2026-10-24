# Sunum Notları — Hafta 7: Bağlantı (Köprü) Elemanları

> Bu not, dersi ilk kez anlatacak öğretmen içindir. Slaytlardaki her başlığın altında, sınıfta sözlü olarak
> anlatılması önerilen açıklamalar, örnekler ve olası öğrenci soruları yer alır.

## 1-2. `<a>` Etiketi ve `href`

Bağlantının web'i "web" (ağ) yapan şey olduğunu vurgulayın — sayfalar birbirine bağlı olmasaydı, internet
sadece birbirinden kopuk milyonlarca ayrı belge yığını olurdu. `href` olmadan `<a>` etiketinin sadece
biçimlendirilmemiş bir metin gibi davrandığını, tıklanamadığını gösterin (isteğe bağlı: projeksiyonda
`href` özniteliğini silip test edin).

## 3. Mutlak / Göreli Yol

Bu, öğrencilerin en çok karıştırdığı konudur. Basit kural cümlesi verin: **"Kendi evinde bir odaya
gidiyorsan sadece oda adını söylersin (göreli); başka bir şehre gidiyorsan tam adres gerekir (mutlak)."**
Göreli yolun avantajını vurgulayın: proje bir klasörden başka bir klasöre/sunucuya taşınsa bile göreli
bağlantılar bozulmaz, mutlak bağlantılar (kendi sitenize `https://...` ile link vermek) gereksiz ve kırılgandır.

## 4. Dosya Adı Hataları

Küçük bir yazım hatasının (`iletsim.html` vs `iletisim.html`) tüm bağlantıyı bozduğunu vurgulayın.
Öğrencilere VS Code'da dosya adını **kopyala-yapıştır** yaparak yazmalarını öneri olarak verin — elle
yazarken yapılan yazım hataları bağlantı hatalarının en sık nedenidir.

## 5-6. Çapa (Anchor) Bağlantıları ve Büyük/Küçük Harf Duyarlılığı

`id` ve `href="#id"` eşleşmesinin **birebir** (harf harf, büyük/küçük harf dahil) olması gerektiğini
projeksiyonda canlı gösterin: `id="bolumlerimiz"` iken `href="#Bolumlerimiz"` yazıp tıklandığında hiçbir
şey olmadığını gösterin, sonra `B`'yi küçültüp tekrar tıklayıp çalıştığını gösterin. Bu küçük ama somut
demo, kavramı kalıcı hâle getirir.

**Öneri:** Tüm `id` değerlerini küçük harfle, kelimeler arasında boşluksuz/tire ile yazma alışkanlığını
şimdiden yerleştirin (örn. `bolumlerimiz`, `iletisim-formu`) — CSS ve Javascript derslerinde de aynı
alışkanlık işlerine yarayacak.

## 7-8. `target="_blank"` ve Güvenlik

Önce `target="_blank"`'in ne işe yaradığını (yeni sekme) gösterin, sonra "peki bunun bir riski var mı?"
sorusunu sorun. `rel="noopener noreferrer"` konusunu **çok teknik detaya girmeden** şöyle özetleyin: "Yeni
açılan sekme, normalde bizim sayfamızla gizli bir bağlantı kurabilir — kötü niyetli bir site bunu kullanarak
bizim sayfamızı sinsice değiştirebilir (örneğin sahte bir giriş ekranıyla). `rel="noopener noreferrer"` bu
bağlantıyı tamamen keser." Bunu ezbere bir kural olarak versin: **her `target="_blank"`'in yanında bu iki
kelime de olmalı.**

## 9. `mailto:` ve `tel:`

Bu bağlantı türlerinin kullanıcı deneyimini nasıl iyileştirdiğini vurgulayın — kullanıcı e-posta adresini
elle kopyalamak zorunda kalmaz. Mümkünse öğrencilerin kendi telefonlarında (varsa) `tel:` linkine tıklayıp
arama ekranının açıldığını görmelerini sağlayın.

## 10. Site Haritası ve SEO

Kısa bir farkındalık notu olarak geçin — detay Hafta 36'da işlenecek. "Arama motorları bağlantıları takip
ederek sitenizi keşfeder, bu yüzden sayfalarınızı birbirine iyi bağlamak SEO için de önemlidir" mesajı yeterli.

## 11. Okulum Projesi — Çok Sayfalı Yapıya Geçiş

Bu, projenin **dönüm noktalarından biridir** — öğrenciler ilk kez "tek dosyalık bir sayfa" yerine "birbirine
bağlı bir site" kurmaya başlıyor. `iletisim.html` dosyasını oluştururken şunu vurgulayın: "Artık bir web
*sayfası* değil, bir web *sitesi* yapıyoruz" (Hafta 1'deki tanıma geri referans verin).

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)
- `<a href="...">` → bağlantı oluşturur
- Mutlak yol (dış site) / Göreli yol (kendi site)
- `#id` → sayfa içi/arası çapa, büyük/küçük harfe duyarlı
- `target="_blank"` → daima `rel="noopener noreferrer"` ile birlikte kullanılır
- `mailto:` / `tel:` → özel bağlantı türleri

## Öğretmen İçin Sık Sorulan Sorular

**"index.html yerine ana-sayfa.html gibi bir isim kullansak olmaz mı?"**
Olur ama `index.html`, çoğu sunucunun **varsayılan olarak otomatik açtığı** dosya adıdır (örn.
`siteniz.com/` yazıldığında sunucu otomatik olarak `index.html`'i arar). Bu yüzden ana sayfa için bu ismi
kullanmak endüstri standardıdır.

**"# işaretini href'te unutursam ne olur?"**
`href="bolumlerimiz"` (başında `#` yok) yazarsanız, tarayıcı bunu bir çapa değil, `bolumlerimiz` adında bir
**dosya** sanır ve "dosya bulunamadı" hatası verir.
