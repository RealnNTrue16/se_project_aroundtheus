export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    } else {
      return res.json();
    }
  }

  //methods
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
      },
    }).then((res) => {
      this.checkResponse(res);
    });
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
      },
    }).then((res) => {
      this.checkResponse(res);
    });
  }

  getUserAndCards() {
    //called to get all info to display on page
    return Promise.all([
      this.getUserInfo(),
      this.getInitialCards(),
      this.updateProfilePic(),
    ]) //return Promise array of method calls
      .then(([userInfo, cards]) => {
        /* console.log("Getting User and Card Data..."); */
        console.log([userInfo, cards]);
        return { userInfo, cards }; //return object containing userInfo and Card Data
      })
      .catch((err) => {
        console.error(`getUserAndCards Method Error: ${err}`);
      });
  }

  updateProfilePic(link) {
    if (!link) {
      //in case page loaded with no link
      return; //exit function
    }
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }
    ).then((res) => {
      this.checkResponse(res);
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
    }).then((res) => {
      this.checkResponse(res);
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
        //stringify json obj
        name: name,
        link: link,
      }),
    }).then((res) => {
      this.checkResponse(res);
    });
  }

  //method to delete card from server
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
    ).then((res) => {
      this.checkResponse(res);
    });
  }

  cardLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
        },
      }
    ).then((res) => {
      this.checkResponse(res);
    });
  }

  cardUnlike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "4792ec92-cf1c-45a6-8740-0f5d63585faa",
        },
      }
    ).then((res) => {
      this.checkResponse(res);
    });
  }
}
