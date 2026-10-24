/*
  ROBOTİK KODLAMA 10 - 7. HAFTA - ÖRNEK 3 (BİRLEŞTİRME): PİL ŞARJ GÖSTERGESİ  (5 LED)
  ----------------------------------------------------------------------
  Senaryo : Robotun LiPo pili şarj olurken 5 seviyeli gösterge soldan sağa dolar, dolunca bir süre
            bekler, sonra pil boşalıyormuş gibi sağdan sola söner. (3. haftadaki LiPo pil konusu +
            6. haftadaki LED ve delay bilgisi.)
  Kazanım : 5 LED'i sırayla sürmek; her LED için ayrı pinMode ve digitalWrite yazmanın uzun sürdüğünü görmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     30 sütunlu küçük breadboard tam sığar
    LED                   5     D6 kırmızı, D5 ve D4 sarı, D3 ve D2 yeşil
    Direnç 220 ohm        5     Her LED için birer tane
    Jumper kablo          6     D2-D6 ve GND bağlantıları

  DEVRE (adım adım)
    1) GND -> breadboard mavi (-) hat.
    2) Her LED'in kısa bacağı (katot) mavi hatta, uzun bacağı (anot) kendi sütununa.
    3) Her anot sütununa birer 220 ohm direnç, direncin boşta ucuna kablo: D6, D5, D4, D3, D2.

  İPUCU: LED'ler soldan sağa D6 ... D2 sırasındadır (Arduino'daki pin sırasının tersi).
*/

void setup() {
  pinMode(2, OUTPUT);     // D2 çıkış (5. seviye, yeşil)
  pinMode(3, OUTPUT);     // D3 çıkış (4. seviye, yeşil)
  pinMode(4, OUTPUT);     // D4 çıkış (3. seviye, sarı)
  pinMode(5, OUTPUT);     // D5 çıkış (2. seviye, sarı)
  pinMode(6, OUTPUT);     // D6 çıkış (1. seviye, kırmızı)
}

void loop() {
  digitalWrite(6, HIGH); delay(500);    // şarj %20: kırmızı seviye yandı
  digitalWrite(5, HIGH); delay(500);    // şarj %40: ilk sarı yandı
  digitalWrite(4, HIGH); delay(500);    // şarj %60: ikinci sarı yandı
  digitalWrite(3, HIGH); delay(500);    // şarj %80: ilk yeşil yandı
  digitalWrite(2, HIGH); delay(1500);   // şarj %100: dolu, 1,5 sn bekle
  digitalWrite(2, LOW);  delay(250);    // boşalma: son yeşil söndü
  digitalWrite(3, LOW);  delay(250);    // boşalma: ilk yeşil söndü
  digitalWrite(4, LOW);  delay(250);    // boşalma: ikinci sarı söndü
  digitalWrite(5, LOW);  delay(250);    // boşalma: ilk sarı söndü
  digitalWrite(6, LOW);  delay(750);    // boş: kırmızı söndü, 0,75 sn bekle
}

/*
  DEĞİŞTİR VE GÖZLE
    - delay(1500) değerini 3000 yap. Gösterge dolu halde ne kadar kalır?
    - loop içindeki digitalWrite(6, HIGH); komutunu sil (delay(500) kalsın). Kırmızı seviye ne yapar?

  TOPLAM SÜRE (doğrulama): 4 x 500 + 1500 = 3500 ms dolum, 4 x 250 + 750 = 1750 ms boşalma -> 5250 ms
  UZUNLUK: setup 5 satır + loop 10 satır. 12 LED (D2-D13) olsaydı 36 satır gerekirdi. Çözüm: for döngüsü.
*/
