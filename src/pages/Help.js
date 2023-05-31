import { useState } from 'react';
// @mui
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  TextField,
  Box,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
// hooks
import { useAuth0 } from '@auth0/auth0-react';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// config
import { AUTH0_API, SERVER_API } from '../config';

// ----------------------------------------------------------------------

export default function Help() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { getAccessTokenSilently, user } = useAuth0();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { audience, scope } = AUTH0_API;

  const submitSupportRequest = async () => {
    setIsSending(true);
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience,
          scope,
        },
      });
      fetch(`${SERVER_API}/users/${user.sub}/support`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: `OpenRateBoost Support: ${category}`, text: message }),
      })
        .then((res) => {
          if (res.status === 200) {
            enqueueSnackbar('Support message sent!');
            setMessage('');
            setCategory('');
          } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
          }
          setIsSending(false);
        })
        .catch((err) => {
          setIsSending(false);
          enqueueSnackbar('Something went wrong', { variant: 'error' });
          throw err;
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Help">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Help
        </Typography>
        <Typography gutterBottom>
          If you are having any issues, or would like to give us feedback, please contact us using the form below.
        </Typography>

        <Grid container spacing={3}>
          <Grid container item xs={12} md={6}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    rowGap: 3,
                    columnGap: 2,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value="Feedback">Feedback</MenuItem>
                      <MenuItem value="Issue">Issue</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      labelId="message-label"
                      id="message"
                      label="Message"
                      onChange={(e) => setMessage(e.target.value)}
                      multiline
                      minRows={8}
                    />
                  </FormControl>
                  <Stack spacing={3} alignItems="flex-end">
                    {isSending ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        disabled={message.trim() === '' || category.trim() === ''}
                        onClick={submitSupportRequest}
                      >
                        Submit
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
