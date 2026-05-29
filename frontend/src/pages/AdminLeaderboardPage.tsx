import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { GameSession, listSessions } from '../services/gameSessionService';
import { deleteGameSession, deleteAllGameSessions } from '../services/adminService';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminLeaderboardPage: React.FC = () => {
  const [sessions, setSessions] = useState<GameSession[]>([]);

  const fetchSessions = async () => {
    const data = await listSessions();
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDeleteSession = async (id: string) => {
    console.log('Attempting to delete session with ID:', id);
    try {
      await deleteGameSession(id);
      fetchSessions();
    } catch (error) {
      console.error("Failed to delete session:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleResetLeaderboard = async () => {
    try {
      await deleteAllGameSessions();
      fetchSessions();
    } catch (error) {
      console.error("Failed to reset leaderboard:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin: Manage Leaderboard</Typography>
      <Button variant="contained" color="error" onClick={handleResetLeaderboard} sx={{ mb: 2 }}>
        Reset Leaderboard
      </Button>
      <List>
        {sessions.map(session => (
          <ListItem key={session.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSession(session.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={`Session ID: ${session.id}`}
              secondary={`Group ID: ${session.groupId} - Score: ${session.score}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminLeaderboardPage;
