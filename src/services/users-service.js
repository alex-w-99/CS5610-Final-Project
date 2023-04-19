import axios from "axios";

//const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = "http://localhost:4000/api";
const USERS_API = `${API_BASE}/users`;  // location of HTTP services

const api = axios.create();

export const profile = async () => {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
};

export const updateUser = async user => {
    await api.put(`${USERS_API}/${user._id}`, user);
    return user;
};
