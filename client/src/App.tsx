import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Birthdays from "./pages/Birthdays";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useMemo } from "react";
import { PASSWORD, PASSWORD_VALUE } from "./constants/auth";
import { useTranslation } from "react-i18next";
import { muiLanguages } from "./utils/language";

const App = () => {
  const { i18n } = useTranslation();

  const language = useMemo(
    () => muiLanguages[i18n.language as keyof typeof muiLanguages],
    [i18n.language]
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            primary: {
              main: "rgb(88, 135, 182)",
            },
            secondary: {
              main: "rgba(88, 135, 182, 0.5)",
            },
          },
        },
        language.library
      ),
    [language.library]
  );

  useEffect(() => {
    localStorage.setItem(PASSWORD, PASSWORD_VALUE);
  }, []);

  return (
    <LocalizationProvider
      adapterLocale={language.dateFns}
      dateAdapter={AdapterDateFns}
    >
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
