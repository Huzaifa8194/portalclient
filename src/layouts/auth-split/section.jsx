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

export function Section({
  sx,
  method,
  layoutQuery,
  methods,
  pageType,
  title = "Complete Online Relocation Solution",
  imgUrl = `/privateSignin.png`,
  subtitle = "We believe in transparency",
  slots,
  ...other
}) {
  const theme = useTheme()
  const location = useLocation()

  const isCompanySignup = pageType === "company-signup" || location.pathname.includes("sign-up-company")
  const isPartnerSignup = pageType === "partner-signup" || location.pathname.includes("sign-up-partner")
  const isPrivateSignup =
    pageType === "private-signup" ||
    location.pathname.includes("sign-up-options") ||
    location.pathname.includes("sign-up")
  const isPrivateSignin = location.pathname.includes("sign-in-options")

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

  const isInternationalTalent = displayTitle === "International Talent & Employee Management"

  return (
    <Box
      sx={{
        px: 3,
        pt:2,
        pb: 2,
        width: "100%",
        maxWidth: isInternationalTalent ? 600 : 480,
                display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        gap: isInternationalTalent ? 7 : 10,
        ...sx,
      }}
      {...other}
    >
     {isInternationalTalent ? (
    <Box>
    <Typography
      variant="h4"
      sx={{ textAlign: "center", mb: 5, pt: isInternationalTalent ? 0 : undefined }}
    >
      {displayTitle}
    </Typography>

    {displaySubtitle && (
      <Typography sx={{ color: "text.secondary", textAlign: "center", fontWeight: "regular" }}>
        {displaySubtitle}
      </Typography>
    )}
    </Box>
) : (
  <Box>
    <Typography
      variant="h4"
      sx={{ textAlign: "center", mb: 1, pt: isInternationalTalent ? 5 : undefined }}
    >
      {displayTitle}
    </Typography>

    {displaySubtitle && (
      <Typography sx={{ color: "text.secondary", textAlign: "center", fontWeight: "regular" }}>
        {displaySubtitle}
      </Typography>
    )}
  </Box>

)}


      <Box
        component="img"
        alt="Dashboard illustration"
        src={displayImgUrl}
        sx={{
          width: "100%",
          maxWidth: isInternationalTalent ? 520 : 300,
          objectFit: "contain",
        }}
      />

      {!!methods?.length && (
        <Box
          component="ul"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            p: 0,
            m: 0,
            listStyle: "none",
          }}
        >
      <Box component="ul" sx={{ display: "flex", gap: 2, listStyle: "none", padding: 0 }}>
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
                  sx={{
                    width: 55,
                    height: 55,
                    padding: 1,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "background.paper",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    alt={option.label}
                    src={option.icon}
                    sx={{
                      width: 24,
                      height: 24,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Link>
            </Tooltip>
          </Box>
        ))}
      </Box>
        </Box>
      )}
    </Box>
  )
}
