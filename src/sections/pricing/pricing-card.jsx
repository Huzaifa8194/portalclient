import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { varAlpha, stylesMode } from 'src/theme/styles';
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import cap1 from 'src/assets/images/cap1.PNG';
import cap2 from 'src/assets/images/cap2.PNG';

import cap3 from 'src/assets/images/cap3.PNG';



// ----------------------------------------------------------------------

export function PricingCard({ card, sx, ...other }) {
  const { subscription, price, caption, lists, labelAction } = card;

  const basic = subscription === 'basic';

  const starter = subscription === 'starter';

  const premium = subscription === 'premium';

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {price === 'Private' && <img src={cap1} alt="" style={{ width: '100%', height: '100%' }} />}
      {price === 'Companies' && <img src={cap2} alt="" />}
      {price === 'Partners' && <img src={cap3} alt="" />}





      {/* {starter && <Label color="info">POPULAR</Label>} */}
    </Stack>
  );

  const renderSubscription = (
    <Stack spacing={1}>

      <Typography variant="subtitle2">{caption}</Typography>
    </Stack>
  );

  const renderPrice = basic ? (
    <Typography variant="h2">Free</Typography>
  ) : (
    <Stack direction="row">


      {/* <Typography variant="h2" textAlign="center" >{price}</Typography> */}


    </Stack>
  );

  const renderList = (
    <Stack spacing={2}>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
        <Link variant="body2" color="inherit" underline="always">
          All
        </Link>
      </Stack> */}

      {/* {lists.map((item) => (
        <Stack
          key={item}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          {item}
        </Stack>
      ))} */}
    </Stack>
  );

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.default',
        boxShadow: (theme) => ({ xs: theme.customShadows.card, md: 'none' }),
        ...((basic || starter) && {
          borderTopRightRadius: { md: 0 },
          borderBottomRightRadius: { md: 0 },
        }),
        ...((starter || premium) && {
          boxShadow: (theme) => ({
            xs: theme.customShadows.card,
            md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
          }),
          [stylesMode.dark]: {
            boxShadow: (theme) => ({
              xs: theme.customShadows.card,
              md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
            }),
          },
        }),
        ...sx,
      }}
      {...other}
    >
      {renderIcon}

      {renderSubscription}

      {renderPrice}
      {/* 
      <Divider sx={{ borderStyle: 'dashed' }} /> */}


      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={basic}
        color={starter ? 'inherit' : 'inherit'}
        href="/auth/jwt/sign-up"
      >
        {labelAction}
      </Button>
    </Stack>
  );
}
