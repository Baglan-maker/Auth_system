"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useUsers } from "../../lib/useUsers";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useAuthStore } from "../../lib/useAuthStore";
import { useTranslation } from "react-i18next";


const schema = yup.object({
  iin: yup
    .string()
    .matches(/^\d{12}$/, "ИИН должен состоять из 12 цифр")
    .required("ИИН обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

type Inputs = {
  iin: string;
  password: string;
};

const LoginForm: React.FC = () => {
  
  const { t } = useTranslation("login");
  const { setTokens } = useAuthStore();
  const router = useRouter();
  const { users, isLoading, isError } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      alert("Loading user data, please wait...");
      return;
    }
    if (isError || !users) {
      alert("Error fetching user data.");
      return;
    }

    try {
      // Поиск пользователя по ИИН и паролю
      const user = users.find(
        (u: { iin: string; password: string }) =>
          u.iin === data.iin && u.password === data.password
      );
      if (!user) throw new Error("Invalid credentials");

      // Генерация токенов 
      const tokens = {
        accessToken: "mockAccessToken123",
        refreshToken: "mockRefreshToken123",
      };

      console.log("Сохранение токенов:", tokens);
      setTokens(tokens);

      alert("Login successful!");
      router.push("/dashboard"); // Редирект на защищенную страницу
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid ИИН or password.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        border: "1px solid #E0E0E0",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
        {t("Войти")}
      </Typography>
      <TextField
        label={t("ИИН")}
        fullWidth
        {...register("iin")}
        error={!!errors.iin}
        helperText={errors.iin?.message}
        margin="normal"
      />
      <TextField
        label={t("Пароль")}
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
         {t("Войти")}  
      </Button>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
            {t("Еще нет аккаунта?")}{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => router.push("/auth/register")}
          >
            {t("Регистрация")}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;

