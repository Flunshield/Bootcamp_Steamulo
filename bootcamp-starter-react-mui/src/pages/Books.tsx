import { Box, Typography } from '@mui/material';
import BookList from '../components/BookList';
import Copyright from '../components/Copyright';
import HeadBand from '../components/HeadBand';

export default function Books() {
  return (
    <>
      <HeadBand />
      <Box margin={5}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          marginTop={10}
          fontFamily={'OCR A Std'}
        >
          Voici les livres disponibles actuellement
        </Typography>
        <BookList />
      </Box>
      <Copyright />
    </>
  );
}
