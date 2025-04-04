import { Box, Typography, Paper } from "@mui/material"
import { Field } from "src/components/hook-form"

export function ReviewStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Review & Submit
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Please review your information before submitting
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Make sure all required fields are completed and your documentation is attached.
        </Typography>
      </Paper>

      <Field.Checkbox
        name="is_term_accepted"
        label="By submitting this form, you agree to abide by the terms and conditions of our Partner Program."
        required
      />
    </Box>
  )
}

