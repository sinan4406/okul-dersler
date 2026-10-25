/*
  ROBOTİK KODLAMA 10 - 4. HAFTA - ÖRNEK 4 (SEKTÖR): CİHAZ KALP ATIŞI VE ARIZA IŞIĞI  (2 LED + düğme)
  ----------------------------------------------------------------------
  Senaryo : Fabrikadaki bir kontrol kutusunda yeşil LED "kalp atışı" gibi saniyede bir çakar (program çalışıyor).
            Arıza düğmesine basılınca yeşil söner, kırmızı LED yanık kalır.
  Kazanım : Bir giriş (düğme) ile iki çıkışı (LED) yönetmek; delay sırasında düğmenin okunmadığını görmek.
  GÜVENLİK: Bu ışık yalnız bilgi verir, makineyi durdurmaz. Gerçek arıza korumaları yazılıma değil, donanıma bağlanır.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (yeşil)           1     Uzun bacak dirençten gelir, kısa bacak GND hattında (D6)
    LED (kırmızı)         1     Uzun bacak dirençten gelir, kısa bacak GND hattında (D7)
    Direnç 220 ohm        2     D6 ve D7 ile LED anotları arasında (her LED'in kendi direnci)
    Direnç 10 kilo-ohm    1     Düğmenin D2 tarafı ile GND arasında (pull-down)
    Düğme (4 bacaklı)     1     Bir taraf 5V, karşı taraf D2
    Jumper kablo          5     D6, D7 -> dirençler, D2 -> düğme, 5V -> düğme, GND -> mavi (-) hat

  DEVRE (düğme): Düğmenin bir bacağı 5V'a, karşı bacağı hem D2'ye hem 10 kilo-ohm dirence bağlanır;
  direncin diğer ucu GND'dedir (pull-down direnç). Düğme bırakılınca D2 LOW, basılınca HIGH okunur.
  TINKERCAD: Her LED için ayrı direnç kullan. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, INPUT);       // D2: arıza düğmesi girişi
  pinMode(6, OUTPUT);      // D6: yeşil kalp atışı LED'i
  pinMode(7, OUTPUT);      // D7: kırmızı arıza LED'i
}

void loop() {
  if (digitalRead(2) == HIGH) {   // arıza düğmesine basıldı mı?
    digitalWrite(6, LOW);         // evet: yeşil söner
    digitalWrite(7, HIGH);        // kırmızı sürekli yanar
    delay(10);                    // kısa bekle
  } else {                        // arıza yok
    digitalWrite(7, LOW);         // kırmızı söner
    digitalWrite(6, HIGH);        // yeşil kalp atışı: yan
    delay(100);                   // 100 ms
    digitalWrite(6, LOW);         // sön
    delay(900);                   // 900 ms: tur 1000 ms
  }
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Yeşil sönükken (delay(900) sırasında) düğmeye bas. Kırmızı en fazla ne kadar geç yanar? Neden?
  2) Gecikmeyi azaltmak için delay(900) yerine ne yapılabilir?
*/
