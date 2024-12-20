import axios from "axios";
import { useAuthStore } from "./useAuthStore";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { tokens } = useAuthStore.getState();

        if (tokens?.refreshToken) {
          const response = await axios.post("/api/refreshToken", {
            refreshToken: tokens.refreshToken,
          });

          if (response.data.accessToken && response.data.refreshToken) {
            const newTokens = response.data;
            useAuthStore.getState().setTokens(newTokens);

            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

            return api(originalRequest);
          }
        }
      } catch {
        useAuthStore.getState().clearTokens();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
