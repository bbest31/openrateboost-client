import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useMixpanel } from 'react-mixpanel-browser';
import { trackEvent } from '../utils/mixpanelUtils';
import { AUTH0_API } from '../config';
// pages
import Login from '../pages/auth/Login';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isLoading, isAuthenticated, error, user, getAccessTokenSilently } = useAuth0();
  const mixpanel = useMixpanel();

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    const initUserMixpanelProfile = async () => {
      if (user?.sub && searchParams.get('login') === 'true') {
        const { domain, audience, scope } = AUTH0_API;

        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience,
              scope,
            },
          });
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // eslint-disable-next-line
          const { user_metadata } = await metadataResponse.json();
          // eslint-disable-next-line
          mixpanel.people.set({ plan: user_metadata.plan, usage_count: user_metadata.usage_count });
          // eslint-disable-next-line
          mixpanel.register({ plan: user_metadata.plan, usage_count: user_metadata.usage_count });
        } catch (e) {
          console.log(e.message);
        }
      }
    };
    initUserMixpanelProfile();
  }, [getAccessTokenSilently, user?.sub, searchParams, user, mixpanel]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  mixpanel.identify(user.sub);
  mixpanel.people.set({
    $email: user.email,
    $name: user.name,
    $avatar: user.picture,
    $distinct_id: user.sub,
  });
  if (searchParams.get('login') === 'true') {
    trackEvent(mixpanel, 'Login', { source: 'webapp' });
  }
  return <>{children}</>;
}
