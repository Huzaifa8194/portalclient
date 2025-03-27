"use client"

import React, { useState, useCallback, useEffect, useContext } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import axios from "axios"
import { useBoolean } from "src/hooks/use-boolean"
import { useSetState } from "src/hooks/use-set-state"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { DashboardContent } from "src/layouts/dashboard"
import { toast } from "src/components/snackbar"
import { Iconify } from "src/components/iconify"
import { EmptyContent } from "src/components/empty-content"
import { ConfirmDialog } from "src/components/custom-dialog"
import { useTable, getComparator } from "src/components/table"
import { AuthContext } from "src/auth/context/auth-context" // Import your auth context
import { FileManagerFilters } from "../file-manager-filters"
import { FileManagerGridView } from "../file-manager-grid-view"
import { FileManagerFiltersResult } from "../file-manager-filters-result"
import { FileManagerNewFolderDialog } from "../file-manager-new-folder-dialog"
import { FileManagerFolderView } from "../file-manager-folder-view"

export function FileManagerView() {
  const table = useTable({ defaultRowsPerPage: 10 })
  const openDateRange = useBoolean()
  const confirm = useBoolean()
  const createFolder = useBoolean()
  const [tableData, setTableData] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fileInputRef = React.useRef(null)

  // Use your auth context to get the user and access token
  const { user } = useContext(AuthContext)

  const filters = useSetState({
    name: "",
    type: [],
    startDate: null,
    endDate: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        if (!user || !user.accessToken) {
          throw new Error("No access token available")
        }

        // Fetch documents from API
        const response = await axios.get("https://api.swedenrelocators.se/api/document/list", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })

        const result = response.data

        // Create "myself" folder with ALL documents from the API
        const myselfDocuments = result.data.map((doc) => ({
          id: doc.id,
          name: doc.document_sub_type_name,
          type: doc.document_type_name,
          size: 1024,
          modifiedAt: doc.created_at,
          url: doc.url,
          uploadedBy: "User",
          uploaded_at: doc.created_at,
          uploaded_by: "User",
          isFavorited: false,
          shared: [],
          // Add standardized dimensions for consistent display
          width: 200,
          height: 200,
          thumbnailStyle: {
            width: "100px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
          },
        }))

        // Create "myself" folder
        const myselfFolder = {
          id: "folder-myself",
          name: "myself",
          directory: "myself",
          type: "folder",
          size: myselfDocuments.length,
          modifiedAt: myselfDocuments.length > 0 ? myselfDocuments[0].modifiedAt : new Date().toISOString(),
          shared: [],
          isFavorited: false,
          images: myselfDocuments,
        }

        // Fetch family members data
        const familyResponse = await axios.get(
          "https://api.swedenrelocators.se/api/miscellaneous/documents/familyMembers",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        )

        const familyResult = familyResponse.data
        const folderData = familyResult.data.map((familyMember) => ({
          id: `folder-${familyMember.family_member_id}`,
          name: familyMember.family_member_name,
          directory: familyMember.directory_name,
          type: "folder",
          size: familyMember.documents.length,
          modifiedAt:
            familyMember.documents.length > 0 ? familyMember.documents[0].uploaded_at : new Date().toISOString(),
          shared: [],
          isFavorited: false,
          images: familyMember.documents.map((doc) => ({
            id: doc.id,
            name: doc.document_sub_type,
            type: doc.document_type,
            size: 1024,
            modifiedAt: doc.uploaded_at,
            url: doc.url,
            uploadedBy: doc.uploaded_by,
            uploaded_at: doc.uploaded_at,
            uploaded_by: doc.uploaded_by,
            isFavorited: false,
            shared: [],
            // Add standardized dimensions for consistent display
            // width: 200,
            // height: 200,
            // thumbnailStyle: {
            //   width: "200px",
            //   height: "200px",
            //   objectFit: "cover",
            //   borderRadius: "8px",
            // },
          })),
          // Add folder thumbnail style
          // thumbnailStyle: {
          //   width: "200px",
          //   height: "200px",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // },
        }))

        // Add "myself" folder at the beginning of the array
        setTableData([myselfFolder, ...folderData])
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)

        if (err.response && err.response.status === 401) {
          setError("Authentication required. Please log in to access documents.")
          toast.error("Authentication required")
        } else if (err.response && err.response.status === 404) {
          setError("The requested resource was not found.")
          toast.error("Resource not found")
        } else if (err.message === "No access token available") {
          setError("You need to log in to access this feature.")
          toast.error("Login required")
        } else {
          setError("Failed to fetch documents. Please try again later.")
          toast.error("Failed to fetch documents")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const dateError =
    filters.state.startDate && filters.state.endDate
      ? filters.state.startDate.getTime() > filters.state.endDate.getTime()
      : false

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  })

  const canReset =
    !!filters.state.name || filters.state.type.length > 0 || (!!filters.state.startDate && !!filters.state.endDate)

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length

  const handleFolderClick = useCallback((folder) => {
    setSelectedFolder(folder)
  }, [])

  const handleDeleteItem = useCallback(
    (id) => {
      setTableData((prevData) =>
        prevData
          .map((folder) => ({
            ...folder,
            images: folder.images.filter((image) => image.id !== id),
            size: folder.images.filter((image) => image.id !== id).length,
          }))
          .filter((folder) => folder.images.length > 0),
      )

      setSelectedFolder((prevFolder) => {
        if (!prevFolder) return null
        const updatedImages = prevFolder.images.filter((image) => image.id !== id)
        return {
          ...prevFolder,
          images: updatedImages,
          size: updatedImages.length,
        }
      })

      toast.success("Delete success!")
      table.onUpdatePageDeleteRow(dataFiltered.length)
    },
    [dataFiltered.length, table],
  )

  const handleDeleteItems = useCallback(() => {
    const updatedData = tableData
      .map((folder) => ({
        ...folder,
        images: folder.images.filter((image) => !table.selected.includes(image.id)),
        size: folder.images.filter((image) => !table.selected.includes(image.id)).length,
      }))
      .filter((folder) => folder.images.length > 0)

    toast.success("Delete success!")

    setTableData(updatedData)
    if (selectedFolder) {
      setSelectedFolder(updatedData.find((folder) => folder.id === selectedFolder.id) || null)
    }

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataFiltered.length,
      totalRowsFiltered: dataFiltered.length,
    })
  }, [dataFiltered.length, table, tableData, selectedFolder])

  const handleFolderUpdate = useCallback((updatedFolder) => {
    setTableData((prevData) => prevData.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder)))
    setSelectedFolder(updatedFolder)
  }, [])

  const handleCreateFolder = useCallback(
    (folderName) => {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: folderName,
        directory: folderName.toLowerCase().replace(/\s+/g, "_"),
        type: "folder",
        size: 0,
        modifiedAt: new Date().toISOString(),
        shared: [],
        isFavorited: false,
        images: [],
      }
      setTableData((prevData) => [...prevData, newFolder])
      createFolder.onFalse()
      toast.success("Folder created successfully!")
    },
    [createFolder],
  )

  const handleUploadFiles = useCallback(
    (event) => {
      if (selectedFolder) {
        const files = Array.from(event.target.files)
        const currentDate = new Date()
        const formattedDate = `${currentDate.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][currentDate.getMonth()]} ${currentDate.getFullYear()}`

        const newImages = files.map((file, index) => ({
          id: `file-${Date.now()}-${index}`,
          name: file.name,
          type: file.type.split("/")[1] || "document",
          size: file.size,
          modifiedAt: formattedDate,
          url: URL.createObjectURL(file),
          uploadedBy: user?.name || "Current User",
          uploaded_at: formattedDate,
          uploaded_by: user?.name || "Current User",
          isFavorited: false,
          shared: [],
          // Add standardized dimensions for consistent display
          // width: 200,
          // height: 200,
          // thumbnailStyle: {
          //   width: "200px",
          //   height: "00px",
          //   objectFit: "cover",
          //   borderRadius: "8px",
          // },
        }))

        const updatedFolder = {
          ...selectedFolder,
          images: [...selectedFolder.images, ...newImages],
          size: selectedFolder.images.length + newImages.length,
        }
        handleFolderUpdate(updatedFolder)
        toast.success("Files uploaded successfully!")
      }
    },
    [selectedFolder, handleFolderUpdate, user],
  )

  const handleDeleteFolder = useCallback(
    (folderId) => {
      const updatedData = tableData.filter((folder) => folder.id !== folderId)
      setTableData(updatedData)
      toast.success("Folder deleted successfully!")
      table.onUpdatePageDeleteRow(dataFiltered.length)
    },
    [dataFiltered.length, table, tableData],
  )

  const renderFilters = (
    <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-end", md: "center" }}>
      <FileManagerFilters
        filters={filters}
        dateError={dateError}
        onResetPage={table.onResetPage}
        openDateRange={openDateRange.value}
        onOpenDateRange={openDateRange.onTrue}
        onCloseDateRange={openDateRange.onFalse}
      />
    </Stack>
  )

  const renderResults = (
    <FileManagerFiltersResult filters={filters} totalResults={dataFiltered.length} onResetPage={table.onResetPage} />
  )

  // Custom renderer for folder view to display document details
  const renderFolderView = () => {
    if (!selectedFolder) return null

    // Add directory name to the folder view
    const folderWithDirectory = {
      ...selectedFolder,
      // Add custom props for the folder view component
      directoryName: selectedFolder.directory,
      documents: selectedFolder.images.map((image) => ({
        ...image,
        document_type: image.type,
        document_sub_type: image.name,
        // Use the original uploaded_at and uploaded_by from the API
        uploaded_at: image.uploaded_at || image.modifiedAt,
        uploaded_by: image.uploaded_by || "Unknown",
        // Ensure URL is properly formatted for API URLs
        fullUrl: image.url.startsWith("/") ? `https://api.swedenrelocators.se${image.url}` : image.url,
        // Add standardized dimensions for consistent display
        // width: 200,
        // height: 200,
        // thumbnailStyle: {
        //   width: "200px",
        //   height: "200px",
        //   objectFit: "cover",
        //   borderRadius: "8px",
        // },
      })),
    }

    return (
      <FileManagerFolderView
        folder={folderWithDirectory}
        onFileClick={(file) => {
          // If it's an API URL, open in new tab
          if (file.url && file.url.startsWith("/")) {
            window.open(`https://api.swedenrelocators.se${file.url}`, "_blank")
          } else {
            console.log("File clicked:", file)
          }
        }}
        onFolderUpdate={handleFolderUpdate}
        onBack={() => setSelectedFolder(null)}
        // Add custom styling for consistent file display
        // fileCardStyle={{
        //   width: "200px",
        //   height: "280px",
        //   margin: "8px",
        //   display: "flex",
        //   flexDirection: "column",
        //   overflow: "hidden",
        // }}
      />
    )
  }

  // Custom renderer for grid view to display upload info
  const renderGridView = () => (
    <FileManagerGridView
      table={table}
      dataFiltered={dataFiltered}
      onDeleteItem={handleDeleteFolder}
      onOpenConfirm={confirm.onTrue}
      onFolderClick={handleFolderClick}
      showDirectoryName
      // Add props to display upload info in the grid view
      showUploadInfo
      // Add custom styling for consistent folder display
      // folderCardStyle={{
      //   width: "200px",
      //   height: "200px",
      //   margin: "8px",
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      folderIconStyle={{
        width: "80px",
        height: "80px",
      }}
    />
  )


  return (
    <>
      <DashboardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Family Documents</Typography>
          {selectedFolder ? (
            <>
              <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleUploadFiles} multiple />
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                onClick={() => fileInputRef.current.click()}
              >
                Upload Files
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:folder-add-fill" />}
              onClick={createFolder.onTrue}
            >
              Create Folder
            </Button>
          )}
        </Stack>

        <CustomBreadcrumbs
          links={[
            { name: "Dashboard" },
            { name: "Documents" },
            { name: selectedFolder ? selectedFolder.name : "All Family Members" },
          ]}
          sx={{ my: { xs: 3, md: 2 } }}
        />

        <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
          {renderFilters}

          {canReset && renderResults}
        </Stack>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <Typography>Loading documents...</Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 10 }}
          >
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
            {(error.includes("Authentication") || error.includes("log in")) && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  // Redirect to login page or open login modal
                  window.location.href = "/login"
                }}
              >
                Login
              </Button>
            )}
          </Box>
        ) : notFound ? (
          <EmptyContent
            filled
            title="No Documents Found"
            description="No documents match your current filters or no documents are available."
            sx={{ py: 10 }}
          />
        ) : (
          <Box
            sx={{
              "& .file-grid": {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
                "& .file-item": {
                  width: "200px",
                  height: "280px",
                  margin: "0 auto",
                },
              },
              "& .folder-grid": {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
                "& .folder-item": {
                  width: "200px",
                  height: "200px",
                  margin: "0 auto",
                },
              },
            }}
          >
            {selectedFolder ? renderFolderView() : renderGridView()}
          </Box>
        )}
      </DashboardContent>

      <FileManagerNewFolderDialog
        open={createFolder.value}
        onClose={createFolder.onFalse}
        onCreateFolder={handleCreateFolder}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems()
              confirm.onFalse()
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  )
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, type, startDate, endDate } = filters

  const stabilizedThis = inputData.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (name) {
    inputData = inputData.filter((file) => file.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
  }

  if (type.length) {
    inputData = inputData.filter((file) => type.includes(file.type))
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (file) =>
          new Date(file.modifiedAt).getTime() >= startDate.getTime() &&
          new Date(file.modifiedAt).getTime() <= endDate.getTime(),
      )
    }
  }

  return inputData
}

