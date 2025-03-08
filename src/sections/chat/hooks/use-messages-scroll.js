"use client"

import { useRef, useEffect } from "react"

export function useMessagesScroll(messages) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return { messagesEndRef, scrollToBottom }
}

