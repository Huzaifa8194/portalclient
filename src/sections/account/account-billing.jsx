"use client"

import { useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Alert, AlertTitle, Stack, Card } from "@mui/material"

import { AccountBillingHistory } from "./account-billing-history"
import { AccountBillingBronze } from "./account-billing-bronze"
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

      <Grid container spacing={3} disableEqualOverflow sx={{ alignItems: "flex-start" }}>
        {/* Left Column - ReferralForm (60%) */}
        <Grid xs={12} md={7} sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <ReferralForm onSuccess={handleReferralSuccess} />
          </Box>
        </Grid>

        {/* Right Column (40%) */}
        <Grid xs={12} md={5} sx={{ display: "flex" }}>
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* First Row - AccountBillingHistory (compact) */}
            <Card 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                maxHeight: "180px",
                overflow: "auto"
              }}
            >
              <AccountBillingHistory referrals={referrals} />
            </Card>

            {/* Second Row - Bronze Status with Rocket (compact) */}
            <AccountBillingBronze sx={{ maxHeight: "140px" }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
