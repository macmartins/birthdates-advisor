import { Schema, model } from "mongoose";

export interface IBirthday {
  name: string;
  surname: string;
  country: string;
  birthday: Date;
}

const BirthdaySchema = new Schema<IBirthday>({
  name: String,
  surname: String,
  country: String,
  birthday: Date,
});

export default model<IBirthday>("Birthday", BirthdaySchema);
