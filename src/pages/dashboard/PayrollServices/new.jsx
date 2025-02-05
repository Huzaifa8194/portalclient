import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PostCreateView } from 'src/sections/Payroll/view';

// ----------------------------------------------------------------------

const metadata = { title: `Payroll Services | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostCreateView />
    </>
  );
}
