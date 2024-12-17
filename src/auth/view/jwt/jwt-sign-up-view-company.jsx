import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from '../../context/jwt';
import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';

// ----------------------------------------------------------------------



export const SignUpSchemaCompany = zod.object({
  name: zod.string().min(1, { message: 'Company name is required!' }),

  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),

  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),

  passwordConfirmation: zod
    .string()
    .min(1, { message: 'Password confirmation is required!' }),

  company_reg_no: zod.string().min(1, { message: 'Company registration number is required!' }),
  company_reg_date: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: 'Company registration date must be a valid date!' }),

  company_business_code: zod.string().min(1, { message: 'Business code is required!' }),
  company_web: zod
    .string()
    .url({ message: 'Company website must be a valid URL!' }),

  address: zod.string().min(1, { message: 'Address is required!' }),
  currently_residing: zod.string().min(1, { message: 'Country residing in is required!' }),

  company_no_of_employees: zod
    .string()
    .regex(/^\d+$/, { message: 'Number of employees must be a number!' }),

  company_certified_employer: zod
    .string()
    .refine((value) => ['Yes', 'No'].includes(value), { message: 'Certified employer must be Yes or No!' }),

  company_job_arbetsformedlingen: zod
    .string()
    .refine((value) => ['Yes', 'No'].includes(value), { message: 'Job Arbetsförmedlingen must be Yes or No!' }),

  company_collective_agreement: zod
    .string()
    .refine((value) => ['Yes', 'No'].includes(value), { message: 'Collective agreement must be Yes or No!' }),

  company_applied_work_permit: zod
    .string()
    .refine((value) => ['Yes', 'No'].includes(value), { message: 'Applied for work permit must be Yes or No!' }),

  company_hr_contact: zod
    .string()
    .regex(/^\+?\d{7,15}$/, { message: 'HR contact number must be a valid phone number!' }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords must match!',
  path: ['passwordConfirmation'],
});

// ----------------------------------------------------------------------

export function JwtSignUpViewCompany() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    firstName: 'Hello',
    lastName: 'Friend',
    email: 'hello@gmail.com',
    password: '@demo1',
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchemaCompany),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        nationality: data.nationality,
        placeOfBirth: data.placeofbirth,
        countryResiding: data.countryresiding,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        contactNumber: data.phonenumber,
      });

      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const YES_NO_OPTIONS = [
    { value: " ", label: "Choose Option" },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {/* Name and Email */}
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="name" label="Company Name" InputLabelProps={{ shrink: true }} />
        <Field.Text name="email" label="Email" InputLabelProps={{ shrink: true }} />
      </Box>

      {/* Password and Confirmation */}
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
        />
        <Field.Text
          name="passwordConfirmation"
          label="Confirm Password"
          placeholder="6+ characters"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Company Registration */}

      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="company_reg_no" label="Company Registration Number" InputLabelProps={{ shrink: true }} />
        <Field.DatePicker name="company_reg_date" label="Company Registration Date" InputLabelProps={{ shrink: true }} />
      </Box>
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="company_business_code" label="Business Code" InputLabelProps={{ shrink: true }} />
        <Field.Text name="company_web" label="Company Website" InputLabelProps={{ shrink: true }} />
      </Box>

      {/* Address and Location */}
      <Field.CountrySelect name="currently_residing" label="Country Residing In" InputLabelProps={{ shrink: true }} />
      <Field.Text name="address" label="Address" InputLabelProps={{ shrink: true }} />
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>


        {/* Company Specific Fields */}
        <Field.Text name="company_no_of_employees" label="Number of Employees" InputLabelProps={{ shrink: true }} />
      </Box>

      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Select native name="company_certified_employer" label="Certified Employer" InputLabelProps={{ shrink: true }}>
          {YES_NO_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field.Select>

        <Field.Select native name="company_job_arbetsformedlingen" label="Job Posted on Arbetsförmedlingen" InputLabelProps={{ shrink: true }}>
          {YES_NO_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field.Select>
      </Box>

      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>

        <Field.Select native name="company_collective_agreement" label="Collective Agreement" InputLabelProps={{ shrink: true }}>
          {YES_NO_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field.Select>

        <Field.Select native name="company_applied_work_permit" label="Applied for Work Permit" InputLabelProps={{ shrink: true }}>
          {YES_NO_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field.Select>
      </Box>

      {/* HR Contact */}
      <Field.Text name="company_hr_contact" label="HR Contact Number" InputLabelProps={{ shrink: true }} />

      {/* Submit Button */}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        Create account
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <SignUpTerms />
    </>
  );
}
