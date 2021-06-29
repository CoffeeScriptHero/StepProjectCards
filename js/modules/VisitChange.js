import API from "../API.js";

export default class VisitChange {
  constructor(card, cardInfo) {
    this.card = card;
    this.cardInfo = cardInfo;
    this.modal = document.querySelector("#modal-visit-change");
    this.modalBody = this.modal.querySelector(`.modal-body`);
  }

  listenSubmitBtn() {
    this.modal
      .querySelector("#visit-change-submit")
      .addEventListener("click", () => {
        this.saveInfo();
        this.modal.querySelector(".btn-close").click();
        this.card = null;
        this.cardInfo = null;
      });
  }

  createModalFields() {
    this.modalBody.innerHTML = "";
    const templateBody = document
      .querySelector(".default-wrapper")
      .cloneNode(true);

    templateBody.querySelector(".mb-3:first-child").remove();

    const templateWrapper = document
      .querySelector(`#${this.cardInfo.doctor}-wrapper`)
      .cloneNode(true);

    templateWrapper.classList.toggle("hidden");
    templateWrapper.classList.add("additional-wrapper");

    this.modalBody.append(templateBody, templateWrapper);
    this.deleteFieldsRequired();
    this.listenSubmitBtn();
  }
  deleteFieldsRequired() {
    this.modalBody.querySelectorAll(".form-control").forEach((formElem) => {
      formElem.required = false;
    });
  }
  saveInfo() {
    const fieldsData = new Map();

    this.modal.querySelectorAll(".form-control").forEach((formElem) => {
      let elem = this.card.querySelector(`.${formElem.id}`);
      if (formElem.id === "comments") {
        if (formElem.value === "") {
          return;
        }
        const comments = document.createElement("p");
        comments.classList.add("card-text", "comments");
        this.card.querySelector(".default-additional").append(comments);
        elem = this.card.querySelector(`.${formElem.id}`);
        elem.textContent = `Доп. комментарии: ${formElem.value}`;
      }
      const clipValue = elem.textContent.substring(
        elem.textContent.indexOf(":") + 1,
        elem.textContent.length
      );

      const clipElemName = elem.textContent.substring(
        0,
        elem.textContent.indexOf(":") + 1
      );

      if (formElem.value !== "") {
        fieldsData.set(formElem.id, formElem.value);
        elem.textContent = clipElemName;
        elem.textContent += " " + formElem.value;
      } else {
        fieldsData.set(formElem.id, clipValue);
      }
    });

    fieldsData.set(`doctor`, `${this.cardInfo.doctor}`);

    API.putRequest(Object.fromEntries(fieldsData), this.card.id);
  }
}
