import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Birthdays from "./pages/Birthdays";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { PASSWORD, PASSWORD_VALUE } from "./constants/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(88, 135, 182)",
    },
    secondary: {
      main: "rgba(88, 135, 182, 0.5)",
    },
  },
});

const App = () => {
  useEffect(() => {
    localStorage.setItem(PASSWORD, PASSWORD_VALUE);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Birthdays />} />
              <Route
                path="/revisited"
                element={
                  <ProtectedRoute>
                    <Birthdays isRevisited />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </StyledThemeProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
