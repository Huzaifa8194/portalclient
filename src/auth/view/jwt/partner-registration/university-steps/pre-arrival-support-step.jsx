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

// Define the challenges options
const CHALLENGES_OPTIONS = [
  { value: "1", label: "Visa & immigration processing delays" },
  { value: "2", label: "Finding secure housing before arrival" },
  { value: "3", label: "Limited banking & financial support" },
  { value: "4", label: "Language & cultural adaptation" },
  { value: "5", label: "Lack of career transition assistance" },
  { value: "6", label: "Other" },
]

export function PreArrivalSupportStep() {
  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext()

  return (
    <Box gap={3} display="flex" flexDirection="column">


      <FormControl fullWidth error={Boolean(errors.uni_challenges_intl_student)}>
        <InputLabel id="challenges-label">
        What are the biggest challenges international students face at the university?
        </InputLabel>
        <Select
          labelId="challenges-label"
          multiple
          value={watch("uni_challenges_intl_student") || []}
          onChange={(event) => {
            setValue("uni_challenges_intl_student", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
            trigger("uni_challenges_intl_student")
          }}
          input={<OutlinedInput label="What are the biggest challenges international students face at the university?" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const option = CHALLENGES_OPTIONS.find((opt) => opt.value === value)
                return (
                  <Chip
                    key={value}
                    label={option ? option.label : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation()
                      const newValue = watch("uni_challenges_intl_student").filter((item) => item !== value)
                      setValue("uni_challenges_intl_student", newValue, {
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
          {CHALLENGES_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors.uni_challenges_intl_student && <FormHelperText>Please select at least one challenge</FormHelperText>}
      </FormControl>

      <Field.Select name="uni_offer_housing" label="Does the university offer its own student housing?" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes, fully available">Yes, fully available</MenuItem>
        <MenuItem value="Yes, but limited">Yes, but limited</MenuItem>
        <MenuItem value="No, students must find private housing">No, students must find private housing</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_integrate_relocators_housing_services"
        label="Would the university be interested in integrating Sweden Relocators' housing solutions for international students?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="financial_aid_for_relocation"
        label="Does the university provide financial aid for international students' relocation?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
        <MenuItem value="Partially">Partially</MenuItem>
      </Field.Select>
    </Box>
  )
}
