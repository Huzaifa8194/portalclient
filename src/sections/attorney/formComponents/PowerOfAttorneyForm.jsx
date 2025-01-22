import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ClientInformation from "./ClientInformation"
import Authorization from "./Authorization"
import ScopeOfServices from "./ScopeOfServices"
import FeeStructure from "./FeeStructure"
import ClientResponsibilities from "./ClientResponsibilities"
import DisputeResolution from "./DisputeResolution"
import LimitationOfLiability from "./LimitationOfLiability"
import Amendments from "./Amendments"
import Acknowledgment from "./Acknowledgment"

const PowerOfAttorneyForm = ({ currentStep, onNext, onBack }) => {
  const [formData, setFormData] = useState({})

  const steps = [
    { title: "Client Information", component: ClientInformation },
    { title: "Authorization", component: Authorization },
    { title: "Scope of Services", component: ScopeOfServices },
    { title: "Fee Structure", component: FeeStructure },
    { title: "Client Responsibilities", component: ClientResponsibilities },
    { title: "Dispute Resolution", component: DisputeResolution },
    { title: "Limitation of Liability", component: LimitationOfLiability },
    { title: "Amendments", component: Amendments },
    { title: "Acknowledgment", component: Acknowledgment },
  ]

  const handleFormChange = (stepData) => {
    setFormData({ ...formData, ...stepData })
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {steps[currentStep].title}
      </Typography>
      <CurrentStepComponent formData={formData} onChange={handleFormChange} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button onClick={onBack} disabled={currentStep === 0} variant="outlined">
          Back
        </Button>
        <Button onClick={onNext} disabled={currentStep === steps.length - 1} variant="contained">
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  )
}

export default PowerOfAttorneyForm

