"use client"

import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
  FormHelperText,
} from "@mui/material"
import { Field } from "src/components/hook-form"
import { useFormContext } from "react-hook-form" // Assuming you're using react-hook-form

export function CBIStep({ handlesCBI, cbiPrograms }) {
  const methods = useFormContext()
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = methods

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        Citizenship by Investment (CBI) Experience
      </Typography>

      <Field.RadioGroup
        name="handles_cbi"
        label="Can you handle Citizenship by Investment (CBI) applications?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      {handlesCBI === "Yes" && (
        <>
          <Field.Text
            name="cbi_applications"
            label="How many CBI applications have you handled so far?"
            type="text"
            inputProps={{
              inputMode: "numeric",
            }}
            required
          />
          <FormControl fullWidth error={Boolean(errors.cbi_program_specialize)}>
            <InputLabel id="cbi-programs-label">
              Which CBI programs do you specialize in? (Select all that apply)
            </InputLabel>
            <Select
              labelId="cbi-programs-label"
              multiple
              name="cbi_program_specialize"
              value={watch("cbi_program_specialize") || []}
              onChange={(event) => {
                setValue("cbi_program_specialize", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
                trigger("cbi_program_specialize")
              }}
              input={<OutlinedInput label="Which CBI programs do you specialize in? (Select all that apply)" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const option = cbiPrograms.find((program) => program.id.toString() === value)
                    return (
                      <Chip
                        key={value}
                        label={option ? option.name : value}
                        size="small"
                        onDelete={(event) => {
                          event.stopPropagation()
                          const newValue = watch("cbi_program_specialize").filter((item) => item !== value)
                          setValue("cbi_program_specialize", newValue, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                        }}
                        onMouseDown={(event) => {
                          event.stopPropagation()
                        }}
                      />
                    )
                  })}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                  },
                },
              }}
            >
              {cbiPrograms.map((program) => (
                <MenuItem key={program.id} value={program.id.toString()}>
                  {program.name}
                </MenuItem>
              ))}
            </Select>
            {errors.cbi_program_specialize && <FormHelperText>Please select at least one program</FormHelperText>}
          </FormControl>
        </>
      )}
    </Box>
  )
}
