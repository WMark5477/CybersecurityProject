const letters = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split("");

const inputText = document.getElementById("vgInput");
const inputKey = document.getElementById("vgKey");
const result = document.getElementById("vgResult");

function encrypt() {
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputText.value)) {
      alert("Wiadomość może składać się tylko z liter alfabetu polskiego!");
      return;
   }
   if (/^$/.test(inputKey.value)) {
      alert("Klucz musi byc podany!");
      return;
   }
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputKey.value)) {
      alert("Klucz może zawierać tylko litery alfabetu polskiego!");
      return;
   }

   let resultString = "";
   let input = inputText.value.toLowerCase().replace(/\s+/g, "");
   let key = inputKey.value.toLowerCase().replace(/\s+/g, "");
   if (key.length < input.length) {
      let keyword = key;
      while (key.length < input.length) {
         key += keyword;
      }
   }
   if (key.length > input.length) {
      key = key.substring(0, input.length);
   }

   for (let i = 0; i < input.length; i++) {
      let index = letters.indexOf(input[i]);
      let keyIndex = letters.indexOf(key[i]);
      resultString += letters[(index + keyIndex) % letters.length];
   }
   result.textContent = resultString;
}

function decrypt() {
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputText.value)) {
      alert("Wiadomość może składać się tylko z liter alfabetu polskiego!");
      return;
   }
   if (/^$/.test(inputKey.value)) {
      alert("Klucz musi byc podany!");
      return;
   }
   if (!/^(|[aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż ]+)$/i.test(inputKey.value)) {
      alert("Klucz może zawierać tylko litery alfabetu polskiego!");
      return;
   }
   let resultString = "";
   let input = inputText.value.toLowerCase().replace(/\s+/g, "");
   let key = inputKey.value.toLowerCase().replace(/\s+/g, "");
   if (key.length < input.length) {
      let keyword = key;
      while (key.length < input.length) {
         key += keyword;
      }
   }
   if (key.length > input.length) {
      key = key.substring(0, input.length);
   }

   for (let i = 0; i < input.length; i++) {
      let index = letters.indexOf(input[i]);
      let keyIndex = letters.indexOf(key[i]);
      resultString += letters[(index - keyIndex + letters.length) % letters.length];
   }
   result.textContent = resultString;
}
