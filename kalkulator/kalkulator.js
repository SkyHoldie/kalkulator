const readline = require("readline-sync");

let history = []; 
let previousResult = 0; 
while (true) {
  const angkaPertama = previousResult || parseFloat(readline.question("Masukan angka pertama : "));
  const operator = readline.question("Pilih operator (+,-,*,/,%) : ");
  const angkaKedua = parseFloat(readline.question("Masukan angka kedua : "));

  const requiredOperator = ["+", "-", "*", "/", "%"];

  if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
    console.log("Inputan anda tidak valid");
    continue;
  } else if (!requiredOperator.includes(operator)) {
    console.log("Pilih sesuai operator yang tersedia");
    continue;
  }

  let hasil;
  try {
    hasil = processHasil(angkaPertama, angkaKedua, operator);
  } catch (e) {
    console.log(e.message);
    continue;
  }

  console.log(`Hasil nya adalah ${hasil}`);
  history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
  previousResult = hasil;

  const choice = readline.question("Lanjutkan perhitungan? (y/n) : ");
  if (choice.toLowerCase() !== 'y') {
    break;
  }
}

console.log("Riwayat kalkulasi:");
history.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});

function processHasil(inputanPertama, inputanKedua, operator) {
  switch (operator) {
    case "+":
      return inputanPertama + inputanKedua;
    case "-":
      return inputanPertama - inputanKedua;
    case "*":
      return inputanPertama * inputanKedua;
    case "/":
      if (inputanKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputanPertama / inputanKedua;
    case "%":
      return inputanPertama % inputanKedua;
  }
}