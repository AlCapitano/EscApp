import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GameScreen from './pages/GameScreen';
import Leaderboard from './pages/Leaderboard';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Navigation />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/game/:id" element={<ProtectedRoute><MainLayout><GameScreen /></MainLayout></ProtectedRoute>} />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Leaderboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
