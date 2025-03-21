"use client"

import { useState, useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Alert, AlertTitle, Stack, Card, CircularProgress } from "@mui/material"
import axios from "axios"
import { toast } from "src/components/snackbar"

import { AccountBillingHistory } from "./account-billing-history"
import { AccountBillingBronze } from "./account-billing-bronze"
import { ReferralForm } from "./ReferralForm"

export function AccountBilling() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertEmail, setAlertEmail] = useState("")
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch referrals from the backend
  const fetchReferrals = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await axios.get("https://api.swedenrelocators.se/api/client/referral/list", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      // Format the data to match our component's expected structure
      const formattedReferrals = response.data.data.map((referral) => ({
        id: referral.id,
        name: referral.name,
        email: referral.email,
        status: referral.status,
        date: referral.created_at,
        referral_code: referral.referral_code,
      }))

      setReferrals(formattedReferrals)
    } catch (err) {
      console.error("Error fetching referrals:", err)
      setError(err.message || "Failed to fetch referrals")

      // Show error toast
      toast.error(err.response?.data?.message || "Failed to fetch referrals")
    } finally {
      setLoading(false)
    }
  }

  // Fetch referrals when component mounts
  useEffect(() => {
    fetchReferrals()
  }, [])

  const handleReferralSuccess = (name, email) => {
    setAlertEmail(email)
    setShowAlert(true)

    // Refresh the referrals list after adding a new one
    fetchReferrals()

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
                maxHeight: "200px",
                overflow: "auto",
                position: "relative",
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", p: 3 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : error ? (
                <Box sx={{ p: 3, textAlign: "center", color: "error.main" }}>
                  Failed to load referrals. Please try again.
                </Box>
              ) : (
                <AccountBillingHistory referrals={referrals} />
              )}
            </Card>

            {/* Second Row - Bronze Status with Rocket (compact) */}
            <AccountBillingBronze sx={{ maxHeight: "140px" }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountBilling

