import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material'; // Import IconButton
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import Location icon
import { useAuth } from '../context/AuthContext'; // Import useAuth

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  // Hardcoded placeholder checkpoint data with approximate positions
  const checkpoints = [
    { id: 1, name: 'Central Station', top: '35%', left: '45%' }, // Example coordinates
    { id: 2, name: 'Dom Tower', top: '45%', left: '55%' },
    { id: 3, name: 'Oudegracht', top: '55%', left: '40%' },
  ];

  const handleCheckpointClick = (id: number) => {
    navigate(`/game/${id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute space between items
        minHeight: 'calc(100vh - 64px - 64px)', // Adjust for AppBar and Container margin
        textAlign: 'center',
        padding: 2,
      }}
    >
      {/* "Welcome to EscApp" text on top */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)', mt: 2 }}>
        Welcome to EscApp
      </Typography>

      {/* Map underneath with interactive markers */}
      <Box
        sx={{
          flexGrow: 1, // Allows map to take available space
          width: '100%',
          maxWidth: '600px', // Max width of the map container
          position: 'relative', // For positioning markers absolutely
          // Removed aspectRatio from here
          margin: '20px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/City_Map_Utrecht.webp"
          alt="Utrecht City Map" // Simplified alt text
          style={{
            display: 'block', // Ensure it's a block element
            width: '100%',
            height: 'auto', // Maintain aspect ratio
            maxWidth: '100%', // Scale down if wider than parent
            maxHeight: 'calc(100vh - 250px)', // Adjust max height based on screen size minus other elements
            objectFit: 'contain',
            backgroundColor: 'grey', // Added explicit background color for debugging if image doesn't load
          }}
        />
        {checkpoints.map((checkpoint) => {
          const isFirstCheckpoint = checkpoint.id === 1;
          const isPreviousCheckpointCompleted = user?.completedCheckpoints?.includes(checkpoint.id - 1);
          const isCheckpointUnlocked = isFirstCheckpoint || (user?.completedCheckpoints?.includes(checkpoint.id - 1));

          // Visual styling for locked/unlocked
          const iconColor = isCheckpointUnlocked ? 'primary.main' : 'grey.600';
          const buttonProps: any = isCheckpointUnlocked ? { onClick: () => handleCheckpointClick(checkpoint.id) } : { disabled: true };

          return (
            <IconButton
              key={checkpoint.id}
              sx={{
                position: 'absolute',
                top: checkpoint.top,
                left: checkpoint.left,
                transform: 'translate(-50%, -50%)', // Center the icon
                color: iconColor, // Color based on unlocked status
                zIndex: 1, // Ensure icon is above the map
                cursor: isCheckpointUnlocked ? 'pointer' : 'not-allowed', // Change cursor for locked items
              }}
              {...buttonProps}
              title={checkpoint.name + (isCheckpointUnlocked ? '' : ' (Locked)')}
            >
              <LocationOnIcon fontSize="large" />
            </IconButton>
          );
        })}
      </Box>

      {/* Buttons at the bottom */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2, // Margin bottom
          width: '100%',
          maxWidth: '200px', // Limit button width
        }}
      >
        {user?.role === 'admin' && ( // Only show if user is admin
          <Button variant="contained" component={Link} to="/game-selection" sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}>
            Go to Admin Page
          </Button>
        )}
        <Button variant="contained" component={Link} to="/leaderboard" sx={{ backgroundColor: 'primary.dark', '&:hover': { backgroundColor: 'primary.main' } }}>
          Leaderboard
        </Button>
      </Box>
    </Box>
  );
};

export default MainMenu;