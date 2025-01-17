import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import {
  _tags,
  APPOINTMENT_TYPE_OPTIONS,
  APPOINTMENT_CATEGORY_OPTIONS,
  APPOINTMENT_COUNTRY_OPTIONS,
  APPOINTMENT_TIME_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { PostDetailsPreview } from './post-details-preview';

// ----------------------------------------------------------------------









export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  coverUrl: schemaHelper.file({ message: { required_error: 'Cover is required!' } }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  metaKeywords: zod.string().array().nonempty({ message: 'Meta keywords is required!' }),
  // Not required
  metaTitle: zod.string(),
  metaDescription: zod.string(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const router = useRouter();

  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      content: currentPost?.content || '',
      coverUrl: currentPost?.coverUrl || null,
      tags: currentPost?.tags || [],
      metaKeywords: currentPost?.metaKeywords || [],
      metaTitle: currentPost?.metaTitle || '',
      metaDescription: currentPost?.metaDescription || '',
    }),
    [currentPost]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      preview.onFalse();
      toast.success(currentPost ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.post.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);


  const multiqs1 = [
    { value: '', label: 'Choose Option' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'dontknow', label: 'Dont Know' },

  ];


  const multiqs2 = [
    { value: '', label: 'Choose Option' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '8' },
    { value: '10', label: '8' },

  ];

  const multiqs3 = [
    { value: '', label: 'Choose Option' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const multiqs4 = [
    { value: '', label: 'Choose Option' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const multiqs5 = [
    { value: '', label: 'Choose Option' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];


  const multiqs6 = [
    { value: '', label: 'Choose Option' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Post title" />

        <Field.Text name="description" label="Description" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <Field.Upload name="coverUrl" maxSize={3145728} onDelete={handleRemoveFile} />
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
        <Field.Autocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
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

        <Field.Text name="metaTitle" label="Meta title" />

        <Field.Text name="metaDescription" label="Meta description" fullWidth multiline rows={3} />

        <Field.Autocomplete
          name="metaKeywords"
          label="Meta keywords"
          placeholder="+ Keywords"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
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

        <FormControlLabel
          control={<Switch defaultChecked inputProps={{ id: 'comments-switch' }} />}
          label="Enable comments"
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <div>
        <Button color="inherit" variant="outlined" size="large" onClick={preview.onTrue}>
          Preview
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'Create post' : 'Save changes'}
        </LoadingButton>
      </div>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            {/* <Typography
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
              Fill this form and submit only if you are an Entrepreneur or already have any Start-up. We will help you to expand your idea or business by providing you right investors. This service is paid to avoid unnecessary queries.
            </Typography> */}
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
              <Field.Text name="question1" label="What do you want out of this experience?" />
              <Field.Text name="question2" label="What is your dream job?" />
              <Field.Text name="question3" label="Where do you go on a night out?" />

              <Field.Text name="question4" label="How can you make the company better?" />

              <Field.Text name="question5" label="Which three adjectives, Describe your strengths?" />

              <Field.Text name="question6" label="What do you want on your resume in next Two Years?" />

              <Field.Text name="question7" label="What Would You Do with unlimited resources?" />

              <Field.Text name="question8" label="Why an investor should invest on you?" />

              <Field.Text name="question9" label="What shares you want to offer an investor in a company?" />

              <Field.Text 
                name="question10" 
                label="Are you looking for a sleeping investor or an active investor partner?" 
                className="full-width"
                sx={{ 
                  width: '100%',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'normal',
                    maxWidth: 'none'
                  }
                }} 
              />

              <Field.Text name="question11" label="How many languages you can speak?" />

              <Field.Text name="question12" label="Which country and city would you prefer for this business?" />

              <Field.Text 
                name="question13" 
                label="Do you have ability to manage the business or did you run any business before?" 
                className="full-width"
                sx={{ 
                  width: '100%',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'normal',
                    maxWidth: 'none'
                  }
                }} 
              />

              <Field.Text name="question14" label="Did import export involve in this business?" />

              <Field.Text name="question15" label="Do you own a house, apartment or living in rental apartment?" />
              <Field.Text name="question16" label="What are you doing for living?" />




              {/* APPOINTMENT_TYPE_OPTIONS,
  APPOINTMENT_CATEGORY_OPTIONS,
  APPOINTMENT_COUNTRY_OPTIONS,
  APPOINTMENT_TIME_OPTIONS, */}



              <Field.Select native name="question17" label="Are you friends happy with your business idea?" InputLabelProps={{ shrink: true }}>
                {multiqs1.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>



              <Field.Select 
                native 
                name="question18" 
                label="How you will rate your confidence and communication level (1-10)?" 
                InputLabelProps={{ shrink: true }}
                className="full-width"
              >
                {multiqs2.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>


              <Field.Text name="question19" label="What amount would be enough to start this business?" />



              <Field.Select native name="question20" label="Are you currently in Europe on study or on work permit?" InputLabelProps={{ shrink: true }}>
                {multiqs3.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select 
                native 
                name="question21" 
                label="Do you own a business and looking to start new branch with an investor?" 
                InputLabelProps={{ shrink: true }}
                className="full-width"
              >
                {multiqs4.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>


              <Field.Select native name="question22" label="Did your business base outside of Europe?" InputLabelProps={{ shrink: true }}>
                {multiqs5.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="question23" label="Do you have an E-Commerce business idea?" InputLabelProps={{ shrink: true }}>
                {multiqs6.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>


              <Field.Text 
                name="question24" 
                label="Tell us more about yourself business plan and upload the documents on our online portal" 
                multiline
                rows={3}
                className="full-width"
                sx={{ 
                  width: '100%',
                  '& .MuiInputBase-root': {
                    minHeight: '100px'
                  },
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'normal',
                    maxWidth: 'none'
                  }
                }} 
              />





            </Box>





            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <Field.Text name="about" multiline rows={4} label="About" /> */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Send Request
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

