import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';
import { PATH_DASHBOARD } from './paths';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import MainLayout from '../layouts/main';
// components
import LoadingScreen from '../components/LoadingScreen';
import Redirect from '../components/Redirect';
import { STRIPE_PORTAL_URL } from '../config';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <LandingPage />, index: true }, {path:'contact-us',element: <ContactUs/>}],
    },
    {
      path: '/auth',
      children: [{ path: 'login', element: <Login /> }],
    },
    {
      path: '/pricing',
      children: [{ path: '', element: <Pricing /> }],
    },
    {
      path: '/privacy-policy',
      children: [{ path: '', element: <PrivacyPolicy /> }],
    },
    {
      path: '/terms-and-conditions',
      children: [{ path: '', element: <TermsAndConditions /> }],
    },
    {
      path: PATH_DASHBOARD.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_DASHBOARD.general.home} replace />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'help', element: <Help /> },
        {
          path: 'account',
          children: [
            { element: <Navigate to={PATH_DASHBOARD.general.account.settings} replace />, index: true },
            { path: 'settings', element: <AccountSettings /> },
            { path: 'billing', element: <Redirect url={STRIPE_PORTAL_URL} /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const ContactUs = Loadable(lazy(() => import('../pages/ContactUs')));

// Dashboard
const Home = Loadable(lazy(() => import('../pages/Home')));
const AccountSettings = Loadable(lazy(() => import('../pages/AccountSettings')));
const Help = Loadable(lazy(() => import('../pages/Help')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const PrivacyPolicy = Loadable(lazy(() => import('../pages/PrivacyPolicy')));
const TermsAndConditions = Loadable(lazy(() => import('../pages/TermsAndConditions')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Auth
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
