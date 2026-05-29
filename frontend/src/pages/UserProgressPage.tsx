import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getUsersProgress, UserProgress } from '../services/adminService';

const UserProgressPage: React.FC = () => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      const data = await getUsersProgress();
      setUserProgress(data);
    };
    fetchUserProgress();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin: User Progress</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Unlocked Checkpoints</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userProgress.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.unlockedCheckpoints.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserProgressPage;
