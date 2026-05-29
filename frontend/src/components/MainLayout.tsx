import React, { useState, useEffect, useRef } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Navigation from './Navigation'; // Import Navigation component

const drawerWidth = 240;
const INACTIVITY_TIMEOUT = 7000; // 7 seconds

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };

  const resetTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    if (sidebarOpen) { // Only set a new timer if the sidebar is open
      inactivityTimer.current = setTimeout(() => {
        setSidebarOpen(false);
      }, INACTIVITY_TIMEOUT);
    }
  };

  // Set up event listeners for user activity
  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('scroll', resetTimer); // Added scroll to reset timer

    // Clear event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [sidebarOpen]); // Re-run effect when sidebarOpen changes to manage timer properly

  useEffect(() => {
    if (sidebarOpen) {
      resetTimer(); // Start timer when sidebar opens
    } else {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current); // Clear timer when sidebar closes
      }
    }
  }, [sidebarOpen]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navigation toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Adjust for AppBar height (approx 64px)
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: sidebarOpen ? `${drawerWidth}px` : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
