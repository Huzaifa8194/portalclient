import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useMemo, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import LoadingButton from "@mui/lab/LoadingButton"
import Typography from "@mui/material/Typography"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"

import { useBoolean } from "src/hooks/use-boolean"

import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"

// ----------------------------------------------------------------------

const steps = [
  "Company",
  "Employee",
  "Employment",
  "Compensation",
  "Benefits",
  "Attendance",
  "Tax ",
  "Reports",
  "Access",
  "Security",
  "Integration",
  "Support",
  "Features",
]

const NewPostSchema = zod.object({
  // Company Information
  companyName: zod.string().min(1, { message: "Company Name is required!" }),
  companyRegistrationNumber: zod.string().min(1, { message: "Company Registration Number is required!" }),
  companyAddress: zod.string().min(1, { message: "Company Address is required!" }),
  companyEmail: zod.string().email({ message: "Invalid email format" }),
  companyPhone: zod.string().min(1, { message: "Company Phone is required!" }),
  industrySector: zod.string().min(1, { message: "Industry/Sector is required!" }),
  taxIdentificationNumber: zod.string().min(1, { message: "Tax Identification Number is required!" }),
  companyBankDetails: zod.string().min(1, { message: "Company Bank Details are required!" }),

  // Employee Information
  employeeName: zod.string().min(1, { message: "Employee Name is required!" }),
  employeeId: zod.string().min(1, { message: "Employee ID is required!" }),
  dateOfBirth: zod.string().min(1, { message: "Date of Birth is required!" }),
  nationality: zod.string().min(1, { message: "Nationality is required!" }),
  employeeAddress: zod.string().min(1, { message: "Employee Address is required!" }),
  employeeEmail: zod.string().email({ message: "Invalid email format" }),
  employeePhone: zod.string().min(1, { message: "Employee Phone is required!" }),
  socialSecurityNumber: zod.string().min(1, { message: "Social Security Number is required!" }),
  employeeBankDetails: zod.string().min(1, { message: "Employee Bank Details are required!" }),
  employeeTaxInfo: zod.string().min(1, { message: "Employee Tax Information is required!" }),

  // Employment Details
  jobTitle: zod.string().min(1, { message: "Job Title is required!" }),
  jobDescription: zod.string().min(1, { message: "Job Description is required!" }),
  department: zod.string().min(1, { message: "Department is required!" }),
  startDate: zod.string().min(1, { message: "Start Date is required!" }),
  employmentType: zod.string().min(1, { message: "Employment Type is required!" }),
  workLocation: zod.string().min(1, { message: "Work Location is required!" }),
  managerName: zod.string().min(1, { message: "Manager/Supervisor Name is required!" }),
  workSchedule: zod.string().min(1, { message: "Work Schedule is required!" }),
  employmentContract: zod.string().min(1, { message: "Employment Contract is required!" }),

  // Compensation Details
  baseSalary: zod.string().min(1, { message: "Base Salary is required!" }),
  hourlyRate: zod.string().min(1, { message: "Hourly Rate is required!" }),
  overtimeRate: zod.string().min(1, { message: "Overtime Rate is required!" }),
  payFrequency: zod.string().min(1, { message: "Pay Frequency is required!" }),
  bonusesCommissions: zod.string().min(1, { message: "Bonuses and Commissions information is required!" }),
  deductions: zod.string().min(1, { message: "Deductions information is required!" }),
  reimbursements: zod.string().min(1, { message: "Reimbursements information is required!" }),

  // Benefits Information
  healthInsurance: zod.string().min(1, { message: "Health Insurance information is required!" }),
  retirementPlans: zod.string().min(1, { message: "Retirement Plans information is required!" }),
  paidTimeOff: zod.string().min(1, { message: "Paid Time Off information is required!" }),
  otherBenefits: zod.string().min(1, { message: "Other Benefits information is required!" }),

  // Attendance and Time Tracking
  timesheets: zod.string().min(1, { message: "Timesheets information is required!" }),
  leaveRequests: zod.string().min(1, { message: "Leave Requests information is required!" }),
  overtimeHours: zod.string().min(1, { message: "Overtime Hours information is required!" }),
  holidayAbsenceTracking: zod.string().min(1, { message: "Holiday and Absence Tracking information is required!" }),

  // Tax and Compliance Information
  employeeTaxForms: zod.string().min(1, { message: "Employee Tax Forms information is required!" }),
  companyTaxFiling: zod.string().min(1, { message: "Company Tax Filing information is required!" }),
  localTaxRegulations: zod.string().min(1, { message: "Local Tax Regulations Compliance information is required!" }),
  statutoryContributions: zod.string().min(1, { message: "Statutory Contributions information is required!" }),

  // Reporting and Analytics
  payrollReports: zod.string().min(1, { message: "Payroll Reports information is required!" }),
  taxReports: zod.string().min(1, { message: "Tax Reports information is required!" }),
  employeeEarningsStatements: zod.string().min(1, { message: "Employee Earnings Statements information is required!" }),
  expenseReports: zod.string().min(1, { message: "Expense Reports information is required!" }),

  // User Access and Permissions
  userRoles: zod.string().min(1, { message: "User Roles information is required!" }),
  accessLevels: zod.string().min(1, { message: "Access Levels and Permissions information is required!" }),
  loginCredentials: zod
    .string()
    .min(1, { message: "Login Credentials and Security Measures information is required!" }),

  // Security Measures
  dataEncryption: zod.string().min(1, { message: "Data Encryption information is required!" }),
  twoFactorAuthentication: zod.string().min(1, { message: "Two-Factor Authentication information is required!" }),
  dataBackups: zod.string().min(1, { message: "Data Backups information is required!" }),
  dataProtectionCompliance: zod.string().min(1, { message: "Data Protection Compliance information is required!" }),

  // Integration Capabilities
  accountingSoftwareIntegration: zod
    .string()
    .min(1, { message: "Accounting Software Integration information is required!" }),
  hrmsIntegration: zod.string().min(1, { message: "HRMS Integration is required!" }),
  apiAccess: zod.string().min(1, { message: "API Access information is required!" }),

  // Communication and Support
  customerSupportContact: zod.string().min(1, { message: "Customer Support Contact information is required!" }),
  helpDeskSystem: zod.string().min(1, { message: "Help Desk or Ticketing System information is required!" }),
  knowledgeBase: zod.string().min(1, { message: "Knowledge Base and FAQs information is required!" }),

  // Additional Features
  notificationsAlerts: zod.string().min(1, { message: "Notifications and Alerts information is required!" }),
  documentManagement: zod.string().min(1, { message: "Document Management information is required!" }),
  mobileAccess: zod.string().min(1, { message: "Mobile Access information is required!" }),
  employeeSelfService: zod.string().min(1, { message: "Employee Self-Service Portal information is required!" }),
})

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const preview = useBoolean()

  const defaultValues = useMemo(
    () => ({
      companyName: currentPost?.companyName || "",
      companyRegistrationNumber: currentPost?.companyRegistrationNumber || "",
      companyAddress: currentPost?.companyAddress || "",
      companyEmail: currentPost?.companyEmail || "",
      companyPhone: currentPost?.companyPhone || "",
      industrySector: currentPost?.industrySector || "",
      taxIdentificationNumber: currentPost?.taxIdentificationNumber || "",
      companyBankDetails: currentPost?.companyBankDetails || "",

      employeeName: currentPost?.employeeName || "",
      employeeId: currentPost?.employeeId || "",
      dateOfBirth: currentPost?.dateOfBirth || "",
      nationality: currentPost?.nationality || "",
      employeeAddress: currentPost?.employeeAddress || "",
      employeeEmail: currentPost?.employeeEmail || "",
      employeePhone: currentPost?.employeePhone || "",
      socialSecurityNumber: currentPost?.socialSecurityNumber || "",
      employeeBankDetails: currentPost?.employeeBankDetails || "",
      employeeTaxInfo: currentPost?.employeeTaxInfo || "",

      jobTitle: currentPost?.jobTitle || "",
      jobDescription: currentPost?.jobDescription || "",
      department: currentPost?.department || "",
      startDate: currentPost?.startDate || "",
      employmentType: currentPost?.employmentType || "",
      workLocation: currentPost?.workLocation || "",
      managerName: currentPost?.managerName || "",
      workSchedule: currentPost?.workSchedule || "",
      employmentContract: currentPost?.employmentContract || "",

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

      timesheets: currentPost?.timesheets || "",
      leaveRequests: currentPost?.leaveRequests || "",
      overtimeHours: currentPost?.overtimeHours || "",
      holidayAbsenceTracking: currentPost?.holidayAbsenceTracking || "",

      employeeTaxForms: currentPost?.employeeTaxForms || "",
      companyTaxFiling: currentPost?.companyTaxFiling || "",
      localTaxRegulations: currentPost?.localTaxRegulations || "",
      statutoryContributions: currentPost?.statutoryContributions || "",

      payrollReports: currentPost?.payrollReports || "",
      taxReports: currentPost?.taxReports || "",
      employeeEarningsStatements: currentPost?.employeeEarningsStatements || "",
      expenseReports: currentPost?.expenseReports || "",

      userRoles: currentPost?.userRoles || "",
      accessLevels: currentPost?.accessLevels || "",
      loginCredentials: currentPost?.loginCredentials || "",

      dataEncryption: currentPost?.dataEncryption || "",
      twoFactorAuthentication: currentPost?.twoFactorAuthentication || "",
      dataBackups: currentPost?.dataBackups || "",
      dataProtectionCompliance: currentPost?.dataProtectionCompliance || "",

      accountingSoftwareIntegration: currentPost?.accountingSoftwareIntegration || "",
      hrmsIntegration: currentPost?.hrmsIntegration || "",
      apiAccess: currentPost?.apiAccess || "",

      customerSupportContact: currentPost?.customerSupportContact || "",
      helpDeskSystem: currentPost?.helpDeskSystem || "",
      knowledgeBase: currentPost?.knowledgeBase || "",

      notificationsAlerts: currentPost?.notificationsAlerts || "",
      documentManagement: currentPost?.documentManagement || "",
      mobileAccess: currentPost?.mobileAccess || "",
      employeeSelfService: currentPost?.employeeSelfService || "",
    }),
    [currentPost],
  )

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const values = watch()

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

  const renderStepContent = (step) => {
    const renderFields = (fields, title) => (
      <Box
        sx={{
          maxWidth: "4xl",
          mx: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 600,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          {title}
        </Typography>
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid item xs={12} md={field.fullWidth ? 12 : 6} key={index}>
              <Field.Text
                name={field.name}
                label={field.label}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.paper",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.875rem",
                    color: "text.secondary",
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )

    const stepContent = [
      {
        title: "Company Information",
        fields: [
          { name: "companyName", label: "Company Name" },
          { name: "companyRegistrationNumber", label: "Company Registration Number" },
          { name: "companyAddress", label: "Company Address", fullWidth: true },
          { name: "companyEmail", label: "Company Email" },
          { name: "companyPhone", label: "Company Phone" },
          { name: "industrySector", label: "Industry/Sector" },
          { name: "taxIdentificationNumber", label: "Tax Identification Number" },
          { name: "companyBankDetails", label: "Company Bank Details", fullWidth: true },
        ],
      },
      {
        title: "Employee Information",
        fields: [
          { name: "employeeName", label: "Full Name" },
          { name: "employeeId", label: "Employee ID" },
          { name: "dateOfBirth", label: "Date of Birth" },
          { name: "nationality", label: "Nationality" },
          { name: "employeeAddress", label: "Address", fullWidth: true },
          { name: "employeeEmail", label: "Email" },
          { name: "employeePhone", label: "Phone Number" },
          { name: "socialSecurityNumber", label: "Social Security Number or National ID" },
          { name: "employeeBankDetails", label: "Bank Account Details", fullWidth: true },
          { name: "employeeTaxInfo", label: "Tax Information", fullWidth: true },
        ],
      },
      {
        title: "Employment Details",
        fields: [
          { name: "jobTitle", label: "Job Title" },
          { name: "jobDescription", label: "Job Description", fullWidth: true },
          { name: "department", label: "Department" },
          { name: "startDate", label: "Start Date" },
          { name: "employmentType", label: "Employment Type" },
          { name: "workLocation", label: "Work Location" },
          { name: "managerName", label: "Manager/Supervisor Name" },
          { name: "workSchedule", label: "Work Schedule" },
          { name: "employmentContract", label: "Employment Contract", fullWidth: true },
        ],
      },
      {
        title: "Compensation Details",
        fields: [
          { name: "baseSalary", label: "Base Salary" },
          { name: "hourlyRate", label: "Hourly Rate" },
          { name: "overtimeRate", label: "Overtime Rate" },
          { name: "payFrequency", label: "Pay Frequency" },
          { name: "bonusesCommissions", label: "Bonuses and Commissions" },
          { name: "deductions", label: "Deductions" },
          { name: "reimbursements", label: "Reimbursements" },
        ],
      },
      {
        title: "Benefits Information",
        fields: [
          { name: "healthInsurance", label: "Health Insurance" },
          { name: "retirementPlans", label: "Retirement Plans" },
          { name: "paidTimeOff", label: "Paid Time Off" },
          { name: "otherBenefits", label: "Other Benefits" },
        ],
      },
      {
        title: "Attendance and Time Tracking",
        fields: [
          { name: "timesheets", label: "Timesheets" },
          { name: "leaveRequests", label: "Leave Requests" },
          { name: "overtimeHours", label: "Overtime Hours" },
          { name: "holidayAbsenceTracking", label: "Holiday and Absence Tracking" },
        ],
      },
      {
        title: "Tax and Compliance Information",
        fields: [
          { name: "employeeTaxForms", label: "Employee Tax Forms" },
          { name: "companyTaxFiling", label: "Company Tax Filing" },
          { name: "localTaxRegulations", label: "Local Tax Regulations Compliance" },
          { name: "statutoryContributions", label: "Statutory Contributions" },
        ],
      },
      {
        title: "Reporting and Analytics",
        fields: [
          { name: "payrollReports", label: "Payroll Reports" },
          { name: "taxReports", label: "Tax Reports" },
          { name: "employeeEarningsStatements", label: "Employee Earnings Statements" },
          { name: "expenseReports", label: "Expense Reports" },
        ],
      },
      {
        title: "User Access and Permissions",
        fields: [
          { name: "userRoles", label: "User Roles" },
          { name: "accessLevels", label: "Access Levels and Permissions" },
          { name: "loginCredentials", label: "Login Credentials and Security Measures" },
        ],
      },
      {
        title: "Security Measures",
        fields: [
          { name: "dataEncryption", label: "Data Encryption" },
          { name: "twoFactorAuthentication", label: "Two-Factor Authentication" },
          { name: "dataBackups", label: "Data Backups" },
          { name: "dataProtectionCompliance", label: "Data Protection Compliance" },
        ],
      },
      {
        title: "Integration Capabilities",
        fields: [
          { name: "accountingSoftwareIntegration", label: "Accounting Software Integration" },
          { name: "hrmsIntegration", label: "HR Management Systems Integration" },
          { name: "apiAccess", label: "API Access for Custom Integrations" },
        ],
      },
      {
        title: "Communication and Support",
        fields: [
          { name: "customerSupportContact", label: "Customer Support Contact Information" },
          { name: "helpDeskSystem", label: "Help Desk or Ticketing System" },
          { name: "knowledgeBase", label: "Knowledge Base and FAQs" },
        ],
      },
      {
        title: "Additional Features",
        fields: [
          { name: "notificationsAlerts", label: "Notifications and Alerts" },
          { name: "documentManagement", label: "Document Management" },
          { name: "mobileAccess", label: "Mobile Access" },
          { name: "employeeSelfService", label: "Employee Self-Service Portal" },
        ],
      },
    ]

    return renderFields(stepContent[step].fields, stepContent[step].title)
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 0 }}>
        <Box sx={{ width: "100%", bgcolor: "background.default" }}>
          <Box
            sx={{
              py: { xs: 2, md: 3 },
              px: { xs: 2, md: 3 },
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box className="container mx-auto">
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.875rem",
                    mt: 1,
                  },
                  "& .MuiStepIcon-root": {
                    fontSize: "1.75rem",
                  },
                  "& .Mui-active": {
                    color: "primary.main",
                  },
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <Box className="container mx-auto">
            <Box
              sx={{
                py: { xs: 3, md: 5 },
                px: { xs: 2, md: 3 },
              }}
            >
              {renderStepContent(activeStep)}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "4xl",
                  mx: "auto",
                  mt: { xs: 3, md: 4 },
                  gap: 2,
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    minWidth: "120px",
                    px: 3,
                  }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      minWidth: "120px",
                      px: 3,
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    Submit Form
                  </LoadingButton>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      minWidth: "120px",
                      px: 3,
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Form>
  )
}

