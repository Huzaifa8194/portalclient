import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const LogisticsFormSchema = zod.object({
  fullName: zod.string().min(1, { message: 'Full Name is required!' }),
  contactNumber: zod.string().min(1, { message: 'Contact Number is required!' }),
  emailAddress: zod.string().email({ message: 'Invalid email address!' }),
  currentAddress: zod.string().min(1, { message: 'Current Address is required!' }),
  destinationAddress: zod.string().min(1, { message: 'Destination Address is required!' }),
  preferredMovingDate: zod.string().min(1, { message: 'Preferred Moving Date is required!' }),
  alternateMovingDate: zod.string().optional(),
  typeOfMove: zod.string().min(1, { message: 'Type of Move is required!' }),
  typeOfService: zod.string().min(1, { message: 'Type of Service is required!' }),
  preferredTransport: zod.string().min(1, { message: 'Preferred Mode of Transport is required!' }),
  fragileItems: zod.string().min(1, { message: 'This field is required!' }),
  heavyItems: zod.string().min(1, { message: 'This field is required!' }),
  disassemblyRequired: zod.string().min(1, { message: 'This field is required!' }),
  hazardousMaterials: zod.string().min(1, { message: 'This field is required!' }),
  packingService: zod.string().min(1, { message: 'Packing Service is required!' }),
  storageService: zod.string().min(1, { message: 'Storage Service is required!' }),
  pickupDate: zod.string().min(1, { message: 'Preferred Pickup Date is required!' }),
  pickupAddress: zod.string().min(1, { message: 'Pickup Address is required!' }),
  deliveryDate: zod.string().min(1, { message: 'Preferred Delivery Date is required!' }),
  deliveryAddress: zod.string().min(1, { message: 'Delivery Address is required!' }),
  insuranceNeeded: zod.string().min(1, { message: 'This field is required!' }),
  insuranceType: zod.string().optional(),
  declaredValue: zod.string().optional(),
  customsClearance: zod.string().min(1, { message: 'This field is required!' }),
  importExportAssistance: zod.string().min(1, { message: 'This field is required!' }),
  specialInstructions: zod.string().optional(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentData }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      fullName: currentData?.fullName || '',
      contactNumber: currentData?.contactNumber || '',
      emailAddress: currentData?.emailAddress || '',
      currentAddress: currentData?.currentAddress || '',
      destinationAddress: currentData?.destinationAddress || '',
      preferredMovingDate: currentData?.preferredMovingDate || '',
      alternateMovingDate: currentData?.alternateMovingDate || '',
      typeOfMove: currentData?.typeOfMove || '',
      typeOfService: currentData?.typeOfService || '',
      preferredTransport: currentData?.preferredTransport || '',
      fragileItems: currentData?.fragileItems || '',
      heavyItems: currentData?.heavyItems || '',
      disassemblyRequired: currentData?.disassemblyRequired || '',
      hazardousMaterials: currentData?.hazardousMaterials || '',
      packingService: currentData?.packingService || '',
      storageService: currentData?.storageService || '',
      pickupDate: currentData?.pickupDate || '',
      pickupAddress: currentData?.pickupAddress || '',
      deliveryDate: currentData?.deliveryDate || '',
      deliveryAddress: currentData?.deliveryAddress || '',
      insuranceNeeded: currentData?.insuranceNeeded || '',
      insuranceType: currentData?.insuranceType || '',
      declaredValue: currentData?.declaredValue || '',
      customsClearance: currentData?.customsClearance || '',
      importExportAssistance: currentData?.importExportAssistance || '',
      specialInstructions: currentData?.specialInstructions || '',
    }),
    [currentData]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(LogisticsFormSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success('Form submitted successfully!');
      console.info('FORM DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="Comprehensive Logistics Assistance Form" sx={{ mb: 3 }} />

            <Divider />

            <Stack spacing={3} sx={{ p: 3 }}>
              <Typography variant="h6">Client Information</Typography>
              <Field.Text name="fullName" label="Full Name" />
              <Field.Text name="contactNumber" label="Contact Number" />
              <Field.Text name="emailAddress" label="Email Address" />
              <Field.Text name="currentAddress" label="Current Address" />
              <Field.Text name="destinationAddress" label="Destination Address" />
              <Field.Text name="preferredMovingDate" label="Preferred Moving Date" />
              <Field.Text name="alternateMovingDate" label="Alternate Moving Date" />

              <Typography variant="h6">Relocation Details</Typography>
              <Field.Select
                name="typeOfMove"
                label="Type of Move"
                options={[
                  'Local Move',
                  'National Move',
                  'International Move',
                  'Office Relocation',
                  'Corporate/Employee Relocation',
                  'Government/Embassy Relocation',
                ]}
              />
              <Field.Select
                name="typeOfService"
                label="Type of Service"
                options={['Door-to-Door', 'Door-to-Port', 'Port-to-Port', 'Packing Only']}
              />
              <Field.Select
                name="preferredTransport"
                label="Preferred Mode of Transport"
                options={['Air Freight', 'Sea Freight', 'Road Transport', 'Rail Transport']}
              />

              <Typography variant="h6">Special Handling Requirements</Typography>
              <Field.Select
                name="fragileItems"
                label="Fragile Items"
                options={['Yes', 'No']}
              />
              <Field.Select
                name="heavyItems"
                label="Heavy/Large Items"
                options={['Yes', 'No']}
              />
              <Field.Select
                name="disassemblyRequired"
                label="Items Requiring Disassembly/Assembly"
                options={['Yes', 'No']}
              />
              <Field.Select
                name="hazardousMaterials"
                label="Hazardous Materials"
                options={['Yes', 'No']}
              />

              <Typography variant="h6">Packing and Storage Services</Typography>
              <Field.Select
                name="packingService"
                label="Packing Service Required"
                options={['Full Packing', 'Partial Packing', 'Self-Packing']}
              />
              <Field.Select
                name="storageService"
                label="Storage Service Required"
                options={['Short-Term Storage', 'Long-Term Storage', 'No Storage Needed']}
              />

              <Typography variant="h6">Collection and Delivery Details</Typography>
              <Field.Text name="pickupDate" label="Preferred Pickup Date" />
              <Field.Text name="pickupAddress" label="Pickup Address" />
              <Field.Text name="deliveryDate" label="Preferred Delivery Date" />
              <Field.Text name="deliveryAddress" label="Delivery Address" />

              <Typography variant="h6">Insurance Options</Typography>
              <Field.Select
                name="insuranceNeeded"
                label="Do you need insurance coverage for your items?"
                options={['Yes', 'No']}
              />
              <Field.Select
                name="insuranceType"
                label="Type of Insurance"
                options={['Basic Coverage', 'Comprehensive Coverage']}
              />
              <Field.Text name="declaredValue" label="Declared Value of Goods" />

              <Typography variant="h6">Customs and Documentation Assistance</Typography>
              <Field.Select
                name="customsClearance"
                label="Customs Clearance Assistance"
                options={['Yes', 'No']}
              />
              <Field.Select
                name="importExportAssistance"
                label="Assistance with Import/Export Permits"
                options={['Yes', 'No']}
              />

              <Typography variant="h6">Additional Services</Typography>
              <Field.Text
                name="specialInstructions"
                label="Special Instructions or Requests"
                multiline
                rows={3}
              />
            </Stack>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Submit Form
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
