import { useFormik, FormikProvider } from "formik";
import { ValidationSchema } from "../validation/validation-schema";
import PersonForm from "../components/PersonForm";
import { Box } from "@mui/material";
import {
  useCreateBirthdayMutation,
  useGetBirthdaysQuery,
} from "../services/birthday";
import Birthday from "../types/Birthday";
import { useEffect } from "react";

const Birthdays = () => {
  const [createBirthday] = useCreateBirthdayMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      country: "",
      birthday: new Date("01-01-1970"),
    },
    validationSchema: ValidationSchema,
    onSubmit: (value: Birthday) => {
      createBirthday({
        ...value,
        birthday: value.birthday.toISOString(),
      });
    },
  });

  const { data } = useGetBirthdaysQuery(undefined);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <FormikProvider value={formik}>
      <h2>Intive - FDV Exercise</h2>
      <Box sx={{ display: "flex" }}>
        <PersonForm />
      </Box>
    </FormikProvider>
  );
};

export default Birthdays;
