export default class Section {
  constructor({ item, renderer }, Modalselector) {
    this._item = item;
    this._renderer = renderer;
    this._Modalselector = document.querySelector(Modalselector);
  }

  renderItems() {
    //method of render items to page
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    //method to add one item
    this._Modalselector.prepend(element);
  }
}
