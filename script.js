"use strict";

const formContainer = document.querySelector(".form-container");
const mainEl = document.querySelector(".main");
const thankEl = document.querySelector(".thank");
// INPUTS THEMSELVES
const cardHolderNameInput = document.querySelector(".input-cardholder-name");
const cardNumberInput = document.querySelector(".input-card-number");
const cardMonthInput = document.querySelector(".exp-date-month");
const cardYearInput = document.querySelector(".exp-date-year");
const cvcInput = document.querySelector(".cvc");
const allInputs = document.querySelectorAll(".input");
// CARD TEXTS
const dateMonth = document.querySelector(".month");
const dateYear = document.querySelector(".year");
const frontCardNumber = document.querySelector(".front-card-number");
const holderName = document.querySelector(".name");
const cvc = document.querySelector(".back-card-number");
// BUTTONS
const confirmBtn = document.querySelector(".submit");
const contBtn = document.querySelector(".continue");

const cardText = function (e) {
  if (e.target === cardHolderNameInput)
    holderName.textContent = cardHolderNameInput.value;
  if (e.target === cardNumberInput) {
    cardNumberInput.value = cardNumberInput.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    frontCardNumber.textContent = cardNumberInput.value;
  }
  if (e.target === cardMonthInput) {
    dateMonth.textContent = cardMonthInput.value + " /";
  }
  if (e.target === cardYearInput) dateYear.textContent = cardYearInput.value;
  if (e.target === cvcInput) cvc.textContent = cvcInput.value;
};

const monthAndYearFixer = (date, input) => {
  date.textContent = "0" + input.value;
};
const errorText = function (element, text) {
  if (element.dataset.error === "false")
    element.parentNode.insertAdjacentHTML(
      "beforeend",
      `<p class="error-message">Please provide a valid ${text} </p>`
    );
  element.classList.add("border-error");
  element.dataset.error = "true";
};
const errorReset = (el) => {
  el.dataset.error = "false";
  el.classList.remove("border-error");
  if (el.parentNode.querySelector("p"))
    el.parentNode.querySelector("p").remove();
};

const check = function () {
  if (
    cardHolderNameInput.value !== "" &&
    isNaN(cardHolderNameInput.value.replaceAll(" ", "")) &&
    cardNumberInput.value.length === 19 &&
    cardMonthInput.value >= 1 &&
    cardMonthInput.value <= 12 &&
    isFinite(cardMonthInput.value) &&
    cardYearInput.value >= 0 &&
    isFinite(cardYearInput.value) &&
    cardYearInput.value.length >= 1 &&
    cvcInput.value.length === 3 &&
    isFinite(cvcInput.value)
  ) {
    mainEl.classList.add("main-thank");
    formContainer.classList.add("clear-container");
    thankEl.classList.remove("clear-container");
  }
  if (
    cardHolderNameInput.value === "" ||
    isFinite(cardHolderNameInput.value.replaceAll(" ", ""))
  )
    errorText(cardHolderNameInput, "name");
  else errorReset(cardHolderNameInput);

  if (cardNumberInput.value.length !== 19) errorText(cardNumberInput, "number");
  else errorReset(cardNumberInput);
  if (
    cardMonthInput.value < 1 ||
    cardMonthInput.value >= 13 ||
    !isFinite(cardMonthInput.value)
  )
    errorText(cardMonthInput, "month");
  else errorReset(cardMonthInput);

  if (
    cardYearInput.value <= 0 ||
    !isFinite(cardYearInput.value) ||
    cardYearInput.value === ""
  )
    errorText(cardYearInput, "year");
  else errorReset(cardYearInput);

  if (cvcInput.value.length < 3 || isNaN(cvcInput.value))
    errorText(cvcInput, "cvc");
  else errorReset(cvcInput);

  {
    if (cardMonthInput.value.length === 1) {
      monthAndYearFixer(dateMonth, cardMonthInput);
    }
    if (cardYearInput.value.length === 1) {
      monthAndYearFixer(dateYear, cardYearInput);
    }
  }
};
const resetAndCont = () => {
  frontCardNumber.textContent = "0000 0000 0000 0000";
  holderName.textContent = "Fanis Papadopoulos";
  dateMonth.textContent = "00 /";
  dateYear.textContent = "00";
  cvc.textContent = "000";
  mainEl.classList.remove("main-thank");
  formContainer.classList.remove("clear-container");
  thankEl.classList.add("clear-container");
  allInputs.forEach((el) => {
    el.value = "";
  });
};

formContainer.addEventListener("input", cardText);
confirmBtn.addEventListener("click", check);
contBtn.addEventListener("click", resetAndCont);
