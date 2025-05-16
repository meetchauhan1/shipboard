
import React, { useState, useEffect } from "react";
import { useComponents } from "../../contexts/ComponentsContext";
import { v4 as uuidv4 } from "uuid";
import { Box, TextField, Button, Paper } from "@mui/material";

const ComponentForm = ({ shipId, existing, onClose }) => {
  const { addComponent, updateComponent } = useComponents();
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: ""
  });

  useEffect(() => {
    if (existing) setFormData(existing);
  }, [existing]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, shipId };
    if (existing) updateComponent(data);
    else addComponent({ ...data, id: uuidv4() });

    onClose();
  };

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <form onSubmit={handleSubmit}>
        {["name", "serialNumber", "installationDate", "lastMaintenanceDate"].map((field) => (
          <TextField
            key={field}
            fullWidth
            required
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        ))}
        <Box display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ComponentForm;
