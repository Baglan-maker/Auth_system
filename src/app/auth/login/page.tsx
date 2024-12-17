import React from "react";
import LoginForm from "./AuthForm";
import LanguageSwitcher from '../../components/LanguageSwitcher';

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <LanguageSwitcher />
    </div>
  );
  
};

export default LoginPage;
