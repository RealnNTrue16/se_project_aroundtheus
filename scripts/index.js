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

let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileTitleInput = document.querySelector("#profile__title-input");
let profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
let profileEditForm = profileModal.querySelector(".modal__form");

function handleClick() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileModal.classList.add("modal__open");
}

profileEditButton.addEventListener("click", handleClick);
// End Add Modal

//Close Modal
let modalCloseButton = document.querySelector("#modal__close-button");
//console.log(modalCloseButton);

let closeModal = document.querySelector("#profile__edit-modal");

function handleModalClose() {
  closeModal.classList.remove("modal__open");
}

modalCloseButton.addEventListener("click", handleModalClose);

function handleModalSubmit(evnt) {
  evnt.preventDefault();
  console.log("Works!");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleModalClose();
}

profileEditForm.addEventListener("submit", handleModalSubmit);
