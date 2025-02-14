import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const ScopeOfServices = ({ formData, onChange }) => {
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
      number: "3.1",
      title: "Service Assignment",
      content: "The Client will be assigned a dedicated advisor as their main point of contact. However, services are provided by Sweden Relocators AB as a legal entity, not by individual employees."
    },
    {
      number: "3.2",
      title: "Team Collaboration",
      content: "Different teams within the company may handle aspects of the Client's application to ensure expert attention at every stage."
    },
    {
      number: "3.3",
      title: "No Individual Liability",
      content: "No individual consultant, advisor, or partner is personally liable; all accountability rests solely with Sweden Relocators AB."
    },
    {
      number: "3.4",
      title: "Third-Party Collaboration",
      content: "Sweden Relocators AB reserves the right to collaborate with third-party service providers, legal professionals, and governmental liaisons. Sweden Relocators AB assumes no liability for any third-party services provided."
    },
    {
      number: "3.5",
      title: "Advisory Limitations",
      content: "Sweden Relocators AB provides advisory services based on the latest available information. The company is not liable for policy or legal changes by Swedish, Danish, or EU authorities after the consultation date."
    },
    {
      number: "3.6",
      title: "No Timeline Guarantees",
      content: "Sweden Relocators AB does not provide specific timelines for application processing. Waiting times are based solely on information from official authorities and are subject to change."
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
              id="scopeOfServicesAgreed"
              name="scopeOfServicesAgreed"
              checked={formData.scopeOfServicesAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the scope of services and team structure"
        />
      </Grid>
    </Grid>
  )
}

export default ScopeOfServices