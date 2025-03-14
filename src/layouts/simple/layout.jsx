import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Logo2 } from 'src/components/logo/logo2';

import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { SettingsButton } from '../components/settings-button';

// ----------------------------------------------------------------------

export function SimpleLayout({ sx, children, header, content }) {
  const layoutQuery = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <Box sx={{ paddingy: 4, display: "flex", alignItems: "center" }}>
                {/* -- Logo -- */}
                <Logo2 sx={{ width: 150, height: "auto" }} /> {/* Adjust width as needed */}
              </Box>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                {/* -- Help link -- */}
                <Link
                  href={paths.faqs}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
                {/* -- Settings button -- */}
                <SettingsButton />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-simple-content-compact-width': '448px',
      }}
      sx={sx}
    >
      <Main>
        {content?.compact ? (
          <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
        ) : (
          children
        )}
      </Main>
    </LayoutSection>
  );
}
