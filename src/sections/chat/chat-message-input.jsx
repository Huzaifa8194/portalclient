"use client"

import { useRef, useState, useCallback } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"

import { Iconify } from "src/components/iconify"

export function ChatMessageInput({ disabled, onSendMessage }) {
  const fileRef = useRef(null)
  const [message, setMessage] = useState("")

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }, [])

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value)
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!message) return

    if (onSendMessage) {
      onSendMessage(message)
    }
    setMessage("")
  }, [message, onSendMessage])

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage()
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "background.default",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <InputBase
          fullWidth
          value={message}
          disabled={disabled}
          placeholder="Type a message"
          onChange={handleChangeMessage}
          onKeyUp={handleKeyUp}
          sx={{
            p: 1.5,
            borderRadius: 1,
            bgcolor: "background.neutral",
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground",
            },
          }}
        />

        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleAttach} disabled={disabled}>
            <Iconify icon="solar:gallery-add-bold" />
          </IconButton>
          <IconButton onClick={handleAttach} disabled={disabled}>
            <Iconify icon="eva:attach-2-fill" />
          </IconButton>
          <IconButton
            onClick={handleSendMessage}
            disabled={!message || disabled}
            sx={{
              bgcolor: (theme) => (message ? theme.palette.primary.main : "background.neutral"),
              color: (theme) => (message ? theme.palette.primary.contrastText : "text.disabled"),
              "&:hover": {
                bgcolor: (theme) => (message ? theme.palette.primary.dark : "background.neutral"),
              },
            }}
          >
            <Iconify icon="solar:send-bold" />
          </IconButton>
        </Stack>
      </Stack>

      <input type="file" ref={fileRef} style={{ display: "none" }} accept="image/*,video/*,application/*" />
    </Box>
  )
}

