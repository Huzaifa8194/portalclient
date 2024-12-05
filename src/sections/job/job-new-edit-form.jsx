import { z as zod } from 'zod';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';


import {
  _roles,
  JOB_SKILL_OPTIONS,
  JOB_BENEFIT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_EMPLOYMENT_TYPE_OPTIONS,
  JOB_WORKING_SCHEDULE_OPTIONS,
  FAMILY_CATEGORY_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewJobSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  content: zod.string().min(1, { message: 'Content is required!' }),
  employmentTypes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  role: schemaHelper.objectOrNull({
    message: { required_error: 'Role is required!' },
  }),
  skills: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  workingSchedule: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  locations: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  expiredDate: schemaHelper.date({
    message: { required_error: 'Expired date is required!' },
  }),
  salary: zod.object({
    price: zod.number().min(1, { message: 'Price is required!' }),
    // Not required
    type: zod.string(),
    negotiable: zod.boolean(),
  }),
  benefits: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  // Not required
  experience: zod.string(),
});

export function JobNewEditForm({ currentJob }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      title: currentJob?.title || '',
      content: currentJob?.content || '',
      employmentTypes: currentJob?.employmentTypes || [],
      experience: currentJob?.experience || '1 year exp',
      role: currentJob?.role || _roles[1],
      skills: currentJob?.skills || [],
      workingSchedule: currentJob?.workingSchedule || [],
      locations: currentJob?.locations || [],
      expiredDate: currentJob?.expiredDate || null,
      salary: currentJob?.salary || {
        type: 'Hourly',
        price: 0,
        negotiable: false,
      },
      benefits: currentJob?.benefits || [],
    }),
    [currentJob]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentJob ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.job.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Title</Typography>
          <Field.Text name="title" placeholder="Ex: Software Engineer..." />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional functions and attributes..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Employment type</Typography>
          <Field.MultiCheckbox
            row
            name="employmentTypes"
            options={JOB_EMPLOYMENT_TYPE_OPTIONS}
            sx={{ gap: 4 }}
          />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Experience</Typography>
          <Field.RadioGroup
            row
            name="experience"
            options={JOB_EXPERIENCE_OPTIONS}
            sx={{ gap: 4 }}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Role</Typography>
          <Field.Autocomplete
            name="role"
            autoHighlight
            options={_roles.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Skills</Typography>
          <Field.Autocomplete
            name="skills"
            placeholder="+ Skills"
            multiple
            disableCloseOnSelect
            options={JOB_SKILL_OPTIONS.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="info"
                  variant="soft"
                />
              ))
            }
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Working schedule</Typography>
          <Field.Autocomplete
            name="workingSchedule"
            placeholder="+ Schedule"
            multiple
            disableCloseOnSelect
            options={JOB_WORKING_SCHEDULE_OPTIONS.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="info"
                  variant="soft"
                />
              ))
            }
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Locations</Typography>
          <Field.CountrySelect multiple name="locations" placeholder="+ Locations" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Expired</Typography>

          <Field.DatePicker name="expiredDate" />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle2">Salary</Typography>

          <Controller
            name="salary.type"
            control={control}
            render={({ field }) => (
              <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                {[
                  {
                    label: 'Hourly',
                    icon: <Iconify icon="solar:clock-circle-bold" width={32} sx={{ mb: 2 }} />,
                  },
                  {
                    label: 'Custom',
                    icon: <Iconify icon="solar:wad-of-money-bold" width={32} sx={{ mb: 2 }} />,
                  },
                ].map((item) => (
                  <Paper
                    component={ButtonBase}
                    variant="outlined"
                    key={item.label}
                    onClick={() => field.onChange(item.label)}
                    sx={{
                      p: 2.5,
                      borderRadius: 1,
                      typography: 'subtitle2',
                      flexDirection: 'column',
                      ...(item.label === field.value && {
                        borderWidth: 2,
                        borderColor: 'text.primary',
                      }),
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Paper>
                ))}
              </Box>
            )}
          />

          <Field.Text
            name="salary.price"
            placeholder="0.00"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Switch name="salary.negotiable" label="Salary is negotiable" />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Benefits</Typography>
          <Field.MultiCheckbox
            name="benefits"
            options={JOB_BENEFIT_OPTIONS}
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ flexGrow: 1, pl: 3 }}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ ml: 2 }}
      >
        {!currentJob ? 'Create job' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>




      <Grid spacing={3}>




        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="caption"
              sx={{
                mt: 3,
                mb: 5,
                mx: 'auto',
                display: 'block',
                textAlign: 'left',
                color: 'gray',
              }}
            >
              Kindly add your family members here who are going to apply with you now or they are willing to apply in future.
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="displayName" label="Full Name" />


              <Field.Select native name="category" label="Relationship" InputLabelProps={{ shrink: true }}>
                {FAMILY_CATEGORY_OPTIONS.map((category) => (
                  <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Field.Select>
              <Field.Text name="passportno" label="Passport Number" />

              <Field.Text name="NID" label="National Identification Number - CPR - Personnummer" />

              <Field.DatePicker name="dateofbirth" label="Date of Birth" />
              <Field.DatePicker name="issuedate" label="Issue Date" />
              <Field.DatePicker name="expirydate" label="Expiry Date" />


              <Field.CountrySelect name="country" label="Nationality" placeholder="Choose a country" />
              <Field.CountrySelect name="country" label="Place of Birth" placeholder="Choose a country" />
              <Field.CountrySelect name="country" label="Currently Residing in" placeholder="Choose a country" />


              <Field.Text name="email" label="Email address" />





              <Field.Text name="address" label="Address" />

            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <Field.Text name="about" multiline rows={4} label="About" /> */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Add Co-Applicant
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>




    </Form>
  );
}
