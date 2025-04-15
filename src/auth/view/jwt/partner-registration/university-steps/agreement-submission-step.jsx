"use client"

import { Box, Checkbox, FormControlLabel, Typography, FormHelperText, InputAdornment, IconButton } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { Field } from "src/components/hook-form"
import { Iconify } from "src/components/iconify"

export function AgreementSubmissionStep({ password }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const termsError = errors?.is_term_accepted

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Agreement & Submission
      </Typography>

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

      <Typography variant="body1" paragraph>
        By submitting this form, the university agrees to explore collaboration opportunities with Sweden Relocators and
        acknowledges the terms of service for student relocation support.
      </Typography>

      <FormControlLabel
        control={<Checkbox {...register("is_term_accepted", { required: true })} />}
        label="I agree to the terms and conditions of this partnership."
      />
      {termsError && <FormHelperText error>You must accept the terms and conditions to proceed</FormHelperText>}

    </Box>
  )
}
