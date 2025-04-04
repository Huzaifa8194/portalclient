import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function FirmDetailsStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Immigration Firm Details
      </Typography>

      <Field.Select name="company_type_id" label="Company Legal Structure" required>
        <MenuItem value="">Select company structure</MenuItem>
        <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
        <MenuItem value="Private Limited (Ltd)">Private Limited (Ltd)</MenuItem>
        <MenuItem value="Partnership">Partnership</MenuItem>
        <MenuItem value="Freelancer">Freelancer</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Field.Select>

      <Field.Select name="company_industry_sector" label="Industry / Sector" required>
        <MenuItem value="">Select industry</MenuItem>
        <MenuItem value="Legal Services">Legal Services</MenuItem>
        <MenuItem value="Immigration Consulting">Immigration Consulting</MenuItem>
        <MenuItem value="HR & Payroll">HR & Payroll</MenuItem>
        <MenuItem value="Real Estate & Housing">Real Estate & Housing</MenuItem>
        <MenuItem value="Logistics & Relocation">Logistics & Relocation</MenuItem>
        <MenuItem value="Financial Services">Financial Services</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Field.Select>

      <Field.Select name="company_no_of_employees" label="Number of Employees" required>
        <MenuItem value="">Select number of employees</MenuItem>
        <MenuItem value="1-10">1-10</MenuItem>
        <MenuItem value="11-50">11-50</MenuItem>
        <MenuItem value="51-100">51-100</MenuItem>
        <MenuItem value="101-500">101-500</MenuItem>
        <MenuItem value="500+">500+</MenuItem>
      </Field.Select>

      <Field.Select name="immigration_exp_handling_cases" label="Experience in Handling Immigration Cases" required>
        <MenuItem value="">Select experience level</MenuItem>
        <MenuItem value="3-5 years">3-5 years</MenuItem>
        <MenuItem value="5-10 years">5-10 years</MenuItem>
        <MenuItem value="10+ years">10+ years</MenuItem>
      </Field.Select>

      <Field.RadioGroup
        name="company_eor"
        label="Do you provide Employer of Record (EOR) & Payroll Services?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.RadioGroup
        name="company_hr_services"
        label="Do you offer HR & Compliance Services?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.RadioGroup
        name="company_specialize_business_immigration"
        label="Do you specialize in Corporate & Business Immigration?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      <Field.Text name="company_registration_no" label="Registration Number / Business License" required />

      <Field.Text name="company_registration_date" label="Registration Date" type="date" required />

      <Field.Text name="company_business_code" label="Business Code" required />
    </Box>
  )
}

