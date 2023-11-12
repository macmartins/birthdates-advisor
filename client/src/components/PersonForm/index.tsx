import { Button, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { Schema } from "../../validation/validation-schema";
import { BIRTHDAY, COUNTRY, NAME, SURNAME } from "../../constants/fields";
import { PersonFormContainer } from "./styles";
import { DatePicker } from "../DatePicker";
import { useAppSelector } from "../../store";
import { selectCountries } from "../../store/countries/countrySlice";
import { useMemo } from "react";
import Autocomplete from "../Autocomplete";

const PersonForm = () => {
  const countries = useAppSelector(selectCountries);
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
        value={values.country}
        options={options}
        label={COUNTRY}
        isTouched={touched.country}
        error={errors.country}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
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
      <Button onClick={submitForm}>Save</Button>
    </PersonFormContainer>
  );
};

export default PersonForm;
