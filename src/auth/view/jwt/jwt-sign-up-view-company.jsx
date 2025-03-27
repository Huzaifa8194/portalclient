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

import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import FormHelperText from "@mui/material/FormHelperText"
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

// In the imports section, add the Close icon import

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
    company_contact_sec_person_email: zod
      .string()
      .email({ message: "Please enter a valid email address" })
      .optional()
      .or(zod.literal("")),

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

  const [businessTypeValue, setBusinessTypeValue] = useState("0")
  const [companyTypeValue, setCompanyTypeValue] = useState("0")
  const [roleValue, setRoleValue] = useState("0")
  const [employeesValue, setEmployeesValue] = useState("0")
  const [certifiedEmployerValue, setCertifiedEmployerValue] = useState("0")
  const [collectiveAgreementValue, setCollectiveAgreementValue] = useState("0")
  const [workPermitValue, setWorkPermitValue] = useState("0")
  const [nonEuHiresValue, setNonEuHiresValue] = useState("0")
  const [countryIdValue, setCountryIdValue] = useState(null) // Added for main country_id
  const [countryServicesValues, setCountryServicesValues] = useState([{ country_id: null, service_types: [] }]) // Added for country_services array

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
    setBusinessTypeValue(selectedIndustry)
    setValue("company_business_type", selectedIndustry, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    // Update isRealEstate state if the selected industry is Real Estate (id: 15)
    setIsRealEstate(selectedIndustry === "15")
    setForceUpdate((prev) => prev + 1) // Force a re-render to reflect the change
  }

  const handleCompanyTypeChange = (event) => {
    const value = event.target.value
    setCompanyTypeValue(value)
    setValue("company_type_id", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleRoleChange = (event) => {
    const value = event.target.value
    setRoleValue(value)
    setValue("company_contact_person_role", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleEmployeesChange = (event) => {
    const value = event.target.value
    setEmployeesValue(value)
    setValue("company_no_of_employees", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleCertifiedEmployerChange = (event) => {
    const value = event.target.value
    setCertifiedEmployerValue(value)
    setValue("company_certified_employer", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleCollectiveAgreementChange = (event) => {
    const value = event.target.value
    setCollectiveAgreementValue(value)
    setValue("company_collective_agreement", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleWorkPermitChange = (event) => {
    const value = event.target.value
    setWorkPermitValue(value)
    setValue("company_applied_work_permit", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleNonEuHiresChange = (event) => {
    const value = event.target.value
    setNonEuHiresValue(value)
    setValue("company_non_eu_hires", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  // Handle country_id change
  const handleCountryChange = (value) => {
    setCountryIdValue(value)
    setValue("country_id", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  // Handle country_services country_id change
  const handleCountryServiceChange = (index, value) => {
    const updatedCountryServices = [...countryServicesValues]
    updatedCountryServices[index] = {
      ...updatedCountryServices[index],
      country_id: value,
    }
    setCountryServicesValues(updatedCountryServices)
    setValue(`country_services[${index}].country_id`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
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

    // Update the countryServicesValues state
    setCountryServicesValues([...countryServicesValues, { country_id: null, service_types: [] }])
  }

  // Handle removing a country service
  const handleRemoveCountryService = (indexToRemove) => {
    const currentServices = getValues("country_services") || []
    if (currentServices.length <= 1) {
      // Don't remove if it's the last one
      return
    }

    const updatedServices = currentServices.filter((_, index) => index !== indexToRemove)
    setValue("country_services", updatedServices)

    // Update the countryServicesValues state
    setCountryServicesValues(countryServicesValues.filter((_, index) => index !== indexToRemove))
  }

  const YES_NO_OPTIONS = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ]

  const EMPLOYEE_COUNT_OPTIONS = [
    { value: "1-10", label: "1-10" },
    { value: "11-50", label: "11-50" },
    { value: "51-100", label: "51-100" },
    { value: "101-500", label: "101-500" },
    { value: "500+", label: "500+" },
  ]

  const ROLE_OPTIONS = [
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

  // Clear field errors when they are filled correctly
  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (name && methods.formState.errors[name] && value[name]) {
        // Check if the field now has a value and clear the error
        if (
          (typeof value[name] === "string" && value[name].trim() !== "") ||
          (typeof value[name] === "boolean" && value[name] === true) ||
          (Array.isArray(value[name]) && value[name].length > 0) ||
          (typeof value[name] === "object" && value[name] !== null)
        ) {
          methods.clearErrors(name)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [methods])

  useEffect(() => {
    const subscription = methods.watch((value) => {
      // Update state values when form values change
      if (value.company_business_type) {
        setBusinessTypeValue(value.company_business_type)
        // Update isRealEstate state when the value changes
        setIsRealEstate(value.company_business_type === "15")
      }
      if (value.company_type_id) {
        setCompanyTypeValue(value.company_type_id)
      }
      if (value.company_contact_person_role) {
        setRoleValue(value.company_contact_person_role)
      }
      if (value.company_no_of_employees) {
        setEmployeesValue(value.company_no_of_employees)
      }
      if (value.company_certified_employer) {
        setCertifiedEmployerValue(value.company_certified_employer)
      }
      if (value.company_collective_agreement) {
        setCollectiveAgreementValue(value.company_collective_agreement)
      }
      if (value.company_applied_work_permit) {
        setWorkPermitValue(value.company_applied_work_permit)
      }
      if (value.company_non_eu_hires) {
        setNonEuHiresValue(value.company_non_eu_hires)
      }
      if (value.country_id) {
        setCountryIdValue(value.country_id)
      }
      if (value.country_services) {
        setCountryServicesValues(value.country_services)
      }
    })

    return () => subscription.unsubscribe()
  }, [methods])

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {activeStep === 0 && (
        <>
          {/* Company Information */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text
              name="name"
              label="Company Name"
              error={Boolean(methods.formState.errors.name)}
              helperText={methods.formState.errors.name?.message}
            />
            <Field.Text
              name="company_web"
              label="Website"
              placeholder="https://example.com"
              error={Boolean(methods.formState.errors.company_web)}
              helperText={methods.formState.errors.company_web?.message}
            />
          </Box>

          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text
              name="company_reg_no"
              label="Registration Number/VAT"
              error={Boolean(methods.formState.errors.company_reg_no)}
              helperText={methods.formState.errors.company_reg_no?.message}
            />
            <Field.DatePicker
              name="company_reg_date"
              label="Registration Date"
              format="YYYY/MM/DD" // Changed date format to YY/MM/DD
              maxDate={dayjs()}
              error={Boolean(methods.formState.errors.company_reg_date)}
              helperText={methods.formState.errors.company_reg_date?.message}
            />
          </Box>

          <Field.Select
            select
            name="company_business_type"
            label="Company Industry / Sector"
            value={businessTypeValue} // Make sure this is a valid value
            onChange={handleIndustryChange} // Use the handler that updates both state and form value
            InputLabelProps={{ shrink: true }}
            error={Boolean(methods.formState.errors.company_business_type)}
            helperText={methods.formState.errors.company_business_type?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {businessTypes.map((type) => (
              <MenuItem key={type.id} value={String(type.id)}>
                {type.name}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select
            select
            name="company_type_id"
            label="Company Type"
            onChange={handleCompanyTypeChange}
            InputLabelProps={{ shrink: true }}
            value={companyTypeValue}
            error={Boolean(methods.formState.errors.company_type_id)}
            helperText={methods.formState.errors.company_type_id?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {companyTypes.map((type) => (
              <MenuItem key={type.id} value={String(type.id)}>
                {type.name}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text
            name="address"
            label="Address"
            error={Boolean(methods.formState.errors.address)}
            helperText={methods.formState.errors.address?.message}
          />

          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text
              name="city"
              label="City"
              sx={{ flex: 1 }}
              error={Boolean(methods.formState.errors.city)}
              helperText={methods.formState.errors.city?.message}
            />
            <Field.Text
              name="postal_code"
              label="Postal Code"
              sx={{ flex: 1 }}
              error={Boolean(methods.formState.errors.postal_code)}
              helperText={methods.formState.errors.postal_code?.message}
            />{" "}
            {/* Swapped position */}
          </Box>

          <Field.CountrySelect
            name="country_id"
            label="Country"
            placeholder="Choose an option" // Add this
            error={Boolean(methods.formState.errors.country_id)}
            onChange={(event, value) => handleCountryChange(value)}
            value={countryIdValue}
          />
        </>
      )}

      {activeStep === 1 && (
        <>
          {/* Contact Details */}
          <Field.Text
            name="company_contact_person_name"
            label="Primary Contact Person Name"
            error={Boolean(methods.formState.errors.company_contact_person_name)}
            helperText={methods.formState.errors.company_contact_person_name?.message}
          />

          <Field.Select
            select
            name="company_contact_person_role"
            label="Role in Company"
            onChange={handleRoleChange}
            InputLabelProps={{ shrink: true }}
            value={roleValue}
            error={Boolean(methods.formState.errors.company_contact_person_role)}
            helperText={methods.formState.errors.company_contact_person_role?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {ROLE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text
            name="email"
            label="Email Address"
            type="email"
            error={Boolean(methods.formState.errors.email)}
            helperText={methods.formState.errors.email?.message}
          />
          <Field.Phone
            name="contact_number"
            label="Contact Number"
            error={Boolean(methods.formState.errors.contact_number)}
            helperText={methods.formState.errors.contact_number?.message}
          />

          <Field.Text
            name="company_contact_sec_person_name"
            label="Secondary Contact Person Name (Optional)"
            error={Boolean(methods.formState.errors.company_contact_sec_person_name)}
            helperText={methods.formState.errors.company_contact_sec_person_name?.message}
          />

          <Field.Text
            name="company_contact_sec_person_email"
            label="Secondary Contact Person Email (Optional)"
            type="email"
            error={Boolean(methods.formState.errors.company_contact_sec_person_email)}
            helperText={methods.formState.errors.company_contact_sec_person_email?.message}
          />
        </>
      )}

      {activeStep === 2 && !isRealEstate && (
        <>
          {/* Company Operational Details */}
          <Field.Select
            select
            name="company_no_of_employees"
            label="Number of Employees"
            onChange={handleEmployeesChange}
            InputLabelProps={{ shrink: true }}
            value={employeesValue}
            error={Boolean(methods.formState.errors.company_no_of_employees)}
            helperText={methods.formState.errors.company_no_of_employees?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {EMPLOYEE_COUNT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select
            select
            name="company_certified_employer"
            label="Has your company posted jobs on the EURES (European Employment Services) "
            onChange={handleCertifiedEmployerChange}
            InputLabelProps={{ shrink: true }}
            value={certifiedEmployerValue}
            error={Boolean(methods.formState.errors.company_certified_employer)}
            helperText={methods.formState.errors.company_certified_employer?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {YES_NO_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="Don’t Know">Dont Know</MenuItem> {/* Default selection */}
          </Field.Select>

          <Field.Select
            select
            name="company_collective_agreement"
            label="Does your company have a collective agreement or employment insurance?"
            onChange={handleCollectiveAgreementChange}
            InputLabelProps={{ shrink: true }}
            value={collectiveAgreementValue}
            error={Boolean(methods.formState.errors.company_collective_agreement)}
            helperText={methods.formState.errors.company_collective_agreement?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {YES_NO_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="Don’t Know">Dont Know</MenuItem> {/* Default selection */}
          </Field.Select>

          <Field.Select
            select
            name="company_applied_work_permit"
            label="Has the company previously applied for a work permit for any employee?"
            onChange={handleWorkPermitChange}
            InputLabelProps={{ shrink: true }}
            value={workPermitValue}
            error={Boolean(methods.formState.errors.company_applied_work_permit)}
            helperText={methods.formState.errors.company_applied_work_permit?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {YES_NO_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select
            select
            name="company_non_eu_hires"
            label="Does your company require compliance support for non-EU hires?"
            onChange={handleNonEuHiresChange}
            InputLabelProps={{ shrink: true }}
            value={nonEuHiresValue}
            error={Boolean(methods.formState.errors.company_non_eu_hires)}
            helperText={methods.formState.errors.company_non_eu_hires?.message}
          >
            <MenuItem value="0">Choose An Option</MenuItem> {/* Default selection */}
            {YES_NO_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="Not Sure">Not Sure</MenuItem> {/* Default selection */}
          </Field.Select>
        </>
      )}

      {/* Replace the services section (activeStep === 3) with this improved version */}
      {activeStep === 3 && !isRealEstate && (
        <>
          {(getValues("country_services") || []).map((countryService, index) => (
            <Box
              key={index}
              sx={{
                mb: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                position: "relative",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", mb: 2 }}>
                  {index > 0 && (
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveCountryService(index)}
                      sx={{ minWidth: "auto", p: 0.5 }}
                    >
                      Remove
                    </Button>
                  )}
                </Box>

                <Field.CountrySelect
                  name={`country_services[${index}].country_id`}
                  label="Country"
                  placeholder="Choose an Option"
                  error={Boolean(methods.formState.errors.country_services?.[index]?.country_id)}
                  helperText={methods.formState.errors.country_services?.[index]?.country_id?.message}
                  onChange={(event, value) => handleCountryServiceChange(index, value)}
                  value={countryServicesValues[index]?.country_id}
                />

                <Box sx={{ mt: 4 }}>
                  <FormControl
                    fullWidth
                    error={Boolean(methods.formState.errors.country_services?.[index]?.service_types)}
                  >
                    <InputLabel id={`service-types-label-${index}`}>
                      What services are you looking for in this country? (Select all that apply)
                    </InputLabel>
                    <Select
                      labelId={`service-types-label-${index}`}
                      multiple
                      value={watch(`country_services[${index}].service_types`) || []}
                      onChange={(event) => {
                        setValue(`country_services[${index}].service_types`, event.target.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                        trigger(`country_services[${index}].service_types`)
                      }}
                      input={
                        <OutlinedInput label="What services are you looking for in this country? (Select all that apply)" />
                      }
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => {
                            const option = SERVICE_OPTIONS.find((opt) => opt.value === value)
                            return (
                              <Chip
                                key={value}
                                label={option ? option.label : value}
                                size="small"
                                onDelete={(event) => {
                                  event.stopPropagation()
                                  const newValue = watch(`country_services[${index}].service_types`).filter(
                                    (item) => item !== value,
                                  )
                                  setValue(`country_services[${index}].service_types`, newValue, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  })
                                }}
                                onMouseDown={(event) => {
                                  event.stopPropagation()
                                }}
                              />
                            )
                          })}
                        </Box>
                      )}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 224,
                            width: 250,
                          },
                        },
                      }}
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {methods.formState.errors.country_services?.[index]?.service_types && (
                      <FormHelperText>Please select at least one service</FormHelperText>
                    )}
                  </FormControl>
                </Box>
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
              error={Boolean(methods.formState.errors.password)}
            />
            <Field.Text
              name="password_confirmation"
              label="Repeat Password"
              type={password.value ? "text" : "password"}
              error={Boolean(methods.formState.errors.password_confirmation)}
              helperText={methods.formState.errors.password_confirmation?.message}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Field.Checkbox
              name="is_information_accurate"
              label="I confirm that the information provided is accurate and truthful."
              error={Boolean(methods.formState.errors.is_information_accurate)}
              helperText={methods.formState.errors.is_information_accurate?.message}
            />
            <Field.Checkbox
              name="is_term_accepted"
              label="I agree to the Terms & Conditions and Privacy Policy."
              error={Boolean(methods.formState.errors.is_term_accepted)}
              helperText={methods.formState.errors.is_term_accepted?.message}
            />
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
              handleNext()
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
                    // More user-friendly error message
                    toast.error("Please select a valid country from the dropdown list")
                    throw new Error("Country selection is required")
                  }

                  // Format country_services properly by converting country names to integer IDs
                  const formattedCountryServices =
                    data.country_services?.map((service, index) => {
                      // Check if country_id exists before trying to find it
                      if (!service.country_id) {
                        // Return a default object with empty service_types if country_id is missing
                        return {
                          country_id: "",
                          service_types: service.service_types || [],
                        }
                      }

                      const serviceCountryId = findCountryIdByLabel(service.country_id)

                      if (!serviceCountryId && service.country_id) {
                        // More user-friendly error for invalid country selection
                        toast.error(
                          `Invalid country selection for service #${index + 1}. Please select from the dropdown.`,
                        )
                      }

                      return {
                        country_id: serviceCountryId || "", // Use empty string as fallback if ID not found
                        service_types: service.service_types || [],
                      }
                    }) || []

                  // Set default values for operational details if Real Estate is selected
                  let operationalDetails = {}
                  if (data.company_business_type === "15") {
                    operationalDetails = {
                      company_no_of_employees: "",
                      company_certified_employer: "",
                      company_collective_agreement: "",
                      company_applied_work_permit: "",
                      company_non_eu_hires: "",
                    }
                  } else {
                    operationalDetails = {
                      company_no_of_employees: data.company_no_of_employees || "",
                      company_certified_employer: data.company_certified_employer || "",
                      company_collective_agreement: data.company_collective_agreement || "",
                      company_applied_work_permit: data.company_applied_work_permit || "",
                      company_non_eu_hires: data.company_non_eu_hires || "",
                    }
                  }

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
                    company_contact_sec_person_name: data.company_contact_sec_person_name || "",
                    company_contact_sec_person_email: data.company_contact_sec_person_email || "",
                    ...operationalDetails,
                    is_information_accurate: data.is_information_accurate ? 1 : 0,
                    is_term_accepted: data.is_term_accepted ? 1 : 0,
                    country_services: data.company_business_type === "15" ? [] : formattedCountryServices,
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

                  if (error.response?.data?.errors) {
                    // Display specific validation errors from the API
                    const apiErrors = error.response.data.errors
                    Object.keys(apiErrors).forEach((field) => {
                      // Create a more user-friendly field name
                      const friendlyFieldName = field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

                      // Create a more user-friendly error message
                      let errorMessage = apiErrors[field][0]

                      // Replace technical error messages with user-friendly ones
                      if (errorMessage.includes("Expected string received null")) {
                        errorMessage = `Please provide a value for ${friendlyFieldName}`
                      } else if (errorMessage.includes("null")) {
                        errorMessage = `${friendlyFieldName} is required`
                      }

                      methods.setError(field, {
                        type: "manual",
                        message: errorMessage,
                      })

                      // Show separate toast for each error with improved message
                      toast.error(`${friendlyFieldName}: ${errorMessage}`)
                    })
                  } else {
                    // Show general error toast
                    const errorMessage =
                      error.response?.data?.message ||
                      (typeof error === "string" ? error : error.message) ||
                      "Registration failed. Please try again."

                    toast.error(errorMessage)
                    setErrorMsg(errorMessage)
                  }
                } finally {
                  setLoading(false)
                }
              } else {
                // Display separate toast notifications for each error with improved messages
                const errors = methods.formState.errors
                Object.keys(errors).forEach((fieldName) => {
                  if (errors[fieldName]?.message) {
                    let errorMessage = errors[fieldName].message
                    const friendlyFieldName = fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

                    // Replace technical error messages with user-friendly ones
                    if (
                      errorMessage.includes("Expected string received null") ||
                      errorMessage.includes("null") ||
                      errorMessage.includes("undefined")
                    ) {
                      errorMessage = `Please provide a value for ${friendlyFieldName}`
                    }

                    toast.error(`${friendlyFieldName}: ${errorMessage}`)
                  }
                })
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
                if (isRealEstate && (index === 2 || index === 3)) {
                  return false
                }
                return true
              })
              .map((label, index) => (
                <Step key={label} onClick={() => setActiveStep(index)} sx={{ cursor: "pointer" }}>
                  <StepLabel StepIconProps={{ completed: false }}>{label}</StepLabel>
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

