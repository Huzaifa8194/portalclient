import { Grid, TextField, MenuItem, FormControlLabel, Checkbox, Typography } from "@mui/material"

export function HealthLifestyle({ formData, handleInputChange, handleBack }) {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
            Health & Lifestyle
          </Typography>
        </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.preExistingConditions}
              onChange={handleInputChange}
              name="preExistingConditions"
            />
          }
          label="Any pre-existing medical conditions?"
        />
      </Grid>
      {formData.preExistingConditions && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Specify pre-existing conditions"
            name="preExistingConditionsDetails"
            multiline
            rows={3}
            value={formData.preExistingConditionsDetails || ""}
            onChange={handleInputChange}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={<Checkbox checked={formData.smoker} onChange={handleInputChange} name="smoker" />}
          label="Do you smoke?"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Checkbox checked={formData.alcoholConsumption} onChange={handleInputChange} name="alcoholConsumption" />
          }
          label="Do you consume alcohol?"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Exercise Frequency"
          name="exerciseFrequency"
          value={formData.exerciseFrequency || ""}
          onChange={handleInputChange}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="moreThan2TimesWeek">More than 2 times a week</MenuItem>
          <MenuItem value="moreThan10TimesMonth">More than 10 times a month</MenuItem>
          <MenuItem value="rarely">Rarely/Never</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  )
}

