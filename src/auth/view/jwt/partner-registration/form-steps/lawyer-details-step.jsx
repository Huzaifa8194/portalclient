import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function LawyerDetailsStep({ lawyerFields, accreditations }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Lawyer Details
      </Typography>

      <Field.Text name="bar_registration_number" label="Bar Registration Number" />

      <Field.Select name="bar_registration_year" label="Year of Bar Registration">
        <MenuItem value="">Select year</MenuItem>
        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <MenuItem key={year} value={year.toString()}>
            {year}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.CountrySelect
        name="bar_registration_country_id"
        label="Bar Registration Country"
        placeholder="Choose a country"
      />

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Lawyer Field (Select all that apply)
      </Typography>
      <Field.MultiSelect
        name="lawyer_fields"
        label="Select lawyer fields"
        options={lawyerFields.map((field) => ({
          value: field.id.toString(),
          label: field.name,
        }))}
      />

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Accreditation / Memberships (Select all that apply)
      </Typography>
      <Field.MultiSelect
        name="accreditations"
        label="Select accreditations"
        options={accreditations.map((accred) => ({
          value: accred.id.toString(),
          label: accred.name,
        }))}
      />
    </Box>
  )
}

