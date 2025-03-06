"use client"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import { useState } from "react"
import Link from "@mui/material/Link"

import { varAlpha } from "src/theme/styles"
import { AvatarShape } from "src/assets/illustrations"
import { Image } from "src/components/image"

// Define the grayish-black color
const grayishBlack = "rgba(45, 45, 45, 0.9)"

export function PricingCardUpdated({ card }) {
  const { subscription, price, caption, labelAction } = card
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getHref = (labelaction) => {
    switch (labelaction) {
      case "Choose Private":
        return "/auth/jwt/sign-up-options"
      case "Choose Companies":
        return "/auth/jwt/sign-up-company"
      case "Choose Partners":
        return "/auth/jwt/sign-up-partner"
      default:
        return "#" // Fallback to prevent invalid links
    }
  }

  const avatarLetter = price ? price.charAt(0) : "P"

  // Select the appropriate image based on the price
  const getImage = () => {
    switch (price) {
      case "Private":
        return "/priv.png"
      case "Companies":
        return "/comp.png"
      case "Partners":
        return "/partner.png"
      default:
        return "/priv.png" // Default to priv.png if no match
    }
  }

  // Get features based on the price
  const getFeatures = () => {
    switch (price) {
      case "Private":
        return [
          "One-Stop Immigration & Relocation Services",
          "Property Listing & Search",
          "EU Family Permits (Parents/Partner)",
          "Worldwide Visa Applications",
          "Immigration & Legal Assistance",
          "Move & Financial Management",
          "Temporary & Long-Term Housing Solutions",
          "School & Childcare Assistance",
          "Language & Cultural Training",
          "Healthcare & Social Security Setup",
          "Tax & Company Consultation",
          "List your Private Property",
          "Citizenship by Investment Programs",
        ]
      case "Companies":
        return [
          "Employees Work Permit Applications",
          "Employee Immigration Management",
          "Employee Housing Management",
          "Global Talent Recruitment & Relocation",
          "Payroll & EOR Services",
          "HR & Compliance Support",
          "Business Expansion & Market Entry",
          "Tax & Legal Advisory",
          "Corporate Housing & Employee Housing Solutions",
          "Real Estate & Property Management Firms",
          "Employee Integration Support",
          "Business Visa & Investor Immigration",
          "Recruitment & Talent Acquisition Firms",
          "Global Mobility & HR Consultants",
        ]
      case "Partners":
        return [
          "Immigration Consultants",
          "Relocation Companies & Agencies",
          "Law Firms & Legal Advisors",
          "Travel & Visa Agencies",
          "expat and business networking services",
        ]
      default:
        return []
    }
  }

  // Get description based on the price
  const getDescription = () => {
    switch (price) {
      case "Private":
        return "Set up your account to apply for yourself and your family."
      case "Companies":
        return "Set up your company account for employees' immigration and relocation."
      case "Partners":
        return "Join our partner program from anywhere in the world."
      default:
        return "Description"
    }
  }

  return (
    <Card
      sx={{
        textAlign: "center",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-4px)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <Box sx={{ position: "relative", height: 280 }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: "auto",
            bottom: -26,
            position: "absolute",
          }}
        />

        <Avatar
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
            bgcolor: "black", // Black background
          }}
          src="/logo.png" // Use the logo.png from the public folder
          alt="Logo" // Alt text for accessibility
        >
          {avatarLetter}
        </Avatar>

        <Image
          src={getImage() || "/placeholder.svg"}
          alt={price}
          ratio="16/9"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          slotProps={{
            overlay: {
              bgcolor: (theme) => varAlpha(theme.palette.common.blackChannel, 0.05), // Even lighter overlay
            },
          }}
        />
      </Box>

      <ListItemText
        sx={{ mt: 8, mb: 2 }}
        primary={
          <Typography
            component="a"
            variant="subtitle1"
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit", // Keeps default text color
              textTransform: "uppercase", // Make the heading uppercase
            }}
            href={getHref(labelAction)}
          >
            {price || "Account Type"}
          </Typography>
        }
        secondary={
          <>
            <Typography component="span" variant="body2">
              {getDescription()}
            </Typography>
          </>
        }
        secondaryTypographyProps={{ component: "span", mt: 0.5 }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <Button sx={{ flex: 1 }} size="large" variant="contained" href={getHref(labelAction)}>
          {labelAction}
        </Button>

        <IconButton
          size="small"
          sx={{
            color: grayishBlack,
            border: 2,
            borderColor: grayishBlack,
            "&:hover": {
              bgcolor: grayishBlack,
              color: "white",
            },
            width: 28,
            height: 28,
            fontSize: 16,
            fontWeight: "bold",
            borderRadius: "50%",
          }}
          onClick={handleClick}
          aria-controls={open ? "features-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          ?
        </IconButton>

        <Menu
          id="features-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "features-button",
            sx: { maxWidth: 320, maxHeight: 400 },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            sx={{
              pointerEvents: "none",
              backgroundColor: grayishBlack,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Services included in this sign up
          </MenuItem>
          {getFeatures().map((feature, index) => (
            <MenuItem
              key={index}
              component={Link}
              href={getHref(labelAction)}
              onClick={handleClose}
              sx={{
                whiteSpace: "normal",
                textAlign: "left",
                py: 1,
              }}
            >
              <Typography variant="body2">{feature}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Card>
  )
}