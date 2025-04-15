"use client"

import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useFormContext } from "react-hook-form"

export function FirmDetailsStep() {
  // State to store company types from API - explicitly set as empty array
  const [companyTypes, setCompanyTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const methods = useFormContext()

  // Fetch company types from API
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const response = await fetch("https://api.swedenrelocators.se/api/miscellaneous/companyTypes")
        if (!response.ok) {
          throw new Error("Failed to fetch company types")
        }
        const data = await response.json()

        // Check if data is an array, otherwise look for data property that might contain the array
        if (Array.isArray(data)) {
          setCompanyTypes(data)
        } else if (data && typeof data === "object") {
          // If data is an object, try to find an array property
          // Common API patterns include data.data, data.results, data.items, etc.
          const arrayData = data.data || data.results || data.items || data.companyTypes || []
          setCompanyTypes(Array.isArray(arrayData) ? arrayData : [])
        } else {
          // Fallback to empty array
          setCompanyTypes([])
        }
      } catch (error) {
        console.error("Error fetching company types:", error)
        setCompanyTypes([]) // Ensure it's an empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyTypes()
  }, [])

  return (
    <Box gap={3} display="flex" flexDirection="column">

      <Field.Select name="company_type_id" label="Company Legal Structure" required>
        <MenuItem value="">Select company structure</MenuItem>
        {Array.isArray(companyTypes) &&
          companyTypes.map((type) => (
            <MenuItem key={type.id} value={type.id.toString()}>
              {type.name}
            </MenuItem>
          ))}
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

      {/* Changed from RadioGroup to Select */}
      <Field.Select name="company_eor" label="Do you provide Employer of Record (EOR) & Payroll Services?" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      {/* Changed from RadioGroup to Select */}
      <Field.Select name="company_hr_services" label="Do you offer HR & Compliance Services?" required>
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      {/* Changed from RadioGroup to Select */}
      <Field.Select
        name="company_specialize_business_immigration"
        label="Do you specialize in Corporate & Business Immigration?"
        required
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Text name="company_registration_no" label="Registration Number / Business License" required />

      {/* Using Field.DatePicker as requested */}
      <Field.DatePicker
        name="company_registration_date"
        label="Registration Date"
        format="YYYY/MM/DD"
        maxDate={dayjs()}
        error={Boolean(methods.formState.errors.company_registration_date)}
        helperText={methods.formState.errors.company_registration_date?.message}
        required
      />

      <Field.Text name="company_business_code" label="Business Code" required />
    </Box>
  )
}
