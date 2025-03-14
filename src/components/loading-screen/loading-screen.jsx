import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import LinearProgress from '@mui/material/LinearProgress';
// ----------------------------------------------------------------------

export function LoadingScreen({ portal, sx, ...other }) {
  const imageSrc="/logo.png"
  const content = (
    <Box
      sx={{
        px: 5,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      {/* Loading Image */}
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt="Loading"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
      )}

      {/* Loading Progress */}
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );

  if (portal) {
    return <Portal>{content}</Portal>;
  }

  return content;
}
