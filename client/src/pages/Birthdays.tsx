import { useFormik, FormikProvider } from "formik";
import { ValidationSchema } from "../validation/validation-schema";
import PersonForm from "../components/PersonForm";
import { Box, CircularProgress } from "@mui/material";
import Birthday, { BirthdayAPI } from "../types/Birthday";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectBirthdays,
  selectIsBirthdaysLoading,
  setSelectedBirthday,
} from "../store/birthdays/birthdaysSlice";
import { useCallback, useEffect } from "react";
import { useBirthdaysAPI } from "../services/birthday";
import { useCountriesAPI } from "../services/country";
import BirthdaysTable from "../components/BirthdaysTable";
import { DEFAULT_BIRTHDAY } from "../constants/fields";
import { BirthdaysContainer } from "./styles";

interface Props {
  isRevisited?: boolean;
}

const Birthdays = ({ isRevisited }: Props) => {
  const dispatch = useAppDispatch();
  const birthdays = useAppSelector(selectBirthdays);
  const isBirthdaysLoading = useAppSelector(selectIsBirthdaysLoading);
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
    if (isRevisited) {
      getBirthdays();
    }
    getCountries();
  }, []);

  return (
    <FormikProvider value={formik}>
      <h2>Intive - FDV Exercise</h2>
      <BirthdaysContainer>
        <PersonForm />
        <Box sx={{ flex: 2 }}>
          {isBirthdaysLoading ? (
            <CircularProgress />
          ) : (
            <BirthdaysTable rows={birthdays} />
          )}
        </Box>
      </BirthdaysContainer>
    </FormikProvider>
  );
};

export default Birthdays;
