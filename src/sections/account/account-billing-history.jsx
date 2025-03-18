
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import CardHeader from "@mui/material/CardHeader"
import ListItemText from "@mui/material/ListItemText"
import Chip from "@mui/material/Chip"

import { useBoolean } from "src/hooks/use-boolean"

import { fDate } from "src/utils/format-time"

import { Iconify } from "src/components/iconify"

export function AccountBillingHistory({ referrals }) {
  const showMore = useBoolean()

  // Dummy data for accepted referrals
  const acceptedReferrals = [
    { id: 1, name: "John Doe", status: "Accepted", date: "2023-05-15" },
    { id: 2, name: "Jane Smith", status: "Accepted", date: "2023-05-20" },
  ]

  // Combine accepted and pending referrals
  const allReferrals = [...acceptedReferrals, ...referrals]

  return (
    <>
      <CardHeader title="Referral Status:" />

      <Stack spacing={1.5} sx={{ px: 3, pt: 1 }}>
        {(showMore.value ? allReferrals : allReferrals.slice(0, 4)).map((referral) => (
          <Stack key={referral.id} direction="row" alignItems="center" justifyContent="space-between">
            <ListItemText
              primary={referral.name}
              secondary={fDate(referral.date)}
              primaryTypographyProps={{ typography: "body2" }}
              secondaryTypographyProps={{
                mt: 0.5,
                component: "span",
                typography: "caption",
                color: "text.disabled",
              }}
            />

            <Chip label={referral.status} color={referral.status === "Accepted" ? "success" : "warning"} size="small" />
          </Stack>
        ))}

        <Divider sx={{ borderStyle: "dashed" }} />
      </Stack>

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
    </>
  )
}

