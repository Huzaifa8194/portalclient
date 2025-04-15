import { Box } from "@mui/material"
import { Field } from "src/components/hook-form"

export function FreelancerDetailsStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.RadioGroup
        name="self_accreditation_or_experience"
        label="Do you have official accreditation or experience in any immigration system?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />
    </Box>
  )
}
