export default class userInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  } //returns obj with info entered by user

  setUserInfo({ name, job }) {
    //expects obj and sets fields with retrieved info
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar(link) {
    /*     debugger; */
    this._avatar.src = link;
  }
}
