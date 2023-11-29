import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:8085',
    responseType: "json",
    timeoutErrorMessage:'Server Timeout'
  })