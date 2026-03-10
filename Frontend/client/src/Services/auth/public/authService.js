import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/auth";

export const login = async (data) => {
    return await axios.post(`${BASE_URL}/login`, data);
}

export const registerUser = async (email) => {
    return await axios.post(`${BASE_URL}/register`, { email });
}

export const verifyOtp = async (email, otp) => {
    return await axios.post(`${BASE_URL}/verify-otp`, { email, emailOtp: otp });
}

export const resendOtp = async (email) => {
    return await axios.post(`${BASE_URL}/resend-otp`, { email });
}

export const setPassword = async (email, password, confirmPassword) => {
    return await axios.post(`${BASE_URL}/set-password`, { email, password, confirmPassword });
}