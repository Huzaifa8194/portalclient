"use client"

import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  FormHelperText,
} from "@mui/material"
import { Field } from "src/components/hook-form"
import { useFormContext } from "react-hook-form"

export function LawyerDetailsStep({ lawyerFields, accreditations }) {
  const methods = useFormContext()
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = methods

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="bar_registration_number" label="Bar Registration Number" />

      <Field.Select name="bar_registration_year" label="Year of Bar Registration">
        <MenuItem value="">Select year</MenuItem>
        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <MenuItem key={year} value={year.toString()}>
            {year}
          </MenuItem>
        ))}
      </Field.Select>

      {/* Fix for Autocomplete warning - add isOptionEqualToValue prop */}
      <Field.CountrySelect
        name="bar_registration_country_id"
        label="Bar Registration Country"
        placeholder="Choose a country"
        isOptionEqualToValue={(option, value) => {
          // Handle empty string case
          if (value === "") return false
          // Handle the case where value is an ID string and option has an id property
          if (typeof value === "string" && option && option.id) {
            return option.id.toString() === value
          }
          // Default comparison
          return option === value
        }}
      />

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Lawyer Field (Select all that apply)
      </Typography>

      <FormControl fullWidth error={Boolean(errors.lawyer_fields)}>
        <InputLabel id="lawyer-fields-label">Select lawyer fields</InputLabel>
        <Select
          labelId="lawyer-fields-label"
          multiple
          name="lawyer_fields"
          value={watch("lawyer_fields") || []}
          onChange={(event) => {
            setValue("lawyer_fields", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
            trigger("lawyer_fields")
          }}
          input={<OutlinedInput label="Select lawyer fields" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const option = lawyerFields.find((field) => field.id.toString() === value)
                return (
                  <Chip
                    key={value}
                    label={option ? option.name : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation()
                      const newValue = watch("lawyer_fields").filter((item) => item !== value)
                      setValue("lawyer_fields", newValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation()
                    }}
                  />
                )
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          {lawyerFields.map((field) => (
            <MenuItem key={field.id} value={field.id.toString()}>
              {field.name}
            </MenuItem>
          ))}
        </Select>
        {errors.lawyer_fields && <FormHelperText>Please select at least one field</FormHelperText>}
      </FormControl>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Accreditation / Memberships (Select all that apply)
      </Typography>

      <FormControl fullWidth error={Boolean(errors.accreditations)}>
        <InputLabel id="accreditations-label">Select accreditations</InputLabel>
        <Select
          labelId="accreditations-label"
          multiple
          name="accreditations"
          value={watch("accreditations") || []}
          onChange={(event) => {
            setValue("accreditations", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
            trigger("accreditations")
          }}
          input={<OutlinedInput label="Select accreditations" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const option = accreditations.find((accred) => accred.id.toString() === value)
                return (
                  <Chip
                    key={value}
                    label={option ? option.name : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation()
                      const newValue = watch("accreditations").filter((item) => item !== value)
                      setValue("accreditations", newValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation()
                    }}
                  />
                )
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          {accreditations.map((accred) => (
            <MenuItem key={accred.id} value={accred.id.toString()}>
              {accred.name}
            </MenuItem>
          ))}
        </Select>
        {errors.accreditations && <FormHelperText>Please select at least one accreditation</FormHelperText>}
      </FormControl>
    </Box>
  )
}
