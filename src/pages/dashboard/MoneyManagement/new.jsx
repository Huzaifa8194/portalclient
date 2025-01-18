import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PostCreateView } from 'src/sections/MoneyManagement/view';

// ----------------------------------------------------------------------

const metadata = { title: `Money Management | Dashboard - ${CONFIG.appName}` };

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
