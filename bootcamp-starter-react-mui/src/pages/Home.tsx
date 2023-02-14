import {
  Box,
  Container,
  SnackbarContent,
  Stack,
  Typography,
} from '@mui/material';
import Copyright from '../components/Copyright';
import HeadBand from '../components/HeadBand';

export default function Home() {
  return (
    <>
      <Container maxWidth="sm">
        <HeadBand />
        <Box sx={{ my: 4 }} textAlign={'center'}>
          <Typography variant="h4" component="h1" gutterBottom marginTop={10}>
            Bienvenue sur votre Bibliothèque
          </Typography>
          <Stack
            spacing={2}
            sx={{ maxWidth: 600 }}
            marginTop={10}
            marginBottom={10}
          >
            <label> Informations importantes</label>
            <SnackbarContent message="Fermeture annuelle du 15 Décembre au 1er Janvier." />
            <SnackbarContent message="Victor Hugo sera présent le 15 Octobre 1850 pour sa séance de dédicasse." />
            <SnackbarContent message="Travaux pour agrandissement prévu le 15 et 16 Novembre 2022." />
          </Stack>
        </Box>
      </Container>
      <Copyright />
    </>
  );
}
