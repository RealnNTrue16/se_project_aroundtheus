export default class FormValidator {
  constructor(config, form) {
    this._config = config; // Set config properties
    this._form = form; // Set form
    this._inputElements = [
      ...this._form.querySelectorAll(config.inputSelector), // Get all inputElements from passed-in form
    ];
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    ); // Get submit button from passed-in form
  }

  enableValidation() {
    // Public Method that will be called
    console.log("Checking...");
    this._form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent Page Reload
    });
    this._setEventListeners(); // Call this method to begin checking validity of inputs
    this._toggleButtonState(); // Set button state from beginning
  }

  _setEventListeners() {
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._handleInputEvent(inputEl); // Pass inputEl to handleInputEvent
      });
    });
  }

  // Method to Check Changes to input fields and Call checkValidity
  _handleInputEvent(inputEl) {
    this._checkInputValidity(inputEl); // Check validity of inputEl
    this._toggleButtonState();
  }

  // Method to Check if inputs are valid
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl); // Show inputEl error
    } else {
      this._hideInputError(inputEl); // Hide inputEl error
    }
  }

  // Method to show Input error
  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._config.errorClass);
  }

  // Method to Hide Input Error
  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._config.errorClass);
  }

  // Method to Change Button State
  _toggleButtonState() {
    const isFormValid = this._inputElements.every(
      (input) => input.validity.valid
    );
    if (!isFormValid) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
}
