import API from "../API.js";
import VisitChange from "./VisitChange.js";

const token = "22122e2a-589e-4800-b96c-0b33b81f1a02";

export default class Card {
  constructor(cardInfo) {
    this.cardInfo = cardInfo;
  }

  renderCard(card) {
    document.querySelector(".cards_container").append(card);
  }

  createCard() {
    const template = document
      .querySelector("#card-template")
      .content.cloneNode(true);

    let card = template.childNodes[1];
    this.renderCard(this.getBasicInfo(card));

    this.listenDelete(
      document.querySelector(".card:last-child"),
      this.cardInfo.id
    );

    this.getHideInfo(document.querySelector(".card:last-child"));
  }

  checkTitle() {
    if (document.querySelector(".card")) {
      return;
    } else {
      this.cardsTitleShow();
    }
  }

  async receiveCards() {
    const response = await API.getRequest(token);
    if (response.length !== 0) {
      document.querySelector(".no_items").classList.add("hidden");
      response.forEach((card) => {
        const localCard = new Card(card);
        localCard.createCard();
      });
    }
  }

  cardsTitleShow() {
    document.querySelector(".no_items").classList.remove("hidden");
  }

  getBasicInfo(card) {
    const doctor = document.querySelector(
      `#doctorOption[value = "${this.cardInfo.doctor}"]`
    );
    card.querySelector(".name").textContent = `Пациент: ${this.cardInfo.name}`;

    card.querySelector(
      ".doctor"
    ).textContent = `Доктор: ${doctor.textContent.toLowerCase()}`;

    return card;
  }

  getHideInfo(card) {
    const defaultTemplate = document
      .querySelector(`#default-template`)
      .content.cloneNode(true);

    defaultTemplate.querySelectorAll(".card-text").forEach((formElem) => {
      formElem.textContent += `${this.cardInfo[formElem.classList[1]]}`;
    });

    if (this.cardInfo.comments) {
      const comments = document.createElement("p");
      comments.classList.add("card-text", "comments");
      comments.textContent = `Доп. комментарии: ${this.cardInfo.comments}`;
      defaultTemplate.querySelector(".default-additional").append(comments);
    }

    const cardContent = card.querySelector(".card-visit-content");

    card.setAttribute(`id`, `${this.cardInfo.id}`);

    cardContent.append(defaultTemplate.querySelector(".default-additional"));

    const additionalWrap = document
      .querySelector(`#${this.cardInfo.doctor}-template`)
      .content.cloneNode(true);

    additionalWrap.querySelectorAll(".card-text").forEach((formElem) => {
      formElem.textContent += `${this.cardInfo[formElem.classList[1]]}`;
    });

    cardContent.append(additionalWrap.querySelector(".card-additional"));

    this.listenShowMore(card);
    this.listenChangeCard(card);
  }

  listenDelete(card, cardId) {
    card.querySelector(".card-btn-close").addEventListener("click", () => {
      card.remove();
      API.deleteRequest(cardId, token);
      this.checkTitle();
    });
  }

  listenShowMore(card) {
    card
      .querySelector(".card-btn_show-more")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("clicked")) {
          event.target.classList.remove("clicked");
          card.querySelectorAll(".card-additional").forEach((wrapper) => {
            wrapper.classList.add("hidden");
          });
          card.style = "max-height: 211px";
          return;
        }
        card.style = "max-height: 700px";
        event.target.classList.add("clicked");
        card.querySelectorAll(".card-additional").forEach((wrapper) => {
          wrapper.classList.remove("hidden");
        });
      });
  }

  listenChangeCard(card) {
    card.querySelector(".card-btn_change").addEventListener("click", () => {
      const modalChange = new VisitChange(card, this.cardInfo);
      modalChange.createModalFields();
    });
  }
}
