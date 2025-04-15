import { Box, MenuItem, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function UniversityInfoStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="name" label="University Name" required />

      <Field.CountrySelect
        name="country_id"
        label="University Country & Location"
        placeholder="Choose a country"
        required
      />

      <Field.Select name="university_type_id" label="University Type" required>
        <MenuItem value="">Select university type</MenuItem>
        <MenuItem value="1">Public University</MenuItem>
        <MenuItem value="2">Private University</MenuItem>
        <MenuItem value="3">Research Institution</MenuItem>
        <MenuItem value="4">Technical Institute</MenuItem>
        <MenuItem value="5">College</MenuItem>
        <MenuItem value="6">Other (Specify)</MenuItem>
      </Field.Select>
      <Field.Text name="uni_sc_person_name" label="Coordinator Name" required />

      <Field.Text name="uni_sc_person_designation" label="Coordinator Designation" required />

      <Field.Text name="uni_sc_person_email" label="Coordinator Email" type="email" required />

      <Field.Phone
        name="uni_sc_person_phone"
        label="Coordinator Phone Number"
        placeholder="+1234567890"
        helperText="Must start with + followed by 7-14 digits"
        required
      />

      <Field.Select
        name="uni_student_mobility_programs"
        label="Does the university currently have international student mobility programs?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_no_of_international_students_enrolled"
        label="Number of international students enrolled per year"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Less than 100">Less than 100</MenuItem>
        <MenuItem value="100-500">100-500</MenuItem>
        <MenuItem value="500-1000">500-1,000</MenuItem>
        <MenuItem value="More than 1000">More than 1,000</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_no_of_international_students_needs_immgration"
        label="Number of international students needs immigration & Relocation Services?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Less than 100">Less than 100</MenuItem>
        <MenuItem value="100-500">100-500</MenuItem>
        <MenuItem value="500-1000">500-1,000</MenuItem>
        <MenuItem value="More than 1000">More than 1,000</MenuItem>
      </Field.Select>
    </Box>
  )
}
