export default class API {
  static URL = "https://ajax.test-danit.com/api/v2/cards";

  static async postRequest(object, url, token) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
  static getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  static saveToken(tokenFromResponse) {
    API.token = tokenFromResponse;
  }

  static async saveCard(cardToSave) {
    const res = await fetch(`${API.URL}/cards`, {
      method: "POST",
      headers: API.getHeaders(),
      body: JSON.stringify(cardToSave),
    });

    return res.json();
  }
  static async putRequest(object, cardId) {
    const response = await fetch(`${API.URL}/${cardId}`, {
      method: "PUT",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  }

  static async deleteRequest(id, token) {
    const response = await fetch(`${API.URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  }

  static async getRequest() {
    const response = await fetch(`${API.URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  }
}
