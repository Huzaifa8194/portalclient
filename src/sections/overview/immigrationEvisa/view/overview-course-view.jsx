import { useState, useEffect } from "react"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
  marginBottom: theme.spacing(2),
}))

const steps = [
  "Personal Information",
  "Passport Details",
  "Contact Information",
  "Travel Information",
  "Security and Eligibility",
  "Dependent Information",
]

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  // Add more countries as needed
]

const currencies = [
  { code: "USD", label: "US Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "AUD", label: "Australian Dollar" },
  { code: "CAD", label: "Canadian Dollar" },
  // Add more currencies as needed
]

export function OverviewCourseView() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    birthCity: "",
    birthCountry: "",
    nationality: "",
    additionalCitizenship: "",
    additionalCitizenshipSpecify: "",

    // Section 2: Passport Details
    passportNumber: "",
    passportCountry: "",
    passportType: "",
    passportTypeOther: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    isReplacementPassport: "",

    // Section 3: Contact Information
    email: "",
    phoneCountryCode: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",

    // Section 4: Travel Information
    travelPurpose: "",
    travelPurposeOther: "",
    arrivalCountry: "",
    arrivalDate: "",
    departureDate: "",
    stayAddress: "",
    hasReturnTicket: "",
    flightDetails: "",

    // Section 5: Security and Eligibility Questions
    hasCriminalRecord: "",
    hasBeenRefusedEntry: "",
    hasHealthConcerns: "",
    hasVisitedRestrictedCountries: "",
    restrictedCountriesList: "",

    // Section 6: Dependent Information
    numberOfDependents: "0",
    dependents: [],

    // Important Information (right panel)
    fromCountry: "",
    toCountry: "",
    currency: "",
  })

  useEffect(() => {
    const numDependents = Number.parseInt(formData.numberOfDependents, 10)
    setFormData((prev) => ({
      ...prev,
      dependents: Array(numDependents)
        .fill(null)
        .map(
          (_, i) =>
            prev.dependents[i] || {
              relation: "",
              relationOther: "",
              fullName: "",
              dateOfBirth: "",
              passportNumber: "",
              nationality: "",
              gender: "",
              relationshipVerification: "",
              relationshipVerificationOther: "",
              parentalConsent: "",
            },
        ),
    }))
  }, [formData.numberOfDependents])

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => {
      if (name.startsWith("dependents[")) {
        const [, index, field] = name.match(/dependents\[(\d+)\]\.(.+)/)
        const newDependents = [...prev.dependents]
        newDependents[index] = { ...newDependents[index], [field]: value }
        return { ...prev, dependents: newDependents }
      }
      return { ...prev, [name]: value }
    })
  }

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Middle Name (if any)"
          name="middleName"
          value={formData.middleName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleInputChange} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="nonBinary">Non-Binary</MenuItem>
            <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="City of Birth"
          name="birthCity"
          value={formData.birthCity}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Country of Birth</InputLabel>
          <Select
            name="birthCountry"
            value={formData.birthCountry}
            onChange={handleInputChange}
            label="Country of Birth"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Nationality</InputLabel>
          <Select name="nationality" value={formData.nationality} onChange={handleInputChange} label="Nationality">
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Do you hold additional citizenships?</InputLabel>
          <Select
            name="additionalCitizenship"
            value={formData.additionalCitizenship}
            onChange={handleInputChange}
            label="Do you hold additional citizenships?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {formData.additionalCitizenship === "yes" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Specify additional citizenships"
            name="additionalCitizenshipSpecify"
            value={formData.additionalCitizenshipSpecify}
            onChange={handleInputChange}
          />
        </Grid>
      )}
    </Grid>
  )

  const renderPassportDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Passport Details
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Passport Number"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Country of Passport Issuance</InputLabel>
          <Select
            name="passportCountry"
            value={formData.passportCountry}
            onChange={handleInputChange}
            label="Country of Passport Issuance"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Passport Type</InputLabel>
          <Select name="passportType" value={formData.passportType} onChange={handleInputChange} label="Passport Type">
            <MenuItem value="ordinary">Ordinary</MenuItem>
            <MenuItem value="diplomatic">Diplomatic</MenuItem>
            <MenuItem value="official">Official</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {formData.passportType === "other" && (
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Specify Passport Type"
            name="passportTypeOther"
            value={formData.passportTypeOther}
            onChange={handleInputChange}
          />
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Passport Issue Date"
          name="passportIssueDate"
          value={formData.passportIssueDate}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Passport Expiry Date"
          value={formData.passportExpiryDate}
          onChange={handleInputChange}
          name="passportExpiryDate"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Is this a replacement for a lost/stolen passport?</InputLabel>
          <Select
            name="isReplacementPassport"
            value={formData.isReplacementPassport}
            onChange={handleInputChange}
            label="Is this a replacement for a lost/stolen passport?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  const renderContactInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth required>
          <InputLabel>Country Code</InputLabel>
          <Select
            name="phoneCountryCode"
            value={formData.phoneCountryCode}
            onChange={handleInputChange}
            label="Country Code"
          >
            <MenuItem value="+1">+1 (USA)</MenuItem>
            <MenuItem value="+44">+44 (UK)</MenuItem>
            {/* Add more country codes */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Street Address"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} required />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="State/Province"
          name="stateProvince"
          value={formData.stateProvince}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Country</InputLabel>
          <Select name="country" value={formData.country} onChange={handleInputChange} label="Country">
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  const renderTravelInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Travel Information
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Purpose of Travel</InputLabel>
          <Select
            name="travelPurpose"
            value={formData.travelPurpose}
            onChange={handleInputChange}
            label="Purpose of Travel"
          >
            <MenuItem value="tourism">Tourism</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="transit">Transit</MenuItem>
            <MenuItem value="familyVisit">Family Visit</MenuItem>
            <MenuItem value="medical">Medical</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {formData.travelPurpose === "other" && (
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Specify Travel Purpose"
            name="travelPurposeOther"
            value={formData.travelPurposeOther}
            onChange={handleInputChange}
          />
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Country of Arrival</InputLabel>
          <Select
            name="arrivalCountry"
            value={formData.arrivalCountry}
            onChange={handleInputChange}
            label="Country of Arrival"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Intended Date of Arrival"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Intended Date of Departure"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address of Stay (Hotel or Host Address)"
          name="stayAddress"
          value={formData.stayAddress}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Have you booked a return ticket?</InputLabel>
          <Select
            name="hasReturnTicket"
            value={formData.hasReturnTicket}
            onChange={handleInputChange}
            label="Have you booked a return ticket?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {formData.hasReturnTicket === "yes" && (
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Flight Details"
            name="flightDetails"
            value={formData.flightDetails}
            onChange={handleInputChange}
          />
        </Grid>
      )}
    </Grid>
  )

  const renderSecurityQuestions = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Security and Eligibility Questions
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Have you ever been convicted of a crime or offense?</InputLabel>
          <Select
            name="hasCriminalRecord"
            value={formData.hasCriminalRecord}
            onChange={handleInputChange}
            label="Have you ever been convicted of a crime or offense?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Have you ever been refused entry or deported from any country?</InputLabel>
          <Select
            name="hasBeenRefusedEntry"
            value={formData.hasBeenRefusedEntry}
            onChange={handleInputChange}
            label="Have you ever been refused entry or deported from any country?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Do you have any communicable diseases or public health concerns?</InputLabel>
          <Select
            name="hasHealthConcerns"
            value={formData.hasHealthConcerns}
            onChange={handleInputChange}
            label="Do you have any communicable diseases or public health concerns?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Have you traveled to any restricted or high-risk countries in the past 10 years?</InputLabel>
          <Select
            name="hasVisitedRestrictedCountries"
            value={formData.hasVisitedRestrictedCountries}
            onChange={handleInputChange}
            label="Have you traveled to any restricted or high-risk countries in the past 10 years?"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {formData.hasVisitedRestrictedCountries === "yes" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="List restricted countries visited"
            name="restrictedCountriesList"
            value={formData.restrictedCountriesList}
            onChange={handleInputChange}
          />
        </Grid>
      )}
    </Grid>
  )

  const renderDependentInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Dependent Information (For Minors Under 18)
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="Number of Dependents (Minors)"
          name="numberOfDependents"
          value={formData.numberOfDependents}
          onChange={handleInputChange}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>
      {formData.dependents.map((dependent, index) => (
        <Grid container item spacing={3} key={index}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Dependent {index + 1}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Relation</InputLabel>
              <Select
                name={`dependents[${index}].relation`}
                value={formData.dependents[index]?.relation || ""}
                onChange={handleInputChange}
                label="Relation"
              >
                <MenuItem value="child">Child</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.dependents[index]?.relation === "other" && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Specify Relation"
                name={`dependents[${index}].relationOther`}
                value={formData.dependents[index]?.relationOther || ""}
                onChange={handleInputChange}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              name={`dependents[${index}].fullName`}
              value={formData.dependents[index]?.fullName || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name={`dependents[${index}].dateOfBirth`}
              value={formData.dependents[index]?.dateOfBirth || null}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Passport Number"
              name={`dependents[${index}].passportNumber`}
              value={formData.dependents[index]?.passportNumber || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Nationality</InputLabel>
              <Select
                name={`dependents[${index}].nationality`}
                value={formData.dependents[index]?.nationality || ""}
                onChange={handleInputChange}
                label="Nationality"
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name={`dependents[${index}].gender`}
                value={formData.dependents[index]?.gender || ""}
                onChange={handleInputChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Relationship Verification Documents</InputLabel>
              <Select
                name={`dependents[${index}].relationshipVerification`}
                value={formData.dependents[index]?.relationshipVerification || ""}
                onChange={handleInputChange}
                label="Relationship Verification Documents"
              >
                <MenuItem value="birthCertificate">Birth Certificate</MenuItem>
                <MenuItem value="adoptionPapers">Adoption Papers</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.dependents[index]?.relationshipVerification === "other" && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Specify Document Type"
                name={`dependents[${index}].relationshipVerificationOther`}
                value={formData.dependents[index]?.relationshipVerificationOther || ""}
                onChange={handleInputChange}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Consent from Other Parents/Guardians (if applicable)</InputLabel>
              <Select
                name={`dependents[${index}].parentalConsent`}
                value={formData.dependents[index]?.parentalConsent || ""}
                onChange={handleInputChange}
                label="Consent from Other Parents/Guardians (if applicable)"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="notApplicable">Not Applicable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfo()
      case 1:
        return renderPassportDetails()
      case 2:
        return renderContactInfo()
      case 3:
        return renderTravelInfo()
      case 4:
        return renderSecurityQuestions()
      case 5:
        return renderDependentInfo()
      default:
        return "Unknown step"
    }
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Grid container spacing={3}>
        {/* Main content area */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Button variant="contained" onClick={activeStep === steps.length - 1 ? undefined : handleNext}>
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Right side panel with stepper and info */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ width: "100%", mb: 4 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Important Information
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>I am a citizen of</InputLabel>
                    <Select
                      name="fromCountry"
                      value={formData.fromCountry}
                      onChange={handleInputChange}
                      label="I am a citizen of"
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>I am going to</InputLabel>
                    <Select
                      name="toCountry"
                      value={formData.toCountry}
                      onChange={handleInputChange}
                      label="I am going to"
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Currency</InputLabel>
                    <Select name="currency" value={formData.currency} onChange={handleInputChange} label="Currency">
                      {currencies.map((currency) => (
                        <MenuItem key={currency.code} value={currency.code}>
                          {currency.label} ({currency.code})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

