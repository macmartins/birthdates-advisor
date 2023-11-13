import axios from "axios";
import { useAppDispatch } from "../store";
import CountryAPI from "../types/Country";
import { setCountries } from "../store/countries/countrySlice";

export const useCountriesAPI = () => {
  const dispatch = useAppDispatch();

  const getCountries = () => {
    axios
      .get("/api/countries")
      .then((response: { data: { result: CountryAPI[] } }) => {
        dispatch(setCountries(response.data.result));
      })
      .catch((error) => console.error("Error fetching countries: " + error));
  };

  return { getCountries };
};
