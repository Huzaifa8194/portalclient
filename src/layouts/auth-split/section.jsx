"use client"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Tooltip from "@mui/material/Tooltip"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useLocation } from "react-router-dom"

import { RouterLink } from "src/routes/components"

import { CONFIG } from "src/config-global"
import { varAlpha, bgGradient } from "src/theme/styles"

// ----------------------------------------------------------------------

export function Section({
  sx,
  method,
  layoutQuery,
  methods,
  pageType,
  title = "Complete Online Relocation Solution",
  imgUrl = `${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`,
  subtitle = "We believe in transparency",
  slots,
  ...other
}) {
  const theme = useTheme()
  const location = useLocation()

  // Check if we're on the company signup, partner signup, private signup, or sign-in-options page
  const isCompanySignup = pageType === "company-signup" || location.pathname.includes("sign-up-company")
  const isPartnerSignup = pageType === "partner-signup" || location.pathname.includes("sign-up-partner")
  const isPrivateSignup =
    pageType === "private-signup" ||
    location.pathname.includes("sign-up-options") ||
    location.pathname.includes("sign-up")
  const isPrivateSignin = location.pathname.includes("sign-in-options")

  // Set content based on the page type
  let displayTitle = title
  let displaySubtitle = subtitle
  let displayImgUrl = imgUrl

  if (isCompanySignup) {
    displayTitle = "International Talent & Employee Management"
    displaySubtitle = "Digital Tool for Global Workforce & Immigration Management"
    displayImgUrl = "/companySignup.png"
  } else if (isPartnerSignup) {
    displayTitle = "Join Our Global Partner Network"
    displaySubtitle = "Accelerate Growth with Digital Client Solutions"
    displayImgUrl = "/partnerSignup.png"
  } else if (isPrivateSignup) {
    displayTitle = "Welcome To A New Digital World"
    displaySubtitle = "of Immigration & Relocation Services"
    displayImgUrl = "/privateSignup.png"
  } else if (isPrivateSignin) {
    displayTitle = "Continue Your Relocation Journey"
    displaySubtitle = "You are entering the digital era of seamless Relocation & Immigration!"
    displayImgUrl = "/privateSignin.png"
  }

  // Check if this is the "International Talent & Employee Management" section
  const isInternationalTalent = displayTitle === "International Talent & Employee Management"

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(
            theme.vars.palette.background.defaultChannel,
            0.92,
          )}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/background/background-3-blur.webp`,
        }),
        // Apply different styling based on whether it's the International Talent section
        px: isInternationalTalent ? 3 : 2,
        pb: isInternationalTalent ? 10 : undefined,
        width: 1,
        maxWidth: isInternationalTalent ? 480 : 450,
        display: "none",
        position: "relative",
        pt: isInternationalTalent ? "var(--layout-header-desktop-height)" : undefined,
        [theme.breakpoints.up(layoutQuery)]: {
          gap: isInternationalTalent ? 8 : 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        },
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography
          variant={isInternationalTalent ? "h4" : "h3"}
          sx={{
            textAlign: "center",
            mb: isInternationalTalent ? undefined : 1,
            pt: isInternationalTalent ? 5 : undefined,
          }}
        >
          {displayTitle}
        </Typography>

        {displaySubtitle && (
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontWeight: "regular",
              mt: isInternationalTalent ? 2 : undefined,
            }}
          >
            {displaySubtitle}
          </Typography>
        )}
      </div>

      <Box
        component="img"
        alt="Dashboard illustration"
        src={displayImgUrl}
        sx={{
          width: 1,
          objectFit: "contain",
          maxHeight: isInternationalTalent ? undefined : { xs: 200, md: 300 },
        }}
      />

      {!!methods?.length && (
        <Box component="ul" gap={isInternationalTalent ? 2 : 1.5} display="flex">
          {methods.map((option) => (
            <Box key={option.label} component="li">
              <Tooltip title={option.label} placement="top">
                <Link
                  component={RouterLink}
                  href={option.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    alt={option.label}
                    src={option.icon}
                    sx={{
                      width: isInternationalTalent ? 48 : 40,
                      height: isInternationalTalent ? 48 : 40,
                    }}
                  />
                </Link>
              </Tooltip>
            </Box>
          ))}
        </Box>
      )}

      {slots?.bottomArea && <Box sx={{ width: "100%" }}>{slots.bottomArea}</Box>}
    </Box>
  )
}

