import { useFormik, FormikProvider } from "formik";
import { ValidationSchema } from "../validation/validation-schema";
import PersonForm from "../components/PersonForm";
import { Box } from "@mui/material";
import Birthday from "../types/Birthday";
import { useAppSelector } from "../store";
import { selectBirthdays } from "../store/birthdays/birthdaysSlice";
import { useEffect } from "react";
import { useBirthdaysAPI } from "../services/birthday";
import { useCountriesAPI } from "../services/country";
import BirthdaysTable from "../components/BirthdaysTable";

const Birthdays = () => {
  //const dispatch = useAppDispatch();
  const birthdays = useAppSelector(selectBirthdays);
  const { getBirthdays, createBirthday } = useBirthdaysAPI();
  const { getCountries } = useCountriesAPI();
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      country: "",
      birthday: new Date("01-01-1970"),
    },
    validationSchema: ValidationSchema,
    onSubmit: (value: Birthday) => {
      createBirthday(value);
    },
  });

  useEffect(() => {
    getBirthdays();
    getCountries();
  }, []);

  useEffect(() => {
    console.log(birthdays);
  }, [birthdays]);

  return (
    <FormikProvider value={formik}>
      <h2>Intive - FDV Exercise</h2>
      <Box sx={{ display: "flex", gap: 5 }}>
        <PersonForm />
        <BirthdaysTable rows={birthdays} />
      </Box>
    </FormikProvider>
  );
};

export default Birthdays;
