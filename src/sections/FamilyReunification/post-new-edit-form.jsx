'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Form, Field } from 'src/components/hook-form';

const FormSchema = zod.object({
  isEuCitizen: zod.string().min(1, { message: 'Please select if you are an EU Citizen' }),
  citizenship: zod.string().optional(),
  permanentResidence: zod.string().optional(),
  plannedMove: zod.string().optional(),
  personnummer: zod.string().min(1, { message: 'Please select if you have a valid Personnummer' }),
  personnummerRejected: zod.string().min(1, { message: 'Please select if your Personnummer was rejected' }),
  apartment: zod.string().min(1, { message: 'Please select your apartment status' }),
  permanentStay: zod.string().min(1, { message: 'Please select if you plan to stay permanently' }),
  fullTimeWork: zod.string().min(1, { message: 'Please select your work status' }),
  familyVisa: zod.string().min(1, { message: 'Please select your family visa status' }),
  moveAlone: zod.boolean(),
});

export default function PostNewEditForm() {
  const defaultValues = useMemo(
    () => ({
      isEuCitizen: '',
      citizenship: '',
      permanentResidence: '',
      plannedMove: '',
      personnummer: '',
      personnummerRejected: '',
      apartment: '',
      permanentStay: '',
      fullTimeWork: '',
      familyVisa: '',
      moveAlone: false,
    }),
    []
  );

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const isEuCitizen = watch('isEuCitizen');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderFormFields = () => {
    if (isEuCitizen === 'yes') {
      return (
        <>
          <Field.Select
            native
            name="plannedMove"
            label="Are you already moved to Sweden or planning to move in coming 90 Days Period?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}
            required
          >
            <option value="">Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
        </>
      );
    }

    if (isEuCitizen === 'no') {
      return (
        <>
          <Field.Select
            native
            name="citizenship"
            label="Which Citizenship you have?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="other">Other</option>
          </Field.Select>
          <Field.Select
            native
            name="permanentResidence"
            label="Do you have permanent Residence permit from below mentioned countries?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="other">Other</option>
          </Field.Select>
        </>
      );
    }

    return null;
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 4 , borderRadius: 1 }}>
              Relocate to Sweden
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
              sx={{
                '& .MuiFormControl-root': {
                  width: '100%',
                },
                '& .MuiInputBase-root': {
                  minHeight: '56px',
                },
              }}
            >
              <Field.Select
                native
                name="isEuCitizen"
                label="Are you EU Citizen?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              {renderFormFields()}

              <Field.Select
                native
                name="personnummer"
                label="Do you have valid Personnummer in Sweden?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">No</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                native
                name="personnummerRejected"
                label="Did you applied for Personnummer and got rejected?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">No</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                native
                name="apartment"
                label="Do you have your own Apartment in Sweden OR do you have first hand rental apartment?"
                InputLabelProps={{ shrink: true }}
                sx={{ gridColumn: '1 / -1' }}
                required
              >
                <option value="">No</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                native
                name="permanentStay"
                label="Are you planning to stay permanently in Sweden?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">Yes</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                native
                name="fullTimeWork"
                label="Do you have full time work in Sweden or Denmark?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">Yes</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                native
                name="familyVisa"
                label="Did you applied for your family visa and got rejected?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">Yes</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Typography variant="h6" sx={{ 
                gridColumn: '1 / -1', 
                mt: 3, 
                borderRadius: 1 
              }}>
                Familiy Document Assessment
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    name="moveAlone"
                  />
                }
                label="I am single or I want to move by myself first"
                sx={{ gridColumn: '1 / -1' }}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit Form
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

