import * as Yup from "yup";
import { InferType } from "yup";
import { TFunction } from "i18next";

export const ValidationSchema = (t: TFunction<"translation", undefined>) =>
  Yup.object({
    name: Yup.string().required(t("name") + t("required")),
    surname: Yup.string().required(t("surname") + t("required")),
    country: Yup.string().required(t("country") + t("required")),
    birthday: Yup.date()
      .required(t("birthday") + t("required"))
      .typeError(t("invalidDate"))
      .max(new Date(), t("maxDate")),
  });

export type Schema = InferType<ReturnType<typeof ValidationSchema>>;
