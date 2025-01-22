import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const ScopeOfServices = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          2.1. Service Assignment
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Client will be assigned a dedicated advisor as their main point of contact. However, services are provided
          by Sweden Relocators AB as a legal entity, not by individual employees.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          2.2. Team Collaboration
        </Typography>
        <Typography variant="body1" gutterBottom>
          Different teams within the company may handle aspects of the Client&apos;s application to ensure expert
          attention at every stage.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          2.3. No Individual Liability
        </Typography>
        <Typography variant="body1" gutterBottom>
          No individual consultant, advisor, or partner is personally liable; all accountability rests solely with
          Sweden Relocators AB.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          2.4. Third-Party Collaboration
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB reserves the right to collaborate with third-party service providers, legal
          professionals, and governmental liaisons. Sweden Relocators AB assumes no liability for any third-party
          services provided.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          2.5. Advisory Limitations
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB provides advisory services based on the latest available information. The company is not
          liable for policy or legal changes by Swedish, Danish, or EU authorities after the consultation date.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          2.6. No Timeline Guarantees
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sweden Relocators AB does not provide specific timelines for application processing. Waiting times are based
          solely on information from official authorities and are subject to change.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="scopeOfServicesAgreed"
              name="scopeOfServicesAgreed"
              checked={formData.scopeOfServicesAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the scope of services and team structure"
        />
      </Grid>
    </Grid>
  )
}

export default ScopeOfServices

