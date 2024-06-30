export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
    console.log("Container:", containerSelector);
  }

  renderItems() {
    //method of render items to page
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    //method to add one item
    this._containerSelector.prepend(element);
  }
}
