const letters = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split("");

const inputText = document.getElementById("pfInput");
const key = document.getElementById("pfKey");
const result = document.getElementById("pfResult");
const display = document.getElementById("pfDisplay");

function encrypt() {
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputText.value)) {
      alert("Wiadomość może składać się tylko z liter alfabetu polskiego!");
      return;
   }
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(key.value)) {
      alert("Klucz może zawierać tylko litery alfabetu polskiego!");
      return;
   }
   let input = inputText.value.toLowerCase();
   input = input.replace(/\s+/g, "");
   input = input.replace(/([aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż])\1/g, "$1x$1");
   let resultString = "";
   let keyArray = Array.from(new Set(key.value.toLowerCase().replace(/\s+/g, "")));
   let keyMatrix = generateKeyMatrix(keyArray);
   if (input.length % 2 != 0) {
      input += "x";
   }
   for (let i = 0; i < input.length; i += 2) {
      let a = input[i];
      let b = input[i + 1];
      let rowA = keyMatrix.findIndex((row) => row.includes(a));
      let rowB = keyMatrix.findIndex((row) => row.includes(b));
      let colA = keyMatrix[rowA].indexOf(a);
      let colB = keyMatrix[rowB].indexOf(b);
      if (rowA == rowB) {
         resultString += keyMatrix[rowA][(colA + 1) % 7] + keyMatrix[rowB][(colB + 1) % 7];
      } else if (colA == colB) {
         resultString += keyMatrix[(rowA + 1) % 5][colA] + keyMatrix[(rowB + 1) % 5][colB];
      } else {
         resultString += keyMatrix[rowA][colB] + keyMatrix[rowB][colA];
      }
   }
   displayMatrix(keyMatrix);
   result.textContent = resultString;
}

function decrypt() {
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputText.value)) {
      alert("Wiadomość może składać się tylko z liter alfabetu polskiego!");
      return;
   }
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(key.value)) {
      alert("Klucz może zawierać tylko litery alfabetu polskiego!");
      return;
   }
   let input = inputText.value.toLowerCase();
   input = input.replace(/\s+/g, "");
   let resultString = "";
   let keyArray = Array.from(new Set(key.value.toLowerCase().replace(/\s+/g, "")));
   let keyMatrix = generateKeyMatrix(keyArray);
   if (input.length % 2 != 0) {
      input += "x";
   }
   for (let i = 0; i < input.length; i += 2) {
      let a = input[i];
      let b = input[i + 1];
      let rowA = keyMatrix.findIndex((row) => row.includes(a));
      let rowB = keyMatrix.findIndex((row) => row.includes(b));
      let colA = keyMatrix[rowA].indexOf(a);
      let colB = keyMatrix[rowB].indexOf(b);
      if (rowA == rowB) {
         resultString += keyMatrix[rowA][(colA - 1 + 7) % 7] + keyMatrix[rowB][(colB - 1 + 7) % 7];
      } else if (colA == colB) {
         resultString += keyMatrix[(rowA - 1 + 5) % 5][colA] + keyMatrix[(rowB - 1 + 5) % 5][colB];
      } else {
         resultString += keyMatrix[rowA][colB] + keyMatrix[rowB][colA];
      }
   }
   displayMatrix(keyMatrix);
   result.textContent = resultString;
}
function generateKeyMatrix(keyArray) {
   let resultMatrix = Array(5)
      .fill(null)
      .map(() => Array(7).fill(null));
   let alphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split("");
   keyArray.forEach((x) => {
      alphabet.splice(alphabet.indexOf(x), 1);
   });
   let fullKey = [...keyArray, ...alphabet];
   for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
         resultMatrix[i][j] = fullKey[i * 7 + j];
      }
   }
   return resultMatrix;
}
function randomizeKey() {
   let random = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split("");
   random = random.sort(() => Math.random() - 0.5).join("");
   key.value = random;
}

function displayMatrix(matrix) {
   let html = "<table>";
   for (let i = 0; i < matrix.length; i++) {
      html += "<tr>";
      for (let j = 0; j < matrix[i].length; j++) {
         html += `<td>${matrix[i][j]}</td>`;
      }
      html += "</tr>";
   }
   html += "</table>";
   display.innerHTML = html;
}
