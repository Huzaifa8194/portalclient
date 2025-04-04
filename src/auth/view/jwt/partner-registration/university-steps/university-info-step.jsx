import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function UniversityInfoStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        University Information
      </Typography>

      <Field.Text name="university_name" label="University Name" required />

      <Field.Select name="university_country" label="University Country & Location" required>
        <MenuItem value="">Select country</MenuItem>
        <MenuItem value="Sweden">Sweden</MenuItem>
        <MenuItem value="Denmark">Denmark</MenuItem>
        <MenuItem value="Norway">Norway</MenuItem>
        <MenuItem value="Finland">Finland</MenuItem>
        <MenuItem value="United Kingdom">United Kingdom</MenuItem>
        <MenuItem value="United States">United States</MenuItem>
        <MenuItem value="Canada">Canada</MenuItem>
        <MenuItem value="Germany">Germany</MenuItem>
        <MenuItem value="France">France</MenuItem>
        <MenuItem value="Spain">Spain</MenuItem>
        <MenuItem value="Italy">Italy</MenuItem>
        <MenuItem value="Netherlands">Netherlands</MenuItem>
        <MenuItem value="Switzerland">Switzerland</MenuItem>
        <MenuItem value="Australia">Australia</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Field.Select>

      {/* Show this field only if "Other" is selected for country */}
      <Field.Text
        name="university_country_other"
        label="Specify Other Country"
        conditional={{
          when: "university_country",
          is: "Other",
        }}
      />

      <Field.Select name="university_type" label="University Type" required>
        <MenuItem value="">Select university type</MenuItem>
        <MenuItem value="Public University">Public University</MenuItem>
        <MenuItem value="Private University">Private University</MenuItem>
        <MenuItem value="Research Institution">Research Institution</MenuItem>
        <MenuItem value="Technical Institute">Technical Institute</MenuItem>
        <MenuItem value="College">College</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Field.Select>

      {/* Show this field only if "Other" is selected for university type */}
      <Field.Text
        name="university_type_other"
        label="Specify Other University Type"
        conditional={{
          when: "university_type",
          is: "Other",
        }}
      />

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        International Student Coordinator
      </Typography>

      <Field.Text name="coordinator_name" label="Name" required />
      <Field.Text name="coordinator_designation" label="Designation" required />
      <Field.Text name="coordinator_email" label="Email" type="email" required />
      <Field.Text name="coordinator_phone" label="Phone Number" required />

      <Field.Select
        name="student_mobility_programs"
        label="Does the university currently have international student mobility programs?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="international_students_enrolled"
        label="Number of international students enrolled per year"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Less than 100">Less than 100</MenuItem>
        <MenuItem value="100-500">100-500</MenuItem>
        <MenuItem value="500-1,000">500-1,000</MenuItem>
        <MenuItem value="More than 1,000">More than 1,000</MenuItem>
      </Field.Select>

      <Field.Select
        name="students_needing_immigration"
        label="Number of international students needs immigration & Relocation Services?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Less than 100">Less than 100</MenuItem>
        <MenuItem value="100-500">100-500</MenuItem>
        <MenuItem value="500-1,000">500-1,000</MenuItem>
        <MenuItem value="More than 1,000">More than 1,000</MenuItem>
      </Field.Select>

      {/* Hidden field to set business_type_id to 7 (University) */}
      <input type="hidden" name="business_type_id" value="7" />
    </Box>
  )
}

