import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const DisputeResolution = ({ formData, onChange }) => {
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
      number: "6.1",
      title: "Applicable Law",
      content: "This contract is governed by Swedish, Danish, and applicable EU laws."
    },
    {
      number: "6.2",
      title: "Dispute Resolution",
      content: "Disputes will be resolved through:"
    },
    {
      number: "6.3",
      title: "Jurisdiction",
      content: "Legal actions will be pursued in Sweden or Denmark, depending on service location."
    }
  ]

  const resolutionPoints = [
    "Stockholm Chamber of Commerce Arbitration Institute under Swedish law.",
    "Copenhagen Arbitration Institute under Danish law.",
    "EU Regulation (Brussels I Recast Regulation No 1215/2012) for cross-border disputes."
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
              {section.number === "6.2" && (
                <ul style={{ listStyle: "none", padding: 0, marginTop: "12px" }}>
                  {resolutionPoints.map((point, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ ...sectionNumberStyle, marginTop: "2px" }}>
                        {idx + 1}
                      </div>
                      <Typography variant="body1">{point}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Grid>
      ))}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="disputeResolutionAgreed"
              name="disputeResolutionAgreed"
              checked={formData.disputeResolutionAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the dispute resolution terms and governing law"
        />
      </Grid>
    </Grid>
  )
}

export default DisputeResolution