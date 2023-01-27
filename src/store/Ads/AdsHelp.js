export default class Ad {
  constructor(title, description, uid, key = "", src = "", promo = false) {
    this.title = title;
    this.description = description;
    this.uid = uid;
    this.key = key;
    this.src = src;
    this.promo = promo;
  }
}
