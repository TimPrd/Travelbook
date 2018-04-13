import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:3400/',
  /*headers: {
    Authorization:'Bearer' + localStorage.getItem('id_token') 
    }*/
})