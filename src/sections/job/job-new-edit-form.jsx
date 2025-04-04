"use client"


import { React, useMemo, useEffect, useState, useCallback, useRef } from "react"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import axios from "axios"
import { paths } from "src/routes/paths"
import { useRouter, useParams } from "src/routes/hooks"
import { FAMILY_CATEGORY_OPTIONS } from "src/_mock"
import { toast } from "src/components/snackbar"
import { Field } from "src/components/hook-form"
import { countries } from "src/assets/data"

// Update the schema to include country fields
const FamilyMemberSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  relationship: zod.string().min(1, { message: "Relationship is required" }),
  contact_number: zod.string().refine((value) => !value || isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  email: zod.string().email().optional(),
  address: zod.string().optional(),
  city: zod.string().optional(),
  postalCode: zod.string().optional(),
  country: zod.string().optional(),
  nationality: zod.string().optional(),
  place_of_birth: zod.string().optional(),
  nic: zod.string().optional(),
  passport_no: zod.string().optional(),
  dob: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  issue_date: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  expiry_date: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
})

// Separate component for phone input to avoid hooks rules violation
function PhoneInputWithCountryDetection({ name, label, helperText, ...other }) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        // Try to detect country from phone number
        let detectedCountry = null
        if (field.value) {
          try {
            const parsedNumber = parsePhoneNumber(field.value)
            if (parsedNumber?.country) {
              detectedCountry = parsedNumber.country
              console.log("Detected country from phone:", detectedCountry)
            }
          } catch (parseError) {
            console.error("Error parsing phone number:", parseError)
          }
        }

        return (
          <Field.Phone
            {...field}
            label={label}
            error={!!error}
            helperText={error ? error.message : helperText}
            country={detectedCountry}
            {...other}
          />
        )
      }}
    />
  )
}

// Custom address input component with Google Maps autocomplete
function AddressAutocompleteInput({ name, label, helperText, onPlaceSelected, ...other }) {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)

  useEffect(() => {
    // Only initialize if Google Maps API is loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.log("Google Maps API not yet loaded")
      return undefined // Return undefined for consistent return
    }

    if (!inputRef.current) {
      console.log("Input ref not available yet")
      return undefined // Return undefined for consistent return
    }

    try {
      // Create the autocomplete instance with broader options
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], // Use geocode for broader results
        fields: ["address_components", "formatted_address", "geometry", "name"],
      })

      // Store the autocomplete instance in the ref
      autocompleteRef.current = autocomplete

      // Add a listener for place selection
      const listener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        console.log("Selected place:", place)

        if (!place.geometry) {
          console.log("Place details not found")
          return
        }

        if (onPlaceSelected) {
          onPlaceSelected(place)
        }
      })

      // Cleanup function
      return () => {
        if (window.google && window.google.maps && window.google.maps.event) {
          window.google.maps.event.removeListener(listener)
        }
      }
    } catch (error) {
      console.error("Error initializing Google Maps Autocomplete:", error)
      return undefined // Return undefined for consistent return
    }
  }, [onPlaceSelected])

  // Prevent form submission on enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Field.Text
          {...field}
          inputRef={inputRef}
          label={label}
          error={!!error}
          helperText={error ? error.message : helperText}
          onKeyDown={handleKeyDown}
          {...other}
        />
      )}
    />
  )
}

// // Forward ref to fix the warning about function components not accepting refs
// const RHFTextField = React.forwardRef((props, ref) => <Field.Text {...props} inputRef={ref} />)
// RHFTextField.displayName = "RHFTextField"

export function JobNewEditForm({ currentJob }) {
  const router = useRouter()
  const { id } = useParams()
  const [memberData, setMemberData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)

  // Function to find country ID by label
  const findCountryIdByLabel = useCallback((countryLabel) => {
    const country = countries.find((c) => c.label === countryLabel)
    return country ? country.id : null
  }, [])

  // Function to find country label by ID
  const findCountryLabelById = useCallback((countryId) => {
    const country = countries.find((c) => c.id === Number(countryId))
    return country ? country.label : null
  }, [])

  // Load Google Maps API
  useEffect(() => {
    // Function to load Google Maps API
    const loadGoogleMapsAPI = () => {
      // Check if the API is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log("Google Maps API already loaded")
        setGoogleMapsLoaded(true)
        return
      }

      // Check if the script is already being loaded
      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api"]')
      if (existingScript) {
        console.log("Google Maps API script is already loading")
        existingScript.addEventListener("load", () => {
          console.log("Google Maps API loaded via existing script")
          setGoogleMapsLoaded(true)
        })
        return
      }

      console.log("Loading Google Maps API script")
      const script = document.createElement("script")
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAWOsJJP9SHiPLh_DSRHJIwdrXfY2WBNw&libraries=places"
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log("Google Maps API script loaded successfully")
        setGoogleMapsLoaded(true)
      }
      script.onerror = (error) => {
        console.error("Error loading Google Maps API script:", error)
      }
      document.head.appendChild(script)
    }

    // Load the API
    loadGoogleMapsAPI()
  }, [])

  // Fetch family member data
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("authToken")
        if (!token) {
          throw new Error("No authentication token found")
        }
        const response = await axios.get(`https://api.swedenrelocators.se/api/client/familyMember/show/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        setMemberData(response.data)
      } catch (error) {
        console.error("Error fetching member data:", error)
        toast.error("Failed to load member data")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMemberData()
    }
  }, [id])

  const defaultValues = useMemo(() => {
    if (!memberData?.data)
      return {
        name: "",
        relationship: "",
        contact_number: "",
        city: "",
        postalCode: "",
        passport_no: "",
        nic: "",
        dob: "",
        issue_date: "",
        expiry_date: "",
        nationality: null,
        place_of_birth: null,
        country: null,
        email: "",
        address: "",
      }

    // Get country labels from IDs if available, otherwise use the provided labels
    const nationality = memberData.data.nationality_id
      ? findCountryLabelById(memberData.data.nationality_id)
      : memberData.data.nationality || null

    const placeOfBirth = memberData.data.place_of_birth_id
      ? findCountryLabelById(memberData.data.place_of_birth_id)
      : memberData.data.place_of_birth || null

    const country = memberData.data.country_id
      ? findCountryLabelById(memberData.data.country_id)
      : memberData.data.country || null

    return {
      name: memberData.data.name || "",
      relationship: memberData.data.relationship || "",
      contact_number: memberData.data.contact_number || "",
      city: memberData.data.city || "",
      postalCode: memberData.data.postal_code || "",
      passport_no: memberData.data.passport_no || "",
      nic: memberData.data.nic || "",
      dob: memberData.data.dob || "",
      issue_date: memberData.data.issue_date || "",
      expiry_date: memberData.data.expiry_date || "",
      nationality,
      place_of_birth: placeOfBirth,
      country,
      email: memberData.data.email || "",
      address: memberData.data.address || "",
    }
  }, [memberData, findCountryLabelById])

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(FamilyMemberSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods

  // Handle place selection from Google Maps autocomplete
  const handlePlaceSelected = useCallback(
    (place) => {
      if (!place || !place.address_components) return

      // Extract address components
      let city = ""
      let country = ""
      let postalCode = ""
      let streetNumber = ""
      let route = ""

      for (let i = 0; i < place.address_components.length; i += 1) {
        const component = place.address_components[i]

        // Get the street number
        if (component.types.includes("street_number")) {
          streetNumber = component.long_name
        }

        // Get the route (street name)
        if (component.types.includes("route")) {
          route = component.long_name
        }

        // Get the City (if present)
        if (component.types.includes("locality")) {
          city = component.long_name
        }

        // Get the Country (if present)
        if (component.types.includes("country")) {
          country = component.long_name
        }

        // Get the Postal Code (if present)
        if (component.types.includes("postal_code")) {
          postalCode = component.long_name
        }
      }

      // Format the address to only include street information
      let formattedAddress = ""
      if (route) {
        formattedAddress = route
        if (streetNumber) {
          formattedAddress += ` ${streetNumber}`
        }
      } else {
        // If no specific street info is found, use the first part of the formatted address
        const firstPart = place.formatted_address.split(",")[0]
        formattedAddress = firstPart
      }

      // Set form values
      setValue("address", formattedAddress, { shouldValidate: true })

      // Clear previous values first to ensure they don't persist
      setValue("city", "", { shouldValidate: true })
      setValue("postalCode", "", { shouldValidate: true })
      setValue("country", "", { shouldValidate: true })

      // Update city if found
      if (city) {
        setValue("city", city, { shouldValidate: true })
      }

      // Update postal code if found
      if (postalCode) {
        setValue("postalCode", postalCode, { shouldValidate: true })
      }

      // Update country if found
      if (country) {
        // Find the country in our list
        const countryOption = countries.find((c) => c.label.toLowerCase() === country.toLowerCase())

        if (countryOption) {
          setValue("country", countryOption.label, { shouldValidate: true })
        }
      }
    },
    [setValue],
  )

  useEffect(() => {
    if (memberData) {
      reset(defaultValues)
    }
  }, [memberData, defaultValues, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("No authentication token found")
      }

      // Get country IDs from labels
      const countryId = data.country ? findCountryIdByLabel(data.country) : null
      const placeOfBirthId = data.place_of_birth ? findCountryIdByLabel(data.place_of_birth) : null
      const nationalityId = data.nationality ? findCountryIdByLabel(data.nationality) : null

      const apiData = new FormData()
      apiData.append("name", data.name)
      apiData.append("relationship", data.relationship)
      apiData.append("contact_number", data.contact_number || "")
      apiData.append("email", data.email || "")
      apiData.append("address", data.address || "")
      apiData.append("city", data.city || "")
      apiData.append("postal_code", data.postalCode || "")

      apiData.append("country_id", countryId || "")
      apiData.append("place_of_birth", placeOfBirthId || "")
      apiData.append("nationality", nationalityId || "")
      apiData.append("secondary_address", "")

      apiData.append("nic", data.nic || "")
      apiData.append("passport_no", data.passport_no || "")
      apiData.append("dob", data.dob || "")
      apiData.append("issue_date", data.issue_date || "")
      apiData.append("expiry_date", data.expiry_date || "")

      await axios.post(`https://api.swedenrelocators.se/api/client/familyMember/edit/${id}`, apiData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Update success!")
      router.push(paths.dashboard.job.root)
    } catch (error) {
      console.error(error?.response?.data || error)
      toast.error(error?.response?.data?.message || "Update failed. Please try again.")
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  mb: 5,
                  mx: "auto",
                  display: "block",
                  textAlign: "left",
                  color: "gray",
                }}
              >
                Update your family members information here.
              </Typography>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <Field.Text name="name" label="Full Name" />
                <Field.Select native name="relationship" label="Relationship" InputLabelProps={{ shrink: true }}>
                  {FAMILY_CATEGORY_OPTIONS.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Field.Select>
                {/* Use the custom phone input component to fix country detection */}
                <PhoneInputWithCountryDetection name="contact_number" label="Contact Number" />
                <Field.Text name="email" label="Email address" />

                {/* Use the custom address input with autocomplete */}
                {googleMapsLoaded ? (
                  <AddressAutocompleteInput name="address" label="Address" onPlaceSelected={handlePlaceSelected} />
                ) : (
                  <Field.Text name="address" label="Address" />
                )}

                <Field.Text name="city" label="City" />
                <Field.Text name="postalCode" label="Postal Code" />
                <Field.CountrySelect
                  name="country"
                  label="Country"
                  placeholder="Choose a country"
                  helperText="Select a country"
                />
                <Field.Text name="nic" label="National Identification Number - CPR - Personnummer" />
                <Field.DatePicker name="dob" label="Date of Birth" format="YYYY/MM/DD" />
                <Field.CountrySelect
                  name="place_of_birth"
                  label="Place of Birth"
                  placeholder="Choose a country"
                  helperText="Select place of birth"
                />
                <Field.CountrySelect
                  name="nationality"
                  label="Nationality"
                  placeholder="Choose a country"
                  helperText="Select nationality"
                />
                <Field.Text name="passport_no" label="Passport Number" />
                <Field.DatePicker name="issue_date" label="Issue Date" format="YYYY/MM/DD" />
                <Field.DatePicker name="expiry_date" label="Expiry Date" format="YYYY/MM/DD" />
              </Box>
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Update Co-Applicant
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

