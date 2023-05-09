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
} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Help() {
  const { themeStretch } = useSettings();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const supportEmail = 'thebrandonmbest@gmail.com';

  const openEmailClient = () => {
    window.open(`mailto:${supportEmail}?subject=OpenRateBoost%20${category}&body=${encodeURIComponent(message)}`);
  };

  return (
    <Page title="Help">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Help
        </Typography>
        <Typography gutterBottom>
          If you are having any issues, or would like to give us feedback, please contact us using the form below.
          <br />
          Or email us at <strong>{supportEmail}</strong>
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
                    <Button variant="contained" size="large" onClick={openEmailClient}>
                      Submit
                    </Button>
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
