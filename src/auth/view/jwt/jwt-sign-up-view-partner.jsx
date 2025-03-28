"use client"

import { z } from "zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import LoadingButton from "@mui/lab/LoadingButton"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import { useBoolean } from "src/hooks/use-boolean"
import { Form, Field } from "src/components/hook-form"

// Define the form schema with Zod
const formSchema = z
  .object({
    // Basic Information
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z.string().min(8, { message: "Password confirmation is required" }),
    business_type_id: z.string().min(1, { message: "Business type is required" }),
    website: z.string().optional(),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postal_code: z.string().optional(),
    country_id: z.string().min(1, { message: "Country is required" }),
    contact_number: z.string().min(1, { message: "Contact number is required" }),

    // Lawyer / Law Firm Fields
    lawyer_fields: z.array(z.string()).optional(),
    lawyerBars: z
      .array(
        z.object({
          registration_number: z.string().optional(),
          registration_year: z.string().optional(),
          bar_name: z.string().optional(),
          bar_country_id: z.string().optional(),
        }),
      )
      .optional(),

    // Accreditations
    is_accreditations: z.string().optional(),
    accreditations: z.array(z.string()).optional(),

    // Immigration Consultant / Firm Fields
    immigration_exp_handling_cases: z.string().optional(),
    immigration_countries: z.array(z.string()).optional(),

    // Company Information
    company_type_id: z.string().optional(),
    company_no_of_employees: z.string().optional(),
    company_eor: z.string().optional(),
    company_hr_services: z.string().optional(),
    company_specialize_business_immigration: z.string().optional(),
    company_registration_no: z.string().optional(),
    company_registration_date: z.string().optional(),
    company_business_code: z.string().optional(),

    // Freelancer Fields
    self_accreditation_or_experience: z.string().optional(),

    // University Fields
    university_type_id: z.string().optional(),
    uni_sc_person_name: z.string().optional(),
    uni_sc_person_designation: z.string().optional(),
    uni_sc_person_email: z.string().email().optional().or(z.literal("")),
    uni_sc_person_phone: z.string().optional(),
    uni_student_mobility_programs: z.string().optional(),
    uni_no_of_international_students_enrolled: z.string().optional(),
    uni_no_of_international_students_needs_immgration: z.string().optional(),
    uni_inter_student_via_us: z.string().optional(),
    uni_services_via_us: z.array(z.string()).optional(),
    uni_tailored_student_package: z.string().optional(),
    uni_integrate_relocators_services: z.string().optional(),
    collaboration_id: z.string().optional(),
    uni_challenges_intl_student: z.array(z.string()).optional(),
    uni_offer_housing: z.string().optional(),
    uni_integrate_relocators_housing_services: z.string().optional(),
    financial_aid_for_relocation: z.string().optional(),
    uni_gdpr_compliant_policies: z.string().optional(),
    uni_barriers_external_relocators: z.string().optional(),
    uni_formal_mou: z.string().optional(),
    uni_key_expectations: z.string().optional(),
    uni_preferred_state_date: z.string().optional(),

    // Specialization
    application_specialize: z.array(z.string()).optional(),

    // Citizenship by Investment
    citizenship_by_investment: z.string().optional(),
    cbi_applications: z.string().optional(),
    cbi_program_specialize: z.array(z.string()).optional(),

    // Documents
    registration_doc: z.any().optional(),
    accreditation_doc: z.any().optional(),
    passport_doc: z.any().optional(),

    // Additional Information
    linkedln_url: z.string().optional(),
    references: z.string().optional(),
    is_term_accepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })

export function JwtSignUpViewPartner() {
  const [activeStep, setActiveStep] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [barRegistrations, setBarRegistrations] = useState([{ id: 1 }])

  // State for API data
  const [businessTypes, setBusinessTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [universityCountries, setUniversityCountries] = useState([])
  const [partnerRecords, setPartnerRecords] = useState({
    lawyerFields: [],
    accreditation: [],
    ApplicationSpecialize: [],
    CBISpecialize: [],
    UniversityType: [],
    UniversityServices: [],
    UniversityCollaboration: [],
    UniversityStudentChallenges: [],
  })

  const [loading, setLoading] = useState(true)

  const password = useBoolean()
  const passwordConfirmation = useBoolean()

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch business types
        const businessTypesResponse = await fetch(
          "https://api.swedenrelocators.se/api/miscellaneous/partner/businessTypes",
        )
        const businessTypesData = await businessTypesResponse.json()
        setBusinessTypes(businessTypesData.data || [])

        // Fetch partner records
        const partnerRecordsResponse = await fetch("https://api.swedenrelocators.se/api/miscellaneous/partner/records")
        const partnerRecordsData = await partnerRecordsResponse.json()
        setPartnerRecords(partnerRecordsData.data || {})

        // Fetch university countries
        const universityCountriesResponse = await fetch(
          "https://api.swedenrelocators.se/api/miscellaneous/partner/university/country",
        )
        const universityCountriesData = await universityCountriesResponse.json()
        setUniversityCountries(universityCountriesData.data || [])

        // Fetch countries (using university countries as a fallback)
        setCountries(universityCountriesData.data || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        setErrorMsg("Failed to load form data. Please refresh the page.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Default values for the form
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    business_type_id: "",
    website: "",
    address: "",
    city: "",
    postal_code: "",
    country_id: "",
    contact_number: "",
    lawyer_fields: [],
    lawyerBars: [
      {
        registration_number: "",
        registration_year: "",
        bar_name: "",
        bar_country_id: "",
      },
    ],
    is_accreditations: "No",
    accreditations: [],
    immigration_exp_handling_cases: "",
    immigration_countries: [],
    company_type_id: "",
    company_no_of_employees: "",
    company_eor: "",
    company_hr_services: "",
    company_specialize_business_immigration: "",
    company_registration_no: "",
    company_registration_date: "",
    company_business_code: "",
    self_accreditation_or_experience: "",
    university_type_id: "",
    uni_sc_person_name: "",
    uni_sc_person_designation: "",
    uni_sc_person_email: "",
    uni_sc_person_phone: "",
    uni_student_mobility_programs: "",
    uni_no_of_international_students_enrolled: "",
    uni_no_of_international_students_needs_immgration: "",
    uni_inter_student_via_us: "",
    uni_services_via_us: [],
    uni_tailored_student_package: "",
    uni_integrate_relocators_services: "",
    collaboration_id: "",
    uni_challenges_intl_student: [],
    uni_offer_housing: "",
    uni_integrate_relocators_housing_services: "",
    financial_aid_for_relocation: "",
    uni_gdpr_compliant_policies: "",
    uni_barriers_external_relocators: "",
    uni_formal_mou: "",
    uni_key_expectations: "",
    uni_preferred_state_date: "",
    application_specialize: [],
    citizenship_by_investment: "No",
    cbi_applications: "",
    cbi_program_specialize: [],
    linkedln_url: "",
    references: "",
    is_term_accepted: false,
  }

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

  // Watch for business type to show/hide sections
  const businessType = watch("business_type_id")
  const isLawyer = businessType === "1" || businessType === "2" // Lawyer or Law Firm
  const isImmigrationConsultant = businessType === "3" || businessType === "4" // Immigration Consultant or Firm
  const isFreelancer = businessType === "5" || businessType === "6" // Freelancer or Self-Employed
  const isUniversity = businessType === "7" // University

  // Watch for CBI option
  const handlesCBI = watch("citizenship_by_investment")
  const hasAccreditations = watch("is_accreditations")

  // Handle checkbox change to store IDs in arrays - FIX: Using individual state for checkboxes
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

  // Determine which steps to show based on business type
  const getSteps = () => {
    const baseSteps = ["Basic Information", "Professional Details"]
    const additionalSteps = []

    if (isLawyer) {
      additionalSteps.push("Legal Practice Details", "Bar Registration")
    }

    if (isImmigrationConsultant) {
      additionalSteps.push("Business Information", "Immigration Expertise")
    }

    if (isFreelancer) {
      additionalSteps.push("Freelancer Details")
    }

    if (isUniversity) {
      additionalSteps.push("University Details", "Student Services", "International Programs")
    }

    // Common steps for all business types
    additionalSteps.push("Specializations", "Documents", "Additional Information")

    return [...baseSteps, ...additionalSteps]
  }

  const steps = getSteps()

  // Handle next step
  const handleNext = (e) => {
    e.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = (e) => {
    e.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Add new bar registration
  const addBarRegistration = () => {
    setBarRegistrations([...barRegistrations, { id: barRegistrations.length + 1 }])
    const currentBars = getValues("lawyerBars") || []
    setValue("lawyerBars", [
      ...currentBars,
      { registration_number: "", registration_year: "", bar_name: "", bar_country_id: "" },
    ])
  }

  // Remove bar registration
  const removeBarRegistration = (index) => {
    if (barRegistrations.length > 1) {
      const updatedBars = [...barRegistrations]
      updatedBars.splice(index, 1)
      setBarRegistrations(updatedBars)

      const currentBars = getValues("lawyerBars") || []
      const updatedBarFields = [...currentBars]
      updatedBarFields.splice(index, 1)
      setValue("lawyerBars", updatedBarFields)
    }
  }

  // Form submission handler - UPDATED to connect to API
  const onSubmit = async (data) => {
    try {
      setErrorMsg("")

      // Convert any empty strings to null or appropriate value
      const processedData = { ...data }

      // Ensure company_type_id is a valid value
      if (processedData.company_type_id === "3r4rew") {
        processedData.company_type_id = "3" // Converting to valid ID
      }

      // Create FormData for file uploads
      const formData = new FormData()

      // Add all regular fields to FormData
      Object.keys(processedData).forEach((key) => {
        if (key !== "registration_doc" && key !== "accreditation_doc" && key !== "passport_doc") {
          // Handle arrays properly
          if (Array.isArray(processedData[key])) {
            processedData[key].forEach((item, index) => {
              if (typeof item === "object") {
                // For nested objects like lawyerBars
                Object.keys(item).forEach((nestedKey) => {
                  formData.append(`${key}[${index}][${nestedKey}]`, item[nestedKey] || "")
                })
              } else {
                // For simple arrays
                formData.append(`${key}[]`, item)
              }
            })
          } else if (typeof processedData[key] === "object" && processedData[key] !== null) {
            // For other objects
            Object.keys(processedData[key]).forEach((nestedKey) => {
              formData.append(`${key}[${nestedKey}]`, processedData[key][nestedKey] || "")
            })
          } else {
            // For simple values
            formData.append(key, processedData[key] !== undefined ? processedData[key] : "")
          }
        }
      })

      // Add file fields if provided
      if (processedData.registration_doc) {
        formData.append("registration_doc", processedData.registration_doc)
      }

      if (processedData.accreditation_doc) {
        formData.append("accreditation_doc", processedData.accreditation_doc)
      }

      if (processedData.passport_doc) {
        formData.append("passport_doc", processedData.passport_doc)
      }

      // Submit the form to the API with CORS handling
      const response = await fetch("https://api.swedenrelocators.se/api/partnerRegistration", {
        method: "POST",
        body: formData,
        mode: "cors", // Explicitly set CORS mode
        credentials: "include", // Include cookies if needed
        headers: {
          // Don't set Content-Type header for FormData, browser will set it automatically
          // Add any required authorization headers if needed
          Accept: "application/json",
        },
      })

      // Check if we got a successful response
      if (response.ok) {
        const result = await response.json()
        // Handle success
        alert("Registration successful! Your partner account has been created.")
        // You might want to redirect the user or clear the form here
      } else {
        // Handle error responses
        const errorData = await response.json().catch(() => ({ message: "An unknown error occurred" }))
        throw new Error(errorData.message || "Failed to register. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMsg(typeof error === "string" ? error : error.message || "An error occurred during submission")

      // For development purposes, you can add this to see if it's a CORS issue
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMsg("Network error: This might be due to CORS restrictions. Please contact the administrator.")
      }
    }
  }

  // Render Basic Information Step
  const renderBasicInfoStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="name" label="Full Name" />
      <Field.Text name="email" label="Email" />

      <Field.Text
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                {password.value ? "Hide" : "Show"}
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
                {passwordConfirmation.value ? "Hide" : "Show"}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Field.Text name="website" label="Website" />
    </Box>
  )

  // Render Professional Details Step
  const renderProfessionalDetailsStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="business_type_id" label="Business Type">
        <MenuItem value="">Select business type</MenuItem>
        {businessTypes.map((type) => (
          <MenuItem key={type.id} value={type.id.toString()}>
            {type.name}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Text name="address" label="Address" />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field.Text name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="postal_code" label="Postal Code" />
        </Grid>
      </Grid>

      <Field.Select name="country_id" label="Country">
        <MenuItem value="">Select a country</MenuItem>
        {countries.map((country) => (
          <MenuItem key={country.id} value={country.id.toString()}>
            {country.name}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Text
        name="contact_number"
        label="Contact Number"
        helperText="Must include country code (e.g., +92 for Pakistan)"
      />
    </Box>
  )

  // Render Legal Practice Details Step (for Lawyers)
  const renderLegalPracticeStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Practice Areas
      </Typography>
      {partnerRecords.lawyerFields.slice(0, 6).map((field) => (
        <Field.Checkbox
          key={field.id}
          name={`lawyer_fields_${field.id}`} // Unique name for each checkbox to prevent selection issues
          label={field.name}
          onChange={(e) => handleCheckboxChange("lawyer_fields", field.id.toString(), e.target.checked)}
          checked={
            Array.isArray(getValues("lawyer_fields")) && getValues("lawyer_fields").includes(field.id.toString())
          }
        />
      ))}

      <Field.RadioGroup
        name="is_accreditations"
        label="Did you have any accreditations?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      {hasAccreditations === "Yes" && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Accreditations
          </Typography>
          {partnerRecords.accreditation.slice(0, 5).map((accred) => (
            <Field.Checkbox
              key={accred.id}
              name={`accreditations_${accred.id}`} // Unique name for each checkbox to prevent selection issues
              label={accred.name}
              onChange={(e) => handleCheckboxChange("accreditations", accred.id.toString(), e.target.checked)}
              checked={
                Array.isArray(getValues("accreditations")) && getValues("accreditations").includes(accred.id.toString())
              }
            />
          ))}
        </>
      )}
    </Box>
  )

  // Render Bar Registration Step (for Lawyers)
  const renderBarRegistrationStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1">Bar Registration Details</Typography>
        <Button variant="outlined" onClick={addBarRegistration} size="small">
          Add
        </Button>
      </Box>

      {barRegistrations.map((bar, index) => (
        <Paper key={bar.id} variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle2">Bar Registration {index + 1}</Typography>
            {index > 0 && (
              <Button size="small" onClick={() => removeBarRegistration(index)} color="error" variant="outlined">
                Remove
              </Button>
            )}
          </Box>

          <Field.Text name={`lawyerBars.${index}.registration_number`} label="Bar Registration Number" />

          <Field.Text name={`lawyerBars.${index}.registration_year`} label="Year of Bar Registration" sx={{ mt: 2 }} />

          <Field.Text name={`lawyerBars.${index}.bar_name`} label="Bar Name" sx={{ mt: 2 }} />

          <Field.Select name={`lawyerBars.${index}.bar_country_id`} label="Bar Country" sx={{ mt: 2 }}>
            <MenuItem value="">Select country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id.toString()}>
                {country.name}
              </MenuItem>
            ))}
          </Field.Select>
        </Paper>
      ))}
    </Box>
  )

  // Render Business Information Step (for Immigration Consultants)
  const renderBusinessInfoStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="company_type_id" label="Company Type">
        <MenuItem value="">Select company type</MenuItem>
        <MenuItem value="1">Immigration Firm</MenuItem>
        <MenuItem value="2">Law Firm with Immigration Practice</MenuItem>
        <MenuItem value="3">Consulting Agency</MenuItem>
      </Field.Select>

      <Field.Select name="company_no_of_employees" label="Number of Employees">
        <MenuItem value="">Select number of employees</MenuItem>
        <MenuItem value="1-10">1-10</MenuItem>
        <MenuItem value="11-50">11-50</MenuItem>
        <MenuItem value="51-100">51-100</MenuItem>
        <MenuItem value="101-500">101-500</MenuItem>
        <MenuItem value="500+">500+</MenuItem>
      </Field.Select>

      <Field.Text name="company_registration_no" label="Company Registration Number" />
      <Field.Text name="company_registration_date" label="Company Registration Date" type="date" />
      <Field.Text name="company_business_code" label="Business Code" />
    </Box>
  )

  // Render Immigration Expertise Step (for Immigration Consultants)
  const renderImmigrationExpertiseStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="immigration_exp_handling_cases" label="Experience Handling Immigration Cases">
        <MenuItem value="">Select experience level</MenuItem>
        <MenuItem value="3-5 years">3-5 years</MenuItem>
        <MenuItem value="5-10 years">5-10 years</MenuItem>
        <MenuItem value="10+ years">10+ years</MenuItem>
      </Field.Select>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Countries of Immigration Expertise
      </Typography>
      {countries.slice(0, 5).map((country) => (
        <Field.Checkbox
          key={country.id}
          name={`immigration_countries_${country.id}`} // Unique name for each checkbox to prevent selection issues
          label={country.name}
          onChange={(e) => handleCheckboxChange("immigration_countries", country.id.toString(), e.target.checked)}
          checked={
            Array.isArray(getValues("immigration_countries")) &&
            getValues("immigration_countries").includes(country.id.toString())
          }
        />
      ))}

      <Field.RadioGroup
        name="company_eor"
        label="Do you provide Employer of Record (EOR) & Payroll Services?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.RadioGroup
        name="company_hr_services"
        label="Do you offer HR & Compliance Services?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.RadioGroup
        name="company_specialize_business_immigration"
        label="Do you specialize in Corporate & Business Immigration?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />
    </Box>
  )

  // Render Freelancer Details Step
  const renderFreelancerDetailsStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="self_accreditation_or_experience"
        label="Do you have official accreditation or experience in any immigration system?"
        multiline
        rows={4}
      />

      <Field.RadioGroup
        name="is_accreditations"
        label="Did you have any accreditations?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      {hasAccreditations === "Yes" && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Accreditations
          </Typography>
          {partnerRecords.accreditation.slice(0, 5).map((accred) => (
            <Field.Checkbox
              key={accred.id}
              name={`accreditations_${accred.id}`} // Unique name for each checkbox to prevent selection issues
              label={accred.name}
              onChange={(e) => handleCheckboxChange("accreditations", accred.id.toString(), e.target.checked)}
              checked={
                Array.isArray(getValues("accreditations")) && getValues("accreditations").includes(accred.id.toString())
              }
            />
          ))}
        </>
      )}
    </Box>
  )

  // Render University Details Step
  const renderUniversityDetailsStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="university_type_id" label="University Type">
        <MenuItem value="">Select university type</MenuItem>
        {partnerRecords.UniversityType.map((type) => (
          <MenuItem key={type.id} value={type.id.toString()}>
            {type.name}
          </MenuItem>
        ))}
      </Field.Select>

      <Paper variant="outlined" sx={{ p: 2, mt: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Student Coordinator Contact
        </Typography>

        <Field.Text name="uni_sc_person_name" label="Contact Person Name" />
        <Field.Text name="uni_sc_person_designation" label="Designation" sx={{ mt: 2 }} />
        <Field.Text name="uni_sc_person_email" label="Email" type="email" sx={{ mt: 2 }} />
        <Field.Text name="uni_sc_person_phone" label="Phone Number" sx={{ mt: 2 }} />
      </Paper>
    </Box>
  )

  // Render Student Services Step (for Universities)
  const renderStudentServicesStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Select name="uni_no_of_international_students_enrolled" label="Number of International Students Enrolled">
        <MenuItem value="">Select number range</MenuItem>
        <MenuItem value="Less than 100">Less than 100</MenuItem>
        <MenuItem value="100-500">100-500</MenuItem>
        <MenuItem value="500-1000">500-1000</MenuItem>
        <MenuItem value="More than 1000">More than 1000</MenuItem>
      </Field.Select>

      <Field.Select
        name="uni_no_of_international_students_needs_immgration"
        label="Number of International Students Needing Immigration Support"
      >
        <MenuItem value="">Select number range</MenuItem>
        <MenuItem value="Less than 100">Less than 100</MenuItem>
        <MenuItem value="100-500">100-500</MenuItem>
        <MenuItem value="500-1000">500-1000</MenuItem>
        <MenuItem value="More than 1000">More than 1000</MenuItem>
      </Field.Select>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Services Required from Sweden Relocators
      </Typography>
      {partnerRecords.UniversityServices.slice(0, 5).map((service) => (
        <Field.Checkbox
          key={service.id}
          name={`uni_services_via_us_${service.id}`} // Unique name for each checkbox to prevent selection issues
          label={service.name}
          onChange={(e) => handleCheckboxChange("uni_services_via_us", service.id.toString(), e.target.checked)}
          checked={
            Array.isArray(getValues("uni_services_via_us")) &&
            getValues("uni_services_via_us").includes(service.id.toString())
          }
        />
      ))}

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        What are the biggest challenges international students face?
      </Typography>
      {partnerRecords.UniversityStudentChallenges.slice(0, 5).map((challenge) => (
        <Field.Checkbox
          key={challenge.id}
          name={`uni_challenges_intl_student_${challenge.id}`} // Unique name for each checkbox to prevent selection issues
          label={challenge.name}
          onChange={(e) =>
            handleCheckboxChange("uni_challenges_intl_student", challenge.id.toString(), e.target.checked)
          }
          checked={
            Array.isArray(getValues("uni_challenges_intl_student")) &&
            getValues("uni_challenges_intl_student").includes(challenge.id.toString())
          }
        />
      ))}
    </Box>
  )

  // Render International Programs Step (for Universities)
  const renderInternationalProgramsStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.RadioGroup
        name="uni_student_mobility_programs"
        label="Does the university currently have international student mobility programs?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.RadioGroup
        name="uni_inter_student_via_us"
        label="Would the university like to receive international students through Sweden Relocators?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.Select name="collaboration_id" label="Collaboration Type">
        <MenuItem value="">Select collaboration type</MenuItem>
        {partnerRecords.UniversityCollaboration.map((collab) => (
          <MenuItem key={collab.id} value={collab.id.toString()}>
            {collab.name}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Select name="uni_offer_housing" label="Does the university offer its own student housing?">
        <MenuItem value="">Select housing option</MenuItem>
        <MenuItem value="Yes, fully available">Yes, fully available</MenuItem>
        <MenuItem value="Yes, but limited">Yes, but limited</MenuItem>
        <MenuItem value="No, students must find private housing">No, students must find private housing</MenuItem>
      </Field.Select>

      <Field.RadioGroup
        name="uni_integrate_relocators_housing_services"
        label="Would the university be interested in integrating Sweden Relocators' housing solutions?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.Text
        name="uni_key_expectations"
        label="What are the university's key expectations from this partnership?"
        multiline
        rows={3}
      />
    </Box>
  )

  // Render Specializations Step
  const renderSpecializationsStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Application Specializations
      </Typography>
      {partnerRecords.ApplicationSpecialize.slice(0, 6).map((specialization) => (
        <Field.Checkbox
          key={specialization.id}
          name={`application_specialize_${specialization.id}`} // Unique name for each checkbox to prevent selection issues
          label={specialization.name}
          onChange={(e) =>
            handleCheckboxChange("application_specialize", specialization.id.toString(), e.target.checked)
          }
          checked={
            Array.isArray(getValues("application_specialize")) &&
            getValues("application_specialize").includes(specialization.id.toString())
          }
        />
      ))}

      <Field.RadioGroup
        name="citizenship_by_investment"
        label="Can you handle Citizenship by Investment (CBI) applications?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      {handlesCBI === "Yes" && (
        <>
          <Field.Text
            name="cbi_applications"
            label="How many CBI applications have you handled so far?"
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Which CBI programs do you specialize in?
          </Typography>
          {partnerRecords.CBISpecialize.slice(0, 5).map((program) => (
            <Field.Checkbox
              key={program.id}
              name={`cbi_program_specialize_${program.id}`} // Unique name for each checkbox to prevent selection issues
              label={program.name}
              onChange={(e) => handleCheckboxChange("cbi_program_specialize", program.id.toString(), e.target.checked)}
              checked={
                Array.isArray(getValues("cbi_program_specialize")) &&
                getValues("cbi_program_specialize").includes(program.id.toString())
              }
            />
          ))}
        </>
      )}
    </Box>
  )

  // Render Documents Step
  const renderDocumentsStep = (
    <Box gap={3} display="flex" flexDirection="column">
      {!isUniversity && (
        <Field.Upload
          name="registration_doc"
          label="Registration Document"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          helperText="Upload your business registration document (PDF, Word, or image)"
        />
      )}

      {(isLawyer || isImmigrationConsultant) && (
        <Field.Upload
          name="accreditation_doc"
          label="Accreditation Document"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          helperText="Upload your professional accreditation document (PDF, Word, or image)"
        />
      )}

      {isFreelancer && (
        <Field.Upload
          name="passport_doc"
          label="Passport / ID Document"
          accept=".pdf,.jpg,.jpeg,.png"
          helperText="Upload a scan of your valid passport or ID document (PDF or image)"
        />
      )}
    </Box>
  )

  // Render Additional Information Step
  const renderAdditionalInfoStep = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="linkedln_url" label="LinkedIn URL" />

      <Field.Text
        name="references"
        label="References"
        multiline
        rows={4}
        placeholder="Professional references or additional information"
      />

      <Field.Checkbox name="is_term_accepted" label="I accept the terms and conditions for using this platform" />
    </Box>
  )

  // Render the current step content
  const renderStepContent = () => {
    const currentStep = steps[activeStep]

    switch (currentStep) {
      case "Basic Information":
        return renderBasicInfoStep
      case "Professional Details":
        return renderProfessionalDetailsStep
      case "Legal Practice Details":
        return renderLegalPracticeStep
      case "Bar Registration":
        return renderBarRegistrationStep
      case "Business Information":
        return renderBusinessInfoStep
      case "Immigration Expertise":
        return renderImmigrationExpertiseStep
      case "Freelancer Details":
        return renderFreelancerDetailsStep
      case "University Details":
        return renderUniversityDetailsStep
      case "Student Services":
        return renderStudentServicesStep
      case "International Programs":
        return renderInternationalProgramsStep
      case "Specializations":
        return renderSpecializationsStep
      case "Documents":
        return renderDocumentsStep
      case "Additional Information":
        return renderAdditionalInfoStep
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
      }}
    >
      {/* Form */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 500, md: 600, lg: 800 },
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

        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Partner Registration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete all fields to register as a partner
          </Typography>
        </Box>

        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}

        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {renderStepContent()}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            {activeStep > 0 && (
              <Button color="inherit" variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
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
                  handleSubmit(onSubmit)(e)
                }}
              >
                Submit
              </LoadingButton>
            )}
          </Box>
        </Form>

        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

