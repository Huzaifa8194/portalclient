import { Box, Typography, MenuItem } from "@mui/material"
import { Field } from "src/components/hook-form"

export function PartnershipScopeStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Partnership Scope & Collaboration
      </Typography>

      <Field.Select
        name="receive_students_via_relocators"
        label="Would the university like to receive international students through Sweden Relocators?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Select services the university would like Sweden Relocators to provide for international students
      </Typography>
      <Field.MultiSelect
        name="services_via_relocators"
        label="Select services"
        options={[
          { value: "Pre-arrival consultation", label: "Pre-arrival consultation" },
          {
            value: "Visa & residence permit application assistance",
            label: "Visa & residence permit application assistance",
          },
          {
            value: "Housing search & rental contract negotiation",
            label: "Housing search & rental contract negotiation",
          },
          { value: "Airport pickup & transport assistance", label: "Airport pickup & transport assistance" },
          {
            value: "Personal identification number (Personnummer) & Skatteverket registration",
            label: "Personal identification number (Personnummer) & Skatteverket registration",
          },
          {
            value: "Banking, insurance & financial setup guidance",
            label: "Banking, insurance & financial setup guidance",
          },
          { value: "Internship & career transition support", label: "Internship & career transition support" },
          {
            value: "Cultural adaptation & integration assistance",
            label: "Cultural adaptation & integration assistance",
          },
          { value: "Other", label: "Other" },
        ]}
      />

      {/* Show this field only if "Other" is selected for services */}
      <Field.Text
        name="services_via_relocators_other"
        label="Specify Other Services"
        conditional={{
          when: "services_via_relocators",
          contains: "Other",
        }}
      />

      <Field.Select
        name="tailored_student_packages"
        label="Does the university require tailored student relocation packages?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select
        name="integrate_relocators_services"
        label="Would the university like to integrate Sweden Relocators' services with its international office operations?"
        required
      >
        <MenuItem value="">Select option</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Field.Select>

      <Field.Select name="collaboration_model" label="Preferred collaboration model" required>
        <MenuItem value="">Select collaboration model</MenuItem>
        <MenuItem value="Direct student referrals">Direct student referrals to Sweden Relocators</MenuItem>
        <MenuItem value="University-sponsored">University-sponsored student relocation packages</MenuItem>
        <MenuItem value="Discounted services">Discounted relocation services for students</MenuItem>
        <MenuItem value="Subscription-based">Subscription-based service model</MenuItem>
      </Field.Select>
    </Box>
  )
}

