import axios from "axios";

const API = axios.create({
    baseURL: 'https://pixabay.com/api',
    header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    params: {
      key: process.env.REACT_APP_PIXABY_API_KEY,
      safesearch: true,
    }
});

export default API;