'use client';
import React from "react";
import RegisterForm from "./RegisterForm";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();

  return (
    <div>
        <RegisterForm 
          onLoginRedirect={() => router.push("/auth/login")}
        />
          <LanguageSwitcher />
        </div>
  );
};

export default AuthPage;
