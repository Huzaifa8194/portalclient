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
import Alert from '@mui/material/Alert';

import { Form, Field } from 'src/components/hook-form';


const FormSchema = zod.object({
  location: zod.string().min(1, { message: 'Please select your location' }),
  personalStatus: zod.string().min(1, { message: 'Personal status is required' }),
  maritalStatus: zod.string().optional(),
  residencePermit: zod.string().optional(),
  personnummer: zod.string().optional(),
  investmentAmount: zod.string().optional(),
  separateAssets: zod.string().optional(),
  businessPlan: zod.string().min(1, { message: 'Please select if you have a business plan' }),
  buyBusiness: zod.string().optional(),
  businessPartner: zod.string().optional(),
  moveWithFamily: zod.string().optional(),
  schengenVisa: zod.string().optional(),
  visaRejection: zod.string().optional(),
  educationLevel: zod.string().optional(),
  educationCertificate: zod.string().optional(),
  relevantExperience: zod.string().optional(),
  currentBusiness: zod.string().optional(),
  swedishBusiness: zod.string().optional(),
  englishCertificate: zod.string().min(1, { message: 'English certificate information is required' }),
  swedishCertificate: zod.string().min(1, { message: 'Swedish certificate information is required' }),
});

function PostNewEditForm() {
  const defaultValues = useMemo(
    () => ({
      location: '',
      personalStatus: '',
      maritalStatus: '',
      residencePermit: '',
      personnummer: '',
      investmentAmount: '',
      separateAssets: '',
      businessPlan: '',
      buyBusiness: '',
      businessPartner: '',
      moveWithFamily: '',
      schengenVisa: '',
      visaRejection: '',
      educationLevel: '',
      educationCertificate: '',
      relevantExperience: '',
      currentBusiness: '',
      swedishBusiness: '',
      englishCertificate: '',
      swedishCertificate: '',
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

  const location = watch('location');
  const personalStatus = watch('personalStatus');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderFormFields = () => {
    if (location === 'in_sweden' && personalStatus === 'student') {
      return (
        <>
          <Field.Select
            native
            name="maritalStatus"
            label="Marital Status"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </Field.Select>
 
        </>
      );
    }

    if (location === 'in_sweden' && personalStatus === 'other') {
      return (
        <>
          <Field.Select
            native
            name="residencePermit"
            label="Do you have any valid residence permit in Sweden?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="personnummer"
            label="Do you have valid Personnummer?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="investmentAmount"
            label="How much are you planning to invest?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="less_than_100k">Less than 100,000 SEK</option>
            <option value="100k_500k">100,000 - 500,000 SEK</option>
            <option value="more_than_500k">More than 500,000 SEK</option>
          </Field.Select>

          <Field.Select
            native
            name="separateAssets"
            label="Do you have separate assets other than the investment to support yourself with the application?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
        </>
      );
    }

    if (location === 'outside_sweden') {
      return (
        <>
          <Field.Select
            native
            name="investment"
            label="Do you have separate assets other than the investment to support yourself with the application?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="educationLevel"
            label="Education Level"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="high_school">High School</option>
            <option value="bachelors">Bachelors Degree</option>
            <option value="masters">Masters Degree</option>
            <option value="phd">PhD</option>
          </Field.Select>
          <Field.Select
            native
            name="educationCertificate"
            label="Educational Certificate available"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
        
          <Field.Select
            native
            name="relevantjob"
            label="Did you have any relevant job or business experience in any other country?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="OwnBusiness"
            label="Did you currently owned business in any other country?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="swedishBusiness"
            label="Did you owned business in Sweden?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              EDUCATIONAL & BUSINESS BACKGROUND
            </Typography>
            <Alert severity="warning" sx={{ mb: 3 }}>
              Note: You must have documented knowledge of Swedish and/or English.
            </Alert>
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
                name="location"
                label="Choose Option"
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an option</option>
                <option value="in_sweden">I am in Sweden</option>
                <option value="outside_sweden">I am outside Sweden</option>
              </Field.Select>

              {location === 'in_sweden' && (
                <Field.Select
                  native
                  name="personalStatus"
                  label="Personal Status"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="">Choose an option</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </Field.Select>
              )}

              {renderFormFields()}
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3, mb: 2 }}>
                Business plan Assessment
              </Typography>
              <Field.Select
                native
                name="englishCertificate"
                label="Do you have already made your business plan?"
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>
              <Field.Select
            native
            name="buyBusiness"
            label="Do you want to buy a running business in sweden?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="businessPartner"
            label="Do you know someone in Sweden who is willing to start business together with you?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}

          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
           
          <Field.Select
            native
            name="moveWithFamily"
            label="Do you want to move along with your family?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="schengenVisa"
            label="Do you currently have any Schengen, UK & Ireland visa or any kind of residence permit of any Schengen states?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}

          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
          <Field.Select
            native
            name="visaRejection"
            label="Have you applied any sort of Schengen, UK & Ireland visa or residence permit in past 2 years and got rejected?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: '1 / -1' }}

          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Field.Select>
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3, mb: 2 }}>
                LANGUAGE SKILLS
              </Typography>

              <Field.Select
                native
                name="englishCertificate"
                label="Do you have English language certificate?"
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>

              <Field.Select
                native
                name="swedishCertificate"
                label="Do you have Swedish Language Certificate?"
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Choose an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field.Select>
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

export default PostNewEditForm;

