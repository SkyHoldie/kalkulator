const readline = require("readline-sync");

let history = [];
let previousResults = [];

while (true) {
  console.log("\n=== Menu Utama ===");
  console.log("1. Kalkulasi");
  console.log("2. Lihat Riwayat");
  console.log("3. Keluar");
  
  const mainChoice = readline.question("Pilih menu (1-3): ");
  
  if (mainChoice === '1') {
    // Sub-menu untuk kalkulasi
    while (true) {
      console.log("\n=== Sub Menu Kalkulasi ===");
      console.log("1. Pertambahan (+)");
      console.log("2. Pengurangan (-)");
      console.log("3. Perkalian (*)");
      console.log("4. Pembagian (/) ");
      console.log("5. Modulus (%)");
      console.log("6. Akar Kuadrat (sqrt)");
      console.log("7. Sinus (sin)");
      console.log("8. Cosinus (cos)");
      console.log("9. Tangen (tan)");
      console.log("10. Kembali ke Menu Utama");

      const calcChoice = readline.question("Pilih operasi (1-10): ");

      if (calcChoice === '10') {
        break; // Kembali ke menu utama
      }

      let angkaPertama;
      if (['1', '2', '3', '4', '5'].includes(calcChoice)) {
        // Operasi dengan dua angka
        const angkaPertamaChoice = readline.question("Masukkan angka pertama (ketik nomor atau 'baru' untuk angka baru): ");

        if (angkaPertamaChoice.toLowerCase() === 'baru') {
          angkaPertama = parseFloat(readline.question("Masukkan angka pertama: "));
        } else {
          const index = parseInt(angkaPertamaChoice) - 1;
          if (index >= 0 && index < previousResults.length) {
            angkaPertama = previousResults[index].hasil;
          } else {
            angkaPertama = parseFloat(angkaPertamaChoice);
            if (isNaN(angkaPertama)) {
              console.log("Input tidak valid, silakan masukkan angka baru.");
              continue; // Ask again if invalid
            }
          }
        }

        const operator = ['1', '2', '3', '4', '5'][calcChoice - 1];

        let angkaKedua;
        while (true) {
          angkaKedua = parseFloat(readline.question("Masukkan angka kedua: "));
          if (operator === '4' && angkaKedua === 0) {
            console.log("Angka kedua tidak boleh bernilai 0. Silakan masukkan angka kedua yang valid.");
          } else {
            break;
          }
        }

        let hasil;
        try {
          hasil = processHasil(angkaPertama, angkaKedua, operator);
        } catch (e) {
          console.log(e.message);
          continue;
        }

        const expression = `${angkaPertama} ${getOperatorSymbol(operator)} ${angkaKedua}`;
        console.log(`Hasilnya adalah ${hasil}`);
        previousResults.push({ expression, hasil });
        
      } else {
        // Operasi satu angka
        angkaPertama = parseFloat(readline.question("Masukkan angka: "));
        let hasil;
        switch (calcChoice) {
          case '6':
            hasil = Math.sqrt(angkaPertama);
            break;
          case '7':
            hasil = Math.sin(angkaPertama);
            break;
          case '8':
            hasil = Math.cos(angkaPertama);
            break;
          case '9':
            hasil = Math.tan(angkaPertama);
            break;
          default:
            console.log("Pilihan tidak valid.");
            continue;
        }
        console.log(`Hasilnya adalah ${hasil}`);
        const expression = `${getFunctionName(calcChoice)}(${angkaPertama})`;
        previousResults.push({ expression, hasil });
      }
    }

  } else if (mainChoice === '2') {
    // Menampilkan riwayat
    if (previousResults.length > 0) {
      console.log("\nRiwayat hasil:");
      previousResults.forEach((result, index) => {
        console.log(`${index + 1}. ${result.expression} = ${result.hasil}`);
      });
    } else {
      console.log("Riwayat kosong.");
    }

  } else if (mainChoice === '3') {
    // Konfirmasi keluar
    const confirmExit = readline.question("Apakah Anda yakin ingin keluar? (ya/tidak): ");
    if (confirmExit.toLowerCase() === 'ya') {
      break; // Keluar dari program
    }
  } else {
    console.log("Pilihan tidak valid. Silakan pilih lagi.");
  }
}

function processHasil(inputanPertama, inputanKedua, operator) {
  switch (operator) {
    case '1':
      return inputanPertama + inputanKedua; // +
    case '2':
      return inputanPertama - inputanKedua; // -
    case '3':
      return inputanPertama * inputanKedua; // *
    case '4':
      if (inputanKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputanPertama / inputanKedua; // /
    case '5':
      return inputanPertama % inputanKedua; // %
    default:
      throw new Error("Operator tidak valid");
  }
}

function getOperatorSymbol(operator) {
  switch (operator) {
    case '1': return '+';
    case '2': return '-';
    case '3': return '*';
    case '4': return '/';
    case '5': return '%';
    default: return '';
  }
}

function getFunctionName(choice) {
  switch (choice) {
    case '6': return 'sqrt';
    case '7': return 'sin';
    case '8': return 'cos';
    case '9': return 'tan';
    default: return '';
  }
}
