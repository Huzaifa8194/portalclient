import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import Grid from '@mui/material/Unstable_Grid2';
import { SeoIllustration } from 'src/assets/illustrations';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

import { ProductShopDetailsView } from 'src/sections/product/view';
import { AppWelcome } from 'src/sections/feedback/app-welcome';
// ----------------------------------------------------------------------

const metadata = { title: `Reviews ` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  return (
    <>
     <DashboardContent>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
  <CustomBreadcrumbs
         heading="Check reviews and leave a review"
         links={[
           { name: 'Dashboard', href: paths.dashboard.root },
           { name: 'Reviews' },
         ]}
         sx={{ mb: { xs: 3, md: 3 } }}
       />

    <Grid container spacing={3}>
        <Grid xs={12}>
        <AppWelcome
  title="Welcome back 👋 User"
  description="We value your reviews and would love to hear about your experience with our services. Please take a moment to leave an honest review. Your input helps us improve and serve you better."
  img={<SeoIllustration hideBackground />}
/>
        </Grid>
        </Grid>

      <ProductShopDetailsView product={product} loading={productLoading} error={productError} />
      </DashboardContent>
    </>
  );
}
