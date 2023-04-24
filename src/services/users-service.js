import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;  //const API_BASE = "http://localhost:4000/api";
const USERS_API = `${API_BASE}/users`;  // location of HTTP services for users collections

const api = axios.create({ withCredentials : true });

export const createUser = async (user) => {
    const response = await api.post(`${USERS_API}`, user);
    return response.data
};
export const register = async (user) => {
    const response = await api.post(`${USERS_API}`, user);
    return response.data;
};
export const login = async ( { username, password } ) => {
    const response = await api.post(`${USERS_API}/login`, { username, password } );
    return response.data;  // i.e., return user
};
export const logout = async () => {
    const response = await api.post(`${USERS_API}/logout`);
    return response.data;
};
export const profile = async () => {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await api.get(`${USERS_API}`);
    return response.data;
};
export const findUserById = async (uid) => {
    const response = await api.get(`${USERS_API}/${uid}`);
    return response.data;
};
export const updateUser = async (user) => {
    await api.put(`${USERS_API}/${user._id}`, user);
    return user;
};
export const deleteUser = async (uid) => {
    const response = await api.delete(`${USERS_API}/${uid}`);
    return response.data;
};
