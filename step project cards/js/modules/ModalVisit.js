export class ModalVisit {
  constructor(modal = document.getElementById("modal-visit")) {
    this.modal = modal;
    this.select = this.modal.querySelector("#visit-select-doctor");
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
      console.log(formElem);
      formElem.required = true;
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
          this.clearFields(formElem);
        });
      }
    });
  }
  clearFields(formElem) {
    formElem.value = "";
  }
  setByDefault() {
    this.defaultWrapper
      .querySelectorAll(".form-control")
      .forEach((formElem) => {
        this.clearFields(formElem);
      });
  }
}
