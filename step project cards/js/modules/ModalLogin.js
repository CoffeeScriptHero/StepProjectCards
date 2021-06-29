import API from "../API.js";

export default class ModalLogin {
  constructor(email, password) {
    this.email = document.getElementById("user-email").value;
    this.password = document.getElementById("user-password").value;
    this.url = "https://ajax.test-danit.com/api/v2/cards/login";
  }

  async getToken() {
    let response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(new ModalLogin()),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return alert("Email or password is incorrect!");
    } else {
      return await response.text();
    }
  }
}
