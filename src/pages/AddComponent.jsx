import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useComponents } from "../contexts/ComponentsContext";
import { v4 as uuidv4 } from "uuid";

const AddComponent = () => {
  const { addComponent } = useComponents();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComponent = {
      ...form,
      id: uuidv4(),
    };

    addComponent(newComponent);
    navigate("/components");
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          Add New Component
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Component Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Serial Number"
            name="serialNumber"
            fullWidth
            required
            margin="normal"
            value={form.serialNumber}
            onChange={handleChange}
          />
          <TextField
            label="Installation Date"
            name="installationDate"
            type="date"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.installationDate}
            onChange={handleChange}
          />
          <TextField
            label="Last Maintenance Date"
            name="lastMaintenanceDate"
            type="date"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.lastMaintenanceDate}
            onChange={handleChange}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate("/components")}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddComponent;
