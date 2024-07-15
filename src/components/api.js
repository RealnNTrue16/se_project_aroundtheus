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
    return Promise.all([this.getUserInfo(), this.getInitialCards()]) //return Prmoise array of method calls
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
}
