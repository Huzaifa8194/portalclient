"use client"

import { useState, useCallback, useEffect, useContext } from "react"
import axios from "axios"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import { useBoolean } from "src/hooks/use-boolean"
import { useSetState } from "src/hooks/use-set-state"
import { fIsAfter, fIsBetween } from "src/utils/format-time"
import { DashboardContent } from "src/layouts/dashboard"
import { FILE_TYPE_OPTIONS } from "src/_mock"
import { AuthContext } from "src/auth/context/auth-context"
import { toast } from "src/components/snackbar"
import { Iconify } from "src/components/iconify"
import { fileFormat } from "src/components/file-thumbnail"
import { EmptyContent } from "src/components/empty-content"
import { ConfirmDialog } from "src/components/custom-dialog"
import { useTable, rowInPage, getComparator } from "src/components/table"
import { FileManagerTable } from "../file-manager-table"
import { FileManagerFilters } from "../file-manager-filters"
import { FileManagerGridView } from "../file-manager-grid-view"
import { FileManagerFiltersResult } from "../file-manager-filters-result"
import { FileManagerNewFolderDialog } from "../file-manager-new-folder-dialog"

export function FileManagerView() {
  const table = useTable({ defaultRowsPerPage: 10 })
  const openDateRange = useBoolean()
  const confirm = useBoolean()
  const upload = useBoolean()
  const [view, setView] = useState("list")
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)
  const [currentFolder, setCurrentFolder] = useState(null)
  const [folderPath, setFolderPath] = useState([])


  const filters = useSetState({
    name: "",
    type: [],
    startDate: null,
    endDate: null,
  })

  const getFileType = useCallback((extension) => {
    const typeMap = {
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',
      bmp: 'image',

      pdf: 'pdf',
      doc: 'word',
      docx: 'word',
      txt: 'text',
      rtf: 'text',

      xls: 'excel',
      xlsx: 'excel',

      zip: 'zip',
      rar: 'zip',

      default: 'file'
    };

    return typeMap[extension] || typeMap.default;
  }, []);

  const processApiData = useCallback(
    (data) => {
      const processedData = []

      data.forEach((familyMember) => {
        const folderItem = {

          id: familyMember.id || `folder-${familyMember.directory_name}`,
          name: familyMember.directory_name,
          type: "folder",
          size: 0,
          isFavorited: false,
          shared: [],
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
          isFolder: true,
          files: [],
        }

        familyMember.documents.forEach((doc) => {
          const fileExtension = doc.url.split(".").pop().toLowerCase()
          const fileType = getFileType(fileExtension)

          folderItem.files.push({
            id: doc.id,
            name: `${doc.document_sub_type}.${fileExtension}`,
            type: fileType,
            url: doc.url,
            size: Math.floor(Math.random() * 10000) + 1000,
            isFavorited: false,
            shared: [
              {
                id: doc.uploaded_by_id,
                name: doc.uploaded_by,
                email: `${doc.uploaded_by.toLowerCase().replace(" ", ".")}@example.com`,
                permission: "view",
                avatarUrl: null,
              },
            ],
            createdAt: new Date(doc.uploaded_at).toISOString(),
            modifiedAt: new Date(doc.uploaded_at).toISOString(),
            parentFolder: familyMember.directory_name,
            documentType: doc.document_type,
            documentSubType: doc.document_sub_type,
            uploadedBy: doc.uploaded_by,
            uploadedAt: doc.uploaded_at,
          })
        })

        processedData.push(folderItem)
      })
      return processedData
    },
    [getFileType],
  )
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("https://api.swedenrelocators.se/api/miscellaneous/documents/familyMembers", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })

        if (response.data?.data) {
          const processedData = processApiData(response.data.data)
          setTableData(processedData)
          // toast.success("Documents loaded successfully!")
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to fetch documents. Please try again later.")
        toast.error("Failed to fetch documents")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [processApiData, user.accessToken])

  // Handle folder click
  const handleFolderClick = useCallback(
    (folder) => {
      setCurrentFolder(folder)
      setFolderPath([...folderPath, folder])
    },
    [folderPath],
  )

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = useCallback(
    (index) => {
      if (index === -1) {
        // Root level
        setCurrentFolder(null)
        setFolderPath([])
      } else {
        const folder = folderPath[index]
        setCurrentFolder(folder)
        setFolderPath(folderPath.slice(0, index + 1))
      }
    },
    [folderPath],
  )

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate)

  const getCurrentData = useCallback(() => {
    if (currentFolder === null) {

      return tableData
    }
    return currentFolder.files

  }, [currentFolder, tableData])

  const dataFiltered = applyFilter({
    inputData: getCurrentData(),
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  })

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage)

  const canReset =
    !!filters.state.name || filters.state.type.length > 0 || (!!filters.state.startDate && !!filters.state.endDate)

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length

  const handleChangeView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView)
    }
  }, [])

  const handleDeleteItem = useCallback(
    (id) => {
      if (currentFolder === null) {

        const deleteRow = tableData.filter((row) => row.id !== id)
        setTableData(deleteRow)
      } else {

        const updatedFolder = {
          ...currentFolder,
          files: currentFolder.files.filter((file) => file.id !== id),
        }

        const updatedTableData = tableData.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder))

        setTableData(updatedTableData)
        setCurrentFolder(updatedFolder)
      }

      toast.success("Delete success!")
      table.onUpdatePageDeleteRow(dataInPage.length)
    },
    [currentFolder, dataInPage.length, table, tableData],
  )

  const handleDeleteItems = useCallback(() => {
    if (currentFolder === null) {

      const deleteRows = tableData.filter((row) => !table.selected.includes(row.id))
      setTableData(deleteRows)
    } else {

      const updatedFolder = {
        ...currentFolder,
        files: currentFolder.files.filter((file) => !table.selected.includes(file.id)),
      }


      const updatedTableData = tableData.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder))

      setTableData(updatedTableData)
      setCurrentFolder(updatedFolder)
    }

    toast.success("Delete success!")
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    })
  }, [currentFolder, dataFiltered.length, dataInPage.length, table, tableData])

  const renderFilters = (
    <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-end", md: "center" }}>
      <FileManagerFilters
        filters={filters}
        dateError={dateError}
        onResetPage={table.onResetPage}
        openDateRange={openDateRange.value}
        onOpenDateRange={openDateRange.onTrue}
        onCloseDateRange={openDateRange.onFalse}
        options={{ types: FILE_TYPE_OPTIONS }}
      />

      <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
        <ToggleButton value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )

  const renderResults = (
    <FileManagerFiltersResult filters={filters} totalResults={dataFiltered.length} onResetPage={table.onResetPage} />
  )

  const renderBreadcrumbs = (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {/* <Link
        component="button"
        underline="hover"
        color="inherit"
        onClick={() => {
          if (folderPath.length > 0) {
            handleBreadcrumbClick(folderPath.length - 2);
          } else {
            handleBreadcrumbClick(-1);
          }
        }}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {folderPath.length > 0 ? (
          <>
            <Iconify icon="eva:arrow-ios-back-fill" sx={{ mr: 0.5 }} />
            Back
          </>
        ) : (
          <>
            <Iconify icon="material-symbols:home" sx={{ mr: 0.5 }} />
            Home
          </>
        )}
      </Link> */}

      {folderPath.map((folder, index) => (
        <Link
          key={folder.id}
          component="button"
          underline="hover"
          color={index === folderPath.length - 1 ? "text.primary" : "inherit"}
          onClick={() => handleBreadcrumbClick(index)}
        >
          {folder.name}
        </Link>
      ))}
    </Breadcrumbs>
  );

  return (
    <>
      <DashboardContent>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Family Documents</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:cloud-upload-fill" />} onClick={upload.onTrue}>
            Upload
          </Button>
        </Stack>

        {folderPath.length > 0 && (
          <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              onClick={() => handleBreadcrumbClick(folderPath.length - 2)}
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                  bgcolor: 'grey.800',
                },
              }}
            >
              Back
            </Button>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              {folderPath.map((folder, index) => (
                <Link
                  key={folder.id}
                  component="button"
                  underline="hover"
                  color={index === folderPath.length - 1 ? "text.primary" : "inherit"}
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {folder.name}
                </Link>
              ))}
            </Breadcrumbs>
          </Stack>
        )}

        {/* Rest of your existing code remains the same */}
        <Stack spacing={2.5} sx={{ my: { xs: 3, md: 5 } }}>
          {renderFilters}
          {canReset && renderResults}
        </Stack>
        {/* </Stack> */}

        {isLoading ? (
          <Typography variant="body1" sx={{ py: 10, textAlign: "center" }}>
            Loading documents...
          </Typography>
        ) : error ? (
          <Typography variant="body1" color="error" sx={{ py: 10, textAlign: "center" }}>
            {error}
          </Typography>
        ) : notFound ? (
          <EmptyContent filled sx={{ py: 10 }} />
        ) : (
          <>
            {view === "list" ? (
              <FileManagerTable
                table={table}
                dataFiltered={dataFiltered}
                onDeleteRow={handleDeleteItem}
                notFound={notFound}
                onOpenConfirm={confirm.onTrue}
                onFolderClick={handleFolderClick}
              />
            ) : (
              <FileManagerGridView
                table={table}
                dataFiltered={dataFiltered}
                onDeleteItem={handleDeleteItem}
                onOpenConfirm={confirm.onTrue}
                onFolderClick={handleFolderClick}
              />
            )}
          </>
        )}
      </DashboardContent>

      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

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
    inputData = inputData.filter((file) => type.includes(fileFormat(file.type)))
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((file) => fIsBetween(file.createdAt, startDate, endDate))
    }
  }

  return inputData
}

