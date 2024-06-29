export default class Section {
  constructor({ item, renderer }, selector) {
    this._item = item;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    //method of render items to page
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    //method to add one item
    this._selector.append(element);
  }
}
