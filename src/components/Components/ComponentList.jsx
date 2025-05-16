import React, { useState } from 'react';
import { useComponents } from '../../contexts/ComponentsContext';
import {
  Card,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ComponentList = () => {
  const { components, addComponent, deleteComponent } = useComponents();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shipId: '',
    installationDate: '',
    lastMaintenanceDate: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({ name: '', shipId: '', installationDate: '', lastMaintenanceDate: '' });
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    const newComponent = {
      ...formData,
      id: uuidv4(),
    };
    addComponent(newComponent);
    handleClose();
  };

  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Ship Components</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Component
        </Button>
      </Box>

      {components.length === 0 ? (
        <Typography>No components found.</Typography>
      ) : (
        components.map((comp) => (
          <Card key={comp.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6">{comp.name}</Typography>
              <Typography variant="body2">
                Ship ID: {comp.shipId} | Last Maintenance: {comp.lastMaintenanceDate}
              </Typography>
            </Box>
            <Button color="error" onClick={() => deleteComponent(comp.id)}>
              Delete
            </Button>
          </Card>
        ))
      )}

      {/* Add Component Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Component</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Component Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
          <TextField label="Ship ID" name="shipId" value={formData.shipId} onChange={handleChange} fullWidth />
          <TextField
            label="Installation Date"
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Last Maintenance Date"
            type="date"
            name="lastMaintenanceDate"
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComponentList;
