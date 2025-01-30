import { useState } from "react"
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
}))

const steps = ["Personal Information", "Passport Details", "Contact & Travel", "Security & Dependents"]

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  // Add more countries as needed
]

export function OverviewCourseView() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    fromCountry: "",
    toCountry: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    birthCity: "",
    birthCountry: "",
    nationality: "",
    hasMultipleCitizenship: "no",
    additionalCitizenship: "",
    // Add more form fields as needed
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
          label="Middle Name"
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
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="nonBinary" control={<Radio />} label="Non-Binary" />
            <FormControlLabel value="preferNotToSay" control={<Radio />} label="Prefer not to say" />
          </RadioGroup>
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
        <FormControl fullWidth>
          <InputLabel>Country of Birth</InputLabel>
          <Select
            name="birthCountry"
            value={formData.birthCountry}
            onChange={handleInputChange}
            label="Country of Birth"
            required
          >
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

  const renderPassportDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Passport Details
        </Typography>
      </Grid>
      {/* Add passport detail fields */}
    </Grid>
  )

  const renderContactAndTravel = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Contact & Travel Information
        </Typography>
      </Grid>
      {/* Add contact and travel fields */}
    </Grid>
  )

  const renderSecurityAndDependents = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Security Questions & Dependents
        </Typography>
      </Grid>
      {/* Add security and dependent fields */}
    </Grid>
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfo()
      case 1:
        return renderPassportDetails()
      case 2:
        return renderContactAndTravel()
      case 3:
        return renderSecurityAndDependents()
      default:
        return "Unknown step"
    }
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>I am going to</InputLabel>
                <Select name="toCountry" value={formData.toCountry} onChange={handleInputChange} label="I am going to">
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          <StyledCard>
            <CardContent>
              <Box sx={{ width: "100%", mb: 4 }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
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

        <Grid item xs={12} md={3}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Important Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  From
                </Typography>
                <Typography>{formData.fromCountry || "Not selected"}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  To
                </Typography>
                <Typography>{formData.toCountry || "Not selected"}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Currency
                </Typography>
                <Typography>USD</Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  )
}

