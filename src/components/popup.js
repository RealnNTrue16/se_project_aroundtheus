export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupElement.classList.add("modal_open");
    document.querySelector("keydown", () => {
      this._handleEscClose;
    });
  }

  closePopup() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.closePopup();
    });

    this._popupElement.addEventListener("keydown", (evt) => {
      if (evt.target === this._popupElement) {
        this.closePopup();
      }
    });
  }

  _handleEscClose() {
    document.addEventListener("keydown", () => {
      if (evt.key === "Escape") {
        const openedModal = document.querySelector("modal_open");
        if (openedModal) {
          this.closePopup();
        }
      }
    });
  }
}
