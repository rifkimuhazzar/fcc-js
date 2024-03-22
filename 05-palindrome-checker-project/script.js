const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const cleanNonAlphanumeric = (str) => {
  return str.replace(/[^a-zA-Z\d]/g, "");
};

const reverseInput = (str) => {
  return str.split("").reverse().join("");
};

checkButton.addEventListener("click", () => {
  const value = cleanNonAlphanumeric(textInput.value.toLowerCase());
  const reverseValue = reverseInput(value);

  if (!value) {
    resultDiv.innerText = "";
    alert("Please input a value");
  } else if (value === reverseValue) {
    resultDiv.innerText = `${textInput.value} is a palindrome`;
  } else {
    resultDiv.innerText = `${textInput.value} is not a palindrome`;
  }
});
