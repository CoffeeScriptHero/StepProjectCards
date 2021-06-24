//экспортируем в этот файл
import ModalLogin from './modules/ModalLogin.js';
import { ModalVisit } from "./modules/ModalVisit.js";
import { visitBtn, loginBtn } from "./modules/Constants.js";


const modalVisit = new ModalVisit();
modalVisit.listenChanges();

visitBtn.addEventListener("click", () => {
  modalVisit.hideFields();
  modalVisit.setByDefault();
});

function showIfLog () {
  document.getElementById('login-btn').style.display = 'none';
  document.getElementById('visit-btn').style.display = 'block';
  document.getElementById('filter').style.display = 'block';
}

loginBtn.addEventListener("click", async (event) => {
  let token = await new ModalLogin().getToken();

  if(token !== undefined){
    localStorage.setItem('token', token)
    showIfLog();
  }

});

function checkAuth () {
  let token = localStorage.getItem('token')

  if(token){
    showIfLog();
  } else if (!token) {
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('visit-btn').style.display = 'none';
    document.getElementById('filter').style.display = 'none';
  }
}

visitBtn.addEventListener("click", () => {
    modalVisit.setByDefault();
});
checkAuth();
