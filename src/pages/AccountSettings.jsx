import { capitalCase } from 'change-case';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useState, useEffect } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
import useTabs from '../hooks/useTabs';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import AccountChangePassword from '../sections/AccountChangePassword';
import AccountGeneral from '../sections/AccountGeneral';

import { AUTH0_API, SERVER_API } from '../config';
// ----------------------------------------------------------------------

export default function AccountSettings() {
  const { themeStretch } = useSettings();
  const { currentTab, onChangeTab } = useTabs('general');
  const { getAccessTokenSilently, user } = useAuth0();
  const [isSocial, setIsSocial] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [userRole, setUserRole] = useState('');
  const { audience, scope } = AUTH0_API;

  /**
   * Gets the user's identity provider
   */
  const getUserProfile = useCallback(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
            scope,
          },
        });
        const userDetailsUrl = `${SERVER_API}/users/${user.sub}`;

        const response = await fetch(userDetailsUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const profile = await response.json();
        setUserProfile(profile);
        setUserEmail(profile.email);
        setUserCompany(profile?.user_metadata?.company || '');
        setUserRole(profile?.user_metadata?.role || '');
        setIsSocial(profile.identities[0].isSocial);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [audience, getAccessTokenSilently, scope, user.sub]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral email={userEmail} company={userCompany} role={userRole} social={isSocial} />,
    },
    {
      value: 'change_password',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword user={userProfile} social={isSocial} />,
    },
  ];

  return (
    <Page title="Settings">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Settings"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Settings' }]}
        />
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab key={tab.value} disableRipple icon={tab.icon} label={capitalCase(tab.value)} value={tab.value} />
          ))}
        </Tabs>
        <Box sx={{ mb: 5 }} />
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
