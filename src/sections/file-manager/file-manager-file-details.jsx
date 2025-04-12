"use client"

import { useContext, useState, useEffect } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import FormHelperText from "@mui/material/FormHelperText"

import { useBoolean } from "src/hooks/use-boolean"
import { toast } from "src/components/snackbar"
import { ConfirmDialog } from "src/components/custom-dialog"

import { fData } from "src/utils/format-number"
import { fDateTime } from "src/utils/format-time"
import { AuthContext } from "src/auth/context/auth-context"
import { Iconify } from "src/components/iconify"
import { Scrollbar } from "src/components/scrollbar"
import { fileFormat, FileThumbnail } from "src/components/file-thumbnail"

export function FileManagerFileDetails({
  item,
  open,
  onClose,
  onDelete,
  favorited,
  onFavorite,
  onCopyLink,
  user: propUser,
  ...other
}) {
  const properties = useBoolean(true)
  const { user } = useContext(AuthContext)
  const [fileDetails, setFileDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const confirm = useBoolean(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    document_type_id: "",
    document_sub_type_id: "",
    details: "",
    document: null,
  })

  // State for document types and sub-types
  const [documentTypes, setDocumentTypes] = useState([])
  const [loadingDocTypes, setLoadingDocTypes] = useState(false)
  const [docTypeError, setDocTypeError] = useState(null)
  const [documentTypesLoaded, setDocumentTypesLoaded] = useState(false)

  // Get available sub-types based on selected document type
  const availableSubTypes =
    documentTypes.find((docType) => docType.id.toString() === formData.document_type_id.toString())
      ?.document_sub_types || []

  useEffect(() => {
    const fetchFileDetails = async () => {
      if (!open || !item?.id) return

      if (!user?.accessToken) {
        setError("Authentication required. Please log in again.")
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`https://api.swedenrelocators.se/api/document/show/${item.id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (response.data?.data) {
          setFileDetails(response.data.data)
        } else {
          setError("No document details returned from the API.")
        }
      } catch (err) {
        console.error("Error fetching file details:", err)

        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Authentication failed. Your session may have expired. Please log in again.")
        } else if (err.response?.status === 404) {
          setError(`Document with ID ${item.id} not found.`)
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later.")
        } else {
          setError(`Failed to load document details: ${err.message || "Unknown error"}`)
        }

        setFileDetails(null)
      } finally {
        setLoading(false)
      }
    }

    fetchFileDetails()
  }, [open, item?.id, user?.accessToken])

  // Fetch document types when edit mode is activated
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      if (!editMode || !user?.accessToken) return

      setLoadingDocTypes(true)
      setDocTypeError(null)
      setDocumentTypesLoaded(false)

      try {
        const response = await axios.get("https://api.swedenrelocators.se/api/miscellaneous/documentTypes", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            Accept: "application/json",
          },
        })

        if (response.data?.data) {
          setDocumentTypes(response.data.data)
          setDocumentTypesLoaded(true)

          // Now that document types are loaded, we can update the form data with the correct values
          if (fileDetails) {
            setFormData((prev) => {
              // Check if the document_type_id exists in the loaded options
              const typeExists = response.data.data.some(
                (type) => type.id.toString() === fileDetails.document_type_id?.toString(),
              )

              // Get all available sub-type IDs from the loaded document types
              const availableSubTypeIds = response.data.data
                .flatMap((type) => type.document_sub_types)
                .map((subType) => subType.id.toString())

              // Check if the document_sub_type_id exists in the available options
              const subTypeExists = availableSubTypeIds.includes(fileDetails.document_sub_type_id?.toString())

              return {
                ...prev,
                document_type_id: typeExists ? fileDetails.document_type_id?.toString() || "" : "",
                document_sub_type_id: subTypeExists ? fileDetails.document_sub_type_id?.toString() || "" : "",
              }
            })
          }
        } else {
          setDocTypeError("No document types returned from the API.")
        }
      } catch (err) {
        console.error("Error fetching document types:", err)
        setDocTypeError("Failed to load document types. Please try again.")
      } finally {
        setLoadingDocTypes(false)
      }
    }

    fetchDocumentTypes()
  }, [editMode, user?.accessToken, fileDetails])

  const handleDelete = async () => {
    if (!item?.id) return

    try {
      const response = await axios.delete(`https://api.swedenrelocators.se/api/document/${item.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })

      onDelete(item.id)
      confirm.onFalse()
      onClose()
      toast.success("Document deleted successfully!")
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Authentication failed. Please log in again.")
      } else {
        toast.error(err.response?.data?.message || "Failed to delete document")
      }
    }
  }

  const handleFormChange = (e) => {
    const { name, value, files } = e.target

    if (name === "document" && files?.length) {
      // File validation
      const file = files[0]
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (file.size > maxSize) {
        toast.error("File size exceeds 5MB limit")
        return
      }

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]

      // Check if file type is allowed
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, JPEG, PNG, and JPG files are allowed")
        return
      }

      setFormData((prev) => ({ ...prev, document: file }))
    } else if (name === "document_type_id") {
      // When document type changes, reset the sub-type
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        document_sub_type_id: "",
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!item?.id) return

    const formDataToSend = new FormData()
    formDataToSend.append("document_type_id", formData.document_type_id)
    formDataToSend.append("document_sub_type_id", formData.document_sub_type_id)
    formDataToSend.append("details", formData.details)

    if (formData.document) {
      formDataToSend.append("document", formData.document)
    }

    try {
      const response = await axios.post(
        `https://api.swedenrelocators.se/api/document/edit/${item.id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )

      toast.success("Document updated successfully!")
      setEditMode(false)
      // Refresh file details
      const updatedDetails = await axios.get(`https://api.swedenrelocators.se/api/document/show/${item.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          Accept: "application/json",
        },
      })

      if (updatedDetails.data?.data) {
        setFileDetails(updatedDetails.data.data)
      }
    } catch (err) {
      console.error("Error updating document:", err)
      toast.error(err.response?.data?.message || "Failed to update document")
    }
  }

  const handleEditClick = () => {
    if (fileDetails) {
      setFormData({
        document_type_id: "", // Start with empty values until document types are loaded
        document_sub_type_id: "",
        details: fileDetails.details || "",
        document: null,
      })
    }
    setEditMode(true)
  }

  const handleCancelEdit = () => {
    setEditMode(false)
  }

  const getThumbnailFile = (file) => {
    if (file?.type === "folder") return "folder"
    if (file?.preview) return file.preview
    if (file?.url) return file.url
    return file?.type || "unknown"
  }

  if (!item) {
    return null
  }

  const { id, name, size, url, type, document_sub_type, uploaded_by, uploaded_at } = item

  const renderProperties = (
    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ typography: "subtitle2" }}>
        Properties
        <IconButton size="small" onClick={properties.onToggle}>
          <Iconify icon={properties.value ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"} />
        </IconButton>
      </Stack>

      {properties.value && (
        <>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : error ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {error}
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Using local file data instead.
              </Typography>
            </Alert>
          ) : (
            <>
              {/* Basic file properties */}
              <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                  Size
                </Box>
                {size ? fData(size) : "N/A"}
              </Stack>

              <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                  Type
                </Box>
                {type ? fileFormat(type) : "N/A"}
              </Stack>

              {/* API fetched details */}
              {fileDetails && (
                <>
                  <Divider sx={{ borderStyle: "dashed", my: 1 }} />

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Document Details
                  </Typography>

                  <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Document ID
                    </Box>
                    {fileDetails.id || "N/A"}
                  </Stack>

                  <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Doc Type
                    </Box>
                    {fileDetails.document_type_name || "N/A"}
                  </Stack>

                  <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Doc Subtype
                    </Box>
                    {fileDetails.document_sub_type_name || "N/A"}
                  </Stack>

                  {/* {fileDetails.user_family_name && (
                    <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                      <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                        Family
                      </Box>
                      {fileDetails.user_family_name}
                    </Stack>
                  )} */}

                  <Stack direction="row" sx={{ typography: "caption" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Created At
                    </Box>
                    {fileDetails.created_at ? fDateTime(fileDetails.created_at) : "N/A"}
                  </Stack>

                  <Stack direction="row" sx={{ typography: "caption" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Updated At
                    </Box>
                    {fileDetails.updated_at ? fDateTime(fileDetails.updated_at) : "N/A"}
                  </Stack>

                  {fileDetails.details && (
                    <Stack direction="row" sx={{ typography: "caption" }}>
                      <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                        Details
                      </Box>
                      {fileDetails.details}
                    </Stack>
                  )}
                </>
              )}

              {!fileDetails && (
                <>
                  <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Document Sub Type
                    </Box>
                    {document_sub_type || name || "N/A"}
                  </Stack>

                  <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Uploaded By
                    </Box>
                    {uploaded_by || "N/A"}
                  </Stack>

                  <Stack direction="row" sx={{ typography: "caption", textTransform: "capitalize" }}>
                    <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                      Uploaded At
                    </Box>
                    {uploaded_at ? fDateTime(uploaded_at) : "N/A"}
                  </Stack>
                </>
              )}
            </>
          )}
        </>
      )}
    </Stack>
  )

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 320 } }}
      {...other}
    >
      <Scrollbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6"> {editMode ? "Edit Document" : "Document Info"} </Typography>
          {!editMode && (
            <Checkbox
              color="warning"
              icon={<Iconify icon="eva:star-outline" />}
              checkedIcon={<Iconify icon="eva:star-fill" />}
              checked={favorited}
              onChange={onFavorite}
            />
          )}
        </Stack>

        {!editMode && (
          <Stack spacing={2.5} justifyContent="center" sx={{ p: 2.5, bgcolor: "background.neutral" }}>
            <FileThumbnail
              imageView
              file={getThumbnailFile(item)}
              sx={{ width: "auto", height: "auto", alignSelf: "flex-start" }}
              slotProps={{
                img: {
                  width: 320,
                  height: "auto",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                },
                icon: { width: 64, height: 64 },
              }}
            />
            <Typography variant="subtitle1" sx={{ wordBreak: "break-all" }}>
              {fileDetails?.document_sub_type_name || name || "Untitled Document"}
            </Typography>
            <Divider sx={{ borderStyle: "dashed" }} />
            {renderProperties}
          </Stack>
        )}

        {editMode && (
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2.5, bgcolor: "background.neutral" }}>
            <Stack spacing={3}>
              <Box sx={{ mb: 1 }}>
                <FileThumbnail
                  file={formData.document ? "image" : getThumbnailFile(item)}
                  sx={{
                    width: 64,
                    height: 64,
                    mx: "auto",
                    borderRadius: 1,
                    border: "1px dashed",
                    borderColor: "divider",
                    p: 1,
                  }}
                />
                <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 1 }}>
                  {formData.document
                    ? formData.document.name
                    : fileDetails?.document_sub_type_name || name || "Document"}
                </Typography>
              </Box>

              <Divider sx={{ borderStyle: "dashed" }} />

              {/* Document Type Dropdown */}
              <FormControl fullWidth size="small">
                <InputLabel id="document-type-label">Document Type</InputLabel>
                <Select
                  labelId="document-type-label"
                  id="document-type"
                  name="document_type_id"
                  value={formData.document_type_id}
                  onChange={handleFormChange}
                  label="Document Type"
                  disabled={loadingDocTypes}
                >
                  {loadingDocTypes ? (
                    <MenuItem value="">
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                    </MenuItem>
                  ) : (
                    documentTypes.map((docType) => (
                      <MenuItem key={docType.id} value={docType.id.toString()}>
                        {docType.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {docTypeError && <FormHelperText error>{docTypeError}</FormHelperText>}
              </FormControl>

              {/* Document Sub-Type Dropdown */}
              <FormControl fullWidth size="small">
                <InputLabel id="document-sub-type-label">Document Sub-Type</InputLabel>
                <Select
                  labelId="document-sub-type-label"
                  id="document-sub-type"
                  name="document_sub_type_id"
                  value={formData.document_sub_type_id}
                  onChange={handleFormChange}
                  label="Document Sub-Type"
                  disabled={!formData.document_type_id || loadingDocTypes}
                >
                  {!formData.document_type_id ? (
                    <MenuItem value="">
                      <em>Select a document type first</em>
                    </MenuItem>
                  ) : availableSubTypes.length === 0 ? (
                    <MenuItem value="">
                      <em>No sub-types available</em>
                    </MenuItem>
                  ) : (
                    availableSubTypes.map((subType) => (
                      <MenuItem key={subType.id} value={subType.id.toString()}>
                        {subType.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleFormChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter document details..."
              />

              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Upload Documents
                </Typography>

                {formData.document ? (
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 1,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: (theme) => theme.shadows[2],
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <FileThumbnail
                        file={formData.document.type || "application"}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                        }}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" noWrap>
                          {formData.document.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                          {fData(formData.document.size)}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setFormData((prev) => ({ ...prev, document: null }))}
                        sx={{
                          p: "6px",
                          borderRadius: "50%",
                          bgcolor: (theme) => theme.palette.error.lighter,
                          color: (theme) => theme.palette.error.main,
                          "&:hover": {
                            bgcolor: (theme) => theme.palette.error.light,
                          },
                        }}
                      >
                        <Iconify icon="eva:close-fill" width={18} />
                      </IconButton>
                    </Stack>
                  </Box>
                ) : (
                  <Box
                    component="label"
                    htmlFor="upload-document"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f9fafb",
                      borderRadius: 1,
                      py: 5,
                      px: 2,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      id="upload-document"
                      type="file"
                      name="document"
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    

                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M65 20H40L33.75 13.75H15C11.55 13.75 8.75 16.55 8.75 20V60C8.75 63.45 11.55 66.25 15 66.25H65C68.45 66.25 71.25 63.45 71.25 60V26.25C71.25 22.8 68.45 20 65 20Z"
                        fill="black"
                      />
                      <path d="M40 36.25L45 41.25H41.25V50H38.75V41.25H35L40 36.25Z" fill="white" />
                      <path d="M53.75 41.25H47.5V43.75H53.75V41.25Z" fill="white" />
                      <path d="M53.75 46.25H47.5V48.75H53.75V46.25Z" fill="white" />
                      <path d="M53.75 51.25H35V53.75H53.75V51.25Z" fill="white" />
                    </svg>

                    <Typography variant="h6" sx={{ mt: 2, color: "text.primary", fontWeight: 500 }}>
                      Drop or select file
                    </Typography>

                    {/* <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mt: 1 }}>
                      Drop files here or click to{" "}
                      <Box component="span" sx={{ color: "#4caf50", fontWeight: 500 }}>
                        browse
                      </Box>{" "}
                      through your machine.
                    </Typography> */}
                  </Box>
                )}
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                // startIcon={<Iconify icon="eva:save-fill" />}
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                size="large"
                onClick={handleCancelEdit}
                startIcon={<Iconify icon="eva:close-fill" />}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        )}
      </Scrollbar>

      <Box sx={{ p: 2.5 }}>
        {!editMode && (
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="soft"
              color="info"
              size="large"
              startIcon={<Iconify icon="eva:edit-fill" />}
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              fullWidth
              variant="soft"
              color="error"
              size="large"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={confirm.onTrue}
            >
              Delete
            </Button>
          </Stack>
        )}
      </Box>

      {/* Add ConfirmDialog component */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete Document"
        content={
          <>
            Are you sure you want to delete <strong>{fileDetails?.document_sub_type_name || name}</strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Confirm Delete
          </Button>
        }
      />
    </Drawer>
  )
}
