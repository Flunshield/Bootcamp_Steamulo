import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#556cd6',
    },
    text: {
      secondary: grey[200],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
