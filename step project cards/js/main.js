import ModalLogin from "./modules/ModalLogin.js";
import ModalVisit from "./modules/Visit.js";
import {
  createVisitBtn,
  submitVisitBtn,
  loginBtn,
} from "./modules/Constants.js";
import Card from "./modules/Card.js";

function showIfLog() {
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("visit-btn").style.display = "block";
  document.getElementById("filter").style.display = "block";
}

loginBtn.addEventListener("click", async (event) => {
  let token = await new ModalLogin().getToken();

  if (token !== undefined) {
    localStorage.setItem("token", token);
    showIfLog();
    checkAuth();
  }
});

function checkTocken() {
  let token = localStorage.getItem("token");

  if (token) {
    return true;
  }
  return false;
}

function checkAuth() {
  if (checkTocken()) {
    showIfLog();
    const card = new Card();
    card.receiveCards();
  } else {
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("visit-btn").style.display = "none";
    document.getElementById("filter").style.display = "none";
  }
}

checkAuth();

const modalVisit = new ModalVisit();
modalVisit.listenChanges();

createVisitBtn.addEventListener("click", () => {
  modalVisit.hideFields();
  modalVisit.setByDefault();
});

submitVisitBtn.addEventListener("click", () => {
  modalVisit.sendInfo();
  document.querySelector("#visit-header-close").click();
});
