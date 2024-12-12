import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Entrepreneur"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Busuness' },
          { name: 'Entrepreneur' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm />
    </DashboardContent>
  );
}