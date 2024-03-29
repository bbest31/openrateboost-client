// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
// components
import Page from '../components/Page';
import { ContactHero, ContactForm } from '../sections/contact';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Contact() {
  const { enqueueSnackbar } = useSnackbar();

  const snackBarFeedback = (message, options) => {
    enqueueSnackbar(message, options);
  };
  return (
    <Page title="Contact us">
      <RootStyle>
        <ContactHero />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <ContactForm feedback={snackBarFeedback} />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
