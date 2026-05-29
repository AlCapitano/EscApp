import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { GameSession, listSessions } from '../services/gameSessionService';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [sessions, setSessions] = useState<GameSession[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await listSessions();
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard sessions:", error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User/Group</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions
              .sort((a, b) => b.score - a.score) // Sort by score descending
              .map((session, index) => (
                <TableRow
                  key={session.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: currentUserId === session.groupId ? 'info.light' : 'inherit', // Highlight if the session belongs to the current user's group
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{session.groupId}</TableCell> {/* TODO: Fetch user/group name */}
                  <TableCell align="right">{session.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
