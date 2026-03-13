import axios from "axios";
import { API_BASE_URL } from "../../Constants/ApiConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";
    const currentPath = window.location.pathname;

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout") ||
      url.includes("/auth/verify-otp") ||
      url.includes("/auth/resend-otp") ||
      url.includes("/auth/set-password");

    const isSessionCheck = url.includes("/auth/me");

    const isPublicPage =
      currentPath === "/" ||
      currentPath === "/login" ||
      currentPath === "/register";

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      !isSessionCheck &&
      !isPublicPage
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api.post("/auth/refresh");
        }

        await refreshPromise;
        isRefreshing = false;
        refreshPromise = null;

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshPromise = null;
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;