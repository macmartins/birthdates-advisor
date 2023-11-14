import axios from "axios";
import { useAppDispatch } from "../store";
import CountryAPI from "../types/Country";
import {
  setCountries,
  setIsCountriesLoading,
} from "../store/countries/countrySlice";
import { BASE_URL } from "../constants/services";

export const useCountriesAPI = () => {
  const dispatch = useAppDispatch();

  const getCountries = () => {
    dispatch(setIsCountriesLoading(true));
    axios
      .get(BASE_URL + "countries")
      .then(async (response: { data: { result: CountryAPI[] } }) => {
        dispatch(setCountries(response.data.result));
      })
      .catch((error) => console.error("Error fetching countries: " + error))
      .finally(() => dispatch(setIsCountriesLoading(false)));
  };

  return { getCountries };
};
