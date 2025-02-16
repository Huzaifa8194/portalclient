import React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Form, Field } from "src/components/hook-form"

const AdditionalMemberSchema = zod.object({
  fullName: zod.string().min(1, { message: "Full name is required" }),
  relationship: zod.string().min(1, { message: "Relationship is required" }),
  dateOfBirth: zod.string().min(1, { message: "Date of birth is required" }),
  gender: zod.string().min(1, { message: "Gender is required" }),
})

const AdditionalMembersSchema = zod.object({
  members: zod.array(AdditionalMemberSchema).min(1, { message: "At least one member is required" }),
})

export function AdditionalMembers({ formData, handleInputChange }) {
  const methods = useForm({
    resolver: zodResolver(AdditionalMembersSchema),
    defaultValues: {
      members: formData.additionalMembers || [{ fullName: "", relationship: "", dateOfBirth: "", gender: "" }],
    },
  })

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  })

  const onSubmit = (data) => {
    console.log(data)
    handleInputChange({ target: { name: "additionalMembers", value: data.members } })
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box gap={3} display="flex" flexDirection="column">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Members
            </Typography>
          </Grid>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Member {index + 1}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Field.Text name={`members.${index}.fullName`} label="Full Name" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Field.Text
                  name={`members.${index}.relationship`}
                  label="Relationship to Primary Applicant"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field.DatePicker name={`members.${index}.dateOfBirth`} label="Date of Birth" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field.Select name={`members.${index}.gender`} label="Gender" fullWidth>
                  <MenuItem value="">Select gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Field.Select>
              </Grid>
              {index > 0 && (
                <Grid item xs={12}>
                  <Button onClick={() => remove(index)} color="secondary">
                    Remove Member
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => append({ fullName: "", relationship: "", dateOfBirth: "", gender: "" })}
            >
              Add Member
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Save Additional Members
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Form>
  )
}

