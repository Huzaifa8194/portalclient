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
        Sign Up - Setup your account
        <br />
      </Typography>

      <Typography align="center" sx={{ color: "text.secondary" }}>
        Already have an account?{" "}
        <Link href="/auth/jwt/sign-in-options" sx={{ color: "primary.main" }}>
          Login
        </Link>
      </Typography>

      {/* Centered black text in a professional way */}
      <Box
        sx={{
          mt: 3,
          mb: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.primary", // Black text
            fontWeight: "medium",
            fontStyle: "italic", // Optional: Adds a professional touch
          }}
        >
          Choose the type of account you want to create.
        </Typography>
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