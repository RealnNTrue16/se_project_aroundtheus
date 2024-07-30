export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //methods
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
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
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          /* console.log(res);  */ //console log response for debugging
          return res.json(); //then return parsed response
        }
        //check for unsuccessful response
        console.log("Error");
        return Promise.reject(`getUserInfo method Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  getUserAndCards() {
    //called to get all info to display on page
    return Promise.all([
      this.getUserInfo(),
      this.getInitialCards(),
      this.updateProfilePic(),
    ]) //return Promise array of method calls
      .then(([userInfo, cards]) => {
        console.log("Getting User and Card Data...");
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
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          console.log("Profile Picture Updating");
          return res.json();
        }
        //if unsuccessful
        console.log("Can't update Profile Picture");
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateUserInfo(name, about) {
    //pass in name and about
    return fetch(`${this._baseUrl}/users/me`, {
      //make request to update server
      method: "PATCH",
      headers: this._headers,
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
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        //stringify json obj
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Card Added!");
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

  //method to delete card from server
  deleteCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`, //fill cardID in with parameter
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Deleting card");
          return res.json();
        }
        //if unsuccessful
        console.log("Trouble deleting card");
        return Promise.reject(`Card Deletion Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  cardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log("response ok: " + res.status);
          return res.json();
        }
        //if unsuccessful
        console.log("Unable to Like");
        return Promise.reject(`Like Error:  + ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cardUnlike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Unlike Status: ${res.status}`);
          return res.json(); //parse data
        }
        //if unsuccessful
        console.log("Unable To Unlike");
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        //process errors
        console.error(err);
      });
  }
}
