import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Card, Stepper, Step, StepLabel } from "@mui/material"
import PowerOfAttorneyForm from "./formComponents/PowerOfAttorneyForm"

export function PostNewEditForm({ currentPost }) {
  const { handleSubmit, methods, control } = useForm()
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    "Client Info",
    "Authorization",
    "Services",
    "Fees",
    "Responsibilities",
    "Disputes",
    "Liability",
    "Amendments",
    "Acknowledgment",
  ]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4 }}>
          <PowerOfAttorneyForm
            currentStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
            control={control}
            methods={methods}
          />
        </Box>
      </Card>
    </form>
  )
}

