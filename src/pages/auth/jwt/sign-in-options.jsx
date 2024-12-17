import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtSignInViewOptions } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign In | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignInViewOptions />
    </>
  );
}
