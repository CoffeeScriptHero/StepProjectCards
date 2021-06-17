//экспортируем в этот файл
import modalLogin from "./modules/modalLogin.js";
import { ModalVisit } from "./modules/ModalVisit.js";
const modalVisit = new ModalVisit();
modalVisit.listenChanges();
const modal = new modalLogin();
