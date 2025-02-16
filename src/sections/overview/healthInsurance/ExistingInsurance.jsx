import { Grid, TextField, FormControlLabel, Checkbox, Typography} from "@mui/material"

export function ExistingInsurance({ formData, handleInputChange }) {
  return (
    <Grid container spacing={2}>
              <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
            Existing Insurance
          </Typography>
        </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.hasExistingInsurance}
              onChange={handleInputChange}
              name="hasExistingInsurance"
            />
          }
          label="Do you currently have health insurance?"
        />
      </Grid>
      {formData.hasExistingInsurance && (
        <>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Insurance Provider"
              name="currentInsuranceProvider"
              value={formData.currentInsuranceProvider || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Coverage Details"
              name="currentCoverageDetails"
              multiline
              rows={3}
              value={formData.currentCoverageDetails || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox checked={formData.switchingProviders} onChange={handleInputChange} name="switchingProviders" />
          }
          label="Are you looking to switch providers or add additional coverage?"
        />
      </Grid>
    </Grid>
  )
}

