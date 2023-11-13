import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import CountryAPI from "../../types/Country";

export interface CountriesState {
  data: CountryAPI[];
  isLoading: boolean;
}

const initialState: CountriesState = {
  data: [],
  isLoading: false,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<CountryAPI[]>) => {
      state.data = action.payload;
    },
    setIsCountriesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountries, setIsCountriesLoading } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.data;
export const selectIsCountriesLoading = (state: RootState) =>
  state.countries.isLoading;

export default countriesSlice.reducer;
