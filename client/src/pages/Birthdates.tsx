import { useFormik, FormikProvider } from "formik";
import { ValidationSchema } from "../validation/validation-schema";
import PersonForm from "../components/PersonForm";
import { Box } from "@mui/material";

const Birthdates = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      country: "",
      birthday: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <FormikProvider value={formik}>
      <h2>Intive - FDV Exercise</h2>
      <Box sx={{ display: "flex" }}>
        <PersonForm />
      </Box>
    </FormikProvider>
  );
};

export default Birthdates;
