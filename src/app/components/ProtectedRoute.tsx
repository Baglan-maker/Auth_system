'use client'
import React, { ReactNode } from 'react';
import { useAuthStore } from "../lib/useAuthStore";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <> {children}</> : null;
};

export default ProtectedRoute;
