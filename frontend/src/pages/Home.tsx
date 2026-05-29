import React from 'react';
import { useAuth } from '../context/AuthContext';
import HomePage from './HomePage';
import MainMenu from './MainMenu';
import MainLayout from '../components/MainLayout';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <MainLayout>
        <MainMenu />
      </MainLayout>
    );
  }

  return <HomePage />;
};

export default Home;
