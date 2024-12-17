import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtSignUpViewOptions } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignUpViewOptions />
    </>
  );
}
