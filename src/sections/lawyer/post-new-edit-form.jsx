import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"

// Styled components for the custom stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[300],
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: "#fff",
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: theme.palette.success.main,
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.main,
  }),
}))

function CustomStepIcon({ active, completed, className, icon }) {
  return (
    <CustomStepIconRoot ownerState={{ active, completed }} className={className}>
      {icon}
    </CustomStepIconRoot>
  )
}

const steps = [
  "Personal Information",
  "Citizenship, Residency & Legal Assistance",
  "Case Details & Communication",
  "Supporting Documents & Additional Information",
  "Declaration",
]

// ----------------------------------------------------------------------

const LegalAssistanceSchema = zod
  .object({
    fullName: zod.string().min(1, { message: "Full Name is required!" }),
    dateOfBirth: zod.string().min(1, { message: "Date of Birth is required!" }),
    gender: zod.string().min(1, { message: "Gender is required!" }),
    genderOther: zod.string().optional(),
    phoneNumber: zod.string().min(1, { message: "Phone Number is required!" }),
    emailAddress: zod.string().email({ message: "Invalid email address" }),
    currentAddress: zod.string().min(1, { message: "Current Address is required!" }),
    citizenship: zod.string().min(1, { message: "Citizenship is required!" }),
    citizenshipOther: zod.string().optional(),
    residencyStatus: zod.string().min(1, { message: "Residency Status is required!" }),
    residencyStatusOther: zod.string().optional(),
    preferredContact: zod.string().min(1, { message: "Preferred Contact Method is required!" }),
    legalAssistanceType: zod.string().min(1, { message: "Type of Legal Assistance is required!" }),
    lawyerType: zod
      .array(zod.union([zod.string(), zod.object({ value: zod.string(), label: zod.string() })]))
      .nonempty({ message: "At least one Lawyer Type is required!" }),
    lawyerTypeOther: zod.string().optional(),
    legalIssueDescription: zod.string().min(1, { message: "Legal Issue Description is required!" }),
    desiredOutcome: zod.string().min(1, { message: "Desired Outcome is required!" }),
    firstTimeLegalAssistance: zod.string().min(1, { message: "First Time Legal Assistance is required!" }),
    caseStatus: zod.string().min(1, { message: "Case Status is required!" }),
    appealingDecision: zod.string().min(1, { message: "Appealing Decision is required!" }),
    appealAuthority: zod.string().optional(),
    appealDeadline: zod.string().optional(),
    takeOverCase: zod.string().min(1, { message: "Take Over Case is required!" }),
    publicFundsAdvice: zod.string().min(1, { message: "Public Funds Advice is required!" }),
    publicFundsDetails: zod.string().optional(),
    urgentAssistance: zod.string().min(1, { message: "Urgent Assistance is required!" }),
    urgentAssistanceReason: zod.string().optional(),
    nativeLanguage: zod.string().min(1, { message: "Native Language is required!" }),
    nativeLanguageOther: zod.string().optional(),
    preferredLanguages: zod
      .array(zod.union([zod.string(), zod.object({ value: zod.string(), label: zod.string() })]))
      .min(1, { message: "At least one Preferred Language is required!" }),
    preferredLanguagesOther: zod.string().optional(),
    preferredConsultation: zod.string().min(1, { message: "Preferred Consultation Method is required!" }),
    bankIdAccess: zod.string().min(1, { message: "BankID/MittID Access is required!" }),
    relevantDocuments: zod.string().min(1, { message: "Relevant Documents is required!" }),
    documentTypes: zod.array(zod.string()).optional(),
    documentTypesOther: zod.string().optional(),
    referralSource: zod.string().min(1, { message: "Referral Source is required!" }),
    referralSourceOther: zod.string().optional(),
    additionalInformation: zod.string().optional(),
    termsAgreement: zod.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
    dataProcessingConsent: zod
      .boolean()
      .refine((val) => val === true, { message: "You must consent to data processing" }),
  })
  .refine(
    (data) => {
      if (data.relevantDocuments === "yes") {
        return data.documentTypes && data.documentTypes.length > 0
      }
      return true
    },
    {
      message: "Please select at least one document type",
      path: ["documentTypes"],
    },
  )

// ----------------------------------------------------------------------

export function PostNewEditForm() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      genderOther: "",
      phoneNumber: "",
      emailAddress: "",
      currentAddress: "",
      citizenship: "",
      citizenshipOther: "",
      residencyStatus: "",
      residencyStatusOther: "",
      preferredContact: "",
      legalAssistanceType: "",
      lawyerType: [],
      lawyerTypeOther: "",
      legalIssueDescription: "",
      desiredOutcome: "",
      firstTimeLegalAssistance: "",
      caseStatus: "",
      appealingDecision: "",
      appealAuthority: "",
      appealDeadline: "",
      takeOverCase: "",
      publicFundsAdvice: "",
      publicFundsDetails: "",
      urgentAssistance: "",
      urgentAssistanceReason: "",
      nativeLanguage: "",
      nativeLanguageOther: "",
      preferredLanguages: [],
      preferredLanguagesOther: "",
      preferredConsultation: "",
      bankIdAccess: "",
      relevantDocuments: "",
      documentTypes: [],
      documentTypesOther: "",
      referralSource: "",
      referralSourceOther: "",
      additionalInformation: "",
      termsAgreement: false,
      dataProcessingConsent: false,
    }),
    [],
  )

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(LegalAssistanceSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = methods

  const isStepValid = async (step) => {
    let fieldsToValidate = []
    switch (step) {
      case 0: {
        fieldsToValidate = ["fullName", "dateOfBirth", "gender", "phoneNumber", "emailAddress", "currentAddress"]
        break
      }
      case 1: {
        fieldsToValidate = [
          "citizenship",
          "residencyStatus",
          "preferredContact",
          "legalAssistanceType",
          "lawyerType",
          "legalIssueDescription",
          "desiredOutcome",
        ]
        break
      }
      case 2: {
        fieldsToValidate = [
          "firstTimeLegalAssistance",
          "caseStatus",
          "appealingDecision",
          "takeOverCase",
          "publicFundsAdvice",
          "urgentAssistance",
          "nativeLanguage",
          "preferredLanguages",
          "preferredConsultation",
          "bankIdAccess",
        ]
        break
      }
      case 3: {
        fieldsToValidate = ["relevantDocuments", "referralSource", "additionalInformation"]
        if (methods.watch("relevantDocuments") === "yes") {
          fieldsToValidate.push("documentTypes")
        }
        break
      }
      case 4: {
        fieldsToValidate = ["termsAgreement", "dataProcessingConsent"]
        break
      }
      default:
        return false
    }

    const result = await trigger(fieldsToValidate)
    console.log(`Step ${step} validation result:`, result)
    console.log(`Fields validated:`, fieldsToValidate)
    console.log(`Current form values:`, methods.getValues(fieldsToValidate))
    console.log(`Form errors:`, methods.formState.errors)
    return result
  }

  const handleNext = async () => {
    console.log("Current step:", activeStep)
    const isValid = await isStepValid(activeStep)
    console.log("Step validation result:", isValid)
    console.log("Current form values:", methods.getValues())
    console.log("Form errors:", methods.formState.errors)
    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1)
    } else {
      console.log("Validation failed. Current errors:", methods.formState.errors)
      // Optionally, you can add a toast or alert here to inform the user about the validation failure
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      toast.success("Form submitted successfully!")
      router.push(paths.dashboard.root)
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  })

  const watchGender = watch("gender")
  const watchCitizenship = watch("citizenship")
  const watchResidencyStatus = watch("residencyStatus")
  const watchAppealingDecision = watch("appealingDecision")
  const watchPublicFundsAdvice = watch("publicFundsAdvice")
  const watchUrgentAssistance = watch("urgentAssistance")
  const watchNativeLanguage = watch("nativeLanguage")
  const watchReferralSource = watch("referralSource")

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  const citizenshipOptions = [
    { value: "sweden", label: "Sweden" },
    { value: "denmark", label: "Denmark" },
    { value: "eu", label: "EU Country" },
    { value: "non-eu", label: "Non-EU Country" },
  ]

  const residencyStatusOptions = [
    { value: "citizen", label: "Citizen" },
    { value: "permanent", label: "Permanent Resident" },
    { value: "temporary", label: "Temporary Resident" },
    { value: "asylum", label: "Asylum Seeker" },
    { value: "visa", label: "Visa Holder" },
    { value: "other", label: "Other" },
  ]

  const contactMethodOptions = [
    { value: "phone", label: "Phone Call" },
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS/WhatsApp" },
  ]

  const legalAssistanceTypeOptions = [
    { value: "lawyer", label: "A Licensed Lawyer" },
    { value: "immigration", label: "An Immigration Expert" },
    { value: "consultant", label: "A Legal Consultant" },
    { value: "paralegal", label: "A Jurist/Paralegal" },
    { value: "unsure", label: "Not Sure (Need Guidance)" },
  ]

  const lawyerTypeOptions = [
    { value: "personal-injury", label: "Personal Injury Lawyer" },
    { value: "estate-planning", label: "Estate Planning Lawyer" },
    { value: "bankruptcy", label: "Bankruptcy Lawyer" },
    { value: "intellectual-property", label: "Intellectual Property Lawyer" },
    { value: "employment", label: "Employment Lawyer" },
    { value: "corporate", label: "Corporate/Business Lawyer" },
    { value: "immigration", label: "Immigration Lawyer" },
    { value: "criminal-defense", label: "Criminal Defense Lawyer" },
    { value: "medical-malpractice", label: "Medical Malpractice Lawyer" },
    { value: "tax", label: "Tax Lawyer" },
    { value: "tax", label: "Tax Lawyer" },
    { value: "family", label: "Family/Divorce Lawyer" },
    { value: "workers-comp", label: "Worker's Compensation Lawyer" },
    { value: "contract", label: "Contract Lawyer" },
    { value: "social-security", label: "Social Security Disability Lawyer" },
    { value: "civil-litigation", label: "Civil Litigation Lawyer" },
    { value: "general-practice", label: "General Practice Lawyer" },
    { value: "eu-international", label: "EU/International Law Lawyer" },
    { value: "humanitarian", label: "Humanitarian/Asylum Lawyer" },
    { value: "paralegal", label: "Jurist/Paralegal Services" },
    { value: "other", label: "Other" },
  ]

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]

  const caseStatusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "new", label: "New Case" },
  ]

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "swedish", label: "Swedish" },
    { value: "danish", label: "Danish" },
    { value: "arabic", label: "Arabic" },
    { value: "urdu", label: "Urdu" },
    { value: "hindi", label: "Hindi" },
    { value: "punjabi", label: "Punjabi" },
    { value: "other", label: "Other" },
  ]

  const consultationMethodOptions = [
    { value: "online", label: "Online via Portal/Mobile App" },
    { value: "physical", label: "Physical Meeting at Our Office" },
    { value: "call", label: "Telephone/Video Call" },
    { value: "combination", label: "Combination of Online and In-Person" },
  ]

  const documentTypeOptions = [
    { value: "id", label: "ID/Passport Copy" },
    { value: "residency", label: "Residency Permit" },
    { value: "legal", label: "Previous Legal Documents" },
    { value: "court", label: "Court/Authority Decision Letters" },
    { value: "contracts", label: "Contracts/Agreements" },
    { value: "other", label: "Other" },
  ]

  const referralSourceOptions = [
    { value: "website", label: "Website" },
    { value: "social", label: "Social Media" },
    { value: "referral", label: "Referral" },
    { value: "ad", label: "Advertisement" },
    { value: "other", label: "Other" },
  ]

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
            sx={{
              "& .MuiFormControl-root": { width: "100%" },
              "& .MuiInputBase-root": { minHeight: "56px" },
              "& .full-width": { gridColumn: "1 / -1" },
            }}
          >
            <Field.Text name="fullName" label="Full Name (as per official identification)" />
            <Field.Text name="dateOfBirth" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} />
            <Field.Select native name="gender" label="Gender" InputLabelProps={{ shrink: true }}>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchGender === "other" && <Field.Text name="genderOther" label="Specify Gender" />}
            <Field.Text name="phoneNumber" label="Phone Number (Include country code)" />
            <Field.Text name="emailAddress" label="Email Address" />
            <Field.Text name="currentAddress" label="Current Residential Address" className="full-width" />
          </Box>
        )
      case 1:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
            sx={{
              "& .MuiFormControl-root": { width: "100%" },
              "& .MuiInputBase-root": { minHeight: "56px" },
              "& .full-width": { gridColumn: "1 / -1" },
            }}
          >
            <Field.Select native name="citizenship" label="Citizenship" InputLabelProps={{ shrink: true }}>
              {citizenshipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchCitizenship === "non-eu" && <Field.Text name="citizenshipOther" label="Specify Non-EU Country" />}
            <Field.Select
              native
              name="residencyStatus"
              label="Current Residency Status in Sweden/Denmark"
              InputLabelProps={{ shrink: true }}
            >
              {residencyStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchResidencyStatus === "other" && (
              <Field.Text name="residencyStatusOther" label="Specify Residency Status" />
            )}
            <Field.Select
              native
              name="preferredContact"
              label="Preferred Method of Contact"
              InputLabelProps={{ shrink: true }}
            >
              {contactMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="legalAssistanceType"
              label="Are you specifically looking for"
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select an option</option>
              {legalAssistanceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {methods.formState.errors.legalAssistanceType && (
              <Typography color="error" variant="caption">
                {methods.formState.errors.legalAssistanceType.message}
              </Typography>
            )}
            <Field.Autocomplete
              name="lawyerType"
              label="Select the Type of Lawyer/Legal Service You Need"
              placeholder="Select all that apply"
              multiple
              options={lawyerTypeOptions}
              getOptionLabel={(option) => {
                if (typeof option === "string") return option
                return option.label || ""
              }}
              isOptionEqualToValue={(option, value) => {
                if (typeof value === "string") return option.value === value
                return option.value === value.value
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />
            {methods.formState.errors.lawyerType && (
              <Typography color="error" variant="caption">
                {methods.formState.errors.lawyerType.message}
              </Typography>
            )}
            {methods.watch("lawyerType").some((type) => (typeof type === "string" ? type : type.value) === "other") && (
              <Field.Text name="lawyerTypeOther" label="Specify Other Lawyer Type" />
            )}
            <Field.Text
              name="legalIssueDescription"
              label="Briefly Describe Your Legal Issue"
              multiline
              rows={3}
              className="full-width"
            />
            <Field.Text
              name="desiredOutcome"
              label="What Is Your Desired Outcome/Resolution?"
              multiline
              rows={3}
              className="full-width"
            />
          </Box>
        )
      case 2:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
            sx={{
              "& .MuiFormControl-root": { width: "100%" },
              "& .MuiInputBase-root": { minHeight: "56px" },
              "& .full-width": { gridColumn: "1 / -1" },
            }}
          >
            <Field.Select
              native
              name="firstTimeLegalAssistance"
              label="Is This Your First-Time Seeking Legal Assistance?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="caseStatus"
              label="Is Your Case Ongoing or New?"
              InputLabelProps={{ shrink: true }}
            >
              {caseStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="appealingDecision"
              label="Are You Appealing a Decision from Authorities?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchAppealingDecision === "yes" && (
              <>
                <Field.Text name="appealAuthority" label="Specify the authority" />
                <Field.Text
                  name="appealDeadline"
                  label="Deadline for Appeal"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </>
            )}
            <Field.Select
              native
              name="takeOverCase"
              label="Do You Want a Lawyer to Take Over an Ongoing Case?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="publicFundsAdvice"
              label="Has Any Authority Advised You to Choose a Lawyer on Public Funds?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchPublicFundsAdvice === "yes" && (
              <Field.Text name="publicFundsDetails" label="Specify the authority and case number" />
            )}
            <Field.Select
              native
              name="urgentAssistance"
              label="Do You Need Urgent Legal Assistance?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchUrgentAssistance === "yes" && (
              <Field.Text name="urgentAssistanceReason" label="Specify reason for urgent assistance" />
            )}
            <Field.Select
              native
              name="nativeLanguage"
              label="What Is Your Native Language?"
              InputLabelProps={{ shrink: true }}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchNativeLanguage === "other" && (
              <Field.Text name="nativeLanguageOther" label="Specify Native Language" />
            )}
            <Field.Autocomplete
              name="preferredLanguages"
              label="Preferred Language for Communication"
              placeholder="Select all that apply"
              multiple
              options={languageOptions}
              getOptionLabel={(option) => {
                if (typeof option === "string") return option
                return option.label || ""
              }}
              isOptionEqualToValue={(option, value) => {
                if (typeof value === "string") return option.value === value
                return option.value === value.value
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />
            {methods.formState.errors.preferredLanguages && (
              <Typography color="error" variant="caption">
                {methods.formState.errors.preferredLanguages.message}
              </Typography>
            )}
            {methods
              .watch("preferredLanguages")
              .some((lang) => (typeof lang === "string" ? lang : lang.value) === "other") && (
              <Field.Text name="preferredLanguagesOther" label="Specify Other Preferred Language" />
            )}
            <Field.Select
              native
              name="preferredConsultation"
              label="Preferred Consultation Method"
              InputLabelProps={{ shrink: true }}
            >
              {consultationMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            <Field.Select
              native
              name="bankIdAccess"
              label="Do You Have Access to BankID/MittID for Secure Online Access?"
              InputLabelProps={{ shrink: true }}
            >
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
          </Box>
        )
      case 3:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
            sx={{
              "& .MuiFormControl-root": { width: "100%" },
              "& .MuiInputBase-root": { minHeight: "56px" },
              "& .full-width": { gridColumn: "1 / -1" },
            }}
          >
            <Field.Select
              native
              name="relevantDocuments"
              label="Do You Have Documents Relevant to Your Case?"
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select an option</option>
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {methods.watch("relevantDocuments") === "yes" && (
              <>
                <Field.Autocomplete
                  name="documentTypes"
                  label="Select the Types of Documents You Have"
                  placeholder="Select all that apply"
                  multiple
                  options={documentTypeOptions}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value || option.value === value}
                />
                {methods.formState.errors.documentTypes && (
                  <Typography color="error" variant="caption" sx={{ gridColumn: "1 / -1" }}>
                    {methods.formState.errors.documentTypes.message}
                  </Typography>
                )}
              </>
            )}
            {methods.watch("documentTypes")?.includes("other") && (
              <Field.Text name="documentTypesOther" label="Specify Other Document Type" />
            )}
            <Field.Select
              native
              name="referralSource"
              label="How Did You Hear About Our Legal Services?"
              InputLabelProps={{ shrink: true }}
            >
              {referralSourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
            {watchReferralSource === "other" && (
              <Field.Text name="referralSourceOther" label="Specify Other Referral Source" />
            )}
            <Field.Text
              name="additionalInformation"
              label="Additional Information or Special Requests"
              multiline
              rows={4}
              className="full-width"
            />
          </Box>
        )
      case 4:
        return (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
            sx={{
              "& .MuiFormControl-root": { width: "100%" },
              "& .MuiInputBase-root": { minHeight: "56px" },
              "& .full-width": { gridColumn: "1 / -1" },
            }}
          >
            <FormControlLabel
              control={<Checkbox name="termsAgreement" />}
              label="I confirm that all information provided above is accurate and complete."
              sx={{ gridColumn: "1 / -1" }}
            />
            <FormControlLabel
              control={<Checkbox name="dataProcessingConsent" />}
              label="I consent to the processing of my personal data for legal consultation purposes in compliance with GDPR."
              sx={{ gridColumn: "1 / -1" }}
            />
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Comprehensive Legal Assistance Request Form
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />} sx={{ mb: 4 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
              {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
              {activeStep === steps.length - 1 ? (
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Submit Form
                </LoadingButton>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

