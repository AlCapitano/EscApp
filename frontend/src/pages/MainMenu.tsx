import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material'; // Import IconButton
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import Location icon
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useGame } from '../context/GameContext'; // Import useGame

import DraggableCheckpoint from '../components/DraggableCheckpoint';
import { updateCheckpoint } from '../services/checkpointService'; // Import updateCheckpoint

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startGame } = useGame();
  const mapRef = React.useRef<HTMLDivElement>(null);

  const initialCheckpoints = [
    { id: '1', name: 'Central Station', top: '35%', left: '45%', latitude: 52.089, longitude: 5.107 },
    { id: '2', name: 'Dom Tower', top: '45%', left: '55%', latitude: 52.090, longitude: 5.121 },
    { id: '3', name: 'Oudegracht', top: '55%', left: '40%', latitude: 52.087, longitude: 5.118 },
  ];

  const [checkpoints, setCheckpoints] = React.useState(initialCheckpoints);

  const handleDragStop = (e: any, data: any, checkpointId: string) => {
    if (mapRef.current) {
      const mapBounds = mapRef.current.getBoundingClientRect();
      const newLeft = ((data.x + (mapBounds.width * parseFloat(checkpoints.find(c => c.id === checkpointId)!.left) / 100)) / mapBounds.width) * 100;
      const newTop = ((data.y + (mapBounds.height * parseFloat(checkpoints.find(c => c.id === checkpointId)!.top) / 100)) / mapBounds.height) * 100;

      setCheckpoints(prev =>
        prev.map(c =>
          c.id === checkpointId ? { ...c, top: `${newTop}%`, left: `${newLeft}%` } : c
        )
      );

      // TODO: Convert top/left percentages to actual lat/long and save to backend
      updateCheckpoint(checkpointId, {
        // latitude: newLat, 
        // longitude: newLong
      }).catch(err => console.error("Failed to update checkpoint position", err));
    }
  };
  
  const handleCheckpointClick = async (id: string) => {
    const numericId = parseInt(id, 10);
    // TODO: Use dynamic groupId and routeId
    const groupId = user?.id || '00000000-0000-0000-0000-000000000000'; // Placeholder
    const routeId = '00000000-0000-0000-0000-000000000000'; // Placeholder for the route being played

    if (numericId === 1) {
      await startGame(groupId, routeId);
    }
    navigate(`/game/${id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 64px - 64px)',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)', mt: 2 }}>
        Welcome to EscApp
      </Typography>

      <Box
        ref={mapRef}
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '600px',
          position: 'relative',
          margin: '20px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/City_Map_Utrecht.webp"
          alt="Utrecht City Map"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 250px)',
            objectFit: 'contain',
            backgroundColor: 'grey',
          }}
        />
        {checkpoints.map((checkpoint) => {
          const isFirstCheckpoint = checkpoint.id === '1';
          const isCheckpointUnlocked = isFirstCheckpoint || user?.unlockedCheckpoints?.includes(parseInt(checkpoint.id, 10) - 1);

          if (!isCheckpointUnlocked) {
            return null;
          }

          return (
            <DraggableCheckpoint
              key={checkpoint.id}
              checkpoint={checkpoint}
              isAdmin={user?.role === 'admin'}
              onDragStop={handleDragStop}
              onClick={handleCheckpointClick}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2,
          width: '100%',
          maxWidth: '200px',
        }}
      >
        {user?.role === 'admin' && (
          <Button variant="contained" component={Link} to="/admin/checkpoints" sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}>
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