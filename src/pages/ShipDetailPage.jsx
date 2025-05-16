import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import "../styles/ShipDetailPage.css"; 

const ShipDetailPage = () => {
  return (
    <Box className="ship-detail-container">
      <Typography variant="h4" className="ship-detail-title">Ship Details</Typography>
      <Paper elevation={3} className="ship-detail-card">
        <Typography>Name: Ship 1</Typography>
        <Typography>IMO: 1234567</Typography>
        <Typography>Flag: Country</Typography>
        <Typography>Status: Active</Typography>
      </Paper>
    </Box>
  );
};

export default ShipDetailPage;
