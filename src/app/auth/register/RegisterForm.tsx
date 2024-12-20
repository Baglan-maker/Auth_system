"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../lib/axios";
import { useUsers } from "../../lib/useUsers";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getValidationSchema = (t: (key: string) => string) => {
  return yup.object({
    iin: yup
      .string()
      .matches(/^\d{12}$/, t("ИИН должен содержать 12 цифр"))
      .required(t("ИИН обязателен")),
    fullName: yup.string().required(t("ФИО обязательно")),
    birthDate: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, t("Введите дату в формате ГГГГ-ММ-ДД"))
      .required(t("Дата рождения обязательна")),
    city: yup.string().required(t("Город обязателен")),
    password: yup
      .string()
      .min(6, t("Пароль должен содержать минимум 6 символов"))
      .required(t("Пароль обязателен")),
  });
};

type Inputs = {
  iin: string;
  fullName: string;
  birthDate: string;
  city: string;
  password: string;
};

type RegisterFormProps = {
  onLoginRedirect: () => void; 
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onLoginRedirect,
}) => {
  const { t } = useTranslation("register");
  const schema = getValidationSchema(t);
  const { users, isLoading, isError } = useUsers();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"info" | "success" | "error" | undefined>(
    undefined
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!captchaToken) {
      setAlertMessage("Пожалуйста, пройдите CAPTCHA.");
      setAlertSeverity("error");
      return;
    }

    if (isLoading) {
      setAlertMessage("Данные загружаются, попробуйте позже.");
      setAlertSeverity("info");
      return;
    }

    if (isError || !users) {
      setAlertMessage("Ошибка загрузки данных пользователей.");
      setAlertSeverity("error");
      return;
    }

    const existingUser = users.find((user: { iin: string }) => user.iin === data.iin);
    if (existingUser) {
      setAlertMessage("Пользователь с данным ИИН уже зарегистрирован.");
      setAlertSeverity("error");
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}`, data);
      setAlertMessage("Регистрация успешна!");
      setAlertSeverity("success");
      setTimeout(() => {
        onLoginRedirect();
      }, 700);
    } catch (error) {
      console.error("Ошибка регистрации", error);
      setAlertMessage("Не удалось зарегистрировать пользователя.");
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
      <Typography variant="h5">{t("Регистрация")}</Typography>

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
        label={t("ФИО")}
        fullWidth
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />
      <TextField
        label={t("Дата рождения")}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        {...register("birthDate")}
        error={!!errors.birthDate}
        helperText={errors.birthDate?.message}
      />
      <TextField
        label={t("Город")}
        fullWidth
        {...register("city")}
        error={!!errors.city}
        helperText={errors.city?.message}
      />
      <TextField
        label={t("Пароль")}
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box my={1} display="flex" justifyContent="center">
        <Box
          sx={{
            display: "flex", 
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            onChange={(token) => setCaptchaToken(token)}
          />
        </Box>
      </Box>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {t("Регистрация")}
      </Button>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          {t("Уже есть аккаунт?")}
          <Button variant="text" size="medium" onClick={onLoginRedirect}>
            {t("Войти")}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;

