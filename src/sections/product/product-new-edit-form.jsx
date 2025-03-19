"use client"

import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState, useEffect, useCallback } from "react"
import axios from "axios"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { useAuthContext } from "src/auth/hooks"

import { FOLDER_MOCK_DATA } from "src/_mock"

import { toast } from "src/components/snackbar"
import { Form, Field, schemaHelper } from "src/components/hook-form"

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required!" }),
  description: schemaHelper.editor({ message: { required_error: "Description is required!" } }),
  images: schemaHelper.files({ message: { required_error: "Images are required!" }, min: 1, max: 10 }), // Ensure at least one image, with an optional maximum
  code: zod.string().min(1, { message: "Product code is required!" }),
  sku: zod.string().min(1, { message: "Product sku is required!" }),
  quantity: zod.number().min(1, { message: "Quantity is required!" }),
  colors: zod.string().array().nonempty({ message: "Choose at least one color!" }),
  sizes: zod.string().array().nonempty({ message: "Choose at least one size!" }),
  tags: zod.string().array().min(2, { message: "Must have at least 2 tag!" }),
  gender: zod.string().array().nonempty({ message: "Choose at least one gender!" }),
  price: zod.number().min(1, { message: "Price should not be $0.00" }),

  // Optional fields
  category: zod.string().optional(),
  priceSale: zod.number().optional(),
  subDescription: zod.string().optional(),
  taxes: zod.number().optional(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }).optional(),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }).optional(),
})

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter()
  const { user } = useAuthContext()

  const [includeTaxes, setIncludeTaxes] = useState(false)
  const [openFolderDialog, setOpenFolderDialog] = useState(false)
  const [folderName, setFolderName] = useState("")
  const [familyMembers, setFamilyMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [documentTypes, setDocumentTypes] = useState([])
  const [documentSubTypes, setDocumentSubTypes] = useState([])
  const [selectedDocumentType, setSelectedDocumentType] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        setIsLoading(true)

        const response = await axios.get("https://api.swedenrelocators.se/api/client/familyMember/list", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })

        if (response.data && response.data.data && response.data.data.length > 0) {
          setFamilyMembers(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching family members:", error)
        toast.error("Failed to load family members. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    if (user && user.accessToken) {
      fetchFamilyMembers()
    } else {
      setIsLoading(false)
    }
  }, [user])
  

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      subDescription: currentProduct?.subDescription || "",
      images: currentProduct?.images || [],
      code: currentProduct?.code || "",
      sku: currentProduct?.sku || "",
      category: currentProduct?.category || "",
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || [],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: "" },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: "" },
    }),
    [currentProduct],
  )

  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get(
          "https://api.swedenrelocators.se/api/miscellaneous/documentTypes" // Correct endpoint
        )

        if (response.data?.data?.length > 0) {
          setDocumentTypes(response.data.data)

          // Set initial values using IDs instead of names
          const firstType = response.data.data[0]
          if (firstType) {
            setSelectedDocumentType(firstType.id)
            setDocumentSubTypes(firstType.document_sub_types || [])

            // Store IDs instead of names
            setValue("code", firstType.id) // Store document type ID

            if (firstType.document_sub_types?.length > 0) {
              setValue("sku", firstType.document_sub_types[0].id) // Store sub-type ID
            }
          }
        }
      } catch (error) {
        console.error("Error fetching document types:", error)
        toast.error("Failed to load document types. Please try again.")
      }
    }

    fetchDocumentTypes()
  }, [setValue])

  useEffect(() => {
    if (familyMembers.length > 0 && !values.category) {
      setValue("category", familyMembers[0].name)
    }
  }, [familyMembers, setValue, values.category])

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues)
    }
  }, [currentProduct, defaultValues, reset])

  useEffect(() => {
    if (includeTaxes) {
      setValue("taxes", 0)
    } else {
      setValue("taxes", currentProduct?.taxes || 0)
    }
  }, [currentProduct?.taxes, includeTaxes, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!data.code || !data.sku || !data.category || data.images.length === 0) {
        toast.error("Please fill in all fields")
        return
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      toast.success(currentProduct ? "Update success!" : "Create success!")
      router.push(paths.dashboard.product.root)
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.")
    }
  })

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile)
      setValue("images", filtered)
    },
    [setValue, values.images],
  )

  const handleRemoveAllFiles = useCallback(() => {
    setValue("images", [], { shouldValidate: true })
  }, [setValue])

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked)
  }, [])

  const handleOpenFolderDialog = () => {
    setOpenFolderDialog(true)
  }

  const handleCloseFolderDialog = () => {
    setOpenFolderDialog(false)
    setFolderName("")
  }

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder = {
        id: String(FOLDER_MOCK_DATA.length + 1),
        name: folderName.trim(),
        createdAt: new Date().toISOString(),
      }
      FOLDER_MOCK_DATA.push(newFolder)
      console.info("Creating folder:", newFolder)
      toast.success(`Folder "${folderName}" created successfully!`)
      handleCloseFolderDialog()
    } else {
      toast.error("Please enter a folder name.")
    }
  }

  const handleAddDocument = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "*" // Accept all file types (adjust as needed)
    fileInput.multiple = true

    fileInput.onchange = (event) => {
      const selectedFiles = Array.from(event.target.files)
      if (selectedFiles.length === 0) return

      const currentFiles = methods.getValues("images") || []

      const duplicates = selectedFiles.filter((newFile) =>
        currentFiles.some((existingFile) => existingFile.name === newFile.name && existingFile.type === newFile.type),
      )

      if (duplicates.length > 0) {
        toast.error("This document is already added.")
        return
      }

      const updatedFiles = [...currentFiles, ...selectedFiles]

      if (updatedFiles.length > 5) {
        toast.error("You can only add up to 5 documents.")
        return
      }

      methods.setValue("images", updatedFiles)

      toast.success(`${selectedFiles.length} document(s) fetched successfully!`)
      console.info("Fetched Documents:", updatedFiles)
    }

    fileInput.click()
  }

  const uploadSingleDocument = async (image, selectedType, selectedSubType, category) => {
    const formData = new FormData()

    formData.append("file", image)
    formData.append("document", image)
    formData.append("user_family_id", "6")
    formData.append("document_type_id", selectedType.id.toString())
    formData.append("document_sub_type_id", selectedSubType.id.toString())
    formData.append("coupon_id", "")

    if (category) {
      formData.append("details", category)
    }

    console.log("Uploading document:", image.name)
    console.log("FormData keys:", [...formData.keys()])
    console.log("Document type ID:", selectedType.id)
    console.log("Document subtype ID:", selectedSubType.id)
    console.log("User family ID:", "6")
    console.log("Authorization token available:", !!user.accessToken)

    try {
      const response = await axios({
        method: "post",
        url: "https://api.swedenrelocators.se/api/document/add",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.accessToken}`,
        },
        validateStatus: (status) => status < 500,
      })

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data }
      }

      const errorMessage = response.data?.message || `Failed to upload ${image.name} (Status: ${response.status})`
      throw new Error(errorMessage)
    } catch (error) {
      console.error(`Error uploading ${image.name}:`, error)

      let errorMessage = `Failed to upload ${image.name}`

      if (error.response) {
        errorMessage = error.response.data?.message || `Server error (${error.response.status})`
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection."
      } else {
        errorMessage = error.message || "Unknown error occurred"
      }

      return {
        success: false,
        error,
        message: errorMessage,
      }
    }
  }

  const mockSuccessfulUpload = async (image, selectedType, selectedSubType, category) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Mock uploading document:", image.name)
    console.log("Document type:", selectedType.name)
    console.log("Document subtype:", selectedSubType.name)

    return {
      success: true,
      data: {
        message: `Document ${image.name} uploaded successfully`,
        document_id: Math.floor(Math.random() * 1000),
      },
    }
  }

  const handleUploadAllDocuments = async () => {
    const { code, sku, category, images } = methods.getValues()

    if (user && user.type === "Bronze") {
      toast.error("You can't upload documents.")
      return
    }

    if (!images || images.length < 1) {
      toast.error("Please upload at least one document.")
      return
    }

    if (images.length > 5) {
      toast.error("You can upload a maximum of 5 documents at a time.")
      return
    }

    if (!code || !sku || !category) {
      toast.error("Please fill in all fields.")
      return
    }

    try {
      setIsUploading(true)

      const selectedType = documentTypes.find((type) => type.id === code); // Find by ID
      const selectedSubType = documentSubTypes.find((subType) => subType.id === sku); // Find by ID

      if (!selectedType || !selectedSubType) {
        toast.error("Invalid document type or subtype.")
        return
      }

      // Use Array.reduce to process uploads sequentially
      const uploadResult = await images.reduce(async (previousPromise, image) => {
        const results = await previousPromise

        // Use the actual API call instead of the mock
        console.log(`Uploading document: ${image.name} to API...`)
        const result = await uploadSingleDocument(image, selectedType, selectedSubType, category)

        // Log the complete API response for debugging
        console.log(`API Response for ${image.name}:`, JSON.stringify(result, null, 2))

        // If the upload failed, throw an error to stop the chain
        if (!result.success) {
          throw new Error(result.message || "Upload failed")
        }

        return [...results, result]
      }, Promise.resolve([]))

      console.log("All uploads completed. Results:", uploadResult)

      if (uploadResult.length === images.length) {
        toast.success(`Successfully uploaded ${uploadResult.length} document(s)!`)

        uploadResult.forEach((result) => {
          if (result.data && result.data.message) {
            console.log(`Document upload confirmation: ${result.data.message}`)
          }
          if (result.data && result.data.document_id) {
            console.log(`Document ID: ${result.data.document_id}`)
          }
        })

        setValue("images", [])
      } else {
        toast.warning(`Only ${uploadResult.length} out of ${images.length} documents were uploaded.`)
      }
    } catch (error) {
      console.error("Error uploading documents:", error)
      toast.error(error.message || "Failed to upload documents. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDocumentTypeChange = (event) => {
    const selectedTypeId = Number(event.target.value)
    setSelectedDocumentType(selectedTypeId)

    const selectedType = documentTypes.find((type) => type.id === selectedTypeId)

    if (selectedType) {
      setValue("code", selectedType.id);


      setDocumentSubTypes(selectedType.document_sub_types || [])

      if (selectedType.document_sub_types?.length > 0) {
        setValue("sku", selectedType.document_sub_types[0].id);
      } else {
        setValue("sku", "")
      }
    }
  }

  const getFileIcon = (file) => {
    const fileType = file.type.toLowerCase()
    const fileName = file.name.toLowerCase()

    // Return SVG icons based on file type
    if (fileType.includes("pdf")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#f44336">
          <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v1.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.55.45-1 1-1H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h2c.83 0 1.5.67 1.5 1.5v3zm4-3.75c0 .41-.34.75-.75.75H19v1h.75c.41 0 .75.34.75.75s-.34.75-.75.75H19v1.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.55.45-1 1-1h1.25c.41 0 .75.34.75.75zM9 9.5h1v-1H9v1zM3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm11 5.5h1v-3h-1v3z" />
        </svg>
      )
    }

    if (fileType.includes("word") || fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#2196f3">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      )
    }

    if (
      fileType.includes("excel") ||
      fileType.includes("spreadsheet") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#4caf50">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.99 6H17L14.5 14h2.51l-1.99 3H7.5l2.49-3H7.5L10 9h7.01z" />
        </svg>
      )
    }

    if (fileType.includes("image")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#ff9800">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      )
    }

    if (fileType.includes("text")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#607d8b">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      )
    }

    if (
      fileType.includes("javascript") ||
      fileType.includes("json") ||
      fileType.includes("html") ||
      fileType.includes("css")
    ) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#9c27b0">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </svg>
      )
    }

    // Default case (fallback)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#757575">
        <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
      </svg>
    )
  }

  const renderDetails = (
    <Card>
      <CardHeader title="Files" subheader="Upload your documents." sx={{ mb: 3 }} />
      <Divider />
    </Card>
  )

  const renderProperties = (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <CardHeader
        title="Document Details"
        subheader="Give details about the Document"
        sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}
        action={
          <LoadingButton variant="contained" size="medium" onClick={handleUploadAllDocuments} loading={isUploading}>
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
            columnGap: 2,
            flexWrap: "wrap",
          }}
        >
          <Field.Select
            native
            name="category"
            label="Who is the Document for"
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled={isLoading}
            sx={{
              flex: 1,
              minWidth: 150,
            }}
          >
            {isLoading ? (
              <option value="">Loading family members...</option>
            ) : familyMembers.length > 0 ? (
              familyMembers.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))
            ) : (
              <option value="">No family members available</option>
            )}
          </Field.Select>

          <Field.Select
            name="code"
            label="Document Type"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              flex: 1,
              minWidth: 150,
            }}
            SelectProps={{
              native: true,
              onChange: handleDocumentTypeChange,
              value: selectedDocumentType || "",
            }}
          >
            {/* {documentTypes.length > 0 ? (
              documentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            ) : (
              <option value="">No document types available</option>
            )} */}
            {documentTypes.map((type) => (
              <option key={type.id} value={type.id}> {/* Value is ID */}
                {type.name}
              </option>
            ))}
          </Field.Select>

          <Field.Select
            name="sku"
            label="Document Sub Type"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              flex: 1,
              minWidth: 150,
            }}
            SelectProps={{
              native: true,
              onChange: (e) => setValue("sku", e.target.value),
            }}
          >
            {/* {documentSubTypes.length > 0 ? (
              documentSubTypes.map((subType) => (
                <option key={subType.id} value={subType.name}>
                  {subType.name}
                </option>
              ))
            ) : (
              <option value="">No subtypes available</option>
            )} */}
            {documentSubTypes.map((subType) => (
              <option key={subType.id} value={subType.id}> {/* Value is ID */}
                {subType.name}
              </option>
            ))}
          </Field.Select>
        </Box>

        <Stack spacing={3}>
          {/* Uploaded Files */}
          {methods.watch("images")?.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Uploaded Documents
              </Typography>
              <Stack spacing={2}>
                {methods.watch("images").map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    sx={{
                      p: 2,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {/* File Thumbnail */}
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      {getFileIcon(file)}
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
              onUpload={() => console.info("ON UPLOAD")}
              sx={{ width: "100%" }}
            />
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <LoadingButton variant="contained" size="medium" onClick={handleAddDocument}>
                Add Document
              </LoadingButton>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      sx={{
        width: "100%",
      }}
    >
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: "auto", maxWidth: "100%" }}>
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
  )
}

