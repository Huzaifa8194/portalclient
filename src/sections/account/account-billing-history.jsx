"use client"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import CardHeader from "@mui/material/CardHeader"
import ListItemText from "@mui/material/ListItemText"
import Chip from "@mui/material/Chip"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { Avatar } from "@mui/material"
import { _mock } from "src/_mock"
import { useBoolean } from "src/hooks/use-boolean"

import { fDate } from "src/utils/format-time"

import { Iconify } from "src/components/iconify"

export function AccountBillingHistory({ referrals = [] }) {
  const showMore = useBoolean()

  // No need for dummy data anymore since we're fetching from the API
  const allReferrals = referrals

  return (
    <>
      <CardHeader title="Referral Status:" />

      {allReferrals.length === 0 ? (
        <Typography variant="body2" sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
          No referrals found. Start referring people!
        </Typography>
      ) : (
        <Stack spacing={1.5} sx={{ px: 3, pt: 1 }}>
          {(showMore.value ? allReferrals : allReferrals.slice(0, 4)).map((referral) => (
            <Stack 
  key={referral.id} 
  direction="row" 
  alignItems="center" 
  justifyContent="space-between" 
  spacing={2}  // Adds spacing between avatar and text
>
  {/* Avatar */}
  <Avatar
    src={_mock.image.avatar(24)}
    alt={referral.name}
    sx={{
      width: 60,
      height: 60,
      flexShrink: 0,  // Prevents avatar from shrinking
    }}
  />

  {/* Referral Details & Status */}
  <Stack direction="row" alignItems="center" flexGrow={1} justifyContent="space-between">
    <Tooltip title={`Email: ${referral.email || "N/A"}`} arrow placement="top">
      <ListItemText
        primary={typeof referral.name === "string" ? referral.name : ""}
        secondary={typeof referral.date === "string" ? fDate(referral.date) : ""}
        primaryTypographyProps={{ typography: "body2" }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: "span",
          typography: "caption",
          color: "text.disabled",
        }}
      />
    </Tooltip>

    <Chip
      label={typeof referral.status === "string" ? referral.status : "Pending"}
      color={referral.status === "Accepted" ? "success" : "warning"}
      size="small"
    />
  </Stack>
</Stack>

          ))}

          <Divider sx={{ borderStyle: "dashed" }} />
        </Stack>
      )}

      {allReferrals.length > 4 && (
        <Stack alignItems="flex-start" sx={{ p: 2 }}>
          <Button
            size="small"
            color="inherit"
            startIcon={
              <Iconify
                width={16}
                icon={showMore.value ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"}
                sx={{ mr: -0.5 }}
              />
            }
            onClick={showMore.onToggle}
          >
            Show {showMore.value ? "less" : "more"}
          </Button>
        </Stack>
      )}
    </>
  )
}

