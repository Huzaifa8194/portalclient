import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const LimitationOfLiability = ({ formData, onChange }) => {
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
      number: "7.1",
      title: "Indirect Damages",
      content: "Sweden Relocators AB is not liable for any indirect, incidental, or consequential damages arising from the provision of its services."
    },
    {
      number: "7.2",
      title: "Liability Cap",
      content: "Sweden Relocators AB's total liability shall not exceed the fees paid by the Client."
    },
    {
      number: "7.3",
      title: "Breach of Contract",
      content: "Breach of contract, including non-payment or provision of false information, will result in immediate termination and full invoice liability."
    },
    {
      number: "7.4",
      title: "Termination by Client",
      content: "The Client may terminate the contract in writing within 14 days if no services have commenced. Refunds are not applicable after service initiation."
    },
    {
      number: "7.5",
      title: "Service Suspension",
      content: "Sweden Relocators AB may suspend services for non-payment, miscommunication with authorities, or breach of obligations."
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
            <Checkbox
              id="limitationOfLiabilityAgreed"
              name="limitationOfLiabilityAgreed"
              checked={formData.limitationOfLiabilityAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the limitation of liability terms"
        />
      </Grid>
    </Grid>
  )
}

export default LimitationOfLiability