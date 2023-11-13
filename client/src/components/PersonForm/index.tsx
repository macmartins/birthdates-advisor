import { Button, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { Schema } from "../../validation/validation-schema";
import { BIRTHDAY, COUNTRY, NAME, SURNAME } from "../../constants/fields";
import { PersonFormContainer } from "./styles";
import { DatePicker } from "../DatePicker";
import { useAppSelector } from "../../store";
import {
  selectCountries,
  selectIsCountriesLoading,
} from "../../store/countries/countrySlice";
import { useMemo } from "react";
import Autocomplete from "../Autocomplete";
import {
  selectBirthdays,
  selectSelectedBirthday,
} from "../../store/birthdays/birthdaysSlice";

const PersonForm = () => {
  const isCountriesLoading = useAppSelector(selectIsCountriesLoading);
  const countries = useAppSelector(selectCountries);
  const birthdays = useAppSelector(selectBirthdays);
  const selectedBirthdayID = useAppSelector(selectSelectedBirthday);

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setTouched,
    touched,
    errors,
    submitForm,
  } = useFormikContext<Schema>();

  const selectedBirthday = useMemo(
    () => birthdays.find((birthday) => birthday._id === selectedBirthdayID),
    [birthdays, selectedBirthdayID]
  );

  const selectedBirthdayDate = useMemo(
    () => new Date(selectedBirthday?.birthday ?? ""),
    [selectedBirthday]
  );

  const selectedBirthdayAge = useMemo(() => {
    const baseDate = new Date();
    const birthdayToNow = new Date(selectedBirthdayDate);
    birthdayToNow.setFullYear(baseDate.getFullYear());
    if (birthdayToNow.getTime() < new Date().getTime()) {
      baseDate.setFullYear(baseDate.getFullYear() + 1);
    }
    return baseDate.getFullYear() - selectedBirthdayDate.getFullYear();
  }, [selectedBirthdayDate]);

  const selectedBDCountry = useMemo(
    () =>
      countries.find((country) => country._id === selectedBirthday?.country),
    [selectedBirthday, countries]
  );

  const legend = useMemo(
    () => `Hello ${selectedBirthday?.name} from ${
      selectedBDCountry?.name.common
    },
          on ${selectedBirthdayDate.getDate()} of 
          ${selectedBirthdayDate.toLocaleString("en-EN", {
            month: "long",
          })} 
          you will have ${selectedBirthdayAge} years`,
    [
      selectedBirthday,
      selectedBirthdayDate,
      selectedBDCountry,
      selectedBirthdayAge,
    ]
  );

  const options = useMemo(
    () =>
      countries.map((country) => ({
        label: country.name.common,
        value: country._id,
      })),
    [countries]
  );

  return (
    <PersonFormContainer>
      <TextField
        id="name"
        name="name"
        label={NAME}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />
      <TextField
        id="surname"
        name="surname"
        label={SURNAME}
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.surname && Boolean(errors.surname)}
        helperText={touched.surname && errors.surname}
      />
      <Autocomplete
        name="country"
        value={{ label: "", value: values.country }}
        options={options}
        label={COUNTRY}
        isTouched={touched.country}
        error={errors.country}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        loading={isCountriesLoading}
      />
      <DatePicker
        name="birthday"
        label={BIRTHDAY}
        value={values.birthday}
        isTouched={touched.birthday}
        error={errors.birthday}
        setFieldValue={setFieldValue}
        setTouched={setTouched}
        handleBlur={handleBlur}
      />
      <Button variant="outlined" onClick={submitForm}>
        Save
      </Button>
      {selectedBirthday ? <div>{legend}</div> : null}
    </PersonFormContainer>
  );
};

export default PersonForm;
