export default class Ad {
  constructor(title, description, user_id, src = "", promo = false) {
    this.title = title;
    this.description = description;
    this.user_id = user_id;
    this.src = src;
    this.promo = promo;
  }
}
