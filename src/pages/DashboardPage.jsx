import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Box, Typography, Button, Paper, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MaintenanceCalendar from "../components/Components/MaintanceCalendar";
import "../styles/DashboardPage.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const DashboardPage = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const ships = JSON.parse(localStorage.getItem("ships")) || [];
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const components = JSON.parse(localStorage.getItem("components")) || [];

  const jobsInProgress = jobs.filter((job) => job.status === "In Progress").length;
  const completedJobs = jobs.filter((job) => job.status === "Completed").length;

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return date < oneYearAgo;
  };

  const overdueComponents = components.filter(comp => isOverdue(comp.lastMaintenanceDate)).length;
  const okComponents = components.length - overdueComponents;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const kpiCard = (title, value, path) => (
    <ButtonBase onClick={() => navigate(path)} key={title} className="kpi-button">
      <Paper elevation={3} className="kpi-card">
        <Typography variant="h6" mb={1}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Paper>
    </ButtonBase>
  );

  
  const jobStatusData = [
    { name: "In Progress", value: jobsInProgress },
    { name: "Completed", value: completedJobs }
  ];

  const componentMaintenanceData = [
    { name: "Overdue", value: overdueComponents },
    { name: "OK", value: okComponents }
  ];

  const COLORS = ["#f44336", "#4caf50"];

  return (
    <Box className="dashboard-container">
      
      <Box className="dashboard-header">
        <Typography variant="h4">Welcome, {currentUser?.role}</Typography>
        <Button onClick={handleLogout} variant="contained" color="error">
          Logout
        </Button>
      </Box>

     
      <Box className="kpi-section">
        {kpiCard("Total Ships", ships.length, "/ships")}
        {kpiCard("Total Components", components.length, "/components")}
        {kpiCard("Jobs In Progress", jobsInProgress, "/jobs")}
        {kpiCard("Completed Jobs", completedJobs, "/jobs")}
      </Box>

      
      <Box className="chart-section">
        <Box className="chart-box">
          <Typography variant="h6" mb={1}>Job Status Overview</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobStatusData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box className="chart-box">
          <Typography variant="h6" mb={1}>Component Maintenance Status</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={componentMaintenanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {componentMaintenanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      
      <Box className="calendar-section">
        <Typography variant="h5" mb={2}>
          Maintenance Calendar
        </Typography>
        <MaintenanceCalendar />
      </Box>
    </Box>
  );
};

export default DashboardPage;
