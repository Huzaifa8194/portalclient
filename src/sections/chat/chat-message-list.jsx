"use client"

import { useEffect, useRef } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

export function ChatMessageList({ messages = [], participants, loading }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }
    scrollToBottom()
  }, [messages])

  if (loading) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      ref={scrollRef}
      sx={{
        p: 3,
        height: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        scrollBehavior: "smooth",
      }}
    >
      {messages.map((message) => (
        <Stack
          key={message.id}
          direction="row"
          spacing={2}
          sx={{
            mb: 3,
            ...(message.senderId === "me" && {
              ml: "auto",
              alignItems: "flex-end",
            }),
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: (theme) =>
                message.senderId === "me" ? theme.palette.primary.main : theme.palette.background.neutral,
              color: (theme) =>
                message.senderId === "me" ? theme.palette.primary.contrastText : theme.palette.text.primary,
            }}
          >
            <Typography variant="body2">{message.body}</Typography>
          </Box>
        </Stack>
      ))}
    </Box>
  )
}

