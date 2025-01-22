import React from "react"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"

const ClientInformation = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth || ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="System Client ID"
          name="systemClientId"
          value={formData.systemClientId || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Address" name="address" value={formData.address || ""} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email Address"
          name="emailAddress"
          type="email"
          value={formData.emailAddress || ""}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default ClientInformation

