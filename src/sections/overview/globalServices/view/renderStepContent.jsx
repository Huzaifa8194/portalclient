import {
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
    ListItemText,
  } from "@mui/material"
  import { FileUploadButton } from "./FileUploadButton"
  
  const countries = ["USA", "Canada", "Australia", "New Zealand", "UK", "Germany", "France", "Spain", "Italy", "Sweden"] // Add more countries as needed
  
  const documentChecklistItems = {
    personalIdentification: [
      "Valid Passport",
      "Completed Visa/Permit Application Form",
      "Recent Passport-Sized Photographs",
      "Birth Certificate",
      "Family Registration Certificate",
      "Marriage Certificate (if applicable)",
      "Copies of Old Visas",
    ],
    financialProof: [
      "Recent Bank Statement",
      "Savings Account Statement",
      "Money Transfer Receipt (if sponsored)",
      "Proof of Financial Means (e.g., Sponsorship Letter)",
      "Payslips (last 3–6 months)",
    ],
    employmentBusiness: [
      "Employer's Letter (employment verification)",
      "Employment Contract",
      "Company Registration Certificate (for business owners)",
      "Annual Company Reports",
      "Business Plan (for business visa/start-up permit)",
    ],
    accommodationTravel: [
      "Flight Itinerary/Travel Plan",
      "Proof of Accommodation (hotel booking, rental agreement, or host invitation)",
      "Travel Health Insurance (minimum €30,000 coverage)",
      "Visa Fee Payment Receipt",
    ],
    relationshipFamily: [
      "Invitation Letter from Family/Host",
      "Proof of Relationship (photos, communication records)",
      "Host's ID and Residence Proof",
      "Parental Consent Letter (for minors)",
      "Parent/Guardian Passport Copies",
    ],
    residencyTax: ["Skatteverket Documents (for Sweden, e.g., personbevis)", "Proof of EU/EEA Spouse's Residence Status"],
    educationStudy: ["Enrollment Letter (for study permit)", "Accommodation Proof (for students)"],
    medicalHealth: [
      "Medical Appointment Confirmation (for medical visa)",
      "Proof of Medical Fees Payment or Financial Capability",
    ],
    additionalTravel: [
      "Visa for Final Destination (for transit visa)",
      "Proof of Ongoing Travel (travel card, ticket reservations)",
    ],
  }
  
  export const renderStepContent = (step, formData, handleInputChange, handleFileUpload, handleFileRemove) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Application Overview</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>I am from</InputLabel>
                <Select name="fromCountry" value={formData.fromCountry || ""} onChange={handleInputChange}>
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
                <Select name="residingCountry" value={formData.residingCountry || ""} onChange={handleInputChange}>
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
                <Select name="applyingTo" value={formData.applyingTo || ""} onChange={handleInputChange}>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="New Zealand">New Zealand</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Schengen">Schengen</MenuItem>
                  <MenuItem value="Other EU Countries">Other EU Countries</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>I am applying for</InputLabel>
                <Select name="applyingFor" value={formData.applyingFor || ""} onChange={handleInputChange}>
                  <MenuItem value="Visit Family/Friends">Visit Family/Friends</MenuItem>
                  <MenuItem value="Tourism">Tourism</MenuItem>
                  <MenuItem value="Business Visit">Business Visit</MenuItem>
                  <MenuItem value="Attending an Event">
                    Attending an Event (e.g., Conference, Concert, Exhibition)
                  </MenuItem>
                  <MenuItem value="Medical Treatment">Medical Treatment</MenuItem>
                  <MenuItem value="Joining an EU Family Member">Joining an EU Family Member</MenuItem>
                  <MenuItem value="Other">Other (Specify)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Personal Information</Typography>
            </Grid>
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
              <Typography variant="h6">Purpose of Visit Details</Typography>
            </Grid>
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
                  <MenuItem value="Other">Other (Specify)</MenuItem>
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
                    label="Host's Full Name"
                    name="hostFullName"
                    value={formData.hostFullName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Host's Address"
                    name="hostAddress"
                    multiline
                    rows={2}
                    value={formData.hostAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Hosts Immigration Status</InputLabel>
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
                <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Invitation Letter Upload</InputLabel>
                  
                  <FileUploadButton
                    label="Upload Invitation Letter"
                    fieldName="invitationLetter"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.invitationLetter}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
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
                <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Upload Event Tickets</InputLabel>
                  
                  <FileUploadButton
                    label="Upload Event Ticket"
                    fieldName="eventTicket"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.eventTicket}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
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
                <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Upload Medical Appointment Letter</InputLabel>
                  
                  <FileUploadButton
                    label="Upload Medical Appointment Letter"
                    fieldName="medicalAppointmentLetter"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.medicalAppointmentLetter}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h7">Upload Proof of Medical Funds</Typography>
                  <FileUploadButton
                    label="Upload Proof of Medical Funds"
                    fieldName="proofOfMedicalFunds"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.proofOfMedicalFunds}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
                </Grid>
              </>
            )}
            {formData.visitPurpose === "Joining an EU Family Member" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Family Member's Full Name"
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
                <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Upload Family Members EU Residence Card/Passport</InputLabel>
                  
                  <FileUploadButton
                    label="Upload Family Member's EU Residence Card/Passport"
                    fieldName="familyMemberDocs"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.familyMemberDocs}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Family Member's Address in the EU"
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
                <RadioGroup name="travelingWithFamily" value={formData.travelingWithFamily} onChange={handleInputChange}>
                  <FormControlLabel value="Alone" control={<Radio />} label="Alone" />
                  <FormControlLabel value="With Family" control={<Radio />} label="With Family" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.travelingWithFamily === "With Family" && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Add Family Members</Typography>
                {/* Add dynamic form fields for family members */}
                <Button variant="outlined" color="primary">
                  Add Co-Applicant
                </Button>
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
                <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Upload Previous Visa Documents</InputLabel>
                <FileUploadButton
                  label="Upload Previous Visa Scans"
                  fieldName="previousVisas"
                  acceptedFileTypes="*/*"
                  uploadedFiles={formData.uploadedFiles.previousVisas}
                  onUpload={handleFileUpload}
                  onRemove={handleFileRemove}
                  multiple
                />
              </Grid>
            )}
          </Grid>
        )
      case 4:
        return (
          <Grid container spacing={2}>
            {/* Financial Details Heading */}
            <Grid item xs={12}>
              <Typography variant="h6">Financial Details</Typography>
            </Grid>
  
            {/* Employment Status Dropdown */}
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
  
            {/* If Employed/Self-Employed */}
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
                <Grid item xs={12}>
                  <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Employment Letter Upload</InputLabel>
                  <FileUploadButton
                    label="Upload Employment Letter"
                    fieldName="employmentLetter"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.employmentLetter}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
                </Grid>
              </>
            )}
  
            {/* If Student */}
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
                <Grid item xs={12}>
                  <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Enrollment Proof Upload</InputLabel>
                  <FileUploadButton
                    label="Upload Enrollment Proof"
                    fieldName="enrollmentProof"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.enrollmentProof}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
                </Grid>
              </>
            )}
  
            {/* Who will finance your trip? */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Who will finance your trip?</InputLabel>
                <Select name="tripFinancer" value={formData.tripFinancer} onChange={handleInputChange}>
                  <MenuItem value="Self">Self</MenuItem>
                  <MenuItem value="Sponsor">Sponsor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
  
            {/* If Sponsor */}
            {formData.tripFinancer === "Sponsor" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sponsor's Full Name"
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
                <Grid item xs={12}>
                  <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Sponsors Income Proof Upload</InputLabel>
                  <FileUploadButton
                    label="Upload Sponsor's Income Proof"
                    fieldName="sponsorIncomeProof"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.sponsorIncomeProof}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
                  />
                </Grid>
              </>
            )}
  
            {/* Bank Statement Upload */}
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Bank Statement Upload (Last 3-6 months)</InputLabel>
              <FileUploadButton
                label="Upload Bank Statement (Last 3-6 months)"
                fieldName="bankStatement"
                acceptedFileTypes="*/*"
                uploadedFiles={formData.uploadedFiles.bankStatement}
                onUpload={handleFileUpload}
                onRemove={handleFileRemove}
              />
            </Grid>
          </Grid>
        )
  
      case 5:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Accommodation Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Accommodation Arrangement</InputLabel>
                <Select
                  name="accommodationArrangement"
                  value={formData.accommodationArrangement}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Prepared">I have prepared accommodation</MenuItem>
                  <MenuItem value="Arrange">I want Global Visa Services to arrange</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.accommodationArrangement === "Prepared" && (
              <>
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
                  <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Bank Statement Upload (Last 3-6 months)</InputLabel>
                  <FileUploadButton
                    label="Upload Proof of Accommodation"
                    fieldName="proofOfAccommodation"
                    acceptedFileTypes="*/*"
                    uploadedFiles={formData.uploadedFiles.proofOfAccommodation}
                    onUpload={handleFileUpload}
                    onRemove={handleFileRemove}
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
              <Typography variant="h6">Additional Information</Typography>
            </Grid>
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
            {formData.criminalConvictions && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Provide Details"
                  name="criminalConvictionDetails"
                  multiline
                  rows={3}
                  value={formData.criminalConvictionDetails}
                  onChange={handleInputChange}
                />
              </Grid>
            )}
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
      case 7:
        return (
          <Grid container spacing={2}>
            {/* Additional Services Heading */}
            <Grid item xs={12}>
              <Typography variant="h6">Additional Services (Optional)</Typography>
            </Grid>
  
            {/* Visa Appointment Booking */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Visa Appointment Booking:
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                If the visa is not online, would you like us to book an appointment at the nearest embassy/visa centre?
              </Typography>
  
              <RadioGroup
                name="visaAppointmentBooking"
                value={formData.visaAppointmentBooking}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
  
            {/* Travel & Booking Services */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Travel & Booking Services:</Typography>
              <FormControlLabel
                control={
                  <Checkbox checked={formData.hotelReservation} onChange={handleInputChange} name="hotelReservation" />
                }
                label="I want Global Visa Services to make hotel reservations for visa purposes."
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.healthInsurance} onChange={handleInputChange} name="healthInsurance" />
                }
                label="I want Global Visa Services to purchase health insurance for my trip."
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.flightReservation} onChange={handleInputChange} name="flightReservation" />
                }
                label="I want Global Visa Services to book flight reservations for my visa application."
              />
            </Grid>
  
            {/* Document Submission Preferences */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Document Submission Preferences
              </Typography>
              <Typography variant="body2" paragraph>
                Please select your preferred method for receiving your complete visa application file:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.documentSubmissionPreference === "homeDelivery"}
                    onChange={() =>
                      handleInputChange({ target: { name: "documentSubmissionPreference", value: "homeDelivery" } })
                    }
                  />
                }
                label="Home Delivery: I want the complete visa file to be printed and posted to my home address. I will submit it along with my passport to the nearest visa center or embassy. (75 Euro)"
                sx={{ mb: 1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.documentSubmissionPreference === "digitalDownload"}
                    onChange={() =>
                      handleInputChange({ target: { name: "documentSubmissionPreference", value: "digitalDownload" } })
                    }
                  />
                }
                label="Digital Download: I will download the complete visa file from the portal or mobile app and submit it with my passport to the nearest visa center or embassy. (Free)"
              />
            </Grid>
          </Grid>
        )
  
      case 8:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Family and Background Details</Typography>
            </Grid>
  
            {/* Father's Information */}
            {!formData.hasFatherDetails && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Father's Full Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Father's Current Address"
                    name="fatherAddress"
                    value={formData.fatherAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Father's Citizenship"
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
              </>
            )}
  
            {/* Mother's Information */}
            {!formData.hasMotherDetails && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mother's Full Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mother's Current Address"
                    name="motherAddress"
                    value={formData.motherAddress}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mother's Citizenship"
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
              </>
            )}
  
            {/* Siblings Information */}
            {!formData.hasSiblings && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={formData.hasSiblings} onChange={handleInputChange} name="hasSiblings" />}
                  label="Do you have siblings?"
                />
              </Grid>
            )}
            {formData.hasSiblings && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Sibling Information</Typography>
                {formData.siblings.map((sibling, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Sibling Full Name"
                        name={`siblings[${index}].fullName`}
                        value={sibling.fullName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Relationship</InputLabel>
                        <Select
                          name={`siblings[${index}].relationship`}
                          value={sibling.relationship}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Brother">Brother</MenuItem>
                          <MenuItem value="Sister">Sister</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Current Address"
                        name={`siblings[${index}].currentAddress`}
                        value={sibling.currentAddress}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Immigration Status"
                        name={`siblings[${index}].immigrationStatus`}
                        value={sibling.immigrationStatus}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    const newSiblings = [
                      ...formData.siblings,
                      { fullName: "", relationship: "", currentAddress: "", immigrationStatus: "" },
                    ]
                    handleInputChange({ target: { name: "siblings", value: newSiblings } })
                  }}
                >
                  Add More Siblings
                </Button>
              </Grid>
            )}
  
            {/* Marital Status */}
            {!formData.hasFamilyDetails && (
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
            )}
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
  
            {/* Children Information */}
            {!formData.hasChildren && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={formData.hasChildren} onChange={handleInputChange} name="hasChildren" />}
                  label="Do you have children?"
                />
              </Grid>
            )}
            {formData.hasChildren && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Children Information</Typography>
                {formData.children.map((child, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Child Full Name"
                        name={`children[${index}].fullName`}
                        value={child.fullName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        name={`children[${index}].dob`}
                        type="date"
                        value={child.dob}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Immigration Status"
                        name={`children[${index}].immigrationStatus`}
                        value={child.immigrationStatus}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    const newChildren = [...formData.children, { fullName: "", dob: "", immigrationStatus: "" }]
                    handleInputChange({ target: { name: "children", value: newChildren } })
                  }}
                >
                  Add More Children
                </Button>
              </Grid>
            )}
  
            {/* Residency and Travel History */}
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
            {formData.livedAbroadMoreThan6Months && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country Name"
                    name="countryLivedAbroad"
                    value={formData.countryLivedAbroad}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration of Stay"
                    name="durationOfStayAbroad"
                    value={formData.durationOfStayAbroad}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Immigration Status in that Country"
                    name="immigrationStatusAbroad"
                    value={formData.immigrationStatusAbroad}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Countries visited in the last 5 years</Typography>
              <TextField
                fullWidth
                label="Countries Visited"
                name="countriesVisited"
                value={formData.countriesVisited}
                onChange={handleInputChange}
                multiline
                rows={2}
                helperText="Enter countries separated by commas"
              />
            </Grid>
  
            {/* Military Service */}
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
  
            {/* Language Proficiency */}
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
  
            {/* Emergency Contact */}
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
              <Typography variant="h6">Document Checklist</Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Please select the documents you have prepared for your visa application. This checklist is for internal
                use and will not appear on the front end.
              </Typography>
            </Grid>
            {Object.entries(documentChecklistItems).map(([category, items]) => (
              <Grid item xs={12} key={category}>
                <Typography variant="subtitle1" gutterBottom>
                  {category.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id={`${category}-label`}>Select Documents</InputLabel>
                  <Select
                    labelId={`${category}-label`}
                    multiple
                    value={formData.documentChecklist[category] || []}
                    onChange={(event) =>
                      handleInputChange({
                        target: {
                          name: `documentChecklist.${category}`,
                          value: event.target.value,
                        },
                      })
                    }
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {items.map((item) => (
                      <MenuItem key={item} value={item}>
                        <Checkbox checked={(formData.documentChecklist[category] || []).indexOf(item) > -1} />
                        <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        )
  
      case 10:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Consent and Declarations</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.declarationChecked || false}
                    onChange={handleInputChange}
                    name="declarationChecked"
                    required
                  />
                }
                label="I confirm that all information provided is accurate and true."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.consentChecked || false}
                    onChange={handleInputChange}
                    name="consentChecked"
                    required
                  />
                }
                label="I consent to the processing of my data for visa application purposes."
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                By proceeding with our services, you acknowledge and agree to the following terms:
              </Typography>
              <Typography variant="body2" paragraph>
                Global Visa Services is a part of Sweden Relocators AB, a professional relocation and immigration service
                provider. We offer expert consultation and document preparation assistance for visa applications. Our role
                is strictly limited to providing accurate guidance and assisting in the preparation of necessary documents
                based on the information you provide.
              </Typography>
              <Typography variant="body2" paragraph>
                We are an independent third-party service provider and are not affiliated with or endorsed by any
                government agency or official visa authority. You have the full right to apply for a visa directly through
                the respective official embassy or immigration website without using our services.
              </Typography>
              <Typography variant="body2" paragraph>
                Please note that while we utilize our experience and expertise to support your visa application, we do not
                and cannot guarantee the approval of any visa application. The final decision rests solely with the
                respective immigration authorities.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.termsAndConditionsChecked || false}
                    onChange={handleInputChange}
                    name="termsAndConditionsChecked"
                    required
                  />
                }
                label="I have read and agree to the above consent and the Terms and Conditions."
              />
            </Grid>
          </Grid>
        )
      default:
        return "Unknown step"
    }
  }
  
  