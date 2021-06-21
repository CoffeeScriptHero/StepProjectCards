import API from "../API.js";

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
  sendInfo() {
    const data = new Map();
    this.modal.querySelectorAll("[required], #comments").forEach((formElem) => {
      if (formElem.value !== "") {
        data.set(`${formElem.id}`, `${formElem.value}`);
      }
    });
    API.postRequest(Object.fromEntries(data), API.URL, token);
  }
}
