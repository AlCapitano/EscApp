import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { createGameSession, GameSession } from '../services/gameSessionService';

// Define the shape of the game state
interface GameState {
  gameSession: GameSession | null;
  currentPuzzleId: number | null;
  score: number;
}

// Define the shape of the context
interface GameContextType {
  gameState: GameState;
  startGame: (groupId: string, routeId: string) => Promise<void>;
  setCurrentPuzzle: (puzzleId: number) => void;
  completePuzzle: (points: number) => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create the provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    gameSession: null,
    currentPuzzleId: null,
    score: 0,
  });

  const startGame = useCallback(async (groupId: string, routeId: string) => {
    try {
      const newSession = await createGameSession(groupId, routeId);
      setGameState({
        gameSession: newSession,
        currentPuzzleId: 1, // Start with the first puzzle
        score: 0,
      });
    } catch (error) {
      console.error("Failed to start game session:", error);
      // Handle error appropriately, e.g., show a notification to the user
    }
  }, []);

  const setCurrentPuzzle = useCallback((puzzleId: number) => {
    setGameState(prev => ({ ...prev, currentPuzzleId: puzzleId }));
  }, []);

  const completePuzzle = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      currentPuzzleId: prev.currentPuzzleId ? prev.currentPuzzleId + 1 : null,
    }));
  }, []);

  return (
    <GameContext.Provider value={{ gameState, startGame, setCurrentPuzzle, completePuzzle }}>
      {children}
    </GameContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

