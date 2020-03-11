const readline = require("readline-sync");

let c = readline.questionInt("");

let palavras = [];
console.log("Digite uma palavra de 9  a 10000 caracteres");
for (let i = 0; i < c; i++) {
  let palavra = readline.question("");

  if (palavra.length < 9 || palavra.length > 10000) {
    console.log("Digite uma palavra de 9  a 10000 caracteres");
    break;
  }
  else {
    palavras.push(palavra);
  }
}

for (let t = 0; t < palavras.length; t++) {
  console.log(0.01 * palavras[t].length);
}
