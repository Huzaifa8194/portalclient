import { Box, Typography, MenuItem, Grid } from "@mui/material"
import { Field } from "src/components/hook-form"

export function PartnershipTermsStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Partnership Terms & Next Steps
      </Typography>

      <Field.Text
        name="key_expectations"
        label="What are the university's key expectations from this partnership?"
        multiline
        rows={4}
        required
      />

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Primary contact for partnership coordination
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field.Select name="same_as_coordinator" label="Same as International Student Coordinator?" required>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Field.Select>
        </Grid>
      </Grid>

      {/* Show these fields only if "No" is selected for same as coordinator */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        className="conditional-fields"
        style={{
          display: "none",
          conditional: {
            when: "same_as_coordinator",
            is: "No",
          },
        }}
      >
        <Field.Text name="partnership_contact_name" label="Name" />
        <Field.Text name="partnership_contact_designation" label="Designation" />
        <Field.Text name="partnership_contact_email" label="Email" type="email" />
        <Field.Text name="partnership_contact_phone" label="Phone Number" />
      </Box>

      <Field.Text name="preferred_start_date" label="Preferred start date for collaboration" type="date" required />
    </Box>
  )
}

