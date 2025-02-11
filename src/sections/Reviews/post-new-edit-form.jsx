import { useState, useEffect, useMemo } from "react"
import { z as zod } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Grid from "@mui/material/Unstable_Grid2"
import { MenuItem, Stepper, Step, StepLabel, Box, Typography } from "@mui/material"

import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import CardHeader from "@mui/material/CardHeader"
import LoadingButton from "@mui/lab/LoadingButton"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"

import { useBoolean } from "src/hooks/use-boolean"

import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"

// ----------------------------------------------------------------------

const steps = [
  "Company Information",
  "Client Information",
  "Employee Information",
  "Employment Details",
  "Compensation Details",
  "Benefits Information",
  "Additional Information",
]

export const NewPostSchema = zod.object({
  // Company Information
  companyName: zod.string().min(1, { message: "Company Name is required!" }),
  companyRegistrationNumber: zod.string().min(1, { message: "Company Registration Number is required!" }),
  companyAddress: zod.string().min(1, { message: "Company Address is required!" }),
  companyEmail: zod.string().email({ message: "Invalid email format" }),
  companyPhone: zod.string().min(1, { message: "Company Phone Number is required!" }),
  industry: zod.string().min(1, { message: "Industry/Sector is required!" }),
  taxIdentificationNumber: zod.string().min(1, { message: "Tax Identification Number is required!" }),
  bankAccountDetails: zod.string().min(1, { message: "Bank Account Details are required!" }),
  authorizedSignatories: zod.string().min(1, { message: "Authorized Signatories are required!" }),

  // Client Information
  clientCompanyName: zod.string().min(1, { message: "Client Company Name is required!" }),
  clientEmail: zod.string().email({ message: "Invalid email format" }),
  clientPhone: zod.string().min(1, { message: "Client Phone Number is required!" }),
  clientAddress: zod.string().min(1, { message: "Client Address is required!" }),
  clientPointOfContact: zod.string().min(1, { message: "Client Point of Contact is required!" }),
  serviceAgreementDetails: zod.string().min(1, { message: "Service Agreement Details are required!" }),

  // Employee Information
  employeeName: zod.string().min(1, { message: "Employee Name is required!" }),
  employeeId: zod.string().min(1, { message: "Employee ID is required!" }),
  dateOfBirth: zod.string().min(1, { message: "Date of Birth is required!" }),
  nationality: zod.string().min(1, { message: "Nationality is required!" }),
  employeeAddress: zod.string().min(1, { message: "Employee Address is required!" }),
  employeeEmail: zod.string().email({ message: "Invalid email format" }),
  employeePhone: zod.string().min(1, { message: "Employee Phone Number is required!" }),
  socialSecurityNumber: zod.string().min(1, { message: "Social Security Number or National ID is required!" }),
  employeeBankDetails: zod.string().min(1, { message: "Employee Bank Details are required!" }),
  taxInformation: zod.string().min(1, { message: "Tax Information is required!" }),
  emergencyContact: zod.string().min(1, { message: "Emergency Contact Information is required!" }),

  // Employment Details
  jobTitle: zod.string().min(1, { message: "Job Title is required!" }),
  jobDescription: zod.string().min(1, { message: "Job Description is required!" }),
  department: zod.string().min(1, { message: "Department is required!" }),
  startDate: zod.string().min(1, { message: "Start Date is required!" }),
  employmentType: zod.string().min(1, { message: "Employment Type is required!" }),
  workLocation: zod.string().min(1, { message: "Work Location is required!" }),
  managerName: zod.string().min(1, { message: "Manager/Supervisor Name is required!" }),
  workSchedule: zod.string().min(1, { message: "Work Schedule is required!" }),
  employmentContract: zod.array(zod.any()).optional(),
  probationPeriod: zod.string().min(1, { message: "Probation Period Details are required!" }),

  // Compensation Details
  baseSalary: zod.string().min(1, { message: "Base Salary is required!" }),
  hourlyRate: zod.string().optional(),
  overtimeRate: zod.string().optional(),
  payFrequency: zod.string().min(1, { message: "Pay Frequency is required!" }),
  bonusesCommissions: zod.string().optional(),
  deductions: zod.string().min(1, { message: "Deductions information is required!" }),
  reimbursements: zod.string().optional(),

  // Benefits Information
  healthInsurance: zod.string().optional(),
  retirementPlans: zod.string().optional(),
  paidTimeOff: zod.string().min(1, { message: "Paid Time Off information is required!" }),
  otherBenefits: zod.string().optional(),
  employeeAssistancePrograms: zod.string().optional(),

  // Additional Information
  timeTracking: zod.string().optional(),
  leaveManagement: zod.string().optional(),
  performanceManagement: zod.string().optional(),
  trainingDevelopment: zod.string().optional(),
  complianceDocuments: zod.array(zod.any()).optional(),
})

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const [activeStep, setActiveStep] = useState(0)
  const router = useRouter()
  const preview = useBoolean()

  const defaultValues = useMemo(
    () => ({
      companyName: currentPost?.companyName || "",
      companyRegistrationNumber: currentPost?.companyRegistrationNumber || "",
      companyAddress: currentPost?.companyAddress || "",
      companyEmail: currentPost?.companyEmail || "",
      companyPhone: currentPost?.companyPhone || "",
      industry: currentPost?.industry || "",
      taxIdentificationNumber: currentPost?.taxIdentificationNumber || "",
      bankAccountDetails: currentPost?.bankAccountDetails || "",
      authorizedSignatories: currentPost?.authorizedSignatories || "",
      clientCompanyName: currentPost?.clientCompanyName || "",
      clientEmail: currentPost?.clientEmail || "",
      clientPhone: currentPost?.clientPhone || "",
      clientAddress: currentPost?.clientAddress || "",
      clientPointOfContact: currentPost?.clientPointOfContact || "",
      serviceAgreementDetails: currentPost?.serviceAgreementDetails || "",
      employeeName: currentPost?.employeeName || "",
      employeeId: currentPost?.employeeId || "",
      dateOfBirth: currentPost?.dateOfBirth || "",
      nationality: currentPost?.nationality || "",
      employeeAddress: currentPost?.employeeAddress || "",
      employeeEmail: currentPost?.employeeEmail || "",
      employeePhone: currentPost?.employeePhone || "",
      socialSecurityNumber: currentPost?.socialSecurityNumber || "",
      employeeBankDetails: currentPost?.employeeBankDetails || "",
      taxInformation: currentPost?.taxInformation || "",
      emergencyContact: currentPost?.emergencyContact || "",
      jobTitle: currentPost?.jobTitle || "",
      jobDescription: currentPost?.jobDescription || "",
      department: currentPost?.department || "",
      startDate: currentPost?.startDate || "",
      employmentType: currentPost?.employmentType || "",
      workLocation: currentPost?.workLocation || "",
      managerName: currentPost?.managerName || "",
      workSchedule: currentPost?.workSchedule || "",
      employmentContract: [],
      probationPeriod: currentPost?.probationPeriod || "",
      baseSalary: currentPost?.baseSalary || "",
      hourlyRate: currentPost?.hourlyRate || "",
      overtimeRate: currentPost?.overtimeRate || "",
      payFrequency: currentPost?.payFrequency || "",
      bonusesCommissions: currentPost?.bonusesCommissions || "",
      deductions: currentPost?.deductions || "",
      reimbursements: currentPost?.reimbursements || "",
      healthInsurance: currentPost?.healthInsurance || "",
      retirementPlans: currentPost?.retirementPlans || "",
      paidTimeOff: currentPost?.paidTimeOff || "",
      otherBenefits: currentPost?.otherBenefits || "",
      employeeAssistancePrograms: currentPost?.employeeAssistancePrograms || "",
      timeTracking: currentPost?.timeTracking || "",
      leaveManagement: currentPost?.leaveManagement || "",
      performanceManagement: currentPost?.performanceManagement || "",
      trainingDevelopment: currentPost?.trainingDevelopment || "",
      complianceDocuments: [],
    }),
    [currentPost],
  )

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = methods

  const values = watch()

  const {
    fields: employmentContractFields,
    append: appendEmploymentContract,
    remove: removeEmploymentContract,
  } = useFieldArray({
    control,
    name: "employmentContract",
  })

  const {
    fields: complianceDocumentsFields,
    append: appendComplianceDocument,
    remove: removeComplianceDocument,
  } = useFieldArray({
    control,
    name: "complianceDocuments",
  })

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues)
    }
  }, [currentPost, defaultValues, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      preview.onFalse()
      toast.success(currentPost ? "Update success!" : "Create success!")
      router.push(paths.dashboard.post.root)
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const isStepValid = () => {
    const currentStepFields = Object.keys(NewPostSchema.shape).filter((key) =>
      renderStepContent(activeStep).props.children.some((child) => child.props?.name === key),
    )
    return currentStepFields.every((field) => !errors[field])
  }

  const CustomFileUpload = ({ name, label }) => {
    const { fields, append, remove } =
      name === "employmentContract"
        ? { fields: employmentContractFields, append: appendEmploymentContract, remove: removeEmploymentContract }
        : { fields: complianceDocumentsFields, append: appendComplianceDocument, remove: removeComplianceDocument }

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files)
      files.forEach((file) => {
        append({ file })
      })
    }

    const handleRemoveFile = (index) => {
      remove(index)
    }

    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {label}
        </Typography>
        {fields.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  p: 1,
                  bgcolor: "background.neutral",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" sx={{ flexGrow: 1, mr: 2 }}>
                  {field.file.name}
                </Typography>
                <Button size="small" onClick={() => handleRemoveFile(index)} sx={{ minWidth: "auto", p: 0.5 }}>
                  X
                </Button>
              </Box>
            ))}
          </Box>
        )}
        <Button variant="outlined" component="label" fullWidth>
          Upload Files
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
            accept="*" // Allow all file types
          />
        </Button>
      </Box>
    )
  }

  const renderCompanyInformation = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Company Information" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Field.Text name="companyName" label="Company Name" />
          <Field.Text name="companyRegistrationNumber" label="Company Registration Number" />
        </Box>
        <Field.Text name="companyAddress" label="Address" multiline rows={3} />
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Field.Text name="companyEmail" label="Email" type="email" />
          <Field.Text name="companyPhone" label="Phone Number" />
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Field.Text name="industry" label="Industry/Sector" />
          <Field.Text name="taxIdentificationNumber" label="Tax Identification Number" />
        </Box>
        <Field.Text name="bankAccountDetails" label="Bank Account Details for Payroll Processing" multiline rows={3} />
        <Field.Text name="authorizedSignatories" label="Authorized Signatories" multiline rows={2} />
      </Stack>
    </Card>
  )

  const renderClientInformation = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Client Information" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="clientCompanyName" label="Client Company Name" />
        <Field.Text name="clientEmail" label="Client Email" type="email" />
        <Field.Text name="clientPhone" label="Client Phone Number" />
        <Field.Text name="clientAddress" label="Client Address" multiline rows={3} />
        <Field.Text name="clientPointOfContact" label="Client Point of Contact" />
        <Field.Text name="serviceAgreementDetails" label="Service Agreement Details" multiline rows={3} />
      </Stack>
    </Card>
  )

  const renderEmployeeInformation = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Employee Information" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Field.Text name="employeeName" label="Full Name" />
          <Field.Text name="employeeId" label="Employee ID" />
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Field.Text name="dateOfBirth" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} />
          <Field.Text name="nationality" label="Nationality" />
        </Box>
        <Field.Text name="employeeAddress" label="Address" multiline rows={3} />
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Field.Text name="employeeEmail" label="Email" type="email" />
          <Field.Text name="employeePhone" label="Phone Number" />
        </Box>
        <Field.Text name="socialSecurityNumber" label="Social Security Number or National ID" />
        <Field.Text name="employeeBankDetails" label="Bank Account Details for Salary Deposits" multiline rows={3} />
        <Field.Text name="taxInformation" label="Tax Information (Tax Code, Exemptions, etc.)" multiline rows={2} />
        <Field.Text name="emergencyContact" label="Emergency Contact Information" multiline rows={2} />
      </Stack>
    </Card>
  )

  const renderEmploymentDetails = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Employment Details" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="jobTitle" label="Job Title" />
        <Field.Text name="jobDescription" label="Job Description" multiline rows={3} />
        <Field.Text name="department" label="Department" />
        <Field.Text name="startDate" label="Start Date" type="date" InputLabelProps={{ shrink: true }} />
        <Field.Select name="employmentType" label="Employment Type">
          <MenuItem value="fullTime">Full-time</MenuItem>
          <MenuItem value="partTime">Part-time</MenuItem>
          <MenuItem value="contract">Contract</MenuItem>
        </Field.Select>
        <Field.Text name="workLocation" label="Work Location" />
        <Field.Text name="managerName" label="Manager/Supervisor Name" />
        <Field.Text name="workSchedule" label="Work Schedule (Hours per Week)" />
        <CustomFileUpload name="employmentContract" label="Employment Contract" />
        <Field.Text name="probationPeriod" label="Probation Period Details" multiline rows={2} />
      </Stack>
    </Card>
  )

  const renderCompensationDetails = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Compensation Details" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="baseSalary" label="Base Salary" />
        <Field.Text name="hourlyRate" label="Hourly Rate (if applicable)" />
        <Field.Text name="overtimeRate" label="Overtime Rate" />
        <Field.Select name="payFrequency" label="Pay Frequency">
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="biweekly">Bi-weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Field.Select>
        <Field.Text name="bonusesCommissions" label="Bonuses and Commissions" multiline rows={2} />
        <Field.Text name="deductions" label="Deductions (Taxes, Benefits, Other)" multiline rows={3} />
        <Field.Text name="reimbursements" label="Reimbursements (Expenses, Travel, etc.)" multiline rows={2} />
      </Stack>
    </Card>
  )

  const renderBenefitsInformation = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Benefits Information" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="healthInsurance" label="Health Insurance" multiline rows={2} />
        <Field.Text name="retirementPlans" label="Retirement Plans (Pension Contributions)" multiline rows={2} />
        <Field.Text name="paidTimeOff" label="Paid Time Off (Vacation, Sick Leave, Personal Days)" multiline rows={3} />
        <Field.Text
          name="otherBenefits"
          label="Other Benefits (e.g., Gym Membership, Transportation Allowance)"
          multiline
          rows={2}
        />
        <Field.Text name="employeeAssistancePrograms" label="Employee Assistance Programs (EAP)" multiline rows={2} />
      </Stack>
    </Card>
  )

  const renderAdditionalInformation = (
    <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none", "& .MuiCardHeader-root": { p: 2 } }}>
      <CardHeader title="Additional Information" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="timeTracking" label="Time Tracking Method" />
        <Field.Text name="leaveManagement" label="Leave Management Process" multiline rows={2} />
        <Field.Text name="performanceManagement" label="Performance Management Process" multiline rows={2} />
        <Field.Text name="trainingDevelopment" label="Training and Development Opportunities" multiline rows={2} />
        <CustomFileUpload name="complianceDocuments" label="Compliance Documents" />
      </Stack>
    </Card>
  )

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderCompanyInformation
      case 1:
        return renderClientInformation
      case 2:
        return renderEmployeeInformation
      case 3:
        return renderEmploymentDetails
      case 4:
        return renderCompensationDetails
      case 5:
        return renderBenefitsInformation
      case 6:
        return renderAdditionalInformation
      default:
        return null
    }
  }

  const renderActions = (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        mt: 4,
        "& .MuiButton-root": {
          px: 4,
          minWidth: 120,
          borderRadius: "4px",
        },
      }}
    >
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{
          bgcolor: "action.disabledBackground",
          color: "text.secondary",
          "&:hover": {
            bgcolor: "action.disabledBackground",
          },
        }}
      >
        Back
      </Button>
      <Box>
        {activeStep === steps.length - 1 ? (
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isStepValid()}
            sx={{
              bgcolor: "success.main",
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
          >
            Submit
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
            sx={{
              bgcolor: "success.main",
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  )

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box sx={{ mb: 5 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": {
              typography: "body2",
              color: "text.secondary",
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "primary.main",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {renderStepContent(activeStep)}
          {renderActions}
        </Grid>
      </Grid>
    </Form>
  )
}