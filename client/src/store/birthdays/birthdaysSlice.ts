import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BirthdayAPI } from "../../types/Birthday";
import { RootState } from "..";

export interface BirthdaysState {
  data: BirthdayAPI[];
}

const initialState: BirthdaysState = {
  data: [],
};

export const birthdaysSlice = createSlice({
  name: "birthdays",
  initialState,
  reducers: {
    setBirthdays: (state, action: PayloadAction<BirthdayAPI[]>) => {
      state.data = action.payload;
    },
    addBirthday: (state, action: PayloadAction<BirthdayAPI>) => {
      state.data.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBirthday, setBirthdays } = birthdaysSlice.actions;

export const selectBirthdays = (state: RootState) => state.birthdays.data;

export default birthdaysSlice.reducer;
