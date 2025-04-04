import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function ComplianceStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Compliance & Legal Considerations
      </Typography>

      <Field.Select
        name="gdpr_compliant_policies"
        label="Does the university have GDPR-compliant policies for sharing student data with authorized service providers?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="administrative_barriers"
        label="Are there any administrative barriers for external relocation services assisting international students?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="formal_mou"
        label="Would the university prefer a formal MoU (Memorandum of Understanding) for partnership?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>
    </Box>
  )
}

