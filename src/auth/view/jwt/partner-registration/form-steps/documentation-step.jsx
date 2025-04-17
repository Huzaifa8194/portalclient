"use client"

import { Box, Typography } from "@mui/material"
import { Field } from "src/components/hook-form"
import { useFormContext } from "react-hook-form"

export function DocumentationStep({ isImmigrationFirm, isLawyer, isImmigrationConsultant, isFreelancer }) {
  const { watch } = useFormContext()

  // Watch the self_accreditation_or_experience field
  const hasAccreditation = watch("self_accreditation_or_experience") === "Yes"

  // Watch the is_accreditations field
  const hasAccreditations = watch("is_accreditations") === "Yes"

  // Check if user is Self-Employed (business_type_id === "6")
  const isSelfEmployed = watch("business_type_id") === "6"

  // Determine if accreditation document is required
  const isAccreditationDocRequired =
    isLawyer || isImmigrationConsultant || (isFreelancer && hasAccreditation) || hasAccreditations

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Documentation & Verification
      </Typography>

      {/* Registration document for Law Firms, Immigration Firms, and Self-Employed */}
      {(isLawyer || isImmigrationFirm || isSelfEmployed) && (
        <Field.Upload
          name="registration_doc"
          label="Attach Business License or Registration Document"
          accept="image/jpeg,image/png,application/pdf"
          helperText="Required for Law Firms, Immigration Firms, and Self-Employed (JPG, PNG, PDF)"
          required
        />
      )}

      {/* Accreditation document for Lawyers, Consultants, and anyone with accreditations */}
      {isAccreditationDocRequired && (
        <Field.Upload
          name="accreditation_doc"
          label="Attach Professional Accreditation Certificate"
          accept="image/jpeg,image/png,application/pdf"
          helperText="Required for Lawyers, Consultants, and anyone with accreditations (JPG, PNG, PDF)"
          required
        />
      )}

      {/* Passport document for Consultants, Self-Employed & Freelancers */}
      {(isImmigrationConsultant || isFreelancer || isSelfEmployed) && (
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