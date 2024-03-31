// Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

function countWord(input, query) {
  let output = [];
  let jumlah = 0;

  for (let i = 0; i < query.length; i++) {
    for (let j = 0; j < input.length; j++) {
      // cek apakah kata pada query ke i sama dengan kata input ke j
      if (query[i] == input[j]) {
        // jika sama counter bertambah
        jumlah++;
      }
    }
    // masukkan jumlah counter ke array output
    output.push(jumlah);
    // reset jumlah
    jumlah = 0;
  }

  return output;
}

const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];
console.log(countWord(input, query));
