"use client"

import { Box } from "@mui/material"
import { Field } from "src/components/hook-form"

export function AddressInfoStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="address" label="Address / Office Location" required />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Field.Text name="city" label="City" required />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Field.Text name="postal_code" label="Postal Code" required />
        </Box>
      </Box>

      <Field.CountrySelect
        name="country_id"
        label="Country of Residence / Business Operation"
        placeholder="Choose a country"
        required
      />
    </Box>
  )
}
