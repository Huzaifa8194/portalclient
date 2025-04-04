"use client"

import { useMemo, useState, useCallback, useEffect, useRef } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"
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
  contact_number: zod.string().optional(),
  email: zod.string().email().optional(),
  address: zod.string().optional(),
  secondaryAddress: zod.string().optional(),
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

export function JobNewEditForm({ currentJob }) {
  const router = useRouter()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const autocompleteRef = useRef(null)
  const secondaryAutocompleteRef = useRef(null)

  // Function to find country ID by label
  const findCountryIdByLabel = useCallback((countryLabel) => {
    const country = countries.find((c) => c.label === countryLabel)
    return country ? country.id : null
  }, [])

  // Fetch family member data

  const defaultValues = useMemo(() => {
    // Function to find country label by ID (defined before the return)
    const findCountryLabelById = (countryId) => {
      const country = countries.find((c) => c.id === Number(countryId))
      return country ? country.label : null
    }

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
      secondaryAddress: "",
    }
  }, [])

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(FamilyMemberSchema),
    defaultValues,
  })

  // Initialize Google Maps autocomplete
  useEffect(() => {
    // Function to load Google Maps API
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete()
      } else {
        const script = document.createElement("script")
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAWOsJJP9SHiPLh_DSRHJIwdrXfY2WBNw&libraries=places"
        script.async = true
        script.defer = true
        script.onload = initializeAutocomplete
        document.head.appendChild(script)
      }
    }

    // Function to initialize autocomplete
    const initializeAutocomplete = () => {
      // Wait for the DOM to be fully loaded and the input to be available
      setTimeout(() => {
        // Get the address input elements
        const addressInput = document.getElementById("address")
        const secondaryAddressInput = document.getElementById("secondaryAddress")

        if (!addressInput && !secondaryAddressInput) {
          console.error("Address input elements not found")
          return
        }

        // Initialize primary address autocomplete
        if (addressInput) {
          try {
            // Create the autocomplete instance
            const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
              types: ["address"],
            })

            // Store the autocomplete instance in the ref
            autocompleteRef.current = autocomplete

            // Add a listener for place selection
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace()

              if (!place.geometry) {
                console.log("Place details not found")
                return
              }

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

              // Set form values using the form methods
              methods.setValue("address", formattedAddress)

              // Always set city and postal code - empty if not found
              methods.setValue("city", city || "")
              methods.setValue("postalCode", postalCode || "")

              // Update country if found
              if (country) {
                const countryId = findCountryIdByLabel(country)
                if (countryId) {
                  const countryLabel = countries.find((c) => c.id === countryId)?.label
                  if (countryLabel) {
                    methods.setValue("country", countryLabel)
                  }
                }
              } else {
                methods.setValue("country", null)
              }
            })
          } catch (error) {
            console.error("Error initializing Google Maps Autocomplete for primary address:", error)
          }
        }

        // Initialize secondary address autocomplete
        if (secondaryAddressInput) {
          try {
            // Create the autocomplete instance for secondary address
            const secondaryAutocomplete = new window.google.maps.places.Autocomplete(secondaryAddressInput, {
              types: ["address"],
            })

            // Store the autocomplete instance in the ref
            secondaryAutocompleteRef.current = secondaryAutocomplete

            // Add a listener for place selection
            secondaryAutocomplete.addListener("place_changed", () => {
              const place = secondaryAutocomplete.getPlace()

              if (!place.geometry) {
                console.log("Place details not found for secondary address")
                return
              }

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

              // Format the address to include the full formatted address
              methods.setValue("secondaryAddress", place.formatted_address)

              // Update city field - set to empty if not found
              methods.setValue("city", city || "")

              // Update postal code field - set to empty if not found
              methods.setValue("postalCode", postalCode || "")

              // Update country if found
              if (country) {
                const countryId = findCountryIdByLabel(country)
                if (countryId) {
                  const countryLabel = countries.find((c) => c.id === countryId)?.label
                  if (countryLabel) {
                    methods.setValue("country", countryLabel)
                  }
                }
              } else {
                methods.setValue("country", null)
              }
            })
          } catch (error) {
            console.error("Error initializing Google Maps Autocomplete for secondary address:", error)
          }
        }

        // Apply custom styling to match MenuItem components
        const applyCustomStyling = () => {
          const pacContainers = document.querySelectorAll(".pac-container")

          pacContainers.forEach((container) => {
            container.style.zIndex = "1500"
            container.style.borderRadius = "4px"
            container.style.boxShadow =
              "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
            container.style.backgroundColor = "white"
            container.style.border = "1px solid rgba(0, 0, 0, 0.12)"
            container.style.marginTop = "8px"

            // Style the items
            const items = container.querySelectorAll(".pac-item")
            items.forEach((item) => {
              item.style.padding = "6px 16px"
              item.style.fontSize = "1rem"
              item.style.fontFamily = '"Roboto","Helvetica","Arial",sans-serif'
              item.style.lineHeight = "1.5"
              item.style.transition = "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"

              // Add hover effect
              item.addEventListener("mouseenter", () => {
                item.style.backgroundColor = "rgba(0, 0, 0, 0.04)"
              })
              item.addEventListener("mouseleave", () => {
                item.style.backgroundColor = "transparent"
              })
            })
          })
        }

        // Create a mutation observer to watch for the pac-container
        if (window.autocompleteObserver) {
          window.autocompleteObserver.disconnect()
        }

        window.autocompleteObserver = new MutationObserver((mutations) => {
          const pacContainer = document.querySelector(".pac-container")
          if (pacContainer) {
            applyCustomStyling()
          }
        })

        // Start observing the document body
        window.autocompleteObserver.observe(document.body, {
          childList: true,
          subtree: true,
        })

        // Add focus event listeners to ensure styling is applied
        if (addressInput) {
          addressInput.addEventListener("focus", () => {
            setTimeout(applyCustomStyling, 300)
          })
        }

        if (secondaryAddressInput) {
          secondaryAddressInput.addEventListener("focus", () => {
            setTimeout(applyCustomStyling, 300)
          })
        }
      }, 500)
    }

    // Load the API
    loadGoogleMapsAPI()

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current)
        autocompleteRef.current = null
      }
      if (secondaryAutocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(secondaryAutocompleteRef.current)
        secondaryAutocompleteRef.current = null
      }
      if (window.autocompleteObserver) {
        window.autocompleteObserver.disconnect()
      }
    }
  }, [findCountryIdByLabel, methods])

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

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
      apiData.append("secondary_address", data.secondaryAddress || "")

      apiData.append("nic", data.nic || "")
      apiData.append("passport_no", data.passport_no || "")
      apiData.append("dob", data.dob || "")
      apiData.append("issue_date", data.issue_date || "")
      apiData.append("expiry_date", data.expiry_date || "")

      await axios.post(`https://api.swedenrelocators.se/api/client/familyMember/add`, apiData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Co-Applicant added successfully!")
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
                Fill in details of a co-applicant to add.
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
                <Field.Phone name="contact_number" label="Contact Number" />
                <Field.Text name="email" label="Email address" />
                <Field.Text name="address" label="Address" id="address" />
                <Field.Text name="secondaryAddress" label="Secondary Address" id="secondaryAddress" />
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
                  Add Co-applicant
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

