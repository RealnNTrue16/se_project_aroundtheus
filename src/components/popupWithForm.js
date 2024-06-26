import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal __form");
    this._handleFormSubmit = document.querySelector(handleFormSubmit);
  }

  close() {
    this._popupForm.reset(); //reset form fields
    super.closepopup(); //close popup by calling parent class close method
  }
}
