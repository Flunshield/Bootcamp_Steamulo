import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './theme';
import keycloak from '../keycloak';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
);
