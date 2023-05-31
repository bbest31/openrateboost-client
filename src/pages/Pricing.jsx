// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// hooks
import { useAuth0 } from '@auth0/auth0-react';
// import useSettings from '../hooks/useSettings';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
// sections
import PricingPlanCard from '../sections/PricingPlanCard';
// config
import { AUTH0_API, STRIPE_CONFIG, SERVER_API } from '../config';
// assets
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const _pricingPlans = [
  {
    subscription: 'free trial',
    icon: <PlanFreeIcon />,
    price: 0,
    // caption: 'forever',
    lists: [
      { text: 'Limited to 10 uses', isAvailable: true },
      { text: 'Open rates for subject lines', isAvailable: false },
      // { text: 'Up to 5 team members', isAvailable: false },
      // { text: 'Advanced security', isAvailable: false },
      // { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'Choose Free Trial',
    active: false,
  },
  {
    subscription: 'basic',
    icon: <PlanStarterIcon />,
    price: 4.99,
    // caption: 'saving $24 a year',
    lists: [
      { text: 'Up to 25 uses per month', isAvailable: true },
      { text: 'Open rates for subject lines', isAvailable: true },
      // { text: '3 boards', isAvailable: true },
      // { text: 'Up to 5 team members', isAvailable: true },
      // { text: 'Advanced security', isAvailable: false },
      // { text: 'Permissions & workflows', isAvailable: false },
    ],
    active: false,
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 19.99,
    // caption: 'saving $124 a year',
    lists: [
      { text: 'Up to 100 uses per month', isAvailable: true },
      { text: 'Open rates for subject lines', isAvailable: true },
      // { text: '3 boards', isAvailable: true },
      // { text: 'Up to 5 team members', isAvailable: true },
      // { text: 'Advanced security', isAvailable: true },
      // { text: 'Permissions & workflows', isAvailable: true },
    ],
    active: false,
    labelAction: 'choose premium',
  },
];

// ----------------------------------------------------------------------

export default function Pricing() {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const { domain, audience, scope } = AUTH0_API;
  const [pricingPlans, setPricingPlans] = useState(_pricingPlans);
  const [userPlan, setUserPlan] = useState(null);
  const navigate = useNavigate();

/**
 * 
 * @param {*} plan 
 * @returns {String}
 */
  const createCheckoutSession = async (plan) => {
    const accessToken = await getAccessTokenSilently({
      audience,
      scope,
    });
    const createCheckoutSessionUrl = `${SERVER_API}/users/${user.sub}/checkout?plan=${plan}`;
    const response = await fetch(createCheckoutSessionUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (data?.error) {
      return '#';
    }

    return data.url;
  };

  const planOnClick = async (plan) => {
    const billingPortalUrl = `${STRIPE_CONFIG.portalUrl}?prefilled_email=${encodeURIComponent(user.email)}`;
    switch (plan) {
      case 'basic':
        window.location.href =
          userPlan === 'free'
            ? await createCheckoutSession('basic')
            : billingPortalUrl;
        break;
      case 'premium':
        window.location.href =
          userPlan === 'free'
            ? await createCheckoutSession('premium')
            : billingPortalUrl;
        break;
      default:
        window.location.href = billingPortalUrl;
        break;
    }
  };

  const updatePricingPlans = useCallback((index) => {
    const newPlans = pricingPlans.map((plan, i) => {
      if (index === i) {
        return { ...plan, active: true, labelAction: 'Current Plan' };
      }
      return { ...plan, active: false };
    });
    setPricingPlans(newPlans);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
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
          switch (user_metadata?.plan || 'free') {
            case 'basic':
              updatePricingPlans(1);
              setUserPlan('basic');
              break;
            case 'premium':
              setUserPlan('premium');
              updatePricingPlans(2);
              break;
            default:
              setUserPlan('free');
              updatePricingPlans(0);
              break;
          }
        } catch (e) {
          console.log(e.message);
        }
      } else {
        // non-authenticated user
        updatePricingPlans(null);
      }
    })();
  }, [user, audience, domain, getAccessTokenSilently, scope, isAuthenticated, updatePricingPlans, navigate]);
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Cold Emails to Hot Leads
          </Typography>

          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Boost open rates and drive sales with AI-optimized subject lines
          </Typography>

          {/* <Box sx={{ my: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Typography variant="overline" sx={{ mr: 1.5 }}>
                MONTHLY
              </Typography>

              <Switch />
              <Typography variant="overline" sx={{ ml: 1.5 }}>
                YEARLY (save 10%)
              </Typography>
            </Stack>

            <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>
              * Plus applicable taxes
            </Typography>
          </Box> */}

          <Grid container spacing={3} sx={{ my: 5 }}>
            {pricingPlans.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard
                  card={card}
                  index={index}
                  click={isAuthenticated ? () => planOnClick(card.subscription) : () => navigate(PATH_AUTH.login)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
