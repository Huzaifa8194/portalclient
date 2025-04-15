"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "@mui/material/Link"

import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import LoadingButton from "@mui/lab/LoadingButton"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { useBoolean } from "src/hooks/use-boolean"
import { Form } from "src/components/hook-form"
import { toast } from "src/components/snackbar"
import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"

// Import components
import { FormHead } from "../../components/form-head"

import { formSchema } from "./partner-registration/form-schema"
import { defaultValues } from "./partner-registration/default-values"
import { BasicInfoStep } from "./partner-registration/form-steps/basic-info-step"
import { AddressInfoStep } from "./partner-registration/form-steps/address-info-step"
import { LawyerDetailsStep } from "./partner-registration/form-steps/lawyer-details-step"
import { ConsultantDetailsStep } from "./partner-registration/form-steps/consultant-details-step"
import { FirmDetailsStep } from "./partner-registration/form-steps/firm-details-step"
import { FreelancerDetailsStep } from "./partner-registration/form-steps/freelancer-details-step"
import { AdditionalServicesStep } from "./partner-registration/form-steps/additional-services-step"
import { CBIStep } from "./partner-registration/form-steps/cbi-step"
import { DocumentationStep } from "./partner-registration/form-steps/documentation-step"
import { ReviewStep } from "./partner-registration/form-steps/review-step"
import { SuccessDialog } from "./success-dialog"
import { SuccessDialogUni } from "./success-dialog-uni"
import { submitForm } from "./partner-registration/form-submission"

// Import university-specific steps
import { UniversityInfoStep } from "./partner-registration/university-steps/university-info-step"
import { PartnershipScopeStep } from "./partner-registration/university-steps/partnership-scope-step"
import { PreArrivalSupportStep } from "./partner-registration/university-steps/pre-arrival-support-step"
import { ComplianceStep } from "./partner-registration/university-steps/compliance-step"
import { PartnershipTermsStep } from "./partner-registration/university-steps/partnership-terms-step"
import { AgreementSubmissionStep } from "./partner-registration/university-steps/agreement-submission-step"

export function JwtSignUpViewPartner() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  // Create a ref to store form data between steps
  const formDataRef = useRef({})

  // State for API data
  const [partnerTypes, setPartnerTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [lawyerFields, setLawyerFields] = useState([])
  const [accreditations, setAccreditations] = useState([])
  const [applicationTypes, setApplicationTypes] = useState([])
  const [additionalServices, setAdditionalServices] = useState([])
  const [cbiPrograms, setCbiPrograms] = useState([])
  const [partnerRecords, setPartnerRecords] = useState([])

  const [loading, setLoading] = useState(true)
  const [isUniversityFlow, setIsUniversityFlow] = useState(false)

  const password = useBoolean()

  // Handle dialog close and navigation to login
  const handleDialogClose = () => {
    setSuccessDialogOpen(false)
    setTimeout(() => {
      router.push(paths.auth.jwt.signIn)
    }, 1500)
  }

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch countries from API
        try {
          const countriesResponse = await fetch("https://api.swedenrelocators.se/api/miscellaneous/countries")
          const countriesResult = await countriesResponse.json()
          if (countriesResult.data) {
            setCountries(countriesResult.data)
          } else {
            console.error("Unexpected countries API response structure:", countriesResult)
          }
        } catch (error) {
          console.error("Error fetching countries:", error)
        }

        // Fetch business types from API
        try {
          const businessTypesResponse = await fetch(
            "https://api.swedenrelocators.se/api/miscellaneous/partner/businessTypes",
          )
          const businessTypesResult = await businessTypesResponse.json()
          if (businessTypesResult.data) {
            setPartnerTypes(businessTypesResult.data)
          } else {
            console.error("Unexpected business types API response structure:", businessTypesResult)
          }
        } catch (error) {
          console.error("Error fetching business types:", error)
        }

        // Fetch partner records from API
        try {
          const partnerRecordsResponse = await fetch(
            "https://api.swedenrelocators.se/api/miscellaneous/partner/records",
          )
          const partnerRecordsResult = await partnerRecordsResponse.json()
          if (partnerRecordsResult.data) {
            setPartnerRecords(partnerRecordsResult.data)
            // Set lawyer fields
            if (partnerRecordsResult.data.lawyerFields) {
              setLawyerFields(partnerRecordsResult.data.lawyerFields)
            }

            // Set accreditations
            if (partnerRecordsResult.data.accreditation) {
              setAccreditations(partnerRecordsResult.data.accreditation)
            }

            // Set application specializations
            if (partnerRecordsResult.data.ApplicationSpecialize) {
              setApplicationTypes(partnerRecordsResult.data.ApplicationSpecialize)
            }

            // Set additional services (using ApplicationSpecialize as it contains similar data)
            if (partnerRecordsResult.data.ApplicationSpecialize) {
              setAdditionalServices(partnerRecordsResult.data.ApplicationSpecialize)
            }

            // Set CBI programs
            if (partnerRecordsResult.data.CBISpecialize) {
              setCbiPrograms(partnerRecordsResult.data.CBISpecialize)
            }
          } else {
            console.error("Unexpected partner records API response structure:", partnerRecordsResult)
          }
        } catch (error) {
          console.error("Error fetching partner records:", error)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setErrorMsg("Failed to load form data. Please refresh the page.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Initialize form with React Hook Form
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = methods

  // Watch for partner type to show/hide sections
  const partnerType = watch("business_type_id")

  // Check if university is selected and update the flow
  useEffect(() => {
    if (partnerType === "7") {
      // University
      setIsUniversityFlow(true)
      setActiveStep(0) // Reset to first step when switching to university flow
    } else {
      setIsUniversityFlow(false)
    }
  }, [partnerType])

  const isLawyer = partnerType === "1" || partnerType === "2" // Lawyer or Law Firm
  const isImmigrationConsultant = partnerType === "3" // Immigration Consultant
  const isImmigrationFirm = partnerType === "4" // Immigration Firm
  const isFreelancer = partnerType === "5" || partnerType === "6" // Freelancer or Self-Employed
  const isUniversity = partnerType === "7" // University

  // Watch for CBI option
  const handlesCBI = watch("handles_cbi")

  // Handle checkbox change to store IDs in arrays
  const handleCheckboxChange = (name, id, checked) => {
    const currentValues = Array.isArray(getValues(name)) ? getValues(name) : []

    if (checked) {
      // Add ID to array if checked
      if (!currentValues.includes(id.toString())) {
        setValue(name, [...currentValues, id.toString()], { shouldValidate: true })
      }
    } else {
      // Remove ID from array if unchecked
      setValue(
        name,
        currentValues.filter((value) => value !== id.toString()),
        { shouldValidate: true },
      )
    }
  }

  // Get steps based on the flow
  const getSteps = () => {
    // All flows start with Basic Information and Address
    const baseSteps = ["Basic Information", "Address Information"]

    // University flow
    if (isUniversityFlow) {
      return [
        ...baseSteps,
        "University Information",
        "Partnership Scope & Collaboration",
        "Pre-Arrival & Onboarding Support",
        "Compliance & Legal Considerations",
        "Partnership Terms & Next Steps",
        "Agreement & Submission",
      ]
    }

    // Default flow for other partner types
    const additionalSteps = []

    if (isLawyer) {
      additionalSteps.push("Profession-Specific Details")
    }

    if (isImmigrationConsultant) {
      additionalSteps.push("Profession-Specific Details")
    }

    if (isImmigrationFirm) {
      additionalSteps.push("Profession-Specific Details")
    }

    if (isFreelancer) {
      additionalSteps.push("Profession-Specific Details")
    }

    // Common steps for all non-university partner types
    additionalSteps.push("Additional Services", "Citizenship by Investment", "Documentation", "Review & Submit")

    return [...baseSteps, ...additionalSteps]
  }

  const steps = getSteps()

  // Handle next step - save current form data to ref
  const handleNext = (e) => {
    e.preventDefault()

    // Save current form data to ref
    formDataRef.current = {
      ...formDataRef.current,
      ...getValues(),
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = (e) => {
    e.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Render the current step content
  const getStepContent = (stepIndex) => {
    const step = steps[stepIndex]

    // Basic Information and Address steps are common for all flows
    if (step === "Basic Information") {
      return <BasicInfoStep partnerTypes={partnerTypes} />
    }

    if (step === "Address Information") {
      return <AddressInfoStep />
    }

    // University flow
    if (isUniversityFlow) {
      switch (step) {
        case "University Information":
          return <UniversityInfoStep />
        case "Partnership Scope & Collaboration":
          return <PartnershipScopeStep />
        case "Pre-Arrival & Onboarding Support":
          return <PreArrivalSupportStep />
        case "Compliance & Legal Considerations":
          return <ComplianceStep />
        case "Partnership Terms & Next Steps":
          return <PartnershipTermsStep />
        case "Agreement & Submission":
          return <AgreementSubmissionStep password={password} />
        default:
          return null
      }
    }

    // Default flow for other partner types
    switch (step) {
      case "Profession-Specific Details":
        if (isLawyer) return <LawyerDetailsStep lawyerFields={lawyerFields} accreditations={accreditations} />
        if (isImmigrationConsultant)
          return <ConsultantDetailsStep accreditations={accreditations} countries={countries} />
        if (isImmigrationFirm) return <FirmDetailsStep />
        if (isFreelancer) return <FreelancerDetailsStep />
        return null
      case "Additional Services":
        return <AdditionalServicesStep applicationTypes={applicationTypes} additionalServices={additionalServices} />
      case "Citizenship by Investment":
        return <CBIStep handlesCBI={handlesCBI} cbiPrograms={cbiPrograms} />
      case "Documentation":
        return (
          <DocumentationStep
            isImmigrationFirm={isImmigrationFirm}
            isLawyer={isLawyer}
            isImmigrationConsultant={isImmigrationConsultant}
            isFreelancer={isFreelancer}
          />
        )
      case "Review & Submit":
        return <ReviewStep password={password} />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography>Loading form data...</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      {/* Form */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} sx={{ cursor: "pointer" }} completed={activeStep > index}>
              <StepLabel onClick={() => setActiveStep(index)}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormHead
          description={
            <>
              {`Already have an account? `}
              <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
                Sign in
              </Link>
            </>
          }
          sx={{ mb: 4, textAlign: "center" }}
        />

        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}

        <Form
          methods={methods}
          onSubmit={handleSubmit((data) => {
            // This won't be used directly but we need to keep it for form validation
            console.log("Form validated:", data)
          })}
          onError={(formErrors) => {
            console.error("Form validation errors:", formErrors)
            const errorKeys = Object.keys(formErrors)
            if (errorKeys.length > 0) {
              const firstError = formErrors[errorKeys[0]]
              toast.error(firstError.message || "Please check the form for errors")
            }
          }}
        >
          {getStepContent(activeStep)}

          <Box
            sx={{
              display: "flex",
              justifyContent: activeStep > 0 ? "space-between" : "flex-end",
              mt: 4,
            }}
          >
            {activeStep > 0 && (
              <Button color="inherit" variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext} sx={{ minWidth: 150 }}>
                Next
              </Button>
            ) : (
              <LoadingButton
                color="primary"
                size="large"
                variant="contained"
                loading={isSubmitting}
                onClick={(e) => {
                  e.preventDefault()
                  const formData = getValues()
                  const success = submitForm(formData, countries, setErrorMsg, setSuccessDialogOpen)
                  if (success) {
                    toast.success("Registration successful! Redirecting to login page shortly.")
                  }
                }}
              >
                Submit and Pay
              </LoadingButton>
            )}
          </Box>
        </Form>
      </Paper>

      {/* Success Dialog - Conditionally render based on business type */}
      {isUniversityFlow ? (
        <SuccessDialogUni open={successDialogOpen} onClose={handleDialogClose} />
      ) : (
        <SuccessDialog open={successDialogOpen} onClose={handleDialogClose} />
      )}
    </Box>
  )
}
