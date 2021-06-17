
import axios from "axios";

const baseURL = "https://dev.ezoneapps.com/gateway/mortuary-service/";

const token = localStorage.getItem('access_token')

axios.defaults.baseURL = baseURL;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';