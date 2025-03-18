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

export function AuthSplitLayout({ sx, section, children, header }) {
  const layoutQuery = "md"
  const location = useLocation()

  const isCompanySignup = location.pathname.includes("sign-up-company")
  const isPartnerSignup = location.pathname.includes("sign-up-partner")
  const isPrivateSignup = location.pathname.includes("sign-up-options")
  const isPrivateSignin = location.pathname.includes("sign-in-options")
  const isSignin = location.pathname.includes("sign-in")

  let pageType = ""
  if (isCompanySignup) pageType = "company-signup"
  else if (isPartnerSignup) pageType = "partner-signup"
  else if (isPrivateSignup) pageType = "private-signup"
  else if (isPrivateSignin) pageType = "private-signin"

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: {
                position: "fixed", // Keeps it on top during scroll
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
              },
            },
          }}
          sx={{
            backdropFilter: "blur(6px)",
            // backgroundColor: "rgba(255, 255, 255, 0.9)",
            ...header?.sx,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <Box
                sx={{
                  py: 2,
                  px: { xs: 2, md: 3 },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Logo2
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: "auto",
                    transition: "width 0.3s ease",
                  }}
                />
              </Box>
            ),
            rightArea: (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.5 },
                  pr: { xs: 2, md: 3 },
                }}
              >
                <Link
                  href={paths.faqs}
                  component={RouterLink}
                  color="inherit"
                  sx={{
                    typography: "subtitle2",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Need help?
                </Link>
                <SettingsButton />
              </Box>
            ),
          }}
        />
      }
      footerSection={null}
      cssVars={{ "--layout-auth-content-width": "600px" }}
      sx={{
        minHeight: "100vh", // Changed from "auto" to ensure full height
        display: "flex",
        flexDirection: "column",
        pt: 0, // Ensure no padding at the top
        mt: 0, // Ensure no margin at the top
        ...sx,
      }}
    >
      <Main
        layoutQuery={layoutQuery}
        sx={{
          display: "flex",
          alignItems: { xs: "center", sm: "center", md: "top", lg:"top" }, // Only applied for xs and sm
          flexDirection: { xs: "column", md: "row" },
          flex: 1, // Added to ensure it takes full height
        }}
      >
        <Section
          title={section?.title}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          method="social"
          subtitle={section?.subtitle}
          pageType={pageType}
          methods={[
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
              label: "X",
              path: "https://x.com/swedenrelocators",
              icon: "/socials/X.png",
            },
            {
              label: "Apple Store",
              path: "https://x.com/swedenrelocators",
              icon: "/socials/Apple.png",
            },
            {
              label: "Play Store",
              path: "https://x.com/swedenrelocators",
              icon: "/socials/playstore.png",
            },
          ]}
          sx={{
            width: { xs: "100%", md: "50%" },
            minHeight: { xs: "auto", md: "auto" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // Ensures everything inside is centered
            textAlign: "center", // Helps in centering inline elements
            position: "relative",
            overflow: "auto", // Enable scrolling only when needed
            "& .social-icons-container": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: { xs: 1.5, sm: 2 },
              mt: 2,
              width: "100%", // Ensures container takes full width
            },
            "& .social-icon": {
              width: { xs: 36, sm: 60 },
              height: { xs: 36, sm: 60 },
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
                width: { xs: 18, sm: 45 }, // Slightly increased for better visibility
                height: { xs: 18, sm: 45 },
                objectFit: "contain",
              },
            },
          }}
        />
        <Content
          layoutQuery={layoutQuery}
          sx={{
            width: { xs: "100%", md: "50%" },
            minHeight: { xs: "auto", md: "auto" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: 3, sm: 4, md: 5 }, // Added proper padding for all screen sizes
            overflow: "auto", // Enable scrolling when needed
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 600, md: 800 },
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center content horizontally
              justifyContent: "center", // Center content vertically
            }}
          >
            {children}
          </Box>
        </Content>
      </Main>
    </LayoutSection>
  )
}

