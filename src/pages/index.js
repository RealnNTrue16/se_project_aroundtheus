//Imports
import "../pages/index.css";
import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/api.js";
import PopupWithConfirm from "../components/popupWithConfirm.js";

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
const profileModalSubmitButton = profileModal.querySelector(".modal__button");

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
const addNewCardSubmitButton = addCardModal.querySelector(".modal__button");

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

//Avatar Modal
const avatarModal = document.querySelector("#avatar__modal");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarModalCloseButton = avatarModal.querySelector(".modal__close");
const avatarModalSubmitButton = avatarModal.querySelector(".modal__button");

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
  avatar: ".profile__image",
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

const avatarPopup = new PopupWithForm("#avatar__modal", handleAvatarUpdate);
avatarPopup.setEventListeners();

const deleteConfirm = new PopupWithConfirm("#delete__modal");
deleteConfirm.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
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
  profileModalSubmitButton.textContent = "Saving...";

  api
    .updateUserInfo(profileData.title, profileData.description)
    .then(() => {
      user.setUserInfo({ name, job }); //set user information
      /*   const updatedUserInfo = user.getUserInfo(); */ //get updated information and store in a var
      profilePopup.closePopup(); //close popup
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileModalSubmitButton.textContent = "Save";
    });
  /*  console.log(updatedUserInfo); */ // debug log
}

function handleAvatarUpdate(link) {
  const url = link.url; //extract url from link object and set it to url value
  console.log(url);
  avatarModalSubmitButton.textContent = "Saving...";

  api
    .updateProfilePic(url)
    .then(() => {
      user.setUserAvatar(url);
      avatarPopup.closePopup();
    })
    .catch((err) => {
      console.error(`Error caught in HandleAvatarUpdate function ${err}`);
    })
    .finally(() => {
      avatarModalSubmitButton.disabled = true; //disable button after successful api call
      avatarModalSubmitButton.classList.add("modal__popup__button_disabled"); //add disabled class
      avatarModalSubmitButton.textContent = "Save";
    });
}

function handleAddCardFormSubmit(newCardData) {
  addNewCardSubmitButton.textContent = "Adding...";
  api
    .createNewCard(newCardData.title, newCardData.url)
    .then((res) => {
      /* console.log(res); */
      renderCard(res);
      newCardPopup.closePopup(); //close popup
      addNewCardValidator.resetForm(); //reset form and disable submit button
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addNewCardSubmitButton.textContent = "Add";
    });
}

function handleCardLikes(cardData) {
  if (!cardData.like) {
    //if not liked
    console.log(cardData.like);
    api
      .cardLike(cardData.id)
      .then(() => {
        cardData.updateLike(true); //call card.js like method
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (cardData.like) {
    //if liked
    api
      .cardUnlike(cardData.id)
      .then(() => {
        cardData.updateLike(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteModalOpen(cardData) {
  deleteConfirm.handleFormSubmit(() => {
    //pass handleCardDelte to handleFormSubmit method to set event listeners independently
    handleCardDelete(cardData);
  });
  //open delete modal
  deleteConfirm.openPopup();
}

function handleCardDelete(cardData) {
  //pass in card data
  console.log(cardData);
  deleteModalButton.textContent = "Deleting...";
  api
    .deleteCard(cardData.id)
    .then(() => {
      cardData.removeCard(cardData.id); //call card.js delete
      deleteConfirm.closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      deleteModalButton.textContent = "Delete";
    });
}

function createCard(cardData) {
  //function to create new card
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteModalOpen,
    handleCardLikes
  ); //instantiate card class
  const cardElement = card.viewCard(); //call viewCard of card class to create
  return cardElement; //return card
}

function renderCard(cardData) {
  //function to render new card to page
  const cardElement = createCard(cardData); //create card;
  section.addItem(cardElement);
}

function handleAvatarModalOpen() {
  avatarPopup.openPopup();
}

function handleAvatarModalClose() {
  avatarPopup.closePopup();
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

avatarEditButton.addEventListener("click", () => handleAvatarModalOpen());

avatarModalSubmitButton.addEventListener("submit", (event) => {
  console.log(avatarModalSubmitButton);
  return handleAvatarUpdate();
});

///////////////////////////////////////////// Add New Card Modal //////////////////////////////////////////////////////
addNewCardButton.addEventListener("click", () => newCardPopup.openPopup());
/* console.log(addNewCardSubmitButton); */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// RENDERING //////////////////////////////////////////////////
//Get initial UserInfo and Cards

api
  .getUserAndCards()
  .then(({ userInfo, cards }) => {
    console.log({ userInfo, cards });
    user.setUserInfo({ name: userInfo.name, job: userInfo.about }); //render profile info
    user.setUserAvatar(userInfo.avatar); //render profile pic
    section.renderItems(cards); //render cards from server
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
//////////////////////////

//New Photo Validation
const avatarValidator = new FormValidator(config, avatarModal);
avatarValidator.enableValidation();
////////
