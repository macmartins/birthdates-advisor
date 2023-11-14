import { Schema, model } from "mongoose";

interface ICountry {
  name: {
    common: string;
  };
}

const CountrySchema = new Schema<ICountry>({
  name: {
    common: String,
  },
});

export default model("Country", CountrySchema);
