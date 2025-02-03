import { useState } from "react"
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { SeoIllustration } from 'src/assets/illustrations';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Container,
  Radio,
  RadioGroup,
} from "@mui/material"
import { paths } from 'src/routes/paths';
import { AppWelcome } from './app-welcome';


const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8", "Step 9"]

const countries = ["USA", "Canada", "Australia", "New Zealand", "UK", "Germany", "France", "Spain", "Italy", "Sweden"]

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]

export function OverviewCourseView() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Important Info (constant)
    fromCountry: "",
    toCountry: "",
    currency: "",

    // Rest of the form data
    residingCountry: "",
    applyingTo: "",
    applyingFor: "",

    // Personal Information
    fullName: "",
    dateOfBirth: null,
    gender: "",
    nationality: "",
    passportNumber: "",
    passportIssueDate: null,
    passportExpiryDate: null,
    contactNumber: "",
    email: "",
    currentAddress: "",

    // Purpose of Visit Details
    visitPurpose: "",
    relationshipWithHost: "",
    hostFullName: "",
    hostAddress: "",
    hostImmigrationStatus: "",
    companyName: "",
    companyAddress: "",
    businessMeetingNature: "",
    eventName: "",
    eventDate: null,
    venueAddress: "",
    hospitalName: "",
    treatmentDetails: "",
    familyMemberName: "",
    relationshipWithFamilyMember: "",
    familyMemberAddress: "",

    // Travel Details
    travelingWithFamily: false,
    familyMembers: [],
    intendedTravelDate: null,
    returnDate: null,
    priorVisas: false,

    // Financial Details
    employmentStatus: "",
    companyBusinessName: "",
    position: "",
    monthlyIncome: "",
    institutionName: "",
    tripFinancer: "",
    sponsorName: "",
    sponsorRelationship: "",

    // Accommodation Details
    accommodationType: "",
    accommodationAddress: "",

    // Additional Information
    criminalConvictions: false,
    visaRefusals: false,
    visaRefusalDetails: {
      country: "",
      date: null,
      reason: "",
    },
    countryBans: false,
    countryBanDetails: {
      country: "",
      banEndDate: null,
    },

    // Document Upload
    uploadedDocuments: [],

    // Additional Services
    visaAppointmentBooking: false,
    hotelReservation: false,
    healthInsurance: false,
    flightReservation: false,
    documentSubmissionPreference: "",

    // Other Information
    fatherName: "",
    fatherAddress: "",
    fatherCitizenship: "",
    fatherResidingCountry: "",
    motherName: "",
    motherAddress: "",
    motherCitizenship: "",
    motherResidingCountry: "",
    hasSiblings: false,
    siblings: [],
    maritalStatus: "",
    spouseDetails: {
      fullName: "",
      nationality: "",
      immigrationStatus: "",
      currentAddress: "",
    },
    hasChildren: false,
    children: [],
    livedAbroadMoreThan6Months: false,
    countriesVisitedLast5Years: [],
    militaryService: false,
    militaryServiceDetails: "",
    languagesProficient: [],
    emergencyContact: {
      fullName: "",
      relationship: "",
      contactNumber: "",
      email: "",
    },

    // Consent and Declarations
    consentChecked: false,
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
    // You can send the data to your backend or perform any other actions here
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>I am from</InputLabel>
                <Select name="fromCountry" value={formData.fromCountry} onChange={handleInputChange}>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>I am residing in</InputLabel>
                <Select name="residingCountry" value={formData.residingCountry} onChange={handleInputChange}>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>I am applying to</InputLabel>
                <Select name="applyingTo" value={formData.applyingTo} onChange={handleInputChange}>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="New Zealand">New Zealand</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Schengen">Schengen</MenuItem>
                  <MenuItem value="Other EU">Other EU Countries</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>I am applying for</InputLabel>
                <Select name="applyingFor" value={formData.applyingFor} onChange={handleInputChange}>
                  <MenuItem value="Visit Family/Friends">Visit Family/Friends</MenuItem>
                  <MenuItem value="Tourism">Tourism</MenuItem>
                  <MenuItem value="Business Visit">Business Visit</MenuItem>
                  <MenuItem value="Attending an Event">Attending an Event</MenuItem>
                  <MenuItem value="Medical Treatment">Medical Treatment</MenuItem>
                  <MenuItem value="Joining an EU Family Member">Joining an EU Family Member</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name (as per passport)"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Nationality</InputLabel>
                <Select name="nationality" value={formData.nationality} onChange={handleInputChange}>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passport Number"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passport Issue Date"
                name="passportIssueDate"
                type="date"
                value={formData.passportIssueDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passport Expiry Date"
                name="passportExpiryDate"
                type="date"
                value={formData.passportExpiryDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Residential Address"
                name="currentAddress"
                multiline
                rows={3}
                value={formData.currentAddress}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Purpose of Visit</InputLabel>
                <Select name="visitPurpose" value={formData.visitPurpose} onChange={handleInputChange}>
                  <MenuItem value="Visit Family/Friends">Visit Family/Friends</MenuItem>
                  <MenuItem value="Tourism">Tourism</MenuItem>
                  <MenuItem value="Business Visit">Business Visit</MenuItem>
                  <MenuItem value="Attending an Event">Attending an Event</MenuItem>
                  <MenuItem value="Medical Treatment">Medical Treatment</MenuItem>
                  <MenuItem value="Joining an EU Family Member">Joining an EU Family Member</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.visitPurpose === "Visit Family/Friends" && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Relationship with Host</InputLabel>
                    <Select
                      name="relationshipWithHost"
                      value={formData.relationshipWithHost}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Parent">Parent</MenuItem>
                      <MenuItem value="Sibling">Sibling</MenuItem>
                      <MenuItem value="Friend">Friend</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Host&apos;s Full Name"
                    name="hostFullName"
                    value={formData.hostFullName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Host&apos;s Address"
                    name="hostAddress"
                    multiline
                    rows={2}
                    value={formData.hostAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Host&apos;s Immigration Status</InputLabel>
                    <Select
                      name="hostImmigrationStatus"
                      value={formData.hostImmigrationStatus}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Citizen">Citizen</MenuItem>
                      <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
                      <MenuItem value="Visa Holder">Visa Holder</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            {formData.visitPurpose === "Business Visit" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Address"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Nature of Business Meeting</InputLabel>
                    <Select
                      name="businessMeetingNature"
                      value={formData.businessMeetingNature}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Conference">Conference</MenuItem>
                      <MenuItem value="Partnership Meeting">Partnership Meeting</MenuItem>
                      <MenuItem value="Trade Visit">Trade Visit</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Invitation Letter
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </>
            )}
            {formData.visitPurpose === "Attending an Event" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Event Name"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Event Date"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Venue Address"
                    name="venueAddress"
                    multiline
                    rows={2}
                    value={formData.venueAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Event Ticket
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </>
            )}
            {formData.visitPurpose === "Medical Treatment" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hospital/Clinic Name"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Treatment Details"
                    name="treatmentDetails"
                    multiline
                    rows={3}
                    value={formData.treatmentDetails}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Medical Appointment Letter
                    <input type="file" hidden />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Proof of Medical Funds
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </>
            )}
            {formData.visitPurpose === "Joining an EU Family Member" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Family Member&apos;s Full Name"
                    name="familyMemberName"
                    value={formData.familyMemberName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Relationship with Family Member</InputLabel>
                    <Select
                      name="relationshipWithFamilyMember"
                      value={formData.relationshipWithFamilyMember}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Spouse">Spouse</MenuItem>
                      <MenuItem value="Child">Child</MenuItem>
                      <MenuItem value="Parent">Parent</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Family Member&apos;s EU Residence Card/Passport
                    <input type="file" hidden />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Family Member&apos;s Address in the EU"
                    name="familyMemberAddress"
                    multiline
                    rows={2}
                    value={formData.familyMemberAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Travel Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">Traveling Alone or with Family?</Typography>
                <RadioGroup
                  name="travelingWithFamily"
                  value={formData.travelingWithFamily}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value={false} control={<Radio />} label="Alone" />
                  <FormControlLabel value="true" control={<Radio />} label="With Family" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.travelingWithFamily && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Add Family Members</Typography>
                {/* Add dynamic form fields for family members */}
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Intended Travel Date"
                name="intendedTravelDate"
                type="date"
                value={formData.intendedTravelDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Return Date"
                name="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.priorVisas} onChange={handleInputChange} name="priorVisas" />}
                label="Do you have prior visas for this country?"
              />
            </Grid>
            {formData.priorVisas && (
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Previous Visa Scans
                  <input type="file" hidden multiple />
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 4 }}>Financial Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Employment Status</InputLabel>
                <Select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange}>
                  <MenuItem value="Employed">Employed</MenuItem>
                  <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Retired">Retired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {(formData.employmentStatus === "Employed" || formData.employmentStatus === "Self-Employed") && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company/Business Name"
                    name="companyBusinessName"
                    value={formData.companyBusinessName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position/Title"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Monthly Income"
                    name="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Employment Letter
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </>
            )}
            {formData.employmentStatus === "Student" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Institution Name"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Enrollment Proof
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Who will finance your trip?</InputLabel>
                <Select name="tripFinancer" value={formData.tripFinancer} onChange={handleInputChange}>
                  <MenuItem value="Self">Self</MenuItem>
                  <MenuItem value="Sponsor">Sponsor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.tripFinancer === "Sponsor" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sponsor&apos;s Full Name"
                    name="sponsorName"
                    value={formData.sponsorName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    name="sponsorRelationship"
                    value={formData.sponsorRelationship}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Sponsor&apos;s Income Proof
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Bank Statement (Last 3-6 months)
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>
        )
      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Accommodation Type</InputLabel>
                <Select name="accommodationType" value={formData.accommodationType} onChange={handleInputChange}>
                  <MenuItem value="Hotel">Hotel</MenuItem>
                  <MenuItem value="Staying with Family/Friends">Staying with Family/Friends</MenuItem>
                  <MenuItem value="Rented Accommodation">Rented Accommodation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Accommodation Address"
                name="accommodationAddress"
                multiline
                rows={3}
                value={formData.accommodationAddress}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Proof of Accommodation
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>
        )
      case 5:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.criminalConvictions}
                    onChange={handleInputChange}
                    name="criminalConvictions"
                  />
                }
                label="Do you have any criminal convictions?"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.visaRefusals} onChange={handleInputChange} name="visaRefusals" />}
                label="Have you ever been refused a visa before?"
              />
            </Grid>
            {formData.visaRefusals && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country of Refusal</InputLabel>
                    <Select
                      name="visaRefusalDetails.country"
                      value={formData.visaRefusalDetails.country}
                      onChange={handleInputChange}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Refusal"
                    name="visaRefusalDetails.date"
                    type="date"
                    value={formData.visaRefusalDetails.date}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Reason for Refusal"
                    name="visaRefusalDetails.reason"
                    multiline
                    rows={2}
                    value={formData.visaRefusalDetails.reason}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.countryBans} onChange={handleInputChange} name="countryBans" />}
                label="Do you have any ban for Europe or any other country?"
              />
            </Grid>
            {formData.countryBans && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country of Ban</InputLabel>
                    <Select
                      name="countryBanDetails.country"
                      value={formData.countryBanDetails.country}
                      onChange={handleInputChange}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ban End Date"
                    name="countryBanDetails.banEndDate"
                    type="date"
                    value={formData.countryBanDetails.banEndDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )
      case 6:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Document Upload</Typography>
              <Typography variant="body2">Please upload all required documents.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Documents
                <input type="file" hidden multiple />
              </Button>
            </Grid>
          </Grid>
        )
      case 7:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Additional Services</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.visaAppointmentBooking}
                    onChange={handleInputChange}
                    name="visaAppointmentBooking"
                  />
                }
                label="Visa Appointment Booking"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={formData.hotelReservation} onChange={handleInputChange} name="hotelReservation" />
                }
                label="Hotel Reservation"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={formData.healthInsurance} onChange={handleInputChange} name="healthInsurance" />
                }
                label="Health Insurance"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.flightReservation}
                    onChange={handleInputChange}
                    name="flightReservation"
                  />
                }
                label="Flight Reservation"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Document Submission Preferences</Typography>
              <RadioGroup
                name="documentSubmissionPreference"
                value={formData.documentSubmissionPreference}
                onChange={handleInputChange}
              >
                <FormControlLabel value="homeDelivery" control={<Radio />} label="Home Delivery (75 Euro)" />
                <FormControlLabel value="digitalDownload" control={<Radio />} label="Digital Download (Free)" />
              </RadioGroup>
            </Grid>
          </Grid>
        )
      case 8:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Other Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father&apos;s Full Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father&apos;s Current Address"
                name="fatherAddress"
                value={formData.fatherAddress}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father&apos;s Citizenship"
                name="fatherCitizenship"
                value={formData.fatherCitizenship}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father Residing in"
                name="fatherResidingCountry"
                value={formData.fatherResidingCountry}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother&apos;s Full Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother&apos;s Current Address"
                name="motherAddress"
                value={formData.motherAddress}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother&apos;s Citizenship"
                name="motherCitizenship"
                value={formData.motherCitizenship}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother Residing in"
                name="motherResidingCountry"
                value={formData.motherResidingCountry}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.hasSiblings} onChange={handleInputChange} name="hasSiblings" />}
                label="Do you have siblings?"
              />
            </Grid>
            {formData.hasSiblings && (
              // Add dynamic fields for siblings
              <Grid item xs={12}>
                <Typography variant="subtitle1">Sibling Information</Typography>
                {/* Add fields for sibling name, relationship, address, etc. */}
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.maritalStatus === "Married" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Spouse's Full Name"
                    name="spouseDetails.fullName"
                    value={formData.spouseDetails.fullName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Spouse's Nationality"
                    name="spouseDetails.nationality"
                    value={formData.spouseDetails.nationality}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Spouse's Immigration Status"
                    name="spouseDetails.immigrationStatus"
                    value={formData.spouseDetails.immigrationStatus}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Spouse's Current Address"
                    name="spouseDetails.currentAddress"
                    value={formData.spouseDetails.currentAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.hasChildren} onChange={handleInputChange} name="hasChildren" />}
                label="Do you have children?"
              />
            </Grid>
            {formData.hasChildren && (
              // Add dynamic fields for children
              <Grid item xs={12}>
                <Typography variant="subtitle1">Children Information</Typography>
                {/* Add fields for child name, date of birth, immigration status, etc. */}
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.livedAbroadMoreThan6Months}
                    onChange={handleInputChange}
                    name="livedAbroadMoreThan6Months"
                  />
                }
                label="Have you lived in any other country for more than 6 months?"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Countries visited in the last 5 years</Typography>
              {/* Add a multi-select or dynamic input for countries visited */}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={formData.militaryService} onChange={handleInputChange} name="militaryService" />
                }
                label="Have you served in the military or law enforcement?"
              />
            </Grid>
            {formData.militaryService && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Military Service Details"
                  name="militaryServiceDetails"
                  multiline
                  rows={2}
                  value={formData.militaryServiceDetails}
                  onChange={handleInputChange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Languages you speak fluently</InputLabel>
                <Select
                  multiple
                  name="languagesProficient"
                  value={formData.languagesProficient}
                  onChange={handleInputChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Urdu">Urdu</MenuItem>
                  <MenuItem value="Swedish">Swedish</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Emergency Contact</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="emergencyContact.fullName"
                value={formData.emergencyContact.fullName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Relationship to Applicant"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="emergencyContact.contactNumber"
                value={formData.emergencyContact.contactNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="emergencyContact.email"
                type="email"
                value={formData.emergencyContact.email}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        )
      case 9:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Consent and Declarations</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.consentChecked}
                    onChange={handleInputChange}
                    name="consentChecked"
                    required
                  />
                }
                label="I confirm that all information provided is accurate and true. I consent to the processing of my data for visa application purposes."
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                By checking this box, you agree to our terms and conditions. Please read the following carefully:
              </Typography>
              <Typography variant="body2" paragraph>
                Global Visa Services is a part of Sweden Relocators AB, a professional relocation and immigration
                service provider. We offer expert consultation and document preparation assistance for visa
                applications. Our role is strictly limited to providing accurate guidance and assisting in the
                preparation of necessary documents based on the information you provide.
              </Typography>
              <Typography variant="body2" paragraph>
                We are an independent third-party service provider and are not affiliated with or endorsed by any
                government agency or official visa authority. You have the full right to apply for a visa directly
                through the respective official embassy or immigration website without using our services.
              </Typography>
              <Typography variant="body2" paragraph>
                Please note that while we utilize our experience and expertise to support your visa application, we do
                not and cannot guarantee the approval of any visa application. The final decision rests solely with the
                respective immigration authorities.
              </Typography>
              <Typography variant="body2">
                By accepting this consent, you confirm that you have read, understood, and agreed to our Terms and
                Conditions available on our official website.
              </Typography>
            </Grid>
          </Grid>
        )
      default:
        return "Unknown step"
    }
  }

  // New component for the constant Important Info section
  const ImportantInfo = () => (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Important Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>From</InputLabel>
            <Select name="fromCountry" value={formData.fromCountry} onChange={handleInputChange} label="From">
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>To</InputLabel>
            <Select name="toCountry" value={formData.toCountry} onChange={handleInputChange} label="To">
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select name="currency" value={formData.currency} onChange={handleInputChange} label="Currency">
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )

  return (



    <Container maxWidth="lg">

      <CustomBreadcrumbs
        heading="Global Visa Application"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "Global Visa", href: paths.dashboard.post.root },
          { name: "Global Visa Application" },
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
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        {/* <Typography variant="h4" align="center" gutterBottom>
          Visa Application Form
        </Typography> */}

        <Grid container spacing={3}>
          {/* Left side - Form Fields */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2 }}>
              {renderStepContent(activeStep)}
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right side - Stepper and Important Info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
            <ImportantInfo />
          </Grid>
        </Grid>
      </Paper>
    </Container>

  )
}

