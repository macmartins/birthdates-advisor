import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import CountryAPI from "../../types/Country";

export interface CountriesState {
  data: CountryAPI[];
}

const initialState: CountriesState = {
  data: [],
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<CountryAPI[]>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountries } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.data;

export default countriesSlice.reducer;
