// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  console.log(inputEl);
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessageEl);
  inputEl.classList.add(inputErrorClass); //Add inputErrorClass from config obj to input || {inputErrorClass} = conig.inputErrorClass
  errorMessageEl.textContent = inputEl.validationMessage; //set error text to validationMessage browser property
  errorMessageEl.classList.add(errorClass); //Add Fade in animation for error
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(inputEl);
  inputEl.classList.remove(inputErrorClass); //Add inputErrorClass from config obj to input || {inputErrorClass} = conig.inputErrorClass
  errorMessageEl.textContent = " "; //reset error text to nothing
  errorMessageEl.classList.remove(errorClass); //Add Fade in animation for error
}

function checkInputValidity(formEl, inputEl, config) {
  console.log(inputEl);
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  let foundInvalid = false; //set var to false to begin
  inputElements.forEach((input) => {
    if (!input.validity.valid) {
      //if any input is not valid
      foundInvalid = true; //set foundInvalid to true
    }
  });
  if (foundInvalid) {
    //if foundInvalid is true
    submitButton.classList.add(inactiveButtonClass); //add disabled button class for visual effect
    submitButton.disabled = true; //disable button
  } else {
    //if foundInvalid is false
    submitButton.classList.remove(inactiveButtonClass); //remove disabled button class
    submitButton.disabled = false; //enable button
  }
}

function setEventListeners(formEl, config) {
  //find all inputs in a form
  const { inputSelector } = config; // {inputSelector} is the same as const inputSelector = config.inputSelector
  const inputElements = [...formEl.querySelectorAll(inputSelector)]; //get all inputs in formEl using spread operator and array
  const submitButton = formEl.querySelector(".popup__button"); //get all modal submit buttons
  //for each input add an event listener and call checkInput and toggleButtonState
  //console.log(inputElements);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      console.log(inputEl);
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEl, submitButton, config);
    });
  });
}

function enableValidation(config) {
  //get all form elements
  const formElements = [...document.querySelectorAll(config.formSelector)]; //Make an array of each form element using array and spread operator
  formElements.forEach((formEl) => {
    //for each form element

    formEl.addEventListener("submit", (e) => {
      //add event listener
      e.preventDefault(); //prevent page reload
    });
    //loop for all inputs inside of form
    setEventListeners(formEl, config);
    //loop thru all inputs to check if all are valid

    //if input is not valid
    //grab validation message
    //add error class to input
    //display error message
    //disable button
    //if inputs are valid
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
