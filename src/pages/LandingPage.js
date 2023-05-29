// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {
  LandingHero,
  LandingFeatures,
  LandingAdvertisement,
  LandingValueProp,
  LandingValuePropDark,
  LandingContactUs,
} from '../sections/landing';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <Page title="Home">
      <LandingHero />

      <ContentStyle>
        <LandingFeatures />

        <LandingValueProp />
        <LandingValuePropDark />
        <LandingContactUs />

        <LandingAdvertisement />
      </ContentStyle>
    </Page>
  );
}
