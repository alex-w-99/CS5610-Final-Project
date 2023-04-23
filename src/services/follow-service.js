import axios from "axios";

const API_BASE = "http://localhost:4000/api";  // process.env.REACT_APP_API_BASE;
const FOLLOW_API = `${API_BASE}/follows`;
const USERS_API = `${API_BASE}/users`;

const api = axios.create({ withCredentials: true });

export const followUser = async (follow) => {
    const followResponse = await api.post(`${FOLLOW_API}`, follow);
    return followResponse.data;
};
export const unfollowUser = async (fid) => {
    const unfollowResponse = await api.delete(`${FOLLOW_API}/${fid}`);
    return unfollowResponse.data;
};
export const findFollowId = async (uid2) => {
    const response = await api.get(`${USERS_API}/${uid2}/followed`);
    return response.data ? response.data : 0;  // in case no such followId exists
};
export const findFollowers = async (uid) => {
    const followersResponse = await api.get(`${USERS_API}/${uid}/followers`);
    return followersResponse.data;
};
export const findFollowing = async (uid) => {
    const followingResponse = await api.get(`${USERS_API}/${uid}/following`);
    return followingResponse.data;
};
