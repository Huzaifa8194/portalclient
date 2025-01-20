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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const FormSchema = z.object({
  // Personal Details
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),

  // Application Assessment
  hasNationalPassport: z.string().min(1, { message: "This field is required" }),
  visitedSchengen: z.string().min(1, { message: "This field is required" }),
  timesVisited: z.string().optional(),
  purposeOfVisit: z.string().optional(),
  hasRefusal: z.string().min(1, { message: "This field is required" }),
  refusalReason: z.string().optional(),
  refusalDate: z.string().optional(),
  hasRelative: z.string().min(1, { message: "This field is required" }),
  relationType: z.string().optional(),
  isDependent: z.string().min(1, { message: "This field is required" }),
  dependentDescription: z.string().optional(),
  hasInvitation: z.string().min(1, { message: "This field is required" }),
  invitationDetails: z.string().optional(),
  canSupportSelf: z.string().min(1, { message: "This field is required" }),
  fundedByOrganizer: z.string().optional(),
  organizerDetails: z.string().optional(),
  employeeType: z.string().min(1, { message: "This field is required" }),

  // Employee Type Specific Fields
  natureOfJob: z.string().optional(),
  monthlySalary: z.string().optional(),
  jobContract: z.string().optional(),
  vacationsLetter: z.string().optional(),

  // Self Employed Fields
  registrationCertificate: z.string().optional(),
  availableAssets: z.string().optional(),
  taxReturns: z.string().optional(),

  // Student Fields
  proofOfEnrollment: z.string().optional(),
  invitationForVisit: z.string().optional(),
  noObjectionLetter: z.string().optional(),
})

function PostNewEditForm() {
  const [currentSection, setCurrentSection] = useState("personal")

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      contactNo: "",
      hasNationalPassport: "",
      visitedSchengen: "",
      timesVisited: "",
      purposeOfVisit: "",
      hasRefusal: "",
      refusalReason: "",
      refusalDate: "",
      hasRelative: "",
      relationType: "",
      isDependent: "",
      dependentDescription: "",
      hasInvitation: "",
      invitationDetails: "",
      canSupportSelf: "",
      fundedByOrganizer: "",
      organizerDetails: "",
      employeeType: "",
      natureOfJob: "",
      monthlySalary: "",
      jobContract: "",
      vacationsLetter: "",
      registrationCertificate: "",
      availableAssets: "",
      taxReturns: "",
      proofOfEnrollment: "",
      invitationForVisit: "",
      noObjectionLetter: "",
    }),
    [],
  )

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods

  const visitedSchengen = watch("visitedSchengen")
  const hasRefusal = watch("hasRefusal")
  const hasRelative = watch("hasRelative")
  const isDependent = watch("isDependent")
  const hasInvitation = watch("hasInvitation")
  const canSupportSelf = watch("canSupportSelf")
  const employeeType = watch("employeeType")
  const fundedByOrganizer = watch("fundedByOrganizer")

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  })

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
      <Field.Text name="contactNo" label="Contact No" required />
    </Box>
  )

  const renderApplicationAssessment = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >
      <Field.Select native name="hasNationalPassport" label="Do you have National Passport?"  InputLabelProps={{ shrink: true }}
 required>
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      <Field.Select native name="visitedSchengen" label="Did you visit Schengen Countries before?" InputLabelProps={{ shrink: true }} required>
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {visitedSchengen === "yes" && (
        <>
          <Field.Select native name="timesVisited" label="How many time you visited the Schengen States?" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3 or more</option>
          </Field.Select>

          <Field.Select native name="purposeOfVisit" label="Purpose of Visit" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="tourism">Tourism</option>
            <option value="business">Business</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </Field.Select>
        </>
      )}

      <Field.Select native name="hasRefusal" label="Have you got any refusal for Schengen Countries?" InputLabelProps={{ shrink: true }} required>
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {hasRefusal === "yes" && (
        <>
          <Field.Text name="refusalReason" label="Reason for Refusal" required />
          <Field.Text name="refusalDate" label="Date of Refusal" type="date" required InputLabelProps={{ shrink: true }} />
        </>
      )}

      <Field.Select
        native
        name="hasRelative"
        label="Is any of your close relative living in Schengen Countries and you want to visit him/her?"
        InputLabelProps={{ shrink: true }} required
        sx={{ gridColumn: "1 / -1" }}
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {hasRelative === "yes" && (
        <Field.Select
          native
          name="relationType"
          label="Relation with the EU person (Like Parents, Siblings, Family friend)"
          InputLabelProps={{ shrink: true }} required
        >
          <option value="">Choose an Option</option>
          <option value="parents">Parents</option>
          <option value="siblings">Siblings</option>
          <option value="family-friend">Family Friend</option>
          <option value="other">Other</option>
        </Field.Select>
      )}

      <Field.Select
        native
        name="isDependent"
        label="Are you dependent on the person who is living in Schengen Countries?"
        InputLabelProps={{ shrink: true }} required
      >
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {isDependent === "yes" && (
        <Field.Text name="dependentDescription" label="Describe How?" multiline rows={4} required />
      )}

<Field.Select
  native
  name="hasInvitation"
  label="Do you have an invitation from any Individual Business Group, Company, Organisation, Association and you are coming for official, Volunteer, Sports, Research, Cultural Purposes?"
  InputLabelProps={{ shrink: true }}
  required
  sx={{ gridColumn: "1 / -1", width: "100%", minWidth: "300px" }}
>
  <option value="">Choose an Option</option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</Field.Select>

      {hasInvitation === "yes" && (
        <Field.Text
          name="invitationDetails"
          label="Details of the Company, Organisation or Association"
          multiline
          rows={4}
          required
          sx={{ gridColumn: "1 / -1" }}
        />
      )}

      <Field.Select native name="canSupportSelf" label="Can you support yourself for this trip?" InputLabelProps={{ shrink: true }} required>
        <option value="">Choose an Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Field.Select>

      {canSupportSelf === "no" && (
        <>
          <Field.Select native name="fundedByOrganizer" label="Funded by Organizer?" required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          {fundedByOrganizer === "yes" && (
            <Field.Text name="organizerDetails" label="Details of Organizer" multiline rows={4} required />
          )}
        </>
      )}

      <Field.Select native name="employeeType" label="Choose Employee Type" InputLabelProps={{ shrink: true }} required>
        <option value="">Choose an Option</option>
        <option value="employee">Employee</option>
        <option value="self-employed">Self Employed</option>
        <option value="student">Student</option>
        <option value="other">Other</option>
      </Field.Select>

      {employeeType === "employee" && (
        <>
          <Field.Select native name="natureOfJob" label="Nature of Job" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="permanent">Permanent</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
          </Field.Select>

          <Field.Select native name="monthlySalary" label="Monthly Salary" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="0-1000">0-1000</option>
            <option value="1001-2000">1001-2000</option>
            <option value="2001+">2001+</option>
          </Field.Select>

          <Field.Select native name="jobContract" label="Job Contract" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Select native name="vacationsLetter" label="Vacations Letter" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
        </>
      )}

      {employeeType === "self-employed" && (
        <>
          <Field.Select native name="registrationCertificate" label="Registration Certificate" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Select native name="availableAssets" label="Available Assets" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Select native name="taxReturns" label="Tax Returns of 2 to 3 Years" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
        </>
      )}

      {employeeType === "student" && (
        <>
          <Field.Select native name="proofOfEnrollment" label="Proof of enrollment" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Select native name="invitationForVisit" label="Invitation for visit" InputLabelProps={{ shrink: true }} required>
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>

          <Field.Select
            native
            name="noObjectionLetter"
            label="No objection letter from School/College/University"
             InputLabelProps={{ shrink: true }} required
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
        </>
      )}
       {employeeType === "other" && (
        <>
         <Field.Text name="additionalInfo" label="Please describe NGO / Media /Sports / Association:" className="full-width" multiline rows={3}         sx={{ gridColumn: "1 / -1" }}
 />

        </>
      )}
    </Box>
  )
  const renderFamilyAssessment = () => (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
    >
   <FormControlLabel
                  control={<Checkbox name="termsAgreement" />}
                  label="I am Visiting Alone"
                  sx={{ gridColumn: '1 / -1' }}
                />
    </Box>
  )
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            {currentSection === "personal" && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    borderRadius: 1,
                  }}
                >
                  Personal Details
                </Typography>
                {renderPersonalDetails()}
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="button" variant="contained" onClick={() => setCurrentSection("application")}>
                    Next
                  </LoadingButton>
                </Stack>
              </>
            )}

            {currentSection === "application" && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,

                    borderRadius: 1,
                  }}
                >
                  Applicant Assessment
                </Typography>
                {renderApplicationAssessment()}
                <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ mt: 3 }}>
                  <LoadingButton type="button" variant="outlined" onClick={() => setCurrentSection("personal")}>
                    Previous
                  </LoadingButton>
                  <LoadingButton type="button" variant="contained" onClick={() => setCurrentSection("family")}>
                    Next
                  </LoadingButton>
                </Stack>
              </>
            )}
             {currentSection === "family" && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,

                    borderRadius: 1,
                  }}
                >
                   Family Documents Assessment
                </Typography>
                {renderFamilyAssessment()}
                <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ mt: 3 }}>
                  <LoadingButton type="button" variant="outlined" onClick={() => setCurrentSection("application")}>
                    Previous
                  </LoadingButton>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Submit Form
                  </LoadingButton>
                </Stack>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

export default PostNewEditForm;