import axios from "axios";
import Birthday, { BirthdayAPI } from "../types/Birthday";
import { useAppDispatch } from "../store";
import {
  addBirthday,
  setBirthdays,
  setIsBirthdaysLoading,
} from "../store/birthdays/birthdaysSlice";
import { DEFAULT_CONFIG, BASE_URL } from "../constants/services";
import { useCallback } from "react";

interface PostBirthdayResponse {
  _id: string;
}

export const useBirthdaysAPI = () => {
  const dispatch = useAppDispatch();

  const getBirthdays = useCallback(() => {
    dispatch(setIsBirthdaysLoading(true));
    axios
      .get(BASE_URL + "birthdays")
      .then((response: { data: { result: BirthdayAPI[] } }) => {
        dispatch(setBirthdays(response.data.result));
      })
      .catch((error) => console.error("Error fetching birthdays: " + error))
      .finally(() => dispatch(setIsBirthdaysLoading(false)));
  }, [dispatch]);

  const createBirthday = useCallback(
    async (birthday: Birthday) => {
      try {
        dispatch(setIsBirthdaysLoading(true));
        const birthdayApi = {
          ...birthday,
          birthday: birthday.birthday.toISOString(),
        };
        const request = await axios.post<PostBirthdayResponse>(
          BASE_URL + "birthdays",
          {
            data: birthdayApi,
          },
          DEFAULT_CONFIG
        );
        dispatch(
          addBirthday({
            ...birthdayApi,
            _id: request.data._id,
          })
        );
        return request.data._id;
      } catch (error) {
        console.error("Error creating birthday: " + error);
      } finally {
        dispatch(setIsBirthdaysLoading(false));
      }
    },
    [dispatch]
  );

  return { getBirthdays, createBirthday };
};
