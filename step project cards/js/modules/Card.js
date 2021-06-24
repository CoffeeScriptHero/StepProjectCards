import API from "../API.js";
const token = "22122e2a-589e-4800-b96c-0b33b81f1a02";

export default class Card {
  constructor(cardInfo) {
    this.cardInfo = cardInfo;
  }

  renderCard(card) {
    document.querySelector(".cards_container").append(card);
  }

  createCard() {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#card-template").cloneNode(true);
    let card = template.content.childNodes[1];

    fragment.append(this.getBasicInfo(card));

    this.renderCard(fragment);

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

    card.querySelector(
      ".card-name"
    ).textContent = `Пациент: ${this.cardInfo.name}`;

    card.querySelector(
      ".card-doctor"
    ).textContent = `Доктор: ${doctor.textContent.toLowerCase()}`;

    return card;
  }

  getHideInfo(card) {
    const cardContent = card.querySelector(".card-visit-content");
    console.log(this.cardInfo);
    const desc = document.createElement("p");
    const shortDesc = document.createElement("p");
    const urgency = document.createElement("p");
    desc.classList.add("card-text", "card-desc", "hidden", "card-additional");
    desc.textContent = `Цель визита: ${this.cardInfo.desc}`;
    shortDesc.classList.add(
      "card-text",
      "card-short-desc",
      "hidden",
      "card-additional"
    );
    shortDesc.textContent = `Краткое описание визита: ${this.cardInfo.shortDesc}`;
    urgency.classList.add(
      "card-text",
      "card-urgency",
      "hidden",
      "card-additional"
    );
    urgency.textContent = `Срочность визита: ${this.cardInfo.urgency}`;
    cardContent.append(desc, shortDesc, urgency);
    if (this.cardInfo.comments) {
      const comments = document.createElement("p");
      comments.classList.add(
        "card-text",
        "card-comments",
        "hidden",
        "card-additional"
      );
      comments.textContent = `Доп. комментарии: ${this.cardInfo.comments}`;
      cardContent.append(comments);
    }
    switch (this.cardInfo.doctor) {
      case "cardiologist":
        const bp = document.createElement("p");
        const weight = document.createElement("p");
        const diseases = document.createElement("p");
        const cardioDate = document.createElement("p");
        bp.classList.add("card-text", "card-bp", "hidden", "card-additional");
        bp.textContent = `Обычное давление: ${this.cardInfo.bp}`;
        weight.classList.add(
          "card-text",
          "card-weight",
          "hidden",
          "card-additional"
        );
        weight.textContent = `Индекс массы тела: ${this.cardInfo.weight}`;
        diseases.classList.add(
          "card-text",
          "card-diseases",
          "hidden",
          "card-additional"
        );
        diseases.textContent = `Перенесенные заболевания сердца: ${this.cardInfo.diseases}`;
        cardioDate.classList.add(
          "card-text",
          "card-cardio-date",
          "hidden",
          "card-additional"
        );
        cardioDate.textContent = `Дата рождения: ${this.cardInfo.cardioDate}`;
        cardContent.append(bp, weight, diseases, cardioDate);
        this.listenShowMore(card);
        break;
      case "therapist":
        const therapyDate = document.createElement("p");
        therapyDate.classList.add(
          "card-text",
          "card-therapy-date",
          "hidden",
          "card-additional"
        );
        therapyDate.textContent = `Дата рождения: ${this.cardInfo.therapyDate}`;
        cardContent.append(therapyDate);
        this.listenShowMore(card);
        break;
      case "dentist":
        const lastVisit = document.createElement("p");
        lastVisit.classList.add(
          "card-text",
          "card-last-visit",
          "hidden",
          "card-additional"
        );
        lastVisit.textContent = `Последний визит: ${this.cardInfo.lastVisit}`;
        cardContent.append(lastVisit);
        this.listenShowMore(card);
        break;
    }
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
      .querySelector(".card-btn--show-more")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("clicked")) {
          event.target.classList.remove("clicked");
          card.querySelectorAll(".card-additional").forEach((elem) => {
            elem.classList.add("hidden");
          });
          card.style = "max-height: 212px";
          return;
        }
        card.style = "max-height: 700px";
        event.target.classList.add("clicked");
        card.querySelectorAll(".card-additional").forEach((elem) => {
          elem.classList.remove("hidden");
        });
      });
  }
}
