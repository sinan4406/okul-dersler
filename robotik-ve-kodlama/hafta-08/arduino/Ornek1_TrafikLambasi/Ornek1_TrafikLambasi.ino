/*
  ROBOTİK KODLAMA 10 - 8. HAFTA - ÖRNEK 1 (TEMEL): TRAFİK LAMBASI  (3 LED)
  ----------------------------------------------------------------------
  Senaryo : Bir kavşaktaki araç trafik lambası: kırmızı, kırmızı+sarı, yeşil, sarı sırasıyla döner.
  Kazanım : Pin numarasına isim vermek (int ...), dijital portları çıkış yapmak,
            bir sıralamayı (algoritmayı) LED'lerle göstermek. Kitap s.71-72.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     D2 -> direnç -> LED anot; katot GND hattında
    LED (sarı)            1     D3 -> direnç -> LED anot; katot GND hattında
    LED (yeşil)           1     D4 -> direnç -> LED anot; katot GND hattında
    Direnç 220 ohm        3     Her LED için birer tane
    Jumper kablo          4     D2, D3, D4 ve GND bağlantıları

  DEVRE (adım adım)
    1) Arduino GND -> breadboard mavi (-) hat.
    2) Üç LED'in katodunu (kısa bacak) mavi hatta bağla.
    3) Her LED'in anoduna 220 ohm direnç tak; direncin diğer ucuna D2, D3, D4 kablolarını bağla.

  İPUCU: Pin numaralarını değişken adına bağladığımız için LED'i başka pine taşırsan
         yalnız en üstteki satırı değiştirmen yeter.
*/

int kirmizi = 2;   // kırmızı LED'in pini
int sari = 3;      // sarı LED'in pini
int yesil = 4;     // yeşil LED'in pini

void setup() {
  pinMode(kirmizi, OUTPUT);   // üç pin de çıkış
  pinMode(sari, OUTPUT);
  pinMode(yesil, OUTPUT);
}

void loop() {
  digitalWrite(kirmizi, HIGH);   // 1. DUR: yalnız kırmızı
  digitalWrite(sari, LOW);
  digitalWrite(yesil, LOW);
  delay(4000);
  digitalWrite(sari, HIGH);      // 2. HAZIR OL: kırmızı + sarı
  delay(1000);
  digitalWrite(kirmizi, LOW);    // 3. GEÇ: yalnız yeşil
  digitalWrite(sari, LOW);
  digitalWrite(yesil, HIGH);
  delay(4000);
  digitalWrite(yesil, LOW);      // 4. YAVAŞLA: yalnız sarı
  digitalWrite(sari, HIGH);
  delay(1500);
}

/*
  DEĞİŞTİR VE GÖZLE
    - delay(4000) değerlerini 2000 yap. Işıklar hızlanır; gerçekte bu süre neye bağlıdır?
    - Kırmızı LED'i D7'ye taşı: yalnız int kirmizi = 2; satırını 7 yap (ve kabloyu D7'ye bağla).

  TOPLAM SÜRE (doğrulama): 4000 + 1000 + 4000 + 1500 = 10500 ms (10,5 sn)
  NOT: "Kırmızı+sarı" aşaması kitapta da yer alır; bazı ülkelerde kullanılmaz.
*/
