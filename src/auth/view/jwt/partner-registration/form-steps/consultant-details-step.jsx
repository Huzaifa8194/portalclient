import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function ConsultantDetailsStep({ accreditations, countries }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Immigration Consultant Details
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Accreditation / Certification
      </Typography>
      <Field.MultiSelect
        name="accreditation_certification"
        label="Select accreditations"
        options={accreditations.slice(0, 6).map((accred) => ({
          value: accred.id.toString(),
          label: accred.name,
        }))}
      />

      <Field.Select name="immigration_exp_handling_cases" label="Experience in Handling Immigration Cases" required>
        <MenuItem value="">Select experience level</MenuItem>
        <MenuItem value="3-5 years">3-5 years</MenuItem>
        <MenuItem value="5-10 years">5-10 years</MenuItem>
        <MenuItem value="10+ years">10+ years</MenuItem>
      </Field.Select>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Which Countries Immigration Processes Can You Handle?
      </Typography>
      <Field.MultiSelect
        name="immigration_countries"
        label="Select countries"
        options={countries.map((country) => ({
          value: country.id.toString(),
          label: country.name,
        }))}
      />
    </Box>
  )
}

