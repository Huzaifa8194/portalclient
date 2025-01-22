import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const DisputeResolution = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          5.1. Applicable Law
        </Typography>
        <Typography variant="body1" gutterBottom>
          This contract is governed by Swedish, Danish, and applicable EU laws.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          5.2. Dispute Resolution
        </Typography>
        <Typography variant="body1" gutterBottom>
          Disputes will be resolved through:
        </Typography>
        <ul>
          <li>Stockholm Chamber of Commerce Arbitration Institute under Swedish law.</li>
          <li>Copenhagen Arbitration Institute under Danish law.</li>
          <li>EU Regulation (Brussels I Recast Regulation No 1215/2012) for cross-border disputes.</li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          5.3. Jurisdiction
        </Typography>
        <Typography variant="body1" gutterBottom>
          Legal actions will be pursued in Sweden or Denmark, depending on service location.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="disputeResolutionAgreed"
              name="disputeResolutionAgreed"
              checked={formData.disputeResolutionAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the dispute resolution terms and governing law"
        />
      </Grid>
    </Grid>
  )
}

export default DisputeResolution

