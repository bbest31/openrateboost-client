import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, Button } from '@mui/material';
// components
import { FormProvider } from '../components/hook-form';
// config
import { AUTH0_API } from '../config';

// ----------------------------------------------------------------------

AccountChangePassword.propTypes = {
  user: PropTypes.object.isRequired,
  social: PropTypes.bool.isRequired,
};

export default function AccountChangePassword({ user, social }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { domain, clientId } = AUTH0_API;

  const methods = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    try {
      fetch(`https://${domain}/dbconnections/change_password`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          email: user.email,
          connection: 'Username-Password-Authentication',
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            enqueueSnackbar('Email sent!');
            setIsEmailSent(true);
          } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            setIsEmailSent(false);
          }
        })
        .catch((err) => {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
          throw err;
        });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      console.error(e);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-start">
          <h2>Reset Password</h2>
          {social ? (
            <p>Your profile is managed by a third party, please use their system to update your password.</p>
          ) : (
            <p>You will receive an email with a link to set a new password for your account.</p>
          )}
          <Button type="submit" variant="contained" disabled={social}>
            {isEmailSent ? 'Resend Email' : 'Send Email'}
          </Button>
        </Stack>
      </FormProvider>
    </Card>
  );
}
