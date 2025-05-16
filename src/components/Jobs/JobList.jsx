import React, { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { Box, Typography, MenuItem, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const { jobs, deleteJob } = useJobs();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ status: "", priority: "" });

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filtered = jobs.filter(job =>
    (!filters.status || job.status === filters.status) &&
    (!filters.priority || job.priority === filters.priority)
  );

  return (
    <Box>
      <Box display="flex" gap={2} mb={3}>
        <TextField select label="Status" name="status" value={filters.status} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField select label="Priority" name="priority" value={filters.priority} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <Button variant="contained" onClick={() => navigate("/jobs/new")}>Add Job</Button>
      </Box>

      {filtered.map(job => (
        <Paper key={job.id} sx={{ mb: 2, p: 2 }}>
          <Typography><strong>Type:</strong> {job.jobType}</Typography>
          <Typography><strong>Priority:</strong> {job.priority}</Typography>
          <Typography><strong>Status:</strong> {job.status}</Typography>
          <Typography><strong>Engineer:</strong> {job.assignedEngineer}</Typography>
          <Typography><strong>Component:</strong> {job.componentId}</Typography>
          <Typography><strong>Ship:</strong> {job.shipId}</Typography>
          <Box mt={1} display="flex" gap={2}>
            <Button onClick={() => navigate(`/jobs/edit/${job.id}`)} size="small" variant="outlined">Edit</Button>
            <Button onClick={() => deleteJob(job.id)} size="small" variant="outlined" color="error">Delete</Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default JobList;
