import { Box, Typography } from '@mui/material';
import HeadBand from '../components/HeadBand';
import MonCompte from '../components/MonCompte';

export default function Securedpage() {
  return (
    <Box sx={{ my: 4 }} textAlign={'left'} margin={5}>
      <HeadBand />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        marginTop={10}
        fontFamily={'OCR A Std'}
      >
        Mon compte :
      </Typography>
      <MonCompte />
    </Box>
  );
}
