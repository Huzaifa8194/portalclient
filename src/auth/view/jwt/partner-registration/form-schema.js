import { z } from "zod"

// Define the form schema with Zod
export const formSchema = z
  .object({
    // Basic Information
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z.string().min(8, { message: "Password confirmation is required" }),
    business_type_id: z.string().min(1, { message: "Business type is required" }),
    website: z.string().optional(),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postal_code: z.string().optional(),
    country_id: z.string().min(1, { message: "Country is required" }),
    contact_number: z
      .string()
      .min(1, { message: "Phone number is required!" })
      .regex(/^\+\d{7,14}$/, { message: "Phone number must start with + and be followed by 7 to 14 digits" }),

    // Lawyer / Law Firm Fields
    lawyer_fields: z.array(z.string()).optional(),
    lawyerBars: z
      .array(
        z.object({
          registration_number: z.string().optional(),
          registration_year: z.string().optional(),
          bar_name: z.string().optional(),
          bar_country_id: z.string().optional(),
        }),
      )
      .optional(),

    // Accreditations
    is_accreditations: z.string().optional(),
    accreditations: z.array(z.string()).optional(),

    // Immigration Consultant / Firm Fields
    immigration_exp_handling_cases: z.string().optional(),
    immigration_countries: z.array(z.string()).optional(),

    // Company Information
    company_type_id: z.string().optional(),
    company_no_of_employees: z.string().optional(),
    company_eor: z.string().optional(),
    company_hr_services: z.string().optional(),
    company_specialize_business_immigration: z.string().optional(),
    company_registration_no: z.string().optional(),
    company_registration_date: z.string().optional(),
    company_business_code: z.string().optional(),

    // Freelancer Fields
    self_accreditation_or_experience: z.string().optional(),

    // University Fields
    university_type_id: z.string().optional(),
    uni_sc_person_name: z.string().optional(),
    uni_sc_person_designation: z.string().optional(),
    uni_sc_person_email: z.string().email().optional().or(z.literal("")),
    uni_sc_person_phone: z.string().optional(),
    uni_student_mobility_programs: z.string().optional(),
    uni_no_of_international_students_enrolled: z.string().optional(),
    uni_no_of_international_students_needs_immgration: z.string().optional(),
    uni_inter_student_via_us: z.string().optional(),
    uni_services_via_us: z.array(z.string()).optional(),
    uni_tailored_student_package: z.string().optional(),
    uni_integrate_relocators_services: z.string().optional(),
    collaboration_id: z.string().optional(),
    uni_challenges_intl_student: z.array(z.string()).optional(),
    uni_offer_housing: z.string().optional(),
    uni_integrate_relocators_housing_services: z.string().optional(),
    financial_aid_for_relocation: z.string().optional(),
    uni_gdpr_compliant_policies: z.string().optional(),
    uni_barriers_external_relocators: z.string().optional(),
    uni_formal_mou: z.string().optional(),
    uni_key_expectations: z.string().optional(),
    uni_preferred_state_date: z.string().optional(),

    // Specialization
    application_specialize: z.array(z.string()).optional(),

    // Citizenship by Investment
    citizenship_by_investment: z.string().optional(),
    cbi_applications: z.string().optional(),
    cbi_program_specialize: z.array(z.string()).optional(),

    // Fix for RadioGroup controlled/uncontrolled issue
    handles_cbi: z.string().optional(),
    has_accreditation_experience: z.string().optional(),
    provides_eor_services: z.string().optional(),
    offers_hr_compliance: z.string().optional(),
    specializes_business_immigration: z.string().optional(),
    terms_accepted: z.boolean().optional(),

    // Documents
    registration_doc: z.any().optional(),
    accreditation_doc: z.any().optional(),
    passport_doc: z.any().refine((val) => val !== undefined && val !== null, {
      message: "Passport document is required",
    }),
    business_license_doc: z.any().optional(),
    accreditation_certificate_doc: z.any().optional(),
    id_passport_doc: z.any().optional(),

    // Additional Information
    linkedln_url: z.string().optional(),
    references: z.string().optional(),
    linkedin_url: z.string().optional(),
    testimonials: z.string().optional(),
    is_term_accepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })

