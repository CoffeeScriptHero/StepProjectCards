export class modalLogin {
  constructor() {
    this.modal = this.create;
  }
  create() {
    const loginBtn = document.querySelector("login-btn");
    const loginModal = document.querySelector(".modal");

    loginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      loginModal.style.display = "";
    });
  }
}
