import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewCourseView } from 'src/sections/overview/globalVisa/view';

// ----------------------------------------------------------------------

const metadata = { title: `Course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewCourseView />
    </>
  );
}
