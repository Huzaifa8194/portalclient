import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PostListView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Visa & Permits | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostListView />
    </>
  );
}
