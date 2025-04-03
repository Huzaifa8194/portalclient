"use client"

import { useCallback } from "react"

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
import ListItemText from "@mui/material/ListItemText"
import AvatarGroup, { avatarGroupClasses } from "@mui/material/AvatarGroup"

import { useBoolean } from "src/hooks/use-boolean"
import { useCopyToClipboard } from "src/hooks/use-copy-to-clipboard"

import { fData } from "src/utils/format-number"

import { CONFIG } from "src/config-global"

import { toast } from "src/components/snackbar"
import { Iconify } from "src/components/iconify"
import { ConfirmDialog } from "src/components/custom-dialog"
import { usePopover, CustomPopover } from "src/components/custom-popover"

import { FileManagerShareDialog } from "./file-manager-share-dialog"

export function FileManagerFolderItem({ sx, folder, selected, onSelect, onDelete, onFolderClick, ...other }) {
  const { copy } = useCopyToClipboard()

  const share = useBoolean()
  const popover = usePopover()
  const confirm = useBoolean()
  const checkbox = useBoolean()
  const favorite = useBoolean(folder.isFavorited)

  const handleCopy = useCallback(() => {
    toast.success("Copied!")
    copy(folder.url)
  }, [copy, folder.url])

  const handleFolderClick = useCallback(
    (event) => {
      
      if (event.target.closest('input[type="checkbox"]') || event.target.closest("button")) {
        return
      }

      if (onFolderClick) {
        onFolderClick(folder)
      }
    },
    [onFolderClick, folder],
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
          name: "checkbox-favorite",
          "aria-label": "Checkbox favorite",
        }}
      />

      <IconButton color={popover.open ? "inherit" : "default"} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  )

  const renderIcon = (
    <Box onMouseEnter={checkbox.onTrue} onMouseLeave={checkbox.onFalse} sx={{ width: 36, height: 36 }}>
      {(checkbox.value || selected) && onSelect ? (
        <Checkbox
          checked={selected}
          onClick={onSelect}
          icon={<Iconify icon="eva:radio-button-off-fill" />}
          checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          sx={{ width: 1, height: 1 }}
        />
      ) : (
        <Box
          component="img"
          src={`${CONFIG.assetsDir}/assets/icons/files/ic-folder.svg`}
          sx={{ width: 1, height: 1 }}
        />
      )}
    </Box>
  )

  const renderText = (
    <ListItemText
      primary={folder.name}
      secondary={
        <>
          {fData(folder.size)}
          <Box
            component="span"
            sx={{
              mx: 0.75,
              width: 2,
              height: 2,
              borderRadius: "50%",
              bgcolor: "currentColor",
            }}
          />
          {folder.totalFiles} files
        </>
      }
      primaryTypographyProps={{
        noWrap: true,
        typography: "subtitle1",
        color: "main",
        sx: {
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: "span",
        alignItems: "center",
        typography: "caption",
        color: "text.disabled",
        display: "inline-flex",
      }}
    />
  )

  const renderAvatar = (
    <AvatarGroup
      max={3}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 24,
          height: 24,
          "&:first-of-type": { fontSize: 12 },
        },
      }}
    >
      {folder.shared?.map((person) => (
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
          width: 1,
          cursor: "pointer",
          bgcolor: "background.paper",
          ...((checkbox.value || selected) && {
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          "&:hover": {
            bgcolor: "background.neutral",
          },
          ...sx,
        }}
        onClick={handleFolderClick}
        {...other}
      >
        {renderIcon}

        {renderAction}

        {renderText}

        {!!folder?.shared?.length && renderAvatar}
      </Paper>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: "right-top" } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose()
              handleCopy()
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Copy Link
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose()
              share.onTrue()
            }}
          >
            <Iconify icon="solar:share-bold" />
            Share
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

      <FileManagerShareDialog open={share.value} shared={folder.shared} onClose={share.onFalse} />

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

