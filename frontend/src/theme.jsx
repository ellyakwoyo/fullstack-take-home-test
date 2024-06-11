import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5ACCCC',
    },
    secondary: {
      main: '#F76434',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Mulish, sans-serif',
  },
});

export default theme;
