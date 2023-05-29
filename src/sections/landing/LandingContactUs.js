import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
import { varFade, MotionViewport } from '../../components/animate';
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomePricingPlans() {

  return (
    <RootStyle>
      <Container component={MotionViewport}>

        <m.div variants={varFade().in}>
          <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
            <m.div variants={varFade().inDown}>
              <Typography variant="h3">Still have questions?</Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                Feel free to contact us, so we can answer any questions you may have.
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Button
                size="large"
                variant="contained"
                href={PATH_PAGE.contact}
              >
                Contact us
              </Button>
            </m.div>
          </Box>
        </m.div>
      </Container>
    </RootStyle>
  );
}