import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserListView } from 'src/sections/housing/analytics/view/ApplicationChoice';

// ----------------------------------------------------------------------

const metadata = { title: `Housing | Dashboard - ${CONFIG.appName}` };
// Housing Page
export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView />
    </>
  );
}
