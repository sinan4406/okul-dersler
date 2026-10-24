/*
  ROBOTİK KODLAMA 10 - 7. HAFTA - ÖRNEK 1 (TEMEL): KALP MONİTÖRÜ  (1 LED)
  ----------------------------------------------------------------------
  Senaryo : Kızılay Haftası. İlk yardım eğitiminde kullanılan bir kalp monitörü kalbin
            "lub-dub" vuruşunu bir LED ile gösterir. Dakikada 72 atım = her atım 833 ms.
  Kazanım : Tek LED'li devrenin çalışma mantığını anlatmak ve kurmak (delay ile ritim üretmek).

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     Uzun bacak (anot) dirençten gelir, kısa bacak (katot) GND hattında
    Direnç 220 ohm        1     D8 ile LED anodu arasında
    Jumper kablo          2     D8 -> direnç, GND -> mavi (-) hat

  DEVRE (adım adım)
    1) Arduino GND -> breadboard mavi (-) hat.
    2) LED'in kısa bacağını (katot) mavi hatta bağla, uzun bacağı (anot) ayrı bir sütuna tak.
    3) Anot sütununa 220 ohm direnç tak; direncin diğer ucundan Arduino D8'e kablo çek.

  TINKERCAD: Arduino Uno + Breadboard Small + LED + Resistor (220 ohm). Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(8, OUTPUT);     // D8: kalp LED'i çıkış
}

void loop() {
  digitalWrite(8, HIGH);  // 1. vuruş (lub): kalp kasıldı, LED yandı
  delay(120);             // 120 ms yanık kal
  digitalWrite(8, LOW);   // gevşeme: LED söndü
  delay(130);             // 130 ms kısa ara
  digitalWrite(8, HIGH);  // 2. vuruş (dub): LED tekrar yandı
  delay(120);             // yine 120 ms yanık kal
  digitalWrite(8, LOW);   // gevşeme: LED söndü
  delay(463);             // dinlenme: tur toplamı 833 ms olsun
}

/*
  DEĞİŞTİR VE GÖZLE
    - Son delay(463) değerini 263 yap. Tur 633 ms olur: 60000 / 633 = yaklaşık 95 atım/dk
      (koşu sonrası kalp gibi hızlanır).
    - İkinci vuruşun 3 satırını sil (digitalWrite HIGH, delay(120), digitalWrite LOW).
      LED 120 ms yanar, 130 + 463 = 593 ms söner: tur 713 ms, yaklaşık 84 atım/dk.

  TOPLAM SÜRE (doğrulama): 120 + 130 + 120 + 463 = 833 ms -> 60000 / 833 = 72 atım/dk
*/
