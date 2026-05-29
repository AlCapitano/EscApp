import api from './api';

export interface UserProgress {
  id: string;
  name: string;
  email: string;
  unlockedCheckpoints: number[];
}

export const getUsersProgress = async (): Promise<UserProgress[]> => {
  const response = await api.get('/admin/users/progress');
  return response.data;
};

export const deleteGameSession = async (id: string): Promise<void> => {
  await api.delete(`/game-sessions/${id}`);
};

export const deleteAllGameSessions = async (): Promise<void> => {
  await api.delete('/game-sessions');
};
