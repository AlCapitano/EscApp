import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import BugReportIcon from '@mui/icons-material/BugReport';

// Mock data for the leaderboard
const mockLeaderboardData = [
  { id: 'user1', username: 'PlayerOne', score: 1250, timestamp: '2023-05-20T10:00:00Z' },
  { id: 'user2', username: 'AdminUser', score: 1500, timestamp: '2023-05-20T11:00:00Z' },
  { id: 'user3', username: 'FastRunner', score: 1100, timestamp: '2023-05-20T09:30:00Z' },
  { id: 'user4', username: 'Explorer', score: 900, timestamp: '2023-05-20T08:00:00Z' },
  { id: 'user5', username: 'Newbie', score: 750, timestamp: '2023-05-20T12:00:00Z' },
];

const Leaderboard: React.FC = () => {
  const { user } = useAuth(); // Get current user from auth context
  const currentUserId = user?.id;
  const isAdmin = user?.role === 'admin';

  const handlePurge = (entry: typeof mockLeaderboardData[0]) => {
    console.log(`Admin action: Purge entry for user ${entry.username} (ID: ${entry.id})`);
    alert(`Purging entry for ${entry.username}`);
    // In a real app, this would call a backend admin API
  };

  const handleInvestigate = (entry: typeof mockLeaderboardData[0]) => {
    console.log(`Admin action: Investigate entry for user ${entry.username} (ID: ${entry.id})`);
    alert(`Tagging entry for ${entry.username} for investigation`);
    // In a real app, this would call a backend admin API
  };

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
              <TableCell>Username</TableCell>
              <TableCell align="right">Score</TableCell>
              {isAdmin && <TableCell align="center">Actions</TableCell>} {/* Admin actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLeaderboardData
              .sort((a, b) => b.score - a.score) // Sort by score descending
              .map((entry, index) => (
                <TableRow
                  key={entry.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: currentUserId === entry.id ? 'info.light' : 'inherit', // Highlight current user
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell align="right">{entry.score}</TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <IconButton color="error" size="small" onClick={() => handlePurge(entry)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton color="warning" size="small" onClick={() => handleInvestigate(entry)}>
                        <BugReportIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
