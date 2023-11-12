import * as Yup from "yup";
import {
  INVALID_DATE,
  MAX_DATE,
  REQUIRED_BIRTHDAY,
  REQUIRED_COUNTRY,
  REQUIRED_NAME,
  REQUIRED_SURNAME,
} from "../constants/validation";
import { InferType } from "yup";

export const ValidationSchema = Yup.object({
  name: Yup.string().required(REQUIRED_NAME),
  surname: Yup.string().required(REQUIRED_SURNAME),
  country: Yup.string().required(REQUIRED_COUNTRY),
  birthday: Yup.date()
    .required(REQUIRED_BIRTHDAY)
    .typeError(INVALID_DATE)
    .max(new Date(), MAX_DATE),
});

export type Schema = InferType<typeof ValidationSchema>;
