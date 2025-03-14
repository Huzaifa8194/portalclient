import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { Logo2 } from 'src/components/logo/logo2';
import { Iconify } from 'src/components/iconify';
import { MegaMenuMobile } from 'src/components/mega-menu';

import { navItems1 } from './data';

// ----------------------------------------------------------------------

export function DemoMegaMenuMobile() {
  return (
    <MegaMenuMobile
      data={navItems1}
      cssVars={{
        '--nav-item-gap': '8px',
      }}
      slots={{
        button: (
          <Button color="inherit" variant="contained" startIcon={<Iconify icon="carbon:menu" />}>
            Mobile menu
          </Button>
        ),
        topArea: (
          <Box sx={{ px: 2.5, py: 3 }}>
            <Logo2 />,
          </Box>
        ),
        bottomArea: (
          <Divider>
            <Box
              sx={{
                p: 2,
                textAlign: 'center',
                color: 'text.secondary',
                typography: 'subtitle2',
              }}
            >
              Bottom
            </Box>
          </Divider>
        ),
      }}
    />
  );
}
