import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid, Paper } from "@mui/material"

const FeeStructure = ({ formData, onChange }) => {
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

  const appointmentFeeStyle = {
    backgroundColor: "#f0f8ff",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #1B4D3E",
    marginTop: "24px",
    marginBottom: "24px",
  }

  const sections = [
    {
      number: "4.1",
      title: "Service Fees",
      content: [
        "Fees are determined based on the type of services requested and are clearly outlined in the Client's portal.",
        "All fees cover consulting, administration, and processing services and are non-refundable, except as outlined in Section 3.9."
      ]
    },
    {
      number: "4.2",
      title: "Additional Services",
      content: [
        "Additional services not included in the initial agreement (e.g., airport pickup, document courier, in-person representation) will incur extra charges."
      ]
    },
    {
      number: "4.3",
      title: "Advance Payment",
      content: [
        "Clients located outside of Sweden must pay in advance.",
        "The initial payment may not cover additional services, which will be invoiced separately."
      ]
    },
    {
      number: "4.4",
      title: "Invoice Issuance",
      content: [
        "Invoices are issued immediately upon signing this contract.",
        "Invoices are visible in the \"Payment\" section of the Client's online portal."
      ]
    },
    {
      number: "4.5",
      title: "Payment Terms",
      content: [
        "All invoices must be paid within 30 days of the invoice date.",
        "Late payments will accrue interest according to the Swedish Interest Act (Räntelag 1975:635) and the Danish Interest Act.",
        "After one reminder, unpaid invoices will be transferred to a debt collection agency (Inkasso)."
      ]
    },
    {
      number: "4.6",
      title: "Debt Recovery Action",
      content: [
        "In case of non-payment, Sweden Relocators AB reserves the right to initiate legal action, including but not limited to debt collection and court proceedings, in accordance with Lag (1990:746) om betalningsföreläggande och handräckning (Swedish Enforcement Authority Act)."
      ]
    },
    {
      number: "4.7",
      title: "Reapplication and Appeal Fees",
      content: [
        "Fees for reapplications or appeals after a permit refusal are separate and must be paid in full before proceeding."
      ]
    },
    {
      number: "4.8",
      title: "Guarantor Obligation",
      content: [
        "If the Client fails to fulfill payment obligations, the designated guarantor assumes full responsibility for the outstanding balance."
      ]
    },
    {
      number: "4.9",
      title: "Refund Policy (Applicable in Certain Cases)",
      content: [
        "Refunds will only be issued in the following scenarios:",
        "• If Sweden Relocators AB fails to deliver the agreed-upon services due to internal errors.",
        "• If the Client revokes the contract within 14 days of signing without any service having been initiated (in compliance with Swedish consumer protection laws).",
        "Refund requests must be submitted in writing to complaints@swedenrelocators.se"
      ]
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
              {section.content.map((paragraph, idx) => (
                <Typography key={idx} variant="body1" gutterBottom>
                  {paragraph}
                </Typography>
              ))}
            </div>
          </div>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Paper elevation={3} style={appointmentFeeStyle}>
          <Typography variant="h6" gutterBottom style={{ color: "#1B4D3E" }}>
            Appointment Fee Inclusion
          </Typography>
          <Typography variant="body1" paragraph>
            The appointment fee will be included in the invoice only if the client makes the payment within 14 days of signing the service contract.
          </Typography>
          <Typography variant="body1" paragraph>
            In specific cases, where the client pays 50% of the invoice within the first 14 days, the appointment fee may be included if the full payment is made within 30 days.
          </Typography>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Payment Beyond 30 Days:
          </Typography>
          <Typography variant="body1">
            If payment is not received within 30 days, the appointment fee will not be included, and the full invoice amount will be due.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="feeStructureAgreed"
              name="feeStructureAgreed"
              checked={formData.feeStructureAgreed || false}
              onChange={handleChange}
            />
          }
          label="I understand and agree to the fee structure and payment obligations"
        />
      </Grid>
    </Grid>
  )
}

export default FeeStructure