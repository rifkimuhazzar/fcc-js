const resultDialog = document.getElementById("result");
const closeDialogBtn = document.getElementById("result");
const changeDueDiv = document.getElementById("change-due");
const statusSpan = document.querySelector("#status span");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const totalPrice = document.querySelector("#total-price span");
const denominationList = [...document.getElementsByClassName("denomination")];

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const purchase = (cashAmount) => {
  let changeDue = fixedNumSub(cashAmount, price);

  let totalCashInDrawer = Number(
    cid.reduce((acc, el) => acc + el[1], 0).toFixed(2)
  );

  let cidChange = cid.map((el) => [el[0], 0]);

  const cidDenomination = [
    ["Penny", 0.01],
    ["Nickel", 0.05],
    ["Dime", 0.1],
    ["Quarter", 0.25],
    ["One", 1],
    ["Five", 5],
    ["Ten", 10],
    ["Twenty", 20],
    ["One Hundred", 100],
  ];

  if (cashAmount === price) {
    changeDueDiv.innerHTML =
      "<p class='status bold'>No change due - customer paid with exact cash</p>";
    return;
  } else if (totalCashInDrawer < changeDue) {
    changeDueDiv.innerHTML =
      "<p class='status bold'>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    if (changeDue < cidDenomination[i][1] && cid[i][1] > 0) {
      totalCashInDrawer = fixedNumSub(totalCashInDrawer, cidDenomination[i][1]);
    }

    while (
      changeDue >= cidDenomination[i][1] &&
      cid[i][1] - cidDenomination[i][1] >= 0 &&
      totalCashInDrawer >= changeDue
    ) {
      console.log("WhILE");
      cid[i][1] = fixedNumSub(cid[i][1], cidDenomination[i][1]);
      cidChange[i][1] = fixedNumAdd(cidChange[i][1], cidDenomination[i][1]);

      changeDue = fixedNumSub(changeDue, cidDenomination[i][1]);
      totalCashInDrawer = fixedNumSub(totalCashInDrawer, cidDenomination[i][1]);
    }
  }

  if (changeDue > 0) {
    changeDueDiv.innerHTML =
      "<p class='status bold'>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  const cidChangeResult = cidChange.filter((el) => el[1] > 0).reverse();

  const elCloseOpen = cidChangeResult
    .map(
      (el) =>
        `\n<p class='status'>${el[0]}: <span class='bold'>$${el[1]}</span></p>`
    )
    .join("");

  const totalChange = fixedNumSub(cashAmount, price);

  if (totalCashInDrawer <= 0) {
    changeDueDiv.innerHTML =
      "<p class='status bold'>Status: <span>CLOSED</span></p>" +
      elCloseOpen +
      `<p class='status bold' >You get total: <span>$${totalChange} </span>back</p>`;
    return;
  } else {
    changeDueDiv.innerHTML =
      "<p class='status bold'>Status: <span>OPEN</span></p>" +
      elCloseOpen +
      `<p class='status bold' >You get total: <span>$${totalChange} </span>back</p>`;
  }
};

const fixedNumAdd = (a, b) => Number((a + b).toFixed(2));
const fixedNumSub = (a, b) => Number((a - b).toFixed(2));

const checkInput = (inputVal) => inputVal.match(/^\d+(.|,)\d{1,2}$|\d+/g);

const clearStatus = () => {
  changeDueDiv.textContent = "";
};

const updateChangeInDrawerUI = () => {
  denominationList.forEach((el, i) => {
    el.textContent = `$${cid[i][1]}`;
  });
};

updateChangeInDrawerUI();
totalPrice.textContent = `$${price}`;

const showModal = () => {
  const cashAmount = Number(checkInput(cashInput.value));

  if (!cashAmount) {
    alert(
      "Please enter a valid cash amount (only integer or float with 2 numbers after dot are allowed)"
    );
    return;
  } else if (cashAmount < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else {
    clearStatus();
    purchase(cashAmount);
    updateChangeInDrawerUI();

    resultDialog.showModal();
    resultDialog.style.display = "flex";
  }
};

purchaseBtn.addEventListener("click", showModal);

cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showModal();
  }
});

closeDialogBtn.addEventListener("click", () => {
  resultDialog.close();
  resultDialog.style.display = "none";
});
