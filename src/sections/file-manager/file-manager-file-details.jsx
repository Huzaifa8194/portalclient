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
  const confirm = useBoolean(false);

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

  const handleDelete = async () => {
    if (!item?.id) return;
  
    try {
      
      const response = await axios.delete(`https://api.swedenrelocators.se/api/document/${item.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
  
      onDelete(item.id);
      confirm.onFalse();
      onClose();
      toast.success("Document deleted successfully!");
    } catch (err) {
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Authentication failed. Please log in again.");
      } else {
        toast.error(err.response?.data?.message || "Failed to delete document");
      }
    }
  };

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
        <Typography variant="h6"> Document Info </Typography>
        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={favorited}
          onChange={onFavorite}
        />
      </Stack>

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
    </Scrollbar>

    <Box sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={2}>
        {/* <Button
          fullWidth
          variant="soft"
          color="primary"
          size="large"
          startIcon={<Iconify icon="eva:link-2-fill" />}
          onClick={onCopyLink}
        >
          Copy Link
        </Button> */}
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
);
}

