import { Box } from '@mui/material';
import BookById from '../components/BookById';
import Copyright from '../components/Copyright';
import HeadBand from '../components/HeadBand';

export default function PageBook() {
  return (
    <>
      <HeadBand />
      <Box component="h1" marginTop={11}>
        <BookById />
      </Box>
      <Copyright />
    </>
  );
}
