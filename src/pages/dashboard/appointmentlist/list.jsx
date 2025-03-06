import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ApplicationChoice } from 'src/sections/overview/manageAppointment/view/ApplicationChoice';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ApplicationChoice />
    </>
  );
}
