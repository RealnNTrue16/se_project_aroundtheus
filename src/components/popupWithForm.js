import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formInputs = [
      ...this._popupForm.querySelectorAll(".modal__form-input"),
    ];
    const inputsObj = {}; //create empty object
    formInputs.forEach((inputEl) => {
      //forEach inputEl
      inputsObj[inputEl.name] = inputEl.value; //use array brackets to set inputEl name and value inside object
    });
    return inputsObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); //prevent page refresh
      this._handleFormSubmit(this._getInputValues()); //call handleFormSubmit
    });
  }

  close() {
    this._popupForm.reset(); //reset form fields
    super.closePopup(); //close popup by calling parent class close method
  }
}
