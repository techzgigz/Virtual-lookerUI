import axios from "axios";

const API_URL ="http://localhost:5000/api/auth/"//process.env.REACT_APP_CLIENT_APP+"auth";//"http://localhost:5000/api/auth/";
const API_URL2 ="http://localhost:5000/api/key/"
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

}

export default new AuthService();
