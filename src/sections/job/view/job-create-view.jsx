import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { JobNewEditForm } from '../addCoapplicant';

// ----------------------------------------------------------------------

export function JobCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Add a Co-Applicant"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Co-Applicants', href: paths.dashboard.job.root },
          { name: 'Add Co-Applicant' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />

      <JobNewEditForm />
    </DashboardContent>
  );
}
