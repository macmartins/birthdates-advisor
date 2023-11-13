import axios from "axios";
import Birthday, { BirthdayAPI } from "../types/Birthday";
import { useAppDispatch } from "../store";
import { addBirthday, setBirthdays } from "../store/birthdays/birthdaysSlice";
import { DEFAULT_CONFIG } from "../constants/services";

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
      .catch((error) => console.error("Error fetching birthdays: " + error));
  };

  const createBirthday = async (birthday: Birthday) => {
    try {
      const birthdayApi = {
        ...birthday,
        birthday: birthday.birthday.toISOString(),
      };
      const request = await axios.post<PostBirthdayResponse>(
        "/api/birthdays",
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
    }
  };

  return { getBirthdays, createBirthday };
};
