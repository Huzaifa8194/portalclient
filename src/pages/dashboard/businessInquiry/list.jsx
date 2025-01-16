import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { InquiryListView  } from 'src/sections/inquiry/view/inquiry-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Invoice list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <InquiryListView />
    </>
  );
}
