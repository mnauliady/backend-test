// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverse(string) {
  const arr = [];

  for (let i = string.length - 1; i >= 0; i--) {
    // cek apakah string
    if (isNaN(string[i])) {
      // masukkan ke array
      arr.push(string[i]);
    }
  }

  //   masukkan angka ke array
  arr.push(string[string.length - 1]);

  //   mengembalikan ke string
  hasil = arr.join("");

  return hasil;
}

console.log(reverse("NEGIE1"));
