export default class userInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
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
}
