import axios from "axios";

// const USERS_API = "http://localhost:4000/api/users";  // location of HTTP services
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const api = axios.create();

export const profile = async () => {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
}
