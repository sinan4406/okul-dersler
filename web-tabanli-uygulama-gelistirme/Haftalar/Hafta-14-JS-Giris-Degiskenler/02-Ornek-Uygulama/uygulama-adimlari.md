# Örnek Uygulama — Hafta 14: Javascript'e Giriş, Değişkenler ve Veri Tipleri

Bu, öğrencilerin **ilk Javascript kodunu** yazacağı derstir. Üç uygulama sırasıyla yapılır: önce konsolu
tanıma, sonra "neden yanlış sonuç çıktı" bug avı, son olarak "Okulum" projesine ilk JS bağlantısını kurma.

## Uygulama 0 — Konsolu Tanıma (10 dk)

1. Herhangi bir web sayfasını açın, **F12** (veya sağ tık → İncele) ile geliştirici araçlarını açın,
   **Console** sekmesine geçin.
2. Konsola `console.log("Merhaba")` yazıp Enter'a basın, ekrana "Merhaba" yazdığını gösterin.
3. **Vurgu:** "Bundan sonra yazacağımız her JS kodunun sonucunu burada, konsolda göreceğiz. Konsol,
   yazılımcının en temel arkadaşıdır — hata ayıklama (debugging) burada yapılır."

## Uygulama 1 — "Neden Sonuç Saçma/NaN Çıktı?" Bug Avı (25 dk)

**Amaç:** `input.value`'nun her zaman **string** döndürdüğünü, sayı gibi görünse bile string olduğunu ve
bunu `Number()` ile çevirmezsek ne olacağını canlı olarak yaşatmak.

1. [`hata-nan.html`](./hata-nan.html) dosyasını açın. Kutulara `5` ve `8` yazıp "Topla" butonuna basın.
   Öğrenciler `13` bekler ama ekranda **`58`** görür.
2. Konsolu açtırıp `typeof s1` ve `typeof s2` satırlarının `"string"` yazdığını gösterin: "Bilgisayar
   sizin '5' ve '8'i sayı sanmıyor, birer kelime/metin sanıyor, bu yüzden yan yana ekliyor (concat),
   toplamıyor."
3. Kodu birlikte inceleyin, `s1 + s2` satırını `Number(s1) + Number(s2)` yapmalarını isteyin, tekrar test
   edin — artık `13` çıkacak. Kendi çözümlerini [`hata-nan-cozum.html`](./hata-nan-cozum.html) ile
   karşılaştırabilirler.
4. **Ekstra deney:** Düzeltilmiş sürümde 1. kutuya `7,5` (virgüllü) yazdırın — yine bozuk/`NaN` çıkacaktır.
   Nedenini sorun: Javascript ondalık ayracı olarak **nokta** bekler, **virgül** değil — bu, Türkçe
   klavye alışkanlığından kaynaklanan çok yaygın gerçek bir hatadır.

## Uygulama 2 — `var` mı, `let` mi? Kapsam (Scope) Deneyi (10 dk)

1. [`var-sizinti.html`](./var-sizinti.html) dosyasını açıp konsolu izleyin.
2. `var` ile tanımlanan döngü değişkeninin döngü **bittikten sonra bile** erişilebilir kaldığını, `let`
   ile tanımlananın ise döngü bloğu dışında "yok" hâline geldiğini (hata verdiğini) birlikte gözlemleyin.
3. **Kural:** "Bu dersten itibaren `var` kullanmıyoruz — değişmeyecek değerler için `const`, değişecek
   değerler için `let` kullanacağız."

## Uygulama 3 — "Okulum" Projesine İlk JS Bağlantısı (20 dk)

1. [`index.html`](./index.html), [`iletisim.html`](./iletisim.html), [`style.css`](./style.css) — önceki
   HTML5/CSS haftalarından gelen "Okulum" (Anadolu Teknik Lisesi) projesinin bu haftaya kadarki hâli.
   > Öğretmen notu: Bu dosyalar, sınıfınızın HTML5+CSS ünitelerinde gerçekte ürettiği projeyle birebir
   > aynı olmayabilir — kendi sınıfınızın dosyalarını kullanmanız, buradakileri sadece referans/yedek
   > olarak görmeniz önerilir.
2. [`script.js`](./script.js) dosyasını birlikte inceleyin — `index.html`'in en altına
   `<script src="script.js"></script>` ile nasıl bağlandığına dikkat çekin.
3. `document.querySelector("#okul-basligi")` satırının `<h1 id="okul-basligi">` elemanını nasıl seçtiğini
   gösterin, konsolda çıktısını inceleyin.
4. Değişkenler bölümünü (`okulAdi`, `kurulusYili`, `ogrenciSayisi`, `kayitAcik`) birlikte okuyun, her
   birinin veri tipini `typeof` ile konsolda doğrulayın.
5. Şablon dizgesiyle (`` `${okulAdi} ...` ``) oluşturulan cümleyi inceleyin — eski usül `"metin" + değişken
   + "metin"` birleştirmesiyle karşılaştırın (bkz. sunum, "Şablon Dizgeleri" bölümü).

> Bir sonraki hafta (Hafta 15), bu `script.js` dosyasına gerçek bir **olay dinleyicisi**
> (`addEventListener`) ekleyerek iletişim formunu etkileşimli hâle getireceğiz.
