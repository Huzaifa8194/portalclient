import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Form } from 'src/components/hook-form';

const educationLevels = [
  { value: 'Higher Secondary Education', label: 'Higher Secondary Education' },
  { value: 'Intermediate O/A Levels', label: 'Intermediate O/A Levels' },
  { value: 'Under Graduate', label: 'Under Graduate' },
  { value: 'Master / Mphil/ Post Graduate', label: 'Master / Mphil/ Post Graduate' },
  { value: 'Other', label: 'Other' }
];

const proficiencyTests = [
  { value: 'IELTS', label: 'IELTS' },
  { value: 'TOEFL (Paper-based)', label: 'TOEFL (Paper-based)' },
  { value: 'TOEFL (Internet-based)', label: 'TOEFL (Internet-based)' },
  { value: 'Cambridge', label: 'Cambridge' },
  { value: 'Pearson', label: 'Pearson' },
  { value: 'Letter of Proficiency', label: 'Letter of Proficiency' },
  { value: 'Other', label: 'Other' }
];

const FormSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  email: z.string().email({ message: 'Must be a valid email' }),
  country: z.string().min(1, { message: 'Country is required' }),
  educationalLevel: z.string().min(1, { message: 'Educational level is required' }),
  totalYearsOfStudy: z.union([
    z.string().min(1, { message: 'Years of study is required' }),
    z.number(),
  ]),
    heSubject: z.string().optional(),
  heCompletionYear: z.string().optional(),
  hePercentage: z.string().optional(),
  heGrade: z.string().optional(),
  imSubject: z.string().optional(),
  imCompletionYear: z.string().optional(),
  imPercentage: z.string().optional(),
  imGrade: z.string().optional(),
  ugSubject: z.string().optional(),
  ugFromCompletionYear: z.string().optional(),
  ugToCompletionYear: z.string().optional(),
  ugPercentage: z.string().optional(),
  ugCGPA: z.string().optional(),
  ugGrade: z.string().optional(),
  masterSubject: z.string().optional(),
  masterFromCompletionYear: z.string().optional(),
  masterToCompletionYear: z.string().optional(),
  masterPercentage: z.string().optional(),
  masterCGPA: z.string().optional(),
  masterGrade: z.string().optional(),
  educationDescription: z.string().optional(),
  proficiencyTest: z.string().min(1, { message: 'Proficiency test is required' }),
  proficiencyScore: z.string().optional(),
  otherLanguage: z.string().optional(),
  otherDetails: z.string().optional(),
});

export default function PostCreateView() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      contactNo: '',
      email: '',
      country: '',
      educationalLevel: '',
      totalYearsOfStudy: '',
      heSubject: '',
      heCompletionYear: '',
      hePercentage: '',
      heGrade: '',
      imSubject: '',
      imCompletionYear: '',
      imPercentage: '',
      imGrade: '',
      ugSubject: '',
      ugFromCompletionYear: '',
      ugToCompletionYear: '',
      ugPercentage: '',
      ugCGPA: '',
      ugGrade: '',
      masterSubject: '',
      masterFromCompletionYear: '',
      masterToCompletionYear: '',
      masterPercentage: '',
      masterCGPA: '',
      masterGrade: '',
      educationDescription: '',
      proficiencyTest: '',
      proficiencyScore: '',
      otherLanguage: '',
      otherDetails: '',
    },
  });

  const educationalLevel = watch('educationalLevel');
  const proficiencyTest = watch('proficiencyTest');

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Form Data:', data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderEducationFields = () => {
    switch (educationalLevel) {
      case 'Higher Secondary Education':
        return (
          <>
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Higher Secondary Education (Matriculation)
            </Typography>
            <Controller
              name="heSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.heSubject}
                  helperText={errors.heSubject?.message}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="heCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Completion Year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.heCompletionYear}
                  helperText={errors.heCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="hePercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.hePercentage}
                  helperText={errors.hePercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="heGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.heGrade}
                  helperText={errors.heGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                </TextField>
              )}
            />
          </>
        );

      case 'Intermediate O/A Levels':
        return (
          <>
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Higher Secondary Education (Matriculation)
            </Typography>
            <Controller
              name="heSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.heSubject}
                  helperText={errors.heSubject?.message}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="heCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Completion Year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.heCompletionYear}
                  helperText={errors.heCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="hePercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.hePercentage}
                  helperText={errors.hePercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="heGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.heGrade}
                  helperText={errors.heGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A*">A*</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </TextField>
              )}
            />
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Intermediate / O-A Levels (F.A, I.Com, ICS, FSC, DAE, +2 Examination)
            </Typography>
            <Controller
              name="imSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.imSubject}
                  helperText={errors.imSubject?.message}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Pre-Medical">Pre-Medical</MenuItem>
                  <MenuItem value="Pre-Engineering">Pre-Engineering</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="imCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Completion Year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.imCompletionYear}
                  helperText={errors.imCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="imPercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.imPercentage}
                  helperText={errors.imPercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="imGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.imGrade}
                  helperText={errors.imGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A*">A*</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </TextField>
              )}
            />
          </>
        );

      case 'Under Graduate':
        return (
          <>
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Higher Secondary Education (Matriculation)
            </Typography>
            <Controller
              name="heSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.heSubject}
                  helperText={errors.heSubject?.message}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="heCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Completion Year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.heCompletionYear}
                  helperText={errors.heCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="hePercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.hePercentage}
                  helperText={errors.hePercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="heGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.heGrade}
                  helperText={errors.heGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                </TextField>
              )}
            />
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Intermediate / O-A Levels (F.A, I.Com, ICS, FSC, DAE, +2 Examination)
            </Typography>
            <Controller
              name="imSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.imSubject}
                  helperText={errors.imSubject?.message}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Pre-Medical">Pre-Medical</MenuItem>
                  <MenuItem value="Pre-Engineering">Pre-Engineering</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="imCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Completion Year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.imCompletionYear}
                  helperText={errors.imCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="imPercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.imPercentage}
                  helperText={errors.imPercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="imGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.imGrade}
                  helperText={errors.imGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A*">A*</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </TextField>
              )}
            />
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Under Graduate (B.A, B.Com, BBA, BCS, BIT, BSc, BE, BS, DVM, LLB)
            </Typography>
            <Controller
              name="ugSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.ugSubject}
                  helperText={errors.ugSubject?.message}
                  sx={{ gridColumn: '1 / -1' }}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="ugFromCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Degree start from"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.ugFromCompletionYear}
                  helperText={errors.ugFromCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="ugToCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Degree end year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.ugToCompletionYear}
                  helperText={errors.ugToCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="ugPercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.ugPercentage}
                  helperText={errors.ugPercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="ugCGPA"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="CGPA"
                  fullWidth
                  required
                  error={!!errors.ugCGPA}
                  helperText={errors.ugCGPA?.message}
                >
                  <MenuItem value="">Select CGPA</MenuItem>
                  {[...Array(26)].map((_, i) => {
                    const value = (1.5 + i * 0.1).toFixed(1);
                    return (
                      <MenuItem key={i} value={value}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Controller
              name="ugGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.ugGrade}
                  helperText={errors.ugGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </TextField>
              )}
            />
          </>
        );

      case 'Master / Mphil/ Post Graduate':
        return (
          <>
           <Controller
              name="ugSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.ugSubject}
                  helperText={errors.ugSubject?.message}
                  sx={{ gridColumn: '1 / -1' }}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="ugFromCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Degree start from"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.ugFromCompletionYear}
                  helperText={errors.ugFromCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="ugToCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Degree end year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.ugToCompletionYear}
                  helperText={errors.ugToCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="ugPercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.ugPercentage}
                  helperText={errors.ugPercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="ugCGPA"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="CGPA"
                  fullWidth
                  required
                  error={!!errors.ugCGPA}
                  helperText={errors.ugCGPA?.message}
                >
                  <MenuItem value="">Select CGPA</MenuItem>
                  {[...Array(26)].map((_, i) => {
                    const value = (1.5 + i * 0.1).toFixed(1);
                    return (
                      <MenuItem key={i} value={value}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Controller
              name="ugGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.ugGrade}
                  helperText={errors.ugGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </TextField>
              )} />
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Masters (M.A, M.Com, MS, MBBS, MSC, MBA, MIT, MSc, ME)
            </Typography>
            <Controller
              name="masterSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Subject"
                  fullWidth
                  required
                  error={!!errors.masterSubject}
                  helperText={errors.masterSubject?.message}
                  sx={{ gridColumn: '1 / -1' }}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="masterFromCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Degree start from"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.masterFromCompletionYear}
                  helperText={errors.masterFromCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="masterToCompletionYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Degree end year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  error={!!errors.masterToCompletionYear}
                  helperText={errors.masterToCompletionYear?.message}
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                />
              )}
            />
            <Controller
              name="masterPercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Percentage"
                  fullWidth
                  required
                  error={!!errors.masterPercentage}
                  helperText={errors.masterPercentage?.message}
                >
                  <MenuItem value="">Select Percentage</MenuItem>
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={`${(i + 1) * 10}`}>{`${(i + 1) * 10}%`}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="masterCGPA"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="CGPA"
                  fullWidth
                  required
                  error={!!errors.masterCGPA}
                  helperText={errors.masterCGPA?.message}
                >
                  <MenuItem value="">Select CGPA</MenuItem>
                  {[...Array(26)].map((_, i) => {
                    const value = (1.5 + i * 0.1).toFixed(1);
                    return (
                      <MenuItem key={i} value={value}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Controller
              name="masterGrade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Grade"
                  fullWidth
                  required
                  error={!!errors.masterGrade}
                  helperText={errors.masterGrade?.message}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </TextField>
              )}
            />
          </>
        );

      case 'Other':
        return (
          <>
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3 }}>
              Other Education
            </Typography>
            <Controller
              name="educationDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  label="Describe Your Education"
                  fullWidth
                  required
                  sx={{ gridColumn: '1 / -1' }}
                  error={!!errors.educationDescription}
                  helperText={errors.educationDescription?.message}
                />
              )}
            />
          </>
        );

      default:
        return null;
    }
  };

  const renderProficiencyFields = () => {
    if (proficiencyTest === 'Other') {
      return (
        <>
          <Controller
            name="otherLanguage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Other Language"
                placeholder="Please specify if you have any other official English Language test"
                multiline
                rows={3}
                fullWidth
                sx={{ gridColumn: '1 / -1' }}
                error={!!errors.otherLanguage}
                helperText={errors.otherLanguage?.message}
              />
            )}
          />
          <Controller
            name="otherDetails"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Other Details"
                placeholder="You can write anything which you believe can be helpful in your admission process"
                multiline
                rows={3}
                fullWidth
                sx={{ gridColumn: '1 / -1' }}
                error={!!errors.otherDetails}
                helperText={errors.otherDetails?.message}
              />
            )}
          />
        </>
      );
    }

    const scoreRanges = {
      'IELTS': '0-9',
      'TOEFL (Paper-based)': '310-677',
      'TOEFL (Internet-based)': '0-120',
      'Cambridge': 'A1-C2',
      'Pearson': '10-90',
      'Letter of Proficiency': 'N/A'
    };

    return proficiencyTest !== 'Letter of Proficiency' ? (
      <Controller
        name="proficiencyScore"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={`${proficiencyTest} Score (${scoreRanges[proficiencyTest]})`}
            fullWidth
            required
            sx={{ gridColumn: '1 / -1' }}
            error={!!errors.proficiencyScore}
            helperText={errors.proficiencyScore?.message}
          />
        )}
      />
    ) : null;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              EDUCATIONAL & BUSINESS BACKGROUND
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
              {/* Personal Details */}
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mb: 2 }}>
                Personal Details
              </Typography>

              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    required
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="contactNo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contact No"
                    placeholder="Contact No with Country Code"
                    required
                    error={!!errors.contactNo}
                    helperText={errors.contactNo?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    required
                    sx={{ gridColumn: '1 / -1' }}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              {/* Educational Background */}
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3, mb: 2 }}>
                Educational Background
              </Typography>

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Country"
                    fullWidth
                    required
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    <MenuItem value="Armenia">Armenia</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="educationalLevel"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Educational Level"
                    fullWidth
                    required
                    error={!!errors.educationalLevel}
                    helperText={errors.educationalLevel?.message}
                  >
                    {educationLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="totalYearsOfStudy"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Total no of years of study"
                    fullWidth
                    required
                    error={!!errors.totalYearsOfStudy}
                    helperText={errors.totalYearsOfStudy?.message}
                  >
                    <MenuItem value="">Select number of Years</MenuItem>
                    {[...Array(20)].map((_, i) => (
                      <MenuItem key={i + 1} value={`${i + 1}`}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {renderEducationFields()}

              {/* English Proficiency Test */}
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 3, mb: 2 }}>
                English Proficiency Test
              </Typography>

              <Controller
                name="proficiencyTest"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="English Language Proficiency Test"
                    fullWidth
                    required
                    error={!!errors.proficiencyTest}
                    helperText={errors.proficiencyTest?.message}
                    sx={{ gridColumn: '1 / -1' }}
                  >
                    {proficiencyTests.map((test) => (
                      <MenuItem key={test.value} value={test.value}>
                        {test.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {renderProficiencyFields()}
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
  )}
