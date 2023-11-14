import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { PRIMARY, SECONDARY } from "./constants/colors";

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
              main: PRIMARY,
            },
            secondary: {
              main: SECONDARY,
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
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </StyledThemeProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
