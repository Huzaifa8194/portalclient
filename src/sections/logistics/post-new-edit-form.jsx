"use client"

import { useState } from "react"
import { z as zod } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"

const typeOfMoveOptions = [
  { value: "local", label: "Local" },
  { value: "longDistance", label: "Long Distance" },
  { value: "international", label: "International" },
]

const typeOfServiceOptions = [
  { value: "fullService", label: "Full Service" },
  { value: "partialService", label: "Partial Service" },
]

const preferredModeOfTransportOptions = [
  { value: "truck", label: "Truck" },
  { value: "rail", label: "Rail" },
  { value: "sea", label: "Sea" },
  { value: "air", label: "Air" },
]

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

const packingServiceOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

const storageServiceOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

const insuranceOptions = [
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
]

const schema = zod.object({
  fullName: zod.string().min(1, { message: "Full Name is required" }),
  contactNumber: zod.string().min(1, { message: "Contact Number is required" }),
  emailAddress: zod.string().email({ message: "Invalid Email Address" }),
  currentAddress: zod.string().min(1, { message: "Current Address is required" }),
  destinationAddress: zod.string().min(1, { message: "Destination Address is required" }),
  preferredMovingDate: zod.string().min(1, { message: "Preferred Moving Date is required" }),
  alternateMovingDate: zod.string().optional(),
  typeOfMove: zod.string().min(1, { message: "Type of Move is required" }),
  typeOfService: zod.string().min(1, { message: "Type of Service is required" }),
  preferredModeOfTransport: zod.string().min(1, { message: "Preferred Mode of Transport is required" }),
  inventoryDetails: zod.array(
    zod.object({
      description: zod.string(),
      quantity: zod.number().min(1),
      estimatedWeight: zod.number().min(0),
      fragile: zod.boolean(),
      specialInstructions: zod.string().optional(),
    }),
  ),
  fragileItems: zod.string().min(1, { message: "Fragile Items is required" }),
  heavyLargeItems: zod.string().min(1, { message: "Heavy/Large Items is required" }),
  itemsRequiringDisassembly: zod.string().min(1, { message: "Items Requiring Disassembly/Assembly is required" }),
  hazardousMaterials: zod.string().min(1, { message: "Hazardous Materials is required" }),
  hazardousMaterialsDetails: zod.string().optional(),
  packingService: zod.string().min(1, { message: "Packing Service Required is required" }),
  storageService: zod.string().min(1, { message: "Storage Service Required is required" }),
  preferredPickupDate: zod.string().min(1, { message: "Preferred Pickup Date is required" }),
  pickupAddress: zod.string().min(1, { message: "Pickup Address is required" }),
  preferredDeliveryDate: zod.string().min(1, { message: "Preferred Delivery Date is required" }),
  deliveryAddress: zod.string().min(1, { message: "Delivery Address is required" }),
  insuranceCoverage: zod.string().min(1, { message: "Do you need insurance coverage for your items? is required" }),
  typeOfInsurance: zod.string().optional(),
  declaredValueOfGoods: zod.number().min(0).optional(),
  customsClearanceAssistance: zod.string().min(1, { message: "Customs Clearance Assistance is required" }),
  importExportPermitsAssistance: zod.string().min(1, { message: "Assistance with Import/Export Permits is required" }),
  specialInstructions: zod.string().optional(),
  agreeToForwardQuery: zod.boolean(),
  fromCountry: zod.string().optional(),
  toCountry: zod.string().optional(),
  currency: zod.string().optional(),
})

const defaultValues = {
  fullName: "",
  contactNumber: "",
  emailAddress: "",
  currentAddress: "",
  destinationAddress: "",
  preferredMovingDate: "",
  alternateMovingDate: "",
  typeOfMove: "",
  typeOfService: "",
  preferredModeOfTransport: "",
  inventoryDetails: [
    {
      category: "Furniture",
      description: "",
      quantity: 1,
      estimatedWeight: 0,
      fragile: false,
      specialInstructions: "",
    },
    {
      category: "Electronics",
      description: "",
      quantity: 1,
      estimatedWeight: 0,
      fragile: false,
      specialInstructions: "",
    },
    { category: "Clothing", description: "", quantity: 1, estimatedWeight: 0, fragile: false, specialInstructions: "" },
  ],
  fragileItems: "",
  heavyLargeItems: "",
  itemsRequiringDisassembly: "",
  hazardousMaterials: "",
  hazardousMaterialsDetails: "",
  packingService: "",
  storageService: "",
  preferredPickupDate: "",
  pickupAddress: "",
  preferredDeliveryDate: "",
  deliveryAddress: "",
  insuranceCoverage: "",
  typeOfInsurance: "",
  declaredValueOfGoods: "",
  customsClearanceAssistance: "",
  importExportPermitsAssistance: "",
  specialInstructions: "",
  agreeToForwardQuery: false,
  fromCountry: "",
  toCountry: "",
  currency: "",
}

const sections = [
  { id: 1, name: "Client Information" },
  { id: 2, name: "Relocation Details" },
  { id: 3, name: "Inventory Details" },
  { id: 4, name: "Special Handling Requirements" },
  { id: 5, name: "Packing and Storage Services" },
  { id: 6, name: "Collection and Delivery Details" },
  { id: 7, name: "Insurance Options" },
  { id: 8, name: "Customs and Documentation " },
  { id: 9, name: "Additional Services" },
]

export function PostNewEditForm() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data) => {
    console.log(data)
    toast.success("Form submitted successfully!")
    console.log("Form submitted, would navigate to:", paths.dashboard)
  }

  const renderClientInfo = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
        Client Information
      </Typography>
      <Field.Text name="fullName" label="Full Name" />
      <Field.Text name="contactNumber" label="Contact Number" />
      <Field.Text name="emailAddress" label="Email Address" />
      <Field.Text name="currentAddress" label="Current Address" sx={{ gridColumn: "1 / -1" }} />
      <Field.Text name="destinationAddress" label="Destination Address" sx={{ gridColumn: "1 / -1" }} />
      <Field.Text
        name="preferredMovingDate"
        label="Preferred Moving Date"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Field.Text
        name="alternateMovingDate"
        label="Alternate Moving Date"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </>
  )

  const renderRelocationDetails = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
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
      <Field.Select
        native
        name="preferredModeOfTransport"
        label="Preferred Mode of Transport"
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1 / -1" }}
      >
        {preferredModeOfTransportOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field.Select>
    </>
  )

  const renderInventoryDetails = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
        Inventory Details
      </Typography>
      {defaultValues.inventoryDetails.map((item, index) => (
        <Box key={item.category} sx={{ mb: 4, gridColumn: "1 / -1" }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {item.category}
          </Typography>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <Field.Text name={`inventoryDetails.${index}.description`} label="Description" />
            <Field.Text name={`inventoryDetails.${index}.quantity`} label="Quantity" type="number" />
            <Field.Text
              name={`inventoryDetails.${index}.estimatedWeight`}
              label="Estimated Weight (kg)"
              type="number"
            />
            <Field.Checkbox name={`inventoryDetails.${index}.fragile`} label="Fragile" />
          </Box>
          <Field.Text
            name={`inventoryDetails.${index}.specialInstructions`}
            label="Special Instructions"
            multiline
            rows={2}
            sx={{ mt: 2 }}
          />
        </Box>
      ))}
    </>
  )

  const renderSpecialHandling = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
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
      <Field.Select
        native
        name="itemsRequiringDisassembly"
        label="Items Requiring Disassembly/Assembly"
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1 / -1" }}
      >
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
      <Field.Text
        name="hazardousMaterialsDetails"
        label="If Yes, please specify"
        multiline
        rows={2}
        sx={{ gridColumn: "1 / -1" }}
      />
    </>
  )

  const renderPackingStorage = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
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
    </>
  )

  const renderCollectionDelivery = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
        Collection and Delivery Details
      </Typography>
      <Field.Text
        name="preferredPickupDate"
        label="Preferred Pickup Date"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Field.Text name="pickupAddress" label="Pickup Address" sx={{ gridColumn: "1 / -1" }} />
      <Field.Text
        name="preferredDeliveryDate"
        label="Preferred Delivery Date"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Field.Text name="deliveryAddress" label="Delivery Address" sx={{ gridColumn: "1 / -1" }} />
    </>
  )

  const renderInsurance = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
        Insurance Options
      </Typography>
      <Field.Select
        native
        name="insuranceCoverage"
        label="Do you need insurance coverage for your items?"
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1 / -1" }}
      >
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
    </>
  )

  const renderCustoms = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
        Customs and Documentation Assistance
      </Typography>
      <Field.Select
        native
        name="customsClearanceAssistance"
        label="Customs Clearance Assistance"
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1 / -1" }}
      >
        {yesNoOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field.Select>
      <Field.Select
        native
        name="importExportPermitsAssistance"
        label="Assistance with Import/Export Permits"
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1 / -1" }}
      >
        {yesNoOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field.Select>
    </>
  )

  const renderAdditional = () => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3, gridColumn: "1 / -1" }}>
        Additional Services
      </Typography>
      <Field.Text
        name="specialInstructions"
        label="Special Instructions or Requests"
        multiline
        rows={4}
        sx={{ gridColumn: "1 / -1" }}
      />
      <FormControlLabel
        control={<Checkbox name="agreeToForwardQuery" />}
        label="I agree to forward my query to the partner company"
        sx={{ mt: 2, gridColumn: "1 / -1" }}
      />
    </>
  )

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderClientInfo()
      case 1:
        return renderRelocationDetails()
      case 2:
        return renderInventoryDetails()
      case 3:
        return renderSpecialHandling()
      case 4:
        return renderPackingStorage()
      case 5:
        return renderCollectionDelivery()
      case 6:
        return renderInsurance()
      case 7:
        return renderCustoms()
      case 8:
        return renderAdditional()
      default:
        return null
    }
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Comprehensive Logistics Assistance Form
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
              sx={{
                "& .MuiFormControl-root": {
                  width: "100%",
                },
                "& .MuiInputBase-root": {
                  minHeight: "56px",
                },
                "& .MuiInputLabel-root": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                },
                "& .MuiTypography-root": {
                  fontWeight: "bold",
                },
              }}
            >
              {renderStepContent(activeStep)}
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "space-between" }}>
              <LoadingButton
                variant="outlined"
                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                disabled={activeStep === 0}
              >
                Back
              </LoadingButton>
              {activeStep === sections.length - 1 ? (
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Submit Form
                </LoadingButton>
              ) : (
                <LoadingButton
                  variant="contained"
                  onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                >
                  Next
                </LoadingButton>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            {/* Stepper Section */}
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Stepper activeStep={activeStep} orientation="vertical">
                  {sections.map((section) => (
                    <Step key={section.id}>
                      <StepLabel>{section.name}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Card>

            {/* Important Information Section */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                IMP INFO
              </Typography>

              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  mb: 3,
                }}
              >
                <Stack spacing={2}>
                  <Controller
                    name="fromCountry"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} select label="From" fullWidth>
                        <MenuItem value="">Select Country</MenuItem>
                        <MenuItem value="armenia">Armenia</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    name="toCountry"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} select label="To" fullWidth>
                        <MenuItem value="">Select Country</MenuItem>
                        <MenuItem value="sweden">Sweden</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    )}
                  />
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} select label="Currency" fullWidth>
                        <MenuItem value="">Select Currency</MenuItem>
                        <MenuItem value="sek">SEK</MenuItem>
                        <MenuItem value="eur">EUR</MenuItem>
                        <MenuItem value="usd">USD</MenuItem>
                      </TextField>
                    )}
                  />
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Form>
  )
}
