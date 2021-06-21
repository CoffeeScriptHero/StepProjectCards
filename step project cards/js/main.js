//экспортируем в этот файл
import modalLogin from "./modules/modalLogin.js";
import ModalVisit from "./modules/Visit.js";
import { createVisitBtn, submitVisitBtn } from "./modules/Constants.js";

const modalVisit = new ModalVisit();
modalVisit.listenChanges();
const modal = new modalLogin();

createVisitBtn.addEventListener("click", () => {
  modalVisit.hideFields();
  modalVisit.setByDefault();
});

submitVisitBtn.addEventListener("click", () => {
  modalVisit.sendInfo();
  document.querySelector("#visit-header-close").click();
});
