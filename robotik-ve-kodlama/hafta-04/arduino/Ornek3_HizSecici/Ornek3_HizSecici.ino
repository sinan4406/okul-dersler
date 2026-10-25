/*
  ROBOTİK KODLAMA 10 - 4. HAFTA - ÖRNEK 3 (ÖNCEKİ HAFTALARLA BİRLEŞTİRME): HIZ SEÇİCİ DÜĞME  (yerleşik LED + düğme)
  ----------------------------------------------------------------------
  Senaryo : Düğme bırakılınca LED yavaş (500/500 ms), düğmeye basılı tutulunca hızlı (100/100 ms) yanıp söner.
            Robotun "normal" ve "acele" modunu göstermek için kullanılır.
  Kazanım : 3. haftanın digitalRead + if / else yapısı ile 4. haftanın Blink'ini birleştirmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    Direnç 10 kilo-ohm    1     Düğmenin D2 tarafı ile GND arasında (pull-down)
    Düğme (4 bacaklı)     1     Bir taraf 5V, karşı taraf D2
    Jumper kablo          3     D2 -> düğme, 5V -> düğme, GND -> mavi (-) hat
    (LED olarak yerleşik L ışığı kullanılır; dış LED istenirse D13 - 220 ohm - LED - GND.)

  DEVRE (düğme): Düğmenin bir bacağı 5V'a, karşı bacağı hem D2'ye hem 10 kilo-ohm dirence bağlanır;
  direncin diğer ucu GND'dedir (pull-down direnç). Düğme bırakılınca D2 LOW, basılınca HIGH okunur.
  TINKERCAD: Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, INPUT);                  // D2: hız düğmesi girişi
  pinMode(LED_BUILTIN, OUTPUT);       // yerleşik LED çıkış
}

void loop() {
  if (digitalRead(2) == HIGH) {       // düğmeye basılı mı?
    digitalWrite(LED_BUILTIN, HIGH);  // hızlı mod: yan
    delay(100);                       // 100 ms
    digitalWrite(LED_BUILTIN, LOW);   // sön
    delay(100);                       // 100 ms
  } else {                            // düğme bırakıldı
    digitalWrite(LED_BUILTIN, HIGH);  // yavaş mod: yan
    delay(500);                       // 500 ms
    digitalWrite(LED_BUILTIN, LOW);   // sön
    delay(500);                       // 500 ms
  }
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Yavaş moddaki iki delay(500) değerini 1000 yap. Düğmeye bastığında hızlanması ne kadar gecikir? Neden?
  2) Hızlı moddaki iki delay(100) değerini 50 yap. LED saniyede kaç kez çakar?
*/
