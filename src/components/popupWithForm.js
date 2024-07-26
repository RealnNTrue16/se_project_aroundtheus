import Popup from "./popup.js";
//handles profile and add card forms
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this._formInputs = [
      ...this._popupForm.querySelectorAll(".modal__form-input"), //collect all form inputs
    ];
  }

  _getInputValues() {
    const inputsObj = {}; //create empty object
    this._formInputs.forEach((inputEl) => {
      //forEach inputEl
      inputsObj[inputEl.name] = inputEl.value; //use array brackets to set inputEl name and value inside object
    });
    return inputsObj;
  }

  setEventListeners() {
    //modify to work with modals without inputs
    super.setEventListeners();
    //
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); //prevent page refresh
      this._handleFormSubmit(this._getInputValues()); //call handleFormSubmit
      this._popupForm.reset(); //reset after submission and not on close
    });
  }
}
