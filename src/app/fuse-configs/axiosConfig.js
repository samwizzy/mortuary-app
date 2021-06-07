
import axios from "axios";

const baseURL = "https://dev.ezoneapps.com/gateway/mortuary-service/";

const token = localStorage.getItem('access_token')  //"9148410f-169b-4ef6-8c42-1971b76fa21e"

axios.defaults.baseURL = baseURL;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';