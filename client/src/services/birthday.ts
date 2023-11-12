import axios from "axios";
import Birthday, { BirthdayAPI } from "../types/Birthday";
import { useAppDispatch } from "../store";
import { addBirthday, setBirthdays } from "../store/birthdays/birthdaysSlice";
import { DEFAULT_CONFIG } from "./constants";

interface PostBirthdayResponse {
  _id: string;
}

export const useBirthdaysAPI = () => {
  const dispatch = useAppDispatch();

  const getBirthdays = () => {
    axios
      .get("/api/birthdays")
      .then((response: { data: { result: BirthdayAPI[] } }) => {
        dispatch(setBirthdays(response.data.result));
      })
      .catch((error) => alert("Error fetching birthdays: " + error));
  };

  const createBirthday = (birthday: Birthday) => {
    const birthdayApi = {
      ...birthday,
      birthday: birthday.birthday.toISOString(),
    };
    axios
      .post<PostBirthdayResponse>(
        "/api/birthdays",
        {
          data: birthdayApi,
        },
        DEFAULT_CONFIG
      )
      .then((response) => {
        dispatch(
          addBirthday({
            ...birthdayApi,
            _id: response.data._id,
          })
        );
      })
      .catch((error) => alert("Error creating birthday: " + error));
  };

  return { getBirthdays, createBirthday };
};
