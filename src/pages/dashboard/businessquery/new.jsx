import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductCreateView } from 'src/sections/businessquery/view';

// ----------------------------------------------------------------------

const metadata = { title: `Business Queries | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductCreateView />
    </>
  );
}
