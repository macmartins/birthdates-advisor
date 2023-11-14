import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

const languages = [
  {
    label: "EN",
    value: "en",
  },
  {
    label: "PT",
    value: "pt",
  },
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select onChange={handleChange} value={i18n.language} size="small">
      {languages.map((lang) => (
        <MenuItem value={lang.value}>{lang.label}</MenuItem>
      ))}
    </Select>
  );
};

export default LanguageDropdown;
