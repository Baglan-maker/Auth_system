"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../lib/axios"
import { useUsers } from "../../lib/useUsers";

const schema = yup.object({
  iin: yup
    .string()
    .matches(/^\d{12}$/, "ИИН должен содержать 12 цифр")
    .required("ИИН обязателен"),
  fullName: yup.string().required("ФИО обязательно"),
  birthDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Введите дату в формате ГГГГ-ММ-ДД")
    .required("Дата рождения обязательна"),
  city: yup.string().required("Город обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),
});

type Inputs = {
  iin: string;
  fullName: string;
  birthDate: string;
  city: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { t } = useTranslation("register");
  const router = useRouter();
  const { users, isLoading, isError } = useUsers(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!captchaToken) {
      alert("Пожалуйста, пройдите CAPTCHA.");
      return;
    }

    if (isLoading) {
      alert("Данные загружаются, попробуйте позже.");
      return;
    }

    if (isError || !users) {
      alert("Ошибка загрузки данных пользователей.");
      return;
    }

    const existingUser = users.find((user: { iin: string }) => user.iin === data.iin);
    if (existingUser) {
      alert("Пользователь с данным ИИН уже зарегистрирован.");
      return;
    }

    try {
      await axios.post("https://675ca3b5fe09df667f6468f8.mockapi.io/users", data);
      alert("Регистрация успешна!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Ошибка регистрации", error);
      alert("Не удалось зарегистрировать пользователя.");
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
        {t("Регистрация")}
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
        label={t("ФИО")}
        fullWidth
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        margin="normal"
      />
      <TextField
        label={t("Дата рождения (ГГГГ-ММ-ДД)")}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        {...register("birthDate")}
        error={!!errors.birthDate}
        helperText={errors.birthDate?.message}
        margin="normal"
      />
      <TextField
        label={t("Город")}
        fullWidth
        {...register("city")}
        error={!!errors.city}
        helperText={errors.city?.message}
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

      <Box my={2} display="flex" justifyContent="center">
        <Box
          sx={{
            border: "1px solid #E0E0E0",
            p: 1,
            borderRadius: 1,
            display: "inline-block",
          }}
        >
          <ReCAPTCHA
            sitekey="6LfD850qAAAAAGybpHakR8Di6r3g2O-dFCatnLmj"
            onChange={(token) => setCaptchaToken(token)}
          />
        </Box>
      </Box>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
        {t("Регистрация")}
      </Button>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          {t("Уже есть аккаунт?")}{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => router.push("/auth/login")}
          >
            {t("Войти")}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
