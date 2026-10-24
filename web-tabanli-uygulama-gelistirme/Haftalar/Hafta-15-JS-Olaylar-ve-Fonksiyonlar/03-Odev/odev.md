# Ödev — Hafta 15: Olaylar ve Fonksiyonlar

## Görev 1 — Bozuk Sayaç Uygulamasını Onarın (Kod Tamamlama)

[`sayac.html`](./sayac.html) dosyasını açın, konsolu (F12) açık tutun. Bağlı olan
[`bozuk-sayac.js`](./bozuk-sayac.js) dosyasında **4 hata** var. "Beğen" butonuna her basıldığında sayının
**1 artması** gerekiyor, ama şu an ya hiç artmıyor ya da hata veriyor.

**Yapmanız gerekenler:**
1. Sayfayı açın, konsoldaki hata mesaj(lar)ını okuyun.
2. `bozuk-sayac.js` dosyasını satır satır inceleyin — bu hafta işlediğimiz konuları (fonksiyon tanımlama,
   fonksiyon çağırma, `addEventListener`, doğru elemanı seçme) tek tek kontrol edin.
3. Bulduğunuz her hatayı bir liste hâlinde yazın.
4. Hataları düzeltip butona birkaç kez basarak sayının doğru şekilde 1, 2, 3... diye arttığını doğrulayın.

> **İpucu:** Hatalardan biri, `addEventListener`'a fonksiyonu **çağırarak** (parantezli) vermemizden
> kaynaklanıyor — sunumdaki "olay nesnesi" bölümünü hatırlayın.

## Görev 2 — Kendi Mini Uygulamanız: "Renk Değiştirici"

`renk-degistir.html` ve `renk-degistir.js` adında yeni dosyalar oluşturun. Sayfada bir buton ve bir
`<div>` (veya `<p>`) olsun. Aşağıdaki gereksinimleri karşılayan bir uygulama yazın:

- [ ] `renkDegistir()` adında, en az 1 parametre alan bir **fonksiyon** tanımlayın (örn. hangi rengin
      uygulanacağını parametre olarak alsın).
- [ ] Butona `addEventListener` ile bir **olay dinleyicisi** ekleyin (satır içi `onclick` kullanmayın).
- [ ] Butona her basıldığında `<div>`'in arka plan rengi (`style.backgroundColor`), önceden belirlediğiniz
      en az 3 renk arasında **sırayla** değişsin.
- [ ] Her tıklamada, hangi renge geçildiğini `console.log` ile de yazdırın.

## Görev 3 — Kısa Cevaplı Sorular

1. Fonksiyon tanımlamak ile fonksiyonu çağırmak arasındaki fark nedir? Bir fonksiyon tanımlanıp hiç
   çağrılmazsa ne olur?
2. `addEventListener("click", fonksiyonAdi)` ile `addEventListener("click", fonksiyonAdi())` arasındaki
   fark nedir? (İpucu: Görev 1'deki hatalardan biri tam olarak buydu.)
3. `e.preventDefault()` ne işe yarar, hangi durumda kullanılır?
4. Script etiketinin `<body>` sonunda olması neden önemlidir?
5. Parametre ile argüman arasındaki farkı bir örnekle açıklayın.

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — 4 hata da doğru tespit edilmiş ve düzeltilmiş, sayaç doğru artıyor | 35 |
| Görev 2 — fonksiyon + addEventListener doğru kullanılmış, renk değişimi çalışıyor | 40 |
| Görev 3 — 5 soru da kendi cümleleriyle, doğru anlaşılmış şekilde cevaplanmış | 20 |
| Zamanında teslim | 5 |

