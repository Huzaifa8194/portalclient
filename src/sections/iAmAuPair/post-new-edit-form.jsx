"use client"

import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"

import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"

const AuPairApplicationSchema = zod.object({
  fullName: zod.string().min(1, { message: "Full Name is required!" }),
  dateOfBirth: zod.string().min(1, { message: "Date of Birth is required!" }),
  gender: zod.string().min(1, { message: "Gender is required!" }),
  genderOther: zod.string().optional(),
  phoneNumber: zod.string().min(1, { message: "Phone Number is required!" }),
  emailAddress: zod.string().email({ message: "Invalid email address" }),
  residentialAddress: zod.string().min(1, { message: "Residential Address is required!" }),
  nationality: zod.string().min(1, { message: "Nationality is required!" }),
  passportNumber: zod.string().min(1, { message: "Passport Number is required!" }),
  validVisa: zod.string().min(1, { message: "Valid visa information is required!" }),
  visaDetails: zod.string().optional(),
  ageRange: zod.string().min(1, { message: "Age Range is required!" }),
  maritalStatus: zod.string().min(1, { message: "Marital Status is required!" }),
  residingInEurope: zod.string().min(1, { message: "Residing in Europe information is required!" }),
  europeanCountry: zod.string().optional(),
  childcareExperience: zod.string().min(1, { message: "Childcare experience information is required!" }),
  childcareExperienceDetails: zod.string().optional(),
  driversLicense: zod.string().min(1, { message: "Driver's license information is required!" }),
  driversLicenseDetails: zod.string().optional(),
  experienceAgeGroups: zod.array(zod.string()).min(1, { message: "At least one age group is required!" }),
  comfortableWithPets: zod.string().min(1, { message: "Comfortable with pets information is required!" }),
  petTypes: zod.string().optional(),
  teachingExperience: zod.string().min(1, { message: "Teaching experience information is required!" }),
  teachingSubjects: zod.string().optional(),
  employmentStatus: zod.string().min(1, { message: "Employment Status is required!" }),
  currentContractEnd: zod.string().optional(),
  preferredStartDate: zod.string().min(1, { message: "Preferred Start Date is required!" }),
  shareContactDetails: zod.string().min(1, { message: "Share contact details information is required!" }),
  smoke: zod.string().min(1, { message: "Smoking information is required!" }),
  allergies: zod.string().min(1, { message: "Allergies information is required!" }),
  allergyDetails: zod.string().optional(),
  languageEnglish: zod.string().min(1, { message: "English proficiency is required!" }),
  languageSwedish: zod.string().min(1, { message: "Swedish proficiency is required!" }),
  languageOther: zod.string().optional(),
  hobbies: zod.string().min(1, { message: "Hobbies and Interests are required!" }),
  salaryExpectation: zod.string().min(1, { message: "Salary Expectation is required!" }),
  preferredWorkingHours: zod.string().min(1, { message: "Preferred working hours are required!" }),
  reasonForAuPair: zod.string().min(1, { message: "Reason for becoming an Au Pair is required!" }),
  childcareCertifications: zod.string().min(1, { message: "Childcare certifications information is required!" }),
  certificationDetails: zod.string().optional(),
  additionalInfo: zod.string().optional(),
  termsAgreement: zod.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
  dataProcessingConsent: zod
    .boolean()
    .refine((val) => val === true, { message: "You must consent to data processing" }),
})

const steps = [
  "Personal Information",
  "Personal Status",
  "Experience and Skills",
  "Availability",
  "Lifestyle and Preferences",
  "Additional Information",
  "Declaration and Agreement",
]

export function PostNewEditForm() {
  const [activeStep, setActiveStep] = useState(0)
  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      genderOther: "",
      phoneNumber: "",
      emailAddress: "",
      residentialAddress: "",
      nationality: "",
      passportNumber: "",
      validVisa: "",
      visaDetails: "",
      ageRange: "",
      maritalStatus: "",
      residingInEurope: "",
      europeanCountry: "",
      childcareExperience: "",
      childcareExperienceDetails: "",
      driversLicense: "",
      driversLicenseDetails: "",
      experienceAgeGroups: [],
      comfortableWithPets: "",
      petTypes: "",
      teachingExperience: "",
      teachingSubjects: "",
      employmentStatus: "",
      currentContractEnd: "",
      preferredStartDate: "",
      shareContactDetails: "",
      smoke: "",
      allergies: "",
      allergyDetails: "",
      languageEnglish: "",
      languageSwedish: "",
      languageOther: "",
      hobbies: "",
      salaryExpectation: "",
      preferredWorkingHours: "",
      reasonForAuPair: "",
      childcareCertifications: "",
      certificationDetails: "",
      additionalInfo: "",
      termsAgreement: false,
      dataProcessingConsent: false,
    }),
    [],
  )

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(AuPairApplicationSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      toast.success("Form submitted successfully!")
      router.push(paths.dashboard.root)
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  })

  const watchGender = watch("gender")
  const watchValidVisa = watch("validVisa")
  const watchResidingInEurope = watch("residingInEurope")
  const watchChildcareExperience = watch("childcareExperience")
  const watchDriversLicense = watch("driversLicense")
  const watchComfortableWithPets = watch("comfortableWithPets")
  const watchTeachingExperience = watch("teachingExperience")
  const watchEmploymentStatus = watch("employmentStatus")
  const watchAllergies = watch("allergies")
  const watchChildcareCertifications = watch("childcareCertifications")

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]

  const ageRangeOptions = [
    { value: "18-21", label: "18–21" },
    { value: "22-25", label: "22–25" },
    { value: "26-30", label: "26–30" },
  ]

  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ]

  const experienceAgeGroupOptions = [
    { value: "0-2", label: "0–2 years" },
    { value: "3-5", label: "3–5 years" },
    { value: "6-10", label: "6–10 years" },
    { value: "11-15", label: "11–15 years" },
    { value: "16+", label: "16+ years" },
  ]

  const employmentStatusOptions = [
    { value: "working", label: "Working with a host family" },
    { value: "not-employed", label: "Not currently employed" },
  ]

  const languageProficiencyOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "fluent", label: "Fluent" },
    { value: "native", label: "Native" },
  ]

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Personal Information
            </Typography>
            <Field.Text name="fullName" label="Full Name (as per passport)" />
            <Field.Text
              name="dateOfBirth"
              label="Date of Birth (DD/MM/YYYY)"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Select native name="gender" label="Gender" InputLabelProps={{ shrink: true }}>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchGender === "other" && <Field.Text name="genderOther" label="Specify Gender" />}
            <Field.Text name="phoneNumber" label="Phone Number (Include country code)" />
            <Field.Text name="emailAddress" label="Email Address" />
            <Field.Text name="residentialAddress" label="Current Residential Address" className="full-width" />
            <Field.Text name="nationality" label="Nationality" />
            <Field.Text name="passportNumber" label="Passport Number" />
            <Field.Select
              native
              name="validVisa"
              label="Do you hold a valid visa/residence permit in Europe?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchValidVisa === "yes" && <Field.Text name="visaDetails" label="Specify type and expiry date" />}
          </Box>
        )
      case 1:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Personal Status
            </Typography>
            <Field.Select native name="ageRange" label="Age Range" InputLabelProps={{ shrink: true }}>
              {ageRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select native name="maritalStatus" label="Marital Status" InputLabelProps={{ shrink: true }}>
              {maritalStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="residingInEurope"
              label="Are you currently residing in Europe?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchResidingInEurope === "yes" && <Field.Text name="europeanCountry" label="Specify the country" />}
          </Box>
        )
      case 2:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Experience and Skills
            </Typography>
            <Field.Select
              native
              name="childcareExperience"
              label="Do you have previous childcare or AU Pair experience?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchChildcareExperience === "yes" && (
              <Field.Text
                name="childcareExperienceDetails"
                label="Describe in detail (duties, duration, age groups)"
                multiline
                rows={3}
                className="full-width"
              />
            )}
            <Field.Select
              native
              name="driversLicense"
              label="Do you hold a valid driver's license?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchDriversLicense === "yes" && (
              <Field.Text name="driversLicenseDetails" label="Specify issuing country and license class" />
            )}
            <Field.Autocomplete
              name="experienceAgeGroups"
              label="Age groups you have experience with"
              placeholder="Select all that apply"
              multiple
              options={experienceAgeGroupOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value}
            />
            <Field.Select
              native
              name="comfortableWithPets"
              label="Are you comfortable working in a household with pets?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchComfortableWithPets === "yes" && <Field.Text name="petTypes" label="Specify types of pets" />}
            <Field.Select
              native
              name="teachingExperience"
              label="Do you have teaching or tutoring experience?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchTeachingExperience === "yes" && (
              <Field.Text name="teachingSubjects" label="Specify subjects taught" />
            )}
          </Box>
        )
      case 3:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Availability
            </Typography>
            <Field.Select
              native
              name="employmentStatus"
              label="Current Employment Status"
              InputLabelProps={{ shrink: true }}
            >
              {employmentStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchEmploymentStatus === "working" && (
              <Field.Text
                name="currentContractEnd"
                label="When does your current contract end?"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            )}
            <Field.Text
              name="preferredStartDate"
              label="Preferred start date with a new host family"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Select
              native
              name="shareContactDetails"
              label="Are you willing to share your current host family's contact details for a reference check?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
          </Box>
        )
      case 4:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Lifestyle and Preferences
            </Typography>
            <Field.Select native name="smoke" label="Do you smoke?" InputLabelProps={{ shrink: true }}>
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="allergies"
              label="Do you have any allergies or medical conditions that the host family should be aware of?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchAllergies === "yes" && (
              <Field.Text name="allergyDetails" label="Please specify allergies or medical conditions" />
            )}
            <Field.Select native name="languageEnglish" label="English Proficiency" InputLabelProps={{ shrink: true }}>
              {languageProficiencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select native name="languageSwedish" label="Swedish Proficiency" InputLabelProps={{ shrink: true }}>
              {languageProficiencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Text name="languageOther" label="Other Languages (specify language and proficiency)" />
            <Field.Text name="hobbies" label="Hobbies and Interests" />
            <Field.Text name="salaryExpectation" label="Preferred Salary Expectation (Monthly, in SEK or EUR)" />
            <Field.Text name="preferredWorkingHours" label="Preferred working hours and tasks" />
          </Box>
        )
      case 5:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Additional Information
            </Typography>
            <Field.Text
              name="reasonForAuPair"
              label="Why do you want to become an AU Pair?"
              multiline
              rows={3}
              className="full-width"
            />
            <Field.Select
              native
              name="childcareCertifications"
              label="Have you completed any childcare or first-aid certifications?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchChildcareCertifications === "yes" && (
              <Field.Text name="certificationDetails" label="Specify certifications" />
            )}
            <Field.Text
              name="additionalInfo"
              label="Other Information You Wish to Share"
              multiline
              rows={3}
              className="full-width"
            />
          </Box>
        )
      case 6:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1", mb: 2 }}>
              Declaration and Agreement
            </Typography>
            <FormControlLabel
              control={<Checkbox name="termsAgreement" />}
              label="I hereby confirm that all the information provided is true and accurate to the best of my knowledge."
              sx={{ gridColumn: "1 / -1" }}
            />
            <FormControlLabel
              control={<Checkbox name="dataProcessingConsent" />}
              label="I agree to the terms and conditions of Sweden Relocators AB regarding the AU Pair placement process."
              sx={{ gridColumn: "1 / -1" }}
            />
            <FormControlLabel
              control={<Checkbox name="dataProcessingConsent" />}
              label="I consent to the processing of my personal data for recruitment and placement purposes in compliance with GDPR."
              sx={{ gridColumn: "1 / -1" }}
            />
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              AU Pair Application Form
            </Typography>

            {renderStepContent(activeStep)}

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Submit Application
                </LoadingButton>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-labelContainer": {
                        color: (theme) =>
                          activeStep === steps.indexOf(label)
                            ? theme.palette.primary.main
                            : theme.palette.text.disabled,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

