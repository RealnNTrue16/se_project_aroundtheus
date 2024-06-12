function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // console.log(inputEl);
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  //console.log(errorMessageEl);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = " ";
  errorMessageEl.classList.remove(errorClass);
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
  const isFormValid = inputElements.every((input) => input.validity.valid);
  if (!isFormValid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function handleInputEvent(formEl, inputEl, config) {
  checkInputValidity(formEl, inputEl, config);
  const { inputSelector, submitButtonSelector } = config;
  const inputElements = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputElements, submitButton, config);
}

function setEventListeners(formEl, config) {
  const { inputSelector, submitButtonSelector } = config; //get InputSelector and SubmitButtonSelector from config
  const inputElements = [...formEl.querySelectorAll(inputSelector)]; //get all inputElements
  inputElements.forEach((inputEl) => {
    //for each input Element
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config); //check Input Validity
      const submitButton = formEl.querySelector(submitButtonSelector); // Changed from popup to modal
      toggleButtonState(inputElements, submitButton, config); //Check inpyt button state
    });
  });
}

function enableValidation(config) {
  const formElements = [...document.querySelectorAll(config.formSelector)]; //get all forms
  //console.log(formElements);
  formElements.forEach((formEl) => {
    //for Each for
    formEl.addEventListener("submit", (e) => {
      //add submit event listener
      e.preventDefault(); //prevent page reload
    });
    setEventListeners(formEl, config); //call setEventListener function with each form and config classes passed in
  });
}

const config = {
  formSelector: ".modal__popup__form", // Updated
  inputSelector: ".modal__popup__input", // Updated
  submitButtonSelector: ".modal__popup__button", // Updated
  inactiveButtonClass: "modal__popup__button_disabled", // Updated
  inputErrorClass: "modal__popup__input_type_error", // Updated
  errorClass: "modal__popup__error_visible", // Updated
};

enableValidation(config);
