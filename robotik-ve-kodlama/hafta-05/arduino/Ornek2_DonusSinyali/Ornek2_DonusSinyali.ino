/*
  ROBOTİK KODLAMA 10 - 5. HAFTA - ÖRNEK 2 (UYGULAMA): ROBOT DÖNÜŞ SİNYALİ  (1 sarı LED)
  ----------------------------------------------------------------------
  Senaryo : Depodaki taşıma robotu sola dönerken sarı sinyal LED'i 400 ms yanar, 400 ms söner.
  Kazanım : Farklı pin (D4) ve farklı sürelerle aynı devreyi kurmak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (sarı)            1     Katot mavi hatta, anot dirençten
    Direnç 220 ohm        1     D4 ile LED anodu arasında
    Jumper kablo          2     GND -> mavi hat, D4 -> direnç

  LED BAĞLANTISI: Uno GND -> breadboard mavi (-) hat. LED'in kısa bacağı (katot) mavi hatta,
  uzun bacağı (anot) 220 ohm direncin bir ucuna; direncin öbür ucu ilgili pine. Direnç unutulursa LED zarar görür.
  TINKERCAD: Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(4, OUTPUT);        // D4: sinyal LED'i çıkışı
}

void loop() {
  digitalWrite(4, HIGH);     // sinyal yanar
  delay(400);                // 400 ms
  digitalWrite(4, LOW);      // sinyal söner
  delay(400);                // 400 ms: tur 800 ms
}

/*
  DEĞİŞTİR VE GÖZLE
  1) İki süreyi 250 yap. Sinyal saniyede kaç kez yanıp söner?
  2) LED'in bacaklarını ters çevir. Ne olur? Neden zarar görmez?
*/
