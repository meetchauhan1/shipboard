// src/pages/ShipDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import ComponentList from "../components/Components/ComponentList";
import { Box, Typography, Divider, Paper } from "@mui/material";

const ShipDetailPage = () => {
  const { id } = useParams();
  const { ships } = useShips();

  const ship = ships.find(s => s.id === id);

  if (!ship) return <Typography p={4}>Ship not found.</Typography>;

  return (
    <Box p={4} display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4">Ship Details</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>General Information</Typography>
        <Typography><strong>Name:</strong> {ship.name}</Typography>
        <Typography><strong>IMO Number:</strong> {ship.imo}</Typography>
        <Typography><strong>Flag:</strong> {ship.flag}</Typography>
        <Typography><strong>Status:</strong> {ship.status}</Typography>
      </Paper>

      <Divider />

      {/* ✅ COMPONENT LIST SECTION */}
      <ComponentList shipId={ship.id} />
    </Box>
  );
};

export default ShipDetailPage;
