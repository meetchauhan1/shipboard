import React from 'react';
import { Card, Typography, Button, Box } from '@mui/material';
import { useComponents } from '../contexts/ComponentsContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ComponentList.css';

const ComponentList = () => {
  const { components, deleteComponent } = useComponents();
  const navigate = useNavigate();

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date < oneYearAgo;
  };

  return (
    <Box className="component-list-container">
      <Box className="component-list-header" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Components</Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Home
          </Button>
          <Button variant="contained" onClick={() => navigate("/components/new")}>
            Add Component
          </Button>
        </Box>
      </Box>

      {components.map((comp) => {
        const overdue = isOverdue(comp.lastMaintenanceDate);
        return (
          <Card
            key={comp.id}
            className="component-card"
            sx={{ borderLeft: overdue ? "5px solid red" : "5px solid transparent" }}
          >
            <Box>
              <Typography variant="h6">{comp.name}</Typography>
              <Typography variant="body2">
                Serial: {comp.serialNumber} | Installed: {comp.installationDate} | Last Maintained: {comp.lastMaintenanceDate}
              </Typography>
              {overdue && (
                <Typography variant="body2" color="error">
                  Overdue Maintenance
                </Typography>
              )}
            </Box>
            <Box display="flex" gap={1}>
              <Button onClick={() => navigate(`/components/edit/${comp.id}`)}>Edit</Button>
              <Button color="error" onClick={() => deleteComponent(comp.id)}>Delete</Button>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default ComponentList;
