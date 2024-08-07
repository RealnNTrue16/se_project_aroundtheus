//Class creates card
export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleCardLike
  ) {
    this._name = data.name; //set card name
    this._link = data.link; //set card image
    this.id = data._id; //set card id
    this.like = data.isLiked; //set card like status
    this._cardSelector = cardSelector; //set card template selector
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  //methods
  //Method to get card template
  viewCard() {
    //get the card template
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    this._cardElement = cardTemplate;

    this._createCard(); //call this._createCard() to create card

    //call set event listeners
    this._setEventListeners();

    //return card
    console.log(this._cardElement);
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

    this._updateLikeStatus(); //call this to update like status
  }

  _setEventListeners() {
    //get card like button
    const likeButton = this._cardElement.querySelector(".card__like-button"); //get card like button
    likeButton.addEventListener("click", () => {
      //set listener
      this._handleCardLike(this);
    });
    //get card delete button
    const deleteButton = this._cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this); //call the passed in function on 'this'
    });
    //overlay listener
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  //method to handle card like and unlike in DOM
  _updateLikeStatus() {
    if (this.like) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
      console.log("Liked!");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  //method to handle card deletion from DOM
  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLike(Liked) {
    this.like = Liked;
    this._updateLikeStatus();
  }
}
