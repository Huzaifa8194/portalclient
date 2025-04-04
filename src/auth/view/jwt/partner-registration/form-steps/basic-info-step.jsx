"use client"

import { Box, MenuItem, IconButton, InputAdornment } from "@mui/material"
import { Field } from "src/components/hook-form"
import { Iconify } from "src/components/iconify"

export function BasicInfoStep({ partnerTypes, password }) {
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

      <Field.Text name="email" label="Email Address" type="email" required />

      <Field.Phone
        name="contact_number"
        label="Phone Number"
        placeholder="+1234567890"
        helperText="Must start with + followed by 7-14 digits"
        required
      />
      <Field.Text
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
      <Field.Text
        name="password_confirmation"
        label="Confirm Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
    </Box>
  )
}

