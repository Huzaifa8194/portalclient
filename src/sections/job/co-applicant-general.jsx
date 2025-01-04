// import { z as zod } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { isValidPhoneNumber } from 'react-phone-number-input/input';



// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { fData } from 'src/utils/format-number';

// import { toast } from 'src/components/snackbar';
// import { Form, Field, schemaHelper } from 'src/components/hook-form';

// import { useMockedUser } from 'src/auth/hooks';
// import { AppWidgetSummary } from '../account/app-widget-summary';

// // ----------------------------------------------------------------------

// export const UpdateUserSchema = zod.object({
//   displayName: zod.string().min(1, { message: 'Name is required!' }),
//   email: zod
//     .string()
//     .min(1, { message: 'Email is required!' })
//     .email({ message: 'Email must be a valid email address!' }),
//   photoURL: schemaHelper.file({
//     message: { required_error: 'Avatar is required!' },
//   }),
//   phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
//   country: schemaHelper.objectOrNull({
//     message: { required_error: 'Country is required!' },
//   }),
//   address: zod.string().min(1, { message: 'Address is required!' }),
//   state: zod.string().min(1, { message: 'State is required!' }),
//   city: zod.string().min(1, { message: 'City is required!' }),
//   zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
//   about: zod.string().min(1, { message: 'About is required!' }),
//   // Not required
//   isPublic: zod.boolean(),
// });

// export default function AccountGeneral() {
//   const { user } = useMockedUser();

//   const defaultValues = {
//     displayName: user?.displayName || '',
//     email: user?.email || '',
//     photoURL: user?.photoURL || null,
//     phoneNumber: user?.phoneNumber || '',
//     country: user?.country || '',
//     address: user?.address || '',
//     state: user?.state || '',
//     city: user?.city || '',
//     zipCode: user?.zipCode || '',
//     about: user?.about || '',
//     isPublic: user?.isPublic || false,
//   };

//   const methods = useForm({
//     mode: 'all',
//     resolver: zodResolver(UpdateUserSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       toast.success('Update success!');
//       console.info('DATA', data);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   return (


//     <>

//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid xs={12} md={4}>
//           <AppWidgetSummary
//             title="User ID:"
//             codeicon={
//               <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
//                 <g fill="none" stroke="#5ee943" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="#5ee943">
//                   <path d="M8.5 18c1.813-1.954 5.167-2.046 7 0m-1.56-6c0 1.105-.871 2-1.947 2c-1.075 0-1.947-.895-1.947-2s.872-2 1.947-2s1.948.895 1.948 2" />
//                   <path d="M9.5 4.002c-2.644.01-4.059.102-4.975.97C3.5 5.943 3.5 7.506 3.5 10.632v4.737c0 3.126 0 4.69 1.025 5.66c1.025.972 2.675.972 5.975.972h3c3.3 0 4.95 0 5.975-.971c1.025-.972 1.025-2.535 1.025-5.66v-4.738c0-3.126 0-4.689-1.025-5.66c-.916-.868-2.33-.96-4.975-.97" />
//                   <path d="M9.772 3.632c.096-.415.144-.623.236-.792a1.64 1.64 0 0 1 1.083-.793C11.294 2 11.53 2 12 2s.706 0 .909.047a1.64 1.64 0 0 1 1.083.793c.092.17.14.377.236.792l.083.36c.17.735.255 1.103.127 1.386a1.03 1.03 0 0 1-.407.451C13.75 6 13.332 6 12.498 6h-.996c-.834 0-1.252 0-1.533-.17a1.03 1.03 0 0 1-.407-.452c-.128-.283-.043-.65.127-1.386z" />
//                 </g>
//               </svg>
//             }
//             total={357}
//             extratext="Unique Identifier"
//             chart={{
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [15, 18, 12, 51, 68, 11, 39, 37],
//             }}
//           />
//         </Grid>



//         <Grid xs={12} md={4}>
//           <AppWidgetSummary
//             title="User Type"
//             extratext="Basic User."
//             total="Bronze"


//             codeicon={
//               <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
//                 <path fill="#5ee943" d="M14.94 19.5L12 17.77L9.06 19.5l.78-3.34l-2.59-2.24l3.41-.29L12 10.5l1.34 3.13l3.41.29l-2.59 2.24M20 2H4v2l4.86 3.64a8 8 0 1 0 6.28 0L20 4m-2 11a6 6 0 1 1-7.18-5.88a5.9 5.9 0 0 1 2.36 0A6 6 0 0 1 18 15m-5.37-8h-1.26l-4-3h9.34Z" />
//               </svg>
//             }
//             chart={{

//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [20, 41, 63, 33, 28, 35, 50, 46],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={4}>
//           <AppWidgetSummary
//             title="Day registered"

//             codeicon={
//               <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                 <path fill="#5ee943" d="M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z" />
//                 <path fill="#5ee943" d="M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5" />
//               </svg>
//             }

//             total="12/4/2024"
//             extratext="Joined on 12/4/2024"
//             chart={{

//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [18, 19, 31, 8, 16, 37, 12, 33],
//             }}
//           />
//         </Grid>
//       </Grid >


//       <Form methods={methods} sx={{ mt: 10 }} onSubmit={onSubmit}>
//         <Grid container spacing={3}>
//           <Grid xs={12} md={4}>
//             <Card
//               sx={{
//                 pt: 10,
//                 pb: 27,
//                 px: 3,
//                 textAlign: 'center',
//               }}
//             >
//               <Field.UploadAvatar
//                 name="photoURL"
//                 maxSize={3145728}
//                 helperText={
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       mt: 3,
//                       mx: 'auto',
//                       display: 'block',
//                       textAlign: 'center',
//                       color: 'text.disabled',
//                     }}
//                   >
//                     Allowed *.jpeg, *.jpg, *.png, *.gif
//                     <br /> max size of {fData(3145728)}
//                   </Typography>
//                 }
//               />





//               <Button variant="soft" color="success" sx={{ mt: 3, mr: 1 }}>
//                 Update password
//               </Button>
//               <Button variant="soft" color="error" sx={{ mt: 3 }}>
//                 Delete user
//               </Button>
//             </Card>
//           </Grid>



//           <Grid xs={12} md={8}>
//             <Card sx={{ p: 3 }}>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   mt: 3,
//                   mb: 5,
//                   mx: 'auto',
//                   display: 'block',
//                   textAlign: 'left',
//                   color: 'gray',
//                 }}
//               >
//                 You can Update-Delete your profile in this section. You are not allowed to change your Name, DOB and Email.
//               </Typography>
//               <Box
//                 rowGap={3}
//                 columnGap={2}
//                 display="grid"
//                 gridTemplateColumns={{
//                   xs: 'repeat(1, 1fr)',
//                   sm: 'repeat(2, 1fr)',
//                 }}
//               >
//                 <Field.Text name="displayName" label="Name" />
//                 <Field.Text name="email" label="Email address" />
//                 <Field.DatePicker name="dateofbirth" label="Date of Birth" />
//                 <Field.Text name="NID" label="National Identification Number - CPR - Personnummer" />
//                 <Field.CountrySelect name="country" label="Nationality" placeholder="Choose a country" />
//                 <Field.CountrySelect name="country" label="Place of Birth" placeholder="Choose a country" />
//                 <Field.Text name="address" label="Address" />
//                 <Field.CountrySelect name="country" label="Currently Residing in" placeholder="Choose a country" />
//                 <Field.Phone name="phoneNumber" label="Contact Number" />
//               </Box>

//               <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
//                 {/* <Field.Text name="about" multiline rows={4} label="About" /> */}

//                 <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//                   Save changes
//                 </LoadingButton>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </Form>
//     </>
//   );
// }
