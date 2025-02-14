import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const Amendments = ({ formData, onChange }) => {
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
      number: "9.1",
      title: "Contract Updates",
      content: "Sweden Relocators AB reserves the right to amend this agreement. The most current version is available on the company website."
    },
    {
      number: "9.2",
      title: "Client Acknowledgment",
      content: "The Client acknowledges that continued use of services implies acceptance of updated terms."
    }
  ]

  return (
    <Grid container spacing={2}>
      {sections.map((section, index) => (
        <Grid item xs={12} key={index}>
          <div style={sectionStyle}>
            <div style={sectionNumberStyle}>
              {section.number}
            </div>
            <div style={sectionContentStyle}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {section.content}
              </Typography>
            </div>
          </div>
        </Grid>
      ))}
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