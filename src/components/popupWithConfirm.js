import Popup from "./popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._confirmBtn = this._popupElement.querySelector(".modal__button");
  }

  setEventListeners() {
    //modify to work with modals without inputs
    super.setEventListeners();
    this._confirmBtn.addEventListener("click", (evt) => {
      evt.preventDefault(); //prevent page refresh
      this._handleFormSubmit(this); //call handleFormSubmit
      this.closePopup();
    });
  }
}
