import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function PreArrivalSupportStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Pre-Arrival & Onboarding Support for International Students
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        What are the biggest challenges international students face at the university?
      </Typography>
      <Field.MultiSelect
        name="student_challenges"
        label="Select challenges"
        options={[
          { value: "Visa & immigration processing delays", label: "Visa & immigration processing delays" },
          { value: "Finding secure housing before arrival", label: "Finding secure housing before arrival" },
          { value: "Limited banking & financial support", label: "Limited banking & financial support" },
          { value: "Language & cultural adaptation", label: "Language & cultural adaptation" },
          { value: "Lack of career transition assistance", label: "Lack of career transition assistance" },
          { value: "Other", label: "Other" },
        ]}
      />

      {/* Show this field only if "Other" is selected for challenges */}
      <Field.Text
        name="student_challenges_other"
        label="Specify Other Challenges"
        conditional={{
          when: "student_challenges",
          contains: "Other",
        }}
      />

      <Field.Select name="university_housing" label="Does the university offer its own student housing?" required>
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes, fully available">Yes, fully available</MenuItem>
        <MenuItem value="Yes, but limited">Yes, but limited</MenuItem>
        <MenuItem value="No, students must find private housing">No, students must find private housing</MenuItem>
      </Field.Select>

      <Field.Select
        name="integrate_relocators_housing"
        label="Would the university be interested in integrating Sweden Relocators' housing solutions for international students?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="financial_aid_for_relocation"
        label="Does the university provide financial aid for international students' relocation?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
        <MenuItem value="Partially">Partially</MenuItem>
      </Field.Select>
    </Box>
  )
}

