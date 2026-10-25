/*
  ROBOTİK KODLAMA 10 - 5. HAFTA - ÖRNEK 4 (SEKTÖR): AMBULANS ÇAKAR LAMBASI  (2 LED)
  ----------------------------------------------------------------------
  Senaryo : Ambulansın çakar lambası kırmızı ve mavi ışıkla dönüşümlü çalışır. D4 kırmızı, D5 mavi; 150 ms aralıkla.
  Kazanım : İki dış LED'i dönüşümlü sürmek; farklı renk LED'lerin akımının farklı olduğunu görmek.
  GÜVENLİK: Çakar lambalar yalnız yetkili araçlarda kullanılır. Bu yalnız bir ışık deseni örneğidir.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     Katot mavi hatta, anot dirençten (D4)
    LED (mavi)            1     Katot mavi hatta, anot dirençten (D5)
    Direnç 220 ohm        2     D4 ve D5 ile LED anotları arasında
    Jumper kablo          3     D4, D5 -> dirençler, GND -> mavi hat

  LED BAĞLANTISI: Uno GND -> breadboard mavi (-) hat. LED'in kısa bacağı (katot) mavi hatta,
  uzun bacağı (anot) 220 ohm direncin bir ucuna; direncin öbür ucu ilgili pine. Direnç unutulursa LED zarar görür.
  TINKERCAD: Her LED için ayrı direnç kullan. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(4, OUTPUT);        // D4: kırmızı LED
  pinMode(5, OUTPUT);        // D5: mavi LED
}

void loop() {
  digitalWrite(4, HIGH);     // kırmızı yanar
  delay(150);                // 150 ms
  digitalWrite(4, LOW);      // kırmızı söner
  digitalWrite(5, HIGH);     // mavi yanar
  delay(150);                // 150 ms
  digitalWrite(5, LOW);      // mavi söner: tur 300 ms
}

/*
  DEĞİŞTİR VE GÖZLE
  1) İki delay(150) değerini 75 yap. Tur süresi ve çakma hızı ne olur?
  2) Üçüncü bir renk eklemek için neler gerekir?
*/
