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

// Schema definition remains the same
const LegalAssistanceSchema = zod.object({
  familyName: zod.string().min(1, { message: "Family Name is required!" }),
  parentGuardian1: zod.string().min(1, { message: "Parent/Guardian 1 Full Name is required!" }),
  parentGuardian2: zod.string().min(1, { message: "Parent/Guardian 2 Full Name is required!" }),
  phoneNumber: zod.string().min(1, { message: "Phone Number is required!" }),
  emailAddress: zod.string().email({ message: "Invalid email address" }),
  residentialAddress: zod.string().min(1, { message: "Residential Address is required!" }),
  nationality: zod.string().min(1, { message: "Nationality is required!" }),
  languagesSpoken: zod.string().min(1, { message: "Languages Spoken at Home is required!" }),
  specialNeeds: zod.string().min(1, { message: "Special Needs information is required!" }),
  specialNeedsDetails: zod.string().optional(),
  numberOfChildren: zod.string().min(1, { message: "Number of Children is required!" }),
  childrenDetails: zod
    .array(
      zod.object({
        name: zod.string().min(1, { message: "Child Name is required!" }),
        age: zod.string().min(1, { message: "Child Age is required!" }),
        gender: zod.string().min(1, { message: "Child Gender is required!" }),
        specialNeeds: zod.string().optional(),
        allergies: zod.string().optional(),
      }),
    )
    .optional(),
  hasPets: zod.string().min(1, { message: "Pet information is required!" }),
  petDetails: zod.string().optional(),
  residenceType: zod.string().min(1, { message: "Type of residence is required!" }),
  residenceTypeOther: zod.string().optional(),
  auPairPrivateRoom: zod.string().min(1, { message: "AU Pair private room information is required!" }),
  auPairRoomDetails: zod.string().optional(),
  preferredStartDate: zod.string().min(1, { message: "Preferred Start Date is required!" }),
  durationOfStay: zod.string().min(1, { message: "Duration of Stay is required!" }),
  durationOfStayOther: zod.string().optional(),
  preferredAgeRange: zod.string().min(1, { message: "Preferred Age Range is required!" }),
  preferredGender: zod.string().min(1, { message: "Preferred Gender is required!" }),
  primaryTasks: zod.array(zod.string()).min(1, { message: "At least one Primary Task is required!" }),
  primaryTasksOther: zod.string().optional(),
  workingHoursWeekdays: zod.string().min(1, { message: "Weekday Working Hours are required!" }),
  workingHoursWeekends: zod.string().min(1, { message: "Weekend Working Hours are required!" }),
  householdSmoke: zod.string().min(1, { message: "Household smoking information is required!" }),
  auPairSmoke: zod.string().min(1, { message: "AU Pair smoking preference is required!" }),
  auPairDrive: zod.string().min(1, { message: "AU Pair driving expectation is required!" }),
  vehicleProvided: zod.string().optional(),
  specialDiet: zod.string().min(1, { message: "Special diet information is required!" }),
  specialDietDetails: zod.string().optional(),
  preferredLanguages: zod.string().min(1, { message: "Preferred Language(s) is required!" }),
  amenities: zod.array(zod.string()).min(1, { message: "At least one Amenity is required!" }),
  amenitiesOther: zod.string().optional(),
  allowance: zod.string().min(1, { message: "Allowance information is required!" }),
  paidHolidays: zod.string().min(1, { message: "Paid holidays information is required!" }),
  paidHolidaysDetails: zod.string().optional(),
  householdRules: zod.string().optional(),
  previousAuPair: zod.string().min(1, { message: "Previous AU Pair experience information is required!" }),
  previousAuPairDetails: zod.string().optional(),
  previousAuPairReference: zod.string().min(1, { message: "Previous AU Pair reference information is required!" }),
  previousAuPairReferenceDetails: zod.string().optional(),
  hostingReason: zod.string().min(1, { message: "Reason for hosting an AU Pair is required!" }),
  additionalInfo: zod.string().optional(),
  termsAgreement: zod.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
  dataProcessingConsent: zod
    .boolean()
    .refine((val) => val === true, { message: "You must consent to data processing" }),
})

const steps = [
  "Family Information",
  "Household Details",
  "AU Pair Requirements",
  "Family Lifestyle and Preferences",
  "Accommodation and Benefits",
  "Previous Experience",
  "Declaration and Agreement",
]

const countryOptions = [
  { value: "sweden", label: "Sweden" },
  { value: "norway", label: "Norway" },
  { value: "denmark", label: "Denmark" },
  { value: "finland", label: "Finland" },
]

const currencyOptions = [
  { value: "sek", label: "SEK" },
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
]

export function PostNewEditForm() {
  const [activeStep, setActiveStep] = useState(0)
  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      familyName: "",
      parentGuardian1: "",
      parentGuardian2: "",
      phoneNumber: "",
      emailAddress: "",
      residentialAddress: "",
      nationality: "",
      languagesSpoken: "",
      specialNeeds: "",
      specialNeedsDetails: "",
      numberOfChildren: "",
      childrenDetails: [{ name: "", age: "", gender: "", specialNeeds: "", allergies: "" }],
      hasPets: "",
      petDetails: "",
      residenceType: "",
      residenceTypeOther: "",
      auPairPrivateRoom: "",
      auPairRoomDetails: "",
      preferredStartDate: "",
      durationOfStay: "",
      durationOfStayOther: "",
      preferredAgeRange: "",
      preferredGender: "",
      primaryTasks: [],
      primaryTasksOther: "",
      workingHoursWeekdays: "",
      workingHoursWeekends: "",
      householdSmoke: "",
      auPairSmoke: "",
      auPairDrive: "",
      vehicleProvided: "",
      specialDiet: "",
      specialDietDetails: "",
      preferredLanguages: "",
      amenities: [],
      amenitiesOther: "",
      allowance: "",
      paidHolidays: "",
      paidHolidaysDetails: "",
      householdRules: "",
      previousAuPair: "",
      previousAuPairDetails: "",
      previousAuPairReference: "",
      previousAuPairReferenceDetails: "",
      hostingReason: "",
      additionalInfo: "",
      termsAgreement: false,
      dataProcessingConsent: false,
      from: "",
      to: "",
      currency: "",
    }),
    [],
  )

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(LegalAssistanceSchema),
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

  // Watch functions remain the same
  const watchSpecialNeeds = watch("specialNeeds")
  const watchHasPets = watch("hasPets")
  const watchResidenceType = watch("residenceType")
  const watchAuPairPrivateRoom = watch("auPairPrivateRoom")
  const watchDurationOfStay = watch("durationOfStay")
  const watchAuPairDrive = watch("auPairDrive")
  const watchSpecialDiet = watch("specialDiet")
  const watchPaidHolidays = watch("paidHolidays")
  const watchPreviousAuPair = watch("previousAuPair")
  const watchPreviousAuPairReference = watch("previousAuPairReference")

  // Options remain the same
  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]

  const residenceTypeOptions = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "other", label: "Other" },
  ]

  const durationOptions = [
    { value: "6months", label: "6 months" },
    { value: "12months", label: "12 months" },
    { value: "other", label: "Other" },
  ]

  const ageRangeOptions = [
    { value: "18-21", label: "18–21" },
    { value: "22-25", label: "22–25" },
    { value: "26-30", label: "26–30" },
  ]

  const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "no-preference", label: "No Preference" },
  ]

  const taskOptions = [
    { value: "childcare", label: "Childcare" },
    { value: "housekeeping", label: "Light Housekeeping" },
    { value: "cooking", label: "Cooking" },
    { value: "school", label: "School Drop-off/Pick-up" },
    { value: "tutoring", label: "Tutoring/Homework Assistance" },
    { value: "petcare", label: "Pet Care" },
    { value: "other", label: "Other" },
  ]

  const amenityOptions = [
    { value: "private-room", label: "Private Room" },
    { value: "private-bathroom", label: "Private Bathroom" },
    { value: "internet", label: "Internet/Wi-Fi Access" },
    { value: "car", label: "Access to Family Car" },
    { value: "transport-card", label: "Public Transport Card" },
    { value: "gym", label: "Gym Membership" },
    { value: "other", label: "Other" },
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
              Family Information
            </Typography>
            <Field.Text name="familyName" label="Family Name" />
            <Field.Text name="parentGuardian1" label="Parent/Guardian 1 - Full Name" />
            <Field.Text name="parentGuardian2" label="Parent/Guardian 2 - Full Name" />
            <Field.Text name="phoneNumber" label="Phone Number (Include country code)" />
            <Field.Text name="emailAddress" label="Email Address" />
            <Field.Text name="residentialAddress" label="Residential Address" className="full-width" />
            <Field.Text name="nationality" label="Nationality" />
            <Field.Text name="languagesSpoken" label="Languages Spoken at Home" />
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
              Household Composition
            </Typography>
            <Field.Text name="numberOfChildren" label="Number of Children" type="number" />
            <Field.Select native name="hasPets" label="Do you have pets at home?" InputLabelProps={{ shrink: true }}>
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchHasPets === "yes" && <Field.Text name="petDetails" label="Specify type and number of pets" />}
            <Field.Select native name="residenceType" label="Type of residence" InputLabelProps={{ shrink: true }}>
              {residenceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchResidenceType === "other" && <Field.Text name="residenceTypeOther" label="Specify residence type" />}
            <Field.Select
              native
              name="auPairPrivateRoom"
              label="Does the AU Pair have a private room?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchAuPairPrivateRoom === "yes" && (
              <Field.Text name="auPairRoomDetails" label="Additional details (e.g., bathroom access, amenities)" />
            )}
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
              AU Pair Requirements
            </Typography>
            <Field.Text
              name="preferredStartDate"
              label="Preferred Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Select native name="durationOfStay" label="Duration of Stay" InputLabelProps={{ shrink: true }}>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchDurationOfStay === "other" && <Field.Text name="durationOfStayOther" label="Specify duration" />}
            <Field.Select
              native
              name="preferredAgeRange"
              label="Preferred Age Range for the AU Pair"
              InputLabelProps={{ shrink: true }}
            >
              {ageRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="preferredGender"
              label="Preferred Gender of the AU Pair"
              InputLabelProps={{ shrink: true }}
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Autocomplete
              name="primaryTasks"
              label="Primary Tasks for the AU Pair"
              placeholder="Select all that apply"
              multiple
              options={taskOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value}
            />
            {methods.watch("primaryTasks").includes("other") && (
              <Field.Text name="primaryTasksOther" label="Specify other tasks" />
            )}
            <Field.Text name="workingHoursWeekdays" label="Preferred Working Hours (Weekdays)" />
            <Field.Text name="workingHoursWeekends" label="Preferred Working Hours (Weekends)" />
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
              Family Lifestyle and Preferences
            </Typography>
            <Field.Select
              native
              name="householdSmoke"
              label="Do any household members smoke?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="auPairSmoke"
              label="Are you comfortable with an AU Pair who smokes (outside the house)?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="auPairDrive"
              label="Do you expect the AU Pair to drive?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchAuPairDrive === "yes" && (
              <Field.Select
                native
                name="vehicleProvided"
                label="Will a vehicle be provided?"
                InputLabelProps={{ shrink: true }}
              >
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
            )}
            <Field.Select
              native
              name="specialDiet"
              label="Do you follow any special diet or have cultural/religious practices the AU Pair should be aware of?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchSpecialDiet === "yes" && <Field.Text name="specialDietDetails" label="Please explain" />}
            <Field.Text name="preferredLanguages" label="Preferred Language(s) for Communication with the AU Pair" />
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
              Accommodation and Benefits
            </Typography>
            <Field.Autocomplete
              name="amenities"
              label="What amenities will be available for the AU Pair?"
              placeholder="Select all that apply"
              multiple
              options={amenityOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value}
            />
            {methods.watch("amenities").includes("other") && (
              <Field.Text name="amenitiesOther" label="Specify other amenities" />
            )}
            <Field.Text name="allowance" label="Offered Weekly/Monthly Allowance (in SEK or EUR)" />
            <Field.Select
              native
              name="paidHolidays"
              label="Will you provide paid holidays/vacation days?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchPaidHolidays === "yes" && <Field.Text name="paidHolidaysDetails" label="Specify details" />}
            <Field.Text
              name="householdRules"
              label="Any household rules or guidelines the AU Pair should follow?"
              multiline
              rows={3}
              className="full-width"
            />
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
              Previous AU Pair Experience
            </Typography>
            <Field.Select
              native
              name="previousAuPair"
              label="Have you hosted an AU Pair before?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchPreviousAuPair === "yes" && (
              <Field.Text
                name="previousAuPairDetails"
                label="Provide details (duration, nationality, duties)"
                multiline
                rows={3}
                className="full-width"
              />
            )}
            <Field.Select
              native
              name="previousAuPairReference"
              label="May we contact your previous AU Pair for a reference?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchPreviousAuPairReference === "yes" && (
              <Field.Text name="previousAuPairReferenceDetails" label="Contact details" />
            )}
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
            <Field.Text
              name="hostingReason"
              label="Why would you like to host an AU Pair?"
              multiline
              rows={3}
              className="full-width"
            />
            <Field.Text
              name="additionalInfo"
              label="Any additional information for potential AU Pair candidates"
              multiline
              rows={3}
              className="full-width"
            />
            <FormControlLabel
              control={<Checkbox name="termsAgreement" />}
              label="We confirm that the information provided is accurate and complete."
              sx={{ gridColumn: "1 / -1" }}
            />
            <FormControlLabel
              control={<Checkbox name="dataProcessingConsent" />}
              label="We agree to the terms and conditions and consent to data processing."
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
              AU Pair Host Family Application Form
            </Typography>

            {renderStepContent(activeStep)}

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <LoadingButton 
                type="submit" 
                variant="contained" 
                loading={isSubmitting} 
                onClick={() => handleSubmit()}
              >
                Submit Form
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
          <Card sx={{ p: 3, mb: 3 }}>
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

