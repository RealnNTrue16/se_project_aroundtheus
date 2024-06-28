export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
    console.log("Closing Using popup class");
  }

  setEventListeners() {
    //handle closing modal  by clicking close button
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.closePopup();
    });
    //handles closing by clicking overlay
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.closePopup();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
}
