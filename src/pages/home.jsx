import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import { Box } from "@mui/material"

// Direct imports instead of lazy loading
import { AuthSplitLayout } from "src/layouts/auth-split"
import { GuestGuard } from "src/auth/guard"
import SignInOptions from "src/pages/auth/jwt/sign-in-options"
import SignIn from "src/pages/auth/jwt/sign-in"
import SignUp from "src/pages/auth/jwt/sign-up"
import SignUpCompany from "src/pages/auth/jwt/sign-up-company"
import SignUpPartner from "src/pages/auth/jwt/sign-up-partner"
import SignUpOptions from "src/pages/auth/jwt/sign-up-options"

// ----------------------------------------------------------------------
const metadata = {
  title: "Sweden Relocators",
  description: "Your relocation partner in Sweden",
}

export default function Page() {
  const location = useLocation()

  const isCompanySignup = location.pathname.includes("sign-up-company")
  const isPartnerSignup = location.pathname.includes("sign-up-partner")
  const isPrivateSignup = location.pathname.includes("sign-up-options")
  const isPrivateSignin = location.pathname.includes("sign-in-options")
  const isSignIn = location.pathname.includes("sign-in") && !isPrivateSignin
  const isSignUp = location.pathname.includes("sign-up") && !isCompanySignup && !isPartnerSignup && !isPrivateSignup

  // Function to get the appropriate background image based on path
  const getBackgroundImage = () => {
    if (isCompanySignup) return "/companySignup.png"
    if (isPartnerSignup) return "/partnerSignup.png"
    if (isPrivateSignup) return "/privateSignup.png"
    if (isPrivateSignin) return "/privateSignin.png"
    if (isSignIn) return "/signin.png"
    if (isSignUp) return "/signup.png"

    return "/privateSignin.png" // Default image
  }

  // Function to render the appropriate component based on path
  const renderAuthComponent = () => {
    if (isCompanySignup) return <SignUpCompany />
    if (isPartnerSignup) return <SignUpPartner />
    if (isPrivateSignup) return <SignUpOptions />
    if (isPrivateSignin) return <SignInOptions />
    if (isSignIn) return <SignIn />
    if (isSignUp) return <SignUp />

    // Default component if no path matches
    return <SignInOptions />
  }

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      <GuestGuard>
        <AuthSplitLayout
          section={{
            title: "Welcome to Sweden Relocators",
            subtitle: "Your relocation partner in Sweden",
            imgUrl: getBackgroundImage(),
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 500, md: 650, lg:800 },
              mx: "auto",
              p: { xs: 2, sm: 3 },
              overflowX: "hidden",
            }}
          >
            {renderAuthComponent()}
          </Box>
        </AuthSplitLayout>
      </GuestGuard>
    </>
  )
}

