import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const LimitationOfLiability = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          6.1. Indirect Damages
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB is not liable for any indirect, incidental, or consequential damages arising from the
          provision of its services.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          6.2. Liability Cap
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB&apos;s total liability shall not exceed the fees paid by the Client.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          6.3. Breach of Contract
        </Typography>
        <Typography variant="body1" gutterBottom>
          Breach of contract, including non-payment or provision of false information, will result in immediate
          termination and full invoice liability.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          6.4. Termination by Client
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client may terminate the contract in writing within 14 days if no services have commenced. Refunds are not
          applicable after service initiation.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          6.5. Service Suspension
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB may suspend services for non-payment, miscommunication with authorities, or breach of
          obligations.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="limitationOfLiabilityAgreed"
              name="limitationOfLiabilityAgreed"
              checked={formData.limitationOfLiabilityAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the limitation of liability terms"
        />
      </Grid>
    </Grid>
  )
}

export default LimitationOfLiability

