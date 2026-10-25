/*
  ROBOTİK KODLAMA 10 - 2. HAFTA - ÖRNEK 1 (TEMEL): BLINK (YAK-SÖNDÜR)  (1 LED)
  ----------------------------------------------------------------------
  Senaryo : Her elektronik cihazın "ben çalışıyorum" diyen küçük bir ışığı vardır.
            Bu örnekte D13'e bağlı LED saniyede bir yanıp söner (kitap 2. Uygulama, s.24-28).
  Kazanım : Tinkercad'de devre kurup ilk programı çalıştırmak; setup() ve loop() farkını bilmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     Uzun bacak (anot) dirençten gelir, kısa bacak (katot) GND hattında
    Direnç 220 ohm        1     D13 ile LED anodu arasında
    Jumper kablo          2     D13 -> direnç, GND -> mavi (-) hat

  TINKERCAD: Arduino Uno + Breadboard Small + LED + Resistor (220 ohm). Code > Text > kodu yapıştır > Start Simulation.
  NOT: D13'e ayrıca kart üzerindeki L LED'i bağlıdır; o da aynı anda yanıp söner.
*/

void setup() {
  pinMode(13, OUTPUT);     // D13 pinini çıkış yap
}

void loop() {
  digitalWrite(13, HIGH);  // LED'i yak (5 V)
  delay(1000);             // 1000 ms = 1 saniye bekle
  digitalWrite(13, LOW);   // LED'i söndür (0 V)
  delay(1000);             // 1 saniye bekle
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Her iki delay(1000) değerini 250 yap. LED saniyede kaç kez yanıp söner?
  2) İlk delay(1000) değerini 3000 yap. LED çoğu zaman yanık mı sönük mü görünür?
*/
