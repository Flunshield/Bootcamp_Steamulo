import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useKeycloak } from '@react-keycloak/web';
import Admin from './Admin';
import BookListLoanByUser from './BookListLoanByUser';

const MonCompte = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  const token = keycloak.token;
  const tableauToken = token?.split('.')[1];
  const tableauTokenRole: string[] = tableauToken
    ? JSON.parse(atob(tableauToken)).realm_access?.roles
    : null;

  const checkRoleUser = tableauTokenRole?.includes('Loan');
  const checkRoleAdmin = tableauTokenRole?.includes('Admin');
  return isLoggedIn ? (
    <Box>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" marginBottom={5}>
            Informations :
          </Typography>
          <Box>
            <Grid container rowSpacing={1} marginLeft={10}>
              <Box margin={5}>
                <label> Nom d'utilisateur : </label>
                {keycloak.tokenParsed?.preferred_username}
              </Box>
              <Box margin={5}>
                <label>Nom de famille : </label>
                {keycloak.tokenParsed?.family_name}
              </Box>
              <Box margin={5}>
                <label>Prénom : </label>
                {keycloak.tokenParsed?.given_name}
              </Box>
              <Box margin={5}>
                <label>Email : </label>
                {keycloak.tokenParsed?.email}
              </Box>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid textAlign={'right'} marginTop={10}>
            {isLoggedIn && checkRoleAdmin && <Admin />}
          </Grid>
          <Grid textAlign={'right'} marginTop={10}>
            {isLoggedIn && !checkRoleAdmin && checkRoleUser && (
              <BookListLoanByUser />
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <>{window.location.replace('/')}</>
  );
};

export default MonCompte;
