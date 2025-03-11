"use client"

import { z as zod } from "zod"
import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import LoadingButton from "@mui/lab/LoadingButton"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"
import { toast } from "src/components/snackbar"
import { countries } from "src/assets/data"
import { useBoolean } from "src/hooks/use-boolean"
import { Iconify } from "src/components/iconify"
import { Form, Field } from "src/components/hook-form"

import { signUp } from "../../context/jwt"
import { useAuthContext } from "../../hooks"
import { FormHead } from "../../components/form-head"
import { SignUpTerms } from "../../components/sign-up-terms"

// ----------------------------------------------------------------------

export const SignUpSchema = zod
  .object({
    firstName: zod.string().min(1, { message: "First name is required!" }),
    lastName: zod.string().min(1, { message: "Last name is required!" }),
    dateOfBirth: zod
      .string()
      .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
    nationality: zod
      .union([zod.string().min(1, { message: "Country is required!" }), zod.number().int().positive()])
      .transform((value) => {
        if (typeof value === "string") {
          const numValue = Number.parseInt(value, 10)
          return !Number.isNaN(numValue) ? numValue : value
        }
        return value
      }),
    placeofbirth: zod
      .union([zod.string().min(1, { message: "Country is required!" }), zod.number().int().positive()])
      .transform((value) => {
        if (typeof value === "string") {
          const numValue = Number.parseInt(value, 10)
          return !Number.isNaN(numValue) ? numValue : value
        }
        return value
      }),
    countryresiding: zod
      .union([zod.string().min(1, { message: "Country is required!" }), zod.number().int().positive()])
      .transform((value) => {
        if (typeof value === "string") {
          const numValue = Number.parseInt(value, 10)
          return !Number.isNaN(numValue) ? numValue : value
        }
        return value
      }),
    address: zod.string().min(1, { message: "Address is required!" }),
    city: zod.string().min(1, { message: "City is required!" }),
    postalCode: zod.string().min(1, { message: "PostalCode is required!" }),

    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),
    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    password_confirmation: zod.string().min(1, { message: "Confirm Password is required!" }),
    phonenumber: zod
      .string()
      .min(1, { message: "Phone number is required!" })
      .regex(/^\+\d{7,14}$/, { message: "Phone number must start with + and be followed by 7 to 14 digits" }),

    gender: zod.string().refine((value) => value !== "Choose Option" && value !== "", {
      message: "Please select a gender",
    }),
    is_term_accepted: zod.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext()

  const router = useRouter()

  const password = useBoolean()
  const passwordConfirmation = useBoolean()

  const [errorMsg, setErrorMsg] = useState("")
  const [genderOptions, setGenderOptions] = useState([{ value: "Choose Option", label: "Choose Option" }])
  const [isLoadingGenders, setIsLoadingGenders] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState(["Step 1", "Step 2", "Step 3"])

  const handleNext = (e) => {
    // Prevent form submission
    e.preventDefault()

    if (activeStep === 0) {
      // Validate step 1 fields
      methods.trigger(["firstName", "lastName", "email", "password", "password_confirmation"]).then((isValid) => {
        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
          toast.error("Please fill in all required fields correctly")
        }
      })
    } else if (activeStep === 1) {
      // Validate step 2 fields
      methods.trigger(["dateOfBirth", "nationality", "placeofbirth", "countryresiding", "gender"]).then((isValid) => {
        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
          toast.error("Please fill in all required fields correctly")
        }
      })
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = (e) => {
    // Prevent form submission
    e.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  useEffect(() => {
    const fetchGenderOptions = async () => {
      try {
        const response = await fetch("https://api.swedenrelocators.se/api/miscellaneous/gender")
        const result = await response.json()
        console.log(result)
        if (result.data) {
          const formattedOptions = [
            { value: "Choose Option", label: "Choose Option" },
            ...result.data.map((gender) => ({
              value: gender.id,
              label: gender.name,
            })),
          ]
          setGenderOptions(formattedOptions)
          console.log(formattedOptions)
        } else {
          console.error("Unexpected API response structure:", result)
          toast.error("Failed to load gender options: Invalid response format")
        }
      } catch (error) {
        console.error("Error fetching gender options:", error)
        toast.error("Failed to load gender options")
      } finally {
        setIsLoadingGenders(false)
      }
    }

    fetchGenderOptions()
  }, [])

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    dateOfBirth: "",
    nationality: null,
    placeofbirth: null,
    countryresiding: null,
    address: "",
    postalCode: "",
    city: "",
    phonenumber: "",
    gender: "Choose Option",
    is_term_accepted: false,
  }

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
    mode: "onChange",
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const findCountryIdByLabel = useCallback((countryLabel) => {
    const country = countries.find((c) => c.label === countryLabel)
    return country ? country.id : null
  }, [])

  const findCountryLabelById = useCallback((countryId) => {
    const country = countries.find((c) => c.id === countryId)
    return country ? country.label : null
  }, [])

  // Format date to YYYY-MM-DD
  const formatDateForBackend = (date) => {
    if (!date) return ""
    return dayjs(date).format("YYYY-MM-DD")
  }

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {activeStep === 0 && (
        // Step 1 fields
        <>
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="firstName" label="First name" />
            <Field.Text name="lastName" label="Last name" />
          </Box>
          <Field.Text name="email" label="Email" />
          <Field.Text
            name="password"
            label="Password"
            type={password.value ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="password_confirmation"
            label="Confirm Password"
            type={passwordConfirmation.value ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordConfirmation.onToggle} edge="end">
                    <Iconify icon={passwordConfirmation.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </>
      )}

      {activeStep === 1 && (
        // Step 2 fields
        <>
          <Field.DatePicker
            name="dateOfBirth"
            label="Date of birth"
            maxDate={dayjs().subtract(18, "year")}
            helperText="You must be at least 18 years old to register"
            format="YYYY-MM-DD" // Set the display format to YYYY-MM-DD
          />
          <Field.CountrySelect name="nationality" label="Nationality" helperText="Please select a country" />
          <Field.CountrySelect name="placeofbirth" label="Country of Birth" helperText="Please select a country" />
          <Field.CountrySelect
            name="countryresiding"
            label="Country Residing In"
            helperText="Please select a country"
          />
          <Field.Select name="gender" label="Gender" select defaultValue="" disabled={isLoadingGenders}>
            <MenuItem value="">Choose Option</MenuItem>
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value.toString()}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
        </>
      )}

      {activeStep === 2 && (
        // Step 3 fields
        <>
          <Field.Text name="address" label="Address" />
          <Field.Text name="city" label="City" />
          <Field.Text name="postalCode" label="Postal Code" />
          <Field.Phone
            name="phonenumber"
            label="Phone number"
            placeholder="+1234567890"
            helperText="Must start with + followed by 7-14 digits"
          />
          <Field.Checkbox name="is_term_accepted" label="I accept the terms and conditions" />
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {activeStep > 0 && (
          <LoadingButton
            color="inherit"
            variant="outlined"
            onClick={handleBack}
            type="button" // Explicitly set type to button to prevent form submission
          >
            Back
          </LoadingButton>
        )}
        {activeStep < steps.length - 1 ? (
          <LoadingButton
            variant="contained"
            onClick={handleNext}
            type="button" // Explicitly set type to button to prevent form submission
          >
            Next
          </LoadingButton>
        ) : (
          <LoadingButton
            color="inherit"
            size="large"
            type="button" // Changed from submit to button to prevent automatic form submission
            variant="contained"
            loading={isSubmitting}
            onClick={async (e) => {
              e.preventDefault() // Prevent any default form submission

              try {
                // Validate all fields
                const isValid = await methods.trigger()
                if (!isValid) {
                  toast.error("Please fill in all required fields correctly")
                  return
                }

                // Get the form data
                const data = methods.getValues()

                // Format the date of birth to YYYY-MM-DD
                const formattedDob = formatDateForBackend(data.dateOfBirth)

                // Get country labels (names) instead of IDs
                const nationalityLabel = findCountryLabelById(data.nationality)
                const placeOfBirthLabel = findCountryLabelById(data.placeofbirth)
                const currentlyResidingLabel = findCountryLabelById(data.countryresiding)

                const formData = {
                  name: `${data.firstName} ${data.lastName}`,
                  email: data.email,
                  password: data.password,
                  password_confirmation: data.password_confirmation,
                  dob: formattedDob, // Use the formatted date
                  nationality: data.nationality,
                  place_of_birth: data.placeofbirth,
                  currently_residing: data.countryresiding,
                  address: data.address,
                  contact_number: data.phonenumber,
                  city: data.city,
                  postal: data.postalCode,
                  gender: data.gender === "Choose Option" ? "" : data.gender.toString(),
                  is_term_accepted: data.is_term_accepted ? 1 : 0,
                }

                console.log("Submitting form data:", formData) // For debugging

                await signUp(formData)
                toast.success("Account created successfully!")
                await checkUserSession?.()
                router.push(paths.auth.jwt.signIn)
              } catch (error) {
                console.error("Submission error:", error)
                toast.error(typeof error === "string" ? error : error.message || "An error occurred during sign up")
              }
            }}
          >
            Create account
          </LoadingButton>
        )}
      </Box>
    </Box>
  )

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ minHeight: "100vh" }}>
      {/* Right side - Form and Stepper (60% width) */}
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          p: { xs: 3, md: 5 },
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Form */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            flexGrow: 1,
            maxWidth: "800px",
            mx: "auto",
           
          }}
        >
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <FormHead
            title="Get started absolutely free"
            description={
              <>
                {`Already have an account? `}
                <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
                  Sign in
                </Link>
              </>
            }
            sx={{ textAlign: { xs: "center", md: "left" } }}
          />

          {!!errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMsg}
            </Alert>
          )}

          <Form methods={methods} onSubmit={(e) => e.preventDefault()}>
            {renderForm}
          </Form>

          <SignUpTerms />
        </Paper>
      </Box>
    </Stack>
  )
}