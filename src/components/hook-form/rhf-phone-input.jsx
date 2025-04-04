"use client"

import { Controller, useFormContext } from "react-hook-form"

import { PhoneInput } from "../phone-input"

// ----------------------------------------------------------------------

export function RHFPhoneInput({ name, helperText, ...other }) {
  const { control, setValue } = useFormContext()

  // Function to ensure phone number has proper country code
  const handlePhoneChange = (newValue, onChange) => {
    // Update the form value
    setValue(name, newValue, { shouldValidate: true })

    // Also call the original onChange if provided
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <PhoneInput
          {...field}
          fullWidth
          value={field.value}
          onChange={(newValue) => handlePhoneChange(newValue, field.onChange)}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}

