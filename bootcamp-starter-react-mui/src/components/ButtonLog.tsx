import Button from '@mui/material/Button/Button';
import { useKeycloak } from '@react-keycloak/web';

const ButtonLog = () => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => keycloak.logout()}
    >
      Logout
    </Button>
  ) : (
    <Button
      variant="contained"
      onClick={() => keycloak.login()}
      color="secondary"
    >
      Login
    </Button>
  );
};

export default ButtonLog;
