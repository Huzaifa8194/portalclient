import React, { useState, useEffect, useMemo } from "react"
import { CONFIG } from "src/config-global"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Box, Card, Stack, Grid, Typography, Button, Container } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { DashboardContent } from "src/layouts/dashboard"
import { _bankingCreditCard } from "src/_mock"

import { MoneyForm } from "./money-form"
import { CreditCard } from "./credit-card"

// Sample data (replace with actual data in a real application)
const highRiskCountries = ["USA", "UK", "Country3", "Country4", "Country5"]
const bannedCountries = ["BannedCountry1", "Japan", "BannedCountry3"]
const allCountries = ["USA", "UK", "Germany", "France", "Japan", "Australia", "Canada", "Italy", "Spain", "Netherlands"]
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"]

const schema = z.object({
  fromCountry: z.string().min(1, "From Country is required"),
  toCountry: z.string().min(1, "To Country is required"),
  isHomeCountry: z.string().min(1, "This field is required"),
  fromCurrencies: z.array(z.string()).min(1, "At least one From Currency is required"),
  toCurrencies: z.array(z.string()).min(1, "At least one To Currency is required"),
  hasDocuments: z.string().min(1, "This field is required"),
  canVerifySavings: z.string().min(1, "This field is required"),
  isEmployed: z.string().min(1, "This field is required"),
  monthlyIncome: z.string().min(1, "Monthly income range is required"),
  soldProperty: z.string().min(1, "This field is required"),
  transferTimeframe: z.string().min(1, "Transfer timeframe is required"),
  hasBankAccount: z.string().min(1, "This field is required"),
  transferAmount: z.string().min(1, "Transfer amount is required"),
  savingsOwnership: z.string().min(1, "Savings ownership information is required"),
})

export default function PostNewEditForm() {
  const [showHighRiskWarning, setShowHighRiskWarning] = useState(false)
  const [showBannedWarning, setShowBannedWarning] = useState(false)

  const defaultValues = useMemo(
    () => ({
      fromCountry: "",
      toCountry: "",
      isHomeCountry: "",
      fromCurrencies: [],
      toCurrencies: [],
      hasDocuments: "",
      canVerifySavings: "",
      isEmployed: "",
      monthlyIncome: "",
      soldProperty: "",
      transferTimeframe: "",
      hasBankAccount: "",
      transferAmount: "",
      savingsOwnership: "",
    }),
    [],
  )

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const watchedFields = watch(["fromCountry", "toCountry"])

  useEffect(() => {
    const [fromCountry, toCountry] = watchedFields
    const isHighRisk = highRiskCountries.includes(fromCountry) || highRiskCountries.includes(toCountry)
    const isBanned = bannedCountries.includes(fromCountry) || bannedCountries.includes(toCountry)
    setShowHighRiskWarning(isHighRisk)
    setShowBannedWarning(isBanned)
  }, [watchedFields])

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form data submitted:", data)
      alert("Form submitted successfully!")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred while submitting the form. Please try again.")
    }
  }

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={1}>
        <Grid xs={12} md={7} lg={12}>
          <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
            <CreditCard creditCardData={_bankingCreditCard} />
          </Box>
        </Grid>
        <Grid xs={12} md={7} lg={12}>
          <Container maxWidth="xl">
            <Card sx={{ p: 4, my: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Money Transfer Form
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MoneyForm
                  control={control}
                  errors={errors}
                  showHighRiskWarning={showHighRiskWarning}
                  showBannedWarning={showBannedWarning}
                  allCountries={allCountries}
                  currencies={currencies}
                  watch={watch}
                  setValue={setValue}
                />
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{
                    mt: 4,
                    gap: 2,
                  }}
                >
                  <Button type="button" color="inherit" variant="outlined" size="large">
                    Cancel
                  </Button>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting} size="large">
                    Submit
                  </LoadingButton>
                </Stack>
              </form>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </DashboardContent>
  )
}

