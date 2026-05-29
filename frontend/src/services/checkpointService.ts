import api from './api';

export interface Checkpoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  // Add other fields as necessary
}

export const getCheckpoints = async (): Promise<Checkpoint[]> => {
  const response = await api.get('/checkpoints');
  return response.data;
};

export const updateCheckpoint = async (id: string, data: Partial<Checkpoint>): Promise<Checkpoint> => {
  const response = await api.patch(`/checkpoints/${id}`, data);
  return response.data;
};
