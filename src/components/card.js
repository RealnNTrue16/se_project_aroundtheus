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
    this._id = data._id; //set card id
    this._like = data.isLiked; //set card like status
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
  }

  _setEventListeners() {
    //get card like button
    const likeButton = this._cardElement.querySelector(".card__like-button"); //get card like button
    likeButton.addEventListener("click", () => {
      //set listener
      this._handleCardLike(this);
      /*  console.log(this._like); */
    });
    //get card delete button
    const deleteButton = this._cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
      /* this._handleCardDelete(); */
    });
    //overlay listener
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  /*   _update() {
    this._like = !this._like;
    this._handleCardLike();
    this._update(this._id, this._like);
  } */

  //method to handle card like and unlike in DOM
  _updateLikeStatus() {
    /* this._like = !this._like; //toggle like status */
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._like) {
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
  _handleCardDelete() {
    this._cardElement.remove();
    /* console.log("DELETED!"); */
  }

  updateLike(Liked) {
    this._like = Liked;
    this._updateLikeStatus();
  }
}
