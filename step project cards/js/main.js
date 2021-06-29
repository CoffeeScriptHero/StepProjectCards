import ModalLogin from "./modules/ModalLogin.js";
import ModalVisit from "./modules/Visit.js";
import {
  createVisitBtn,
  submitVisitBtn,
  loginBtn,
} from "./modules/Constants.js";

import Card from "./modules/Card.js";
import Filter from "./modules/Filter.js";

const modalVisit = new ModalVisit();
modalVisit.listenChanges();

createVisitBtn.addEventListener("click", () => {
  modalVisit.hideFields();
  modalVisit.setByDefault();
});

submitVisitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modalVisit.sendInfo().then((response) => {
    if (typeof response === "undefined") {
      return;
    }
    let doctorElem = document.querySelector("#select-doctor .chosen");
    let filterDoctor = doctorElem.id.substring(doctorElem.id.indexOf("-") + 1);
    let lastCard = document.querySelector(`.cards_container .card:last-child`);

    if (filterDoctor !== response.doctor && filterDoctor !== "doctors") {
      lastCard.classList.add("hidden-doctor");
      return;
    }
    let urgencyElem = document.querySelector("#select-urgency .chosen");
    let filterUrgency = urgencyElem.textContent
      .substring(urgencyElem.textContent.indexOf(":") + 1)
      .trim()
      .toLowerCase();
    if (filterUrgency !== response.urgency && filterUrgency !== "все") {
      lastCard.classList.add("hidden-urgency");
    }
  });
});

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
    const filter = new Filter();
    filter.clearFields();
    filter.listenSearch();
  } else {
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("visit-btn").style.display = "none";
    document.getElementById("filter").style.display = "none";
  }
}

checkAuth();
