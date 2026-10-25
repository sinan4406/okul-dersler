/*
  ROBOTİK KODLAMA 10 - 3. HAFTA - ÖRNEK 3 (ÖNCEKİ HAFTALARLA BİRLEŞTİRME): SERVİS ROBOTU GÖREV DÜĞMESİ  (2 LED + 1 düğme)
  ----------------------------------------------------------------------
  Senaryo : Robot hazırken yeşil LED yanar. Görev düğmesine basılınca yeşil söner, kırmızı LED 3 saniye
            "görevde" diye yanar, sonra robot yeniden hazır olur.
  Kazanım : 2. haftanın iki pin + delay bilgisini 3. haftanın düğme okumasıyla birleştirmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (yeşil)           1     Uzun bacak dirençten gelir, kısa bacak GND hattında (D8)
    LED (kırmızı)         1     Uzun bacak dirençten gelir, kısa bacak GND hattında (D13)
    Direnç 220 ohm        2     D8 ve D13 ile LED anotları arasında (her LED'in kendi direnci)
    Direnç 10 kilo-ohm    1     Düğmenin D2 tarafı ile GND arasında (pull-down)
    Düğme (4 bacaklı)     1     Bir taraf 5V, karşı taraf D2
    Jumper kablo          5     D8, D13 -> dirençler, D2 -> düğme, 5V -> düğme, GND -> mavi (-) hat

  DEVRE (düğme): Düğmenin bir bacağı 5V'a, karşı bacağı hem D2'ye hem 10 kilo-ohm dirence bağlanır;
  direncin diğer ucu GND'dedir (pull-down direnç). Düğme bırakılınca D2 direnç üzerinden 0 V'a çekilir (LOW),
  basılınca 5 V gelir (HIGH). Direnci unutma: D2 havada kalırsa okuma rastgele olur.
  TINKERCAD: Her LED için ayrı direnç kullan. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, INPUT);       // D2: görev düğmesi girişi
  pinMode(8, OUTPUT);      // D8: yeşil (hazır) LED çıkışı
  pinMode(13, OUTPUT);     // D13: kırmızı (görevde) LED çıkışı
}

void loop() {
  if (digitalRead(2) == HIGH) {   // görev düğmesine basıldı mı?
    digitalWrite(8, LOW);         // evet: yeşil söner (hazır değil)
    digitalWrite(13, HIGH);       // kırmızı yanar (görevde)
    delay(3000);                  // görev 3 saniye sürer
    digitalWrite(13, LOW);        // görev bitti: kırmızı söner
  } else {                        // düğmeye basılmadı
    digitalWrite(8, HIGH);        // yeşil yanık: robot hazır
    delay(10);                    // kısa bekle
  }
}

/*
  DEĞİŞTİR VE GÖZLE
  1) delay(3000) değerini 1000 yap. Görev kaç saniye sürer?
  2) digitalWrite(8, LOW); satırını sil. Görev sırasında yeşil LED ne yapar? Bu neden yanlış bir durum bildirir?
*/
