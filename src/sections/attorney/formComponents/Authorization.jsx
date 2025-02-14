import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const Authorization = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  const sectionNumberStyle = {
    backgroundColor: "#1B4D3E",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    marginRight: "12px",
    fontSize: "14px",
    minWidth: "40px",
    textAlign: "center",
    display: "inline-block",
  }

  const sectionStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "24px",
  }

  const sectionContentStyle = {
    flex: 1,
  }

  const sections = [
    {
      number: "1.1",
      content: "Preparing and submitting applications to Swedish, Danish, and EU authorities."
    },
    {
      number: "1.2",
      content: "Representing the Client in dealings with government offices, agencies, and private institutions."
    },
    {
      number: "1.3",
      content: "Signing documents, attending appointments, and performing any actions necessary for the relocation and immigration process."
    },
    {
      number: "1.4",
      content: "Liaising with legal representatives, third-party vendors, and service providers to facilitate the Client's relocation."
    }
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          By signing this agreement, the Client grants Sweden Relocators AB and Nordic Relocators full authority to act
          on their behalf in all relocation and immigration services. This includes but is not limited to:
        </Typography>
      </Grid>
      {sections.map((section, index) => (
        <Grid item xs={12} key={index}>
          <div style={sectionStyle}>
            <div style={sectionNumberStyle}>
              {section.number}
            </div>
            <div style={sectionContentStyle}>
              <Typography variant="body1" gutterBottom>
                {section.content}
              </Typography>
            </div>
          </div>
        </Grid>
      ))}
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