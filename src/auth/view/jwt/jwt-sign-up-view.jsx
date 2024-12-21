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

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),

  dateOfBirth: zod
    .string()
    .refine(
      (date) => !Number.isNaN(Date.parse(date)),
      { message: 'Date of birth must be a valid date!' }
    ),

  nationality: zod.string().min(1, { message: 'Nationality is required!' }),
  placeofbirth: zod.string().min(1, { message: 'Place of Birth is required!' }),
  countryresiding: zod.string().min(1, { message: 'Country Residing In is required!' }),

  address: zod.string().min(1, { message: 'Address is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),

  zipCode: zod
    .string()
    .regex(/^\d{4,6}$/, { message: 'Zip Code must be 4 to 6 digits!' })
    .min(1, { message: 'Zip Code is required!' }),

  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),

  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),

  phonenumber: zod
    .string()
    .min(1, { message: 'Phone number is required!' }) // Ensure not empty

});

// ----------------------------------------------------------------------

export function JwtSignUpView() {
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
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {

      console.log(data.phonenumber, "THIS IS THE PHONEN UMBER HERE")
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


  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="firstName" label="First name" InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label="Last name" InputLabelProps={{ shrink: true }} />

      </Box>



      <Field.Text name="email" label="Email" InputLabelProps={{ shrink: true }} />

      <Field.Text name="phonenumber" label="Phone number" InputLabelProps={{ shrink: true }} />


      <Field.DatePicker name="dateOfBirth" label="Date of birth" InputLabelProps={{ shrink: true }} />
      <Field.CountrySelect name="nationality" label="Nationality" InputLabelProps={{ shrink: true }} />


      <Field.CountrySelect name="placeofbirth" label="Place of Birth" InputLabelProps={{ shrink: true }} />
      <Field.CountrySelect name="countryresiding" label="Country Residing In" InputLabelProps={{ shrink: true }} />

      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="address" label="Address" InputLabelProps={{ shrink: true }} />
        <Field.Text name="city" label="City" InputLabelProps={{ shrink: true }} />

      </Box>



      <Field.Text name='zipCode' label="Zip Code" />






      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
