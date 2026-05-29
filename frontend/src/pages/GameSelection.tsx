import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const puzzles = [
  { id: 1, title: 'The First Gate', description: 'A puzzle of locks and keys.' },
  { id: 2, title: 'The Whispering Library', description: 'A puzzle of words and echoes.' },
  { id: 3, title: 'The Celestial Clock', description: 'A puzzle of time and stars.' },
];

const GameSelection: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkpoints
      </Typography>
      <Grid container spacing={4}>
        {puzzles.map((puzzle) => (
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
