import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const ClientResponsibilities = ({ formData, onChange }) => {
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
      number: "5.1",
      title: "Accurate Information",
      content: "The Client must provide accurate and truthful information. False information or documents will result in immediate termination of services and the Client will bear all legal consequences."
    },
    {
      number: "5.2",
      title: "Communication Protocol",
      content: "Only the Client may request case updates. Sweden Relocators AB will not respond to family members without the Client's written consent."
    },
    {
      number: "5.3",
      title: "Direct Communication with Authorities",
      content: "The Client must notify Sweden Relocators AB before contacting authorities. Failure to do so may result in miscommunication and immediate contract termination, with full invoice payment required."
    },
    {
      number: "5.4",
      title: "Document Responsibility",
      content: "The Client is solely responsible for providing accurate and complete documentation. Incomplete or incorrect documents will result in delays or negative outcomes, for which Sweden Relocators AB is not liable."
    },
    {
      number: "5.5",
      title: "Data Privacy",
      content: "The Client consents to the storage and handling of personal data in compliance with GDPR (EU Regulation 2016/679), Swedish Data Protection Law, and Danish Data Protection Law."
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
              name="clientResponsibilitiesAgreed"
              checked={formData.clientResponsibilitiesAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to my responsibilities as a client"
        />
      </Grid>
    </Grid>
  )
}

export default ClientResponsibilities