import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function CBIStep({ handlesCBI, cbiPrograms }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Citizenship by Investment (CBI) Experience
      </Typography>

      <Field.RadioGroup
        name="handles_cbi"
        label="Can you handle Citizenship by Investment (CBI) applications?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      {handlesCBI === "Yes" && (
        <>
          <Field.Text
            name="cbi_applications"
            label="How many CBI applications have you handled so far?"
            type="number"
            inputProps={{ min: 0 }}
            required
          />

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Which CBI programs do you specialize in? (Select all that apply)
          </Typography>
          <Field.MultiSelect
            name="cbi_program_specialize"
            label="Select CBI programs"
            options={cbiPrograms.map((program) => ({
              value: program.id.toString(),
              label: program.name,
            }))}
          />
        </>
      )}
    </Box>
  )
}

