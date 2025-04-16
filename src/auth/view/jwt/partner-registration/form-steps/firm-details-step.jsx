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
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { Field } from "src/components/hook-form"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useFormContext } from "react-hook-form"

const getCountryFlagUrl = (country) => {
  if (!country || !country.code) {
    return null // Return null if country or code is missing
  }
  return `https://flagcdn.com/w20/${country.code.toLowerCase()}.png`
}

export function FirmDetailsStep({ countries, accreditations }) {
  // State to store company types from API - explicitly set as empty array
  const [companyTypes, setCompanyTypes] = useState([])
  const [loading, setLoading] = useState(true)
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

  // Fetch company types from API
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const response = await fetch("https://api.swedenrelocators.se/api/miscellaneous/companyTypes")
        if (!response.ok) {
          throw new Error("Failed to fetch company types")
        }
        const data = await response.json()

        // Check if data is an array, otherwise look for data property that might contain the array
        if (Array.isArray(data)) {
          setCompanyTypes(data)
        } else if (data && typeof data === "object") {
          // If data is an object, try to find an array property
          // Common API patterns include data.data, data.results, data.items, etc.
          const arrayData = data.data || data.results || data.items || data.companyTypes || []
          setCompanyTypes(Array.isArray(arrayData) ? arrayData : [])
        } else {
          // Fallback to empty array
          setCompanyTypes([])
        }
      } catch (error) {
        console.error("Error fetching company types:", error)
        setCompanyTypes([]) // Ensure it's an empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyTypes()
  }, [])

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="company_type_id" label="Company Legal Structure" required>
        <MenuItem value="">Select company structure</MenuItem>
        {Array.isArray(companyTypes) &&
          companyTypes.map((type) => (
            <MenuItem key={type.id} value={type.id.toString()}>
              {type.name}
            </MenuItem>
          ))}
      </Field.Select>

      <Field.Select name="company_industry_sector" label="Industry / Sector" required>
        <MenuItem value="">Select industry</MenuItem>
        <MenuItem value="Legal Services">Legal Services</MenuItem>
        <MenuItem value="Immigration Consulting">Immigration Consulting</MenuItem>
        <MenuItem value="HR & Payroll">HR & Payroll</MenuItem>
        <MenuItem value="Real Estate & Housing">Real Estate & Housing</MenuItem>
        <MenuItem value="Logistics & Relocation">Logistics & Relocation</MenuItem>
        <MenuItem value="Financial Services">Financial Services</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Field.Select>

      <Field.Select name="company_no_of_employees" label="Number of Employees" required>
        <MenuItem value="">Select number of employees</MenuItem>
        <MenuItem value="1-10">1-10</MenuItem>
        <MenuItem value="11-50">11-50</MenuItem>
        <MenuItem value="51-100">51-100</MenuItem>
        <MenuItem value="101-500">101-500</MenuItem>
        <MenuItem value="500+">500+</MenuItem>
      </Field.Select>

      {/* Add the is_accreditations field */}
      <FormControl component="fieldset">
        <Typography variant="subtitle1" gutterBottom>
          Did you have any accreditations?
        </Typography>
        <RadioGroup
          row
          name="is_accreditations"
          value={watch("is_accreditations") || "No"}
          onChange={(e) => {
            setValue("is_accreditations", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
          }}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {/* Only show accreditations selector if "Yes" is selected */}
      {hasAccreditations && (
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
            {accreditations &&
              accreditations.map((accred) => (
                <MenuItem key={accred.id} value={accred.id.toString()}>
                  {accred.name}
                </MenuItem>
              ))}
          </Select>
          {errors.accreditations && <FormHelperText>Please select at least one accreditation</FormHelperText>}
        </FormControl>
      )}

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

      {/* Changed from RadioGroup to Select */}
      <Field.Select name="company_eor" label="Do you provide Employer of Record (EOR) & Payroll Services?" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      {/* Changed from RadioGroup to Select */}
      <Field.Select name="company_hr_services" label="Do you offer HR & Compliance Services?" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      {/* Changed from RadioGroup to Select */}
      <Field.Select
        name="company_specialize_business_immigration"
        label="Do you specialize in Corporate & Business Immigration?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Text name="company_registration_no" label="Registration Number / Business License" required />

      {/* Using Field.DatePicker as requested */}
      <Field.DatePicker
        name="company_registration_date"
        label="Registration Date"
        format="YYYY/MM/DD"
        maxDate={dayjs()}
        error={Boolean(methods.formState.errors.company_registration_date)}
        helperText={methods.formState.errors.company_registration_date?.message}
        required
      />

      <Field.Text name="company_business_code" label="Business Code" required />
    </Box>
  )
}
