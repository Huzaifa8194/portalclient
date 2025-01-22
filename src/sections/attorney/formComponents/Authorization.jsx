import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const Authorization = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          By signing this agreement, the Client grants Sweden Relocators AB and Nordic Relocators full authority to act
          on their behalf in all relocation and immigration services. This includes but is not limited to:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <li>Preparing and submitting applications to Swedish, Danish, and EU authorities.</li>
          <li>Representing the Client in dealings with government offices, agencies, and private institutions.</li>
          <li>
            Signing documents, attending appointments, and performing any actions necessary for the relocation and
            immigration process.
          </li>
          <li>
            Liaising with legal representatives, third-party vendors, and service providers to facilitate the
            Client&apos;s relocation.
          </li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          The Client understands and agrees that this authorization extends to all actions deemed necessary by Sweden
          Relocators AB to fulfill the agreed services.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="authorizationAgreed"
              checked={formData.authorizationAgreed || false}
              onChange={handleChange}
            />
          }
          label="I agree to grant full authority as described above"
        />
      </Grid>
    </Grid>
  )
}

export default Authorization

