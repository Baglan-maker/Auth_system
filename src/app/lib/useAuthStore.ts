"use client";

import { create } from "zustand";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
  refreshTokens: () => Promise<boolean>; 
}

export const useAuthStore = create<AuthState>((set, get) => ({
  tokens: null,
  isAuthenticated: false,

  setTokens: (tokens) => {
    set({ tokens, isAuthenticated: true });
    localStorage.setItem("tokens", JSON.stringify(tokens));
  },

  clearTokens: () => {
    set({ tokens: null, isAuthenticated: false });
    localStorage.removeItem("tokens");
  },

  refreshTokens: async () => {
    const currentTokens = get().tokens;
    if (!currentTokens) {
      console.error("Нет токенов для обновления!");
      return false;
    }

    try {
      const response = await fetch("/api/refreshToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: currentTokens.refreshToken }),
      });

      if (!response.ok) {
        console.error("Ошибка обновления токенов. Код ответа:", response.status);
        get().clearTokens();
        return false;
      }

      const newTokens = await response.json();
      set({ tokens: newTokens, isAuthenticated: true });
      localStorage.setItem("tokens", JSON.stringify(newTokens));
      return true;
    } catch {
      get().clearTokens();
      return false;
    }
    
  },
}));

// if (typeof window !== "undefined") {
//   const storedTokens = localStorage.getItem("tokens");
//   if (storedTokens) {
//     useAuthStore.setState({
//       tokens: JSON.parse(storedTokens),
//       isAuthenticated: true,
//     });
//   }
// }
