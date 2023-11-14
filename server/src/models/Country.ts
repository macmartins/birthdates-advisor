import { Schema, model } from "mongoose";

interface ICountry {
  name: {
    common: string;
  };
}

const CountrySchema = new Schema<ICountry>({
  name: {
    common: {
      type: String,
      required: true,
    },
  },
});

export default model("Country", CountrySchema);
