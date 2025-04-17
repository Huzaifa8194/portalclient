"use client"

import { Box } from "@mui/material"
import { Field } from "src/components/hook-form"
import { useRef, useEffect, useCallback } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { countries } from "src/assets/data"

export function AddressInfoStep() {
  const autocompleteRef = useRef(null)
  const addressInputRef = useRef(null)
  const googleMapsLoaded = useRef(false)

  // Get the form methods from the parent form context
  const { setValue, getValues, control } = useFormContext()

  // Watch for changes to the country_id field
  const selectedCountry = useWatch({
    control,
    name: "country_id",
  })

  // Function to find country ID by label
  const findCountryIdByLabel = useCallback((countryLabel) => {
    if (!countryLabel) return null
    const country = countries.find((c) => c.label === countryLabel)
    return country ? Number(country.id) : null // Ensure it's a number
  }, [])

  const findCountryLabelById = useCallback((countryId) => {
    const country = countries.find((c) => c.id === Number(countryId))
    return country ? country.label : null
  }, [])

  const setCountryIdValue = useCallback(
    (countryId) => {
      setValue("country_id_value", countryId, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    },
    [setValue],
  )

  // Effect to handle manual country selection from dropdown
  useEffect(() => {
    if (selectedCountry) {
      const countryId = findCountryIdByLabel(selectedCountry)
      if (countryId) {
        setCountryIdValue(countryId)
      }
    }
  }, [selectedCountry, findCountryIdByLabel, setCountryIdValue])

  // Initialize Google Maps autocomplete for address field
  useEffect(() => {
    // Function to load Google Maps API
    const loadGoogleMapsAPI = () => {
      // Check if Google Maps API is already loaded
      if (window.google && window.google.maps && window.google.maps.places && googleMapsLoaded.current) {
        initializeAutocomplete()
        return
      }

      // Check if the script is already in the process of loading
      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
      if (existingScript) {
        // If script is already loading, wait for it to load
        existingScript.addEventListener("load", () => {
          googleMapsLoaded.current = true
          initializeAutocomplete()
        })
        return
      }

      // Create and load the script if it doesn't exist
      const script = document.createElement("script")
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAWOsJJP9SHiPLh_DSRHJIwdrXfY2WBNw&libraries=places"
      script.async = true
      script.defer = true
      script.onload = () => {
        googleMapsLoaded.current = true
        initializeAutocomplete()
      }
      document.head.appendChild(script)
    }

    // Function to initialize autocomplete
    const initializeAutocomplete = () => {
      // Wait for the DOM to be fully loaded and the input to be available
      setTimeout(() => {
        // Get the address input element
        const addressInput = document.getElementById("address")
        if (!addressInput) {
          console.error("Address input element not found")
          return
        }

        try {
          // Check if autocomplete is already initialized for this input
          if (autocompleteRef.current) {
            return
          }

          // Create the autocomplete instance
          const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
            types: ["address"],
          })

          // Apply custom styling to match MenuItem components
          const pacContainer = document.querySelector(".pac-container")
          if (pacContainer) {
            // Remove the observer if it exists
            if (window.autocompleteObserver) {
              window.autocompleteObserver.disconnect()
            }

            // Create a new observer to watch for the pac-container
            window.autocompleteObserver = new MutationObserver((mutations, observer) => {
              const container = document.querySelector(".pac-container")
              if (container) {
                // Apply custom styling to match MenuItem
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

                // Once we've styled it, we can disconnect the observer
                observer.disconnect()
              }
            })

            // Start observing the document body for the pac-container
            window.autocompleteObserver.observe(document.body, {
              childList: true,
              subtree: true,
            })
          }

          // Store the autocomplete instance in the ref
          autocompleteRef.current = autocomplete

          // Add a listener for place selection
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()

            if (!place.geometry) {
              console.log("Place details not found")
              return
            }

            console.log("Place selected:", place)

            // First, clear all related fields to ensure old values don't persist
            setValue("city", "", {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })

            setValue("postal_code", "", {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })

            setValue("country_id", "", {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })

            setCountryIdValue("")

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

            console.log("Extracted components:", { city, country, postalCode, streetNumber, route })

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

            console.log("Setting address to:", formattedAddress)

            // Set the address field with only the street information
            setValue("address", formattedAddress, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })

            // Only update city if it exists in the selected address
            if (city) {
              console.log("Setting city to:", city)
              setValue("city", city, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }

            // Only update postal code if it exists in the selected address
            if (postalCode) {
              console.log("Setting postal code to:", postalCode)
              setValue("postal_code", postalCode, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }

            // Only update country if it exists in the selected address
            if (country) {
              console.log("Looking up country ID for:", country)
              const countryId = findCountryIdByLabel(country)
              const countryName = findCountryLabelById(countryId)
              console.log("Found country ID:", countryId)

              if (countryName && countryId) {
                setCountryIdValue(countryId)
                setValue("country_id", countryName, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            }
          })
        } catch (error) {
          console.error("Error initializing Google Maps Autocomplete:", error)
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

      // Clean up the observer
      if (window.autocompleteObserver) {
        window.autocompleteObserver.disconnect()
      }
    }
  }, [setValue, findCountryIdByLabel, findCountryLabelById, setCountryIdValue])

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="address"
        label="Address / Office Location"
        required
        id="address"
        inputRef={addressInputRef}
        placeholder="Start typing your address..."
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Field.Text name="city" label="City" required />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Field.Text name="postal_code" label="Postal Code" required />
        </Box>
      </Box>

      <Field.CountrySelect
        name="country_id"
        label="Country of Residence / Business Operation"
        placeholder="Choose a country"
        required
      />
    </Box>
  )
}
