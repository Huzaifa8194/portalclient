"use client"

import {
  Box,
  Typography,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material"
import { Field } from "src/components/hook-form"
import { useFormContext } from "react-hook-form"

// Define the service options
const SERVICE_OPTIONS = [
  { value: "1", label: "Pre-arrival consultation" },
  { value: "2", label: "Visa & residence permit application assistance" },
  { value: "3", label: "Housing search & rental contract negotiation" },
  { value: "4", label: "Airport pickup & transport assistance" },
  { value: "5", label: "Personal identification number (Personnummer) & Skatteverket registration" },
  { value: "6", label: "Banking, insurance & financial setup guidance" },
  { value: "7", label: "Internship & career transition support" },
  { value: "8", label: "Cultural adaptation & integration assistance" },
  { value: "9", label: "Other" },
]

export function PartnershipScopeStep() {
  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext()

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select
        name="uni_inter_student_via_us"
        label="Would the university like to receive international students through Sweden Relocators?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <FormControl fullWidth error={Boolean(errors.uni_services_via_us)}>
        <InputLabel id="services-label">
          What services would you like Sweden Relocators to provide? (Select all that apply)
        </InputLabel>
        <Select
          labelId="services-label"
          multiple
          value={watch("uni_services_via_us") || []}
          onChange={(event) => {
            setValue("uni_services_via_us", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
            trigger("uni_services_via_us")
          }}
          input={
            <OutlinedInput label="What services would you like Sweden Relocators to provide? (Select all that apply)" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const option = SERVICE_OPTIONS.find((opt) => opt.value === value)
                return (
                  <Chip
                    key={value}
                    label={option ? option.label : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation()
                      const newValue = watch("uni_services_via_us").filter((item) => item !== value)
                      setValue("uni_services_via_us", newValue, {
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
          {SERVICE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors.uni_services_via_us && <FormHelperText>Please select at least one service</FormHelperText>}
      </FormControl>

      <Field.Select
        name="uni_tailored_student_package"
        label="Does the university require tailored student relocation packages?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_integrate_relocators_services"
        label="Would the university like to integrate Sweden Relocators' services with its international office operations?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select name="collaboration_id" label="Preferred collaboration model" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="1">Direct student referrals to Sweden Relocators</MenuItem>
        <MenuItem value="2">University-sponsored student relocation packages</MenuItem>
        <MenuItem value="3">Discounted relocation services for students</MenuItem>
        <MenuItem value="4">Subscription-based service model</MenuItem>
      </Field.Select>
    </Box>
  )
}
