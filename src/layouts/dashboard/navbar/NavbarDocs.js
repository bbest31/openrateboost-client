import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useMixpanel } from 'react-mixpanel-browser';
// @mui
import { Stack, Button, Typography, LinearProgress } from '@mui/material';
// assets
// import { DocIllustration } from '../../../assets';
import { AUTH0_API, MAX_BASIC_USES, MAX_FREE_USES, MAX_PREMIUM_USES } from '../../../config';
import { trackEvent } from '../../../utils/mixpanelUtils';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { getAccessTokenSilently, user } = useAuth0();
  const { domain, audience, scope } = AUTH0_API;
  const navigate = useNavigate();
  const mixpanel = useMixpanel();

  const [userPlan, setUserPlan] = useState('free');
  const [usageCount, setUsageCount] = useState(0);
  const [maxUsageCount, setMaxUsageCount] = useState(10);

  useEffect(() => {
    (async () => {
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
        setUsageCount(user_metadata?.usage_count || 0);
        // eslint-disable-next-line
        switch (user_metadata?.plan) {
          case 'basic':
            setUserPlan('basic');
            setMaxUsageCount(MAX_BASIC_USES);
            break;
          case 'premium':
            setUserPlan('premium');
            setMaxUsageCount(MAX_PREMIUM_USES);
            break;
          default:
            setUserPlan('free');
            setMaxUsageCount(MAX_FREE_USES);
            break;
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [user, audience, domain, getAccessTokenSilently, scope]);

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      {/* <DocIllustration sx={{ width: 1 }} /> */}

      <div>
        <Typography gutterBottom variant="subtitle1">
          {userPlan === 'free' ? 'Free uses left: ' : 'Monthly usage: '}
          <strong>
            {usageCount}/{maxUsageCount}
          </strong>
        </Typography>
        <LinearProgress variant="determinate" value={(usageCount / maxUsageCount) * 100} />
        {userPlan !== 'premium' ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upgrade for more usage!
          </Typography>
        ) : null}
      </div>

      <Button
        variant="contained"
        onClick={() => {
          trackEvent(mixpanel, 'Upgrade button clicked', { Source: 'Client Navbar' });
          navigate('/pricing');
        }}
      >
        Upgrade
      </Button>
    </Stack>
  );
}
