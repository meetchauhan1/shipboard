import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/JobsPage.css";

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({
    shipId: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleFilterChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filter.shipId || job.shipId === filter.shipId) &&
      (!filter.status || job.status === filter.status) &&
      (!filter.priority || job.priority === filter.priority)
    );
  });

  return (
    <Box className="jobs-container">
      <Box className="jobs-header" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Maintenance Jobs</Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/jobs/new")}
          >
            Create Job
          </Button>
        </Box>
      </Box>

      <Box className="jobs-filters" display="flex" gap={2} mt={2} mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={filter.status}
            label="Status"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={filter.priority}
            label="Priority"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="jobs-list">
        {filteredJobs.map((job) => (
          <Paper key={job.id} className="job-card" sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{job.jobType}</Typography>
            <Typography>Status: {job.status}</Typography>
            <Typography>Priority: {job.priority}</Typography>
            <Typography>Engineer: {job.assignedEngineer}</Typography>
            <Typography>Component: {job.componentsId}</Typography>
            <Typography>Ship: {job.ShipId}</Typography>
            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/jobs/edit/${job.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteJob(job.id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default JobsPage;
