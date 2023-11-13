import { useFormik, FormikProvider } from "formik";
import { ValidationSchema } from "../validation/validation-schema";
import PersonForm from "../components/PersonForm";
import { Box } from "@mui/material";
import Birthday, { BirthdayAPI } from "../types/Birthday";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectBirthdays,
  setSelectedBirthday,
} from "../store/birthdays/birthdaysSlice";
import { useCallback, useEffect } from "react";
import { useBirthdaysAPI } from "../services/birthday";
import { useCountriesAPI } from "../services/country";
import BirthdaysTable from "../components/BirthdaysTable";
import { DEFAULT_BIRTHDAY } from "../constants/fields";

const Birthdays = () => {
  const dispatch = useAppDispatch();
  const birthdays = useAppSelector(selectBirthdays);
  const { getBirthdays, createBirthday } = useBirthdaysAPI();
  const { getCountries } = useCountriesAPI();

  const getClosestBirthday = useCallback(
    (newBirthday: BirthdayAPI) => {
      const newBirthdays = [...birthdays, newBirthday];
      const sortedBirthdays = newBirthdays.slice().sort((a, b) => {
        let results;
        const aDate = new Date(a.birthday ?? null);
        const bDate = new Date(b.birthday ?? null);
        results =
          aDate.getMonth() < bDate.getMonth()
            ? 1
            : aDate.getMonth() > bDate.getMonth()
            ? -1
            : 0;
        if (results === 0) {
          results =
            aDate.getDate() < bDate.getDate()
              ? 1
              : aDate.getDate() > bDate.getDate()
              ? -1
              : 0;
        }
        return results;
      });
      return sortedBirthdays[0];
    },
    [birthdays]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      country: "",
      birthday: new Date(DEFAULT_BIRTHDAY),
    },
    validationSchema: ValidationSchema,
    onSubmit: async (value: Birthday) => {
      const id = await createBirthday(value);
      const closestBirthday = getClosestBirthday({
        ...value,
        birthday: value.birthday.toISOString(),
        _id: id,
      });
      dispatch(setSelectedBirthday(closestBirthday._id));
    },
  });

  useEffect(() => {
    getBirthdays();
    getCountries();
  }, []);

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
