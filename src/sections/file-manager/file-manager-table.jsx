"use client"

import { useState, useContext, useEffect, useRef } from "react"
import axios from "axios"
import { AuthContext } from "src/auth/context/auth-context"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import Tooltip from "@mui/material/Tooltip"
import TableBody from "@mui/material/TableBody"
import IconButton from "@mui/material/IconButton"
import TableContainer from "@mui/material/TableContainer"
import { tableCellClasses } from "@mui/material/TableCell"
import { tablePaginationClasses } from "@mui/material/TablePagination"
import Button from "@mui/material/Button"

import { toast } from "src/components/snackbar"
import { Iconify } from "src/components/iconify"
import { ConfirmDialog } from "src/components/custom-dialog"
import { TableNoData, TableHeadCustom, TableSelectedAction, TablePaginationCustom } from "src/components/table"

import { FileManagerTableRow } from "./file-manager-table-row"

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "size", label: "Size", width: 120 },
  { id: "type", label: "Type", width: 120 },
  { id: "modifiedAt", label: "Modified", width: 140 },
  {
    id: "shared",
    label: "Shared",
    align: "right",
    width: 140,
  },
  { id: "", width: 88 },
]

// ----------------------------------------------------------------------

export function FileManagerTable({
  sx,
  table,
  notFound,
  onDeleteRow,
  dataFiltered,
  onOpenConfirm,
  onFolderClick,
  ...other
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [renderKey, setRenderKey] = useState(0)
  const [localData, setLocalData] = useState(dataFiltered)
  const { user } = useContext(AuthContext)

  // Track deleted IDs to prevent them from reappearing
  const deletedIdsRef = useRef(new Set())

  // Only update local data from parent if it doesn't include deleted IDs
  useEffect(() => {
    if (dataFiltered && dataFiltered.length > 0) {
      // Filter out any items that we've already deleted
      const filteredData = dataFiltered.filter((item) => !deletedIdsRef.current.has(item.id))
      setLocalData(filteredData)
    }
  }, [dataFiltered])

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table

  const handleOpenConfirm = () => {
    setConfirmDelete(true)
  }

  const handleCloseConfirm = () => {
    setConfirmDelete(false)
  }

  const handleDeleteMultiple = async () => {
    try {
      if (!user?.accessToken) {
        toast.error("Authentication required. Please log in again.")
        return
      }

      // Store the selected IDs before making API calls
      const idsToDelete = [...selected]

      // Add these IDs to our deleted IDs set
      idsToDelete.forEach((id) => deletedIdsRef.current.add(id))

      // First update the local data immediately
      setLocalData((prevData) => prevData.filter((item) => !idsToDelete.includes(item.id)))

      // Make API calls for each selected document
      await Promise.all(
        idsToDelete.map((id) =>
          axios.delete(`https://api.swedenrelocators.se/api/document/${id}`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }),
        ),
      )

      // Call onDeleteRow for each ID to update parent state
      idsToDelete.forEach((id) => onDeleteRow(id))

      // Clear selection
      onSelectAllRows(false)

      // Force a re-render
      setRenderKey((prev) => prev + 1)

      toast.success("Selected items deleted successfully")
      handleCloseConfirm()
    } catch (err) {
      console.error("Delete error:", err)
      handleCloseConfirm()

      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Authentication failed. Please log in again.")
      } else if (err.response?.status === 404) {
        toast.error("One or more documents not found.")
      } else {
        toast.error(err.response?.data?.message || "Failed to delete documents")
      }
    }
  }

  // Handle single item deletion
  const handleSingleDelete = (id) => {

    deletedIdsRef.current.add(id)

    setLocalData((prevData) => prevData.filter((item) => item.id !== id))

    onDeleteRow(id)

    setRenderKey((prev) => prev + 1)
  }

  return (
    <>
      <Box
        key={renderKey}
        sx={{
          position: "relative",
          m: (theme) => ({ md: theme.spacing(-2, -3, 0, -3) }),
          ...sx,
        }}
        {...other}
      >
        <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          rowCount={localData.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              localData.map((row) => row.id),
            )
          }
          action={
            <>
              <Tooltip title="Share">
                <IconButton color="primary">
                  <Iconify icon="solar:share-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleOpenConfirm}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: "auto",
            borderRadius: 1.5,
          }}
        />

        <TableContainer sx={{ px: { md: 3 } }}>
          <Table
            size={dense ? "small" : "medium"}
            sx={{
              minWidth: 960,
              borderCollapse: "separate",
              borderSpacing: "0 16px",
            }}
          >
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={localData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  localData.map((row) => row.id),
                )
              }
              sx={{
                [`& .${tableCellClasses.head}`]: {
                  "&:first-of-type": {
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                  },
                  "&:last-of-type": {
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                },
              }}
            />

            <TableBody>
              {localData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <FileManagerTableRow
                  key={`${row.id}-${renderKey}`}
                  row={row}
                  selected={selected.includes(row.id)}
                  onSelectRow={() => onSelectRow(row.id)}
                  onDeleteRow={() => handleSingleDelete(row.id)}
                  onFolderClick={() => row.isFolder && onFolderClick && onFolderClick(row)}
                />
              ))}

              <TableNoData
                notFound={notFound || localData.length === 0}
                sx={{
                  m: -2,
                  borderRadius: 1.5,
                  border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        page={page}
        dense={dense}
        rowsPerPage={rowsPerPage}
        count={localData.length}
        onPageChange={onChangePage}
        onChangeDense={onChangeDense}
        onRowsPerPageChange={onChangeRowsPerPage}
        sx={{
          [`& .${tablePaginationClasses.toolbar}`]: {
            borderTopColor: "transparent",
          },
        }}
      />

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirm}
        title="Delete"
        content={`Are you sure you want to delete ${selected.length} selected items?`}
        action={
          <Button variant="contained" color="error" onClick={handleDeleteMultiple}>
            Delete
          </Button>
        }
      />
    </>
  )
}

