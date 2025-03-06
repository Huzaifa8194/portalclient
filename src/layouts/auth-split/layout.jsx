import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import { useLocation } from "react-router-dom"

import { paths } from "src/routes/paths"
import { RouterLink } from "src/routes/components"

import { CONFIG } from "src/config-global"

import { Logo } from "src/components/logo"

import { Section } from "./section"
import { Main, Content } from "./main"
import { HeaderSection } from "../core/header-section"
import { LayoutSection } from "../core/layout-section"
import { SettingsButton } from "../components/settings-button"

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, section, children, header }) {
  const layoutQuery = "md"
  const location = useLocation()

  // Determine if we're on the company signup, partner signup, or private signup page
  const isCompanySignup = location.pathname.includes("sign-up-company")
  const isPartnerSignup = location.pathname.includes("sign-up-partner")
  const isPrivateSignup = location.pathname.includes("sign-up-options")

  // Determine the page type for the Section component
  let pageType = ""
  if (isCompanySignup) {
    pageType = "company-signup"
  } else if (isPartnerSignup) {
    pageType = "partner-signup"
  } else if (isPrivateSignup) {
    pageType = "private-signup"
  }

  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: "fixed" }, ...header?.sx }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                {/* -- Help link -- */}
                <Link href={paths.faqs} component={RouterLink} color="inherit" sx={{ typography: "subtitle2" }}>
                  Need help?
                </Link>
                {/* -- Settings button -- */}
                <SettingsButton />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ "--layout-auth-content-width": "420px" }}
      sx={sx}
    >
      <Main layoutQuery={layoutQuery}>
      <Section
  title={section?.title}
  layoutQuery={layoutQuery}
  imgUrl={section?.imgUrl}
  method="social" // Dummy value to avoid disabling icons
  subtitle={section?.subtitle}
  pageType={pageType}
  methods={[
    // Social Media Icons
    {
      label: "Facebook",
      path: "https://www.facebook.com/swedenrelocators", // Replace with your Facebook link
      icon: "/socials/facebook.png",
    },
    {
      label: "Instagram",
      path: "https://www.instagram.com/swedenrelocators", // Replace with your Instagram link
      icon: "/socials/insta.png",
    },
    {
      label: "TikTok",
      path: "https://www.tiktok.com/@swedenrelocators", // Replace with your TikTok link
      icon: "/socials/tiktok.png",
    },
  ]}
  slots={{
    bottomArea: (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {/* Play Store Icon */}
        <Link href="https://play.google.com/store/apps/details?id=yourapp" target="_blank" rel="noopener noreferrer">
          <img
            src="/socials/play-store.png"
            alt="Play Store"
            style={{ width: "140px", height: "auto" }} // Increased width
          />
        </Link>
        {/* App Store Icon */}
        <Link href="https://apps.apple.com/app/yourapp" target="_blank" rel="noopener noreferrer">
          <img
            src="/socials/app-store.png"
            alt="App Store"
            style={{ width: "140px", height: "auto" }} // Increased width
          />
        </Link>
      </Box>
    ),
  }}
/>
        
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  )
}