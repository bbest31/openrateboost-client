import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid } from '@mui/material';
//
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------



const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/overlay.svg), url(https://minimal-assets-api-dev.vercel.app/assets/images/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 380,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <Grid container spacing={5} sx={{ mt: 5 }}>
            <Grid item xs={12}>
              <m.div variants={varFade().inRight}>
                <Typography variant="h1" sx={{ color: 'primary.main' }}>
                  Contact Us
                </Typography>
              </m.div>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
