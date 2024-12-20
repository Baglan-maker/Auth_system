import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "27px", // Отступы снизу
    },
    body2: {
      color: "#757575",
      fontSize: "0.875rem",
    },
  },
  palette: {
    primary: {
      main: "#1976d2", // Синий цвет по умолчанию
    },
    secondary: {
      main: "#dc004e", // Красный цвет по умолчанию
    },  
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: "none",
          padding: "8px 16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "22px", // Единый отступ
        },
      },
    },
  },
});

export default theme;

