import Popup from "./popup";

export default class popupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector }); //call parent constructor
    this._popupImage = this._popupElement.querySelector(".card__image");
    this._popupImageText = this._popupElement.querySelector(".card__title");
  }

  open({ name, link }) {
    //set image src
    this._popupImage.src = link;
    this._popupImageText.textContent = name;
    this._popupImage.alt = name;
    //setimage text
    super.open();
  }
}
