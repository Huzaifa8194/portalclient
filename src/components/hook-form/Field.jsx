"use client"

import { useState, useEffect } from "react"
import { Autocomplete, TextField, CircularProgress } from "@mui/material"
import { Controller } from "react-hook-form"

export const CountrySelect = ({ name, label, placeholder, value, helperText, control, ...other }) => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/supporting/countries")
        if (!response.ok) {
          throw new Error("Failed to fetch countries")
        }
        const data = await response.json()
        setCountries(data)
      } catch (err) {
        setFetchError("Error fetching countries. Please try again.")
        console.error("Error fetching countries:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (fetchError) {
    return <div>{fetchError}</div>
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <Autocomplete
          {...field}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => {
            if (typeof option === "number") {
              const country = countries.find((c) => c.id === option)
              return country ? country.name : ""
            }
            return option && typeof option === "object" ? option.name : option || ""
          }}
          isOptionEqualToValue={(option, selectedValue) => {
            if (typeof selectedValue === "number") {
              return option.id === selectedValue
            }
            return option.id === selectedValue.id
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!fieldError}
              helperText={fieldError ? fieldError.message : helperText}
            />
          )}
          {...other}
        />
      )}
    />
  )
}

