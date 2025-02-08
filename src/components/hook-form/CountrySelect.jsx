import { Autocomplete, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

export function CountrySelect({
  name,
  label,
  placeholder,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
  ...other
}) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          renderOption={renderOption}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
          onChange={(_, newValue) => {
            field.onChange(newValue)
          }}
          {...other}
        />
      )}
    />
  )
}

