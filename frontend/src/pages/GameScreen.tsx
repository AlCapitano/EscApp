import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const GameScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const puzzleId = parseInt(id || '0', 10); // Parse id to number
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const { completeCheckpoint } = useAuth(); // Get completeCheckpoint from AuthContext

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Submitting answer "${answer}" for puzzle ID: ${puzzleId}`);
    // Simulate successful submission
    // alert(`Answer submitted for puzzle ${puzzleId}: ${answer}`); // Removed alert
    
    // Call completeCheckpoint to mark this puzzle as solved
    if (puzzleId) {
      completeCheckpoint(puzzleId);
    }
    setAnswer(''); // Clear input after submission
    navigate('/'); // Optionally navigate back to main menu or next puzzle
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page (GameSelection)
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleGoBack} color="primary" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', flexGrow: 1, m: 0 }}>
          Puzzle {id}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          Current Checkpoint / Puzzle Description:
        </Typography>
        <Typography variant="body1" paragraph>
          This is where the detailed description of the current puzzle or challenge will be displayed.
          It could include text, images, or even interactive elements for the user to solve.
          For example: "Find the hidden symbol in the historical mural and enter its name."
        </Typography>
        {/* Placeholder for map or other visual cues */}
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
