import API from "../API.js";
import Card from "./Card.js";

const token = "22122e2a-589e-4800-b96c-0b33b81f1a02";

export default class ModalVisit {
  constructor(modal = document.getElementById("modal-visit")) {
    this.modal = modal;
    this.select = this.modal.querySelector("#doctor");
    this.defaultWrapper = this.modal.querySelector(".default-wrapper");
  }
  listenChanges() {
    this.select.addEventListener("change", (event) => {
      if (event.target.value !== "") {
        this.hideFields();
        this.showFields(event);
        return;
      }
      this.hideFields();
    });
  }
  showFields(event) {
    const _this = this.modal.querySelector(`#${event.target.value}-wrapper`);
    _this.classList.remove("hidden");
    _this.querySelectorAll(".form-control").forEach((formElem) => {
      formElem.required = true;
      formElem.value = "";
    });
  }

  hideFields() {
    this.modal.querySelectorAll(".visit-wrapper").forEach((wrapper) => {
      if (
        !wrapper.classList.contains("hidden") &&
        !wrapper.classList.contains("default-wrapper")
      ) {
        wrapper.classList.add("hidden");
        wrapper.querySelectorAll(".form-control").forEach((formElem) => {
          formElem.required = false;
          formElem.value = "";
        });
      }
    });
  }
  setByDefault() {
    this.defaultWrapper
      .querySelectorAll(".form-control")
      .forEach((formElem) => {
        formElem.value = "";
      });
  }
  async sendInfo() {
    const data = new Map();
    let counter = 0;
    this.modal.querySelectorAll("[required], #comments").forEach((formElem) => {
      counter++;
      if (formElem.value !== "") {
        data.set(formElem.id, formElem.value);
      }
    });
    if (
      data.size === counter ||
      (counter - data.size === 1 &&
        this.modal.querySelector("#comments").value === "")
    ) {
      const requestAnswer = await API.postRequest(
        Object.fromEntries(data),
        API.URL,
        token
      );
      const card = new Card(requestAnswer);
      card.createCard();
      document.querySelector(".no_items").classList.add("hidden");
      document.querySelector("#visit-header-close").click();
      this.hideFields();
      this.setByDefault();
    }
  }
}
