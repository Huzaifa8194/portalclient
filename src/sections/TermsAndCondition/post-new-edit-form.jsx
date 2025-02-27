import React from 'react';
import { Box, Card, Typography, Container, Divider, List, ListItem, ListItemText } from '@mui/material';

export default function PostCreateView() {
  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 4, my: 4, boxShadow: 3 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
          Terms and Conditions
        </Typography>
        {/* <Divider sx={{ mb: 4 }} /> */}

        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {section.title}
            </Typography>
            {section.content && <Typography paragraph>{section.content}</Typography>}
            {section.subsections && (
              <List disablePadding>
                {section.subsections.map((subsection, subIndex) => (
                  <ListItem key={subIndex} sx={{ flexDirection: 'column', alignItems: 'flex-start', pl: 4, py: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {subsection.title}
                    </Typography>
                    <Typography>{subsection.content}</Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </Card>
    </Container>
  );
}

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By engaging with Sweden Relocators AB and its branch, Nordic Relocators in Denmark, you acknowledge and agree to be bound by these Terms and Conditions. It is the Client's responsibility to review these terms prior to utilizing any services. If the Terms and Conditions were overlooked during the sign-up process, they can be reviewed here before proceeding with any official services. Typically, these terms become fully applicable after the Client signup on our web portal and app."
  },
  {
    title: "2. Scope of Services and Team Structure",
    subsections: [
      {
        title: "2.1 Service Provision",
        content: "Services are rendered by Sweden Relocators AB and Nordic Relocators as corporate entities. Individual advisors and consultants act solely on behalf of the company."
      },
      {
        title: "2.2 Team Allocation",
        content: "A dedicated advisor will be assigned as the main point of contact. The company reserves the right to adjust team composition based on the scope of services. This allows us to offer specialized expertise and necessary resources for each application. Team composition may change, expand, or contract during the assignment process."
      },
      {
        title: "2.3 Third-Party Collaboration",
        content: "We may engage third-party service providers for specialized tasks. Sweden Relocators AB holds no liability for services rendered by third parties."
      },
      {
        title: "2.4 No Guarantee of Outcome",
        content: "While we strive to provide high-quality services, we do not guarantee successful outcomes in any application or assignment. Our role is to provide professional assistance and guidance."
      },
      {
        title: "2.5 Individual Advisor Liability",
        content: "All company advisors and partner consultants operate under these terms. No individual advisor or employee is personally liable for services provided unless otherwise mandated by law."
      }
    ]
  },
  {
    title: "3. Fees and Payment Terms",
    subsections: [
      {
        title: "3.1 Service Fees",
        content:
          "Service fees are outlined in the Client's online portal and are determined by the nature of the requested services. All fees are non-refundable unless specified otherwise. Fees may include consulting, administration, and processing charges.",
      },
      {
        title: "3.2 Advance Payment",
        content:
          "Clients, particularly those outside of Sweden, are required to make advance payments before service commencement. Additional services will incur separate charges.",
      },
      {
        title: "3.3 Fee Estimation",
        content:
          "At the start of the assignment, we will provide an estimated fee. Depending on the assignment type, a fixed fee may apply, especially after the Power of Attorney is signed. Fees are based on factors including time, skill, experience, assignment value, company risk, urgency, and results.",
      },
      {
        title: "3.4 Invoicing",
        content:
          "Invoices are issued upon signing the Power of Attorney. Clients must settle invoices within 30 days. After one reminder, unpaid invoices will be forwarded to our debt collection partners.",
      },
      {
        title: "3.5 Late Payments",
        content:
          "Interest on overdue payments is charged according to the Swedish Interest Act. Debt collection actions will be initiated for persistent non-payment.",
      },
      {
        title: "3.6 Additional Costs",
        content:
          "Travel and other related expenses may be charged in addition to service fees. Additional services requested beyond the original agreement will incur separate charges.",
      },
      {
        title: "3.7 Refund Policy",
        content:
          "Refunds are only granted if services were not delivered due to internal errors or if the Client cancels the contract within 14 days of signing without initiating any service.",
      },
    ],
  },

  {
    title: "4. Client Responsibilities",
    subsections: [
      {
        title: "4.1 Accuracy of Information",
        content:
          "Clients must provide accurate and truthful information. Submission of false documents will result in immediate service termination and legal accountability.",
      },
      {
        title: "4.2 Document Management",
        content:
          "Clients are responsible for submitting complete and correct documentation. Incomplete or incorrect documentation may cause delays or negative outcomes.",
      },
      {
        title: "4.3 Communication Protocol",
        content:
          "Sweden Relocators AB will only communicate with the Client or an authorized representative. Unapproved third-party communication may result in contract termination.",
      },
      {
        title: "4.4 Data Privacy",
        content:
          "All personal data is handled in accordance with the General Data Protection Regulation (GDPR) and applicable Swedish and Danish laws. Data will be retained until the completion of services. Upon request, data can be deleted within 72 hours.",
      },
      {
        title: "4.5 Client Portal Access",
        content:
          "Clients must register on our website to access the online portal, where they can manage documents, communications, and invoices.",
      },
      {
        title: "4.6 Identification Verification",
        content:
          "Clients must provide valid identification and supporting documents upon request. This may include personal identification, company records, or family documentation for relocation services.",
      },
    ],
  },

  {
    title: "5. Advisory Services",
    subsections: [
      {
        title: "5.1 Specificity of Advice",
        content:
          "All advice provided by Sweden Relocators AB is tailored to the Client's specific assignment and based on the information and documentation provided. Advice is not transferable to other matters and should not be used for purposes beyond the intended scope.",
      },
      {
        title: "5.2 Policy and Legal Changes",
        content:
          "Advisory services reflect the most current information available at the time of consultation. Sweden Relocators AB is not liable for changes in laws, regulations, or policies that occur after advice has been provided.",
      },
      {
        title: "5.3 Consultancy Role",
        content:
          "Sweden Relocators AB operates as consultants, not legal practitioners. Our advice is based on publicly available information from official government sources in Sweden and Denmark. Legal services may be referred to licensed law firms when necessary.",
      },
      {
        title: "5.4 Audio and Video Recording",
        content:
          "Recording of advisory sessions, whether audio or video, is strictly prohibited. Unauthorized recordings will result in immediate action under applicable laws. Written approval is required for any exceptions.",
      },
    ],
  },

  {
    title: "6. Dispute Resolution and Governing Law",
    subsections: [
      {
        title: "6.1 Governing Law",
        content:
          "These Terms and Conditions are governed by Swedish and Danish laws, as applicable.",
      },
      {
        title: "6.2 Dispute Resolution",
        content:
          "Disputes shall be resolved through arbitration at the Stockholm Chamber of Commerce or Copenhagen Arbitration Institute, depending on the service location.",
      },
    ],
  },
  {
    title: "7. Amendments to Terms",
    subsections: [
      {
        title: "7.1 Modifications",
        content:
          "Sweden Relocators AB reserves the right to amend these Terms and Conditions at any time. Updates will be posted on our official website.",
      },
      {
        title: "7.2 Continued Use",
        content:
          "Continued use of our services implies acceptance of the latest version of these Terms and Conditions.",
      },
    ],
  },
  // ... Add the rest of the sections here, following the same structure
  {
    title: "8. Contact Information",
    content: (
      <>
        For any queries regarding these Terms and Conditions, please contact:{" "}
        <a href="mailto:Support@swedenrelocators.se" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
          Support@swedenrelocators.se
        </a>
      </>
    ),
  },
];