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

export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  coverUrl: schemaHelper.file({ message: { required_error: 'Cover is required!' } }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  metaKeywords: zod.string().array().nonempty({ message: 'Meta keywords is required!' }),
  metaTitle: zod.string(),
  metaDescription: zod.string(),
});

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

  const multiqsyn = [
    { value: '', label: 'Choose Option' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const isLongQuestion = (label) => label.split(' ').length > 12;

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
              Fill this form and submit only if you are an investor who want to be part of an active business or wants to invest on Entreprenuer ideas. We can help you to find the right properties to invest in. This service is paid to avoid unnecessary queries.
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
                  minHeight: '56px',
                },
                '& .MuiInputLabel-root': {
                  height: 'auto',
                  lineHeight: '1.2',
                  padding: '4px 0'
                }
              }}
            >
              {[
                { name: "question1", label: "Are you interested to invest in more than 50% shares?", type: "select" },
                { name: "question2", label: "Are you planning to invest in new business idea?", type: "select" },
                { name: "question3", label: "Are you interested to invest in property, housing, apartment, villas, which you can rent it out later?", type: "select" },
                { name: "question4", label: "Are you interested to invest in running business?", type: "select" },
                { name: "question5", label: "Are you interested to invest or buy Hotel, Motel, Franchises, grocery store etc?", type: "select" },
                { name: "question6", label: "Are you planning to invest for the profit?", type: "select" },
                { name: "question7", label: "Do you want to work as active partner?", type: "select" },
                { name: "question8", label: "Do you want to invest as sleeping partner?", type: "select" },
                { name: "question9", label: "Are you planning to move to sweden with this investment?", type: "text" },
                { name: "question10", label: "How often should you expect to meet after funding?", type: "text" },
                { name: "question11", label: "What do you expect this investment to do for your portfolio?", type: "text" },
                { name: "question12", label: "What's your timeline, How quickly you can invest?", type: "text" },
                { name: "question13", label: "How much are you going to invest, give us any numbers?", type: "text" },
                { name: "question14", label: "What is your top concern?", type: "text" },
                { name: "question15", label: "What's the first thing You'd want us to do as investor?", type: "text" },
                { name: "question16", label: "Did someone else need to approve your investment or you are the one who can approve this?", type: "text" },
                { name: "question17", label: "Would you like to tell us about your current investments?", type: "text" },
                { name: "question18", label: "Are you in EU citizen? If not, please do write you current country of residence and status in the country.", type: "text" },
                { name: "question19", label: "Are you currently running a good business and looking to open a branch office in Sweden?", type: "text" },
                { name: "question20", label: "Tell us more about yourself business plan and upload the documents on our online portal", type: "text" },
              ].map((question) => (
                question.type === "select" ? (
                  <Field.Select
                    key={question.name}
                    native
                    name={question.name}
                    label={question.label}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      gridColumn: isLongQuestion(question.label) ? '1 / -1' : 'auto',
                    }}
                  >
                    {multiqsyn.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>
                ) : (
                  <Field.Text
                    key={question.name}
                    name={question.name}
                    label={question.label}
                    multiline={isLongQuestion(question.label)}
                    rows={isLongQuestion(question.label) ? 2 : 1}
                    sx={{ 
                      gridColumn: isLongQuestion(question.label) ? '1 / -1' : 'auto',
                      '& .MuiInputBase-root': {
                        height: isLongQuestion(question.label) ? '80px' : 'auto'
                      }
                    }}
                  />
                )
              ))}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
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

