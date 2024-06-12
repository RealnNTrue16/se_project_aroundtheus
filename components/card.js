//Classes
export default class Card {
  constructor(data, cardSelector, handleOverlayClick) {
    this._name = data.name; //set card name
    this._link = data.link; //set card image
    this._cardSelector = cardSelector; //set
    this._handleOverlayClick = handleOverlayClick;
  }

  //methods
  //Method to get card template
  viewCards() {
    //get the card template
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    this._cardElement = cardTemplate;

    this._createCard();

    //call set event listeners
    this._setEventListeners();
    //return card
    return this._cardElement;
  }

  //method to create card
  _createCard() {
    const cardImageElement = this._cardElement.querySelector(".card__image"); //get image
    const cardTitleElement = this._cardElement.querySelector(".card__title"); //get title

    //set card values
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    cardTitleElement.textContent = this._name;
    console.log(cardTitleElement);
  }

  _setEventListeners() {
    //get card like button
    const likeButton = this._cardElement.querySelector(".card__like-button"); //get card like button
    likeButton.addEventListener("click", () => {
      //set listener
      this._handleCardLike();
    });
    //get card delete button
    const deleteButton = this._cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
  }

  //method to handle card like
  _handleCardLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
    console.log("Liked!");
  }

  //method to handle card deletion
  _handleCardDelete() {
    this._cardElement.remove();
    console.log("DELETED!");
  }
}
