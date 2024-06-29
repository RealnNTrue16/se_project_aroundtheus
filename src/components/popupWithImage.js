import Popup from "./popup";

//This class handles preview modal functionality
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector }); //call parent constructor for access to popupSelector
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupImageText = this._popupElement.querySelector(
      ".modal__image_heading"
    );
  }

  openPopup({ name, link }) {
    //set image src
    console.log("Preview Class Working");
    this._popupImage.src = link;
    this._popupImageText.textContent = name; //set image text
    this._popupImage.alt = name; //set image alt
    super.openPopup();
  }
}
