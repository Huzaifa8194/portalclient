"use client"

import { useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Alert, AlertTitle } from "@mui/material"

import { AccountBillingHistory } from "./account-billing-history"
import { ReferralForm } from "./ReferralForm"

export function AccountBilling() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertEmail, setAlertEmail] = useState("")
  const [referrals, setReferrals] = useState([])

  const handleReferralSuccess = (name, email) => {
    setAlertEmail(email)
    setShowAlert(true)
    // Add the new referral to the list
    setReferrals([...referrals, { id: Date.now(), name, status: "pending", date: new Date().toISOString() }])
    // Auto-hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} severity="success" variant="filled" sx={{ width: "100%", mb: 2 }}>
          <AlertTitle>Success</AlertTitle>
          Referral sent to {alertEmail}
        </Alert>
      )}

      <Grid container spacing={5} disableEqualOverflow>
        <Grid xs={12} md={8}>
          <ReferralForm onSuccess={handleReferralSuccess} />
        </Grid>

        <Grid xs={12} md={4}>
          <AccountBillingHistory referrals={referrals} />
        </Grid>
      </Grid>
    </Box>
  )
}

