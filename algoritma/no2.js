// Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

function kataTerpanjang(string) {
  let kata = "";
  const arr = [];

  for (let i = 0; i < string.length; i++) {
    // mengambil huruf pada string ke i
    const huruf = string[i];
    // jika huruf bukan spasi
    if (huruf !== " ") {
      // tambahkan huruf ke kata
      kata += huruf;
    } else {
      // jika spasi push kata ke array
      arr.push(kata);
      //   reset kata
      kata = "";
    }

    // jika looping kata terakhir
    // masukkan kata terakhir ke dalam array
    if (i === string.length - 1) {
      arr.push(kata);
    }
  }

  let terpanjang = "";
  for (let i = 0; i < arr.length; i++) {
    // jika array ke i lebih panjang dari kata terpanjang
    if (arr[i].length > terpanjang.length) {
      // ubah kata terpanjang menjadi array ke i
      terpanjang = arr[i];
    }
  }

  return terpanjang;
}

console.log(kataTerpanjang("Saya sangat senang soal mengerjakan algoritma "));
