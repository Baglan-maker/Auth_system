import axios from "axios";
import { useAuthStore } from "./useAuthStore";

const api = axios.create({
  baseURL: "https://675ca3b5fe09df667f6468f8.mockapi.io/",
});

api.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});
console.log(useAuthStore.getState().tokens);

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
      } catch (error) {
        useAuthStore.getState().clearTokens();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
