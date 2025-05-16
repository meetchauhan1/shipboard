import React, { useState, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, TextField, Typography } from "@mui/material";

const ShipForm = () => {
  const { ships, addShip, updateShip } = useShips();
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  const [formData, setFormData] = useState({ name: "", imo: "", flag: "", status: "Active" });

  useEffect(() => {
    if (editing) {
      const existing = ships.find((s) => s.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, ships]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateShip(formData) : addShip({ ...formData, id: uuidv4() });
    navigate("/dashboard");
  };

  return (
    <Box p={3} maxWidth="500px" mx="auto">
      <Typography variant="h5" mb={2}>{editing ? "Edit Ship" : "Add Ship"}</Typography>
      <form onSubmit={handleSubmit}>
        {["name", "imo", "flag", "status"].map((field) => (
          <TextField
            key={field}
            fullWidth
            margin="normal"
            label={field.toUpperCase()}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
      </form>
    </Box>
  );
};

export default ShipForm;
