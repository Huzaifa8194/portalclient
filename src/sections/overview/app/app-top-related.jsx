import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Scrollbar } from "src/components/scrollbar"
import { useState } from "react"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import { Iconify } from "src/components/iconify"

// ----------------------------------------------------------------------

export function AppTopRelated({ title, subheader, list, sx = {}, ...other }) {
  const [expanded, setExpanded] = useState(false)

  const handleItemClick = (item) => {
    console.log(`Clicked on ${item.name}`)
    // Implement your click handler logic here
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ height: '100%', ...sx }} {...other}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Scrollbar sx={{ flex: 1 }}>
          <Box sx={{ p: 3, minWidth: 360, display: "flex", flexDirection: "column" }}>
            {list.map((item) => (
              <Item key={item.id} item={item} onClick={() => handleItemClick(item)} />
            ))}
          </Box>
        </Scrollbar>
      </Box>
    </Card>
  )
}

function Item({ item, onClick, sx, ...other }) {
  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "action.hover",
        },
        borderRadius: 1,
        p: 1,
        mb: 1,
        ...sx,
      }}
      onClick={onClick}
      {...other}
    >
      <Avatar
        variant="rounded"
        src={item.shortcut}
        sx={{
          p: 1,
          width: 48,
          height: 48,
          bgcolor: "background.neutral",
        }}
      />

      <div>
        <Box sx={{ mb: 1, gap: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle2" noWrap>
            {item.name}
          </Typography>
        </Box>
      </div>
    </Box>
  )
}