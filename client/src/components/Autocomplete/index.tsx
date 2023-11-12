import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import SelectOption from "../../types/SelectOption";
import { FormikErrors } from "formik";

interface Props {
  options: SelectOption[];
  value: string;
  setFieldValue: (field: string, value?: string) => void;
  handleBlur: (e: React.FocusEvent<unknown, Element>) => void;
  label: string;
  isTouched?: boolean;
  error?: FormikErrors<string>;
  name: string;
}

const Autocomplete = ({
  options,
  value,
  name,
  setFieldValue,
  handleBlur,
  label,
  isTouched,
  error,
}: Props) => {
  const optionValue = useMemo(() => {
    const option = options.find((option) => option.value === value);
    return option ? option : null;
  }, [value, options]);

  return (
    <MUIAutocomplete
      fullWidth
      id={name}
      value={optionValue}
      onChange={(e, newValue) => setFieldValue(name, newValue?.value)}
      onBlur={handleBlur}
      options={options}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.value;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={isTouched ? Boolean(error) : false}
          helperText={isTouched && error}
        />
      )}
    />
  );
};

export default Autocomplete;
