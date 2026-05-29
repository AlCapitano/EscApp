import React from 'react';
import { Box, Typography } from '@mui/material';

const SettingsPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings Page
      </Typography>
      <Typography variant="body1">
        This is a placeholder for user settings.
      </Typography>
    </Box>
  );
};

export default SettingsPage;