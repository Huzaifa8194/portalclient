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

  // Other category fields
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
  worth: z.string().optional(),
  completeDegreeStatus: z.string().optional(),
  jobContract: z.string().optional(),
  personNumber: z.string().optional(),
  startWork: z.string().optional(),
  workPermitIssuedDate: z.string().optional(),
  workPermitEndDate: z.string().optional(),
  currentJobinSweden: z.string().optional(),
  looseJob: z.string().optional(),
  noticeTermination: z.string().optional(),
  anotherJobOffer: z.string().optional(),
  selfEmployedStatus: z.string().optional(),
  moreDetail: z.string().optional(),
  accompanyFamily: z.string().optional(),
  yourDesignation: z.string().optional(),
})

function WorkPermitForm() {
  // Section management
  const sections = [
    { id: "personal", name: "Personal Details" },
    { id: "categories", name: "Work Permit Categories" },
    { id: "residence", name: "Residence and Work Permit" },
    { id: "family", name: "Family Application" },
  ]

  const [currentSection, setCurrentSection] = useState("personal")
  const [jobExperience, setJobExperience] = useState("")
  const [outsideSweden, setOutsideSweden] = useState("")
  const [workinSweden, setWorkinSweden] = useState("")
  const [sufficientSalary, setSufficientSalary] = useState("")
  const [appliedForVisa, setAppliedForVisa] = useState("")
  const [single, setSingleStatus] = useState("")
  const [permission, setPermissionStatus] = useState("")
  const [completeDegree, setCompleteDegree] = useState("")
  const [studyingSweden, setStudyingSweden] = useState("")
  const [workingSweden, setWorkingSweden] = useState("")
  const [firstPermit, setFirstPermit] = useState("")
  const [assetStatus, setAssetStatus] = useState("")
  const [AyslumWorkedInSweden, setAyslumWorkedInSweden] = useState("")

  const handleAyslumWorkedInSweden = (e) => {
    setAyslumWorkedInSweden(e.target.value)
  }
  const handleAssetStatus = (e) => {
    setAssetStatus(e.target.value)
  }
  const handleFirstPermit = (e) => {
    setFirstPermit(e.target.value)
  }
  const handleWorkingSweden = (e) => {
    setWorkingSweden(e.target.value)
  }
  const handleStudyingSweden = (e) => {
    setStudyingSweden(e.target.value)
  }
  const handleCompleteDegreeStatus = (e) => {
    setCompleteDegree(e.target.value)
  }
  const handlePermissionStatus = (e) => {
    setPermissionStatus(e.target.value)
  }
  const handleSingleStatus = (e) => {
    setSingleStatus(e.target.value)
  }
  const handleAppliedForVisa = (e) => {
    setAppliedForVisa(e.target.value)
  }
  const handleSufficientSalary = (e) => {
    setSufficientSalary(e.target.value)
  }
  const handleWorkinSweden = (e) => {
    setWorkinSweden(e.target.value)
  }
  const handleOutsideSwedenChange = (e) => {
    setOutsideSweden(e.target.value)
  }
  const handleJobExperienceChange = (e) => {
    setJobExperience(e.target.value)
  }

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      category: "",
      educationLevel: "",
      educationalCertificate: "",
      jobExperience: "",
      totalExperience: "",
      experienceCertificate: "",
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
      isSingle: "",
      ageBetween: "",
      healthInsurance: "",
      swedishLanguage: "",
      admissionCertificate: "",
      hostFamilyInvitation: "",
      studyHours: "",
      supportMoney: "",
      returnTicket: "",
      comprehensiveInsurance: "",
      asylumRefused: "",
      workPermission: "",
      workedFourMonths: "",
      negativeDecisionDate: "",
      permanentContract: "",
      degreeCompleted: "",
      jobOffer: "",
      currentlyWorking: "",
      designation: "",
      firstPermit: "",
      companyTwoYears: "",
      ictTransfer: "",
      EUcitizenship: "",
      permanentResidence: "",
      startBusiness: "",
      jobOfferSweden: "",
      assets: "",
      worth: "",
      completeDegreeStatus: "",
      jobContract: "",
      personNumber: "",
      startWork: "",
      workPermitIssuedDate: "",
      workPermitEndDate: "",
      currentJobinSweden: "",
      looseJob: "",
      noticeTermination: "",
      anotherJobOffer: "",
      selfEmployedStatus: "",
      moreDetail: "",
      accompanyFamily: "",
      yourDesignation: "",
    }),
    [],
  )

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange", // Enable real-time validation
  })

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    trigger,
  } = methods

  const category = watch("category")

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  })

  const getSectionTitle = (section) => sections.find((s) => s.id === section)?.name || ""

  const getFieldsForSection = (section) => {
    switch (section) {
      case "personal":
        return ["fullName", "email", "phone"]
      case "categories":
        return ["category"]
      case "residence":
        return ["outsideSweden"]
      case "family":
        return ["sufficientSavings"]
      default:
        return []
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

      {category === "WORK_PERMIT_OUTSIDE" && (
        <>
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
        </>
      )}
      {category === "AU_PAIR" && (
        <>
          <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
            AU Pair
          </Typography>
          <Field.Select
            name="isSingle"
            label="Are you single?"
            select
            native
            required
            value={single}
            onChange={handleSingleStatus}
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          {single === "no" && (
            <Field.Select
              name="accompanyFamily"
              label="Do you have any accompanying family members, like partner, children?"
              select
              sx={{ gridColumn: "1/-1" }}
              native
              required
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Choose an Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field.Select>
          )}
          <Field.Select
            name="ageBetween"
            label="Are you between 18 and 30 years?"
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
            name="healthInsurance"
            label="Do you have a Proof that you have signed or applied for a health insurance policy?"
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
            name="swedishLanguage"
            label="Are you able to show that you have a distinct interest in or use for Swedish language studies?"
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
            name="admissionCertificate"
            label="Do you have a certificate of admission/Offer Letter to the course of study concerned?"
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
            name="hostFamilyInvitation"
            label="Do you have a written invitation from your host family in Sweden stating the terms and Terms and Conditions of your employment as an Au-Pair?"
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
            name="studyHours"
            label="Will you Study for 15 hours a week or the time for housework and studies will not exceed 40 hours per week?"
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
        </>
      )}

      {category === "WORKING_HOLIDAYS" && (
        <>
          <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
            Working Holidays
          </Typography>
          <Field.Select
            name="isSingle"
            label="Are you single?"
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
            name="citizenship"
            label="Are you citizens of Argentina, Australia, Chile, Hong Kong, Canada, New Zealand, South Korea or Uruguay?"
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
            name="supportMoney"
            label="Do you have money so that you can support yourself during the first year in Sweden (at least 15000 SEK)?"
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
            name="returnTicket"
            label="Do you Have a return ticket or enough money to buy one?"
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
            name="comprehensiveInsurance"
            label="Do you have a comprehensive health insurance that applies to care in Sweden? (Does not apply to citizens of Australia)"
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
        </>
      )}

      {category === "ASYLUM_WORK_PERMIT" && (
        <>
          <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
            Ayslum Work Permit
          </Typography>
          <Field.Select
            name="workedInSweden"
            label="Did you already worked in Sweden before applying the asylum?"
            select
            value={AyslumWorkedInSweden}
            onChange={handleAyslumWorkedInSweden}
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          {AyslumWorkedInSweden === "no" && (
            <>
              <Field.Select
                name="asylumRefused"
                label="Did Your asylum case has been refused and you want to apply for work permit?"
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

              <Field.Select
                name="workPermission"
                label="Did you get the permission of work in Sweden?"
                select
                value={permission}
                onChange={handlePermissionStatus}
                native
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>
              {permission === "yes" && (
                <>
                  <Field.Text
                    name="negativeDecisionDate"
                    label="Date of Permission?"
                    type="date"
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}
              <Field.Select
                name="workedFourMonths"
                label="Did you work for 4 months after the permission?"
                select
                native
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Text
                name="negativeDecisionDate"
                label="When did you got the negative decision?"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
              />

              <Field.Select
                name="sameCompany"
                label="Are you still working in the same company for the last 4 months"
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
                name="permanentContract"
                label="Do you have permanent job contract?"
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
                name="minimumSalary"
                label="Is minimum offered salary more than 26560 SEK?"
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
                name="moreThanFiveEmployees"
                label="Does company have more than 5 employees?"
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
            </>
          )}
        </>
      )}

      {category === "STUDENT_WORK_PERMIT" && (
        <>
          <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
            Student Work Permit
          </Typography>
          <Field.Select
            name="studyingInSweden"
            label="Are you studying in Sweden and have gotten a job offer?"
            select
            value={studyingSweden}
            onChange={handleStudyingSweden}
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          {studyingSweden === "yes" && (
            <>
              <Field.Select
                name="degreeCompleted"
                label="Did you complete your Degree in Sweden?"
                select
                native
                value={completeDegree}
                onChange={handleCompleteDegreeStatus}
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              {completeDegree === "no" && (
                <>
                  <Field.Select
                    name="completeDegreeStatus"
                    label="Did you complete 30 Credits Hours?"
                    select
                    native
                    sx={{ gridColumn: "1/-1" }}
                    required
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">Choose an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field.Select>
                </>
              )}
              <Field.Select
                name="jobOffer"
                label="Did you get the job offer from the company where you are currently working?"
                select
                native
                sx={{ gridColumn: "1/-1" }}
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                name="minimumSalary"
                label="Did you get the job offer by a swedish company with minimum salary of 26560 SEK?"
                select
                native
                sx={{ gridColumn: "1/-1" }}
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                name="jobContract"
                label="Do you have permanent job contract?"
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

              <Field.Select
                name="personNumber"
                label="Do you have Personnummer or co-ordination number?"
                select
                native
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>
            </>
          )}

          <Field.Select
            name="inSweden"
            label="Are you currently working in Sweden?"
            select
            value={workingSweden}
            onChange={handleWorkingSweden}
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          {workingSweden === "yes" && (
            <>
              <Field.Text name="companyName" label="Company Name" required />
              <Field.Text name="yourDesignation" label="Your Designation" required />

              <Field.Text
                name="startWork"
                label="Date you start your work"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
              />
              <Field.Text
                name="workPermitIssuedDate"
                label="Work Permit Issued Date"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
              />
              <Field.Text
                name="workPermitEndDate"
                label="Work Permit Expiry Date"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}

          <Field.Select
            name="firstPermit"
            label="Is this your first work permit in Sweden?"
            select
            value={firstPermit}
            onChange={handleFirstPermit}
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          {firstPermit === "no" && (
            <>
              <Field.Select
                name="companyTwoYears"
                label="Did you work in the same company for first 2 years?"
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
                name="ictTransfer"
                label="Did you permit was ICT(Intra-Corporate Transfer)?"
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
                name="currentJobinSweden"
                label="Do you currently have job offer in Sweden?"
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
                name="looseJob"
                label="Did you already lose your job?"
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
                name="noticeTermination"
                label="Did you get the notice of termination?"
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
                name="anotherJobOffer"
                label="Do you currently have any other job offer?"
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
                name="selfEmployedStatus"
                label="Are you looking to switchto Self-Employed?"
                select
                native
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>
              <Field.Text
                name="moreDetail"
                label=" Provide us more Details here"
                required
                sx={{ gridColumn: "1/-1" }}
              />
            </>
          )}
        </>
      )}

      {category === "EU_LONG_TERM" && (
        <>
          <Typography variant="subtitle1" sx={{ gridColumn: "1/-1", mt: 2 }}>
            EU Long Term Visa
          </Typography>
          <Field.Select
            name="EUcitizenship"
            label="Citizenship"
            select
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="australia">Australia</option>
            <option value="other">Other</option>
          </Field.Select>

          <Field.Select
            name="permanentResidence"
            label="Do you have permanent Residence permit from below mentioned countries?"
            select
            native
            sx={{ gridColumn: "1/-1" }}
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="lithuania">Lithuania</option>
            <option value="other">Other</option>
          </Field.Select>

          <Field.Select
            name="startBusiness"
            label="Are you willing to start your own business in Sweden?"
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
            name="jobOfferSweden"
            label="Do you have job offer in Sweden?"
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
            name="assets"
            label="Do you have Assets/Saving?"
            select
            value={assetStatus}
            onChange={handleAssetStatus}
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          {assetStatus === "yes" && (
            <>
              <Field.Select
                name="worth"
                label="Worht of Asset?"
                select
                native
                required
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an Option</option>
                <option value="25-29">25000 To 29000 SEK</option>
                <option value="30-35">30000 To 35000 SEK</option>
              </Field.Select>
            </>
          )}
        </>
      )}
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
        InputLabelProps={{ shrink: true }}
        onChange={handleOutsideSwedenChange}
        value={outsideSweden}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {outsideSweden === "yes" && (
        <>
          <Field.Select
            name="citizenship"
            label="Citizenship"
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

          <Field.Text name="companyName" label="Company Name" required InputLabelProps={{ shrink: true }} />

          <Field.Text
            name="jobStartDate"
            label="Job Start Date"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />

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

          <Field.Text
            name="visaExpiryDate"
            label="Expiry Date"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />

          <Field.Select
            name="withFamily"
            label="Do you want to move along with your family?"
            select
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Text
            name="additionalInfo"
            label="You can provide us more details about your duration of stay in that country:"
            multiline
            rows={3}
            sx={{ gridColumn: "1/-1" }}
          />
        </>
      )}
      <Field.Select
        name="workinSweden"
        label="Did you work in Sweden before?"
        select
        native
        required
        onChange={handleWorkinSweden}
        value={workinSweden}
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>
      {workinSweden === "yes" && (
        <>
          <Field.Text name="companyName" label="Company Name" required InputLabelProps={{ shrink: true }} />

          <Field.Text
            name="jobStartDate"
            label="Job Start Date"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />

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

          <Field.Text
            name="visaExpiryDate"
            label="Expiry Date"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />

          <Field.Select
            name="withFamily"
            label="Do you want to move along with your family?"
            select
            native
            required
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Text
            name="additionalInfo"
            label="You can provide us more details about your duration of stay in that country:"
            multiline
            rows={3}
            sx={{ gridColumn: "1/-1" }}
          />
        </>
      )}
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
        name="sufficientSavings"
        label="Do you have savings or assets in case if your salary is lower than requirements?"
        select
        native
        required
        onChange={handleSufficientSalary}
        value={sufficientSalary}
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>
      {sufficientSalary === "yes" && (
        <>
          <FormControlLabel
            control={<Checkbox name="200k" />}
            label="200.000 SEK for applicant"
            sx={{ gridColumn: "1/-1" }}
          />
          <FormControlLabel
            control={<Checkbox name="100k" />}
            label="100.000 SEK for spouse"
            sx={{ gridColumn: "1/-1" }}
          />
          <FormControlLabel
            control={<Checkbox name="50k" />}
            label="50.000 SEK for each accompanying Child"
            sx={{ gridColumn: "1/-1" }}
          />
        </>
      )}
      <Field.Select
        name="applied"
        label="Have you applied any sort of Schengen visa or residence permit in past 2 years and got rejected?"
        select
        native
        onChange={handleAppliedForVisa}
        value={appliedForVisa}
        required
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1/-1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>
      {appliedForVisa === "yes" && (
        <>
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
        </>
      )}
    </Box>
  )

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "personal":
        return renderPersonalDetails()
      case "categories":
        return renderCategories()
      case "residence":
        return renderResidence()
      case "family":
        return renderFamily()
      default:
        return null
    }
  }

  const currentSectionIndex = sections.findIndex((section) => section.id === currentSection)
  const isFirstSection = currentSectionIndex === 0
  const isLastSection = currentSectionIndex === sections.length - 1

  const handleNext = async () => {
    const isValid = await isCurrentSectionValid()
    if (isValid && !isLastSection) {
      setCurrentSection(sections[currentSectionIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSection(sections[currentSectionIndex - 1].id)
    }
  }

  const isCurrentSectionValid = async () => {
    let fieldsToValidate = []

    switch (currentSection) {
      case "personal":
        fieldsToValidate = ["fullName", "email", "phone"]
        break
      case "categories":
        fieldsToValidate = ["category"]
        if (category === "WORK_PERMIT_OUTSIDE") {
          fieldsToValidate.push("educationLevel", "educationalCertificate")
          if (jobExperience === "yes") {
            fieldsToValidate.push("totalExperience", "experienceCertificate")
          }
        }
        break
      case "residence":
        fieldsToValidate = ["outsideSweden"]
        if (outsideSweden === "yes") {
          fieldsToValidate.push("citizenship", "residence", "minimumSalary", "moreThanFiveEmployees", "validInsurance")
        }
        break
      case "family":
        fieldsToValidate = ["sufficientSavings"]
        if (appliedForVisa === "yes") {
          fieldsToValidate.push("country", "DateApp")
        }
        break
      default:
        break
    }

    const result = await trigger(fieldsToValidate)
    return result
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            {/* Progress Bar */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  mb: 2,
                }}
              >
                {sections.map((section, index) => {
                  const isActive = sections.findIndex((s) => s.id === currentSection) >= index
                  return (
                    <React.Fragment key={section.id}>
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isActive ? "#00A76F" : "#919EAB",
                            color: "#fff",
                            fontWeight: "bold",
                            zIndex: 1,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: isActive ? "#00A76F" : "#919EAB",
                            textAlign: "center",
                          }}
                        >
                          {section.name}
                        </Typography>
                      </Box>
                      {index < sections.length - 1 && (
                        <Box
                          sx={{
                            position: "relative",
                            flex: 1,
                            height: 2,
                            backgroundColor: "#919EAB",
                            alignSelf: "start",
                            mt: 2.5,
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                              width: isActive ? "100%" : "0%",
                              backgroundColor: "#00A76F",
                              transition: "width 0.3s ease",
                            },
                          }}
                        />
                      )}
                    </React.Fragment>
                  )
                })}
              </Box>
            </Box>

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
                {!isLastSection ? (
                  <LoadingButton
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                    disabled={Object.keys(errors).some((key) => {
                      const fieldsInCurrentSection = getFieldsForSection(currentSection)
                      return fieldsInCurrentSection.includes(key)
                    })}
                  >
                    Next
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={Object.keys(errors).length > 0}
                  >
                    Submit
                  </LoadingButton>
                )}
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

export default WorkPermitForm

