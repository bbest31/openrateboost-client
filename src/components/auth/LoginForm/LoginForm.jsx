import { useAuth0 } from '@auth0/auth0-react';

// @mui
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button fullWidth size="large" type="submit" variant="contained" onClick={() => loginWithRedirect()}>
      Login or Signup
    </Button>
  );
}
