import api from './api';

export interface CheckpointAttempt {
  id: string;
  sessionId: string;
  checkpointId: string;
  answer: string;
  correct: boolean;
}

export const submitAttempt = async (
  sessionId: string,
  checkpointId: string,
  answer: string
): Promise<CheckpointAttempt> => {
  const response = await api.post('/checkpoint-attempts', {
    sessionId,
    checkpointId,
    answer,
  });
  return response.data;
};
