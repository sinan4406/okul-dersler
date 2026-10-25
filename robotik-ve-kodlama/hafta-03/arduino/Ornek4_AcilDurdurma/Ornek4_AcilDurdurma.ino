/*
  ROBOTİK KODLAMA 10 - 3. HAFTA - ÖRNEK 4 (SEKTÖR): FABRİKA ROBOTU ACİL DURDURMA IŞIĞI  (2 LED + 1 düğme)
  ----------------------------------------------------------------------
  Senaryo : Fabrikadaki robot kolunun yanında acil durdurma düğmesi vardır. Normalde yeşil LED "robot çalışıyor"
            der. Düğmeye basılınca yeşil söner, kırmızı LED 300 ms aralıkla çakar.
  Kazanım : Giriş (düğme) ile iki çıkışı (LED) birlikte yönetmek; delay'in tepki süresini geciktirdiğini görmek.
  GÜVENLİK: Gerçek acil durdurma düğmesi bu derste kullandığımız gibi yalnız bir yazılıma bağlanmaz. Robotun
            güç hattını doğrudan keser ve "normalde kapalı" (NC) bağlanır; kablo kopsa bile robot durur.

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
  direncin diğer ucu GND'dedir (pull-down direnç). Düğme bırakılınca D2 direnç üzerinden 0 V'a çekilir (LOW),
  basılınca 5 V gelir (HIGH). Direnci unutma: D2 havada kalırsa okuma rastgele olur.
  TINKERCAD: Her LED için ayrı direnç kullan. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, INPUT);       // D2: acil durdurma düğmesi girişi
  pinMode(6, OUTPUT);      // D6: yeşil (çalışıyor) LED çıkışı
  pinMode(7, OUTPUT);      // D7: kırmızı (acil durdurma) LED çıkışı
}

void loop() {
  if (digitalRead(2) == HIGH) {   // acil durdurmaya basıldı mı?
    digitalWrite(6, LOW);         // evet: yeşil söner (robot durdu)
    digitalWrite(7, HIGH);        // kırmızı yanar
    delay(300);                   // 300 ms yanık
    digitalWrite(7, LOW);         // kırmızı söner
    delay(300);                   // 300 ms sönük
  } else {                        // normal çalışma
    digitalWrite(6, HIGH);        // yeşil yanık: robot çalışıyor
    digitalWrite(7, LOW);         // kırmızı sönük
    delay(10);                    // kısa bekle
  }
}

/*
  DEĞİŞTİR VE GÖZLE
  1) İki delay(300) değerini 100 yap. Kırmızı LED saniyede kaç kez çakar?
  2) Düğmeye basıp hemen bırak. Yeşil LED ne kadar sonra geri döner? Gerçek acil durdurma neden delay'e güvenmez?
*/
