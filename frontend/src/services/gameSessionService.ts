import api from './api';

export interface GameSession {
  id: string;
  groupId: string;
  routeId: string;
  state: string; // Should match GameState enum in backend
  startTime: Date | null;
  endTime: Date | null;
  score: number;
}

export const createGameSession = async (groupId: string, routeId: string): Promise<GameSession> => {
  const response = await api.post('/game-sessions', { groupId, routeId });
  return response.data;
};

export const listSessions = async (): Promise<GameSession[]> => {
  const response = await api.get('/game-sessions');
  return response.data;
};

export const getGameSession = async (id: string): Promise<GameSession> => {
  const response = await api.get(`/game-sessions/${id}`);
  return response.data;
};

export const updateGameState = async (id: string, targetState: string): Promise<GameSession> => {
  const response = await api.patch(`/game-sessions/${id}/state`, { targetState });
  return response.data;
};
