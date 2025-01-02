import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
  FAMILY_CATEGORY_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  gender: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  // Not required
  category: zod.string(),
  priceSale: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [folderName, setFolderName] = useState('');

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || [],
      category: currentProduct?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!data.code || !data.sku || !data.category || data.images.length === 0) {
        toast.error('Please fill in all fields');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const handleOpenFolderDialog = () => {
    setOpenFolderDialog(true);
  };

  const handleCloseFolderDialog = () => {
    setOpenFolderDialog(false);
    setFolderName('');
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      // Here you would typically handle the actual folder creation logic
      console.info('Creating folder:', folderName);
      toast.success(`Folder "${folderName}" created successfully!`);
      handleCloseFolderDialog();
    } else {
      toast.error('Please enter a folder name.');
    }
  };

  const renderDetails = (
    <Card>
      <CardHeader title="Files" subheader="Upload your documents." sx={{ mb: 3 }} />
      <Divider />
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Document Details"
        subheader="Give details about the Document"
        sx={{ mb: 3 }}
        action={
          <LoadingButton
            variant="contained"
            size="medium"
<<<<<<< HEAD
            onClick={() => console.info('Create Folder Clicked')}
=======
            onClick={handleOpenFolderDialog}
>>>>>>> ba8430d2cea21ba17800a81b1730f026338fd59a
          >
            Create Folder
          </LoadingButton>
        }
      />
  
      <Divider />
  
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="code" label="Document Type" />
          <Field.Text name="sku" label="Document Details" />
<<<<<<< HEAD
  
=======

>>>>>>> ba8430d2cea21ba17800a81b1730f026338fd59a
          <Field.Select native name="category" label="Who is the Document for" InputLabelProps={{ shrink: true }}>
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
        </Box>
<<<<<<< HEAD
  
=======

>>>>>>> ba8430d2cea21ba17800a81b1730f026338fd59a
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Upload Documents</Typography>
          <Field.Upload
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('ON UPLOAD')}
          />
          {/* Add Document Button */}
          <Box sx={{ textAlign: 'right', mt: 1 }}>
            <LoadingButton
              variant="contained"
              size="medium"
<<<<<<< HEAD
              onClick={() => console.info('Add Document Clicked')}
=======
              onClick={() => {
                const { code, sku, category, images } = methods.getValues();
                if (!code || !sku || !category || images.length === 0) {
                  toast.error('Please fill in all fields and upload at least one document.');
                } else {
                  toast.success('Document added successfully!');
                  console.info('Add Document Clicked');
                  // Here you would typically handle the actual document addition logic
                }
              }}
>>>>>>> ba8430d2cea21ba17800a81b1730f026338fd59a
            >
              Add Document
            </LoadingButton>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
  
  

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderProperties}
      </Stack>

      <Dialog open={openFolderDialog} onClose={handleCloseFolderDialog}>
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="folderName"
            label="Folder Name"
            type="text"
            fullWidth
            variant="outlined"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFolderDialog}>Cancel</Button>
          <Button onClick={handleCreateFolder} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
}

