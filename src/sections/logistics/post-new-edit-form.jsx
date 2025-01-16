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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const LogisticsAssistanceSchema = zod.object({
  fullName: zod.string().min(1, { message: 'Full Name is required!' }),
  contactNumber: zod.string().min(1, { message: 'Contact Number is required!' }),
  emailAddress: zod.string().email({ message: 'Invalid email address' }),
  currentAddress: zod.string().min(1, { message: 'Current Address is required!' }),
  destinationAddress: zod.string().min(1, { message: 'Destination Address is required!' }),
  preferredMovingDate: zod.string().min(1, { message: 'Preferred Moving Date is required!' }),
  alternateMovingDate: zod.string().min(1, { message: 'Alternate Moving Date is required!' }),
  typeOfMove: zod.string().min(1, { message: 'Type of Move is required!' }),
  typeOfService: zod.string().min(1, { message: 'Type of Service is required!' }),
  preferredModeOfTransport: zod.string().min(1, { message: 'Preferred Mode of Transport is required!' }),
  inventoryDetails: zod.array(zod.object({
    category: zod.string(),
    description: zod.string(),
    quantity: zod.number(),
    estimatedWeight: zod.number(),
    fragile: zod.boolean(),
    specialInstructions: zod.string(),
  })),
  fragileItems: zod.string(),
  heavyLargeItems: zod.string(),
  itemsRequiringDisassembly: zod.string(),
  hazardousMaterials: zod.string(),
  hazardousMaterialsDetails: zod.string().optional(),
  packingService: zod.string(),
  storageService: zod.string(),
  preferredPickupDate: zod.string(),
  pickupAddress: zod.string(),
  preferredDeliveryDate: zod.string(),
  deliveryAddress: zod.string(),
  insuranceCoverage: zod.string(),
  typeOfInsurance: zod.string().optional(),
  declaredValueOfGoods: zod.string().optional(),
  customsClearanceAssistance: zod.string(),
  importExportPermitsAssistance: zod.string(),
  specialInstructions: zod.string(),
  agreeToForwardQuery: zod.boolean(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      contactNumber: '',
      emailAddress: '',
      currentAddress: '',
      destinationAddress: '',
      preferredMovingDate: '',
      alternateMovingDate: '',
      typeOfMove: '',
      typeOfService: '',
      preferredModeOfTransport: '',
      inventoryDetails: [
        { category: 'Furniture', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Appliances', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Electronics', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Clothing & Textiles', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Kitchenware', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Decorative Items', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Outdoor Equipment', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
        { category: 'Other Items', description: '', quantity: 0, estimatedWeight: 0, fragile: false, specialInstructions: '' },
      ],
      fragileItems: '',
      heavyLargeItems: '',
      itemsRequiringDisassembly: '',
      hazardousMaterials: '',
      hazardousMaterialsDetails: '',
      packingService: '',
      storageService: '',
      preferredPickupDate: '',
      pickupAddress: '',
      preferredDeliveryDate: '',
      deliveryAddress: '',
      insuranceCoverage: '',
      typeOfInsurance: '',
      declaredValueOfGoods: '',
      customsClearanceAssistance: '',
      importExportPermitsAssistance: '',
      specialInstructions: '',
      agreeToForwardQuery: false,
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(LogisticsAssistanceSchema),
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
      toast.success('Form submitted successfully!');
      router.push(paths.dashboard.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const typeOfMoveOptions = [
    { value: '', label: 'Select Type of Move' },
    { value: 'localMove', label: 'Local Move' },
    { value: 'nationalMove', label: 'National Move' },
    { value: 'internationalMove', label: 'International Move' },
    { value: 'officeRelocation', label: 'Office Relocation' },
    { value: 'corporateRelocation', label: 'Corporate/Employee Relocation' },
    { value: 'governmentRelocation', label: 'Government/Embassy Relocation' },
  ];

  const typeOfServiceOptions = [
    { value: '', label: 'Select Type of Service' },
    { value: 'doorToDoor', label: 'Door-to-Door' },
    { value: 'doorToPort', label: 'Door-to-Port' },
    { value: 'portToPort', label: 'Port-to-Port' },
    { value: 'packingOnly', label: 'Packing Only' },
  ];

  const preferredModeOfTransportOptions = [
    { value: '', label: 'Select Preferred Mode of Transport' },
    { value: 'airFreight', label: 'Air Freight' },
    { value: 'seaFreight', label: 'Sea Freight' },
    { value: 'roadTransport', label: 'Road Transport' },
    { value: 'railTransport', label: 'Rail Transport' },
  ];

  const yesNoOptions = [
    { value: '', label: 'Select' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const packingServiceOptions = [
    { value: '', label: 'Select Packing Service' },
    { value: 'fullPacking', label: 'Full Packing' },
    { value: 'partialPacking', label: 'Partial Packing' },
    { value: 'selfPacking', label: 'Self-Packing' },
  ];

  const storageServiceOptions = [
    { value: '', label: 'Select Storage Service' },
    { value: 'shortTerm', label: 'Short-Term Storage' },
    { value: 'longTerm', label: 'Long-Term Storage' },
    { value: 'noStorage', label: 'No Storage Needed' },
  ];

  const insuranceOptions = [
    { value: '', label: 'Select Insurance Type' },
    { value: 'basic', label: 'Basic Coverage' },
    { value: 'comprehensive', label: 'Comprehensive Coverage' },
  ];

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Comprehensive Logistics Assistance Form
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
                Client Information
              </Typography>
              <Field.Text name="fullName" label="Full Name" />
              <Field.Text name="contactNumber" label="Contact Number" />
              <Field.Text name="emailAddress" label="Email Address" />
              <Field.Text name="currentAddress" label="Current Address" className="full-width" />
              <Field.Text name="destinationAddress" label="Destination Address" className="full-width" />
              <Field.Text name="preferredMovingDate" label="Preferred Moving Date" type="date" InputLabelProps={{ shrink: true }} />
              <Field.Text name="alternateMovingDate" label="Alternate Moving Date" type="date" InputLabelProps={{ shrink: true }} />

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Relocation Details
              </Typography>
              <Field.Select native name="typeOfMove" label="Type of Move" InputLabelProps={{ shrink: true }}>
                {typeOfMoveOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="typeOfService" label="Type of Service" InputLabelProps={{ shrink: true }}>
                {typeOfServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="preferredModeOfTransport" label="Preferred Mode of Transport" InputLabelProps={{ shrink: true }}>
                {preferredModeOfTransportOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mt: 3 }}>
                Inventory Details
              </Typography>
              {defaultValues.inventoryDetails.map((item, index) => (
                <Box key={item.category} sx={{ gridColumn: '1 / -1', mb: 2 }}>
                  <Typography  variant="subtitle2">{item.category}</Typography>
                  <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} sx={{ mt: 3 }}>
                    <Field.Text name={`inventoryDetails.${index}.description`} label="Description" sx={{ mb: 2 }} />
                    <Field.Text name={`inventoryDetails.${index}.quantity`} label="Quantity" type="number" />
                    <Field.Text name={`inventoryDetails.${index}.estimatedWeight`} label="Estimated Weight (kg)" type="number" />
                    <Field.Checkbox name={`inventoryDetails.${index}.fragile`} label="Fragile" />
                  </Box>
                  <Field.Text name={`inventoryDetails.${index}.specialInstructions`} label="Special Instructions" multiline rows={2} />
                </Box>
              ))}

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Special Handling Requirements
              </Typography>
              <Field.Select native name="fragileItems" label="Fragile Items" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="heavyLargeItems" label="Heavy/Large Items" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="itemsRequiringDisassembly" label="Items Requiring Disassembly/Assembly" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="hazardousMaterials" label="Hazardous Materials" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Text name="hazardousMaterialsDetails" label="If Yes, please specify" multiline rows={2} className="full-width" />

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Packing and Storage Services
              </Typography>
              <Field.Select native name="packingService" label="Packing Service Required" InputLabelProps={{ shrink: true }}>
                {packingServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="storageService" label="Storage Service Required" InputLabelProps={{ shrink: true }}>
                {storageServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Collection and Delivery Details
              </Typography>
              <Field.Text name="preferredPickupDate" label="Preferred Pickup Date" type="date" InputLabelProps={{ shrink: true }} />
              <Field.Text name="pickupAddress" label="Pickup Address" className="full-width" />
              <Field.Text name="preferredDeliveryDate" label="Preferred Delivery Date" type="date" InputLabelProps={{ shrink: true }} />
              <Field.Text name="deliveryAddress" label="Delivery Address" className="full-width" />

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Insurance Options
              </Typography>
              <Field.Select native name="insuranceCoverage" label="Do you need insurance coverage for your items?" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="typeOfInsurance" label="Type of Insurance" InputLabelProps={{ shrink: true }}>
                {insuranceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Text name="declaredValueOfGoods" label="Declared Value of Goods" />

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Customs and Documentation Assistance
              </Typography>
              <Field.Select native name="customsClearanceAssistance" label="Customs Clearance Assistance" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>
              <Field.Select native name="importExportPermitsAssistance" label="Assistance with Import/Export Permits" InputLabelProps={{ shrink: true }}>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Typography variant="subtitle1" sx={{ gridColumn: '1 / -1', mb: 2, mt: 3 }}>
                Additional Services
              </Typography>
              <Field.Text name="specialInstructions" label="Special Instructions or Requests" multiline rows={4} className="full-width" />

              <FormControlLabel
                control={<Checkbox name="agreeToForwardQuery" />}
                label="I agree to forward my query to the partner company"
                sx={{ gridColumn: '1 / -1', mt: 2 }}
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

