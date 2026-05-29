import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px - 64px)', // Adjust for AppBar and Container margin
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
