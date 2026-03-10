import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/admin";
const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const fetchAllUsers = async () => {
    return await axios.get(`${BASE_URL}/users`, authHeader());
}

export const deleteUser = async (userId) => {
    return await axios.delete(`${BASE_URL}/users/${userId}`, authHeader());
}

export const addUser = async (email, role) => {
    return await axios.post(`${BASE_URL}/register`, { email, role }, authHeader());
}