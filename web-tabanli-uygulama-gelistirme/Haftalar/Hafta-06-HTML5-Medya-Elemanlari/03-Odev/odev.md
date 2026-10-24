# Ödev — Hafta 6: Medya Elemanları

## Görev 1 — Kafe Medya Sayfası Dedektifi (Hata Bulma)

Ekteki [`medya-hatali.html`](./medya-hatali.html) dosyasını tarayıcıda açıp inceleyin, ardından VS Code'da
kodu satır satır okuyun. Dosyada **en az 5 hata/eksik** bulunmaktadır. İpucu: hatalardan bazıları görsel
olarak fark edilir (bir görsel yüklenmiyor), bazıları ise sadece kodu dikkatlice okuyunca fark edilir
(bu haftaki erişilebilirlik konularıyla ilgili eksiklikler).

**Yapmanız gerekenler:**
1. Bulduğunuz her hatayı/eksiği bir liste hâlinde yazın.
2. Tüm hataları düzeltip dosyayı kaydedin, tarayıcıda test edin.
3. Düzelttiğiniz dosyada her `<img>` etiketinin anlamlı bir `alt` metnine, her `<video>`/`<audio>`
   etiketinin `controls` özniteliğine sahip olduğundan ve tüm etiketlerin doğru kapatıldığından emin olun.

## Görev 2 — "Okulum" Projesine Devam

Derste zenginleştirdiğiniz `okulum/index.html` dosyanıza aşağıdakileri ekleyin:

- [ ] "Okulumuzdan Kareler" galerinize en az 1 görsel daha ekleyin (kendi oluşturacağınız basit bir SVG
      veya internetten indireceğiniz telifsiz bir görsel olabilir) — mutlaka `alt`, `width`/`height` ve
      `loading="lazy"` ile.
- [ ] Video etiketinize bir `<track>` ekleyin (gerçek bir `.vtt` altyazı dosyanız olmasa bile etiketin
      doğru yazımını gösterin — `kind="subtitles" srclang="tr" label="Türkçe"`).
- [ ] Sayfanıza, okulun tanıtım müziği/marşı olduğunu varsayan bir `<audio controls>` etiketi ekleyin
      (gerçek ses dosyası olmasa da doğru yapıyı kurun).

## Görev 3 — Kısa Cevaplı Sorular

1. `alt` özniteliği neden her zaman anlamlı bir metin içermelidir? Boş bırakmak ne zaman kabul edilebilir?
2. `loading="lazy"` ne işe yarar, hangi tür sayfalarda en çok fayda sağlar?
3. Bir `<video>` etiketinde `autoplay` kullanırken nelere dikkat etmeliyiz?
4. `<track>` etiketi kimler için faydalıdır? En az 2 farklı kullanıcı grubu örneği verin.
5. `width`/`height` özniteliklerini önceden belirtmek performans açısından neden önemlidir?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — en az 5 hata/eksik doğru tespit edilmiş ve düzeltilmiş | 35 |
| Görev 2 — tüm kontrol listesi maddeleri karşılanmış, erişilebilirlik kurallarına uyulmuş | 40 |
| Görev 3 — 5 soru da kendi cümleleriyle doğru cevaplanmış | 20 |
| Zamanında teslim | 5 |

