// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessageEl);
  inputEl.classList.add(inputErrorClass); //Add inputErrorClass from config obj to input || {inputErrorClass} = conig.inputErrorClass
  errorMessageEl.textContent = inputEl.validationMessage; //set error text to validationMessage browser property
  errorMessageEl.classList.add(errorClass); //Add Fade in animation for error
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass); //Add inputErrorClass from config obj to input || {inputErrorClass} = conig.inputErrorClass
  errorMessageEl.textContent = " "; //reset error text to nothing
  errorMessageEl.classList.remove(errorClass); //Add Fade in animation for error
}

function checkInputValidity(formEl, inputEl, config) {
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
  const isFormValid = inputElements.every((input) => input.validity.valid); //check if each input is valid
  if (!isFormValid) {
    //if NOT valid
    submitButton.classList.add(inactiveButtonClass); // Add disabled button class
    submitButton.disabled = true; // Disable button
  } else {
    //If valid
    submitButton.classList.remove(inactiveButtonClass); // Remove disabled button class
    submitButton.disabled = false; // Enable button
  }
}

function handleInputEvent(formEl, inputEl, config) {
  checkInputValidity(formEl, inputEl, config);
  const { inputSelector, submitButtonSelector } = config;
  const inputElements = [...formEl.querySelectorAll(inputSelector)]; //get all inputs in formEl using spread operator to turn them into an array
  const submitButton = formEl.querySelector(submitButtonSelector); //get all modal submit buttons
  toggleButtonState(inputElements, submitButton, config); //call this function to change button sate
}

function setEventListeners(formEl, config) {
  //find all inputs in a form
  const { inputSelector } = config; // {inputSelector} is the same as const inputSelector = config.inputSelector
  const inputElements = [...formEl.querySelectorAll(inputSelector)]; //get all inputs in formEl using spread operator and array
  //for each input add an event listener and call checkInput and toggleButtonState
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputElements, submitButton, config);
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
  formSelector: ".modal__popup__form",
  inputSelector: ".modal__popup__input",
  submitButtonSelector: ".modal__popup__button",
  inactiveButtonClass: "modal__popup__button_disabled",
  inputErrorClass: "modal__popup__input_type_error",
  errorClass: "modal__popup__error_visible",
};

enableValidation(config);
