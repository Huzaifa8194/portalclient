import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"

export function DocumentationStep({ isImmigrationFirm, isLawyer, isImmigrationConsultant, isFreelancer, watch }) {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Documentation & Verification
      </Typography>

      {/* ONLY for Immigration Firms (not for Lawyers) */}
      {isImmigrationFirm && !isLawyer && (
        <Field.Upload
          name="registration_doc"
          label="Attach Business License or Registration Document"
          accept="image/jpeg,image/png,application/pdf"
          helperText="Required for Immigration Firms (JPG, PNG, PDF)"
          required
        />
      )}

      {/* ONLY for Lawyers and Consultants */}
      {(isLawyer || isImmigrationConsultant) && (
        <Field.Upload
          name="accreditation_doc"
          label="Attach Professional Accreditation Certificate"
          accept="image/jpeg,image/png,application/pdf"
          helperText="Required for Lawyers and Consultants (JPG, PNG, PDF)"
          required
        />
      )}

      {/* ONLY for Consultants, Individual Applicants & Freelancers */}
      {(isImmigrationConsultant || isFreelancer) && (
        <Field.Upload
          name="passport_doc"
          label="Attach Passport or National ID"
          accept="image/jpeg,image/png,application/pdf"
          helperText="Required for Consultants, Individual Applicants & Freelancers (JPG, PNG, PDF)"
          required
        />
      )}

      <Field.Text
        name="linkedin_url"
        label="LinkedIn or Professional Website"
        helperText="Optional, but recommended for verification"
        value={watch("linkedin_url") || ""}
      />

      <Field.Text
        name="testimonials"
        label="Any client testimonials or references?"
        multiline
        rows={4}
        helperText="Optional - Attach testimonials or links"
      />
    </Box>
  )
}

