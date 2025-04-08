"use client"

import { useState, useCallback, useContext } from "react"

import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import AvatarGroup, { avatarGroupClasses } from "@mui/material/AvatarGroup"

import { useBoolean } from "src/hooks/use-boolean"
import { useCopyToClipboard } from "src/hooks/use-copy-to-clipboard"

import { fData } from "src/utils/format-number"
import { fDateTime } from "src/utils/format-time"

import { toast } from "src/components/snackbar"
import { Iconify } from "src/components/iconify"
import { ConfirmDialog } from "src/components/custom-dialog"
import { FileThumbnail } from "src/components/file-thumbnail"
import { usePopover, CustomPopover } from "src/components/custom-popover"
import { AuthContext } from "src/auth/context/auth-context"

import { FileManagerShareDialog } from "./file-manager-share-dialog"
import { FileManagerFileDetails } from "./file-manager-file-details"

// ----------------------------------------------------------------------

export function FileManagerFileItem({ file, selected, onSelect, onDelete, sx, ...other }) {
  const share = useBoolean()

  const confirm = useBoolean()

  const details = useBoolean()

  const popover = usePopover()

  const checkbox = useBoolean()

  const { copy } = useCopyToClipboard()

  const favorite = useBoolean(file.isFavorited)

  const [inviteEmail, setInviteEmail] = useState("")

  const { user } = useContext(AuthContext)

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value)
  }, [])

  const handleCopy = useCallback(() => {
    toast.success("Copied!")
    copy(file.url)
  }, [copy, file.url])

  const handleDownload = () => {
    try {
      // toast.info("Opening document...")

      // Get the full URL
      let fileUrl = file.url
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

  const renderIcon = (
    <Box
      onMouseEnter={checkbox.onTrue}
      onMouseLeave={checkbox.onFalse}
      sx={{ display: "inline-flex", width: 36, height: 36 }}
    >
      {(checkbox.value || selected) && onSelect ? (
        <Checkbox
          checked={selected}
          onClick={onSelect}
          icon={<Iconify icon="eva:radio-button-off-fill" />}
          checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          inputProps={{
            id: `item-checkbox-${file.id}`,
            "aria-label": `Item checkbox`,
          }}
          sx={{ width: 1, height: 1 }}
        />
      ) : (
        <FileThumbnail file={file.type} sx={{ width: 1, height: 1 }} />
      )}
    </Box>
  )

  const renderAction = (
    <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: "absolute" }}>
      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorite.value}
        onChange={favorite.onToggle}
        inputProps={{
          id: `favorite-checkbox-${file.id}`,
          "aria-label": `Favorite checkbox`,
        }}
      />

      <IconButton color={popover.open ? "inherit" : "default"} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  )

  const renderText = (
    <>
      <Typography
        variant="subtitle2"
        onClick={details.onTrue}
        sx={{
          mt: 2,
          mb: 0.5,
          width: "100%",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          textAlign: "start",
          cursor: "pointer",
        }}
      >
        {file.name}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          maxWidth: "100%",
          whiteSpace: "nowrap",
          typography: "caption",
          color: "text.disabled",
        }}
      >
        {fData(file.size)}

        <Box
          component="span"
          sx={{
            mx: 0.75,
            width: 2,
            height: 2,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: "currentColor",
          }}
        />
        <Typography noWrap component="span" variant="caption">
          {fDateTime(file.modifiedAt)}
        </Typography>
      </Stack>
    </>
  )

  const renderAvatar = (
    <AvatarGroup
      max={3}
      sx={{
        mt: 1,
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 24,
          height: 24,
          "&:first-of-type": { fontSize: 12 },
        },
      }}
    >
      {file.shared?.map((person) => (
        <Avatar key={person.id || person.name} alt={person.name} src={person.avatarUrl} />
      ))}
    </AvatarGroup>
  )

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          display: "flex",
          borderRadius: 2,
          cursor: "pointer",
          position: "relative",
          bgcolor: "transparent",
          flexDirection: "column",
          alignItems: "flex-start",
          ...((checkbox.value || selected) && {
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        onClick={(event) => {
          // Prevent details opening when clicking on checkbox or action buttons
          if (event.target.closest('input[type="checkbox"]') || event.target.closest("button")) {
            return
          }
          details.onTrue()
        }}
        {...other}
      >
        {renderIcon}

        {renderText}

        {renderAvatar}

        {renderAction}
      </Paper>

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
        item={file}
        favorited={favorite.value}
        onFavorite={favorite.onToggle}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={() => {
          details.onFalse()
          onDelete()
        }}
      />

      <FileManagerShareDialog
        open={share.value}
        shared={file.shared}
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
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  )
}
