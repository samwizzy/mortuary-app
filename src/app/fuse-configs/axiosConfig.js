
import axios from "axios";

export const baseURL = "https://api.ezoneerp.com/gateway";
const service = "/mortuary-service/";

const token = localStorage.getItem('access_token')

axios.defaults.baseURL = baseURL + service;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';