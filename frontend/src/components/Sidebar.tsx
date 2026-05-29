import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, drawerWidth }) => {
  const { logout, user } = useAuth(); // Get user from AuthContext

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar /> {/* This helps push the content below the AppBar */}
      <List>
        <ListItemButton component={Link} to="/" onClick={toggleSidebar}> {/* Home */}
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        {user?.role === 'admin' && ( // Conditionally render for admin
          <ListItemButton component={Link} to="/game-selection" onClick={toggleSidebar}> {/* Game Selection */}
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary="Game Selection" />
          </ListItemButton>
        )}
        <ListItemButton component={Link} to="/leaderboard" onClick={toggleSidebar}> {/* Leaderboard */}
          <ListItemIcon>
            <LeaderboardIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings" onClick={toggleSidebar}> {/* Settings - placeholder route */}
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
