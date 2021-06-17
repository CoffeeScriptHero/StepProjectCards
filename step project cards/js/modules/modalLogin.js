import API from "../API.js";

export default class modalLogin {
  constructor(form, userEmail, password, loginBtn) {
    (this.form = document.getElementById("form-login")),
      (this.userEmail = document.getElementById("user-email")),
      (this.password = document.getElementById("user-password")),
      (this.loginBtn = document.getElementById("enter"));
  }

  async handleLogin(e) {
    e.preventDefault();
    this.loginBtn.addEventListener("click", async (evt) => {
      let req = await fetch("https://ajax.test-danit.com/api/v2/cards/login");
      let toJSON = await req.json();
      return console.log(toJSON);
    });
  }
}
