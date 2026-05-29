import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const GameScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Game Screen (Puzzle ID: {id})
      </Typography>
      <Typography variant="body1">
        This is a placeholder for the actual game content for puzzle {id}.
      </Typography>
    </Container>
  );
};

export default GameScreen;
