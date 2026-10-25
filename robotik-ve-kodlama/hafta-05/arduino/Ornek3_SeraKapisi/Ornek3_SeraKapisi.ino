/*
  ROBOTİK KODLAMA 10 - 5. HAFTA - ÖRNEK 3 (ÖNCEKİ HAFTALARLA BİRLEŞTİRME): SERA KAPISI UYARISI  (2 LED + düğme)
  ----------------------------------------------------------------------
  Senaryo : 16 Ekim Dünya Gıda Günü. Serada kapı düğmesi basılıysa kapı açıktır. Kapı kapalıyken yeşil LED yanık kalır;
            açıkken yeşil söner, kırmızı LED 250 ms aralıkla çakar.
  Kazanım : 3. haftanın düğme okumasını 5. haftanın iki dış LED devresiyle birleştirmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (yeşil)           1     Katot mavi hatta, anot dirençten (D4)
    LED (kırmızı)         1     Katot mavi hatta, anot dirençten (D5)
    Direnç 220 ohm        2     D4 ve D5 ile LED anotları arasında
    Direnç 10 kilo-ohm    1     Düğmenin D2 tarafı ile GND arasında (pull-down)
    Düğme (4 bacaklı)     1     Bir taraf 5V, karşı taraf D2
    Jumper kablo          5     D4, D5 -> dirençler, D2 -> düğme, 5V -> düğme, GND -> mavi hat

  LED BAĞLANTISI: Uno GND -> breadboard mavi (-) hat. LED'in kısa bacağı (katot) mavi hatta,
  uzun bacağı (anot) 220 ohm direncin bir ucuna; direncin öbür ucu ilgili pine. Direnç unutulursa LED zarar görür.
  DÜĞME: Bir bacak 5V'a, karşı bacak hem D2'ye hem 10 kilo-ohm dirence; direncin öbür ucu GND (pull-down).
  TINKERCAD: Her LED için ayrı direnç kullan. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, INPUT);         // D2: kapı düğmesi girişi
  pinMode(4, OUTPUT);        // D4: yeşil (kapalı) LED
  pinMode(5, OUTPUT);        // D5: kırmızı (açık) LED
}

void loop() {
  if (digitalRead(2) == HIGH) {   // kapı açık mı?
    digitalWrite(4, LOW);         // yeşil söner
    digitalWrite(5, HIGH);        // kırmızı yanar
    delay(250);                   // 250 ms
    digitalWrite(5, LOW);         // kırmızı söner
    delay(250);                   // 250 ms: tur 500 ms
  } else {                        // kapı kapalı
    digitalWrite(5, LOW);         // kırmızı sönük
    digitalWrite(4, HIGH);        // yeşil yanık
    delay(10);                    // kısa bekle
  }
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Çakmanın sönük süresinin başında düğmeyi bırak. Yeşil en fazla ne kadar geç yanar?
  2) Çakmayı hızlandırmak için ne değiştirirsin?
*/
