"use client"

import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import { layoutClasses } from "src/layouts/classes"

export function Main({ sx, children, layoutQuery, ...other }) {
  const theme = useTheme()

  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        minHeight: "100vh", // Ensure full viewport height
        position: "relative", // For absolute positioning of children if needed
        overflow: "hidden", // Prevent unwanted scrolling
        [theme.breakpoints.up(layoutQuery)]: {
          flexDirection: "row",
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
}

export function Content({ sx, children, layoutQuery, ...other }) {
  const theme = useTheme()

  const renderContent = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  )

  return (
    <Box
      className={layoutClasses.content}
      sx={{
        display: "flex",
        flex: "1 1 auto",
        alignItems: "center",
        justifyContent: "center",
        minHeight: { xs: "auto", md: "auto" },
        width: "100%",
        position: "relative",
        p: {
          xs: theme.spacing(2),
          sm: theme.spacing(3),
          md: theme.spacing(4),
        },
        [theme.breakpoints.up(layoutQuery)]: {
          p: theme.spacing(4),
          maxWidth: "100%",
        },
        ...sx,
      }}
      {...other}
    >
      {renderContent}
    </Box>
  )
}

