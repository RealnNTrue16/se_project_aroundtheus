//Imports
import "../pages/index.css";
import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import userInfo from "./userInfo.js";
import popupWithForm from "./popupWithForm.js";
import popupWithImage from "./popupWithImage.js";

//Config settings
const config = {
  formSelector: ".modal__popup__form", // Updated
  inputSelector: ".modal__popup__input", // Updated
  submitButtonSelector: ".modal__popup__button", // Updated
  inactiveButtonClass: "modal__popup__button_disabled", // Updated
  inputErrorClass: "modal__popup__input_type_error", // Updated
  errorClass: "modal__popup__error_visible", // Updated
};

// Create an array of objects
const initialCards = [
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

// Add Modals
// Declare Profile Modal Variables
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModal = document.querySelector("#profile__edit-modal");
const profileModalCloseButton = profileModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile__title-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
const profileEditForm = profileModal.querySelector(".modal__form");
const profileModalOverlay = document.querySelector("#profile__edit-modal");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListElement = document.querySelector(".cards__list");

// Add Card Modal
const addCardModal = document.querySelector("#card__add-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardModal.querySelector("#card__title-input");
const cardURLInput = addCardModal.querySelector("#card__description-input");

// Modal Overlay
const addCardModalOverlay = document.querySelector("#card__add-modal");

// Preview Image Modal
const previewImageModal = document.querySelector("#preview__modal");
const previewImageModalCloseButton =
  previewImageModal.querySelector(".modal__close");
const previewImageModalOverlay = document.querySelector("#preview__modal");

// FUNCTIONS
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    handleModalClose(evt.target);
  }
}

function handleImageClick(name, link) {
  const modalImage = previewImageModal.querySelector(".modal__image");
  const modalImageHeading = previewImageModal.querySelector(
    ".modal__image_heading"
  );
  modalImage.src = link;
  modalImage.alt = name;
  modalImageHeading.textContent = name;
  openModal(previewImageModal);
}

function handleEscKeyClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    if (openModal) {
      handleModalClose(openModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleEscKeyClose);
}

function handleProfileModalSubmit(evnt) {
  evnt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleModalClose(profileModal);
}

function handleAddCardFormSubmit(evnt) {
  evnt.preventDefault();
  const name = cardTitleInput.value;
  const alt = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCardClass({ name, link, alt });
  cardTitleInput.value = "";
  cardURLInput.value = "";
  addCardFormElement.reset(); //Reset Form fields
  addNewCardValidator.resetForm(); //reset form and disable submit button
  handleModalClose(addCardModal);
}

function handleModalClose(modal) {
  modal.classList.remove("modal_open");
  //Keydown removed
  document.removeEventListener("keydown", handleEscKeyClose);
}

function renderCardClass(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.viewCard();
  cardListElement.prepend(cardElement);
}
/* 
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  //Delete Button

  ////////////////////////////////
  cardImageElement.addEventListener("click", () => {
    const modalImage = previewImageModal.querySelector(".modal__image");
    const modalImageHeading = previewImageModal.querySelector(
      ".modal__image_heading"
    );
    modalImage.src = cardData.link;
    modalImageHeading.textContent = cardData.name;
    modalImage.alt = cardData.name;
    openModal(previewImageModal);
  });
  ///////////////////////////
  cardImageElement.src = cardData.link; //
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}
 */
// EVENT LISTENERS

// Profile Modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

// Profile Modal Close Functions
profileModalCloseButton.addEventListener("click", () =>
  handleModalClose(profileModal)
);
profileModal.addEventListener("click", handleOverlayClick);
profileEditForm.addEventListener("submit", handleProfileModalSubmit);

//Profile Form Class
const profilePopup = new popupWithForm(
  "#profile__edit-modal",
  handleProfileModalSubmit
);
profilePopup.setEventListeners();

//UserInfo class
const user = new userInfo({
  name: ".profile__title",
  job: ".profile__description",
});
user.setUserInfo({
  name: profileTitleInput.value,
  job: profileDescriptionInput.value,
});

// Add New Card Modal
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  handleModalClose(addCardModal)
);
addCardModal.addEventListener("click", handleOverlayClick);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//New Card Class
const newCardPopup = new popupWithForm(
  "#card__add-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

//popupWithImage class
const popupImage = new popupWithImage("#preview__modal");

// Close Preview Modal
previewImageModalCloseButton.addEventListener("click", () =>
  handleModalClose(previewImageModal)
);
previewImageModal.addEventListener("click", handleOverlayClick);

// Render Initial Cards
initialCards.forEach((cardData) => {
  renderCardClass(cardData);
});

//Profile Modal Validation
//New Instance of FormValidator Class
const profileValidator = new FormValidator(config, profileEditForm); //Pass in Profile Edit form to be validated and config classes
profileValidator.enableValidation(); //Call enableValidation

//AddNewCard Valdation
//New Instance of FormValidator Class
const addNewCardValidator = new FormValidator(config, addCardFormElement); //Pass in
addNewCardValidator.enableValidation();
///////////////
