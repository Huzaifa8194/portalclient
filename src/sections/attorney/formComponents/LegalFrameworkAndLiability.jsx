import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const LegalFrameworkAndLiability = ({ formData, onChange }) => {
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
      number: "8.1",
      title: "Force Majeure",
      content: "Sweden Relocators AB is not liable for delays or failures caused by events beyond its control, including but not limited to government delays, policy changes, or natural disasters."
    },
    {
      number: "8.2",
      title: "Changed Legislation",
      content: "If legal changes prevent service completion, the contract remains valid, and no refunds are issued. Services will be adapted in accordance with new regulations."
    },
    {
      number: "8.3",
      title: "Handling of Client Death",
      content: "In the event of a client's death, the contract terminates, and any outstanding invoices become payable by the company or guarantor."
    },
    {
      number: "8.4",
      title: "Limitation of Liability",
      content: "Sweden Relocators AB's liability is strictly limited to the amount paid for the service in question. No compensation will be provided for indirect or consequential losses."
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
        <Typography variant="body1" gutterBottom>
          Key points:
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            "Force majeure events exempt Sweden Relocators AB from liability",
            "Contract remains valid despite legal changes preventing service completion",
            "Client death terminates the contract, but outstanding invoices remain payable",
            "Liability is limited to the amount paid for the specific service"
          ].map((point, index) => (
            <li key={index} style={{ display: "flex", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ ...sectionNumberStyle, marginTop: "2px" }}>
                {index + 1}
              </div>
              <Typography variant="body1">{point}</Typography>
            </li>
          ))}
        </ul>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="legalFrameworkAgreed"
              name="legalFrameworkAgreed"
              checked={formData.legalFrameworkAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the legal framework and liability terms"
        />
      </Grid>
    </Grid>
  )
}

export default LegalFrameworkAndLiability