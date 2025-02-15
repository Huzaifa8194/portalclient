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
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { Form, Field } from 'src/components/hook-form';

const FormSchema = zod.object({
  citizenship: zod.string().min(1, { message: 'Citizenship is required' }),
  permanentResidence: zod.string().min(1, { message: 'Permanent residence status is required' }),
  jobOffer: zod.string().min(1, { message: 'Job offer status is required' }),
  startBusiness: zod.string().min(1, { message: 'Business intention is required' }),
  movePlanning: zod.string().min(1, { message: 'Move planning status is required' }),
  moveWithFamily: zod.string().min(1, { message: 'Family move status is required' }),
  marriageCertificate: zod.string().optional(),
  marriageRegistration: zod.string().optional(),
  familyRegistration: zod.string().optional(),
  childrenCount: zod.string().optional(),
  fromCountry: zod.string().optional(),
  toCountry: zod.string().optional(),
  currency: zod.string().optional(),
});

export default function PostNewEditForm() {
  const defaultValues = useMemo(
    () => ({
      citizenship: 'Algeria',
      permanentResidence: 'Belgium',
      jobOffer: 'No',
      startBusiness: 'Yes',
      movePlanning: 'No',
      moveWithFamily: 'No',
      marriageCertificate: '',
      marriageRegistration: '',
      familyRegistration: '',
      childrenCount: '',
      fromCountry: '',
      toCountry: '',
      currency: '',
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

  const moveWithFamily = watch('moveWithFamily');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
                  Long Term EU Status
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
                name="citizenship"
                label="Citizenship"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="Algeria">Algeria</option>
                <option value="other">Other</option>
              </Field.Select>

              <Field.Select
                native
                name="permanentResidence"
                label="Do you have Permanent Residence?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="Belgium">Belgium</option>
                <option value="other">Other</option>
              </Field.Select>

              <Field.Select
                native
                name="jobOffer"
                label="Do you have job offer in Sweden?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Field.Select>

              <Field.Select
                native
                name="startBusiness"
                label="Do you want to start your own business in Sweden?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Field.Select>

              <Field.Select
                native
                name="movePlanning"
                label="Are you already moved to Sweden or planning to move in coming 90 Days Period?"
                InputLabelProps={{ shrink: true }}
                required
                sx={{ gridColumn: '1 / -1' }}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Field.Select>

              <Field.Select
                native
                name="moveWithFamily"
                label="Do you want to move to Sweden with family?"
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Field.Select>

              {moveWithFamily === 'Yes' && (
                <>
                  <Field.Select
                    native
                    name="marriageCertificate"
                    label="Do you have marriage certificate?"
                    InputLabelProps={{ shrink: true }}
                    required
                  >
                    <option value="">Choose an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field.Select>

                  <Field.Select
                    native
                    name="marriageRegistration"
                    label="Is your marriage registered in your home country?"
                    InputLabelProps={{ shrink: true }}
                    required
                  >
                    <option value="">Choose an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field.Select>

                  <Field.Select
                    native
                    name="familyRegistration"
                    label="Do you have family registration certificate?"
                    InputLabelProps={{ shrink: true }}
                    required
                  >
                    <option value="">Choose an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field.Select>

                  <Field.Select
                    native
                    name="childrenCount"
                    label="How many children do you have?"
                    InputLabelProps={{ shrink: true }}
                    required
                  >
                    <option value="">Choose an Option</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4 or more</option>
                  </Field.Select>
                </>
              )}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit Form
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              IMP INFO
            </Typography>
            
            <Box sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              mb: 3
            }}>
              <Stack spacing={2}>
                <Field.Select
                  native
                  name="fromCountry"
                  label="From"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="">Select Country</option>
                  <option value="sweden">Sweden</option>
                  <option value="other">Other</option>
                </Field.Select>

                <Field.Select
                  native
                  name="toCountry"
                  label="To"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="">Select Country</option>
                  <option value="sweden">Sweden</option>
                  <option value="other">Other</option>
                </Field.Select>
                <Field.Select
              native
              name="currency"
              label="Currency"
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select Currency</option>
              <option value="sek">SEK</option>
              <option value="eur">EUR</option>
              <option value="usd">USD</option>
            </Field.Select>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}