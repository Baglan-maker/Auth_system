"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsers } from "../../lib/useUsers";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import * as yup from "yup";
import { useAuthStore } from "../../lib/useAuthStore";
import { useTranslation } from "react-i18next";

const getValidationSchema = (t: (key: string) => string) =>
  yup.object({
    iin: yup
      .string()
      .matches(/^\d{12}$/, t("ИИН должен состоять из 12 цифр"))
      .required(t("ИИН обязателен")),
    password: yup.string().required(t("Пароль обязателен")),
  });

type Inputs = {
  iin: string;
  password: string;
};

type LoginFormProps = {
  onRegisterRedirect: () => void; // Функция для перенаправления на регистрацию
  onDashboardRedirect: () => void; // Функция для перенаправления на дашборд
};

const LoginForm: React.FC<LoginFormProps> = ({
  onRegisterRedirect,
  onDashboardRedirect,
}) => {
  const { t } = useTranslation("login");
  const { setTokens } = useAuthStore();
  const { users, isLoading, isError } = useUsers();
  const schema = getValidationSchema(t);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "success" | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      setAlertMessage(t("Данные пользователей загружаются, попробуйте позже."));
      setAlertSeverity("error");
      return;
    }
    if (isError || !users) {
      setAlertMessage(t("Ошибка загрузки данных пользователей."));
      setAlertSeverity("error");
      return;
    }

    try {
      const user = users.find(
        (u: { iin: string; password: string }) =>
          u.iin === data.iin && u.password === data.password
      );
      if (!user) throw new Error(t("Неверные учетные данные."));

      const tokens = {
        accessToken: "mockAccessToken123",
        refreshToken: "mockRefreshToken123",
      };

      setTokens(tokens);
      setAlertMessage(t("Вход выполнен успешно!"));
      setAlertSeverity("success");

      setTimeout(() => {
         onDashboardRedirect();
      }, 700); 
    } catch (error) {
      console.error("Login failed", error);
      setAlertMessage(t("Неверный ИИН или пароль."));
      setAlertSeverity("error");
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
      <Typography variant="h5">
        {t("Войти")}
      </Typography>

      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}

      <TextField
        label={t("ИИН")}
        fullWidth
        {...register("iin")}
        error={!!errors.iin}
        helperText={errors.iin?.message}
      />
      <TextField
        label={t("Пароль")}
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 1.5 }}>
        {t("Войти")}
      </Button>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          {t("Еще нет аккаунта?")}
          <Button
            variant="text"
            size="medium"
            onClick={onRegisterRedirect}
          >
            {t("Регистрация")}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
