import { Autocomplete, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { Schema } from "../validation/validation-schema";
import { BIRTHDAY, COUNTRY, NAME, SURNAME } from "../constants/fields";
import { PersonFormContainer } from "./styles";
import { DatePicker } from "@mui/x-date-pickers";

const PersonForm = () => {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setTouched,
    touched,
    errors,
  } = useFormikContext<Schema>();
  console.log(touched.birthday, errors.birthday);

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
        fullWidth
        id="country"
        value={values.country}
        onChange={(e, newValue) => setFieldValue("country", newValue)}
        onBlur={handleBlur}
        options={["test"]}
        renderInput={(params) => (
          <TextField
            {...params}
            label={COUNTRY}
            error={touched.country && Boolean(errors.country)}
            helperText={touched.country && errors.country}
          />
        )}
      />
      <DatePicker
        disableFuture
        label={BIRTHDAY}
        value={values.birthday}
        format="dd/MM/yyyy"
        onChange={(value) => setFieldValue("birthday", value)}
        slotProps={{
          textField: {
            error: touched.birthday ? Boolean(errors.birthday) : false,
            onBlur: (e) => {
              setTouched({
                birthday: true,
              });
              handleBlur(e);
            },
            helperText: touched.birthday && <>{errors.birthday}</>,
          },
        }}
      />
    </PersonFormContainer>
  );
};

export default PersonForm;
