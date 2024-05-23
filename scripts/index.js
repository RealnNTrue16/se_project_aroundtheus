//Create An array of objects

const initialCards = [
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
console.log(profileModalOverlay);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListElement = document.querySelector(".cards__list");

//Add Card Modal
const addCardModal = document.querySelector("#card__add-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardModal.querySelector("#card__title-input");
const cardURLInput = addCardModal.querySelector("#card__description-input");
//End Add Card Modal Vars

//Modal Overlay
const addCardModalOverlay = document.querySelector("#card__add-modal");
console.log(addCardModalOverlay);

//Preview Image Modal
const previewImageModal = document.querySelector("#preview__modal");
const previewImageModalCloseButton =
  previewImageModal.querySelector(".modal__close");

const previewImageModalOverlay = document.querySelector("#preview__modal");

//FUNCTIONS

function handleOverlayClick(evt) {
  console.log(evt);
  if (evt.target.classList.contains("modal")) {
    //If target object has class 'modal'
    handleModalClose(evt.target); //Call modal close function on target object
  }
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
  // console.log("Works!");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleModalClose(profileModal);
}

function handleAddCardFormSubmit(evnt) {
  evnt.preventDefault();
  // console.log("Works!");
  const name = cardTitleInput.value;
  const alt = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link, alt });

  // Clear Inputs
  cardTitleInput.value = "";
  cardURLInput.value = "";
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
  const cardElement = cardTemplate.cloneNode(true);

  //access card title and image and store them in variables
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  //find delete button
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //Add Like Button Feature While cards are Rendered
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //cardImage click listener
  cardImageElement.addEventListener("click", () => {
    const modalImage = previewImageModal.querySelector(".modal__image");
    const modalImageHeading = previewImageModal.querySelector(
      ".modal__image_heading"
    );
    modalImage.src = cardData.link;
    modalImageHeading.textContent = cardData.name;
    modalImage.alt = cardData.name;

    //console.log(modalImage);
    openModal(previewImageModal);
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

//Profile Modal CLose Functions
profileModalCloseButton.addEventListener("click", () =>
  handleModalClose(profileModal)
);
profileModal.addEventListener("click", handleOverlayClick);

profileEditForm.addEventListener("submit", handleProfileModalSubmit);

//Add New Card Modal
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () => {
  handleModalClose(addCardModal);
});
addCardModal.addEventListener("click", handleOverlayClick);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//Close preview Modal
previewImageModalCloseButton.addEventListener("click", () => {
  handleModalClose(previewImageModal);
});
previewImageModal.addEventListener("click", handleOverlayClick);

///////////

//Iterate thru initialCards Object using 'forEach' or a for loop
initialCards.forEach((cardData) => {
  renderCard(cardData);
});
