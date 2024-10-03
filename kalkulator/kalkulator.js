const readline = require("readline-sync");

let history = []; 
let previousResults = []; // Array to store previous results

while (true) {
  // Only show history if there are previous results
  if (previousResults.length > 0) {
    console.log("\nRiwayat hasil:");
    previousResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result.expression} = ${result.hasil}`);
    });
  }

  // Directly ask for the first number
  const angkaPertamaChoice = readline.question("Masukkan angka pertama (ketik nomor atau 'baru' untuk angka baru): ");
  
  let angkaPertama;

  if (angkaPertamaChoice.toLowerCase() === 'baru') {
    angkaPertama = parseFloat(readline.question("Masukkan angka pertama: "));
  } else {
    const index = parseInt(angkaPertamaChoice) - 1;
    if (index >= 0 && index < previousResults.length) {
      angkaPertama = previousResults[index].hasil; // Use previous result
    } else {
      angkaPertama = parseFloat(angkaPertamaChoice); // Convert input to number
      if (isNaN(angkaPertama)) {
        console.log("Input tidak valid, silakan masukkan angka baru.");
        continue; // Ask again if invalid
      }
    }
  }

  const operator = readline.question("Pilih operator (+, -, *, /, %): ");

  let angkaKedua;
  while (true) {
    angkaKedua = parseFloat(readline.question("Masukkan angka kedua: "));
    if (operator === '/' && angkaKedua === 0) {
      console.log("Angka kedua tidak boleh bernilai 0. Silakan masukkan angka kedua yang valid.");
    } else {
      break; // Exit the loop if the input is valid
    }
  }

  const requiredOperator = ["+", "-", "*", "/", "%"];

  if (!requiredOperator.includes(operator)) {
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

  const expression = `${angkaPertama} ${operator} ${angkaKedua}`;
  console.log(`Hasilnya adalah ${hasil}`);
  
  // Save the result along with the expression for future reference
  history.push(expression + ' = ' + hasil);
  previousResults.push({ expression, hasil }); // Store both expression and result

  const choice = readline.question("Mau lanjut berhitung? (ya/tidak): ");
  if (choice.toLowerCase() !== 'ya') {
    break;
  }
}

if (history.length > 0) {
  console.log("\nRiwayat kalkulasi:");
  history.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}

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
    default:
      throw new Error("Operator tidak valid");
  }
}
