import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ApplicationTable } from 'src/sections/overview/analytics/view/ApplicationTable';

const metadata = { title: `Analytics | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
     <ApplicationTable authority="Migrationsverket"/>
    </>
  );
}
