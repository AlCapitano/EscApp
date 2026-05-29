import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../context/AuthContext'; // For unlocking next checkpoint
import { useGame } from '../context/GameContext'; // For game state management
import { submitAttempt } from '../services/checkpointAttemptService';

const GameScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const puzzleId = parseInt(id || '0', 10);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const { completeCheckpoint } = useAuth();
  const { gameState, setCurrentPuzzle, completePuzzle } = useGame();

  useEffect(() => {
    if (puzzleId) {
      setCurrentPuzzle(puzzleId);
    }
  }, [puzzleId, setCurrentPuzzle]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    if (!gameState.gameSession || !puzzleId) {
      console.error("Game session or puzzle ID not available.");
      return;
    }

    try {
      const attempt = await submitAttempt(gameState.gameSession.id, String(puzzleId), answer);
      
      if (attempt.correct) {
        completeCheckpoint(puzzleId); // Unlock locally
        completePuzzle(10); // Update score locally
        navigate('/'); // Navigate back to main menu
      } else {
        alert("Incorrect answer. Try again!");
      }
    } catch (error) {
      console.error("Failed to submit attempt:", error);
      alert("There was an error submitting your answer.");
    }

    setAnswer(''); // Clear input
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleGoBack} color="primary" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', flexGrow: 1, m: 0 }}>
          Puzzle {gameState.currentPuzzleId}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          Current Checkpoint / Puzzle Description:
        </Typography>
        <Typography variant="body1" paragraph>
          This is where the detailed description of the current puzzle or challenge will be displayed.
          For puzzle {gameState.currentPuzzleId}.
        </Typography>
        <Box sx={{ width: '100%', height: 200, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            [Placeholder for Map / Image related to Puzzle]
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Your Answer"
          variant="outlined"
          value={answer}
          onChange={handleAnswerChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit Answer
        </Button>
      </Box>
    </Container>
  );
};

export default GameScreen;
