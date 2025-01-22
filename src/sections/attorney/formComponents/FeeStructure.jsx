import React from "react"
import { Typography, FormControlLabel, Checkbox, Grid } from "@mui/material"

const FeeStructure = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          3.1. Service Fees
        </Typography>
        <Typography variant="body1" gutterBottom>
          Fees are determined based on the type of services requested and are clearly outlined in the Client&apos;s
          portal. All fees cover consulting, administration, and processing services and are non-refundable, except as
          outlined in Section 3.9.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          3.2. Additional Services
        </Typography>
        <Typography variant="body1" gutterBottom>
          Additional services not included in the initial agreement (e.g., airport pickup, document courier, in-person
          representation) will incur extra charges.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          3.3. Advance Payment
        </Typography>
        <Typography variant="body1" gutterBottom>
          Clients located outside of Sweden must pay in advance. The initial payment may not cover additional services,
          which will be invoiced separately.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          3.4. Invoice Issuance
        </Typography>
        <Typography variant="body1" gutterBottom>
          Invoices are issued immediately upon signing this contract and are visible in the &quot;Payment&quot; section
          of the Client&apos;s online portal.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          3.5. Payment Terms
        </Typography>
        <Typography variant="body1" gutterBottom>
          All invoices must be paid within 30 days of the invoice date. Late payments will accrue interest according to
          the Swedish Interest Act (Räntelag 1975:635) and the Danish Interest Act. After one reminder, unpaid invoices
          will be transferred to a debt collection agency (Inkasso).
        </Typography>
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

