import React from 'react';
import { Container, Typography } from '@mui/material';

const Leaderboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Leaderboard
      </Typography>
      <Typography variant="body1">
        This is a placeholder for the leaderboard.
      </Typography>
    </Container>
  );
};

export default Leaderboard;
