import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Birthdays from "./pages/Birthdays";

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Birthdays />} />
      </Routes>
    </BrowserRouter>
  </LocalizationProvider>
);

export default App;
