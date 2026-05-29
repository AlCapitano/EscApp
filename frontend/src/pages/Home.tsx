import React from 'react';
import { useAuth } from '../context/AuthContext';
import HomePage from './HomePage';
import MainMenu from './MainMenu'; // Import the new MainMenu
// import GameSelection from './GameSelection'; // No longer needed here
// import MainLayout from '../components/MainLayout'; // No longer needed here

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <MainMenu />; // Render the new MainMenu
  }

  return <HomePage />;
};

export default Home;
