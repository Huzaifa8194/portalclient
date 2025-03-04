"use client"

import { z as zod } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import LoadingButton from "@mui/lab/LoadingButton"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Typography from "@mui/material/Typography"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"

import { useBoolean } from "src/hooks/use-boolean"
import { Form, Field } from "src/components/hook-form"
import { toast } from "src/components/snackbar"

// ----------------------------------------------------------------------

// API service functions
const API_BASE_URL = "https://api.swedenrelocators.se/api"

// Function to find country ID by name
const findCountryIdByName = (countryName, countries) => {
  const country = countries.find((c) => c.label.toLowerCase() === countryName.toLowerCase())
  return country ? country.id : null
}

// Function to find country name by ID
const findCountryNameById = (countryId, countries) => {
  const country = countries.find((c) => c.id === Number(countryId))
  return country ? country.label : null
}

// Company types and business types for dropdowns
const COMPANY_TYPES = [
  { value: "1", label: "Private Limited Company" },
  { value: "2", label: "Public Limited Company" },
  { value: "3", label: "Partnership" },
  { value: "4", label: "Sole Proprietorship" },
  { value: "5", label: "Limited Liability Partnership" },
]

const BUSINESS_TYPES = [
  { value: "1", label: "Manufacturing" },
  { value: "2", label: "Services" },
  { value: "3", label: "Retail" },
  { value: "4", label: "Technology" },
  { value: "5", label: "Healthcare" },
]

const SERVICE_TYPES = [
  { value: "1", label: "Relocation Services" },
  { value: "2", label: "Work Permit" },
  { value: "3", label: "Residence Permit" },
  { value: "4", label: "Family Reunification" },
  { value: "5", label: "Housing" },
]

// Schema for form validation
export const CompanyRegistrationSchema = zod
  .object({
    name: zod.string().min(1, { message: "Company name is required!" }),
    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),
    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    password_confirmation: zod.string().min(1, { message: "Password confirmation is required!" }),
    company_reg_no: zod.string().min(1, { message: "Company registration number is required!" }),
    company_reg_date: zod.string().refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Company registration date must be a valid date!",
    }),
    company_type_id: zod.string().min(1, { message: "Company type is required!" }),
    company_business_type: zod.string().min(1, { message: "Business type is required!" }),
    company_web: zod.string().url({ message: "Company website must be a valid URL!" }),
    address: zod.string().min(1, { message: "Address is required!" }),
    city: zod.string().min(1, { message: "City is required!" }),
    postal_code: zod.string().min(1, { message: "Postal code is required!" }),
    country_id: zod.string().min(1, { message: "Country is required!" }),
    contact_number: zod.string().min(1, { message: "Contact number is required!" }),
    company_contact_person_name: zod.string().min(1, { message: "Contact person name is required!" }),
    company_contact_person_role: zod.string().min(1, { message: "Contact person role is required!" }),
    company_contact_sec_person_name: zod.string().min(1, { message: "Secondary contact person name is required!" }),
    company_contact_sec_person_email: zod
      .string()
      .min(1, { message: "Secondary contact person email is required!" })
      .email({ message: "Email must be a valid email address!" }),
    company_no_of_employees: zod.string().min(1, { message: "Number of employees is required!" }),
    company_certified_employer: zod.string().min(1, { message: "This field is required!" }),
    company_collective_agreement: zod.string().min(1, { message: "This field is required!" }),
    company_applied_work_permit: zod.string().min(1, { message: "This field is required!" }),
    company_non_eu_hires: zod.string().min(1, { message: "This field is required!" }),
    is_information_accurate: zod.boolean().refine((val) => val === true, {
      message: "You must confirm that the information is accurate",
    }),
    is_term_accepted: zod.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    country_services: zod
      .array(
        zod.object({
          country_id: zod.string().min(1, { message: "Country is required!" }),
          service_types: zod.array(zod.string()).min(1, { message: "At least one service type is required!" }),
        }),
      )
      .min(1, { message: "At least one country service is required!" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match!",
    path: ["password_confirmation"],
  })

export function JwtSignUpViewCompany() {
  const router = useRouter()
  const password = useBoolean()

  const [errorMsg, setErrorMsg] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const [countryServices, setCountryServices] = useState([{ country_id: "", service_types: [] }])

  const steps = ["Company Information", "Contact Details", "Services & Confirmation"]

  // Default values for the form
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    company_reg_no: "",
    company_reg_date: "",
    company_type_id: "",
    company_business_type: "",
    company_web: "",
    address: "",
    city: "",
    postal_code: "",
    country_id: "",
    contact_number: "",
    company_contact_person_name: "",
    company_contact_person_role: "",
    company_contact_sec_person_name: "",
    company_contact_sec_person_email: "",
    company_no_of_employees: "",
    company_certified_employer: "",
    company_collective_agreement: "",
    company_applied_work_permit: "",
    company_non_eu_hires: "",
    is_information_accurate: false,
    is_term_accepted: false,
    country_services: [{ country_id: "", service_types: [] }],
  }

  const methods = useForm({
    resolver: zodResolver(CompanyRegistrationSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods

  // Add a country service row
  const addCountryService = () => {
    setCountryServices([...countryServices, { country_id: "", service_types: [] }])
    const currentServices = watch("country_services") || []
    setValue("country_services", [...currentServices, { country_id: "", service_types: [] }])
  }

  // Remove a country service row
  const removeCountryService = (index) => {
    if (countryServices.length > 1) {
      const updatedServices = [...countryServices]
      updatedServices.splice(index, 1)
      setCountryServices(updatedServices)

      const currentServices = watch("country_services") || []
      const updatedFormServices = [...currentServices]
      updatedFormServices.splice(index, 1)
      setValue("country_services", updatedFormServices)
    }
  }

  // Handle service type selection
  const handleServiceTypeChange = (countryIndex, serviceType, isChecked) => {
    const currentServices = watch("country_services") || []
    const updatedServices = [...currentServices]

    if (!updatedServices[countryIndex]) {
      updatedServices[countryIndex] = { country_id: "", service_types: [] }
    }

    if (isChecked) {
      updatedServices[countryIndex].service_types = [...updatedServices[countryIndex].service_types, serviceType]
    } else {
      updatedServices[countryIndex].service_types = updatedServices[countryIndex].service_types.filter(
        (type) => type !== serviceType,
      )
    }

    setValue("country_services", updatedServices)
  }

  // Handle country selection for services
  const handleCountryServiceChange = (index, value) => {
    const currentServices = watch("country_services") || []
    const updatedServices = [...currentServices]

    if (!updatedServices[index]) {
      updatedServices[index] = { country_id: "", service_types: [] }
    }

    updatedServices[index].country_id = value
    setValue("country_services", updatedServices)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Format the data for the API
      const formData = new FormData()

      // Add basic company information
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("password_confirmation", data.password_confirmation)
      formData.append("company_reg_no", data.company_reg_no)
      formData.append("company_reg_date", data.company_reg_date)
      formData.append("company_type_id", data.company_type_id)
      formData.append("company_business_type", data.company_business_type)
      formData.append("company_web", data.company_web)
      formData.append("address", data.address)
      formData.append("city", data.city)
      formData.append("postal_code", data.postal_code)
      formData.append("country_id", data.country_id)
      formData.append("contact_number", data.contact_number)
      formData.append("company_contact_person_name", data.company_contact_person_name)
      formData.append("company_contact_person_role", data.company_contact_person_role)
      formData.append("company_contact_sec_person_name", data.company_contact_sec_person_name)
      formData.append("company_contact_sec_person_email", data.company_contact_sec_person_email)
      formData.append("company_no_of_employees", data.company_no_of_employees)
      formData.append("company_certified_employer", data.company_certified_employer)
      formData.append("company_collective_agreement", data.company_collective_agreement)
      formData.append("company_applied_work_permit", data.company_applied_work_permit)
      formData.append("company_non_eu_hires", data.company_non_eu_hires)
      formData.append("is_information_accurate", data.is_information_accurate ? "1" : "0")
      formData.append("is_term_accepted", data.is_term_accepted ? "1" : "0")

      // Add country services
      data.country_services.forEach((service, index) => {
        formData.append(`country_services[${index}][country_id]`, service.country_id)
        service.service_types.forEach((type) => {
          formData.append(`country_services[${index}][service_types][]`, type)
        })
      })

      // Send the data to the API
      const response = await axios.post("https://api.swedenrelocators.se/api/companyClientRegistration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })

      toast.success("Company registered successfully!")
      router.push(paths.auth.jwt.signIn)
    } catch (error) {
      console.error("Registration error:", error)
      setErrorMsg(error.response?.data?.message || "Registration failed. Please check your information and try again.")
    }
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const YES_NO_OPTIONS = [
    { value: "", label: "Choose Option" },
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ]

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ minHeight: "100vh" }}>
      {/* Left Side - Image (40%) */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          p: 0,
        }}
      >
        <Box
          component="img"
          src="/company.svg"
          alt="Company Illustration"
          sx={{
            width: "100%",
            height: "97%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Right Side - Form and Stepper (60%) */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", width: "100%", maxWidth: "800px" }}>
          {/* Form */}
          <Paper
            sx={{
              flexGrow: 1,
              p: 4,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              mr: 2,
            }}
          >
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free
              </Typography>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
                  Sign in
                </Link>
              </Typography>
            </Box>

            {!!errorMsg && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMsg}
              </Alert>
            )}

            <Form methods={methods} onSubmit={onSubmit}>
              <Box gap={3} display="flex" flexDirection="column">
                {activeStep === 0 && (
                  <>
                    {/* Step 1: Company Information */}
                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Text name="name" label="Company Name" InputLabelProps={{ shrink: true }} />
                      <Field.Text name="email" label="Email" InputLabelProps={{ shrink: true }} />
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Text
                        name="password"
                        label="Password"
                        placeholder="6+ characters"
                        type={password.value ? "text" : "password"}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field.Text
                        name="password_confirmation"
                        label="Confirm Password"
                        placeholder="6+ characters"
                        type={password.value ? "text" : "password"}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Text
                        name="company_reg_no"
                        label="Company Registration Number"
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field.DatePicker
                        name="company_reg_date"
                        label="Company Registration Date"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Select
                        native
                        name="company_type_id"
                        label="Company Type"
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="">Select Company Type</option>
                        {COMPANY_TYPES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>
                      <Field.Select
                        native
                        name="company_business_type"
                        label="Business Type"
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="">Select Business Type</option>
                        {BUSINESS_TYPES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>
                    </Box>

                    <Field.Text name="company_web" label="Company Website" InputLabelProps={{ shrink: true }} />
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    {/* Step 2: Contact Details */}
                    <Field.Text name="address" label="Address" InputLabelProps={{ shrink: true }} />

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Text name="city" label="City" InputLabelProps={{ shrink: true }} />
                      <Field.Text name="postal_code" label="Postal Code" InputLabelProps={{ shrink: true }} />
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.CountrySelect
                        name="country_id"
                        label="Country"
                        placeholder="Choose a country"
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field.Text name="contact_number" label="Contact Number" InputLabelProps={{ shrink: true }} />
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Text
                        name="company_contact_person_name"
                        label="Contact Person Name"
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field.Text
                        name="company_contact_person_role"
                        label="Contact Person Role"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Text
                        name="company_contact_sec_person_name"
                        label="Secondary Contact Person Name"
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field.Text
                        name="company_contact_sec_person_email"
                        label="Secondary Contact Person Email"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    <Field.Text
                      name="company_no_of_employees"
                      label="Number of Employees"
                      InputLabelProps={{ shrink: true }}
                    />

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Select
                        native
                        name="company_certified_employer"
                        label="Certified Employer"
                        InputLabelProps={{ shrink: true }}
                      >
                        {YES_NO_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>
                      <Field.Select
                        native
                        name="company_collective_agreement"
                        label="Collective Agreement"
                        InputLabelProps={{ shrink: true }}
                      >
                        {YES_NO_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>
                    </Box>

                    <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
                      <Field.Select
                        native
                        name="company_applied_work_permit"
                        label="Applied for Work Permit"
                        InputLabelProps={{ shrink: true }}
                      >
                        {YES_NO_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>
                      <Field.Select
                        native
                        name="company_non_eu_hires"
                        label="Non-EU Hires"
                        InputLabelProps={{ shrink: true }}
                      >
                        {YES_NO_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field.Select>
                    </Box>
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    {/* Step 3: Services & Confirmation */}
                    <Typography variant="h6" gutterBottom>
                      Country Services
                    </Typography>

                    {countryServices.map((service, index) => (
                      <Box
                        key={index}
                        sx={{ mb: 3, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="subtitle1">Service {index + 1}</Typography>
                          {countryServices.length > 1 && (
                            <LoadingButton size="small" color="error" onClick={() => removeCountryService(index)}>
                              Remove
                            </LoadingButton>
                          )}
                        </Box>

                        <Field.CountrySelect
                          name={`country_services[${index}].country_id`}
                          label="Country"
                          placeholder="Choose a country"
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) => handleCountryServiceChange(index, e.target.value)}
                        />

                        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                          Service Types
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {SERVICE_TYPES.map((type) => (
                            <FormControlLabel
                              key={type.value}
                              control={
                                <Checkbox
                                  onChange={(e) => handleServiceTypeChange(index, type.value, e.target.checked)}
                                  checked={
                                    watch(`country_services[${index}].service_types`)?.includes(type.value) || false
                                  }
                                />
                              }
                              label={type.label}
                            />
                          ))}
                        </Box>
                      </Box>
                    ))}

                    <LoadingButton
                      variant="outlined"
                      onClick={addCountryService}
                      sx={{ alignSelf: "flex-start", mb: 3 }}
                    >
                      Add Another Country Service
                    </LoadingButton>

                    <Box sx={{ mt: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="is_information_accurate"
                            onChange={(e) => setValue("is_information_accurate", e.target.checked)}
                            checked={watch("is_information_accurate") || false}
                          />
                        }
                        label="I confirm that all information provided is accurate and complete."
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="is_term_accepted"
                            onChange={(e) => setValue("is_term_accepted", e.target.checked)}
                            checked={watch("is_term_accepted") || false}
                          />
                        }
                        label="I accept the terms and conditions."
                      />

                      {(errors.is_information_accurate || errors.is_term_accepted) && (
                        <Typography color="error" variant="caption" sx={{ display: "block", mt: 1 }}>
                          You must accept both statements to continue
                        </Typography>
                      )}
                    </Box>
                  </>
                )}

                {/* Navigation buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                  {activeStep > 0 && (
                    <LoadingButton color="inherit" variant="outlined" onClick={handleBack}>
                      Back
                    </LoadingButton>
                  )}

                  {activeStep < steps.length - 1 ? (
                    <LoadingButton variant="contained" onClick={handleNext}>
                      Next
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      loadingIndicator="Creating account..."
                    >
                      Create Account
                    </LoadingButton>
                  )}
                </Box>
              </Box>
            </Form>
          </Paper>

          {/* Stepper */}
          <Paper
            elevation={3}
            sx={{
              width: "170px",
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              height: "fit-content",
              display: { xs: "none", md: "block" },
            }}
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Box>
      </Box>
    </Stack>
  )
}

