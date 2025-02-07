import { useState, useCallback } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Button from "@mui/material/Button"

export default function FileUploadButton({
  label,
  fieldName,
  acceptedFileTypes,
  uploadedFiles: initialUploadedFiles,
  onUpload,
  onRemove,
}) {
  const [uploadedFiles, setUploadedFiles] = useState(initialUploadedFiles || [])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const updatedFiles = [...uploadedFiles, ...files]
    if (updatedFiles.length > 5) {
      alert("You can only add up to 5 documents.")
      return
    }

    setUploadedFiles(updatedFiles)
    if (onUpload) onUpload(e, fieldName)
  }

  const handleRemoveFile = useCallback(
    (fileName) => {
      const updatedFiles = uploadedFiles.filter((file) => file.name !== fileName)
      setUploadedFiles(updatedFiles)
      if (onRemove) onRemove(fieldName, fileName)
    },
    [uploadedFiles, onRemove, fieldName],
  )

  const handleRemoveAllFiles = useCallback(() => {
    setUploadedFiles([])
    if (onRemove) onRemove(fieldName, null) // Null indicates remove all
  }, [onRemove, fieldName])

  return (
    <Card>
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Display Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Uploaded Documents
            </Typography>
            <Stack spacing={2}>
              {uploadedFiles.map((file, index) => (
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
                      overflow: "hidden",
                      backgroundColor: "#ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  {/* File Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{file.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {file.type}
                    </Typography>
                  </Box>
                  {/* Remove File Button */}
                  <Button variant="outlined" color="error" onClick={() => handleRemoveFile(file.name)}>
                    Remove
                  </Button>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Upload Documents Section */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Upload Documents</Typography>
          <Box
            sx={{
              p: 2,
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ mb: 2 }}>
              Drag and drop files here or click to browse
            </Typography>
            <Button variant="contained" component="label">
              Choose Files
              <input type="file" hidden multiple accept={acceptedFileTypes} onChange={handleFileChange} />
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveAllFiles}
              disabled={uploadedFiles.length === 0}
            >
              Remove All
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
}
