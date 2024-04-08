const convertForm = document.getElementById("convert-form");
const numberInput = document.getElementById("number");
const outputDiv = document.getElementById("output");

const convertToRoman = (number) => {
  const ref = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  const res = [];

  ref.forEach((arr) => {
    while (number >= arr[1]) {
      res.push(arr[0]);
      number -= arr[1];
    }
  });

  return res.join("");
};

const checkInputValue = (str, int) => {
  let invalidText;

  if (int < 1) {
    invalidText = "Please enter a number greater than or equal to 1";
  } else if (!str || str.match(/\D/)) {
    invalidText = "Please enter a valid number";
  } else if (int > 3999) {
    invalidText = "Please enter a number less than or equal to 3999";
  } else if (int >= 1 && int <= 3999) {
    return true;
  }

  outputDiv.classList.add("alert");
  outputDiv.textContent = invalidText;

  return false;
};

convertForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateUI();
});

const updateUI = () => {
  const inputValueStr = numberInput.value;
  const inputValueInt = parseInt(inputValueStr, 10);

  outputDiv.classList.remove("alert");
  outputDiv.classList.remove("hidden");

  if (checkInputValue(inputValueStr, inputValueInt)) {
    outputDiv.textContent = convertToRoman(inputValueInt);
  }
};
