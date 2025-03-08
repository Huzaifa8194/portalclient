import { uuidv4 as v4} from 'src/utils/uuidv4';
import { today } from "src/utils/format-time"

// ----------------------------------------------------------------------

export function initialConversation({ message, recipients, me }) {
  const conversationId = v4()
  const messageId = v4()

  const createdAt = today()

  const messageData = {
    id: messageId,
    body: message,
    contentType: "text",
    attachments: [],
    createdAt,
    senderId: me.id,
  }

  const conversationData = {
    id: conversationId,
    messages: [messageData],
    participants: [me, ...recipients],
    type: recipients.length > 1 ? "GROUP" : "ONE_TO_ONE",
    unreadCount: 0,
    createdAt,
  }

  return {
    messageData,
    conversationData,
  }
}

