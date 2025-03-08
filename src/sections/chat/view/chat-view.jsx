"use client"

import { useState, useEffect, useCallback } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2"

import { paths } from "src/routes/paths"
import { useRouter, useSearchParams } from "src/routes/hooks"

import { CONFIG } from "src/config-global"
import { useGetConversation, useGetConversations } from "src/actions/chat"
import { useMockedUser } from "src/auth/hooks"
import { ChatMessageList } from "../chat-message-list"
import { ChatMessageInput } from "../chat-message-input"
import { initialConversation } from "../utils/initial-conversation"

import { AppWidgetSummary} from "./app-widget-summary"

// ----------------------------------------------------------------------

export function ChatView() {
  const router = useRouter()
  const { user } = useMockedUser()
  const searchParams = useSearchParams()
  const selectedConversationId = searchParams.get("id") || ""
  const [recipients, setRecipients] = useState([])

  const { conversations, conversationsLoading } = useGetConversations()
  const { conversation, conversationError, conversationLoading, mutateConversation } = useGetConversation(
    `${selectedConversationId}`,
  )

  const participants = conversation
    ? conversation.participants.filter((participant) => participant.id !== `${user?.id}`)
    : []

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.dashboard.chat)
    }
  }, [conversationError, router, selectedConversationId])

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected)
  }, [])

  const handleSendMessage = useCallback(
    (message) => {
      if (!message.trim()) return

      if (selectedConversationId) {
        // Add message to existing conversation
        const newMessage = {
          id: `temp-${Date.now()}`,
          body: message,
          contentType: "text",
          attachments: [],
          createdAt: new Date().toISOString(),
          senderId: "me",
        }

        // Optimistically update the UI
        if (conversation) {
          const updatedConversation = {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          }

          mutateConversation(updatedConversation, false)
        }

        // Here you would typically call an API to save the message
        // For example: sendMessageToApi(selectedConversationId, message);
      } else if (recipients.length > 0) {
        // Create a new conversation with the message
        const { conversationData } = initialConversation({
          message,
          recipients,
          me: { id: "me", name: user?.displayName || "Me", avatar: user?.photoURL },
        })

        // Here you would typically call an API to create the conversation
        // For example: createConversationApi(conversationData);

        // Navigate to the new conversation
        router.push(`${paths.dashboard.chat}?id=${conversationData.id}`)
      }
    },
    [selectedConversationId, conversation, recipients, user, router, mutateConversation],
  )

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Chat
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} md={4}>
          <AppWidgetSummary title="User ID:" total={357} extratext="Unique Identifier" icon="solar:user-id-bold" />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary title="User Type" total="Bronze" extratext="Basic User." icon="solar:medal-bold" />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Last Chat"
            total="Pending"
            extratext="Hello i would to tell yo..."
            icon="solar:chat-round-dots-bold"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: (theme) => theme.customShadows.card,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            p: 3,
            color: "text.secondary",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          We would highly recommend that you communicate to us via the Message section during your application process.
        </Typography>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          {selectedConversationId ? (
            <ChatMessageList
              messages={conversation?.messages ?? []}
              participants={participants}
              loading={conversationLoading}
            />
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={`${CONFIG.assetsDir}/assets/icons/empty/ic-chat-active.svg`}
                alt="Empty chat"
                style={{ width: 160, height: 160, marginBottom: 16 }}
              />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Good morning!
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Write something awesome...
              </Typography>
            </Box>
          )}

          <ChatMessageInput
            recipients={recipients}
            onAddRecipients={handleAddRecipients}
            selectedConversationId={selectedConversationId}
            disabled={!recipients.length && !selectedConversationId}
            onSendMessage={handleSendMessage}
          />
        </Box>
      </Box>
    </Box>
  )
}

