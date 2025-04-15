"use client"

import { Box, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function BasicInfoStep({ partnerTypes }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="business_type_id" label="Partner Type" required>
        <MenuItem value="">Select partner type</MenuItem>
        {partnerTypes.map((type) => (
          <MenuItem key={type.id} value={type.id.toString()}>
            {type.name}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Text name="name" label="Full Name / Company Name" required />

      <Field.Text name="website" label="Website / Professional Profile" />

      <Field.Text name="email" label="Email Address" type="email" required />

      <Field.Phone
        name="contact_number"
        label="Phone Number"
        placeholder="+1234567890"
        helperText="Must start with + followed by 7-14 digits"
        required
      />
    </Box>
  )
}
