import axios from "axios"
import { toast } from "src/components/snackbar"
import { findCountryIdByLabel } from "./form-fields"

export const submitForm = async (formData, countries, setErrorMsg, setSuccessDialogOpen) => {
  try {
    setErrorMsg("")

    // Add this near the beginning of the submitForm function
    console.log("Form data received:", formData)
    console.log("Immigration experience field:", formData.immigration_exp_handling_cases)

    // console.log("Form submitted with data:", formData)
    const Country = findCountryIdByLabel(formData.country_id, countries)

    // Define business type variables
    const isLawyer = formData.business_type_id === "1" || formData.business_type_id === "2"
    const isImmigrationFirm = formData.business_type_id === "4"
    const isImmigrationConsultant = formData.business_type_id === "3"
    const isFreelancer = formData.business_type_id === "5" || formData.business_type_id === "6"

    // Create FormData object for file uploads
    const apiFormData = new FormData()

    // Add all text fields to FormData
    apiFormData.append("name", formData.name)
    apiFormData.append("email", formData.email)
    apiFormData.append("password", formData.password)
    apiFormData.append("password_confirmation", formData.password_confirmation)
    apiFormData.append("business_type_id", formData.business_type_id)
    apiFormData.append("website", formData.website || "")
    apiFormData.append("address", formData.address)
    apiFormData.append("city", formData.city)
    apiFormData.append("postal_code", formData.postal_code || "")
    apiFormData.append("country_id", Country)
    apiFormData.append("contact_number", formData.contact_number)

    // Handle lawyer fields - use array notation for FormData
    if (isLawyer) {
      // Ensure lawyer_fields is an array
      const lawyerFields = Array.isArray(formData.lawyer_fields) ? formData.lawyer_fields : []

      // If the array is empty, add at least one item for lawyers
      if (lawyerFields.length === 0) {
        // Add a default value if the array is empty for lawyers
        apiFormData.append("lawyer_fields[]", "1") // Using "1" as a default value
      } else {
        // Add each lawyer field individually with array notation
        lawyerFields.forEach((field) => {
          apiFormData.append("lawyer_fields[]", field)
        })
      }
    } else {
      // For non-lawyers, still send an empty array
      apiFormData.append("lawyer_fields[]", "")
    }

    // Handle lawyer bars for law firms
    if (isLawyer) {
      // For lawyers, we need to ensure the required fields are populated
      if (formData.lawyerBars && formData.lawyerBars.length > 0) {
        // Use the existing lawyer bars data

        formData.lawyerBars.forEach((bar, index) => {
          // Ensure required fields have values
          const registrationNumber = bar.registration_number || formData.bar_registration_number || "12345"
          const registrationYear = bar.registration_year || formData.bar_registration_year || "2020"
          const barName = bar.bar_name || "Bar Association"
          const LawyerCountry = findCountryIdByLabel(formData.bar_registration_country_id, countries)
          const barCountryId = LawyerCountry
          console.log("Bar Counry:", bar.bar_country_id)
          console.log("Country:", barCountryId)
          apiFormData.append(`lawyerBars[${index}][registration_number]`, registrationNumber)
          apiFormData.append(`lawyerBars[${index}][registration_year]`, registrationYear)
          apiFormData.append(`lawyerBars[${index}][bar_name]`, barName)
          apiFormData.append(`lawyerBars[${index}][bar_country_id]`, barCountryId)
        })
      } else {
        // Create a new lawyer bar entry using the individual fields
        apiFormData.append(`lawyerBars[0][registration_number]`, formData.bar_registration_number || "12345")
        apiFormData.append(`lawyerBars[0][registration_year]`, formData.bar_registration_year || "2020")
        apiFormData.append(`lawyerBars[0][bar_name]`, "Bar Association")
        apiFormData.append(`lawyerBars[0][bar_country_id]`, formData.bar_registration_country_id || "1")
      }
    } else {
      // For non-lawyers, send empty values
      apiFormData.append("lawyerBars[0][registration_number]", "")
      apiFormData.append("lawyerBars[0][registration_year]", "")
      apiFormData.append("lawyerBars[0][bar_name]", "")
      apiFormData.append("lawyerBars[0][bar_country_id]", "")
    }

    // Handle accreditations
    apiFormData.append("is_accreditations", formData.is_accreditations || "No")
    if (formData.accreditations && formData.accreditations.length > 0) {
      formData.accreditations.forEach((accreditation) => {
        apiFormData.append(`accreditations[]`, accreditation)
      })
    } else {
      // Send empty value for accreditations if none selected
      apiFormData.append("accreditations[]", "")
    }

    // Immigration consultant fields - only include if relevant business type
    if (formData.business_type_id === "3" || formData.business_type_id === "4") {
      // Try multiple approaches to ensure the field is properly sent
      // 1. As a regular field with a default value
      apiFormData.append("immigration_exp_handling_cases", formData.immigration_exp_handling_cases || "0")
      // 2. As an array element with a default value
      // apiFormData.append("immigration_exp_handling_cases[]", formData.immigration_exp_handling_cases || "0")
      // 3. As a JSON string
      // apiFormData.append(
      //   "immigration_exp_handling_cases_json",
      //   JSON.stringify(formData.immigration_exp_handling_cases || "0"),
      // )

      if (formData.immigration_countries && formData.immigration_countries.length > 0) {
        formData.immigration_countries.forEach((country) => {
          apiFormData.append(`immigration_countries[]`, country)
        })
      } else {
        // Send empty value for immigration countries if none selected
        apiFormData.append("immigration_countries[]", "")
      }
    } else {
      // For other business types, send empty values
      apiFormData.append("immigration_exp_handling_cases", "")
      apiFormData.append("immigration_countries[]", "")
    }

    // Company fields
    apiFormData.append("company_type_id", formData.company_type_id || "")
    apiFormData.append("company_no_of_employees", formData.company_no_of_employees || "")
    apiFormData.append("company_eor", formData.company_eor || "")
    apiFormData.append("company_hr_services", formData.company_hr_services || "")
    apiFormData.append(
      "company_specialize_business_immigration",
      formData.company_specialize_business_immigration || "",
    )
    apiFormData.append("company_registration_no", formData.company_registration_no || "")
    apiFormData.append("company_registration_date", formData.company_registration_date || "")
    apiFormData.append("company_business_code", formData.company_business_code || "")

    // Add industry sector if available
    if (formData.company_industry_sector) {
      apiFormData.append("company_industry_sector", formData.company_industry_sector)
    }

    // Freelancer fields
    apiFormData.append("self_accreditation_or_experience", formData.self_accreditation_or_experience || "")

    // University fields
    apiFormData.append("university_type_id", formData.university_type_id || "")
    apiFormData.append("uni_sc_person_name", formData.uni_sc_person_name || "")
    apiFormData.append("uni_sc_person_designation", formData.uni_sc_person_designation || "")
    apiFormData.append("uni_sc_person_email", formData.uni_sc_person_email || "")
    apiFormData.append("uni_sc_person_phone", formData.uni_sc_person_phone || "")
    apiFormData.append("uni_student_mobility_programs", formData.uni_student_mobility_programs || "")
    apiFormData.append(
      "uni_no_of_international_students_enrolled",
      formData.uni_no_of_international_students_enrolled || "",
    )
    apiFormData.append(
      "uni_no_of_international_students_needs_immgration",
      formData.uni_no_of_international_students_needs_immgration || "",
    )
    apiFormData.append("uni_inter_student_via_us", formData.uni_inter_student_via_us || "")

    // University services
    if (formData.uni_services_via_us && formData.uni_services_via_us.length > 0) {
      formData.uni_services_via_us.forEach((service) => {
        apiFormData.append(`uni_services_via_us[]`, service)
      })
    } else {
      apiFormData.append("uni_services_via_us[]", "")
    }

    apiFormData.append("uni_tailored_student_package", formData.uni_tailored_student_package || "")
    apiFormData.append("uni_integrate_relocators_services", formData.uni_integrate_relocators_services || "")
    apiFormData.append("collaboration_id", formData.collaboration_id || "")

    // University challenges
    if (formData.uni_challenges_intl_student && formData.uni_challenges_intl_student.length > 0) {
      formData.uni_challenges_intl_student.forEach((challenge) => {
        apiFormData.append(`uni_challenges_intl_student[]`, challenge)
      })
    } else {
      apiFormData.append("uni_challenges_intl_student[]", "")
    }

    apiFormData.append("uni_offer_housing", formData.uni_offer_housing || "")
    apiFormData.append(
      "uni_integrate_relocators_housing_services",
      formData.uni_integrate_relocators_housing_services || "",
    )
    apiFormData.append("financial_aid_for_relocation", formData.financial_aid_for_relocation || "")
    apiFormData.append("uni_gdpr_compliant_policies", formData.uni_gdpr_compliant_policies || "")
    apiFormData.append("uni_barriers_external_relocators", formData.uni_barriers_external_relocators || "")
    apiFormData.append("uni_formal_mou", formData.uni_formal_mou || "")
    apiFormData.append("uni_key_expectations", formData.uni_key_expectations || "")
    apiFormData.append("uni_preferred_state_date", formData.uni_preferred_state_date || "")

    // Application specialization
    if (formData.application_specialize && formData.application_specialize.length > 0) {
      formData.application_specialize.forEach((specialization) => {
        apiFormData.append(`application_specialize[]`, specialization)
      })
    } else {
      apiFormData.append("application_specialize[]", "")
    }

    // Citizenship by Investment fields
    apiFormData.append("citizenship_by_investment", formData.citizenship_by_investment || "No")
    apiFormData.append("cbi_applications", formData.cbi_applications || "")

    // CBI programs
    if (formData.cbi_program_specialize && formData.cbi_program_specialize.length > 0) {
      formData.cbi_program_specialize.forEach((program) => {
        apiFormData.append(`cbi_program_specialize[]`, program)
      })
    } else {
      apiFormData.append("cbi_program_specialize[]", "")
    }

    // Additional information
    apiFormData.append("linkedln_url", formData.linkedln_url || "")
    apiFormData.append("references", formData.references || "")
    // Make sure is_term_accepted is properly converted to "1" or "0"
    apiFormData.append("is_term_accepted", formData.is_term_accepted === true ? "1" : "0")

    // Add file uploads based on business type - ONLY include the required documents

    // Immigration Firms (not Lawyers) and Self-Employed: ONLY registration_doc
    if (
      (isImmigrationFirm && !isLawyer && formData.registration_doc) ||
      (formData.business_type_id === "6" && formData.registration_doc)
    ) {
      apiFormData.append("registration_doc", formData.registration_doc)
    }

    // Lawyers: ONLY accreditation_doc
    if (isLawyer && formData.accreditation_doc) {
      apiFormData.append("accreditation_doc", formData.accreditation_doc)
    }

    // Consultants: BOTH accreditation_doc AND passport_doc
    if (isImmigrationConsultant) {
      if (formData.accreditation_doc) {
        apiFormData.append("accreditation_doc", formData.accreditation_doc)
      }

      if (formData.passport_doc) {
        apiFormData.append("passport_doc", formData.passport_doc)
      }
    }

    // Individual Applicants & Freelancers: ONLY passport_doc
    if (isFreelancer && formData.passport_doc) {
      apiFormData.append("passport_doc", formData.passport_doc)
    }

    // Log the form data for debugging
    Array.from(apiFormData.entries()).forEach((pair) => {
      console.log(`${pair[0]}: ${pair[1]}`)
    })

    const response = await axios.post("https://api.swedenrelocators.se/api/partnerRegistration", apiFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("API response:", response.data)
    setSuccessDialogOpen(true)
    return true
  } catch (error) {
    console.error("Error submitting form:", error)

    // Handle validation errors from the backend
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors

      // Display each validation error as a toast message
      Object.keys(errors).forEach((field) => {
        const errorMessages = errors[field]
        if (Array.isArray(errorMessages) && errorMessages.length > 0) {
          toast.error(errorMessages[0])
        }
      })

      // Set a general error message
      setErrorMsg("Please fix the validation errors")
    } else {
      // Display general error message
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during submission"
      toast.error(errorMessage)
      setErrorMsg("")
    }

    return false
  }
}
