export class ModalVisit {
  constructor(modal = document.getElementById("modal-visit")) {
    this.modal = modal;
  }
  listenChanges() {
    this.modal
      .querySelector("#visit-select-doctor")
      .addEventListener("change", (event) => {
        console.log(event.target.value);
      });
  }
}
