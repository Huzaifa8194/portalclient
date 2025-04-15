"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import { CONFIG } from 'src/config-global'
import { fData } from "src/utils/format-number"
import { Chart, useChart } from "src/components/chart"
import { Iconify } from "src/components/iconify"

export function FileStorageOverview({ data, total, chart, title = "Documents", ...other }) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  const chartColors = chart.colors ?? [theme.palette.primary.main, theme.palette.primary.light]

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0], opacity: 1 },
          { offset: 100, color: chartColors[1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -90,
        endAngle: 90,
        hollow: { 
          margin: 0,
          size: '70%',
        },
        track: { 
          margin: 0,
          background: theme.palette.grey[300],
        },
        dataLabels: {
          value: {
            offsetY: 0,
            color: theme.palette.text.primary,
            fontSize: '1rem',
            fontWeight: 600,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
  })

  const toggleExpanded = () => setExpanded(!expanded)

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "Images": return `${CONFIG.assetsDir}/assets/icons/files/ic-img.svg`
      case "Media": return `${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`
      case "Documents": return `${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`
      default: return `${CONFIG.assetsDir}/assets/icons/files/ic-file.svg`
    }
  }

  return (
    <Card sx={{ 
      p: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: theme.shadows[2],
      '&:hover': { boxShadow: theme.shadows[4] }
    }} {...other}>
      <Typography variant="subtitle2" sx={{ 
        mb: 1,
        fontWeight: 600,
        color: theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box component="img" 
          src={`${CONFIG.assetsDir}/assets/icons/files/ic-folder.svg`} 
          sx={{ width: 24, height: 24 , right: "10%", position: 'absolute' }}
        />
        {title}
      </Typography>

      <Box sx={{ 
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: 'relative',
        gap: 0.5
      }}>
        {/* Percentage Chart */}
        <Chart
          type="radialBar"
          series={[chart.series]}
          options={chartOptions}
          width={120}
          height={120}
          sx={{ 
            mx: "auto",
            '& .apexcharts-text': {
              dominantBaseline: 'middle',
              textAnchor: 'middle'
            }
          }}
        />

        {/* Storage Ratio */}
        <Typography variant="body2" sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          fontSize: '0.875rem',
          mt: -1,
          mb: 1
        }}>
          {fData(total)} / {fData(total * 2)}
        </Typography>

        <Button
          variant="text"
          size="small"
          onClick={toggleExpanded}
          endIcon={
            <Iconify 
              icon={expanded ? "eva:chevron-up-fill" : "eva:chevron-down-fill"} 
              width={18} 
              height={18} 
              sx={{ color: theme.palette.text.primary }}
            />
          }
          sx={{ 
            alignSelf: 'center',
            color: theme.palette.text.primary,
            fontWeight: 600,
            '&:hover': { 
              backgroundColor: 'transparent',
              color: theme.palette.text.primary 
            }
          }}
        >
          {expanded ? "Show Less" : "Display Content"}
        </Button>
      </Box>

      {expanded && (
        <Stack
          spacing={1}
          sx={{
            mt: 2,
            px: 1,
            pb: 1,
            maxHeight: 160,
            overflow: 'auto',
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: 3
            }
          }}
        >
          {data.map((category) => (
            <Stack 
              key={category.name} 
              direction="row" 
              alignItems="center"
              spacing={2}
              sx={{
                p: 1.5,
                borderRadius: 1,
                '&:hover': { 
                  backgroundColor: theme.palette.action.hover
                }
              }}
            >
              <Box sx={{ 
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: '50%',
                bgcolor: theme.palette.background.neutral
              }}>
                <Box 
                  component="img" 
                  src={getFileIcon(category.name)} 
                  sx={{ width: 20, height: 20 }}
                />
              </Box>

              <Stack flexGrow={1}>
                <Typography variant="subtitle2" noWrap>
                  {category.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {category.filesCount} files
                </Typography>
              </Stack>

              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {fData(category.usedStorage)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  )
}