export default class Section {
  constructor({ item, renderer }, selector) {
    this._item = item;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._selector.append(element);
  }
}
