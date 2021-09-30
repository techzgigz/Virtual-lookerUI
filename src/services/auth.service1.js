import axios from "axios";
import Cookies from 'universal-cookie';

import { useCookies } from 'react-cookie';

const API_URL = "http://localhost:5000/api/auth/"//process.env.REACT_APP_CLIENT_APP+"auth";//"http://localhost:5000/api/auth/";

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

  async getCurrentUser(cookies) {
   
    let fetchGetResponse = await fetch("http://node-csrf.herokuapp.com/get", {
      method: 'GET',
      headers: {
        //Accept: "application/json",
       // "Content-Type": "application/json",
        credentials: 'include'
      },
    }).then(res => {
      // console.log(res.headers); // undefined
      // for(let entry of res.headers.entries()) {
      //   console.log('header', entry);
      // }
      // res.headers.forEach(element => {
      //   console.log('header', element);
      // });
      // console.log(document.cookie); // nope
      return res.json();
    }).then(json => {
      console.log(json); //
      // cookies.set('dhs', json.secret, { path: '/',secure: true,
      // httpOnly: false
      // });
      
      localStorage.setItem('csrf', json.csrf);
      //Co//okies.
      

    });
    //let k=await fetchGetResponse.json()
   // console.log(k.headers); // undefined
   // console.log(document.cookie); // nope
    //console.log(k)
  //  localStorage.setItem('csrf', k.csrfToken);
    //return fetchGetResponse.csrfToken;
    //return JSON.parse(localStorage.getItem('user'));;
  }
  async postCurrentUser() {
    var headers = new Headers({
      'content-type': 'application/json',
      'Accept': 'application/json',
      // 'access_token': `Bearer ${token.access_token}`,
      'XSRF-Token':  localStorage.getItem('csrf'),
      //'Cookie' : "_csrf=MRrMIJV1y6xRZYdO3r6aUCaY"
    });
    let obj = {
      headers,
      body: JSON.stringify({ csrf:localStorage.getItem('csrf')}),
      method:"POST",
      credentials: 'include', // <-- includes cookies in the request
      //credentials: "same-origin",
      //credentials: 'same-origin',
      mode: "cors",
     // cache: 'no-cache'
    }
//     const config = {'crossDomain': true,  mode: 'cors',headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'xsrf-token':  localStorage.getItem('csrf')
//  // ,'X-CSRF-Token':  localStorage.getItem('csrf'),'X-XSRF-Token':  localStorage.getItem('csrf'),
//  // 'csrf-Token':  localStorage.getItem('csrf')
// },withCredentials: true,}             
//     axios
//     .post(
//       'http://localhost:5000/dhs',
//       {
//         dhs:localStorage.getItem('csrf')
//       },
//       config
//     )
//     .then((data) => alert('done'))
//     .then((result) => alert('done'))
//     .catch((err) => alert('error'))

    const result = await fetch("http://node-csrf.herokuapp.com/", obj);
    console.log(result)
    if(result && result.status === 200){
      var k=result.json()
      alert('done')
      console.log(k)
    }
    else{
      alert('error')
    }
    // //return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
