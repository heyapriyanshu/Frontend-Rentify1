// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212529', // Customize the primary color
    },
    secondary: {
      main: '#FFC107', // Customize the secondary color
    },
    background: {
      default: '#f5f5f5', // Customize the background color
    },
    text: {
      primary: '#333333', // Customize the primary text color
    },
    // Add more custom colors if needed
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize the font family
  },
  // Add more customizations if needed
});

export default theme;
