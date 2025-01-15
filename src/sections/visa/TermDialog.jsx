import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export function TermsDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="terms-dialog-title">
      <DialogTitle id="terms-dialog-title">Consent & Acknowledgment of Third-Party Services and Data Processing</DialogTitle>
      <DialogContent>
        <DialogContentText>
          I acknowledge and agree that Sweden Relocators AB facilitates pet relocation through third-party providers and is not liable for the services rendered. I also consent to the sharing of my data for service facilitation in compliance with GDPR.
        </DialogContentText>
        <DialogContentText>
          Official Notice: Engagement with Third-Party Service Providers
        </DialogContentText>
        <DialogContentText>
          At Sweden Relocators AB, we are committed to offering comprehensive relocation solutions. To enhance our services, we collaborate with independent third-party providers for specialized services such as pet relocation, financial transfers, and logistics. These partnerships allow us to streamline the relocation process, offering you convenience through a single point of contact.
        </DialogContentText>
        <DialogContentText>
          Important Terms of Engagement:
        </DialogContentText>
        <DialogContentText>
          1. Independent Service Providers: All third-party services are fully managed and executed by external providers. Sweden Relocators AB solely facilitates the connection between clients and these service providers and does not oversee or manage the delivery, quality, execution, or fulfillment of these services.
        </DialogContentText>
        <DialogContentText>
          2. No Liability: Sweden Relocators AB holds no responsibility or liability for any disputes, damages, losses, service delays, or dissatisfaction arising from the services rendered by third-party providers. All contractual agreements, payments, and service execution are strictly between the client and the chosen provider.
        </DialogContentText>
        <DialogContentText>
          3. Client Due Diligence: It is the client&apos;s responsibility to review and agree to the terms and conditions set by the third-party service providers before engaging their services. Sweden Relocators AB does not guarantee service quality, pricing, or performance of any third-party services.
        </DialogContentText>
        <DialogContentText>
          4. Communication and Transactions: All negotiations, communications, and financial transactions regarding third-party services will be conducted directly between the client and the respective service provider.
        </DialogContentText>
        <DialogContentText>
          5. Service Modifications or Cancellations: Sweden Relocators AB will not be involved in any modifications, cancellations, refunds, or claims related to third-party services.
        </DialogContentText>
        <DialogContentText>
          GDPR Data Protection Consent:
        </DialogContentText>
        <DialogContentText>
          By submitting this form, you expressly consent to Sweden Relocators AB collecting, processing, and securely sharing your personal data with third-party service providers strictly for the purpose of facilitating requested services. All data handling complies with the General Data Protection Regulation (GDPR). Your data will not be used for any other purpose without your explicit consent.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

