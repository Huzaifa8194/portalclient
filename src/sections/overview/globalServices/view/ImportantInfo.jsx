import { Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

const countries = ["USA", "Canada", "Australia", "New Zealand", "UK", "Germany", "France", "Spain", "Italy", "Sweden"]
const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]

export const ImportantInfo = ({ formData, handleInputChange }) => (
  <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
    <Typography variant="h6" gutterBottom>
      Important Information
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>From</InputLabel>
          <Select name="fromCountry" value={formData.fromCountry} onChange={handleInputChange} label="From">
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>To</InputLabel>
          <Select name="toCountry" value={formData.toCountry} onChange={handleInputChange} label="To">
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select name="currency" value={formData.currency} onChange={handleInputChange} label="Currency">
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </Paper>
)

