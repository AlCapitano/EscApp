import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const allPuzzles = [
  { id: 1, title: 'The First Gate', description: 'A puzzle of locks and keys.' },
  { id: 2, title: 'The Whispering Library', description: 'A puzzle of words and echoes.' },
  { id: 3, title: 'The Celestial Clock', description: 'A puzzle of time and stars.' },
];

const GameSelection: React.FC = () => {
  const { user } = useAuth();

  const puzzlesToDisplay = user?.unlockedCheckpoints
    ? allPuzzles.filter(puzzle => user.unlockedCheckpoints?.includes(puzzle.id))
    : allPuzzles; // If not logged in, or no unlockedCheckpoints, show all for now

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkpoints
      </Typography>
      <Grid container spacing={4}>
        {puzzlesToDisplay.map((puzzle) => (
          <Grid item xs={12} sm={6} md={4} key={puzzle.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}> {/* Ensure card takes full height of grid item */}
              <CardActionArea component={Link} to={`/game/${puzzle.id}`} sx={{ flexGrow: 1 }}>
                <CardContent sx={{ flexGrow: 1, minHeight: 120 }}> {/* Added minHeight */}
                  <Typography gutterBottom variant="h5" component="div">
                    {puzzle.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {puzzle.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GameSelection;
