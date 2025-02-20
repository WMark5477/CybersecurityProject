const letters = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split("");

const inputText = document.getElementById("caesarInput");
const key = document.getElementById("caesarKey");
const result = document.getElementById("caesarResult");

function encrypt() {
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputText.value)) {
      alert("Wiadomość może składać się tylko z liter alfabetu polskiego!");
      return;
   }
   let input = inputText.value.toLowerCase();
   let resultString = "";
   let shift = +key.value % letters.length;
   for (let i in input) {
      if (input[i] == " ") continue;
      resultString += letters[(letters.indexOf(input[i]) + shift) % letters.length];
   }
   result.textContent = resultString;
}
function decrypt() {
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputText.value)) {
      alert("Wiadomość może składać się tylko z liter alfabetu polskiego!");
      return;
   }
   let input = inputText.value.toLowerCase();
   let resultString = "";
   let shift = ((-+key.value % letters.length) + letters.length) % letters.length;
   for (let i in input) {
      if (input[i] == " ") continue;
      resultString += letters[(letters.indexOf(input[i]) + shift) % letters.length];
   }
   result.textContent = resultString;
}
