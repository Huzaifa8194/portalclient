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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const ComplaintSchema = zod.object({
  fullName: zod.string().min(1, { message: 'Full Name is required!' }),
  emailAddress: zod.string().email({ message: 'Invalid email address' }),
  phoneNumber: zod.string().optional(),
  typeOfService: zod.string().min(1, { message: 'Type of Service is required!' }),
  issueCategory: zod.string().min(1, { message: 'Issue Category is required!' }),
  urgencyLevel: zod.string().min(1, { message: 'Urgency Level is required!' }),
  issueDescription: zod.string().min(1, { message: 'Issue Description is required!' }),
  supportingDocuments: zod.any().optional(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      typeOfService: '',
      issueCategory: '',
      urgencyLevel: '',
      issueDescription: '',
      supportingDocuments: null,
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ComplaintSchema),
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
      toast.success('Complaint submitted successfully!');
      router.push(paths.dashboard.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const typeOfServiceOptions = [
    { value: 'immigration', label: 'Immigration Services' },
    { value: 'relocation', label: 'Relocation Services' },
    { value: 'housing', label: 'International Housing' },
    { value: 'consultation', label: 'Consultation Services' },
    { value: 'thirdParty', label: '3rd Party Services' },
    { value: 'other', label: 'Other' },
  ];

  const issueCategoryOptions = [
    { value: 'delay', label: 'Delay in Service' },
    { value: 'communication', label: 'Poor Communication' },
    { value: 'incorrectInfo', label: 'Incorrect Information Provided' },
    { value: 'billing', label: 'Billing/Payment Issues' },
    { value: 'staffBehavior', label: 'Staff Behavior' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'other', label: 'Other' },
  ];

  const urgencyLevelOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Complaint Submission Form
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Please fill out the form below to submit your complaint. Our team will address your concerns promptly.
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
              <Field.Text name="fullName" label="Full Name" />
              <Field.Text name="emailAddress" label="Email Address" />
              <Field.Text name="phoneNumber" label="Phone Number (Optional)" />
              <Field.Select native name="typeOfService" label="Type of Service" InputLabelProps={{ shrink: true }}>
                <option value="">Select Type of Service</option>
                {typeOfServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="issueCategory" label="Issue Category" InputLabelProps={{ shrink: true }}>
                <option value="">Select Issue Category</option>
                {issueCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="urgencyLevel" label="Urgency Level" InputLabelProps={{ shrink: true }}>
                <option value="">Select Urgency Level</option>
                {urgencyLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Text name="issueDescription" label="Detailed Description of the Issue" multiline rows={4} className="full-width" />
              <Field.Upload name="supportingDocuments" label="Attach Supporting Documents (Optional)" className="full-width" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit Complaint
              </LoadingButton>
            </Stack>
            {/* <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Thank you for taking the time to share your feedback. We are committed to resolving your concerns as quickly as possible.
            </Typography> */}
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

