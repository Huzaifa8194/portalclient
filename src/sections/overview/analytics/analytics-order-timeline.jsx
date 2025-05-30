import Card from "@mui/material/Card"
import Timeline from "@mui/lab/Timeline"
import TimelineDot from "@mui/lab/TimelineDot"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem"

import { fDateTime } from "src/utils/format-time"

// ----------------------------------------------------------------------

export function AnalyticsOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
<CardHeader
  title={title}
  subheader={subheader}
  titleTypographyProps={{ variant: "h4" }}
/>

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item key={item.id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  )
}

function Item({ item, lastItem, ...other }) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.type === "order1" && "primary") ||
            (item.type === "order2" && "success") ||
            (item.type === "order3" && "info") ||
            (item.type === "order4" && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="h5">{item.title}</Typography>

        <Typography variant="h7" sx={{ color: "text.disabled", display: "block", mt: 0.5 }}>
          {item.createdAt && fDateTime(item.createdAt)}
        </Typography>
        <Typography variant="h6" sx={{ color: "text.disabled", display: "block", mt: 0.5 }}>
          {item.comment || "No additional comments"}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  )
}

  