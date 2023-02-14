import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web/lib/useKeycloak';
import ButtonLog from './ButtonLog';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

type NavRoute = {
  route: string;
  label: string;
  displayLink: boolean;
};

export default function DrawerAppBar(props: Props) {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  const navItems: NavRoute[] = [
    {
      route: '/',
      label: 'Accueil',
      displayLink: true,
    },
    {
      route: '/books',
      label: 'Livres',
      displayLink: true,
    },
    {
      route: '/moncompte',
      label: 'Mon compte',
      displayLink: isLoggedIn ?? false,
    },
  ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Bibliothèque
      </Typography>
      <Divider />
      <List>
        {navItems.map(
          (item) =>
            item.displayLink && (
              <ListItem key={item.route} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText
                    primary={
                      <Link component={RouterLink} to={item.route}>
                        {item.label}
                      </Link>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
        )}
        <ButtonLog />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            textAlign={'left'}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Bibliothèque
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <>
              {navItems.map(
                (item) =>
                  item.displayLink && (
                    <Link
                      component={RouterLink}
                      to={item.route}
                      color="text.secondary"
                      px={1}
                      key={item.route}
                    >
                      {item.label}
                    </Link>
                  )
              )}
              <ButtonLog />
            </>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
