import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const ClientResponsibilities = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          4.1. Accurate Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client must provide accurate and truthful information. False information or documents will result in
          immediate termination of services and the Client will bear all legal consequences.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          4.2. Communication Protocol
        </Typography>
        <Typography variant="body1" gutterBottom>
          Only the Client may request case updates. Sweden Relocators AB will not respond to family members without the
          Client&apos;s written consent.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          4.3. Direct Communication with Authorities
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client must notify Sweden Relocators AB before contacting authorities. Failure to do so may result in
          miscommunication and immediate contract termination, with full invoice payment required.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          4.4. Document Responsibility
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client is solely responsible for providing accurate and complete documentation. Incomplete or incorrect
          documents will result in delays or negative outcomes, for which Sweden Relocators AB is not liable.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          4.5. Data Privacy
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client consents to the storage and handling of personal data in compliance with GDPR (EU Regulation
          2016/679), Swedish Data Protection Law, and Danish Data Protection Law.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="clientResponsibilitiesAgreed"
              checked={formData.clientResponsibilitiesAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to my responsibilities as a client"
        />
      </Grid>
    </Grid>
  )
}

export default ClientResponsibilities

