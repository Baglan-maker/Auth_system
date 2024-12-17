import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";

export default function Home() {
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ color: "#333", ml: 4, mb: 2}}>
        Добро Пожаловать
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1.2rem",
          alignItems: "center",
        }}
      >
        <Link
          href="/auth/register"
          sx={{
            textDecoration: "none",
            color: "#1976d2",
            mr: 2, 
            fontWeight: 500,
          }}
        >
          Регистрация
        </Link>
        <Typography variant="body1" sx={{ mx: 1 }}> 
          |
        </Typography>
        <Link
          href="/auth/login"
          sx={{
            textDecoration: "none",
            color: "#1976d2",
            ml: 2,
            fontWeight: 500,
          }}
        >
          Войти
        </Link>
      </Box>
    </Container>
  );
}
