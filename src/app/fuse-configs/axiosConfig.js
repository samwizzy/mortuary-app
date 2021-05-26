
import axios from "axios";

const baseURL = "https://dev.ezoneapps.com/gateway/mortuary-service/";
const token = "8de2a426-d57f-4423-9474-0124835dd5bd";

axios.defaults.baseURL = baseURL;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';