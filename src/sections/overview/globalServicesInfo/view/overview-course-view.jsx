import React from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { CONFIG } from 'src/config-global';
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { DashboardContent } from "src/layouts/dashboard"
import { CourseMyAccount } from "../course-my-account"
import { CourseReminders } from "../course-reminders"
import { CourseWidgetSummary } from "../course-widget-summary"
import SummaryTable from "./SummaryTable" // Import your SummaryTable component
import FeeChart from "./FeeChart"

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 0,
  marginRight: theme.spacing(4),
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}))

// EVisa Card Component
function EVisaCard({ visa }) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {visa.country} - {visa.type}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Eligible Countries:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {visa.eligibleCountries.split(", ").map((country, index) => (
            <Chip key={index} label={country} size="small" />
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  )
}

// Overview Course View Component
export function OverviewCourseView() {
  const [tabValue, setTabValue] = React.useState(0)
  const theme = useTheme()

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const visaTypes = ["ESTA", "ETA", "eVisa"]
  const visaData = {
    ESTA: [
      {
        country: "United States",
        eligibleCountries:
          "Andorra, Australia, Austria, Belgium, Brunei, Chile, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Japan, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Monaco, Netherlands, New Zealand, Norway, Poland, Portugal, San Marino, Singapore, Slovakia, Slovenia, South Korea, Spain, Sweden, Switzerland, Taiwan, United Kingdom",
      },
    ],
    ETA: [
      {
        country: "Australia",
        eligibleCountries: "Canada, Hong Kong, Japan, Malaysia, Singapore, South Korea, United States",
      },
      {
        country: "Canada",
        eligibleCountries:
          "Andorra, Australia, Austria, Bahamas, Barbados, Belgium, Brunei, Chile, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hong Kong, Ireland, Italy, Japan, Latvia, Lithuania, Luxembourg, Malta, Monaco, Netherlands, New Zealand, Norway, Papua New Guinea, Poland, Portugal, Samoa, San Marino, Singapore, Slovakia, Slovenia, Solomon Islands, South Korea, Spain, Sweden, Switzerland, Taiwan, United Kingdom, United States",
      },
    ],
    eVisa: [
      { country: "India", eligibleCountries: "Various countries" },
      { country: "Turkey", eligibleCountries: "Various countries" },
    ],
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Visa Application Services"
        links={[{ name: "Dashboard", href: "/dashboard" }, { name: "Visa Services" }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Typography variant="h4" gutterBottom color="primary">
        Electronic Visa Application Dashboard
      </Typography>

      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <CourseWidgetSummary title="Total Applications" icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`} total={Object.values(visaData).flat().length} />
        </Grid>
        {visaTypes.map((type, index) => (
          <Grid item xs={12} sm={6} md={3} key={type}>
            <CourseWidgetSummary
              title={type}
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`} // Change the icon path dynamically based on the visa type
              total={visaData[type].length}
              color={index === 0 ? "info" : index === 1 ? "warning" : "error"}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="visa types tabs">
                {visaTypes.map((type, index) => (
                  <StyledTab key={type} label={type} id={`visa-tab-${index}`} />
                ))}
              </Tabs>
              {visaTypes.map((type, index) => (
                <Box
                  key={type}
                  role="tabpanel"
                  hidden={tabValue !== index}
                  id={`visa-tabpanel-${index}`}
                  aria-labelledby={`visa-tab-${index}`}
                >
                  {tabValue === index && (
                    <Grid container spacing={3} mt={2}>
                      {visaData[type].map((visa, visaIndex) => (
                        <Grid item xs={12} key={visaIndex}>
                          <EVisaCard
                            visa={{
                              ...visa,
                              type,
                            }}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <StyledCard>
                          <CardContent>
                            <Typography variant="h6" color="error" gutterBottom>
                              Important Information for {type}
                            </Typography>
                            <List>
                              {type === "ESTA" && (
                                <>
                                  <ListItem>
                                    <ListItemText
                                      primary="Purpose of Travel" 
                                      secondary="ESTA is used for short-term tourism or business travel to the USA."
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Processing Times"
                                      secondary="ESTA applications are processed within minutes, but approval may take up to 72 hours."
                                    />
                                  </ListItem>
                                </>
                              )}
                              {type === "ETA" && (
                                <>
                                  <ListItem>
                                    <ListItemText
                                      primary="Purpose of Travel"
                                      secondary="ETA is required for traveling to Australia for tourism, business, or transit."
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Processing Times"
                                      secondary="ETA processing usually takes only a few minutes."
                                    />
                                  </ListItem>
                                </>
                              )}
                              {type === "eVisa" && (
                                <>
                                  <ListItem>
                                    <ListItemText
                                      primary="Purpose of Travel"
                                      secondary="eVisa is available for travel to various countries such as India and Turkey."
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Processing Times"
                                      secondary="eVisa applications may take 1-3 days depending on the country."
                                    />
                                  </ListItem>
                                </>
                              )}
                            </List>
                          </CardContent>
                        </StyledCard>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard>
                <CourseMyAccount sx={{ mt: 3, p: 3 }} />
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button variant="contained" fullWidth>
                    Apply for New Visa
                  </Button>
                </Box>
              </StyledCard>
            </Grid>

            <Grid item xs={12}>
              <StyledCard>
                <CourseReminders
                  sx={{ p: 3 }}
                  title="Recent Updates"
                  list={[
                    {
                      id: "1",
                      title: "ESTA Application Submitted",
                      description: "Your ESTA application for the USA has been submitted successfully.",
                      time: "2 hours ago",
                    },
                    {
                      id: "2",
                      title: "Canada ETA Processing",
                      description: "Your Canada ETA application is being processed.",
                      time: "1 day ago",
                    },
                    {
                      id: "3",
                      title: "Turkey eVisa Approved",
                      description: "Your Turkey eVisa has been approved.",
                      time: "3 days ago",
                    },
                  ]}
                />
              </StyledCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FeeChart />
        </Grid>
        <Grid item xs={12}>
          <SummaryTable data={visaData} />
        </Grid>
      </Grid>
    </DashboardContent>
  )
}

