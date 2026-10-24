/*
  ROBOTİK KODLAMA 10 - 6. HAFTA - ÖRNEK 3 (BİRLEŞTİRME): ROBOTUN GÖZLERİ
  ----------------------------------------------------------------------
  Senaryo : Eğitsel bir robotun iki LED'li gözleri sola ve sağa bakar, karşıya bakar, göz kırpar.
  Kazanım : İki LED'i breadboard'a bağlamak, iki pini birlikte sürmek, 5. haftadaki
            robot elektronik bileşenleri ve LED anot/katot bilgisini birleştirmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         2     Sol göz ve sağ göz; kısa bacakları (katot) GND hattında
    Direnç 220 ohm        2     Her LED için birer tane; D2 -> sol göz, D3 -> sağ göz
    Jumper kablo          3     D2, D3 ve GND bağlantıları

  DEVRE (adım adım)
    1) GND -> breadboard mavi (-) hat.
    2) Her iki LED'in katodunu (kısa bacak) mavi hatta tak. Anotları (uzun bacak) ayrı sütunlara tak.
    3) Her anot sütununa bir 220 ohm direnç tak, direncin diğer ucundan Arduino'ya kablo çek:
       sol göz için D2, sağ göz için D3.

  İPUCU: Her LED'in kendi direnci vardır. İki LED tek dirence bağlanmaz.
*/

void setup() {
  pinMode(2, OUTPUT);     // D2: sol göz LED'i çıkış
  pinMode(3, OUTPUT);     // D3: sağ göz LED'i çıkış
}

void loop() {
  digitalWrite(2, HIGH); digitalWrite(3, LOW);  delay(600);    // sola bak: yalnız sol göz yanık
  digitalWrite(2, LOW);  digitalWrite(3, HIGH); delay(600);    // sağa bak: yalnız sağ göz yanık
  digitalWrite(2, HIGH); digitalWrite(3, HIGH); delay(1500);   // karşıya bak: iki göz yanık
  digitalWrite(2, LOW);  digitalWrite(3, LOW);  delay(150);    // göz kırp: iki göz kısa süre sönük
  digitalWrite(2, HIGH); digitalWrite(3, HIGH); delay(1000);   // gözler tekrar açık
}

/*
  DEĞİŞTİR VE GÖZLE
    - Göz kırpma süresini 150'den 600'e çıkar. Robot yorgun mu görünür?
    - İki LED'in direncini 220 yerine 1k ohm yap (Tinkercad). Parlaklık nasıl değişir?
      (Akım 3 V / 1000 ohm = 3 mA olur, LED soluk yanar.)

  TOPLAM SÜRE (doğrulama): 600 + 600 + 1500 + 150 + 1000 = 3850 ms
*/
