// GÖREV: Bu dosyada 4 hata var — bazıları konsolda kırmızı hata olarak
// görünecek, bazıları sessizce yanlış davranacak (buton hiç artmayacak
// veya yanlış yere yazacak). sayac.html ile birlikte test edin.

let sayi = 0;

function artir() {
  let sayi = 0;
  sayi = sayi + 1;
  document.querySelektor("#begen-btn").textContent = sayi;
}

const btn = document.querySelector("#begen-btn");
btn.addEventListener("click", artir());
