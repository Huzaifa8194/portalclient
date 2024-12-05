import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Book an Appointment"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Appointments', href: paths.dashboard.post.root },
          { name: 'Book an Appointment' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />

      <PostNewEditForm />
    </DashboardContent>
  );
}
