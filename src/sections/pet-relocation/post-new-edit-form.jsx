import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useEffect, useState } from "react"
import * as zod from "zod"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { CardMedia } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import LinearProgress from "@mui/material/LinearProgress"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"

import { useBoolean } from "src/hooks/use-boolean"

import {
  _tags,
  APPOINTMENT_TYPE_OPTIONS,
  APPOINTMENT_CATEGORY_OPTIONS,
  APPOINTMENT_COUNTRY_OPTIONS,
  APPOINTMENT_TIME_OPTIONS,
} from "src/_mock"

import { toast } from "src/components/snackbar"
import { Form, Field, schemaHelper } from "src/components/hook-form"

// ----------------------------------------------------------------------

const petSchema = zod.object({
  petName: zod.string().min(1, { message: "Pet Name is required!" }),
  petAge: zod.string(),
  petType: zod.string(),
  petBreed: zod.string().min(1, { message: "Pet Breed is required!" }),
  petGender: zod.string(),
  petWeight: zod.string(),
  microchipNumber: zod.string().min(1, { message: "Microchip Number is required!" }),
  rabiesVaccine: zod.string(),
  otherVaccinations: zod.string(),
  healthCertificate: zod.string(),
  specialNeeds: zod.string().optional(),
  feedingInstructions: zod.string().optional(),
  behavioralTraits: zod.string(),
  travelCrateDimensions: zod.string().optional(),
})

export const PetRelocationSchema = zod.object({
  clientType: zod.string(),
  fullName: zod.string().min(1, { message: "Full Name is required!" }),
  contactNumber: zod.string().min(1, { message: "Contact Number is required!" }),
  emailAddress: zod.string().email({ message: "Invalid email address" }),
  residentialAddress: zod.string().min(1, { message: "Residential Address is required!" }),
  emergencyContactName: zod.string().min(1, { message: "Emergency Contact Name is required!" }),
  emergencyContactNumber: zod.string().min(1, { message: "Emergency Contact Number is required!" }),
  fromCountry: zod.string().min(1, { message: "From Country is required!" }),
  fromAirport: zod.string().min(1, { message: "From Airport is required!" }),
  destinationCountry: zod.string().min(1, { message: "Destination Country is required!" }),
  destinationAirport: zod.string().min(1, { message: "Destination Airport is required!" }),
  preferredTravelDate: zod.string().min(1, { message: "Preferred Travel Date is required!" }),
  preferredAirline: zod.string().optional(),
  deliveryPreference: zod.string(),
  customsClearance: zod.string(),
  travelCrateRequirement: zod.string(),
  additionalServices: zod.string().array(),
  numberOfPets: zod.string(),
  pets: zod.array(petSchema),
  additionalInfo: zod.string().optional(),
})

// ----------------------------------------------------------------------

export function PetRelocationForm({ currentPetRelocation }) {
  const router = useRouter()

  const preview = useBoolean()
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = ["Client Information", "Relocation Details", "Pet Information"]

  const defaultValues = useMemo(
    () => ({
      clientType: currentPetRelocation?.clientType || "",
      fullName: currentPetRelocation?.fullName || "",
      contactNumber: currentPetRelocation?.contactNumber || "",
      emailAddress: currentPetRelocation?.emailAddress || "",
      residentialAddress: currentPetRelocation?.residentialAddress || "",
      emergencyContactName: currentPetRelocation?.emergencyContactName || "",
      emergencyContactNumber: currentPetRelocation?.emergencyContactNumber || "",
      fromCountry: currentPetRelocation?.fromCountry || "",
      fromAirport: currentPetRelocation?.fromAirport || "",
      destinationCountry: currentPetRelocation?.destinationCountry || "",
      destinationAirport: currentPetRelocation?.destinationAirport || "",
      preferredTravelDate: currentPetRelocation?.preferredTravelDate || "",
      preferredAirline: currentPetRelocation?.preferredAirline || "",
      deliveryPreference: currentPetRelocation?.deliveryPreference || "",
      customsClearance: currentPetRelocation?.customsClearance || "",
      travelCrateRequirement: currentPetRelocation?.travelCrateRequirement || "",
      additionalServices: currentPetRelocation?.additionalServices || [],
      numberOfPets: currentPetRelocation?.numberOfPets || "1",
      pets: currentPetRelocation?.pets || [
        {
          petName: "",
          petAge: "",
          petType: "",
          petBreed: "",
          petGender: "",
          petWeight: "",
          microchipNumber: "",
          rabiesVaccine: "",
          otherVaccinations: "",
          healthCertificate: "",
          specialNeeds: "",
          feedingInstructions: "",
          behavioralTraits: "",
          travelCrateDimensions: "",
        },
      ],
      additionalInfo: currentPetRelocation?.additionalInfo || "",
    }),
    [currentPetRelocation],
  )

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(PetRelocationSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const values = watch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pets",
  })

  useEffect(() => {
    if (currentPetRelocation) {
      reset(defaultValues)
    }
  }, [currentPetRelocation, defaultValues, reset])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "numberOfPets") {
        const newNumberOfPets = Number.parseInt(value.numberOfPets, 10)
        const currentPets = fields.length
        if (newNumberOfPets > currentPets) {
          for (let i = currentPets; i < newNumberOfPets; i += 1) {
            append({
              petName: "",
              petAge: "",
              petType: "",
              petBreed: "",
              petGender: "",
              petWeight: "",
              microchipNumber: "",
              rabiesVaccine: "",
              otherVaccinations: "",
              healthCertificate: "",
              specialNeeds: "",
              feedingInstructions: "",
              behavioralTraits: "",
              travelCrateDimensions: "",
            })
          }
        } else if (newNumberOfPets < currentPets) {
          for (let i = currentPets - 1; i >= newNumberOfPets; i -= 1) {
            remove(i)
          }
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, fields, append, remove])

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      preview.onFalse()
      toast.success(currentPetRelocation ? "Update success!" : "Create success!")
      router.push(paths.dashboard.post.root)
      console.info("DATA", data)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An error occurred while submitting the form. Please try again.")
    }
  })

  const clientTypeOptions = [
    { value: "myself", label: "My Self" },
    { value: "other", label: "Other Person" },
  ]

  const countryOptions = APPOINTMENT_COUNTRY_OPTIONS
  const airportOptions = [
    { value: "airport1", label: "Airport 1" },
    { value: "airport2", label: "Airport 2" },
    // Add more airports as needed
  ]

  const airlineOptions = [
    { value: "airline1", label: "Airline 1" },
    { value: "airline2", label: "Airline 2" },
    // Add more airlines as needed
  ]

  const deliveryOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    // Add more options as needed
  ]

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]

  const petTypeOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    // Add more pet types as needed
  ]

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ]

  const weightOptions = Array.from({ length: 200 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1} lbs` }))

  const ageOptions = Array.from({ length: 21 }, (_, i) => ({ value: `${i}`, label: `${i} years` }))

  const numberOfPetsOptions = Array.from({ length: 10 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }))

  const calculateProgress = (step, stepValid) => {
    const baseProgress = (step * 100) / 3
    const fieldProgress = stepValid ? 100 / 3 : 0
    return Math.min(100, baseProgress + fieldProgress)
  }

  const validateStep = (step) => {
    let stepIsValid = true
    const formValues = methods.getValues()

    switch (step) {
      case 0:
        stepIsValid = !!(
          formValues.clientType &&
          formValues.fullName &&
          formValues.contactNumber &&
          formValues.emailAddress &&
          formValues.residentialAddress &&
          formValues.emergencyContactName &&
          formValues.emergencyContactNumber
        )
        break
      case 1:
        stepIsValid = !!(
          formValues.fromCountry &&
          formValues.fromAirport &&
          formValues.destinationCountry &&
          formValues.destinationAirport &&
          formValues.preferredTravelDate
        )
        break
      case 2:
        stepIsValid = formValues.pets?.every((pet) => pet.petName && pet.petBreed && pet.microchipNumber)
        break
      default:
        stepIsValid = false
        break
    }
    return stepIsValid
  }

  const handleNext = () => {
    const stepIsValid = validateStep(activeStep)
    if (stepIsValid) {
      setActiveStep((prev) => {
        const newStep = prev + 1
        setProgress(calculateProgress(newStep, validateStep(newStep)))
        return newStep
      })
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => {
      const newStep = prev - 1
      setProgress(calculateProgress(newStep, validateStep(newStep)))
      return newStep
    })
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Field.Select native name="clientType" label="Client Type" InputLabelProps={{ shrink: true }}>
              {clientTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Text name="fullName" label="Full Name" />
            <Field.Text name="contactNumber" label="Contact Number" />
            <Field.Text name="emailAddress" label="Email Address" />
            <Field.Text name="residentialAddress" label="Residential Address" className="full-width" />
            <Field.Text name="emergencyContactName" label="Emergency Contact Name" />
            <Field.Text name="emergencyContactNumber" label="Emergency Contact Number" />
          </Box>
        )
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Field.Select native name="fromCountry" label="From Country" InputLabelProps={{ shrink: true }}>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select native name="fromAirport" label="From Airport" InputLabelProps={{ shrink: true }}>
              {airportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="destinationCountry"
              label="Destination Country"
              InputLabelProps={{ shrink: true }}
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="destinationAirport"
              label="Destination Airport"
              InputLabelProps={{ shrink: true }}
            >
              {airportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Text name="preferredTravelDate" label="Preferred Travel Date" placeholder="MM/DD/YYYY" />
            <Field.Select
              native
              name="preferredAirline"
              label="Preferred Airline (if any)"
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select an airline</option>
              {airlineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="deliveryPreference"
              label="Delivery Preference"
              InputLabelProps={{ shrink: true }}
            >
              {deliveryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="customsClearance"
              label="Customs Clearance Assistance Required"
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
              name="travelCrateRequirement"
              label="Travel Crate Requirement"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Autocomplete
              name="additionalServices"
              label="Additional Services Needed"
              multiple
              freeSolo
              options={[]}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} label={option} size="small" />
                ))
              }
            />
          </Box>
        )
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Field.Select
              native
              name="numberOfPets"
              label="Number of Pets to Relocate"
              InputLabelProps={{ shrink: true }}
            >
              {numberOfPetsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {fields.map((field, index) => (
              <Box key={field.id} sx={{ gridColumn: "1 / -1", mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Pet {index + 1} Details
                </Typography>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  <Field.Text name={`pets.${index}.petName`} label="Pet Name" />

                  <Field.Select
                    native
                    name={`pets.${index}.petAge`}
                    label="Pet Age (in years)"
                    InputLabelProps={{ shrink: true }}
                  >
                    {ageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select
                    native
                    name={`pets.${index}.petType`}
                    label="Type of Pet"
                    InputLabelProps={{ shrink: true }}
                  >
                    {petTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Text name={`pets.${index}.petBreed`} label="Pet Breed" />

                  <Field.Select
                    native
                    name={`pets.${index}.petGender`}
                    label="Pet Gender"
                    InputLabelProps={{ shrink: true }}
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select
                    native
                    name={`pets.${index}.petWeight`}
                    label="Pet Weight (in lbs)"
                    InputLabelProps={{ shrink: true }}
                  >
                    {weightOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Text name={`pets.${index}.microchipNumber`} label="Microchip Number" />

                  <Field.Select
                    native
                    name={`pets.${index}.rabiesVaccine`}
                    label="Rabies Vaccine"
                    InputLabelProps={{ shrink: true }}
                  >
                    {yesNoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Text name={`pets.${index}.otherVaccinations`} label="Other Vaccinations" />

                  <Field.Select
                    native
                    name={`pets.${index}.healthCertificate`}
                    label="Health Certificate Available"
                    InputLabelProps={{ shrink: true }}
                  >
                    {yesNoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Text
                    name={`pets.${index}.specialNeeds`}
                    label="Special Needs/Medical Conditions"
                    className="full-width"
                  />
                  <Field.Text
                    name={`pets.${index}.feedingInstructions`}
                    label="Feeding Instructions"
                    className="full-width"
                  />

                  <Field.Select
                    native
                    name={`pets.${index}.behavioralTraits`}
                    label="Behavioral Traits"
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">Select a trait</option>
                    <option value="friendly">Friendly</option>
                    <option value="aggressive">Aggressive</option>
                    <option value="anxious">Anxious</option>
                    <option value="calm">Calm</option>
                  </Field.Select>

                  <Field.Text name={`pets.${index}.travelCrateDimensions`} label="Travel Crate Dimensions (if owned)" />
                </Box>
              </Box>
            ))}
            <Field.Text
              name="additionalInfo"
              label="Anything Else We Should Know?"
              className="full-width"
              multiline
              rows={3}
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
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ width: "100%", mb: 4 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  mb: 3,
                }}
              />
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {activeStep === 0 && (
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1" }}>
                  Client Information
                </Typography>

                <Field.Select native name="clientType" label="Client Type" InputLabelProps={{ shrink: true }}>
                  {clientTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Text name="fullName" label="Full Name" />
                <Field.Text name="contactNumber" label="Contact Number" />
                <Field.Text name="emailAddress" label="Email Address" />
                <Field.Text name="residentialAddress" label="Residential Address" className="full-width" />
                <Field.Text name="emergencyContactName" label="Emergency Contact Name" />
                <Field.Text name="emergencyContactNumber" label="Emergency Contact Number" />
              </Box>
            )}

            {activeStep === 1 && (
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1" }}>
                  Relocation Details
                </Typography>

                <Field.Select native name="fromCountry" label="From Country" InputLabelProps={{ shrink: true }}>
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Select native name="fromAirport" label="From Airport" InputLabelProps={{ shrink: true }}>
                  {airportOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Select
                  native
                  name="destinationCountry"
                  label="Destination Country"
                  InputLabelProps={{ shrink: true }}
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Select
                  native
                  name="destinationAirport"
                  label="Destination Airport"
                  InputLabelProps={{ shrink: true }}
                >
                  {airportOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Text name="preferredTravelDate" label="Preferred Travel Date" placeholder="MM/DD/YYYY" />

                <Field.Select
                  native
                  name="preferredAirline"
                  label="Preferred Airline (if any)"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="">Select an airline</option>
                  {airlineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Select
                  native
                  name="deliveryPreference"
                  label="Delivery Preference"
                  InputLabelProps={{ shrink: true }}
                >
                  {deliveryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Select
                  native
                  name="customsClearance"
                  label="Customs Clearance Assistance Required"
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
                  name="travelCrateRequirement"
                  label="Travel Crate Requirement"
                  InputLabelProps={{ shrink: true }}
                >
                  {yesNoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                <Field.Autocomplete
                  name="additionalServices"
                  label="Additional Services Needed"
                  multiple
                  freeSolo
                  options={[]}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} label={option} size="small" />
                    ))
                  }
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <Typography variant="subtitle1" sx={{ gridColumn: "1 / -1" }}>
                  Pet Information
                </Typography>

                <Field.Select
                  native
                  name="numberOfPets"
                  label="Number of Pets to Relocate"
                  InputLabelProps={{ shrink: true }}
                >
                  {numberOfPetsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>

                {fields.map((field, index) => (
                  <Box key={field.id} sx={{ gridColumn: "1 / -1", mt: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Pet {index + 1} Details
                    </Typography>
                    <Box
                      rowGap={3}
                      columnGap={2}
                      display="grid"
                      gridTemplateColumns={{
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                      }}
                    >
                      <Field.Text name={`pets.${index}.petName`} label="Pet Name" />

                      <Field.Select
                        native
                        name={`pets.${index}.petAge`}
                        label="Pet Age (in years)"
                        InputLabelProps={{ shrink: true }}
                      >
                        {ageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>

                      <Field.Select
                        native
                        name={`pets.${index}.petType`}
                        label="Type of Pet"
                        InputLabelProps={{ shrink: true }}
                      >
                        {petTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>

                      <Field.Text name={`pets.${index}.petBreed`} label="Pet Breed" />

                      <Field.Select
                        native
                        name={`pets.${index}.petGender`}
                        label="Pet Gender"
                        InputLabelProps={{ shrink: true }}
                      >
                        {genderOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>

                      <Field.Select
                        native
                        name={`pets.${index}.petWeight`}
                        label="Pet Weight (in lbs)"
                        InputLabelProps={{ shrink: true }}
                      >
                        {weightOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>

                      <Field.Text name={`pets.${index}.microchipNumber`} label="Microchip Number" />

                      <Field.Select
                        native
                        name={`pets.${index}.rabiesVaccine`}
                        label="Rabies Vaccine"
                        InputLabelProps={{ shrink: true }}
                      >
                        {yesNoOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>

                      <Field.Text name={`pets.${index}.otherVaccinations`} label="Other Vaccinations" />

                      <Field.Select
                        native
                        name={`pets.${index}.healthCertificate`}
                        label="Health Certificate Available"
                        InputLabelProps={{ shrink: true }}
                      >
                        {yesNoOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>

                      <Field.Text
                        name={`pets.${index}.specialNeeds`}
                        label="Special Needs/Medical Conditions"
                        className="full-width"
                      />
                      <Field.Text
                        name={`pets.${index}.feedingInstructions`}
                        label="Feeding Instructions"
                        className="full-width"
                      />

                      <Field.Select
                        native
                        name={`pets.${index}.behavioralTraits`}
                        label="Behavioral Traits"
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="">Select a trait</option>
                        <option value="friendly">Friendly</option>
                        <option value="aggressive">Aggressive</option>
                        <option value="anxious">Anxious</option>
                        <option value="calm">Calm</option>
                      </Field.Select>

                      <Field.Text
                        name={`pets.${index}.travelCrateDimensions`}
                        label="Travel Crate Dimensions (if owned)"
                      />
                    </Box>
                  </Box>
                ))}

                <Field.Text
                  name="additionalInfo"
                  label="Anything Else We Should Know?"
                  className="full-width"
                  multiline
                  rows={3}
                />
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Submit Pet Relocation Query
                  </LoadingButton>
                ) : (
                  <Button variant="contained" onClick={handleNext} disabled={!validateStep(activeStep)}>
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Pet Shipping Services to Europe
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Powered by Trusted Third-Party Providers
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              At Sweden Relocators AB, we understand the complexities of relocating with pets. To simplify the process,
              we offer specialized pet relocation services through our trusted third-party partners. Our role is to
              coordinate and facilitate the process, ensuring compliance with all legal requirements for pet transport
              to Europe.
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
              Comprehensive Pet Relocation Process
            </Typography>
            <ol>
              <li>Microchip Identification</li>
              <li>Rabies Vaccination & Certificate</li>
              <li>EU Health Certificate</li>
              <li>USDA Endorsements (For U.S.-based clients)</li>
              <li>Airline Health Certificate</li>
              <li>EU Five-Day Rule</li>
              <li>Required Documentation for Customs Clearance</li>
            </ol>
            <Typography variant="body2" sx={{ mt: 3 }}>
              Our Role and Responsibility: Sweden Relocators AB acts solely as a facilitator,connecting clients with
              specialized third-party pet transport providers. We are not responsible for the execution, quality or
              outcome of the services provided by these partners. All communication, agreements, and payments related to
              these services are managed directly between the client and the third-party provider.
            </Typography>
          </Card>
          <Card sx={{ p: 3, mt: 6 }}>
            <CardMedia component="img" height="300" image="/assets/images/cat.png" alt="image description" />
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

export default PetRelocationForm

