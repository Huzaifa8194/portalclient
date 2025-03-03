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
  ...other
}) {
  const theme = useTheme()
  const location = useLocation()

  // Check if we're on the company signup, partner signup, or private signup page
  const isCompanySignup = pageType === "company-signup" || location.pathname.includes("sign-up-company")
  const isPartnerSignup = pageType === "partner-signup" || location.pathname.includes("sign-up-partner")
  const isPrivateSignup = pageType === "private-signup" || location.pathname.includes("sign-up-options") || location.pathname.includes("sign-up")

  // Set content based on the page type
  let displayTitle = title
  let displaySubtitle = subtitle
  let displayImgUrl = imgUrl

  if (isCompanySignup) {
    displayTitle = "International Talent & Employee Management"
    displaySubtitle = "Digital Tool for Global Workforce & Immigration Management"
    displayImgUrl = "/companySignup.png"
  } else if (isPartnerSignup) {
    displayTitle = "Partner: Join Our Global Partner Network"
    displaySubtitle = "Accelerate Growth with Digital Client Solutions"
    displayImgUrl = "/partnerSignup.png"
  } else if (isPrivateSignup) {
    displayTitle = "Private: Welcome To A New Digital World"
    displaySubtitle = "of Immigration & Relocation Services"
    displayImgUrl = "/privateSignup.png"
  }

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
        px: 3,
        pb: 3,
        width: 1,
        maxWidth: 480,
        display: "none",
        position: "relative",
        pt: "var(--layout-header-desktop-height)",
        [theme.breakpoints.up(layoutQuery)]: {
          gap: 8,
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
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {displayTitle}
        </Typography>

        {displaySubtitle && (
          <Typography sx={{
             color: "text.secondary",
              textAlign: "center",
              
               mt: 2 }}>
              {displaySubtitle}
              </Typography>
        )}
      </div>

      <Box
        component="img"
        alt="Dashboard illustration"
        src={displayImgUrl}
        sx={{ width: 1,
          
           objectFit: "contain",
           }}
      />

      {!!methods?.length && method && (
        <Box component="ul" gap={2} display="flex">
          {methods.map((option) => {
            const selected = method === option.label.toLowerCase()

            return (
              <Box
                key={option.label}
                component="li"
                sx={{
                  ...(!selected && {
                    cursor: "not-allowed",
                    filter: "grayscale(1)",
                  }),
                }}
              >
                <Tooltip title={option.label} placement="top">
                  <Link
                    component={RouterLink}
                    href={option.path}
                    sx={{
                      ...(!selected && { pointerEvents: "none" }),
                    }}
                  >
                    <Box component="img" alt={option.label} src={option.icon} sx={{ width: 32, height: 32 }} />
                  </Link>
                </Tooltip>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

