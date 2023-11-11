import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { FormikErrors, FormikTouched } from "formik";

interface Props {
  label: string;
  name: string;
  value: Date;
  setFieldValue: (field: string, value: Date | null) => void;
  isTouched?: FormikTouched<Date>;
  error?: FormikErrors<Date>;
  handleBlur: (e: React.FocusEvent<unknown, Element>) => void;
  setTouched: (obj: Record<string, boolean>) => void;
}

export const DatePicker = ({
  label,
  value,
  setFieldValue,
  isTouched,
  error,
  name,
  handleBlur,
  setTouched,
}: Props) => (
  <MuiDatePicker
    disableFuture
    label={label}
    value={value}
    format="dd/MM/yyyy"
    onChange={(value) => setFieldValue(name, value)}
    slotProps={{
      textField: {
        error: isTouched ? Boolean(error) : false,
        onBlur: (e) => {
          setTouched({
            [name]: true,
          });
          handleBlur(e);
        },
        helperText: isTouched && <>{error}</>,
      },
    }}
  />
);
