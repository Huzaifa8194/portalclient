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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const ExperienceSchema = zod.object({
  fullName: zod.string().min(1, { message: 'Full Name is required!' }),
  emailAddress: zod.string().email({ message: 'Invalid email address' }),
  assignedExpert: zod.string().optional(),
  serviceUsed: zod.string().min(1, { message: 'Service Used is required!' }),
  qualityOfService: zod.string().min(1, { message: 'Quality of Service rating is required!' }),
  communicationAndResponsiveness: zod.string().min(1, { message: 'Communication and Responsiveness rating is required!' }),
  timelinessOfServiceDelivery: zod.string().min(1, { message: 'Timeliness of Service Delivery rating is required!' }),
  professionalismOfStaff: zod.string().min(1, { message: 'Professionalism of Staff rating is required!' }),
  transparencyInProcess: zod.string().min(1, { message: 'Transparency in Process rating is required!' }),
  customerSupportExperience: zod.string().min(1, { message: 'Customer Support Experience rating is required!' }),
  communicationWithOffice: zod.string().min(1, { message: 'Communication with the Office rating is required!' }),
  experienceDuringOfficeVisit: zod.string().min(1, { message: 'Experience During Office Visit rating is required!' }),
  satisfactionWithImmigrationServices: zod.string().optional(),
  satisfactionWithRelocationServices: zod.string().optional(),
  overallSatisfaction: zod.string().min(1, { message: 'Overall Satisfaction rating is required!' }),
  suggestionsForImprovement: zod.string().optional(),
  additionalComments: zod.string().optional(),
  wouldRecommend: zod.string().min(1, { message: 'Please indicate if you would recommend our services' }),
});

// ----------------------------------------------------------------------

export function PostNewEditForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      emailAddress: '',
      assignedExpert: '',
      serviceUsed: '',
      qualityOfService: '',
      communicationAndResponsiveness: '',
      timelinessOfServiceDelivery: '',
      professionalismOfStaff: '',
      transparencyInProcess: '',
      customerSupportExperience: '',
      communicationWithOffice: '',
      experienceDuringOfficeVisit: '',
      satisfactionWithImmigrationServices: '',
      satisfactionWithRelocationServices: '',
      overallSatisfaction: '',
      suggestionsForImprovement: '',
      additionalComments: '',
      wouldRecommend: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ExperienceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success('Experience feedback submitted successfully!');
      router.push(paths.dashboard.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const serviceUsedOptions = [
    { value: 'immigration', label: 'Immigration Services' },
    { value: 'relocation', label: 'Relocation Services' },
    { value: 'housing', label: 'International Housing' },
    { value: 'consultation', label: 'Consultation Services' },
    { value: 'thirdParty', label: '3rd Party Services' },
    { value: 'other', label: 'Other' },
  ];

  const ratingOptions = [
    { value: '1', label: 'Very Dissatisfied' },
    { value: '2', label: 'Dissatisfied' },
    { value: '3', label: 'Neutral' },
    { value: '4', label: 'Satisfied' },
    { value: '5', label: 'Very Satisfied' },
  ];

  const renderRatingField = (name, label) => (
    <Field.Select native name={name} label={label} InputLabelProps={{ shrink: true }}>
      <option value="">Select Rating</option>
      {ratingOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field.Select>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Experience Feedback Form
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Your feedback helps us improve our organization and enables us to assist you more effectively in the future.
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
                  width: '100%'
                },
                '& .MuiInputBase-root': {
                  minHeight: '56px'
                },
                '& .MuiInputLabel-root': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                },
                '& .full-width': {
                  gridColumn: '1 / -1'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2 }}>
                Personal Information
              </Typography>
              <Field.Text name="fullName" label="Full Name" />
              <Field.Text name="emailAddress" label="Email Address" />
              <Field.Text name="assignedExpert" label="Assigned Expert's Name (if known)" />
              <Field.Select native name="serviceUsed" label="Service Used" InputLabelProps={{ shrink: true }}>
                <option value="">Select Service Used</option>
                {serviceUsedOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Service Rating
              </Typography>
              <Typography variant="body2" sx={{ gridColumn: '1 / -1', mb: 2 }}>
                Please rate the following aspects of our service on a scale from 1 to 5:
              </Typography>
              {renderRatingField('qualityOfService', 'Quality of Service')}
              {renderRatingField('communicationAndResponsiveness', 'Communication and Responsiveness')}
              {renderRatingField('timelinessOfServiceDelivery', 'Timeliness of Service Delivery')}
              {renderRatingField('professionalismOfStaff', 'Professionalism of Staff')}
              {renderRatingField('transparencyInProcess', 'Transparency in Process')}
              {renderRatingField('customerSupportExperience', 'Customer Support Experience')}
              {renderRatingField('communicationWithOffice', 'Communication with the Office')}
              {renderRatingField('experienceDuringOfficeVisit', 'Experience During Office Visit')}
              {renderRatingField('satisfactionWithImmigrationServices', 'Satisfaction with Immigration Services (if applicable)')}
              {renderRatingField('satisfactionWithRelocationServices', 'Satisfaction with Relocation Services (if applicable)')}
              {renderRatingField('overallSatisfaction', 'Overall Satisfaction')}

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Suggestions for Improvement
              </Typography>
              <Field.Text
                name="suggestionsForImprovement"
                label="Please share any suggestions or comments on how we can improve our services"
                multiline
                rows={4}
                className="full-width"
              />

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Additional Comments
              </Typography>
              <Field.Text
                name="additionalComments"
                label="Additional Comments"
                multiline
                rows={4}
                className="full-width"
              />

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Recommendation
              </Typography>
              <RadioGroup
                name="wouldRecommend"
                sx={{ gridColumn: '1 / -1' }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit Feedback
              </LoadingButton>
            </Stack>
            {/* <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Thank you for sharing your valuable feedback. We are committed to ensuring transparency and delivering the highest quality of service in the future.
            </Typography> */}
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

