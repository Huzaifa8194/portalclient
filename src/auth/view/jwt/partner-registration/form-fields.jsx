"use client"

import { useFormContext, Controller } from "react-hook-form"
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import Chip from "@mui/material/Chip"
import Checkbox from "@mui/material/Checkbox"
import FormHelperText from "@mui/material/FormHelperText"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { Field } from "src/components/hook-form"

// Create a styled component for hidden input
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

// Create a MultiSelect component for Field
Field.MultiSelect = function MultiSelect({ name, label, options, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // Initialize as empty array
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            multiple
            displayEmpty
            value={field.value || []} // Ensure value is never undefined
            onChange={(e) => field.onChange(e.target.value)}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {!selected || selected.length === 0 ? (
                  <Typography sx={{ color: "text.secondary" }}>Select options</Typography>
                ) : (
                  selected.map((value) => {
                    const option = options.find((opt) => opt.value === value)
                    return (
                      <Chip
                        key={value}
                        label={option ? option.label : value}
                        size="small"
                        onDelete={(event) => {
                          event.stopPropagation()
                          const newValue = field.value.filter((item) => item !== value)
                          field.onChange(newValue)
                        }}
                        onMouseDown={(event) => {
                          event.stopPropagation()
                        }}
                      />
                    )
                  })
                )}
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
            {...other}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox checked={field.value?.includes(option.value) || false} />
                  <Typography>{option.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

// Modify the Field.Upload component
Field.Upload = function Upload({ name, label, helperText, required, accept = "image/jpeg,image/png" }) {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  // Watch the file value to maintain state between steps
  const fileValue = watch(name)
  const [fileName, setFileName] = useState("")

  // Set the file name when component mounts or when fileValue changes
  useEffect(() => {
    if (fileValue && fileValue.name) {
      setFileName(fileValue.name)
    }
  }, [fileValue])

  // Validate file type
  const validateFileType = (file) => {
    // Define allowed MIME types - only jpeg and png
    const allowedTypes = accept.split(",")

    if (!file) return true

    // Check if file type is in allowed types
    return allowedTypes.includes(file.type)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null} // Initialize as null
      render={({ field: { onChange, value, onBlur, ...field } }) => {
        const error = errors[name]

        const handleFileChange = (event) => {
          const file = event.target.files[0]

          if (file) {
            // Validate file type
            if (!validateFileType(file)) {
              console.error(`Invalid file type: ${file.type}. Allowed types: ${accept}`)
              return
            }

            setFileName(file.name)
            onChange(file)

            // Trigger validation after file is set
            setTimeout(() => {
              if (onBlur) onBlur()
            }, 100)
          }
        }

        const handleRemoveFile = () => {
          setFileName("")
          onChange(null)
        }

        return (
          <FormControl fullWidth error={!!error}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" component="label" htmlFor={name}>
                {label} {required && <span style={{ color: "red" }}>*</span>}
              </Typography>
            </Box>

            {!fileName ? (
              <Button component="label" variant="outlined" sx={{ height: 56, justifyContent: "flex-start" }}>
                Upload File
                <VisuallyHiddenInput type="file" id={name} accept={accept} onChange={handleFileChange} {...field} />
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ flexGrow: 1 }} noWrap>
                  {fileName}
                </Typography>
                <Button size="small" onClick={handleRemoveFile} color="error" variant="outlined">
                  Remove
                </Button>
              </Box>
            )}

            {helperText && <FormHelperText>{helperText}</FormHelperText>}

            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}

// Utility function for country handling
export const findCountryIdByLabel = (countryValue, countries) => {
  if (!countryValue) return null
  const country = countries.find((c) => c.name === countryValue)
  return country ? country.id : null
}
