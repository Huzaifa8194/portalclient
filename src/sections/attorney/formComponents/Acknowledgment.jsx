import React, { useState } from "react"
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"

const Acknowledgment = ({ formData, onChange }) => {
  const [guarantorType, setGuarantorType] = useState("")

  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  const handleGuarantorTypeChange = (e) => {
    setGuarantorType(e.target.value)
    onChange({ guarantorType: e.target.value })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          By signing this contract, the Client confirms that they have read, understood, and agreed to all terms and
          conditions. The Client acknowledges that they are fully bound by the financial obligations outlined, including
          the guarantor clause.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Client Signature"
          name="clientSignature"
          value={formData.clientSignature || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Date"
          name="clientSignatureDate"
          type="date"
          value={formData.clientSignatureDate || ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="guarantor-type-label">Add Guarantor</InputLabel>
          <Select
            labelId="guarantor-type-label"
            value={guarantorType}
            onChange={handleGuarantorTypeChange}
            label="Add Guarantor"
          >
            <MenuItem value="">Select Guarantor Type</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="company">Company</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {guarantorType === "individual" && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">Individual Guarantor Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="guarantorFullName"
              value={formData.guarantorFullName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="guarantorDateOfBirth"
              type="date"
              value={formData.guarantorDateOfBirth || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Personal ID/Passport Number"
              name="guarantorPersonalId"
              value={formData.guarantorPersonalId || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="guarantorAddress"
              value={formData.guarantorAddress || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="guarantorPhoneNumber"
              value={formData.guarantorPhoneNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="guarantorEmailAddress"
              type="email"
              value={formData.guarantorEmailAddress || ""}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}
      {guarantorType === "company" && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">Company Guarantor Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              name="guarantorCompanyName"
              value={formData.guarantorCompanyName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Organization Number"
              name="guarantorOrganizationNumber"
              value={formData.guarantorOrganizationNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Address"
              name="guarantorCompanyAddress"
              value={formData.guarantorCompanyAddress || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person Name"
              name="guarantorContactPersonName"
              value={formData.guarantorContactPersonName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person Position"
              name="guarantorContactPersonPosition"
              value={formData.guarantorContactPersonPosition || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="guarantorCompanyPhoneNumber"
              value={formData.guarantorCompanyPhoneNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="guarantorCompanyEmailAddress"
              type="email"
              value={formData.guarantorCompanyEmailAddress || ""}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}
      {guarantorType && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Guarantor Signature"
            name="guarantorSignature"
            value={formData.guarantorSignature || ""}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="digitalSigningAgreed"
              checked={formData.digitalSigningAgreed || false}
              onChange={handleCheckboxChange}
            />
          }
          label="I agree to the terms and conditions and authorize this agreement through my BankID/MittID."
        />
      </Grid>
    </Grid>
  )
}

export default Acknowledgment

