import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function PartnershipTermsStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">


      <Field.Text
        name="uni_key_expectations"
        label="What are the university's key expectations from this partnership?"
        multiline
        rows={4}
        required
      />

      <Field.DatePicker name="uni_preferred_state_date" label="Preferred start date for collaboration" required  format="YYYY/MM/DD"
      />
    </Box>
  )
}
