// ManagerDetails.jsx
import { 
  Box,
  Typography, 
  Avatar, 
  Divider, 
  Grid,
  Paper,
  Link,
  Card,
} from "@mui/material";

export function ManagerDetails({ onClose }) {
  const manager = {
    name: "Naufil",
    title: "Senior Case Manager",
    profilePicture: "https://example.com/manager-profile.jpg",
    phone: "+92 (345) 123-4567",
    email: "naufil@gmail.com",
    address: "G11/2, Islamabad, 12345, Pakistan",
    website: "www.naufil.com",
    linkedin: "linkedin.com/in/naufil",
  };

  return (
    <Card sx={{ width: '100%', p: 2 }}>
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ mb: 2, fontWeight: 500 }}
      >
        Your Case Manager
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={manager.profilePicture}
          alt={manager.name}
          sx={{ 
            width: 60, 
            height: 60,
            mr: 2
          }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {manager.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
          >
            {manager.title}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
              Phone:
            </Typography>
            <Link href={`tel:${manager.phone}`} underline="hover" variant="body2">
              {manager.phone}
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
              Email:
            </Typography>
            <Link href={`mailto:${manager.email}`} underline="hover" variant="body2">
              {manager.email}
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
              Address:
            </Typography>
            <Typography variant="body2">
              {manager.address}
            </Typography>
          </Box>
        </Grid>

      

        <Grid item xs={10}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
              LinkedIn:
            </Typography>
            <Link href={`https://${manager.linkedin}`} underline="hover" target="_blank" variant="body2">
              {manager.linkedin}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}