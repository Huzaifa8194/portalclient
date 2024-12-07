import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Investors"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Business', href: paths.dashboard.post.root },
          { name: ' Investors' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />

      <PostNewEditForm />
    </DashboardContent>
  );
}
