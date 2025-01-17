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
  PRODUCT_MOCK_DATA,
  FOLDER_MOCK_DATA,
  DOCUMENT_DETAILS_MOCK_DATA,
  DOCUMENT_TYPE_MOCK_DATA
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images are required!' }, min: 1, max: 10 }), // Ensure at least one image, with an optional maximum
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one color!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one size!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 tag!' }), // Ensure at least one tag
  gender: zod.string().array().nonempty({ message: 'Choose at least one gender!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  
  // Optional fields
  category: zod.string().optional(),
  priceSale: zod.number().optional(),
  subDescription: zod.string().optional(),
  taxes: zod.number().optional(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }).optional(),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }).optional(),
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
      const newFolder = {
        id: String(FOLDER_MOCK_DATA.length + 1),
        name: folderName.trim(),
        createdAt: new Date().toISOString(),
      };
      FOLDER_MOCK_DATA.push(newFolder);
      console.info('Creating folder:', newFolder);
      toast.success(`Folder "${folderName}" created successfully!`);
      handleCloseFolderDialog();
    } else {
      toast.error('Please enter a folder name.');
    }
  };

  const handleAddDocument = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '*'; // Accept all file types (adjust as needed)
    fileInput.multiple = true; // Allow multiple files to be fetched

    fileInput.onchange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length === 0) return;

      const currentFiles = methods.getValues('images') || [];
      
      // Check for duplicate files based on file name and type
      const newFiles = selectedFiles.filter(newFile =>
        !currentFiles.some(existingFile =>
          existingFile.name === newFile.name && existingFile.type === newFile.type
        )
      );

      if (newFiles.length === 0) {
        toast.error('All selected documents are already added.');
        return;
      }

      const updatedFiles = [...currentFiles, ...newFiles];

      if (updatedFiles.length > 5) {
        toast.error('You can only add up to 5 documents.');
        return;
      }

      // Update the form with the new files
      methods.setValue('images', updatedFiles);

      toast.success(`${newFiles.length} new document(s) added successfully!`);
      console.info('Added Documents:', newFiles);
    };

    fileInput.click();
  };
  
  

  const handleUploadAllDocuments = () => {
    const { code, sku, category, images } = methods.getValues();
  
    // Ensure there's at least one document uploaded
    if (images.length < 1) {
      toast.error('Please upload at least one document.');
      return; // Exit the function early
    }
  
    // Check if there are more than 5 documents uploaded
    if (images.length > 5) {
      toast.error('You can upload a maximum of 5 documents at a time.');
      return; // Exit the function early
    }
  
    // Validate the required fields
    if (!code || !sku || !category || images.length === 0) {
      toast.error('Please fill in all fields and upload at least one document.');
    } else {
      // Process each document for upload
      images.forEach((image, index) => {
        const newDocument = {
          id: String(PRODUCT_MOCK_DATA.length + 1 + index),
          name: `${code} ${index + 1}`, // Append index for uniqueness
          description: sku,
          category,
          images: [image], // Handle each image individually
        };
        PRODUCT_MOCK_DATA.push(newDocument);
  
        // Create a folder for the category if it doesn't exist
        const existingFolder = FOLDER_MOCK_DATA.find(folder => folder.name === category);
        if (!existingFolder) {
          const newFolder = {
            id: String(FOLDER_MOCK_DATA.length + 1),
            name: category,
            createdAt: new Date().toISOString(),
          };
          FOLDER_MOCK_DATA.push(newFolder);
          console.log(`Created folder: ${category}`);
        }
  
        console.log(`Uploaded document:`, newDocument);
      });
  
      // Display success message
      toast.success('All documents uploaded successfully!');
      console.info('All Documents Uploaded:', images);
    }
  };
  


  const renderDetails = (
    <Card>
      <CardHeader title="Files" subheader="Upload your documents." sx={{ mb: 3 }} />
      <Divider />
    </Card>
  );

  const renderProperties = (
    <Card
      sx={{
        width: '100%', // Make the Card span the full width of the container
        maxWidth: '100vw', // Prevent overflow beyond the viewport
      }}
    >
      <CardHeader
        title="Document Details"
        subheader="Give details about the Document"
        sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        action={
          <LoadingButton
            variant="contained"
            size="medium"
            onClick={handleUploadAllDocuments}
          >
            Upload All Documents
          </LoadingButton>
        }
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            columnGap: 2, // Spacing between the fields
            flexWrap: 'wrap', // Allow wrapping on smaller screens
          }}
        >

          {/* Who is the Document for Dropdown - Remains unchanged */}
          <Field.Select
            native
            name="category"
            label="Who is the Document for"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              flex: 1, // Occupies equal space
              minWidth: 150, // Ensures the dropdown has a minimum width
            }}
          >
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

          {/* Document Type Dropdown - Updated with mapped data */}
          <Field.Select
            native
            name="code"
            label="Document Type"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              flex: 1, // Occupies equal space in the flex container
              minWidth: 150, // Ensures the dropdown has a minimum width to avoid overflow
            }}
          >
            {DOCUMENT_TYPE_MOCK_DATA.map((type) => (
              <optgroup key={type.group} label={type.group}>
                {type.items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>

          {/* Document Details Dropdown - Updated with mapped data */}
          <Field.Select
            native
            name="sku"
            label="Document Name"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              flex: 1,
              minWidth: 150, // Ensures the dropdown has a minimum width to avoid overflow
            }}
          >
            {DOCUMENT_DETAILS_MOCK_DATA.map((detail) => (
              <optgroup key={detail.group} label={detail.group}>
                {detail.items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>


        </Box>


        <Stack spacing={3}>
          {/* Display Uploaded Files */}
          {methods.watch('images')?.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Uploaded Documents
              </Typography>
              <Stack spacing={2}>
                {methods.watch('images').map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    sx={{
                      p: 2,
                      border: '1px solid #ccc',
                      borderRadius: 2,
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    {/* File Thumbnail */}
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        overflow: 'hidden',
                        backgroundColor: '#ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"} // Create an image preview
                        alt={file.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    {/* File Details */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{file.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {file.type}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Upload Documents Section */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Upload Documents</Typography>
            <Field.Upload
              multiple
              thumbnail
              name="images"
              maxSize={3145728}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={(files) => {
                const currentFiles = methods.getValues('images') || [];
                
                // Check for duplicate files based on file name and type
                const newFiles = files.filter(newFile =>
                  !currentFiles.some(existingFile =>
                    existingFile.name === newFile.name && existingFile.type === newFile.type
                  )
                );

                if (newFiles.length === 0) {
                  toast.error('All selected documents are already added.');
                  return;
                }

                const updatedFiles = [...currentFiles, ...newFiles];

                if (updatedFiles.length > 5) {
                  toast.error('You can only add up to 5 documents.');
                  return;
                }

                // Update the form with the new files
                methods.setValue('images', updatedFiles);

                toast.success(`${newFiles.length} new document(s) added successfully!`);
                console.info('Added Documents:', newFiles);
              }}
              sx={{ width: '100%' }} // Make upload span the full width
            />
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <LoadingButton
                variant="contained"
                size="medium"
                onClick={handleAddDocument}
              >
                Add Document
              </LoadingButton>
            </Box>
          </Stack>
        </Stack>

      </Stack>
    </Card>
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      sx={{
        width: '100%', // Make the Form span the full width
      }}
    >
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: '100%' }}>
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
          <Button onClick={handleCreateFolder} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
}

