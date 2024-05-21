// enabling validation by calling enableValidation()
// pass all the settings on call

function setEventListeners(formEl, config) {
  //find all inputs in a form
  const { inputSelector } = config; // {inputSelector} is the same as const inputSelector = config.inputSelector
  const inputElements = [...formEl.querySelectorAll(inputSelector)];
  console.log(inputElements);

  inputElements.forEach((input) => {
    input.addEventListener("input", () => {
      console.log("Wokring");
    });
  });
}

function enableValidation(config) {
  //get all form elements
  const formElements = [...document.querySelectorAll(config.formSelector)]; //Make an array of each form element using array and spread operator
  formElements.forEach((formEl) => {
    //for each form element
    console.log(formEl);
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
    //reset eror messages
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
