import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/main-menu" replace />;
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Escape The City
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
        fullWidth
        style={{ margin: '8px 0' }}
      >
        Login
      </Button>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        color="secondary"
        fullWidth
        style={{ margin: '8px 0' }}
      >
        Register
      </Button>
    </Container>
  );
};

export default HomePage;
