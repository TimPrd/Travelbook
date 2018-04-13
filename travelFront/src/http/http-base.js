import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/' 
  ///`http://localhost:3400/`,
  /*headers: {
    Authorization: '"Bearer {token}"'
  }*/
})