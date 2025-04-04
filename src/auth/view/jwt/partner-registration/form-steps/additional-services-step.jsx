import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function AdditionalServicesStep({ applicationTypes, additionalServices }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Additional Relocation & Immigration Services
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Types of Applications You Specialize In (Select all that apply)
      </Typography>
      <Field.MultiSelect
        name="application_specialize"
        label="Select application types"
        options={applicationTypes.map((type) => ({
          value: type.id.toString(),
          label: type.name,
        }))}
      />

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Which additional services can you provide in the countries you handle? (Select all that apply)
      </Typography>
      <Field.MultiSelect
        name="additional_services"
        label="Select additional services"
        options={additionalServices.map((service) => ({
          value: service.id.toString(),
          label: service.name,
        }))}
      />
    </Box>
  )
}

