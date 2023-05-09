import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Button } from '@mui/material';
// components
import { FormProvider, RHFTextField } from '../components/hook-form';
// config
import { AUTH0_API, SERVER_API } from '../config';

// ----------------------------------------------------------------------

AccountGeneral.propTypes = {
  email: PropTypes.string.isRequired,
  company: PropTypes.string,
  role: PropTypes.string,
  social: PropTypes.bool.isRequired,
};

export default function AccountGeneral({ email, company, role, social }) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, getAccessTokenSilently } = useAuth0();
  const { audience, scope } = AUTH0_API;

  const UpdateUserSchema = Yup.object().shape({
    company: Yup.string(),
    role: Yup.string(),
    email: Yup.string().email('Email must be a valid email address'),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      company,
      role,
      email,
    },
  });

  useEffect(() => {
    methods.reset({
      company,
      role,
      email,
    });
  }, [email, company, role, methods]);

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    // check if the user has changed the email, company or role
    try {
      let updateUser = false;
      const newUserData = {};

      if (email !== data.email) {
        updateUser = true;
        newUserData.email = data.email;
      }

      if (company !== data.company) {
        updateUser = true;
        newUserData.company = data.company;
      }

      if (role !== data.role) {
        updateUser = true;
        newUserData.role = data.role;
      }

      if (updateUser) {
        // update the user info

        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
            scope,
          },
        });
        fetch(`${SERVER_API}/users/${user.sub}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUserData),
        })
          .then((res) => {
            if (res.status === 200) {
              enqueueSnackbar('Profile updated!');
            } else {
              enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
          })
          .catch((err) => {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            throw err;
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="company" label="Company (optional)" />
              <RHFTextField name="role" label="Role (optional)" />
              <RHFTextField
                name="email"
                label="Email Address"
                helperText={social ? 'Email managed by a third party' : ''}
                disabled={social}
              />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
