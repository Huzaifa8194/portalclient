import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const Amendments = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          8.1. Contract Updates
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB reserves the right to amend this agreement. The most current version is available on the
          company website.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          8.2. Client Acknowledgment
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client acknowledges that continued use of services implies acceptance of updated terms.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox name="amendmentsAgreed" checked={formData.amendmentsAgreed || false} onChange={handleChange} />
          }
          label="I understand and agree to the amendment terms"
        />
      </Grid>
    </Grid>
  )
}

export default Amendments

