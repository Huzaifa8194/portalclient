import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PostCreateView } from 'src/sections/attorney/view';

// ----------------------------------------------------------------------

const metadata = { title: `Power of Attorney | Dashboard - ${CONFIG.appName}` };

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
