import { 
    Box,
    Typography, 
    Avatar, 
    IconButton, 
    Divider, 
    Grid,
    Paper,
    Link,
  } from "@mui/material";
  
  export function ManagerDetails({ onClose }) {
    const manager = {
      name: "Naufil",
      title: "Senior Case Manager",
      profilePicture: "https://example.com/manager-profile.jpg",
      phone: "+1 (555) 123-4567",
      email: "naufil@gmail.com",
      address: "123 Manager St, City, 12345, Pakistan",
      website: "www.naufil.com",
      linkedin: "linkedin.com/in/naufil",
    };
  
    return (
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          position: 'relative',
          p: 3,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            width: 32,
            height: 32,
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <Typography sx={{ fontSize: 20, lineHeight: 1 }}>×</Typography>
        </IconButton>
  
        {/* Rest of your component remains the same */}
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ mb: 4, fontWeight: 500 }}
        >
          Your Case Manager
        </Typography>
  
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={manager.profilePicture}
            alt={manager.name}
            sx={{ 
              width: 80, 
              height: 80,
              mr: 2
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {manager.name}
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
            >
              {manager.title}
            </Typography>
          </Box>
        </Box>
  
        <Divider sx={{ mb: 3 }} />
  
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
                Phone:
              </Typography>
              <Link href={`tel:${manager.phone}`} underline="hover">
                {manager.phone}
              </Link>
            </Box>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
                Email:
              </Typography>
              <Link href={`mailto:${manager.email}`} underline="hover">
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
  
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
                Website:
              </Typography>
              <Link href={`https://${manager.website}`} underline="hover" target="_blank">
                {manager.website}
              </Link>
            </Box>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
                LinkedIn:
              </Typography>
              <Link href={`https://${manager.linkedin}`} underline="hover" target="_blank">
                {manager.linkedin}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }