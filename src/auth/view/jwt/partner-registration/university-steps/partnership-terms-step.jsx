import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function PartnershipTermsStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Partnership Terms & Next Steps
      </Typography>

      <Field.Text
        name="uni_key_expectations"
        label="What are the university's key expectations from this partnership?"
        multiline
        rows={4}
        required
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Primary contact for partnership coordination:
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Same as International Student Coordinator or provide different contact details below
      </Typography>

      <Field.DatePicker name="uni_preferred_state_date" label="Preferred start date for collaboration" required />
    </Box>
  )
}
