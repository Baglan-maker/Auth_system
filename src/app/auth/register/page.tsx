import React from "react";
import RegisterForm from "./RegisterForm";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { Box } from "@mui/material";

const AuthPage = () => {
  return (
    <div>
        <RegisterForm />
        <Box sx={{ mt: "auto", mb: -2 }}>
          <LanguageSwitcher />
        </Box>
        </div>
  );
};

export default AuthPage;
