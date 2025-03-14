import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import { useLocation } from "react-router-dom"

import { paths } from "src/routes/paths"
import { RouterLink } from "src/routes/components"

import { Logo2 } from "src/components/logo/logo2"

import { Section } from "./section"
import { Main, Content } from "./main"
import { HeaderSection } from "../core/header-section"
import { LayoutSection } from "../core/layout-section"
import { SettingsButton } from "../components/settings-button"

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, section, children, header }) {
  const layoutQuery = "md"
  const location = useLocation()

  // Determine if we're on the company signup, partner signup, private signup, or sign-in-options page
  const isCompanySignup = location.pathname.includes("sign-up-company")
  const isPartnerSignup = location.pathname.includes("sign-up-partner")
  const isPrivateSignup = location.pathname.includes("sign-up-options")
  const isPrivateSignin = location.pathname.includes("sign-in-options")

  // Determine the page type for the Section component
  let pageType = ""
  if (isCompanySignup) {
    pageType = "company-signup"
  } else if (isPartnerSignup) {
    pageType = "partner-signup"
  } else if (isPrivateSignup) {
    pageType = "private-signup"
  } else if (isPrivateSignin) {
    pageType = "private-signin"
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
              <Box sx={{ paddingy: 4, display: "flex", alignItems: "center" }}>
                {/* -- Logo -- */}
                <Logo2 sx={{ width: 150, height: "auto" }} /> {/* Adjust width as needed */}
              </Box>
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
            // Social Media Icons with improved styling
            {
              label: "Facebook",
              path: "https://www.facebook.com/swedenrelocators",
              icon: "/socials/facebook.png",
            },
            {
              label: "Instagram",
              path: "https://www.instagram.com/swedenrelocators",
              icon: "/socials/insta.png",
            },
            {
              label: "TikTok",
              path: "https://www.tiktok.com/@swedenrelocators",
              icon: "/socials/tiktok.png",
            },
            {
              label: "YouTube",
              path: "https://www.youtube.com/channel/swedenrelocators", // Replace with your actual YouTube channel URL
              icon: "/socials/youtube.png",
            },
            {
              label: "X",
              path: "https://x.com/swedenrelocators", // Replace with your actual X (Twitter) profile URL
              icon: "/socials/X.png",
            },
          ]}
          // Add styling for social media icons to make them look more professional
          sx={{
            "& .social-icons-container": {
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 2,
            },
            "& .social-icon": {
              width: 40,
              height: 40,
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
              "& img": {
                width: 15,
                height: 15,
                objectFit: "contain",
              },
            },
          }}
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
                <Link
                  href="https://play.google.com/store/apps/details?id=yourapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

