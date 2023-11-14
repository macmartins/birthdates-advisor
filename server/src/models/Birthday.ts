import { Schema, model } from "mongoose";

export interface IBirthday {
  name: string;
  surname: string;
  country: string;
  birthday: string;
}

const BirthdaySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
});

export default model<IBirthday>("Birthday", BirthdaySchema);
