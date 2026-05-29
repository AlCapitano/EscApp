import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ toggleSidebar, sidebarOpen }) => {
  const { isAuthenticated, logout } = useAuth();
  const drawerWidth = 240; // This should be consistent with MainLayout

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)`,
        ml: sidebarOpen ? `${drawerWidth}px` : 0,
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Escape The City
          </Link>
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/game">
              Game
            </Button>
            <Button color="inherit" component={Link} to="/leaderboard">
              Leaderboard
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
