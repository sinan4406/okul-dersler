/*
  ROBOTİK KODLAMA 10 - 3. HAFTA - ÖRNEK 1 (TEMEL): DÜĞME İLE LED  (1 LED + 1 düğme)
  ----------------------------------------------------------------------
  Senaryo : Kitaptaki 3. uygulama (s.35-36): düğmeye basılı tutulunca LED yanar, bırakılınca söner.
  Kazanım : digitalRead ile giriş okumak; if / else ile karar vermek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     Uzun bacak (anot) dirençten gelir, kısa bacak (katot) GND hattında
    Direnç 220 ohm        1     D13 ile LED anodu arasında
    Direnç 10 kilo-ohm    1     Düğmenin D2 tarafı ile GND arasında (pull-down)
    Düğme (4 bacaklı)     1     Çukurun iki yanına oturur; bir taraf 5V, karşı taraf D2
    Jumper kablo          4     D13 -> direnç, D2 -> düğme, 5V -> düğme, GND -> mavi (-) hat

  DEVRE (düğme): Düğmenin bir bacağı 5V'a, karşı bacağı hem D2'ye hem 10 kilo-ohm dirence bağlanır;
  direncin diğer ucu GND'dedir (pull-down direnç). Düğme bırakılınca D2 direnç üzerinden 0 V'a çekilir (LOW),
  basılınca 5 V gelir (HIGH). Direnci unutma: D2 havada kalırsa okuma rastgele olur.
  TINKERCAD: Başlatıcılar > Arduino > "Düğme" örneğini seçersen devre hazır gelir. Code > Text > kodu yapıştır > Start Simulation.
  Simülasyonda düğmeye basılı tutunca LED yanar.
*/

int buttonState = 0;       // düğmenin durumunu tutan değişken

void setup() {
  pinMode(2, INPUT);       // D2: düğme girişi
  pinMode(13, OUTPUT);     // D13: LED çıkışı
}

void loop() {
  buttonState = digitalRead(2);   // düğmenin durumunu oku
  if (buttonState == HIGH) {      // düğmeye basılı mı?
    digitalWrite(13, HIGH);       // evet: LED'i yak
  } else {                        // hayır:
    digitalWrite(13, LOW);        // LED'i söndür
  }
  delay(10);                      // 10 ms bekle
}

/*
  DEĞİŞTİR VE GÖZLE
  1) if (buttonState == HIGH) satırında HIGH yerine LOW yaz. LED ne zaman yanar?
  2) pinMode(2, INPUT); satırını sil. Program yine çalışır mı? Neden?
*/
