import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ApplicationTable } from 'src/sections/overview/analytics/view/ApplicationTable';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { DashboardContent } from 'src/layouts/dashboard';

const metadata = { title: `Analytics | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ApplicationTable/>
    </>
  );
}
