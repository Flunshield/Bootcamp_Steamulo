import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
