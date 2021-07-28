
import axios from "axios";

// export const homeUrl = "https://apps.ezoneerp.com"
export const homeUrl = "https://dev.ezoneerp.com";

// export const baseURL = "https://api.ezoneerp.com/gateway";
export const baseURL = "https://dev.ezoneapps.com/gateway";
const service = "/mortuary-service/";

const token = localStorage.getItem('access_token')

axios.defaults.baseURL = baseURL + service;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';