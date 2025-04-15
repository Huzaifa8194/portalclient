"use client"

import { Box, Typography, Paper, IconButton, InputAdornment } from "@mui/material"
import { Field } from "src/components/hook-form"
import { Iconify } from "src/components/iconify"

export function ReviewStep({ password }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      
      <Box gap={3} display="flex" flexDirection="column">
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
