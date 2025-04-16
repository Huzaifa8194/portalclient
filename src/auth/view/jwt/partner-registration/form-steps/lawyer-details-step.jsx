"use client"

import {
  Box,
  MenuItem,
  FormControl,
  Avatar,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  FormHelperText,
} from "@mui/material"
import { Field } from "src/components/hook-form"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

const getCountryFlagUrl = (country) => {
  if (!country || !country.code) {
    return null // Return null if country or code is missing
  }
  return `https://flagcdn.com/w20/${country.code.toLowerCase()}.png`
}

export function LawyerDetailsStep({ lawyerFields, accreditations, countries }) {
  const methods = useFormContext()
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = methods

  // Watch the is_accreditations field to conditionally show the accreditations selector
  const hasAccreditations = watch("is_accreditations") === "Yes"

  // Reset accreditations when "No" is selected
  useEffect(() => {
    if (!hasAccreditations) {
      setValue("accreditations", [])
    }
  }, [hasAccreditations, setValue])

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
  
      <FormControl fullWidth error={Boolean(errors.lawyer_fields)}>
          <InputLabel id="lawyer-fields-label">Lawyer Field (Select all that apply)</InputLabel>
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
            input={<OutlinedInput label="Lawyer Field (Select all that apply)" />}
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
      <Field.Select name="is_accreditations" label="Did you have any accreditations?" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>



      {hasAccreditations && (
        <FormControl fullWidth error={Boolean(errors.accreditations)}>
          <InputLabel id="accreditations-label">Accreditation / Memberships (Select all that apply)</InputLabel>
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
            input={<OutlinedInput label="Accreditation / Memberships (Select all that apply)" />}
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
      )}
    </Box>
  )
}
