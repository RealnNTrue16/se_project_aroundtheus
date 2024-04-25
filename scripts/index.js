//Create An array of objects

let initialCards = [
  //Obj 1
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
//Add Modals
//Declare Profile Modal Variables
let profileEditButton = document.querySelector("#profile__edit-button");
let profileModal = document.querySelector("#profile__edit-modal");
let profileModalCloseButton = profileModal.querySelector(".modal__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileTitleInput = document.querySelector("#profile__title-input");
let profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
let profileEditForm = profileModal.querySelector(".modal__form");

let cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
let cardListElement = document.querySelector(".cards__list");

//Add Card Modal
let addCardModal = document.querySelector("#card__add-modal");
let addNewCardButton = document.querySelector(".profile__add-button");
let addCardModalCloseButton = addCardModal.querySelector(".modal__close");
let addCardFormElement = addCardModal.querySelector(".modal__form");
let cardTitleInput = addCardModal.querySelector("#card__title-input");
let cardURLInput = addCardModal.querySelector("#card__description-input");
//End Add Card Modal Vars

//FUNCTIONS

function openModal(modal) {
  modal.classList.add("modal_open");
}

function handleModalSubmit(evnt) {
  evnt.preventDefault();
  // console.log("Works!");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleModalClose(profileModal);
}

function handleAddCardFormSubmit(evnt) {
  evnt.preventDefault();
  // console.log("Works!");
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardListElement);
  handleModalClose(addCardModal);
}

function handleModalClose(modal) {
  modal.classList.remove("modal_open");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}

function getCardElement(cardData) {
  // 'card data' is an argument for InitialCards obj
  //Clone the template and store it in a card element
  let cardElement = cardTemplate.cloneNode(true);

  //access card title and image and store them in variables
  let cardImageElement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__title");

  let likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //set the path to the image to the link field of the object
  cardImageElement.src = cardData.link;
  //set the image alt text
  cardImageElement.alt = cardData.name;

  //set card title to name of object (initialCards) field
  cardTitleElement.textContent = cardData.name;

  //return the ready HTML element with the filled in data
  return cardElement;
}

//EVENT LISTENERS
//Profile Modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

profileModalCloseButton.addEventListener("click", () =>
  handleModalClose(profileModal)
);
profileEditForm.addEventListener("submit", handleModalSubmit);

//Add New Card Modal
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  handleModalClose(addCardModal)
);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//Iterate thru initialCards Object using 'forEach' or a for loop
initialCards.forEach((cardData) => {
  renderCard(cardData, cardListElement);
});