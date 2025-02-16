import { useForm, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Typography from "@mui/material/Typography"
import { Form, Field } from "src/components/hook-form"

// ----------------------------------------------------------------------

const PolicyInterestSchema = zod.object({
  coverageType: zod.string().min(1, { message: "Coverage type is required" }),
  startDate: zod.string().min(1, { message: "Start date is required" }),
  endDate: zod.string().min(1, { message: "End date is required" }),
  budgetRange: zod.string().min(1, { message: "Budget range is required" }),
  coverageOptions: zod.array(zod.string()).min(1, { message: "At least one coverage option is required" }),
  otherCoverageOption: zod.string().optional(),
  specificCountries: zod.string().min(1, { message: "Specific countries are required" }),
  usaCoverage: zod.string().min(1, { message: "USA coverage selection is required" }),
  paymentCurrency: zod.string().min(1, { message: "Payment currency is required" }),
  otherCurrency: zod.string().optional(),
  insurancePurpose: zod.string().min(1, { message: "Insurance purpose is required" }),
  otherInsurancePurpose: zod.string().optional(),
  reasonForInternationalCover: zod.string().min(1, { message: "Reason for international cover is required" }),
  coverageLength: zod.string().min(1, { message: "Coverage length is required" }),
  paymentFrequency: zod.string().min(1, { message: "Payment frequency is required" }),
})

// ----------------------------------------------------------------------

export function PolicyInterest() {
  const defaultValues = {
    coverageType: "",
    startDate: "",
    endDate: "",
    budgetRange: "",
    coverageOptions: [],
    otherCoverageOption: "",
    specificCountries: "",
    usaCoverage: "",
    paymentCurrency: "",
    otherCurrency: "",
    insurancePurpose: "",
    otherInsurancePurpose: "",
    reasonForInternationalCover: "",
    coverageLength: "",
    paymentFrequency: "",
  }

  const methods = useForm({
    resolver: zodResolver(PolicyInterestSchema),
    defaultValues,
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const coverageOptions = useWatch({
    control,
    name: "coverageOptions",
  })

  const paymentCurrency = useWatch({
    control,
    name: "paymentCurrency",
  })

  const insurancePurpose = useWatch({
    control,
    name: "insurancePurpose",
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Handle form submission
      console.log("Form data:", data)
    } catch (error) {
      console.error("Submission error:", error)
    }
  })

  const coverageOptionsList = [
    { value: "inpatient", label: "Inpatient" },
    { value: "outpatient", label: "Outpatient" },
    { value: "dental", label: "Dental" },
    { value: "maternity", label: "Maternity" },
    { value: "criticalIllness", label: "Critical Illness" },
    { value: "other", label: "Other" },
  ]

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box gap={3} display="flex" flexDirection="column">
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
            Policy Interest
          </Typography>
        </Grid>
          <Grid item xs={12}>
            <Field.Select name="coverageType" label="Type of Coverage Interested In" fullWidth>
              <MenuItem value="">Select coverage type</MenuItem>
              <MenuItem value="individual">Individual Plan</MenuItem>
              <MenuItem value="couple">Couple Plan (2 Adults)</MenuItem>
              <MenuItem value="family">Family Plan (2 Adults + Children)</MenuItem>
              <MenuItem value="group">Group Plan (More than 4 Members)</MenuItem>
            </Field.Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field.DatePicker name="startDate" label="Preferred Coverage Start Date" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field.DatePicker name="endDate" label="Preferred Coverage End Date" />
          </Grid>

          <Grid item xs={12}>
            <Field.Select name="budgetRange" label="Budget Range for Premium" fullWidth>
              <MenuItem value="">Select budget range</MenuItem>
              <MenuItem value="less100">Less than $100/month</MenuItem>
              <MenuItem value="100to300">$100 - $300/month</MenuItem>
              <MenuItem value="300to500">$300 - $500/month</MenuItem>
              <MenuItem value="more500">More than $500/month</MenuItem>
            </Field.Select>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="coverageOptions"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  {coverageOptionsList.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={field.value.includes(option.value)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, option.value]
                              : field.value.filter((v) => v !== option.value)
                            field.onChange(newValue)
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              )}
            />
          </Grid>

          {coverageOptions && coverageOptions.includes("other") && (
            <Grid item xs={12}>
              <Field.Text name="otherCoverageOption" label="Specify Other Coverage Option" fullWidth />
            </Grid>
          )}

          <Grid item xs={12}>
            <Field.Text name="specificCountries" label="Specific Countries for Coverage" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Field.Select name="usaCoverage" label="Do you need cover in the USA?" fullWidth>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Field.Select>
          </Grid>

          <Grid item xs={12}>
            <Field.Select name="paymentCurrency" label="Preferred Payment Currency" fullWidth>
              <MenuItem value="">Select currency</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="SEK">SEK</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Field.Select>
          </Grid>

          {paymentCurrency === "other" && (
            <Grid item xs={12}>
              <Field.Text name="otherCurrency" label="Specify Other Currency" fullWidth />
            </Grid>
          )}

          <Grid item xs={12}>
            <Field.Select name="insurancePurpose" label="Purpose of Health Insurance" fullWidth>
              <MenuItem value="">Select purpose</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="familySecurity">Family Security</MenuItem>
              <MenuItem value="workAssignment">Work Assignment</MenuItem>
              <MenuItem value="longTermResidency">Long-term Residency</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Field.Select>
          </Grid>

          {insurancePurpose === "other" && (
            <Grid item xs={12}>
              <Field.Text name="otherInsurancePurpose" label="Specify Other Purpose" fullWidth />
            </Grid>
          )}

          <Grid item xs={12}>
            <Field.Text
              name="reasonForInternationalCover"
              label="Why are you looking for international health cover?"
              multiline
              rows={3}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Field.Select name="coverageLength" label="Desired Length of Coverage" fullWidth>
              <MenuItem value="">Select coverage length</MenuItem>
              <MenuItem value="3to6">3-6 months</MenuItem>
              <MenuItem value="6to12">6-12 months</MenuItem>
              <MenuItem value="moreThan12">More than 12 months</MenuItem>
            </Field.Select>
          </Grid>

          <Grid item xs={12}>
            <Field.Select name="paymentFrequency" label="How often would you like to pay?" fullWidth>
              <MenuItem value="">Select payment frequency</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="annually">Annually (Only for policies longer than 1 year)</MenuItem>
            </Field.Select>
          </Grid>
        </Grid>
      </Box>
    </Form>
  )
}

