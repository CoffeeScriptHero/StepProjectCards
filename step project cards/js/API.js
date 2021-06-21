export default class Api {
  constructor() {
    this.token = localStorage.getItem('token')
  }

  url(direction = '') {
    return 'https://ajax.test-danit.com/api/v2/cards/' + direction
  }

  async login(email, password) {
    const response = await fetch(this.url('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (response.ok) {
      const token = await response.text()
      this.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token) {
    this.token = token
  }

  async getCard(id) {
    const response = await fetch(this.url(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
    return await response.json()
  }

  async getAllCard() {
    const response = await fetch(this.url(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })

    const cards = await response.json()
    localStorage.setItem('cards', JSON.stringify(cards))
    return cards
  }

  async addCard(obj) {
    const response = await fetch(this.url(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(obj),
    })
    return await response.json()
  }

  async removeCard(id) {
    await fetch(this.url(id), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async editCard(obj, id) {
    const response = await fetch(this.url(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(obj),
    })
    return await response.json()
  }
}
