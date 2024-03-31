// Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN

function penguranganMatrix(matrix) {
  let diagonalPertama = 0;
  let diagonalKedua = 0;

  for (let i = 0; i < matrix.length; i++) {
    // jumlah untuk diagonal pertama
    diagonalPertama += matrix[i][i];
    // jumlah untuk diagonal kedua
    diagonalKedua += matrix[i][matrix.length - 1 - i];
  }

  //   hasil pengurangan
  const hasil = diagonalPertama - diagonalKedua;

  return hasil;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(penguranganMatrix(matrix));
