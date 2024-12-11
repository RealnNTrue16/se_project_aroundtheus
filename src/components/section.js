export default class Section {
  constructor({ item, renderer }, container) {
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(container);
    console.log("Container:", container);
  }

  renderItems() {
    //method of render items to page
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    //method to add one item
    this._container.prepend(element);
  }
}
