export default class userInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    const userObj = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
