import api from '../../../Context/Interceptor/GlobalInterceptor';

export const login = async (data) =>
  api.post('/auth/login', data);

export const registerUser = async (email) => {
  return await api.post('/auth/register', { email });
};

export const verifyOtp = async (email, otp) => {
  return await api.post('/auth/verify-otp', { email, emailOtp: otp });
};

export const resendOtp = async (email) => {
  return await api.post('/auth/resend-otp', { email });
};

export const setPassword = async (email, password, confirmPassword) => {
  return await api.post('/auth/set-password', { email, password, confirmPassword });
};

export const refreshToken = async () => {
  return await api.post('/auth/refresh');
};

export const getCurrentUser = async () => {
  return await api.get('/auth/me');
};

export const logout = async () => {
  return await api.post('/auth/logout');
};