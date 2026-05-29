import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import { getCheckpoints, updateCheckpoint, Checkpoint } from '../services/checkpointService';

const AdminCheckpoints: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [formState, setFormState] = useState({ name: '', latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchCheckpoints = async () => {
      const data = await getCheckpoints();
      setCheckpoints(data);
    };
    fetchCheckpoints();
  }, []);

  const handleSelectCheckpoint = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    setFormState({
      name: checkpoint.name,
      latitude: checkpoint.latitude,
      longitude: checkpoint.longitude,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCheckpoint) return;

    const dataToUpdate = {
      name: formState.name,
      latitude: parseFloat(String(formState.latitude)),
      longitude: parseFloat(String(formState.longitude)),
    };

    try {
      const updated = await updateCheckpoint(selectedCheckpoint.id, dataToUpdate);
      setCheckpoints(prev => prev.map(c => (c.id === updated.id ? updated : c)));
      setSelectedCheckpoint(null);
    } catch (error) {
      console.error("Failed to update checkpoint:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin: Manage Checkpoints</Typography>
      <Box display="flex">
        <Box width="30%" mr={4}>
          <Typography variant="h6">Checkpoints</Typography>
          <List>
            {checkpoints.map(checkpoint => (
              <ListItem button key={checkpoint.id} onClick={() => handleSelectCheckpoint(checkpoint)}>
                <ListItemText primary={checkpoint.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box width="70%">
          <Typography variant="h6">Edit Checkpoint</Typography>
          {selectedCheckpoint ? (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Latitude"
                name="latitude"
                type="number"
                value={formState.latitude}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Longitude"
                name="longitude"
                type="number"
                value={formState.longitude}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Update Checkpoint
              </Button>
            </form>
          ) : (
            <Typography>Select a checkpoint to edit.</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminCheckpoints;