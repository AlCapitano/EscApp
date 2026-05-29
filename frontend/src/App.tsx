import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GameScreen from './pages/GameScreen';
import Leaderboard from './pages/Leaderboard';
import GameSelection from './pages/GameSelection'; // Import GameSelection
import SettingsPage from './pages/SettingsPage'; // Import SettingsPage
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <MainLayout>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/game-selection" element={<ProtectedRoute requiredRole="admin"><GameSelection /></ProtectedRoute>} /> {/* Admin-only Route */}
            <Route path="/game/:id" element={<ProtectedRoute><GameScreen /></ProtectedRoute>} />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> {/* New Settings Route */}
          </Routes>
        </Container>
      </MainLayout>
    </Router>
  );
}

export default App;
