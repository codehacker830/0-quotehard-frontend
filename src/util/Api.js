import Axios from 'axios';

let base_url = process.env.NODE_ENV === "development" ? `http://localhost:5000/api/` : `http://api.quotehard.com/api/`;
console.error("______ process.env.NODE_ENV ____", process.env.NODE_ENV)

let axios = Axios.create({
   baseURL: `${base_url}`,
   headers: {
      'Content-Type': 'application/json',
   }
});

const token = JSON.parse(localStorage.getItem('token'));
console.error("__ token __", token);

axios.defaults.headers.common['Authorization'] = "Bearer " + token;
export default axios;