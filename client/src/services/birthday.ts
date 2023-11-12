import axios from "axios";
import { BirthdayAPI } from "../types/Birthday";
import { useAppDispatch } from "../store";
import { setBirthdays } from "../store/birthdays/birthdaysSlice";

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

  return { getBirthdays };
};
