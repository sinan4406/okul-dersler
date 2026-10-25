/*
  ROBOTİK KODLAMA 10 - 3. HAFTA - ÖRNEK 2 (UYGULAMA): YARDIM İSTE DÜĞMESİ  (1 LED + 1 düğme)
  ----------------------------------------------------------------------
  Senaryo : Bir servis robotunda "yardım iste" düğmesi vardır. Basılı tutulunca sarı LED saniyede 5 kez çakar,
            bırakılınca söner. Tur 200 ms.
  Kazanım : if içinde delay kullanmak; delay sırasında düğmenin okunmadığını görmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (sarı)            1     Uzun bacak dirençten gelir, kısa bacak GND hattında
    Direnç 220 ohm        1     D8 ile LED anodu arasında
    Direnç 10 kilo-ohm    1     Düğmenin D2 tarafı ile GND arasında (pull-down)
    Düğme (4 bacaklı)     1     Bir taraf 5V, karşı taraf D2
    Jumper kablo          4     D8 -> direnç, D2 -> düğme, 5V -> düğme, GND -> mavi (-) hat

  DEVRE (düğme): Düğmenin bir bacağı 5V'a, karşı bacağı hem D2'ye hem 10 kilo-ohm dirence bağlanır;
  direncin diğer ucu GND'dedir (pull-down direnç). Düğme bırakılınca D2 direnç üzerinden 0 V'a çekilir (LOW),
  basılınca 5 V gelir (HIGH). Direnci unutma: D2 havada kalırsa okuma rastgele olur.
  TINKERCAD: Arduino Uno + Breadboard Small + LED (sarı) + Pushbutton + iki Resistor. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, INPUT);       // D2: yardım düğmesi girişi
  pinMode(8, OUTPUT);      // D8: uyarı LED'i çıkışı
}

void loop() {
  if (digitalRead(2) == HIGH) {   // düğmeye basılı mı?
    digitalWrite(8, HIGH);        // evet: LED yanar
    delay(100);                   // 100 ms yanık
    digitalWrite(8, LOW);         // LED söner
    delay(100);                   // 100 ms sönük: tur 200 ms
  } else {                        // düğme bırakıldı
    digitalWrite(8, LOW);         // LED sönük kalsın
    delay(10);                    // kısa bekle
  }
}

/*
  DEĞİŞTİR VE GÖZLE
  1) İki delay(100) değerini 50 yap. LED saniyede kaç kez çakar?
  2) İki delay(100) değerini 1000 yap. Düğmeye basıp hemen bırak: LED hemen söner mi?
*/
