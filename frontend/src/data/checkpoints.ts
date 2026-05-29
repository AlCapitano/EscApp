export interface CheckpointData {
  id: string;
  name: string;
  top: string;
  left: string;
  latitude: number;
  longitude: number;
}

export const checkpoints: CheckpointData[] = [
  { id: '1', name: 'Central Station', top: '35%', left: '45%', latitude: 52.089, longitude: 5.107 },
  { id: '2', name: 'Dom Tower', top: '45%', left: '55%', latitude: 52.090, longitude: 5.121 },
  { id: '3', name: 'Oudegracht', top: '55%', left: '40%', latitude: 52.087, longitude: 5.118 },
];
