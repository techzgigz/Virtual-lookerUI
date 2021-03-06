import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/wallet/';
const API_URL2 ="http://localhost:5000/api/key/"

class ALLService {
  insertkey(secret)
  {
    return axios.post(API_URL2 + "insert", {  secret }, { headers: authHeader() })
  }

  getKey(data) {
    return axios.post(API_URL2 + "all", {  data }, { headers: authHeader() })
  }

  insertDocs(data)
  {
    
    return axios.post(API_URL + "insert",  data , { headers: authHeader() })
  }

  getDocs(data) {
    return axios.post(API_URL + "all", {  data }, { headers: authHeader() })
  }
}

export default new ALLService();
