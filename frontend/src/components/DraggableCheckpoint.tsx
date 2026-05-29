import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Checkpoint } from '../services/checkpointService'; // Assuming this interface exists

interface DraggableCheckpointProps {
  checkpoint: Checkpoint & { top: string; left: string };
  isAdmin: boolean;
  onDragStop: (e: any, data: any, checkpointId: string) => void;
  onClick: (id: string) => void;
}

const DraggableCheckpoint: React.FC<DraggableCheckpointProps> = ({ checkpoint, isAdmin, onDragStop, onClick }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={!isAdmin}
      onStop={(e, data) => onDragStop(e, data, checkpoint.id)}
      position={{ x: 0, y: 0 }}
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          top: checkpoint.top,
          left: checkpoint.left,
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          cursor: isAdmin ? 'move' : 'pointer',
        }}
      >
        <IconButton
          onClick={() => onClick(checkpoint.id)}
          title={checkpoint.name}
          sx={{ color: 'primary.main' }}
        >
          <LocationOnIcon fontSize="large" />
        </IconButton>
      </div>
    </Draggable>
  );
};

export default DraggableCheckpoint;
