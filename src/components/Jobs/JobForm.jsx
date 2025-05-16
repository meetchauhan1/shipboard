import React, { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";

const JobForm = () => {
  const { jobs, addJob, updateJob } = useJobs();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);

  const editing = Boolean(id);
  const [form, setForm] = useState({
    jobType: "",
    priority: "Medium",
    status: "Not Started",
    assignedEngineer: "",
    componentId: "",
    shipId: "",
    scheduledDate: "", 
  });

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    setShips(storedShips);
    setComponents(storedComponents);

    if (editing) {
      const job = jobs.find(j => j.id === id);
      if (job) setForm(job);
    }
  }, [id, jobs, editing]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateJob(form);
    else addJob({ ...form, id: uuidv4() });
    navigate("/jobs");
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={3}>{editing ? "Edit Job" : "New Job"}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Type"
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Assigned Engineer"
          name="assignedEngineer"
          value={form.assignedEngineer}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {["Low", "Medium", "High"].map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {["Not Started", "In Progress", "Completed"].map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Ship"
          name="shipId"
          value={form.shipId}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {ships.map(ship => (
            <MenuItem key={ship.id} value={ship.id}>
              {ship.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Component"
          name="componentId"
          value={form.componentId}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {components.map(comp => (
            <MenuItem key={comp.id} value={comp.id}>
              {comp.name} ({comp.serialNumber})
            </MenuItem>
          ))}
        </TextField>

        {/* ✅ Scheduled Date Picker */}
        <TextField
          label="Scheduled Date"
          name="scheduledDate"
          type="date"
          value={form.scheduledDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {editing ? "Update Job" : "Create Job"}
        </Button>
      </form>
    </Box>
  );
};

export default JobForm;
