import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function AgreementSubmissionStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Agreement & Submission
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        By submitting this form, the university agrees to explore collaboration opportunities with Sweden Relocators and
        acknowledges the terms of service for student relocation support.
      </Typography>

      <Field.Checkbox name="terms_accepted" label="I agree to the terms and conditions of this partnership." required />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Thank you for submitting your request. We will review it and respond within 72 hours if any additional
        information is required. Otherwise, we will provide you with login credentials, giving you seamless access to
        manage the digital profiles of students referred by Sweden Relocators.
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        You can also ask your students to register on our website or through our mobile app as individuals, and we will
        automatically link their profiles to your account. Additionally, you have the flexibility to create student
        profiles yourself for those who require assistance, and we will handle the rest.
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        With our one-window relocation and immigration solution, you can effortlessly manage the entire student
        journey—from profile creation and visa support to accommodation and settlement—through a single, user-friendly
        platform. This ensures a smooth, efficient, and hassle-free experience for both you and your students.
      </Typography>
    </Box>
  )
}

