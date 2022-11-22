import axios from 'axios';

const client = axios.create({
  baseURL: 'https://sales-tracker-jooj.herokuapp.com/',
});
export { client };
