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
import Paper from '@mui/material/Paper'; // Import Paper component
import Stack from '@mui/material/Stack'; // Import Stack component

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    email: 'moazateeq33@gmail.com',
    password: '12345678',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

      <Box gap={1.5} display="flex" flexDirection="column">
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

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
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
      
      <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight:"600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 400, md: 700, xl:1000 },
            p: { xs: 3, sm: 4 },
            border: "1px solid",
            minHeight:"600px",
            borderColor: "divider",
            gap:5,
            display: "flex",
            flexDirection: "column",
             justifyContent: "center",
            borderRadius: 2,
          }}
        >
          {/* Form Header */}
          <FormHead
            title="Sign in to your account"
            description={
              <>
                {`Don’t have an account? `}
                <Link component={RouterLink} href={paths.presignup} variant="subtitle2">
                  Get started
                </Link>
              </>
            }
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          />

          {/* Alert for Default Credentials */}
          <Alert severity="info" sx={{ mb: 3 }}>
            Use <strong>{defaultValues.email}</strong>
            {' with password '}
            <strong>{defaultValues.password}</strong>
          </Alert>

          {/* Error Message */}
          {!!errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMsg}
            </Alert>
          )}

          {/* Form */}
          <Form methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </Form>
        </Paper>
      </Box>
  );
}