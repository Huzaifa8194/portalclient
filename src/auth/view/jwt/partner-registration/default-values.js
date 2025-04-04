export const defaultValues = {
    business_type_id: "", // Ensure this is an empty string, not undefined
    partner_type_id: "", // Add this field with empty string
    name: "",
    website: "",
    address: "",
    city: "",
    country_id: null,
    postal_code: "",
    email: "",
    contact_number: "",
    password: "",
    password_confirmation: "",
  
    // Lawyer Fields
    lawyer_fields: [],
    bar_registration_number: "",
    bar_registration_year: "",
    bar_name: "",
    bar_registration_country_id: "",
  
    // Lawyer Bars
    lawyerBars: [
      {
        registration_number: "",
        registration_year: "",
        bar_name: "Bar 1",
        bar_country_id: "",
      },
    ],
  
    // Accreditations
    is_accreditations: "No",
    accreditations: [],
  
    // Immigration Consultant Fields
    immigration_exp_handling_cases: "",
    immigration_countries: [],
  
    // Company Fields
    company_type_id: "",
    company_industry_sector: "", // Added this field
    company_no_of_employees: "",
    company_eor: "",
    company_hr_services: "",
    company_specialize_business_immigration: "",
    company_registration_no: "",
    company_registration_date: "",
    company_business_code: "",
  
    // Freelancer Fields
    self_accreditation_or_experience: "",
  
    // University Fields
    university_type_id: "",
    uni_sc_person_name: "",
    uni_sc_person_designation: "",
    uni_sc_person_email: "",
    uni_sc_person_phone: "",
    uni_student_mobility_programs: "",
    uni_no_of_international_students_enrolled: "",
    uni_no_of_international_students_needs_immgration: "",
    uni_inter_student_via_us: "",
    uni_services_via_us: [],
    uni_tailored_student_package: "",
    uni_integrate_relocators_services: "",
    collaboration_id: "",
    uni_challenges_intl_student: [],
    uni_offer_housing: "",
    uni_integrate_relocators_housing_services: "",
    financial_aid_for_relocation: "",
    uni_gdpr_compliant_policies: "",
    uni_barriers_external_relocators: "",
    uni_formal_mou: "",
    uni_key_expectations: "",
    uni_preferred_state_date: "",
  
    // Specialization
    application_specialize: [],
  
    // CBI
    citizenship_by_investment: "No",
    cbi_applications: "",
    cbi_program_specialize: [],
  
    // Fix for RadioGroup controlled/uncontrolled issue
    handles_cbi: "No",
    has_accreditation_experience: "No",
    provides_eor_services: "No",
    offers_hr_compliance: "No",
    specializes_business_immigration: "No",
    terms_accepted: false,
  
    // Documents
    registration_doc: null,
    accreditation_doc: null,
    passport_doc: null,
  
    // Additional
    linkedln_url: "",
    references: "",
    is_term_accepted: false,
  }
  
  