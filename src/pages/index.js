//Imports
import "../pages/index.css";
import { initialCards, config } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo.js";
import Popup from "../components/popup.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithImage from "../components/popupWithImage.js";
import Api from "../components/api.js";

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

//Delete Modal
const deleteModal = document.querySelector("#delete__modal");
const deleteModalButton = deleteModal.querySelector(".modal__button");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close");

//////////////////////////////////////////////////// CLASSES  /////////////////////////////////////////////////////////////////
//Instantiate Section Class
const section = new Section(
  { item: initialCards, renderer: renderCard },
  ".cards__list"
);
////Instantiate UserInfo
const user = new UserInfo({
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

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
    "Content-type": "application/json",
  },
});

//////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////

function handleImageClick(name, link) {
  popupImage.openPopup({ name, link });
}

function handleProfileModalSubmit(profileData) {
  console.log("profileData:", profileData);
  const name = profileData.title; //set name var to work with userInfo class
  const job = profileData.description; //set job var to work with userInfo class
  console.log("name:", name, "job:", job); //debug log
  user.setUserInfo({ name, job }); //set user information
  api.updateUserInfo(profileData.title, profileData.description);
  const updatedUserInfo = user.getUserInfo(); //get updated information and store in a var
  console.log(updatedUserInfo); // debug log
  profilePopup.closePopup(); //close popup
}

function handleAddCardFormSubmit(newCardData) {
  api
    .createNewCard(newCardData.title, newCardData.url)
    .then((res) => {
      console.log(res);
      renderCard(res);
      newCardPopup.closePopup(); //close popup
      addNewCardValidator.resetForm(); //reset form and disable submit button
    })
    .catch((err) => {
      console.error(err);
    });
}

function openDeleteModal() {
  console.log("Delete Modal Opening");
  deleteModal.classList.add("modal_open");
}

function closeDeleteModal() {
  console.log("Closing Delete Modal");
  deleteModal.classList.remove("modal_open");
}

function handleCardDelete(cardData) {
  //pass in card data
  console.log(cardData);

  openDeleteModal(); //open delete modal
  //close button functionality
  deleteModalCloseButton.addEventListener("click", () => {
    closeDeleteModal();
  });

  console.log(cardData);

  deleteModalButton.addEventListener("click", () => {
    api
      .deleteCard(cardData._id)
      .then((card) => {
        console.log(card);
        cardData._handleCardDelete();
        /* card.remove(); */
        closeDeleteModal();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function createCard(cardData) {
  //function to create new card
  console.log(cardData._id);

  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleCardDelete
  ); //instantiate card class
  const cardElement = card.viewCard(); //call viewCard of card class to create
  return cardElement; //return card
}

function renderCard(cardData) {
  //function to render new card to page
  console.log(cardData);
  const cardElement = createCard(cardData); //create card;
  section.addItem(cardElement);
}

///////////////////////////////////////////// EVENT LISTENERS ///////////////////////////////////////////////////////
/* cardDeleteButton.addEventListener("click", () => {
  console.log("Delete");
}); */

//////////////////////////////////////////// Profile Modal ////////////////////////////////////////////////////////////
profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo(); //get user info
  profileTitleInput.value = userInfo.name; //pre set name
  profileDescriptionInput.value = userInfo.job; //pre set job
  profilePopup.openPopup(); //open popup
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Add New Card Modal //////////////////////////////////////////////////////
addNewCardButton.addEventListener("click", () => newCardPopup.openPopup());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// RENDERING //////////////////////////////////////////////////
//Get initial UserInfo and Cards
api
  .getUserAndCards()
  .then(({ userInfo, cards }) => {
    // console.log({ userInfo, cards });
    user.setUserInfo({ name: userInfo.name, job: userInfo.about });
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

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
