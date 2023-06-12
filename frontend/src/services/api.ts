import axios from 'axios';
import { VITE_REACT_API_URL } from '../constants'

const api = axios.create({
    baseURL: VITE_REACT_API_URL
});

export default api;
