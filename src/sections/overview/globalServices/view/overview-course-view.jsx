import { useState } from "react"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { SeoIllustration } from "src/assets/illustrations"
import { Box, Button, Grid, Paper, Container, Stepper, Step, StepLabel } from "@mui/material"
import { paths } from "src/routes/paths"
import { AppWelcome } from "./app-welcome"
import { ImportantInfo } from "./ImportantInfo"
import { renderStepContent } from "./renderStepContent"

const steps = [
  "Application Overview",
  "Personal Information",
  "Purpose of Visit",
  "Travel Details",
  "Financial Details",
  "Accommodation Details",
  "Additional Information",
  "Additional Services",
  "Other Information",
  "Document Checklist",
  "Consent and Declarations",
]

export function OverviewCourseView() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Application Overview
    fromCountry: "",
    residingCountry: "",
    applyingTo: "",
    applyingFor: "",

    // Personal Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    contactNumber: "",
    email: "",
    currentAddress: "",

    // Purpose of Visit Details
    visitPurpose: "",
    relationshipWithHost: "",
    hostFullName: "",
    hostAddress: "",
    hostImmigrationStatus: "",
    companyName: "",
    companyAddress: "",
    businessMeetingNature: "",
    eventName: "",
    eventDate: "",
    venueAddress: "",
    hospitalName: "",
    treatmentDetails: "",
    familyMemberName: "",
    relationshipWithFamilyMember: "",
    familyMemberAddress: "",

    // Travel Details
    travelingWithFamily: "Alone",
    familyMembers: [],
    intendedTravelDate: "",
    returnDate: "",
    priorVisas: false,

    // Financial Details
    employmentStatus: "",
    companyBusinessName: "",
    position: "",
    monthlyIncome: "",
    institutionName: "",
    tripFinancer: "",
    sponsorName: "",
    sponsorRelationship: "",

    // Accommodation Details
    accommodationArrangement: "",
    accommodationType: "",
    accommodationAddress: "",

    // Additional Information
    criminalConvictions: false,
    criminalConvictionDetails: "",
    visaRefusals: false,
    visaRefusalDetails: {
      country: "",
      date: "",
      reason: "",
    },
    countryBans: false,
    countryBanDetails: {
      country: "",
      banEndDate: "",
    },

    // Additional Services
    visaAppointmentBooking: false,
    hotelReservation: false,
    healthInsurance: false,
    flightReservation: false,
    documentSubmissionPreference: "",

    // Other Information
    fatherName: "",
    fatherAddress: "",
    fatherCitizenship: "",
    fatherResidingCountry: "",
    motherName: "",
    motherAddress: "",
    motherCitizenship: "",
    motherResidingCountry: "",
    hasSiblings: false,
    siblings: [],
    maritalStatus: "",
    spouseDetails: {
      fullName: "",
      nationality: "",
      immigrationStatus: "",
      currentAddress: "",
    },
    hasChildren: false,
    children: [],
    livedAbroadMoreThan6Months: false,
    countriesVisitedLast5Years: [],
    militaryService: false,
    militaryServiceDetails: "",
    languagesProficient: [],
    emergencyContact: {
      fullName: "",
      relationship: "",
      contactNumber: "",
      email: "",
    },

    // Document Checklist
    documentChecklist: {
      personalIdentification: [],
      financialProof: [],
      employmentBusiness: [],
      accommodationTravel: [],
      relationshipFamily: [],
      residencyTax: [],
      educationStudy: [],
      medicalHealth: [],
      additionalTravel: [],
    },

    // Consent and Declarations
    declarationChecked: false,
    consentChecked: false,
    termsAndConditionsChecked: false,

    // Document Upload
    uploadedDocuments: [],
    uploadedFiles: {},
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => {
      if (name.startsWith("documentChecklist.")) {
        const [, category] = name.split(".")
        return {
          ...prevData,
          documentChecklist: {
            ...prevData.documentChecklist,
            [category]: value,
          },
        }
      }
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  const handleFileUpload = (fieldName, files) => {
    setFormData((prevData) => ({ ...prevData, uploadedFiles: { ...prevData.uploadedFiles, [fieldName]: files } }))
  }

  const handleFileRemove = (fieldName) => {
    setFormData((prevData) => ({ ...prevData, uploadedFiles: { ...prevData.uploadedFiles, [fieldName]: [] } }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
    // You can send the data to your backend or perform any other actions here
  }

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Global Visa Application"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "Global Visa", href: paths.dashboard.post.root },
          { name: "Global Visa Application" },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppWelcome
            sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="Fill this form and submit only if you are an Entrepreneur or already have any Start-up. We will help you expand your idea or business by providing you the right investors. This service is paid to avoid unnecessary queries."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={3}>
          {/* Left side - Form Fields */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2 }}>
              {renderStepContent(activeStep, formData, handleInputChange, handleFileUpload, handleFileRemove)}
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right side - Stepper and Important Info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
            <ImportantInfo formData={formData} handleInputChange={handleInputChange} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

