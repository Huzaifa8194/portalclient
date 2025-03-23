"use client"

import { useState } from "react"

import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"

import { fToNow } from "src/utils/format-time"

// Dummy data for direct messages
const dummyMessages = [
  {
    id: 1,
    sender: "John Doe",
    avatar: "/assets/images/avatars/avatar_1.jpg",
    message: "Hello! Your application has been received.",
    timestamp: new Date(2023, 5, 1, 9, 30),
  },
  {
    id: 2,
    sender: "Jane Smith",
    avatar: "/assets/images/avatars/avatar_2.jpg",
    message: "Your interview is scheduled for next week.",
    timestamp: new Date(2023, 5, 2, 14, 15),
  },
  {
    id: 3,
    sender: "Mike Johnson",
    avatar: "/assets/images/avatars/avatar_3.jpg",
    message: "Please submit the required documents by Friday.",
    timestamp: new Date(2023, 5, 3, 11, 45),
  },
  {
    id: 4,
    sender: "Mike Johnson",
    avatar: "/assets/images/avatars/avatar_3.jpg",
    message: "Please submit the required documents by Friday.",
    timestamp: new Date(2023, 5, 3, 11, 45),
  },
]

export function AppDirectMessages({ title, subheader, sx = {}, ...other }) {
  const theme = useTheme()
  const [messages] = useState(dummyMessages)
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ height: "100%", ...sx }} {...other}>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <List sx={{ p: 0, flex: 1, overflow: "auto" }}>
          {messages.map((message, index) => (
            <div key={message.id}>
              <ListItem alignItems="flex-start" sx={{ px: 3, py: 2.5 }}>
                <ListItemAvatar>
                  <Avatar alt={message.sender} src={message.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={message.sender}
                  secondary={
                    <>
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {message.message}
                      </Typography>
                      {" — "}
                      {fToNow(message.timestamp)}
                    </>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider variant="inset" component="li" />}
            </div>
          ))}
        </List>
      </Box>
    </Card>
  )
}

