export default class Ad {
  constructor(title, description, uid, src = "", promo = false) {
    this.title = title;
    this.description = description;
    this.uid = uid;
    this.src = src;
    this.promo = promo;
  }
}
