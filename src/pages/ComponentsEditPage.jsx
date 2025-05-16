import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useComponents } from "../contexts/ComponentsContext";

const ComponentsEditPage = () => {
  const { components, updateComponent } = useComponents(); 
  const { id } = useParams();
  const navigate = useNavigate();

  const existingComponent = components.find((comp) => comp.id === id) || {};

  const [formData, setFormData] = useState({
    id: existingComponent.id || id, 
    name: existingComponent.name || "",
    serialNumber: existingComponent.serialNumber || "",
    installationDate: existingComponent.installationDate || "",
    lastMaintenanceDate: existingComponent.lastMaintenanceDate || "",
  });

  useEffect(() => {
    setFormData({
      id: existingComponent.id || id,
      name: existingComponent.name || "",
      serialNumber: existingComponent.serialNumber || "",
      installationDate: existingComponent.installationDate || "",
      lastMaintenanceDate: existingComponent.lastMaintenanceDate || "",
    });
  }, [existingComponent, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateComponent(formData); 
    navigate("/components");
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h4" mb={3}>
        Edit Component
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Serial Number"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Installation Date"
          name="installationDate"
          type="date"
          value={formData.installationDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Last Maintenance Date"
          name="lastMaintenanceDate"
          type="date"
          value={formData.lastMaintenanceDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Box mt={3} display="flex" gap={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate("/components")}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ComponentsEditPage;
