import { Box, MenuItem, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function ComplianceStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">

      <Field.Select
        name="uni_gdpr_compliant_policies"
        label="Does the university have GDPR-compliant policies for sharing student data with authorized service providers?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_barriers_external_relocators"
        label="Are there any administrative barriers for external relocation services assisting international students?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_formal_mou"
        label="Would the university prefer a formal MoU (Memorandum of Understanding) for partnership?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>
    </Box>
  )
}
