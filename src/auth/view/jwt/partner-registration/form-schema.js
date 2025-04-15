import * as z from "zod"

export const formSchema = z.object({
  // Basic Information
  business_type_id: z.string().min(1, "Partner type is required"),
  partner_type_id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  website: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country_id: z.any().refine((val) => val !== null && val !== "", "Country is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  contact_number: z.string().min(1, "Contact number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string().min(1, "Please confirm your password"),

  // Lawyer Fields
  lawyer_fields: z.array(z.string()).optional(),
  bar_registration_number: z.string().optional(),
  bar_registration_year: z.string().optional(),
  bar_name: z.string().optional(),
  bar_registration_country_id: z.string().optional(),

  // Lawyer Bars
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

  // Immigration Consultant Fields
  immigration_exp_handling_cases: z.string().optional(),
  immigration_countries: z.array(z.string()).optional(),

  // Company Fields
  company_type_id: z.string().optional(),
  company_industry_sector: z.string().optional(),
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
  uni_sc_person_email: z.string().optional(),
  uni_sc_person_phone: z.string().optional(),
  uni_student_mobility_programs: z.string().optional(),
  uni_no_of_international_students_enrolled: z.string().optional(),
  uni_no_of_international_students_needs_immgration: z.string().optional(),
  uni_inter_student_via_us: z.string().optional(),
  uni_services_via_us: z.array(z.string()).min(1, "Please select at least one service"),
  uni_tailored_student_package: z.string().optional(),
  uni_integrate_relocators_services: z.string().optional(),
  collaboration_id: z.string().optional(),
  uni_challenges_intl_student: z.array(z.string()).min(1, "Please select at least one challenge"),
  uni_offer_housing: z.string().optional(),
  uni_integrate_relocators_housing_services: z.string().optional(),
  financial_aid_for_relocation: z.string().optional(),
  uni_gdpr_compliant_policies: z.string().optional(),
  uni_barriers_external_relocators: z.string().optional(),
  uni_formal_mou: z.string().optional(),
  uni_key_expectations: z.string().optional(),
  uni_preferred_state_date: z.any().optional(),

  // Specialization
  application_specialize: z.array(z.string()).optional(),

  // CBI
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
  passport_doc: z.any().optional(),

  // Additional
  linkedln_url: z.string().optional(),
  references: z.string().optional(),
  is_term_accepted: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
})
