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
//Add Modal
//Declare Vars
let profileEditButton = document.querySelector("#profile__edit-button");
//console.log(profileEditButton);

let profileModal = document.querySelector("#profile__edit-modal");
//console.log(profileModal);

let modalCloseButton = document.querySelector("#modal__close-button");

let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileTitleInput = document.querySelector("#profile__title-input");
let profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
let profileEditForm = profileModal.querySelector(".modal__form");
let closeModal = document.querySelector("#profile__edit-modal");
let cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
let cardListElement = document.querySelector(".cards__list");

//FUNCTIONS
function openProfileModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileModal.classList.add("modal_open");
}

function handleModalSubmit(evnt) {
  evnt.preventDefault();
  console.log("Works!");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleModalClose();
}

function handleModalClose() {
  closeModal.classList.remove("modal_open");
}

function getCardElement(cardData) {
  // 'card data' is an argument for InitialCards obj
  //Clone the template and store it in a card element
  let cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  //access card title and image and store them in variables
  let cardImageElement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__title");

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
profileEditButton.addEventListener("click", openProfileModal);

modalCloseButton.addEventListener("click", handleModalClose);

profileEditForm.addEventListener("submit", handleModalSubmit);

//Iterate thru initialCards Object using 'forEach' or a for loop
initialCards.forEach((cardData) => {
  let cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
