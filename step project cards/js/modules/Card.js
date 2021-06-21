import API from "../API.js";
const token = "22122e2a-589e-4800-b96c-0b33b81f1a02";

export default class Card {
  constructor(cardInfo) {
    this.cardInfo = cardInfo;
  }
  createCard() {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#card-template").cloneNode(true);
    let card = template.content.childNodes[1];

    fragment.append(this.getBasicInfo(card));

    document.querySelector(".cards_container").append(fragment);

    this.listenDelete(
      document.querySelector(".card:last-child"),
      this.cardInfo.id
    );
  }
  checkTitle() {
    if (document.querySelector(".card")) {
      return;
    } else {
      this.cardsTitleShow();
    }
  }
  cardsTitleShow() {
    document.querySelector(".no_items").classList.remove("hidden");
  }
  getBasicInfo(card) {
    const doctor = document.querySelector(
      `#doctorOption[value = "${this.cardInfo.doctor}"]`
    );

    card.querySelector(
      ".card-name"
    ).textContent = `Пациент: ${this.cardInfo.name}`;

    card.querySelector(
      ".card-doctor"
    ).textContent = `Доктор: ${doctor.textContent.toLowerCase()}`;

    return card;
  }
  listenDelete(card, cardId) {
    card.querySelector(".card-btn-close").addEventListener("click", () => {
      if (API.deleteRequest(cardId, token)) {
        card.remove();
      }
      this.checkTitle();
    });
  }
}
