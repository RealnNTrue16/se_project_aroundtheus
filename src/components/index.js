//Imports
import "../pages/index.css";
import { initialCards, config } from "../utils/constants.js";
import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import userInfo from "./userInfo.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";

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

//////////////////////////////////////////////////// CLASSES  /////////////////////////////////////////////////////////////////
//Instantiate Section Class
const section = new Section(
  { item: initialCards, renderer: renderCardClass },
  "#cards__list"
);
////Instantiate UserInfo
const user = new userInfo({
  name: ".profile__title",
  job: ".profile__description",
});
////
//Instantiate popupWithForm for Profile
const profilePopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileModalSubmit
);
profilePopup.setEventListeners();

//Instantiate popupWithForm for addCard
const newCardPopup = new PopupWithForm(
  "#card__add-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();
//////Preview Image popup class
const popupImage = new PopupWithImage("#preview__modal");
popupImage.setEventListeners();

//////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////

function handleImageClick(name, link) {
  popupImage.openPopup({ name, link });
}

function handleProfileModalSubmit(profileData) {
  console.log(profileData);
  const name = profileTitleInput.value; //set name var to work with userInfo class
  const job = profileDescriptionInput.value; //set job var to work with userInfo class
  user.setUserInfo({ name, job }); //set user information
  const updatedUserInfo = user.getUserInfo(); //get updated information and store in a var
  profileTitle.textContent = updatedUserInfo.name; //set name
  profileDescription.textContent = updatedUserInfo.job; //set job
  profilePopup.close(); //close popup
}

function handleAddCardFormSubmit() {
  const name = cardTitleInput.value; //set card name
  const alt = cardTitleInput.value; //set card alt text
  const link = cardURLInput.value; //set card image link
  renderCardClass({ name, link, alt }); //call renderCard to append card to page
  cardTitleInput.value = ""; //clear name input field after rendering
  cardURLInput.value = ""; //clear link input field after rendering
  newCardPopup.close(); //close popup
  addCardFormElement.reset(); //Reset Form fields
  addNewCardValidator.resetForm(); //reset form and disable submit button
}

function renderCardClass(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.viewCard();
  cardListElement.prepend(cardElement);
}

///////////////////////////////////////////// EVENT LISTENERS ///////////////////////////////////////////////////////

//////////////////////////////////////////// Profile Modal ////////////////////////////////////////////////////////////
profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo(); //get user info
  profileTitleInput.value = userInfo.name; //pre set name
  profileDescriptionInput.value = userInfo.job; //pre set job
  profilePopup.openPopup(); //open popup
});

// Profile Modal Close Functions
profileModalCloseButton.addEventListener("click", () => profilePopup.close());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Add New Card Modal //////////////////////////////////////////////////////
addNewCardButton.addEventListener("click", () => newCardPopup.openPopup());
addCardModalCloseButton.addEventListener("click", () => newCardPopup.close());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// PREVIEW MODAL /////////////////////////////////////////////////////////

////////////////////////////////////////////// RENDERING //////////////////////////////////////////////////

//Render All Cards using Section Class
section.renderItems(); //call renderItems of section class to render cards

//render new card

/////////////////////////////////////////////// VALIDATION /////////////////////////////////////////////////////////////

//Profile Modal Validation
//New Instance of FormValidator Class
const profileValidator = new FormValidator(config, profileEditForm); //Pass in Profile Edit form to be validated and config classes
profileValidator.enableValidation(); //Call enableValidation

//AddNewCard Valdation
//New Instance of FormValidator Class
const addNewCardValidator = new FormValidator(config, addCardFormElement); //Pass in
addNewCardValidator.enableValidation();
/////////////////////
