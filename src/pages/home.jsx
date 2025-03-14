import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/home/view';
import { JwtSignInViewOptions } from 'src/auth/view/jwt';
import { AuthSplitLayout } from 'src/layouts/auth-split';
import { lazy, Suspense } from 'react';
import { GuestGuard } from 'src/auth/guard';
import { SplashScreen } from 'src/components/loading-screen';
import { LayoutSection } from 'src/layouts/core/layout-section';
import { authDemoRoutes } from 'src/routes/sections/auth-demo';
// ----------------------------------------------------------------------
const metadata = {
  title: 'Sweden Relocators',
  description: 'Your relocation partner in Sweden',

};

export default function Page() {
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/jwt/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
  SignUpPageCompany: lazy(() => import('src/pages/auth/jwt/sign-up-company')),
  SignUpPagePartner: lazy(() => import('src/pages/auth/jwt/sign-up-partner')),
  SignUpPageOptions: lazy(() => import('src/pages/auth/jwt/sign-up-options')),
  SignInPageOptions: lazy(() => import('src/pages/auth/jwt/sign-in-options')),
};
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>
       <GuestGuard>
                <AuthSplitLayout>
                  <Jwt.SignInPageOptions />
                </AuthSplitLayout>
        </GuestGuard>
      {/* <HomeView /> */}
    </>
  );
}
