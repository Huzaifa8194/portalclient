"use client"

import Button from "@mui/material/Button"

import { z as zod } from "zod"
import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import dayjs from "dayjs"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import LoadingButton from "@mui/lab/LoadingButton"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"

import { useBoolean } from "src/hooks/use-boolean"
import { Form, Field } from "src/components/hook-form"
import { toast } from "src/components/snackbar"

import { countries } from "src/assets/data"
import { useAuthContext } from "../../hooks"
import { FormHead } from "../../components/form-head"
import { SignUpTerms } from "../../components/sign-up-terms"

// ----------------------------------------------------------------------

export const SignUpSchemaCompany = zod
  .object({
    // Company Information
    name: zod.string().min(1, { message: "Company name is required!" }),
    company_web: zod.string().url({ message: "Company website must be a valid URL!" }),
    company_reg_no: zod.string().min(1, { message: "Company registration number is required!" }),
    company_reg_date: zod.string().refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Company registration date must be a valid date!",
    }),
    company_type_id: zod.string().min(1, { message: "Company type is required!" }),
    company_business_type: zod.string().min(1, { message: "Company business type is required!" }),
    address: zod.string().min(1, { message: "Address is required!" }),
    city: zod.string().min(1, { message: "City is required!" }),
    country_id: zod
      .union([zod.string().min(1, { message: "Country is required!" }), zod.number().int().positive()])
      .transform((value) => {
        if (typeof value === "string") {
          const numValue = Number.parseInt(value, 10)
          return !Number.isNaN(numValue) ? numValue : value
        }
        return value
      }),
    postal_code: zod.string().min(1, { message: "Postal code is required!" }),

    // Contact Details
    company_contact_person_name: zod.string().min(1, { message: "Primary contact name is required!" }),
    company_contact_person_role: zod.string().min(1, { message: "Role in company is required!" }),
    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),
    contact_number: zod.string().min(1, { message: "Phone number is required!" }),
    company_contact_sec_person_name: zod.string().optional(),
    company_contact_sec_person_email: zod.string().email().optional(),

    // Company Operational Details
    company_no_of_employees: zod.string().optional(),
    company_certified_employer: zod.string().optional(),
    company_collective_agreement: zod.string().optional(),
    company_applied_work_permit: zod.string().optional(),
    company_non_eu_hires: zod.string().optional(),

    // Services Required
    country_services: zod
      .array(
        zod.object({
          country_id: zod
            .union([zod.string().min(1, { message: "Country is required!" }), zod.number().int().positive()])
            .transform((value) => {
              if (typeof value === "string") {
                const numValue = Number.parseInt(value, 10)
                return !Number.isNaN(numValue) ? numValue : value
              }
              return value
            }),
          service_types: zod.array(zod.string()).optional(),
        }),
      )
      .optional(),

    // Security & Account Setup
    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(8, { message: "Password must be at least 8 characters!" }),
    password_confirmation: zod.string().min(1, { message: "Password confirmation is required!" }),
    is_term_accepted: zod
      .boolean()
      .refine((val) => val === true, { message: "You must agree to the terms and conditions!" }),
    is_information_accurate: zod
      .boolean()
      .refine((val) => val === true, { message: "You must confirm the information is accurate!" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match!",
    path: ["password_confirmation"],
  })

// ----------------------------------------------------------------------

export function JwtSignUpViewCompany() {
  const { checkUserSession, setSession } = useAuthContext()

  const router = useRouter()

  const password = useBoolean()

  const [errorMsg, setErrorMsg] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const [companyTypes, setCompanyTypes] = useState([])
  const [businessTypes, setBusinessTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)
  const [countryServicesCount, setCountryServicesCount] = useState(1)

  const steps = ["Company", "Contact", "Details", "Services", "Setup"]

  // Fetch company types and business types on component mount
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const response = await axios.get("https://api.swedenrelocators.se/api/miscellaneous/companyTypes")
        setCompanyTypes(response.data.data)
      } catch (error) {
        console.error("Error fetching company types:", error)
        toast.error("Failed to load company types. Please refresh the page.")
      }
    }

    const fetchBusinessTypes = async () => {
      try {
        const response = await axios.get("https://api.swedenrelocators.se/api/miscellaneous/businessTypes")
        setBusinessTypes(response.data.data)
      } catch (error) {
        console.error("Error fetching business types:", error)
        toast.error("Failed to load business types. Please refresh the page.")
      }
    }

    fetchCompanyTypes()
    fetchBusinessTypes()
  }, [])

  const defaultValues = {
    // Company Information
    name: "",
    company_web: "",
    company_reg_no: "",
    company_reg_date: "",
    company_business_type: "",
    company_type_id: "",
    address: "",
    city: "",
    country_id: null, // Changed from empty string to null to fix Autocomplete warning
    postal_code: "",

    // Contact Details
    company_contact_person_name: "",
    company_contact_person_role: "",
    email: "",
    contact_number: "",
    company_contact_sec_person_name: "",
    company_contact_sec_person_email: "",

    // Company Operational Details
    company_no_of_employees: "",
    company_certified_employer: "",
    company_collective_agreement: "",
    company_applied_work_permit: "",
    company_non_eu_hires: "",

    // Services Required
    country_services: [
      {
        country_id: "", // Changed from empty string to null to fix Autocomplete warning
        service_types: [],
      },
    ],

    // Security & Account Setup
    password: "",
    password_confirmation: "",
    is_term_accepted: false,
    is_information_accurate: false,
  }

  const methods = useForm({
    resolver: zodResolver(SignUpSchemaCompany),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
    getValues,
    trigger,
  } = methods

  const formatDateForBackend = (date) => {
    if (!date) return ""
    return dayjs(date).format("YYYY-MM-DD")
  }
  const [isRealEstate, setIsRealEstate] = useState(false)

  const handleIndustryChange = (event) => {
    const selectedIndustry = event.target.value
    console.log(selectedIndustry)
    setValue("company_business_type", selectedIndustry, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    // Update isRealEstate state if the selected industry is Real Estate (id: 15)
    setIsRealEstate(selectedIndustry === "15")
    setForceUpdate((prev) => prev + 1) // Force a re-render to reflect the change
  }

  const handleNext = () => {
    if (activeStep === 1 && isRealEstate) {
      setActiveStep(4)
    } else if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep === 4 && isRealEstate) {
      // Skip back to step 1 for Real Estate industry
      setActiveStep(1)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  // Handle adding a service type to a country
  const handleAddServiceType = (countryIndex, serviceType) => {
    const currentServices = getValues(`country_services[${countryIndex}].service_types`) || []

    // Check if the service type is already selected
    if (!currentServices.includes(serviceType)) {
      setValue(`country_services[${countryIndex}].service_types`, [...currentServices, serviceType], {
        shouldValidate: true,
      })
    } else {
      // Remove the service type if it's already selected
      setValue(
        `country_services[${countryIndex}].service_types`,
        currentServices.filter((type) => type !== serviceType),
        { shouldValidate: true },
      )
    }
  }
  const findCountryIdByLabel = useCallback((countryLabel) => {
    if (!countryLabel) return null
    const country = countries.find((c) => c.label === countryLabel)
    return country ? Number(country.id) : null // Ensure it's a number
  }, [])
  const findCountryLabelById = (countryId) => {
    const country = countries.find((c) => c.id === Number(countryId))
    return country ? country.label : null
  }

  // Handle adding a new country service
  const handleAddCountryService = () => {
    const currentServices = getValues("country_services") || []
    const updatedServices = [
      ...currentServices,
      {
        country_id: null, // Changed from empty string to null to fix Autocomplete warning
        service_types: [],
      },
    ]
    setValue("country_services", updatedServices)
    setCountryServicesCount((prev) => prev + 1)

    // Show toast notification
    toast.info("New country service added")
  }

  const YES_NO_OPTIONS = [
    { value: "", label: "Choose an Option" },
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ]

  const EMPLOYEE_COUNT_OPTIONS = [
    { value: "", label: "Select Number of Employees" },
    { value: "1-10", label: "1-10" },
    { value: "11-50", label: "11-50" },
    { value: "51-100", label: "51-100" },
    { value: "101-500", label: "101-500" },
    { value: "500+", label: "500+" },
  ]

  const ROLE_OPTIONS = [
    { value: "", label: "Select Role" },
    { value: "HR", label: "HR" },
    { value: "Manager", label: "Manager" },
    { value: "Director", label: "Director" },
    { value: "CEO", label: "CEO" },
    { value: "Assistant", label: "Assistant" },
    { value: "Other", label: "Other" },
  ]

  const SERVICE_OPTIONS = [
    { value: "1", label: "Immigration Services for Employees" },
    { value: "2", label: "Employer of Record (EOR) & Payroll Services" },
    { value: "3", label: "Property Listing & Housing Solutions" },
    { value: "4", label: "Logistics & Relocation Solutions" },
    { value: "5", label: "Pet Relocation Assistance" },
    { value: "6", label: "Financial & Tax Solutions" },
    { value: "7", label: "Using as an Employee Management Tool" },
  ]

  // Custom isOptionEqualToValue function for Autocomplete
  const isOptionEqualToValue = (option, value) => {
    if (!value) return false
    return option.label === value || option.label === value.label
  }

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {activeStep === 0 && (
        <>
          {/* Company Information */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="name" label="Company Name" />
            <Field.Text name="company_web" label="Website" placeholder="https://example.com" />
          </Box>

          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="company_reg_no" label="Registration Number/VAT" />
            <Field.DatePicker
              name="company_reg_date"
              label="Registration Date"
              format="YYYY/MM/DD" // Changed date format to YY/MM/DD
              maxDate={dayjs()}
            />
          </Box>

          <Field.Select
            native
            name="company_business_type"
            label="Company Industry / Sector"
            onChange={handleIndustryChange}
            InputLabelProps={{ shrink: true }}
            value={watch("company_business_type")}
          >
            <option value="">Select Industry</option>
            {businessTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Field.Select>

          <Field.Select native name="company_type_id" label="Company Type" InputLabelProps={{ shrink: true }}>
            <option value="">Select Company Type</option>
            {companyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Field.Select>

          <Field.Text name="address" label="Address" />

          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="city" label="City" sx={{ flex: 1 }} />
            <Field.Text name="postal_code" label="Postal Code" sx={{ flex: 1 }} /> {/* Swapped position */}
          </Box>

          <Field.CountrySelect name="country_id" label="Country" isOptionEqualToValue={isOptionEqualToValue} />
        </>
      )}

      {activeStep === 1 && (
        <>
          {/* Contact Details */}
          <Field.Text name="company_contact_person_name" label="Primary Contact Person Name" />

          <Field.Select
            native
            name="company_contact_person_role"
            label="Role in Company"
            InputLabelProps={{ shrink: true }}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field.Select>

          <Field.Text name="email" label="Email Address" type="email" />
          <Field.Phone name="contact_number" label="Contact Number" />

          <Field.Text name="company_contact_sec_person_name" label="Secondary Contact Person Name (Optional)" />

          <Field.Text
            name="company_contact_sec_person_email"
            label="Secondary Contact Person Email (Optional)"
            type="email"
          />
        </>
      )}

      {activeStep === 2 && !isRealEstate && (
        <>
          {/* Company Operational Details */}
          <Field.Select
            native
            name="company_no_of_employees"
            label="Number of Employees"
            InputLabelProps={{ shrink: true }}
          >
            {EMPLOYEE_COUNT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field.Select>

          <Field.Select
            native
            name="company_certified_employer"
            label="Has your company posted jobs on the EURES (European Employment Services) "
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
            label="Does your company have a collective agreement or employment insurance?"
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
            name="company_applied_work_permit"
            label="Has the company previously applied for a work permit for any employee?"
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
            label="Does your company require compliance support for non-EU hires?"
            InputLabelProps={{ shrink: true }}
          >
            {YES_NO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field.Select>
        </>
      )}
      {activeStep === 3 && (
        <>
          {(getValues("country_services") || []).map((countryService, index) => (
            <Box key={index} sx={{ mb: 4, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
              <Field.CountrySelect
                name={`country_services[${index}].country_id`}
                label={`Country ${index + 1}`}
                isOptionEqualToValue={isOptionEqualToValue}
              />

              <Box sx={{ mt: 2 }}>
                <Box component="p" sx={{ mb: 1, fontWeight: "medium" }}>
                  What services are you looking for in this country? (Select all that apply)
                </Box>

                {SERVICE_OPTIONS.map((option) => {
                  const serviceTypes = watch(`country_services[${index}].service_types`) || []
                  const isChecked = serviceTypes.includes(option.value)

                  return (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={() => {
                            const currentServices = [...(getValues(`country_services[${index}].service_types`) || [])]

                            const newServices = isChecked
                              ? currentServices.filter((type) => type !== option.value)
                              : [...currentServices, option.value]

                            setValue(`country_services[${index}].service_types`, newServices, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            })

                            trigger(`country_services[${index}].service_types`)
                          }}
                          name={`service_${index}_${option.value}`}
                        />
                      }
                      label={option.label}
                    />
                  )
                })}
              </Box>
            </Box>
          ))}

          <Button variant="outlined" onClick={handleAddCountryService} sx={{ alignSelf: "flex-start" }}>
            Add Another Country
          </Button>
        </>
      )}

      {activeStep === 4 && (
        <>
          {/* Security & Account Setup */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text
              name="password"
              label="Create Password"
              type={password.value ? "text" : "password"}
              helperText="Min. 8 characters required"
            />
            <Field.Text
              name="password_confirmation"
              label="Repeat Password"
              type={password.value ? "text" : "password"}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Field.Checkbox
              name="is_information_accurate"
              label="I confirm that the information provided is accurate and truthful."
            />
            <Field.Checkbox name="is_term_accepted" label="I agree to the Terms & Conditions and Privacy Policy." />
          </Box>
        </>
      )}

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {activeStep > 0 && (
          <LoadingButton color="inherit" variant="outlined" onClick={handleBack}>
            Back
          </LoadingButton>
        )}
        {activeStep < steps.length - 1 ? (
          <LoadingButton
            variant="contained"
            onClick={() => {
              // Validate current step before proceeding
              const fieldsToValidate = []

              // Add fields to validate based on current step
              if (activeStep === 0) {
                fieldsToValidate.push(
                  "name",
                  "company_web",
                  "company_reg_no",
                  "company_reg_date",
                  "company_type_id",
                  "company_business_type",
                  "address",
                  "city",
                  "country_id",
                  "postal_code",
                )
              } else if (activeStep === 1) {
                fieldsToValidate.push(
                  "company_contact_person_name",
                  "company_contact_person_role",
                  "email",
                  "contact_number",
                )
              } else if (activeStep === 2 && !isRealEstate) {
                fieldsToValidate.push(
                  "company_no_of_employees",
                  "company_certified_employer",
                  "company_collective_agreement",
                  "company_applied_work_permit",
                  "company_non_eu_hires",
                )
              } else if (activeStep === 3) {
                // Validate country services
                const countryServices = getValues("country_services") || []
                let isValid = true

                for (let i = 0; i < countryServices.length; i += 1) {
                  if (!countryServices[i].country_id) {
                    toast.warning(`Please select a country for Country ${i + 1}`)
                    isValid = false
                    break
                  }

                  if (!countryServices[i].service_types || countryServices[i].service_types.length === 0) {
                    toast.warning(`Please select at least one service for Country ${i + 1}`)
                    isValid = false
                    break
                  }
                }

                if (!isValid) return
              }

              // Validate the fields
              trigger(fieldsToValidate).then((isValid) => {
                if (isValid) {
                  handleNext()
                } else {
                  toast.warning("Please fill in all required fields correctly")
                }
              })
            }}
          >
            Next
          </LoadingButton>
        ) : (
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="button"
            sx={{ flex: 1 }}
            variant="contained"
            loading={isSubmitting || loading}
            loadingIndicator="Creating account..."
            onClick={async () => {
              let isValid = true
              const data = methods.getValues()

              // Validate all fields except for skipped ones if Real Estate is selected
              if (data.company_business_type === "15") {
                isValid = await trigger([
                  "name",
                  "company_web",
                  "company_reg_no",
                  "company_reg_date",
                  "company_type_id",
                  "company_business_type",
                  "address",
                  "city",
                  "country_id",
                  "postal_code",
                  "company_contact_person_name",
                  "company_contact_person_role",
                  "email",
                  "contact_number",
                  "password",
                  "password_confirmation",
                  "is_term_accepted",
                  "is_information_accurate",
                ])
              } else {
                isValid = await trigger()
              }

              if (isValid) {
                try {
                  setLoading(true)
                  const formattedCompanyReg = formatDateForBackend(data.company_reg_date)
                  // Find the numeric country ID from the country label
                  const countryId = findCountryIdByLabel(data.country_id)

                  if (!countryId) {
                    throw new Error(`Country not found: ${data.country_id}`)
                  }

                  // Format country_services properly by converting country names to integer IDs
                  const formattedCountryServices =
                    data.country_services?.map((service) => {
                      // Check if country_id exists before trying to find it
                      if (!service.country_id) {
                        // Return a default object with empty service_types if country_id is missing
                        return {
                          country_id: "",
                          service_types: service.service_types || [],
                        }
                      }

                      const serviceCountryId = findCountryIdByLabel(service.country_id)

                      return {
                        country_id: serviceCountryId || "", // Use empty string as fallback if ID not found
                        service_types: service.service_types || [],
                      }
                    }) || []

                  // Format the data according to the API requirements
                  const formattedData = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    company_reg_no: data.company_reg_no,
                    company_reg_date: formattedCompanyReg,
                    company_type_id: data.company_type_id,
                    company_business_type: data.company_business_type,
                    company_web: data.company_web,
                    address: data.address,
                    city: data.city,
                    postal_code: data.postal_code,
                    country_id: countryId,
                    contact_number: data.contact_number,
                    company_contact_person_name: data.company_contact_person_name,
                    company_contact_person_role: data.company_contact_person_role,
                    company_contact_sec_person_name: data.company_contact_sec_person_email,
                    company_no_of_employees: data.company_no_of_employees,
                    company_certified_employer: data.company_certified_employer,
                    company_collective_agreement: data.company_collective_agreement,
                    company_applied_work_permit: data.company_applied_work_permit,
                    company_non_eu_hires: data.company_non_eu_hires,
                    is_information_accurate: data.is_information_accurate ? 1 : 0,
                    is_term_accepted: data.is_term_accepted ? 1 : 0,
                    country_services: formattedCountryServices,
                  }

                  console.log("Formatted data being sent:", formattedData)

                  // Send the data directly using axios
                  const response = await axios.post(
                    "https://api.swedenrelocators.se/api/companyClientRegistration",
                    formattedData,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                  )

                  console.log("API response", response)
                  const apiRes = response
                  if (response.data) {
                    // Show success toast

                    // Instead of calling signUp, directly set the session with the token from the response
                    if (response.data.data && response.data.data.token) {
                      localStorage.setItem("authToken", response.data.data.token)
                      setSession(response.data.data.token)
                      await checkUserSession?.()

                      setTimeout(() => {
                        router.refresh()
                      }, 1500)
                    } else {
                      toast.success(apiRes.data.message)

                      // Short delay to allow the user to see the success message
                      setTimeout(() => {
                        router.push(paths.auth.jwt.signIn)
                      }, 1500)
                    }
                  }
                } catch (error) {
                  console.error("Error during sign-up:", error)

                  // Show error toast
                  const errorMessage =
                    error.response?.data?.message ||
                    (typeof error === "string" ? error : error.message) ||
                    "Registration failed. Please try again."

                  toast.error(errorMessage)
                  setErrorMsg(errorMessage)
                } finally {
                  setLoading(false)
                }
              } else {
                toast.error("Please fill in all required fields correctly")
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
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Form */}
        <Paper
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 500, md: 600, lg: 800 },
            p: { xs: 2, sm: 4 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 4,
              overflowX: { xs: "auto", sm: "visible" },
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.7rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
              },
              "& .MuiStepper-root": {
                padding: { xs: "0 8px" },
              },
            }}
            alternativeLabel
          >
            {steps
              .filter((_, index) => {
                // Hide steps 2 (index 2) and 3 (index 3) when Real Estate is selected
                if (watch("company_business_type") === "15" && (index === 2 || index === 3)) {
                  return false
                }
                return true
              })
              .map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
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

          <Form methods={methods}>{renderForm}</Form>

          <SignUpTerms />
        </Paper>
      </Box>
    </Box>
  )
}

