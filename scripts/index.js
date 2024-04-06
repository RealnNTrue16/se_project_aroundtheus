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
let profileEditButton = document.querySelector("#profile__edit-button");
console.log(profileEditButton);

let profileModal = document.querySelector("#profile__edit-modal");
console.log(profileModal);

function handleClick() {
  profileModal.classList.add("modal__open");
}

profileEditButton.addEventListener("click", handleClick);
// End Add Modal

//Close Modal
let modalCloseButton = document.querySelector("#modal__close-button");
console.log(modalCloseButton);

let closeModal = document.querySelector("#profile__edit-modal");

function handleModalClose() {
  closeModal.classList.remove("modal__open");
}

modalCloseButton.addEventListener("click", handleModalClose);
