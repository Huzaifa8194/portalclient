import React, { useMemo, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import { Form, Field } from "src/components/hook-form"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

// Schema definition with all fields
const FormSchema = z.object({
  // Personal Details
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),

  // Work Permit Categories & Educational Background
  category: z.string().min(1, { message: "Category is required" }),
  educationLevel: z.string().optional(),
  educationalCertificate: z.string().optional(),

  // Work Experience
  jobExperience: z.string().optional(),
  totalExperience: z.string().optional(),
  experienceCertificate: z.string().optional(),
  outsideSweden: z.string().optional(),
  citizenship: z.string().optional(),
  residence: z.string().optional(),
  sameCompany: z.string().optional(),
  workinSweden: z.string().optional(),

  // Residence and Work Permit
  minimumSalary: z.string().optional(),
  moreThanFiveEmployees: z.string().optional(),
  validInsurance: z.string().optional(),
  companyName: z.string().optional(),
  jobStartDate: z.string().optional(),
  jobEndDate: z.string().optional(),
  schengenVisa: z.string().optional(),
  issueCountry: z.string().optional(),
  visaType: z.string().optional(),
  visaExpiryDate: z.string().optional(),
  additionalInfo: z.string().optional(),

  // Family Application
  moveWithFamily: z.string().optional(),
  sufficientSavings: z.string().optional(),
  applied: z.string().optional(),
  country: z.string().optional(),
  DateApp: z.string().optional(),
  rejection: z.string().optional(),
  "200k": z.boolean().optional(),
  "100k": z.boolean().optional(),
  "50k": z.boolean().optional(),

  // Other category fields (preserved from original)
  workedInSweden: z.string().optional(),
  studyingInSweden: z.string().optional(),
  isSingle: z.string().optional(),
  ageBetween: z.string().optional(),
  healthInsurance: z.string().optional(),
  swedishLanguage: z.string().optional(),
  admissionCertificate: z.string().optional(),
  hostFamilyInvitation: z.string().optional(),
  studyHours: z.string().optional(),
  supportMoney: z.string().optional(),
  returnTicket: z.string().optional(),
  comprehensiveInsurance: z.string().optional(),
  asylumRefused: z.string().optional(),
  workPermission: z.string().optional(),
  workedFourMonths: z.string().optional(),
  negativeDecisionDate: z.string().optional(),
  permanentContract: z.string().optional(),
  degreeCompleted: z.string().optional(),
  jobOffer: z.string().optional(),
  currentlyWorking: z.string().optional(),
  firstPermit: z.string().optional(),
  companyTwoYears: z.string().optional(),
  ictTransfer: z.string().optional(),
  switchToSelfEmployed: z.string().optional(),
  additionalDetails: z.string().optional(),
  EUcitizenship: z.string().optional(),
  permanentResidence: z.string().optional(),
  startBusiness: z.string().optional(),
  jobOfferSweden: z.string().optional(),
  assets: z.string().optional(),
})

export default function WorkPermitForm() {
  // Section management
  const sections = ["personal", "categories", "residence", "family"]

  const [currentSection, setCurrentSection] = useState("personal")
  const [jobExperience, setJobExperience] = useState("")

  const handleJobExperienceChange = (e) => {
    setJobExperience(e.target.value)
  }

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      workedInSweden: "",
      studyingInSweden: "",
      minimumSalary: "",
      moreThanFiveEmployees: "",
      validInsurance: "",
      companyName: "",
      jobStartDate: "",
      jobEndDate: "",
      schengenVisa: "",
      issueCountry: "",
      visaType: "",
      visaExpiryDate: "",
      moveWithFamily: "",
      sufficientSavings: "",
      outsideSweden: "",
      citizenship: "",
      residence: "",
      sameCompany: "",
      workinSweden: "",
      additionalInfo: "",
      applied: "",
      country: "",
      DateApp: "",
      rejection: "",
      "200k": false,
      "100k": false,
      "50k": false,
    }),
    [],
  )

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods

  const category = watch("category")
  const workedInSweden = watch("workedInSweden")
  const studyingInSweden = watch("studyingInSweden")

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  })

  const getSectionTitle = (section) => {
    switch (section) {
      case "personal":
        return "Personal Details"
      case "categories":
        return "Work Permit Categories"
      case "experience":
        return "Work Experience in your field"
      case "residence":
        return "Residence and Work Permit"
      case "family":
        return "Are You Applying for your family?"
      default:
        return ""
    }
  }

  const renderPersonalDetails = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >
      <Field.Text name="fullName" label="Full Name" required />
      <Field.Text name="email" label="Email" required />
      <Field.Text name="phone" label="Phone Number" required />
      <Field.Text name="address" label="Address" required />
    </Box>
  )

  const renderCategories = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >
      <Field.Select
        name="category"
        label="Choose Category"
        select
        native
        required
        sx={{ gridColumn: "1/-1" }}
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Select a category</option>
        <option value="WORK_PERMIT_OUTSIDE">Work Permit Outside Of Sweden</option>
        <option value="AU_PAIR">Au Pair</option>
        <option value="WORKING_HOLIDAYS">Working Holidays</option>
        <option value="ASYLUM_WORK_PERMIT">Asylum - Work Permit</option>
        <option value="STUDENT_WORK_PERMIT">Student - Work Permit</option>
        <option value="EU_LONG_TERM">EU Long Term Residence</option>
      </Field.Select>

      <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
        Educational Background
      </Typography>

      <Field.Select
        name="educationLevel"
        label="Education Level"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="bachelor">Bachelors Degree</option>
        <option value="master">Masters Degree</option>
        <option value="phd">PhD</option>
      </Field.Select>

      <Field.Select
        name="educationalCertificate"
        label="Educational Certificate available"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>


      <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
      Work Experience in your field
      </Typography>
      <Field.Select
        value={jobExperience}
        onChange={handleJobExperienceChange}
        name="jobExperience"
        label="Did you have a job experience?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {jobExperience === "yes" && (
        <Field.Select
          name="totalExperience"
          label="Total Experience"
          select
          native
          required
          InputLabelProps={{ shrink: true }}
        >
          <option value="">Choose an Option</option>
          <option value="1-2">1-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </Field.Select>
      )}

      <Field.Select
        name="experienceCertificate"
        label="Experience Certificate available"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>
    </Box>
  )

  const renderExperience = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >

      <Field.Select
        name="outsideSweden"
        label="Are you outside of Sweden?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select name="citizenship" label="Citizenship" select native required InputLabelProps={{ shrink: true }}>
        <option value="">Choose an Option</option>
        <option value="uae">UAE</option>
        <option value="USA">USA</option>
      </Field.Select>

      <Field.Select
        name="residence"
        label="Country of Residence"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="uae">UAE</option>
        <option value="USA">USA</option>
      </Field.Select>

      <Field.Select
        name="sameCompany"
        label="Are you working for the same company branch office in your country of residence?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select
        name="workinSweden"
        label="Did you work in Sweden before?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>
    </Box>
  )

  const renderResidence = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >
      <Field.Select
        name="outsideSweden"
        label="Are you outside of Sweden?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>


      <Field.Select
        name="minimumSalary"
        label="Did you get the job offer by a swedish company with minimum salary of 27550 SEK?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select
        name="moreThanFiveEmployees"
        label="Did your company have more than 5 employees?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select
        name="validInsurance"
        label="Did your company have valid insurance for employees?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Text name="companyName" label="Company Name" required InputLabelProps={{ shrink: true }} />

      <Field.Text name="jobStartDate" label="Job Start Date" type="date" required InputLabelProps={{ shrink: true }} />

      <Field.Text name="jobEndDate" label="Job End Date" type="date" required InputLabelProps={{ shrink: true }} />

      <Field.Select
        name="schengenVisa"
        label="Do you currently have any Schengen visa or any kind of residence permit of any Schengen states?"
        select
        native
        required
        sx={{ gridColumn: "1/-1" }}
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Text name="issueCountry" label="Issue Country" required InputLabelProps={{ shrink: true }} />

      <Field.Text name="visaType" label="Type of Visa/Permit" required InputLabelProps={{ shrink: true }} />

      <Field.Text name="visaExpiryDate" label="Expiry Date" type="date" required InputLabelProps={{ shrink: true }} />

      <Field.Text
        name="additionalInfo"
        label="You can provide us more details about your duration of stay in that country:"
        multiline
        rows={3}
        sx={{ gridColumn: "1/-1" }}
      />
    </Box>
  )

  const renderFamily = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >
      <Field.Select
        name="moveWithFamily"
        label="Do you want to move along with your family?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select
        name="sufficientSavings"
        label="Do you have savings or assets in case if your salary is lower than requirements?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <FormControlLabel
        control={<Checkbox name="200k" />}
        label="200.000 SEK for applicant"
        sx={{ gridColumn: "1/-1" }}
      />
      <FormControlLabel control={<Checkbox name="100k" />} label="100.000 SEK for spouse" sx={{ gridColumn: "1/-1" }} />
      <FormControlLabel
        control={<Checkbox name="50k" />}
        label="50.000 SEK for each accompanying Child"
        sx={{ gridColumn: "1/-1" }}
      />

      <Field.Select
        name="applied"
        label="Have you applied any sort of Schengen visa or residence permit in past 2 years and got rejected?"
        select
        native
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select name="country" label="Country" select native required InputLabelProps={{ shrink: true }}>
        <option value="">Country</option>
        <option value="uae">UAE</option>
        <option value="USA">USA</option>
      </Field.Select>

      <Field.Text
        name="DateApp"
        label="Mon/Year of Application"
        type="date"
        required
        InputLabelProps={{ shrink: true }}
      />

      <Field.Text name="rejection" label="Reason for rejection" multiline rows={3} sx={{ gridColumn: "1/-1" }} />
    </Box>
  )

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "personal":
        return renderPersonalDetails()
      case "categories":
        return renderCategories()
      case "experience":
        return renderExperience()
      case "residence":
        return renderResidence()
      case "family":
        return renderFamily()
      default:
        return null
    }
  }

  const currentSectionIndex = sections.indexOf(currentSection)
  const isFirstSection = currentSectionIndex === 0
  const isLastSection = currentSectionIndex === sections.length - 1

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentSection(sections[currentSectionIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSection(sections[currentSectionIndex - 1])
    }
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {getSectionTitle(currentSection)}
            </Typography>

            {renderCurrentSection()}

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {!isFirstSection && (
                  <LoadingButton variant="outlined" onClick={handlePrevious}>
                    Previous
                  </LoadingButton>
                )}
                <LoadingButton
                  type={isLastSection ? "submit" : "button"}
                  variant="contained"
                  loading={isSubmitting}
                  onClick={isLastSection ? undefined : handleNext}
                >
                  {isLastSection ? "Submit" : "Next"}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

