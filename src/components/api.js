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
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  getUserAndCards() {
    //called to get all info to display on page
    return Promise.all([this.getUserInfo(), this.getInitialCards()]) //return Promise array of method calls
      .then(([userInfo, cards]) => {
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
    debugger;
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      console.log(avatar);
      console.log(res);
      return this.checkResponse(res);
    });
  }

  updateUserInfo(name, about) {
    //pass in name and about
    return fetch(`${this._baseUrl}/users/me`, {
      //make request to update server
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        //stringify object containing user data
        name: name,
        about: about,
      }),
    }).then((res) => this.checkResponse(res));
  }

  //method to send a new card to the server
  createNewCard(name, link) {
    //pass in name and link
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        //stringify json obj
        name: name,
        link: link,
      }),
    }).then((res) => this.checkResponse(res));
  }

  //method to delete card from server
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  cardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  cardUnlike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }
}
