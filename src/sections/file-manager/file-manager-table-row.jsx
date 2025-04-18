"use client"

import { useState, useCallback, useContext } from "react"
import axios from "axios"
import { AuthContext } from "src/auth/context/auth-context"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import { useTheme } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import ListItemText from "@mui/material/ListItemText"
import TableRow, { tableRowClasses } from "@mui/material/TableRow"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import AvatarGroup, { avatarGroupClasses } from "@mui/material/AvatarGroup"

import { useBoolean } from "src/hooks/use-boolean"
import { useDoubleClick } from "src/hooks/use-double-click"
import { useCopyToClipboard } from "src/hooks/use-copy-to-clipboard"

import { fData } from "src/utils/format-number"
import { fDate, fTime } from "src/utils/format-time"

import { varAlpha } from "src/theme/styles"

import { toast } from "src/components/snackbar"
import { Iconify } from "src/components/iconify"
import { ConfirmDialog } from "src/components/custom-dialog"
import { FileThumbnail } from "src/components/file-thumbnail"
import { usePopover, CustomPopover } from "src/components/custom-popover"

import { FileManagerShareDialog } from "./file-manager-share-dialog"
import { FileManagerFileDetails } from "./file-manager-file-details"

// ----------------------------------------------------------------------

export function FileManagerTableRow({ row, selected, onSelectRow, onDeleteRow, onFolderClick }) {
  const theme = useTheme()

  const { copy } = useCopyToClipboard()

  const [inviteEmail, setInviteEmail] = useState("")

  const favorite = useBoolean(row.isFavorited)

  const details = useBoolean()

  const share = useBoolean()

  const confirm = useBoolean()

  const popover = usePopover()

  const { user } = useContext(AuthContext)

  const handleDelete = async () => {
    try {
      if (!user?.accessToken) {
        toast.error("Authentication required. Please log in again.")
        return
      }

      await axios.delete(`https://api.swedenrelocators.se/api/document/${row.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })

      onDeleteRow(row.id)
      confirm.onFalse()
    } catch (err) {
      console.error("Delete error:", err)
      confirm.onFalse()

      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Authentication failed. Please log in again.")
      } else if (err.response?.status === 404) {
        toast.error("Document not found.")
      } else {
        toast.error(err.response?.data?.message || "Failed to delete document")
      }
    }
  }

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value)
  }, [])

  const handleClick = useDoubleClick({
    click: () => {
      if (row.isFolder && onFolderClick) {
        onFolderClick()
      } else {
        details.onTrue()
      }
    },
    doubleClick: () => {
      if (row.isFolder && onFolderClick) {
        onFolderClick()
      } else {
        console.info("DOUBLE CLICK")
      }
    },
  })

  const handleCopy = useCallback(() => {
    toast.success("Copied!")
    copy(row.url)
  }, [copy, row.url])

  const handleDownload = () => {
    try {
      // toast.info("Opening document...")

      // Get the full URL
      let fileUrl = row.url
      if (fileUrl.startsWith("/")) {
        fileUrl = `https://api.swedenrelocators.se${fileUrl}`
      }

      // Create a form to submit with authentication
      const form = document.createElement("form")
      form.method = "GET"
      form.action = fileUrl
      form.target = "_blank"

      // Add authorization header as a hidden field
      // Note: This is a workaround - the server needs to be configured to accept this
      if (user?.accessToken) {
        const authInput = document.createElement("input")
        authInput.type = "hidden"
        authInput.name = "auth_token"
        authInput.value = user.accessToken
        form.appendChild(authInput)
      }

      // Submit the form
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      // Show instructions to the user
      // toast.success("Document opened. Please use the browser's download button to save it.")
    } catch (error) {
      console.error("Download error:", error)
      // toast.error("Failed to open document. Please try again.")
    }
  }

  const defaultStyles = {
    borderTop: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.16)}`,
    borderBottom: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.16)}`,
    "&:first-of-type": {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderLeft: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.16)}`,
    },
    "&:last-of-type": {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderRight: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.16)}`,
    },
  }

  return (
    <>
      <TableRow
        selected={selected}
        sx={{
          borderRadius: 2,
          cursor: row.isFolder ? "pointer" : "default",
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: "background.paper",
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(["background-color", "box-shadow"], {
              duration: theme.transitions.duration.shortest,
            }),
            "&:hover": { backgroundColor: "background.paper", boxShadow: theme.customShadows.z20 },
          },
          [`& .${tableCellClasses.root}`]: { ...defaultStyles },
          ...(details.value && { [`& .${tableCellClasses.root}`]: { ...defaultStyles } }),
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onDoubleClick={() => console.info("ON DOUBLE CLICK")}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, "aria-label": `row-checkbox` }}
          />
        </TableCell>

        <TableCell onClick={handleClick}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FileThumbnail file={row.type} />

            <Typography
              noWrap
              variant="inherit"
              sx={{
                maxWidth: 360,
                cursor: "pointer",
                ...(details.value && { fontWeight: "fontWeightBold" }),
                ...(row.isFolder && {
                  "&:hover": { textDecoration: "underline" },
                }),
              }}
            >
              {row.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
          {row.isFolder ? "--" : fData(row.size)}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
          {row.isFolder ? "Folder" : row.type}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
          <ListItemText
            primary={fDate(row.modifiedAt)}
            secondary={fTime(row.modifiedAt)}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{ mt: 0.5, component: "span", typography: "caption" }}
          />
        </TableCell>

        <TableCell align="right" onClick={handleClick}>
          <AvatarGroup
            max={4}
            sx={{
              display: "inline-flex",
              [`& .${avatarGroupClasses.avatar}`]: {
                width: 24,
                height: 24,
                "&:first-of-type": { fontSize: 12 },
              },
            }}
          >
            {row.shared &&
              row.shared.map((person, index) => (
                <Avatar key={person.id || `avatar-${index}-${row.id}`} alt={person.name} src={person.avatarUrl} />
              ))}
          </AvatarGroup>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorite.value}
            onChange={favorite.onToggle}
            sx={{ p: 0.75 }}
          />

          <IconButton color={popover.open ? "inherit" : "default"} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: "right-top" } }}
      >
        <MenuList>
          {/* <MenuItem
            onClick={() => {
              popover.onClose()
              handleCopy()
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Copy Link
          </MenuItem> */}

          <MenuItem
            onClick={() => {
              popover.onClose()
              handleDownload()
            }}
          >
            <Iconify icon="eva:download-fill" />
            Download
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose()
              // Move functionality will be implemented later
            }}
          >
            <Iconify icon="eva:move-fill" />
            Move
          </MenuItem>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem
            onClick={() => {
              confirm.onTrue()
              popover.onClose()
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <FileManagerFileDetails
        item={row}
        favorited={favorite.value}
        onFavorite={favorite.onToggle}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={onDeleteRow}
      />

      <FileManagerShareDialog
        open={share.value}
        shared={row.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={handleCopy}
        onClose={() => {
          share.onFalse()
          setInviteEmail("")
        }}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </>
  )
}
