//экспортируем в этот файл
import modalLogin from "./modules/modalLogin.js";
import { ModalVisit } from "./modules/ModalVisit.js";
import { visitBtn } from "./modules/Constants.js";

const modalVisit = new ModalVisit();
modalVisit.listenChanges();
const modal = new modalLogin();

window.addEventListener("load", () => {
  modalVisit.setByDefault();
  //   modalVisit.hideFields();
});

visitBtn.addEventListener("click", () => {
  modalVisit.setByDefault();
});
