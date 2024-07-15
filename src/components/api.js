export default class Api {
  constructor(options) {}

  //methods
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
      },
    })
      .then((res) => {
        if (res.ok) {
          //check for successful response
          console.log(res.ok);
          return res.json();
        }
        //check for unsuccessful response
        console.log("Error");
        return Promise.reject(`getInitialCards method Error: ${res.status}`);
      }) //process errors
      .catch((err) => console.error(err));
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res); //console log response for debugging
          return res.json(); //then return parsed response
        }
        //check for unsuccessful response
        console.log("Error");
        return Promise.reject(`getUserInfo method Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  getUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]) //return Promise array of method calls
      .then(([userInfo, cards]) => {
        console.log("Getting All Data...");
        console.log([userInfo, cards]);
        return { userInfo, cards }; //return object containing userInfo and Card Data
      })
      .catch((err) => {
        console.error(`getUserAndCards Method Error: ${err}`);
      });
  }

  updateUserInfo(name, about) {
    //pass in name and about
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      //make request to update server
      method: "PATCH",
      headers: {
        authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        //stringify object containing user data
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        console.log("ERROR");
        return Promise.reject(`Promise Rejected: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //method to send a new card to the server
  createNewCard(name, link) {
    //pass in name and link
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json(); //return response obj as json data
        }
        //if unsuccessful
        console.log("ERROR");
        return Promise.reject(`Promise Rejected: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`, //fill cardID in with parameter
      {
        method: "DELETE",
        headers: {
          authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Deleting card");
          return res.json();
        }

        console.log("Trouble deleting card");
        return Promise.reject(`Card Deletion Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
