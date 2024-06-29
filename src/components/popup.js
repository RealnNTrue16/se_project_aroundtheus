export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openPopup() {
    console.log("opening");
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    //handle closing modal  by clicking close button
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      console.log("Closed with Close button");
      this.closePopup();
    });
    //handles closing by clicking overlay
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        console.log("Closed By Overlay Click");
        this.closePopup();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log("ESC");
      this.closePopup();
    }
  }
}
