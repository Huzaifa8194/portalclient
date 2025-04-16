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
  Avatar,
} from "@mui/material"
import { Field } from "src/components/hook-form"
import { useFormContext } from "react-hook-form"

export function FreelancerDetailsStep({ countries }) {
  const methods = useFormContext()
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = methods

  // Helper function to safely get country flag URL
  const getCountryFlagUrl = (country) => {
    if (!country || !country.code) {
      return null // Return null if country or code is missing
    }
    return `https://flagcdn.com/w20/${country.code.toLowerCase()}.png`
  }

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.RadioGroup
        name="self_accreditation_or_experience"
        label="Do you have official accreditation or experience in any immigration system?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.Select name="immigration_exp_handling_cases" label="Experience in Handling Immigration Cases" required>
        <MenuItem value="">Select experience level</MenuItem>
        <MenuItem value="3-5 years">3-5 years</MenuItem>
        <MenuItem value="5-10 years">5-10 years</MenuItem>
        <MenuItem value="10+ years">10+ years</MenuItem>
      </Field.Select>

      <FormControl fullWidth error={Boolean(errors.immigration_countries)}>
        <InputLabel id="countries-label">Which Countries Immigration Processes Can You Handle?</InputLabel>
        <Select
          labelId="countries-label"
          multiple
          name="immigration_countries"
          value={watch("immigration_countries") || []}
          onChange={(event) => {
            setValue("immigration_countries", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
            trigger("immigration_countries")
          }}
          input={<OutlinedInput label="Which Countries Immigration Processes Can You Handle?" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const country = countries.find((c) => c.id.toString() === value)
                const flagUrl = getCountryFlagUrl(country)

                return (
                  <Chip
                    key={value}
                    avatar={
                      flagUrl ? (
                        <Avatar src={flagUrl} alt={country?.name || "Country"} sx={{ width: 24, height: 24 }} />
                      ) : undefined
                    }
                    label={country ? country.name : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation()
                      const newValue = watch("immigration_countries").filter((item) => item !== value)
                      setValue("immigration_countries", newValue, {
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
                maxHeight: 300,
                width: 250,
              },
            },
          }}
        >
          {countries.map((country) => {
            const flagUrl = getCountryFlagUrl(country)

            return (
              <MenuItem key={country.id} value={country.id.toString()}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {flagUrl && (
                    <img
                      src={flagUrl || "/placeholder.svg"}
                      alt={country.name || "Country"}
                      style={{ width: 16, height: 12, marginRight: 8 }}
                    />
                  )}
                  {country.name}
                </Box>
              </MenuItem>
            )
          })}
        </Select>
        {errors.immigration_countries && <FormHelperText>Please select at least one country</FormHelperText>}
      </FormControl>
    </Box>
  )
}
