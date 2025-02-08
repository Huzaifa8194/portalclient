import PropTypes from "prop-types"
import { useTheme } from "@mui/material/styles"
import { Card, Typography, Grid, Avatar } from "@mui/material"

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  title: PropTypes.string,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  sx: PropTypes.shape({}),
  extratext: PropTypes.string,
  codeicon: PropTypes.node,
}

export function AppWidgetSummary({ title, total, icon, sx, extratext, codeicon }) {
  const theme = useTheme()

  return (
    <Card sx={sx}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 3, py: 3 }}>
        <Grid item xs>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 0.5 }}>
            {total}
          </Typography>
          {extratext && (
            <Typography variant="caption" sx={{ mt: 0.5, color: "text.secondary" }}>
              {extratext}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {codeicon || (
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.grey[100],
                color: theme.palette.grey[500],
              }}
            >
              {icon}
            </Avatar>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

