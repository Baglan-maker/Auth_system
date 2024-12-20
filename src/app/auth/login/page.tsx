'use client';
import React from "react";
import LoginForm from "./AuthForm";
import { useRouter } from "next/navigation";
import LanguageSwitcher from '../../components/LanguageSwitcher';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div>
      <LoginForm
        onRegisterRedirect={() => router.push("/auth/register")}
        onDashboardRedirect={() => router.push("/dashboard")}
      />
      <LanguageSwitcher />
    </div>
  );
  
};

export default LoginPage;
