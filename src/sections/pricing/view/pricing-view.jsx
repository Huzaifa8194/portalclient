import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

import { _pricingPlans } from "src/_mock"

import { PricingCardUpdated } from "../pricing-card-updated"

export function PricingView() {
  return (
    <Container sx={{ pt: { xs: 3, md: 5 }, pb: 10 }}>
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        Get Started-Set Up Your Account With Us!
        <br />
      </Typography>

      <Typography align="center" sx={{ color: "text.secondary" }}>
        Already have an account?{" "}
        <Link href="/auth/jwt/sign-in-options" sx={{ color: "primary.main" }}>
          Login
        </Link>
      </Typography>

      {/* Black strip with reduced size for a more compact, professional look */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            borderRadius: "6px",
            py: 1.5, // Reduced vertical padding
            px: 3, // Reduced horizontal padding
            maxWidth: "max-content",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography
            variant="subtitle2" // Changed from subtitle1 to subtitle2 for smaller text
            sx={{
              color: "white",
              fontWeight: 600,
              letterSpacing: "0.5px", // Reduced letter spacing
            }}
          >
            Choose the type of account you want to create
          </Typography>
        </Box>
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {_pricingPlans.map((card, index) => (
          <PricingCardUpdated key={`${card.subscription}-${index}`} card={card} />
        ))}
      </Box>
    </Container>
  )
}

