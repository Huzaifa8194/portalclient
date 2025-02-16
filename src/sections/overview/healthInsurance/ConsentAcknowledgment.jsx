import { Grid, FormControlLabel, Checkbox, Typography } from "@mui/material"

export function ConsentAcknowledgment({ formData, handleInputChange }) {
  return (
    <Grid container spacing={2}>
              <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
            Consent Acknowledgment
          </Typography>
        </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Please review the information above and check the box below to proceed with forwarding your query. We will
          send your query to our partner company, and they will respond to you as soon as possible.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={formData.consentChecked} onChange={handleInputChange} name="consentChecked" />}
          label="I have read, understood, and agree to the terms regarding third-party services and data processing under GDPR."
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom>
          Official Notice: Engagement with Third-Party Service Providers At Sweden Relocators AB, we are committed to
          offering comprehensive relocation solutions. To enhance our services, we collaborate with independent
          third-party providers for specialized services such as pet relocation, financial transfers, and logistics.
          These partnerships allow us to streamline the relocation process, offering you convenience through a single
          point of contact.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Important Terms of Engagement:
          {/* Add the rest of the terms here */}
        </Typography>
      </Grid>
    </Grid>
  )
}

