"use client"

import {
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Chip,
  FormHelperText
} from "@mui/material";
import { Field } from "src/components/hook-form";
import { useFormContext } from "react-hook-form";

export function AdditionalServicesStep({ applicationTypes, additionalServices }) {
  const methods = useFormContext();
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = methods;

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <FormControl
        fullWidth
        error={Boolean(errors.application_specialize)}
      >
        <InputLabel id="application-types-label">
          Types of Applications You Specialize In (Select all that apply)
        </InputLabel>
        <Select
          labelId="application-types-label"
          multiple
          name="application_specialize"
          id="application_specialize"
          value={watch("application_specialize") || []}
          onChange={(event) => {
            setValue("application_specialize", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
            trigger("application_specialize");
          }}
          input={
            <OutlinedInput label="Types of Applications You Specialize In (Select all that apply)" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const option = applicationTypes.find((type) => type.id.toString() === value);
                return (
                  <Chip
                    key={value}
                    label={option ? option.name : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation();
                      const newValue = watch("application_specialize").filter(
                        (item) => item !== value
                      );
                      setValue("application_specialize", newValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                );
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
          {applicationTypes.map((type) => (
            <MenuItem key={type.id} value={type.id.toString()}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        {errors.application_specialize && (
          <FormHelperText>Please select at least one application type</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={Boolean(errors.additional_services)}
      >
        <InputLabel id="additional-services-label">
          Which additional services can you provide in the countries you handle? (Select all that apply)
        </InputLabel>
        <Select
          labelId="additional-services-label"
          multiple
          name="additional_services"
          id="additional_services"
          value={watch("additional_services") || []}
          onChange={(event) => {
            setValue("additional_services", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
            trigger("additional_services");
          }}
          input={
            <OutlinedInput label="Which additional services can you provide in the countries you handle? (Select all that apply)" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const option = additionalServices.find((service) => service.id.toString() === value);
                return (
                  <Chip
                    key={value}
                    label={option ? option.name : value}
                    size="small"
                    onDelete={(event) => {
                      event.stopPropagation();
                      const newValue = watch("additional_services").filter(
                        (item) => item !== value
                      );
                      setValue("additional_services", newValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                );
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
          {additionalServices.map((service) => (
            <MenuItem key={service.id} value={service.id.toString()}>
              {service.name}
            </MenuItem>
          ))}
        </Select>
        {errors.additional_services && (
          <FormHelperText>Please select at least one additional service</FormHelperText>
        )}
      </FormControl>
    </Box>
  )}
