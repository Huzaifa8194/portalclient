import { useState, useEffect } from "react"
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { SeoIllustration } from 'src/assets/illustrations';
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
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Checkbox,
  ListItemText,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { paths } from 'src/routes/paths';
import FileUploadButton from './FileUploadButton'
import { AppWelcome } from './app-welcome';

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
  marginBottom: theme.spacing(2),
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.1)",
  },
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.1)",
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
}))

const steps = [
  "Personal Information",
  "Passport Details",
  "Contact Information",
  "Travel Information",
  "Security and Eligibility",
  "Dependent Information",
  "Document Checklist",
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
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

    // Section 7: Document Checklist
    checklist: {
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
  })

  useEffect(() => {
    const numDependents = Number.parseInt(formData.numberOfDependents, 10) || 0
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
      if (name.startsWith("checklist.")) {
        const [, field] = name.split(".")
        return { ...prev, checklist: { ...prev.checklist, [field]: value } }
      }
      return { ...prev, [name]: value }
    })
  }

  const renderPersonalInfo = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
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
    </StyledPaper>
  )

  const renderPassportDetails = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
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
            <Select
              name="passportType"
              value={formData.passportType}
              onChange={handleInputChange}
              label="Passport Type"
            >
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
    </StyledPaper>
  )

  const renderContactInfo = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
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
    </StyledPaper>
  )

  const renderTravelInfo = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
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
    </StyledPaper>
  )

  const renderSecurityQuestions = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
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
    </StyledPaper>
  )

  const renderDependentInfo = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
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
            inputProps={{ min: 0, max: 10 }} // Add a reasonable maximum
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
                value={formData.dependents[index]?.dateOfBirth || ""}
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

{/* Show file upload if 'Yes' is selected */}
{formData.dependents[index]?.parentalConsent === "yes" && (
  <Grid item xs={12} md={12}>
    <FileUploadButton
      label="Attach Consent Letter"
      fieldName={`dependents[${index}].consentLetter`}
      acceptedFileTypes=".pdf,.doc,.docx"
      uploadedFiles={formData.dependents[index]?.consentLetter || []}
      onUpload={(e, fieldName) => {
        const files = Array.from(e.target.files);
        setFormData((prevState) => {
          const updatedDependents = [...prevState.dependents];
          updatedDependents[index] = {
            ...updatedDependents[index],
            [fieldName]: files,
          };
          return { ...prevState, dependents: updatedDependents };
        });
      }}
      onRemove={(fieldName, fileName) => {
        setFormData((prevState) => {
          const updatedDependents = [...prevState.dependents];
          updatedDependents[index] = {
            ...updatedDependents[index],
            [fieldName]: updatedDependents[index][fieldName]?.filter((file) => file.name !== fileName),
          };
          return { ...prevState, dependents: updatedDependents };
        });
      }}
    />
  </Grid>
)}

          </Grid>
        ))}
      </Grid>
    </StyledPaper>
  )

  const renderChecklist = () => (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
            Document Checklist
          </Typography>
        </Grid>
        {[
          {
            title: "Personal Identification Documents",
            name: "personalIdentification",
            options: [
              "Valid Passport",
              "Completed Visa/Permit Application Form",
              "Recent Passport-Sized Photographs",
              "Birth Certificate",
              "Family Registration Certificate",
              "Marriage Certificate (if applicable)",
              "Copies of Old Visas",
            ],
          },
          {
            title: "Financial Proof and Support Documents",
            name: "financialProof",
            options: [
              "Recent Bank Statement",
              "Savings Account Statement",
              "Money Transfer Receipt (if sponsored)",
              "Proof of Financial Means (e.g., Sponsorship Letter)",
              "Payslips (last 3–6 months)",
            ],
          },
          {
            title: "Employment and Business-Related Documents",
            name: "employmentBusiness",
            options: [
              "Employer's Letter (employment verification)",
              "Employment Contract",
              "Company Registration Certificate (for business owners)",
              "Annual Company Reports",
              "Business Plan (for business visa/start-up permit)",
            ],
          },
          {
            title: "Accommodation and Travel Documents",
            name: "accommodationTravel",
            options: [
              "Flight Itinerary/Travel Plan",
              "Proof of Accommodation (hotel booking, rental agreement, or host invitation)",
              "Travel Health Insurance (minimum €30,000 coverage)",
              "Visa Fee Payment Receipt",
            ],
          },
          {
            title: "Relationship and Family Reunification Documents",
            name: "relationshipFamily",
            options: [
              "Invitation Letter from Family/Host",
              "Proof of Relationship (photos, communication records)",
              "Host's ID and Residence Proof",
              "Parental Consent Letter (for minors)",
              "Parent/Guardian Passport Copies",
            ],
          },
          {
            title: "Residency and Tax Documentation",
            name: "residencyTax",
            options: [
              "Skatteverket Documents (for Sweden, e.g., personbevis)",
              "Proof of EU/EEA Spouse's Residence Status",
            ],
          },
          {
            title: "Education and Study-Related Documents",
            name: "educationStudy",
            options: ["Enrollment Letter (for study permit)", "Accommodation Proof (for students)"],
          },
          {
            title: "Medical and Health-Related Documents",
            name: "medicalHealth",
            options: [
              "Medical Appointment Confirmation (for medical visa)",
              "Proof of Medical Fees Payment or Financial Capability",
            ],
          },
          {
            title: "Additional Travel Documents",
            name: "additionalTravel",
            options: [
              "Visa for Final Destination (for transit visa)",
              "Proof of Ongoing Travel (travel card, ticket reservations)",
            ],
          },
        ].map((section) => (
          <Grid item xs={12} key={section.name}>
            <Typography variant="subtitle1" gutterBottom>
              {section.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id={`${section.name}-label`}>{section.title}</InputLabel>
              <Select
                labelId={`${section.name}-label`}
                id={section.name}
                multiple
                value={formData.checklist[section.name]}
                onChange={(event) =>
                  handleInputChange({
                    target: {
                      name: `checklist.${section.name}`,
                      value: event.target.value,
                    },
                  })
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {section.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={formData.checklist[section.name].indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </StyledPaper>
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
      case 6:
        return renderChecklist()
      default:
        return "Unknown step"
    }
  }

  return (



    <Container maxWidth="lg">
      <CustomBreadcrumbs
              heading="Visa Application Form"
              links={[
                { name: "Dashboard", href: paths.dashboard.root },
                { name: "EVisa", href: paths.dashboard.post.root },
                { name: "Visa Application Form" },
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

      <Box sx={{ width: "100%", py: 4 }}>
        <Grid container spacing={4}>
          {/* Main content area */}
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                {/* <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                  Visa Application Form
                </Typography> */}
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <StyledButton disabled={activeStep === 0} onClick={handleBack} variant="outlined" >
                    Back
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    
                    onClick={activeStep === steps.length - 1 ? undefined : handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </StyledButton>
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
                    <Typography variant="h6" gutterBottom >
                      Application Progress
                    </Typography>
                    <Box sx={{ width: "100%", mb: 4 }}>
                      <Stepper activeStep={activeStep} orientation={isMobile ? "horizontal" : "vertical"}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{isMobile ? "" : label}</StepLabel>
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
                    <Typography variant="h6" gutterBottom >
                      Important Information
                    </Typography>
                  
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
    </Container>
  )
}

