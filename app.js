const resultEl =
  document.getElementById("result");
const lengthEl =
  document.getElementById("length");
const upperCaseEl =
  document.getElementById("upperCase");
const lowerCaseEl =
  document.getElementById("lowerCase");
const numberEl =
  document.getElementById("numbers");
const symbolsEl =
  document.getElementById("symbols");
const generateEl =
  document.getElementById("generate");
const clipboardEl =
  document.getElementById("clipboard");

generateEl.addEventListener("click", () => {
  //plus sign interpolates string to the number
  const length = +lengthEl.value;

  //when checked, the return state is true, once the checkbox is not checed, return state is false
  const hasUpper = upperCaseEl.checked;
  const hasLower = lowerCaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//Copy to clipboard:
clipboardEl.addEventListener("click", () => {
  const textArea =
    document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password copied to clipboard!");
});

function generatePassword(
  upper,
  lower,
  number,
  symbol,
  length
) {
  let generatedPassword = "";
  const typesCount =
    lower + upper + number + symbol;

  const typesArr = [
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter((item) => Object.values(item)[0]);

  if (typesCount === 0) {
    return;
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(
    0,
    length
  );
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 97
  );
}

function getRandomUpper() {
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 65
  );
}

function getRandomNumber() {
  return String.fromCharCode(
    Math.floor(Math.random() * 10) + 48
  );
}

function getRandomSymbol() {
  const symbols = "~`!@#$%^&*()-_+={}[]|";
  return symbols[
    Math.floor(Math.random() * symbols.length)
  ];
}
