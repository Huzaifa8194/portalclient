"use client"

import { useState, useMemo } from "react"
import { Box, Button, Container, Grid, Paper, Stepper, Step, StepLabel, Typography } from "@mui/material"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { paths } from "src/routes/paths"
import { SeoIllustration } from "src/assets/illustrations"
import { AppWelcome } from "./app-welcome"
import { ClientContactInfo } from "../ClientContactInfo"
import { PolicyInterest } from "../PolicyInterest"
import { AdditionalMembers } from "../AdditionalMembers"
import { HealthLifestyle } from "../HealthLifestyle"
import { ExistingInsurance } from "../ExistingInsurance"
import { ConsentAcknowledgment } from "../ConsentAcknowledgment"

export function OverviewCourseView() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    contactNumber: "",
    email: "",
    address: "",
    occupation: "",
    coverageType: "",
    startDate: "",
    endDate: "",
    budgetRange: "",
    coverageOptions: [],
    paymentCurrency: "",
    applicantType: "",
  })

  const showAdditionalMembers = formData.applicantType === "family"

  const steps = useMemo(() => {
    const baseSteps = [
      "Client Contact Information",
      "Policy Interest",
      "Health and Lifestyle",
      "Existing Insurance",
      "Consent & Acknowledgment",
    ]
    if (showAdditionalMembers) {
      baseSteps.splice(2, 0, "Additional Members")
    }
    return baseSteps
  }, [showAdditionalMembers])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  const renderStepContent = (step) => {
    const adjustedStep = showAdditionalMembers ? step : step >= 2 ? step + 1 : step
    switch (adjustedStep) {
      case 0:
        return <ClientContactInfo formData={formData} handleInputChange={handleInputChange} />
      case 1:
        return <PolicyInterest formData={formData} handleInputChange={handleInputChange} />
      case 2:
        return showAdditionalMembers ? (
          <AdditionalMembers formData={formData} handleInputChange={handleInputChange} />
        ) : (
          <HealthLifestyle formData={formData} handleInputChange={handleInputChange} handleBack={handleBack} />
        )
      case 3:
        return <HealthLifestyle formData={formData} handleInputChange={handleInputChange} handleBack={handleBack} />
      case 4:
        return <ExistingInsurance formData={formData} handleInputChange={handleInputChange} />
      case 5:
        return <ConsentAcknowledgment formData={formData} handleInputChange={handleInputChange} />
      default:
        return <Typography>Unknown step</Typography>
    }
  }

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Health Insurance Data Collection Form"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "Health Insurance", href: paths.dashboard.healthInsurance },
          { name: "Application Form" },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AppWelcome
        title="Welcome to Health Insurance Application"
        description="We provide comprehensive health insurance through our partner, tailored for residence, work permits, and long-term stays. It offers broader coverage than Schengen visa insurance. 

A €100 handling fee ensures serious inquiries and will be adjusted toward your insurance cost if purchased through us. "
        img={<SeoIllustration />}
      />

      <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2 }}>
              {renderStepContent(activeStep)}
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

