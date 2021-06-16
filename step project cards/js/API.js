// export default class API {
//     static URL = "https://ajax.test-danit.com/api/v2/cards";
//
//     static async postRequest (object, url, token) {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(object),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         return response.json();
//     }
//     static getHeaders() {
//         return {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     }
//
//     static async login(data) {
//         try {
//             return fetch(`${API.URL}/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//                 .then( (res) => {
//                     return res.text()//получаю промис
//                 })
//                 .then( (res) => {//получаю уже норм знач
//                     return res
//                 })
//         } catch (error) {
//
//         }
//
//     };
//
//     static saveToken(tokenFromResponse) {
//         API.token = tokenFromResponse;
//     };
//
//     static async saveCard(cardToSave) {
//         const res = await fetch(`${API.URL}/cards`, {
//             method: 'POST',
//             headers: API.getHeaders(),
//             body: JSON.stringify(cardToSave)
//         });
//
//         return res.json();
//
//
//     }
//     static async putRequest (object, cardId){
//         const response = await fetch(`${API.URL}/${cardId}`, {
//             method: 'PUT',
//             body: JSON.stringify(object),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         return await response.json();
//     }
//
//     static async deleteRequest(id) {
//         const response = await fetch(`${API.URL}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         return true
//     }
//
//     static async getRequest() {
//
//         const response = await fetch(`${API.URL}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         return  response.json().then(res=>res);
//
//     }
// }