const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const countryPhoneRegex = [
  {
    country: "US",
    regex: /^1?\s*(\(\d{3}\)|\d{3})[-\s+]?(\d{3})[-\s+]?(\d{4})$/,
  },
];

const numberPhoneValidator = () => {
  if (!userInput.value) {
    alert("Please provide a phone number");
    return;
  }

  // if true return an object, otherwise undefined.
  const obj = countryPhoneRegex.find((el) => el.regex.test(userInput.value));

  resultsDiv.innerHTML += obj
    ? `<p class="result-text success">Valid ${obj.country} number: ${userInput.value}<p>`
    : `<p class="result-text  alert">Invalid US number: ${userInput.value}<p>`;
};

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    numberPhoneValidator();
  }
});

checkBtn.addEventListener("click", numberPhoneValidator);

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
});
